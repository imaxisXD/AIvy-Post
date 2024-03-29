"use client";
// import Uploadbox from "@/components/uploadbox";

export default function Create() {
  return (
    <main className="px-8 min-h-screen text-black ">
      <h1 className="font-urban font-extrabold text-4xl pt-8 pb-2 text-black">
        Upload the <span className="text-orange-project">resources</span>
      </h1>
      <h2 className="pb-10 text-grey-project">
        Provide PDFs, text, tweets, or YouTube videos, and let our AI analyze
        the content to create compelling social media posts for you.
      </h2>

      {/* <Uploadbox /> */}

      <h2>How It Works</h2>
      <ol>
        <li>Upload your content using the form above.</li>
        <li>Our AI will analyze the information and extract key insights.</li>
        <li>
          Receive generated tweets or LinkedIn posts based on the content
          provided.
        </li>
        <li>Review and customize the generated posts as needed.</li>
        <li>
          Share your AI-generated content on social media and engage your
          audience.
        </li>
      </ol>

      <p>
        Unlock the power of AI for content creation and save time while
        maintaining a strong online presence!
      </p>
    </main>
  );
}
