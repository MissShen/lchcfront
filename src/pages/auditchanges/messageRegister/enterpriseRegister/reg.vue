<template>
  <div>
    <!--<div class="tabs-panel">
      <span class="active">企业信息注册</span>
    </div>-->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <div class="">
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
              <el-form ref="form" :model="form" :rules="rules" label-position="left" size="small" label-width="126px" :disabled="form.catEnterpriseOrgDomain.checkFlag != 2 && form.catEnterpriseOrgDomain.checkFlag != 3">
                <h3 class="qyxx">企业基础信息</h3>
                <el-row :gutter="24">
                  <el-col :span="10">
                    <el-form-item label="企业名称" prop="catOrg.name">
                      <el-input class="width-260" v-model="form.catOrg.name" placeholder="企业名称" :maxlength="75" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="10">
                    <el-form-item label="统一社会信用代码">
                      <el-input class="width-260" v-model="form.catOrg.creditCode" placeholder="统一社会信用代码" :maxlength="18"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" :offset="2">
                    <el-form-item label="组织机构代码">
                      <el-input class="width-260" v-model="form.catOrg.organizeCode" placeholder="组织机构代码" :maxlength="25" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="10">
                    <el-form-item label="企业类型" prop="type" class="sell-checkbox-wrapper">
                      <el-checkbox @change="checkOne" v-model="form.catEnterpriseOrgDomain.factoryFlag" label="生产企业"></el-checkbox>
                      <el-checkbox  @change="checkOne" v-model="form.catEnterpriseOrgDomain.salerFlag" label="代理企业"></el-checkbox>
                      <el-checkbox @change="checkOne" v-model="form.catEnterpriseOrgDomain.sendFlag" label="配送企业"></el-checkbox>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" :offset="2">
                    <el-form-item label="企业简称" prop="catOrg.abbr">
                      <el-input class="width-260" v-model="form.catOrg.abbr" placeholder="企业简称" :maxlength="75"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="10">
                    <el-form-item label="经济性质"  prop="catEnterpriseOrgDomain.businessFlag">
                      <el-select class="width-260" v-model="form.catEnterpriseOrgDomain.businessFlag" placeholder="经济性质">
                        <el-option v-for="x in businessFlag" :key="x.key" :label="x.value"
                                   :value="x.key" ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" :offset="2">
                    <el-form-item label="企业曾用名">
                      <!--textW-->
                      <el-input
                        class="width-260"
                        type="textarea"
                        :rows="2"
                        v-model="form.catEnterpriseOrgDomain.usedName"
                        placeholder="企业曾用名"
                        :maxlength="500"
                        >
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="10">
                    <el-form-item label="所在地区" prop="area">
                      <el-cascader
                        size="small"
                        :options="region"
                        v-model="form.area"
                        @active-item-change="handleRegionChange"
                        class="width-260">
                      </el-cascader>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" :offset="2">
                    <el-form-item label="是否法人企业">
                      <el-radio v-model="form.catEnterpriseOrgDomain.isJuridicalCompany" label="1">是</el-radio>
                      <el-radio v-model="form.catEnterpriseOrgDomain.isJuridicalCompany" label="0">否</el-radio>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="10">
                    <el-form-item label="分部负责人">
                      <el-input v-model="form.catEnterpriseOrgDomain.branchPrincipal" :maxlength="50" placeholder="分部负责人" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" :offset="2">
                    <el-form-item label="分部名称">
                      <el-input v-model="form.catEnterpriseOrgDomain.branchName" :maxlength="50" placeholder="分部名称" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="分部地址">
                      <el-input v-model="form.catEnterpriseOrgDomain.branchAddress" :maxlength="50" placeholder="分部地址" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="10">
                    <el-form-item label="备注">
                      <el-input
                        type="textarea"
                        :rows="4"
                        v-model="form.catEnterpriseOrgDomain.remark"
                        placeholder="备注"
                        :maxlength="500"
                        class="width-260">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <h3 class="zx">资信信息</h3>
                <el-row :gutter="24">
                  <el-col :span="10">
                    <el-form-item label="开户名称" prop="catEnterpriseCreditDomain.accountName">
                      <el-input v-model="form.catEnterpriseCreditDomain.accountName" :maxlength="50" placeholder="开户名称" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" :offset="2">
                    <el-form-item label="开户银行" prop="catEnterpriseCreditDomain.accountBank">
                      <el-input v-model="form.catEnterpriseCreditDomain.accountBank" :maxlength="50" placeholder="开户银行" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="开户账号" prop="catEnterpriseCreditDomain.accountNumber">
                      <el-input v-model="form.catEnterpriseCreditDomain.accountNumber" :maxlength="50" placeholder="开户账号" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" :offset="2">
                    <el-form-item label="纳税人登记号" prop="catEnterpriseCreditDomain.taxpayerCode">
                      <el-input v-model="form.catEnterpriseCreditDomain.taxpayerCode" :maxlength="50" placeholder="纳税人登记号"  class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="邮政编码" prop="catEnterpriseCreditDomain.postCode">
                      <el-input v-model="form.catEnterpriseCreditDomain.postCode" :maxlength="6" placeholder="邮政编码" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" :offset="2">
                    <el-form-item label="企业电话" prop="catEnterpriseCreditDomain.tel">
                      <el-input v-model="form.catEnterpriseCreditDomain.tel" :maxlength="25" placeholder="企业电话" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <!--<el-col :span="10">-->
                    <!--<el-form-item label="固定电话">-->
                      <!--<el-input v-model="form.catEnterpriseCreditDomain.landlineTel" placeholder="固定电话"></el-input>-->
                    <!--</el-form-item>-->
                  <!--</el-col>-->
                  <el-col :span="10">
                    <el-form-item label="企业传真">
                      <el-input v-model="form.catEnterpriseCreditDomain.fax" :maxlength="25" placeholder="企业传真" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" :offset="2">
                    <el-form-item label="企业网址">
                      <el-input v-model="form.catEnterpriseCreditDomain.website" :maxlength="50" placeholder="企业网址" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="企业QQ号">
                      <el-input v-model="form.catEnterpriseCreditDomain.qq" :maxlength="10" placeholder="企业QQ号" class="width-260">
                        <a v-if="form.catEnterpriseOrgDomain.checkFlag == 2 || form.catEnterpriseOrgDomain.checkFlag == 3" class="" slot="append"  href="https://store.b.qq.com/config/hrtxnew" target="_blank" >申请</a>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <h3 class="zclxr">注册联系人</h3>
                <el-row :gutter="24">
                  <el-col :span="10">
                    <el-form-item label="联系人姓名" prop="catRegisteredContact.userName">
                      <el-input v-model="form.catRegisteredContact.userName" :maxlength="50" placeholder="联系人姓名" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" :offset="2">
                    <el-form-item label="固定电话" prop="catRegisteredContact.fixedTelephone">
                      <el-input v-model="form.catRegisteredContact.fixedTelephone" :maxlength="50" placeholder="固定电话" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="手机" prop="catRegisteredContact.phone">
                      <el-input v-model="form.catRegisteredContact.phone" placeholder="手机" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" :offset="2">
                    <el-form-item label="申报人传真" prop="catRegisteredContact.fax">
                      <el-input v-model="form.catRegisteredContact.fax" :maxlength="50" placeholder="申报人传真" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="电子邮箱" prop="catRegisteredContact.mail">
                      <el-input v-model="form.catRegisteredContact.mail" :maxlength="50" placeholder="电子邮箱" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" :offset="2">
                    <el-form-item label="身份证号" prop="catRegisteredContact.idCardNo">
                      <el-input v-model="form.catRegisteredContact.idCardNo" :maxlength="50" placeholder="身份证号" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="20">
                    <el-form-item label="联系地址" prop="catRegisteredContact.addr">
                      <el-input v-model="form.catRegisteredContact.addr" @input="checkNum(form.catEnterpriseRegDomain.regAmount)" placeholder="联系地址" class="width-460"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="20">
                    <el-form-item label="紧急联系电话(手机)" prop="catRegisteredContact.emergencyContactPhone">
                      <el-input v-model="form.catRegisteredContact.emergencyContactPhone" placeholder="紧急联系电话(手机)" class="width-460"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <h3 class="yyzz">营业执照信息</h3>
                <el-row :gutter="24">
                  <el-col :span="10">
                    <el-form-item label="注册号" prop="catEnterpriseRegDomain.regNo">
                      <el-input v-model="form.catEnterpriseRegDomain.regNo" :maxlength="50" placeholder="注册号" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" :offset="2">
                    <el-form-item label="企业名称" prop="catEnterpriseRegDomain.regName">
                      <el-input v-model="form.catEnterpriseRegDomain.regName" :maxlength="50" placeholder="企业名称" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="类型" prop="catEnterpriseRegDomain.regType">
                      <el-select v-model="form.catEnterpriseRegDomain.regType" placeholder="类型" class="width-260">
                        <el-option v-for="x in companyType" :key="x.key" :label="x.value"
                                   :value="x.key" ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" :offset="2">
                    <el-form-item label="住所" prop="catEnterpriseRegDomain.address">
                      <el-input v-model="form.catEnterpriseRegDomain.address" :maxlength="50" placeholder="住所" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="法定代表人" prop="catEnterpriseRegDomain.juridicalPerson">
                      <el-input v-model="form.catEnterpriseRegDomain.juridicalPerson" :maxlength="50" placeholder="法定代表人" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" :offset="2">
                    <el-form-item label="注册资本" prop="catEnterpriseRegDomain.regCapital">
                      <el-input v-model="form.catEnterpriseRegDomain.regCapital" :maxlength="50" placeholder="注册资本（大写金额）" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="注册资金" prop="catEnterpriseRegDomain.regAmount">
                        <el-input :min="0" type="number" v-model="form.catEnterpriseRegDomain.regAmount" @input="checkNum(form.catEnterpriseRegDomain.regAmount)" placeholder="注册资金" class="width-200"></el-input>
                        <el-select v-model="form.catEnterpriseRegDomain.regAmountUnit" placeholder="币种" class="width-120">
                          <el-option v-for="x in moneyType" :key="x.key" :label="x.value"
                                     :value="x.key"></el-option>
                        </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="成立日期" prop="catEnterpriseRegDomain.foundDate" class="width-420">
                      <el-date-picker v-model="form.catEnterpriseRegDomain.foundDate" placeholder="成立日期"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="20">
                    <el-form-item label="营业期限" prop="catEnterpriseRegDomain.regExpireS" ref="regExpireS">
                          <el-date-picker
                            ref="dateStart"
                            v-model="form.catEnterpriseRegDomain.regExpireS"
                            placeholder="开始日期">
                          </el-date-picker>
                          &nbsp;至&nbsp;
                          <el-date-picker
                            ref="dataEnd"
                            v-model="form.catEnterpriseRegDomain.regExpireE"
                            :disabled="form.catEnterpriseRegDomain.regExpireY"
                            placeholder="结束日期">
                          </el-date-picker>
                          <el-checkbox @change="changeRegExpireY" v-model="form.catEnterpriseRegDomain.regExpireY" label="永久有效"></el-checkbox>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="经营范围" prop="catEnterpriseRegDomain.regScope">
                      <el-input
                        type="textarea"
                        :rows="4"
                        v-model="form.catEnterpriseRegDomain.regScope"
                        placeholder="经营范围"
                        :maxlength="2000"
                        class="width-260">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="10">
                    <el-form-item label="登记机关">
                      <el-input v-model="form.catEnterpriseRegDomain.regDepartment" :maxlength="50" placeholder="登记机关" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" :offset="2">
                    <el-form-item label="发证日期" class="width-420">
                      <el-date-picker v-model="form.catEnterpriseRegDomain.regDate" placeholder="发证日期"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="选择附件" prop="catEnterpriseRegDomain.fileIdList">
                      <el-button @click="handleMoveFiles('catEnterpriseRegDomain')" :disabled="form.catEnterpriseOrgDomain.checkFlag != 2 && form.catEnterpriseOrgDomain.checkFlag != 3">选择文件</el-button>
                    </el-form-item>
                  </el-col>
                  <el-col :span="20">
                    <el-form-item>
                      <images-preview :operate="form.catEnterpriseOrgDomain.checkFlag == 2 || form.catEnterpriseOrgDomain.checkFlag == 3" ref="imagesPreview" refName="catEnterpriseRegDomain" v-if="form.catEnterpriseRegDomain.fileIdList" :imgIdListUnUnique="form.catEnterpriseRegDomain.fileIdList || []" @imgIdListChange="upLoadImgIdList"></images-preview>
                    </el-form-item>
                  </el-col>
                </el-row>
                <h3 class="scxk" v-show="form.catEnterpriseOrgDomain.factoryFlag">生产许可信息</h3>
                <div v-if="form.catEnterpriseOrgDomain.factoryFlag">
                  <el-row :gutter="24">
                    <el-col :span="10">
                      <el-form-item label="编号" prop="catManufacture.permitCode">
                        <el-input v-model="form.catManufacture.permitCode" :maxlength="50" placeholder="编号" class="width-260"></el-input>
                      </el-form-item>
                      <el-form-item label="企业名称" prop="catManufacture.companyName">
                        <el-input v-model="form.catManufacture.companyName" :maxlength="50" placeholder="企业名称" class="width-260"></el-input>
                      </el-form-item>
                      <el-form-item label="注册地址" prop="catManufacture.address">
                        <el-input v-model="form.catManufacture.address" :maxlength="50" placeholder="注册地址" class="width-260"></el-input>
                      </el-form-item>
                      <el-form-item label="法定代表人" prop="catManufacture.juridicalPerson">
                        <el-input v-model="form.catManufacture.juridicalPerson" :maxlength="50" placeholder="法定代表人" class="width-260"></el-input>
                      </el-form-item>
                      <el-form-item label="企业负责人">
                        <el-input v-model="form.catManufacture.chargePerson" :maxlength="50" placeholder="企业负责人" class="width-260"></el-input>
                      </el-form-item>
                      <el-form-item label="类型">
                        <el-select v-model="form.catManufacture.companyType" placeholder="类型"  @change="form.catManufacture.companyType = form.catManufacture.companyType || undefined" class="width-260">
                          <el-option label="请选择" value="" />
                          <el-option v-for="x in companyType" :key="x.key" :label="x.value"
                                     :value="x.key"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="质量负责人" prop="catManufacture.qualityOwner">
                        <el-input v-model="form.catManufacture.qualityOwner" :maxlength="50" placeholder="质量负责人" class="width-260"></el-input>
                      </el-form-item>
                      <el-form-item label="分类码" prop="catManufacture.kindCode">
                        <el-input v-model="form.catManufacture.kindCode" :maxlength="50" placeholder="分类码" class="width-260"></el-input>
                      </el-form-item>
                      <el-form-item label="有效期至" prop="catManufacture.expiryDate" class="width-420">
                        <el-date-picker v-model="form.catManufacture.expiryDate" placeholder="有效期至" ></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="2">
                      <el-form-item label="生产地址和生产范围" prop="catManufacture.produceCategory" label-width="160px">
                        <el-input
                          type="textarea"
                          :rows="21"
                          v-model="form.catManufacture.produceCategory"
                          placeholder="生产地址和生产范围"
                          :maxlength="500"
                          class="width-260">
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="24">
                    <el-col :span="10">
                      <el-form-item label="日常监管机构">
                        <el-input v-model="form.catManufacture.regulatoryAgency" :maxlength="50" placeholder="日常监管机构" class="width-260"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="2">
                      <el-form-item label="发证机关">
                        <el-input v-model="form.catManufacture.pdInstitution" :maxlength="50" placeholder="发证机关" class="width-260"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item label="日常监管人员">
                        <el-input v-model="form.catManufacture.regulatoryPerson" :maxlength="50" placeholder="日常监管人员" class="width-260"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="2">
                      <el-form-item label="发证日期" class="width-420">
                        <el-date-picker v-model="form.catManufacture.pdDate" placeholder="发证日期"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item label="监督举报电话">
                        <el-input v-model="form.catManufacture.supervisoryReportTel" :maxlength="30" placeholder="监督举报电话" class="width-260"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="24">
                    <el-col :span="10">
                      <el-form-item label="分装企业">
                        <el-input placeholder="分装企业" v-model="form.catManufacture.moleculeOrgName" class="width-260">
                          <el-button slot="append" @click="chooseOrg" :disabled="form.catEnterpriseOrgDomain.checkFlag != 2 && form.catEnterpriseOrgDomain.checkFlag != 3">选择</el-button>
                        </el-input>
                      </el-form-item>
                      <org ref="org" @choose="choosePacking"></org>
                    </el-col>
                    <el-col :span="10" :offset="2">
                      <el-form-item label="分装企业编码">
                        <el-input placeholder="分装企业编码" v-model="form.catManufacture.moleculeOrgCode" :disabled="form.catEnterpriseOrgDomain.checkFlag != 2 && form.catEnterpriseOrgDomain.checkFlag != 3" class="width-260"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item label="产品类型代码">
                        <el-select v-model="form.catEnterpriseCreditDomain.sortCode" placeholder="未选择" class="width-260">
                          <!--w100 -->
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
                    <el-col :span="10" :offset="2">
                      <el-form-item label="药品类型属性代码">
                        <el-select v-model="form.catEnterpriseCreditDomain.drugTypeAttributeCode" placeholder="未选择" class="width-260">
                          <el-option label="原料药" value="a"></el-option>
                          <el-option label="制剂" value="b"></el-option>
                          <el-option label="由国家标准的提取物" value="e"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="20">
                      <el-form-item label="选择附件" prop="catManufacture.fileIdList">
                        <el-button @click="handleMoveFiles('catManufacture')" :disabled="form.catEnterpriseOrgDomain.checkFlag != 2 && form.catEnterpriseOrgDomain.checkFlag != 3">选择文件</el-button>
                      </el-form-item>
                    </el-col>
                    <el-col :span="20">
                      <el-form-item>
                        <images-preview :operate="form.catEnterpriseOrgDomain.checkFlag == 2 || form.catEnterpriseOrgDomain.checkFlag == 3" ref="imagesPreview" refName="catManufacture" v-if="form.catManufacture.fileIdList" :imgIdListUnUnique="form.catManufacture.fileIdList || []" @imgIdListChange="upLoadImgIdList"></images-preview>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <h3 class="jyxk" v-show="form.catEnterpriseOrgDomain.salerFlag || form.catEnterpriseOrgDomain.sendFlag">经营许可信息</h3>
                <div v-if="form.catEnterpriseOrgDomain.salerFlag || form.catEnterpriseOrgDomain.sendFlag">
                  <el-row :gutter="24">
                    <el-col :span="12">
                      <el-form-item label="证号" prop="catDealer.permitCode">
                        <el-input v-model="form.catDealer.permitCode" :maxlength="50" placeholder="证号" class="width-260"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="经营方式" prop="catDealer.businessType">
                        <el-input v-model="form.catDealer.businessType" :maxlength="50" placeholder="经营方式" class="width-260"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="24">
                    <el-col :span="12">
                      <el-form-item label="企业名称" prop="catDealer.dealName">
                        <el-input v-model="form.catDealer.dealName" :maxlength="50" placeholder="企业名称" class="width-260"></el-input>
                      </el-form-item>
                      <el-form-item label="注册地址" prop="catDealer.address">
                        <el-input v-model="form.catDealer.address" :maxlength="50" placeholder="注册地址" class="width-260"></el-input>
                      </el-form-item>
                      <el-form-item label="法定代表人" prop="catDealer.juridicalPerson">
                        <el-input v-model="form.catDealer.juridicalPerson" :maxlength="30" placeholder="法定代表人" class="width-260"></el-input>
                      </el-form-item>
                      <el-form-item label="企业负责人" prop="catDealer.enterprisePrincipal">
                        <el-input v-model="form.catDealer.enterprisePrincipal" :maxlength="12" placeholder="企业负责人" class="width-260"></el-input>
                      </el-form-item>
                      <el-form-item label="质量负责人" prop="catDealer.qualityPrincipal">
                        <el-input v-model="form.catDealer.qualityPrincipal" :maxlength="12" placeholder="质量负责人" class="width-260"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="经营范围" prop="catDealer.businessCategory">
                        <el-input
                          type="textarea"
                          :rows="10"
                          v-model="form.catDealer.businessCategory"
                          :maxlength="500"
                          placeholder="经营范围"
                          class="width-260">
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="24">
                    <el-col :span="12">
                      <el-form-item label="仓库地址">
                        <el-input v-model="form.catDealer.depositoryAddress" :maxlength="500" placeholder="仓库地址" class="width-260"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="发证机关">
                        <el-input v-model="form.catDealer.certificateDepartment" :maxlength="50" placeholder="发证机关" class="width-260"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="有效期至" prop="catDealer.expiryDate" class="width-420">
                        <el-date-picker v-model="form.catDealer.expiryDate" placeholder="有效期至"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="发证日期" class="width-420">
                        <el-date-picker v-model="form.catDealer.pdDate" placeholder="发证日期"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="20">
                      <el-form-item label="选择附件" prop="catDealer.fileIdList">
                        <el-button @click="handleMoveFiles('catDealer')" :disabled="form.catEnterpriseOrgDomain.checkFlag != 2 && form.catEnterpriseOrgDomain.checkFlag != 3">选择文件</el-button>
                      </el-form-item>
                    </el-col>
                    <el-col :span="20">
                      <el-form-item>
                        <images-preview :operate="form.catEnterpriseOrgDomain.checkFlag == 2 || form.catEnterpriseOrgDomain.checkFlag == 3" ref="imagesPreview" refName="catDealer" v-if="form.catDealer.fileIdList" :imgIdListUnUnique="form.catDealer.fileIdList || []" @imgIdListChange="upLoadImgIdList"></images-preview>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <h3 class="gmpone" v-show="form.catEnterpriseOrgDomain.factoryFlag">GMP信息</h3>
                <div class="gmp-table-box" v-if="form.catEnterpriseOrgDomain.factoryFlag">
                  <!-- 表格列表 -->
                  <div class="tableset">
                    <el-table
                      :data="form.catAuthGmpList"
                      border
                      stripe>
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
                      <el-table-column label="操作" width="140">
                        <template slot-scope="scope">
                          <div class="operates">
                            <span>
                              <a href="javascript:;" @click="addGmp(scope.$index)">编辑</a>
                            </span>
                            <span>
                              <a href="javascript:;" @click="delGmp(scope.$index)" v-if="form.catEnterpriseOrgDomain.checkFlag == 2 || form.catEnterpriseOrgDomain.checkFlag == 3">删除</a>
                            </span>
                          </div>
                          <!--<span class="space-bar" v-if="form.catEnterpriseOrgDomain.checkFlag == 3"></span>-->
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                    <gmp ref="gmp"></gmp>
                    <div class="gmp-space" v-if="form.catEnterpriseOrgDomain.checkFlag == 2 || form.catEnterpriseOrgDomain.checkFlag == 3">
                      <el-button type="" @click="addGmp()" size="small">新增</el-button>
                    </div>
                </div>
                <h3 class="gmptwo" v-show="form.catEnterpriseOrgDomain.salerFlag || form.catEnterpriseOrgDomain.sendFlag">GSP信息</h3>
                <div v-if="form.catEnterpriseOrgDomain.salerFlag || form.catEnterpriseOrgDomain.sendFlag">
                  <el-row :gutter="24">
                    <el-col :span="14">
                      <el-form-item label="证书编号" prop="catAuthGsp.certifacateNumber">
                        <el-input v-model="form.catAuthGsp.certifacateNumber" :maxlength="25" placeholder="证书编号" class="width-260"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="14">
                      <el-form-item label="企业名称" prop="catAuthGsp.companyName">
                        <el-input v-model="form.catAuthGsp.companyName" :maxlength="50" placeholder="企业名称" class="width-260"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="14">
                      <el-form-item label="地址" prop="catAuthGsp.enterpriseAddress">
                        <el-input v-model="form.catAuthGsp.enterpriseAddress" :maxlength="50" placeholder="地址" class="width-260"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="14">
                      <el-form-item label="认证范围" prop="catAuthGsp.attestationCategory">
                        <el-input v-model="form.catAuthGsp.attestationCategory" :maxlength="50" placeholder="认证范围" class="width-260"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="14">
                      <el-form-item label="有效期至" prop="catAuthGsp.expiryDate" class="width-420">
                        <el-date-picker v-model="form.catAuthGsp.expiryDate" placeholder="有效期至"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="14">
                      <el-form-item label="发证机关">
                        <el-input v-model="form.catAuthGsp.officeLicence" :maxlength="50" placeholder="发证机关" class="width-260"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="14">
                      <el-form-item label="发证日期" class="width-420">
                        <el-date-picker v-model="form.catAuthGsp.licenceDate" placeholder="发证日期"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="20">
                      <el-form-item label="选择附件" prop="catAuthGsp.fileIdList">
                        <el-button @click="handleMoveFiles('catAuthGsp')" :disabled="form.catEnterpriseOrgDomain.checkFlag != 2 && form.catEnterpriseOrgDomain.checkFlag != 3">选择文件</el-button>
                      </el-form-item>
                    </el-col>
                    <el-col :span="20">
                      <el-form-item>
                        <images-preview :operate="form.catEnterpriseOrgDomain.checkFlag == 2 || form.catEnterpriseOrgDomain.checkFlag == 3" ref="imagesPreview" refName="catAuthGsp" v-if="form.catAuthGsp.fileIdList" :imgIdListUnUnique="form.catAuthGsp.fileIdList || []" @imgIdListChange="upLoadImgIdList"></images-preview>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <p class="space-30">
                  <el-button type="success" size="small" @click="save(3)" :disabled="form.catEnterpriseOrgDomain.checkFlag != 2 && form.catEnterpriseOrgDomain.checkFlag != 3">保存</el-button>
                  <el-button type="warning" size="small" @click="save(0)" :disabled="form.catEnterpriseOrgDomain.checkFlag != 2 && form.catEnterpriseOrgDomain.checkFlag != 3">提交</el-button>
                  <el-button type="warning" size="small" @click="addQuestion" v-if="form.catEnterpriseOrgDomain.checkFlag == 1">质疑</el-button>
                  <el-button type="warning" size="small" @click="queryDoubt" v-if="form.catEnterpriseOrgDomain.checkFlag == 4">查看质疑</el-button>
                </p>
              </el-form>
            </div>

            <el-dialog :close-on-click-modal="false" top="10vh" title="质疑" width="80%" :visible.sync="showQuestion" :before-close="closeQuestion">
              <el-form ref="doubt" :model="doubt" label-width="100px" label-position="right" size="small">
                <el-row :gutter="24">
                  <el-col :span="18">
                    <el-form-item class="need-before" label="质疑内容">
                      <el-input type="textarea" v-model="doubt.content" placeholder="质疑内容" :rows="4"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="18">
                    <el-form-item>
                      <upload-button class="button-start" buttonFlag="doubt" :fileListFlag='doubt.fileList' fileType="1" @uploadList="getDoubtList"></upload-button>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item>
                      <images-preview
                        refName="doubt"
                        ref="imagesPreview"
                        :imgIdListUnUnique="doubt.fileList"
                        @imgIdListChange="doubtList"></images-preview>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <span slot="footer">
                <el-button type="primary" @click="saveDoubt">保存</el-button>
                <el-button @click="closeQuestion">关闭</el-button>
              </span>
            </el-dialog>

            <el-dialog :close-on-click-modal="false" top="10vh" title="查看质疑" width="80%" :visible.sync="showDoubt" :before-close="closeDoubt">
              <div class="tableset">
                <el-table :data="doubts" border stripe>
                  <el-table-column label="质疑内容" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span>{{ scope.row.QUESTION_EDITVAL }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="质疑时间" :formatter="dateformat" prop="QUESTION_DATE" />
                  <el-table-column label="查看图片">
                    <template slot-scope="scope">
                      <images-preview v-if="scope.row.fileList" :operate="false" :imgIdListUnUnique="scope.row.fileList"></images-preview>
                    </template>
                  </el-table-column>
                  <el-table-column label="回复时间">
                    <template slot-scope="scope">
                      <span>{{ scope.row.REPLY_DATE }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="回复内容">
                    <template slot-scope="scope">
                      <span>{{ scope.row.REPLY_CONTENT }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <span slot="footer">
                <el-button @click="closeDoubt">关闭</el-button>
              </span>
            </el-dialog>
          </div>
        </div>
      </div>
    </div>

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

  import { initRegion, cascRegion } from "src/axios/auditchanges/common/region"
  import { dateParse } from "src/axios/auditchanges/common/nestedJson"
  import { insert, edit, get, addDoubt, queryDoubt } from "src/axios/auditchanges/messageRegister/enterpriseRegister"
  import { businessFlag, companyType, moneyType } from 'src/axios/auditchanges/common/enterprise'
  import moment from 'moment'
  import gmp from './gmp'
  import org from './org'
  import Vue from 'vue'

  import chooseFiles from 'src/pages/auditchanges/common/chooseFiles';
  import imagesPreview from 'src/pages/auditchanges/common/imagesPreview'
  import uploadButton from 'src/pages/auditchanges/common/uploadButton'

  import treeView from 'src/pages/auditchanges/common/treeView';
  import {windowScroll} from 'src/components/mixins/scrolls'

  export default {
    mixins:[windowScroll],
    components: {
      gmp, org, treeView, chooseFiles, imagesPreview, uploadButton
    },
    data() {
      return {
        dialogVisible: false,
        folderData: {},
        rules: {
          'catOrg.name':
            { required: true, message: '企业名称不能为空', trigger: 'blur' },
          type:
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
          'catEnterpriseOrgDomain.businessFlag':
            {required: true, message: '经济性质不能为空', trigger: 'blur'},
          area:
            {required: true, message: '所在地区不能为空', trigger: 'blur'},
          'catEnterpriseCreditDomain.accountName':
            {required: true, message: '开户名称不能为空', trigger: 'blur'}
          ,
          'catEnterpriseCreditDomain.accountBank':
            {required: true, message: '开户银行不能为空', trigger: 'blur'},

          'catEnterpriseCreditDomain.accountNumber':
            {required: true, message: '开户账号不能为空', trigger: 'blur'},
          'catEnterpriseCreditDomain.taxpayerCode':
            {required: true, message: '纳税人登记号不能为空', trigger: 'blur'},
          'catEnterpriseCreditDomain.tel':
            {required: true, message: '企业电话不能为空', trigger: 'blur'},
          'catEnterpriseCreditDomain.postCode':
            {
              validator: (rule, value, callback) => {
                if(!value || /^\d{6}$/.test(value)){
                  callback();
                } else {
                  callback(new Error('邮政编码格式不正确'));
                }
              }, trigger: "blur"
            },
          'catEnterpriseRegDomain.regNo':
            {required: true, message: '注册号不能为空', trigger: 'blur'},
          'catEnterpriseRegDomain.regName':
            {required: true, message: '企业名称不能为空', trigger: 'blur'},
          'catEnterpriseRegDomain.regType':
            {required: true, message: '类型不能为空', trigger: 'blur'},
          'catEnterpriseRegDomain.address':
            {required: true, message: '住所不能为空', trigger: 'blur'},
          'catEnterpriseRegDomain.juridicalPerson':
            {required: true, message: '法定代表人不能为空', trigger: 'blur'},
          'catEnterpriseRegDomain.regCapital':
            {required: true, message: '注册资本不能为空', trigger: 'blur'},
          'catEnterpriseRegDomain.regAmount':
            {required: true, message: '注册资金不能为空', trigger: 'blur'},
          'catEnterpriseRegDomain.foundDate':
            {required: true, message: '成立日期不能为空', trigger: 'blur'},
          'catEnterpriseRegDomain.regExpireS':  {required: true, validator: (rule, value, callback)=>{
            if(rule.required){
              if(this.form.catEnterpriseRegDomain.regExpireE && !this.form.catEnterpriseRegDomain.regExpireY){
                callback()
              }else if(this.form.catEnterpriseRegDomain.regExpireE === null && !this.form.catEnterpriseRegDomain.regExpireY){
                callback(new Error('请输入结束日期'))
                this.$refs.dateStart.$el.childNodes[1].style.border = '1px solid #dcdfe6'
              }
              else if(this.form.catEnterpriseRegDomain.regExpireE === null && this.form.catEnterpriseRegDomain.regExpireY){
                this.rules['catEnterpriseRegDomain.regExpireS'].required = false;
                callback();
              }
            }
          }, trigger: 'blur'},
          'catEnterpriseRegDomain.regScope':
            {required: true, message: '经营范围不能为空', trigger: 'blur'},
          'catEnterpriseRegDomain.fileIdList':
            {required: true, message: '附件不能为空', trigger: 'blur'},
          "catRegisteredContact.userName":
            {required: true, message: '联系人姓名不能为空', trigger: 'blur'},
          "catRegisteredContact.fixedTelephone":
            {required: true, message: '固定电话不能为空', trigger: 'blur'},
          "catRegisteredContact.phone":
            {required: true, message: '手机不能为空', trigger: 'blur'},
          "catRegisteredContact.addr":
            {required: true, message: '联系地址不能为空', trigger: 'blur'},
          "catRegisteredContact.idCardNo":
            {required: true, message: '身份证号不能为空', trigger: 'blur'},
          'catManufacture.permitCode':
            {required: true, message: '编号不能为空', trigger: 'blur'},
          'catManufacture.companyName':
            {required: true, message: '企业名称不能为空', trigger: 'blur'},
          'catManufacture.address':
            {required: true, message: '注册地址不能为空', trigger: 'blur'},
          'catManufacture.juridicalPerson':
            {required: true, message: '法定代表人不能为空', trigger: 'blur'},
          'catManufacture.qualityOwner':
            {required: true, message: '质量负责人不能为空', trigger: 'blur'},
          'catManufacture.kindCode':
            {required: true, message: '分类码不能为空', trigger: 'blur'},
          'catManufacture.expiryDate':
            {required: true, message: '有效期至不能为空', trigger: 'blur'},
          'catManufacture.produceCategory':
            {required: true, message: '生产地址和生产范围不能为空', trigger: 'blur'},
          'catManufacture.fileIdList':
            {required: true, message: '附件不能为空', trigger: 'blur'},
          'catDealer.dealName':
            {required: true, message: '企业名称不能为空', trigger: 'blur'},
          'catDealer.permitCode':
            {required: true, message: '证号不能为空', trigger: 'blur'},
          'catDealer.businessType':
            {required: true, message: '经营方式不能为空', trigger: 'blur'},
          'catDealer.address':
            {required: true, message: '注册地址不能为空', trigger: 'blur'},
          'catDealer.juridicalPerson':
            {required: true, message: '法定代表人不能为空', trigger: 'blur'},
          'catDealer.enterprisePrincipal':
            {required: true, message: '企业负责人不能为空', trigger: 'blur'},
          'catDealer.qualityPrincipal':
            {required: true, message: '质量负责人不能为空', trigger: 'blur'},
          'catDealer.businessCategory':
            {required: true, message: '经营范围不能为空', trigger: 'blur'},
          'catDealer.expiryDate':
            {required: true, message: '有效期至不能为空', trigger: 'blur'},
          'catDealer.fileIdList':
            {required: true, message: '附件不能为空', trigger: 'blur'},
          'catAuthGsp.certifacateNumber':
            {required: true, message: '证书编号不能为空', trigger: 'blur'},
          'catAuthGsp.companyName':
            {required: true, message: '企业名称不能为空', trigger: 'blur'},
          'catAuthGsp.enterpriseAddress':
            {required: true, message: '地址不能为空', trigger: 'blur'},
          'catAuthGsp.attestationCategory':
            {required: true, message: '认证范围不能为空', trigger: 'blur'},
          'catAuthGsp.expiryDate':
            {required: true, message: '有效期至不能为空', trigger: 'blur'},
          'catAuthGsp.fileIdList':
            {required: true, message: '附件不能为空', trigger: 'blur'},
        },
        businessFlag: businessFlag(),
        companyType: companyType(),
        moneyType: moneyType(),
        region: [],
        showQuestion: false,
        showDoubt: false,
        doubt: {
          fileList: [],
          content: undefined,
        },
        doubts: [],
        form: {
          type: undefined,
          area: undefined,
          catOrg: {
            abbr: undefined,
            creditCode: undefined,
            name: undefined,
            organizeCode: undefined
          },
          catRegisteredContactList: [],
          catRegisteredContact: {
            orgId: undefined,
            userName: undefined,
            fixedTelephone: undefined,
            phone: undefined,
            mail: undefined,
            idCardNo: undefined,
            addr: undefined,
            emergencyContactPhone: undefined,
          },
          catEnterpriseOrgDomain: {
            branchAddress: undefined,
            branchName: undefined,
            branchPrincipal: undefined,
            businessFlag: "11",
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
            regType: undefined
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
            moleculeOrgid: undefined,
            moleculeOrgName: undefined,
            moleculeOrgCode: undefined,
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
            qualityPrincipal: undefined
          },
          catAuthGmpList: [],
          catAuthGsp: {
            attestationCategory: undefined,
            certifacateNumber: undefined,
            companyName: undefined,
            enterpriseAddress: undefined,
            expiryDate: undefined,
            licenceDate: undefined,
            officeLicence: undefined
          },
        },
        nodesPosition: this.nodesPositionInit()
      }
    },
    created() {
      let loading = Vue.prototype.$loading({text:"玩命加载中..."});
      initRegion(this.region);
      this.init(loading);
    },
    methods: {
      init(loading) {
        get().then(async res => {
          console.log(res);
          if(res.success && res.data.success) {
            this.form = res.data.rightBackJson;

            let org = this.form.catEnterpriseOrgDomain;

            org.factoryFlag = org.factoryFlag == 1;
            org.salerFlag = org.salerFlag == 1;
            org.sendFlag = org.sendFlag == 1;
            this.form.catEnterpriseRegDomain.regExpireY = this.form.catEnterpriseRegDomain.regExpireY == '1';

            if(this.form.catRegisteredContactList && this.form.catRegisteredContactList.length > 0) {
              this.form.catRegisteredContact = this.form.catRegisteredContactList[0];
            }
            this.form.catRegisteredContact = this.form.catRegisteredContact || {};

            if(this.form.catEnterpriseRegDomain.regExpireY) {
              this.form.catEnterpriseRegDomain.regExpireE = null;
            }

            dateParse(this.form, ['Date', 'ExpireS', 'ExpireE'])

            this.form.catManufacture = this.form.catManufacture || {};
            this.form.catDealer = this.form.catDealer || {};
            this.form.catAuthGmpList = this.form.catAuthGmpList || [];
            this.form.catAuthGsp = this.form.catAuthGsp || {};

            this.form.area = [];

            if(org.countryId) {
              this.form.area.push(org.countryId);
              await cascRegion(this.region, this.form.area);
            }
            if(org.provinceId) {
              this.form.area.push(org.provinceId);
              await cascRegion(this.region, this.form.area);
            }
            if(org.cityId) {
              this.form.area.push(org.cityId);
              await cascRegion(this.region, this.form.area);
            }
            this.form.area.push(org.countyId);
          }
          this.$nextTick(() => {
            /**
             * 查询设置锚点位置
             * */
            this.getNodesHeight('product-addup-box', 'enter-shxx');
            //恢复初始状态
            this.removeClassCurrent('jump-product-addup')[0].classList.add('current');
            loading.close();
          });
        });
      },
      changeRegExpireY(){
        this.$set(this.form.catEnterpriseRegDomain, 'regExpireE', null)
        let errorParentNode = this.$refs.regExpireS.$el.childNodes[1];
        let erroTipNode =errorParentNode.childNodes[5];
        if(this.form.catEnterpriseRegDomain.regExpireY && errorParentNode && erroTipNode.className =='el-form-item__error'){
          erroTipNode.style.display = 'none';
          this.rules['catEnterpriseRegDomain.regExpireS'].required = false ;
        }else if(!this.form.catEnterpriseRegDomain.regExpireY && errorParentNode && erroTipNode.className =='el-form-item__error'){
          erroTipNode.style.display = 'block';
          this.rules['catEnterpriseRegDomain.regExpireS'].required = true ;

        }
      },
      checkNum(val){
        if(val >= 0){
          val = val
        }else{
          this.$set(this.form.catEnterpriseRegDomain,'regAmount',0)
        }
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
      save(checkFlag) {
        if(this.form.catEnterpriseOrgDomain.factoryFlag) {
          if(this.form.catAuthGmpList.length == 0) {
            this.$message({
              message: '至少添加一个GMP',
              type: 'warning'
            });
            return;
          }

          for(let i in this.form.catAuthGmpList) {
            let x = this.form.catAuthGmpList[i];
            if(!x.certificateNumber
              || !x.enterpriseAddress
              || !x.attestationCategory
              || !x.expiryDate
              || !x.fileIdList
            ) {
              this.$message({
                message: '请补全每个GMP中所有必填项',
                type: 'warning'
              });
              return;
            }
          }
        }

        this.form.catRegisteredContact.orgId = this.form.catOrg.id
        this.form.catRegisteredContactList = [this.form.catRegisteredContact];

        this.form.catEnterpriseOrgDomain.checkFlag = checkFlag;
        this.$refs.form.validate(valid => {
          if (valid) {
            let area = this.form.area;
            this.form.catEnterpriseOrgDomain.countryId = area.length > 0 ? area[0] : undefined;
            this.form.catEnterpriseOrgDomain.provinceId = area.length > 1 ? area[1] : undefined;
            this.form.catEnterpriseOrgDomain.cityId = area.length > 2 ? area[2] : undefined;
            this.form.catEnterpriseOrgDomain.countyId = area.length > 3 ? area[3] : undefined;

            let func = this.form.catOrg.id ? edit : insert;
            func(this.form).then(res => {
              console.log(res);
              let msg;
              if(res.success) {
                if(res.data.success) {
                  msg = {'3': "保存成功", "0": "提交成功"}[checkFlag];
                } else {
                  msg = res.data.exceptionMessage;
                }
              } else {
                msg = res.message;
              }
              this.$alert(msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  if(res.success && res.data.success) {
                    window.location.reload();
                  }
                }
              });
            });
          } else {
            this.$message({
              message: '请补全所有必填项',
              type: 'warning'
            });
            return false;
          }
        });
      },
      dateformat(row, column) {
        let date = row[column.property];
        if (!date) {
          return "";
        }
        return moment(date).format("YYYY-MM-DD");
      },
      addGmp(index) {
        this.$nextTick(() => {
          this.$refs.gmp.init(this.form.catAuthGmpList, index, this.form.catEnterpriseOrgDomain.checkFlag != 3);
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
      addQuestion() {
        this.showQuestion = true;
      },
      closeQuestion() {
        this.showQuestion = false;
      },
      async queryDoubt() {
        let res = await queryDoubt(this.form.catOrg.id);
        if(res.success) {
          console.log(res);
          this.doubts = res.data;
        }
        this.showDoubt = true;
      },
      closeDoubt() {
        this.showDoubt = false;
      },
      async saveDoubt() {
        let res = await addDoubt(this.form.catOrg.id, this.doubt.content, this.doubt.fileList);
        console.log(res);
        if(res.success) {
          this.$message({
            message: "质疑成功",
            type: 'success'
          });
          this.init();
          this.showQuestion = false;
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          });
        }
      },
      handleRegionChange(val) {
        cascRegion(this.region, val);
      },
      chooseOrg() {
        this.$refs.org.init();
      },
      choosePacking(row) {
        this.$set(this.form.catManufacture, "moleculeOrgid", row.ID);
        this.$set(this.form.catManufacture, "moleculeOrgName", row.NAME);
        this.$set(this.form.catManufacture, "moleculeOrgCode", row.CODE);
      },
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
      getDoubtList(res){
        console.log(res);
        res.data.forEach(function (item) {
          this.doubt.fileList.push(item);
        }.bind(this))
      },
      doubtList(res) {
        console.log(res);
        this.doubt.fileList = res.data;
      },
      checkOne(){
        this.$nextTick(()=>{
          /**
           * 查询设置锚点位置
           * */
          this.getNodesHeight('product-addup-box');
        })
      },
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
  @import "../../../../assets/css/auditchanges.css";
</style>
