"use server";
import { kv } from "@vercel/kv";

export const getDetailsForAddress = async (address) => {
  const details = await kv.get(address);
  return details;
};

export const setDetailsForAddress = async (address, details) => {
  await kv.set(address, details);
};
