/*
 * @Author: vblazing
 * @Date: 2025-09-21 23:51:43
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-11-18 23:47:37
 * @Description: 精选博客组件
 */
import * as motion from "motion/react-client";
import { getTranslations } from "next-intl/server";
import PostCard from "@/components/common/post_card";
import { fetchCategoryList, fetchPublishedPostList } from "@/server/data";
import { formatPostListWithCategoryName } from "@/lib/formatData";

export default async function FeaturedPost() {
  const t = await getTranslations("home.featured_post");
  const category_list = await fetchCategoryList();
  const featured_post_list = await fetchPublishedPostList({
    filter: { is_featured: true },
  });

  if (!featured_post_list?.length) {
    return null;
  }

  const post_list_with_category_name = formatPostListWithCategoryName(
    featured_post_list,
    category_list || [],
  );

  return (
    <section className="mx-auto mb-16 w-full max-w-6xl px-6 sm:mb-20 sm:px-8">
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
        <PostCard
          post_info={post_list_with_category_name[0]}
          labelMaxLength={5}
          showLabel
        />
      </motion.div>
    </section>
  );
}
