/*
 * @Author: vblazing
 * @Date: 2025-09-02 18:01:24
 * @LastEditors: vblazing
 * @LastEditTime: 2025-09-21 19:20:05
 * @Description:
 */
import { Suspense } from "react";
import HeroSection from "@/components/home/hero_section";
import { HomeHeroSkeleton } from "@/components/ui/skeleton";

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      {/* 介绍 */}
      <Suspense fallback={<HomeHeroSkeleton />}>
        <HeroSection />
      </Suspense>
    </div>
  );
}
