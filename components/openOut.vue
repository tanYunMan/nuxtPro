<template>
  <div class="top-bar-guidance">
    <p style="color:#fff">
      点击右上角<img src="~@/assets/dot.png" class="icon-dot" />
      <!-- <img src="~@/assets/safari.png" class="icon-safari" /> -->
      <span style="color:#fff" id="openm">在&nbsp&nbsp浏览器&nbsp&nbsp打开</span>
    </p>
    <p style="color:#fff">苹果设备<img src="~@/assets/safari.png" class="icon-safari" />
    安卓设备<img src="~@/assets/browser.png" class="icon-browser" />
    ↗↗↗</p>
    <a style="display: none;" href="" id="vurl" rel="noreferrer"></a>

    <!-- 步骤提示 -->
    <div class="tipStyle">
      <ul>
        <li v-for="(item,index) in tipArray" :key='index' style='color: rgb(44,101,240);'>
          {{item}}
        </li>
      </ul>
    </div>
    <!-- 底部操作 -->
    <div class="footStyle">
      <p style="color:rgb(44,101,240);fontSize:16px">————— https://xxxxxxxxx.com —————</p>
      <p style="color:rgb(44,101,240);marginTop:-20px;fontSize:16px">— 点击右上角<span>•••</span> or 复制网址自行打开 —</p>
      <button type="button" @click="webCopyMess">点此复制本站网址</button>
    </div>
  </div>
</template>

<script>
import copy from 'copy-to-clipboard'
import { Dialog } from 'vant';
export default {
  data() {
    return {
      tipArray:[
        `1.本站不支持 微信或QQ 内访问`,
        `2.请按提示在手机 浏览器 打开`
      ]
    }
  },
  mounted() {
    function openu(u) {
      document.getElementById('vurl').href = u
      document.getElementById('vurl').click()
    }
    const url = window.location.href
    if (~navigator.userAgent.indexOf('QQ/')) {
      openu('ucbrowser://' + url)
      openu('qqbrowser://' + url)
      openu('mttbrowser://url=' + url)
      openu('baiduboxapp://browse?url=' + url)
      openu('googlechrome://browse?url=' + url)
      openu('mibrowser:' + url)
      document.querySelector('html').addEventListener('click', function() {
        openu('ucbrowser://' + url)
        openu('mttbrowser://url=' + url)
        openu('baiduboxapp://browse?url=' + url)
        openu('googlechrome://browse?url=' + url)
        openu('mibrowser:' + url)
      })
    } else if (~navigator.userAgent.indexOf('MicroMessenger')) {
      if (~navigator.userAgent.indexOf('Android')) {
        const iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        document.body.appendChild(iframe)
      } else {
      }
    }
  },
  methods: {
    doCopy() {
      // const arr = []
      // const cardList = this.order.orderCardVOList || []
      // cardList.forEach((item) => {
      //   arr.push(`${item.cardNumber}/${item.cardPws}`)
      // })
      copy('sfsfddfsf')
      this.$message.success('复制成功')
    },
    webCopyMess(){
    var url = window.location.href;
    var successful;
    if (navigator.userAgent.match(/(iPhone|iPod|iPad|iOS)/i)) { //ios
        var copyDOM = document.createElement('div');  //要复制文字的节点
        copyDOM.innerHTML = url;
        document.body.appendChild(copyDOM);
        var range = document.createRange();    
        // 选中需要复制的节点  
        range.selectNode(copyDOM);  
        // 执行选中元素  
        window.getSelection().addRange(range);  
        // 执行 copy 操作  
        successful = document.execCommand('copy');    
        // 移除选中的元素  
        window.getSelection().removeAllRanges();
        $(copyDOM).hide()
    }else{
        var oInput = document.createElement('input')
        oInput.value = url;
        document.body.appendChild(oInput)
        oInput.select() // 选择对象
        successful = document.execCommand('Copy') // 执行浏览器复制命令
        oInput.className = 'oInput'
        oInput.style.display = 'none'
        oInput.remove()
    }
    if(successful){
        // layer.msg("复制成功")
        // this.$message.success("复制成功",{time:2000},function(){
        //     $(".share_mask").fadeOut();
        //     $(".share_box").fadeOut();
        // });
        // alert("复制成功")
        Dialog.alert({
          message: '复制成功',
        }).then(() => {
          // on close
        });
    }else{
        // this.$message.success("复制失败",{time:2000},function(){
        //     $(".share_mask").fadeOut();
        //     $(".share_box").fadeOut();
        // });
        // alert("复制失败")
        Dialog.alert({
          message: '复制失败',
        }).then(() => {
          // on close
        });
    }
}
  },
}
</script>

<style lang="scss">
html {
  font-family: 'PingFang SC', 'microsoft yahei', arial, 'helvetica neue',
    'hiragino sans gb', sans-serif;
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
.top-bar-guidance {
  font-size: 15px;
  color: #fff;
  height: 200px;
  line-height: 1.8;
  padding-left: 20px;
  padding-top: 20px;
  background: url(~@/assets/open.png) center top no-repeat;
  background-size: 100% auto;
  .icon-safari {
    width: 25px;
    height: 25px;
    vertical-align: middle;
    margin: 0 0.2em;
  }
  .icon-dot{
    width: 25px;
    height: 25px;
    vertical-align: middle;
    margin: 0 0.2em;
  }
  .icon-browser{
    width: 25px;
    height: 25px;
    vertical-align: middle;
    margin: 0 0.2em;
  }
  * {
    margin: 0;
    padding: 0;
  }
  .tipStyle{
    // border: 1px solid red;
    margin-left: -20px;
    text-align: center;
    margin: 65% auto;
    font-size: 20px;
    font-weight: bolder;
    li{
      color: rgb(44,101,240);
      margin:10px 0;
    }
  }
  .footStyle{
    margin-left: -20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 130px;
    span{
      margin: 0 5px;
    }
    button{
    width: 200px;
    height: 40px;
    border-radius: 18px;
    background-color: white;
    border: 1px solid rgb(44,101,204);
    font-size: 20px;
    color: rgb(44,101,204);
    }
  }
}
</style>
