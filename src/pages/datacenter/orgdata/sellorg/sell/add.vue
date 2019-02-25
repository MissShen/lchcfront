<template>
  <div>
    <!--<div class="tabs-panel">
      <span class="active">企业信息注册</span>
    </div>-->
    <!-- 表格 -->
    <!--<div >-->
      <!-- 表格查询表单 -->
      <div >
        <div class="main audit-main">
          <ul class="side side-init" id="product-addup-side">
            <li
              v-for="(item,index) in nodesPosition"
              :key="index">
              <a @click="changeScrollHeight(item.nodePosition,'jump-product-addup',index)"
                 class="d_jump jump-product-addup">{{item.itemName}}</a></li>
          </ul>
          <div class="right-box">
            <div class="gap-40" id="product-addup-box">
              <el-form ref="form" :model="form" :rules="rules" label-position="right" size="small" label-width="160px" :disabled="form.catOrg.isStandard == 1">
                <h3 class="qyxx">企业基础信息</h3>
                <el-row :gutter="24">
                  <el-col :span="10">
                    <el-form-item label="企业名称" prop="catOrg.name">
                      <el-input v-model="form.catOrg.name" placeholder="企业名称"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="10">
                    <el-form-item label="统一社会信用代码" prop="code">
                      <el-input v-model="form.catOrg.creditCode" placeholder="统一社会信用代码"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="组织机构代码" prop="code">
                      <el-input v-model="form.catOrg.organizeCode" placeholder="组织机构代码"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="20">
                    <el-form-item label="企业类型" prop="type">
                      <el-checkbox @change="checkOne" v-model="form.catEnterpriseOrgDomain.factoryFlag" label="生产企业"></el-checkbox>
                      <el-checkbox  @change="checkOne" v-model="form.catEnterpriseOrgDomain.salerFlag" label="代理企业"></el-checkbox>
                      <el-checkbox @change="checkOne" v-model="form.catEnterpriseOrgDomain.sendFlag" label="配送企业"></el-checkbox>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="企业简称" prop="catOrg.abbr">
                      <el-input v-model="form.catOrg.abbr" placeholder="企业简称"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="经济性质" prop="code">
                      <el-select v-model="form.catEnterpriseOrgDomain.businessFlag" placeholder="请选择" class="width-200">
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
                  <el-col :span="10">
                    <el-form-item label="企业曾用名">
                      <el-input
                        class="textW"
                        type="textarea"
                        :rows="4"
                        v-model="form.catEnterpriseOrgDomain.usedName"
                        placeholder="企业曾用名">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="10">
                    <el-form-item label="所在国家" prop="code">
                      <el-select v-model="form.catOrg.COUNTRY_ID" placeholder="请选择" class="" @change="chooseCountry(form.catOrg.COUNTRY_ID)">
                        <el-option
                          v-for="item in countryArr"
                          :key="item.id"
                          :label="item.nameChn"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="所在省/自治区/直辖市" prop="code">
                      <el-select v-model="form.catOrg.PROVINCE_ID" placeholder="请选择" class="" @change="chooseProvince(form.catOrg.PROVINCE_ID)">
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
                  <el-col :span="10">
                    <el-form-item label="所在市/地/州" prop="code">
                      <el-select v-model="form.catOrg.CITY_ID" placeholder="请选择" class="" @change="chooseCity(form.catOrg.CITY_ID)">
                        <el-option
                          v-for="item in cityArr"
                          :key="item.id"
                          :label="item.nameChn"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="所在区/县市/县" prop="code">
                      <el-select v-model="form.catOrg.COUNTY_ID" placeholder="请选择" class="" @change="testing">
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

                <el-row :gutter="24">
                  <!--<el-col :span="20">-->
                    <!--<el-form-item label="所在地区" prop="area" class="cascaderW">-->
                      <!--<el-cascader-->
                        <!--size="300"-->
                        <!--:options="region"-->
                        <!--v-model="form.area"-->
                        <!--@active-item-change="handleRegionChange">-->
                      <!--</el-cascader>-->
                    <!--</el-form-item>-->
                  <!--</el-col>-->
                  <el-col :span="10">
                    <el-form-item label="是否法人企业">
                      <el-radio v-model="form.catEnterpriseOrgDomain.isJuridicalCompany" label="1">是</el-radio>
                      <el-radio v-model="form.catEnterpriseOrgDomain.isJuridicalCompany" label="0">否</el-radio>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="分部负责人">
                      <el-input v-model="form.catEnterpriseOrgDomain.branchPrincipal" placeholder="分部负责人"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="分部名称">
                      <el-input v-model="form.catEnterpriseOrgDomain.branchName" placeholder="分部名称"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="分部地址">
                      <el-input v-model="form.catEnterpriseOrgDomain.branchAddress" placeholder="分部地址"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="20">
                    <el-form-item label="备注">
                      <el-input
                        type="textarea"
                        :rows="4"
                        v-model="form.catEnterpriseOrgDomain.remark"
                        placeholder="备注">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <h3 class="zx">资信信息</h3>
                <el-row :gutter="24">
                  <el-col :span="10">
                    <el-form-item label="开户名称" prop="catEnterpriseCreditDomain.accountName">
                      <el-input v-model="form.catEnterpriseCreditDomain.accountName" placeholder="开户名称"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="开户银行" prop="catEnterpriseCreditDomain.accountBank">
                      <el-input v-model="form.catEnterpriseCreditDomain.accountBank" placeholder="开户银行"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="开户账号" prop="catEnterpriseCreditDomain.accountNumber">
                      <el-input v-model="form.catEnterpriseCreditDomain.accountNumber" placeholder="开户账号"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="纳税人登记号" prop="catEnterpriseCreditDomain.taxpayerCode">
                      <el-input v-model="form.catEnterpriseCreditDomain.taxpayerCode" placeholder="纳税人登记号"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="邮政编码">
                      <el-input v-model="form.catEnterpriseCreditDomain.postCode" placeholder="邮政编码"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="企业电话" prop="catEnterpriseCreditDomain.tel">
                      <el-input v-model="form.catEnterpriseCreditDomain.tel" placeholder="企业电话"></el-input>
                    </el-form-item>
                  </el-col>
                  <!--<el-col :span="10">-->
                    <!--<el-form-item label="固定电话">-->
                      <!--<el-input v-model="form.catEnterpriseCreditDomain.landlineTel" placeholder="固定电话"></el-input>-->
                    <!--</el-form-item>-->
                  <!--</el-col>-->
                  <el-col :span="10">
                    <el-form-item label="企业传真">
                      <el-input v-model="form.catEnterpriseCreditDomain.fax" placeholder="企业传真"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="企业网址">
                      <el-input v-model="form.catEnterpriseCreditDomain.website" placeholder="企业网址"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="企业QQ号" prop="catEnterpriseCreditDomain.qq">
                      <el-input v-model="form.catEnterpriseCreditDomain.qq" placeholder="企业QQ号">
                        <a v-if="this.form.catOrg.isStandard != 1" class="blue" slot="append"  href="https://store.b.qq.com/config/hrtxnew" target="_blank">申请</a>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <h3 class="yyzz">营业执照信息</h3>
                <el-row :gutter="24">
                  <el-col :span="10">
                    <el-form-item label="注册号" prop="catEnterpriseRegDomain.regNo">
                      <el-input v-model="form.catEnterpriseRegDomain.regNo" placeholder="注册号"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="名称" prop="catEnterpriseRegDomain.regName">
                      <el-input v-model="form.catEnterpriseRegDomain.regName" placeholder="名称"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="类型" prop="catEnterpriseRegDomain.regType" class="selW">
                      <el-select v-model="form.catEnterpriseRegDomain.regType" placeholder="请选择" class="width-200">
                        <el-option label="有限责任公司" value="1"></el-option>
                        <el-option label="股份有限责任公司" value="2"></el-option>
                        <el-option label="自然人独资公司（或者法人独资）" value="3"></el-option>
                        <el-option label="合伙企业" value="4"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="住所" prop="catEnterpriseRegDomain.address">
                      <el-input v-model="form.catEnterpriseRegDomain.address" placeholder="住所"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="法定代表人" prop="catEnterpriseRegDomain.juridicalPerson">
                      <el-input v-model="form.catEnterpriseRegDomain.juridicalPerson" placeholder="法定代表人"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="注册资本" prop="catEnterpriseRegDomain.regCapital">
                      <el-input v-model="form.catEnterpriseRegDomain.regCapital" placeholder="注册资本"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="注册资金" prop="catEnterpriseRegDomain.regAmount">
                      <el-col :span="10" style="padding: 0;">
                        <el-input v-model="form.catEnterpriseRegDomain.regAmount" placeholder="注册资金"></el-input>
                      </el-col>
                      <el-col :span="10">
                        <!-- 货币单位:1-人民币 2-美元 3-欧元 4-港币 -->
                        <el-select v-model="form.catEnterpriseRegDomain.regAmountUnit" placeholder="请选择" class="width-150">
                          <el-option label="人民币" value="1"></el-option>
                          <el-option label="美元" value="2"></el-option>
                          <el-option label="欧元" value="3"></el-option>
                          <el-option label="港币" value="4"></el-option>
                        </el-select>
                    </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="成立日期" prop="catEnterpriseRegDomain.foundDate">
                      <el-date-picker v-model="form.catEnterpriseRegDomain.foundDate" placeholder="成立日期" class="w100"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="14">
                    <el-form-item label="营业期限" prop="regExpire">
                          <el-date-picker
                            v-model="form.catEnterpriseRegDomain.regExpireS"
                            placeholder="开始日期">
                          </el-date-picker>
                          &nbsp;至&nbsp;
                          <el-date-picker
                            v-model="form.catEnterpriseRegDomain.regExpireE"
                            :disabled="form.catEnterpriseRegDomain.regExpireY"
                            placeholder="结束日期">
                          </el-date-picker>
                          <el-checkbox v-model="form.catEnterpriseRegDomain.regExpireY" label="永久有效"></el-checkbox>
                    </el-form-item>
                  </el-col>
                  <el-col :span="20">
                    <el-form-item label="经营范围" prop="catEnterpriseRegDomain.regScope">
                      <el-input
                        type="textarea"
                        :rows="4"
                        v-model="form.catEnterpriseRegDomain.regScope"
                        placeholder="经营范围">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="登记机关">
                      <el-input v-model="form.catEnterpriseRegDomain.regDepartment" placeholder="登记机关"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="发证日期">
                      <el-date-picker v-model="form.catEnterpriseRegDomain.regDate" placeholder="发证日期" class="w100"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="上传附件">
                      <el-button @click="handleMoveFiles('catEnterpriseRegDomain')">选择文件</el-button>
                    </el-form-item>
                  </el-col>
                  <el-col :span="20">
                    <images-preview ref="imagesPreview" refName="catEnterpriseRegDomain" v-if="form.catEnterpriseRegDomain.fileIdList" :imgIdListUnUnique="form.catEnterpriseRegDomain.fileIdList || []" @imgIdListChange="upLoadImgIdList"></images-preview>
                  </el-col>
                </el-row>
                <h3 class="scxk" v-show="form.catEnterpriseOrgDomain.factoryFlag">生产许可信息</h3>
                <div v-if="form.catEnterpriseOrgDomain.factoryFlag">
                  <el-row :gutter="24">
                    <el-col :span="10">
                      <el-form-item label="编号" prop="catManufacture.permitCode">
                        <el-input v-model="form.catManufacture.permitCode" placeholder="编号"></el-input>
                      </el-form-item>
                      <el-form-item label="企业名称" prop="catManufacture.companyName">
                        <el-input v-model="form.catManufacture.companyName" placeholder="企业名称"></el-input>
                      </el-form-item>
                      <el-form-item label="注册地址" prop="catManufacture.address">
                        <el-input v-model="form.catManufacture.address" placeholder="注册地址"></el-input>
                      </el-form-item>
                      <el-form-item label="法定代表人" prop="catManufacture.juridicalPerson">
                        <el-input v-model="form.catManufacture.juridicalPerson" placeholder="法定代表人"></el-input>
                      </el-form-item>
                      <el-form-item label="企业负责人">
                        <el-input v-model="form.catManufacture.chargePerson" placeholder="企业负责人"></el-input>
                      </el-form-item>
                      <el-form-item label="企业类型" prop="catManufacture.companyType">
                        <el-select v-model="form.catManufacture.companyType" placeholder="请选择" class="width-200">
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
                      <el-form-item label="质量负责人" prop="catManufacture.qualityOwner">
                        <el-input v-model="form.catManufacture.qualityOwner" placeholder="质量负责人"></el-input>
                      </el-form-item>
                      <el-form-item label="分类码" prop="catManufacture.kindCode">
                        <el-input v-model="form.catManufacture.kindCode" placeholder="分类码"></el-input>
                      </el-form-item>
                      <el-form-item label="有效期至" prop="catManufacture.expiryDate">
                        <el-date-picker v-model="form.catManufacture.expiryDate" placeholder="有效期至"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item label="生产地址和生产范围" prop="catManufacture.produceCategory">
                        <el-input
                          type="textarea"
                          :rows="21"
                          v-model="form.catManufacture.produceCategory"
                          placeholder="生产地址和生产范围">
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="24">
                    <el-col :span="10">
                      <el-form-item label="日常监管机构">
                        <el-input v-model="form.catManufacture.regulatoryAgency" placeholder="日常监管机构"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item label="发证机关">
                        <el-input v-model="form.catManufacture.pdInstitution" placeholder="发证机关"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item label="日常监管人员">
                        <el-input v-model="form.catManufacture.regulatoryPerson" placeholder="日常监管人员"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item label="发证日期">
                        <el-date-picker v-model="form.catManufacture.pdDate" placeholder="发证日期"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item label="监督举报电话">
                        <el-input v-model="form.catManufacture.supervisoryReportTel" placeholder="监督举报电话"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="24">
                    <el-col :span="10">
                      <el-form-item label="分装企业">
                        <el-input placeholder="分装企业" v-model="form.catManufacture.moleculeOrgName" :disabled="true">
                          <el-button slot="append" @click="splitOrgView" :disabled="form.catOrg.isStandard == 1">选择</el-button>
                        </el-input>

                      </el-form-item>
                      <!--<org ref="org" @choose="choosePacking"></org>-->
                    </el-col>
                    <el-col :span="10">
                      <el-form-item label="分装企业编码">
                        <el-input placeholder="分装企业编码" v-model="form.catManufacture.moleculeOrgCode" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item label="产品类型代码">
                        <el-select v-model="form.catEnterpriseCreditDomain.sortCode" placeholder="未选择">
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
                    <el-col :span="10">
                      <el-form-item label="药品类型属性代码">
                        <el-select v-model="form.catEnterpriseCreditDomain.drugTypeAttributeCode" placeholder="未选择">
                          <el-option label="原料药" value="a"></el-option>
                          <el-option label="制剂" value="b"></el-option>
                          <el-option label="由国家标准的提取物" value="e"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="20">
                      <el-form-item label="上传附件">
                        <!--<el-button :disabled="form.catOrg.isStandard == 1">上传图片</el-button>-->
                        <el-button @click="handleMoveFiles('catManufacture')">选择文件</el-button>
                      </el-form-item>
                    </el-col>
                    <el-col :span="20">
                      <images-preview  ref="imagesPreview" refName="catManufacture" v-if="form.catManufacture.fileIdList" :imgIdListUnUnique="form.catManufacture.fileIdList || []" @imgIdListChange="upLoadImgIdList"></images-preview>
                    </el-col>
                  </el-row>
                </div>
                <h3 class="jyxk" v-show="form.catEnterpriseOrgDomain.salerFlag || form.catEnterpriseOrgDomain.sendFlag">经营许可信息</h3>
                <div v-if="form.catEnterpriseOrgDomain.salerFlag || form.catEnterpriseOrgDomain.sendFlag">
                  <el-row :gutter="24">
                    <el-col :span="10">
                      <el-form-item label="证号" prop="catDealer.permitCode">
                        <el-input v-model="form.catDealer.permitCode" placeholder="证号"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item label="经营方式" prop="catDealer.businessType">
                        <el-input v-model="form.catDealer.businessType" placeholder="经营方式"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="24">
                    <el-col :span="10">
                      <el-form-item label="企业名称" prop="catDealer.dealName">
                        <el-input v-model="form.catDealer.dealName" placeholder="企业名称"></el-input>
                      </el-form-item>
                      <el-form-item label="注册地址" prop="catDealer.address">
                        <el-input v-model="form.catDealer.address" placeholder="注册地址"></el-input>
                      </el-form-item>
                      <el-form-item label="法定代表人" prop="catDealer.juridicalPerson">
                        <el-input v-model="form.catDealer.juridicalPerson" placeholder="法定代表人"></el-input>
                      </el-form-item>
                      <el-form-item label="企业负责人" prop="catDealer.enterprisePrincipal">
                        <el-input v-model="form.catDealer.enterprisePrincipal" placeholder="企业负责人"></el-input>
                      </el-form-item>
                      <el-form-item label="质量负责人" prop="catDealer.qualityPrincipal">
                        <el-input v-model="form.catDealer.qualityPrincipal" placeholder="质量负责人"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item label="经营范围" prop="catDealer.businessCategory">
                        <el-input
                          type="textarea"
                          :rows="10"
                          v-model="form.catDealer.businessCategory"
                          placeholder="经营范围">
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="24">
                    <el-col :span="10">
                      <el-form-item label="仓库地址">
                        <el-input v-model="form.catDealer.depositoryAddress" placeholder="仓库地址"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item label="发证机关">
                        <el-input v-model="form.catDealer.certificateDepartment" placeholder="发证机关"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item label="有效期至" prop="catDealer.expiryDate">
                        <el-date-picker v-model="form.catDealer.expiryDate" placeholder="有效期至"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item label="发证日期">
                        <el-date-picker v-model="form.catDealer.pdDate" placeholder="发证日期"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="20">
                      <el-form-item label="上传附件">
                        <!--<el-button :disabled="form.catOrg.isStandard == 1">上传图片</el-button>-->
                        <el-button @click="handleMoveFiles('catDealer')">选择文件</el-button>

                      </el-form-item>
                    </el-col>
                    <el-col :span="20">
                      <images-preview ref="imagesPreview" refName="catDealer" v-if="form.catDealer.fileIdList" :imgIdListUnUnique="form.catDealer.fileIdList || []" @imgIdListChange="upLoadImgIdList"></images-preview>

                    </el-col>
                  </el-row>
                </div>
                <h3 class="gmpone" v-show="form.catEnterpriseOrgDomain.factoryFlag">GMP信息</h3>
                <div v-if="form.catEnterpriseOrgDomain.factoryFlag">
                  <!-- 表格列表 -->
                  <div class="tableset">
                    <el-table :data="form.catAuthGmpList" border stripe>
                      <el-table-column label="证书编号">
                        <template slot-scope="scope">
                          <span>{{ scope.row.certificateNumber }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="发证机关">
                        <template slot-scope="scope">
                          <span>{{ scope.row.officeLicence }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="发证日期" :formatter="dateformat" prop="licenceDate"></el-table-column>
                      <el-table-column label="有效期至" :formatter="dateformat" prop="expiryDate"></el-table-column>
                      <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                          <a href="javascript:;" @click="addGmp(scope.$index)">编辑</a>
                          <span class="space-bar" v-if="form.catOrg.isStandard != 1"></span>
                          <a href="javascript:;" @click="delGmp(scope.$index)" v-if="form.catOrg.isStandard != 1">删除</a>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                  <p>
                    <gmp ref="gmp"></gmp>
                    <el-button @click="addGmp()" size="small" type="" class="martop5" v-if="form.catOrg.isStandard != 1">新增</el-button>
                  </p>
                </div>
                <h3 class="gmptwo" v-show="form.catEnterpriseOrgDomain.salerFlag || form.catEnterpriseOrgDomain.sendFlag">GSP信息</h3>
                <div v-if="form.catEnterpriseOrgDomain.salerFlag || form.catEnterpriseOrgDomain.sendFlag">
                  <el-row :gutter="24">
                    <el-col :span="14">
                      <el-form-item label="证书编号" prop="catAuthGsp.certifacateNumber">
                        <el-input v-model="form.catAuthGsp.certifacateNumber" placeholder="证书编号"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="14">
                      <el-form-item label="企业名称" prop="catAuthGsp.companyName">
                        <el-input v-model="form.catAuthGsp.companyName" placeholder="企业名称"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="14">
                      <el-form-item label="地址" prop="catAuthGsp.enterpriseAddress">
                        <el-input v-model="form.catAuthGsp.enterpriseAddress" placeholder="地址"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="14">
                      <el-form-item label="认证范围" prop="catAuthGsp.attestationCategory">
                        <el-input v-model="form.catAuthGsp.attestationCategory" placeholder="认证范围"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="14">
                      <el-form-item label="有效期至" prop="catAuthGsp.expiryDate">
                        <el-date-picker v-model="form.catAuthGsp.expiryDate" placeholder="有效期至"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="14">
                      <el-form-item label="发证机关">
                        <el-input v-model="form.catAuthGsp.officeLicence" placeholder="发证机关"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="14">
                      <el-form-item label="发证日期">
                        <el-date-picker v-model="form.catAuthGsp.licenceDate" placeholder="发证日期"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="20">
                      <el-form-item label="上传附件">
                        <!--<el-button :disabled="form.catOrg.isStandard == 1">上传图片</el-button>-->
                        <!--<div class="设置固定宽高">-->
                        <!--<span v-for="确定之后显示选择的图片或文件" class="设置固定宽高，最多五个*5"
                        绑定事件（鼠标经过显示小浮层（查看绑定事件（点击显示遮罩层（遮罩层中放大图片），
                        取消绑定事件（删除图片或文件）））></span>-->
                        <!--</div>-->
                        <el-button @click="handleMoveFiles('catAuthGsp')">选择文件</el-button>

                      </el-form-item>
                    </el-col>
                    <el-col :span="20">
                      <images-preview ref="imagesPreview" refName="catAuthGsp" v-if="form.catAuthGsp.fileIdList" :imgIdListUnUnique="form.catAuthGsp.fileIdList || []" @imgIdListChange="upLoadImgIdList"></images-preview>

                    </el-col>
                  </el-row>
                </div>
                <el-row>
                  <el-col>
                    <el-form-item>
                      <el-button size="small" type="primary" @click="save" :disabled="form.catOrg.isStandard == 1">提交</el-button>
                      <el-button size="small" @click="goBack()">返回</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    <!--</div>-->
    <split-org @myChange="myChangeSplic" v-if="splitOrgVisible" ref="splitOrg"></split-org>

    <choose-files ref="treeView" v-if="dialogVisible"  @handleSelectedFolder="selectedData"></choose-files>
<!--:parent-id="folderData.catFolderMessage.id"-->
    <!--遮罩层-->
    <!--<div class="mask">-->
      <!--<span @click="关闭">X</span>-->
      <!--<div>-->
        <!--<image :definitionURL=""></image>-->
      <!--</div>-->
    <!--</div>-->

  </div>
</template>

<script>

  // import { initRegion, cascRegion } from "src/axios/auditchanges/common/region"
  // import { insert, edit, get } from "src/axios/auditchanges/messageRegister/enterpriseRegister"
  // import { businessFlag, companyType, moneyType } from 'src/axios/auditchanges/common/enterprise'
  import moment from 'moment'
  import gmp from './gmp'
  import org from './org'
  import Vue from 'vue'

  import chooseFiles from 'src/pages/auditchanges/common/chooseFiles';
  import imagesPreview from 'src/pages/auditchanges/common/imagesPreview'
  import uploadButton from 'src/pages/auditchanges/common/uploadButton'

  import treeView from 'src/pages/auditchanges/common/treeView';
  import splitOrg from '../windowPanel/splitOrg'

  import {insert, getOrgId} from 'src/axios/datacenter/orgdata/sell/seller'

  import {countryAllList,provinceAllList} from "../../../../../axios/datacenter/basedata/region/region";
  import {city,county} from "../../../../../axios/datacenter/orgdata/catbuyer/catBuyer";


  export default {
    components: {
      splitOrg,
       gmp,
      org,treeView,chooseFiles, imagesPreview, uploadButton
    },
    data() {
      return {
        splitOrgVisible: false,
        dialogVisible: false,
        folderData: {},
        rules: this.metaRule(),
        // businessFlag: businessFlag(),
        // companyType: companyType(),
        // moneyType: moneyType(),
        region: [],
        countryArr: [],
        provinceArr: [],
        cityArr: [],
        countyArr: [],
        form: {
          type: undefined,
          area: undefined,
          catOrg: {
            abbr: undefined,
            creditCode: undefined,
            name: undefined,
            organizeCode: undefined,
            COUNTRY_ID: undefined,
            PROVINCE_ID: undefined,
            CITY_ID: undefined,
            COUNTY_ID: undefined,
          },
          catEnterpriseOrgDomain: {
            branchAddress: undefined,
            branchName: undefined,
            branchPrincipal: undefined,
            businessFlag: undefined,
            provinceId: undefined,
            cityId: undefined,
            countyId: undefined,
            factoryFlag: undefined,
            sendFlag: undefined,
            salerFlag: undefined,
            isJuridicalCompany: "1",
            remark: undefined,
            usedName: undefined
          },
          catEnterpriseCreditDomain: {
            accountBank: undefined,
            accountName: undefined,
            accountNumber: undefined,
            fax: undefined,
            landlineTel: undefined,
            postCode: undefined,
            qq: undefined,
            taxpayerCode: undefined,
            tel: undefined,
            website: undefined
          },
          catEnterpriseRegDomain: {
            address: undefined,
            foundDate: undefined,
            juridicalPerson: undefined,
            regAmount: undefined,
            regAmountUnit: "1",
            regCapital: undefined,
            regDate: undefined,
            regDepartment: undefined,
            regExpireE: undefined,
            regExpireS: undefined,
            regExpireY: undefined,
            regName: undefined,
            regNo: undefined,
            regScope: undefined,
            regType: undefined,
            fileIdList:[]
          },
          catManufacture: {
            address: undefined,
            chargePerson: undefined,
            companyName: undefined,
            companyType: "1",
            expiryDate: undefined,
            juridicalPerson: undefined,
            kindCode: undefined,
            pdDate: undefined,
            pdInstitution: undefined,
            permitCode: undefined,
            produceCategory: undefined,
            qualityOwner: undefined,
            regulatoryAgency: undefined,
            regulatoryPerson: undefined,
            supervisoryReportTel: undefined,
            // 分装企业ID
            moleculeOrgid: undefined,
            moleculeOrgName: undefined,
            moleculeOrgCode: undefined,
            fileIdList:[]
          },
          catDealer: {
            address: undefined,
            businessCategory: undefined,
            businessType: undefined,
            certificateDepartment: undefined,
            dealName: undefined,
            depositoryAddress: undefined,
            enterprisePrincipal: undefined,
            expiryDate: undefined,
            juridicalPerson: undefined,
            pdDate: undefined,
            permitCode: undefined,
            qualityPrincipal: undefined,
            fileIdList:[]
          },
          catAuthGmpList: [],
          catAuthGsp: {
            attestationCategory: undefined,
            certifacateNumber: undefined,
            companyName: undefined,
            enterpriseAddress: undefined,
            expiryDate: undefined,
            licenceDate: undefined,
            officeLicence: undefined,
            fileIdList:[]
          },
        },
        query: {
          searchType: undefined,
          searchText: undefined
        },
        nodesPosition: this.nodesPositionInit(),
      }
    },
    created() {
      countryAllList().then(res => {
        this.countryArr = res.data
      })
        this.$nextTick(() => {
      //     /**
      //      * 查询设置锚点位置
      //      * */
          this.getNodesHeight('product-addup-box', 'enter-shxx');
      //       //恢复初始状态
            this.removeClassCurrent('jump-product-addup')[0].classList.add('current');
      //     loading.close();
      //   });
      });
      // 获取一个OrgId
      getOrgId(this.form).then(res => {
        this.form.catOrg.id = res.data;
        sessionStorage.setItem('logginOrgId',res.data)
      })
    },
    methods: {
      removeLoginOrg(){
        sessionStorage.removeItem('logginOrgId')
      },
      // 更新分装企业
      myChangeSplic(selectCode, selectName, selectId) {
        console.log(selectCode, selectName, selectId)
        if(selectCode != undefined || selectName != undefined) {
          this.form.catManufacture.moleculeOrgCode = selectCode;
          this.form.catManufacture.moleculeOrgid = selectId;
          this.form.catManufacture.moleculeOrgName = selectName;
        }
      },
      splitOrgView(id) {
        this.splitOrgVisible = true;
        this.$nextTick(() => {
          this.$refs.splitOrg.fillData(id);
        })
      },
      chooseCountry(countryId){
        console.log(countryId,123456)
        if (countryId == 'FR20T0000010000000050000'){
          provinceAllList().then(res => {
            this.provinceArr = res.data;
          })
        }else {
          this.provinceArr = [];
          this.cityArr = [];
          this.countyArr = [];
        }
        this.form.catOrg.PROVINCE_ID ='';
        this.form.catOrg.CITY_ID = '';
        this.form.catOrg.COUNTY_ID = '';
      },
      /*====== 获取省市数据 ======*/
      chooseProvince(provinceId) {
        this.form.catOrg.CITY_ID = '';
        this.form.catOrg.COUNTY_ID = '';
        city(provinceId).then(res => {
          this.cityArr = res.data
        })
      },

      //根据选择的市加载县信息
      chooseCity(cityId) {
        this.form.catOrg.COUNTY_ID = '';
        county(cityId).then(res => {
          this.countyArr = res.data
          console.log(this.countyArr)
        })
      },
      testing(e){
        console.log(e)
      },
      nodesPositionInit(){
        return [
          {itemName: '企业基础信息', nodePosition: null, itemAbb: 'qyxx'},
          {itemName: '资信信息', nodePosition: null, itemAbb: 'zx'},
          {itemName: '营业执照信息', nodePosition: null, itemAbb: 'yyzz'},
          {itemName: '生产许可信息', nodePosition: null, itemAbb: 'scxk'},
          {itemName: '经营许可信息', nodePosition: null, itemAbb: 'jyxk'},
          {itemName: 'GMP信息', nodePosition: null, itemAbb: 'gmpone'},
          {itemName: 'GSP信息', nodePosition: null, itemAbb: 'gmptwo'}
        ]
      },
      save() {
        this.$refs.form.validate(valid => {
          if (valid) {
            let area = this.form.area;

          this.form.catEnterpriseOrgDomain.countryId = this.form.catOrg.COUNTRY_ID;
          this.form.catEnterpriseOrgDomain.provinceId = this.form.catOrg.PROVINCE_ID;
          this.form.catEnterpriseOrgDomain.cityId = this.form.catOrg.CITY_ID;
          this.form.catEnterpriseOrgDomain.countyId = this.form.catOrg.COUNTY_ID;

            // this.form.catEnterpriseOrgDomain.countryId = area.length > 0 ? area[0] : undefined;
            // this.form.catEnterpriseOrgDomain.provinceId = area.length > 1 ? area[1] : undefined;
            // this.form.catEnterpriseOrgDomain.cityId = area.length > 2 ? area[2] : undefined;
            // this.form.catEnterpriseOrgDomain.countyId = area.length > 3 ? area[3] : undefined;

            // let func = this.form.catOrg.id ? edit : insert;
          console.log("111")
            let func = insert;
            func(this.form).then(res => {
              console.log(res);
              if(res.success){
                this.$message({
                  message:res.data,
                  type:'success'
                })
                this.$router.go(-1)
              }else{
                this.$message.error(res.message)
              }

              // this.$alert(res.success ? res.data : res.message, '提示', {
              //   confirmButtonText: '确定',
              //   callback: action => {
              //     if(res.success) {
              //       window.location.reload();
              //     }
              //   }
              // });
            });
          }
        });
        this.removeLoginOrg()
      },
      goBack() {
        this.$router.go(-1);
        this.removeLoginOrg()
      },
      dateformat(row, column) {
        let date = row[column.property];
        if (!date) {
          return "";
        }
        return moment(date).format("YYYY-MM-DD");
      },
      metaRule() {
        let base = {
          "catOrg.name": [
            { required: true, message: '企业名称不能为空', trigger: 'blur' },
          ],
          code: [
            {
              validator: (rule, value, callback) => {
                if(this.form.catOrg.creditCode || this.form.catOrg.organizeCode){
                  callback();
                } else {
                  callback(new Error('统一社会信用代码和组织机构代码至少填写一项'));
                }
              }, trigger: "blur"
            },
          ],
          type: [
            {
              validator: (rule, value, callback) => {
                if(this.form.catEnterpriseOrgDomain.factoryFlag ||
                  this.form.catEnterpriseOrgDomain.salerFlag ||
                  this.form.catEnterpriseOrgDomain.sendFlag){
                  callback();
                } else {
                  callback(new Error('至少选择一种企业类型'));
                }
              }, required: true, trigger: 'blur'
            },
          ],
          "catEnterpriseOrgDomain.businessFlag": [
            {required: true, message: '经济性质不能为空', trigger: 'blur'},
          ],
          area: [
            {required: true, message: '所在地区不能为空', trigger: 'blur'},
          ],
          "catEnterpriseCreditDomain.accountName": [
            {required: true, message: '开户名称不能为空', trigger: 'blur'},
          ],
          "catEnterpriseCreditDomain.accountBank": [
            {required: true, message: '开户银行不能为空', trigger: 'blur'},
          ],
          "catEnterpriseCreditDomain.accountNumber": [
            {required: true, message: '开户账号不能为空', trigger: 'blur'},
          ],
          "catEnterpriseCreditDomain.taxpayerCode": [
            {required: true, message: '纳税人登记号不能为空', trigger: 'blur'},
          ],
          "catEnterpriseCreditDomain.tel": [
            {required: true, message: '企业电话不能为空', trigger: 'blur'},
          ],
          "catEnterpriseCreditDomain.qq": [
            {required: true, message: '企业QQ号不能为空', trigger: 'blur'},
          ],
          "catEnterpriseRegDomain.regNo": [
            {required: true, message: '注册号不能为空', trigger: 'blur'},
          ],
          "catEnterpriseRegDomain.regName": [
            {required: true, message: '名称不能为空', trigger: 'blur'},
          ],
          "catEnterpriseRegDomain.regType": [
            {required: true, message: '类型不能为空', trigger: 'blur'},
          ],
          "catEnterpriseRegDomain.address": [
            {required: true, message: '住所不能为空', trigger: 'blur'},
          ],
          "catEnterpriseRegDomain.juridicalPerson": [
            {required: true, message: '法定代表人不能为空', trigger: 'blur'},
          ],
          "catEnterpriseRegDomain.regCapital": [
            {required: true, message: '注册资本不能为空', trigger: 'blur'},
          ],
          "catEnterpriseRegDomain.regAmount": [
            {required: true, message: '注册资金不能为空', trigger: 'blur'},
          ],
          "catEnterpriseRegDomain.foundDate": [
            {required: true, message: '成立日期不能为空', trigger: 'blur'},
          ],
          regExpire: [
            {
              validator: (rule, value, callback) => {
                if(!this.form.catEnterpriseRegDomain.regExpireS){
                  callback(new Error('营业期限开始日期不能为空'));
                  return;
                }
                if(this.form.catEnterpriseRegDomain.regExpireY) {
                  callback();
                  return;
                }
                if (!this.form.catEnterpriseRegDomain.regExpireE) {
                  callback(new Error('营业期限结束日期不能为空'));
                  return;
                }
                callback();
              }, trigger: 'blur'
            },
          ],
          "catEnterpriseRegDomain.regScope": [
            {required: true, message: '经营范围不能为空', trigger: 'blur'},
          ],
          "catManufacture.permitCode": [
            {required: true, message: '编号不能为空', trigger: 'blur'},
          ],
          "catManufacture.companyName": [
            {required: true, message: '企业名称不能为空', trigger: 'blur'},
          ],
          "catManufacture.address": [
            {required: true, message: '注册地址不能为空', trigger: 'blur'},
          ],
          "catManufacture.juridicalPerson": [
            {required: true, message: '法定代表人不能为空', trigger: 'blur'},
          ],
          "catManufacture.companyType": [
            {required: true, message: '企业类型不能为空', trigger: 'blur'},
          ],
          "catManufacture.qualityOwner": [
            {required: true, message: '质量负责人不能为空', trigger: 'blur'},
          ],
          "catManufacture.kindCode": [
            {required: true, message: '分类码不能为空', trigger: 'blur'},
          ],
          "catManufacture.expiryDate": [
            {required: true, message: '有效期至不能为空', trigger: 'blur'},
          ],
          "catManufacture.produceCategory": [
            {required: true, message: '生产地址和生产范围不能为空', trigger: 'blur'},
          ],
          "catDealer.dealName": [
            {required: true, message: '企业名称不能为空', trigger: 'blur'},
          ],
          "catDealer.permitCode": [
            {required: true, message: '证号不能为空', trigger: 'blur'},
          ],
          "catDealer.businessType": [
            {required: true, message: '经营方式不能为空', trigger: 'blur'},
          ],
          "catDealer.address": [
            {required: true, message: '注册地址不能为空', trigger: 'blur'},
          ],
          "catDealer.juridicalPerson": [
            {required: true, message: '法定代表人不能为空', trigger: 'blur'},
          ],
          "catDealer.enterprisePrincipal": [
            {required: true, message: '企业负责人不能为空', trigger: 'blur'},
          ],
          "catDealer.qualityPrincipal": [
            {required: true, message: '质量负责人不能为空', trigger: 'blur'},
          ],
          "catDealer.businessCategory": [
            {required: true, message: '经营范围不能为空', trigger: 'blur'},
          ],
          "catDealer.expiryDate": [
            {required: true, message: '有效期至不能为空', trigger: 'blur'},
          ],
          "catAuthGsp.certifacateNumber": [
            {required: true, message: '证书编号不能为空', trigger: 'blur'},
          ],
          "catAuthGsp.companyName": [
            {required: true, message: '企业名称不能为空', trigger: 'blur'},
          ],
          "catAuthGsp.enterpriseAddress": [
            {required: true, message: '地址不能为空', trigger: 'blur'},
          ],
          "catAuthGsp.attestationCategory": [
            {required: true, message: '认证范围不能为空', trigger: 'blur'},
          ],
          "catAuthGsp.expiryDate": [
            {required: true, message: '有效期至不能为空', trigger: 'blur'},
          ],
        }
        return base;
      },
      addGmp(index) {
        this.$nextTick(() => {
          this.$refs.gmp.init(this.form.catAuthGmpList, index, this.form.catOrg.isStandard);
        });
      },
      delGmp(index) {
        this.$confirm('确定删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.form.catAuthGmpList.splice(index, 1);
        });
      },
      handleRegionChange(val) {
        cascRegion(this.region, val);
      },
      // chooseOrg() {
      //   this.$refs.org.init();
      // },
      // choosePacking(row) {
      //   this.$set(this.form.catManufacture, "moleculeOrgid", row.ID);
      //   this.$set(this.form.catManufacture, "moleculeOrgName", row.NAME);
      //   this.$set(this.form.catManufacture, "moleculeOrgCode", row.CODE);
      // },
      //选择文件弹窗
      handleMoveFiles(refName){
        const tis = this;
        tis.dialogVisible = true;
        // const _ids = this.selectedFiles.concat(this.selectedFolder);
        // if(_ids.length > 0){
        //   let objFiles = {fileIdList: this.selectedFiles, folderIdList: this.selectedFolder};
          this.$nextTick(() => {
            // 通过组件中设置的ref属性调取formView.vue中的fillData()方法加载弹窗内容
            this.$refs.treeView.initData(refName);
          })
        // }else{
        //   return this.$message({
        //     message: '请选择要移动的文件',
        //     type: 'warning'
        //   });
        // }
      },
      selectedData(res){
        // 所选择的树节点id
        console.log('selected data===', res);
        if(!this.form[res.refName].fileIdList) {
          this.$set(this.form[res.refName], "fileIdList", []);
        }
        this.$nextTick(()=>{
          res.data.forEach(function (item) {
            this.form[res.refName].fileIdList.push(item);
          }.bind(this));
        })
      },
      upLoadImgIdList(res){
        //需要上传的id集合
        console.log('========从预览里面来的');
        console.log(res);
        this.$set(this.form[res.refName], "fileIdList", res.data);
      },
      checkOne(){
        this.$nextTick(()=>{
          /**
           * 查询设置锚点位置
           * */
          this.getNodesHeight('product-addup-box', 'enter-shxx');
        })
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
        console.log('2-----------', this.nodesPosition)
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
    watch: {
      visible(newVal) {
        if (newVal == false) {
          window.onscroll = null;
          this.removeFixed('product-addup-side')
        } else {
          window.onscroll = function () {
            let scrolltop=document.documentElement.scrollTop||document.body.scrollTop;
            this.dialogBoxScroll(scrolltop, 'jump-product-addup', 'product-addup-side')
          }.bind(this)
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
      window.onscroll = null
    }
  }
</script>
<style>
  /*@import "../../../../assets/css/auditchanges.css";*/
</style>
