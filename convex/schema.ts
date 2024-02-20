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
  userCampaigns: defineTable({
    campaignId: v.id("campaigns"),
    userId: v.id("users"),
  })
    .index("by_campaignId", ["campaignId"])
    .index("by_userId", ["userId"]),
  campaigns: defineTable({
    name: v.string(),
    startDate: v.string(),
    endDate: v.string(),
    postingTime: v.string(),
    timezone: v.string(),
    utc_postingTime: v.string(),
  }),
  users: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(),
    email: v.string(),
    pictureUrl: v.optional(v.string()),
  })
    .index("by_token", ["tokenIdentifier"])
    .index("by_email", ["email"]),
});
