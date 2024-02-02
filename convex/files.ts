import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const generateUploadUrl = mutation({
  args: {
    // ...
  },
  handler: async (ctx, args) => {
    // use `args` and/or `ctx.auth` to authorize the user
    // ...
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Unauthenticated call to mutation");
    }
    // Return an upload URL
    return await ctx.storage.generateUploadUrl();
  },
});

export const saveStorageIds = mutation({
  // You can customize these as you like
  args: {
    email: v.string(),
    uploaded: v.array(
      v.object({
        storageId: v.string(),
      })
    ),
    // other args...
  },
  handler: async (ctx, args) => {
    // use `args` and/or `ctx.auth` to authorize the user
    // ...
    const storage = await ctx.db
      .query("storage")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();
    // or `patch`/`replace`
    if (storage) {
      console.log("Existed storage");

      ctx.db.patch(storage?._id, {
        storageId: [
          ...args.uploaded.map(({ storageId }) => storageId),
          ...(storage.storageId || []),
        ],
        // ...
      });
    } else {
      console.log("UN Existed storage");

      // Save the storageId to the database using `insert`
      ctx.db.insert("storage", {
        email: args.email,
        storageId: args.uploaded.map(({ storageId }) => storageId),
        // ...
      });
    }
    return await ctx.storage.getUrl(args.uploaded[0].storageId[0]);
  },
});
