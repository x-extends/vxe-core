export type VxeGlobalComponentMethod = (comp: any) => void
export type VxeGlobalGetComponentMethod = <T = any>(name: string) => T | null

export interface VxeGlobalComponents {
  [key: string]: any
}
