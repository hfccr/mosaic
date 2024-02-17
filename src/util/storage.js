import { kv } from "@vercel/kv";

export const getDetailsForAddress = async (address) => {
  const details = await kv.get(address);
  return details;
};

export const setDetailsForAddress = async (address, details) => {
  await kv.put(address, details);
};
