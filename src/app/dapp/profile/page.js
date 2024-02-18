"use client";
import React from "react";
import YourScore from "./YourScore";
import { Stack } from "@mui/material";
import AddFriend from "./AddFriend";
import Friends from "./Friends";
import JoinWithInvite from "./JoinWithInvite";
import { useAccount, useReadContract } from "wagmi";
import addresses from "@/util/contractAddresses";
import { abi } from "@/util/trustNetworkABI";

export default function Profile() {
  const account = useAccount();
  const { data: userTrustData, isLoading } = useReadContract({
    address: addresses.TrustNetwork,
    abi,
    functionName: "trust",
    args: [account.address],
  });

  console.log(userTrustData);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (userTrustData[0] && parseInt(userTrustData[0]) > 0) {
    return (
      <Stack spacing={4}>
        <YourScore />
        <Friends />
        <AddFriend />
      </Stack>
    );
  }

  return (
    <Stack spacing={4}>
      <JoinWithInvite />
    </Stack>
  );
}
