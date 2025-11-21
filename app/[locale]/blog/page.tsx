/*
 * @Author: vblazing
 * @Date: 2025-09-20 17:54:37
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-11-21 12:49:46
 * @Description: 博客页面
 */
import { Suspense } from "react";
import * as motion from "motion/react-client";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Tabbar from "@/components/blog/tabbar";
import BlogHeader from "@/components/blog/blog_header";
import PostList from "@/components/blog/post_list";
import { PostListSkeleton } from "@/components/ui/skeleton";
import { PostCategory } from "@/lib/definitions";
import { fetchCategoryList } from "@/server/data";
import { getSettings } from "@/lib/settings";
import { getUrl } from "@/lib/i18n/navigation";
import { LOCALE_CODE } from "@/lib/const";

type UrlSearchParams = {
  search?: string;
  labels?: string;
  category?: string;
};

interface IBlogProps extends PageProps<"/[locale]/blog"> {
  searchParams: Promise<UrlSearchParams>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("doc"),
    alternates: {
      canonical: getUrl("/blog", locale as LOCALE_CODE),
      languages: {
        en: getUrl("/blog", LOCALE_CODE.EN),
        zh: getUrl("/blog", LOCALE_CODE.ZH),
      },
    },
  };
}

export default async function Blog({ searchParams, params }: IBlogProps) {
  // for static rendering
  const { locale } = await params;
  setRequestLocale(locale);

  const urlQuery = await searchParams;
  const query = {
    search: urlQuery.search,
    labels: urlQuery.labels?.split(","),
    category: urlQuery.category
      ? (+urlQuery.category as PostCategory)
      : undefined,
  };
  const category_list = await fetchCategoryList();
  const settings = await getSettings();

  return (
    <div className="min-h-screen w-full">
      <BlogHeader />
      <div className="mx-auto max-w-6xl px-6 py-10 sm:px-8">
        {/* Tabbar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Tabbar settings={settings} category_list={category_list || []} />
        </motion.div>

        {/* List */}
        <Suspense
          key={JSON.stringify(query)}
          fallback={<PostListSkeleton mode={settings.mode} />}
        >
          <PostList
            mode={settings.mode}
            query={query}
            category_list={category_list || []}
          />
        </Suspense>
      </div>
    </div>
  );
}
