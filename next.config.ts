import type { NextConfig } from "next";

/* `next dev` and `next build` share `.next` by default, so building while the
   dev server is running overwrites its chunks and the dev server starts
   returning 500s. Routing production builds to their own directory makes that
   collision impossible.

   Use `npm run build:prod` / `npm run start:prod` — never bare `next build`
   while `npm run dev` is up. */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
