import http from 'src/axios/http'


/**
 * 用户拥有的快捷菜单列表
 *
 * @author: JiaHaiGang
 * @date: 2018/3/19 19:39
 */
export function hasMenuList() {
  return http({
      url: '/management/shortcut/hasList',
      method: 'get',
    }
  )
}

/**
 * 用户不拥有的快捷菜单列表
 *
 * @author: JiaHaiGang
 * @date: 2018/3/19 19:39
 */
export function notHasMenuList(resData) {
  return http({
      url: '/management/shortcut/notHasList',
      method: 'get',
      params: {
        'pageNum': resData.pageNum,
        'pageSize': resData.pageSize
      }
    }
  )
}


/**
 * 保存快捷菜单
 *
 * @param idStr 快捷菜单id用逗号拼接的字符串
 * @author: JiaHaiGang
 * @date: 2018/3/20 9:49
 * @return:
 */
export function shortcutSave(idStr) {
  return http({
      url: '/management/shortcut/save',
      method: 'post',
      data: {'idStr': idStr}
    }
  )
}


/**
 * 用户删除快捷菜单
 *
 * @param id 快捷菜单id
 * @author: JiaHaiGang
 * @date: 2018/3/20 11:25
 */
export function shortcutDelete(id) {
  return http({
      url: '/management/shortcut/delete',
      method: 'delete',
      params: {'id': id}
    }
  )
}
