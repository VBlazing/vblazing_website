/*
 * @Author: VBlazing
 * @Date: 2025-10-24 22:40:42
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-10-24 23:57:00
 * @Description: 根 layout
 */
import { ReactNode } from "react";
import "./globals.css";

type Props = {
  children: ReactNode;
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  return children;
}
