<template>
  <div id="app">
    <router-view/>
    <!--新消息提示-->
    <news-msg :newMsg="newMsg"></news-msg>
  </div>
</template>

<script>

   import {mapGetters} from 'vuex'

  export default {
    name: 'App',
    components: {
      NewsMsg
    },
    data() {
      return {
        newMsg: [],
        queueReceiveSetting: {//消息队列配置
          websock: null,
          wsuri: "/rabbitmq/ws/yxd/",
          ipConfig: ""
        },
      }
    },
    computed: {
      ...mapGetters([
        'loginId',
        'orgId',
        'roleIds'
      ]),
    },
    methods: {
      initWebSocket() {
        this.closeWebSocket();
        //ws地址
        let wsurl = this.ipConfig + this.queueReceiveSetting.wsuri + this.orgId + "/" + this.roleIds
        this.queueReceiveSetting.websock = new WebSocket(wsurl);
        this.queueReceiveSetting.websock.onopen = function (res) {
          console.log("开启连接")
        };
        const tis = this;
        this.queueReceiveSetting.websock.onmessage = function (res) {
          let data = JSON.parse(res.data);
          tis.newMsg = data;
        };
        this.queueReceiveSetting.websock.onclose = function (res) {
          console.log("连接关闭")
        };
        this.queueReceiveSetting.websock.onerror = function (res) {
          console.log("连接出错")
          tis.initWebSocket();
        };
      },
      closeWebSocket() {
        if (this.queueReceiveSetting.websock) {
          this.queueReceiveSetting.websock.close()
        }
      }
    },
    watch: {
      loginId: function (val) {
        if (!val) {
          this.closeWebSocket()
        } else {
          if (sessionStorage.getItem('token')) {
            //登录后开始加载消息（如果有的话）
            getIpAndPort().then(res => {
              this.ipConfig = "ws://" + res.data;
              this.initWebSocket();
            })
          }
        }
      },
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "./assets/icons/iconfont.css";
  @import "./assets/css/elstyle.css";
  @import "./assets/css/base";
  @import "./assets/css/main.css";
  @import "./assets/css/login.css";
  @import "./assets/css/auditchanges.css";
  @import "./assets/css/compact.css";
  @import "./assets/css/datacenter.css";
  @import "./assets/css/trade.css";
</style>
