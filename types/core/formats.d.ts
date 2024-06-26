/* eslint-disable no-use-before-define */

export namespace VxeGlobalFormatsHandles {
  export interface FormatsOptions {}
}

/**
 * 全局格式化
 */
export interface VxeGlobalFormats {
  mixin(opts: {
    [name: string]: VxeGlobalFormatsHandles.FormatsOptions | ((params: any, ...args: any[]) => string | number)
  }): VxeGlobalFormats
  has(name: string): boolean
  get(name: string): VxeGlobalFormatsHandles.FormatsOptions
  add(name: string, options: VxeGlobalFormatsHandles.FormatsOptions | ((params: any, ...args: any[]) => string | number)): VxeGlobalFormats
  delete(name: string): void
  forEach(callback: (options: VxeGlobalFormatsHandles.FormatsOptions, name: string) => void): void
}
