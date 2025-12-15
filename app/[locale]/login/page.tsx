/*
 * @Author: VBlazing
 * @Date: 2025-12-15 10:24:21
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-12-15 11:06:01
 * @Description: login page
 */
import { LoginForm } from "@/components/auth/login-form";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
