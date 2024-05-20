import VxeCore, { setConfig } from './src/core'
import XEUtils from 'xe-utils'
import zhCN from './language/zh-CN'

// 默认中文
setConfig({
  i18n: (key: string, args: any) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args)
})

export * from './src/core'
export default VxeCore
