
export interface VxeDomUtils {
  /**
   * 生成 className
   * @param staticClassName
   * @param mapClassName
   */
  buildClass (staticClassName: string | null | undefined, mapClassName?: Record<string, boolean | string | null | undefined>): string
}
