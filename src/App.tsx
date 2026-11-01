/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import {
  COMMON_FILES_DATA,
  PRACTICALS_DATA,
  CommonFile,
  Practical,
} from './data/practicalsData';
import { fetchCommonFiles, fetchPracticals } from './lib/supabase';

export default function App() {
  const [commonFiles, setCommonFiles] = useState<CommonFile[]>(COMMON_FILES_DATA);
  const [practicals, setPracticals] = useState<Practical[]>(PRACTICALS_DATA);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [copiedCardKey, setCopiedCardKey] = useState<string | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadContent() {
      const [loadedCommon, loadedPracticals] = await Promise.all([
        fetchCommonFiles(),
        fetchPracticals(),
      ]);

      if (isMounted) {
        setCommonFiles(loadedCommon);
        setPracticals(loadedPracticals);
      }
    }

    loadContent();

    return () => {
      isMounted = false;
      if (toastTimeoutRef.current) {
        window.clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(message);
    setToastType(type);

    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage(null);
      setCopiedCardKey(null);
    }, 2000);
  };

  const fallbackCopyText = (text: string): boolean => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      textArea.style.top = '0';
      textArea.setAttribute('readonly', '');
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const copied = document.execCommand('copy');
      document.body.removeChild(textArea);
      return copied;
    } catch {
      return false;
    }
  };

  const handleCopyCode = async (code: string, cardKey: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code);
        setCopiedCardKey(cardKey);
        showNotification('Copied Successfully!', 'success');
        return;
      }
    } catch {
      // Fallback for restricted iframe clipboard permissions
    }

    const fallbackSucceeded = fallbackCopyText(code);
    if (fallbackSucceeded) {
      setCopiedCardKey(cardKey);
      showNotification('Copied Successfully!', 'success');
    } else {
      showNotification('Failed to copy code to clipboard.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#060e1a] text-white px-4 py-8 sm:px-8 sm:py-10">
      <main className="mx-auto max-w-5xl">
        {/* Main Website Heading */}
        <h1 className="text-3xl sm:text-[34px] font-bold tracking-tight text-white mb-6">
          Python Compiler
        </h1>

        {/* Common Python Files Section */}
        <section aria-labelledby="common-files-heading">
          <h2
            id="common-files-heading"
            className="text-lg sm:text-[20px] font-bold text-white mb-4"
          >
            Common Python Files
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {commonFiles.map((file) => {
              const cardKey = `common-${file.filename}`;
              const isCopied = copiedCardKey === cardKey;

              return (
                <button
                  key={file.id}
                  type="button"
                  onClick={() => handleCopyCode(file.code, cardKey)}
                  className="group w-full text-left rounded-2xl bg-[#10253b] hover:bg-[#152e48] active:scale-[0.995] border border-[#1d3958] hover:border-[#2eb5f6]/50 px-6 py-6 transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2eb5f6]"
                >
                  <div className="text-2xl sm:text-[28px] font-bold text-[#2eb5f6] tracking-tight mb-2.5">
                    {file.filename}
                  </div>
                  <div className="text-sm sm:text-[15px] font-medium text-[#9cb6d1] group-hover:text-[#bae6fd] transition-colors">
                    {isCopied ? 'Copied Successfully!' : 'Copy Code \u2192'}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Section Divider */}
        <hr className="border-0 border-t border-[#1b3450] my-7" />

        {/* Practical Programs Section */}
        <section aria-labelledby="practical-programs-heading">
          <h2
            id="practical-programs-heading"
            className="text-lg sm:text-[20px] font-bold text-white mb-5"
          >
            Practical Programs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {practicals.map((practical) => {
              const cardKey = `practical-${practical.practical_number}`;
              const isCopied = copiedCardKey === cardKey;

              return (
                <button
                  key={practical.id}
                  type="button"
                  onClick={() => handleCopyCode(practical.code, cardKey)}
                  className="group w-full text-left rounded-2xl bg-[#10253b] hover:bg-[#152e48] active:scale-[0.995] border border-[#1d3958] hover:border-[#2eb5f6]/50 px-6 py-6 transition-all duration-150 cursor-pointer flex flex-col justify-between min-h-[156px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2eb5f6]"
                >
                  <div className="text-2xl sm:text-[27px] font-semibold text-[#2eb5f6] tabular-nums tracking-tight mb-6">
                    {practical.practical_number}
                  </div>

                  <div>
                    <div className="text-lg sm:text-[19px] font-bold text-white leading-snug mb-1.5">
                      {practical.title}
                    </div>
                    <div className="text-sm sm:text-[15px] font-medium text-[#9cb6d1] group-hover:text-[#bae6fd] transition-colors">
                      {isCopied ? 'Copied Successfully!' : 'Copy Code \u2192'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </main>

      {/* Temporary Copy Notification Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-6 right-6 z-50 rounded-xl px-5 py-3 text-sm font-semibold shadow-lg border transition-all duration-150 ${
            toastType === 'success'
              ? 'bg-[#122b44] text-[#38bdf8] border-[#2eb5f6]/50'
              : 'bg-[#3b1520] text-[#fca5a5] border-[#f87171]/50'
          }`}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
