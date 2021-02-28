export default function({ app, store }) {
  // wap页面增加header头
  if (store.state.isMobileShow !== 0) {
    app.head.meta.push({
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, user-scalable=no'
    })
  }
}
