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
  },
  {
    path: '/subsidiary',
    name: 'subsidiary',
    meta: {title: '辅助功能', sys: 'MANAGEMENT', perm: ['sys:subsidiary:index']},
    component: LayOut,
    children: [
      {
        path: 'sysNotice',
        name: 'sysNotice',
        meta: {title: '公告管理', perm: ['sys:menu:notice','sys:notice:menu:shortcut','sys:notice:menu:shortcut2']},
        component: r => require.ensure([], () => r(require('src/pages/management/subsidiary/notice/sysNotice')),'manage')
      },
      {
        path: 'sysNoticeList',
        name: 'sysNoticeList',
        meta: {title: '公告列表', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/management/subsidiary/notice/sysNoticeList')),'manage')
      },
      {
        path: 'log',
        name: 'log',
        meta: {title: '日志列表', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/management/authority/log/operationLog')),'manage')
      },
      {
        path: 'sysMessage',
        name: 'sysMessage',
        meta: {title: '消息管理', perm: ['sys:menu:message']},
        component: r => require.ensure([], () => r(require('src/pages/management/subsidiary/message/sysMessage')),'manage')
      },
      {
        path: 'messageTypeForm/:tid',
        name: 'messageTypeForm',
        meta: {
          title: '消息类别详情',
          hidden: true,
          perm: ['sys:message_type:list', 'sys:message_type:save', 'sys:message_type:update']
        },
        component: r => require.ensure([], () => r(require('src/pages/management/subsidiary/message/formView')),'manage')
      },
      {
        path: 'sysLetures',
        name: 'sysLetures',
        meta: {title: '阳光讲堂', perm: ['sys:menu:letures']},
        component: r => require.ensure([], () => r(require('src/pages/management/subsidiary/letures/sysLetures')),'manage')
      },
      {
        path: 'noticeForm/:nid',
        name: 'noticeForm',
        meta: {title: '公告详情', hidden: true, perm: ['sys:notice:view', 'sys:notice:save', 'sys:notice:update']},
        component: r => require.ensure([], () => r(require('src/pages/management/subsidiary/notice/formView')),'manage')
      },
      {
        path: 'noticeView/:nid',
        name: 'noticeView',
        meta: {title: '公告查看', hidden: true, perm: ['sys:notice:view']},
        component: r => require.ensure([], () => r(require('src/pages/management/subsidiary/notice/noticeView')),'manage')
      }
    ]
  },
  {
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
      },
      {
        path: 'bindKey',
        name: 'bindKey',
        meta: {title: '绑定账号', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/management/user-manage/bindKey')),'manage')
      }
    ]
  }
];
