/*
 * @Author: vblazing
 * @Date: 2025-10-10 23:39:58
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-10-24 21:46:56
 * @Description: 发现博客
 */
import { ArrowRight } from "lucide-react";
import * as motion from "motion/react-client";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/i18n/navigation";

export default function ExploreBlog() {
  const t = useTranslations("home.explore_blog");
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mb-20 rounded-2xl p-8 text-center md:p-12"
    >
      <h2 className="text-main-title mb-4 text-3xl font-light">{t("title")}</h2>
      <p className="text-main-text mx-auto mb-8 max-w-2xl text-base md:text-lg">
        {t("subtitle")}
      </p>
      <Button variant="default" asChild>
        <Link
          href={"/blog"}
          className="group inline-flex h-10 items-center space-x-2 p-0 text-sm shadow-lg hover:shadow-xl has-[>svg]:px-4 md:h-14 md:text-lg md:has-[>svg]:px-8"
        >
          <span className="font-medium">{t("explore")}</span>
          <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </Button>
    </motion.section>
  );
}
