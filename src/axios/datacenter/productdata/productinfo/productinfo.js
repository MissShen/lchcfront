import http from 'src/axios/http'
import moment from 'moment'
/**
 * 日期格式转换
 * @param data
 * @returns {*}
 */
function dateChange(data){
    var result;
    if(typeof (data)!='undefined'&& data!=null ){
        result=moment(data).format("YYYY-MM-DD");
    }
    return result;
}

/**
 * 产品信息列表查询
 * @returns {*}
 */
export function productList(resData,search) {
    return http({
            url: '/yxdDataCenter/productinfo/list',
            method: 'GET',
            params: {
                'pageNum': resData.pageNum,
                'pageSize': resData.pageSize,
                'searchTypeA': search.searchTypeA,
                'searchContentA': search.searchContentA,
                'searchTypeB': search.searchTypeB,
                'searchContentB': search.searchContentB,
                'catProduct.checkFlag': search.examineFlag,
                'catDoseageForm.nameChn':search.doseage,
                'catDrug.spec':search.spec,
                'catProduct.checkUser':search.examinePeople,
                'examineTimeBegin':dateChange(search.examineTimeBegin),
                'examineTimeEnd':dateChange(search.examineTimeEnd),
                'attestationKey':search.attestationKey,
                'attestationFlag':search.attestationFlag,
                'registerType':search.registerType,
                'registerDateBegin':dateChange(search.registerDateBegin),
                'registerDateEnd':dateChange(search.registerDateEnd),
                'catProduct.enableFlag':'',
                'standard': search.standard,
                'orderBy':search.orderBy
            }
        }
    )
}
/**
 * 产品回收站列表查询
 * @returns {*}
 */
export function productRecyleList(resData,search) {
    return http({
            url: '/yxdDataCenter/productinfo/recyleList',
            method: 'GET',
            params: {
                'pageNum': resData.pageNum,
                'pageSize': resData.pageSize,
                'catProduct.platId': search.platId,
                'searchTypeA': search.searchTypeA,
                'searchContentA': search.searchContentA,
                'searchTypeB': search.searchTypeB,
                'searchContentB': search.searchContentB,
                'examineTimeBegin':dateChange(search.examineTimeBegin),
                'examineTimeEnd':dateChange(search.examineTimeEnd),
                'catDrug.readyFlag': search.readyFlag,
                'dataState': search.dataState,
                'catProduct.enableFlag':'',
                'orderBy':search.orderBy
            }
        }
    )
}
/**
 * 产品平台
 * @returns {*}
 */
export function productPlats() {
    return http({
        url: '/yxdDataCenter/productinfo/queryPlats',
        method: 'GET',
        params: {}
    })
}
/**
 * 删除
 * @returns {*}
 */
export function remove(ids) {
    return http({
        url: '/yxdDataCenter/productinfo/del',
        method: 'DELETE',
        params: {
            'ids':ids
        }
    })
}

/**
 * 还原
 * @returns {*}
 */
export function restore(ids) {
    return http({
        url: '/yxdDataCenter/productinfo/restore',
        method: 'PUT',
        params: {
            'ids':ids
        }
    })
}

/**
 * 添加备注
 * @returns {*}
 */
export function addRemark(ids,remark) {
    return http({
        url: '/yxdDataCenter/productinfo/addRemark',
        method: 'GET',
        params: {
            'ids':ids,
            'remark':remark
        }
    })
}
/**
 * 查看
 * @returns {*}
 */
export function check(id){
    return http({
        url:'/yxdDataCenter/productinfo/check',
        method:'GET',
        params:{
            'id':id
        }
    })
}
/**
 * 查看
 * @returns {*}
 */
export function queryImages(id){
    return http({
        url:'/yxdDataCenter/productinfo/queryImageFileList',
        method:'GET',
        params:{
            'id':id
        }
    })
}
/**
 * 选择单位子页面查询
 * @returns {*}
 */
