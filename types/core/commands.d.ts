/* eslint-disable no-use-before-define */

export namespace VxeGlobalCommandsHandles {
  export interface CommandsOptions {}
}

/**
 * 全局格式化
 */
export interface VxeGlobalCommands {
  mixin(opts: {
    [name: string]: VxeGlobalCommandsHandles.CommandsOptions | ((params: any, ...args: any[]) => void)
  }): VxeGlobalCommands
  has(name: string): boolean
  get(name: string): VxeGlobalCommandsHandles.CommandsOptions
  add(name: string, options: VxeGlobalCommandsHandles.CommandsOptions | ((params: any, ...args: any[]) => void)): VxeGlobalCommands
  delete(name: string): void
  forEach(callback: (options: VxeGlobalCommandsHandles.CommandsOptions, name: string) => void): void
}
