import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions"
import { DropDownFieldView } from "@/components/functionInputBuilder/dropDownFieldView"
import { InputBuilderFieldWrapper } from "@/components/functionInputBuilder/fieldWrapper"
import { InputBuilderObjectWrapper } from "@/components/functionInputBuilder/objectWrapper"
import { InputBuilderTextInput } from "@/components/functionInputBuilder/textInput"

interface Props {
  messages: ChatCompletionCreateParamsBase["messages"]
  setMessages: (input: ChatCompletionCreateParamsBase["messages"]) => void
}

export function OpenAiCompatibleChatCompletionMessagesInputBuilder({
  messages,
  setMessages,
}: Props): React.JSX.Element {

  function setInput(index: number, value: ChatCompletionCreateParamsBase["messages"][number]): void {
    setMessages(messages.map((message, i) => {
      if (i === index) {
        return value
      } else {
        return message
      }
    }))
  }

  return <InputBuilderFieldWrapper name={"messages"}>
    <div className="flex flex-col flex-grow !bg-neutral-600 p-2 rounded-md gap-2">
      {messages.map((message, index) => {
        let contentText = ""

        if (typeof message.content === "string") {
          contentText = message.content
        }

        if (typeof message.content === "object") {
          contentText = JSON.stringify(message.content)
        }

        return <InputBuilderObjectWrapper 
          onDelete={messages.length <= 1 ? undefined : (): void => {
            setMessages(messages.filter((_, i) => i !== index))
          }}
          key={index} 
        >
          <DropDownFieldView 
            field={"role"} 
            object={message} 
            options={["system", "user", "assistant"]} 
            setInput={(messages): void => {
              setInput(index, messages)
            }} />

          <InputBuilderFieldWrapper name={"content"}>
            <InputBuilderTextInput 
              placeholder={"Input message . . ."} 
              value={contentText}
              setValue={(text): void => {
                setInput(index, {
                  ...message,
                  content: text,
                })
              }} />
          </InputBuilderFieldWrapper>
        </InputBuilderObjectWrapper>
      })}

      <button 
        onClick={(): void => {
          setMessages([...messages, {
            role: "user",
            content: "",
          }])
        }}
        className="bg-neutral-700 h-10 rounded-md shadow-md !hover:bg-red-800">
        Add Message
      </button>
    </div>
  </InputBuilderFieldWrapper>

}