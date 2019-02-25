<template>
  <div class="header">
    <div class="innerlogo">
      <a href="javascript:;" @click="goLogin()">
      北京药品采购平台<span class="sublogo">{{sublogo}}</span>
      </a>
    </div>
    <!--<el-menu
      class="navbox"
      mode="horizontal"
      :default-active="$route.path"
      @select="doRouter"
      background-color="#017cbf"
      text-color="#000"
      active-text-color="#000">
      <el-submenu v-for="busSys in busSysList" :key="busSys.id" :index="busSys.systemUnicode">
        <template slot="title" style="font-size: 16px">
          {{busSys.systemName }}
        </template>
        <el-menu-item-group v-for="router in permRouter" v-if="router.meta.sys === busSys.systemUnicode"
                            :key="router.name" :index="router.path">
          <h4 class="gap-20" v-if="hasChildrenRouter(router)">{{ router.meta.title }}</h4>
          <el-menu-item v-if="router.children.length&&!child.meta.hidden" v-for="child in router.children"
                        :key='child.path' :index="router.path+'/'+child.path">{{child.meta.title}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>-->

    <ul class="navbox">
      <li v-for="busSys in busSysData" :key="busSys.id" :index="busSys.systemUnicode"
          :class="activeNav(busSys.systemUnicode)">
        <span>{{busSys.systemName}}</span>
        <ul class="subnav">
          <li v-for="router in permRouter" v-if="router.meta.sys === busSys.systemUnicode" :key="router.name">
            <span>{{router.meta.title}}</span>
            <a href="javascript:;" v-if="router.children.length&&!child.meta.hidden"
               v-for="child in router.children" :key='child.path'
               @click="goRouter(busSys.systemUnicode, router.path, child.path)">{{child.meta.title}}</a>
          </li>
        </ul>
      </li>
    </ul>

    <ul class="navbar">
      <li><a href="#" class="iconfont icon-manage"></a></li>
      <li class="user-info">
        <i class="iconfont icon-user"></i>{{loginCode}}
        <ul class="dropbox">
          <li>
            <router-link to="/authority/userInfo">个人资料</router-link>
          </li>
          <li>
            <router-link to="/authority/resetPwd">修改密码</router-link>
          </li>
          <li>
            <router-link to="/authority/bindKey">绑定账号</router-link>
          </li>
          <li><a @click="logout">退出登录</a></li>
        </ul>
      </li>
      <li><a href="#" class="iconfont icon-home"></a></li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {busSysList} from "src/axios/management/authority/headMenu";
  import {ArrayContains, getSessions} from "src/utils";

  export default {
    name: 'TheHeader',
    computed: {
      ...mapGetters([
        'perm_routers',
        'loginCode',
      ]),
    },
    data() {
      return {
        sublogo: '', // 子系统名称
        navGeneral: [],
        activeIdx: 1,
        busSysData: [],
        permRouter: [],
        busSysList: []
      }
    },
    created() {
      if (sessionStorage.getItem('token')){
        getSessions();
      }else{
        return false;
      }
      busSysList().then(res => {
        this.busSysData = res.data
        this.permRouter = this.perm_routers;
        this.busSysData.forEach(busSys => {
          this.permRouter.forEach(route => {
            if (route.meta.sys === busSys.systemUnicode) {
              if (!ArrayContains(this.busSysList, busSys)) {
                this.busSysList.push(busSys)
              }
            }
          })
        });
      });
    },
    methods: {
      activeNav(idx){
        return {
          active: idx === this.activeIdx,
          related: idx === 'JIANDU'
        };
      },
      getActive(){
        //var arr = this.$router.history.current.path.split('/');
        var arr = this.$route.path.split('/');
        return arr[1];
      },
      goRouter (idx, routePath, childPath){
        this.activeIdx = idx;
        this.$router.push(routePath + '/' + childPath);
      },
      goLogin(){
        console.log('goHome');
        this.$router.push({path:'/'});
      },
      logout() {
        this.$store.dispatch('logoutUser').then(() => {
          this.$router.push({path:'/',replace:true});
        })
      },
      /*doRouter(index) {
        this.$router.push(index)
      },*/
      /*hasChildrenRouter(router) {
        let count = 0;
        if (router.children) {
          for (let child of router.children) {
            if (child.meta && !child.meta.hidden) {
              count += 1;
            }
          }
        }
        return count > 0;
      }*/
    },
  }
</script>

<style scoped>
  .header {
    position: relative;
    display: table;
    width: 100%;
    height: 48px;
    background: #017cbf;
    color: #fff;
  }
  .navbox > li > a, .navbar > li > a {
    color: #fff;
  }
  .innerlogo {
    float: left;
    display: inline-block;
    height: 48px;
    margin: 0 20px;
    line-height: 48px;
    text-align: center;
    font-size: 18px;
  }
  .sublogo {
    pading: 0;
    margin: 0 10px;
  }
  .navbox {
    /*float: left;*/
    display: table;
    margin: 0;
    padding: 0;
    font-size: 0;
  }
  .navbox > li {
    display: table-cell;
    /*position: relative;*/
    padding: 0 15px;
    vertical-align: middle;
  }
  .navbox > li > span {
    display: inline-block;
    height: 48px;
    padding: 12px 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 14px;
    border-bottom: solid 2px transparent;
  }
  .navbox > li.active > span {
    color: #017cbf;
    background: #fff;
  }
  .navbox > li:hover > span {
    color: #017cbf;
    background: #fff;
  }
  .subnav {
    display: none;
    align-items: center;
    position: absolute;
    top: 48px;
    left: 60px;
    right: 60px;
    width: calc(100vw - 120px);
    padding: 5px 0;
    background: #fff;
    border: solid 1px #eee;
    word-break: keep-all;
    box-shadow: 0 3px 1px rgba(0,0,0,.1);
    z-index: 999;
  }
  .navbox > li:hover .subnav {
    display: table;
  }
  .navbox > li.related {
    position: relative;
  }
  .navbox > li.related .subnav {
    left: 0;
    width: auto;
  }
  .subnav > li {
    display: inline-block;
    float: left;
    padding: 5px 10px;
    margin: 0;
  }
  .subnav > li > span, .subnav > li > a {
    display: block;
    padding: 5px;
    white-space: nowrap;
    line-hight: 24px;
    color: #333;
  }
  .subnav > li > span {
    font-size: 16px;
    font-weight: 600;
  }
  .subnav > li > a {
    font-size: 14px;
  }

  .navbar {
    position: absolute;
    top: 0;
    right: 0;
    display: table;
    height: 48px;
    padding: 0;
    margin: 0 10px 0 0;
    line-height: 18px;
  }
  .navbar > li {
    display: table-cell;
    position: relative;
    padding: 0 10px;
    vertical-align: middle;
  }
  .navbar > li i {
    margin: 0 5px;
  }
  .user-info .dropbox,
  .navbox > li .dropbox {
    top: 48px;
  }
  .user-info:hover .dropbox,
  .navbox > li:hover .dropbox {
    display: table;
  }
</style>
