import XEUtils from 'xe-utils'
import Vue from 'vue'
import { handleCheckInfo } from './permission'
import { scrollbarUtils } from './scrollbar-utils'

import { VxeGlobalUseMixins, VxeComponentSizeType, VxeComponentIsVScrollbar, VxeUseInitVScrollbarReactData, VxeUseInitVScrollbarInternalData } from '../../types'

const { getThumbOffsetSize, getThumbSize, getScrollFromClick, getScrollFromDrag } = scrollbarUtils

function getVmInternalData ($xeVm: {
  reactData: VxeUseInitVScrollbarReactData
  internalData: VxeUseInitVScrollbarInternalData
  getScrollViewElem(): HTMLDivElement | null | undefined
}) {
  // 新版本 $xeVm.internalData
  // 老版本 $xeVm
  return $xeVm.internalData || $xeVm
}

function getVmReactData ($xeVm: {
  reactData: VxeUseInitVScrollbarReactData
  internalData: VxeUseInitVScrollbarInternalData
  getScrollViewElem(): HTMLDivElement | null | undefined
}) {
  // 新版本 $xeVm.reactData
  // 老版本 $xeVm
  return $xeVm.reactData || $xeVm
}

/**
 * 组件尺寸上下文
 */
export const sizeMixin = Vue.extend({
  inject: {
    $xeSizeInfo: {
      default: null
    }
  },
  provide (this: any) {
    return {
      $xeSizeInfo: {
        getSize: () => this.computeSize
      }
    }
  },
  computed: {
    computeSize (this: any): VxeComponentSizeType {
      const { size } = this
      const $xeSizeInfo = this.$xeSizeInfo
      return size || ($xeSizeInfo ? $xeSizeInfo.getSize() : null)
    }
  }
})

/**
 * 权限码处理
 */
export const permissionMixin = Vue.extend({
  computed: {
    computePermissionInfo (this: any) {
      return handleCheckInfo(this.permissionCode, this.permissionMethod)
    }
  }
})

/**
 * 虚拟滚动条是否启用
 */
export const vScrollbarMixin = Vue.extend({
  inject: {
    $xeScrollbarInfo: {
      default: null
    }
  },
  provide (this: any) {
    return {
      $xeScrollbarInfo: {
        getIsVScrollbar: () => this.computeIsVScrollbar
      }
    }
  },
  computed: {
    computeIsVScrollbar (this: any): VxeComponentIsVScrollbar {
      const { useScrollbar } = this
      const $xeScrollbarInfo = this.$xeScrollbarInfo
      return XEUtils.isBoolean(useScrollbar) ? useScrollbar : ($xeScrollbarInfo ? $xeScrollbarInfo.getIsVScrollbar() : null)
    }
  }
})