export function metricList(query,resData){
    return http({
        url:'/yxdDataCenter/productinfo/queryMetrics',
        method:'GET',
        params:{
            'pageNum': resData.pageNum,
            'pageSize': resData.pageSize,
            'searchType':query.searchType,
            'searchText':query.searchText,
            'orderBy':query.orderBy
        }
    })
}
/**
 * 选择生产企业子页面查询
 * @returns {*}
 */
export function manufacturyList(query,resData){
    return http({
        url:'/yxdDataCenter/productinfo/queryManufactures',
        method:'GET',
        params:{
            'pageNum': resData.pageNum,
            'pageSize': resData.pageSize,
            'searchType':query.searchType,
            'searchText':query.searchText,
            'orderBy':query.orderBy
        }
    })
}
/**
 * 选择包材子页面查询
 * @return {*}
 */
export function wrapList(query,resData){
    return http({
        url:'/yxdDataCenter/productinfo/queryWraps',
        method:'GET',
        params:{
            'pageNum': resData.pageNum,
            'pageSize': resData.pageSize,
            'searchType':query.searchType,
            'searchText':query.searchText
        }
    })
}
/**
 * 选择药品名称子页面查询
 * @return {*}
 */
export function drugList(query,resData){
    return http({
        url:'/yxdDataCenter/productinfo/queryDrugs',
        method:'GET',
        params:{
            'pageNum': resData.pageNum,
            'pageSize': resData.pageSize,
            'searchTypeA':query.searchTypeA,
            'searchTextA':query.searchTextA,
            'spec':query.spec,
            'searchTypeB':query.searchTypeB,
            'searchTextB':query.searchTextB,
            'compoundFlag':query.compoundFlag,
            'standRate':query.standRate,
            'orderBy':query.orderBy
        }
    })
}
/**
 * 标准化产品
 * @return {*}
 */
export function standardProduct(form){
    return http({
        url:'/yxdDataCenter/productinfo/updateProductInfo',
        method:'PUT',
        params:{
            //  产品信息
            'catProduct.id':form.catProduct.id,
            'catProduct.spellAbbr':form.catProduct.spellAbbr,
            'catProduct.tradeName':form.catProduct.tradeName,
            'catProduct.productStandardcode':form.catProduct.productStandardcode,
            'catProduct.metricId':form.catMetric.id,
            'catProduct.manufactureId':form.catProduct.manufactureId,
            'catProduct.wrapCode':form.catWrap.code,
            'catProduct.medicalId':form.catProduct.medicalId,
            'catProduct.productCode':form.catProduct.productCode,
            'catProduct.productSource':form.catProduct.productSource,
            'catProduct.useUnit':form.catProduct.useUnit,
            'catProduct.permitNumber':form.catProduct.permitNumber,
            'catProduct.patentFlag':form.catProduct.patentFlag,
            'catProduct.patentBeginDate':dateChange(form.catProduct.patentBeginDate),
            'catProduct.patentEndDate':dateChange(form.catProduct.patentEndDate),
            'catProduct.remark':form.catProduct.remark,
            'catProduct.checkFlag':form.catProduct.checkFlag,
            'catProduct.enableFlag':form.catProduct.enableFlag,
            'catProduct.checkRemark':form.catProduct.checkRemark,
            'catProduct.importDrugLicenceNumber':form.catProduct.importDrugLicenceNumber,// 进口药品注册证编号
            'catProduct.importLicenceExpiryDate':dateChange(form.catProduct.importLicenceExpiryDate),// 进口药品注册证有效期
            //  产品附加信息
            'catProductAttached.id':form.catProductAttached.id,
            'catProductAttached.dataProductId':form.catProductAttached.dataProductId,
            'catProductAttached.sWrap':form.catProductAttached.swrap,
            'catProductAttached.bWrap':form.catProductAttached.bwrap,
            'catProductAttached.medicalJyNum':form.catProductAttached.medicalJyNum,
            'catProductAttached.medicalJyDate':dateChange(form.catProductAttached.medicalJyDate),
            'catProductAttached.medicalJyYj':form.catProductAttached.medicalJyYj,
            'catProductAttached.productionNum':form.catProductAttached.productionNum,
            'catProductAttached.productionDate':dateChange(form.catProductAttached.productionDate),
            'catProductAttached.gmpNumber':form.catProductAttached.gmpNumber,
            'catProductAttached.drugStandrd':form.catProductAttached.drugStandrd,
            'catProductAttached.useUnit1':form.catProductAttached.useUnit1,
            'catProductAttached.dataUseMin':form.catProductAttached.dataUseMin,
            'catProductAttached.dataUseMax':form.catProductAttached.dataUseMax,
            'catProductAttached.dataNumMin':form.catProductAttached.dataNumMin,
            'catProductAttached.aveDateNum':form.catProductAttached.aveDateNum,
            'catProductAttached.useMaximum':form.catProductAttached.useMaximum,
            'catProductAttached.courseTreatment':form.catProductAttached.courseTreatment,
            'agencyDate':dateChange(form.catProductAttached.agencyorgdate)// 代理授权书有效期
        }
    })
}
/**
 * 查询GMP认证列表
 * @return {*}
 */
