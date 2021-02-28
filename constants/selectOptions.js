const data = {
  pay: [
    {
      type: 'input'
    },
    {
      type: 'select',
      options: [
        {
          value: '1',
          label: '商户单号'
        },
        {
          value: '2',
          label: '支付金额'
        }
      ]
    },
    {
      type: 'select',
      width: 140,
      options: [
        {
          value: '1',
          label: '全部支付状态'
        },
        {
          value: '2',
          label: '支付成功'
        },
        {
          value: '3',
          label: '支付失败'
        },
        {
          value: '4',
          label: '已退款'
        }
      ]
    },
    {
      type: 'select',
      width: 140,
      options: [
        {
          value: '1',
          label: '全部支付状态'
        },
        {
          value: '2',
          label: '财付通'
        },
        {
          value: '3',
          label: '支付宝'
        },
        {
          value: '4',
          label: '微信支付'
        },
        {
          value: '5',
          label: '支付宝扫码'
        },
        {
          value: '6',
          label: '手Q支付'
        }
      ]
    },
    {
      type: 'select',
      options: [
        {
          value: '1',
          label: '全部订单'
        },
        {
          value: '2',
          label: '电脑端'
        },
        {
          value: '3',
          label: '手机H5'
        }
      ]
    }
  ],
  trans: [
    {
      type: 'input',
      placeholder: '交易订单号'
    },
    {
      type: 'select',
      width: 140,
      options: [
        {
          value: '1',
          label: '全部充值状态'
        },
        {
          value: '2',
          label: '充值成功'
        },
        {
          value: '3',
          label: '充值失败'
        }
      ]
    },
    {
      type: 'select',
      options: [
        {
          value: '1',
          label: '全部订单'
        },
        {
          value: '2',
          label: '电脑端'
        },
        {
          value: '3',
          label: '手机H5'
        }
      ]
    },
    {
      type: 'select',
      width: 140,
      options: [
        {
          value: '1',
          label: '全部支付状态'
        },
        {
          value: '2',
          label: '微信转账支付'
        }
      ]
    }
  ],
  point: [
    {
      type: 'input',
      placeholder: '请输入'
    },
    {
      type: 'select',
      options: [
        {
          value: '1',
          label: '订单号'
        },
        {
          value: '2',
          label: '充值卡号'
        },
        {
          value: '3',
          label: '提交面值'
        }
      ]
    },
    {
      type: 'select',
      options: [
        {
          value: '1',
          label: '全部状态'
        },
        {
          value: '2',
          label: '等待处理'
        },
        {
          value: '3',
          label: '充值成功'
        }
      ]
    }
  ],
  platform: [
    {
      type: 'select',
      options: [
        {
          value: '1',
          label: '提交面值'
        },
        {
          value: '2',
          label: '充值卡号'
        }
      ]
    },
    {
      type: 'select',
      options: [
        {
          value: '1',
          label: '全部状态'
        },
        {
          value: '2',
          label: '充值成功'
        },
        {
          value: '3',
          label: '充值失败'
        }
      ]
    }
  ]
}
export default function(type) {
  return data[type] || []
}
