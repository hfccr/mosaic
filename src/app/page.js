"use client";
import Circuit from "@/components/Circuit";
import { Container, Stack, Typography } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <Container>
      <Stack
        spacing={8}
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "80vh" }}
      >
        <Typography variant="h1">ZK Trust Network</Typography>
        <Image
          src="./network.svg"
          width={500}
          height={500}
          alt="ZK Trust Network"
        />
        <Stack direction="row" alignItems="center" spacing={4}>
          <Image src="scroll.svg" width={162} height={48} alt="Scroll" />
          <Typography variant="h1" sx={{ fontWeight: 100 }}>
            +
          </Typography>
          <Image src="noir.svg" width={162} height={48} alt="Scroll" />
        </Stack>
      </Stack>
    </Container>
  );
}
