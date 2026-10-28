import XEUtils from 'xe-utils'
import { globalConfigStore } from './configStore'

import type { VxeDBUtils, VxeDBStore, VxeDBOptions } from '../../types'

/**
 * IndexedDB 存储
 * - 库名 = `${key}_${version}`，version 变化 => 换库
 */
class IdbStore implements VxeDBStore {
  private storeName = 'vxe_storage'
  private key: string
  private version: string | number
  private dbPromise: Promise<IDBDatabase> | null = null
  private dbName = ''

  constructor(key: string, version: string | number) {
    this.key = key
    this.version = version
  }

  private getDBName() {
    return `${this.key}_${this.version}`
  }

  /**
   * 重置连接缓存，下次调用 openDB 会重新建立连接
   */
  private resetDB() {
    this.dbPromise = null
    this.dbName = ''
  }

  private openDB(): Promise<IDBDatabase> {
    const name = this.getDBName()
    if (this.dbPromise && this.dbName === name) {
      return this.dbPromise
    }
    this.dbName = name
    this.dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open(name, 1)
      request.onupgradeneeded = () => {
        const db = request.result
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'id' })
        }
      }
      request.onsuccess = () => {
        const db = request.result
        // 连接失效时清缓存，下次自动重建
        db.onversionchange = () => {
          db.close()
          this.resetDB()
        }
        db.onclose = () => {
          this.resetDB()
        }
        resolve(db)
      }
      // 失败时先 reject，由外层 catch 统一清缓存
      request.onerror = () => {
        reject(request.error || new Error(`IdbStore open failed: ${name}`))
      }
      // blocked 仅警告，不 reject：其他连接关闭后仍可能 onsuccess
      request.onblocked = () => {
        console.warn(`[IdbStore] open blocked: ${name}`)
      }
    }).catch((err) => {
      // 覆盖 request.onerror 和同步抛错两种情况，避免缓存 rejected Promise
      this.resetDB()
      throw err
    })
    return this.dbPromise
  }

  getById(id: string): Promise<{ id: string; data: any } | undefined> {
    return this.openDB().then(
      (db) =>
        new Promise<{ id: string; data: any } | undefined>((resolve, reject) => {
          const req = db.transaction(this.storeName, 'readonly').objectStore(this.storeName).get(id)
          req.onsuccess = () => resolve(req.result)
          req.onerror = () => reject(req.error)
        })
    )
  }

  getAll(): Promise<{ id: string; data: any }[]> {
    return this.openDB().then(
      (db) =>
        new Promise<{ id: string; data: any }[]>((resolve, reject) => {
          const store = db.transaction(this.storeName, 'readonly').objectStore(this.storeName)
          if (XEUtils.isFunction(store.getAll)) {
            const req = store.getAll()
            req.onsuccess = () => resolve(req.result || [])
            req.onerror = () => reject(req.error)
            return
          }
          const list: { id: string; data: any }[] = []
          const req = store.openCursor()
          req.onsuccess = () => {
            const cursor = req.result
            if (cursor) {
              list.push(cursor.value)
              cursor.continue()
            } else {
              resolve(list)
            }
          }
          req.onerror = () => reject(req.error)
        })
    )
  }

  updateById(id: string, data: any): Promise<void> {
    // 与 LocalStorageStore 对齐：null / undefined 等价删除
    if (data == null) {
      return this.deleteById(id)
    }
    return this.openDB().then(
      (db) =>
        new Promise<void>((resolve, reject) => {
          const tx = db.transaction(this.storeName, 'readwrite')
          tx.objectStore(this.storeName).put({ id, data })
          tx.oncomplete = () => resolve()
          tx.onerror = () => reject(tx.error)
        })
    )
  }

  deleteById(id: string): Promise<void> {
    return this.openDB().then(
      (db) =>
        new Promise<void>((resolve, reject) => {
          const tx = db.transaction(this.storeName, 'readwrite')
          tx.objectStore(this.storeName).delete(id)
          tx.oncomplete = () => resolve()
          tx.onerror = () => reject(tx.error)
        })
    )
  }

  /**
   * 清空当前库的数据
   */
  clear(): Promise<void> {
    return this.openDB().then(
      (db) =>
        new Promise<void>((resolve, reject) => {
          const tx = db.transaction(this.storeName, 'readwrite')
          tx.objectStore(this.storeName).clear()
          tx.oncomplete = () => resolve()
          tx.onerror = () => reject(tx.error)
        })
    )
  }

  /**
   * 清理非当前版本的旧库
   */
  cleanupOldDBs(): Promise<void> {
    if (!indexedDB.databases) {
      return Promise.resolve()
    }
    const current = this.getDBName()
    const prefix = `${this.key}_`
    return indexedDB.databases().then((dbs) => {
      dbs.forEach((db) => {
        const n = db.name
        if (!n || n === current || !n.startsWith(prefix)) {
          return
        }
        const rest = n.slice(prefix.length)
        if (!rest.includes('_')) {
          indexedDB.deleteDatabase(n)
        }
      })
    })
  }
}

