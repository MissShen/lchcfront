const LayOut = r => require.ensure([], () => r(require('@/components/LayOut')),'base')
export const tradeRouterMap=[
  {
    path: '/TRADE/manage',
    name: 'manage',
    meta:{title:'交易管理',sys:'TRADE', perm: ['trade_manage']},
    component: LayOut,
    children: [
      {
        path: 'buyerrole/purchaseTabs',
        name: 'purchaseTabs',
        meta:{title:'制定采购单' ,perm: ['trade_manage_service_purchaseTabs']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/buyerrole/purchase/purchaseTabs')),'trade')
      },
      {
        path: 'approvalTabs',
        name: 'approvalTabs',
        meta:{title:'审批管理',perm: ['trade_manage_approvalTabs']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/firstInstanceRole/purchase/examinationApprovalTabs')),'trade')
      },
      {
        path: 'orderReceiveTabs/:id',
        name: 'orderReceiveTabs',
        meta:{title:'订单管理',perm: ['trade_buyer_queryUnSendOrderItemList','trade_buyer_queryUnSendOrderItemList_dispose','trade_manager_buyerDellReturnTabs']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/buyerrole/arrive/buyerTabView/orderReceiveTabs')),'trade')
      },
      {
        path: 'queryHospitalList',
        name: 'queryHospitalList',
        meta:{title:'备案采购' ,perm: ['trade_manage_queryHospitalList']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/backup/hospitalList')),'trade')
      },
      {
        path: 'BuyerEvaluateList',
        name: 'BuyerEvaluateList',
        meta:{title:'评价管理',perm: ['trade_buyer_orderEvaluateList']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/evaluate/fill/list')),'trade')
      },
      {
        path: 'customerComplaintsList',
        name: 'customerComplaintsList',
        meta:{title:'用户投诉',perm: ['trade_evaluation_userComplaintList']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/evaluate/complaint/customerComplaintsList')),'trade')
      },
      {
        path: 'complaintManageTabs',
        name: 'complaintManageTabs',
        meta:{title:'投诉管理',perm: ['trade_evaluation_complaintManageTabs']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/evaluate/complaint/complaintManageTabs')),'trade')
      },
      {
        path: 'purchaseList',
        name: 'purchaseList',
        meta:{title:'采购单查询',perm: ['trade_manage_purchaseList']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/buyerrole/purchase/purchaseList')),'trade')
      },
      {
        path: 'purchaseCommList',
        name: 'purchaseCommList',
        meta:{title:'采购单明细查询' ,perm: ['trade_purchase_comm_list']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/buyerrole/purchase/commList')),'trade')
      },
      {
        path: 'arriveUpdate',
        name: 'arriveUpdate',
        meta:{title:'到货修改',perm:['trade_manage_queryOrdOrderItem','trade_manage_queryOrdOrderItem_shortcut']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/buyerrole/arrive/update')),'trade')
      },
      {
        path: 'arriveOutput',
        name: 'arriveOutput',
        meta:{title:'到货单导出',perm:['trade_manage_arriveOutput']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/buyerrole/arrive/senderList')),'trade')
      },
      {
        path: 'selectReceiveList',
        name: 'selectReceiveList',
        meta:{title:'到货查询',perm: ['trade_manage_selectReceiveList']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/checkRole/arrive/selectReceiveList')),'trade')
      },
      //===========================
      // 紧急处理
      //===========================
      {
        path: 'selectReminderList',
        name: 'selectReminderList',
        meta:{title:'订单催促',perm: ['trade_manage_selectReminderList']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/reminder/list')),'trade')
      },
      {
        path: 'salerList',
        name: 'salerList',
        meta:{title:'订单处理',perm: ['trade_send_getsalerItemListReceiv','trade_send_getsalerItemListReceiv_shortcut','trade_send_getsalerItemListReceiv_shortcut_order']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/senderRole/order/salerTableView/handleHome')),'trade')
      },
      {
        path: 'stockStockOutList',
        name: 'stockStockOutList',
        meta:{title:'库存维护',perm: ['trade_manage_kucunHandleList']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/stock/senderList')),'trade')
      },{
        path: 'stockSenderListPopup/:productId',
        name: 'stockSenderListPopup',
        meta:{title:'库存维护',hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/stock/senderListPopup')),'trade')
      },
      {
        path: 'handleCancelList',
        name: 'handleCancelList',
        meta:{title:'订单作废处理',perm: ['trade_manage_handleCancelList']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/buyerrole/purchase/handleCancelList')),'trade')
      },




      {
        path: 'buyerrole/priceWarningList',
        name: 'priceWarningList',
        meta:{title:'价格预警' ,hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/buyerrole/purchase/priceWarningList')),'trade')
      },
      {
        path: 'buyerrole/priceWarningShow/:productId/:minTradePrice',
        name: 'priceWarningShow',
        meta:{title:'展示详情',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/buyerrole/purchase/priceWarningShow')),'trade')
      },
      /*服务站本院购物车*/
      {
        path: 'buyerrole/medicineShoppingList/:purchaseId',
        name: 'medicineShoppingList',
        meta:{title:'本院购物车',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/buyerrole/purchase/medicineShoppingList')),'trade')
      },
      {
        path: 'buyerrole/allMedicineShoppingList/:purchaseId',
        name: 'allMedicineShoppingList',
        meta:{title:'临采购物车',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/buyerrole/purchase/allMedicineShoppingList')),'trade')
      },
      {
        path: 'buyerrole/allMedicineList',
        name: 'allMedicineList',
        meta:{title:'临采目录',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/buyerrole/purchase/allMedicineList')),'trade')
      },
     /* {
        path: 'firstInstanceRole/firstApprovalTabs',
        name: 'firstApprovalTabs',
        meta:{title:'审批采购单',perm: ['trade_manage_firstApprovalTabs']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/firstInstanceRole/purchase/firstApprovalTabs')),'trade')
      },*/
      {
        path: 'firstInstanceRole/addMedicine/:purchaseId',
        name: 'addMedicine',
        meta:{title:'新增药品',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/firstInstanceRole/purchase/addMedicine')),'trade')
      },
      {
        path: 'firstInstanceRole/addTemplateMedicine/:purchaseId',
        name: 'addTemplateMedicine',
        meta:{title:'新增药品',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/firstInstanceRole/purchase/addTemplateMedicine')),'trade')
      },
      {
        path: 'firstInstanceRole/addTempMedicine/:purchaseId',
        name: 'addTempMedicine',
        meta:{title:'新增药品',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/firstInstanceRole/purchase/addTempMedicine')),'trade')
      },

      {
        path: 'firstInstanceRole/checkOne/:purchaseId/:jump',
        name: 'checkOne',
        meta:{title:'审批采购单',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/firstInstanceRole/purchase/checkOne')),'trade')
      },
      {
        path: 'firstInstanceRole/allPurchaseOrder',
        name: 'allPurchaseOrder',
        meta:{title:'全部采购单',perm:['trade_manage_queryFirstPlanList']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/firstInstanceRole/purchase/allPurchaseOrder')),'trade')
      },
      {
        path: 'firstInstanceRole/queryItemInfo/:purchaseId',
        name: 'queryItemInfo',
        meta:{title:'采购单详情',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/firstInstanceRole/purchase/purchaseItemList')),'trade')
      },
      {
        path: 'buyerrole/exportDetailList/:buyerOrgId',
        name: 'exportDetailList',
        meta:{title:'导出到货单列表',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/buyerrole/arrive/exportDetailList')),'trade')
      },
      {
        path: 'myOrderList',
        name: 'myOrderList',
        meta:{title:'我的订单',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/buyerrole/arrive/buyerTabView/home')),'trade')
      },
      /*,
      {
        path: 'catProductForbiddenProductList',
        name: 'catProductForbiddenProductList',
        meta:{title:'禁用药品列表'},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/catProduct/forbiddenProductList')),'trade
)      }*/,
      {
        path: 'handleList',//无审批退货处理
        name: 'handleList',
        meta:{title:'退货处理',perm: ['trade_send_handleList']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/buyerrole/return/handleList')),'trade')
      },
      {
        path: 'chooseNewList',
        name: 'chooseNewList',
        meta:{title:'创建退货',hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/buyerrole/return/chooseNewList')),'trade')
      },
      /*{
        path: 'sellerDellReturnTabs',
        name: 'sellerDellReturnTabs',
        meta:{title:'退货处理',perm: ['trade_manage_send_ReturnTabs']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/senderRole/return/home')),'trade')
      },*/{
        path: 'returnReturnDetails/:id/:display',
        name: 'returnReturnDetails',
        meta:{title:'退货单详情',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/senderRole/return/returnDetails')),'trade')
      },
    /*  {
        path: 'buyerDellReturnTabs',//买方退货处理
        name: 'buyerDellReturnTabs',
        meta:{title:'退货处理',perm: ['trade_manager_buyerDellReturnTabs']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/firstInstanceRole/return/dellReturnTabs')),'trade')
      },*/
      {
        path: 'purchaseListInfo/:purchaseId',
        name: 'purchaseListInfo',
        meta:{title:'采购单订单明细',hidden:true,perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/buyerrole/purchase/purchaseListInfo')),'trade')
      },
      {
        path: 'returnDetails/:id/:flag',
        name: 'returnDetails',
        meta:{title:'退货单详情',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/buyerrole/return/returnDetails')),'trade')
      },
      {
        path: 'selectGoVoList',
        name: 'selectGoVoList',
        meta:{title:'备案查看',perm: ['trade_manage_selectGoVoList']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/backup/goVoList')),'trade')
      },
      {
        path: 'govViewList/:recordId',
        name: 'govViewList',
        meta:{title:'备案查看详情', hidden:true, perm: ['login'] },
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/backUp/govoViewList')),'trade')
      },
      {
        path: 'hospitalViewList/:recordId',
        name: 'hospitalViewList',
        meta:{title:'备案查看详情',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/backUp/hospitalViewList')),'trade')
      },
      {
        path: 'hospitalAdd/:recordId/:sign',
        name: 'hospitalAdd',
        meta:{title:'编辑备案采购',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/backUp/hospitalAdd')),'trade')
      },{
        path: 'salerHandList',
        name: 'salerHandList',
        meta:{title:'处理订单明细查询',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/senderRole/order/salerTableView/salerHandleList')),'trade')
      },{
        path: 'sendListTodo',
        name: 'sendListTodo',
        meta:{title:'待处理订单列表查询',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/senderRole/order/sendListTodo')),'trade')
      },{
        path: 'allOrderList',
        name: 'allOrderList',
        meta:{title:'订单列表(订单处理)查询',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/senderRole/order/allOrderList')),'trade')
      },
      {
        path: 'handleHome',
        name: 'handleHome',
        meta:{title:'订单处理页',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/senderRole/order/salerTableView/handleHome')),'trade')
      } ,{
        path: 'selectOrderList',
        name: 'selectOrderList',
        meta:{title:'订单查询',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/buyerrole/order/orderList')),'trade')
      },
      {
        path: 'orderItemList/:orderId',
        name: 'orderItemList',
        meta:{title:'订单详情',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/buyerrole/order/itemList')),'trade')
      },
      {
        path: 'createPurchaseOrder',
        name: 'createPurchaseOrder',
        meta:{title:'创建采购计划',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/buyerrole/plan/medicineShoppingList')),'trade')
      },
      {
        path: 'addPlanMedicine/:purchaseId',
        name: 'addPlanMedicine',
        meta:{title:'增加药品',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/buyerrole/plan/addMedicineList')),'trade')
      },
      /*采购计划购物车*/
      {
        path: 'plan/planShoppingList/:purchaseId',
        name: 'planShoppingList',
        meta:{title:'本院购物车',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/buyerrole/plan/planShoppingList')),'trade')
      },
      {
        path: 'planPurchaseItemList/:purchaseId',
        name: 'planPurchaseItemList',
        meta:{title:'采购单详情',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/buyerrole/plan/planPurchaseItemList')),'trade')
      },
      {
        path: 'purchaseTemplateInfo/:purchaseId',
        name: 'purchaseTemplateInfo',
        meta:{title:'采购模板详情',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/buyerrole/purchase/purchaseTemplateInfo')),'trade')
      },
     {
        path: 'doImportList',
        name: 'doImportList',
        meta:{title:'订单导入',perm: ['trade_manage_orderImport']},
         component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/checkRole/order/orderImport')),'trade')
       },
      {
        path: 'firmCheckOrderList',
        name: 'firmCheckOrderList',
        meta:{title:'订单评价',perm: ['trade_evaluation_orderEvaluateList']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/evaluate/firmCheckOrderList')),'trade')
      },
      {
        path: 'evaluateDetail',
        name: 'evaluateDetail',
        meta:{title:'评价详情',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/evaluate/evaluateDetail')),'trade')
      },
      {
        path: 'complaintReasonManageList',
        name: 'complaintReasonManageList',
        meta:{title:'投诉原因管理',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/evaluate/complaint/complaintReasonManageList')),'trade')
      },
      {
        path: 'tradeComplainDetails/:id/:orderItemId',
        name: 'tradeComplainDetails',
        meta:{title:'投诉详情',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/evaluate/complaint/tradeComplainDetails')),'trade')
      },
      {
        path: 'handleComplaint/:id/:orderItemId',
        name: 'handleComplaint',
        meta:{title:'处理投诉',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/evaluate/complaint/handleComplaint')),'trade')
      },
      {
        path: 'addOrUpdateReason/:id',
        name: 'addOrUpdateReason',
        meta:{title:'新增或修改投诉原因',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/evaluate/complaint/addOrUpdateReason')),'trade')
      },{
        path: 'createTradeComplain/:type/:id/:orderItemId',
        name: 'createTradeComplain',
        meta:{title:'投诉信息',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/evaluate/complaint/createTradeComplain')),'trade')
      },{
        path: 'createCompanyComplain/:complaintId/:companyId/:type',
        name: 'createCompanyComplain',
        meta:{title:'投诉信息',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/evaluate/complaint/createCompanyComplain')),'trade')
      },{
        path: 'showComplainedList/:type/:id',
        name: 'showComplainedList',
        meta:{title:'查看列表',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/evaluate/complaint/showComplainedList')),'trade')
      },{
        path: 'customerComplaintTabs',
        name: 'customerComplaintTabs',
        meta:{title:'新增用户投诉',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/evaluate/complaint/customerComplaintTabs')),'trade')
      }

    ]
  },

  {
    path: '/TRADE/information',
    name: 'information',
    meta:{title:'信息公示',sys:'TRADE', perm: ['login']},
    component: LayOut,
    children: [
      {
        path: 'enterpriseLinkManInfoList',
        name: 'enterpriseLinkManInfoList',
        meta:{title:'黄页信息联系人',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/enterprise/linkManInfoList')),'trade')
      },
      {
        path: 'moreComplaint',
        name: 'moreComplaint',
        meta:{title:'投诉信息公示', perm: ['trade_information_moreComplaint']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/evaluate/complaint/moreComplaint')),'trade')
      },
      {
        path: 'complaintDetails/:beComplainedOrgid',
        name: 'complaintDetails',
        meta:{title:'查看投诉详情',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/evaluate/complaint/complaintDetails')),'trade')
      },
      {
        path: 'linkManAdd/:id/:param',
        name: 'linkManAdd',
        meta:{title:'新增联系人',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/enterprise/linkManAdd')),'trade')
      },
      {
        path: 'changeListTabs',
        name: 'changeListTabs',
        meta:{title:'药品信息变更公示',perm: ['trade_information_orgChangeList']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/informationChanges/changeListTabs')),'trade')
      },
      {
        path: 'queryUnnormalInfoList',
        name: 'queryUnnormalInfoList',
        meta:{title:'异常订单公示',perm: ['unnormal_info_list']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/enterprise/unnormalInfoList')),'trade')
      },
      {
        path: 'queryOrderUnnormalInfoList/:buyerOrgId',
        name: 'queryOrderUnnormalInfoList',
        meta:{title:'异常订单列表',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/enterprise/orderUnnormalInfoList')),'trade')
      },
      {
        path: 'historyList/:productId',
        name: 'historyList',
        meta:{title:'历史产品变更',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/InformationChanges/historyList')),'trade')
      },
      {
        path: 'buyerUserList/:orgId/:name',
        name: 'buyerUserList',
        meta:{title:'详细通讯录',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/enterprise/buyerUserList')),'trade')
      },
    ]
  },
  {
    path: '/TRADE/setting',
    name: 'setting',
    meta:{title:'交易设置',sys:'TRADE', perm: ['trade_setting']},
    component: LayOut,
    children: [
      {
        path: 'auditaRelationList',
        name: 'auditaRelationList',
        meta:{title:'审核关系维护',perm: ['trade_setting_auditaRelationList']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/transaction/administrationRelation/auditaRelation')),'trade')
      },
      {
        path: 'auditAuditParameterSettingList',
        name: 'auditAuditParameterSettingList',
        meta:{title:'二审参数设置',perm: ['trade_setting_auditAuditParameterSettingList']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/audit/auditParameterSettingList')),'trade')
      },
      {
        path: 'auditaList',
        name: 'auditaList',
        meta:{title:'行政关系维护',perm: ['trade_setting_auditaList']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/transaction/administrationRelation/auditaList')),'trade')
      },
      {
        path: 'regionMedicineTabs',
        name: 'regionMedicineTabs',
        // meta:{title:'区目录管理',perm:['trade_setting_regionMedicineTabs']},
        meta:{title:'区目录维护',perm:['trade_setting_regionMedicineTabs']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/information/regionMedicineTabs')),'trade')
      },
      {
        path: 'basedDrugBasedHome',
        name: 'basedDrugBasedHome',
        meta:{title:'区基药配送方案维护',perm:['trade_setting_basedDrugBasedHome']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/basedDrug/basedHome')),'trade')
      },


      {
        path: 'auditaRelationAddList',
        name: 'auditaRelationAddList',
        meta:{title:'审核关系添加',hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/transaction/administrationRelation/auditaRelationAdd')),'trade')
      },
      {
        path: 'auditaAddList',
        name: 'auditaAddList',
        meta:{title:'行政关系添加',hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/transaction/administrationRelation/auditaAdd')),'trade')
      },
      {
        path: 'buyerManagerList/:warehouseId',
        name: 'buyerManagerList',
        meta:{title:'药库管理员列表',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/information/warehouse/buyerList')),'trade')
      },
      {
        path: 'buyerAddList/:warehouseId',
        name: 'buyerAddList',
        meta:{title:'新增管理员',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/information/warehouse/buyerAddList')),'trade')
      },
      {
        path: 'wareHouseProductList/:warehouseId',
        name: 'wareHouseProductList',
        meta:{title:'库存商品列表',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/information/warehouse/productList')),'trade')
      },
      {
        path: 'wareHouseProductAddList/:warehouseId',
        name: 'wareHouseProductAddList',
        meta:{title:'新增库存商品列表',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/information/warehouse/productAddList')),'trade')
      },
      {
        path: 'hitCommList',
        name: 'hitCommList',
        meta:{title:'采购目录维护',perm:['trade_setting_hitCommList']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/information/hitCommList')),'trade')
      },
      {
        path: 'wareHouseUpdate/:warehouseId',
        name: 'wareHouseUpdate',
        meta:{title:'修改药库信息',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/information/warehouse/update')),'trade')
      },
    ]
  },

  {
    path: '/TRADE/messageMaintain',
    name: 'messageMaintain',
    meta:{title:'信息维护',sys:'TRADE', perm: ['message_maintain']},
    component: LayOut,
    children: [
      {
        path: 'wareHouseList',
        name: 'wareHouseList',
        meta:{title:'药库维护',perm:['trade_setting_wareHouseList']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/information/warehouse/list')),'trade')
      },
      {
        path: 'wareHouseProductList/:warehouseId',
        name: 'wareHouseProductList',
        meta:{title:'库存商品列表',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/information/warehouse/productList')),'trade')
      },
      {
        path: 'wareHouseUpdate/:warehouseId',
        name: 'wareHouseUpdate',
        meta:{title:'修改药库信息',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/information/warehouse/update')),'trade')
      },
      {
        path: 'buyerManagerList/:warehouseId',
        name: 'buyerManagerList',
        meta:{title:'药库管理员列表',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/information/warehouse/buyerList')),'trade')
      },
      {
        path: 'wareHouseProductAddList/:warehouseId',
        name: 'wareHouseProductAddList',
        meta:{title:'新增库存商品列表',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/information/warehouse/productAddList')),'trade')
      },
      {
        path: 'buyerAddList/:warehouseId',
        name: 'buyerAddList',
        meta:{title:'新增管理员',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/information/warehouse/buyerAddList')),'trade')
      },
      {
        path: 'hospitalDeliveryAddressList/:type',
        name: 'hospitalDeliveryAddressList',
        meta:{title: '医院收货地址维护',perm:['contract_buyer_CatDeliveryAddress']},
        component: r => require.ensure([], () => r(require('src/pages/contract/datamanagement/hospital/deliveryAddressMaintenanceList')),'contract')
      },
      {
        path: 'tradingPlatList',
        name: 'tradingPlatList',
        meta:{title:'交易参数设置',perm: ['trade_setting_tradingPlatList']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/trading/platList')),'trade')
      },
      {
        path: 'companyYellowList',
        name: 'companyYellowList',
        meta:{title:'企业黄页',perm: ['trade_information_companyYellowList']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/enterprise/list')),'trade')
      },
      {
        path: 'buyerList',
        name: 'buyerList',
        meta:{title:'医院黄页',perm: ['trade_information_buyerList']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/enterprise/buyerList')),'trade')
      },
      {
        path: 'linkManList',
        name: 'linkManList',
        meta:{title:'黄页信息维护',perm: ['trade_manager_selectEnterpriseContactsInfo']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/enterprise/userList')),'trade')
      },
      {
        path: 'getOrderDetailList',
        name: 'getOrderDetailList',
        meta:{title:'交易明细查询',perm: ['trade_senderRole_order_orderDetailList']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/senderRole/order/orderDetailList')),'trade')
      },
      {
        path: 'stockSenderMedicalList',
        name: 'stockSenderMedicalList',
        meta:{title:'可配送药品查询',perm: ['trade_send_querySendMedicineList']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/stock/senderMedicalList')),'trade')
      },
      {
        path: 'hospitalInfo',
        name: 'hospitalInfo',
        meta:{title:'可配送医院查询',perm: ['trade_manage_querySendHospitalList']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/information/hospitalInfo/list')),'trade')
      },
      {
        path: 'shortageUpList',
        name: 'shortageUpList',
        meta:{title:'短缺货查询',perm: ['trade_manage_getItemStaticList']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/shortage/buyerRole/shortageUpList')),'trade')
      },

    ]
  },

  {
    path: '/TRADE/dataReport',
    name: 'dataReport',
    meta:{title:'数据上报',sys:'TRADE', perm: ['data_report']},
    component: LayOut,
    children: [
      {
        path: 'shortageUpToWSJList',
        name: 'shortageUpToWSJList',
        meta:{title:'短缺药上报',perm: ['trade_dataReport_shortageUpToWSJList']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/shortage/buyerRole/shortageUpToWSJList')),'trade')
      },
      {
        path: 'selectDeclareList',
        name: 'selectDeclareList',
        meta:{title:'重点监控药品上报',perm: ['trade_manage_service_declareList']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/assist/declareList')),'trade')
      },
      {
        path: 'orgFttList',
        name: 'orgFttList',
        meta:{title:'非两票制药品上报',perm: ['org_ftt_list']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/assist/fttProduct/list')),'trade')
      },
      {
        path: 'reportList',
        name: 'reportList',
        meta:{title:'医疗机构采购分析',perm: ['trade_analyze_reportList']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/information/buyerOrgRequestReport/reportList')),'trade')
      },{
        path: 'reportListSubordinate/:buyerOrgId/:whether',
        name: 'reportListSubordinate',
        meta:{title:'医疗机构采购分析',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/information/buyerOrgRequestReport/reportList')),'trade')
      },
      {
        path: 'reportProductList/:buyerOrgId',
        name: 'reportProductList',
        meta:{title:'医疗机构采购明细',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/information/buyerOrgRequestReport/orgProductList')),'trade')
      },{
        path: 'balanceItemList/:buyerOrgId/:equalFlag',
        name: 'balanceItemListParam',
        meta:{title:'订单明细信息列表',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/information/buyerOrgRequestReport/balanceItemList')),'trade')
      },{
        path: 'buyDetails/:productId',
        name: 'buyDetails',
        meta:{title:'机构药品信息详情',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/information/buyerOrgRequestReport/buyDetails')),'trade')
      },
      {
        path: 'productList',
        name: 'productList',
        meta:{title:'药品采购分析',perm: ['trade_analyze_productList']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/information/buyerOrgRequestReport/orgProductList')),'trade')
      },
      {
        path: 'issueList',
        name: 'issueList',
        meta:{title:'短缺药品期号管理',perm: ['trade_dataReport_issueList']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/shortage/issue/list')),'trade')
      },
      {
        path: 'superviseRoleIssueList',
        name: 'superviseRoleIssueList',
        meta:{title:'短缺药品汇总',perm: ['trade_dataReport_superviseRoleIssueList']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/shortage/superviseRole/issueList')),'trade')
      },
      {
        path: 'selectAssistList',
        name: 'selectAssistList',
        meta:{title:'重点监控药品管理',perm: ['trade_manage_assist']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/assist/assistList')),'trade')
      },
      {
        path: 'fttListTabs',//医院端新增列表tab页
        name: 'fttListTabs',
        // meta:{title:'非两票制药品上报查询',perm: ['ftt_list_tabs']},
        meta:{title:'非两票制药品汇总',perm: ['ftt_list_tabs']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/assist/fttListTabs')),'trade')
      },




      {
        path: 'balanceItemList',
        name: 'balanceItemList',
        meta:{title:'订单明细信息列表',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/information/buyerOrgRequestReport/balanceItemList')),'trade')
      },
      {
        path: 'orgProductList',
        name: 'orgProductList',
        meta:{title:'品种明细',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/information/buyerOrgRequestReport/orgProductList')),'trade')
      },
      {
        path: 'superviseRoleList/:id',
        name: 'superviseRoleList',
        meta:{title:'短缺药品列表',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/shortage/superviseRole/list')),'trade')
      },
      {
        path: 'showAllInfo/:productId',
        name: 'showAllInfo',
        meta:{title:'详情页',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/shortage/buyerRole/showAllInfo')),'trade')
      },
      {
        path: 'orgInfoList/:issueId/:productId',
        name: 'orgInfoList',
        meta:{title:'短缺药品列表',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/shortage/superviseRole/orgInfoList')),'trade')
      },
      {
        path: 'buyerRoleList/:id/:key',
        name: 'buyerRoleList',
        meta:{title:'短缺药品列表',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/shortage/buyerRole/list')),'trade')
      },
      {
        path: 'shortageProductList/:id',
        name: 'shortageProductList',
        meta:{title:'平台数据',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/shortage/buyerRole/productList')),'trade')
      },
      {
        path: 'addOrUpdateList/:id/:productId',
        name: 'addOrUpdateList',
        meta:{title:'短缺药品新增',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/shortage/buyerRole/doAdd')),'trade')
      },
      {
        path: 'addOrUpdateIssue/:id',
        name: 'addOrUpdateIssue',
        meta:{title:'期号维护',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/shortage/issue/addOrUpdateIssue')),'trade')
      },
      {
        path: 'assistUpdate/:assistId',
        name: 'assistUpdate',
        meta:{title:'数据上报修改',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/assist/assistUpdate')),'trade')
      },
      {
        path: 'assistAdd',
        name: 'assistAdd',
        meta:{title:'数据上报添加',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/assist/assistAdd')),'trade')
      },
      {
        path: 'assistInfo/:assistId',
        name: 'assistInfo',
        meta:{title:'数据上报查看',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/assist/assistInfo')),'trade')
      },
      {
        path:  'orgDeclareList/:assistId',
        name: 'orgDeclareList',
        meta:{title:'进入申报和查看',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/assist/orgDeclareList')),'trade')
      },
      {
        path: 'orgDeclareInfo/:assistId',
        name: 'orgDeclareInfo',
        meta:{title:'医院端申报管理查看',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/assist/orgDeclareInfo')),'trade')
      },
      {
        path: 'assistAddTabs/:assistId',//医院端新增列表tab页
        name: 'assistAddTabs',
        meta:{title:'加入重点监控药品',hidden:true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/assist/assistAddTabs')),'trade')
      },
      {
        path: 'zbidList',
        name: 'zbidList',
        meta:{title:'基础数据库',hidden:true, perm: ['login'], perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/assist/fttProduct/zbidProductList')),'trade')
      },
    ]
  }

];
