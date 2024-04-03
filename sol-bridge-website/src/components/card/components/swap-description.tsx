// import {
//   CurrencyDollarIcon,
//   MinusCircleIcon,
// } from '@heroicons/react/24/outline'

import { Connection, PublicKey, ParsedAccountData } from '@solana/web3.js'

// import { getAssociatedTokenAddressSync } from '@solana/spl-token'
import { useEffect, useState } from 'react'
import { useAddressStore } from '@/store/useAddressStore'
import { ArrowDownIcon } from '@heroicons/react/24/outline'
import { getAssociatedTokenAddressSync } from '@solana/spl-token'

export const SwapDescription = () => {
  const [balance, setBalance] = useState('0')
  const { address } = useAddressStore()

  const handleGetBalance = async () => {
    if (address) {
      const connection = new Connection(
        'https://devnet.helius-rpc.com/?api-key=ecaea1f0-ab87-4d61-bdef-de0dffd6f7cc'
      )
      const accountPublicKey = new PublicKey(address)
      const mintAccountPublickey = new PublicKey(
        'ssSjvvxJQddW9EgBE7CbEW64iQkUPDxU7AMqicvDqfQ'
      )
      const ata = getAssociatedTokenAddressSync(
        mintAccountPublickey,
        accountPublicKey
      )
      const parsedAccountInfo = await connection.getParsedAccountInfo(ata)

      const balanceData = parsedAccountInfo.value?.data as ParsedAccountData
      if (balanceData?.parsed.info.tokenAmount.uiAmountString) {
        setBalance(balanceData.parsed.info.tokenAmount.uiAmountString)
      } else {
        setBalance('0')
      }

      // const connection = new Connection(
      //   'https://devnet.helius-rpc.com/?api-key=ecaea1f0-ab87-4d61-bdef-de0dffd6f7cc'
      // )
      // const accountPublicKey = new PublicKey(address)
      // const balance = await connection.getBalance(accountPublicKey)

      // if (balance) {
      //   setBalance((balance / LAMPORTS_PER_SOL).toFixed(4))
      // }
    }
  }

  useEffect(() => {
    handleGetBalance()
  }, [address])

  return (
    <div className="text-sm">
      <span className="text-gray-500">
        You have <span className="text-gray-800 underline">{balance} </span>
        <span className="text-gray-800 underline">SCKB</span> available balance
      </span>
      <div className="mt-3 mx-0.5 flex flex-col">
        <div className="flex items-center justify-center">
          <ArrowDownIcon className="h-8 text-gray-500 rounded bg-gray-50 w-fit p-2 shadow-sm border border-gray-100" />
        </div>
      </div>
    </div>
  )
}
