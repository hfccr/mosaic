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
  return <Typography>Your Score: {userScore[0][0].toString()}</Typography>;
}
