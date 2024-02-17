import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";

export default function AddFriend() {
  return (
    <Stack spacing={2}>
      <Typography variant="h4">Add Friend</Typography>
      <Box components="form" noValidate autoComplete="off">
        <Stack direction="row" spacing={4} alignItems="center">
          <TextField id="add-friend" label="Address" type="text" fullWidth />
          <Button variant="contained" sx={{ flexShrink: 0 }}>
            Add Friend
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
}
