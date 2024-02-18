import { getKVForAddress, setKVForAddress } from "@/util/storage";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAccount, useSignMessage, useReadContract } from "wagmi";
import addresses from "@/util/contractAddresses";
import { abi } from "@/util/trustNetworkABI";
import { computeMerkleRoot } from "@/util/merkleTree";
import { toHex } from "viem";

export default function AddFriend() {
  const account = useAccount();
  const { data: userTrustNetwork } = useReadContract({
    address: addresses.TrustNetwork,
    abi,
    functionName: "trustNetwork",
    args: [account.address],
  });
  const [address, setAddress] = useState("");
  const {
    data: signMessageData,
    error,
    isLoading,
    signMessage,
  } = useSignMessage();

  const onAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const handleAddFriend = async () => {
    const friends = (await getKVForAddress(account.address))?.friends || [];
    setKVForAddress(account.address, { friends: friends.concat([address]) });

    const connections = friends
      .concat([address.toLowerCase()])
      .concat(
        Array(9 - friends.length).fill(
          "0x0000000000000000000000000000000000000000"
        )
      );
    const rootHash = computeMerkleRoot(connections);

    signMessage({
      message: JSON.stringify({
        previousRootHash: userTrustNetwork[0],
        newRootHash: toHex(rootHash),
      }),
    });
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h4">Invite Friend</Typography>
      <Box components="form" noValidate autoComplete="off">
        <Stack direction="row" spacing={4} alignItems="center">
          <TextField
            id="add-friend"
            label="Address"
            type="text"
            fullWidth
            value={address}
            onChange={onAddressChange}
            required
          />
          <Button
            variant="contained"
            sx={{ flexShrink: 0 }}
            onClick={handleAddFriend}
            type="submit"
          >
            Invite
          </Button>
        </Stack>
        <Typography variant="caption" color="textSecondary">
          {isLoading && "Loading..."}
        </Typography>
        {signMessageData && (
          <Typography variant="caption" color="textSecondary">
            Signature:
            {signMessageData}
          </Typography>
        )}
      </Box>
    </Stack>
  );
}
