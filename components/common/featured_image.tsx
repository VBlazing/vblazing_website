/*
 * @Author: vblazing
 * @Date: 2025-09-21 23:17:06
 * @LastEditors: vblazing
 * @LastEditTime: 2025-09-23 17:22:17
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
      className={cn(
        "from-featured-img-from to-featured-img-to h-full w-full bg-gradient-to-br transition-transform duration-300",
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
  );
}
