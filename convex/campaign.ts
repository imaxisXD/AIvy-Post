import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { mustGetCurrentUser } from "./users";

/**
 * Mutation to store campaign details .
 * @param {QueryCtx} ctx - The query context.
 * @param {Object} args - The arguments containing form data.
 */
export const insertCampaignData = mutation({
  args: {
    endDate: v.string(),
    name: v.string(),
    postingTime: v.string(),
    startDate: v.string(),
    timezone: v.string(),
    utc_postingTime: v.string(),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      console.error("Campaign mutation called without authentication");
      throw new Error("Campaign mutation called without authentication");
    }

    const { endDate, name, postingTime, startDate, timezone, utc_postingTime } =
      args;
    try {
      const user = await mustGetCurrentUser(ctx);

      console.log(`Creating Campaign for user: ${user._id} and ${user.email}`);

      const insertedCampaignId = await ctx.db.insert("campaigns", {
        name: name,
        endDate: endDate,
        postingTime: postingTime,
        startDate: startDate,
        timezone: timezone,
        utc_postingTime: utc_postingTime,
      });

      ctx.db.insert("userCampaigns", {
        campaignId: insertedCampaignId,
        userId: user._id,
      });
      console.log(
        `Succesfully created the Campaign: ${name} and ID: ${insertedCampaignId} for the User-ID: ${user._id} and User-Email: ${user.email}`
      );
      return {
        message: `Succesfully created the Campaign: ${name} and ID: ${insertedCampaignId} for the User-ID: ${user._id} and User-Email: ${user.email}`,
        status: "success",
      };
    } catch (error: unknown) {
      return {
        message: error?.toString(),
        status: "error",
      };
    }
  },
});
