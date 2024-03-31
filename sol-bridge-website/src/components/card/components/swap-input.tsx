import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const SwapInput = () => {
  return (
    <form>
      <div className="grid w-full items-center gap-4">
        {/* Item--1 */}
        <div className="flex flex-col space-y-1.5">
          <div className="rounded-xl px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 flex items-center justify-between">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-500"
              >
                Swap
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-lg sm:leading-6 mt-2 font-semibold"
                placeholder="0 CKB"
              />
            </div>
            <Select>
              <SelectTrigger className="w-[95px] rounded-full text-gray-900 bg-gray-50 font-semibold">
                <SelectValue
                  placeholder={
                    <div className="flex items-center justify-start gap-2">
                      <img
                        src="/nervos-network-ckb-logo.svg"
                        alt=""
                        className="h-3 w-auto"
                      />
                      <p>CKB</p>
                    </div>
                  }
                />
              </SelectTrigger>
              <SelectContent className="font-semibold">
                <SelectItem value="ckb">
                  <div className="flex items-center justify-start gap-2">
                    <img
                      src="/nervos-network-ckb-logo.svg"
                      alt=""
                      className="h-3 w-auto"
                    />
                    <p>CKB</p>
                  </div>
                </SelectItem>
                <SelectItem value="solana">
                  <div className="flex items-center justify-start gap-2">
                    <img
                      src="/solana-sol-logo.svg"
                      alt=""
                      className="h-3 w-auto"
                    />
                    <p>SOL</p>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Item--2 */}
        <div className="flex flex-col space-y-1.5"></div>
      </div>
    </form>
  )
}
