"use server";
import { kv } from "@vercel/kv";

export const getKVForAddress = async (address) => {
  const details = await kv.get(address);
  return details;
};

export const setKVForAddress = async (address, details) => {
  await kv.set(address, details);
};
