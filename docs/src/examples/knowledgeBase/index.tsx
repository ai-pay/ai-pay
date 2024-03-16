
interface KnowledgeBaseExampleProps {
  children: React.ReactNode;
}

export function KnowledgeBaseExample({
  children,
}: KnowledgeBaseExampleProps): React.JSX.Element {
  return <h1>{children}</h1>
}