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
 * 查询零售企业（零售药店）基本信息列表
 * @return {*}
 */
export function  retailList(resData,search){
    return http({
        url: '/yxdDataCenter/retailEnterprise/list',
        method: 'GET',
        params:{
            'pageNum': resData.pageNum,
            'pageSize': resData.pageSize,
            'updateEndDate': dateChange(search.updateEndDate),
            'updateBeginDate':dateChange(search.updateBeginDate),
            'loadEndDate':dateChange(search.loadEndDate),
            'loadBeginDate':dateChange(search.loadBeginDate),
            'searchType':search.searchType,
            'searchText':search.searchText,
            'catRetailEnterprise.retailType':search.retailType,
            'catRetailEnterprise.createUser':search.loadUser,
            'catRetailEnterprise.memberType':search.memberType,
            'catRetailEnterprise.lastUpdateUser':search.updateUser,
            'catRetailEnterprise.enableFlag':'',
            'orderBy':search.orderBy
        }
    })
}
/**
 * 获取录入人信息列表
 * @returns {*}
 */
export function  queryLoadUsersList(){
    return http({
        url: '/yxdDataCenter/retailEnterprise/createUserList',
        method: 'GET',
        params:{}
    })
}
/**
 * 获取修改人信息列表
 * @returns {*}
 */
export function  queryUpdateUsersList(){
    return http({
        url: '/yxdDataCenter/retailEnterprise/updateUserList',
        method: 'GET',
        params:{}
    })
}
/**
 * 查询零售企业（零售药店）回收站基本信息列表
 * @return {*}
 */
export function  retailRecycleList(resData,search){
    return http({
        url: '/yxdDataCenter/retailEnterprise/recycleList',
        method: 'GET',
        params:{
            'pageNum': resData.pageNum,
            'pageSize': resData.pageSize,
            'searchType':search.searchType,
            'searchText':search.searchText,
            'catRetailEnterprise.enableFlag':'',
            'orderBy':search.orderBy
        }
    })
}
/**
 * 删除
 * @param ids
 * @returns {*}
 */
export function del(ids) {
    return http({
        url: '/yxdDataCenter/retailEnterprise/del',
        method: 'DELETE',
        params: {
            'ids': ids
        }
    })
}
/**
 * 还原
 * @param ids
 * @returns {*}
 */
export function restore(ids) {
    return http({
        url: '/yxdDataCenter/retailEnterprise/restore',
        method: 'PUT',
        params: {
            'ids': ids
        }
    })
}
/**
 * 提交保存新增零售企业信息
 * @param ids
 * @returns {*}
 */
export function add(retail) {
    return http({
        url: '/yxdDataCenter/retailEnterprise/add',
        method: 'POST',
        params: {
            'catRetailEnterprise.retailType':retail.retailType,
            'catRetailEnterprise.memberType':retail.memberType,
            'catRetailEnterprise.code':retail.code,
            'catRetailEnterprise.name':retail.name,
            'catRetailEnterprise.abbr':retail.abbr,
            'catRetailEnterprise.spellAbbr':retail.spellAbbr,
            'catRetailEnterprise.usedName':retail.usedName,
            'catRetailEnterprise.remark':retail.remark,
            'catRetailEnterprise.archiveNum':retail.archiveNum,
            'catRetailEnterprise.accountName':retail.accountName,
            'catRetailEnterprise.accountBank':retail.accountBank,
            'catRetailEnterprise.accountNumber':retail.accountNumber,
            'catRetailEnterprise.taxpayerCode':retail.taxpayerCode,
            'catRetailEnterprise.postCode':retail.postCode,
            'catRetailEnterprise.tel':retail.tel,
            'catRetailEnterprise.website':retail.website,
            'catRetailEnterprise.fax':retail.fax,
            'catRetailEnterprise.regNo':retail.regNo,
            'catRetailEnterprise.regName':retail.regName,
            'catRetailEnterprise.regType':retail.regType,
            'catRetailEnterprise.juridicalPerson':retail.juridicalPerson,
            'catRetailEnterprise.address':retail.address,
            'catRetailEnterprise.regCapital':retail.regCapital,
            'catRetailEnterprise.regAmount':retail.regAmount,
            'catRetailEnterprise.regAmountUnit':retail.regAmountUnit,
            'catRetailEnterprise.foundDate':dateChange(retail.foundDate),
            'catRetailEnterprise.regExpireS':dateChange(retail.regExpireS),
            'catRetailEnterprise.businessLicenseDate':dateChange(retail.businessLicenseDate),
            'catRetailEnterprise.regExpireY':retail.regExpireY?'1':'0',
            'catRetailEnterprise.regScope':retail.regScope,
            'catRetailEnterprise.regDepartment':retail.regDepartment,
            'catRetailEnterprise.regDate':dateChange(retail.regDate),
            'catRetailEnterprise.permitCode':retail.permitCode,
            'catRetailEnterprise.regAddres':retail.regAddres,
            'catRetailEnterprise.enterprisePrincipal':retail.enterprisePrincipal,
            'catRetailEnterprise.expiryDate':dateChange(retail.expiryDate1),
            'catRetailEnterprise.officeLicence':retail.officeLicence1,
            'catRetailEnterprise.awardDate':dateChange(retail.awardDate),
            'catRetailEnterprise.businessCategory':retail.businessCategory,
            'catRetailEnterprise.operationMode':retail.operationMode,
            'catRetailEnterprise.depositoryAddress':retail.depositoryAddress,
           //GSP认证信息
            'catAuthGsp.certifacateNumber':retail.certifacateNumber,
            'catAuthGsp.companyName':retail.companyName,
            'catAuthGsp.dealerAddres':retail.dealerAddress,
            'catAuthGsp.province':retail.province,
            'catAuthGsp.attestationCategory':retail.attestationCategory,
            'catAuthGsp.officeLicence':retail.officeLicence,
            'catAuthGsp.licenceDate':dateChange(retail.licenceDate),
            'catAuthGsp.expiryDate':dateChange(retail.expiryDate)
        }
    })
}
/**
 * 提交保存新增零售企业信息
 * @param ids
 * @returns {*}
 */
