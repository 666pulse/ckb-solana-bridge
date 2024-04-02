import { createContext } from 'react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'

interface NetworkContextType {
  network: WalletAdapterNetwork
  setNetwork: (network: WalletAdapterNetwork) => void
}

export const NetworkContext = createContext<NetworkContextType>({
  network: WalletAdapterNetwork.Testnet,
  setNetwork: () => {},
})
