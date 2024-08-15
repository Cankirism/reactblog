import React from 'react'
import ReactDOM from 'react-dom'
import ReactMarkdown from 'react-markdown'
import Codesyntax from '../codesyntax/Codesyntax'
const Createmd =(props)=>{
    const code = `const value = assdasd `
    const content = `## Hello World

Bold **bold text**
Italic _italicized text_
Blockquote > blockquote
Ordered List

1. First item
1. Second item
1. Third item

Unordered List

- First item
- Second item
- Third item

Code 

A note[^1]

---

Link [link](https://www.example.com)

Image ![alt text](https://retool.com/static/f7c3a4ef34744c92d441df532e8d3969/8ca30/revision-history.webp)`
    return(
        <div>
        <ReactMarkdown  
        children={props.content}
        components={{
            code({ node, inline, children, className, ...props }) {
                 return <Codesyntax children={children}  {...props} />;
                 }
           }}
           />
      </div>
    )

}
export default Createmd;