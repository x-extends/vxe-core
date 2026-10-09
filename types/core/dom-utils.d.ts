
export interface VxeDomUtils {
  /**
   * 生成 className
   * @param staticClassNames
   * @param mapClassName
   */
  buildClass (staticClassNames: (string | number | null | undefined)[] | null | undefined, mapClassName?: Record<string, boolean | string | number | null | undefined>): string
}
