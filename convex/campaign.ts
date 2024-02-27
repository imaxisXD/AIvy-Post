import { QueryCtx, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUser, mustGetCurrentUser } from "./users";

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
      const slug = await getUniqueSlug(ctx, name);
      const status = getCampaignStatus(startDate, endDate);

      const insertedCampaignId = await ctx.db.insert("campaigns", {
        name: name,
        endDate: endDate,
        postingTime: postingTime,
        startDate: startDate,
        timezone: timezone,
        utc_postingTime: utc_postingTime,
        userId: user._id,
        campaignId: slug,
        campaignIsActive: status || "err",
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

export const getCurrentUserCampaigns = query({
  async handler(ctx) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      console.error("Campaign mutation called without authentication");
      throw new Error("Campaign mutation called without authentication");
    }
    const user = await mustGetCurrentUser(ctx);

    const campaignList = await ctx.db
      .query("campaigns")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();

    if (campaignList.length < 1) {
      return null;
    }
    return campaignList;
  },
});

export const getCurrentUserActiveCampaigns = query({
  async handler(ctx) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      console.error("Campaign query called without authentication");
      throw new Error("Campaign query called without authentication");
    }
    const user = await getCurrentUser(ctx);

    if (!user) {
      console.log("New user, havent created any campaigns");
      return null;
    }

    const campaignList = await ctx.db
      .query("campaigns")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .filter((q) => q.eq(q.field("campaignIsActive"), "active"))
      .collect();

    if (campaignList.length == 0) {
      return null;
    }
    return campaignList;
  },
});

export const getCampaignWithId = query({
  args: {
    campaignId: v.string(),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      console.error("Campaign Query called without authentication");
      throw new Error("Campaign Query called without authentication");
    }

    const campaignList = await ctx.db
      .query("campaigns")
      .withIndex("by_campaignId", (q) => q.eq("campaignId", args.campaignId))
      .first();

    return campaignList;
  },
});

export function slugify(string: string) {
  const random = Math.random().toString(36).substring(7);
  return string.toLowerCase().replace(/[^a-z0-9]+/g, "") + random;
}

export function getCampaignStatus(startDate: string, endDate: string) {
  try {
    const startDateObj = Date.parse(startDate);
    const endDateObj = Date.parse(endDate);
    const now = new Date().getTime();

    if (startDateObj <= now && endDateObj >= now) {
      return "active";
    } else if (startDateObj <= now && endDateObj < now) {
      return "completed";
    } else if (startDateObj > now && endDateObj > now) {
      return "upcoming";
    } else if (startDateObj < now && endDateObj < now) {
      return "previous";
    }
    return "error";
  } catch (error: unknown) {
    console.log("error", error);
  }
}

export async function getUniqueSlug(ctx: QueryCtx, name: string) {
  const base = slugify(name);
  let slug: any;
  let n = 0;
  for (;;) {
    slug = n === 0 ? base : `${base}${n}`;
    const existing = await ctx.db
      .query("campaigns")
      .withIndex("by_campaignId", (q) => q.eq("campaignId", slug))
      .first();
    if (existing === null) {
      break;
    }
    n++;
  }
  return slug;
}
