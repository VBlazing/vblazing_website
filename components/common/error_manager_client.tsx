"use client";

import { useEffect } from "react";
import { initErrorManager } from "@/lib/error";

export default function ErrorManagerClient() {
  useEffect(() => {
    initErrorManager();
  }, []);
  return null;
}
