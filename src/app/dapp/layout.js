"use client";
import React, { useState, useEffect } from "react";
import { Alert, Box, Container, Stack } from "@mui/material";
import { useAccount, useSwitchChain } from "wagmi";
import { Connect } from "@/components/Connect";
import AlertTitle from "@mui/material/AlertTitle";

export default function DappLayout({ children }) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  const { chain, status } = useAccount();
  const { chains } = useSwitchChain();
  const isConnected = status === "connected";
  const wrongChain = chain === undefined;
  const promptSwitch = isConnected && wrongChain;
  return (
    <Container sx={{ marginTop: 12 }} maxWidth="sm">
      {(!isConnected || !hydrated) && (
        <Stack
          direction="column"
          spacing={8}
          justifyContent="center"
          alignItems="center"
        >
          <Alert severity="info" title="Hello" action={<Connect />}>
            <AlertTitle>Connect Wallet</AlertTitle>
            Connect your wallet to continue
          </Alert>
        </Stack>
      )}
      {promptSwitch && (
        <Stack direction="column" spacing={8} sx={{ minWidth: "md" }}>
          <Alert severity="info" action={<Connect />}>
            <AlertTitle>Switch Network</AlertTitle>
            Switch To{" "}
            <Box component="span" sx={{ fontWeight: "bold" }}>
              {chains[0].name}
            </Box>{" "}
          </Alert>
        </Stack>
      )}
      {isConnected && !wrongChain && hydrated && <>{children}</>}
    </Container>
  );
}
