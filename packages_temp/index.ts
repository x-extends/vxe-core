import VxeUI, { setI18n, setTheme } from './src/core'
import zhCN from './language/zh-CN'

// 默认中文
setI18n('zh-CN', zhCN)
setTheme('light')

export * from './src/core'
export default VxeUI
