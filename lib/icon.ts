/*
 * @Author: vblazing
 * @Date: 2025-09-20 17:03:53
 * @LastEditors: vblazing
 * @LastEditTime: 2025-09-20 17:49:42
 * @Description: 图标
 */

import { BookOpen, Briefcase, Home, UserIcon } from 'lucide-react';

/**
 * @description: 通过icon名称获取icon
 * @return {*} icon icon组件
 */
export function getIcon(name: string): React.ComponentType<{ className?: string; size?: number }> {
  switch (name) {
    case 'BookOpen':
      return BookOpen
    case 'Briefcase':
      return Briefcase
    case 'Home':
      return Home
    case 'UserIcon':
      return UserIcon
    default:
      return Home
  }
}