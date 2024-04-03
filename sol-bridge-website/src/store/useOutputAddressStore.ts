import { create } from 'zustand'

interface OuputAddressState {
  outputAddress: string | null
  setOutputAddress: (newAddress: string) => void
}

export const useOutputAddressStore = create<OuputAddressState>((set) => ({
  outputAddress: null,
  setOutputAddress: (newAddress) => set({ outputAddress: newAddress }),
}))
