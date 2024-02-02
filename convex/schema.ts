import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  storage: defineTable({
    email: v.string(),
    storageId: v.array(v.string()),
  }),
  users: defineTable({
    email: v.string(),
    name: v.string(),
    twitter_access_token: v.string(),
    twitter_refresh_token: v.string(),
    twitter_token_expiry_time: v.float64(),
    twitter_userID: v.string(),
  }),
  customers: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(),
    email: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
});
