/*
 * @Author: VBlazing
 * @Date: 2025-10-24 22:41:35
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-10-24 23:59:51
 * @Description: global not found
 */

import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen w-full flex-1 flex-col items-center justify-center px-8 sm:items-start">
          <div className="space-y-6 text-center sm:ml-[10%] sm:text-left">
            <div className="space-y-2">
              <h1 className="text-7xl font-light text-slate-300">404</h1>
              <div className="h-0.5 w-full bg-slate-200"></div>
            </div>
            <h2 className="text-main-text text-2xl">Page Not Found</h2>
            <div className="mt-10">
              <Button variant="outline" asChild>
                <Link
                  href="/"
                  className="flex items-center space-x-2 px-4 py-2"
                >
                  <Home />
                  <span>Go Home</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
