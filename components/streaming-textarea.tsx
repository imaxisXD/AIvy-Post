import React, { useRef, useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

interface StreamingTextareaProps {
  streamedText: string;
  done: boolean;
}

const StreamingTextarea: React.FC<StreamingTextareaProps> = ({
  streamedText,
  done,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textareaHeight, setTextareaHeight] = useState<string | number>("auto");
  const [iconChange, setIconChange] = useState(false);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height temporarily to get the correct scrollHeight value
    textarea.style.height = "auto";
    const newHeight = `${textarea.scrollHeight}px`;
    textarea.style.height = newHeight;
  };

  useEffect(() => {
    // Determine how far from the bottom the user currently is before update
    const previousDistanceFromBottom =
      document.body.scrollHeight - window.scrollY;

    adjustHeight();

    // After height adjustment (maybe via a small timeout or requestAnimationFrame),
    // scroll to the new position that maintains the user's relative position
    const currentDistanceFromBottom = previousDistanceFromBottom;
    window.scrollTo(0, document.body.scrollHeight - currentDistanceFromBottom);
  }, [streamedText, done]);

  const copyToClipboard = async () => {
    setIconChange((p) => !p);
    if (textareaRef.current) {
      try {
        await navigator.clipboard.writeText(textareaRef.current.value);
        toast.success("Copied to clipboard");
      } catch (err: any) {
        if (err.name === "NotAllowedError") {
          console.error(
            "Clipboard access denied. Please enable clipboard permission in your browser settings.",
          );
        } else {
          console.error("Failed to copy text: ", err);
        }
      }
      setTimeout(() => {
        setIconChange((p) => !p);
      }, 1000);
    }
  };

  return (
    <div className="group relative rounded-xl  transition-all duration-300 ease-in-out">
      <textarea
        ref={textareaRef}
        value={streamedText}
        readOnly
        className="transition-height w-full resize-none overflow-y-auto rounded-xl border border-gray-300 px-3 py-4 shadow-inner outline-none duration-300 ease-in-out focus:border-purple-400"
        style={{ overflowY: "hidden" }} // Prevent scroll bar from appearing during auto-resize
      />
      <button
        className="absolute right-2 top-2 flex items-center justify-center gap-1 rounded-md bg-gray-200 px-2 py-1 text-xs opacity-0 transition-all duration-300 ease-in-out hover:bg-emerald-200/80 group-hover:opacity-100"
        onClick={copyToClipboard}
      >
        {!iconChange ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4 stroke-green-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
        <span>Copy Post</span>
      </button>
    </div>
  );
};

export default StreamingTextarea;
