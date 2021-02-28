<template>
  <section class="main-section sec">
    <div class="newcate-body-iframe">
          <div class="newcate-body">
            <div class="common-newcate newcate-hot">
              <i class="iconfont icon-huo" style="display: block;position: absolute;left: 1px;top: -5px;font-size: 54px;color: #1e9fff;"></i>
              <span style="float: left;font-size: 16px;color: #1e9fff;border-right: 1px solid #dcdcdc;margin-left: 10px;">今日热门：</span>
              <a class="allhide" href="javascript:void(0)">隐藏二级目录</a>
              <ul class="common-clearboth">
                <li><a href="javascript:void(0)" style="color:#000">推荐目录</a></li>
                <li><a href="javascript:void(0)" style="color:#000">推荐目录</a></li>
              </ul>
            </div>
          </div>
          <div class="common-newcate common-newcate-item">
            <div class="newcate-item-header overwords">
              <i class="iconfont icon-liebiao icon" style="color: #009fff;"></i>
              <span style="margin-left: 8px; color:#0000FF">{{title1}}</span>
              <a class="hide" href="javascript:void(0)">
                <em style="display: inline;font-style: normal;font-weight: normal;">隐藏</em>
                <i style="font-style: normal; font-weight: normal; display: none;">显示</i></a>
            </div>

          </div>
          <div class="common-newcate common-newcate-item">
            <div class="newcate-item-header overwords">
              <i class="iconfont icon-liebiao icon" style="color: #009fff;"></i>
              <span style="margin-left: 8px; color:#0000FF">{{title1}}</span>
              <a class="hide" href="javascript:void(0)">
                <em style="display: inline;font-style: normal;font-weight: normal;">隐藏</em>
                <i style="font-style: normal; font-weight: normal; display: none;">显示</i></a>
            </div>

          </div>
          <div class="common-newcate common-newcate-item" v-for="dl in contentList" :key="dl.id">
            <div class="newcate-item-header overwords">
              <i class="iconfont icon-liebiao icon" style="color: #009fff;">{{dl.head.icon}}</i>
              <span style="margin-left: 8px; color:#000000">{{dl.head.title}}</span>
              <a class="hide" href="javascript:void(0)">
                <em style="display: inline;font-style: normal;font-weight: normal;">隐藏</em>
                <i style="font-style: normal; font-weight: normal; display: none;">显示</i></a>
            </div>

            <div class="newcate-item-body common-clearboth">
              <a :href="dd.url" style="color:#ccc" v-for="dd in dl.content" :key="dd.id">{{dd.text}}<img src="/Public/Front/style/images/hot.gif"
                  alt="火热" style="padding-left: 3px;padding-bottom: 4px;"> </a></div>
          </div>
    </div>
  </section>
</template>

<script>

export default {
  layout: 'themes2',
  data(){
    let title1 = "这里是构造的标题数据1";
    let title2 = "这里是构造的标题数据2";
    let contentList = [{
      head: {title: "这里是标题",icon: "&lt"},
      content: [{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},]
    },{
      head: {title: "这里是标题",icon: "&lt"},
      content: [{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},]
    },{
      head: {title: "这里是标题",icon: "&lt"},
      content: [{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},]
    },{
      head: {title: "这里是标题",icon: "&lt"},
      content: [{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},]
    },{
      head: {title: "这里是标题",icon: "&lt"},
      content: [{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},]
    },{
      head: {title: "这里是标题",icon: "&lt"},
      content: [{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},]
    },{
      head: {title: "这里是标题",icon: "&lt"},
      content: [{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},]
    },{
      head: {title: "这里是标题",icon: "&lt"},
      content: [{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},]
    },{
      head: {title: "这里是标题",icon: "&lt"},
      content: [{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},]
    },{
      head: {title: "这里是标题",icon: "&lt"},
      content: [{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},]
    },{
      head: {title: "这里是标题",icon: "&lt"},
      content: [{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},]
    },{
      head: {title: "这里是标题",icon: "&lt"},
      content: [{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},]
    },{
      head: {title: "这里是标题",icon: "&lt"},
      content: [{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},]
    },{
      head: {title: "这里是标题",icon: "&lt"},
      content: [{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},]
    },{
      head: {title: "这里是标题",icon: "&lt"},
      content: [{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},]
    },{
      head: {title: "这里是标题",icon: "&lt"},
      content: [{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},{text: "这里是构造的文档",url: "javascript:void(0)"},]
    }]
    return {
      title1: title1,
      title2: title2,
      contentList: contentList,
    }
  }
}
</script>

