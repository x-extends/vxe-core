export interface VxeGlobalComponents {}

export type VxeGlobalComponentMethod = (comp: any) => void
export type VxeGlobalGetComponentMethod = <K extends keyof VxeGlobalComponents>(name: K) => VxeGlobalComponents[K]
