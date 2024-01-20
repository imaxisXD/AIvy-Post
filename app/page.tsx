// import createAuthClient from "@/utils/authClient";
// import { convexSiteUrl } from "@/utils/convexurl";
// import { createClient } from "@/utils/supabase/server";
// import { AuthClient } from "@supabase/supabase-js";
// import { cookies } from "next/headers";
// import Link from "next/link";
// import { redirect } from "next/navigation";
// import Client from "twitter-api-sdk";

// export default async function Home() {
//   const cookieStore = cookies();
//   const supabase = createClient(cookieStore);
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();
//   if (!session) {
//     redirect("/login");
//   }
//   const { data, error, status, statusText } = await supabase
//     .from("userdata")
//     .select();

//   // console.log(data, error, status, statusText);

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();
//   // const client = new Client(
//   //   "Ynkza29OSi1pTHcwRHRWZXZHeWs1eldRUENqaGF6V1dJQXdNMVNTRnhDWkJ6OjE3MDU1ODIzODgyNzg6MTowOmF0OjE"
//   // );

//   const response = await fetch(
//     `${process?.env?.NEXT_PUBLIC_CONVEX_URL}/api/hello`
//   );
//   const responseText = await response.text();
//   console.log(
//     `${process?.env?.NEXT_PUBLIC_CONVEX_URL}/api/hello`,
//     "Hono Response : ",
//     responseText
//   );

//   // const response = await client.tweets.createTweet({
//   //   text: "Hi 💫",
//   // });
//   // const userDetails = await client.users.findMyUser({
//   //   "user.fields": ["description", "name", "profile_image_url", "entities"],
//   // });
//   // console.log("Users: ", response);

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       {!session && (
//         <Link
//           className="text-white px-5 py-1 border border-green-300 bg-green-400/60 hover:bg-green-400/40 rounded-md"
//           href="/login"
//         >
//           Sign in
//         </Link>
//       )}
//       <pre
//         style={{
//           overflowX: "auto",
//           maxHeight: "200px",
//           border: "1px solid #ccc",
//           padding: "10px",
//         }}
//       >
//         {JSON.stringify(data, null, 2)}
//       </pre>
//       <div>
//         <textarea name="tweet" id="tweet" cols={30} rows={10}></textarea>
//       </div>
//       <p>{user?.email}</p>
//     </main>
//   );
// }
"use client";
import { FormEvent, useState } from "react";

export default function App() {
  const [newMessageText, setNewMessageText] = useState("");

  const convexDeploymentUrl = process?.env?.NEXT_PUBLIC_CONVEX_URL;
  const convexSiteUrl = convexDeploymentUrl!.endsWith(".cloud")
    ? convexDeploymentUrl!.substring(
        0,
        convexDeploymentUrl!.length - ".cloud".length
      ) + ".site"
    : convexDeploymentUrl;

  const [name, setName] = useState(() => Math.floor(Math.random() * 10000));
  const [authorNumber, setAuthorNumber] = useState(name);
  async function handleSendMessage(event: FormEvent) {
    event.preventDefault();
    setNewMessageText("");
    const response = await fetch(`${convexSiteUrl}/api/postMessage`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        body: newMessageText,
        author: `User ${name.toString()}`,
      }),
    });
    const responseText = await response.text();
    window.alert(`Response: ${responseText}`);
  }

  async function handleListMessages(event: FormEvent) {
    event.preventDefault();
    try {
      const response = await fetch(
        `${convexSiteUrl}/api/listMessages/${authorNumber}`
      );
      const responseText = await response.text();
      window.alert(`Response: ${responseText}`);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <main>
      <h1>Convex Chat</h1>
      <div className="card">
        <h2>Messages can be sent and read via curl:</h2>
        <p>
          Try clicking the buttons to make the requests, or copy paste the curl
          commands into a terminal!
        </p>
      </div>
      <div className="card">
        <div>Send a message:</div>
        <div className="request">
          {`curl \\
  -H 'Content-Type: application/json' \\
  -d '{
      "author": "User ${name}",
      "body": "${newMessageText}"
    }' \\
  ${convexSiteUrl}/api/postMessage`}
        </div>
        <form onSubmit={handleSendMessage}>
          <div>
            User
            <input
              value={name}
              onChange={(event) => setName(parseInt(event.target.value))}
            />
          </div>
          <input
            value={newMessageText}
            onChange={(event) => setNewMessageText(event.target.value)}
            placeholder="Write a message…"
          />
          <input type="submit" value="Send" disabled={!newMessageText} />
        </form>
      </div>
      <div className="card">
        <div>
          <div>Read messages:</div>
          <div className="request">
            {`curl ${convexSiteUrl}/api/listMessages/${authorNumber}`}
          </div>
        </div>
        <form onSubmit={handleListMessages}>
          <div>
            User
            <input
              value={authorNumber}
              onChange={(event) =>
                setAuthorNumber(parseInt(event.target.value))
              }
            />
          </div>
          <input type="submit" value="List messages from author" />
        </form>
      </div>
    </main>
  );
}
