<template>
  <div class="wrapper">
    <!-- 页头 -->
    <div class="header">
      <div class="innerlogo" @click="goLogin()">
        北京药品采购平台<span class="sublogo">{{sublogo}}</span>
      </div>

      <ul class="navbox" v-if="this.loginCode === '超级管理员'">
        <!--<ul class="navbox">-->
        <li v-for="busSys in busSysList" :key="busSys.id" :index="busSys.systemUnicode"
            :class="activeNav(busSys.systemUnicode)" v-if="hasSubnav(perm_routers,busSys.systemUnicode)">
          <span>{{busSys.systemName}}</span>
          <ul class="subnav">
            <li v-for="router in permRouter" v-if="(router.meta.sys === busSys.systemUnicode) && (permRouter.length>0)"
                :key="router.name">
              <span v-if="navNotHidden(router)">{{router.meta.title}}</span>
              <a href="javascript:;" v-if="router.children.length&&!child.meta.hidden"
                 v-for="child in router.children" :key='child.path'
                 @click="goRouter(busSys, router.path, child.path, router.meta.title,child.meta.title)">
                {{child.meta.title}}</a>
            </li>
          </ul>
        </li>
      </ul>

      <!--把二级菜单提上去（todo: 待整理完“资审”菜单后发布）-->
      <ul class="navs" v-else>
        <li v-for="busSys in busSysList" :key="busSys.id" :index="busSys.systemUnicode"
            v-if="hasSubnav(perm_routers,busSys.systemUnicode)">
          <ul v-for="router in permRouter" v-if="(router.meta.sys === busSys.systemUnicode) && (permRouter.length>0)"
              :key="router.name" class="nav-list">
            <span v-if="navNotHidden(router)">{{router.meta.title}}</span>
            <li>
              <a href="javascript:;" v-if="router.children.length&&!child.meta.hidden"
                 v-for="child in router.children" :key='child.path' :class="{'active': getCurrentMenu(child.meta.title)}"
                 @click="goRouter(busSys, router.path, child.path, router.meta.title,child.meta.title)">
                {{child.meta.title}}</a>
            </li>
          </ul>
        </li>
      </ul>

      <ul class="navbar">
        <!--todo 项目选择 暂时注释-->
        <!--<li><a href="javaScript:;" v-if="chooseNameVisible" @click="chooseProject()" class="iconfont icon-manage">{{projectName}}</a>-->
        <!--</li>-->
        <li class="user-info">
          <i class="iconfont icon-user"></i><span class="user-name">{{loginCode}}</span>
          <ul class="dropbox">
            <li>
              <router-link to="/userCenter/userInfo">个人资料</router-link>
            </li>
            <li>
              <router-link to="/userCenter/resetPwd">修改密码</router-link>
            </li>

            <li><a @click="logout">退出登录</a></li>
          </ul>
        </li>
        <li>
          <router-link to="/index"><i class="iconfont icon-home"></i></router-link>
        </li>
      </ul>
    </div>

    <!-- 主内容 -->
    <div class="main" style="margin: 55px 0 0;">

      <!--侧栏-->
      <side-bar v-if="sideBarVisible" ref="sideBar" @refreshProject="refreshProject"></side-bar>

      <div class="contents">

        <!--面包屑-->
        <ul class="breadcrumb">
          <li class="crumbs">
            <template v-if="this.loginCode === '超级管理员'">
              <label v-for="(busSys) in busSysData" :key="busSys.id"
                     v-if="$route.matched[0].meta.sys==busSys.systemUnicode">{{busSys.systemName}}</label>
            </template>
            <template v-else>
              <label>北京药品采购平台</label>
            </template>
            <span class="el-icon-arrow-right" v-for="(currentRoute,index) in $route.matched" :key="index">{{currentRoute.meta.title}}</span>
          </li>
          <span class="crumb-right">
            <a href="javascript:;" class="crumb-carts" @click="shoppingCar"
               v-if="this.roleCode == 'service'
                  || this.roleCode == 'serviceCenter'
                  || this.roleCode == 'doctor'
                  || this.roleCode == 'director'">
              购物车
            </a>
            <a href="javascript:;" class="el-icon-question" @click="handleHelp">帮助</a>
          </span>
        </ul>

        <router-view v-if="isRouterAlive"></router-view>
      </div>
    </div>

    <!-- 页脚 -->
    <the-footer></the-footer>
    <project-choose v-if="projectVisible" ref="project" @refreshProject="refreshProject"></project-choose>

    <!--帮助页-->
    <help-from v-if="HelpFrom" ref="HelpFrom"></help-from>

  </div>
