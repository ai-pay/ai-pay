import { DropDownFieldView } from "@/components/functionInputBuilder/dropDownFieldView"
import { ImageGenerationRequest } from "ai-pay/models"
import { InputBuilderFieldWrapper } from "@/components/functionInputBuilder/fieldWrapper"
import { InputBuilderObjectWrapper } from "@/components/functionInputBuilder/objectWrapper"
import { InputBuilderTextInput } from "@/components/functionInputBuilder/textInput"
import { useEffect } from "react"

interface ImageGenerationInputBuilderProps<> {
  input: ImageGenerationRequest
  setInput: (input: ImageGenerationRequest) => void
}

export function ImageGenerationInputBuilder({
  input,
  setInput,
}: ImageGenerationInputBuilderProps): React.JSX.Element {
  function updateField<K extends keyof ImageGenerationRequest>(field: K, value: ImageGenerationRequest[K]): void {
    setInput({
      ...input,
      [field]: value,
    })
  }

  useEffect(() => {
    if (input.imageModel === "dall-e-2") {
      setInput({
        prompt: input.prompt,
        imageModel: "dall-e-2",
        n: 1,
        size: "1024x1024",
      })
    } else {
      setInput({
        prompt: input.prompt,
        imageModel: "dall-e-3",
        quality: "standard",
        size: "1024x1024",
        style: "vivid",
      })
    }
  }, [input.imageModel])

  return <InputBuilderObjectWrapper title={"request: ImageGenerationRequest"}>
    <InputBuilderFieldWrapper name={"prompt"}>
      <InputBuilderTextInput
        placeholder={"Enter a prompt . . ."}
        value={input.prompt}
        setValue={function (value: string): void {
          updateField("prompt", value)
        } } />
    </InputBuilderFieldWrapper>

    <DropDownFieldView 
      field={"imageModel"} 
      object={input} 
      options={["dall-e-2", "dall-e-3"]} 
      setInput={setInput} />

    {input.imageModel === "dall-e-2" ? <>
      <DropDownFieldView 
        field={"n"} 
        optional
        object={input} 
        options={[undefined, 1, 2]} 
        setInput={setInput} />

      <DropDownFieldView 
        field={"size"} 
        object={input} 
        options={["256x256", "512x512", "1024x1024"]} 
        setInput={setInput} />
    </> : <>
      <DropDownFieldView 
        field={"quality"} 
        object={input} 
        options={["standard", "hd"]} 
        setInput={setInput} />
      <DropDownFieldView 
        field={"size"} 
        object={input} 
        options={["1024x1024", "1024x1792", "1792x1024"]} 
        setInput={setInput} />
      <DropDownFieldView 
        field={"style"} 
        optional
        object={input} 
        options={[undefined, "vivid", "natural"]} 
        setInput={setInput} />
    </>}
    
  </InputBuilderObjectWrapper>
}