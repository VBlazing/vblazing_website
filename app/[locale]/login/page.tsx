/*
 * @Author: VBlazing
 * @Date: 2025-12-15 10:24:21
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-12-15 14:43:52
 * @Description: login page
 */
import { LoginForm } from "@/components/auth/login-form";

export default function Page() {
  return (
    <div className="flex w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
