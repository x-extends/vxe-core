export interface VxeDBStore<T = any> {
  /**
   * 根据 ID 获取数据
   * @param id
   */
  getById(id: string): Promise<{ id: string; data: T } | undefined>
  /**
   * 获取所有数据
   */
  getAll(): Promise<{ id: string; data: T }[]>
  /**
   * 根据 ID 更新数据
   * @param id
   */
  updateById(id: string, data: T): Promise<void>
  /**
   * 根据 ID 删除数据
   * @param id
   */
  deleteById(id: string): Promise<void>
  /**
   * 清空当前存储的数据
   */
  clear(): Promise<void>
  /**
   * 清理旧版本数据
   */
  cleanupOldDBs(): Promise<void>
}

export interface VxeDBOptions {
  version?: string | number
  driver?: 'indexedDB' | 'localStorage' | '' | null
}

export interface VxeDBUtils {
  /**
   * 创建存储实例
   * - driver = 'indexedDB' 且环境支持 => IdbStore
   * @param key
   * @param options
   */
  createStore<T = any>(key: string, options?: VxeDBOptions): VxeDBStore<T>
}
