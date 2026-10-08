
export interface VxeDomUtils {
  /**
   * 生成 className
   * @param staticClassNames
   * @param mapClassName
   */
  buildClass (staticClassNames: (string | null | undefined)[] | null | undefined, mapClassName?: Record<string, boolean | string | null | undefined>): string
}
