const SLayOut = r => require.ensure([], () => r(require('src/pages/supervise/common/sLayout')),'supervise');

// 管理中心 路由表

export const superviseMap = [
  {
    path: '/supervise',
    name: 'supervise',
    meta: {title: '监管中心', sys: 'SUPERVISE',perm: ['supervision:center']},
    component: SLayOut,
    children: [
      /*{
        path: 'superviseGeneralize',
        name: 'superviseGeneralize',
        meta: {title: '监管概括',perm:['supervision:generalize']},
        component: r => require.ensure([], () => r(require('src/pages/supervise/generalize/superviseGeneralize')),'supervise')
      },*/
      {
        path: 'superviseTransact',
        name: 'superviseTransact',
        meta: {title: '交易监管',perm:['supervision:transact']},
        component: r => require.ensure([], () => r(require('src/pages/supervise/transaction/sTransaction')),'supervise'),
      },
      /*{
        path: 'superviseDictionaryData',
        name: 'superviseDictionaryData',
        meta: {title: '字典数据',perm:['supervise:dictionary:data']},
        component: r => require.ensure([], () => r(require('src/pages/supervise/dictionarydata/dictionarydata')),'supervise'),
      },
      {
        path: 'superviseSelect',
        name: 'superviseSelect',
        meta: {title: '遴选监管',perm:['supervise:superviseSelect:hospital']},
        component: r => require.ensure([], () => r(require('src/pages/supervise/select/index')),'supervise'),
      },
      {
        path: 'superviseContract',
        name: 'superviseContract',
        meta: {title: '合同监管', hidden: true},
        redirect: 'superviseContract/hospital',
        component: r => require.ensure([], () => r(require('src/pages/supervise/contract/index')),'supervise'),
      },
      {
        path: 'superviseDrugFlow',
        name: 'superviseDrugFlow',
        meta: {title: '药品流向',perm:['supervise:superviseDrugFlow']},
        component: r => require.ensure([], () => r(require('src/pages/supervise/drugflow/drugFlow')),'supervise')
      },
      {
        path: 'superviseDrugInfo',
        name: 'superviseDrugInfo',
        meta: {title: '药品信息', hidden: true,perm:['supervise:superviseDrugFlow']},
        component: r => require.ensure([], () => r(require('src/pages/supervise/drugflow/info/drugInfo')),'supervise')
      },*/
      {
        path: 'superviseNoticeBulletin',
        name: 'superviseNoticeBulletin',
        meta: {title: '通知公示',perm:['supervision:notice']},
        component: r => require.ensure([], () => r(require('src/pages/supervise/notice-bulletin/sNotice')),'supervise')
      },
      /*{
        path: 'superviseExportData',
        name: 'superviseExportData',
        meta: {title: '数据导出', hidden: true},
        redirect: 'superviseExportData/index',
        component: r => require.ensure([], () => r(require('src/pages/supervise/export-data/exportData')),'supervise'),
      }*/
    ]
  }
];
