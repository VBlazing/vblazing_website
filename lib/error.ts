/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'sonner'
import { getTranslations } from 'next-intl/server';
const t = await getTranslations('error')

export enum ERROR_CODE {
  CLIENT_COMMON_ERROR = 4000,
  FAILED_SET_COOKIE = 5001
}

export const errorMsgMap = {
  [ERROR_CODE.CLIENT_COMMON_ERROR]: t('client_common_error'),
  [ERROR_CODE.FAILED_SET_COOKIE]: t('failed_set_cookie')
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
function showUserNotification(error: ErrorReport) {
  toast.error(errorMsgMap[ERROR_CODE.CLIENT_COMMON_ERROR], {
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
export function initErrorManager() {
  if (typeof window === 'undefined') return;
  if ((window as any).__ERROR_MANAGER_INITIALIZED__) return;
  (window as any).__ERROR_MANAGER_INITIALIZED__ = true;

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
