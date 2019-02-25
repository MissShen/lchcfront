import Vue from 'vue'
import Router from 'vue-router'
import store from 'src/store'
// import Message from 'element-ui'
import {baseRouterMap} from "src/router/baseRouterMap";
// import {demoMap} from 'src/router/demoRouter'  //demo路由
import {managementMap} from 'src/router/managementRouter'  //综合管理路由
import {tradeRouterMap} from "src/router/tradeRouter";//交易系统路由
import {contractRouterMap} from "src/router/contractRouter";//合同系统路由
// import {newsBulletinMap} from "src/router/newsbulletin";//消息公告路由
import {auditchangesMap} from "src/router/auditchangesRouter"
import {dataCenterRouterMap} from "src/router/dataCenterRouter"
import {superviseMap} from "src/router/superviseRouter"; // 监管系统路由
import {isNotNull} from "../utils/validateUtil";

Vue.use(Router)
/*let _asyncRouterMap = [];
if(store.getters.roleIds.indexOf('CMGR00000000000000500638')===-1){
  console.log(1);
  _asyncRouterMap = managementMap.concat(dataCenterRouterMap,auditchangesMap,contractRouterMap,tradeRouterMap,superviseMap);
}else{
  console.log(2);
  _asyncRouterMap = managementMap.concat(dataCenterRouterMap);
}
export const asyncRouterMap = _asyncRouterMap;*/
// export const asyncRouterMap=managementMap.concat(dataCenterRouterMap,auditchangesMap,contractRouterMap,tradeRouterMap,superviseMap);
export const asyncRouterMap=managementMap.concat(dataCenterRouterMap,auditchangesMap,contractRouterMap,tradeRouterMap,superviseMap);

const router = new Router({
  routes: baseRouterMap
  // mode: 'history'
});

export default router;

export const routerWhite = ['/', '/logIn','/keyTransit', '/keyRegister','/IndexGeneral', '/affiche', '/classRoom', '/interact', '/service',
  '/downLoad', '/contactUs', '/Error/401', '/Error/404', '/Error/500','/printTable']; // 白名单

router.beforeEach((to, from, next) => {
  if (sessionStorage.getItem('token')) {
    if (!isNotNull(store.getters.loginCode)) { // 判断当前用户是否已拉取完权限信息
      store.dispatch('getUserPerms').then(res => {
        const resources = res.data.resourceList;
        store.dispatch('generateRoutes', {resources}).then(() => { // 根据权限生成可访问的路由表
          router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
          router.addRoutes([{ path: '*', redirect: 'Error/404', hidden: true }]); // 动态添加可访问路由表
          next({...to, replace: true})
        })
      }).catch(() => {
        // 任何登录异常则重新登录
        store.dispatch('logoutUser').then(() => {
          next({path: '/'})
        })
      })
    } else {
      next();
    }
  } else {
    if (routerWhite.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next({path: '/'}) // 否则全部重定向到登录页
    }

  }
});
