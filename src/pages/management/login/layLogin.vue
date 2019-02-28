<template>
  <div class="wrapper">
    <div class="login-nav">
      <div class="logo-zt">
        <div class="logo"></div>
        <div class="logo-title">
          <h1>

            <!--<span style="font-size: 12px; font-weight: normal;">v1.5.11.1</span>-->
          </h1>
          <p></p>
        </div>
      </div>
      <ul class="login-menu">
        <li><router-link to="/" :class="getActiveNav('logIn')">网页首页</router-link></li>

      </ul>
    </div>
    <router-view/>
    <div class="login-footer">版权所有： <span>&copy; 2018 All rights reserved</span></div>
  </div>
</template>
<script>

  import TheFooter from 'src/components/TheFooter'
 import logIn from 'src/pages/management/login/logIn'

export default {
  name: "layLogin",
  components: {
    TheFooter,
    logIn
  },
  methods: {
    getActiveNav(nav) {
      let arr = this.$route.path.split('/');
      let tis = arr[1] || 'logIn';
      return {
        sav: nav === arr[1]
      }

    }
  }
}
</script>

