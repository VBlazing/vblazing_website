"use client";

import Link from "next/link";
import Image from "next/image";
import * as motion from "motion/react-client";
import { Mail } from "lucide-react";
import { AboutInfo } from "@/lib/definitions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useTranslations } from "next-intl";

const connectList = [
  {
    id: "github",
    icon: (
      <Image
        width={16}
        height={16}
        alt="WeChat"
        unoptimized
        src="https://cdn.simpleicons.org/github/1e293b/f7fafc"
      />
    ),
    text: "github.com/VBlazing",
    href: "https://github.com/VBlazing",
  },
  {
    id: "we_chat",
    icon: (
      <Image
        width={16}
        height={16}
        alt="WeChat"
        unoptimized
        src="https://cdn.simpleicons.org/wechat/1e293b/f7fafc"
      />
    ),
    text: "唐室砥柱",
  },
  {
    id: "email",
    icon: <Mail />,
    text: "18392192892z@gmail.com",
    href: "mailto:18392192892z@gmail.com",
  },
];

export default function Information({ about_info }: { about_info: AboutInfo }) {
  const t = useTranslations("about");
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="space-y-8 md:w-[36%]"
    >
      {/* Connect */}
      <Card className="gap-4">
        <CardHeader>
          <CardTitle>{t("connect")}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-3 px-4">
          {connectList.map((item) => {
            if (item.href) {
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  asChild
                  className="text-main-title w-full cursor-pointer justify-start has-[>svg]:px-4"
                >
                  <a href={item.href} target="_blank" className="mb-1">
                    {item.icon}
                    {item.text}
                  </a>
                </Button>
              );
            }
            return (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-main-title mb-1 w-full cursor-pointer justify-start has-[>svg]:px-4"
                  >
                    {item.icon}
                    {item.text}
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-52 [&_button]:cursor-pointer [&_button]:focus:ring-0">
                  <DialogHeader>
                    <DialogTitle>{t("we_chat")}</DialogTitle>
                    <DialogDescription>vblazing</DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            );
          })}
        </CardContent>
      </Card>

      {/* Interest */}
      <Card className="gap-4">
        <CardHeader>
          <CardTitle>{t("interest")}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2 px-6">
          {about_info.interests?.map((interest, index) => (
            <span
              key={index}
              className="bg-featured-img-to text-main-text rounded-full px-3 py-1 text-xs"
            >
              {interest}
            </span>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
