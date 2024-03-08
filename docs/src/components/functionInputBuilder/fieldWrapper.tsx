import { cn } from "@/utils/cn"

interface InputBuilderFieldWrapperProps {
  name: string
  children: React.ReactNode
}

export function InputBuilderFieldWrapper(props: InputBuilderFieldWrapperProps): React.JSX.Element {
  return <div className={cn("flex bg-neutral-700 rounded-md p-2 pl-4 shadow-md")}>
    <div className="flex items-center gap-2 w-full">
      <label htmlFor={props.name} className="text-sm font-bold">{props.name}:</label>
      {props.children}
    </div>
  </div>
}