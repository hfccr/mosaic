import { Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useAccount, usePublicClient } from "wagmi";
import { getKVForAddress } from "@/util/storage";
import { useEffect, useState } from "react";

const columns = [
  { field: "address", headerName: "Address", flex: 1 },
  { field: "score", headerName: "Score", width: 40 },
  { field: "lastPenalty", headerName: "Last Penalty", width: 140 },
];

export default function Friends() {
  const account = useAccount();
  const publicClient = usePublicClient();
  const [friendsScore, setFriendsScore] = useState([]);

  useEffect(() => {
    const getFriends = () => {
      getKVForAddress(account.address).then(async (data) => {
        const friends = data?.friends || [];
        if (friends.length === 0) {
          return;
        }
        const scores = await publicClient.readContract({
          address: addresses.TrustNetwork,
          abi,
          functionName: "getTrustScore",
          args: [friends],
        });
        setFriendsScore(
          friends.map((f, i) => ({
            address: f,
            score: scores[0][i],
            lastPenalty: new Date(scores[1][i]).toLocaleString(),
          }))
        );
      
      });
    };
    getFriends();
  }, [account.address]);

  return (
    <Stack spacing={2}>
      <Typography variant="h4">Your Friends</Typography>
      <DataGrid
        rows={friendsScore}
        columns={columns}
        pageSizeOptions={[10, 100]}
        getRowId={(row) => row.address}
        disableRowSelectionOnClick
      />
    </Stack>
  );
}
