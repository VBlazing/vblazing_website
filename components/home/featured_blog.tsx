/*
 * @Author: vblazing
 * @Date: 2025-09-21 23:51:43
 * @LastEditors: vblazing
 * @LastEditTime: 2025-09-23 18:51:01
 * @Description: 精选博客组件
 */
import * as motion from "motion/react-client";
import { getTranslations } from "next-intl/server";
import BlogCard from "@/components/common/blog_card";
import { fetchCategoryList, fetchPublishedBlogList } from "@/server/data";
import { formatBlogListWithCategoryName } from "@/lib/formatData";

export default async function FeaturedBlog() {
  const t = await getTranslations("home.featured_blog");
  const category_list = await fetchCategoryList();
  const featured_blog_list = await fetchPublishedBlogList({
    filter: { is_featured: true },
  });

  if (!featured_blog_list?.length) {
    return null;
  }

  const blog_list_with_category_name = formatBlogListWithCategoryName(
    featured_blog_list,
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
        <BlogCard
          blog_info={blog_list_with_category_name[0]}
          labelMaxLength={5}
          showLabel
        />
      </motion.div>
    </section>
  );
}
