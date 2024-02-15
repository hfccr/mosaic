import { setup } from "@/circuit/setup";
import circuit from "@/circuit/circuit.json";
import { BarretenbergBackend } from "@noir-lang/backend_barretenberg";
import { Noir } from "@noir-lang/noir_js";

let setupDone = false;
let backend;
let noir;

function mapKeysToArray(map) {
  return Array.from(map.keys()).map((key) => map.get(key));
}

const oneTimeSetup = async () => {
  if (setupDone) {
    return;
  }
  try {
    await setup();
    console.log("Circuit ", circuit);
    backend = new BarretenbergBackend(circuit);
    noir = new Noir(circuit, backend);
    setupDone = true;
  } catch (e) {
    console.log("setup failed");
    console.log(e);
  }
};

export const run = async (input) => {
  console.log("Input:", input);
  await oneTimeSetup();
  console.log("Generating proof");
  const proof = await noir.generateFinalProof(input);
  console.log("Proof generated");
  console.log("results", proof.proof);
  return {
    proof: "0x" + Buffer.from(proof.proof).toString("hex"),
    publicInputs: mapKeysToArray(proof.publicInputs),
  };
};