</template>

<script>
  import {TheFooter, SideBar} from "src/components"
  import {mapGetters} from 'vuex'
  import {busSysList} from "src/axios/management/authority/headMenu";
  import {ArrayContains, getSessions, navNotHidden} from "src/utils";
  import {isNotNull} from "src/utils/validateUtil";
  import ProjectChoose from 'src/pages/management/project/project-choose'
  import HelpFrom from 'src/components/HelpFrom'

  export default {
    name: "LayOut",
    data() {
      return {
        sublogo: '', // 子系统名称
        projectVisible: false,
        chooseNameVisible: true,
        projectName: sessionStorage.getItem("projectName"),
        sideBarVisible: true,
        navGeneral: [],
        activeIdx: 1,
        busSysData: [],
        permRouter: [],
        busSysList: [],
        isRouterAlive: true,
        HelpFrom: false,
        purchaseId: '',
        roleCode: '',
        currentMenu: ''
      }
    },
    components: {
      TheFooter,
      SideBar,
      ProjectChoose,
      HelpFrom
    },
    computed: {
      ...mapGetters([
        'perm_routers',
        'loginCode'
      ]),
    },
    created() {
      if (sessionStorage.getItem('token')) {
        //登录后开始加载消息（如果有的话）
        getSessions();
        busSysList().then(res => {
          this.busSysData = res.data;
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
          let menuCode = [];
          for (let item of this.busSysList) {
            menuCode.push(item.systemUnicode)
          }
          if (menuCode.length > 0) {
            sessionStorage.setItem('menu-code', menuCode);
          }
        });
        findCarTotal("0").then(res => {
          if(res.data != undefined) {
            this.purchaseId = res.data.purchaseId,
              this.roleCode = res.data.roleCode
          }
        })
      }
    },
    methods: {
      navNotHidden,
      activeNav(idx) {
        return {
          active: idx === this.activeIdx,
          related: idx === 'SUPERVISE' || idx === 'MANAGEMENT'
        };
      },
      getCurrentMenu(cur){
        const _cur = this.$route.matched[this.$route.matched.length-1].meta.title;
        return cur === _cur;
      },
      hasSubnav(permRouter, systemUnicode) {
        return permRouter.some(item => {
          if (item.meta.sys === systemUnicode && navNotHidden(item)) {
            return true;
          } else {
            return false;
          }
        });
      },
      chooseProject() {
        this.projectVisible = true;
        this.$nextTick(() => {
          this.$refs.project.metaList();
        });
      },
      refreshProject() {
        this.projectName = sessionStorage.getItem("projectName");
      },
      goRouter(busSys, routePath, childPath, level1, level2) {
        this.$store.state.pageSeach = {};
        this.$store.state.activeName = '1';
        /* todo 项目选择 暂时注释*/
        /* if (!isNotNull(sessionStorage.getItem("projectId"))) {
           this.chooseProject();
         } else {*/
        this.sideBarVisible = false;
        sessionStorage.setItem('busSysID', busSys.id);
        this.activeIdx = busSys.systemUnicode;
        this.$nextTick(() => {
          this.sideBarVisible = true;
          // this.$refs.sideBar.metaList();
        });
        this.$router.push(routePath + '/' + childPath);
        // }
      },
      logout() {
        this.$store.dispatch('logoutUser').then(() => {
          sessionStorage.setItem("isAlerted",'false');
          window.location.href = '/';
        })
      },
      goLogin() {
        this.$router.push({path: '/'});
      },
      shoppingCar(){
        this.$nextTick(() => {
          /**查找角色和购物车主单ID*/
          findCarTotal("0").then(res => {
            if(res.data != undefined) {
              this.purchaseId = res.data.purchaseId,
                this.roleCode = res.data.roleCode
              this.$router.push("/trade/manage/buyerrole/medicineShoppingList/" + this.purchaseId)
            }
          })
        })
      },
      handleHelp() {
        this.HelpFrom = true;
        this.$nextTick(() => {
          this.$refs.HelpFrom.handleForm();
        })
      }
    },
  }
</script>
