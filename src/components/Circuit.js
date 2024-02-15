import { Button, Container } from "@mui/material";
import React, { useCallback, useState } from "react";
import { run } from "@/circuit/run";

export default function Circuit() {
  const [proof, setProof] = useState(null);
  const handleSubmit = async () => {
    const addresses = [
      "0x2a5fab77e8786c0be13e86cc662f9ee98c178cf3",
      "0x35b8f6f71ab7bc464d6a900d8f33c3c287b19bc8",
      "0x0000000000000000000000000000000000000000",
      "0x0000000000000000000000000000000000000000",
      "0x0000000000000000000000000000000000000000",
      "0x0000000000000000000000000000000000000000",
      "0x0000000000000000000000000000000000000000",
      "0x0000000000000000000000000000000000000000",
      "0x0000000000000000000000000000000000000000",
      "0x0000000000000000000000000000000000000000",
    ];
    const scores = ["85", "75", "00", "00", "00", "00", "00", "00", "00", "00"];
    const expected_hash = [
      101, 117, 59, 214, 186, 31, 78, 229, 227, 15, 232, 164, 219, 17, 131, 61,
      108, 33, 139, 91, 71, 36, 178, 220, 2, 63, 117, 141, 140, 30, 20, 165,
    ];
    const expected_merkle_tree_root_hash = [
      76, 134, 87, 8, 193, 5, 76, 49, 105, 150, 45, 229, 90, 177, 224, 97, 70,
      120, 98, 202, 20, 79, 132, 180, 99, 9, 233, 215, 82, 247, 210, 142,
    ];
    const proof = await run({
      addresses,
      scores,
      expected_hash,
      expected_merkle_tree_root_hash,
    });
    console.log(proof);
    setProof(proof);
  };
  return (
    <Container>
      <Button onClick={handleSubmit}>Verify</Button>
    </Container>
  );
}
