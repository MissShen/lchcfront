const LayOut = r => require.ensure([], () => r(require('@/components/LayOut')),'base')
const LayDetail = r => require.ensure([], () => r(require('@/components/LayDetail')),'base')

export const dataCenterRouterMap = [
  {

    //基础数据
    path: '/DATA/basedata',
    name: 'basedata',
    meta: {title: '基础数据', sys: 'DATA', perm: ['datacenter_basedata']},
    component: LayOut,
    children: [

      //区域编码表
      {
        path: 'region',
        name: 'region',
        meta: {title: '区域编码表',perm:['datacenter_basedata_region']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/basedata/region/index')),'data')
      },

      //剂型定义表
      {
        path: 'doseageform',
        name: 'doseage_index',
        meta: {title: '剂型列表',perm:['datacenter_basedata_doseage']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/basedata/doseageform/index')),'data')
      },

      //计量单位代码表
      {
        path: 'measurementunit',
        name: 'unit_index',
        meta: {title: '计量单位代码表',perm:['basedata_measurementunit']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/basedata/measurementunit/index')),'data')
      },

      //特殊包装材质
      {
        path: 'wrap',
        name: 'wrap_index',
        meta: {title: '特殊包装材质',perm:['datacenter_basedata_wrap']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/basedata/wrap/index')),'data')
      },

      //盐类衍生物
      {
        path: 'salt',
        name: 'salt_index',
        meta: {title: '盐类衍生物',perm:['datacenter_basedata_salt']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/basedata/salt/index')),'data')
      },


      //========================点击按钮，跳转的页面，不显示在菜单中==start======================
      //区域编码表-国家编码列表-新增
      {
        path: 'country/add',
        name: 'country_add',
        meta: {title: '国家编码列表-新增', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/basedata/region/country/add')),'data')
      },
      //区域编码表-国家编码列表-查看
      {
        path: 'country/info/:id',
        name: 'country_info',
        meta: {title: '国家编码列表-查看', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/basedata/region/country/info')),'data')
      },
      //区域编码表-国家编码列表-编辑
      {
        path: 'country/edit/:id',
        name: 'country_edit',
        meta: {title: '国家编码列表-编辑', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/basedata/region/country/edit')),'data')
      },

      //区域编码表-省、自治区、直辖市编码列表-新增
      {
        path: 'province/add',
        name: 'province_add',
        meta: {title: '省、自治区、直辖市编码列表', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/basedata/region/province/add')),'data')
      },
      //区域编码表-省、自治区、直辖市编码列表-查看
      {
        path: 'province/info/:id',
        name: 'province_info',
        meta: {title: '省、自治区、直辖市编码列表', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/basedata/region/province/info')),'data')
      },
      //区域编码表-省、自治区、直辖市编码列表-新增
      {
        path: 'province/edit/:id',
        name: 'province_edit',
        meta: {title: '省、自治区、直辖市编码列表', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/basedata/region/province/edit')),'data')
      },

      //区域编码表-市(地)编码列表-新增
      {
        path: 'city/add',
        name: 'city_add',
        meta: {title: '市(地)编码列表', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/basedata/region/city/add')),'data')
      },
      //区域编码表-市(地)编码列表-查看
      {
        path: 'city/info/:id',
        name: 'city_info',
        meta: {title: '市(地)编码列表', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/basedata/region/city/info')),'data')
      },
      //区域编码表-市(地)编码列表-编辑
      {
        path: 'city/edit/:id',
        name: 'city_edit',
        meta: {title: '市(地)编码列表', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/basedata/region/city/edit')),'data')
      },

      //区域编码表-县、县市编码列表-新增
      {
        path: 'county/add',
        name: 'county_add',
        meta: {title: '县、县市编码列表', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/basedata/region/county/add')),'data')
      },
      //区域编码表-县、县市编码列表-查看
      {
        path: 'county/info/:id',
        name: 'county_info',
        meta: {title: '县、县市编码列表', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/basedata/region/county/info')),'data')
      },
      //区域编码表-县、县市编码列表-编辑
      {
        path: 'county/edit/:id',
        name: 'county_edit',
        meta: {title: '县、县市编码列表', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/basedata/region/county/edit')),'data')
      },

      //剂型定义表-新增
      {
        path: 'doseageform/add',
        name: 'doseage_add',
        meta: {title: '剂型列表', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/basedata/doseageform/add')),'data')
      },
      //剂型定义表-查看
      {
        path: 'doseageform/info/:code',
        name: 'doseage_info',
        meta: {title: '剂型列表', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/basedata/doseageform/info')),'data')
      },
      //剂型定义表-编辑
      {
        path: 'doseageform/edit/:code',
        name: 'doseage_edit',
        meta: {title: '剂型列表', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/basedata/doseageform/edit')),'data')
      },

      //计量单位代码表-新增
      {
        path: 'measurementunit/add',
        name: 'unit_add',
        meta: {title: '计量单位代码表', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/basedata/measurementunit/add')),'data')
      },
      //计量单位代码表-修改
      {
        path: 'measurementunit/update/:id',
        name: 'unit_edit',
        meta: {title: '计量单位代码表', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/basedata/measurementunit/update')),'data')
      },
      //计量单位代码表-查看
      {
        path: 'measurementunit/info/:id',
        name: 'unit_info',
        meta: {title: '计量单位代码表', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/basedata/measurementunit/info')),'data')
      },

      //特殊包装材质-新增
      {
        path: 'wrap/add',
        name: 'wrap_add',
        meta: {title: '特殊包装材质', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/basedata/wrap/add')),'data')
      },
      //特殊包装材质-查看
      {
        path: 'wrap/info/:code',
        name: 'wrap_info',
        meta: {title: '特殊包装材质', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/basedata/wrap/info')),'data')
      },
      //特殊包装材质-修改
      {
        path: 'wrap/edit/:code',
        name: 'wrap_edit',
        meta: {title: '特殊包装材质', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/basedata/wrap/edit')),'data')
      },

      //盐类衍生物-添加
      {
        path: 'salt/add',
        name: 'salt_add',
        meta: {title: '盐类衍生物', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/basedata/salt/add')),'data')
      },
      //盐类衍生物-查看
      {
        path: 'salt/info/:code',
        name: 'salt_info',
        meta: {title: '盐类衍生物', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/basedata/salt/info')),'data')
      },
      //盐类衍生物-修改
      {
        path: 'salt/update/:code',
        name: 'salt_update',
        meta: {title: '盐类衍生物', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/basedata/salt/update')),'data')
      },
      //卖方机构-卖方机构-查看
      {
        path: 'orgdata/sellInfo/:id',
        name: 'sell_info',
        meta: {title: '卖方机构', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/orgdata/sellorg/sell/info')),'data')
      },
      //卖方机构-卖方机构-新增
      {
        path: 'orgdata/sellAdd',
        name: 'sell_add',
        meta: {title: '卖方机构', hidden: true,perm:['none']},
        component: () => import ('src/pages/datacenter/orgdata/sellorg/sell/add')
      },

      //买方机构-买方机构-查看
      {
        path: 'orgdata/buyerorg/buyer/info/:id',
        name: 'buyer_info',
        meta: {title: '买方机构-查看', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/orgdata/buyerorg/buyer/info')),'data')
      },

      //零售企业(零售药店)-零售企业(零售药店)-查看
      {
        path: 'orgdata/retailorg/retail/info/:id',
        name: 'retail_info',
        meta: {title: '零售企业(零售药店)', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/orgdata/retailorg/retail/info')),'data')
      },

      //零售企业(零售药店)-零售企业(零售药店)回收站
      {
        path: 'orgdata/retailorg/retailRecycle',
        name: 'retailrecycle',
        meta: {title: '零售企业(零售药店)回收站', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/orgdata/retailorg/retailRecycle')),'data')
      },

      //药品信息-查看
      {
        path: 'drugsInfo/tableDetail/:id',
        name: 'drugsDataTableDetail',
        meta: {title: '查看药品信息', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/drugsdata/drugsinfo/info/tableDetail')),'data')
      },
      //药品信息-新增、修改、复制
      {
        path: 'drugsInfos/:type/:id',
        name: 'drugsDataInsertForm',
        meta: {title: '新增药品信息', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/drugsdata/drugsinfo/info/insertForm')),'data')
      },
      // //药品信息-修改
      // {
      //   path: 'drugsdata/drugsInfo/updateForm',
      //   name: 'drugsDataUpdateForm',
      //   meta: {title: '新增药品信息', hidden: true},
      //   component: r => require.ensure([], () => r(require('src/pages/datacenter/drugsdata/drugsinfo/info/updateForm')),'data
      // },
      // //药品信息-复制
      // {
      //   path: 'drugsdata/drugsInfo/copyForm',
      //   name: 'drugsDataCopyForm',
      //   meta: {title: '复制药品信息', hidden: true},
      //   component: r => require.ensure([], () => r(require('src/pages/datacenter/drugsdata/drugsinfo/info/copyForm')),'data
      // },
      //药品回收站-查看
      {
        path: 'drugsdata/recovery/tableDetail',
        name: 'recoveryStationTableDetail',
        meta: {title: '查看药品回收站', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/drugsdata/drugsinfo/recovery/tableDetail')),'data')
      },
      //药品回收站-修改
      {
        path: 'drugsdata/recovery/updateForm',
        name: 'recoveryStationUpdateForm',
        meta: {title: '修改药品回收站', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/drugsdata/drugsinfo/recovery/updateForm')),'data')
      },

      //药品ATC列表-新增
      {
        path: 'atccode/insertForm',
        name: 'atcCodeInsertForm',
        meta: {title: '新增ATC编码分类系统', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/drugsdata/atccode/insertForm')),'data')
      },

      //药品ATC列表-查看
      {
        path: 'atccode/tableDetail/:id',
        name: 'atcCodeTableDetail',
        meta: {title: '新增ATC编码分类系统', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/drugsdata/atccode/tableDetail')),'data')
      },

      //药品ATC列表-修改
      {
        path: 'atccode/updateForm/:id',
        name: 'atcCodeUpdateTable',
        meta: {title: '新增ATC编码分类系统', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/drugsdata/atccode/updateForm')),'data')
      },

      //新编药学分类-查看
      {
        path: 'newDrug/tableDetail/:id',
        name: 'newDrugTableDetail',
        meta: {title: '查看新编药学', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/drugsdata/newdrug/tableDetail')),'data')
      },
      //新编药学分类-新增
      {
        path: 'newDrug/insertForm',
        name: 'newDrugInsertForm',
        meta: {title: '新增新编药学', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/drugsdata/newdrug/insertForm')),'data')
      },
      //新编药学分类-修改
      {
        path: 'newDrug/updateForm/:id',
        name: 'newDrugUpdateForm',
        meta: {title: '修改新编药学', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/drugsdata/newdrug/updateForm')),'data')
      },

      //药品异名信息-查看
      {
        path: 'synonym/tableDetail/:id',
        name: 'synonymTableDetail',
        meta: {title: '查看药品异名信息', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/drugsdata/synonym/tableDetail')),'data')
      },
      //药品异名信息-新增
      {
        path: 'synonym/insertForm',
        name: 'synonymInsertForm',
        meta: {title: '新增药品异名信息', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/drugsdata/synonym/insertForm')),'data')
      },
      //药品异名信息-修改
      {
        path: 'synonym/updateForm/:id',
        name: 'synonymUpdateForm',
        meta: {title: '修改药品异名信息', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/drugsdata/synonym/updateForm')),'data')
      },

      //产品信息-查看
      {
        path: 'productdata/productDetail/tableDetail/:id',
        name: 'productTableDetail',
        meta: {title: '查看产品信息', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/productdata/product/detail/tableDetail')),'data')
      },
      //产品回收站-查看
      {
        path: 'productdata/productRecover/tableDetail/:id',
        name: 'productRecoverTableDetail',
        meta: {title: '查看产品回收列表', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/productdata/product/recover/tableDetail')),'data')
      },

      //特殊标记维护-查看
      {
        path: 'productdata/specialmaintain/specilMarks/:id',
            name: 'productSpecialMarksDetail',
          meta: {title: '查看产品特殊标记列表', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/productdata/specialmaintain/specialMarksList')),'data')
      },
      //基本医疗保险药品-查看
      {
        path: 'authdata/medicalInsurance/tableDetail/:id',
        name: 'medicalInsuranceDetail',
        meta: {title: '医疗保险详情页面', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/authdata/medicalinsurance/tableDetail')),'data')
      },
      //基本医疗保险药品-新增
      {
        path: 'authdata/medicalInsurance/insertForm',
        name: 'medicalInsuranceInsert',
        meta: {title: '医疗保险新增页面', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/authdata/medicalinsurance/insertForm')),'data')
      },
      //基本医疗保险药品-修改
      {
        path: 'authdata/medicalInsurance/updateForm/:id',
        name: 'medicalInsuranceUpdate',
        meta: {title: '医疗保险修改页面', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/authdata/medicalinsurance/updateForm')),'data')
      },
      //基本医疗保险药品-复制
      {
        path: 'authdata/medicalInsurance/copyForm/:id',
        name: 'medicalInsuranceCopy',
        meta: {title: '医疗保险复制页面', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/authdata/medicalinsurance/copyForm')),'data')
      },
      //剂型打包维护-修改
      {
        path: 'authdata/dosPackageUpdate/:id',
        name: 'dosageFormPackageUpdate',
        meta: {title: '修改剂型打包维护', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/authdata/medicalinsurance/dosPackageUpdate')),'data')
      },
      //修改剂型打包维护-新增
      {
        path: 'authdata/dosPackageInsert',
        name: 'dosageFormPackageInsert',
        meta: {title: '新增剂型打包维护', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/authdata/medicalinsurance/dosPackageInsert')),'data')
      },

      // 国家基础药物列表-查看
      {
        path: 'authdata/baseDrugs/tableDetail/:id',
        name: 'baseDrugsTableDetail',
        meta: {title: '查看国家基础药物', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/authdata/basedrugs/tableDetail')),'data')
      },
      // 国家基础药物列表-新增
      {
        path: 'authdata/baseDrugs/insertForm',
        name: 'baseDrugsInsertForm',
        meta: {title: '新增国家基础药物', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/authdata/basedrugs/insertForm')),'data')
      },
      // 国家基础药物列表-修改
      {
        path: 'authdata/baseDrugs/updateForm/:id',
        name: 'baseDrugsUpdateForm',
        meta: {title: '修改国家基础药物', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/authdata/basedrugs/updateForm')),'data')
      },

      //OTC药品-查看
      {
        path: 'authdata/otcDrugs/tableDetail/:id',
        name: 'otcDrugsTableDetail',
        meta: {title: '查看OTC药品列表', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/authdata/otcdrugs/tableDetail')),'data')
      },
      //OTC药品-新增
      {
        path: 'authdata/otcDrugs/insertForm',
        name: 'otcDrugsInsertForm',
        meta: {title: '新增OTC药品', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/authdata/otcdrugs/insertForm')),'data')
      },
      //OTC药品-修改
      {
        path: 'authdata/otcDrugs/updateForm/:id',
        name: 'otcDrugsUpdateForm',
        meta: {title: '修改OTC药品', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/authdata/otcdrugs/updateForm')),'data')
      },
      //OTC药品-公告信息
      {
        path: 'authdata/otcDrugs/bulletinInfo/:id',
        name: 'otcDrugsBulletinInfo',
        meta: {title: '公告信息', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/authdata/otcdrugs/bulletinInfo')),'data')
      },

      //药品质量公告-查看
      {
        path: 'authdata/qualityBulletin/tableDetail/:id',
        name: 'qualityBulletinTableDetail',
        meta: {title: '查看药品质量公告', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/authdata/qualityBulletin/bulletin/tableDetail')),'data')
      },
      //药品质量公告-新增
      {
        path: 'authdata/qualityBulletin/insertForm',
        name: 'qualityBulletinInsertForm',
        meta: {title: '新增药品质量公告', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/authdata/qualityBulletin/bulletin/insertForm')),'data')
      },
      //药品质量公告-修改
      {
        path: 'authdata/qualityBulletin/updateForm/:id',
        name: 'qualityBulletinUpdateForm',
        meta: {title: '修改药品质量公告', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/authdata/qualityBulletin/bulletin/updateForm')),'data')
      },
      //药品质量公告-公告信息
      {
        path: 'authdata/qualityBulletin/bulletinForm/:id',
        name: 'qualityBulletinBulletinForm',
        meta: {title: '药品质量公告信息', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/authdata/qualityBulletin/bulletin/bulletinForm')),'data')
      },

      //全国价格库-查看
      {
        path: 'authdata/nationalPriceBank/projectPanel/:id',
        name: 'nationalPriceBankProjectPanel',
        meta: {title: '查看全国价格库', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/authdata/nationalpricebank/projectPanel')),'data')
      },

      //假药记录-查看
      {
        path: 'authdata/fakeDrug/tableDetail/:id',
        name: 'fakeDrugRecordTableDetail',
        meta: {title: '查看假药记录', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/authdata/qualityBulletin/fakeDrug/tableDetail')),'data')
      },
      //假药记录-新增
      {
        path: 'authdata/fakeDrug/insertForm',
        name: 'fakeDrugRecordInsertForm',
        meta: {title: '新增假药记录', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/authdata/qualityBulletin/fakeDrug/insertForm')),'data')
      },
      //假药记录-修改
      {
        path: 'authdata/fakeDrug/updateForm/:id',
        name: 'fakeDrugRecordUpdateForm',
        meta: {title: '修改假药记录', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/authdata/qualityBulletin/fakeDrug/updateForm')),'data')
      },
      //假药记录-公告信息
      {
        path: 'authdata/fakeDrug/bulletinForm/:id',
        name: 'fakeDrugRecordBulletinForm',
        meta: {title: '假药记录公告', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/authdata/qualityBulletin/fakeDrug/bulletinForm')),'data')
      },

      //中药保护品种-查看
      {
        path: 'authdata/cnpvDrugs/tableDetail/:id',
        name: 'cnpvDrugsTableDetail',
        meta: {title: '查看中药保护品种', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/authdata/cnpvDrugs/tableDetail')),'data')
      },
      //中药保护品种-新增
      {
        path: 'authdata/cnpvDrugs/insertForm',
        name: 'cnpvDrugsInsertForm',
        meta: {title: '新增中药保护品种', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/authdata/cnpvDrugs/insertForm')),'data')
      },
      //中药保护品种-修改
      {
        path: 'authdata/cnpvDrugs/updateForm/:id',
        name: 'cnpvDrugsUpdateForm',
        meta: {title: '修改中药保护品种', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/authdata/cnpvDrugs/updateForm')),'data')
      },

      //行政保护列表-查看
      {
        path: 'authdata/administration/tableDetail/:id',
        name: 'administrationTableDetail',
        meta: {title: '查看行政保护', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/authdata/administration/tableDetail')),'data')
      },
      //行政保护列表-新增
      {
        path: 'authdata/administration/insertForm',
        name: 'administrationInsertForm',
        meta: {title: '新增行政保护', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/authdata/administration/insertForm')),'data')
      },
      //行政保护列表-修改
      {
        path: 'authdata/administration/updateForm/:id',
        name: 'administrationUpdateForm',
        meta: {title: '修改行政保护', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/authdata/administration/updateForm')),'data')
      },

      //药品说明书-查看
      {
        path: 'knowledgebase/drupInstruct/tableDetail/:id',
        name: 'InstructTableDetail',
        meta: {title: '查看药品说明书', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/knowledgebase/drupInstruct/tableDetail')),'data')
      },
      //药品说明书-新增
      {
        path: 'knowledgebase/drupInstruct/insertForm',
        name: 'InstructInsertForm',
        meta: {title: '新增药品说明书', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/knowledgebase/drupInstruct/insertForm')),'data')
      },
      //药品说明书-修改
      {
        path: 'knowledgebase/drupInstruct/updateForm/:id',
        name: 'InstructUpdateForm',
        meta: {title: '修改药品说明书', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/knowledgebase/drupInstruct/updateForm')),'data')
      },
      //药品说明书-复制
      {
        path: 'knowledgebase/drupInstruct/copyForm/:id',
        name: 'InstructCopyForm',
        meta: {title: '复制药品说明书', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/knowledgebase/drupInstruct/copyForm')),'data')
      },

      //处方集列表
      {
        path: 'knowledgebase/prescriptSets/mainTable',
        name: 'prescriptSetsMainTable',
        meta: {title: '处方集列表', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/knowledgebase/prescriptSets/mainTable')),'data')
      },
      //处方集列表-新增
      {
        path: 'knowledgebase/prescriptSets/insertForm',
        name: 'prescriptSetsInsertForm',
        meta: {title: '新增处方集', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/knowledgebase/prescriptSets/insertForm')),'data')
      },
      //处方集列表-修改
      {
        path: 'knowledgebase/prescriptSets/updateForm/:id',
        name: 'prescriptSetsUpdateForm',
        meta: {title: '修改处方集', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/knowledgebase/prescriptSets/updateForm')),'data')
      },
      //处方集列表-查看
      {
        path: 'knowledgebase/prescriptSets/tableDetail/:id',
        name: 'prescriptSetsTableDetail',
        meta: {title: '查看处方集', hidden: true,perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/knowledgebase/prescriptSets/tableDetail')),'data')
      }
      //========================点击按钮，跳转的页面，不显示在菜单中===end======================

    ],
  },

  {
    //机构数据
    path: '/DATA/orgdata',
    name: 'orgdata',
    meta: {title: '机构数据', sys: 'DATA', perm: ['datacenter_orgdata']},
    component: LayOut,
    children: [
      //卖方机构
      {
        path: 'sellorg/:standard',
        name: 'sell_index',
        meta: {title: '卖方机构',perm:['datacenter_orgdata_sellorg']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/orgdata/sellorg/index')),'data')
      },

      //买方机构
      {
        path: 'buyerorg',
        name: 'buyer_index',
        meta: {title: '买方机构',perm:['datacenter_orgdata_buyerorg']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/orgdata/buyerorg/index')),'data')
      },

      //零售企业(零售药店)
      {
        path: 'retailorg',
        name: 'retail_index',
        meta: {title: '零售企业(零售药店)',perm:['datacenter_orgdata_retailorg']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/orgdata/retailorg/index')),'data')
      },

    ]
  },

  {
    //药品数据
    path: '/DATA/drugsdata',
    name: 'drugsdata',
    meta: {title: '药品数据', sys: 'DATA', perm: ['data:center:auth']},
    component: LayOut,
    children: [

      //药品信息
      {
        path: 'drugsInfo',
        name: 'drugsInfo_table',
        meta: {title: '药品信息',perm:['datacenter_drugsdata_drugsInfo']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/drugsdata/drugsinfo/index')),'data')
      },

      //药品标准分类
      {
        path: 'benchmark',
        name: 'drugsDataBenchmark',
        meta: {title: '药品标准分类',perm:['datacenter_drugsdata_benchmark']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/drugsdata/benchmark/mainTable')),'data')
      },

      //ATC编码分类系统
      {
        path: 'atccode',
        name: 'atcCode',
        meta: {title: '药品ATC分类',perm:['datacenter_drugsdata_atccode']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/drugsdata/atccode/index')),'data')
      },

      //新编药学分类(十七版)
      {
        path: 'newdrugclassify',
        name: 'newDrug_classify',
        meta: {title: '新编药学分类',perm:['datacenter_drugsdata_newdrugclassify']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/drugsdata/newdrug/index')),'data')
      },

      //药品异名信息
      {
        path: 'synonym/:code/:flag',
        name: 'synonymMainTable',
        meta: {title: '药品异名信息',perm:['datacenter_drugsdata_synonym']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/drugsdata/synonym/mainTable')),'data')
      },
    ]
  },

  {
    //产品数据
    path: '/DATA/productdata',
    name: 'productdata',
    meta: {title: '产品数据', sys: 'DATA', perm: ['datacenter_productdata']},
    component: LayOut,
    children: [
      //产品信息
      {
        path: 'productInfo/:standard',
        name: 'productInfo',
        meta: {title: '产品信息列表',perm:['datacenter_productdata_productinfo']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/productdata/product/index')),'data')
      },
      //产品黄页列表
      {
        path: 'yellowPage',
        name: 'yellowPage',
        meta: {title: '产品黄页列表',perm:['datacenter_productdata_yellowPage']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/productdata/yellowPage')),'data')
      },
      //特殊标记维护列表
      {
        path: 'specialMaintain',
            name: 'specialMaintain',
           meta: {title: '特殊标记维护列表',perm:['datacenter_productdata_special']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/productdata/specialmaintain/mainTable')),'data')
      }
    ]

  },

  {
    //认证数据
    path: '/DATA/authdata',
    name: 'authdata',
    meta: {title: '认证数据', sys: 'DATA', perm: ['datacenter_authdata']},
    component: LayOut,
    children: [

      //基本医疗保险药品
      {
        path: 'baseMedicalInsuranceDrugs',
        name: 'baseMedicalInsuranceDrugs',
        meta: {title: '基本医疗保险药品',perm:['datacenter_authdata_baseMedicalInsuranceDrugs']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/authdata/medicalinsurance/index')),'data')
      },

      //国家基本药物
      {
        path: 'countryBaseDrugs',
        name: 'baseDrugs',
        meta: {title: '国家基础药物列表',perm:['datacenter_authdata_countryBaseDrugs']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/authdata/basedrugs/mainTable')),'data')
      },

      //OTC药品
      {
        path: 'otcDrugs',
        name: 'otcDrugs',
        meta: {title: 'OTC药品列表',perm:['datacenter_authdata_otcDrugs']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/authdata/otcdrugs/mainTable')),'data')
      },

      //药品质量公告
      {
        path: 'qualityBulletin',
        name: 'qualityBulletin',
        meta: {title: '药品质量公告列表',perm:['datacenter_authdata_qualityBulletin']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/authdata/qualityBulletin/index')),'data')
      },

      //全国价格库列表
      {
        path: 'nationalPriceBank',
        name: 'nationalPriceBank',
        meta: {title: '全国价格库列表',perm:['datacenter_authdata_nationalPriceBank']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/authdata/nationalpricebank/mainPanel')),'data')
      },

      //中药保护品种
      {
        path: 'cnpvDrugs',
        name: 'cnpvDrugs',
        meta: {title: '中药保护品种',perm:['datacenter_authdata_cnpvDrugs']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/authdata/cnpvDrugs/mainTable')),'data')
      },

      //行政保护列表
      {
        path: 'administration',
        name: 'administration',
        meta: {title: '行政保护列表',perm:['datacenter_authdata_administration']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/authdata/administration/mainTable')),'data')
      },
    ]
  },

  {
    //资质数据
    path: '/DATA/aptitudedata',
    name: 'aptitudedata',
    meta: {title: '资质数据', sys: 'DATA', perm: ['datacenter_aptitudedata']},
    component: LayOut,
    children: [

      //企业资质列表
      {
        path: 'orgAptitude',
        name: 'orgAptitude',
        meta: {title: '企业资质列表',perm:['datacenter_aptitudedata_orgAptitude']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/aptitudedata/orgAptitude/mainTable')),'data')
      },

      //产品资质列表
      {
        path: 'productAptitude',
        name: 'productAptitude',
        meta: {title: '产品资质列表',perm:['datacenter_aptitudedata_productAptitude']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/aptitudedata/productAptitude/mainTable')),'data')
      }

    ]
  },

  {
    //知识库
    path: '/DATA/knowledgebase',
    name: 'knowledgebase',
    meta: {title: '知识库', sys: 'DATA', perm: ['datacenter_knowledgebase']},
    component: LayOut,
    children: [

      //药品说明书
      {
        path: 'drupInstruct',
        name: 'drupInstruct',
        meta: {title: '药品说明书',perm:['datacenter_knowledgebase_drupInstruct']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/knowledgebase/drupInstruct/mainTable')),'data')
      },

      //处方集分类
      {
        path: 'classify',
        name: 'classifyMainTable',
        meta: {title: '处方集分类',perm:['datacenter_knowledgebase_classify']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/knowledgebase/prescriptSets/index')),'data')
      }

    ]
  },

  //点击按钮，跳转的页面
  // {
  //   path: '/DATA/Datacenter',
  //   name: 'Datacenter',
  //   meta: {title: '数据中心', sys: 'DATA'},
  //   component: LayOut,
  //   children: [
  //
  //
  //   ]
  // },

//左侧有导航的页面
  {
    path: '/DATA/DatacenterLayDetail',
    name: 'DatacenterLayDetail',
    meta: {title: "数据中心",perm:['none']},
    component: LayDetail,
    children: [
      //卖方机构-标准化
      {
        path: 'sellStandardization/:id',
        name: 'sellStandardization',
        meta: {title: "卖方机构-标准化",perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/orgdata/sellorg/sell/standardization')),'data')
      },

      //买方机构-新增
      {
        path: 'buyerAdd',
        name: 'buyerAdd',
        meta: {title: "买方机构-新增",perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/orgdata/buyerorg/buyer/buyerAdd')),'data')
      },

      //买方机构-修改
      {
        path: 'buyerUpdate/:id',
        name: 'buyerUpdate',
        meta: {title: "买方机构-修改",perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/orgdata/buyerorg/buyer/buyerUpdate')),'data')
      }

      /////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////分割线/////////////////////////////////////
      /////////////////////////////////////////////////////////////////////////////
      ,
      //企业资质-查看
      {
        path: 'orgAptitude/tableDetail/:id',
        name: 'orgAptitudeTableDetail',
        meta: {title: "查看企业资质",perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/aptitudedata/orgAptitude/tableDetail')),'data')
      },
      //产品资质-查看
      {
        path: 'proAptitude/tableDetail/:id',
        name: 'proAptitudeTableDetail',
        meta: {title: "查看产品资质",perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/aptitudedata/productAptitude/tableDetail')),'data')
      },
      //产品信息-标准化
      {
        path: 'productDetail/benchmarkForm/:id',
        name: 'productBenchmark',
        meta: {title: "产品信息标准化",perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/productdata/product/detail/benchmarkForm')),'data')
      },
      //产品信息新增
      {
        path: 'productDetail/addProduct',
        name: 'addNewProduct',
        meta: {title: "新增产品信息",perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/productdata/product/detail/addProduct')),'data')
      },
      //零售企业（零售药店）-新增
      {
        path: 'orgdata/retailorg/insertForm',
        name: 'retailorgInsertForm',
        meta: {title: "新增零售企业（零售药店）信息",perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/orgdata/retailorg/retail/insertForm')),'data')
      },
      //零售企业（零售药店）-修改
      {
        path: 'orgdata/retailorg/updateForm/:id',
        name: 'retailorgUpdateForm',
        meta: {title: "修改零售企业（零售药店）信息",perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/datacenter/orgdata/retailorg/retail/updateForm')),'data')
      }
    ]
  }
]
