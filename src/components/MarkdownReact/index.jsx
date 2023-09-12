import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// 设置高亮样式
import { xonokai } from "react-syntax-highlighter/dist/esm/styles/prism";
import md from "../../../MD/CustomFormComp.md";
import "github-markdown-css";

const Code = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        children={String(children).replace(/\n$/, "")}
        style={xonokai}
        language={match[1]}
        PreTag="div"
        {...props}
      />
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};
const MarkdownReact = () => {
  // console.log("pathStr", fileDisplay("../../../MD"));
  const [currentArticle, setCurrentArticle] = useState({
    url: "",
    content: "",
  });
  // 更改当前文档
  const changeCurrentArticle = async (url) => {
    const res = await fetch(url);
    const content = await res.text();
    setCurrentArticle({ ...currentArticle, content, url });
  };
  useEffect(() => {
    changeCurrentArticle(md);
  }, []);

  return (
    <div className="markdown-body" style={{ padding: "30px" }}>
      <ReactMarkdown
        children={currentArticle.content}
        components={Code}
        remarkPlugins={[remarkGfm]}
      />
    </div>
  );
};
export default MarkdownReact;
