"use client";
import { createConfig } from "wagmi";
import { scrollSepolia } from "wagmi/chains";

const config = createConfig({
  appName: "mosaic",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  chains: [scrollSepolia],
  ssr: true,
});

export { config };
