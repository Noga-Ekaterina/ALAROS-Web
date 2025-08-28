'use client'
import React, { useState } from 'react';
import {IWithChildren, IWithClass} from "@/types/tehnic";
import Alert from "@/components/alert/Alert";

interface CopyTextProps extends IWithClass, IWithChildren{
  text: string;
}

const CopyText = ({ text, className, children }: CopyTextProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    try {
      // Пробуем использовать современный API
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback для старых браузеров
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 4000);
    } catch (err) {
      console.error('Ошибка при копировании текста: ', err);
    }
  };

  return (
      <>
        <a href="#" onClick={handleCopy} className={className}>{children}</a>

        {isCopied && <Alert message="Скопировано в буфер обмена"/>}
      </>
  );
};

export default CopyText;