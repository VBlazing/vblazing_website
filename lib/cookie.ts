import { cache } from "react"
import { cookies } from "next/headers"

/**
 * 获取cookie内容
 * @param name string | key[]
 * @returns {*} string | Record<key, string>
 */
function getCookieImp(name: string): Promise<string | undefined>
function getCookieImp<const T extends readonly string[]>(name: T): Promise<Record<T[number], string>>
async function getCookieImp<const T extends readonly string[]>(name: string | T): Promise<string | Record<T[number], string> | undefined> {
  const cookie = await cookies()
  if (typeof name === 'string') {
    return cookie.get(name)?.value
  } else {
    return name.reduce((acc, item) => {
      return {
        ...acc,
        [item]: cookie.get(item)?.value
      }
    }, {} as Record<T[number], string>)
  }
}
export const getCookie = cache(getCookieImp)

/**
 * 设置cookie
 * @param value Record<string, string>
 */
export async function setCookie(value: Record<string, string>) {
  const cookie = await cookies()
  Object.entries(value).forEach(([key, value]) => {
    cookie.set(key, value)
  })
}