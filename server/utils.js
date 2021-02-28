function isWap(userAgent) {
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(userAgent)) {
    return true
  } else {
    return false
  }
}

module.exports = { isWap }
