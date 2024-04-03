import { create } from 'zustand'

interface InputState {
  inputValue: string | number | undefined | readonly string[]
  setInputValue: (value: string) => void
}

export const useInputStore = create<InputState>((set) => ({
  inputValue: '',
  setInputValue: (value) => set({ inputValue: value }),
}))