export function queryGmpList(id){
    return http({
        url:'/yxdDataCenter/productinfo/queryGmpList',
        method:'GET',
        params:{
            'id':id
        }
    })
}
/**
 * 保存新增产品信息
 * @return {*}
 */
export function insertProduct(form,fileList){
    return http({
        url:'/yxdDataCenter/productinfo/insertProduct',
        method:'POST',
        params:{
            //产品注册临时数据表
            'catDrugReport.productName':form.PRODUCT,//产品名称
            'catDrugReport.drugName':form.PRODUCT,//药品名称
            'catDrugReport.tradeName':form.TRADE,//商品名称
            'catDrugReport.doseageFormCode':form.DOSAGE,//剂型
            'catDrugReport.standRate':form.STANDRATE,//转换比
            'catDrugReport.spec':form.SPEC,//规格
            'catDrugReport.metricName':form.METRIC,//单位
            'catDrugReport.wrapCode':form.WRAP,//包材
            'catDrugReport.manufactureName':form.MANUFACTURE,//生产企业
            //注册产品基本信息
            'catProduct.useUnit':form.UNIT,//最小使用单位
            'catProduct.tradeName':form.TRADE,//商品名称
            'catProduct.productSource':form.SOURCE,//产品来源
            'catProduct.permitNumber':form.PERMITNUMBER,//批准文号
            'catProduct.importDrugLicenceNumber':form.JKNUM,//进口药品注册证编号
            'catProduct.importLicenceExpiryDate':dateChange(form.JKDATE),//进口药品有效截止日期
            'catProduct.patentFlag':form.PATENTFLAG,//是否专利保护
            'catProduct.patentBeginDate':dateChange(form.PATENTBEGINDATE),//专利保护开始时间
            'catProduct.patentEndDate':dateChange(form.PATENTENDDATE),//专利保护结束时间
            'catProduct.protectionFlag':form.PROTECTIONFLAG,//是否中药保护
            //产品附加信息
            'catProductAttached.smallestUnits':form.UNIT,//最小使用单位
            'catProductAttached.sWrap':form.SWRAP,//中包装数量
            'catProductAttached.bWrap':form.BWRAP,//大包装数量
            'catProductAttached.medicalJyNum':form.JYNUM,//药品检验报告编号
            'medicalJyDate':dateChange(form.JYDATE),//药品检验报告有效期至
            'catProductAttached.medicalJyYj':form.JYYJ?'1':'0',//药品检验报告有效期永久(0:否；1:是)
            'catProductAttached.productionNum':form.PRODUCTIONNUM,//国产药品批件编号
            'productionDate':dateChange(form.PRODUCTIONDATE),//国产药品批件有效期至
            'catProductAttached.gmpNumber':form.GMP,//GMP证书编号
            'agencyorgdate':dateChange(form.AGENCYORGDATE),//代理授权书有效期至
            'catProductAttached.drugStandrd':form.STANDRD,//药品质量标准
            'catProductAttached.useUnit':form.USEUNIT,//用法用量
            'catProductAttached.useUnit1':form.USEUNIT,//用法用量
            'catProductAttached.dataUseMin':form.USEMIN,//每次使用量最小值
            'catProductAttached.dataUseMax':form.USEMAX,//每次使用量最大值
            'catProductAttached.dataNumMin':form.NUMMIN,//每日次数最小值
            'catProductAttached.aveDateNum':form.AVENUM,//平均日用量
            'catProductAttached.useMaximum':form.MAXIMUN,//每次使用极量
            'catProductAttached.courseTreatment':form.TREATMENT,//疗程
            'fileJson':JSON.stringify(fileList)
        }
    })
}
/**
 * 根据药品Code查询包材信息
 * @return {*}
 */
