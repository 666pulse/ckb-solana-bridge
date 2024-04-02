import { create } from 'zustand'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'

import { NetworkState } from '@/common/interface'

export const useNetworkStore = create<NetworkState>((set) => ({
  network: WalletAdapterNetwork.Testnet,
  setNetwork: (network) => set({ network }),
}))
