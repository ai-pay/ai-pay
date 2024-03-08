import { cn } from "@/utils/cn"

const OutputLengthToGridColumns: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
}

interface Props {
  output: string[]
}

export function OpenAiCompatibleChatCompletionOutputDisplay({
  output,
}: Props): React.JSX.Element {

  return <div className={cn(
    "grid gap-2 items-start",
    OutputLengthToGridColumns[output.length] ?? "grid-cols-1",
  )}>
    {output.map((response, index) => {
      return <div key={index} className="flex-grow-1 gap-2 p-2 !bg-neutral-700 rounded-md shadow-md">
        {response}
      </div>
    })}
  </div>
}