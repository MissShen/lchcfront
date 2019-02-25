import http from 'src/axios/http'

export function declareList(resData, query) {
  query.pageNum = resData.pageNum;
  query.pageSize = resData.pageSize;
  return http({
    url: '/auditchanges/enterpriseDoubt/declareList',
    method: "get",
    params: query
  });
}

export function declare(id) {
  return http({
    url: '/auditchanges/enterpriseDoubt/declare',
    method: "get",
    params: {
      ID: id
    }
  });
}

export function changeList(resData, query) {
  query.pageNum = resData.pageNum;
  query.pageSize = resData.pageSize;
  return http({
    url: '/auditchanges/enterpriseDoubt/changeList',
    method: "get",
    params: query
  });
}

/**
 * 变更详细信息
 * @param id
 * @returns {*}
 */
export function finalOrg(id) {
  return http({
    url: '/auditchanges/enterpriseDoubt/finalOrg',
    method: "get",
    params: {
      id: id
    }
  });
}

/**
 * 变更后信息
 * @param id
 * @returns {*}
 */
export function queryKeyValue(id) {
  return http({
    url: '/auditchanges/enterpriseDoubt/queryKeyValue',
    method: "get",
    params: {
      ID: id
    }
  });
}

export function getFieldName(key) {
  if(!key) {
    return key
  }
  return {
    "manufacture.PERMIT_CODE": "编号",
    "manufacture.COMPANY_NAME": "企业名称",
    "manufacture.PRODUCE_CATEGORY": "生产地址和生产范围",
    "manufacture.COMPANY_TYPE": "企业类型",
    "manufacture.KIND_CODE": "分类码",
    "manufacture.JURIDICAL_PERSON": "法定代表人",
    "manufacture.ADDRESS": "注册地址",
    "manufacture.ID": null,
    "manufacture.CHARGE_PERSON": "企业负责人",
    "manufacture.QUALITY_OWNER": "质量负责人",
    "manufacture.PROJECT_ORG_ID": null,
    "manufacture.EXPIRY_DATE": "有效期至",
    "org.CAT_ORG_ID": null,
    "org.CODE": null,
    "org.AUDIT_RESULT": null,
    "org.CREDIT_CODE": "统一社会信用代码",
    "org.STATE": null,
    "org.ID": null,
    "org.ORGANIZE_CODE": "组织机构代码",
    "org.PROJECT_ORG_ID": null,
    "org.PROJECT_ID": null,
    "org.ENABLE_FLAG": null,
    "org.NAME": "企业名称",
    "org.ABBR": "企业简称",
    "gsp.COMPANY_NAME": "企业名称",
    "gsp.ENTERPRISE_ADDRESS": "地址",
    "gsp.ATTESTATION_CATEGORY": "认证范围",
    "gsp.CERTIFACATE_NUMBER": "证书编号",
    "gsp.LICENCE_DATE": "发证日期",
    "gsp.PROVINCE": null,
    "gsp.ID": null,
    "gsp.OFFICE_LICENCE": "发证机关",
    "gsp.PROJECT_ORG_ID": null,
    "gsp.EXPIRY_DATE": "有效期至",
    "gsp.COMPANY_ID": null,
    "enterprise.COUNTRY_ID": "所属地区",
    "enterprise.REG_EXPIRE_E": null,
    "enterprise.BUSINESS_FLAG": "经济性质",
    "enterprise.REG_NAME": "名称",
    "enterprise.ACCOUNT_BANK": "开户银行",
    "enterprise.REG_DEPARTMENT": "登记机关",
    "enterprise.REG_EXPIRE_S": null,
    "enterprise.PROJECT_ORG_ID": null,
    "enterprise.IS_JURIDICAL_COMPANY": "是否法人企业",
    "enterprise.ACCOUNT_NAME": "开户名称",
    "enterprise.PROVINCE_ID": null,
    "enterprise.POST_CODE": "邮政编码",
    "enterprise.ID": null,
    "enterprise.ACCOUNT_NUMBER": "开户账号",
    "enterprise.REMARK": "备注",
    "enterprise.REG_TYPE": "类型",
    "enterprise.SALER_FLAG": null,
    "enterprise.QQ": "企业QQ号",
    "enterprise.JURIDICAL_PERSON": "法定代表人",
    "enterprise.REG_DATE": "发证日期",
    "enterprise.FACTORY_FLAG": null,
    "enterprise.TAXPAYER_CODE": "纳税人登记号",
    "enterprise.FOUND_DATE": "成立日期",
    "enterprise.REG_AMOUNT": "注册资金",
    "enterprise.BRANCH_ADDRESS": "分部地址",
    "enterprise.REG_SCOPE": "经营范围",
    "enterprise.SEND_FLAG": null,
    "enterprise.REG_CAPITAL": "注册资本",
    "enterprise.CITY_ID": null,
    "enterprise.LANDLINE_TEL": "固定电话",
    "enterprise.BRANCH_PRINCIPAL": "分部负责人",
    "enterprise.REG_EXPIRE_Y": null,
    "enterprise.REG_NO": "注册号",
    "enterprise.ADDRESS": "住所",
    "enterprise.TEL": "企业电话",
    "enterprise.USED_NAME": "企业曾用名",
    "enterprise.FAX": "企业传真",
    "enterprise.REG_AMOUNT_UNIT": "币种",
    "enterprise.BRANCH_NAME": "分部名称",
    "enterprise.WEBSITE": "企业网址",
    "enterprise.REG_EXPIRE": "营业期限",
    "dealer.ENTERPRISE_PRINCIPAL": "企业负责人",
    "dealer.JURIDICAL_PERSON": "法定代表人",
    "dealer.CERTIFICATE_DEPARTMENT": "发证机关",
    "dealer.PROJECT_ORG_ID": null,
    "dealer.EXPIRY_DATE": "有效期至",
    "dealer.PD_DATE": "发证日期",
    "dealer.PERMIT_CODE": "证号",
    "dealer.BUSINESS_CATEGORY": "经营范围",
    "dealer.QUALITY_PRINCIPAL": "质量负责人",
    "dealer.BUSINESS_TYPE": "监督举报电话",
    "dealer.ADDRESS": "注册地址",
    "dealer.DEPOSITORY_ADDRESS": "仓库地址",
    "dealer.ID": null,
    "dealer.DEAL_NAME": "经营方式",
    "attached.LINK_PERSON": "联系人姓名",
    "attached.LINK_TEL": "固定电话",
    "attached.LINK_PHONE": "手机",
    "attached.LINK_FAX": "申报人传真",
    "attached.LINK_EMIAL": "电子邮箱",
    "attached.LINK_IDCARD": "身份证号",
    "attached.LINK_ADDRESS": "联系地址",
    "attached.LINK_JTEL": "紧急联系电话(手机)",
    "gmp.CERTIFICATE_NUMBER": "证书编号",
    "gmp.ENTERPRISE_ADDRESS": "地址",
    "gmp.ATTESTATION_CATEGORY": "认证范围",
    "gmp.EXPIRY_DATE": "有效期至",
    "gmp.OFFICE_LICENCE": "发证机关",
    "gmp.LICENCE_DATE": "发证日期",
  }[key.replace(/\.\d+\./,".")] || key;
}
