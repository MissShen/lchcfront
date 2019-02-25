<template>
  <ul class="s-header">
    <li class="timezone">
      <i class="iconfont icon-time"></i>
      {{timeZone}}
    </li>
    <li class="s-logo">
      <span>北京药品采购平台</span>
    </li>
    <li class="s-status">
      <!--<router-link to="/" class="s-status-cell">
        <i class="iconfont icon-manage"></i>
        {{projectName}}
      </router-link>-->
      <div class="s-status-cell">
        <i class="iconfont icon-user"></i>
        <span>{{loginCode}}</span>
        <div class="s-dropdown">
          <router-link to="/userCenter/userInfo">个人资料</router-link>
          <router-link to="/userCenter/resetPwd">修改密码</router-link>
          <router-link to="/userCenter/bindKey">绑定账号</router-link>
          <a @click="logout">退出登录</a>
        </div>
      </div>
      <router-link to="/index" class="s-status-cell">
        <router-link to="/index"><i class="iconfont icon-home"></i></router-link>
      </router-link>
    </li>
  </ul>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "superviseHeader",
    computed: {
      ...mapGetters([
        'loginCode',
      ]),
    },
    data() {
      return {
        timeZone: '',
      }
    },

    created() {
      let tis = this;
      setInterval(function () {
        let date = new Date();
        let YY = date.getFullYear();
        let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        let DD = date.getDate() + 1 < 10 ? '0' + date.getDate() : date.getDate();
        let hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        let mm = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        let ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        tis.timeZone = YY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss;
      }, 1000);
    },
    methods: {
      logout() {
        this.$store.dispatch('logoutUser').then(() => {
          window.location.href = '/';
        })
      },
    }
  }
</script>


