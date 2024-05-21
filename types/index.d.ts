import { VxeUIExport } from './core'

declare global {
  interface Window {
    VxeUI: VxeUIExport;
  }
}

export * from './tool'
export * from './core'
