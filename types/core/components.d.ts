export interface VxeGlobalComponents {}

export type VxeGlobalComponentMethod = (comp: any) => void
export type VxeGlobalGetComponentMethod = <T = any>(name: keyof VxeGlobalComponents) => T
