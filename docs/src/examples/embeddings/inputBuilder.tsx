import { DropDownFieldView } from "@/components/functionInputBuilder/dropDownFieldView"
import { EmbeddingCreateParams } from "openai/resources/embeddings"
import { InputBuilderFieldWrapper } from "@/components/functionInputBuilder/fieldWrapper"
import { InputBuilderNumberInput } from "@/components/functionInputBuilder/numberInput"
import { InputBuilderObjectWrapper } from "@/components/functionInputBuilder/objectWrapper"
import { InputBuilderTextInput } from "@/components/functionInputBuilder/textInput"
import { openAiEmbeddingModels } from "ai-pay"
import { useEffect } from "react"

const modelToMaxDimensions: Record<typeof openAiEmbeddingModels[number], number> = {
  "text-embedding-3-small": 1536,
  "text-embedding-3-large": 3072,
} as const

interface Props {
  input: EmbeddingCreateParams & {input: string[]}
  setInput: (input: EmbeddingCreateParams & {input: string[]}) => void
}

export function OpenAiCompatibleEmbeddingsInputBuilder({
  input,
  setInput,
}: Props): React.JSX.Element {
  function updateField<K extends keyof EmbeddingCreateParams>(field: K, value: EmbeddingCreateParams[K]): void {
    setInput({
      ...input,
      [field]: value,
    })
  }

  useEffect(() => {
    const model = input.model as "text-embedding-3-small" | "text-embedding-3-large"

    if (input.dimensions && modelToMaxDimensions[model] < input.dimensions) {
      setInput({
        ...input,
        dimensions: Math.min(modelToMaxDimensions[model], input.dimensions),
      })
    }
  }, [input.model])

  return <InputBuilderObjectWrapper title={"request: EmbeddingCreateParams"}>
    <InputBuilderFieldWrapper name={"input"}>
      {typeof input.input === "string" && (
        <InputBuilderTextInput
          placeholder={"Enter a prompt . . ."}
          value={input.input}
          setValue={function (value: string): void {
            updateField("input", value)
          } } />
      )}
      {typeof input.input === "object" && (
        <InputBuilderObjectWrapper >
          {input.input.map((curText, index) => (
            <InputBuilderFieldWrapper key={index} name={index.toString()}>
              <InputBuilderTextInput
                placeholder={"Enter a prompt . . ."}
                value={curText as string}
                setValue={function (value: string): void {
                  updateField("input", (input.input as string[]).map((input, i) => i === index ? value : input))
                } } />
            </InputBuilderFieldWrapper>
          ))}
        </InputBuilderObjectWrapper>
      )}
    </InputBuilderFieldWrapper>

    <DropDownFieldView 
      field={"model"} 
      object={input} 
      options={openAiEmbeddingModels} 
      setInput={setInput} />

    <InputBuilderFieldWrapper name={"dimensions?"}>
      <InputBuilderNumberInput
        placeholder={"Enter number of dimensions . . ."}
        value={input.dimensions}
        optional
        min={5}
        max={modelToMaxDimensions[input.model as typeof openAiEmbeddingModels[number]]}
        setValue={function (value): void {
          updateField("dimensions", value)
        } } />
    </InputBuilderFieldWrapper>

    <DropDownFieldView 
      field={"encoding_format"} 
      object={input} 
      optional
      options={[undefined, "float", "base64"]} 
      setInput={setInput} />
    
  </InputBuilderObjectWrapper>
}