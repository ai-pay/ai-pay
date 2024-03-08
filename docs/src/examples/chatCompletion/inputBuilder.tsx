import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions"
import { DropDownFieldView } from "@/components/functionInputBuilder/dropDownFieldView"
import { InputBuilderFieldWrapper } from "@/components/functionInputBuilder/fieldWrapper"
import { InputBuilderNumberInput } from "@/components/functionInputBuilder/numberInput"
import { InputBuilderObjectWrapper } from "@/components/functionInputBuilder/objectWrapper"
import { OpenAiCompatibleChatCompletionMessagesInputBuilder } from "./messagesInputBuilder"
import { chatCompletionModels } from "ai-pay"
import { useEffect, useState } from "react"

interface Props {
  input: ChatCompletionCreateParamsBase
  setInput: (input: ChatCompletionCreateParamsBase) => void
}

export function OpenAiCompatibleChatCompletionInputBuilder({
  input,
  setInput,
}: Props): React.JSX.Element {
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false)

  useEffect(() => {
    setInput({
      ...input,
      seed: undefined,
      response_format: undefined,
      max_tokens: undefined,
      frequency_penalty: undefined,
      presence_penalty: undefined,
      temperature: undefined,
      top_p: undefined,
    })
  }, [showAdvanced])

  useEffect(() => {
    if (input.stream) {
      setInput({
        ...input,
        n: undefined,
      })
    }
  }, [input.stream])

  function updateField<K extends keyof ChatCompletionCreateParamsBase>(field: K, value: ChatCompletionCreateParamsBase[K]): void {
    setInput({
      ...input,
      [field]: value,
    })
  }

  return <InputBuilderObjectWrapper title={"request: EmbeddingCreateParams"}>
    <OpenAiCompatibleChatCompletionMessagesInputBuilder 
      messages={input.messages} 
      setMessages={(messages): void => {
        updateField("messages", messages)
      }} />

    <DropDownFieldView 
      field={"model"} 
      object={input} 
      options={chatCompletionModels} 
      setInput={setInput} />

    <DropDownFieldView 
      field={"stream"} 
      optional
      object={input} 
      options={[undefined, true, false]} 
      valueToString={(value): string => value === undefined || value === null ? "undefined" : value.toString()} 
      stringToValue={(value): boolean | undefined => value === "undefined" ? undefined : value === "true"}
      setInput={setInput} />

    {!input.stream && 
    <DropDownFieldView 
      field={"n"} 
      optional
      object={input} 
      options={[undefined, 1, 2, 3]} 
      setInput={setInput} />
    }

    <button 
      className="ml-auto hover:bg-neutral-700 transition-colors duration-200 rounded-md px-2 py-1 bg-neutral-800 text-white font-bold text-sm"
      onClick={(): void => { setShowAdvanced(!showAdvanced) }}
    >
      {showAdvanced ? "Hide" : "Show"} Advanced
    </button>

    {showAdvanced && <>
      <InputBuilderFieldWrapper name={"seed?"}>
        <InputBuilderNumberInput
          placeholder={"Enter the seed . . ."}
          value={input.seed}
          optional
          setValue={function (value): void {
            updateField("seed", value)
          } } />
      </InputBuilderFieldWrapper>

      <InputBuilderFieldWrapper name={"response_format?"}>
        <InputBuilderObjectWrapper>
          <DropDownFieldView 
            field="response_format"
            showField="type"
            optional
            object={input} 
            options={[undefined, {
              type: "text",
            }, {
              type: "json_object",
            }]}
            valueToString={(value): string => !value || !value.type ? "undefined" : value.type}
            stringToValue={(value): typeof input["response_format"] => value === "undefined" ? undefined : {
              type: value,
            } as typeof input["response_format"]}
            setInput={setInput} />
        </InputBuilderObjectWrapper>
      </InputBuilderFieldWrapper>

      <InputBuilderFieldWrapper name={"max_tokens?"}>
        <InputBuilderNumberInput
          placeholder={"Enter max tokens . . ."}
          value={input.max_tokens}
          min={1}
          optional
          setValue={function (value): void {
            updateField("max_tokens", value)
          } } />
      </InputBuilderFieldWrapper>

      <InputBuilderFieldWrapper name={"frequency_penalty?"}>
        <InputBuilderNumberInput
          placeholder={"Enter frequency penalty . . ."}
          value={input.frequency_penalty}
          min={-2}
          max={2}
          optional
          setValue={function (value): void {
            updateField("frequency_penalty", value)
          } } />
      </InputBuilderFieldWrapper>

      <InputBuilderFieldWrapper name={"presence_penalty?"}>
        <InputBuilderNumberInput
          placeholder={"Enter presence penalty . . ."}
          value={input.presence_penalty}
          min={-2}
          max={2}
          optional
          setValue={function (value): void {
            updateField("presence_penalty", value)
          } } />
      </InputBuilderFieldWrapper>

      <InputBuilderFieldWrapper name={"temperature?"}>
        <InputBuilderNumberInput
          placeholder={"Enter temperature . . ."}
          value={input.temperature}
          min={0}
          max={2}
          optional
          setValue={function (value): void {
            updateField("temperature", value)
          } } />
      </InputBuilderFieldWrapper>
    
      <InputBuilderFieldWrapper name={"top_p?"}>
        <InputBuilderNumberInput
          placeholder={"Enter top p . . ."}
          value={input.top_p}
          min={0}
          max={1}
          optional
          setValue={function (value): void {
            updateField("top_p", value)
          } } />
      </InputBuilderFieldWrapper>
    </>}
    
  </InputBuilderObjectWrapper>
}