export const initVScrollbarMixin = Vue.extend({
  ...({} as {
    data(): {
      reactData: VxeUseInitVScrollbarReactData
      internalData: VxeUseInitVScrollbarInternalData
      getScrollViewElem(): HTMLDivElement | null | undefined
    }
  }),
  methods: {
    updateThumbSize () {
      const $xeVm = this
      const reactData = getVmReactData($xeVm)

      const viewEl = $xeVm.getScrollViewElem()
      if (!viewEl) {
        return
      }
      if (!viewEl.clientHeight || !viewEl.clientHeight) {
        return
      }
      const trackXEl = $xeVm.$refs.refTrackXElem as HTMLDivElement
      const xThumbWidth = trackXEl ? getThumbSize(viewEl.clientWidth, viewEl.scrollWidth, trackXEl.clientWidth) : 0
      const thumbXElem = $xeVm.$refs.refThumbXElem as HTMLDivElement
      if (thumbXElem) {
        thumbXElem.style.width = xThumbWidth + 'px'
      }
      reactData.xThumbWidth = xThumbWidth

      const trackYEl = $xeVm.$refs.refTrackYElem as HTMLDivElement
      const yThumbHeight = trackYEl ? getThumbSize(viewEl.clientHeight, viewEl.scrollHeight, trackYEl.clientHeight) : 0
      const thumbYElem = $xeVm.$refs.refThumbYElem as HTMLDivElement
      if (thumbYElem) {
        thumbYElem.style.height = yThumbHeight + 'px'
      }
      reactData.yThumbHeight = yThumbHeight
    },
    updateThumbOffset () {
      const $xeVm = this
      const reactData = getVmReactData($xeVm)
      const internalData = getVmInternalData($xeVm)

      const viewEl = $xeVm.getScrollViewElem()
      if (!viewEl) {
        return
      }
      if (!viewEl.clientHeight || !viewEl.clientHeight) {
        return
      }
      const { xThumbWidth, yThumbHeight } = reactData
      const trackXEl = $xeVm.$refs.refTrackXElem as HTMLDivElement
      const thumbXElem = $xeVm.$refs.refThumbXElem as HTMLDivElement
      const xThumbLeft = trackXEl && xThumbWidth ? getThumbOffsetSize(viewEl.scrollLeft, viewEl.clientWidth, viewEl.scrollWidth, trackXEl.clientWidth, xThumbWidth) : 0
      internalData.xThumbLeft = xThumbLeft
      if (thumbXElem && xThumbWidth) {
        thumbXElem.style.width = xThumbWidth + 'px'
        thumbXElem.style.transform = `translateX(${xThumbLeft}px)`
      }

      const trackYEl = $xeVm.$refs.refTrackYElem as HTMLDivElement
      const thumbYElem = $xeVm.$refs.refThumbYElem as HTMLDivElement
      const yThumbTop = trackYEl && yThumbHeight ? getThumbOffsetSize(viewEl.scrollTop, viewEl.clientHeight, viewEl.scrollHeight, trackYEl.clientHeight, yThumbHeight) : 0
      internalData.yThumbTop = yThumbTop
      if (thumbYElem && yThumbHeight) {
        thumbYElem.style.height = yThumbHeight + 'px'
        thumbYElem.style.transform = `translateY(${yThumbTop}px)`
      }
    },
    clickTrackXEvent (evnt: MouseEvent) {
      const $xeVm = this
      const reactData = getVmReactData($xeVm)

      const trackEl = evnt.currentTarget as HTMLDivElement
      if (trackEl !== evnt.target) {
        return
      }
      const viewEl = $xeVm.getScrollViewElem()
      if (!viewEl) {
        return
      }
      const { xThumbWidth } = reactData
      const trackRect = trackEl.getBoundingClientRect()
      viewEl.scrollTo({
        left: getScrollFromClick(evnt.clientX - trackRect.left, viewEl.clientWidth, viewEl.scrollWidth, trackEl.clientWidth, xThumbWidth),
        behavior: 'auto'
      })
    },
    clickTrackYEvent (evnt: MouseEvent) {
      const $xeVm = this
      const reactData = getVmReactData($xeVm)

      const trackEl = evnt.currentTarget as HTMLDivElement
      if (trackEl !== evnt.target) {
        return
      }
      const viewEl = $xeVm.getScrollViewElem()
      if (!viewEl) {
        return
      }
      const { yThumbHeight } = reactData
      const trackRect = trackEl.getBoundingClientRect()
      viewEl.scrollTo({
        top: getScrollFromClick(evnt.clientY - trackRect.top, viewEl.clientHeight, viewEl.scrollHeight, trackEl.clientHeight, yThumbHeight),
        behavior: 'auto'
      })
    },
    pointerdownThumbXEvent (evnt: PointerEvent) {
      const $xeVm = this
      const reactData = getVmReactData($xeVm)
      const internalData = getVmInternalData($xeVm)

      const thumbEl = evnt.currentTarget as HTMLDivElement
      internalData.isThumbDrag = true
      thumbEl.setPointerCapture(evnt.pointerId)

      const viewEl = $xeVm.getScrollViewElem()
      if (!viewEl) {
        return
      }
      const { xThumbWidth } = reactData
      const trackEl = thumbEl.parentElement as HTMLDivElement
      const trackRect = trackEl.getBoundingClientRect()
      const pointerPosition = evnt.clientX - trackRect.left
      // 记录 thumb 的偏移
      const thumbOffset = getThumbOffsetSize(viewEl.scrollLeft, viewEl.clientWidth, viewEl.scrollWidth, trackEl.clientWidth, xThumbWidth)
      internalData.thumbDragOffset = pointerPosition - thumbOffset
    },
    pointermoveThumbXEvent (evnt: PointerEvent) {
      const $xeVm = this
      const reactData = getVmReactData($xeVm)
      const internalData = getVmInternalData($xeVm)

      const { isThumbDrag, thumbDragOffset } = internalData
      if (isThumbDrag) {
        const viewEl = $xeVm.getScrollViewElem()
        if (!viewEl) {
          return
        }
        const { xThumbWidth } = reactData
        const thumbEl = evnt.currentTarget as HTMLDivElement
        const trackEl = thumbEl.parentElement as HTMLDivElement
        const trackRect = trackEl.getBoundingClientRect()
        // 更新偏移
        viewEl.scrollLeft = getScrollFromDrag(evnt.clientX - trackRect.left, thumbDragOffset, viewEl.clientWidth, viewEl.scrollWidth, trackEl.clientWidth, xThumbWidth)
      }
    },
    cleatPointerThumbEvent (evnt: PointerEvent) {
      const $xeVm = this
      const internalData = getVmInternalData($xeVm)

      const thumbEl = evnt.currentTarget as HTMLDivElement
      thumbEl.releasePointerCapture(evnt.pointerId)
      internalData.isThumbDrag = false
    },
    pointerdownThumbYEvent (evnt: PointerEvent) {
      const $xeVm = this
      const reactData = getVmReactData($xeVm)
      const internalData = getVmInternalData($xeVm)

      const thumbEl = evnt.currentTarget as HTMLDivElement
      internalData.isThumbDrag = true
      thumbEl.setPointerCapture(evnt.pointerId)

      const viewEl = $xeVm.getScrollViewElem()
      if (!viewEl) {
        return
      }
      const { yThumbHeight } = reactData
      const trackEl = thumbEl.parentElement as HTMLDivElement
      const trackRect = trackEl.getBoundingClientRect()
      const pointerPosition = evnt.clientY - trackRect.top
      // 记录 thumb 的偏移
      const thumbOffset = getThumbOffsetSize(viewEl.scrollTop, viewEl.clientHeight, viewEl.scrollHeight, trackEl.clientHeight, yThumbHeight)
      internalData.thumbDragOffset = pointerPosition - thumbOffset
    },
    pointermoveThumbYEvent (evnt: PointerEvent) {
      const $xeVm = this
      const reactData = getVmReactData($xeVm)
      const internalData = getVmInternalData($xeVm)

      const { isThumbDrag, thumbDragOffset } = internalData
      if (isThumbDrag) {
        const viewEl = $xeVm.getScrollViewElem()
        if (!viewEl) {
          return
        }
        const { yThumbHeight } = reactData
        const thumbEl = evnt.currentTarget as HTMLDivElement
        const trackEl = thumbEl.parentElement as HTMLDivElement
        const trackRect = trackEl.getBoundingClientRect()
        // 更新偏移
        viewEl.scrollTop = getScrollFromDrag(evnt.clientY - trackRect.top, thumbDragOffset, viewEl.clientHeight, viewEl.scrollHeight, trackEl.clientHeight, yThumbHeight)
      }
    }
  }
})

export const globalMixins: VxeGlobalUseMixins = {
  sizeMixin,
  permissionMixin,
  vScrollbarMixin,
  initVScrollbarMixin
}
