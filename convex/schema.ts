import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  storage: defineTable({
    userId: v.id("users"),
    storageId: v.array(v.string()),
  }).index("by_userDocId", ["userId"]),
  usersToken: defineTable({
    userId: v.id("users"),
    lin_access_token: v.string(),
    lin_token_expiry: v.number(),
  }).index("by_userDocId", ["userId"]),
  campaigns: defineTable({
    name: v.string(),
    startDate: v.string(),
    endDate: v.string(),
    postingTime: v.string(),
    timezone: v.string(),
    utc_postingTime: v.string(),
    userId: v.id("users"),
    campaignId: v.string(),
    campaignIsActive: v.string(),
  })
    .index("by_userId", ["userId"])
    .index("by_campaignId", ["campaignId"]),
  campaignPosts: defineTable({
    campaignId: v.string(),
    userPostMsg: v.string(),
    generatedPostMsg: v.string(),
    done: v.boolean(),
  }).index("by_campaignId", ["campaignId"]),
  users: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(),
    email: v.string(),
    pictureUrl: v.optional(v.string()),
    creditToken: v.optional(v.number()),
  })
    .index("by_token", ["tokenIdentifier"])
    .index("by_email", ["email"]),
});
