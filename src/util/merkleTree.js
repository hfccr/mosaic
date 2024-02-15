import { sha256 } from "viem";
import { MerkleTree } from 'merkletreejs';

export function computeMerkleRoot(connections) {
    const leaves = connections.map(x => sha256(x))
    const tree = new MerkleTree(leaves, sha256)
    const root = tree.getRoot()
    return root;
}