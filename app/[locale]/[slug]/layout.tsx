import { setRequestLocale } from "next-intl/server";

export default async function PostLayout({
  children,
  params,
}: LayoutProps<"/[locale]/[slug]">) {
  const { locale } = await params;

  // for static rendering
  setRequestLocale(locale);

  return children;
}
