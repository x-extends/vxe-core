import { VxeComponentBaseOptions, VxeComponentEvent } from '../tool'

export type VxeGlobalEventType = 'copy' | 'cut' | 'paste' | 'keydown' | 'contextmenu' | 'mousedown' | 'blur' | 'resize' | 'mousewheel'

export const GLOBAL_EVENT_KEYS: {
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
  Z: 'Z'
  X: 'X'
  C: 'C'
  V: 'V'
  M: 'M'
}

export function createEvent<E, T, D = { [key: string]: any }>(evnt: E, params1: T, params2?: D): T & D & VxeComponentEvent<E>

export interface VxeGlobalEvents {
  on (comp: VxeComponentBaseOptions, type: VxeGlobalEventType, cb: (evnt: any) => void): void
  off (comp: VxeComponentBaseOptions, type: VxeGlobalEventType): void
  hasKey(evnt: KeyboardEvent, targetKey: string): boolean
}
