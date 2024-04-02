import {
  CurrencyDollarIcon,
  MinusCircleIcon,
} from '@heroicons/react/24/outline'

export const SwapDescription = () => {
  return (
    <div className="text-sm">
      <span className="text-gray-500">
        You have <span className="text-gray-800 underline">13,888 </span>
        <span className="text-gray-800 underline">SOL</span> available balance
      </span>
      <div className="mt-3 mx-0.5 flex flex-col gap-1">
        <div className="flex items-center justify-between font-medium">
          <span className="flex items-center justify-start gap-1 text-gray-800">
            <span>
              <MinusCircleIcon className="h-4 w-auto text-gray-500" />
            </span>
            16.64 USD
          </span>
          <span className="text-gray-500">Gas fee</span>
        </div>
        <div className="flex items-center justify-between font-medium">
          <span className="flex items-center justify-start gap-1 text-gray-800">
            <span>
              <CurrencyDollarIcon className="h-4 w-auto text-gray-500" />
            </span>
            1 SOL = 10,588.23 CKB
          </span>
          <span className="text-gray-500">Live rate</span>
        </div>
      </div>
    </div>
  )
}
