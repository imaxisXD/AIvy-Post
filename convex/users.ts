import { Doc, Id } from "./_generated/dataModel";
import {
  QueryCtx,
  internalMutation,
  mutation,
  query,
} from "./_generated/server";
import { v } from "convex/values";

/**
 * Mutation to add a new user to the database or update existing user details if necessary.
 * @param {QueryCtx} ctx - The query context.
 * @returns {Promise<Id<"users">>} The ID of the stored or updated user.
 */
export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      console.error("store mutation called without authentication");
      throw new Error("Called store user without authentication present");
    }
    // Check if we've already stored this identity before.
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.subject))
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
      tokenIdentifier: identity.subject,
      email: identity.email!,
      pictureUrl: identity.pictureUrl,
      creditToken: 10000,
    });
  },
});

/**
 * Internal mutation to store or update a user's access token in the database.
 * @param {QueryCtx} ctx - The query context.
 * @param {Object} args - The arguments containing token data.
 * @returns {Promise<Id<"usersToken">>} The ID of the stored or updated token.
 **/
export const storeToken = internalMutation({
  args: {
    data: v.object({
      access_token: v.string(),
      scope: v.string(),
      expires_in: v.number(),
    }),
  },
  async handler(ctx, args) {
    // Ensure a current user is available for associating the token.
    const user = await mustGetCurrentUser(ctx);
    console.debug(`Storing token for user: ${user._id} and ${user.email}`);

    // Check if an access token already exists for the user.
    const existingUserToken = await ctx.db
      .query("usersToken")
      .withIndex("by_userDocId", (q) => q.eq("userId", user._id))
      .unique();

    // Update the existing token if user is present.
    if (existingUserToken) {
      console.debug(`Updating token for user: ${user._id}`);
      return await ctx.db.patch(existingUserToken._id, {
        lin_access_token: args.data.access_token,
        lin_token_expiry: args.data.expires_in,
      });
    }

    // Insert a new token record if not present.
    console.debug(`Inserting new token for user: ${user._id}`);
    return await ctx.db.insert("usersToken", {
      userId: user._id,
      lin_access_token: args.data.access_token,
      lin_token_expiry: args.data.expires_in,
    });
  },
});

/**
 * Query to get a user's access token in the database.
 * @param {QueryCtx} ctx - The query context.
 * @param {Object} args - The arguments containing userID.
 * @returns {Promise<Id<"usersToken">> || null} The ID of the stored or updated token.
 */
export const getUserToken = query({
  async handler(ctx) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      console.error("store mutation called without authentication");
      throw new Error("Called store user without authentication present");
    }
    const user = await mustGetCurrentUser(ctx);

    const userRecord = await ctx.db
      .query("usersToken")
      .withIndex("by_userDocId", (q) => q.eq("userId", user._id))
      .first();

    return userRecord;
  },
});

/**
 * Delete user's access token in the database.
 * @returns {void} The ID of the stored or updated token.
 */
export const deleteUserToken = mutation({
  async handler(ctx) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      console.error("store mutation called without authentication");
      throw new Error("Called store user without authentication present");
    }
    const user = await mustGetCurrentUser(ctx);
    const userRecord = await ctx.db
      .query("usersToken")
      .withIndex("by_userDocId", (q) => q.eq("userId", user._id))
      .unique();
    await ctx.db.delete(userRecord?._id!);
  },
});
// Helper functions below are used to query user details from the database.

/**
 * Queries a user by their token identifier.
 * @param {QueryCtx} ctx - The query context.
 * @param {string} clerkUserId - The user's token identifier.
 * @returns {Promise<Doc<"users"> | null>} The user document or null if not found.
 **/
export async function userQuery(
  ctx: QueryCtx,
  clerkUserId: string,
): Promise<Doc<"users"> | null> {
  console.debug(`Querying user by token: ${clerkUserId}`);
  return await ctx.db
    .query("users")
    .withIndex("by_token", (q) => q.eq("tokenIdentifier", clerkUserId))
    .unique();
}

/**
 * Queries a user by their document ID.
 * @param {QueryCtx} ctx - The query context.
 * @param {Id<"users">} id - The document ID of the user.
 * @returns {Promise<Doc<"users"> | null>} The user document or null if not found.
 */
export async function userById(
  ctx: QueryCtx,
  id: Id<"users">,
): Promise<Doc<"users"> | null> {
  console.debug(`Querying user by ID: ${id}`);
  return await ctx.db.get(id);
}

/**
 * Retrieves the current authenticated user's details.
 * @param {QueryCtx} ctx - The query context.
 * @returns {Promise<Doc<"users"> | null>} The current user's document or null if not authenticated.
 */
export async function getCurrentUser(
  ctx: QueryCtx,
): Promise<Doc<"users"> | null> {
  console.debug("Retrieving current user");
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) {
    console.warn("No current user identity found");
    return null;
  }
  return await userQuery(ctx, identity.subject);
}

/**
 * Ensures a current user is available and throws an error if not.
 * @param {QueryCtx} ctx - The query context.
 * @returns {Promise<Doc<"users">>} The current user's document.
 * @throws {Error} If no current user can be retrieved.
 */
export async function mustGetCurrentUser(ctx: QueryCtx): Promise<Doc<"users">> {
  console.debug("Ensuring a current user is available");
  const userRecord = await getCurrentUser(ctx);
  if (!userRecord) throw new Error("Can't get current user, can be unauth req");
  return userRecord;
}

/**
 * Queries current user's details based on their email.
 * @param {QueryCtx} ctx - The query context.
 * @param {Object} arg - The arguments containing the user's email.
 * @returns {Promise<Doc<"users"> | ["User is not Authorized", null]>} The user's document or unauthorized message.
 */
export const getUserThroughEmail = query({
  args: { userEmail: v.string() },
  handler: async (ctx, arg) => {
    console.debug(`Querying user details through email: ${arg.userEmail}`);
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      console.warn("User is not authorized");
      return ["User is not Authorized", null];
    }
    const userDetails = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), arg.userEmail))
      .first();
    return userDetails;
  },
});

export const getUserCreditToken = query({
  async handler(ctx) {
    const user = await mustGetCurrentUser(ctx);
    return user?.creditToken;
  },
});
