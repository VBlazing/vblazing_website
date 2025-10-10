/*
 * @Author: vblazing
 * @Date: 2025-09-02 18:01:24
 * @LastEditors: vblazing
 * @LastEditTime: 2025-10-11 00:01:55
 * @Description: 主页
 */
import { Suspense } from "react";
import HeroSection from "@/components/home/hero_section";
import { HomeHeroSkeleton, RecentBlogSkeleton } from "@/components/ui/skeleton";
import FeaturedBlog from "@/components/home/featured_blog";
import RecentBlog from "@/components/home/recent_blog";
import ExploreBlog from "@/components/home/explore_blog";

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      {/* 介绍 */}
      <Suspense fallback={<HomeHeroSkeleton />}>
        <HeroSection />
      </Suspense>

      <div className="w-full py-16">
        {/* 精选博客 */}
        <FeaturedBlog />

        {/* 最近博客 */}
        <Suspense fallback={<RecentBlogSkeleton />}>
          <RecentBlog />
        </Suspense>

        {/* 发现博客 */}
        <ExploreBlog />
      </div>
    </div>
  );
}
