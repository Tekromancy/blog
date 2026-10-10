import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import fs from "fs/promises";
import path from "path";
import React from "react";
import { getAllAuthors } from "../../../data/authors";
import { SITE } from "../../../config/site.mjs";

export async function getStaticPaths() {
	const authors = getAllAuthors();
	return authors.map((author) => ({
		params: { id: author.id },
		props: author,
	}));
}

export async function GET({ props }) {
	const author = props;
	
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
				// Top section
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
							"Author Profile"
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
						author.name
					),
					React.createElement(
						"p",
						{
							style: {
								fontSize: "24px",
								color: "#94a3b8",
								lineHeight: 1.5,
								maxWidth: "800px",
							},
						},
						author.role || author.bio.substring(0, 100) + "..."
					)
				),
				// Bottom section
				React.createElement(
					"div",
					{
						style: {
							display: "flex",
							justifyContent: "flex-end",
							alignItems: "flex-end",
						},
					},
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
