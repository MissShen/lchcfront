import { asyncRouterMap} from "src/router";
import {baseRouterMap} from "src/router/baseRouterMap";
import {filterAsyncRouter} from "src/utils/perm";


/**
 * 授权资源状态管理
 *
 * @author:
 * @date: 2018/3/27 20:01
 */
const permResource = {
  state: {
    routers: baseRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = baseRouterMap.concat(routers);
    }
  },
  actions: {

    /**
     * 生成新的路由表
     *
     * @date: 2018/3/27 19:44
     */
    generateRoutes({commit}, data) {
      return new Promise(resolve => {
        const {resources} = data;
        commit('SET_ROUTERS', filterAsyncRouter(asyncRouterMap, resources));
        resolve()
      })
    }
  }
};

export default permResource
