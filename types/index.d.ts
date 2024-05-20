import { VxeCoreExport, VxeGlobalConfig } from './core'

declare global {
  interface Window {
    VxeCore: VxeCoreExport;
  }
}

export * from './tool'
export * from './core'
