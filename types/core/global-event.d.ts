import { VxeComponentBase } from '../tool'

export type VxeGlobalEventType = 'copy' | 'cut' | 'paste' | 'keydown' | 'contextmenu' | 'mousedown' | 'blur' | 'resize' | 'mousewheel'

export const GLOBAL_EVENT_KEYS: {
  F2: 'F2',
  ESCAPE: 'Escape',
  ENTER: 'Enter',
  TAB: 'Tab',
  DELETE: 'Delete',
  BACKSPACE: 'Backspace',
  SPACEBAR: ' ',
  CONTEXT_MENU: 'ContextMenu',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown'
}

export interface VxeGlobalEvents {
  on (comp: VxeComponentBase, type: VxeGlobalEventType, cb: (evnt: any) => void): void
  off (comp: VxeComponentBase, type: VxeGlobalEventType): void
  hasKey(evnt: KeyboardEvent, targetKey: string): boolean
}
