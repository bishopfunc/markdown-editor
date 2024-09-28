"use client";
import dynamic from 'next/dynamic';
import 'easymde/dist/easymde.min.css';
import { SetStateAction, useState, useEffect } from 'react';
import markdownToHtml from 'zenn-markdown-html';
import 'zenn-content-css';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

const MarkdownEditorWithPreview = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('zenn-embed-elements');
    }
  }, []);  
  const [text, setText] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  function unescapeMarkdown(text: string): string {
    return text.replace(/\\([`*_{}\[\]()#+\-\.!])/g, '$1'); 
  }
  const handleChange = (value: string) => {
    const unescapedText = unescapeMarkdown(value);
    setText(unescapedText);
    const htmlRes = markdownToHtml(unescapedText);
    setHtmlContent(htmlRes);
  };
  const handleClick = () => {
    const htmlRes = markdownToHtml(text);
    // Copy the HTML to clipboard
    navigator.clipboard.writeText(htmlRes)
      .then(() => {
        console.log("HTML content copied to clipboard!");
      })
      .catch(err => {
        console.error("Failed to copy text: ", err);
      });
  };
  return (
    <div className="flex min-h-screen mt-4">
      <div className="w-1/2 p-4">
        <SimpleMDE value={text} onChange={handleChange} spellCheck={false} />
      </div>
      <div className="w-1/2 p-4 bg-gray-100">
        <div className="flex justify-end">
          <button 
            onClick={handleClick} 
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Copy HTML
          </button>
        </div>      
        <div className="mt-4 znc" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </div>
  );
};

export default MarkdownEditorWithPreview;