/*
 * @Author: vblazing
 * @Date: 2025-09-02 18:01:24
 * @LastEditors: vblazing
 * @LastEditTime: 2025-10-22 10:56:07
 * @Description: next配置
 */
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{
      // 图库
      hostname: 'images.unsplash.com',
    }, {
      // simple icons
      // links: https://simpleicons.org/
      hostname: 'cdn.simpleicons.org',
    }, {
      // bucket
      hostname: 'vblazing-blog-1253367486.cos.accelerate.myqcloud.com'
    }],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig);
