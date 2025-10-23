/*
 * @Author: vblazing
 * @Date: 2025-10-14 12:23:17
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-10-24 00:56:12
 * @Description: 博客页头
 */
import * as motion from "motion/react-client";
import { getTranslations } from "next-intl/server";
import { fetchBlogSummaries, fetchLabelList } from "@/server/data";
import SearchBar from "@/components/blog/search_bar";
import SummaryCard from "@/components/blog/summary_card";

export default async function BlogHeader() {
  const t = await getTranslations("blog");
  const labels = await fetchLabelList();
  const summary = await fetchBlogSummaries();

  return (
    <div className="bg-background border-border/40 w-full border-b">
      <div className="mx-auto max-w-6xl px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-main-title mb-4 text-4xl font-light md:text-5xl">
            {t("header.title")}
          </h1>
          <p className="text-main-text mx-auto mb-8 max-w-2xl text-base md:text-xl">
            {t("header.subtitle")}
          </p>
          <div className="mx-auto mb-8 hidden max-w-3xl justify-evenly gap-6 sm:flex">
            {summary?.map((item) => (
              <SummaryCard
                key={item.title}
                title={item.title}
                content={item.content}
              />
            ))}
          </div>
          <SearchBar labels={labels || []} />
        </motion.div>
      </div>
    </div>
  );
}
