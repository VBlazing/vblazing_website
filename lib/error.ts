/*
 * @Author: VBlazing
 * @Date: 2025-10-13 23:16:43
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-11-05 10:57:54
 * @Description: 错误处理
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'sonner'

export enum ERROR_CODE {
  CLIENT_COMMON_ERROR = 4000,
}

export const ErrorMsgKeyMap = {
  [ERROR_CODE.CLIENT_COMMON_ERROR]: 'client_common_error',
}

type ErrorType = 'runtime' | 'unhandledrejection' | 'caught' | 'render';

interface ErrorReport {
  type: ErrorType;
  message: string;
  stack?: string;
  url?: string;
  timestamp?: string;
  source?: string;
  lineno?: number;
  colno?: number;
}

/** 弹出用户提示（UI层） */
async function showUserNotification(error: ErrorReport) {
  toast.error((window as any).__TRANSLATE_FN__(ErrorMsgKeyMap[ERROR_CODE.CLIENT_COMMON_ERROR]), {
    description: error.message.slice(0, 200),
    duration: 5000,
  });
}

/** 捕获封装 */
function handleCaughtError(error: any, type: ErrorType = 'caught') {
  const report: ErrorReport = {
    type,
    message: error?.message || String(error),
    stack: error?.stack,
  };
  console.error(`[${type}]`, report);
  showUserNotification(report);
}

/** 初始化全局监听 */
export function initErrorManager(t: any) {
  if (typeof window === 'undefined') return;
  if ((window as any).__ERROR_MANAGER_INITIALIZED__) return;
  (window as any).__ERROR_MANAGER_INITIALIZED__ = true;
  (window as any).__TRANSLATE_FN__ = t;

  // 运行时错误
  window.addEventListener('error', (event) => {
    handleCaughtError(
      {
        message: event.message,
        stack: event.error?.stack,
      },
      'runtime'
    );
  });

  // Promise 未处理错误
  window.addEventListener('unhandledrejection', (event) => {
    handleCaughtError(event.reason, 'unhandledrejection');
  });
}

/** 安全执行封装器，用于事件处理函数等 */
// export function safeExec<T extends (...args: any[]) => any>(fn: T): T {
//   return ((...args: Parameters<T>) => {
//     try {
//       const result = fn(...args);
//       if (result instanceof Promise) {
//         return result.catch((err) => handleCaughtError(err));
//       }
//       return result;
//     } catch (err) {
//       handleCaughtError(err);
//     }
//   }) as T;
// }
