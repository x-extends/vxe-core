import { VxeComponentSlot } from '../tool'

/* eslint-disable no-use-before-define */

type RendererOptions = DefineRendererOption<VxeGlobalRendererHandles.RenderResult>

export interface DefineRendererOption<T> {}

export namespace VxeGlobalRendererHandles {
  export type RenderResult = VxeComponentSlot | VxeComponentSlot[]
}

/**
 * 渲染器
 */
export interface VxeGlobalRenderer {
  mixin(options: {
    [name: string]: RendererOptions
  }): VxeGlobalRenderer
  get(name: string | null | undefined): DefineRendererOption<VxeGlobalRendererHandles.RenderResult>
  add(name: string, options: RendererOptions): VxeGlobalRenderer
  forEach(callback: (item: DefineRendererOption<VxeGlobalRendererHandles.RenderResult>, name: string, renderMap: {
    [name: string]: RendererOptions
  }) => void): VxeGlobalRenderer
  delete(name: string): void
}
