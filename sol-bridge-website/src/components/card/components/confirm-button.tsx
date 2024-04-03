import idl from '../../../idl/cross_bridge.json'
import { Idl, Program } from '@coral-xyz/anchor'
import { useAnchorWallet } from '@solana/wallet-adapter-react'

import { Connection, PublicKey } from '@solana/web3.js'
import * as anchor from '@coral-xyz/anchor'

export const ConfirmButton = () => {
  const anchorWallet = useAnchorWallet()

  const handleConfirm = () => {
    const devRpc =
      'https://devnet.helius-rpc.com/?api-key=ecaea1f0-ab87-4d61-bdef-de0dffd6f7cc'
    const connection = new Connection(devRpc)
    const provider = new anchor.AnchorProvider(
      connection,
      anchorWallet as anchor.Wallet,
      {}
    )
    anchor.setProvider(provider)
    const programId = new PublicKey(
      '28MEkUJbffntPxM2WFu6mSaKnomnsPg1KHWgCKLukGNb'
    )
    const program = new Program(idl as Idl, programId)

    console.log(program)
  }

  return (
    <button
      type="button"
      className="rounded-lg bg-indigo-600 px-4.5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full transition-all mt-12"
      onClick={handleConfirm}
    >
      Confirm
    </button>
  )
}
