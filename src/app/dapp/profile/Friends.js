import { Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

const columns = [
  { field: "address", headerName: "Address", width: 340 },
  { field: "score", headerName: "Score", width: 40 },
  { field: "lastUpdated", headerName: "Last Updated", width: 100 },
];

const rows = [
  {
    address: "0x2a5fab77e8786c0be13e86cc662f9ee98c178cf3",
    score: "85",
  },
  {
    address: "0x35b8f6f71ab7bc464d6a900d8f33c3c287b19bc8",
    score: "75",
  },
];

export default function Friends() {
  return (
    <Stack>
      <Typography variant="h4">Your Friends</Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[10]}
        getRowId={(row) => row.address}
      />
    </Stack>
  );
}
