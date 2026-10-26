export interface VxeDomUtils {
  /**
   * 判断是否像素px单位 '100px' | 100
   * @param val
   */
  isPx(val: any): boolean
  /**
   * 判断是否百分比%单位 '100%'
   * @param val
   */
  isScale(val: any): boolean
  /**
   * 判断元素是否包含 class
   * @param elem
   * @param cls
   */
  hasClass(elem: HTMLElement, cls: string): boolean
  /**
   * 给元素删除 class
   * @param elem
   * @param cls
   */
  removeClass(elem: HTMLElement, cls: string): void
  /**
   * 给元素增加 class
   * @param elem
   * @param cls
   */
  addClass(elem: HTMLElement, cls: string): void
  /**
   * 生成 className
   * @param staticClassNames
   * @param mapClassName
   */
  buildClass(staticClassNames: (string | number | null | undefined)[] | null | undefined, mapClassName?: Record<string, boolean | string | number | null | undefined>): string
}
