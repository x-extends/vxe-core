
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
  /**
   * 获取配置值，如果存在则返回，如果不存在则使用默认值
   * @param value
   * @param defVal
   */
  getDefVal<T = any, D = any>(value: T, defVal: D): T | D
}
