import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const Codesyntax = ({ children, props }) => {
    return (
      <SyntaxHighlighter language="javascript" {...props} >
    {children}
      </SyntaxHighlighter>
    )
  }
  export default Codesyntax;