/*
 * @Author: vblazing
 * @Date: 2025-09-20 22:57:15
 * @LastEditors: vblazing
 * @LastEditTime: 2025-09-21 01:54:19
 * @Description: mock数据
 */
import { IHomeHeroInfo } from "./definitions";

export const homeHeroInfo: Record<string, IHomeHeroInfo> = {
  zh: {
    welcome: '欢迎来到我的个人网页',
    title: '想法、故事与创意',
    subtitle: '收录关于技术、生活和各种感悟的文章合集。与我一起踏上这段发现和成长的旅程。'
  },
  en: {
    welcome: 'Welcome to my personal website',
    title: 'Thoughts, Stories & Ideas',
    subtitle: 'A collection of reflections on technology, life, and everything in between. Join me on this journey of discovery and growth.'
  }
}