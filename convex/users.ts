import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Add user to Database
export const setUserDetails = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    t_access_token: v.string(),
    t_refresh_token: v.string(),
    t_expires: v.number(),
    t_id: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (!user) {
      console.log(
        `User with email ${args.email} added to the database succesfully.`
      );
      return await ctx.db.insert("users", {
        name: args.name,
        email: args.email,
        twitter_userID: args.t_id,
        twitter_access_token: args.t_access_token,
        twitter_refresh_token: args.t_refresh_token,
        twitter_token_expiry_time: args.t_expires,
      });
    } else {
      console.log(
        `User with email ${args.email} already exists in the database.\n Updating the tokens of the user.`
      );
      return await ctx.db.patch(user._id, {
        twitter_access_token: args.t_access_token,
        twitter_refresh_token: args.t_refresh_token,
        twitter_token_expiry_time: args.t_expires,
      });
    }
  },
});

// Return current users details
export const getUserDetails = query({
  args: { userEmail: v.string() },
  handler: async (ctx, arg) => {
    const userDetails = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), arg.userEmail))
      .first();
    return userDetails;
  },
});

// Add user to Customber DB
export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }
    // Check if we've already stored this identity before.
    const user = await ctx.db
      .query("customers")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();
    if (user !== null) {
      // If we've seen this identity before but the name has changed, patch the value.
      if (user.name !== identity.name) {
        await ctx.db.patch(user._id, {
          name: identity.name,
          email: identity.email,
        });
      }
      return user._id;
    }
    // If it's a new identity, create a new `User`.
    return await ctx.db.insert("customers", {
      name: identity.name!,
      tokenIdentifier: identity.tokenIdentifier,
      email: identity.email!,
    });
  },
});
