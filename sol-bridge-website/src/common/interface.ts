import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'

export interface NetworkState {
  network: WalletAdapterNetwork
  setNetwork: (network: WalletAdapterNetwork) => void
}
