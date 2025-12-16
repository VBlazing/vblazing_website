"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { CircleUser } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserOperationButton() {
  const { status, data } = useSession();
  const user = data?.user;
  const t = useTranslations("auth");

  if (status === "loading") {
    return <Skeleton className="h-8 w-10" />;
  }
  return (
    <>
      {data ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* focus-visible:ring-[0]：删除自带的聚焦后边框 */}
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 flex h-8 w-8 items-center rounded-full px-0 font-normal focus-visible:ring-[0]"
              aria-label="Change locale"
            >
              {user?.image ? (
                <Image
                  className="rounded-full"
                  src={user.image}
                  width={20}
                  height={20}
                  alt="avatar"
                />
              ) : (
                <CircleUser className="size-5" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="z-100">
            <DropdownMenuItem onClick={() => signOut()}>
              {t("signout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center font-normal focus-visible:ring-[0]"
          aria-label="Change locale"
          onClick={() => signIn()}
        >
          {t("signin")}
        </Button>
      )}
    </>
  );
}
