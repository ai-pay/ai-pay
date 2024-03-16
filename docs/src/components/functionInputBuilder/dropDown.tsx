import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid"
import { Fragment } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { cn } from "@/utils/cn"

interface InputBuilderDropDownProps<T> {
  value: T,
  options: readonly T[],
  setValue: (value: T) => void
}

export function InputBuilderDropDown<T extends string>({
  value,
  options,
  setValue,
}: InputBuilderDropDownProps<T>): React.JSX.Element {
  
  return (
    <Listbox value={value} onChange={setValue}>
      {({
        open, 
      }): React.JSX.Element => (
        <div className="relative w-full">
          <Listbox.Button className="relative w-full py-2 px-3 pr-10 h-10 rounded-md bg-transparent focus:!ring-1 focus:!ring-blue-400 bg-neutral-600 dark:bg-neutral-600 focus:border-none focus:outline-none shadow-md text-sm text-left">
            <span className="block truncate">{value ?? "undefined"}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-50 mt-1 max-h-56 w-full overflow-auto rounded-md bg-neutral-600 py-1 shadow-lg focus:outline-none text-sm">
              {options.map((opt) => (
                <Listbox.Option
                  key={opt ?? "undefined"}
                  className={({
                    active, 
                  }): string =>
                    cn(
                      active ? "bg-blue-600 text-white" : "text-white",
                      "relative select-none py-2 pl-3 pr-9",
                    )
                  }
                  value={opt}
                >
                  {({
                    selected, active, 
                  }): React.JSX.Element => (
                    <>
                      <div className="flex items-center">
                        <span
                          className={cn(selected ? "font-semibold" : "font-normal", "block truncate")}
                        >
                          {opt ?? "undefined"}
                        </span>
                      </div>

                      {selected ? (
                        <span
                          className={cn(
                            active ? "text-white" : "text-blue-400",
                            "absolute inset-y-0 right-0 flex items-center pr-4",
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  )
}
