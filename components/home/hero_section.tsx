/*
 * @Author: vblazing
 * @Date: 2025-09-20 18:32:24
 * @LastEditors: vblazing
 * @LastEditTime: 2025-09-22 21:30:41
 * @Description: 主页介绍组件
 */
import * as motion from "motion/react-client";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { fetchHomeHeroInfo } from "@/server/data";

export default async function HeroSection() {
  const t = await getTranslations("home.hero");
  const homeHeroInfo = await fetchHomeHeroInfo();

  return (
    <section className="bg-home-hero-section relative w-full pb-8 sm:pt-12 sm:pb-20">
      <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
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
            <span>{homeHeroInfo.welcome}</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-main-title mb-6 text-5xl leading-tight font-extralight tracking-tight md:text-7xl"
          >
            {homeHeroInfo.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-main-text mx-auto mb-12 max-w-3xl text-xl leading-relaxed font-light md:text-2xl"
          >
            {homeHeroInfo.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6"
          >
            <Button className="group h-10 p-0 text-sm shadow-lg hover:shadow-xl md:h-14 md:text-lg">
              <Link
                href={"/blog"}
                className="inline-flex h-10 items-center space-x-2 px-4 md:h-14 md:px-8"
              >
                <span className="font-medium">{t("explore")}</span>
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              className="h-10 p-0 text-sm md:h-14 md:text-lg"
              variant={"outline"}
            >
              <Link
                href={"/about"}
                className="inline-flex h-10 items-center px-4 md:h-14 md:px-8"
              >
                <span className="font-medium">{t("about")}</span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
