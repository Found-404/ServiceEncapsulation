import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// 设置高亮样式
// import { xonokai } from "react-syntax-highlighter/dist/esm/styles/prism";
import "github-markdown-css";
// const Code = {
//   code({ node, inline, className, children, ...props }) {
//     const match = /language-(\w+)/.exec(className || "");
//     return !inline && match ? (
//       <SyntaxHighlighter
//         children={String(children).replace(/\n$/, "")}
//         style={xonokai}
//         language={match[1]}
//         PreTag="div"
//         {...props}
//       />
//     ) : (
//       <code className={className} {...props}>
//         {children}
//       </code>
//     );
//   },
// };
const MarkdownReact = () => {
  const [docmentContent, setDocmentContent] = useState("");
  const content = `This is some JavaScript code:
  ~~~js
  console.log('Hello world!')
  ~~~

  ### styles和classNames属性
  | 名称 | 说明         | 版本  |
  | ---- | ------------ | ----- |
  | icon | 设置图标元素 | 5.5.0 |
  | icon | 设置图标元素 | 5.5.0 |
  | icon | 设置图标元素 | 5.5.0 |
  | icon | 设置图标元素 | 5.5.0 |


  `;
  useEffect(() => {
    setDocmentContent(content);
  }, []);
  return (
    <div className="markdown-body" style={{ padding: "30px" }}>
      <ReactMarkdown
        children={docmentContent}
        // components={Code}
        remarkPlugins={[remarkGfm]}
      />
    </div>
  );
};
export default MarkdownReact;
