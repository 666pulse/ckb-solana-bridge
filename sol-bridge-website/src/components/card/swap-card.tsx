import { SwapInput } from './components/swap-input'

export const SwapCard = () => {
  return (
    <div className="bg-white shadow-2xl sm:rounded-2xl w-[500px]">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-bold leading-6 text-gray-900 mb-6">
          CKB & SOL Swap Bridge
        </h3>

        <SwapInput />
      </div>
    </div>
  )
}
