import { getTranslations } from "next-intl/server";
import { Mail } from "lucide-react";
import * as motion from "motion/react-client";
import { Button } from "@/components/ui/button";
import { AboutInfo } from "@/lib/definitions";

export default async function AboutHeader({
  about_info,
}: {
  about_info: AboutInfo;
}) {
  const t = await getTranslations("about");
  return (
    <section className="bg-background py-20 max-sm:py-14">
      <div className="mx-auto max-w-4xl px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mx-auto mb-8 h-32 w-32"
          >
            <div className="from-featured-img-from to-featured-img-to flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br">
              {/* todo: 切换头像 */}
              {about_info?.avatar ? (
                <span>头像</span>
              ) : (
                <span className="text-4xl font-light text-slate-600">👋</span>
              )}
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-main-title mb-6 text-4xl font-light md:text-5xl"
          >
            {about_info?.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-main-text mx-auto mb-8 max-w-2xl text-xl leading-relaxed max-sm:text-lg"
          >
            {about_info?.subtitle}
          </motion.p>

          {/* Contact Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Button asChild size="lg" className="cursor-pointer px-8 py-3">
              <a href="mailto:18392192892z@gmail.com">
                <Mail className="mr-2" />
                {t("get_touch")}
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
