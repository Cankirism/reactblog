import React from "react";
import Markdown from "markdown-to-jsx"

const MDE =()=>{
  const markdown =`# Hello, Markdown!
This is a sample Markdown document showcasing different elements.`
  return <Markdown>{markdown}</Markdown>;
};

 
export default MDE;