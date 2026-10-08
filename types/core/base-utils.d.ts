
type Nullish = null | undefined
export type VxeBaseEmptyValue = '' | Nullish

export interface VxeBaseUtils {
  /**
   * 转成字符串
   * @param value
   */
  toString(value: string | number | boolean | null | undefined): string,
  /**
   * 判断值为：'' | null | undefined 时都属于空值
   * @param value
   */
  isEmpty(value: any): value is VxeBaseEmptyValue
}
