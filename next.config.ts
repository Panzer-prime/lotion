import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "fastly.picsum.photos",
			},
			{
				protocol: "https",
				hostname: "3lsakm0xtb.ufs.sh",
			},
		],
	},
};

export default nextConfig;
