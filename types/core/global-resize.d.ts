export interface VxeGlobalResize {
  create (callback: (entries: ResizeObserverEntry[]) => void): ResizeObserver
}
