import LayOut from '@/components/LayOut'
import LayDetail from '@/components/LayDetail'

export const demoMap=[
  {
    path: '/BjDemo',
    name: 'BjDemo',
    meta:{title:'示例页面'},
    component: LayOut,
    children: [
      {// 基础列表
        path: 'DemoTableList',
        name: 'UserManage',
        component: () => import ('src/pages/demo/demo-tableList')
      },
      {// 产品黄页
        path: 'DemoTabsDataModals',
        name: 'DemoTabsDataModals',
        component: () => import ('src/pages/demo/demo-tabs-datamodals')
      },
      {// 带tabs的列表页（引用外部页面）
        path: 'DemoTabs',
        name: 'DemoTabs',
        component: () => import ('src/pages/demo/demoTabs'),
      },
      {// （填写）表单详情
          path: 'DemoFromList',
        name: 'DemoFromList',
        component: () => import ('src/pages/demo/demo-fromList')
      },
      {// 带tabs的列表页（引用外部页面）
        path: 'DemoTabs',
        name: 'DemoTabs',
        component: () => import ('src/pages/demo/demoTabs'),
      },
      {// 列表详情（二级列表、筛选、排序、复选）
        path: 'DemoTableDetail',
        name: 'DemoTableDetail',
        component: () => import ('src/pages/demo/demo-trade/demo-tableDetail')
      },
      {// 列表处理（增删改查）
        path: 'DemoTableHandle',
        name: 'DemoTableHandle',
        component: () => import ('src/pages/demo/demo-tableHandle')
      },
      {// 列表的查询表单 （input， checkbox，日期控件，表单展开收起，控制表单元素宽度等）
        path: 'DemoTableQueryShrink',
        name: 'DemoTableQueryShrink',
        component: () => import ('src/pages/demo/demo-tableQueryShrink')
      },
      {// 列表明细弹窗（弹窗引用其他页面、参数传递）
        path: 'DemoTableModals',
        name: 'DemoTableModals',
        component: () => import ('src/pages/demo/demo-tableModals')
      },
      {// “交易中心-审批采购单”实例
        path: 'DemoTradeAuditPurchase',
        name: 'DemoTradeAuditPurchase',
        component: () => import ('src/pages/demo/demo-trade/demo-tradeAuditPurchase')
      },
      {// “综合管理-分配菜单”实例：二级Tab，列表树
        path: 'DemoMenuTabs',
        name: 'DemoMenuTabs',
        component: () => import ('src/pages/demo/demo-dataCenter/demo-menuTabs')
      },
      {// “数据中心 - 分类维护”实例：树
        path: 'DemoDataClassify',
        name: 'DemoDataClassify',
        component: () => import ('src/pages/demo/demo-dataCenter/demo-dataClassify')
      },
      {// “交易系统 - 送货单详情”
        path: 'DemoTradeSalesReturn',
        name: 'DemoTradeSalesReturn',
        component: () => import ('src/pages/demo/demo-trade/demo-tradeSalesReturn')
      },
      /*{// “合同系统 - 添加区域”
        path: 'DemoCompactArea',
        name: 'DemoCompactArea',
        component: () => import ('src/pages/demo/demo-compact/demo-compactArea')
      },*/
      /*{// “合同系统 - 选择配送企业”
        path: 'DemoCompactDelivery',
        name: 'DemoCompactDelivery',
        component: () => import ('src/pages/demo/demo-compact/demo-compactDelivery')
      },*/
      /*{// “合同系统 - 合同列表”
        path: 'DemoCompactList',
        name: 'DemoCompactList',
        component: () => import ('src/pages/demo/demo-compact/demo-compactList')
      }*/
      {// “交易系统 - 投诉详情列表”
        path: 'DemoTradeComplain',
        name: 'DemoTradeComplain',
        component: () => import ('src/pages/demo/demo-trade/demo-tradeComplain')
      },
      {// “交易系统 - 投诉详情列表”
        path: 'DemoTradeComplainAdd',
        name: 'DemoTradeComplainAdd',
        component: () => import ('src/pages/demo/demo-trade/demo-tradeComplainAdd')
      }
    ]
  },
  {
    path: '/BjDemoLayDetail',
    name: 'BjDemo',
    meta:{title:'示例页面'},
    component: LayDetail,
    children: [
      {// （填写）表单详情【“数据中心-新增零售企业信息”实例，带标题】
        path: 'DemoFromList2',
        name: 'DemoFromList2',
        component: () => import ('src/pages/demo/demo-fromList2')
      },
      {
        path: 'DemoDataFromList',
        name: 'DemoDataFromList',
        component: () => import ('src/pages/demo/demo-dataCenter/demo-dataFromList')
      },
      {
        path: 'DemoDataFromDetails',
        name: 'DemoDataFromDetails',
        component: () => import ('src/pages/demo/demo-dataCenter/demo-dataFromDetails')
      }
    ]
  }
]
