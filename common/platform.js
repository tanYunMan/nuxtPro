export default function(userAgent) {
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(userAgent)) {
    return 'wap'
  } else {
    return 'web'
  }
}

export const platformMeta = ($store) => {
  if ($store.state.platform === 'wap') {
    return {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, user-scalable=no'
        }
      ]
    }
  } else if ($store.state.isMobile) {
    return {
      meta: [
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=0.31,user-scalable=yes,maximum-scale=1.0'
        }
      ]
    }
  } else {
    return {
      meta: []
    }
  }
}
