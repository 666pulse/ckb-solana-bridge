import fs from "fs";
import * as anchor from "@coral-xyz/anchor";
import { PublicKey, Keypair } from "@solana/web3.js";
import { Program, Idl } from "@coral-xyz/anchor";
import { createAccount } from "@solana/spl-token";
import { TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import { SolBridge } from "./target/types/sol_bridge";

import idl from "./target/idl/sol_bridge.json";

function loadKeypair(jsonPath: string): Keypair {
  return Keypair.fromSecretKey(
    new Uint8Array(JSON.parse(fs.readFileSync(jsonPath).toString()))
  );
}

const devrpc =
  "https://devnet.helius-rpc.com/?api-key=f09e577b-9aa2-4c98-9dc4-f118125911a4";

const rrr = "https://api.devnet.solana.com/";

const solrpc = "https://rpc.ankr.com/solana_devnet";
const provider = anchor.AnchorProvider.local(solrpc);
anchor.setProvider(provider);

const associateTokenProgram = new anchor.web3.PublicKey(
  "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
); // system definition

const addr = "cktXMgKUtBmgrqrz2TCPPj6RGi64oMb6SeiByopvG4L";
const programId = new PublicKey(addr);
const program = new Program(idl as Idl, programId, provider);

const mintToken = loadKeypair(
  "./keypairs/ssSjvvxJQddW9EgBE7CbEW64iQkUPDxU7AMqicvDqfQ.json"
);

const tokenAccount = anchor.utils.token.associatedAddress({
  mint: mintToken.publicKey,
  owner: provider.publicKey,
});

async function main() {
  try {
    const tx = await program.methods
      .createToken(9, new anchor.BN(10 ** 9 * 10000))
      .accounts({
        mintToken: mintToken.publicKey,
        tokenAccount: tokenAccount,
        associateTokenProgram,
      })
      .signers([mintToken])
      .rpc();
    console.log("Your transaction signature", tx);
  } catch (error) {
    console.log(error);
  }
}

main();
