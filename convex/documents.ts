import { ConvexError, v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getById = query({
	args: { documentID: v.string() },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error("Not authenticated");
		}

		const userId = identity.subject;

		const normalizedId = ctx.db.normalizeId("documents", args.documentID);

		if (!normalizedId) throw new ConvexError("Invalid document ID");
		const document = await ctx.db.get(normalizedId);

		if (document == null) {
			throw new ConvexError("Document couldn't be found");
		}
		if (document.user_id !== userId) {
			throw new Error("Not authorized");
		}

		return document;
	},
});

export const deleteDocumet = mutation({
	args: { id: v.id("documents") },
	handler: async (ctx, args) => {
		const document = await ctx.db.get(args.id);
		if (!document) throw new Error("Documnet couldnt be found");

		const deletedID = ctx.db.delete(args.id);
		return deletedID;
	},
});

export const getSidebar = query({
	args: { parentId: v.optional(v.id("documents")) },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error("Not authenticated");
		}

		const userId = identity.subject;

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
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error("Not authenticated");
		}

		const userId = identity.subject;

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
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error("Not authenticated");
		}

		const userId = identity.subject;

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
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error("Not authenticated");
		}

		const userId = identity.subject;

		const { id, ...rest } = args;
		const normalizedId = ctx.db.normalizeId("documents", args.id);
		if (!normalizedId) throw new ConvexError("Invalid document ID");

		const existingDocs = await ctx.db.get(normalizedId);
		console.log(existingDocs);

		if (!existingDocs) throw new Error("Document couldnt be found");
		if (existingDocs.user_id !== userId) throw new Error("Not permited");

		await ctx.db.patch(normalizedId, {
			...rest,
		});
	},
});

export const deleteTask = mutation({
	args: { id: v.id("documents") },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error("Not authenticated");
		}

		const userId = identity.subject;
		const document = await ctx.db.get(args.id);

		if (!document) throw new Error("Document couldnt be found");

		if (document.user_id !== userId) throw new Error("Not authorized");
		await ctx.db.delete(args.id);
	},
});

export const search = query({
	args: { title: v.string() },
	handler: async (ctx, args) => {
		const indentity = await ctx.auth.getUserIdentity();
		if (!indentity) throw new Error("Not authenticated");

		const userId = indentity.subject;

		const documents = await ctx.db
			.query("documents")
			.withSearchIndex("search_title", (q) =>
				q.search("title", args.title).eq("user_id", userId),
			);

		return documents
	},
});
