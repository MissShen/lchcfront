<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="toChange">
      <el-tab-pane label="企业申报" name="first" />
      <el-tab-pane label="企业变更" name="second" />
      <el-tab-pane label="企业质疑记录" name="three" />
      <!--<el-tab-pane label="企业变更质疑" name="four" />-->
      <el-tab-pane label="企业澄清" name="five" />
     <!-- <el-tab-pane label="企业变更澄清" name="six" />-->
    </el-tabs>


    <!-- 表格 -->
    <div class="tablebox" v-if="form && !form.msg">
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
              <el-form ref="form" :model="form" :rules="rules" :disabled="true" label-position="left" size="small" label-width="160px">
                <h3 class="qyxx">企业基础信息</h3>
                <el-row :gutter="24">
                  <el-col :span="12">
                    <el-form-item label="企业名称" prop="org.NAME">
                      <el-input v-model="form.org.NAME" placeholder="企业名称" class="width-260" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="统一社会信用代码" prop="code">
                      <el-input v-model="form.org.CREDIT_CODE" placeholder="统一社会信用代码" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="12">
                    <el-form-item label="组织机构代码" prop="code">
                      <el-input v-model="form.org.ORGANIZE_CODE" placeholder="组织机构代码" class="width-260" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" style="height: 48px;">
                    <el-form-item label="企业类型" prop="type" class="sell-checkbox-wrapper">
                      <el-checkbox @change="changeCondition" v-model="form.enterprise.FACTORY_FLAG" label="生产企业"></el-checkbox>
                      <el-checkbox @change="changeCondition" v-model="form.enterprise.SALER_FLAG" label="代理企业"></el-checkbox>
                      <el-checkbox @change="changeCondition" v-model="form.enterprise.SEND_FLAG" label="配送企业"></el-checkbox>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="12">
                    <el-form-item label="企业简称" prop="org.ABBR">
                      <el-input v-model="form.org.ABBR" placeholder="企业简称" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="经济性质" prop="enterprise.BUSINESS_FLAG">
                      <el-select v-model="form.enterprise.BUSINESS_FLAG" placeholder="经济性质" class="width-260">
                        <el-option v-for="x in businessFlag" :key="x.key" :label="x.value"
                                   :value="x.key"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="12">
                    <el-form-item label="企业曾用名">
                      <el-input
                        class="width-260"
                        type="textarea"
                        :rows="4"
                        v-model="form.enterprise.USED_NAME"
                        placeholder="企业曾用名">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="12">
                    <el-form-item label="所在地区" prop="area">
                      <el-cascader
                        size="small"
                        :options="region"
                        v-model="form.area"
                        @active-item-change="handleRegionChange" class="width-260">
                      </el-cascader>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" style="height: 48px">
                    <el-form-item label="是否法人企业">
                      <el-radio v-model="form.enterprise.IS_JURIDICAL_COMPANY" label="1">是</el-radio>
                      <el-radio v-model="form.enterprise.IS_JURIDICAL_COMPANY" label="0">否</el-radio>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="分部负责人">
                      <el-input v-model="form.enterprise.BRANCH_PRINCIPAL" placeholder="分部负责人" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="分部名称">
                      <el-input v-model="form.enterprise.BRANCH_NAME" placeholder="分部名称" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="分部地址">
                      <el-input v-model="form.enterprise.BRANCH_ADDRESS" placeholder="分部地址" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="20">
                    <el-form-item label="备注">
                      <el-input
                        type="textarea"
                        :rows="4"
                        v-model="form.enterprise.REMARK"
                        placeholder="备注" class="width-260">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <h3 class="zx">资信信息</h3>
                <el-row :gutter="24">
                  <el-col :span="12">
                    <el-form-item label="开户名称" prop="enterprise.ACCOUNT_NAME">
                      <el-input v-model="form.enterprise.ACCOUNT_NAME" placeholder="开户名称" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="开户银行" prop="enterprise.ACCOUNT_BANK">
                      <el-input v-model="form.enterprise.ACCOUNT_BANK" placeholder="开户银行" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="开户账号" prop="enterprise.ACCOUNT_NUMBER">
                      <el-input v-model="form.enterprise.ACCOUNT_NUMBER" placeholder="开户账号" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="纳税人登记号" prop="enterprise.TAXPAYER_CODE">
                      <el-input v-model="form.enterprise.TAXPAYER_CODE" placeholder="纳税人登记号" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="邮政编码" prop="enterprise.POST_CODE">
                      <el-input v-model="form.enterprise.POST_CODE" placeholder="邮政编码" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="企业电话" prop="enterprise.TEL">
                      <el-input v-model="form.enterprise.TEL" placeholder="企业电话" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <!--<el-col :span="12">-->
                    <!--<el-form-item label="固定电话">-->
                      <!--<el-input v-model="form.enterprise.LANDLINE_TEL" placeholder="固定电话" class="width-260"></el-input>-->
                    <!--</el-form-item>-->
                  <!--</el-col>-->
                  <el-col :span="12">
                    <el-form-item label="企业传真">
                      <el-input v-model="form.enterprise.FAX" placeholder="企业传真" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="企业网址">
                      <el-input v-model="form.enterprise.WEBSITE" placeholder="企业网址" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="企业QQ号">
                      <el-input v-model="form.enterprise.QQ" placeholder="企业QQ号" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <h3 class="sbrxx">申报人信息</h3>
                <div class="tableset gap-120">
                  <el-table class="register-table-box"  :data="form.attached" border stripe>
                    <el-table-column label="申报人">
                      <template slot-scope="scope">
                        <span>{{ scope.row.LINK_PERSON }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="固定电话">
                      <template slot-scope="scope">
                        <span>{{ scope.row.LINK_TEL }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="手机">
                      <template slot-scope="scope">
                        <span>{{ scope.row.LINK_PHONE }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="电子邮箱" show-overflow-tooltip>
                      <template slot-scope="scope">
                        <span>{{ scope.row.LINK_EMIAL }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="身份证号" show-overflow-tooltip>
                      <template slot-scope="scope">
                        <span>{{ scope.row.LINK_IDCARD }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" width="180">
                      <template slot-scope="scope">
                        <div class="operates">
                          <span><a href="javascript:;" class="operation-btn" @click="addAttached(scope.$index)">编辑</a></span>
                          <span v-if="(!form.org.STATE || form.org.STATE == 0) && !onlySend"><a href="javascript:;" class="operation-btn" @click="delAttached(scope.$index)">删除</a></span>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <p class="gap-120">
                  <attached ref="attached"></attached>
                  <el-button @click="addAttached()" v-if="(!form.org.STATE || form.org.STATE == 0) && !onlySend" size="small">新增</el-button>
                </p>
                <h3 class="yyxx">营业执照信息</h3>
                <el-row :gutter="24">
                  <el-col :span="12">
                    <el-form-item label="注册号" prop="enterprise.REG_NO">
                      <el-input v-model="form.enterprise.REG_NO" placeholder="注册号" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="企业名称" prop="enterprise.REG_NAME">
                      <el-input v-model="form.enterprise.REG_NAME" placeholder="企业名称" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="类型" prop="enterprise.REG_TYPE">
                      <el-select v-model="form.enterprise.REG_TYPE" placeholder="类型" class="width-260">
                        <el-option v-for="x in companyType" :key="x.key" :label="x.value"
                                   :value="x.key"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="住所" prop="enterprise.ADDRESS">
                      <el-input v-model="form.enterprise.ADDRESS" placeholder="住所" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="法定代表人" prop="enterprise.JURIDICAL_PERSON">
                      <el-input v-model="form.enterprise.JURIDICAL_PERSON" placeholder="法定代表人" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="注册资本" prop="enterprise.REG_CAPITAL">
                      <el-input v-model="form.enterprise.REG_CAPITAL" placeholder="注册资本" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="注册资金" prop="enterprise.REG_AMOUNT">
                        <el-input type="number" v-model="form.enterprise.REG_AMOUNT" placeholder="注册资金" class="width-200"></el-input>
                        <el-select v-model="form.enterprise.REG_AMOUNT_UNIT" placeholder="币种" class="width-120">
                          <el-option v-for="x in moneyType" :key="x.key" :label="x.value"
                                     :value="x.key"></el-option>
                        </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="成立日期" prop="enterprise.FOUND_DATE" class="width-420">
                      <el-date-picker v-model="form.enterprise.FOUND_DATE" placeholder="成立日期"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="14">
                    <el-form-item label="营业期限" prop="REG_EXPIRE">
                      <el-col :span="8" style="padding: 0;" class="datePickerW">
                        <el-date-picker
                          v-model="form.enterprise.REG_EXPIRE_S"
                          placeholder="开始日期">
                        </el-date-picker>
                      </el-col>
                      <el-col :span="1">
                        至
                      </el-col>
                      <el-col :span="8" style="padding-right: 0;" class="datePickerW">
                        <el-date-picker
                          v-model="form.enterprise.REG_EXPIRE_E"
                          :disabled="!!form.enterprise.REG_EXPIRE_Y"
                          placeholder="结束日期">
                        </el-date-picker>
                      </el-col>
                      <el-col :span="2">
                        <el-checkbox @change="$set(form.enterprise, 'REG_EXPIRE_E', null)" v-model="form.enterprise.REG_EXPIRE_Y" label="永久有效"></el-checkbox>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="20">
                    <el-form-item label="经营范围" prop="enterprise.REG_SCOPE">
                      <el-input
                        type="textarea"
                        :rows="4"
                        v-model="form.enterprise.REG_SCOPE"
                        placeholder="经营范围" class="width-260">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="登记机关">
                      <el-input v-model="form.enterprise.REG_DEPARTMENT" placeholder="登记机关" class="width-260"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="发证日期" class="width-420">
                      <el-date-picker v-model="form.enterprise.REG_DATE" placeholder="发证日期"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="20">
                    <el-form-item label="上传附件" prop="enterprise.fileList">
                      <el-button @click="handleChooseFiles('enterprise')" :disabled="true" size="small">选择文件</el-button>
                    </el-form-item>
                  </el-col>
                  <el-col :span="20">
                    <images-preview class="margin160" :operate="false" ref="imagesPreview" refName="enterprise" v-if="form.enterprise.fileList" :imgIdListUnUnique="form.enterprise.fileList" @imgIdListChange="upLoadImgIdList"></images-preview>
                  </el-col>
                </el-row>
                <h3 class="scxk" v-show="form.enterprise.FACTORY_FLAG">生产许可信息</h3>
                <div v-if="form.enterprise.FACTORY_FLAG">
                  <el-row :gutter="24">
                    <el-col :span="12">
                      <el-form-item label="编号" prop="manufacture.PERMIT_CODE">
                        <el-input v-model="form.manufacture.PERMIT_CODE" placeholder="编号" class="width-260"></el-input>
                      </el-form-item>
                      <el-form-item label="企业名称" prop="manufacture.COMPANY_NAME">
                        <el-input v-model="form.manufacture.COMPANY_NAME" placeholder="企业名称" class="width-260"></el-input>
                      </el-form-item>
                      <el-form-item label="注册地址" prop="manufacture.ADDRESS">
                        <el-input v-model="form.manufacture.ADDRESS" placeholder="注册地址" class="width-260"></el-input>
                      </el-form-item>
                      <el-form-item label="法定代表人" prop="manufacture.JURIDICAL_PERSON">
                        <el-input v-model="form.manufacture.JURIDICAL_PERSON" placeholder="法定代表人" class="width-260"></el-input>
                      </el-form-item>
                      <el-form-item label="企业负责人" prop="manufacture.CHARGE_PERSON">
                        <el-input v-model="form.manufacture.CHARGE_PERSON" placeholder="企业负责人" class="width-260"></el-input>
                      </el-form-item>
                      <el-form-item label="类型">
                        <el-select v-model="form.manufacture.COMPANY_TYPE" placeholder="类型" class="width-260" @change="form.manufacture.COMPANY_TYPE = form.manufacture.COMPANY_TYPE || undefined">
                          <el-option label="请选择" value="" />
                          <el-option v-for="x in companyType" :key="x.key" :label="x.value"
                                     :value="x.key"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="质量负责人" prop="manufacture.QUALITY_OWNER">
                        <el-input v-model="form.manufacture.QUALITY_OWNER" placeholder="质量负责人" class="width-260"></el-input>
                      </el-form-item>
                      <el-form-item label="分类码" prop="manufacture.KIND_CODE">
                        <el-input v-model="form.manufacture.KIND_CODE" placeholder="分类码" class="width-260"></el-input>
                      </el-form-item>
                      <el-form-item label="有效期至" prop="manufacture.EXPIRY_DATE" class="width-420">
                        <el-date-picker v-model="form.manufacture.EXPIRY_DATE" placeholder="有效期至"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="生产地址和生产范围" prop="manufacture.PRODUCE_CATEGORY">
                        <el-input
                          type="textarea"
                          :rows="21"
                          v-model="form.manufacture.PRODUCE_CATEGORY"
                          placeholder="生产地址和生产范围" class="width-260">
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="24">
                    <el-col :span="12">
                      <el-form-item label="日常监管机构">
                        <el-input v-model="form.manufacture.REGULATORY_AGENCY" placeholder="日常监管机构" class="width-260"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="发证机关">
                        <el-input v-model="form.manufacture.PD_INSTITUTION" placeholder="发证机关" class="width-260"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="日常监管人员">
                        <el-input v-model="form.manufacture.REGULATORY_PERSON" placeholder="日常监管人员" class="width-260"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="发证日期" class="width-420">
                        <el-date-picker v-model="form.manufacture.PD_DATE" placeholder="发证日期"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="监督举报电话">
                        <el-input v-model="form.manufacture.SUPERVISORY_REPORT_TEL" placeholder="监督举报电话" class="width-260"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="20">
                      <el-form-item label="上传附件" prop="manufacture.fileList">
                        <el-button @click="handleChooseFiles('manufacture')" :disabled="true" size="small">选择文件</el-button>
                      </el-form-item>
                    </el-col>
                    <el-col :span="20">
                      <images-preview class="margin160" :operate="false" ref="imagesPreview" refName="manufacture" v-if="form.manufacture.fileList" :imgIdListUnUnique="form.manufacture.fileList" @imgIdListChange="upLoadImgIdList"></images-preview>
                    </el-col>
                  </el-row>
                </div>
                <h3 class="jyxk" v-show="form.enterprise.SALER_FLAG || form.enterprise.SEND_FLAG">经营许可信息</h3>
                <div v-if="form.enterprise.SALER_FLAG || form.enterprise.SEND_FLAG">
                  <el-row :gutter="24">
                    <el-col :span="12">
                      <el-form-item label="证号" prop="dealer.PERMIT_CODE">
                        <el-input v-model="form.dealer.PERMIT_CODE" placeholder="证号" class="width-260"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="经营方式" prop="dealer.BUSINESS_TYPE">
                        <el-input v-model="form.dealer.BUSINESS_TYPE" placeholder="经营方式" class="width-260"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="24">
                    <el-col :span="12">
                      <el-form-item label="企业名称" prop="dealer.DEAL_NAME">
                        <el-input v-model="form.dealer.DEAL_NAME" placeholder="企业名称" class="width-260"></el-input>
                      </el-form-item>
                      <el-form-item label="注册地址" prop="dealer.ADDRESS">
                        <el-input v-model="form.dealer.ADDRESS" placeholder="注册地址" class="width-260"></el-input>
                      </el-form-item>
                      <el-form-item label="法定代表人" prop="dealer.JURIDICAL_PERSON">
                        <el-input v-model="form.dealer.JURIDICAL_PERSON" placeholder="法定代表人" class="width-260"></el-input>
                      </el-form-item>
                      <el-form-item label="企业负责人" prop="dealer.ENTERPRISE_PRINCIPAL">
                        <el-input v-model="form.dealer.ENTERPRISE_PRINCIPAL" placeholder="企业负责人" class="width-260"></el-input>
                      </el-form-item>
                      <el-form-item label="质量负责人" prop="dealer.QUALITY_PRINCIPAL">
                        <el-input v-model="form.dealer.QUALITY_PRINCIPAL" placeholder="质量负责人" class="width-260"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="经营范围" prop="dealer.BUSINESS_CATEGORY">
                        <el-input
                          type="textarea"
                          :rows="11"
                          v-model="form.dealer.BUSINESS_CATEGORY"
                          placeholder="经营范围" class="width-260">
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="24">
                    <el-col :span="12">
                      <el-form-item label="仓库地址" prop="dealer.DEPOSITORY_ADDRESS">
                        <el-input v-model="form.dealer.DEPOSITORY_ADDRESS" placeholder="仓库地址" class="width-260"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="发证机关">
                        <el-input v-model="form.dealer.CERTIFICATE_DEPARTMENT" placeholder="发证机关" class="width-260"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="有效期至" prop="dealer.EXPIRY_DATE" class="width-420">
                        <el-date-picker v-model="form.dealer.EXPIRY_DATE" placeholder="有效期至"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="发证日期" class="width-420">
                        <el-date-picker v-model="form.dealer.PD_DATE" placeholder="发证日期"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="20">
                      <el-form-item label="上传附件" prop="dealer.fileList">
                        <el-button @click="handleChooseFiles('dealer')" :disabled="true" size="small">选择文件</el-button>
                      </el-form-item>
                    </el-col>
                    <el-col :span="20">
                      <images-preview class="margin160" :operate="false" ref="imagesPreview" refName="dealer" v-if="form.dealer.fileList" :imgIdListUnUnique="form.dealer.fileList" @imgIdListChange="upLoadImgIdList"></images-preview>
                    </el-col>
                  </el-row>
                </div>
                <h3 class="gmpone" v-show="form.enterprise.FACTORY_FLAG">GMP信息</h3>
                <div v-if="form.enterprise.FACTORY_FLAG">
                  <!-- 表格列表 -->
                  <div class="tableset gap-120">
                    <el-table class="register-table-box" :data="form.gmp" border stripe>
                      <el-table-column label="证书编号" show-overflow-tooltip>
                        <template slot-scope="scope">
                          <span>{{ scope.row.CERTIFICATE_NUMBER }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="发证机关" show-overflow-tooltip>
                        <template slot-scope="scope">
                          <span>{{ scope.row.OFFICE_LICENCE }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="发证日期" :formatter="dateformat" prop="LICENCE_DATE"></el-table-column>
                      <el-table-column label="有效期至" :formatter="dateformat" prop="EXPIRY_DATE"></el-table-column>
                      <el-table-column label="操作" width="140">
                        <template slot-scope="scope">
                          <div class="operates">
                            <span><a href="javascript:;" class="operation-btn" @click="addGmp(scope.$index)">查看</a></span>
                            <span v-if="false"><a href="javascript:;" class="operation-btn" @click="delGmp(scope.$index)">删除</a></span>
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                  <p class="gap-120">
                    <gmp ref="gmp"></gmp>
                  </p>
                </div>
                <h3 class="gmptwo" v-show="form.enterprise.SALER_FLAG || form.enterprise.SEND_FLAG">GSP信息</h3>
                <div v-if="form.enterprise.SALER_FLAG || form.enterprise.SEND_FLAG">
                  <el-row :gutter="24">
                    <el-col :span="12">
                      <el-form-item label="证书编号" prop="gsp.CERTIFACATE_NUMBER">
                        <el-input v-model="form.gsp.CERTIFACATE_NUMBER" placeholder="证书编号" class="width-260"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="企业名称" prop="gsp.COMPANY_NAME">
                        <el-input v-model="form.gsp.COMPANY_NAME" placeholder="企业名称" class="width-260"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="地址" prop="gsp.ENTERPRISE_ADDRESS">
                        <el-input v-model="form.gsp.ENTERPRISE_ADDRESS" placeholder="地址" class="width-260"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="认证范围" prop="gsp.ATTESTATION_CATEGORY">
                        <el-input v-model="form.gsp.ATTESTATION_CATEGORY" placeholder="认证范围" class="width-260"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="有效期至" prop="gsp.EXPIRY_DATE" class="width-420">
                        <el-date-picker v-model="form.gsp.EXPIRY_DATE" placeholder="有效期至"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="发证机关">
                        <el-input v-model="form.gsp.OFFICE_LICENCE" placeholder="发证机关" class="width-260"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="发证日期" class="width-420">
                        <el-date-picker v-model="form.gsp.LICENCE_DATE" placeholder="发证日期"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="20">
                      <el-form-item label="上传附件" prop="gsp.fileList">
                        <el-button @click="handleChooseFiles('gsp')" :disabled="true" size="small">选择文件</el-button>
                      </el-form-item>
                    </el-col>
                    <el-col :span="20">
                      <images-preview class="margin160" :operate="false" ref="imagesPreview" refName="gsp" v-if="form.gsp.fileList" :imgIdListUnUnique="form.gsp.fileList" @imgIdListChange="upLoadImgIdList"></images-preview>
                    </el-col>
                  </el-row>
                </div>
              </el-form>
              <el-form ref="form" v-if="!onlySend" :model="form" :rules="rules" :disabled="!!form.org.STATE && form.org.STATE != 0" label-position="left" size="small" label-width="160px">
                <h3 class="xmxx">项目附加信息</h3>
                <el-row :gutter="24">
                  <el-col :span="24" v-for="(att, i) in form.annex" :key="i">
                    <el-row :gutter="24">
                      <el-col class="width-160">
                        <el-form-item :label="att.dicName" />
                      </el-col>
                      <el-col :span="20">
                        <div v-for="(x, y) in att.options" :key="y">
                          <el-row :gutter="24">
                            <el-col :span="10">
                              <el-input v-if="x.type == 1" :placeholder="x.label" v-model="x.value" size="small" class="width-260 space-30" />
                              <el-input v-if="x.type == 2" :placeholder="x.label" v-model="x.value" type="textarea" size="small" class="width-260 space-30" />
                              <el-date-picker calss="space-30" v-if="x.type == 3" :placeholder="x.label" v-model="x.value" type="date" size="small" />
                              <el-select v-if="x.type == 4" :placeholder="x.label" v-model="x.value" size="small" class="width-260 space-30">
                                <el-option
                                  v-for="item in x.options"
                                  :key="item.id"
                                  :label="item.text"
                                  :value="item.value">
                                </el-option>
                              </el-select>
                              <el-checkbox-group class="space-30" v-if="x.type == 5" :placeholder="x.label" v-model="x.value">
                                <el-checkbox v-for="(option, index) in x.options" :label="option.value" :key="index">
                                  {{option.text}}
                                </el-checkbox>
                              </el-checkbox-group>
                              <el-radio-group class="space-30"  v-if="x.type == 6" :placeholder="x.label" v-model="x.value">
                                <el-radio v-for="(option, index) in x.options" :label="option.value" :key="index">
                                  {{option.text}}
                                </el-radio>
                              </el-radio-group>
                              <span class="grid-content bg-purple-light" v-if="x.imageFlag==1">
                                <el-button @click="handleChooseFiles(x.id)" :disabled="!!form.org.STATE && form.org.STATE != 0" size="small">选择文件</el-button>
                                <div><span class="audit-item font-size12">{{x.fileTypeName}}</span></div>
                              </span>
                              <images-preview ref="imagesPreview" :operate="!form.org.STATE || form.org.STATE == 0" :refName="x.id" :imgIdListUnUnique="form.fileList[x.id] || []" @imgIdListChange="upLoadImgIdList"></images-preview>
                            </el-col>
                            <el-col :span="11">
                              <span>{{x.label}}</span>
                            </el-col>
                            <el-col :span="3">
                              <el-button class="audit-item font-size12" type="text" :href="x.tipUrl" size="small">{{x.tipText}}</el-button>
                            </el-col>
                          </el-row>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-form>
              <el-row>
                <el-col :span="20" style="margin-left:160px;">
                  <el-button type="primary" @click="save(0)" v-if="!form.org.STATE || form.org.STATE == 0" :disabled="commit">保存</el-button>
                  <el-button type="primary" @click="save(onlySend ? 6 : 1)" v-if="!form.org.STATE || form.org.STATE == 0">提交</el-button>
                  <el-button type="primary" @click="revoke" v-if="form.org.STATE == 1 || form.org.STATE == 2 || form.org.STATE == 3 || form.org.STATE == 4">撤回</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </div>
    <choose-files ref="treeView" v-if="dialogVisible"  @handleSelectedFolder="selectedData"></choose-files>
    <div v-if="form && form.msg" style="color: #999999; text-align: center; padding-top: 200px;">
      <label>{{form.msg}}</label>
    </div>
  </div>
</template>

<script>

  import { initRegion, cascRegion } from "src/axios/auditchanges/common/region"
  import { businessFlag, companyType, moneyType } from 'src/axios/auditchanges/common/enterprise'
  import gmp from './gmp'
  import attached from './attached'
  import { query, save, revoke } from "src/axios/auditchanges/messageDeclare/enterprise"
  import Vue from 'vue'
  import moment from "moment";
  import chooseFiles from 'src/pages/auditchanges/common/chooseFiles';
  import imagesPreview from 'src/pages/auditchanges/common/imagesPreview'
  import uploadButton from 'src/pages/auditchanges/common/uploadButton'
  import { getProjectSubjoinMessage } from "src/axios/auditchanges/systemManage/subjoinMessageManage"
  import { downloadFile } from 'src/axios/auditchanges/messageRegister/filesManage'
  import {windowScroll} from 'src/components/mixins/scrolls'

  export default {
    mixins:[windowScroll],
    components: {
      gmp, attached, chooseFiles, imagesPreview, uploadButton
    },
    data() {
      return {
        commit: false,
        dialogVisible: false,
        activeName:'first',
        rules: this.metaRule(),
        businessFlag: businessFlag(),
        companyType: companyType(),
        moneyType: moneyType(),
        region: [],
        form: {
          org: {},
          enterprise: {},
          attached: [],
          manufacture: {},
          dealer: {},
          gmp: [],
          gsp: {},
          annex: [],
          fileList: {},

          type: undefined,
          area: undefined,

          msg: " ",
        },
        btnText:'fileInput',
        fileType:'1',
        uploadFileList:{
          fileInput:[]
        },
        onlySend: true,
        nodesPosition: this.nodesPositionInit()
      }
    },
    created() {
      this.init();
    },
    methods: {
      nodesPositionInit(){
        return  [
          {itemName: '企业基础信息', nodePosition: null, itemAbb: 'qyxx'},
          {itemName: '资信信息', nodePosition: null, itemAbb: 'zx'},
          {itemName: '申报人信息', nodePosition: null, itemAbb: 'sbrxx'},
          {itemName: '营业执照信息', nodePosition: null, itemAbb: 'yyxx'},
          {itemName: '生产许可信息', nodePosition: null, itemAbb: 'scxk'},
          {itemName: '经营许可信息', nodePosition: null, itemAbb: 'jyxk'},
          {itemName: 'GMP信息', nodePosition: null, itemAbb: 'gmpone'},
          {itemName: 'GSP信息', nodePosition: null, itemAbb: 'gmptwo'},
          {itemName: '项目附加信息', nodePosition: null, itemAbb: 'xmxx'},
        ]
      },
      async init() {
        await initRegion(this.region);
        let loading = Vue.prototype.$loading({text:"玩命加载中..."});
        query().then(async res => {
          console.log("res", res);
          if(res.code == "200" && res.success) {
            if(res.data.msg) {
              this.form = res.data;
              loading.close();
              return;
            }

            this.form.msg = undefined;

            this.$set(this.form, "org", res.data.org);
            this.$set(this.form, "enterprise", res.data.enterprise);
            this.$set(this.form, "attached", res.data.attached || []);
            this.$set(this.form, "manufacture", res.data.manufacture || {});
            this.$set(this.form, "dealer", res.data.dealer || {});
            this.$set(this.form, "gmp", res.data.gmp || []);
            this.$set(this.form, "gsp", res.data.gsp || {});
            this.$set(this.form, "fileList", res.data.fileList || {});

            let subjoin = await getProjectSubjoinMessage({
              attachedType: '1',
              projectId: this.form.org.PROJECT_ID,
            });
            subjoin.data.forEach(x => {
              let annex = {
                dicName: x.dicName,
                options: [],
              };
              x.catAttachedDictionaryDomains.forEach(y => {
                let value = res.data.annex ? res.data.annex[y.id] : undefined;
                if(y.fieldType == "5") {
                  if(value) {
                    value = JSON.parse(value);
                  } else {
                    value = [];
                  }
                }
                annex.options.push({
                  id: y.id,
                  type: y.fieldType,
                  label: y.remark,
                  tipUrl: y.tipUrl,
                  tipText: y.tipText,
                  fileTypeName: y.fileTypeName,
                  value,
                  imageFlag: y.hasImageFlag,
                  options: y.catAttachedDictionaryOptions,
                })
              })
              this.form.annex.push(annex);
            });

            let ent = this.form.enterprise;
            ent.FACTORY_FLAG = ent.FACTORY_FLAG == "1";
            ent.SALER_FLAG = ent.SALER_FLAG == "1";
            ent.SEND_FLAG = ent.SEND_FLAG == "1";

            this.onlySend = !ent.FACTORY_FLAG && !ent.SALER_FLAG && ent.SEND_FLAG;

            if(this.form.enterprise.IS_JURIDICAL_COMPANY) {
              this.$set(this.form.enterprise, "IS_JURIDICAL_COMPANY", this.form.enterprise.IS_JURIDICAL_COMPANY + "");
            } else {
              this.$set(this.form.enterprise, "IS_JURIDICAL_COMPANY", "1");
            }
            this.$set(this.form.enterprise, "REG_EXPIRE_Y", this.form.enterprise.REG_EXPIRE_Y == '1');

            if(this.form.enterprise.REG_EXPIRE_Y) {
              this.$set(this.form.enterprise, 'REG_EXPIRE_E', null);
            }

            this.form.area = [];
            if(ent.COUNTRY_ID) {
              this.form.area.push(ent.COUNTRY_ID);
              await cascRegion(this.region, this.form.area);
            }
            if(ent.PROVINCE_ID) {
              this.form.area.push(ent.PROVINCE_ID);
              await cascRegion(this.region, this.form.area);
            }
            if(ent.CITY_ID) {
              this.form.area.push(ent.CITY_ID);
              await cascRegion(this.region, this.form.area);
            }
            if(ent.COUNTY_ID) {
              this.form.area.push(ent.COUNTY_ID);
            }
          }
          this.$nextTick(() => {
            loading.close();
            if(this.form.enterprise.fileList) {
              this.form.enterprise.fileList.splice(0, 0);
            }
            if(this.form.manufacture.fileList) {
              this.form.manufacture.fileList.splice(0, 0);
            }
            if(this.form.dealer.fileList) {
              this.form.dealer.fileList.splice(0, 0);
            }
            if(this.form.gsp.fileList) {
              this.form.gsp.fileList.splice(0, 0);
            }
            for(let key in this.form.fileList) {
              this.form.fileList[key].splice(0, 0);
            }
            /**
             * 查询设置锚点位置
             * */
            this.getNodesHeight('product-addup-box', 'enter-shxx');
            //恢复初始状态
            this.removeClassCurrent('jump-product-addup')[0].classList.add('current');
          });
        });
      },
      save(state) {
        if(this.check().attached()
          || this.check().gmp()
          || (!this.onlySend && this.check().orgAtt())){
          return;
        }

        this.commit = true;
        this.$refs.form.validate(valid => {
          if (valid) {
            let area = this.form.area;

            this.form.enterprise.COUNTRY_ID = area.length > 0 ? area[0] : undefined;
            this.form.enterprise.PROVINCE_ID = area.length > 1 ? area[1] : undefined;
            this.form.enterprise.CITY_ID = area.length > 2 ? area[2] : undefined;
            this.form.enterprise.COUNTY_ID = area.length > 3 ? area[3] : undefined;

            this.form.org.STATE = state;

            save(this.form).then(res => {
              console.log(res);

              this.$set(this.form.org, "STATE", undefined);
              this.commit = false;

              this.$alert(res.success ? {"0": "保存", "1": "提交", "6": "挂网"}[state] + "成功" : res.message, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  if (res.success) {
                    this.init();
                  }
                }
              });
            });
          } else {
            this.$message({
              message: '请补全所有必填项',
              type: 'warning'
            });
          }
        });
      },
      async revoke() {
        let res = await revoke(this.form.org.ID);
        console.log("res", res)
        if(res.success) {
          if(res.data.success) {
            this.$message({
              message: res.data.exceptionMessage,
              type: 'success'
            });
            this.init();
          } else {
            this.$message({
              message: res.data.exceptionMessage,
              type: 'warning'
            });
          }
        } else {
          this.$message({
            message: '服务器异常',
            type: 'warning'
          });
        }
      },
      check() {
        return {
          // 验证申报人
          attached: () => {
            if(this.form.attached.length == 0) {
              this.$message({
                message: '至少添加一个申报人',
                type: 'warning'
              });
              return true;
            }
          },
          // 验证GMP
          gmp: () => {
            if(this.form.enterprise.FACTORY_FLAG) {
              if(this.form.gmp.length == 0) {
                this.$message({
                  message: '至少添加一个GMP',
                  type: 'warning'
                });
                return true;
              }

              for(let i in this.form.gmp) {
                let x = this.form.gmp[i];
                if(!x.CERTIFICATE_NUMBER
                  || !x.ENTERPRISE_ADDRESS
                  || !x.ATTESTATION_CATEGORY
                  || !x.EXPIRY_DATE
                  || !x.fileList) {
                  this.$message({
                    message: '请补全每个GMP中所有必填项',
                    type: 'warning'
                  });
                  return true;
                }
              }
            }
          },
          // 验证附加信息
          orgAtt: () => {
            for(let i in this.form.annex) {
              let annex = this.form.annex[i];
              for(let j in annex.options) {
                let option = annex.options[j];
                if(!option.value) {
                  this.$message({
                    message: '请补全所有附加信息',
                    type: 'warning'
                  });
                  return true;
                }
                if(option.imageFlag == 1) {
                  if(!this.form.fileList[option.id] || this.form.fileList[option.id].length == 0) {
                    this.$message({
                      message: '请上传所有附加信息附件',
                      type: 'warning'
                    });
                    return true;
                  }
                }
              }
            }
          }
        }
      },
      metaRule() {
        return {
          "org.NAME": [
            {required: true, message: '企业名称不能为空', trigger: 'blur'},
          ],
          code: [
            {
              validator: (rule, value, callback) => {
                if(this.form.org.CREDIT_CODE || this.form.org.ORGANIZE_CODE){
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
                if(this.form.enterprise.FACTORY_FLAG ||
                  this.form.enterprise.SALER_FLAG ||
                  this.form.enterprise.SEND_FLAG){
                  callback();
                } else {
                  callback(new Error('至少选择一种类型'));
                }
              }, required: true, trigger: 'blur'
            },
          ],
          "enterprise.BUSINESS_FLAG": [
            {required: true, message: '经济性质不能为空', trigger: 'blur'},
          ],
          "enterprise.ACCOUNT_NAME": [
            {required: true, message: '开户名称不能为空', trigger: 'blur'},
          ],
          "enterprise.ACCOUNT_BANK": [
            {required: true, message: '开户银行不能为空', trigger: 'blur'},
          ],
          "enterprise.ACCOUNT_NUMBER": [
            {required: true, message: '开户账号不能为空', trigger: 'blur'},
          ],
          "enterprise.TAXPAYER_CODE": [
            {required: true, message: '纳税人登记号不能为空', trigger: 'blur'},
          ],
          "enterprise.TEL": [
            {required: true, message: '企业电话不能为空', trigger: 'blur'},
          ],
          "enterprise.REG_NO": [
            {required: true, message: '注册号不能为空', trigger: 'blur'},
          ],
          "enterprise.REG_NAME": [
            {required: true, message: '企业名称不能为空', trigger: 'blur'},
          ],
          "enterprise.REG_TYPE": [
            {required: true, message: '类型不能为空', trigger: 'blur'},
          ],
          "enterprise.ADDRESS": [
            {required: true, message: '住所不能为空', trigger: 'blur'},
          ],
          "enterprise.JURIDICAL_PERSON": [
            {required: true, message: '法定代表人不能为空', trigger: 'blur'},
          ],
          "enterprise.REG_CAPITAL": [
            {required: true, message: '注册资本不能为空', trigger: 'blur'},
          ],
          "enterprise.REG_AMOUNT": [
            {required: true, message: '注册资金不能为空', trigger: 'blur'},
          ],
          "enterprise.FOUND_DATE": [
            {required: true, message: '成立日期不能为空', trigger: 'blur'},
          ],
          REG_EXPIRE: [
            {
              validator: (rule, value, callback) => {
                if(!this.form.enterprise.REG_EXPIRE_S){
                  callback(new Error('营业期限开始日期不能为空'));
                  return;
                }
                if(this.form.enterprise.REG_EXPIRE_Y) {
                  callback();
                  return;
                }
                if (!this.form.enterprise.REG_EXPIRE_E) {
                  callback(new Error('营业期限结束日期不能为空'));
                  return;
                }
                callback();
              }, trigger: 'blur'
            },
          ],
          "enterprise.REG_SCOPE": [
            {required: true, message: '经营范围不能为空', trigger: 'blur'},
          ],
          "enterprise.POST_CODE": [
            {
              validator: (rule, value, callback) => {
                if(!value || /^\d{6}$/.test(value)){
                  callback();
                } else {
                  callback(new Error('邮政编码格式不正确'));
                }
              }, trigger: "blur"
            },
          ],
          "enterprise.fileList": [
            {required: true, message: '附件不能为空', trigger: 'blur'},
          ],
          "manufacture.PERMIT_CODE": [
            {required: true, message: '编号不能为空', trigger: 'blur'},
          ],
          "manufacture.COMPANY_NAME": [
            {required: true, message: '企业名称不能为空', trigger: 'blur'},
          ],
          "manufacture.ADDRESS": [
            {required: true, message: '注册地址不能为空', trigger: 'blur'},
          ],
          "manufacture.JURIDICAL_PERSON": [
            {required: true, message: '法定代表人不能为空', trigger: 'blur'},
          ],
          "manufacture.CHARGE_PERSON": [
            {required: true, message: '企业负责人不能为空', trigger: 'blur'},
          ],
          "manufacture.QUALITY_OWNER": [
            {required: true, message: '质量负责人不能为空', trigger: 'blur'},
          ],
          "manufacture.KIND_CODE": [
            {required: true, message: '分类码不能为空', trigger: 'blur'},
          ],
          "manufacture.EXPIRY_DATE": [
            {required: true, message: '有效期至不能为空', trigger: 'blur'},
          ],
          "manufacture.PRODUCE_CATEGORY": [
            {required: true, message: '生产地址和生产范围不能为空', trigger: 'blur'},
          ],
          "manufacture.fileList": [
            {required: true, message: '附件不能为空', trigger: 'blur'},
          ],
          "dealer.PERMIT_CODE": [
            {required: true, message: '证号不能为空', trigger: 'blur'},
          ],
          "dealer.DEAL_NAME": [
            {required: true, message: '企业名称不能为空', trigger: 'blur'},
          ],
          "dealer.BUSINESS_TYPE": [
            {required: true, message: '经营方式不能为空', trigger: 'blur'},
          ],
          "dealer.ADDRESS": [
            {required: true, message: '注册地址不能为空', trigger: 'blur'},
          ],
          "dealer.JURIDICAL_PERSON": [
            {required: true, message: '法定代表人不能为空', trigger: 'blur'},
          ],
          "dealer.ENTERPRISE_PRINCIPAL": [
            {required: true, message: '企业负责人不能为空', trigger: 'blur'},
          ],
          "dealer.QUALITY_PRINCIPAL": [
            {required: true, message: '质量负责人', trigger: 'blur'},
          ],
          "dealer.BUSINESS_CATEGORY": [
            {required: true, message: '经营范围不能为空', trigger: 'blur'},
          ],
          "dealer.DEPOSITORY_ADDRESS": [
            {required: true, message: '仓库地址不能为空', trigger: 'blur'},
          ],
          "dealer.fileList": [
            {required: true, message: '附件不能为空', trigger: 'blur'},
          ],
          "gsp.CERTIFACATE_NUMBER": [
            {required: true, message: '证书编号不能为空', trigger: 'blur'},
          ],
          "gsp.COMPANY_NAME": [
            {required: true, message: '企业名称不能为空', trigger: 'blur'},
          ],
          "gsp.ENTERPRISE_ADDRESS": [
            {required: true, message: '地址不能为空', trigger: 'blur'},
          ],
          "gsp.ATTESTATION_CATEGORY": [
            {required: true, message: '认证范围不能为空', trigger: 'blur'},
          ],
          "gsp.EXPIRY_DATE": [
            {required: true, message: '有效期至不能为空', trigger: 'blur'},
          ],
          "gsp.fileList": [
            {required: true, message: '附件不能为空', trigger: 'blur'},
          ],
        }
      },
      addGmp(index) {
        this.$nextTick(() => {
          this.$refs.gmp.init(this.form.gmp, index, true);
        });
      },
      delGmp(index) {
        this.$confirm('确定删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.form.gmp.splice(index, 1);
        });
      },
      addAttached(index) {
        this.$nextTick(() => {
          this.$refs.attached.init(this.form.attached, index, (this.form.org.STATE && this.form.org.STATE != 0) || this.onlySend);
        });
      },
      delAttached(index) {
        this.$confirm('确定删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.form.attached.splice(index, 1);
        });
      },
      handleRegionChange(val) {
        cascRegion(this.region, val);
      },
      dateformat(row, column) {
        let date = row[column.property];
        if (!date) {
          return "";
        }
        return moment(date).format("YYYY-MM-DD");
      },
      // 预上传示例
      handleChooseFiles(refName){
        const tis = this;
        tis.dialogVisible = true;
        this.$nextTick(() => {
          // 通过组件中设置的ref属性调取formView.vue中的fillData()方法加载弹窗内容
          this.$refs.treeView.initData(refName);
        });
      },
      selectedData(res){
        // 所选择的树节点id
        console.log('selected data===', res);
        if(!/\d/.test(res.refName)) {
          // 选择证书
          if(!this.form[res.refName].fileList) {
            this.$set(this.form[res.refName], "fileList", []);
          }
          this.$nextTick(()=>{
            res.data.forEach(function (item) {
              this.form[res.refName].fileList.push(item);
            }.bind(this));
          })
        } else {
          // 选择附加信息文件
          if(!this.form.fileList[res.refName]) {
            this.$set(this.form.fileList, res.refName, []);
          }
          this.$nextTick(()=>{
            res.data.forEach(item => {
              this.form.fileList[res.refName].push(item);
            });
          });
        }
      },
      upLoadImgIdList(res){
        //需要上传的id集合
        console.log('========从预览里面来的');
        console.log(res);
        if(!/\d/.test(res.refName)) {
          // 证书
          this.$set(this.form[res.refName], "fileList", res.data);
        } else {
          // 附加信息
          this.$set(this.form.fileList, res.refName, res.data);
        }
      },
      //本地上传示例
      getUploadList(res){
        console.log(res);
        res.data.forEach(function (item) {
          this.uploadFileList[res.refName].push(item)
        }.bind(this))
      },
      uploadList(res) {
        console.log('========从预览里面来的');
        console.log(res);
        this.uploadFileList[res.refName] = res.data;
      },
      toChange(t) {
        if(t.name == "second") {
          this.$router.push('/AUDIT/messageChanges/enterpriseChange');
        }if(t.name == "three") {
          this.$router.push('/AUDIT/messageDoubt/enterpriseDeclareDoubt');
        }if(t.name == "four") {
          this.$router.push('/AUDIT/messageDoubt/enterpriseChangeDoubt');
        }if(t.name == "five") {
          this.$router.push('/AUDIT/orgClarify/enterpriseClarifyDeclare');
        }if(t.name == "six") {
          this.$router.push('/AUDIT/orgClarify/enterpriseClarifyChange');
        }
      },
      changeCondition(){
        this.$nextTick(()=>{
          /**
           * 查询设置锚点位置
           * */
          this.getNodesHeight('product-addup-box', 'enter-shxx');
        })
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
