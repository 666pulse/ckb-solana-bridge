import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useNetworkStore } from '@/store/useNetworkStore'
import { useWallet } from '@solana/wallet-adapter-react'
import { useAddressStore } from '@/store/useAddressStore'
import { useEffect } from 'react'

import('@solana/wallet-adapter-react-ui/styles.css')

export const WalletConnect = () => {
  const network = useNetworkStore((state) => state.network)
  const setNetwork = useNetworkStore((state) => state.setNetwork)
  const { setAddress } = useAddressStore()
  const wallet = useWallet()

  const handleNetworkChange = (value: string) => {
    const networkValue =
      value === 'mainnet'
        ? WalletAdapterNetwork.Mainnet
        : value === 'devnet'
        ? WalletAdapterNetwork.Devnet
        : WalletAdapterNetwork.Testnet
    setNetwork(networkValue)
  }

  useEffect(() => {
    if (wallet.connected && wallet.publicKey) {
      console.log(wallet.publicKey.toBase58())
      setAddress(wallet.publicKey.toBase58())
    }
  }, [wallet, setAddress])

  return (
    <div className="flex items-center justify-end w-full text-white">
      <Select onValueChange={handleNetworkChange}>
        <SelectTrigger className="w-[145px] h-12 border-gray-700 focus:ring-0 mr-3 rounded-sm">
          <SelectValue
            placeholder={network.charAt(0).toUpperCase() + network.slice(1)}
          >
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
