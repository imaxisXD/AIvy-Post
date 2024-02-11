"use client";
import { Link2OffIcon } from "lucide-react";
import { useFormStatus } from "react-dom";

function UnLinkedbutton() {
  const { pending } = useFormStatus();

  const LoadingIcon = () => (
    <svg
      aria-hidden="true"
      className="w-5 h-5 text-white animate-spin fill-[#ffadb0]"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        aria-hidden="true"
        viewBox="0 0 100 101"
      >
        <path
          fill="currentColor"
          d="M100 50.59c0 27.615-22.386 50.001-50 50.001s-50-22.386-50-50 22.386-50 50-50 50 22.386 50 50Zm-90.919 0c0 22.6 18.32 40.92 40.919 40.92 22.599 0 40.919-18.32 40.919-40.92 0-22.598-18.32-40.918-40.919-40.918-22.599 0-40.919 18.32-40.919 40.919Z"
        />
        <path
          fill="currentFill"
          d="M93.968 39.04c2.425-.636 3.894-3.128 3.04-5.486A50 50 0 0 0 41.735 1.279c-2.474.414-3.922 2.919-3.285 5.344.637 2.426 3.12 3.849 5.6 3.484a40.916 40.916 0 0 1 44.131 25.769c.902 2.34 3.361 3.802 5.787 3.165Z"
        />
      </svg>
    </svg>
  );

  return (
    <button
      disabled={pending}
      aria-disabled={pending}
      className="ease-out cursor-pointer duration-200 transition-all border flex gap-2 items-center justify-center hover:border-red-900 hover:bg-red-900 border-[#822025] text-[#ffadb0] bg-red-700 rounded-md px-2 py-1 text-sm shadow-sm w-20 h-8 disabled:bg-red-700/70 disabled:cursor-wait"
    >
      {!pending ? (
        <div className="flex gap-2 items-center justify-center" role="button">
          <Link2OffIcon className="h-4 w-4" />
          <span>Unlink</span>
        </div>
      ) : (
        <div role="status" className="flex gap-2 items-center justify-center">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-200 animate-spin  fill-red-700"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          {/* <LoadingIcon /> */}
          <span className="sr-only">Unlinking...</span>
        </div>
      )}
    </button>
  );
}

export default UnLinkedbutton;
