import { InputBuilderDropDown } from "@/components/functionInputBuilder/dropDown"
import { InputBuilderFieldWrapper } from "@/components/functionInputBuilder/fieldWrapper"

interface DropDownFieldViewProps<T extends object, F extends keyof T> {
  field: F
  showField?: string
  optional?: boolean
  object: T
  options: readonly T[F][]
  valueToString?: (value: T[F] | undefined) => string
  stringToValue?: (value: string | undefined) => T[F]
  setInput: (input: T) => void
}
  
export function DropDownFieldView<T extends object, F extends keyof T>({
  field,
  showField,
  optional = false,
  object,
  options,
  valueToString,
  stringToValue,
  setInput,
}: DropDownFieldViewProps<T, F>): React.JSX.Element {
  return <InputBuilderFieldWrapper name={(showField ? showField : (field as string)) + (optional ? "?" : "")}>
    <InputBuilderDropDown
      value={valueToString ? valueToString(object[field]) : object[field] as string}
      options={valueToString ? options.map(valueToString) : options as readonly string[]}
      setValue={function (value: string): void {
        setInput({
          ...object,
          [field]: stringToValue ? stringToValue(value) : value,
        })
      } } />
  </InputBuilderFieldWrapper>
}
