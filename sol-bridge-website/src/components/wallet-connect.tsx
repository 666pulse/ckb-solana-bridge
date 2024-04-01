import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import('@solana/wallet-adapter-react-ui/styles.css')

export const WalletConnect = () => {
  return (
    <div className="flex items-center justify-end w-full text-white">
      <Select>
        <SelectTrigger className="w-[165px] border-[#522da8] hover:border-gray-800 focus:ring-0 mr-3 rounded-sm">
          <SelectValue placeholder="Select a newtork" />
        </SelectTrigger>
        <SelectContent className="font-semibold rounded-lg">
          <SelectItem value="mainnet">Mainnet</SelectItem>
          <SelectItem value="devnet">Devnet</SelectItem>
          <SelectItem value="testnet">Testnet</SelectItem>
        </SelectContent>
      </Select>
      <WalletMultiButton />
    </div>
  )
}
