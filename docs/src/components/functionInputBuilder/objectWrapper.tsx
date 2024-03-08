import { TrashIcon } from "@heroicons/react/20/solid"
import { cn } from "@/utils/cn"

interface InputBuilderObjectWrapperProps {
  title?: string
  onDelete?: () => void
  children: React.ReactNode | React.ReactNode[]
}

export function InputBuilderObjectWrapper(props: InputBuilderObjectWrapperProps): React.JSX.Element {
  return <div className="flex flex-col relative items-start w-full p-3 gap-2 bg-neutral-800 rounded-lg">
    {props.title && <h3 className="text-lg font-bold">{props.title}</h3>}
    {props.onDelete && <button onClick={props.onDelete} className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 text-red-500 z-10 hover:bg-red-100 transition-colors p-1 rounded-md"><TrashIcon className="h-4 w-4"/></button>}
    <div className={cn("flex flex-col gap-2 w-full")}>
      {props.children}
    </div>
  </div>
}