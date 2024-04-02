import { create } from 'zustand'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'

interface NetworkState {
  network: WalletAdapterNetwork
  setNetwork: (network: WalletAdapterNetwork) => void
}

export const useNetworkStore = create<NetworkState>((set) => ({
  network: WalletAdapterNetwork.Testnet,
  setNetwork: (network) => set({ network }),
}))
