<template>
  <aside>
    <ul>
      <a v-for="(item, idx) in navs" :key="item.key" :href="`/${item.key}`">
        <li :class="index === idx ? 'selected' : ''">
          <em />
          {{ item.name }}
        </li>
      </a>
    </ul>
  </aside>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      navs: [
        {
          name: '关于我们',
          key: 'about'
        },
        {
          name: '联系方式',
          key: 'contact-us'
        },
        {
          name: '银行信息',
          key: 'bank'
        },
        {
          name: '帮助信息',
          key: 'help'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
aside {
  padding-top: 20px;
  width: 150px;
  float: left;
  ul {
    font-size: 14px;
    margin-top: 5px;
    a {
      text-decoration: none;
      color: $--black-text-color;
    }
    li {
      line-height: 35px;
      font-weight: 600;
      border-bottom: 1px solid $--basic-border-color;
      padding-left: 10px;
      em {
        display: inline-block;
        width: 4px;
        height: 4px;
        border-radius: 2px;
        background-color: $--gray-text-color;
        vertical-align: text-top;
        margin: 6px 8px 0 0;
      }
      &:hover,
      &.selected {
        color: white;
        background: $--color-primary;
        em {
          background: white;
        }
      }
    }
  }
}
</style>
