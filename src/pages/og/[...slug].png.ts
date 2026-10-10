import { getCollection } from "astro:content";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import fs from "fs/promises";
import path from "path";
import React from "react";
import { getPostAuthors } from "../../data/authors";

export async function getStaticPaths() {
	const posts = await getCollection("blog");
	return posts.map((post) => ({
		params: { slug: post.id },
		props: post,
	}));
}

export async function GET({ props }) {
	const post = props;
	const authors = getPostAuthors(post.data);
	const authorStr = authors.map((a) => a.name).join(", ");
	
	const fontPath = path.resolve("./public/fonts/JetBrainsMono-Bold.ttf");
	const fontData = await fs.readFile(fontPath);

	const svg = await satori(
		React.createElement(
			"div",
			{
				style: {
					display: "flex",
					flexDirection: "column",
					height: "100%",
					width: "100%",
					backgroundColor: "#000000",
					color: "#ffffff",
					padding: "60px",
					fontFamily: '"JetBrains Mono"',
					backgroundImage: "radial-gradient(circle at 25px 25px, #1a2e21 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1a2e21 2%, transparent 0%)",
					backgroundSize: "100px 100px",
				},
			},
			React.createElement(
				"div",
				{
					style: {
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						height: "100%",
						width: "100%",
						border: "2px solid #22EE44",
						borderRadius: "20px",
						padding: "50px",
						backgroundColor: "rgba(0, 0, 0, 0.8)",
					},
				},
				// Top section (Title and Tags)
				React.createElement(
					"div",
					{ style: { display: "flex", flexDirection: "column" } },
					React.createElement(
						"div",
						{
							style: {
								display: "flex",
								alignItems: "center",
								marginBottom: "30px",
							},
						},
						React.createElement(
							"span",
							{
								style: {
									color: "#22EE44",
									fontSize: "24px",
									fontWeight: "bold",
									marginRight: "15px",
								},
							},
							">"
						),
						React.createElement(
							"span",
							{
								style: {
									color: "#0ea5e9",
									fontSize: "24px",
								},
							},
							post.data.tags?.join("  //  ") || "Dispatches"
						)
					),
					React.createElement(
						"h1",
						{
							style: {
								fontSize: "64px",
								fontWeight: "bold",
								lineHeight: 1.2,
								marginBottom: "20px",
							},
						},
						post.data.title
					)
				),
				// Bottom section (Author and Brand)
				React.createElement(
					"div",
					{
						style: {
							display: "flex",
							justifyContent: "space-between",
							alignItems: "flex-end",
						},
					},
					React.createElement(
						"div",
						{ style: { display: "flex", flexDirection: "column" } },
						React.createElement(
							"span",
							{ style: { color: "#64748b", fontSize: "24px", marginBottom: "10px" } },
							"Author"
						),
						React.createElement(
							"span",
							{ style: { color: "#ffffff", fontSize: "32px", fontWeight: "bold" } },
							authorStr
						)
					),
					React.createElement(
						"div",
						{
							style: {
								display: "flex",
								alignItems: "center",
								backgroundColor: "#22EE44",
								padding: "10px 20px",
								borderRadius: "8px",
							},
						},
						React.createElement(
							"span",
							{
								style: {
									color: "#000000",
									fontSize: "28px",
									fontWeight: "bold",
								},
							},
							"TEKROMANCY"
						)
					)
				)
			)
		),
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: "JetBrains Mono",
					data: fontData,
					weight: 700,
					style: "normal",
				},
			],
		}
	);

	const resvg = new Resvg(svg, {
		fitTo: {
			mode: "width",
			value: 1200,
		},
	});

	const image = resvg.render();
	const pngBuffer = image.asPng();

	return new Response(pngBuffer, {
		headers: {
			"Content-Type": "image/png",
		},
	});
}
