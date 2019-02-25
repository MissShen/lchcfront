import LayOut from 'src/components/LayOut'


// 消息公告 路由表

export const newsBulletinMap = [
  {
    path: '/massage',
    name: 'massage',
    meta:{title:'消息公告',sys:'NEWS'},
    component: LayOut,
    children: [
      {
        path: 'sysMessage',
        name: 'sysMessage',
        meta:{title:'消息'},
        component: () => import ('src/pages/management/announcement/sysMessage')
      },{
        path: 'sysNoticeMessage',
        name: 'sysNoticeMessage',
        meta:{title:'公告'},
        component: () => import ('src/pages/management/announcement/sysBulletin')
      }
      ]

  }
]
