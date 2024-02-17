"use client";
import { Typography } from "@mui/material";
import React from "react";
import { useReadContract } from "wagmi";
import addresses from "@/util/contractAddresses";
import { abi } from "@/util/trustNetworkABI";
import { useAccount } from "wagmi";

export default function YourScore() {
  const account = useAccount();
  const { data: userScore } = useReadContract({
    address: addresses.TrustNetwork,
    abi,
    functionName: "getTrustScore",
    args: [[account.address]],
  });
  if (!userScore) {
    return <Typography>Loading...</Typography>;
  }
  return (
    <>
      <Typography variant="h4">Your Score</Typography>
      {!userScore && <Typography variant="subtitle1">Loading...</Typography>}
      {userScore && (
        <Typography variant="subtitle1">
          {userScore[0][0].toString()}
        </Typography>
      )}
    </>
  );
}
