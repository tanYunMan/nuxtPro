<template>
  <section class="main-section sec">
    <div class="top-bg"></div>
    <div class="content">
      <h2>
        <i class="el-icon-caret-right"></i>
        <span>公告信息</span>
      </h2>
      <ul class="list">
        <a
          v-for="item in list"
          :key="item.systemNoticeID"
          :href="`/notice/${item.systemNoticeID}`"
        >
          <li>
            <i class="el-icon-top-right"></i>
            <span :style="`color: ${item.color}`">{{
              item.systemNoticeTitle
            }}</span>
            <span class="date">{{ item.createTime }}</span>
          </li>
        </a>
      </ul>
      <div class="pager">
        <a href="/notice?page=1">首页</a>
        <a v-if="page > 1" :href="`/notice?page=${page - 1}`">上一页</a>
        <a v-if="page < totalPage" :href="`/notice?page=${page + 1}`">下一页</a>
        <a :href="`/notice?page=${totalPage}`">末页</a>
        <span>当前{{ page }}页</span>
        <span>共{{ totalPage }}页</span>
        <span>15条/页</span>
        <span>共{{ total }}条</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'web',
  async asyncData({ $axios, route }) {
    const { page } = route.query
    const pageNum = page || 1
    const res = await $axios.post('/site/systemNotice/pageFK', null, {
      params: {
        pageNum,
        pageSize: 15
      }
    })
    if (res.code === 1001 && res.body) {
      return {
        page: pageNum,
        list: res.body.records,
        total: res.body.total,
        totalPage: Math.ceil(res.body.total / 15)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  padding-top: 15px;
  background: $--light-color-primary;
}
.content {
  z-index: 2;
  position: relative;
  width: 1190px;
  margin: 0 auto;
  background: white;
  height: 100%;
  .list {
    padding: 15px 30px;
    font-size: 14px;
    a {
      color: $--black-text-color;
    }
    a + a {
      margin-top: 5px;
      display: block;
    }
    li {
      line-height: 30px;
      border-bottom: 1px dashed $--basic-border-color;
      i {
        font-weight: 600;
        margin-right: 10px;
        font-size: 12px;
      }
      .date {
        float: right;
        font-size: 12px;
        color: $--gray-text-color;
      }
    }
  }
  .pager {
    padding: 15px 30px;
    text-align: center;
    a:first-child {
      margin-left: 0;
    }
    a,
    span {
      font-size: 13px;
      margin-left: 15px;
    }
  }
}
</style>
