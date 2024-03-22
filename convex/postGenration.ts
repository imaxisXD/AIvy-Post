import {
  internalAction,
  internalMutation,
  mutation,
  query,
} from "./_generated/server";
import { v } from "convex/values";
import Anthropic from "@anthropic-ai/sdk";
import { internal } from "./_generated/api";
import { mustGetCurrentUser } from "./users";

export const generatePostGeneration = mutation({
  args: {
    campaignId: v.string(),
    userInput: v.string(),
  },
  async handler(ctx, args) {
    const user = await mustGetCurrentUser(ctx);

    if (user.creditToken != null && user.creditToken < 0) {
      return {
        errorMsg: "You dont have enough tokens!",
      };
    }

    if (
      args.userInput == null ||
      args.userInput.length == 0 ||
      args.userInput.trim().length == 0
    ) {
      return {
        errorMsg: "Please provide a valid input",
      };
    }

    const campaignPostData = await ctx.db
      .query("campaignPosts")
      .withIndex("by_campaignId", (q) => q.eq("campaignId", args.campaignId))
      .unique();

    if (campaignPostData == null) {
      await ctx.db.insert("campaignPosts", {
        campaignId: args.campaignId,
        userPostMsg: args.userInput,
        generatedPostMsg: "......... ⚡️ Generating Post ........",
        done: false,
      });
    }

    await ctx.scheduler.runAfter(0, internal.postGenration.anthropicCall, {
      campaignId: args.campaignId,
      userInput: args.userInput,
      userId: user._id,
      userCurrentToken: user.creditToken || 0,
    });

    return { success: true };
  },
});

