"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import StreamingTextarea from "@/components/streaming-textarea";
import { useParams } from "next/navigation";
import Link from "next/link";

const InputWithTransition = () => {
  const params = useParams<{ slug: string }>();
  const campaignId = params.slug.split("-")[1];
  const campaignName = params.slug.split("-")[0];

  const send = useMutation(api.postGenration.generatePostGeneration);
  const post = useQuery(api.postGenration.list, {
    campaignId: campaignId,
  });

  const [inputValue, setInputValue] = useState("");
  const [shouldTransition, setShouldTransition] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (post && !post?.done) return;
    setIsLoading(false);
  }, [post]);

  const handleInputChangeLocal = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const trimmedValue = e.target.value;
      setInputValue(trimmedValue);

      if (e.target.value.length > 2 && !/^\s/.test(trimmedValue)) {
        // If the textarea is empty, set shouldTransition to false
        setShouldTransition(true);
      } else if (e.target.value.length === 0) {
        setShouldTransition(false);
      } else if (e.target.scrollHeight > 48) {
        // If the textarea content exceeds the height threshold, set shouldTransition to true
        setShouldTransition(true);
      } else {
        // If the textarea content is below the height threshold, set shouldTransition to false
        setShouldTransition(false);
      }
    },
    [],
  );

  const handleSubmitHandler = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    e.preventDefault();
    if (post && !post?.done) return;
    if (inputValue.trim().length > 0) {
      try {
        const response = await send({
          userInput: inputValue,
          campaignId: campaignId,
        });
        setIsLoading(true);
        setInputValue("");
        setShouldTransition(false);
      } catch (error) {
        console.error("An error occurred: ", error);
      }
    } else {
      console.log("No input value provided");
      setIsLoading(false);
      setInputValue("");
      setShouldTransition(false);
    }
  };

  const textareaClassName = useMemo(
    () =>
      `flex-grow px-1 pt-0.5 relative bg-transparent outline-none resize-none flex items-center justify-center ${
        shouldTransition ? "h-32 overflow-y-auto" : "h-8"
      }`,
    [shouldTransition],
  );

  const buttonClassName = useMemo(
    () =>
      `disabled:opacity-50 h-7 disabled:cursor-not-allowed relative flex items-center py-1 bg-gradient-to-b from-purple-400 to-purple-600 border border-purple-500 text-white rounded-md hover:bg-gradient-to-t hover:from-purple-500 hover:to-purple-400 transition-all ease-in-out duration-300 shadow-sm ${
        shouldTransition ? "px-2 w-8" : "px-4 w-28"
      }`,
    [shouldTransition],
  );

  const buttonTextClassName = useMemo(
    () =>
      `text-sm whitespace-nowrap transition-all duration-300 ease-in-out ${
        shouldTransition
          ? " translate-x-full opacity-0"
          : "opacity-100 translate-x-0"
      }`,
    [shouldTransition],
  );

  const buttonIconClassName = useMemo(
    () =>
      `absolute h-4 w-4 transition-all ease-in-out duration-300 ${
        shouldTransition ? "right-[6px]" : "right-5 translate-x-2"
      }`,
    [shouldTransition],
  );

  return (
    <section className="relative">
      <form
        onSubmit={handleSubmitHandler}
        className={`mx-auto flex max-w-[48rem] flex-col overflow-hidden rounded-xl border border-gray-300 bg-white px-2 py-2 pb-1 shadow-md drop-shadow-sm transition-all duration-300 ease-in-out
        ${
          shouldTransition
            ? "items-start justify-center"
            : "items-center justify-center"
        }
        `}
      >
        <div className="flex h-full w-full items-start justify-center gap-3">
          <textarea
            autoFocus={true}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                handleSubmitHandler(e);
              }
            }}
            value={inputValue}
            onChange={handleInputChangeLocal}
            className={textareaClassName}
            placeholder="Enter your post topic here"
            style={{
              wordWrap: "break-word",
              whiteSpace: "pre-wrap",
              transition: "all 0.3s ease-in-out",
            }}
          />
          <span
            className={`absolute bottom-1 right-2 text-sm text-gray-700 transition-all duration-300 ease-in-out ${
              shouldTransition ? "opactiy-100" : "opacity-0"
            }`}
          >
            Use{" "}
            <span className="rounded-sm bg-purple-200 px-1 py-0">
              shift + return
            </span>{" "}
            for new line
          </span>
          <button
            type="submit"
            disabled={(post && !post?.done) || isLoading || false}
            className={buttonClassName}
          >
            {post && !post?.done ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-purple-200 border-b-transparent" />
              </div>
            ) : (
              <>
                <span className={buttonTextClassName}>Generate</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={buttonIconClassName}
                >
                  <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                </svg>
              </>
            )}
          </button>
        </div>
        {shouldTransition && (
          <div
            className={`h-4 w-full bg-white transition-all duration-300 ease-linear ${
              shouldTransition ? "opactiy-100" : "opacity-0"
            }`}
          />
        )}
      </form>
      <div className="sticky top-14 z-30 mx-auto mt-7 flex h-14 max-w-[48rem] items-center justify-between bg-white px-2 pb-3 pt-3 ">
        <h3 className="flex items-center justify-start gap-2 pb-3 text-purple-500">
          Here is your viral going post
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path
              fillRule="evenodd"
              d="M15.22 6.268a.75.75 0 0 1 .968-.431l5.942 2.28a.75.75 0 0 1 .431.97l-2.28 5.94a.75.75 0 1 1-1.4-.537l1.63-4.251-1.086.484a11.2 11.2 0 0 0-5.45 5.173.75.75 0 0 1-1.199.19L9 12.312l-6.22 6.22a.75.75 0 0 1-1.06-1.061l6.75-6.75a.75.75 0 0 1 1.06 0l3.606 3.606a12.695 12.695 0 0 1 5.68-4.974l1.086-.483-4.251-1.632a.75.75 0 0 1-.432-.97Z"
              clipRule="evenodd"
            />
          </svg>
        </h3>
        <Link
          href={`/dashboard/campaign/${campaignName}-${campaignId}/setup`}
          hidden={!post?.done}
          className={`${
            post?.done ? "opacity-100" : "opacity-0"
          } flex h-8 w-fit cursor-pointer items-center justify-center gap-1 rounded-lg border border-emerald-500 bg-gradient-to-b from-emerald-400 to-emerald-500/95 px-3 text-white shadow-inner shadow-green-400 drop-shadow-md transition-all duration-300 ease-in hover:bg-gradient-to-br hover:shadow-lg disabled:cursor-not-allowed disabled:bg-opacity-75`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 drop-shadow"
          >
            <path
              fillRule="evenodd"
              d="M12 1.5a.75.75 0 0 1 .75.75V4.5a.75.75 0 0 1-1.5 0V2.25A.75.75 0 0 1 12 1.5ZM5.636 4.136a.75.75 0 0 1 1.06 0l1.592 1.591a.75.75 0 0 1-1.061 1.06l-1.591-1.59a.75.75 0 0 1 0-1.061Zm12.728 0a.75.75 0 0 1 0 1.06l-1.591 1.592a.75.75 0 0 1-1.06-1.061l1.59-1.591a.75.75 0 0 1 1.061 0Zm-6.816 4.496a.75.75 0 0 1 .82.311l5.228 7.917a.75.75 0 0 1-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 0 1-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 0 1-1.247-.606l.569-9.47a.75.75 0 0 1 .554-.68ZM3 10.5a.75.75 0 0 1 .75-.75H6a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 10.5Zm14.25 0a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5H18a.75.75 0 0 1-.75-.75Zm-8.962 3.712a.75.75 0 0 1 0 1.061l-1.591 1.591a.75.75 0 1 1-1.061-1.06l1.591-1.592a.75.75 0 0 1 1.06 0Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="drop-shadow">Start Campaign</span>
        </Link>
      </div>
      {post && (
        <article key={post._id} className="mx-auto max-w-[48rem] pt-7">
          {post &&
            post.generatedPostMsg &&
            post.generatedPostMsg?.length > 0 && (
              <StreamingTextarea
                streamedText={post.generatedPostMsg}
                done={post.done}
              />
            )}
        </article>
      )}
    </section>
  );
};

export default InputWithTransition;
