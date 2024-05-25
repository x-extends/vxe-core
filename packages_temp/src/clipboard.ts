import { VxeGlobalClipboard } from '../../types'

let copyElem: HTMLTextAreaElement

function handleText (content: string | number) {
  if (!copyElem) {
    copyElem = document.createElement('textarea')
    copyElem.id = '$VxeCopy'
    const styles = copyElem.style
    styles.width = '48px'
    styles.height = '24px'
    styles.position = 'fixed'
    styles.zIndex = '0'
    styles.left = '-500px'
    styles.top = '-500px'
    document.body.appendChild(copyElem)
  }
  copyElem.value = content === null || content === undefined ? '' : ('' + content)
}

export const clipboard: VxeGlobalClipboard = {
  /**
   * 复制内容到剪贴板
   *
   * @param {String} content Text 内容
   */
  copy (content: string | number) {
    let result = false
    try {
      handleText(content)
      copyElem.select()
      copyElem.setSelectionRange(0, copyElem.value.length)
      result = document.execCommand('copy')
      copyElem.blur()
    } catch (e) {}
    return result
  }
}
