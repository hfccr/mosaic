"use client";
import { Chip, Container, Stack, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import addresses from "@/util/contractAddresses";
import ArticleIcon from "@mui/icons-material/Article";
import { GitHub } from "@mui/icons-material";
import Link from "next/link";

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
        <Stack direction="row" spacing={2}>
          <Tooltip title="Mosaic Trust Network Scroll Sepolia Contract Address">
            <Chip label={addresses.TrustNetwork} icon={<ArticleIcon />} />
          </Tooltip>
          <Tooltip title="Mosaic Trust Network Contract">
            <a
              target="_blank"
              href="https://github.com/obernardovieira/circuit-breaker-mosaic/blob/main/contracts/contracts/TrustNetwork.sol"
            >
              <Chip label="Trust Network" icon={<GitHub />} />
            </a>
          </Tooltip>
          <Tooltip title="Mosaic ZK Noir Network Circuit">
            <a
              target="_blank"
              href="https://github.com/obernardovieira/circuit-breaker-mosaic/blob/main/circuits/circuits/src/main.nr"
            >
              <Chip
                label="Circuit"
                icon={<GitHub />}
                sx={{ cursor: "pointer" }}
              />
            </a>
          </Tooltip>
        </Stack>
      </Stack>
    </Container>
  );
}
