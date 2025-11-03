/*
 * @Author: vblazing
 * @Date: 2025-10-19 19:18:50
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-10-25 01:07:18
 * @Description: 关于我页面
 */
import { getTranslations, setRequestLocale } from "next-intl/server";
import ReactMarkdown from "react-markdown";
import * as motion from "motion/react-client";
import AboutHeader from "@/components/about/about_header";
import Information from "@/components/about/information";
import { AboutInfo } from "@/lib/definitions";
import { fetchAboutInfo } from "@/server/data";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

export async function generateMetadata() {
  const t = await getTranslations("metadata");
  return {
    title: t("about"),
  };
}

export default async function About({ params }: PageProps<"/[locale]/about">) {
  // for static rendering
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");
  const about_info = await fetchAboutInfo();
  return (
    <div className="min-h-screen w-full">
      {/* Header  */}
      <AboutHeader about_info={about_info || ({} as AboutInfo)} />

      <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8">
        <div className="flex gap-12 max-md:flex-col-reverse">
          {/* Information */}
          <Information about_info={about_info || ({} as AboutInfo)} />

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-main-title mb-6 text-3xl max-sm:text-2xl">
              {t("my_story")}
            </h2>
            <div className="text-main-text prose dark:prose-invert [&_h3]:font-medium">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeHighlight]}
              >
                {about_info?.story || ""}
              </ReactMarkdown>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
