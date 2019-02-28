const LayOut = r => require.ensure([], () => r(require('@/components/LayOut')),'base')

// 管理中心 路由表
export const managementMap = [
  {
    path: '/authority',
    name: 'authority',
    meta: {title: '权限管理', sys: 'MANAGEMENT', perm: ['sys:module:index']},
    component: LayOut,
    children: [
      {
        path: 'sysUser',
        name: 'sysUser',
        meta: {title: '用户管理', perm: ['sys:menu:user']},
        component: r => require.ensure([], () => r(require('src/pages/management/authority/user/sysUser')),'manage')
      },
      {
        path: 'oneMenu',
        name: 'oneMenu',
        meta: {title: '模块管理', perm: ['sys:menu:resource']},
        component: r => require.ensure([], () => r(require('src/pages/management/authority/resource/oneMenu/oneMenu')),'manage'),
      },
      {
        path: 'sysRole',
        name: 'sysRole',
        meta: {title: '角色管理', perm: ['sys:menu:role']},
        component: r => require.ensure([], () => r(require('src/pages/management/authority/role/sysRole')),'manage')
      },
      {
        path: 'twoMenu/:mid',
        name: 'twoMenu',
        meta: {title: '二级菜单', hidden: true, perm: ['sys:resource_two:list']},
        component: r => require.ensure([], () => r(require('src/pages/management/authority/resource/twoMenu/twoMenu')),'manage')
      },
      {
        path: 'roleMenu/:rid',
        name: 'roleMenu',
        meta: {title: '分配菜单', hidden: true, perm: ['sys:role:resource:save']},
        component: r => require.ensure([], () => r(require('src/pages/management/authority/role/roleMenu')),'manage')
      },
      {
        path: 'userAdd',
        name: 'userAdd',
        meta: {title: '用户详情', hidden: true, perm: ['sys:user:save']},
        component: r => require.ensure([], () => r(require('src/pages/management/authority/user/userAdd')),'manage')
      },
      {
        path: 'userUpdate/:uid',
        name: 'userUpdate',
        meta: {title: '用户详情', hidden: true, perm: ['sys:user:view', 'sys:user:update']},
        component: r => require.ensure([], () => r(require('src/pages/management/authority/user/userUpdate')),'manage')
      },
      {
        path: 'shortcut',
        name: 'shortcut',
        meta: {title: '快捷菜单', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/management/authority/shortcut/shortcutMenu')),'manage')
      },
    ]
  }, {
    path: '/userCenter',
    name: 'userCenter',
    meta: {title: '账户管理', sys: 'MANAGEMENT', perm: ['login']},
    component: LayOut,
    children: [
      {
        path: 'resetPwd',
        name: 'resetPwd',
        meta: {title: '修改密码', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/management/user-manage/resetPwd')),'manage')
      }
      ,
      {
        path: 'userInfo',
        name: 'userInfo',
        meta: {title: '个人资料', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/management/user-manage/userInfo')),'manage')
      }
    ]
  }
];