<style lang="scss" scoped>

.newcate-body-iframe{
position: relative;
z-index: 2;
width: 1190px;
margin: 0 auto;

}


.overwords{
white-space: nowrap;
text-overflow: ellipsis;
overflow: hidden;
}

.common-clearboth::after{
display:block;
clear:both;
content:"";
visibility:hidden;
height:0;
}

/*ba*/
.newcate-body{
position: relative;
width: 100%;
padding: 10px 0;
margin-bottom: -10px;
}
.common-newcate{
position:relative;
width: 1200px;
margin: 0 auto 15px;
background: white;
padding: 12px 10px;
box-sizing: border-box;
}
.newcate-hot{
padding-left: 45px;
min-height: 45px;
}

.newcate-hot ul li::after{
position: absolute;
content: '';
right: 0;
width: 1px;
height: 15px;
top: 5px;
background: #dcdcdc;
}
.newcate-hot ul li:nth-last-child(1)::after{
content: none;
}
.newcate-hot ul li a:hover{
color: inherit;
text-decoration: underline;
}
.common-newcate-item{
position: relative;
padding: 0 20px;
}
.newcate-item-header{
position: relative;
width: 100%;
font-weight: bold;
font-size: 12px;
letter-spacing: 1px;
padding:15px 15px 15px 30px;
box-sizing: border-box;
}


.newcate-item-body a:hover{
text-decoration: underline;
}

.newcate-hot ul li::after{
position: absolute;
content: '';
right: 0;
width: 1px;
height: 15px;
top: 5px;
background: #dcdcdc;
}
.newcate-hot ul li:nth-last-child(1)::after{
content: none;
}

.newcate-hot ul li a:hover{
color: inherit;
text-decoration: underline;
}
/*.newindex-cats ul li{position: relative;}*/
.newcate-hot{
padding-top: 12px;
height: 50px;
box-sizing: border-box;
border-radius: 3px;
border: 1px solid #ddd;
margin-bottom: 10px;
}
.newcate-hot ul li{
position: relative;
float: left;
}
.newcate-hot ul li::after{
position: absolute;
content: '';
right: 0;
width: 1px;
height: 15px;
top: 5px;
background: #dcdcdc;
}
.newcate-hot ul li:nth-last-child(1)::after{
content: none;
}
.newcate-hot ul li a{
font-size: 12px;
display: block;
line-height: 25px;
padding: 0 20px;
transition: 0.2s;
}
.newcate-hot ul li a:hover{
color: inherit;
text-decoration: underline;
}

.icon {
display: block;
position: absolute;
left: 0px;
top: 16px;
}
.hide {
float: right;
color: #a0a0a0;

}
.allhide {
float: right;
color: #a0a0a0;

}
.common-newcate{
    position:relative;
    width: 1200px;
    margin: 0 auto 10px;
    background: white;
    padding: 12px 10px;
    box-sizing: border-box;
    border-radius: 3px;
    border: 1px solid #ddd;
}
.newcate-hot{
    padding-left: 45px;
    min-height: 45px;
}
.newcate-hot ul li{
    position: relative;
    float: left;
}
.newcate-hot ul li::after{
    position: absolute;
    content: '';
    right: 0;
    width: 1px;
    height: 15px;
    top: 5px;
    background: #dcdcdc;
}
.newcate-hot ul li:nth-last-child(1)::after{
    content: none;
}
.newcate-hot ul li a{
    font-size: 12px;
    display: block;
    line-height: 25px;
    padding: 0 20px;
    transition: 0.2s;
}
.newcate-hot ul li a:hover{
    color: inherit;
    text-decoration: underline;
}
.common-newcate-item{
    position: relative;
    padding: 0 20px;
}
.newcate-item-body{
    position: relative;
    width: 100%;
    padding: 15px 0;
    border-top: 1px solid #dcdcdc;
}
.newcate-item-body a{
    font-size: 12px;
    line-height: 40px;
    padding-right: 15px;
    white-space: nowrap;
    text-overflow: ellipsis;
    img{
      width: auto !important;
      height: auto !important
    }
}
</style>
