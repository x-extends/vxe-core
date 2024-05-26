/* eslint-disable no-use-before-define */

export namespace VxeGlobalInterceptorHandles {
  export type InterceptorCallback = (params: any) => any
  export interface InterceptorParams {}
}

/**
 * 全局事件拦截器
 */
export interface VxeGlobalInterceptor {
  mixin(options: {
    [type: string]: VxeGlobalInterceptorHandles.InterceptorCallback
  }): VxeGlobalInterceptor
  get(type: string): VxeGlobalInterceptorHandles.InterceptorCallback[]
  add(type: string, callback: VxeGlobalInterceptorHandles.InterceptorCallback): VxeGlobalInterceptor
  delete(type: string, callback?: VxeGlobalInterceptorHandles.InterceptorCallback): void
}
