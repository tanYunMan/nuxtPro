export default function IEVersion() {
  const userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
  const isIE = userAgent.includes('compatible') && userAgent.includes('MSIE') // 判断是否IE<11浏览器
  const isEdge = userAgent.includes('Edge') && !isIE // 判断是否IE的Edge浏览器
  const isIE11 = userAgent.includes('Trident') && userAgent.includes('rv:11.0')
  if (isIE) {
    const reIE = new RegExp('MSIE (\\d+\\.\\d+);')
    reIE.test(userAgent)
    /* eslint-disable dot-notation */
    const fIEVersion = parseFloat(RegExp['$1'])
    if (fIEVersion === 7) {
      return 7
    } else if (fIEVersion === 8) {
      return 8
    } else if (fIEVersion === 9) {
      return 9
    } else if (fIEVersion === 10) {
      return 10
    } else {
      return 6 // IE版本<=7
    }
  } else if (isEdge) {
    return 'edge' // edge
  } else if (isIE11) {
    return 11 // IE11
  } else {
    return -1 // 不是ie浏览器
  }
}
