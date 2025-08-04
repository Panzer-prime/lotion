import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	documents: defineTable({
		user_id: v.string(),
		content: v.optional(v.string()),
		coverImage: v.optional(v.string()),
		icon: v.optional(v.string()),
		title: v.string(),
		parentDocumet: v.optional(v.id("documents")),
	})
		.index("by_user_id", ["user_id"])
		.index("by_user_parent", ["user_id", "parentDocumet"]),
});
