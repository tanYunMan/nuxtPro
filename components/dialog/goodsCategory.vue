<template>
  <el-dialog
    custom-class="inp-wrapper d-goods-category"
    title="商品目录修改"
    :visible.sync="visible"
    @closed="hide"
  >
    <el-tree
      v-if="inited"
      ref="tree"
      :data="root"
      node-key="catalogID"
      :props="treeProps"
      :default-expand-all="true"
    >
      <div
        slot-scope="{ node, data }"
        :style="{ flex: 1 }"
        @click="onCheckChange(node.level, data.catalogID)"
      >
        <el-checkbox
          v-if="node.level === 2"
          :value="selected === data.catalogID"
          :style="{ marginRight: '8px' }"
        ></el-checkbox>
        <span :style="{ userSelect: 'none' }">{{ node.label }}</span>
      </div>
    </el-tree>
    <el-button type="primary" @click="changeCagetory">确认修改</el-button>
    <el-button @click="hide">关闭窗口</el-button>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      goodsIds: [],
      inited: false,
      root: [],
      treeProps: {
        label: 'catalogName',
        children: 'children'
      },
      selected: 0
    }
  },
  methods: {
    onCheckChange(level, cateId) {
      if (parseInt(level) !== 2) return
      // 阻止点击在checkbox上，这里被调用两次
      const target = window.event.target
      if (target && target.tagName === 'INPUT') return
      if (this.selected === cateId) {
        this.selected = 0
      } else {
        this.selected = cateId
      }
    },
    async changeCagetory() {
      if (!this.selected) {
        return this.$message.error('请勾选分类')
      }
      const res = await this.$axios.post(
        '/goods/goods/updateCatalogIDBatch',
        null,
        {
          params: {
            ids: this.goodsIds.join(','),
            catalogID: this.selected
          }
        }
      )
      if (res.code === 1001) {
        this.$message.success('分类修改成功')
        this.hide()
      }
    },
    async show(goodsIds) {
      this.goodsIds = goodsIds
      if (!this.inited) {
        const res = await this.$axios.get('/goods/catalog/tree')
        if (res.code === 1001 && res.body) {
          this.root = res
          this.inited = true
        }
      }
      this.visible = true
    },
    hide() {
      this.visible = false
      this.goodsIds = []
      this.selected = 0
    }
  }
}
</script>
