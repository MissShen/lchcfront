
export function metaShow(key) {
  return {
    undefined: {
      "region$": null,
      manufacture: {
        "PERMIT_CODE$": null,
        "COMPANY_NAME$": null,
        "PRODUCE_CATEGORY$": null,
        "COMPANY_TYPE$": null,
        "KIND_CODE$": null,
        "JURIDICAL_PERSON$": null,
        "ADDRESS$": null,
        "ID$": null,
        "CHARGE_PERSON$": null,
        "QUALITY_OWNER$": null,
        "PROJECT_ORG_ID$": null,
        "EXPIRY_DATE$": null,
      },
      org: {
        "CAT_ORG_ID$": null,
        "CODE$": null,
        "AUDIT_RESULT$": null,
        "CREDIT_CODE$": null,
        "STATE$": null,
        "ID$": null,
        "ORGANIZE_CODE$": null,
        "PROJECT_ORG_ID$": null,
        "PROJECT_ID$": null,
        "ENABLE_FLAG$": null,
        "NAME$": null,
        "ABBR$": null,
      },
      gsp: {
        "COMPANY_NAME$": null,
        "ENTERPRISE_ADDRESS$": null,
        "ATTESTATION_CATEGORY$": null,
        "CERTIFACATE_NUMBER$": null,
        "LICENCE_DATE$": null,
        "PROVINCE$": null,
        "ID$": null,
        "OFFICE_LICENCE$": null,
        "PROJECT_ORG_ID$": null,
        "EXPIRY_DATE$": null,
        "COMPANY_ID$": null,
      },
      enterprise: {
        "COUNTRY_ID$": null,
        "REG_EXPIRE$": null,
        "REG_EXPIRE_E$": null,
        "BUSINESS_FLAG$": null,
        "REG_NAME$": null,
        "ACCOUNT_BANK$": null,
        "REG_DEPARTMENT$": null,
        "REG_EXPIRE_S$": null,
        "PROJECT_ORG_ID$": null,
        "IS_JURIDICAL_COMPANY$": null,
        "ACCOUNT_NAME$": null,
        "PROVINCE_ID$": null,
        "POST_CODE$": null,
        "ID$": null,
        "ACCOUNT_NUMBER$": null,
        "REMARK$": null,
        "REG_TYPE$": null,
        "SALER_FLAG$": null,
        "QQ$": null,
        "JURIDICAL_PERSON$": null,
        "REG_DATE$": null,
        "FACTORY_FLAG$": null,
        "TAXPAYER_CODE$": null,
        "FOUND_DATE$": null,
        "REG_AMOUNT$": null,
        "BRANCH_ADDRESS$": null,
        "REG_SCOPE$": null,
        "SEND_FLAG$": null,
        "REG_CAPITAL$": null,
        "CITY_ID$": null,
        "LANDLINE_TEL$": null,
        "BRANCH_PRINCIPAL$": null,
        "REG_EXPIRE_Y$": null,
        "REG_NO$": null,
        "ADDRESS$": null,
        "TEL$": null,
        "USED_NAME$": null,
        "FAX$": null,
        "REG_AMOUNT_UNIT$": null,
        "BRANCH_NAME$": null,
        "WEBSITE$": null,
      },
      dealer: {
        "ENTERPRISE_PRINCIPAL$": null,
        "JURIDICAL_PERSON$": null,
        "CERTIFICATE_DEPARTMENT$": null,
        "PROJECT_ORG_ID$": null,
        "EXPIRY_DATE$": null,
        "PD_DATE$": null,
        "PERMIT_CODE$": null,
        "BUSINESS_CATEGORY$": null,
        "QUALITY_PRINCIPAL$": null,
        "BUSINESS_TYPE$": null,
        "ADDRESS$": null,
        "DEPOSITORY_ADDRESS$": null,
        "ID$": null,
        "DEAL_NAME$": null,
      },
    },
    attached: {
      LINK_PERSON$: null,
      LINK_TEL$: null,
      LINK_PHONE$: null,
      LINK_FAX$: null,
      LINK_EMIAL$: null,
      LINK_IDCARD$: null,
      LINK_ADDRESS$: null,
      LINK_JTEL$: null,
    },
    gmp: {
      CERTIFICATE_NUMBER$: null,
      ENTERPRISE_ADDRESS$: null,
      ATTESTATION_CATEGORY$: null,
      EXPIRY_DATE$: null,
      OFFICE_LICENCE$: null,
      LICENCE_DATE$: null,
      IS_NEW$: null,
      fileList$: null,
    },
    annex: {
      options: [],
    }
  }[key];
}

export function businessFlag(){
  return [
    { key: "11", value: "国有企业" },
    { key: "12", value: "集体企业" },
    { key: "13", value: "股份合作企业" },
    { key: "14", value: "联营企业" },
    { key: "15", value: "有限责任公司" },
    { key: "16", value: "股份有限公司" },
    { key: "17", value: "私营企业" },
    { key: "18", value: "港澳台商投资企业" },
    { key: "30", value: "外商投资企业" },
    { key: "19", value: "其他企业" },
  ];
}

export function companyType(){
  return [
    { key: "1", value: "有限责任公司" },
    { key: "2", value: "股份有限责任公司" },
    { key: "3", value: "个人独资企业" },
    { key: "4", value: "合伙企业" },
  ];
}

export function moneyType(){
  return [
    { key: "1", value: "人民币" },
    { key: "2", value: "美元" },
    { key: "3", value: "欧元" },
    { key: "4", value: "港币" },
  ];
}

export function metaForm() {
  return {
    org: {},
    enterprise: {
      fileList: [],
    },
    attached: [],
    manufacture: {
      fileList: [],
    },
    dealer: {
      fileList: [],
    },
    gmp: [],
    gsp: {
      fileList: [],
    },
    annex: [],
    fileList: [],
  };
}

export function metaDict() {
  return {
    doubt: {},
    clarify: {},
  };
}
