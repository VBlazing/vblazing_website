/*
 * @Author: vblazing
 * @Date: 2025-09-02 18:01:24
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-10-24 20:42:35
 * @Description: next配置
 */
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  cacheComponents: true,
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
    // 允许
    dangerouslyAllowLocalIP: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

const withNextIntl = createNextIntlPlugin('./lib//i18n//request.ts')

export default withNextIntl(nextConfig);
