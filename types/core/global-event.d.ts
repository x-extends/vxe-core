import { VxeComponentBaseOptions, VxeComponentEvent } from '../tool'

export type VxeGlobalEventType = 'copy' | 'cut' | 'paste' | 'keydown' | 'contextmenu' | 'mousedown' | 'click' | 'blur' | 'resize' | 'mousewheel' | 'scroll'

export type VxeGlobalEventKey = {
  F2: 'F2'
  F10: 'F10'
  TAB: 'Tab'
  ESCAPE: 'Escape'
  ENTER: 'Enter'
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
  HOME: 'Home'
  END: 'End'
  A: 'A'
  X: 'X'
  C: 'C'
  V: 'V'
  D: 'D'
  F: 'F'
  H: 'H'
  M: 'M'
  Y: 'Y'
  Z: 'Z'
  R: 'R'
  P: 'P'
}

export const GLOBAL_EVENT_KEYS: VxeGlobalEventKey

export type VxeGlobalCreateEventMethod = (evnt: Event | null, params1: any, params2?: any) => VxeComponentEvent

export const createEvent: VxeGlobalCreateEventMethod

export interface VxeGlobalEvents {
  on (comp: VxeComponentBaseOptions, type: VxeGlobalEventType, cb: (evnt: any) => void): void
  off (comp: VxeComponentBaseOptions, type: VxeGlobalEventType): void
  hasKey(evnt: KeyboardEvent, targetKey: string): boolean,
}
