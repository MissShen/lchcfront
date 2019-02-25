<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="main">
      <ul class="side side-init" id="product-addup-side">
        <li
          v-for="(item,index) in nodesPosition"
          :key="index">
          <a @click="changeScrollHeight(item.nodePosition,'jump-product-addup',index)"
             class="d_jump jump-product-addup">{{item.itemName}}</a></li>
      </ul>
      <div class="right-box">
        <div class="gap-40" id="product-addup-box">

          <el-form :model="from" :rules="rules" ref="from" label-width="140px" size="small"
                   label-position="left" class="demo-form-inline" :inline="true">

            <h3 class="qyjc">企业基础信息</h3>

            <el-row>
              <el-col :span="12">
                <el-form-item label="企业名称" prop="NAME">
                  <el-input v-model="from.NAME" maxlength="150"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="统一社会信用代码" prop="CREDIT_CODE">
                  <el-input v-model="from.CREDIT_CODE" maxlength="18"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="组织机构代码" prop="ORGANIZE_CODE">
                  <el-input v-model="from.ORGANIZE_CODE" maxlength="50"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>

              <el-col :span="12">
                <el-form-item label="企业类型" prop="companyType" class="sell-checkbox-wrapper">
                  <!--<el-checkbox-group v-model="">-->
                    <!---->
                  <!--</el-checkbox-group>-->
                  <el-checkbox @change="checkValueChange" v-model="from.FACTORY_FLAG">生产企业</el-checkbox>
                  <el-checkbox @change="checkValueChange" v-model="from.SALER_FLAG">代理企业</el-checkbox>
                  <el-checkbox @change="checkValueChange" v-model="from.SEND_FLAG">配送企业</el-checkbox>
                  <div class="el-form-item__error" v-show="typeFlag">企业类型不可为空</div>
                </el-form-item>
              </el-col>

              <!--企业编码 = 组织机构代码-->
              <el-col :span="12">
                <el-form-item label="企业编码" prop="CODE">
                  <el-input v-model="from.CODE" maxlength="150"></el-input>
                  <!--<el-button type="warning" @click="orgCodeView">选择</el-button>-->
                </el-form-item>
              </el-col>

            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="企业简称" prop="ABBR">
                  <el-input v-model="from.ABBR" maxlength="150"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="拼音简码" prop="SPELL_ABBR">
                  <el-input v-model="from.SPELL_ABBR" maxlength="50"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="曾用名" prop="USED_NAME">
                  <el-input type="textarea" :rows="3" v-model="from.USED_NAME" maxlength="100" class="width-200"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="经济性质" prop="BUSINESS_FLAG">
                  <el-select v-model="from.BUSINESS_FLAG" placeholder="请选择" class="width-200">
                    <el-option label="国有企业" value="11"></el-option>
                    <el-option label="集体企业" value="12"></el-option>
                    <el-option label="股份合作企业" value="13"></el-option>
                    <el-option label="联营企业" value="14"></el-option>
                    <el-option label="有限责任公司" value="15"></el-option>
                    <el-option label="股份有限公司" value="16"></el-option>
                    <el-option label="私营企业" value="17"></el-option>
                    <el-option label="港澳台商投资企业" value="18"></el-option>
                    <el-option label="外商投资企业" value="30"></el-option>
                    <el-option label="其他企业" value="19"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="所在国家" prop="code">
                  <el-select v-model="from.COUNTRY_ID" placeholder="请选择" class="width-200" @change="chooseCountry(from.COUNTRY_ID)">
                    <el-option
                      v-for="item in countryArr"
                      :key="item.id"
                      :label="item.nameChn"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="所在省/自治区/直辖市" prop="code">
                  <el-select v-model="from.PROVINCE_ID" placeholder="请选择" class="width-200" @change="chooseProvince(from.PROVINCE_ID)">
                    <el-option
                      v-for="item in provinceArr"
                      :key="item.id"
                      :label="item.nameChn"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="所在市/地/州" prop="code">
                  <el-select v-model="from.CITY_ID" placeholder="请选择" class="width-200" @change="chooseCity(from.CITY_ID)">
                    <el-option
                      v-for="item in cityArr"
                      :key="item.id"
                      :label="item.nameChn"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="所在区/县市/县" prop="code">
                  <el-select v-model="from.COUNTY_ID" placeholder="请选择" class="width-200">
                    <el-option
                      v-for="item in countyArr"
                      :key="item.id"
                      :label="item.nameChn"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="是否法人企业">
                  <el-radio-group v-model="IS_JURIDICAL_COMPANY">
                    <el-radio label="1" >是</el-radio>
                    <el-radio label="0" >否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="分部负责人" prop="BRANCH_PRINCIPAL">
                  <el-input v-model="from.BRANCH_PRINCIPAL" maxlength="150"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="分部名称" prop="BRANCH_NAME">
                  <el-input v-model="from.BRANCH_NAME" maxlength="150"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="分部地址" prop="BRANCH_ADDRESS">
                  <el-input v-model="from.BRANCH_ADDRESS" maxlength="150"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="关联企业列表">
                  <el-input v-model="SUM" readonly class="width-200"></el-input>
                  &nbsp;<a @click="relatedOrg(from.ID)">已关联</a>
                  &nbsp;|&nbsp;
                  <a @click="notRelatedOrg(from.ID)">未关联</a>
                </el-form-item>

              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="备注">
                  <el-input type="textarea" :rows="3" v-model="from.REMARK" maxlength="1000" class="width-200"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <h3 class="zx">资信信息</h3>

            <el-row>
              <el-col :span="12">
                <el-form-item label="开户名称" prop="ACCOUNT_NAME">
                  <el-input v-model="from.ACCOUNT_NAME" maxlength="150"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="开户银行" prop="ACCOUNT_BANK">
                  <el-input v-model="from.ACCOUNT_BANK" maxlength="150"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="开户账号" prop="ACCOUNT_NUMBER">
                  <el-input v-model="from.ACCOUNT_NUMBER" maxlength="150"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="纳税人登记号" prop="TAXPAYER_CODE">
                  <el-input v-model="from.TAXPAYER_CODE" maxlength="150"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="邮政编码" prop="POST_CODE">
                  <el-input v-model="from.POST_CODE" maxlength="6" minlength="6"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="企业电话" prop="TEL">
                  <el-input v-model="from.TEL"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="企业网址" prop="WEBSITE">
                  <el-input v-model="from.WEBSITE"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="企业传真" prop="FAX">
                  <el-input v-model="from.FAX"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="企业QQ" prop="QQ">
                  <el-input v-model="from.QQ" maxlength="32"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <h3 class="yyzz">营业执照信息</h3>

            <el-row>
              <el-col :span="12">
                <el-form-item label="注册号" prop="REG_NO">
                  <el-input v-model="from.REG_NO" maxlength="150"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="名称" prop="REG_NAME">
                  <el-input v-model="from.REG_NAME" maxlength="128"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="类型">
                  <el-select v-model="from.REG_TYPE" placeholder="请选择" class="width-200">
                    <el-option label="有限责任公司" value="1"></el-option>
                    <el-option label="股份有限责任公司" value="2"></el-option>
                    <el-option label="自然人独资公司（或者法人独资）" value="3"></el-option>
                    <el-option label="合伙企业" value="4"></el-option>
                  </el-select>
                  <!--<el-input v-model="from.REG_TYPE"></el-input>-->
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="法定代表人" prop="JURIDICAL_PERSON">
                  <el-input v-model="from.JURIDICAL_PERSON" maxlength="64"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="住所" prop="ADDRESS">
                  <el-input v-model="from.ADDRESS" maxlength="150"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="注册资本" prop="REG_CAPITAL">
                  <el-input v-model="from.REG_CAPITAL" maxlength="150"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="注册资金" prop="REG_AMOUNT">
                      <el-input v-model="from.REG_AMOUNT" maxlength="19" class="width-200"></el-input>
                      <!-- 货币单位:1-人民币 2-美元 3-欧元 4-港币 -->
                      <el-select v-model="from.REG_AMOUNT_UNIT" placeholder="请选择" class="width-200">
                        <el-option label="人民币" value="1"></el-option>
                        <el-option label="美元" value="2"></el-option>
                        <el-option label="欧元" value="3"></el-option>
                        <el-option label="港币" value="4"></el-option>
                      </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="成立日期" class="date-wrapper">
                  <el-date-picker
                    v-model="from.FOUND_DATE"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>

                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="营业期限">
                  <!--<el-idatanput v-model="from.REG_EXPIRE_S"></el-idatanput>-->
                      <el-date-picker
                        v-model="from.REG_EXPIRE_S"
                        type="date"
                        placeholder="选择日期">
                      </el-date-picker>
                      &nbsp;到&nbsp;
                      <el-date-picker
                        v-model="from.BUSINESS_LICENSE_DATE"
                        type="date"
                        placeholder="选择日期">
                      </el-date-picker>
                      <el-checkbox v-model="from.REG_EXPIRE_Y">永久有效</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="经营范围">
                  <el-input type="textarea" :rows="3" v-model="from.REG_SCOPE" class="width-200" maxlength="300"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="登记机关" prop="REG_DEPARTMENT">
                  <el-input v-model="from.REG_DEPARTMENT" maxlength="128"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="发证日期" class="date-wrapper">
                  <!--<el-input v-model="from.REG_DATE"></el-input>-->
                  <el-date-picker
                    v-model="from.REG_DATE"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>

                </el-form-item>
              </el-col>
            </el-row>

            <el-row v-show="from.orgInfoFiles&&from.orgInfoFiles.length > 0">
              <el-col :span="12">
                <images-preview :dilogFlag="true" :imgIdListUnUnique='from.orgInfoFiles'></images-preview>
              </el-col>
            </el-row>
            <h3 class="scxx" v-show="from.FACTORY_FLAG == 1">生产许可信息</h3>
            <div v-if="from.FACTORY_FLAG == 1">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="编号" prop="PERMIT_CODE">
                    <el-input v-model="from.PERMIT_CODE" maxlength="150"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="企业名称" prop="COMPANY_NAME">
                    <el-input v-model="from.COMPANY_NAME" maxlength="128"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="注册地址" prop="CM_ADDRESS">
                    <el-input v-model="from.CM_ADDRESS" maxlength="128"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="企业类型" prop="COMPANY_TYPE">
                    <!--<el-input v-model="from.COMPANY_TYPE"></el-input>-->
                    <el-select v-model="from.COMPANY_TYPE" placeholder="请选择" class="width-200">
                      <el-option label="国有企业" value="11"></el-option>
                      <el-option label="集体企业" value="12"></el-option>
                      <el-option label="股份合作企业" value="13"></el-option>
                      <el-option label="联营企业" value="14"></el-option>
                      <el-option label="有限责任公司" value="15"></el-option>
                      <el-option label="股份有限公司" value="16"></el-option>
                      <el-option label="私营企业" value="17"></el-option>
                      <el-option label="港澳台商投资企业" value="18"></el-option>
                      <el-option label="外商投资企业" value="30"></el-option>
                      <el-option label="其他企业" value="19"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="法定代表人" prop="JURIDICAL_PERSON">
                    <el-input v-model="from.JURIDICAL_PERSON" maxlength="128"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="企业负责人" prop="CHARGE_PERSON">
                    <el-input v-model="from.CHARGE_PERSON" maxlength="128"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="生产地址和生产范围" prop="PRODUCE_CATEGORY">
                    <el-input type="textarea" :rows="3" v-model="from.PRODUCE_CATEGORY" maxlength="300" class="width-200"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="质量负责人" prop="QUALITY_OWNER">
                    <el-input v-model="from.QUALITY_OWNER" maxlength="128"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="分类码" prop="KIND_CODE">
                    <el-input :disabled="true" v-model="from.KIND_CODE" maxlength="128"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="有效期至" prop="EXPIRY_DATE" class="date-wrapper">
                    <!--<el-input v-model="from.EXPIRY_DATE"></el-input>-->
                    <el-date-picker
                      v-model="from.EXPIRY_DATE"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>

                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="发证机关" prop="PD_INSTITUTION">
                    <el-input v-model="from.PD_INSTITUTION" maxlength="200"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="发证日期" class="date-wrapper">
                    <!--<el-input v-model="from.PD_DATE"></el-input>-->
                    <el-date-picker
                      v-model="from.PD_DATE"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>

                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="日常监管机构" prop="REGULATORY_AGENCY">
                    <el-input v-model="from.REGULATORY_AGENCY" maxlength="128"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="日常监管人员" prop="REGULATORY_PERSON">
                    <el-input v-model="from.REGULATORY_PERSON" maxlength="128"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="监管举报电话">
                    <el-input v-model="from.SUPERVISORY_REPORT_TEL" maxlength="128"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="分装企业">
                        <el-input class="width-200" v-model="MOLECULE_ORG_NAME" size="small"></el-input>
                        &nbsp;<a @click="splitOrgView(from.ID)">选择</a>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="分装企业编码">
                    <el-input :disabled="true" v-model="MOLECULE_ORG_CODE"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="产品类型代码">
                    <el-select v-model="from.SORT_CODE" placeholder="未选择" @change="selectChange()" class="width-200">
                      <el-option label="化学药" value="H"></el-option>
                      <el-option label="中成药" value="Z"></el-option>
                      <el-option label="生物制品" value="S"></el-option>
                      <el-option label="按药品管理的体外诊断试剂" value="T"></el-option>
                      <el-option label="中药饮片" value="Y"></el-option>
                      <el-option label="医用气体" value="Q"></el-option>
                      <el-option label="药用辅料" value="F"></el-option>
                      <el-option label="空心胶囊" value="J"></el-option>
                      <el-option label="特殊药品" value="C"></el-option>
                      <el-option label="其他(如中药配方颗粒等)" value="X"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="药品类型属性代码">
                    <el-select v-model="from.DRUG_TYPE_ATTRIBUTE_CODE" placeholder="未选择" @change="selectChange()" class="width-200">
                      <el-option label="原料药" value="a"></el-option>
                      <el-option label="制剂" value="b"></el-option>
                      <el-option label="由国家标准的提取物" value="e"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <images-preview :dilogFlag="true" v-if="from.produceOrgFiles.length>0" :imgIdListUnUnique="from.produceOrgFiles"></images-preview>
                </el-col>
              </el-row>
            </div>

            <h3 v-show="from.SALER_FLAG == 1 || from.SEND_FLAG == 1" class="jyxx">经营许可信息</h3>
            <div v-if="from.SALER_FLAG == 1 || from.SEND_FLAG == 1">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="证号" prop="CD_PERMIT_CODE">
                    <el-input v-model="from.CD_PERMIT_CODE" maxlength="150"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="企业名称" prop="DEAL_NAME">
                    <el-input v-model="from.DEAL_NAME" maxlength="128"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="注册地址" prop="CD_ADDRESS">
                    <el-input v-model="from.CD_ADDRESS" maxlength="150"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="法定代表人" prop="CD_JURIDICAL_PERSON">
                    <el-input v-model="from.CD_JURIDICAL_PERSON" maxlength="64"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="企业负责人" prop="ENTERPRISE_PRINCIPAL">
                    <el-input v-model="from.ENTERPRISE_PRINCIPAL" maxlength="24"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="质量负责人" prop="QUALITY_PRINCIPAL">
                    <el-input v-model="from.QUALITY_PRINCIPAL" maxlength="24"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="仓库地址" prop="DEPOSITORY_ADDRESS">
                    <el-input v-model="from.DEPOSITORY_ADDRESS" maxlength="1000"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="发证机关">
                    <el-input v-model="from.CERTIFICATE_DEPARTMENT" maxlength="50"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="有效期至" class="date-wrapper">
                    <!--<el-input v-model="from.CD_EXPIRY_DATE"></el-input>-->
                    <el-date-picker
                      v-model="from.CD_EXPIRY_DATE"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>

                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="经营范围" prop="BUSINESS_CATEGORY">
                    <el-input type="textarea" :rows="3" v-model="from.BUSINESS_CATEGORY" maxlength="1000" class="width-200"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="经营方式" prop="BUSINESS_TYPE">
                    <el-input v-model="from.BUSINESS_TYPE" maxlength="150"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="质量公告">
                    <el-button size="small" @click="fakeDrugsView()">假冒药记录</el-button>
                    <el-button size="small" @click="badDrugsView()">伪劣药记录</el-button>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="发证日期" class="date-wrapper">
                    <!--<el-input v-model="from.CD_EXPIRY_DATE"></el-input>-->
                    <el-date-picker
                      v-model="from.CD_PD_DATE"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>

                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <images-preview :dilogFlag="true" v-if="from.businessOrgFiles.length > 0" :imgIdListUnUnique="from.businessOrgFiles"></images-preview>
                </el-col>
              </el-row>
            </div>

            <h3 class="gmp" v-show="from.FACTORY_FLAG == 1">GMP信息</h3>
            <div v-if="from.FACTORY_FLAG == 1">
              <div class="tableset">
                <el-table :data="resData.list" border stripe>

                  <el-table-column label="证书编号">
                    <template slot-scope="scope">
                      <span>{{ scope.row.CERTIFICATE_NUMBER }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="发证机关">
                    <template slot-scope="scope">
                      <span>{{ scope.row.OFFICE_LICENCE }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="发证日期" width="180">
                    <template slot-scope="scope">
                      <span>{{ scope.row.LICENCE_DATE | dateCon }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="有效期至" width="180">
                    <template slot-scope="scope">
                      <span>{{ scope.row.EXPIRY_DATE | dateCon }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column
                    fixed="right"
                    label="操作"
                    width="160">
                    <template slot-scope="scope">
                      <div class="operates">
                        <span>
                          <images-preview class="img-pre-text" :dilogFlag="false" v-if="scope.row.gmpFiles&&scope.row.gmpFiles.length > 0" :imgIdListUnUnique="scope.row.gmpFiles"></images-preview>
                        </span>
                        <span>
                          <a href="javascript:;" class="operation-btn" size="small" @click="editGmp(scope.row.ID)">编辑</a>
                        </span>
                        <span>
                          <a href="javascript:;" class="operation-btn" size="small" @click="goDeleteGmp(scope.row.ID)">删除</a>
                        </span>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="pagebox">
                <el-pagination
                  layout="total, sizes, prev, pager, next, jumper"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :page-sizes="[10, 20, 30]"
                  :total="resData.total"
                  :page-size="resData.pageSize"
                  :page-count="resData.pages"
                  :current-page.sync="resData.pageNum">
                </el-pagination>
              </div>
            </div>

            <h3 class="gsp" v-show="from.SALER_FLAG == 1 || from.SEND_FLAG == 1">GSP信息</h3>
            <div v-if="from.SALER_FLAG == 1 || from.SEND_FLAG == 1">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="证书编号">
                    <el-input v-model="from.CERTIFACATE_NUMBER"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="企业名称">
                    <el-input v-model="from.CAG_COMPANY_NAME"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="认证范围">
                    <el-input type="textarea" :rows="3" v-model="from.ATTESTATION_CATEGORY" class="width-200"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="地址">
                    <el-input v-model="from.ENTERPRISE_ADDRESS"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="发证机关">
                    <el-input v-model="from.OFFICE_LICENCE"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="发证日期" class="date-wrapper">
                    <!--<el-input v-model="from.LICENCE_DATE"></el-input>-->
                    <el-date-picker
                      v-model="from.LICENCE_DATE"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>

                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="有效期至">
                    <el-date-picker
                      v-model="from.CAG_EXPIRY_DATE"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                    <!--<el-input v-model="from.CAG_EXPIRY_DATE"></el-input>-->
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <images-preview :dilogFlag="true" v-if="from.gspFiles != null && from.gspFiles != undefined && from.gspFiles.length > 0" :imgIdListUnUnique="from.gspFiles"></images-preview>
                </el-col>
              </el-row>
            </div>

            <h3 class="examine">审核信息</h3>
            <el-row>
              <el-col :span="12">
                <el-form-item label="审核状态" prop="CHECK_FLAG">
                  <el-radio-group v-model="from.CHECK_FLAG">
                    <el-radio label="0">未审核</el-radio>
                    <el-radio label="1">已通过</el-radio>
                    <el-radio label="2">未通过</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="使用状态" prop="USED_FLAG">
                  <el-radio-group v-model="from.USED_FLAG">
                    <el-radio label="1">正常</el-radio>
                    <el-radio label="0">禁用</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="审核人" prop="CHECKUSER_NAME">
                  <el-input v-model="from.CHECKUSER_NAME" maxlength="10"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="审核时间" class="date-wrapper" prop="CHECK_DATE">
                  <!--<el-input v-model="from.CHECK_DATE"></el-input>-->
                  <el-date-picker
                    v-model="from.CHECK_DATE"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>

                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="审核意见" prop="CHECK_DESC">
                  <el-input type="textarea" :rows="3" v-model="from.CHECK_DESC" maxlength="2000" class="width-200"></el-input>
                </el-form-item>
              </el-col>
            </el-row>


            <el-row>
              <el-col :span="24">
              <span class="btn-mar">
                <el-button type="primary" size="small" v-if="from.CHECK_FLAG == '4'" @click="goQuestionVue()">查看质疑</el-button>
                <el-button type="primary" size="small" @click="goSave('from')">提交</el-button>
                <el-button size="small" @click="goBack()">返回</el-button>
              </span>
              </el-col>
            </el-row>

          </el-form>
        </div>
      </div>
    </div>
    <org-code v-if="orgCodeVisible" ref="orgCode"></org-code>
    <split-org @myChange="myChangeSplic" v-if="splitOrgVisible" ref="splitOrg"></split-org>

    <form-view @myChange="myChangeSum" v-if="formViewVisible" :parent-id="id" ref="formView"></form-view>
    <form-view-not @myChangeNot="myChangeSumNot" v-if="formViewVisibleNot" :parent-id="id" ref="formViewNot"></form-view-not>
    <fake-Drugs v-if="fakeDrugsVisible" :parent-id="id" ref="fakeDrugs"></fake-Drugs>
    <bad-Drugs v-if="badDrugsVisible" :parent-id="id" ref="badDrugs"></bad-Drugs>
    <gmp-edit @myChangeGmpList="myChangeGmpList" v-if="gmpEditVisible" ref="gmpEdit"></gmp-edit>
    <questions v-if="questionsVisible" ref="questions"></questions>
  </div>

</template>
<script>
  // import ElButton from "../../../../../../node_modules/element-ui/packages/button/src/button";
  import {dateFormatter} from "src/utils";
  import {isChinese,isEnglish,onlyChinese, onlyNumber, isPostCode,isMobile,isPhone,isUrl,isQq,isNumberOrEng,isNumber} from "../../../../../utils/validateUtil";
  import {countryAllList,provinceAllList} from "../../../../../axios/datacenter/basedata/region/region";
  import {city,county} from "../../../../../axios/datacenter/orgdata/catbuyer/catBuyer";
  import orgCode from '../windowPanel/orgCode'
  import splitOrg from '../windowPanel/splitOrg'
  import formView from '../windowPanel/orgFormSelect'
  import formViewNot from '../windowPanel/orgFormSelectNot'
  import fakeDrugs from '../windowPanel/fakeDrugs'
  import badDrugs from '../windowPanel/badDrugs'
  import gmpEdit from '../windowPanel/editGmp'
  import questions from '../windowPanel/questions';
  import moment from 'moment'
  import imagesPreview from 'src/pages/datacenter/windowPanel/imagesPreview';

  import {info,queryGmpList,deleteGmp,queryRelatedOrg,saveEdit} from 'src/axios/datacenter/orgdata/sell/seller'

  export default {
    components: {orgCode,splitOrg,formView,formViewNot,fakeDrugs,badDrugs,gmpEdit,imagesPreview,questions},
    data() {
      var validateCreditCode = (rule, value, callback) => {
          if (!isChinese(value)&&value){
            callback('请输入英文、数字或符号')
          }else {
            callback()
          }
      };
      var validateSpellAbbr = (rule, value, callback) => {
        if (!isEnglish(value)){
          callback('请输入英文')
        }else {
          callback()
        }
      };
      var validateDepartment = (rule, value, callback) => {
        if (!onlyChinese(value) && value){
          callback('请输入中文')
        }else {
          callback();
        }
      };
      var validateNumber = (rule, value, callback) => {
        if (!onlyNumber(value) && value){
          callback('请输入数字')
        }else {
          callback()
        }
      };
      var validatePostCode = (rule, value, callback) => {
        if (!isPostCode(value) && value){
          callback('请输入正确的邮政编码')
        }else {
          callback()
        }
      };
      var validateTel = (rule, value, callback) => {
        if (!isMobile(value) && !isPhone(value) && value){
          callback('请输入正确的电话号码')
        }else {
          callback();
        }
      };
      var validateUrl = (rule, value, callback) => {
        if (!isUrl(value) && value){
          callback('请输入正确的网址')
        }else {
          callback();
        }
      };
      var validateFax = (rule, value, callback) => {
        if(!isPhone(value) && value){
          callback('请输入正确的企业传真')
        }else {
          callback()
        }
      };
      var validateQq = (rule, value, callback) => {
        if (!isQq(value) && value){
          callback('请输入正确的QQ')
        }else {
          callback();
        }
      };
      var validateNumOrEng = (rule, value, callback) => {
        if (!isNumberOrEng(value) && value){
          callback('请输入数字或字母')
        }else {
          callback();
        }
      };
      var validateNum = (rule, value, callback) => {
        if (!isNumber(value) && value){
          callback('请输入数字')
        }else {
          callback();
        }
      }
      return {
        typeFlag: false, // 企业类型
        orgCodeVisible: false,
        splitOrgVisible: false,
        formViewVisible: false,
        formViewVisibleNot: false,
        fakeDrugsVisible: false,
        badDrugsVisible: false,
        gmpEditVisible: false,
        // 存储的时候用这个字段 START, init时 需要赋值
        IS_JURIDICAL_COMPANY:'0',
        MOLECULE_ORG_NAME: undefined,
        MOLECULE_ORG_CODE: undefined,
        MOLECULE_ORGID: undefined,
        USED_FLAG: undefined,
        SUM: '',
        // 存储的时候用这个字段 END

        countryArr: [],
        provinceArr: [],
        cityArr: [],
        countyArr: [],
        value: '',
        from: {
          IS_JURIDICAL_COMPANY: '0',
          companyType: undefined
        },
        ruleForm: '',
        rules: {
          NAME: [{required: true, message: '请输入企业名称', trigger: 'blur'}],
          CREDIT_CODE: [{validator: validateCreditCode, trigger:'blur'}],
          ORGANIZE_CODE:[{validator: validateCreditCode, trigger: 'blur'}],
          companyType:[{required: true, message: '  '}],
          CODE:  [
            {required: true, message: '请输入企业编码'},
            {validator: validateCreditCode, trigger:'blur'}
          ],
          SPELL_ABBR:[{validator: validateSpellAbbr, trigger: 'blur'}],
          BRANCH_PRINCIPAL: [{validator: validateDepartment, trigger: 'blur'}],
          BRANCH_NAME: [{validator: validateDepartment, trigger: 'blur'}],
          BRANCH_ADDRESS:[{validator: validateDepartment, trigger: 'blur'}],
          ACCOUNT_BANK: [{validator: validateDepartment, trigger: 'blur'}],
          ACCOUNT_NUMBER: [{validator: validateNumber, trigger: 'blur'}],
          TAXPAYER_CODE: [{validator: validateNumber, trigger: 'blur'}],
          POST_CODE: [{validator: validatePostCode, trigger: 'blur'}],
          TEL:[{validator: validateTel, trigger: 'blur'}],
          WEBSITE: [ {validator: validateUrl, trigger: 'blur'} ],
          FAX: [{validator: validateFax, trigger: 'blur'}],
          QQ: [{validator: validateQq, trigger: 'blur'}],
          REG_NO:[{validator: validateNumOrEng, trigger: 'blur'}],
          JURIDICAL_PERSON: [{validator: validateDepartment, trigger: 'blur'}],
          REG_CAPITAL: [{validator: validateNum, trigger: 'blur'}],
          REG_AMOUNT:[{validator: validateNum, trigger: 'blur'}],
          REG_DEPARTMENT:[{validator: validateDepartment, trigger: 'blur'}],
          CHECK_FLAG:[{required: true, message: '请选择审核状态', trigger:'change'}],
          USED_FLAG:[{required: true, message: '请选择使用状态', trigger:'change'}],
          CHECKUSER_NAME: [{required: true, message: '审核人不可为空', trigger:'blur'}],
          CHECK_DATE: [{required: true, message: '审核时间不可为空', trigger:'change'}],
          CHECK_DESC:[{required: true, message: '审核意见不可为空', trigger:'blur'}]
        },
        resData: [],
        id: undefined,
        query: {
          searchType: undefined,
          searchText: undefined
        },
        questionsVisible:false,
        nodesPosition: this.nodesPositionInit()
      }
    },
    //界面加载完成后执行
    created(){
      this.id = this.$route.params.id || undefined;
      if(this.id) {
        this.metaFrom(this.id);
      }
      countryAllList().then(res => {
        this.countryArr = res.data
      })
    },
    filters: {
      dateCon(date) {
        if(!date) {
          return ''
        }
        return moment(date).format('YYYY-MM-DD')
      }
    },
    methods: {
      chooseCountry(countryId){
        if (countryId == 'FR20T0000010000000050000'){
          provinceAllList().then(res => {
            this.provinceArr = res.data;
          })
        }else {
          this.provinceArr = [];
          this.cityArr = [];
          this.countyArr = [];
        }
        this.from.PROVINCE_ID ='';
        this.from.CITY_ID = '';
        this.from.COUNTY_ID = '';
      },
      /*====== 获取省市数据 ======*/
      chooseProvince(provinceId) {
        this.from.CITY_ID = '';
        this.from.COUNTY_ID = '';
        city(provinceId).then(res => {
          this.cityArr = res.data
        })
      },
      //  查看质疑信息
      goQuestionVue(){
        this.questionsVisible = true;
        this.$nextTick(() => {
          this.$refs.questions.fillData(this.id);
      })
      },
      //根据选择的市加载县信息
      chooseCity(cityId) {
        this.from.COUNTY_ID = '';
        county(cityId).then(res => {
          this.countyArr = res.data
        })
      },
      metaFrom(id){
        info(id).then(res => {
          if (res.code == 200){
            this.from = res.data;
            // 企业类型
            this.from.SALER_FLAG = this.from.SALER_FLAG == 1
            this.from.SEND_FLAG = this.from.SEND_FLAG == 1
            if(this.from.FACTORY_FLAG == '1'){
              this.from.FACTORY_FLAG = true;
            }else {
              this.from.FACTORY_FLAG = false;
            }
            if (this.from.COUNTRY_ID == 'FR20T0000010000000050000'){
              provinceAllList().then(res => {
                this.provinceArr = res.data;
              })
              if (this.from.PROVINCE_ID){
                city(this.from.PROVINCE_ID).then(res => {
                  this.cityArr = res.data
                })
              }
              if (this.from.CITY_ID){
                county(this.from.CITY_ID).then(res => {
                  this.countyArr = res.data
                })
              }
            }

            this.$nextTick(()=>{
              /**
               * 查询设置锚点位置
               * */
              this.getNodesHeight('product-addup-box');
              //恢复初始状态
              this.removeClassCurrent('jump-product-addup')[0].classList.add('current');
            })

          }
          // 分装企业
          this.MOLECULE_ORG_NAME = this.from.MOLECULE_ORG_NAME
          this.MOLECULE_ORG_CODE = this.from.MOLECULE_ORG_CODE
          this.MOLECULE_ORGID = this.from.MOLECULE_ORGID

          // 是否法人企业
          this.IS_JURIDICAL_COMPANY = this.from.IS_JURIDICAL_COMPANY+''

          // 营业期限 是否永久
          this.from.REG_EXPIRE_Y = this.from.REG_EXPIRE_Y == 1

          // 使用状态
          this.USED_FLAG = this.from.USED_FLAG + '';

          this.from.CODE = (this.from.CODE== null || this.from.CODE == undefined) ? '' : this.from.CODE

          this.$nextTick(() => {
            this.from.orgInfoFiles.splice(0,0);
          })
          this.$nextTick(() => {
            this.from.produceOrgFiles.splice(0,0);
          })
          this.$nextTick(() => {
            this.from.businessOrgFiles.splice(0,0);
          })
          // this.$nextTick(() => {
          //   this.from.xxx.splice(0,0);
          // })
          this.$nextTick(() => {
            this.from.gspFiles.splice(0,0);
          })
        })
        queryGmpList(id,this.resData).then(res => {
          this.resData = res.data
        })
        queryRelatedOrg(this.id, this.query, this.resData).then(res => {
          this.SUM = res.data.total;
        });
      },
      list(){
        queryGmpList(this.id,this.resData).then(res => {
          this.resData = res.data
        })
      },
      // ************************ 企业类型不可为空校验 ************************
      validateEnterType(){
        if (!this.from.FACTORY_FLAG && !this.from.SALER_FLAG && !this.from.SEND_FLAG){
          this.typeFlag = true;
        }else {
          this.typeFlag = false;
        }
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list();
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list();
      },
      splitOrgView(id) {
        this.splitOrgVisible = true;
        this.$nextTick(() => {
          this.$refs.splitOrg.fillData(id);
        })
      },
      handleRemove(file, fileList) {
      },
      handlePreview(file) {
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      goAnchor(selector) {
        var anchor = this.$el.querySelector(selector);
        document.body.scrollTop = anchor.offsetTop; // chrome
        document.documentElement.scrollTop = anchor.offsetTop; // firefox
      },
      // 经济性质
      getBusiness(status) {

        // 经济性质  11:国有企业 12:集体企业 13:股份合作企业 14:联营企业 15:有限责任公司 16:股份有限公司 17:私营企业 18:港澳台商投资企业 30:外商投资企业 19:其他企业
        if(status == 30)
          return '外商投资企业';
        // 变成技巧：表驱动      --《代码大全》
        const arrStatus = ['国有企业', '集体企业', '股份合作企业','联营企业','有限责任公司','股份有限公司','私营企业','港澳台商投资企业','其他企业'];
        return arrStatus[status-11];
      },
      goBack() {
        this.$router.go(-1);
      },
      // 已关联企业
      relatedOrg(id) {
        this.formViewVisible = true;
        this.$nextTick(() => {
          this.$refs.formView.fillData(id);
        })
      },
      // 未关联企业
      notRelatedOrg(id) {
        this.formViewVisibleNot = true;
        this.$nextTick(() => {
          this.$refs.formViewNot.fillData(id);
        })
      },
      // 假冒药
      fakeDrugsView(id) {
        this.fakeDrugsVisible = true;
        this.$nextTick(() => {
          this.$refs.fakeDrugs.fillData(id);
        })
      },
      // weilueyao
      badDrugsView(id) {
        this.badDrugsVisible = true;
        this.$nextTick(() => {
          this.$refs.badDrugs.fillData(id);
        })
      },
      // 企业编码
      orgCodeView() {

      },
      // 子页面 更新 爸爸页面
      myChangeSum(sum) {
        // this.SUM = sum;
        queryRelatedOrg(this.id, this.query, this.resData).then(res => {
          this.SUM = res.data.total;
        })
      },
      myChangeSumNot() {
        queryRelatedOrg(this.id, this.query, this.resData).then(res => {
          this.SUM = res.data.total;
        })
      },
      // 更新分装企业
      myChangeSplic(selectCode, selectName, selectId) {
        if(selectCode != undefined || selectName != undefined) {
          this.MOLECULE_ORG_NAME = selectName;
          this.MOLECULE_ORG_CODE = selectCode;
          this.MOLECULE_ORGID = selectId;
        }
      },
      // 更新 GMP列表
      myChangeGmpList() {
        console.log("更新GMP列表")
        queryGmpList(this.id,this.resData).then(res => {
          this.resData = res.data
        })
      },

      // 删除 GMP
      goDeleteGmp(gmpId) {
        let _this = this;
        this.$confirm(`确定删除此行信息?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteGmp(gmpId).then(res=>{
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                queryGmpList(_this.id).then(res => {
                  _this.resData = res.data
                })
              }
            })
          })
        })
      },
      // 更新分类码
      selectChange() {
        let a = this.from.SORT_CODE == undefined?'':this.from.SORT_CODE
        let b = this.from.DRUG_TYPE_ATTRIBUTE_CODE == undefined?'':this.from.DRUG_TYPE_ATTRIBUTE_CODE
        this.from.KIND_CODE = a + b
      },

      // GMP 编辑
      editGmp(gmpId) {
        this.gmpEditVisible = true;
        this.$nextTick(() => {
          this.$refs.gmpEdit.fillData(gmpId);
        })

      },

      // 标准化 保存
      goSave(formName) {
        this.validateEnterType();
        this.from.companyType = this.from.FACTORY_FLAG || this.from.SALER_FLAG || this.from.SEND_FLAG;
        this.$refs[formName].validate((valid) => {
          if (valid && !this.typeFlag) {
            
            var other = {
              ORGANIZE_CODE: this.from.ORGANIZE_CODE,
              IS_JURIDICAL_COMPANY: this.IS_JURIDICAL_COMPANY,
              MOLECULE_ORG_NAME: this.MOLECULE_ORG_NAME,
              MOLECULE_ORG_CODE: this.MOLECULE_ORG_CODE,
              MOLECULE_ORGID: this.MOLECULE_ORGID,
              USED_FLAG: this.from.USED_FLAG,
              SUM: this.SUM,
              orgId: this.id,
              REG_EXPIRE_S: undefined
            }
            if(this.from.REG_EXPIRE_S){
              other.REG_EXPIRE_S = dateFormatter(this.from.REG_EXPIRE_S);
            }

            saveEdit(this.from, other).then(res => {
              if (res.code==200) {
                this.$message({
                  message: res.data,
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                    this.goBack()
                  }
                });
              }else {
                this.$message({
                  message: '保存失败',
                  type: 'error',
                  duration: 1000,
                  onClose: () => {
                  }
                });
              }

            })
          }else{
            this.$message({
              type: 'warning',
              message: '请填写完整信息'
            })
          }
        });

      },
      checkValueChange(val){
        if (val){
          this.typeFlag = false
        }else if (!this.from.FACTORY_FLAG && !this.from.SALER_FLAG && !this.from.SEND_FLAG){
          this.typeFlag = true;
        }
        this.$nextTick(()=>{
          /**
           * 查询设置锚点位置
           * */
          this.getNodesHeight('product-addup-box');
        })
      },
      nodesPositionInit(){
        return [
          {itemName: '企业基础信息', nodePosition: null, itemAbb: 'qyjc'},
          {itemName: '资信信息', nodePosition: null, itemAbb: 'zx'},
          {itemName: '营业执照信息', nodePosition: null, itemAbb: 'yyzz'},
          {itemName: '生产许可信息', nodePosition: null, itemAbb: 'scxx'},
          {itemName: '经营许可信息', nodePosition: null, itemAbb: 'jyxx'},
          {itemName: 'GMP信息', nodePosition: null, itemAbb: 'gmp'},
          {itemName: 'GSP信息', nodePosition: null, itemAbb: 'gsp'},
          {itemName: '审核信息', nodePosition: null, itemAbb: 'examine'}
        ]
      },
      changeScrollHeight(pageY, jumpNodeName, currentNodeIndex) {
        window.scrollTo(0, pageY);
        this.removeClassCurrent(jumpNodeName)[currentNodeIndex].classList.add('current');
      },
      removeClassCurrent(nodeClassName) {
        let jumpNodes = document.getElementsByClassName(nodeClassName);
        for (let i = 0; i < jumpNodes.length; i++) {
          jumpNodes[i].classList.remove('current')
        }
        return jumpNodes
      },
      getNodesHeight(proInfoDetaiBox, currentShxx) {
        this.nodesPosition = this.nodesPositionInit();
        let vieNode = document.getElementById(proInfoDetaiBox);
        let viewNodeChildeNodes = vieNode.childNodes[0].childNodes;
        viewNodeChildeNodes.forEach(nodeItem => {
          if (nodeItem.nodeName == 'H3') {
            this.nodesPosition.forEach(item => {
              if (nodeItem.className == item.itemAbb) {
                item.nodePosition = nodeItem.offsetTop
              }
            })
          }
        });
        if (currentShxx) {
          let shxx = document.getElementById(currentShxx);
          this.nodesPosition.forEach(item => {
            if ('shxx' == item.itemAbb) {
              item.nodePosition = shxx.offsetTop;
            }
          })
        }
        //去除位置为0的值
        for (let i = 0; i < this.nodesPosition.length; i++) {
          if (!this.nodesPosition[i].nodePosition) {
            this.nodesPosition.splice(i, 1);
            i--;
          }
        }
      },
      removeFixed(sideNodeName) {
        let sideNode = document.getElementById(sideNodeName);
        sideNode.classList.remove('side-scroll');
        sideNode.classList.add('side-init');
      },
      addFixed(sideNodeName) {
        let sideNode = document.getElementById(sideNodeName);
        sideNode.classList.remove('side-init');
        sideNode.classList.add('side-scroll');
      },
      dialogBoxScroll(scrolltop, jumpNodeName, sideNodeName) {
        let vieNodeScrollTop = scrolltop;
        if (vieNodeScrollTop < this.nodesPosition[0].nodePosition) {
          this.removeClassCurrent(jumpNodeName)[0].classList.add('current');
        }
        this.nodesPosition.forEach((item, index) => {
          if (vieNodeScrollTop > (item.nodePosition - 120)) {
            this.removeClassCurrent(jumpNodeName)[index].classList.add('current');
          }
        });

        if (vieNodeScrollTop < this.nodesPosition[0].nodePosition + 50) {
          this.removeFixed(sideNodeName)
        }
        else {
          this.addFixed(sideNodeName)
        }
      }
    },
    mounted() {
      window.onscroll = function () {
        let scrolltop=document.documentElement.scrollTop||document.body.scrollTop;
        this.dialogBoxScroll(scrolltop, 'jump-product-addup', 'product-addup-side')
      }.bind(this)
    },
    destroyed(){
      window.onscroll = null;
    }
  }
</script>
