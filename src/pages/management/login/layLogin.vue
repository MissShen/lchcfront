<template>
  <div class="wrapper">
    <div class="login-nav">
      <div class="logo-zt">
        <div class="logo"></div>
        <div class="logo-title">
          <h1>
            北京药品集中采购平台
            <!--<span style="font-size: 12px; font-weight: normal;">v1.5.11.1</span>-->
          </h1>
          <p>BEI JING YAO PIN CAI GOU PING TAI</p>
        </div>
      </div>
      <ul class="login-menu">
        <li><router-link to="/" :class="getActiveNav('logIn')">网页首页</router-link></li>
        <li @click="updateThis();"><router-link to="/affiche" :class="getActiveNav('affiche')">通知公告</router-link></li>
        <li><router-link to="/classRoom" :class="getActiveNav('classRoom')">阳光讲堂</router-link></li>
        <li><router-link to="/interact" :class="getActiveNav('interact')">互动答疑</router-link></li>
        <li><router-link to="/service" :class="getActiveNav('service')">购药服务指引</router-link></li>
        <li><router-link to="/downLoad" :class="getActiveNav('downLoad')">下载中心</router-link></li>
        <li><router-link to="/contactUs" :class="getActiveNav('contactUs')">联系我们</router-link></li>
      </ul>
    </div>
    <router-view/>
    <div class="login-footer">版权所有：北京市医药集中采购服务中心 <span>&copy; 2018 All rights reserved</span></div>
  </div>
</template>
<script>
import TheFooter from 'src/components/TheFooter'
import affiche from 'src/pages/management/login/affiche'
import classroom from 'src/pages/management/login/classroom'
import contactus from 'src/pages/management/login/contactus'
import interact from 'src/pages/management/login/interact'
import service from 'src/pages/management/login/service'
import download from 'src/pages/management/login/download'
import logIn from 'src/pages/management/login/logIn'

export default {
  name: "layLogin",
  components: {
    TheFooter,
    affiche,
    classroom,
    contactus,
    interact,
    service,
    logIn
  },
  methods: {
    getActiveNav(nav){
    let arr = this.$route.path.split('/');
    let tis = arr[1] || 'logIn';
    return {
      sav: nav === arr[1]
    }
  },
   updateThis(){
     sessionStorage.setItem('flag','1');
   }
}
}
</script>

