import { BN } from "bn.js";
import * as anchor from "@coral-xyz/anchor";
import { Idl, Program } from "@coral-xyz/anchor";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import {
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";

import {
  Connection,
  PublicKey,
  SYSVAR_RENT_PUBKEY,
  SystemProgram,
} from "@solana/web3.js";

import idl from "../../../idl/cross_bridge.json";

import { useInputStore } from "@/store/useInputStore";

export const ConfirmButton = () => {
  const sleep = (delay: number) =>
    new Promise((resolve) => setTimeout(resolve, delay));

  const devRpc =
    "https://devnet.helius-rpc.com/?api-key=ecaea1f0-ab87-4d61-bdef-de0dffd6f7cc";

  const bridgeProgramId = new PublicKey(
    "B2bYAPkQwmsuAnpyx4Efe3YR1FwKw4ApdxBW5rSSh7NQ",
  );

  const mintAddress = new PublicKey(
    "ssSjvvxJQddW9EgBE7CbEW64iQkUPDxU7AMqicvDqfQ",
  );

  const anchorWallet = useAnchorWallet();

  const getProvider = (rpc: string) => {
    const connection = new Connection(rpc);
    const provider = new anchor.AnchorProvider(
      connection,
      anchorWallet as anchor.Wallet,
      {},
    );

    return provider;
  };

  const getProgram = (rpc: string, programId: PublicKey) => {
    const connection = new Connection(rpc);
    const provider = new anchor.AnchorProvider(
      connection,
      anchorWallet as anchor.Wallet,
      {},
    );

    anchor.setProvider(provider);

    const bridgeProgram = new Program(idl as Idl, programId);

    return bridgeProgram;
  };

  const { inputValue } = useInputStore()

  const handleConfirm = async () => {

    const provider = getProvider(devRpc);

    const bridgeProgram = getProgram(devRpc, bridgeProgramId);
    const payer = anchorWallet;

    const associatedTokenAccount = await getAssociatedTokenAddress(
      mintAddress,
      payer!.publicKey,
    );

    const acc = anchor.web3.Keypair.generate();
    const escrowWalletAssociateAccount = await getAssociatedTokenAddress(
      mintAddress,
      acc.publicKey,
    );

    const mint_tx = new anchor.web3.Transaction().add(
      // Create the ATA account that is associated with our To wallet
      createAssociatedTokenAccountInstruction(
        payer!.publicKey,
        escrowWalletAssociateAccount,
        acc.publicKey,
        mintAddress,
      ),
    );

    await provider.sendAndConfirm(mint_tx, []);

    await sleep(1000 * 5);

    console.log(associatedTokenAccount.toString());
    console.log(escrowWalletAssociateAccount.toString());

    // Executes our transfer smart contract
    const [statePubKey, stateBump] =
      anchor.web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from("state"),
          payer!.publicKey.toBuffer(),
          mintAddress.toBuffer(),
        ],
        bridgeProgramId,
      );

    const [walletPubKey, walletBump] =
      anchor.web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from("wallet"),
          payer!.publicKey.toBuffer(),
          mintAddress.toBuffer(),
        ],
        bridgeProgramId,
      );

    console.log(statePubKey.toString(), walletPubKey.toString());

    let data;
    try {
      data = await bridgeProgram.account.state.fetch(statePubKey);
    } catch (err) {
      //
    }

    await sleep(1000 * 5);

    if (!data) {
      console.log("init account");
      const init = await bridgeProgram.methods
        .init()
        .accounts({
          stateAccount: statePubKey,
          escrowWalletAssociateAccount: walletPubKey,
          user: provider.wallet.publicKey,
          mint: mintAddress,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .rpc();

      console.log("init tx: ", init);
      await sleep(1000 * 30);
    }

    const state0 = await bridgeProgram.account.state.fetch(statePubKey);

    console.log();
    console.log("balance before deposit: ", state0);
    console.log();

    console.log("payer: ", payer!.publicKey.toBase58());

    console.log("inputValue: ", inputValue);

    const num = parseInt(inputValue as string)  * 10e8

    try {
      const tx = await bridgeProgram.methods
        .deposit(new BN(num))
        .accounts({
          stateAccount: statePubKey,
          escrowWalletAssociateAccount: walletPubKey,
          user: payer!.publicKey,
          mint: mintAddress,
          userAssociatedAccount: associatedTokenAccount,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      console.log("Deposit tx: ", tx);
    } catch (err) {
      console.error("deposit err: ", err);
    }

    await sleep(1000 * 30);

    const state1 = await bridgeProgram.account.state.fetch(statePubKey);
    console.log("balance after deposit: ", state1.amount!.toString());
  };

  return (
    <button
      type="button"
      className="px-4.5 mt-12 w-full rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={handleConfirm}
    >
      Confirm
    </button>
  );
};
