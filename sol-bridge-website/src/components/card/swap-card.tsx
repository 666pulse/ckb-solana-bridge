import { Badge } from '../ui/badge'
import { ConfirmButton } from './components/confirm-button'
import { SwapDescription } from './components/swap-description'
import { SwapInput } from './components/swap-input'
import { SwapToInput } from './components/swap-to-input'

export const SwapCard = () => {
  return (
    <div className="bg-white shadow-2xl rounded-2xl w-full sm:w-[525px]">
      <div className="px-4 py-5 sm:p-6">
        <div className="mb-6 flex items-center justify-between">
          <span className="text-lg font-bold leading-6 text-gray-800 flex items-center justify-start">
            <h3 className="mr-2">SOL to CKB Cross Chain Bridge</h3>
            <p className="flex items-center justify-start gap-1">
              <Badge className="rounded-full bg-teal-50 border-teal-300 text-teal-600 hover:bg-teal-100 transition-all">
                SOL
              </Badge>
              <Badge className="rounded-full bg-blue-50 border-blue-300 text-blue-600 hover:bg-blue-100 transition-all">
                CKB
              </Badge>
            </p>
          </span>
        </div>

        <div>
          <SwapInput />
          <SwapDescription />
          <SwapToInput />
          <ConfirmButton />
        </div>
      </div>
    </div>
  )
}
