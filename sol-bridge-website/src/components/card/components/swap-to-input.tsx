import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const SwapToInput = () => {
  return (
    <form className="mt-3">
      <div className="grid w-full items-center gap-4">
        {/* Item--1 */}
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
                className="border-0 p-0 text-indigo-600 placeholder:text-indigo-400 focus:outline-none sm:text-lg sm:leading-6 mt-2 font-semibold bg-gray-50 focus-visible:ring-0 shadow-none"
                placeholder="0 CKB"
              />
            </div>
            <Select>
              <SelectTrigger className="w-[105px] rounded-full text-gray-800 bg-white font-medium">
                <SelectValue
                  placeholder={
                    <div className="flex items-center justify-start gap-2">
                      <img
                        src="/nervos-network-ckb-logo.svg"
                        alt=""
                        className="h-3 w-auto"
                      />
                      <p>SCKB</p>
                    </div>
                  }
                />
              </SelectTrigger>
              <SelectContent className="font-medium">
                <SelectItem value="ckb">
                  <div className="flex items-center justify-start gap-2.5">
                    <img
                      src="/nervos-network-ckb-logo.svg"
                      alt=""
                      className="h-3 w-auto"
                    />
                    <p>SCKB</p>
                  </div>
                </SelectItem>
                {/* <SelectItem value="solana">
                  <div className="flex items-center justify-start gap-2">
                    <img
                      src="/solana-sol-logo.svg"
                      alt=""
                      className="h-3 w-auto"
                    />
                    <p>SOL</p>
                  </div>
                </SelectItem> */}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </form>
  )
}
