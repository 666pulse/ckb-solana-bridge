import {
  CurrencyDollarIcon,
  MinusCircleIcon,
} from '@heroicons/react/24/outline'

import { Connection, PublicKey, ParsedAccountData } from '@solana/web3.js'

import { getAssociatedTokenAddressSync } from '@solana/spl-token'
import { useEffect, useState } from 'react'
import { useAddressStore } from '@/store/useAddressStore'

export const SwapDescription = () => {
  const [balance, setBalance] = useState('0')
  const { address } = useAddressStore()

  const handleGetBalance = async () => {
    if (address) {
      const connection = new Connection('https://api.devnet.solana.com')
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
      if (balanceData && balanceData.parsed.info.tokenAmount.uiAmountString) {
        console.log(balanceData.parsed.info.tokenAmount.uiAmountString)
        setBalance(balanceData.parsed.info.tokenAmount.uiAmountString)
      } else {
        setBalance('0')
      }
    }
  }

  useEffect(() => {
    handleGetBalance()
  }, [])

  return (
    <div className="text-sm">
      <span className="text-gray-500">
        You have <span className="text-gray-800 underline">{balance} </span>
        <span className="text-gray-800 underline">SOL</span> available balance
      </span>
      <div className="mt-3 mx-0.5 flex flex-col gap-1">
        <div className="flex items-center justify-between font-medium">
          <span className="flex items-center justify-start gap-1 text-gray-800">
            <span>
              <MinusCircleIcon className="h-4 w-auto text-gray-500" />
            </span>
            16.64 USD
          </span>
          <span className="text-gray-500">Gas fee</span>
        </div>
        <div className="flex items-center justify-between font-medium">
          <span className="flex items-center justify-start gap-1 text-gray-800">
            <span>
              <CurrencyDollarIcon className="h-4 w-auto text-gray-500" />
            </span>
            1 SOL = 10,588.23 CKB
          </span>
          <span className="text-gray-500">Live rate</span>
        </div>
      </div>
    </div>
  )
}
