type Nullish = null | undefined
export type VxeBaseEmptyValue = '' | Nullish

interface EnableConfOptions {
  enabled?: boolean
}

export interface VxeBaseUtils {
  /**
   * 转成字符串
   * @param value
   */
  toString(value: string | number | boolean | null | undefined): string
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
  /**
   * 判断配置项是否启用
   * @param conf
   */
  isEnabled(conf: EnableConfOptions): boolean
  /**
   * 用于判断开关类型的配置项
   * 局部启用规则：conf={}
   * 局部禁用规则：conf={enabled:false}
   * 全局默认启用规则：conf.enabled=true
   * @param conf
   * @param opts
   */
  hasEnableConf(conf: EnableConfOptions, opts: EnableConfOptions): boolean
}
