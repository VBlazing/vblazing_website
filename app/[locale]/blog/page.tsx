/*
 * @Author: vblazing
 * @Date: 2025-09-20 17:54:37
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-11-11 20:33:35
 * @Description: 博客页面
 */
import { Suspense } from "react";
import * as motion from "motion/react-client";
import Tabbar from "@/components/blog/tabbar";
import BlogHeader from "@/components/blog/blog_header";
import BlogList from "@/components/blog/blog_list";
import { BlogListSkeleton } from "@/components/ui/skeleton";
import { BlogCategory } from "@/lib/definitions";
import { fetchCategoryList } from "@/server/data";
import { getSettings } from "@/lib/settings";
import { getTranslations, setRequestLocale } from "next-intl/server";

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
      canonical: "https://blog.vblazing.com/zh/blog",
      languages: {
        en: "https://blog.vblazing.com/en/bog",
        zh: "https://blog.vblazing.com/zh/blog",
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
      ? (+urlQuery.category as BlogCategory)
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
          fallback={<BlogListSkeleton mode={settings.mode} />}
        >
          <BlogList
            mode={settings.mode}
            query={query}
            category_list={category_list || []}
          />
        </Suspense>
      </div>
    </div>
  );
}