export const anthropicCall = internalAction({
  args: {
    campaignId: v.string(),
    userInput: v.string(),
    userId: v.id("users"),
    userCurrentToken: v.number(),
  },
  async handler(ctx, args) {
    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_KEY!,
    });
    let body = "";

    try {
      const stream = await client.messages.create({
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Post on why jumping technologies will never make you learn one language entirely.",
              },
            ],
          },
          {
            role: "assistant",
            content: [
              {
                type: "text",
                text: '"Today I will learn Javascript".\n"Tomorrow I will start with Go lang".\n"Next week I will start learning Python".\n\nSounds like all of us, right?\nRunning behind the shiny technologies that come our way.\nOh! Flutter is gaining hype, let me watch 2 videos.\nOh! Everyone is talking about Data Analyst, let me learn SQL.\nOh! An influencer said Web Dev is the new thing, let me leave everything and join the course.\n(Taking a dig on myself as well)\n\nBecause your aim should not be to jump from tech to tech.\nBut sticking to one.\nSpend enough time on one skill.\n\nMost of us have heard the "Thirsty Crow" story, right?\nA crow was thirsty.\nFound a jar of water and to drink it, he started dropping stones in the jar so that the water can come up.\n\nNow imagine,\nIf the crow threw stones in one jar for sometime, then jumps to another jar, throws some stones again, and keeps doing the same.\nDo you think the crow will ever get water on the surface?\n\nUntil and unless, he spends time on a single jar, he will always be thirsty.\nIf you also keep jumping technologies, you will never be able to learn one language entirely.\nSpend enough time on one.\nCreate projects.\nThen switch to learning another one.\n\nWhich technology are you currently learning and have spent how much time on the same?😄\n \nhashtag#technology hashtag#webdevelopment hashtag#projectmanagement hashtag#javascriptdeveloper hashtag#pythondeveloper',
              },
            ],
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "How freelancing helps\n",
              },
            ],
          },
          {
            role: "assistant",
            content: [
              {
                type: "text",
                text: "1,00,000.\nThis was the first amount, I'd earned for a freelancing project on the sides.\n\nBack then I was working at Cisco.\nAnd I had this itchy feeling that I wanted to learn Web Development.\n\nI started reading a lot of books to fixate on the basics.\nThen, I started creating projects. But the problem with creating projects is you don't know exactly what to create.\nSo, I thought of creating some websites.\n\nI talked to a few local shops and got myself a project.\nHad to create a website for Behrouz Biryani.\nWent to the cafes.\nWorked on weekends for 8-9 hours.\nFinally, when the project was ready, I had 3 more with me.\n\nThis how freelancing helps.\n✅ Get Hands-on: Instead of creating random tutorial projects, it is better to create it for some businesses.\n\n✅ Exposure: When you are working in a company, you are involved in a single project. But freelancing gets you an idea of various industries. Some feature in one industry would be different for the other one.\n\n✅ Extra Money: Of course, we can't deny the fact that a little extra money hurts no one. Especially when you are just using your weekends to work on these projects, it doesn't harm. Afterall, how many Netflix series are we gonna watch?\n\n✅ Learnings: It is not just the skill set you are learning but you learn the power of communicating with the clients, how to sell your work, negotiations, creating portfolios, and managing the money. Absolutely no where, you can get such learnings while working. \n\n✅ Networking: For capturing your first project, you usually talk to your friends. They connect you with their friends. \nThe chain continues.\nYou also start showcasing your work in social media channels which again expands your network.\nThis network is a gold mine.\nLeverage it.\n\nDo you freelance? If yes, what is your top tip?\nhashtag#freelancedeveloper hashtag#freelancingtips hashtag#freelance hashtag#webdevelopment ",
              },
            ],
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Post on ${args.userInput} . Post should start directly include emojis, format the post beautifully include newlines bullet points like how it is generally done for LinkedIn posts including line breaks, spaces and tabs. For the user's input topic, if possible include an example or analogies or quotes or a short story then do ADD THEM and NEVER include tags in the body I REPEAT NEVER! include tags in the body and I should not see tags in this message.`,
              },
            ],
          },
        ],
        model: "claude-3-sonnet-20240229",
        max_tokens: 1024,
        temperature: 0.75,
        stream: true,
        system:
          "Your task is to generate a viral LinkedIn post for 10 days based on the user's input topic. Employ a positive, empathetic, inspiring, exciting, raw human tone, NO AI or LLM sounding tone with easy-to-understand language it should be so engaging that everyone who reads it feels to comment below it. Use relevant examples, analogies, or quotes to reinforce your message and make it more impactful and most importantly keep it short. Ensure the post is concise, short, beautifully formated with bullet points, authentic, engaging, personalized, unique, easy to understand and starts directly. Maintain a consistent tone and human writing style. Remember to keep the content original, informative, and compliant with LinkedIn's policies and guidelines. You are allowed to use emojis and new lines to format the post beautifully and incorporate excellent copywriting techniques like opening with a catchy hook to catch attention, ending with a call to action, etc techniques.\n\nThe output SHOULD BE in the below format and give output directly without anything before the output format and only the first-day response should be generated.\n\nA catchy hook-based title on the user's input topic conveys what this post is about and not be too long and the title should be catchy so that it makes the readers open the whole post.\n\nALWAYS! I repeat include emojis in every sentence and format the post beautifully include newlines bullet points like how it is generally done for LinkedIn posts including line breaks, spaces and tabs. For the user's input topic, if possible include an example or analogies or quotes or a short story then do ADD THEM and NEVER include tags in the body I REPEAT NEVER! include tags in the body and I should not see tags in this message.\n\ntags that are to be added to the post. \n\n",
      });

      for await (const event of stream) {
        if (
          event.type === "content_block_delta" &&
          event.delta.type === "text_delta"
        ) {
          body += event.delta.text;
          await ctx.runMutation(internal.postGenration.updatePostGeneration, {
            campaignId: args.campaignId,
            generatedPostMsg: body,
            userTopic: args.userInput,
            done: false,
          });
        }
        // Update the user's credit token
        if (event.type === "message_delta") {
          await ctx.runMutation(internal.postGenration.updateUserToken, {
            generatedToken: event.usage.output_tokens,
            userId: args.userId,
            userCurrentToken: args.userCurrentToken,
          });
        }
        // Update that the post is done
        if (event.type === "message_stop") {
          await ctx.runMutation(internal.postGenration.updatePostGeneration, {
            campaignId: args.campaignId,
            generatedPostMsg: body,
            done: true,
            userTopic: args.userInput,
          });
        }
      }
    } catch (error) {
      console.error("Error in anthropic call", error);
      throw new Error("Error in anthropic call");
    }
    return body;
  },
});

export const updatePostGeneration = internalMutation({
  args: {
    campaignId: v.string(),
    generatedPostMsg: v.string(),
    done: v.boolean(),
    userTopic: v.string(),
  },
  handler: async (ctx, { campaignId, generatedPostMsg, done, userTopic }) => {
    const postId = await ctx.db
      .query("campaignPosts")
      .withIndex("by_campaignId", (q) => q.eq("campaignId", campaignId))
      .first();

    if (postId) {
      await ctx.db.patch(postId._id, {
        userPostMsg: userTopic,
        generatedPostMsg: generatedPostMsg,
        done: done,
      });
    }
  },
});

export const list = query({
  args: {
    campaignId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      console.error("Campaign Posts query called without authentication");
      throw new Error("Campaign Posts query called without authentication");
    }
    const messages = await ctx.db
      .query("campaignPosts")
      .withIndex("by_campaignId", (q) => q.eq("campaignId", args.campaignId))
      .first();

    return messages;
  },
});

export const updateUserToken = internalMutation({
  args: {
    userId: v.id("users"),
    generatedToken: v.number(),
    userCurrentToken: v.number(),
  },
  async handler(ctx, args) {
    let newTokenAmount: number = args.userCurrentToken - args.generatedToken;
    await ctx.db.patch(args.userId, {
      creditToken: newTokenAmount,
    });
  },
});
