import { setup } from "@/circuit/setup";
import circuit from "@/circuit/circuit.json";
import { BarretenbergBackend } from "@noir-lang/backend_barretenberg";
import { Noir } from "@noir-lang/noir_js";

let setupDone = false;
let backend;
let noir;

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
  try {
    await oneTimeSetup();
    console.log("Generating proof");
    const proof = await noir.generateFinalProof(input);
    console.log("Proof generated");
    console.log("results", proof.proof);
  } catch (e) {
    console.log("Failed");
    console.log(e);
  }
};
