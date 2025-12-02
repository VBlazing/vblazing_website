"use client";

import {
  useState,
  type ComponentProps,
  type MouseEventHandler,
  type ReactNode,
} from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { PostInfo } from "@/lib/definitions";

type ButtonProps = ComponentProps<typeof Button>;

type ShareButtonProps = {
  post: Pick<PostInfo, "title" | "introduction">;
  url?: string;
  children?: ReactNode;
} & Pick<
  ButtonProps,
  "variant" | "size" | "className" | "disabled" | "onClick" | "type"
>;

export function ShareButton({
  post,
  url,
  children,
  disabled,
  className,
  variant = "outline",
  size = "sm",
  onClick,
  type = "button",
}: ShareButtonProps) {
  const t = useTranslations("detail");
  const [shareLoading, setShareLoading] = useState(false);
  const shareUrl =
    url ?? (typeof window !== "undefined" ? window.location.href : "");

  const handleShare: MouseEventHandler<HTMLButtonElement> = async (event) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    if (!shareUrl) {
      toast.warning(t("failed_share"));
      return;
    }

    if (navigator.share) {
      setShareLoading(true);
      try {
        await navigator.share({
          title: post.title,
          text: post.introduction,
          url: shareUrl,
        });
        toast.success(t("share_success"));
      } catch (error) {
        const isAborted =
          error instanceof DOMException ? error.code === 20 : false;
        if (isAborted) {
          toast.info(t("cancel_share"));
        } else {
          toast.warning(t("failed_share"), {
            richColors: true,
            description: error instanceof Error ? error.message : undefined,
          });
        }
      } finally {
        setShareLoading(false);
      }
    } else if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast.success(t("copy_clipboard"));
      } catch (error) {
        toast.warning(t("failed_share"), {
          richColors: true,
          description: (error as Error)?.message,
        });
      }
    } else {
      toast.warning(t("failed_share"));
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleShare}
      disabled={disabled || shareLoading}
      type={type}
    >
      {children ?? (
        <>
          <Share2 />
          <span>{t("share")}</span>
        </>
      )}
    </Button>
  );
}
