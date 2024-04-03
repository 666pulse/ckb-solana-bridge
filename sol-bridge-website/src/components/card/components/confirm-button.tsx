import { BN } from 'bn.js'
import * as anchor from '@coral-xyz/anchor'
import { Idl, Program } from '@coral-xyz/anchor'
import { useAnchorWallet } from '@solana/wallet-adapter-react'
import {
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
} from '@solana/spl-token'

import {
  Connection,
  PublicKey,
  SYSVAR_RENT_PUBKEY,
  SystemProgram,
} from '@solana/web3.js'

import idl from '../../../idl/cross_bridge.json'

import { useInputStore } from '@/store/useInputStore'

export const ConfirmButton = () => {
  const devRpc =
    'https://devnet.helius-rpc.com/?api-key=ecaea1f0-ab87-4d61-bdef-de0dffd6f7cc'
  const bridgeProgramId = new PublicKey(
    'B2bYAPkQwmsuAnpyx4Efe3YR1FwKw4ApdxBW5rSSh7NQ'
  )
  const mintAddress = new PublicKey(
    'ssSjvvxJQddW9EgBE7CbEW64iQkUPDxU7AMqicvDqfQ'
  )
  const anchorWallet = useAnchorWallet()
  const { inputValue, setInputValue } = useInputStore()
  const connection = new Connection(devRpc)

  const getProvider = () => {
    const provider = new anchor.AnchorProvider(
      connection,
      anchorWallet as anchor.Wallet,
      {}
    )

    return provider
  }

  const getProgram = (programId: PublicKey) => {
    const provider = new anchor.AnchorProvider(
      connection,
      anchorWallet as anchor.Wallet,
      {}
    )

    anchor.setProvider(provider)

    const bridgeProgram = new Program(idl as Idl, programId)

    return bridgeProgram
  }

  // ** Old version
  // const handleConfirm = async () => {
  //   const provider = getProvider()

  //   const bridgeProgram = getProgram(bridgeProgramId)
  //   const payer = anchorWallet

  //   const associatedTokenAccount = await getAssociatedTokenAddress(
  //     mintAddress,
  //     payer!.publicKey
  //   )

  //   const acc = anchor.web3.Keypair.generate()
  //   const escrowWalletAssociateAccount = await getAssociatedTokenAddress(
  //     mintAddress,
  //     acc.publicKey
  //   )

  //   const mintTx = new anchor.web3.Transaction().add(
  //     createAssociatedTokenAccountInstruction(
  //       payer!.publicKey,
  //       escrowWalletAssociateAccount,
  //       acc.publicKey,
  //       mintAddress
  //     )
  //   )

  //   await provider.sendAndConfirm(mintTx, [])

  //   await sleep(1000 * 5)

  //   console.log(associatedTokenAccount.toString())
  //   console.log(escrowWalletAssociateAccount.toString())

  //   // Executes our transfer smart contract
  //   const [statePubKey] = anchor.web3.PublicKey.findProgramAddressSync(
  //     [
  //       Buffer.from('state'),
  //       payer!.publicKey.toBuffer(),
  //       mintAddress.toBuffer(),
  //     ],
  //     bridgeProgramId
  //   )

  //   const [walletPubKey] = anchor.web3.PublicKey.findProgramAddressSync(
  //     [
  //       Buffer.from('wallet'),
  //       payer!.publicKey.toBuffer(),
  //       mintAddress.toBuffer(),
  //     ],
  //     bridgeProgramId
  //   )

  //   console.log(statePubKey.toString(), walletPubKey.toString())

  //   let data
  //   try {
  //     data = await bridgeProgram.account.state.fetch(statePubKey)
  //   } catch (err) {
  //     console.log(err)
  //   }

  //   await sleep(1000 * 5)

  //   if (!data) {
  //     console.log('init account')
  //     const init = await bridgeProgram.methods
  //       .init()
  //       .accounts({
  //         stateAccount: statePubKey,
  //         escrowWalletAssociateAccount: walletPubKey,
  //         user: provider.wallet.publicKey,
  //         mint: mintAddress,
  //         tokenProgram: TOKEN_PROGRAM_ID,
  //         systemProgram: SystemProgram.programId,
  //         rent: SYSVAR_RENT_PUBKEY,
  //       })
  //       .rpc()

  //     console.log('init tx: ', init)
  //     await sleep(1000 * 30)
  //   }

  //   const state0 = await bridgeProgram.account.state.fetch(statePubKey)

  //   console.log()
  //   console.log('balance before deposit: ', state0)
  //   console.log()

  //   console.log('payer: ', payer!.publicKey.toBase58())

  //   console.log('inputValue: ', inputValue)

  //   const num = parseInt(inputValue as string) * 10e8

  //   try {
  //     const tx = await bridgeProgram.methods
  //       .deposit(new BN(num))
  //       .accounts({
  //         stateAccount: statePubKey,
  //         escrowWalletAssociateAccount: walletPubKey,
  //         user: payer!.publicKey,
  //         mint: mintAddress,
  //         userAssociatedAccount: associatedTokenAccount,
  //         tokenProgram: TOKEN_PROGRAM_ID,
  //         systemProgram: SystemProgram.programId,
  //       })
  //       .rpc()

  //     console.log('Deposit tx: ', tx)
  //   } catch (err) {
  //     console.error('deposit err: ', err)
  //   }

  //   await sleep(1000 * 30)

  //   const state1 = await bridgeProgram.account.state.fetch(statePubKey)
  //   setInputValue('0')
  //   console.log('balance after deposit: ', state1.amount!.toString())
  // }

  const handleConfirm = async () => {
    try {
      const provider = getProvider()
      const bridgeProgram = getProgram(bridgeProgramId)

      if (!anchorWallet) {
        console.log("Couldn't find anchor wallet")
        return
      }
      const payer = anchorWallet.publicKey

      const associatedTokenAccount = await getAssociatedTokenAddress(
        mintAddress,
        payer
      )

      const acc = anchor.web3.Keypair.generate()

      const escrowWalletAssociateAccount = await getAssociatedTokenAddress(
        mintAddress,
        acc.publicKey
      )

      const mintTx = new anchor.web3.Transaction().add(
        createAssociatedTokenAccountInstruction(
          payer,
          escrowWalletAssociateAccount,
          acc.publicKey,
          mintAddress
        )
      )

      await provider.sendAndConfirm(mintTx, [])

      const [statePubKey] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from('state'), payer.toBuffer(), mintAddress.toBuffer()],
        bridgeProgramId
      )

      const [walletPubKey] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from('wallet'), payer.toBuffer(), mintAddress.toBuffer()],
        bridgeProgramId
      )

      let data

      try {
        data = await bridgeProgram.account.state.fetch(statePubKey)
      } catch (error) {
        console.log('State account does not exist, initializing...')
      }

      if (!data) {
        await bridgeProgram.methods
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
          .rpc()
      }

      const num = new BN(parseInt(inputValue as string) * 10e8)
      const txSignature = await bridgeProgram.methods
        .deposit(new BN(num))
        .accounts({
          stateAccount: statePubKey,
          escrowWalletAssociateAccount: walletPubKey,
          user: payer,
          mint: mintAddress,
          userAssociatedAccount: associatedTokenAccount,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
        })
        .rpc()

      console.log('Deposit transaction:', txSignature)
    } catch (error) {
      console.error('Error during transaction or setup:', error)
    } finally {
      setInputValue('0') // 重置 input 值或进行其他清理工作
    }
  }

  return (
    <button
      type="button"
      className="px-4.5 mt-12 w-full rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={handleConfirm}
    >
      Confirm
    </button>
  )
}
