import XEUtils from 'xe-utils'

import { VxeDomUtils } from '../../types'

const reClsMap: { [key: string]: any } = {}

function getClsRE(cls: any) {
  if (!reClsMap[cls]) {
    reClsMap[cls] = new RegExp(`(?:^|\\s)${cls}(?!\\S)`, 'g')
  }
  return reClsMap[cls]
}

/**
 * 判断元素是否包含 class
 */
function hasClass(elem: any, cls: any) {
  if (elem) {
    if (elem.classList) {
      return elem.classList.contains(cls)
    }
    return !!(elem.className && elem.className.match && elem.className.match(getClsRE(cls)))
  }
  return false
}

/**
 * 给元素删除 class
 */
function removeClass(elem: any, cls: any) {
  if (elem && hasClass(elem, cls)) {
    elem.className = elem.className.replace(getClsRE(cls), '')
  }
}

export const domUtils: VxeDomUtils = {
  /**
   * 判断是否像素px单位 '100px' | 100
   */
  isPx(val: any) {
    return val && /^\d+(\.\d+)?(px)?$/.test(val)
  },
  /**
   * 判断是否百分比%单位 '100%'
   */
  isScale(val: any) {
    return val && /^\d+(\.\d+)?%$/.test(val)
  },
  /**
   * 判断元素是否包含 class
   */
  hasClass,
  /**
   * 给元素删除 class
   */
  removeClass,
  /**
   * 给元素增加 class
   */
  addClass(elem: any, cls: string) {
    if (elem && !hasClass(elem, cls)) {
      removeClass(elem, cls)
      elem.className = elem.className + ' ' + cls
    }
  },
  /**
   * 生成 className
   */
  buildClass(staticClassNames, mapClassName) {
    const parts: string[] = []
    if (staticClassNames) {
      for (let i = 0; i < staticClassNames.length; i++) {
        const val = staticClassNames[i]
        if (val) {
          parts.push('' + val)
        }
      }
    }
    XEUtils.each(mapClassName, (val, key) => {
      if (val) {
        parts.push(key)
      }
    })
    return parts.join(' ')
  }
}
