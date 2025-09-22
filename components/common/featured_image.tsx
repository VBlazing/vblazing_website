/*
 * @Author: vblazing
 * @Date: 2025-09-21 23:17:06
 * @LastEditors: vblazing
 * @LastEditTime: 2025-09-22 22:26:05
 * @Description: 精选图片组件
 */
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function FeaturedImage({
  title,
  url,
  className,
}: {
  title: string;
  url?: string;
  className?: string;
}) {
  return (
    <div
      className={
        "from-featured-img-from to-featured-img-to relative h-48 w-full overflow-hidden bg-gradient-to-br"
      }
    >
      <div
        className={cn(
          "h-full w-full transition-transform duration-300",
          className,
        )}
      >
        {url ? (
          <Image
            src={url}
            alt={title}
            width={800}
            height={400}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-4xl font-light text-slate-400 dark:text-[#cbd5e1]">
              {title}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
