/*
 * @Author: vblazing
 * @Date: 2025-09-20 18:32:24
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-10-24 01:38:26
 * @Description: 主页介绍组件
 */
import * as motion from "motion/react-client";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { fetchHomeHeroInfo, fetchPublishedBlogTotal } from "@/server/data";

export default async function HeroSection() {
  const t = await getTranslations("home.hero");
  const home_hero_info = await fetchHomeHeroInfo();
  const blog_total = await fetchPublishedBlogTotal();
  return (
    <section className="bg-home-hero-section relative w-full pb-8 sm:pt-12 sm:pb-20">
      <div className="relative mx-auto max-w-6xl px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl pt-12 pb-8 text-center sm:pt-16"
        >
          {/* Welcome badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-main-text border-border mb-8 inline-flex items-center space-x-2 rounded-full border px-4 py-2 text-sm shadow-sm"
          >
            <Sparkles className="size-4" />
            <span>{home_hero_info?.welcome}</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-main-title mb-6 text-5xl leading-tight font-extralight tracking-tight md:text-7xl"
          >
            {home_hero_info?.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-main-text mx-auto mb-12 max-w-3xl text-xl leading-relaxed font-light md:text-2xl"
          >
            {home_hero_info?.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6"
          >
            <Button asChild>
              <Link
                href={"/blog"}
                className="group inline-flex h-10 items-center space-x-2 p-0 font-medium shadow-lg hover:shadow-xl has-[>svg]:px-5 md:h-14 md:text-lg md:has-[>svg]:px-8"
              >
                <span className="text-base">{t("explore")}</span>
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button asChild variant={"outline"}>
              <Link
                href={"/about"}
                className="inline-flex h-10 items-center p-0 px-5 font-medium md:h-14 md:px-8 md:text-lg"
              >
                <span className="text-base">{t("about")}</span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto flex w-full max-w-2xl items-center justify-around pt-6 pb-8 text-center sm:mt-12 sm:border-t sm:border-slate-300 sm:pt-12"
        >
          {blog_total && (
            <Link
              href={"/blog"}
              className="group cursor-pointer text-center transition-all"
            >
              <div className="text-main-title mb-1 text-xl font-light duration-200 group-hover:-translate-y-1 md:text-3xl">
                {blog_total}
                {t("stats_blog_count")}
              </div>
              <div className="text-main-text relative overflow-hidden text-xs tracking-wide md:text-base">
                <div className="w-full translate-x-0 scale-100 uppercase duration-200 group-hover:translate-x-20 group-hover:scale-0">
                  {t("stats_blog_title")}
                </div>
                <div className="absolute top-0 w-full -translate-x-20 scale-0 duration-200 group-hover:translate-x-0 group-hover:scale-100">
                  {t("stats_view_all")}
                </div>
              </div>
            </Link>
          )}
          {/* <div className="text-center">
            <div className="text-main-title mb-1 text-xl font-light md:text-3xl">
              12{t("stats_product_count")}
            </div>
            <div className="text-main-text text-xs tracking-wide uppercase md:text-base">
              {t("stats_product_title")}
            </div>
          </div> */}
          <Link
            href={"/"}
            className="group cursor-pointer text-center transition-all"
          >
            <div className="text-main-title mb-1 text-xl font-light duration-200 group-hover:-translate-y-1 md:text-3xl">
              {t("stats_idea_count")}
            </div>
            <div className="text-main-text relative text-xs tracking-wide md:text-base">
              <div className="w-full translate-x-0 scale-100 uppercase duration-200 group-hover:translate-x-20 group-hover:scale-0">
                {t("stats_idea_title")}
              </div>
              <div className="absolute top-0 w-full -translate-x-20 scale-0 duration-200 group-hover:translate-x-0 group-hover:scale-100">
                {t("stats_idea_all")}
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
