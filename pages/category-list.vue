<template>
  <div>
    <h3>
      <span>当前位置：商品目录</span>
    </h3>
    <recommends></recommends>
    <section class="search">
      <el-input
        v-model="searchText"
        placeholder="请输入内容"
        class="input-with-select"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="doSearch"
        ></el-button>
      </el-input>
    </section>
    <section class="goods">
      <div class="row" v-for="cate in categoryList" :key="cate.catalogID">
        <h4 :style="{ color: cate.color }">
          <img
            v-if="cate.img"
            :src="cate.img"
            @mouseenter="showImg(cate, $event)"
            @mouseleave="showImg()"
          />
          <span>{{ cate.catalogName }}</span>
        </h4>
        <ul>
          <a
            v-for="subCate in cate.children"
            :key="subCate.catalogID"
            :href="`/goods-list?categoryId=${subCate.catalogID}`"
          >
            <li
              :style="{ color: subCate.color }"
              @mouseenter="showImg(subCate, $event)"
              @mouseleave="showImg()"
            >
              {{ subCate.catalogName }}
            </li>
          </a>
        </ul>
        <div class="line"></div>
      </div>
    </section>
    <div
      class="img-tip"
      :style="{
        left: imgTip.left,
        top: imgTip.top,
        display: imgTip.src ? '' : 'none'
      }"
    >
      <img v-if="imgTip.src" :src="imgTip.src" />
    </div>
  </div>
</template>

<script>
import Recommends from '@/components/recommends'

export default {
  layout: 'webIn',
  components: {
    Recommends
  },
  data() {
    return {
      recommendsCategory: [],
      searchText: '',
      categoryList: [],
      imgTip: {
        left: '0px',
        top: '0px',
        src: ''
      }
    }
  },
  async mounted() {
    const res = await this.$axios.get('/goods/catalog/tree')
    if (res.code === 1001 && res.body) {
      this.categoryList = res.body
    }
  },
  methods: {
    doSearch() {
      if (!this.searchText) {
        return this.$message.error('请输入关键字')
      }
      location.href = `/goods-list?keywords=${this.searchText}`
    },
    showImg(cate, e) {
      if (cate && cate.img) {
        const { x, y } = e.target.getBoundingClientRect()
        this.imgTip.top = `${document.documentElement.scrollTop + y - 330}px`
        this.imgTip.left = `${window.scrollX + x - 150}px`
        this.imgTip.src = cate.img
      } else {
        this.imgTip.src = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
section + section {
  margin-top: 15px;
}
.search {
  padding: 10px 15px;
  background: white;
  .el-input {
    width: 400px;
  }
}
.goods {
  background: white;
  h4 {
    background: $--light-color-primary;
    font-size: 14px;
    padding: 0 15px;
    line-height: 40px;
    span {
      font-size: 14px;
      display: inline-block;
    }
    img {
      width: 30px;
      height: 30px;
      vertical-align: top;
      margin: 5px 5px 0 0;
    }
  }
  ul {
    overflow: hidden;
    text-align: center;
    li {
      width: 20%;
      float: left;
      padding: 7px 10px;
      line-height: 17px;
      font-size: 12px;
      color: $--color-primary;
      border-right: 1px solid #eeecea;
      border-bottom: 1px solid #eeecea;
    }
    a:nth-child(5) {
      li {
        border-right: 0;
      }
    }
    a:hover {
      color: $--alert-red;
      li {
        color: $--alert-red;
        text-decoration: underline;
      }
    }
  }
  .line {
    height: 1px;
    background: #eeecea;
    margin-top: -1px;
  }
  .row {
    margin-bottom: 5px;
  }
}
.img-tip {
  width: 160px;
  height: 160px;
  position: absolute;
  background: #fff;
}
</style>
