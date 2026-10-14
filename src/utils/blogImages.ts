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
import image17 from "../assets/blog/17.jpg";
import image18 from "../assets/blog/18.jpg";
import image19 from "../assets/blog/19.jpg";
import image20 from "../assets/blog/20.jpg";
import image21 from "../assets/blog/21.jpg";
import image22 from "../assets/blog/22.jpg";
import image23 from "../assets/blog/23.jpg";
import image24 from "../assets/blog/24.jpg";
import image25 from "../assets/blog/25.jpg";
import image26 from "../assets/blog/26.jpg";
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
	"17.jpg": image17,
	"18.jpg": image18,
	"19.jpg": image19,
	"20.jpg": image20,
	"21.jpg": image21,
	"22.jpg": image22,
	"23.jpg": image23,
	"24.jpg": image24,
	"25.jpg": image25,
	"26.jpg": image26,
	"talos-bare-metal.jpg": talosBareMetal,
};

// Helper function to get image by filename
export function getBlogImage(
	filename: string | undefined
): ImageMetadata | undefined {
	if (!filename) return undefined;
	return blogImages[filename];
}
