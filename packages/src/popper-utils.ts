import XEUtils from 'xe-utils'

import type { VxePopperUtils, VxePopperOptions } from '../../types'

/**
 * 获取包裹容器的元素
 */
function getWrapperElement (panelElem: HTMLElement | null | undefined) {
  if (!panelElem) {
    return null
  }
  const bodyEl = document.body
  const parentEl = panelElem.parentElement
  return (parentEl === bodyEl ? document.documentElement : parentEl) || null
}

/**
 * 获取插入到指定容器的元素或字符串
  */
function getAppendSelector (appendTo: string | HTMLElement | ((params: any) => string | HTMLElement) | undefined) {
  const selectElem = appendTo && XEUtils.isFunction(appendTo) ? appendTo({}) : appendTo
  return selectElem || 'body'
}

/**
 * 获取插入到指定容器的元素
 */
function getAppendElement (appendTo: string | HTMLElement | ((params: any) => string | HTMLElement) | undefined) {
  const selectElem = getAppendSelector(appendTo)
  if (XEUtils.isString(selectElem)) {
    return document.querySelector<HTMLElement>(selectElem) || document.body
  }
  return selectElem
}

export const popperUtils: VxePopperUtils = {
  /**
   * 更新位置
   */
  updatePlacement (targetElem: HTMLElement | null | undefined, panelElem: HTMLElement | null | undefined, options: VxePopperOptions) {
    const { defaultTop, defaultLeft, placement, defaultPlacement, appendTo, teleportTo, marginSize, isMinWidth } = Object.assign({
      appendTo: '',
      teleportTo: false,
      marginSize: 12,
      isMinWidth: true
    }, options)
    let panelPlacement: 'top' | 'bottom' = 'bottom'
    let top: number | '' = ''
    let bottom: number | '' = ''
    let left = 0
    let minWidth: number | '' = ''
    let arrowLeft: number | '' = ''
    const stys: Record<string, string> = {}
    if (panelElem && targetElem) {
      const bodyEl = document.body
      const parentWrapperEl = getWrapperElement(teleportTo ? getAppendElement(appendTo) : panelElem)
      if (parentWrapperEl) {
        const targetWidth = targetElem.offsetWidth
        const targetHeight = targetElem.offsetHeight
        const panelWidth = panelElem.offsetWidth
        const panelHeight = panelElem.offsetHeight

        const parentWrapperRect = parentWrapperEl.getBoundingClientRect()
        const panelRect = panelElem.getBoundingClientRect()
        const targetRect = targetElem.getBoundingClientRect()
        const visibleHeight = bodyEl.clientHeight
        const visibleWidth = bodyEl.clientWidth

        const parentWrapperScrollLeft = parentWrapperEl.scrollLeft
        const parentWrapperScrollTop = parentWrapperEl.scrollTop
        const parentWrapperOffsetLeft = parentWrapperRect.left
        const parentWrapperOffsetTop = parentWrapperRect.top
        const targetLeft = targetRect.left
        const targetTop = targetRect.top

        minWidth = targetElem.offsetWidth

        if (teleportTo) {
          left = (defaultLeft || (targetLeft - (panelWidth - targetWidth) / 2)) - parentWrapperScrollLeft
          top = (defaultTop || (targetTop + targetHeight)) - parentWrapperScrollTop
          if (placement === 'top') {
            panelPlacement = 'top'
            top = targetTop - panelHeight
          } else if (!placement) {
            if (defaultPlacement === 'top') {
              panelPlacement = 'top'
              if (!defaultTop) {
                top = targetTop - panelHeight
              }
              // 如果上面不够放，则向下
              if (top < marginSize) {
                panelPlacement = 'bottom'
                top = targetTop + targetHeight
              }
              // 如果下面不够放，则向上（优先）
              if (top + panelHeight + marginSize > visibleHeight) {
                panelPlacement = 'top'
                top = targetTop - panelHeight
              }
            } else {
            // 如果下面不够放，则向上
              if (top + panelHeight + marginSize > visibleHeight) {
                panelPlacement = 'top'
                top = targetTop - panelHeight
              }
              // 如果上面不够放，则向下（优先）
              if (top < marginSize) {
                panelPlacement = 'bottom'
                top = targetTop + targetHeight
              }
            }
          }
          // 如果溢出右边
          if (left + panelWidth + marginSize > visibleWidth) {
            left -= left + panelWidth + marginSize - visibleWidth
          }
          // 如果溢出左边
          if (left < marginSize) {
            left = marginSize
          }

          // 偏移
          top -= parentWrapperOffsetTop
          left -= parentWrapperOffsetLeft
        } else {
          if (placement === 'top') {
            panelPlacement = 'top'
            bottom = targetHeight
          } else if (!placement) {
          // 如果下面不够放，则向上
            top = targetHeight
            if (targetTop + targetHeight + panelHeight + marginSize > visibleHeight) {
            // 如果上面不够放，则向下（优先）
              if (targetTop - targetHeight - panelHeight > marginSize) {
                panelPlacement = 'top'
                top = ''
                bottom = targetHeight
              }
            }
          }
          // 是否超出右侧
          if (panelRect.left + panelRect.width + marginSize > visibleWidth) {
            left = -(panelRect.left + panelRect.width + marginSize - visibleWidth)
          }
        }
        if (XEUtils.isNumber(top)) {
          stys.top = top + 'px'
        }
        if (XEUtils.isNumber(bottom)) {
          stys.bottom = bottom + 'px'
        }
        if (XEUtils.isNumber(left)) {
          stys.left = left + 'px'
        }
        if (isMinWidth && XEUtils.isNumber(minWidth)) {
          stys.minWidth = minWidth + 'px'
        }

        // 箭头
        if (left === targetLeft) {
          if (targetWidth <= panelWidth) {
            arrowLeft = targetWidth / 2
          }
        } else if (left < targetLeft) {
          if (left + panelWidth > targetLeft + targetWidth) {
            arrowLeft = (targetLeft - left) + targetWidth / 2
          } else {
            arrowLeft = (targetLeft - left) + (panelWidth - (targetLeft - left)) / 2
          }
        }
      }
    }
    return {
      top: top || 0,
      bottom: bottom || 0,
      left: left || 0,
      arrowLeft: arrowLeft || 0,
      style: stys,
      placement: panelPlacement
    }
  },
  /**
   * 获取包裹容器的元素
   */
  getWrapperElement,
  /**
   * 获取插入到指定容器的元素或字符串
   */
  getAppendSelector,
  /**
   * 获取插入到指定容器的元素
   */
  getAppendElement
}
