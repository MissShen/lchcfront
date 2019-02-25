const LayOut = r => require.ensure([], () => r(require('@/components/LayOut')), 'base')
const LayDetail = r => require.ensure([], () => r(require('@/components/LayDetail')), 'base')

export const auditchangesMap = [
  {
    path: '/AUDIT/sysManage',
    name: 'sysManage',
    meta: {title: "资审系统管理", sys: "AUDIT", perm: ['auditchanges_systemmanage']},
    component: LayOut,
    children: [
      {
        path: 'audingManage',
        name: 'audingManage',
        meta: {title: '项目管理', perm: ['data:audingManage:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/systemManage/projectManage/list')), 'audit')
      },
      {
        path: 'insertAudingManage',
        name: 'insertAudingManage',
        meta: {title: '项目管理', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/systemManage/projectManage/insertAudingManage')), 'audit')
      },
      {
        path: 'projectView/:id',
        name: 'projectView',
        meta: {title: '项目管理查看', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/systemManage/projectManage/projectView')), 'audit')
      },
      {
        path: 'projectUpdate/:id',
        name: 'projectUpdate',
        meta: {title: '项目管理修改', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/systemManage/projectManage/projectUpdate')), 'audit')
      },
      {
        path: 'holidayManage',
        name: 'holidayManage',
        meta: {title: '假期管理', perm: ['data:holidayManage:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/systemManage/holidayManage/list')), 'audit')
      },
      {
        path: 'subjoinMessageManage',
        name: 'subjoinMessageManage',
        meta: {title: '项目附加信息管理', perm: ['data:subjoinMessageManage:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/systemManage/subjoinMessageManage/list')), 'audit')
      },
      {
        path: 'subjoinMessageManagePreview',
        name: 'subjoinMessageManagePreview',
        meta: {title: '项目附加信息浏览', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/systemManage/subjoinMessageManage/preview')), 'audit')
      },
      {
        path: 'DosageFormGroup',
        name: 'DosageFormGroup',
        meta: {title: '合并剂型', hidden: true, perm: ['data:DosageFormGroup:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/systemManage/dosageFormGroup/list')), 'audit')
      },
      {
        path: 'ProjectBiddingCategory',
        name: 'ProjectBiddingCategory',
        meta: {title: '标的物类别', hidden: true, perm: ['data:ProjectBiddingCategory:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/systemManage/projectBiddingCategory/list')), 'audit')
      },
      {
        path: 'ProjectBiddingCatelog',
        name: 'ProjectBiddingCatelog',
        meta: {title: '标的物目录', hidden: true, perm: ['data:ProjectBiddingCatelog:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/systemManage/projectBiddingCatelog/projectBiddingCatelog')), 'audit')
      },
      {
        path: 'RegisterMessagePublicity',
        name: 'RegisterMessagePublicity',
        meta: {title: '注册信息公示管理', perm: ['data:RegisterMessagePublicity:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/systemManage/registerMessagePublicity/registerPublicity')), 'audit')
      },
      {
        path: 'orgChangeAuditField',
        name: 'orgChangeAuditField',
        meta: {title: '企业变更审核字段管理', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/systemManage/changeAuditField/orgChangeAuditField')), 'audit')
      },
      {
        path: 'productChangeAuditField',
        name: 'productChangeAuditField',
        meta: {title: '产品变更审核字段管理', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/systemManage/changeAuditField/productChangeAuditField')), 'audit')
      }
    ]
  },
  {
    path: '/AUDIT/sysManageDetail',
    name: 'sysManageDetail',
    meta: {title: '系统管理详情', perm: ['login']},
    component: LayDetail,
    children: [
      {
        path: 'ProjectBiddingCatelogAddOrUp/:id',
        name: 'ProjectBiddingCatelogAddOrUp',
        meta: {title: '标的物目录新增', perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/systemManage/projectBiddingCatelog/addOrUp')), 'audit')
      }
    ]
  },
  {
    path: '/AUDIT/auditManage',
    name: 'auditManage',
    meta: {title: "审核管理", sys: "AUDIT", perm: ['auditchanges_infoaudit']},
    component: LayOut,
    children: [
      {
        path: 'toAuditManagement',
        name: 'toAuditManagement',
        meta: {title: '待审核数据管理', perm: ['data:toAuditManagement:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/auditManage/toAuditManagement/toAuditManagementTabs')), 'audit'),
      },
      {
        path: 'enterprisesToDeclareTabsBatchSet/:id/:name/:type',
        name: 'enterprisesToDeclareTabsBatchSet',
        meta: {title: '企业申报批次审核', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/auditManage/toAuditManagement/enterprisesToDeclareTabs/tabs/toReviewBatch/batchSetTabs')), 'audit')
      },
      {
        path: 'productDeclarationTabsBatchSet/:id/:name/:type',
        name: 'productDeclarationTabsBatchSet',
        meta: {title: '产品申报批次审核', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/auditManage/toAuditManagement/productDeclarationTabs/tabs/toReviewBatch/batchSetTabs')), 'audit')
      },
      {
        path: 'priceToDeclareTabsBatchSet/:id/:name/:type',
        name: 'priceToDeclareTabsBatchSet',
        meta: {title: '价格申报批次审核', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/auditManage/toAuditManagement/priceToDeclareTabs/tabs/toReviewBatch/batchSetTabs')), 'audit')
      },
      {
        path: 'enterpriseChangeTabsBatchSet/:id/:name/:type',
        name: 'enterpriseChangeTabsBatchSet',
        meta: {title: '企业变更批次审核', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/auditManage/toAuditManagement/enterpriseChangeTabs/tabs/toReviewBatch/batchSetTabs')), 'audit')
      },
      {
        path: 'productChangesTabsBatchSet/:id/:name/:type',
        name: 'productChangesTabsBatchSet',
        meta: {title: '产品变更批次审核', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/auditManage/toAuditManagement/productChangesTabs/tabs/toReviewBatch/batchSetTabs')), 'audit')
      },
      {
        path: 'productProductionTabsBatchSet/:id',
        name: 'productProductionTabsBatchSet',
        meta: {title: '产品转产批次审核', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/auditManage/toAuditManagement/productProductionTabs/tabs/toReviewBatch/batchSetTabs')), 'audit')
      },
      {
        path: 'priceChangeTabsBatchSet/:id/:name/:type',
        name: 'priceChangeTabsBatchSet',
        meta: {title: '价格变更批次审核', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/auditManage/toAuditManagement/priceChangeTabs/tabs/toReviewBatch/batchSetTabs')), 'audit')
      },
      {
        path: 'productTransferTabsBatchSet/:id/:name/:type',
        name: 'productTransferTabsBatchSet',
        meta: {title: '产品转产批次审核', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/auditManage/toAuditManagement/productTransferTabs/tabs/toReviewBatch/batchSetTabs')), 'audit')
      },
      //----------------------分配审核员----------------------
      {
        path: 'enterprisesToDeclareTabsDistribution/:id',
        name: 'enterprisesToDeclareTabsDistribution',
        meta: {title: '企业申报分配审核员', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/auditManage/toAuditManagement/enterprisesToDeclareTabs/tabs/toReviewBatch/distributionOfTheAuditorTabs')), 'audit')
      },
      {
        path: 'productDeclarationTabsDistribution/:id',
        name: 'productDeclarationTabsDistribution',
        meta: {title: '产品申报分配审核员', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/auditManage/toAuditManagement/productDeclarationTabs/tabs/toReviewBatch/distributionOfTheAuditorTabs')), 'audit')
      },
      {
        path: 'priceToDeclareTabsDistribution/:id',
        name: 'priceToDeclareTabsDistribution',
        meta: {title: '价格申报分配审核员', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/auditManage/toAuditManagement/priceToDeclareTabs/tabs/toReviewBatch/distributionOfTheAuditorTabs')), 'audit')
      },
      {
        path: 'enterpriseChangeTabsDistribution/:id',
        name: 'enterpriseChangeTabsDistribution',
        meta: {title: '企业变更分配审核员', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/auditManage/toAuditManagement/enterpriseChangeTabs/tabs/toReviewBatch/distributionOfTheAuditorTabs')), 'audit')
      },
      {
        path: 'productChangesTabsDistribution/:id',
        name: 'productChangesTabsDistribution',
        meta: {title: '产品变更分配审核员', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/auditManage/toAuditManagement/productChangesTabs/tabs/toReviewBatch/distributionOfTheAuditorTabs')), 'audit')
      },
      {
        path: 'productProductionTabsDistribution',
        name: 'productProductionTabsDistribution',
        meta: {title: '产品转产分配审核员', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/auditManage/toAuditManagement/productProductionTabs/tabs/toReviewBatch/distributionOfTheAuditorTabs')), 'audit')
      },
      {
        path: 'priceChangeTabsDistribution/:id',
        name: 'priceChangeTabsDistribution',
        meta: {title: '价格变更分配审核员', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/auditManage/toAuditManagement/priceChangeTabs/tabs/toReviewBatch/distributionOfTheAuditorTabs')), 'audit')
      },
      {
        path: 'productTransferTabsDistribution/:id',
        name: 'productTransferTabsDistribution',
        meta: {title: '产品转产分配审核员', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/auditManage/toAuditManagement/productTransferTabs/tabs/toReviewBatch/distributionOfTheAuditorTabs')), 'audit')
      },
      //----------------------分配审核员----------------------

      {
        path: 'enterpriseDeclareAudit',
        name: 'enterpriseDeclareAudit',
        meta: {title: '企业申报审核', perm: ['data:enterpriseDeclareAudit:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/auditManage/enterpriseDeclareAudit/list')), 'audit')
      }, {
        path: 'enterpriseChangeAudit',
        name: 'enterpriseChangeAudit',
        meta: {title: '企业变更审核', perm: ['data:enterpriseChangeAudit:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/auditManage/enterpriseChangeAudit/list')), 'audit')
      }, {
        path: 'priceDeclareAudit',
        name: 'priceDeclareAudit',
        meta: {title: '价格申报审核', perm: ['data:priceDeclareAudit:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/auditManage/priceDeclareAudit/list')), 'audit')
      },
      {
        path: 'priceDeclareAuditMinimum/:id/:projectProductId',
        name: 'priceDeclareAuditMinimum',
        meta: {title: '价格申报审核 全国最低中标价', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/auditManage/priceDeclareAudit/audit')), 'audit')
      },
      {
        path: 'priceDeclareAuditMinimumDetail',
        name: 'priceDeclareAuditMinimumDetail',
        meta: {title: '价格申报审核 全国最低中标价详情', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/auditManage/priceDeclareAudit/detail')), 'audit')
      },
      {
        path: 'priceChangeAudit',
        name: 'priceChangeAudit',
        meta: {title: '价格变更审核', perm: ['data:priceChangeAudit:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/auditManage/priceChangeAudit/list')), 'audit')
      },
      {
        path: 'priceChangeAuditMinimum',
        name: 'priceChangeAuditMinimum',
        meta: {title: '价格变更审核 最低中标价', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/auditManage/priceChangeAudit/minimum')), 'audit')
      },
      {
        path: 'priceChangeAuditDetail',
        name: 'priceChangeAuditDetail',
        meta: {title: '价格变更审核 详情', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/auditManage/priceChangeAudit/detail')), 'audit')
      },
      {
        path: 'productDeclareAuditList',
        name: 'productDeclareAuditList',
        meta: {title: '产品申报审核', perm: ['data:productDeclareAuditList:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/auditManage/productDeclareAudit/list')), 'audit')
      },
      {
        path: 'productChangeAuditList',
        name: 'productChangeAuditList',
        meta: {title: '产品变更审核', perm: ['data:productChangeAuditList:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/auditManage/productChangeAudit/list')), 'audit')
      },
      {
        path: 'productTransferringAuditList',
        name: 'productTransferringAuditList',
        meta: {title: '产品转产审核', perm: ['data:productTransferringAuditList:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/auditManage/productTransferringAudit/list')), 'audit')
      },
      {
        path: 'productTransferringAuditDetail/:id/:way',
        name: 'productTransferringAuditDetail',
        meta: {title: '产品转产审核详情', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/auditManage/productTransferringAudit/detail')), 'audit')
      },
      {
        path: 'productPriceDownAudit',
        name: 'productPriceDownAudit',
        meta: {title: '产品降价审核',hidden: true, perm: ['data:productPriceDownAudit:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/auditManage/productPriceDownAudit/list')), 'audit')
      },
      {
        path: 'orgDeclareIndex',
        name: 'orgDeclareIndex',
        meta: {title: '企业挂网设置', perm: ['data:orgDeclareIndex:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/auditManage/orgDeclareConfig/index')), 'audit')
      },
      {
        path: 'productDeclareIndex',
        name: 'productDeclareIndex',
        meta: {title: '产品挂网设置', perm: ['data:productDeclareIndex:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/auditManage/productDeclareConfig/index')), 'audit')
      },
      {
        path: 'twoInvoiceSystemAptitudePublicityManage',
        name: 'twoInvoiceSystemAptitudePublicityManage',
        meta: {title: '两票制公示管理', perm: ['data:twoInvoiceSystemAptitudePublicityManage:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/twoInvoiceSystem/AptitudePublicityManage/list')), 'audit')
      },
      {
        path: 'orgReportAudit',
        name: 'orgReportAudit',
        meta: {title: '企业举报审核', perm: ['data:orgReportAudit:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageReportManager/messageReportAudit/orgReportAudit')), 'audit')
      },
      {
        path: 'productReportAudit',
        name: 'productReportAudit',
        meta: {title: '产品举报审核', perm: ['data:productReportAudit:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageReportManager/productReportAudit/list')), 'audit')
      },
    ]
  },
  {
    path: '/AUDIT/auditManageDetail',
    name: 'auditManageDetail',
    meta: {title: "审核管理详情", perm: ['login']},
    component: LayDetail,
    children: [
      {
        path: 'productDeclareAudit/:id',
        name: 'productDeclareAudit',
        meta: {title: '产品申报审核', perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/auditManage/productDeclareAudit/audit')), 'audit')
      },
      {
        path: 'productDeclareAuditFindView/:id',
        name: 'productDeclareAuditFindView',
        meta: {title: '产品申报审核详情', perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/auditManage/productDeclareAudit/findView')), 'audit')
      },
      {
        path: 'productChangeAudit/:id',
        name: 'productChangeAudit',
        meta: {title: '产品变更审核', perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/auditManage/productChangeAudit/audit')), 'audit')
      },
      {
        path: 'productChangeAuditFindView/:id',
        name: 'productChangeAuditFindView',
        meta: {title: '产品变更审核详情', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/auditManage/productChangeAudit/findView')), 'audit')
      }
    ]
  },
  {
    path: '/AUDIT/messageRegister',
    name: 'messageRegister',
    meta: {title: "信息注册", sys: "AUDIT", hidden: true, perm: ['auditchanges_inforegister']},
    component: LayOut,
    children: [
      /*{
        path: 'enterpriseRegister',
        name: 'enterpriseRegister',
        meta: {title: "企业注册", perm: ['data:enterpriseRegister:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageRegister/enterpriseRegister/reg')), 'audit')
      },
      {
        path: 'productMessageRegisterList',
        name: 'productMessageRegisterList',
        meta: {title: '产品注册', perm: ['data:productMessageRegisterList:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageRegister/productMessageRegister/list')), 'audit')
      },
      {
        path: 'filesManage',
        name: 'filesManage',
        meta: {title: '文件管理', perm: ['data:filesManage:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageRegister/filesmanage/filesManage')), 'audit')
      },
      {
        path: 'filesRecycleBin',
        name: 'filesRecycleBin',
        meta: {title: '文件回收站', perm: ['data:filesRecycleBin:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageRegister/fileRecycleBin/fileRecycleBin')), 'audit')
      }*/
    ]
  },
  {
    path: '/AUDIT/messageRegisterDetail',
    name: 'messageRegisterDetail',
    meta: {title: '信息注册详情', perm: ['login']},
    component: LayDetail,
    children: [
      {
        path: 'productMessageRegisterFindView/:uid/:istemp',
        name: 'productMessageRegisterFindView',
        meta: {title: '产品信息注册详情', perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageRegister/productMessageRegister/findView')), 'audit')
      },
      {
        path: 'productMessageRegisterAddOrUp/:uid',
        name: 'productMessageRegisterAddOrUp',
        meta: {title: '产品信息注册', perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageRegister/productMessageRegister/addOrUp')), 'audit')
      }
    ]
  },
  {
    path: '/AUDIT/messageDeclare',
    name: 'messageDeclare',
    meta: {title: "注册与申报", sys: "AUDIT", perm: ['auditchanges_infodeclare']},
    component: LayOut,
    children: [
      {
        path: 'enterpriseRegister',
        name: 'enterpriseRegister',
        meta: {title: "企业注册", perm: ['data:enterpriseRegister:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageRegister/enterpriseRegister/reg')), 'audit')
      },
      {
        path: 'productMessageRegisterList',
        name: 'productMessageRegisterList',
        meta: {title: '产品注册', perm: ['data:productMessageRegisterList:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageRegister/productMessageRegister/list')), 'audit')
      },
      {
        path: 'filesManage',
        name: 'filesManage',
        meta: {title: '文件管理', perm: ['data:filesManage:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageRegister/filesmanage/filesManage')), 'audit')
      },
      {
        path: 'filesRecycleBin',
        name: 'filesRecycleBin',
        meta: {title: '文件回收站', perm: ['data:filesRecycleBin:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageRegister/fileRecycleBin/fileRecycleBin')), 'audit')
      },
      {
        path: 'enterpriseDeclare',
        name: 'enterpriseDeclare',
        meta: {title: '企业信息申报', perm: ['data:audit:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageDeclare/enterpriseDeclare/declare')), 'audit')
      },
      {
        path: 'productMessageDeclareList',
        name: 'productMessageDeclareList',
        meta: {title: '产品信息申报', perm: ['data:productMessageDeclareList:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageDeclare/productMessageDeclare/list')), 'audit')
      },
      {
        path: 'priceMessageChange',
        name: 'priceMessageChange',
        meta: {title: '价格信息申报', perm: ['data:priceMessageChange:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageChanges/priceMessageChange/list')), 'audit')
      },
      {
        path: 'productMessageTransferList',
        name: 'productMessageTransferList',
        meta: {title: '产品转出与转入', perm: ['data:productMessageTransferList:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageChanges/productMessageTransfer/list')), 'audit')
      },
      {
        path: 'twoInvoiceSystemAptitudeUpload',
        name: 'twoInvoiceSystemAptitudeUpload',
        meta: {title: '两票制申报', perm: ['data:twoInvoiceSystemAptitudeUpload:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/twoInvoiceSystem/AptitudeUpload/list')), 'audit')
      },
      {
        path: 'productPriceReduction',
        name: 'productPriceReduction',
        meta: {title: '产品降价更新', hidden: true, perm: ['data:productPriceReduction:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageChanges/productPriceReduction/list')), 'audit')
      },
      {
        path: 'recordProductDeclare',
        name: ' recordProductDeclare',
        meta: {title: '备案产品申报', hidden: true, perm: ['data:productMessageDeclareList:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageDeclare/productMessageDeclare/recordProduct')), 'audit')
      },
      {
        path: 'declareForm/:code',
        name: ' declareForm',
        meta: {title: '备案产品申报', hidden: true, perm: ['data:productMessageDeclareList:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageDeclare/productMessageDeclare/declareForm')), 'audit')
      },
      {
        path: 'priceManage',
        name: ' priceManage',
        meta: {title: '价格管理', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/priceManage/list')), 'audit')
      },
      {
        path: 'messageReport',
        name: 'messageReport',
        meta: {title: '信息举报', perm: ['data:messageReport:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageReportManager/messageReport/list')), 'audit')
      },
      {
        path: 'orgReportClarify',
        name: 'orgReportClarify',
        meta: {title: '举报澄清', perm: ['data:orgReportClarify:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageReportManager/messageReportClarify/orgReportClarify')), 'audit')
      },
      {
        path: 'reportOrgList',
        name: 'reportOrgList',
        meta: {title: '信息举报列表', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageReportManager/messageReport/orgShowList')), 'audit')
      },
      {
        path: 'productAddReport',
        name: 'productAddReport',
        meta: {title: '产品发起举报页面', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageReportManager/productMessageReport/addList')), 'audit')
      },
      {
        path: 'productmessageClarify',
        name: 'productmessageClarify',
        meta: {title: '产品信息澄清', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageReportManager/productReportClarify/list')), 'audit')
      },
    ]
  },
  {
    path: '/AUDIT/messageDeclareDetail',
    name: 'messageDeclareDetail',
    meta: {title: '信息申报详情', perm: ['login']},
    component: LayDetail,
    children: [
      {
        path: 'productMessageDeclareFindView/:uid',
        name: 'productMessageDeclareFindView',
        meta: {title: '产品信息申报详情', perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageDeclare/productMessageDeclare/findView')), 'audit')
      },
      {
        path: 'productMessageDeclareAddOrUp/:uid',
        name: 'productMessageDeclareAddOrUp',
        meta: {title: '产品信息申报', perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageDeclare/productMessageDeclare/addOrUp')), 'audit')
      }
    ]
  },
  {
    path: '/AUDIT/messageChanges',
    name: 'messageChanges',
    meta: {title: "信息变更", sys: "AUDIT",hidden: true,  perm: ['login']},
    component: LayOut,
    children: [
      {
        path: 'enterpriseChange',
        name: 'enterpriseChange',
        meta: {title: '企业信息变更', hidden: true, perm: ['data:enterpriseChange:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageChanges/enterpriseChange/list')), 'audit')
      },
     /* {
        path: 'priceMessageChange',
        name: 'priceMessageChange',
        meta: {title: '价格信息变更', perm: ['data:priceMessageChange:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageChanges/priceMessageChange/list')), 'audit')
      },*/
      {
        path: 'priceChanges',
        name: 'priceChanges',
        meta: {title: '价格变更 全国最低中标价', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageChanges/priceMessageChange/priceChange')), 'audit')
      },
      {
        path: 'priceChangeDetail',
        name: 'priceChangeDetail',
        meta: {title: '价格变更详情', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageChanges/priceMessageChange/detail')), 'audit')
      },
      {
        path: 'productMessageChangeList',
        name: 'productMessageChangeList',
        meta: {title: '产品信息变更', hidden: true, perm: ['data:productMessageChangeList:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageChanges/productMessageChange/list')), 'audit')
      },
      {
        path: 'addProductMessageChangeList',
        name: 'addProductMessageChangeList',
        meta: {title: '产品申报变更', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageChanges/productMessageChange/addList')), 'audit')
      },
     /* {
        path: 'productMessageTransferList',
        name: 'productMessageTransferList',
        meta: {title: '产品转产变更', perm: ['data:productMessageTransferList:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageChanges/productMessageTransfer/list')), 'audit')
      },*/
      {
        path: 'productMessageTransferEdit/:id/:type/:way/:orgId',
        name: 'productMessageTransferEdit',
        meta: {title: '产品转产变更', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageChanges/productMessageTransfer/transferTabs')), 'audit')
      },
      {
        path:'transferQuestionRecord/:id',
        name: 'transferQuestionRecord',
        meta: {title: '转产质疑记录', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/auditManage/productTransferringAudit/questionRecord')), 'audit')
      },
      {
        path: 'productRollOutVerifyConfirm/:id/:way/:flag',
        name: 'productRollOutVerifyConfirm',
        meta: {title: '产品转出确认明细', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageChanges/productRollOutVerify/transferTabs')), 'audit')
      },
      /*{
        path: 'productPriceReduction',
        name: 'productPriceReduction',
        meta: {title: '产品降价更新', perm: ['data:productPriceReduction:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageChanges/productPriceReduction/list')), 'audit')
      },*/
      {
        path: 'addProductPriceReduction',
        name: 'addProductPriceReduction',
        meta: {title: '新增产品降价更新', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageChanges/productPriceReduction/add')), 'audit')
      }
    ]
  },
  {
    path: '/AUDIT/messageChangesDetail',
    name: 'messageChangesDetail',
    meta: {title: "信息变更详情", perm: ['login']},
    component: LayDetail,
    children: [
      {
        path: 'productMessageChange/:id',
        name: 'productMessageChange',
        meta: {title: '产品信息变更', perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageChanges/productMessageChange/change')), 'audit')
      }
    ]
  },
  {
    path: '/AUDIT/messagePublicity',
    name: 'messagePublicity',
    meta: {title: "公示及质疑", sys: "AUDIT", perm: ['auditchanges_infopublicity']},
    component: LayOut,
    children: [
      {
        path: 'enterprisePublicityDeclare',
        name: 'enterprisePublicityDeclare',
        meta: {title: '企业信息公示', perm: ['data:enterprisePublicityDeclare:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messagePublicity/enterprisePublicity/declarelist')), 'audit')
      },
      {
        path: 'enterprisePublicityChange',
        name: 'enterprisePublicityChange',
        meta: {title: '企业信息公示', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messagePublicity/enterprisePublicity/changelist')), 'audit')
      },
      {
        path: 'productMessageDeclarePublicity',
        name: 'productMessageDeclarePublicity',
        meta: {title: '产品信息公示', perm: ['data:productMessageDeclarePublicity:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messagePublicity/productMessagePublicity/productMessageDeclarePublicity')), 'audit')
      },
      {
        path: 'productMessageChangePublicity',
        name: 'productMessageChangePublicity',
        meta: {title: '产品信息公示', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messagePublicity/productMessagePublicity/productMessageChangePublicity')), 'audit')
      },
      {
        path: 'priceMessagePublicity',
        name: 'priceMessagePublicity',
        meta: {title: '价格信息公示', perm: ['data:priceMessagePublicity:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messagePublicity/priceMessagePublicity/priceMessagePublicity')), 'audit')
      },
      {
        path: 'pricePublicityDetail/:id',
        name: 'pricePublicityDetail',
        meta: {title: '价格信息公示明细', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messagePublicity/priceMessagePublicity/pricePublicityDetail')), 'audit')
      },
      {
        path: 'pricePublicityDoubt',
        name: 'pricePublicityDoubt',
        meta: {title: '产品价格公示质疑', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messagePublicity/priceMessagePublicity/pricePublicityDoubt')), 'audit')
      },
      {
        path: 'priceChangePublicity',
        name: 'priceChangePublicity',
        meta: {title: '产品价格变更公示详情', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messagePublicity/priceChangePublicity/detail')), 'audit')
      },
      {
        path: 'priceMessagePublicityDoubt',
        name: 'priceMessagePublicityDoubt',
        meta: {title: '产品价格变更公示质疑', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messagePublicity/priceChangePublicity/doubt')), 'audit')
      },
      {
        path: 'transferQuestionRecord',
        name: 'transferQuestionRecord',
        meta: {title: '转产质疑记录', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageChanges/productMessageTransfer/transferQuestionList')), 'audit')
      },

      // {
      //   path: 'pricePublicityDetail',
      //   name: 'pricePublicityDetail',
      //   meta: {title: '产品价格公示详情',hidden:true},
      //   component: r => require.ensure([], () => r(require('src/pages/auditchanges/messagePublicity/priceMessagePublicity/pricePublicityDetail')),'audit
      // },

      {
        path: 'productTransferPublicity',
        name: 'productTransferPublicity',
        meta: {title: '产品转产公示', perm: ['data:productTransferPublicity:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messagePublicity/productTransferPublicity/productTransferPublicity')), 'audit')
      },
      {
        path: 'detail/:id/:flag',
        name: 'detail',
        meta: {title: '产品转产公示详情', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messagePublicity/productTransferPublicity/detail')), 'audit')
      },
      {
        path: 'productPriecDownPublicity',
        name: 'productPriecDownPublicity',
        meta: {title: '产品降价公示', perm: ['data:productPriecDownPublicity:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messagePublicity/productPriceDownPublicity/list')), 'audit')
      },
      {
        path: 'twoInvoiceSystemAptitudePublicity',
        name: 'twoInvoiceSystemAptitudePublicity',
        meta: {title: '两票制资质公示', perm: ['data:twoInvoiceSystemAptitudePublicity:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/twoInvoiceSystem/AptitudePublicity/list')), 'audit')
      },
      {
        path: 'orgMessageShow',
        name: 'orgMessageShow',
        meta: {title: '生产企业信息库', perm: ['data:orgMessageShow:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageShow/orgMessageShow/list')), 'audit')
      },
      {
        path: 'distributionMessageShow',
        name: 'distributionMessageShow',
        meta: {title: '配送企业信息库', perm: ['data:distributionMessageShow:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageShow/orgMessageShow/distribution')), 'audit')
      },
      {
        path: 'productMessageShow',
        name: 'productMessageShow',
        meta: {title: '产品基础信息库', perm: ['data:productMessageShow:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageShow/productMessageShow/productMessageShow')), 'audit')
      },
      {
        path: 'enterprisePublicityCredit',
        name: 'enterprisePublicityCredit',
        meta: {title: '企业信用公示', perm: ['data:enterprisePublicityCredit:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messagePublicity/enterprisePublicity/creditlist')), 'audit')
      },
    ]
  },
  {
    path: "/AUDIT/messageDoubt",
    name: "/messageDoubt",
    meta: {title: "质疑管理", hidden: true, sys: "AUDIT",  perm: ['login']},
    component: LayOut,
    children: [{
      path: "enterpriseDeclareDoubt",
      name: "enterpriseDeclareDoubt",
      meta: {title: "企业质疑", hidden: true, perm: ['data:enterpriseDeclareDoubt:auth']},
      component: _ => import("src/pages/auditchanges/messageDoubt/enterprise/declare"),
    }, {
      path: "enterpriseChangeDoubt",
      name: "enterpriseChangeDoubt",
      meta: {title: "企业信息质疑", hidden: true, perm: ['login']},
      component: _ => import("src/pages/auditchanges/messageDoubt/enterprise/change"),
    },
      {
        path: 'priceMessageDoubt',
        name: 'priceMessageDoubt',
        meta: {title: '价格质疑', hidden: true, perm: ['data:priceMessageDoubt:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageDoubt/priceMessageDoubt/declareDoubtList')), 'audit')
      },
      {
        path: 'priceMessageDoubtChange',
        name: 'priceMessageDoubtChange',
        meta: {title: '价格变更质疑', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageDoubt/priceMessageDoubt/changeDoubtList')), 'audit')
      },
      {
        path: 'productMessageDoubt',
        name: 'productMessageDoubt',
        meta: {title: '产品质疑', hidden: true, perm: ['data:productMessageDoubt:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageDoubt/productMessageDoubt/declareDoubtList')), 'audit')
      },
      {
        path: 'productMessageDoubtChange',
        name: 'productMessageDoubtChange',
        meta: {title: '产品变更信息质疑', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageDoubt/productMessageDoubt/changeDoubtList')), 'audit')
      },
      {
        path: "productShowDoubt",
        name: "productShowDoubt",
        remark: '作废功能', meta: {title: "产品挂网信息质疑", hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageDoubt/productShowDoubt/list')), 'audit')
      },
      {
        path: "priceShowDoubt",
        name: "priceShowDoubt",
        remark: '作废功能',
        meta: {title: "价格挂网信息质疑", hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageDoubt/priceShowDoubt/list')), 'audit')
      },
      {
        path: "productListDoubt",
        name: "productListDoubt",
        meta: {title: "产品列表质疑", hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageDoubt/productShowDoubt/selectProductList')), 'audit')
      }, {
        path: "enterpriseShowDoubt",
        name: "enterpriseShowDoubt",
        remark: '作废功能', meta: {title: "挂网企业信息质疑", hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageShow/orgQuestion/list')), 'audit')
      },
      {
        path: "priceListDoubt",
        name: "priceListDoubt",
        meta: {title: "产品价格列表质疑", hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageDoubt/priceShowDoubt/selectProductList')), 'audit')
      }],
  },
  {
    path: '/AUDIT/messagePublicityDetail',
    name: 'messagePublicityDetail',
    meta: {title: "信息公示详情", perm: ['login']},
    component: LayDetail,
    children: [
      {
        path: 'productDeclarePublicityFindView/:id',
        name: 'productDeclarePublicityFindView',
        meta: {title: '产品申报公示详情', perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messagePublicity/productMessagePublicity/declareFindView')), 'audit')
      },
      {
        path: 'productDeclarePublicityQuery/:id',
        name: 'productDeclarePublicityQuery',
        meta: {title: '产品申报公示质疑', perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messagePublicity/productMessagePublicity/declareQuery')), 'audit')
      },
      {
        path: 'productChangePublicityFindView/:id',
        name: 'productChangePublicityFindView',
        meta: {title: '产品变更公示详情', perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messagePublicity/productMessagePublicity/changeFindView')), 'audit')
      },
      {
        path: 'productChangePublicityQuery/:id',
        name: 'productChangePublicityQuery',
        meta: {title: '产品变更公示质疑', perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messagePublicity/productMessagePublicity/changeQuery')), 'audit')
      }
    ]
  },
/*  {
    path: '/AUDIT/messageShow',
    name: 'messageShow',
    meta: {title: "信息挂网", sys: "AUDIT", perm: ['auditchanges_infoshow']},
    component: LayOut,
    children: [
      {
        path: 'productMessageShow',
        name: 'productMessageShow',
        meta: {title: '产品信息挂网', perm: ['data:productMessageShow:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageShow/productMessageShow/productMessageShow')), 'audit')
      },
      {
        path: 'productTransferShow',
        name: 'productTransferShow',
        meta: {title: '产品转产挂网', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageShow/productTransferShow/productTransferShow')), 'audit')
      },
      {
        path: 'orgMessageShow',
        name: 'orgMessageShow',
        meta: {title: '企业信息挂网', perm: ['data:orgMessageShow:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageShow/orgMessageShow/list')), 'audit')
      },
      {
        path: 'priceDeclareShow',
        name: 'priceDeclareShow',
        meta: {title: '产品价格申报挂网', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageShow/priceDeclareShow/detail')), 'audit')
      },
      {
        path: 'priceChangeShow',
        name: 'priceChangeShow',
        meta: {title: '产品价格变更挂网', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageShow/priceChangeShow/detail')), 'audit')
      }
    ]
  },*/
  {
    path: '/AUDIT/MessageShowDetail',
    name: 'MessageShowDetail',
    meta: {title: '信息挂网详情页', perm: ['login']},
    component: LayDetail,
    children: [
      {
        path: 'ProductDetailPage/:uid',
        name: 'ProductDetailPage',
        meta: {title: '企业信息挂网', perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageShow/productMessageShow/detailPage')), 'audit')
      },
      {
        path: 'OrgDetailPage/:uid',
        name: 'OrgDetailPage',
        meta: {title: '企业信息挂网', perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageShow/orgMessageShow/orgPage')), 'audit')
      }
    ]
  },
  {
    path: '/AUDIT/orgClarify',
    name: 'orgClarify',
    meta: {title: "企业澄清", hidden: true, sys: "AUDIT",  perm: ['login']},
    component: LayOut,
    children: [
      {
        path: 'enterpriseClarifyDeclare',
        name: 'enterpriseClarifyDeclare',
        meta: {title: '企业澄清', hidden: true, perm: ['data:enterpriseClarifyDeclare:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/orgClarify/enterpriseClarify/declarelist')), 'audit')
      },
      {
        path: 'enterpriseClarifyChange',
        name: 'enterpriseClarifyChange',
        meta: {title: '企业信息澄清', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/orgClarify/enterpriseClarify/changelist')), 'audit')
      },
      {
        path: 'priceMessageClarify',
        name: 'priceMessageClarify',
        meta: {title: '价格信息澄清', hidden: true, perm: ['data:priceMessageClarify:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/orgClarify/priceMessageClarify/priceMessageDeclareClarify')), 'audit')
      },
      {
        path: 'priceMessageChangeClarify',
        name: 'priceMessageChangeClarify',
        meta: {title: '价格信息变更澄清', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/orgClarify/priceMessageClarify/priceMessageChangeClarify')), 'audit')
      },
      // {
      //   path: 'priceDeclareClarify',
      //   name: 'priceDeclareClarify',
      //   meta: {title: '价格申报澄清', hidden: true,perm: ['none']},
      //   component: r => require.ensure([], () => r(require('src/pages/auditchanges/orgClarify/priceMessageClarify/priceDeclareClarify')),'audit
      // },
      // {
      //   path: 'priceChangeClarify',
      //   name: 'priceChangeClarify',
      //   meta: {title: '价格变更澄清', hidden: true,perm: ['none']},
      //   component: r => require.ensure([], () => r(require('src/pages/auditchanges/orgClarify/priceMessageClarify/priceChangeClarify')),'audit
      // },
      {
        path: 'productMessageDeclareClarify',
        name: 'productMessageDeclareClarify',
        meta: {title: '产品信息澄清', hidden: true, perm: ['data:productMessageDeclareClarify:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/orgClarify/productMessageClarify/productMessageDeclareClarify')), 'audit')
      },
      {
        path: 'productMessageChangeClarify',
        name: 'productMessageChangeClarify',
        meta: {title: '产品信息澄清', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/orgClarify/productMessageClarify/productMessageChangeClarify')), 'audit')
      },
      {
        path: 'productTransferClarify',
        name: 'productTransferClarify',
        meta: {title: '产品转产澄清', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/orgClarify/productTransferClarify/list')), 'audit')
      },
      {
        path: 'showProductClarify',
        name: 'showProductClarify',
        remark: '作废功能',
        meta: {title: '挂网产品澄清', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/orgClarify/productShowClarify/list')), 'audit')
      },
      {
        path: 'showOrgClarify',
        name: 'showOrgClarify',
        remark: '作废功能',
        meta: {title: '挂网企业澄清', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/orgClarify/orgShowClarify/list')), 'audit')
      },
      {
        path: 'showPriceClarify',
        name: 'showPriceClarify',
        remark: '作废功能',
        meta: {title: '挂网价格澄清', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/orgClarify/priceShowClarify/list')), 'audit')
      }
    ]
  },
  {
    path: '/AUDIT/orgClarifyDetail',
    name: 'orgClarifyDetail',
    meta: {title: "企业澄清详情", perm: ['login']},
    component: LayDetail,
    children: [
      {
        path: 'productDeclareClarify/:id',
        name: 'productDeclareClarify',
        meta: {title: '产品申报澄清', perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/orgClarify/productMessageClarify/declareClarify')), 'audit')
      },
      {
        path: 'productChangeClarify/:id',
        name: 'productChangeClarify',
        meta: {title: '产品变更澄清', perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/orgClarify/productMessageClarify/changeClarify')), 'audit')
      }
    ]
  },
  {
    path: '/AUDIT/orgAffirm',
    name: 'orgAffirm',
    meta: {title: "企业确认", sys: "AUDIT", perm: ['login']},
    component: LayOut,
    children: [
      {
        path: 'enterpriseAffirmDeclare',
        name: 'enterpriseAffirmDeclare',
        meta: {title: '企业信息确认',hidden: true, perm: ['data:enterpriseAffirmDeclare:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/orgAffirm/enterpriseAffirm/declarelist')), 'audit')
      },
      {
        path: 'enterpriseAffirmChange',
        name: 'enterpriseAffirmChange',
        meta: {title: '企业信息确认', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/orgAffirm/enterpriseAffirm/changelist')), 'audit')
      },
      {
        path: 'priceChangeAffirm',
        name: 'priceChangeAffirm',
        meta: {title: '价格变更确认',hidden: true, perm: ['data:priceChangeAffirm:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/orgAffirm/priceChangeAffirm/priceChangeAffirm')), 'audit')
      },
      {
        path: 'productMessageDeclareAffirm',
        name: 'productMessageDeclareAffirm',
        meta: {title: '产品信息确认', hidden: true,perm: ['data:productMessageDeclareAffirm:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/orgAffirm/productMessageAffirm/productMessageDeclareAffirm')), 'audit')
      },
      {
        path: 'productMessageChangeAffirm',
        name: 'productMessageChangeAffirm',
        meta: {title: '产品变更确认', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/orgAffirm/productMessageAffirm/productMessageChangeAffirm')), 'audit')
      },
      {
        path: 'productRollOutVerifyList',
        name: 'productRollOutVerifyList',
        meta: {title: '产品转出确认', hidden: true,perm: ['data:productRollOutVerifyList:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageChanges/productRollOutVerify/list')), 'audit')
      },
      {
        path: 'priceMessageDeclarationAffirm',
        name: 'priceMessageDeclarationAffirm',
        meta: {title: '价格信息申报确认', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/orgAffirm/priceMessageDeclarationAffirm/detail')), 'audit')
      },
      {
        path: 'priceMessageChangeAffirm',
        name: 'priceMessageChangeAffirm',
        meta: {title: '价格信息变更确认', hidden: true, perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/orgAffirm/priceMessageChangeAffirm/detail')), 'audit')
      }
    ]
  },
  {
    path: '/AUDIT/orgAffirmDetail',
    name: 'orgAffirmDetail',
    meta: {title: "企业确认详情", perm: ['login']},
    component: LayDetail,
    children: [
      {
        path: 'productDeclareAffirmDetail/:id',
        name: 'productDeclareAffirmDetail',
        meta: {title: '产品申报确认', perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/orgAffirm/productMessageAffirm/declareAffirm')), 'audit')
      },
      {
        path: 'productChangeAffirmDetail/:id',
        name: 'productChangeAffirmDetail',
        meta: {title: '产品变更确认', perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/orgAffirm/productMessageAffirm/changeAffirm')), 'audit')
      }
    ]
  },
  {
    path: '/AUDIT/messageDoubtDetail',
    name: 'messageDoubtDetail',
    meta: {title: "信息质疑", perm: ['login']},
    component: LayDetail,
    children: [
      {
        path: 'priceMessageDoubtDetail',
        name: 'priceMessageDoubtDetail',
        meta: {title: '价格信息质疑详情', perm: ['login']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageDoubt/priceMessageDoubt/detail')), 'audit')
      }
    ]
  },
  {
    path: '/AUDIT/twoInvoiceSystemManage',
    name: 'twoInvoiceSystemManage',
    meta: {title: "两票制管理", sys: "AUDIT", perm: ['auditchanges_twoInvoiceSystem']},
    component: LayOut,
    children: [
      /*{
        path: 'twoInvoiceSystemAptitudeUpload',
        name: 'twoInvoiceSystemAptitudeUpload',
        meta: {title: '两票制资质上传', perm: ['data:twoInvoiceSystemAptitudeUpload:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/twoInvoiceSystem/AptitudeUpload/list')), 'audit')
      },*/
      /*{
        path: 'twoInvoiceSystemAptitudePublicity',
        name: 'twoInvoiceSystemAptitudePublicity',
        meta: {title: '两票制资质公示', perm: ['data:twoInvoiceSystemAptitudePublicity:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/twoInvoiceSystem/AptitudePublicity/list')), 'audit')
      },*/
      /*{
        path: 'twoInvoiceSystemAptitudePublicityManage',
        name: 'twoInvoiceSystemAptitudePublicityManage',
        meta: {title: '两票制资质公示管理', perm: ['data:twoInvoiceSystemAptitudePublicityManage:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/twoInvoiceSystem/AptitudePublicityManage/list')), 'audit')
      }*/
    ]
  },
/*  {
    path: '/AUDIT/messageReportManager',
    name: 'messageReportManager',
    meta: {title: "举报管理", sys: "AUDIT", perm: ['auditchanges_report']},
    component: LayOut,
    children: [
      {
        path: 'messageReport',
        name: 'messageReport',
        meta: {title: '信息举报', perm: ['data:messageReport:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageReportManager/messageReport/list')), 'audit')
      },
      {
        path: 'orgReportAudit',
        name: 'orgReportAudit',
        meta: {title: '举报审核', perm: ['data:orgReportAudit:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageReportManager/messageReportAudit/orgReportAudit')), 'audit')
      },
      {
        path: 'orgReportClarify',
        name: 'orgReportClarify',
        meta: {title: '举报澄清', perm: ['data:orgReportClarify:auth']},
        component: r => require.ensure([], () => r(require('src/pages/auditchanges/messageReportManager/messageReportClarify/orgReportClarify')), 'audit')
      },
    ]
  }*/
]
