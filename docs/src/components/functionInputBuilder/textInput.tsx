
interface InputBuilderTextInputProps {
  placeholder: string
  value: string
  setValue: (value: string) => void
}

export function InputBuilderTextInput({
  placeholder,
  value,
  setValue,
}: InputBuilderTextInputProps): React.JSX.Element {
  return <input 
    className="flex-grow py-2 px-3 h-10 rounded-md bg-transparent focus:!ring-1 focus:!ring-blue-400 bg-neutral-600 dark:bg-neutral-600 focus:border-none focus:outline-none shadow-md text-sm"
    type="text" 
    placeholder={placeholder} 
    value={value}
    onChange={(e): void => setValue(e.target.value)}
  />
}