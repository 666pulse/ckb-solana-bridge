import { create } from 'zustand'
import { ParsedAccountData } from '@solana/web3.js'

interface TokenState {
  tokenData: ParsedAccountData | null
  setTokenData: (data: ParsedAccountData) => void
}

export const useTokenStore = create<TokenState>((set) => ({
  tokenData: null,
  setTokenData: (data) => set({ tokenData: data }),
}))
