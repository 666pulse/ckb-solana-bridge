import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'

import('@solana/wallet-adapter-react-ui/styles.css')

export const WalletConnect = () => {
  const [network, setNetwork] = useState(WalletAdapterNetwork.Testnet)

  const handleNetworkChange = (value: string) => {
    const networkValue =
      value === 'mainnet'
        ? WalletAdapterNetwork.Mainnet
        : value === 'devnet'
        ? WalletAdapterNetwork.Devnet
        : WalletAdapterNetwork.Testnet // Default to Testnet
    setNetwork(networkValue)
    console.log(networkValue)
  }

  return (
    <div className="flex items-center justify-end w-full text-white">
      <Select onValueChange={handleNetworkChange}>
        <SelectTrigger className="w-[145px] border-gray-700 focus:ring-0 mr-3 rounded-sm">
          <SelectValue placeholder={network}>
            {network.charAt(0).toUpperCase() + network.slice(1)}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="font-semibold rounded-lg">
          <SelectItem value="mainnet">Mainnet-beta</SelectItem>
          <SelectItem value="devnet">Devnet</SelectItem>
          <SelectItem value="testnet">Testnet</SelectItem>
        </SelectContent>
      </Select>
      <WalletMultiButton />
    </div>
  )
}
