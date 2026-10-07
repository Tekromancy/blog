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
		type: z.enum(["shell", "prompt", "script", "python", "rust", "perl", "javascript", "cpp", "go", "lisp", "haskell", "ruby", "assembly", "elixir", "solidity", "zig", "prolog", "apl", "fortran", "cobol", "java", "wasm", "julia", "forth", "smalltalk", "ada", "sql", "lua", "r", "php", "vhdl", "brainfuck", "erlang", "clojure", "scala", "swift", "kotlin", "algol", "b", "pascal", "ocaml", "fsharp", "dart", "actionscript", "coldfusion", "delphi", "vb", "logo", "foxpro", "pli", "snobol", "simula", "tcl", "nim", "crystal", "v", "d", "racket", "scheme", "gleam", "pony", "reason", "haxe", "csharp", "objc", "matlab", "mathematica", "groovy", "eiffel", "abap", "rpg", "labview", "scratch", "malbolge", "whitespace", "intercal", "befunge", "arnoldc", "spl", "lolcode", "piet", "j", "golfscript", "typescript", "htmx", "css", "graphql", "terraform", "nix", "jq", "xslt", "cypher", "makefile", "agda", "idris", "coq", "tlaplus", "elm", "sml", "unison", "koka", "futhark", "fstar", "mojo", "odin", "carbon", "hare", "roc", "vala", "gdscript", "verse", "vyper", "move", "awk", "sed", "mumps", "rexx", "jcl", "autohotkey", "postscript", "bcpl", "gml", "chill", "c", "powershell", "vba", "hack", "raku", "miranda", "purescript", "twine", "lean", "isabelle", "alloy", "cairo", "motoko", "plutus", "michelson", "inform7", "dhall", "cue", "starlark", "jsonnet", "chef", "chicken", "trefunge"]),
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
