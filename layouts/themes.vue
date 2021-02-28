<template>
  <div>
    <nuxt/>
    <qplayer v-if="systemStyle.backMusic" :url="systemStyle.backMusic"/>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import '@/plugins/element-ui'
  import qplayer from '@/components/themes/qplayer'

  export default {
    components: {
      qplayer
    },
    middleware: ['isLogin', 'site', 'themes'],
    computed: {
      ...mapState({
        site: (state) => state.site,
        systemStyle: (state) => state.systemStyle
      })
    },
    head() {
      return {
        title: this.site.systemName,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.site.remark
          },
          {
            hid: 'keywords',
            name: 'keywords',
            content: this.site.keyWord
          }
        ]
      }
    }
  }
</script>

<style lang="scss">
  @import 'element-ui/lib/theme-chalk/index.css';

  html {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    color: #333;
  }

  html,
  body,
  ul,
  p,
  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: 0;
    padding: 0;
  }

  main,
  section,
  aside,
  header,
  footer {
    display: block;
  }

  li {
    list-style: none;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: $--black-text-color;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
      color: $--color-primary;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .clear::after {
    content: '';
    display: block;
    visibility: hidden;
    clear: both;
  }

  em {
    font-style: normal;
  }

  .inp-wrapper {
    ul {
      li {
        & > span:first-child {
          width: 120px;
          display: inline-block;
          text-align: right;
        }

        .el-input {
          width: 300px;
          margin-left: 15px;
        }

        .el-textarea {
          width: 400px;
          margin-left: 15px;
          vertical-align: text-top;
        }
      }

      li + li {
        margin-top: 15px;
      }
    }

    .el-button {
      margin: 15px 0 15px 135px;
    }
  }

  .el-table {
    font-size: 12px;

    th,
    td {
      padding: 8px 0;
    }

    .cell {
      line-height: 1.5;
    }
  }

  html {
    height: 100%;
    background: $--light-color-primary;
  }

  body,
  #__nuxt,
  #__layout,
  #__layout > div:first-child {
    height: 100%;
  }

  .main-w {
    width: 1190px;
    margin: 0 auto;
  }

  h2 {
    color: white;
    font-size: 18px;
    line-height: 35px;
    background: left center no-repeat url('~@/assets/web_title.png');
    background-size: auto 100%;
    border-bottom: 1px solid $--light-color-primary;

    & > i {
      font-size: 13px;
      vertical-align: middle;
      margin: 0 8px 0 5px;
      color: $--basic-orange;
    }

    a {
      float: right;
      font-size: 12px;
      margin-right: 10px;
      color: $--color-primary;
    }
  }

  .main-section {
    position: relative;
  }

  .sec {
    min-height: calc(100% - 246px);
  }

  .top-bg {
    position: absolute;
    top: 0;
    width: 100%;
    min-width: 1190px;
    height: 350px;
    background: $--deep-color-primary;
    z-index: 1;
  }
</style>
