/*
 * @Author: vblazing
 * @Date: 2025-10-11 12:38:53
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-11-12 13:42:27
 * @Description: 博客详情页面
 */
import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import * as motion from "motion/react-client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import { ArticleJsonLd } from "next-seo";
import { DetailHeader } from "@/components/detail/detail_header";
import { formatBlogListWithCategoryName } from "@/lib/formatData";
import { routing } from "@/lib/i18n/routing";
import { getUrl } from "@/lib/i18n/navigation";
import { getPostPath } from "@/lib/navigate";
import { LOCALE_CODE } from "@/lib/const";
import {
  fetchCategoryList,
  fetchPublishedBlogDetail,
  fetchPublishedBlogList,
} from "@/server/data";

export async function generateStaticParams() {
  const blogList = (await fetchPublishedBlogList()) ?? [];
  const staticParams = blogList?.map((post) => {
    return routing.locales.map((locale) => ({ slug: post.id, locale }));
  });
  return staticParams.flat();
}

export async function generateMetadata(
  props: {
    params: Promise<{ locale: string; slug: string }>;
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const parentMetadata = await parent;

  const blog_info = await fetchPublishedBlogDetail(slug);
  const category_list = await fetchCategoryList();

  if (!blog_info) {
    notFound();
  }

  const blog_list_with_category_name = formatBlogListWithCategoryName(
    [blog_info],
    category_list || [],
  );

  const { title, introduction, image_url, id } =
    blog_list_with_category_name[0] ?? {};

  const images = image_url
    ? [
        {
          url: image_url,
          width: 800,
          height: 600,
        },
      ]
    : parentMetadata?.openGraph?.images;
  return {
    title: {
      absolute: title,
    },
    description: introduction,
    alternates: {
      canonical: getUrl(getPostPath(id), LOCALE_CODE.ZH),
      languages: {
        en: getUrl(getPostPath(id), LOCALE_CODE.EN),
        zh: getUrl(getPostPath(id), LOCALE_CODE.ZH),
      },
    },
    openGraph: {
      images,
      title,
      description: introduction,
      url: getUrl("/", locale as LOCALE_CODE),
      siteName: "Blazer V",
      locale,
      type: "website",
    },
  };
}

export default async function Detail(props: PageProps<"/[locale]/[slug]">) {
  const params = await props.params;

  // for static rendering
  setRequestLocale(params.locale);

  const getUrlWithLocale = (pathname: string) => {
    return getUrl(pathname, params.locale as LOCALE_CODE);
  };

  const blog_info = await fetchPublishedBlogDetail(params.slug);
  const category_list = await fetchCategoryList();

  if (!blog_info) {
    notFound();
  }

  const blog_list_with_category_name = formatBlogListWithCategoryName(
    [blog_info],
    category_list || [],
  );

  return (
    <>
      <ArticleJsonLd
        type="BlogPosting"
        headline={blog_info.title}
        url={getUrlWithLocale(getPostPath(blog_info.id))}
        datePublished={new Date(blog_info.create_time).toLocaleTimeString()}
        dateModified={new Date(blog_info.last_edited_time).toLocaleTimeString()}
        author={{
          "@type": "Person",
          name: "Blazer V",
          url: getUrlWithLocale("/about"),
        }}
        publisher={{
          "@type": "Organization",
          name: "Blazer V",
        }}
        mainEntityOfPage={{
          "@type": "WebPage",
          "@id": getUrlWithLocale(getPostPath(blog_info.id)),
        }}
      />
      <article className="bg-main-content min-h-screen w-full pb-10 sm:pb-16">
        <div className="mx-auto w-full max-w-4xl">
          {/* Header */}
          <DetailHeader blog_info={blog_list_with_category_name[0]} />

          {/* Featured Image */}
          {blog_info.image_url && (
            <div className="w-full">
              <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-full"
              >
                <Image
                  src={blog_info.image_url}
                  alt={blog_info.title}
                  width={800}
                  height={400}
                  className="w-full"
                />
              </motion.div>
            </div>
          )}

          {/* Content */}
          <div className="px-6 py-16 pt-8 sm:px-8">
            <div className="text-main-text prose dark:prose-invert">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeHighlight]}
                components={{
                  aside(props) {
                    return (
                      <aside
                        {...props}
                        className="flex gap-2 rounded-xl bg-[#edf1f6] p-4 dark:bg-[#30302e] [&_p]:my-0"
                      />
                    );
                  },
                }}
              >
                {blog_info.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
