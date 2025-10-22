/*
 * @Author: vblazing
 * @Date: 2025-10-19 19:18:50
 * @LastEditors: vblazing
 * @LastEditTime: 2025-10-22 22:36:45
 * @Description: 关于我页面
 */
import { getTranslations } from "next-intl/server";
import * as motion from "motion/react-client";
import AboutHeader from "@/components/about/about_header";
import { AboutInfo } from "@/lib/definitions";
import { fetchAboutInfo } from "@/server/data";
import Information from "@/components/about/information";

export default async function About() {
  console.log("prefetch about");
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
            <h2 className="text-main-title mb-6 text-3xl font-light">
              {t("my_story")}
            </h2>
            <div>{about_info?.story}</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
