import { UserJSON } from "@clerk/nextjs/dist/types/server";
import { Doc, Id } from "./_generated/dataModel";
import {
  QueryCtx,
  internalMutation,
  mutation,
  query,
} from "./_generated/server";
import { v } from "convex/values";

// Add user tokens to Database
// export const setUserDetails = mutation({
//   args: {
//     name: v.string(),
//     email: v.string(),
//     t_access_token: v.string(),
//     t_refresh_token: v.string(),
//     t_expires: v.number(),
//     t_id: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (identity === null) {
//       return ["User is not Authurised", null];
//     }
//     const user = await ctx.db
//       .query("users")
//       .filter((q) => q.eq(q.field("email"), args.email))
//       .first();

//     if (!user) {
//       console.log(
//         `User with email ${args.email} added to the database succesfully.`
//       );
//       return await ctx.db.insert("users-token", {
//         userId: identity.subject,
//       });
//     } else {
//       console.log(
//         `User with email ${args.email} already exists in the database.\n Updating the tokens of the user.`
//       );
//       return await ctx.db.patch(user._id, {
//         twitter_access_token: args.t_access_token,
//         twitter_refresh_token: args.t_refresh_token,
//         twitter_token_expiry_time: args.t_expires,
//       });
//     }
//   },
// });

// Return current users details
export const getUserDetails = query({
  args: { userEmail: v.string() },
  handler: async (ctx, arg) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      return ["User is not Authurised", null];
    }
    const userDetails = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), arg.userEmail))
      .first();
    return userDetails;
  },
});

// Add new user to DB or do nothing for existing user
export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called store user without authentication present");
    }
    // Check if we've already stored this identity before.
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    // If we've seen this identity before but the name has changed, patch the value.
    if (existingUser !== null) {
      if (existingUser.name !== identity.name) {
        await ctx.db.patch(existingUser._id, {
          name: identity.name,
          email: identity.email,
        });
      }
      return existingUser._id;
    }
    // If it's a new identity, create a new `User`.
    return await ctx.db.insert("users", {
      name: identity.name!,
      tokenIdentifier: identity.tokenIdentifier,
      email: identity.email!,
      pictureUrl: identity.pictureUrl,
    });
  },
});

//Add access token to DB
export const storeToken = internalMutation({
  args: {
    data: v.object({
      access_token: v.string(),
      scope: v.string(),
      expires_in: v.number(),
    }),
  },
  async handler(ctx, args) {
    const user = await mustGetCurrentUser(ctx);
    const existingUserToken = await ctx.db
      .query("usersToken")
      .withIndex("by_userDocId", (q) => q.eq("userId", user._id))
      .unique();

    // If access token present then update it
    if (existingUserToken) {
      return await ctx.db.patch(existingUserToken._id, {
        lin_access_token: args.data.access_token,
        lin_token_expiry: args.data.expires_in,
      });
    }

    // If not present then add to database
    return await ctx.db.insert("usersToken", {
      userId: user._id,
      lin_access_token: args.data.access_token,
      lin_token_expiry: args.data.expires_in,
    });
  },
});

// Helpers
export async function userQuery(
  ctx: QueryCtx,
  clerkUserId: string
): Promise<Doc<"users"> | null> {
  return await ctx.db
    .query("users")
    .withIndex("by_token", (q) => q.eq("tokenIdentifier", clerkUserId))
    .unique();
}

export async function userById(
  ctx: QueryCtx,
  id: Id<"users">
): Promise<Doc<"users"> | null> {
  return await ctx.db.get(id);
}

async function getCurrentUser(ctx: QueryCtx): Promise<Doc<"users"> | null> {
  console.log("Coming here");

  const identity = await ctx.auth.getUserIdentity();
  console.log("XXXXXXXXXX----->", JSON.stringify(identity));
  if (identity === null) {
    return null;
  }
  return await userQuery(ctx, identity.tokenIdentifier);
}

export async function mustGetCurrentUser(ctx: QueryCtx): Promise<Doc<"users">> {
  console.log("Coming here");

  const userRecord = await getCurrentUser(ctx);
  if (!userRecord) throw new Error("Can't get current user");
  return userRecord;
}
