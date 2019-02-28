import store from "../store";

export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16).toLocaleUpperCase();
  });
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate(data, id = 'id', pid = 'parentId') {
  var res = []
  var temp = {}
  for (var i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i]
  }
  for (var k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]]['children']) {
        temp[data[k][pid]]['children'] = []
      }
      if (!temp[data[k][pid]]['_level']) {
        temp[data[k][pid]]['_level'] = 1
      }
      data[k]['_level'] = temp[data[k][pid]]._level + 1
      temp[data[k][pid]]['children'].push(data[k])
    } else {
      res.push(data[k])
    }
  }
  return res
}

/**
 * 元素value是否在数组array内
 *
 * @param array 数组
 * @param value 目标元素
 * @author:
 * @date: 2018/3/28 13:44
 * @return:  Boolean
 */
export function ArrayContains(array, value) {
  let i = array.length;
  while (i--) {
    if (array[i] === value) {
      return true;
    }
  }
  return false;
}

// 定时刷token
export function getSessions() {
  let st = sessionStorage.getItem('expireTime') ? Number(sessionStorage.getItem('expireTime')) : 100000;
  let t = new Date().getTime() + st;
  if (!sessionStorage.getItem("tokenTime")) {
    sessionStorage.setItem('tokenTime', t);
  }
  setInterval(function () {
    const val = sessionStorage.getItem("tokenTime");
    const nowTime = new Date().getTime();
    if ((val - nowTime) < 20000) {
      store.dispatch('refreshRequestTime').then(res => {
        const _t = new Date().getTime() + st;
        sessionStorage.setItem('tokenTime', _t);
      })
    }
  }, 10000)
}


/**
 * 判断子路由是否是隐藏的
 * 一个不隐藏则为不隐藏 即 展示出来
 *
 * @param route
 * @author:
 */
export function childNotHidden(route) {
  return route.some(item => {
    if (item.children) {
      return childNotHidden(item)
    } else {
      return item.meta.hidden !== true;
    }
  })
}

/**
 * 判断路由是否显示
 *
 * @param router 路由对象
 * @author:
 */
export function navNotHidden(router) {
  // 设置隐藏则直接返回隐藏=true
  if (router.meta.hidden && router.meta.hidden === true) {
    return false;
  } else {
    // 未设置hidden属性时
    // 含有子路由,递归子路由:只要有一个显示即为false
    if (router.children) {
      return childNotHidden(router.children);
      // 不含有子路由时直接返回false
    } else {
      return true;
    }
  }
}

export function findRouterPathByTitle(routers, title) {
  let path = '/IndexGeneral';
  routers.forEach(item => {
    if (item.meta.title === title) {
      path = item.path;
      return false;
    } else {
      if (item.children) {
        let children = item.children;
        children.forEach(child => {
          if (child.meta.title === title) {
            path = item.path + '/' + child.path;
            return false;
          }
        })
      }
    }
  });
  return path;
}

/**
 * 格式化价格
 * @param price 价格
 */
export function priceFormat(price) {
  if(!price || price == 0){
    return '0.00';
  }else if(Number(price)){
    return parseFloat(price).toFixed(2);
  }
}

/**
 * 查询回车事件
 * @param e 默认事件 cb 回车响应事件
 */
export function keyBoardEnter(e, cb) {
  var keyCode = window.event? e.keyCode:e.which;
  if(keyCode == 13 || (e.target&&(e.target.nodeName == 'BUTTON' || e.target.nodeName == 'SPAN'))){
    cb();
  }
}

/**
* 格式化初始时间
* @param str 时间
*/
export function dateFormatter(str){//默认返回yyyy-MM-dd HH-mm-ss
  var hasTime = arguments[1] != false ? true : false;//可传第二个参数false，返回yyyy-MM-dd
  var d = new Date(str);
  var year = d.getFullYear();
  var month = (d.getMonth()+1)<10 ? '0'+(d.getMonth()+1) : (d.getMonth()+1);
  var day = d.getDate()<10 ? '0'+d.getDate() : d.getDate();
  var hour = d.getHours()<10 ? '0'+d.getHours() : d.getHours();
  var minute = d.getMinutes()<10 ? '0'+d.getMinutes() : d.getMinutes();
  var second = d.getSeconds()<10 ? '0'+d.getSeconds() : d.getSeconds();
  if(hasTime){
    return [year, month, day].join('-') + " " + [hour, minute, second].join(':');
  }else{
    return [year, month, day].join('-');
  }
}

export function removeFromArray(dataArray, el) {
  for (let i = 0; i < dataArray.length; i++) {
    if (dataArray[i] == el) {
      dataArray.splice(i, 1);
      i--;
    }
  }
}

/**
 * 自定义表头换行（仅限2行）
 * @param 默认参数
 */
export function labelHead(h,{column,index}){
  const arr = column.label.split('\\');
  return h('div', {}, [
    h('p', {}, arr[0]),
    h('p', {}, arr[1])
  ])
}
