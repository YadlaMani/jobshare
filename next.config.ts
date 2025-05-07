import type { NextConfig } from "next";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const nextConfig: NextConfig = {
  /* config options here */
  plugins: [new MiniCssExtractPlugin()],
};

export default nextConfig;
