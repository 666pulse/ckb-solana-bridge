import fs from "fs";
import * as anchor from "@coral-xyz/anchor";
import {
  ParsedAccountData,
  PublicKey,
  Keypair,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";
import { Program, Idl } from "@coral-xyz/anchor";
import { TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import { SolBridge } from "./target/types/sol_bridge";

import {
  createAccount,
  getAssociatedTokenAddressSync,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
} from "@solana/spl-token";

import { publicKey } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import {
  findMetadataPda,
  mplTokenMetadata,
  findMasterEditionPda,
  MPL_TOKEN_METADATA_PROGRAM_ID,
} from "@metaplex-foundation/mpl-token-metadata";

import idl from "./target/idl/sol_bridge.json";

function loadKeypair(jsonPath: string): Keypair {
  return Keypair.fromSecretKey(
    new Uint8Array(JSON.parse(fs.readFileSync(jsonPath).toString()))
  );
}

const devrpc =
  "https://devnet.helius-rpc.com/?api-key=f09e577b-9aa2-4c98-9dc4-f118125911a4";

const provider = anchor.AnchorProvider.local(devrpc);
anchor.setProvider(provider);

const associateTokenProgram = new anchor.web3.PublicKey(
  "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
); // system definition

const addr = "GWUt7AiavrBh3qiTf1LAPYMnSwesxXiZ7pf12sXC26Tv";
const programId = new PublicKey(addr);
const program = new Program(idl as Idl, programId, provider);

const signer = provider.wallet;

const mintToken = loadKeypair(
  "./keypairs/ssSjvvxJQddW9EgBE7CbEW64iQkUPDxU7AMqicvDqfQ.json"
);

// 97eHpBUNgHyVj5pkedoDgZQxnYt4iSrMuZ93bZGws5B4
const tokenAccount = anchor.utils.token.associatedAddress({
  mint: mintToken.publicKey,
  owner: provider.publicKey,
});

console.log("tokenAccount: ", tokenAccount.toBase58());

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

async function mint(toAddr: string, num: number) {
  const toAddrKey = new PublicKey(toAddr);

  const ata = getAssociatedTokenAddressSync(mintToken.publicKey, toAddrKey);

  console.log("ata: ", ata.toBase58());

  const accountInfo = await provider.connection.getAccountInfo(ata);

  console.log("accountInfo: ", accountInfo);
  const newAccountInfo = await provider.connection.getParsedAccountInfo(ata);

  const parsed_data = (newAccountInfo.value?.data as ParsedAccountData).parsed;

  console.log("parsed: ", parsed_data);

  if (accountInfo == null) {

    // await createAccount(
    //   provider.connection,
    //   mintToken,
    //   mintToken.publicKey,
    //   toAddrKey
    //   ata,
    // );
  }

  const total = new anchor.BN(10 ** 9 * num);

  const tx = await program.methods
    .mintTokenIns(total)
    .accounts({
      mintToken: mintToken.publicKey,
      tokenAccount: tokenAccount,
      toAccount: ata.toBase58(),
      associateTokenProgram,
    })
    .signers([])
    .rpc();

  console.log("Your transaction signature", tx);
}

// async function tokenMetadata() {
//   // editionAccount
//   // https://solana.com/it/developers/guides/javascript/compressed-nfts

//   const umi = createUmi(devrpc)
//     .use(walletAdapterIdentity(signer))
//     .use(mplTokenMetadata());

//   const associatedTokenAccount = await getAssociatedTokenAddress(
//     mintToken.publicKey,
//     signer.publicKey
//   );

//   let metadataAccount = findMetadataPda(umi, {
//     mint: publicKey(mintToken.publicKey),
//   })[0];

//   let editionAccount = findMasterEditionPda(umi, {
//     mint: publicKey(mintToken.publicKey),
//   })[0];

//   const metadata = {
//     name: "ckbsol",
//     symbol: "ckbsol",
//     seller_fee_basis_points: 0,
//     suply: anchor.web3.LAMPORTS_PER_SOL * 100000,
//   };

//   try {
//     const tx = await program.methods
//       .setTokenMetadata(metadata)
//       .accounts({
//         signer: provider.publicKey,
//         mintToken: mintToken.publicKey,
//         metadataAccount,
//         masterAccount: masterEditionAccount,
//         editionAccount: editionAccount,
//         associateTokenProgram,
//         tokenProgram: TOKEN_PROGRAM_ID,
//         metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
//         rent: SYSVAR_RENT_PUBKEY,
//         systemProgram: SystemProgram.programId,
//       })
//       .signers([mintToken])
//       .rpc();
//     console.log("Your transaction signature", tx);
//   } catch (error) {
//     console.log(error);
//   }
// }

// main();

const toAddr = "";
mint(toAddr, 100);
