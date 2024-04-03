import { ConfirmButton } from './components/confirm-button'
import { SwapDescription } from './components/swap-description'
import { SwapInput } from './components/swap-input'
import { SwapToInput } from './components/swap-to-input'

export const SwapCard = () => {
  return (
    <div className="bg-white shadow-2xl rounded-2xl w-full sm:w-[525px]">
      <div className="px-4 py-5 sm:p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-bold leading-6 text-gray-800">
            CKB - SOL Cross Chain Bridge
          </h3>
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
