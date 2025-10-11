/*
 * @Author: vblazing
 * @Date: 2025-09-25 15:52:46
 * @LastEditors: vblazing
 * @LastEditTime: 2025-10-11 13:50:52
 * @Description: 最近博客
 */
import * as motion from "motion/react-client";
import { getTranslations } from "next-intl/server";
import BlogCard from "@/components/common/blog_card";
import { fetchCategoryList, fetchPublishedBlogList } from "@/server/data";
import { formatBlogListWithCategoryName } from "@/lib/formatData";

export default async function RecentBlog() {
  const t = await getTranslations("home.recent_blog");

  const category_list = await fetchCategoryList();
  const featured_blog_list = await fetchPublishedBlogList({
    pagination: { page: 1, pageSize: 6 },
  });

  const blog_list_with_category_name = formatBlogListWithCategoryName(
    featured_blog_list || [],
    category_list || [],
  );

  return (
    <section className="mx-auto mb-20 w-full max-w-6xl px-6 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-10 text-center">
          <h2 className="text-main-title mb-2 text-3xl font-light">
            {t("title")}
          </h2>
          <div className="mx-auto h-0.5 w-12 bg-slate-300"></div>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blog_list_with_category_name?.map((item, index) => {
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex not-[:nth-child(-n+3)]:hidden sm:not-[:nth-child(-n+3)]:flex"
              >
                <BlogCard
                  key={item?.id}
                  blog_info={item}
                  className="flex-grow"
                />
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
