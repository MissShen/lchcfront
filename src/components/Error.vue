<template>
  <div class="errorbox">
    <p>
      <i class="iconfont icon-error-sign"></i>
      <span style="font-size: 44px; letter-spacing: 10px; text-indent: 10px">{{msg.type}}</span>
      <span>{{msg.txt}}</span>
      <a href="javascript:;" @click="goLastPage">上一页</a>
      <span style="display: inline-block; width:1px; height: 12px; margin: 0 5px; line-height: inherit; vertical-align: middle; background:#ddd;"></span>
      <router-link to="/index">首页</router-link>
    </p>
  </div>
</template>

<script>
  export default {
    name: "Error",
    data(){
      return {
        msg: this.getErrorMsg()
      }
    },
    methods: {
      getErrorMsg(){
        const arr = this.$route.path.split('/');
        const _error = arr[arr.length-1];
        switch(_error)
        {
          case '401':
            return {
              type: '401',
              txt: '没有权限'
            }
            break;
          case '500':
            return {
              type: '500',
              txt: '服务器异常'
            }
            break;
          default:
            return {
              type: '404',
              txt: '找不到页面'
            }
        }
      },
      goLastPage(){
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>
  .errorbox {
    display: table;
    width: 100%;
  }
  .errorbox > p {
    display: table-cell;
    height: 100vh;
    text-align: center;
    vertical-align: middle;
  }
  .errorbox > p > span {
    display: block;
    line-height: 38px;
  }
  .errorbox i {
    line-height: 140px;
    font-size: 100px;
    color: #a3c3ca;
  }
</style>
