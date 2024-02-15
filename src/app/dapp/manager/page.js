"use client";
import React from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import addresses from "@/util/contractAddresses";
import { abi } from "@/util/trustNetwork";

export default function Manager() {
	const { data: hash, error, isPending, writeContract } = useWriteContract();

	async function submit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const userAddress = formData.get("userAddress");
		const penaltyPercentage = formData.get("penaltyPercentage");
		console.log({ userAddress, penaltyPercentage, add: addresses.TrustNetwork });
		writeContract({
			address: addresses.TrustNetwork,
			abi,
			functionName: "addPenalty",
			args: [userAddress, BigInt(penaltyPercentage)],
		});
	}

	const { isLoading: isConfirming, isSuccess: isConfirmed } =
		useWaitForTransactionReceipt({
			hash,
		});

	return (
		<div className="container">
			<div className="stack">
				<form className="set" onSubmit={submit}>
					<input name="userAddress" placeholder="User Address" required />
					<input
						name="penaltyPercentage"
						placeholder="Penalty Percentage"
						required
					/>
					<button disabled={isPending} type="submit">
						{isPending ? "Confirming..." : "Add Penalty"}
					</button>
				</form>
				{hash && <div>Transaction Hash: {hash}</div>}
				{isConfirming && <div>Waiting for confirmation...</div>}
				{isConfirmed && <div>Transaction confirmed.</div>}
				{error && <div>Error: {error.shortMessage || error.message}</div>}
			</div>
		</div>
	);
}
