import { useEffect, useRef } from "react"

interface DynamicCodeBlockProps {
  replaceString: string
  newString: string
  children: React.ReactNode
}

export function DynamicCodeBlock({
  replaceString,
  newString,
  children,
}: DynamicCodeBlockProps): React.ReactNode {
  const ref = useRef<HTMLDivElement>(null)
  const tokenRef = useRef<Element>()

  useEffect(() => {
    if (ref.current) {

      const token = Array.from(ref.current.querySelectorAll("code span")).find(el => (el as HTMLElement).innerText === replaceString)
      if (!token) {
        return
      }
      tokenRef.current = token
      tokenRef.current.textContent = newString
    }
  }, [])

  useEffect(() => {
    if (tokenRef.current) {
      tokenRef.current.textContent = newString
    }
  }, [newString])

  return <div ref={ref}>
    {children}
  </div>
    
}