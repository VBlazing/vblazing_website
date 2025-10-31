/*
 * @Author: vblazing
 * @Date: 2025-09-02 18:01:24
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-10-25 01:01:22
 * @Description: 主页
 */
import { Suspense, use } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/home/hero_section";
import { HomeHeroSkeleton, RecentBlogSkeleton } from "@/components/ui/skeleton";
import FeaturedBlog from "@/components/home/featured_blog";
import RecentBlog from "@/components/home/recent_blog";
import ExploreBlog from "@/components/home/explore_blog";

export async function generateMetadata() {
  const t = await getTranslations("metadata");
  return {
    title: `${t("blazer")} - ${t("home")}`,
  };
}
export default function Home({ params }: PageProps<"/[locale]">) {
  // for static rendering
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <div className="min-h-screen w-full">
      {/* 介绍 */}
      <Suspense fallback={<HomeHeroSkeleton />}>
        <HeroSection />
      </Suspense>

      <div className="w-full pt-16 pb-12 sm:py-16">
        {/* 精选博客 */}
        <Suspense>
          <FeaturedBlog />
        </Suspense>

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
