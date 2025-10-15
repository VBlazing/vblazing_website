/*
 * @Author: vblazing
 * @Date: 2025-10-14 12:23:17
 * @LastEditors: vblazing
 * @LastEditTime: 2025-10-15 14:14:53
 * @Description: 博客页头
 */
import * as motion from "motion/react-client";
import { fetchLabelList } from "@/server/data";
import SearchBar from "@/components/blog/search_bar";
import SummaryCard from "@/components/blog/summary_card";

export default async function BlogHeader() {
  const labels = await fetchLabelList();

  const summary = [
    {
      title: "旅行见闻",
      content: "旅行中看到听到的有趣故事",
    },
    {
      title: "技术博客",
      content: "技术文章与个人见解，持续更新高质量内容",
    },
    {
      title: "个人思考",
      content: "去码头整点薯条的路上脑子里还是有些奇思妙想胡思乱想",
    },
  ];

  return (
    <div className="bg-background border-border/40 w-full border-b">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-main-title mb-4 text-4xl font-light md:text-5xl">
            All Stories
          </h1>
          <p className="text-main-text mx-auto mb-8 max-w-2xl text-base md:text-xl">
            Explore thoughts, ideas, and experiences from my personal journey
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <SearchBar labels={labels} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
