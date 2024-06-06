"use client";
import dynamic from 'next/dynamic';
import 'easymde/dist/easymde.min.css';
import { SetStateAction, useState } from 'react';
import markdownToHtml from '../../../node_modules/zenn-markdown-html/lib/index.js';
import 'zenn-content-css';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

const MarkdownEditorWithPreview = () => {
  const [text, setText] = useState('');

  const handleChange = (value: SetStateAction<string>) => {
    setText(value);
  };

  return (
    <div className="flex min-h-screen mt-4">
      <div className="w-1/2 p-4">
        <SimpleMDE value={text} onChange={handleChange} spellCheck={false} />
      </div>
      <div className="w-1/2 p-4 bg-gray-100">
        <div className="znc" dangerouslySetInnerHTML={{ __html: markdownToHtml(text) }} />
      </div>
    </div>
  );
};

export default MarkdownEditorWithPreview;