export function findWrapByDrugCode(code){
    return http({
        url:'/yxdDataCenter/productinfo/findWrapByDrugCode',
        method:'GET',
        params:{
            'code':code
        }
    })
}
/**
 * 根据药品Code查询剂型信息
 * @return {*}
 */
export function findDoseageByDrugCode(code){
    return http({
        url:'/yxdDataCenter/productinfo/findDoseageByDrugCode',
        method:'GET',
        params:{
            'code':code
        }
    })
}
/**
 * 根据生产企业（名称、code）查询对应的cmp编号列表
 * @return {*}
 */
export function queryGMPList(org){
    return http({
        url:'/yxdDataCenter/productinfo/queryGMPList',
        method:'GET',
        params:{
            'factoryName':org.name,
            'factoryCode':org.code
        }
    })
}
/**
 * 导出EXCEL
 * @returns {*}
 */
export function exportExcel(search) {
    return http({
            url: '/yxdDataCenter/productinfo/export',
            method: 'POST',
            responseType: 'blob',// 表明返回服务器返回的数据类型
            use: 'all',
            params: {
                'searchTypeA': search.searchTypeA,
                'searchContentA': search.searchContentA,
                'searchTypeB': search.searchTypeB,
                'searchContentB': search.searchContentB,
                'catProduct.checkFlag': search.examineFlag,
                'catDoseageForm.nameChn':search.doseage,
                'catDrug.spec':search.spec,
                'catProduct.checkUser':search.examinePeople,
                'examineTimeBegin':dateChange(search.examineTimeBegin),
                'examineTimeEnd':dateChange(search.examineTimeEnd),
                'attestationKey':search.attestationKey,
                'attestationFlag':search.attestationFlag,
                'registerType':search.registerType,
                'registerDateBegin':dateChange(search.registerDateBegin),
                'registerDateEnd':dateChange(search.registerDateEnd),
                'catProduct.enableFlag':'',
                'standard': search.standard
            }
        }
    )
}
/**
 * 提交产品
 * @return {*}
 */
export function submitProduct(productId){
    return http({
        url:'/yxdDataCenter/productinfo/submitProduct',
        method:'GET',
        params:{
            'productId':productId,
        }
    })
}
/**
 * 查询质疑列表
 * @return {*}
 */
export function queryQuestions(query,resData){
    return http({
        url:'/yxdDataCenter/questionTypeInfo/list',
        method:'GET',
        params:{
            'pageNum': resData.pageNum,
            'pageSize': resData.pageSize,
            'enableFlag':query.enableFlag,
            'foreignId':query.id,
            'questionTargetType':query.questionTargetType,
            'orderBy':query.orderBy
        }
    })
}
/**
 * 标准化 回复质疑信息
 * @param from
 */
export function saveReply(form) {
    return http({
            url: '/yxdDataCenter/questionTypeInfo/updateQuestionTypeInfo',
            method: 'PUT',
            params: {
                'id':form.replyId,
                'replyContent':form.replyContent,
                'replyFlag':'1',
                'replyDate':moment().format("YYYY-MM-DD")
            }
        }
    )
}