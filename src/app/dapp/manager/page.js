"use client";
import React from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import addresses from "@/util/contractAddresses";
import { abi } from "@/util/trustNetworkABI";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function Manager() {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  async function submit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userAddress = formData.get("userAddress");
    const penaltyPercentage = formData.get("penaltyPercentage");
    writeContract({
      address: addresses.TrustNetwork,
      abi,
      functionName: "addPenalty",
      args: [userAddress, BigInt(penaltyPercentage)],
    });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return (
    <Container>
      <Stack direction="column">
        <Box component="form" onSubmit={submit}>
          <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
            <TextField name="userAddress" placeholder="User Address" required />
            <TextField
              name="penaltyPercentage"
              placeholder="Penalty Percentage"
              required
            />
            <Button
              variant="contained"
              disabled={isPending}
              type="submit"
              sx={{ flexGrow: 0 }}
            >
              {isPending ? "Confirming..." : "Add Penalty"}
            </Button>
          </Stack>
        </Box>
        {hash && <Typography variant="h4">Transaction Hash: {hash}</Typography>}
        {isConfirming && (
          <Typography variant="h4">Waiting for confirmation...</Typography>
        )}
        {isConfirmed && (
          <Typography variant="h4">Transaction confirmed.</Typography>
        )}
        {error && (
          <Typography variant="h4" color="error">
            Error: {error.shortMessage || error.message}
          </Typography>
        )}
      </Stack>
    </Container>
  );
}
