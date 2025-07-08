import type { Component } from 'vue'

export interface VxeGlobalComponents {}

export type VxeGlobalComponentMethod = (comp: any) => void
export type VxeGlobalGetComponentMethod = <K extends keyof VxeGlobalComponents>(name: K) => Component
export type VxeGlobalHasComponentMethod = (name: keyof VxeGlobalComponents) => boolean
