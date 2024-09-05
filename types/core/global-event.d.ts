import { CombinedVueInstance } from 'vue/types/vue'
import { VxeComponentEvent, VxeComponentBaseOptions } from '../tool'

export type VxeGlobalEventType = 'copy' | 'cut' | 'paste' | 'keydown' | 'contextmenu' | 'mousedown' | 'blur' | 'resize' | 'mousewheel'

export type VxeGlobalEventKey = {
  F2: 'F2'
  ESCAPE: 'Escape'
  ENTER: 'Enter'
  TAB: 'Tab'
  DELETE: 'Delete'
  BACKSPACE: 'Backspace'
  SPACEBAR: ' '
  CONTEXT_MENU: 'ContextMenu'
  ARROW_UP: 'ArrowUp'
  ARROW_DOWN: 'ArrowDown'
  ARROW_LEFT: 'ArrowLeft'
  ARROW_RIGHT: 'ArrowRight'
  PAGE_UP: 'PageUp'
  PAGE_DOWN: 'PageDown'
  R: 'R'
  P: 'P'
  Z: 'Z'
  X: 'X'
  C: 'C'
  V: 'V'
  M: 'M'
}

export const GLOBAL_EVENT_KEYS: VxeGlobalEventKey

export type VxeGlobalCreateEventMethod = (evnt: Event | null, params1: any, params2?: any) => VxeComponentEvent

export const createEvent: VxeGlobalCreateEventMethod

export interface VxeGlobalEvents {
  on (_vm: CombinedVueInstance<VxeComponentBaseOptions, object, object, object, object>, type: VxeGlobalEventType, cb: (evnt: any) => void): void
  off (_vm: CombinedVueInstance<VxeComponentBaseOptions, object, object, object, object>, type: VxeGlobalEventType): void
  hasKey(evnt: KeyboardEvent, targetKey: string): boolean,
}
