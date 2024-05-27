import VxeUI, { setI18n, setLanguage, setTheme } from './src/core'
import zhCN from './language/zh-CN'

// 默认中文
const defaultLanguage = 'zh-CN'
setI18n(defaultLanguage, zhCN)
setLanguage(defaultLanguage)
setTheme('light')

export * from './src/core'
export default VxeUI
