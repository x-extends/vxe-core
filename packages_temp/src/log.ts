import { getI18n } from './i18n'

import { VxeGlobalLog } from '../../types'

function createLog (type: 'log' | 'warn' | 'error', name?: string) {
  return function (key: string, args?: any) {
    const msg = `[${name || 'vxe'} v${process.env.VUE_APP_VXE_VERSION}] ${getI18n(key, args)}`
    console[type](msg)
    return msg
  }
}

export const log: VxeGlobalLog = {
  create: createLog,
  warn: createLog('warn'),
  err: createLog('error')
}
