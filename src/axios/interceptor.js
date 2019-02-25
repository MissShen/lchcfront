/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                                axios 拦截器
 * ---------------------------------------------------------------------------------------------------------------------
 */

import http from './http'
import qs from 'qs'
import router, {routerWhite} from 'src/router'
import store from 'src/store'
import {Message, MessageBox} from 'element-ui'
import resMessage from 'src/utils/resMessage'
import {tryShowLoading, tryCloseLoading, forceCloseLoading} from "src/utils/loading";

// 自定义判断元素类型JS
function toType(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// null参数过滤函数
function filterNull(o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}

// ---------------------------------------------------请求 拦截器 -------------------------------------------------------

http.interceptors.request.use(function (config) {
  // 在发送请求之前设置统一token
  if (sessionStorage.getItem('token')) {
    config.headers['Authorization'] = sessionStorage.getItem('token')
  }
  // 遮罩层加载效果处理
  if (config.loading != false) {
    tryShowLoading();
  }
  // 非application/json请求处理
  if ('json' !== config.type) {
    config.paramsSerializer = function (params) {
      params = filterNull(params);
      return qs.stringify(params);
    };
    config.transformRequest = [function (data) {
      return qs.stringify(filterNull(data));
    }];
  }

// console.log('请求 -->', config.url, '请求信息为 -->', config);
  return config
}, function (error) {
  forceCloseLoading();
  return Promise.reject(error)
});

// ---------------------------------------------------响应 拦截器 -------------------------------------------------------
http.interceptors.response.use(
  (res) => {
    if (res.config.loading != false) {
      tryCloseLoading();
    }
    // 返回信息处理
    if ('all' === res.config.use) {
      return res;
    }
    /**
     * -----------------------------------------------------------------------------------------------------------------
     *                                                请求成功-----响应码失败
     *                                                  1.token过期
     *                                                  2.token无效
     *                                                  3.无权限
     *                                                  4.401
     * -----------------------------------------------------------------------------------------------------------------
     */
    if (res.data.code === 'ERROR.COMMON.JWT_VERIFY_INVALID') {
      messageBox("登录过期,请重新登录");
      store.dispatch('logoutUser').then(() => {
        router.push({path: '/'})
      })
    }
    if (res.data.code === 'ERROR.COMMON.JWT_TOKEN_INVALID') {
      messageBox("请求无效");
      store.dispatch('logoutUser').then(() => {
        router.push({path: '/'})
      })
    }
    if (res.data.code === '401') {
      messageBox("无权限访问", "warning");
    }
    /**
     * --------------------------------------------------- 错误码处理完毕 ------------------------------------------------
     */
    // console.log('响应 -->', res.config.url, '响应信息为 -->', res);
    return res.data
  },
  (error) => {
    forceCloseLoading();
    let res = error.response;
    if (!res) {
      message("响应超时！请稍后访问", "warning");
      return Promise.reject(error)
    }
    /**
     * -----------------------------------------------------------------------------------------------------------------
     *                                                      响应直接失败
     *                                                       1.服务器500异常
     *                                                       2.服务器未运行
     * -----------------------------------------------------------------------------------------------------------------
     */
    if (res.status === 504) {
      message("连接超时！请稍后访问", "warning");
      return Promise.reject(error)
    }
    if (res.status === 401) {
      // console.log("无权限访问" + error.config.url, "warning");
      return Promise.reject(error)
    }
    if (res.status === 404) {
      // console.log("访问不存在" + error.config.url, "warning");
      return Promise.reject(error)
    }
    if (res.status === 500) {
      if (sessionStorage.getItem('token')) {
        if (notRouterWhite(error.config.url)) {
          if (error.response.data.message.toUpperCase().startsWith('Authentication failed for token submission'.toUpperCase())) {
            messageBox("登录超时,请重新登录");
            console.log("登录状态异常", "warning");
            store.dispatch('logoutUser').then(() => {
              router.push({path: '/'})
            })
          } else {
            resMessage(res.data, {
              onClose: () => {
                store.dispatch('logoutUser').then(() => {
                  router.push({path: '/Error/500'})
                })
              }
            })
          }
        }
      } else {
        message("服务器异常，请稍后访问", "warning");
        return Promise.reject(error)
      }

    }
    /**
     * --------------------------------------------------- 异常码处理完毕-------------------------------------------------
     */
    return Promise.reject(error)
  }
)
;

export function message(text, type) {
  Message({
    message: text,
    type: type,
    showClose: true,
    duration: 3 * 1000
  })
}

export function messageBox(msg) {
  MessageBox.alert(
    msg, '提示', {
      dangerouslyUseHTMLString: true
    });
}

function notRouterWhite(url) {
  return routerWhite.indexOf(url) === -1;
}
