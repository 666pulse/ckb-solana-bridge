import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { useOutputAddressStore } from '@/store/useOutputAddressStore'

export const SwapToInput = () => {
  const { setOutputAddress } = useOutputAddressStore()

  return (
    <form className="mt-3">
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <div className="rounded-xl px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 flex items-center justify-between overflow-hidden bg-gray-50">
            <div>
              <Label
                htmlFor="name"
                className="block text-sm font-medium text-gray-500"
              >
                To
              </Label>
              <Input
                type="text"
                name="name"
                id="name"
                className="border-0 p-0 text-indigo-600 placeholder:text-indigo-600 focus:outline-none sm:text-lg sm:leading-6 mt-2 font-semibold bg-gray-50 focus-visible:ring-0 shadow-none w-[315px] overflow-hidden whitespace-nowrap truncate cursor-not-allowed"
                placeholder="ckt1qy...5qjvz2"
                onChange={(e) => setOutputAddress(e.target.value)}
                readOnly
              />
            </div>
            <div className="w-full h-9 rounded-full text-gray-800 bg-white font-medium flex items-center justify-start px-3 text-sm gap-2 border shadow-sm">
              <img
                src="/nervos-network-ckb-logo.svg"
                alt=""
                className="h-3 w-auto"
              />
              <p>CKB Address</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
