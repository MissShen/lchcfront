/**
 * 无权限路由表
 *  该路由表中的路由对象均不需要任何权限即可访问
 *
 * @author:
 * @date: 2018/3/28 17:01
 */
export const baseRouterMap = [
  {
    path: '/',
    name: 'logIn',
    meta: {title: '登录', perm:['none']},
    redirect:"/logIn",
    component: r => require.ensure([], () => r(require('src/pages/management/login/layLogin')),'manage'),
    children: [
      {
        path: 'logIn',
        name: 'login',
        meta: {title: '登录', perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/management/login/logIn')),'manage')
      }
    ]
  },
  {
    path: '/IndexGeneral',
    name: 'IndexGeneral',
    meta: {title: '首页', perm:['none']},
    redirect:"/index",
    component: r => require.ensure([], () => r(require('src/components/LayOut')),'manage'),
    children: [
      {//登录后进入的首页
        path: '/index',
        name: 'index',
        meta: {title: '欢迎', hidden: true, perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/management/login/IndexGeneral')),'manage')
      }
    ]
  },
  {
    path: '/Error/:id',
    name: 'Error',
    meta: {title: '错误页面', perm:['none']},
    component: r => require.ensure([], () => r(require('src/components/Error')),'manage')
  }
];

