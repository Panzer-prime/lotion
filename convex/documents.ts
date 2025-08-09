import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

const userId = "smt";
export const getById = query({
	args: { documentID: v.id("documents") },
	handler: async (ctx, args) => {
		const document = await ctx.db.get(args.documentID);

		if (!document) {
			throw new Error("Document couldn't be found");
		}

		return document;
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
		id: v.id("documents"),
		title: v.optional(v.string()),
		content: v.optional(v.string()),
		coverImage: v.optional(v.string()),
		icon: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const { id, ...rest } = args;
		console.log(args.coverImage, "someting here?");
		const existingDocs = await ctx.db.get(id);
		console.log(existingDocs);

		if (!existingDocs) throw new Error("Document couldnt be found");

		await ctx.db.patch(id, {
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
