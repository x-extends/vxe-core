import XEUtils from 'xe-utils'
import { log } from './log'

import { VxeGlobalFormats } from '../../types'

class VXEFormatsStore {
  private store: any = {}

  mixin (options: any): VXEFormatsStore {
    XEUtils.each(options, (item, key) => {
      this.add(key, item)
    })
    return this
  }

  has (name: string): boolean {
    return !!this.get(name)
  }

  get (name: string): any {
    return this.store[name]
  }

  add (name: string, render: any): VXEFormatsStore {
    const conf = this.store[name]
    // 兼容
    if (XEUtils.isFunction(render)) {
      log.warn('vxe.error.delProp', ['formats -> callback', 'cellFormatMethod'])
      render = {
        cellFormatMethod: render
      }
    }

    // 检测是否覆盖
    const confKeys = XEUtils.keys(conf)
    XEUtils.each(render, (item, key) => {
      if (confKeys.includes(key)) {
        log.warn('vxe.error.coverProp', [name, key])
      }
    })
    this.store[name] = conf ? XEUtils.merge(conf, render) : render
    return this
  }

  delete (name: string): void {
    delete this.store[name]
  }

  forEach (callback: any): void {
    XEUtils.objectEach(this.store, callback)
  }
}

export const formats = new VXEFormatsStore() as VxeGlobalFormats

Object.assign(formats, { _name: 'Formats' })
