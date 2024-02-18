import { getKVForAddress, setKVForAddress } from "@/util/storage";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { recoverMessageAddress } from "viem";
import addresses from "@/util/contractAddresses";
import { abi } from "@/util/trustNetworkABI";
import { computeMerkleRoot } from "@/util/merkleTree";

export default function JoinWithInvite() {
  const account = useAccount();
  const [inviteMessage, setInviteMessage] = useState("");
  const [inviteSignature, setInviteSignature] = useState("");
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const onInviteMessageChange = (e) => {
    setInviteMessage(e.target.value);
  };
  const onInviteSignatureChange = (e) => {
    setInviteSignature(e.target.value);
  };
  const handleJoin = async () => {
    const recoveredAddress = await recoverMessageAddress({
      message: inviteMessage,
      signature: inviteSignature,
    });
    const { previousRootHash, newRootHash } = JSON.parse(inviteMessage);
    const friends = (await getKVForAddress(account.address))?.friends || [];
    const connections = friends
      .concat([recoveredAddress.toLowerCase()])
      .concat(
        Array(9 - friends.length).fill(
          "0x0000000000000000000000000000000000000000"
        )
      );
    const rootHash = computeMerkleRoot(connections);

    writeContract({
      address: addresses.TrustNetwork,
      abi,
      functionName: "join",
      args: [
        recoveredAddress,
        rootHash,
        previousRootHash,
        newRootHash,
        "0x0",
        ["0x00000000000000000000000000000000"],
      ],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return (
    <Stack spacing={2}>
      <Typography variant="h4">Join With Invite</Typography>
      <Box components="form" noValidate autoComplete="off">
        <Stack direction="row" spacing={4} alignItems="center">
          <TextField
            id="invite-message"
            label="Invite Message"
            type="text"
            fullWidth
            value={inviteMessage}
            onChange={onInviteMessageChange}
            required
          />
          <TextField
            id="invite-signature"
            label="Invite Signature"
            type="text"
            fullWidth
            value={inviteSignature}
            onChange={onInviteSignatureChange}
            required
          />
          <Button
            variant="contained"
            sx={{ flexShrink: 0 }}
            onClick={handleJoin}
            type="submit"
          >
            Join
          </Button>
        </Stack>
        {hash && <div>Transaction Hash: {hash}</div>}
        {isConfirming && <div>Waiting for confirmation...</div>}
        {isConfirmed && <div>Transaction confirmed.</div>}
      </Box>
    </Stack>
  );
}
