"use client";
import { http, createConfig } from "wagmi";
import { scrollSepolia } from "wagmi/chains";

const config = createConfig({
  appName: "mosaic",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  chains: [scrollSepolia],
  transports: {
    [scrollSepolia.id]: http(),
  },
  ssr: true,
});

export { config };
