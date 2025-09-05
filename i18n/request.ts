import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async () => {
  // 默认语言
  const defaultLocal = 'zh'

  const messages = await import(`../messages/${defaultLocal}.json`)
  return {
    locale: defaultLocal,
    messages: messages.default
  }
});