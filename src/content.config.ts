import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
	loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		tags: z.array(z.string()).default([]),
		author: z.string().default("Joshua Edward McLaughlin Cox"),
		authors: z.array(z.string()).optional(),
		draft: z.boolean().default(false),
	}),
});

const incantations = defineCollection({
	loader: glob({ base: "./src/content/incantations", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		type: z.enum(["shell", "prompt", "script", "python", "rust", "perl", "javascript", "cpp", "go", "lisp", "haskell", "ruby", "assembly", "elixir", "solidity", "zig", "prolog", "apl", "fortran", "cobol", "java", "wasm", "julia"]),
		gofPattern: z.string(),
		gofCategory: z.enum(["Creational", "Structural", "Behavioral", "Architectural", "Resilience"]),
		arcaneSchool: z.string(),
		formula: z.string(),
		tags: z.array(z.string()).default([]),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		author: z.string().default("Joshua Edward McLaughlin Cox"),
		difficulty: z.enum(["Apprentice", "Adept", "Archmage"]).default("Adept"),
		draft: z.boolean().default(false),
	}),
});

export const collections = { blog, incantations };
