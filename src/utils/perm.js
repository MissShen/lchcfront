import store from 'src/store';
import {isNotNull} from "src/utils/validateUtil";

/**
 * 判断路由对象是否为可访问对象
 *
 * @param perms 后端提供的权限信息
 * @param route 路由对象
 * @author:
 * @date: 2018/3/27 20:08
 * @return: Boolean
 */
function hasPermission(perms, route) {
  if (route.meta && route.meta.perm) {
    if ('login' === route.meta.perm[0]) {
      return isNotNull(store.state.user.loginCode);
    } else if ('none' === route.meta.perm[0]) {
      return true;
    } else {
      return perms.some(perm => {
        let hasPerm = route.meta.perm.indexOf(perm.permissionName) !== -1;
        if (hasPerm) {
          let permObj = [];
          route.meta.perm.forEach(item => {
            perms.forEach(permItem => {
              if (permItem.permissionName == item) {
                permObj.push(permItem);
              }
            })
          });
          if (!route.meta.query) {
            route.meta.query = []
          }
          // 全部都是快捷菜单则隐藏该路由
          let isShortcutMenu = 0;
          permObj.forEach(item => {
            let name = item.shortcutMenuName;
            let fullName = item.resourceName;
            let val = item.anchorPosition;
            if (item.isShortcutMenu == '1') {
              isShortcutMenu +=1;
            }
            let data = {name: name, val: val};
            if (fullName) {
              route.meta.query.push(data);
            }
          });
          if (isShortcutMenu==route.meta.query.length) {
            route.meta.hidden=true
          }
        }
        return hasPerm;
      })
    }
  } else {
    return false;
  }
}


/**
 * 递归过滤权限路由
 *
 * @author:
 * @date: 2018/3/27 20:02
 * @return: Boolean
 */
export function filterAsyncRouter(asyncRouterMap, perms) {
  return asyncRouterMap.filter(route => {
    if (hasPermission(perms, route)) {
      if (route.children && route.children.length > 0) {
        route.children = filterAsyncRouter(route.children, perms)
      }
      return true
    }
    return false
  });
}
