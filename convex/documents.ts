import { ConvexError, v } from "convex/values";
import { query, mutation } from "./_generated/server";

const userId = "smt";
export const getById = query({
	args: { documentID: v.string() },
	handler: async (ctx, args) => {
		const normalizedId = ctx.db.normalizeId("documents", args.documentID);
		if (!normalizedId) throw new ConvexError("Invalid document ID");
		const document = await ctx.db.get(normalizedId);

		if (document == null) {
			throw new ConvexError("Document couldn't be found");
		}

		return document;
	},
});

export const getSidebar = query({
	args: { parentId: v.optional(v.id("documents")) },
	handler: async (ctx, args) => {
		const documents = await ctx.db
			.query("documents")
			.withIndex("by_user_parent", (q) =>
				q.eq("user_id", userId).eq("parentDocumet", args.parentId),
			)
			.order("desc")
			.collect();
		return documents;
	},
});
export const getUserDocuments = query({
	handler: async (ctx) => {
		const documents = await ctx.db
			.query("documents")
			.withIndex("by_user_id", (q) => q.eq("user_id", userId))
			.order("desc")
			.collect();

		return documents;
	},
});
export const create = mutation({
	args: { title: v.string(), parentDocument: v.optional(v.id("documents")) },
	handler: async (ctx, args) => {
		const document = await ctx.db.insert("documents", {
			parentDocumet: args.parentDocument,
			title: args.title,
			user_id: userId,
		});
		return document;
	},
});

export const update = mutation({
	args: {
		id: v.string(),
		title: v.optional(v.string()),
		content: v.optional(v.string()),
		coverImage: v.optional(v.string()),
		icon: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const { id, ...rest } = args;
		const normalizedId = ctx.db.normalizeId("documents", args.id);
		if (!normalizedId) throw new ConvexError("Invalid document ID");

		const existingDocs = await ctx.db.get(normalizedId);
		console.log(existingDocs);

		if (!existingDocs) throw new Error("Document couldnt be found");

		await ctx.db.patch(normalizedId, {
			...rest,
		});
	},
});

export const deleteTask = mutation({
	args: { id: v.id("documents") },
	handler: async (ctx, args) => {
		await ctx.db.delete(args.id);
	},
});
