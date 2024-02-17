"use client";
import React from "react";
import YourScore from "./YourScore";
import { Stack } from "@mui/material";
import AddFriend from "./AddFriend";
import Friends from "./Friends";

export default function Profile() {
  return (
    <Stack spacing={4}>
      <YourScore />
      <Friends />
      <AddFriend />
    </Stack>
  );
}
