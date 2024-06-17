import { ComponentOptions } from 'vue'

export type VxeGlobalComponentMethod = (comp: ComponentOptions) => void
export type VxeGlobalGetComponentMethod = <T = ComponentOptions>(name: string) => T | null

export interface VxeGlobalComponents {
  [key: string]: ComponentOptions
}
