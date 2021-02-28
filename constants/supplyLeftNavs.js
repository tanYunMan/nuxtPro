export default [
  {
    title: '供货商品管理',
    icon: 'goods',
    list: [
      {
        label: '发布供货商品',
        path: '/supply/publish'
      },
      {
        label: '供货商品管理',
        path: '/supply/goods-list'
      },
      {
        label: '卡密商品库存管理',
        path: '/supply/cdkey-list'
      }
    ]
  },
  {
    title: '供货订单管理',
    icon: 'document',
    list: [
      {
        label: '手工订单列表',
        path: '/supply/orders'
      },
      {
        label: '申请退款的订单',
        path: '/supply/refund'
      },
      {
        label: '处理中的订单',
        path: '/supply/pending'
      },
      {
        label: '已退款订单列表',
        path: '/supply/refunded'
      },
      {
        label: '接口订单列表',
        path: '/supply/api-orders'
      },
      {
        label: '订单投诉处理',
        path: '/supply/complain'
      }
    ]
  },
  {
    title: '财务管理',
    icon: 'wallet',
    list: [
      {
        label: '供货交易明细',
        path: '/supply/trade'
      },
      {
        label: '销售入账明细',
        path: '/supply/bill'
      },
      {
        label: '未转余额申请',
        path: '/supply/balance'
      }
    ]
  },
  {
    title: '其他设置',
    icon: 'collection-tag',
    list: [
      {
        label: '快捷回复自定义',
        path: '/supply/reply'
      }
    ]
  }
]
