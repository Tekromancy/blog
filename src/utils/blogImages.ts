// Import blog images
import image1 from "../assets/blog/1.jpg";
import image2 from "../assets/blog/2.jpg";
import image3 from "../assets/blog/3.jpg";
import image4 from "../assets/blog/4.jpg";
import image5 from "../assets/blog/5.jpg";
import image6 from "../assets/blog/6.jpg";
import image7 from "../assets/blog/7.jpg";
import image8 from "../assets/blog/8.png";
import image9 from "../assets/blog/9.png";
import image10 from "../assets/blog/10.jpg";
import image11 from "../assets/blog/11.jpg";
import image12 from "../assets/blog/12.jpg";
import image13 from "../assets/blog/13.jpg";
import image14 from "../assets/blog/14.jpg";
import image15 from "../assets/blog/15.jpg";
import image16 from "../assets/blog/16.jpg";
import talosBareMetal from "../assets/blog/talos-bare-metal.jpg";
import type { ImageMetadata } from "astro";

// Map image filenames to imported images
export const blogImages: Record<string, ImageMetadata> = {
	"1.jpg": image1,
	"2.jpg": image2,
	"3.jpg": image3,
	"4.jpg": image4,
	"5.jpg": image5,
	"6.jpg": image6,
	"7.jpg": image7,
	"8.png": image8,
	"9.png": image9,
	"10.jpg": image10,
	"11.jpg": image11,
	"12.jpg": image12,
	"13.jpg": image13,
	"14.jpg": image14,
	"15.jpg": image15,
	"16.jpg": image16,
	"talos-bare-metal.jpg": talosBareMetal,
};

// Helper function to get image by filename
export function getBlogImage(
	filename: string | undefined
): ImageMetadata | undefined {
	if (!filename) return undefined;
	return blogImages[filename];
}
