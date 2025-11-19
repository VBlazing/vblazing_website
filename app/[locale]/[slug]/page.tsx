/*
 * @Author: vblazing
 * @Date: 2025-10-11 12:38:53
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-11-19 16:10:19
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
import { formatPostListWithCategoryName } from "@/lib/formatData";
import { routing } from "@/lib/i18n/routing";
import { getUrl } from "@/lib/i18n/navigation";
import { getPostPath } from "@/lib/navigate";
import { LOCALE_CODE } from "@/lib/const";
import {
  fetchCategoryList,
  fetchPublishedPostDetail,
  fetchPublishedPostList,
} from "@/server/data";

export async function generateStaticParams() {
  const postList = (await fetchPublishedPostList()) ?? [];
  const staticParams = postList?.map((post) => {
    return routing.locales.map((locale) => ({ slug: post.slug, locale }));
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

  const post_info = await fetchPublishedPostDetail(slug);
  const category_list = await fetchCategoryList();

  if (!post_info) {
    notFound();
  }

  const post_list_with_category_name = formatPostListWithCategoryName(
    [post_info],
    category_list || [],
  );

  const { title, introduction, image_url, id } =
    post_list_with_category_name[0] ?? {};

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

  const post_info = await fetchPublishedPostDetail(params.slug);
  const category_list = await fetchCategoryList();

  if (!post_info) {
    notFound();
  }

  const post_list_with_category_name = formatPostListWithCategoryName(
    [post_info],
    category_list || [],
  );

  return (
    <>
      <ArticleJsonLd
        type="BlogPosting"
        headline={post_info.title}
        url={getUrlWithLocale(getPostPath(post_info.id))}
        datePublished={new Date(post_info.create_time).toISOString()}
        dateModified={new Date(post_info.last_edited_time).toISOString()}
        image={
          post_info.image_url
            ? {
                "@type": "ImageObject",
                url: post_info.image_url,
                width: 800,
                height: 400,
                caption: post_info.title,
              }
            : undefined
        }
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
          "@id": getUrlWithLocale(getPostPath(post_info.id)),
        }}
      />
      <article className="bg-main-content min-h-screen w-full pb-10 sm:pb-16">
        <div className="mx-auto w-full max-w-4xl space-y-8">
          {/* Header */}
          <DetailHeader post_info={post_list_with_category_name[0]} />

          {/* Featured Image */}
          {post_info.image_url && (
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative sm:px-8"
            >
              <Image
                src={post_info.image_url}
                alt={post_info.title}
                width={800}
                height={400}
                className="w-full"
              />
            </motion.div>
          )}

          {/* Content */}
          <div className="px-6 pb-16 sm:px-8">
            <div className="text-main-text prose dark:prose-invert [&_h2]:text-main-title [&_h3]:text-main-title [&_strong]:text-main-title min-w-full">
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
                {post_info.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
