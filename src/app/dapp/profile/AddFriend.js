import { getDetailsForAddress, setDetailsForAddress } from "@/util/storage";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function AddFriend() {
  useEffect(() => {
    const getFriends = async () => {
      const details = await getDetailsForAddress("abc");
    };
    getFriends();
  }, []);
  const [address, setAddress] = useState("");
  const onAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const add = async () => {
    setDetailsForAddress("abc", { friends: [address] });
  };
  return (
    <Stack spacing={2}>
      <Typography variant="h4">Add Friend</Typography>
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
            onClick={add}
            type="submit"
          >
            Add Friend
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
}
