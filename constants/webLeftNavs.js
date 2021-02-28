export default [
  {
    label: '商品服务',
    icon: 'goods',
    isSupply: true,
    style: {
      color: 'red'
    },
    children: [
      {
        label: '商品添加',
        icon: 'circle-plus-outline',
        path: '/goodsAdd'
      },
      {
        label: '商品列表',
        icon: 'tickets',
        path: '/goodsList'
      },
    ],
  },
  {
    label: '订单服务',
    icon: 'document',
    isSupply: true,
    style: {
      color: 'red'
    },
    children: [
      {
        label: '订单列表',
        icon: 'document',
        path: '/orderList'
      },
      {
        label: '订单投诉列表',
        icon: 'chat-square',
        path: '/complaintList'
      },
    ],
  },
  {
    label: '财务服务',
    icon: 'document',
    style: {
      color: 'red'
    },
    isSupply: true,
    children: [
      {
        label: '未转余额申请',
        icon: 'document',
        path: '/saleApply/saleApply'
      },
      {
        label: '未转申请列表',
        icon: 'chat-square',
        path: '/saleApply/saleList'
      },
      {
        label: '交易明细',
        icon: 'chat-square',
        path: '/saleApply/saleDetailList'
      },
    ],
  },
  {
    label: '官方充值',
    icon: 'money',
    path: '/charge'
  },
  {
    label: '收藏夹',
    icon: 'folder',
    path: '/favorite'
  },
  {
    label: '微信绑定',
    icon: 'mobile',
    path: '/wechat'
  },
  {
    label: '注册推广链接',
    icon: 'attract',
    path: '/spread'
  },
  {
    label: '充值记录',
    icon: 'notebook-2',
    path: '/charge-list'
  },
  {
    label: '联系客服',
    icon: 'headset',
    path: '/support'
  }
]
