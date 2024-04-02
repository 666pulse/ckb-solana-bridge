import { create } from 'zustand'

interface AddressState {
  address: string | null
  setAddress: (newAddress: string) => void
}

export const useAddressStore = create<AddressState>((set) => ({
  address: null,
  setAddress: (newAddress) => set({ address: newAddress }),
}))
