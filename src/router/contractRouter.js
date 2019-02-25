const LayOut = r => require.ensure([], () => r(require('@/components/LayOut')),'base')
export const contractRouterMap=[
  {
    path: '/CONTRACT/catalogmanagement',
    name: 'CatalogManagement',
    meta: {
      title: '目录管理',
      sys: 'CONTRACT',
      perm:['catalog_management']
    },
    component: LayOut,
    children: [
      {
        path: 'catalogManagementCandidateCatalogTabs',
        name: 'catalogManagementCandidateCatalogTabs',
        meta: {title: '医院本院目录', perm:['contract_buyer_productitem']},
        // component: r => require.ensure([], () => r(require('src/pages/contract/catalogmanagement/hoscandidatecatalog/hosCandidateCatalogTabs')),'contract')
        component: r => require.ensure([], () => r(require('src/pages/contract/catalogmanagement/hoscandidatecatalog/hosCandidateCatalog-tabs-tabJoined')),'contract')
      },
      {
        path: 'catalogManagementBasicDrugData',
        name: 'catalogManagementBasicDrugData',
        meta:{title: '药品基础数据库', perm:['contract_all_basic_drug_data']},
        component: r => require.ensure([], () => r(require('src/pages/contract/catalogmanagement/basicDrugData')),'contract')
      },
      //=========================================
      {
        path: 'hitCommList',
        name: 'hitCommList',
        meta:{title:'采购目录维护',perm:['purchase_catalog']},
        component: r => require.ensure([], () => r(require('src/pages/trade/tradecenter/information/hitCommList')),'trade')
      },
      //=========================================
      // 产品信息变更公示???
      //=========================================
      {
        path: 'bargainManagementManufacturePriceConfirmation',
        name: 'bargainManagementManufacturePriceConfirmation',
        meta: {title: '企业主动降价', perm:['catalog_contract_buyer_markdown_confirm']},
        component: r => require.ensure([], () => r(require('src/pages/contract/bargainmanagement/bargainquote/manufacturePriceConfirmationList')),'contract')
      },
      {
        path: 'bargainManagementMaintainBargainList',
        name: 'bargainManagementMaintainBargainList',
        // meta: {title: '维护议价目录', perm:['contract_buyer_bargainitem']},
        meta: {title: '议价管理', perm:['catalog_contract_buyer_bargainitem']},
        component: r => require.ensure([], () => r(require('src/pages/contract/bargainmanagement/maintainBargain/bargainList')),'contract')
      },
      {
        path: 'bargainManagementBargainResult',
        name: 'bargainManagementBargainResult',
        meta: {title: '议价公示', perm:['catalog_contract_all_bargain_result_public']},
        component: r => require.ensure([], () => r(require('src/pages/contract/bargainmanagement/bargainquote/bargainResult')),'contract')
      },



      {
        path: 'candidateDirectoryPublicity',
        name: 'candidateDirectoryPublicity',
        meta:{title: '候选目录公示', perm:['candidate_directory_publicity']},
        component: r => require.ensure([], () => r(require('src/pages/contract/catalogmanagement/candidateDirectoryPublicity')),'contract')
      },
      /*{
        path: 'catalogManagementCorporatePriceNegotiation',
        name: 'catalogManagementCorporatePriceNegotiation',
        meta: {title: '企业降价议价', perm:['corporate_price_negotiation']},
        component: r => require.ensure([], () => r(require('src/pages/contract/catalogmanagement/corporatepricenegotiation/corporatePriceNegotiation')),'contract
)      },*/
      {
        path: 'catalogManagementHospitalReportTabs',
        name: 'catalogManagementHospitalReportTabs',
        meta: {title: '本院上报药品目录'},
        component: r => require.ensure([], () => r(require('src/pages/contract/catalogmanagement/hospitalreportdrug/hospitalReportDrug-Tabs')),'contract')
      },
      {
        path: 'catalogManagementDisableVarieties',
        name: 'catalogManagementDisableVarieties',
        meta: {title: '禁用品种', perm:['contract_admin_disableproduct']},
        component: r => require.ensure([], () => r(require('src/pages/contract/catalogmanagement/disableproduct/disableProduct')),'contract')
      }
    ]
  },
  {
    path: '/CONTRACT/registrationAndDeclaration',
    name: 'RegistrationAndDeclaration',
    meta: {
      title: '注册与申报',
      sys: 'CONTRACT',
      perm: ['registration_and_declaration']
    },
    component: LayOut,
    children: [
      {
        path: 'bargainManagementManufactureLowerPrice',
        name: 'bargainManagementManufactureLowerPrice',
        meta: {title: '企业主动降价', perm:['contract_saler_bargain_markdown']},
        component: r => require.ensure([], () => r(require('src/pages/contract/bargainmanagement/bargainquote/manufactureLowerPrice')),'contract')
      }
    ]
  },
  {
    path: '/CONTRACT/contractmanagement',
    name: 'ContractManagemenet',
    meta: {title: '合同管理', sys: 'CONTRACT', perm:['contract_management']},
    component: LayOut,
    children: [
      {
        path: 'factoryConsignmentAgreementA',
        name: 'factoryConsignmentAgreement',
        // meta:{title: '委托协议（甲方）', perm:['contract_saler_factory_agreement']},
        // meta:{title: '委托配送协议', perm:['contract_saler_factory_agreement']},
        meta:{title: '配送协议管理', perm:['contract_saler_factory_agreement']},
        component: r => require.ensure([], () => r(require('src/pages/contract/contractmanagement/conmaincontract/signEntrustmentAgreement-main')),'contract')
      },
      /*{
        path: 'senderConsignmentAgreementB',
        name: 'senderConsignmentAgreement',
        // meta:{title: '委托协议（乙方）', perm:['contract_saler_sender_agreement']},
        meta:{title: '配送委托协议', perm:['contract_saler_sender_agreement']},
        component: r => require.ensure([], () => r(require('src/pages/contract/contractmanagement/conmaincontract/signEntrustmentAgreement-main')),'contract')
      },*/
      {
        path: 'contractManagementContractMain',
        name: 'contractManagementContractMain',
        meta:{title:'购销合同管理', perm: ['contract_buyer_sender_contract_manage','second_contract_buyer_sender_contract_manage']},
        component: r => require.ensure([], () => r(require('src/pages/contract/contractmanagement/contractMain')),'contract')
      },
      {
        path: 'senderHospitalSelectSender',
        name: 'senderHospitalSelectSender',
        meta:{title: '医院选择配送', perm:['contract_buyer_select_sender']},
        component: r => require.ensure([], () => r(require('src/pages/contract/sender/hospitalSelectSender')),'contract')
      },
      {
        path: 'senderHospitalSelectProductSender',
        name: 'senderHospitalSelectProductSender',
        meta:{title: '医院选择产品配送', perm:['contract_buyer_select_product_sender']},
        component: r => require.ensure([], () => r(require('src/pages/contract/sender/hospitalSelectProductSender/hospitalSelectProductSender')),'contract')
      },
      {
        path: 'twoVoteManagementCommitmentSigned',
        name: 'twoVoteManagementCommitmentSigned',
        meta: {title: '两票制承诺书签订', perm:['contract_all_twovote_signed']},
        component: r => require.ensure([], () => r(require('src/pages/contract/twovotemanagement/commitmentSigned')),'contract')
      },
      {
        path: 'twoVoteManagementCommitmentPublicityTabs',
        name: 'twoVoteManagementCommitmentPublicityTabs',
        meta: {title: '两票制承诺书公示', perm:['contract_all_twovote_public']},
        component: r => require.ensure([], () => r(require('src/pages/contract/twovotemanagement/commitmentPublicityTabs')),'contract')
      },
      {
        path: 'selectDeliveryEnterprises',
        name: 'selectDeliveryEnterprises',
        // meta:{title: '选择配送企业', perm:['select_delivery_enterprises']},
        meta:{title: '申报选择配送', perm:['select_delivery_enterprises']},
        component: r => require.ensure([], () => r(require('src/pages/contract/sender/manufactureSelectSender/selectDeliveryEnterprises-main')),'contract')
      },



      {
        path: 'contractManagementContractSignature-Tabs',
        name: 'contractManagementContractSignature-Tabs',
        meta:{title:'合同签章', perm: ['contract_admin_contract_signature']},
        component: r => require.ensure([], () => r(require('src/pages/contract/contractmanagement/contractsignature/contractSignature-Tabs')),'contract')
      },
      {
        path: 'contractManagementContractTemplateType',
        name: 'contractManagementContractTemplateType',
        meta:{title:'模板类型', perm:['contract_admin_template_type']},
        component: r => require.ensure([], () => r(require('src/pages/contract/contractmanagement/contracttemplatetype/contractTemplateType')),'contract')
      },
      {
        path: 'contractManagementContractTemplate',
        name: 'contractManagementContractTemplate',
        meta:{title: '合同模板', perm:['contract_admin_contract_template']},
        component: r => require.ensure([], () => r(require('src/pages/contract/contractmanagement/httemplate/contractTemplate')),'contract')
      },
      /*{
        path: 'contractManagementUpdateTemplate/:id',
        name: 'contractManagementUpdateTemplate',
        meta:{title: '合同模板编辑', hidden: true, perm:['contract_management_update_template']},
        component: r => require.ensure([], () => r(require('src/pages/contract/contractmanagement/httemplate/updTemplate')),'contract
)      },*/
      {
        path: 'contractManagementSelectTemplate',
        name: 'contractManagementSelectTemplate',
        meta:{title: '选择合同模板', perm:['contract_admin_select_template']},
        component: r => require.ensure([], () => r(require('src/pages/contract/contractmanagement/httemplate/selectTemplate')),'contract')
      },
      {
        path: 'contractManagementContractMainSender',
        name: 'contractManagementContractMainSender',
        meta:{title:'合同管理', perm: ['contract_management_contract_main_sender','second_contract_management_contract_main_sender']},
        component: r => require.ensure([], () => r(require('src/pages/contract/contractmanagement/contractMain')),'contract')
      },
      {
        path: 'twoVoteManagement',
        name: 'twoVoteManagement',
        meta:{title: '两票制承诺书', perm:['two_vote_management']},
        component: r => require.ensure([], () => r(require('src/pages/contract/contractmanagement/conmaincontract/twoVoteManagement-main')),'contract')
      },
      {
        path: 'conMainContractLog/:contractId/:partyCode',
        name: 'conMainContractLog',
        meta:{title: '合同变更记录', perm:['contract_saler_factory_agreement_log', 'contract_saler_sender_agreement_log'], hidden: true},
        component: r => require.ensure([], () => r(require('src/pages/contract/contractmanagement/conmaincontract/conMainContractlog')),'contract')
      },
      {
        path: 'manageSendRegionList',
        name: 'manageSendRegionList',
        meta:{title: '配送区域管理', hidden: true, perm:['contract_sender_sendregion']},
        //component: r => require.ensure([], () => r(require('src/pages/contract/sender/sendRegionList/sendRegionList')),'contract
        component: r => require.ensure([], () => r(require('src/pages/contract/sender/sendRegionList/manageSendRegionList')),'contract')
      },
      {
        path: 'senderSendRegionList',
        name: 'senderSendRegionList',
        meta:{title: '配送区域管理--新增区域页面',hidden: true, perm:['sender_send_region_list']},
        component: r => require.ensure([], () => r(require('src/pages/contract/sender/sendRegionList/sendRegionList')),'contract')
      },
      /*{
        path: 'senderManufactureSelectSender',
        name: 'senderManufactureSelectSender',
        meta:{title: '生产企业选择配送', perm:['contract_saler_select_sender']},
        component: r => require.ensure([], () => r(require('src/pages/contract/sender/manufactureSelectSender/manufactureSelectSender')),'contract')
      },*/
      {
        path: 'factoryChooseSender/:productId',
        name: 'factoryChooseSender',
        meta:{title: '生产企业选择配送--选择配送页面',hidden: true,perm:['factory_choose_sender']},
        component: r => require.ensure([], () => r(require('src/pages/contract/sender/manufactureSelectSender/factoryChooseSender')),'contract')
      },
      {
        path: 'senderShowAllSender',
        name: 'senderShowAllSender',
        meta:{title: '查看全部配送企业', hidden: true, perm:['sender_show_all_sender']},
        component: r => require.ensure([], () => r(require('src/pages/contract/sender/manufactureSelectSender/showAllSender')),'contract')
      },
      {
        path: 'senderHospitalSenderContract',
        name: 'senderHospitalSenderContract',
        meta:{title: '医院配送合同', perm:['contract_buyer_sender_contractList']},
        component: r => require.ensure([], () => r(require('src/pages/contract/sender/hospitalSenderContract')),'contract')
      },
      /*{
        path: 'senderDistributionEnterprise',
        name: 'senderDistributionEnterprise',
        meta:{title: '配送企业查看', perm:['contract_saler_senderlist']},
        component: r => require.ensure([], () => r(require('src/pages/contract/sender/distributionEnterprise/DistributionEnterprise')),'contract')
      },*/
      {
        path: 'bargainManagementBargainQuote',
        name: 'bargainManagementBargainQuote',
        // meta: {title: '议价报价', perm:['contract_saler_bargain_quote']},
        meta: {title: '议价管理', perm:['contract_saler_bargain_quote']},
        component: r => require.ensure([], () => r(require('src/pages/contract/bargainmanagement/bargainquote/bargainQuote')),'contract')
      },
      /*,
      {
        path: 'senderForHospitalList',
        name: 'senderForHospitalList',
        meta:{title: '医院配送列表', perm:['contract_hos_senderlist']},
        component: r => require.ensure([], () => r(require('src/pages/contract/sender/senderforhospitallist/senderForHospitalList')),'contract')
      }*/
    ]
  },
  /*{
    path: '/CONTRACT/bargainmanagement',
    name: 'BargainManagement',
    meta: {
      title: '价格管理',
      sys: 'CONTRACT',
      perm:['bargain_management']
    },
    component: LayOut,
    children: [
      /!*{
        path: 'bargainManagementBargainQuoteLive',
        name: 'bargainManagementBargainQuoteLive',
        meta: {title: '议价报价直播'},
        component: r => require.ensure([], () => r(require('src/pages/contract/bargainmanagement/bargainquote/bargainQuoteLive')),'contract
)      },*!/
      /!* {
         path: 'bargainManagementSubjectPriceList',
         name: 'bargainManagementSubjectPriceList',
         meta: {title: '主体议价目录'},
         component: r => require.ensure([], () => r(require('src/pages/contract/bargainmanagement/objbargain/subjectPriceList')),'contract
 )      },*!/
      /!*{
        path: 'bargainManagementCreatBargainingBody',
        name: 'bargainManagementCreatBargainingBody',
        meta: {title: '创建议价主体'},
        component: r => require.ensure([], () => r(require('src/pages/contract/bargainmanagement/createbargainingbody/creatBargainingBody')),'contract
)      },*!/
      {
        path: 'bargainManagementMaintainBargainList',
        name: 'bargainManagementMaintainBargainList',
        // meta: {title: '维护议价目录', perm:['contract_buyer_bargainitem']},
        meta: {title: '议价管理', perm:['contract_buyer_bargainitem']},
        component: r => require.ensure([], () => r(require('src/pages/contract/bargainmanagement/maintainBargain/bargainList')),'contract')
      },
      {
        path: 'bargainManagementBargainResult',
        name: 'bargainManagementBargainResult',
        meta: {title: '议价结果公示', perm:['contract_all_bargain_result_public']},
        component: r => require.ensure([], () => r(require('src/pages/contract/bargainmanagement/bargainquote/bargainResult')),'contract')
      },
      {
        path: 'bargainManagementManufacturePriceConfirmation',
        name: 'bargainManagementManufacturePriceConfirmation',
        meta: {title: '企业主动降价', perm:['contract_buyer_markdown_confirm']},
        component: r => require.ensure([], () => r(require('src/pages/contract/bargainmanagement/bargainquote/manufacturePriceConfirmationList')),'contract')
      },
      /!*{
        path: 'bargainManagementHospitalPriceConfirmation',
        name: 'bargainManagementHospitalPriceConfirmation',
        meta: {title: '医院议价价格确认'},
        component: r => require.ensure([], () => r(require('src/pages/contract/bargainmanagement/bargainquote/hospitalPriceConfirmation')),'contract
)      },*!/
      /!*{
        path: 'bargainManagementBargainQuote',
        name: 'bargainManagementBargainQuote',
        meta: {title: '议价报价', perm:['contract_saler_bargain_quote']},
        component: r => require.ensure([], () => r(require('src/pages/contract/bargainmanagement/bargainquote/bargainQuote')),'contract')
      },*!/
      /!*{
        path: 'bargainManagementManufactureLowerPrice',
        name: 'bargainManagementManufactureLowerPrice',
        meta: {title: '企业发起主动降价', perm:['contract_saler_bargain_markdown']},
        component: r => require.ensure([], () => r(require('src/pages/contract/bargainmanagement/bargainquote/manufactureLowerPrice')),'contract')
      },*!/
      /!*{
        path: 'bargainManagementAddProductPriceReduction',
        name: 'bargainManagementAddProductPriceReduction',
        meta: {title: '新增产品降价更新',hidden: true,perm:['contract_add_product_price_reduction']},
        component: r => require.ensure([], () => r(require('src/pages/contract/bargainmanagement/bargainquote/addProductPriceReduction')),'contract')
      }*!/
    ]
  },*/
  {
    path: '/CONTRACT/datamanagement',
    name: 'DataManagement',
    meta: {
      // title: '数据维护',
      title: '信息维护',
      sys: 'CONTRACT',
      perm:['data_management']
    },
    component: LayOut,
    children: [
      {
        path: 'hospitalDeliveryAddressList/:type',
        name: 'hospitalDeliveryAddressList',
        meta:{title: '医院收货地址维护',perm:['contract_buyer_CatDeliveryAddress']},
        component: r => require.ensure([], () => r(require('src/pages/contract/datamanagement/hospital/deliveryAddressMaintenanceList')),'contract')
      },
      {
        path: 'hospitalDeliveryAddress',
        name: 'hospitalDeliveryAddress',
        meta:{title: '医院收货地址编辑', hidden: true, perm:['hospital_delivery_address']},
        component: r => require.ensure([], () => r(require('src/pages/contract/datamanagement/hospital/deliveryAddress')),'contract')
      },
      {
        path: 'hospitalAddressList/:id',
        name: 'hospitalAddressList',
        meta:{title: '下级机构收货地址维护', hidden: true, perm:['hospital_address_list']},
        component: r => require.ensure([], () => r(require('src/pages/contract/datamanagement/hospital/hospitalAddressList')),'contract')
      },
      {
        path: 'dataManagementSysRuleList',
        name: 'dataManagementSysRuleList',
        meta:{title: '规则字典维护', perm: ['contract_admin_queryRuleList']},
        component: r => require.ensure([], () => r(require('src/pages/contract/datamanagement/rule/sysRuleList')),'contract')
      },
      {
        path: 'dataManagementUpdSysRule/:id',
        name: 'dataManagementUpdSysRule',
        meta:{title: '字典维护', hidden: true, perm:['data_management_upd_sys_rule']},
        component: r => require.ensure([], () => r(require('src/pages/contract/datamanagement/rule/updSysRule')),'contract')
      },
      {
        path: 'hospitalReceivingAddressList',
        name: 'hospitalReceivingAddressList',
        meta:{title: '医院收货地址', perm:['contract_sender_buyeraddress']},
        component: r => require.ensure([], () => r(require('src/pages/contract/datamanagement/hospital/HospitalReceivingAddressList')),'contract')
      }
    ]
  },
  // {
  //   path: '/CONTRACT/sender',
  //   name: 'Sender',
  //   meta: {
  //     title: '配送管理',
  //     sys: 'CONTRACT'
  //   },
  //   component: LayOut,
  //   children: [
  //
  //   ]
  // },
  /*{
    path: '/CONTRACT/bidmanagement',
    name: 'BidManagement',
    meta: {
      title: '报价管理',
      sys: 'CONTRACT',
      perm:['bid_management']
    },
    component: LayOut,
    children: [
      {
        path: 'bidManagementQuotationPublicity',
        name: 'bidManagementQuotationPublicity',
        meta: {title: '报价公示', perm:['contract_all_quotation_publicity']},
        component: r => require.ensure([], () => r(require('src/pages/contract/bidmanagement/quotationPublicity')),'contract')
      }

    ]
  }*/
]
