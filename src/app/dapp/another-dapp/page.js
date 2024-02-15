"use client";
import React from "react";
import {
    useWriteContract,
    useWaitForTransactionReceipt,
    usePublicClient,
    useAccount,
} from "wagmi";
import addresses from "@/util/contractAddresses";
import { abi } from "@/util/trustNetworkABI";
import { run } from "@/circuit/run";
import { computeMerkleRoot } from "@/util/merkleTree";
import { fromHex, keccak256, toHex } from "viem";

export default function AnotherDapp() {
    const account = useAccount();
    const { data: hash, error, isPending, writeContract } = useWriteContract();
    const publicClient = usePublicClient();

    async function submit() {
        // TODO: get from storage
        const connectionsFromStorage = [account.address.toLowerCase()];
        const connectionsAddresses = connectionsFromStorage.concat(
            Array(10 - connectionsFromStorage.length).fill(
                "0x0000000000000000000000000000000000000000"
            )
        );

        // const scores = await publicClient.readContract({
        //     address: addresses.TrustNetwork,
        //     abi,
        //     functionName: "getTrustScore",
        //     args: [connectionsAddresses],
        // });
        const scores = await publicClient.readContract({
            address: addresses.TrustNetwork,
            abi,
            functionName: "trust",
            args: [account.address],
        });
        const expectedHash = await publicClient.readContract({
            address: addresses.TrustNetwork,
            abi,
            functionName: "getHash",
            args: [connectionsFromStorage],
        });

        const rootHash = computeMerkleRoot(connectionsAddresses);

        const { proof, publicInputs } = await run({
            addresses: connectionsAddresses,
            // filter out the 0n scores
            scores: [scores[0].toString()].concat(Array(9).fill("00")),
            // scores: scores[0]
            //     .filter((s) => s != 0n)
            //     .concat(Array(10 - scores[0].filter((s) => s != 0n).length).fill("00"))
            //     .map((score) => score.toString()),
            expected_hash: Array.from(fromHex(expectedHash, "bytes")),
            expected_merkle_tree_root_hash: Array.from(rootHash)
        });

        console.log({ proof, publicInputs });

        writeContract({
            address: addresses.TrustNetwork,
            abi,
            functionName: "computeNewTrust",
            args: [3, proof, publicInputs],
        });
    }

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        });

    return (
        <div className="container">
            <div className="stack">
                <button onClick={submit} disabled={isPending} type="submit">
                    {isPending ? "Confirming..." : "Do Something"}
                </button>
                {hash && <div>Transaction Hash: {hash}</div>}
                {isConfirming && <div>Waiting for confirmation...</div>}
                {isConfirmed && <div>Transaction confirmed.</div>}
                {error && <div>Error: {error.shortMessage || error.message}</div>}
            </div>
        </div>
    );
}