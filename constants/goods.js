export const searchOptions = [
  {
    type: 'select',
    key: 'type',
    options: [
      {
        label: '商品编号',
        value: '1'
      },
      {
        label: '商品名称',
        value: '2'
      },
      {
        label: '商品面值',
        value: 'goodsValueStart'
      },
      {
        label: '商品目录',
        value: '4'
      }
    ]
  },
  { type: 'input', key: 'typeValue', placeholder: '请输入关键字', width: 300 }
]

export const options = [
  {
    type: 'select',
    key: 'goodsTypeID',
    options: [
      {
        label: '全部类型',
        value: ''
      }
    ]
  },
  {
    type: 'select',
    key: 'goodsState',
    options: [
      {
        label: '全部状态',
        value: ''
      },
      {
        label: '下架',
        value: '0'
      },
      {
        label: '上架',
        value: '1'
      },
      {
        label: '暂停',
        value: '2'
      }
    ]
  },
  {
    type: 'select',
    key: 'hasCatalog',
    width: 140,
    options: [
      {
        label: '全部目录状态',
        value: ''
      },
      {
        label: '未设置',
        value: '0'
      },
      {
        label: '已设置',
        value: '1'
      }
    ]
  },
  {
    type: 'select',
    key: 'hasTemp',
    width: 140,
    options: [
      {
        label: '全部模版状态',
        value: ''
      },
      {
        label: '未设置',
        value: '0'
      },
      {
        label: '已设置',
        value: '1'
      }
    ]
  },
  {
    type: 'select',
    key: 'viewState',
    options: [
      {
        label: '审核状态',
        value: ''
      },
      {
        label: '等待审核',
        value: '0'
      },
      {
        label: '审核成功',
        value: '1'
      },
      {
        label: '审核失败',
        value: '2'
      }
    ]
  }
]
