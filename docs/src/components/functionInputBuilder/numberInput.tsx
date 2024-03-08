
interface Props {
  placeholder: string
  value: number | undefined | null
  optional?: boolean
  min?: number
  max?: number
  setValue: (value: number | undefined) => void
}

export function InputBuilderNumberInput({
  placeholder,
  value,
  optional,
  min = 1,
  max,
  setValue,
}: Props): React.JSX.Element {
  return <>
    <input 
      className="flex-grow py-2 px-3 h-10 rounded-md bg-transparent focus:!ring-1 focus:!ring-blue-400 !bg-neutral-600 focus:border-none focus:outline-none shadow-md text-sm"
      type="number"
      min={min}
      max={max}
      placeholder={placeholder} 
      value={value ?? ""}
      onChange={(e): void => {
        if (e.target.value) {
          setValue(Math.max(Math.min(Number(e.target.value), max ?? Number.POSITIVE_INFINITY), min))
        }
      }}
    />
    {optional && !!value && <button 
      className="text-xs text-neutral-500 p-1 h-full rounded-md hover:bg-neutral-600"
      onClick={(): void => setValue(undefined)}
    >
      Delete
    </button>}
  </>
}