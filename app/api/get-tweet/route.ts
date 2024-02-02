// import { api } from "@/convex/_generated/api";

// import { fetchQuery } from "convex/nextjs";
// import { cookies } from "next/headers";
// import Client from "twitter-api-sdk";
// import { TwitterApi } from "twitter-api-v2";

// export async function GET(request: Request) {
//   const cookieStore = cookies();

//   const userData = await fetchQuery(api.users.getUserDetails, {
//     userEmail: user?.email!,
//   });
//   const client = new TwitterApi(userData?.twitter_access_token!);
//   const client2 = new Client(userData?.twitter_access_token!);
//   //   const client2 = client.readWrite;
//   const tweetsOfJack1 = await client2.tweets.usersIdTimeline(
//     userData?.twitter_userID!
//   );
//   console.log(tweetsOfJack1);

//   //   const info = await client2.currentUserV2();
//   //   console.log(info);

//   //   const tweetsOfJack2 = await client2.v2.userLikedTweets(
//   //     userData?.twitter_access_token!
//   //   );

//   console.log("Tweet--->", tweetsOfJack1);
//   //   console.log("Tweet--->", tweetsOfJack2);

//   Response.json({
//     t1: tweetsOfJack1,
//     // info: info,
//     // t2: tweetsOfJack2,
//   });
// }