export function getRetailerInfoById(id) {
    return http({
        url: '/yxdDataCenter/retailEnterprise/getRetailInfoById',
        method: 'GET',
        params: {
            'id':id
        }
    })
}
export function update(retail,gsp){
    return http({
        url: '/yxdDataCenter/retailEnterprise/update',
        method:'POST',
        params:{
            'catRetailEnterprise.id':retail.id,
            'catRetailEnterprise.retailType':retail.retailType,
            'catRetailEnterprise.memberType':retail.memberType,
            'catRetailEnterprise.code':retail.code,
            'catRetailEnterprise.name':retail.name,
            'catRetailEnterprise.abbr':retail.abbr,
            'catRetailEnterprise.spellAbbr':retail.spellAbbr,
            'catRetailEnterprise.usedName':retail.usedName,
            'catRetailEnterprise.remark':retail.remark,
            'catRetailEnterprise.archiveNum':retail.archiveNum,
            'catRetailEnterprise.accountName':retail.accountName,
            'catRetailEnterprise.accountBank':retail.accountBank,
            'catRetailEnterprise.accountNumber':retail.accountNumber,
            'catRetailEnterprise.taxpayerCode':retail.taxpayerCode,
            'catRetailEnterprise.postCode':retail.postCode,
            'catRetailEnterprise.tel':retail.tel,
            'catRetailEnterprise.website':retail.website,
            'catRetailEnterprise.fax':retail.fax,
            'catRetailEnterprise.regNo':retail.regNo,
            'catRetailEnterprise.regName':retail.regName,
            'catRetailEnterprise.regType':retail.regType,
            'catRetailEnterprise.juridicalPerson':retail.juridicalPerson,
            'catRetailEnterprise.address':retail.address,
            'catRetailEnterprise.regCapital':retail.regCapital,
            'catRetailEnterprise.regAmount':retail.regAmount,
            'catRetailEnterprise.regAmountUnit':retail.regAmountUnit,
            'catRetailEnterprise.foundDate':dateChange(retail.foundDate),
            'catRetailEnterprise.regExpireS':dateChange(retail.regExpireS),
            'catRetailEnterprise.businessLicenseDate':dateChange(retail.businessLicenseDate),
            'catRetailEnterprise.regExpireY':retail.regExpireY,
            'catRetailEnterprise.regScope':retail.regScope,
            'catRetailEnterprise.regDepartment':retail.regDepartment,
            'catRetailEnterprise.regDate':dateChange(retail.regDate),
            'catRetailEnterprise.permitCode':retail.permitCode,
            'catRetailEnterprise.regAddres':retail.regAddres,
            'catRetailEnterprise.enterprisePrincipal':retail.enterprisePrincipal,
            'catRetailEnterprise.expiryDate':dateChange(retail.expiryDate),
            'catRetailEnterprise.officeLicence':retail.officeLicence,
            'catRetailEnterprise.awardDate':dateChange(retail.awardDate),
            'catRetailEnterprise.businessCategory':retail.businessCategory,
            'catRetailEnterprise.operationMode':retail.operationMode,
            'catRetailEnterprise.depositoryAddress':retail.depositoryAddress,
            //GSP认证信息
            'catAuthGsp.id':gsp.id,
            'catAuthGsp.certifacateNumber':gsp.certifacateNumber,
            'catAuthGsp.companyName':gsp.companyName,
            'catAuthGsp.dealerAddres':gsp.dealerAddres,
            'catAuthGsp.province':gsp.province,
            'catAuthGsp.attestationCategory':gsp.attestationCategory,
            'catAuthGsp.officeLicence':gsp.officeLicence,
            'catAuthGsp.licenceDate':dateChange(gsp.licenceDate),
            'catAuthGsp.expiryDate':dateChange(gsp.expiryDate)

        }
    })
}
/**
 * 获取省份信息列表
 * @returns {*}
 */
export function  provinceList(){
    return http({
        url: '/yxdDataCenter/retailEnterprise/provinceList',
        method: 'GET',
        params:{}
    })
}