/**
 * localStorage 存储
 * - 储存结构：{ _v: version, [id]: data }，靠 _v 区分版本
 * - version 变化 => 读取时视为空{} => 重置
 */
class LocalStorageStore implements VxeDBStore {
  private key: string
  private version: string | number

  constructor(key: string, version: string | number) {
    this.key = key
    this.version = version
  }

  private readAll(): Record<string, any> {
    const storageData = XEUtils.toStringJSON(localStorage.getItem(this.key) || '')
    return storageData && String(storageData._v) === String(this.version) ? storageData : { _v: this.version }
  }

  private writeAll(map: Record<string, any>) {
    localStorage.setItem(this.key, XEUtils.toJSONString(map))
  }

  getById(id: string): Promise<{ id: string; data: any } | undefined> {
    const map = this.readAll()
    const has = Object.prototype.hasOwnProperty.call(map, id)
    return Promise.resolve(has && map[id] != null ? { id, data: map[id] } : undefined)
  }

  getAll(): Promise<{ id: string; data: any }[]> {
    const map = this.readAll()
    const list: { id: string; data: any }[] = []
    Object.keys(map).forEach((k) => {
      if (k !== '_v' && map[k] != null) {
        list.push({ id: k, data: map[k] })
      }
    })
    return Promise.resolve(list)
  }

  updateById(id: string, data: any): Promise<void> {
    // null / undefined 等价删除
    if (data == null) {
      return this.deleteById(id)
    }
    const map = this.readAll()
    map[id] = data
    this.writeAll(map)
    return Promise.resolve()
  }

  deleteById(id: string): Promise<void> {
    const map = this.readAll()
    delete map[id]
    this.writeAll(map)
    return Promise.resolve()
  }

  clear(): Promise<void> {
    this.writeAll({ _v: this.version })
    return Promise.resolve()
  }

  cleanupOldDBs(): Promise<void> {
    const raw = localStorage.getItem(this.key)
    if (!raw) {
      return Promise.resolve()
    }
    const storageData = XEUtils.toStringJSON(raw)
    if (!storageData || String(storageData._v) !== String(this.version)) {
      localStorage.removeItem(this.key)
    }
    return Promise.resolve()
  }
}

export const dbUtils: VxeDBUtils = {
  /**
   * 创建存储实例
   * - driver = 'indexedDB' 且环境支持 => IdbStore
   * - 其余情况（未传 / 不支持）=> LocalStorageStore
   */
  createStore(key: string, options?: VxeDBOptions): VxeDBStore {
    const opts = Object.assign({}, options)
    const version = opts.version || globalConfigStore.version || 0
    const driver = opts.driver
    if ((!driver || driver === 'indexedDB') && typeof indexedDB !== 'undefined') {
      return new IdbStore(key, version)
    }
    return new LocalStorageStore(key, version)
  }
}
