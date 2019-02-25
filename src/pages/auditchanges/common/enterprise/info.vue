<template>
  <div>
    <el-form ref="form" :model="form" label-position="left" size="small" label-width="160px">
      <h3 class="qyxx">企业基础信息</h3>
      <el-row :gutter="24">
        <el-col :span="10">
          <ent-input label="企业名称" prop="org.NAME" :cli="cli.org.NAME" :before="old.org.NAME" :after="now.org.NAME" :audit="audit.org.NAME" :form="form.org.NAME" v-model="form.org.NAME" :limit="show.org.NAME$" :btn="button('org.NAME')" :upload="upload" :fileList="fileList" field="org.NAME" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(1, now.org.NAME)" v-model="show.org.NAME$" :label="tips"></el-checkbox>&nbsp;
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="10">
          <ent-input label="统一社会信用代码" :cli="cli.org.CREDIT_CODE" :before="old.org.CREDIT_CODE" :after="now.org.CREDIT_CODE" :audit="audit.org.CREDIT_CODE" :form="form.org.CREDIT_CODE" v-model="form.org.CREDIT_CODE" :limit="show.org.CREDIT_CODE$" :btn="button('org.CREDIT_CODE')" :upload="upload" :fileList="fileList" field="org.CREDIT_CODE" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(3, now.org.CREDIT_CODE)" v-model="show.org.CREDIT_CODE$" :label="tips"></el-checkbox>&nbsp;
        </el-col>
        <el-col :span="10">
          <ent-input label="组织机构代码" :cli="cli.org.ORGANIZE_CODE" :before="old.org.ORGANIZE_CODE" :after="now.org.ORGANIZE_CODE" :audit="audit.org.ORGANIZE_CODE" :form="form.org.ORGANIZE_CODE" v-model="form.org.ORGANIZE_CODE" :limit="show.org.ORGANIZE_CODE$" :btn="button('org.ORGANIZE_CODE')" :upload="upload" :fileList="fileList" field="org.ORGANIZE_CODE" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(3, now.org.ORGANIZE_CODE)" v-model="show.org.ORGANIZE_CODE$" :label="tips"></el-checkbox>&nbsp;
        </el-col>
        <el-col :span="20">
          <el-form-item label="企业类型" prop="type">
            <span v-if="old.enterprise.FACTORY_FLAG">生产企业</span>
            <span v-if="old.enterprise.SALER_FLAG">代理企业</span>
            <span v-if="old.enterprise.SEND_FLAG">配送企业</span>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <ent-input label="企业简称" prop="org.ABBR" :cli="cli.org.ABBR" :before="old.org.ABBR" :after="now.org.ABBR" :audit="audit.org.ABBR" :form="form.org.ABBR" v-model="form.org.ABBR" :limit="show.org.ABBR$" :btn="button('org.ABBR')" :upload="upload" :fileList="fileList" field="org.ABBR" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(2, now.org.ABBR)" v-model="show.org.ABBR$" :label="tips"></el-checkbox>&nbsp;
        </el-col>
        <el-col :span="10">
          <el-form-item label="经济性质" prop="enterprise.BUSINESS_FLAG">
            <!--<div :class="{ 'orange' : now.enterprise.BUSINESS_FLAG }">-->
            <div>
              <span v-if="now.enterprise.BUSINESS_FLAG">变更前：</span>
              {{ getValueByKey(businessFlag, old.enterprise.BUSINESS_FLAG) }}
              <a class="audit-answer-if" v-if="btn && cli.enterprise.BUSINESS_FLAG" @click="question(cli.enterprise.BUSINESS_FLAG)">{{button('enterprise.BUSINESS_FLAG')}}</a>
            </div>
            <div v-if="now.enterprise.BUSINESS_FLAG" class="orange">变更后：{{now.enterprise.BUSINESS_FLAG}}</div>
            <div v-if="audit.enterprise.BUSINESS_FLAG" class="orange">审核后：{{audit.enterprise.BUSINESS_FLAG}}</div>
            <el-select v-if="show.enterprise.BUSINESS_FLAG$" v-model="form.enterprise.BUSINESS_FLAG" placeholder="经济性质">
              <el-option v-for="x in businessFlag" :key="x.key" :label="x.value"
                         :value="x.key"></el-option>
            </el-select>
            <upload-button class="button-start" v-if="show.enterprise.BUSINESS_FLAG$ && upload" buttonFlag="enterprise.BUSINESS_FLAG" :fileListFlag='fileList["enterprise.BUSINESS_FLAG"] || []' fileType="1" @uploadList="getUploadList"></upload-button>
            <images-preview
              v-if="show.enterprise.BUSINESS_FLAG$ && upload"
              refName="enterprise.BUSINESS_FLAG"
              ref="imagesPreview"
              :imgIdListUnUnique="fileList['enterprise.BUSINESS_FLAG'] || []"
              @imgIdListChange="uploadList"></images-preview>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(3, now.enterprise.BUSINESS_FLAG)" v-model="show.enterprise.BUSINESS_FLAG$" :label="tips"></el-checkbox>&nbsp;
        </el-col>
        <el-col :span="10">
          <ent-textarea label="企业曾用名" prop="enterprise.USED_NAME" :cli="cli.enterprise.USED_NAME" :before="old.enterprise.USED_NAME" :after="now.enterprise.USED_NAME" :audit="audit.enterprise.USED_NAME" :form="form.enterprise.USED_NAME" v-model="form.enterprise.USED_NAME" :limit="show.enterprise.USED_NAME$" :rows="4" :btn="button('enterprise.USED_NAME')" :upload="upload" :fileList="fileList" field="enterprise.USED_NAME" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-textarea>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(2, now.enterprise.USED_NAME)" v-model="show.enterprise.USED_NAME$" :label="tips"></el-checkbox>&nbsp;
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="10">
          <el-form-item label="所在地区" prop="area">
            <!--<div :class="{ 'orange' : now.enterprise.COUNTRY_ID }">-->
            <div>
              <span v-if="now.enterprise.COUNTRY_ID">变更前：</span>
              {{old.enterprise.COUNTRY_ID}}
              {{old.enterprise.PROVINCE_ID}}
              {{old.enterprise.CITY_ID}}
              {{old.enterprise.COUNTY_ID}}
              <a class="audit-answer-if" v-if="btn && cli.enterprise.COUNTRY_ID" @click="question(cli.enterprise.COUNTRY_ID)">{{button('enterprise.COUNTRY_ID')}}</a>
            </div>
            <div v-if="now.enterprise.COUNTRY_ID" class="orange">
              变更后：
              {{now.enterprise.COUNTRY_ID}}
              {{now.enterprise.PROVINCE_ID}}
              {{now.enterprise.CITY_ID}}
              {{now.enterprise.COUNTY_ID}}
            </div>
            <div v-if="audit.enterprise.COUNTRY_ID" class="orange">
              审核后：
              {{audit.enterprise.COUNTRY_ID}}
              {{audit.enterprise.PROVINCE_ID}}
              {{audit.enterprise.CITY_ID}}
              {{audit.enterprise.COUNTY_ID}}
            </div>
            <el-cascader
              size="300"
              :options="region"
              v-if="show.region$"
              v-model="area"
              @active-item-change="handleRegionChange">
            </el-cascader>
            <upload-button class="button-start" v-if="show.region$ && upload" buttonFlag="enterprise.COUNTRY_ID" :fileListFlag='fileList["enterprise.COUNTRY_ID"] || []' fileType="1" @uploadList="getUploadList"></upload-button>
            <images-preview
              v-if="show.region$ && upload"
              refName="enterprise.COUNTRY_ID"
              ref="imagesPreview"
              :imgIdListUnUnique="fileList['enterprise.COUNTRY_ID'] || []"
              @imgIdListChange="uploadList"></images-preview>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(3, now.enterprise.COUNTRY_ID)" v-model="show.region$" :label="tips"></el-checkbox>&nbsp;
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="10">
          <el-form-item label="是否法人企业">
            <div>
              <span v-if="old.enterprise.IS_JURIDICAL_COMPANY">是</span>
              <span v-if="!old.enterprise.IS_JURIDICAL_COMPANY">否</span>
              <a class="audit-answer-if" v-if="btn && cli.enterprise.IS_JURIDICAL_COMPANY" @click="question(cli.enterprise.IS_JURIDICAL_COMPANY)">{{button('enterprise.IS_JURIDICAL_COMPANY')}}</a>
            </div>
            <el-radio v-if="show.enterprise.IS_JURIDICAL_COMPANY$" v-model="form.enterprise.IS_JURIDICAL_COMPANY" label="1">是</el-radio>
            <el-radio v-if="show.enterprise.IS_JURIDICAL_COMPANY$" v-model="form.enterprise.IS_JURIDICAL_COMPANY" label="0">否</el-radio>
            <upload-button class="button-start" v-if="show.enterprise.IS_JURIDICAL_COMPANY$ && upload" buttonFlag="enterprise.IS_JURIDICAL_COMPANY" :fileListFlag='fileList["enterprise.IS_JURIDICAL_COMPANY"] || []' fileType="1" @uploadList="getUploadList"></upload-button>
            <images-preview
              v-if="show.enterprise.IS_JURIDICAL_COMPANY$ && upload"
              refName="enterprise.IS_JURIDICAL_COMPANY"
              ref="imagesPreview"
              :imgIdListUnUnique="fileList['enterprise.IS_JURIDICAL_COMPANY'] || []"
              @imgIdListChange="uploadList"></images-preview>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(2, now.enterprise.IS_JURIDICAL_COMPANY)" v-model="show.enterprise.IS_JURIDICAL_COMPANY$" :label="tips"></el-checkbox>&nbsp;
        </el-col>
        <el-col :span="10">
          <ent-input label="分部负责人" :cli="cli.enterprise.BRANCH_PRINCIPAL" :before="old.enterprise.BRANCH_PRINCIPAL" :after="now.enterprise.BRANCH_PRINCIPAL" :audit="audit.enterprise.BRANCH_PRINCIPAL" :form="form.enterprise.BRANCH_PRINCIPAL" v-model="form.enterprise.BRANCH_PRINCIPAL" :limit="show.enterprise.BRANCH_PRINCIPAL$" :btn="button('enterprise.BRANCH_PRINCIPAL')" :upload="upload" :fileList="fileList" field="enterprise.BRANCH_PRINCIPAL" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(2, now.enterprise.BRANCH_PRINCIPAL)" v-model="show.enterprise.BRANCH_PRINCIPAL$" :label="tips"></el-checkbox>&nbsp;
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="10">
          <ent-input label="分部名称" :cli="cli.enterprise.BRANCH_NAME" :before="old.enterprise.BRANCH_NAME" :after="now.enterprise.BRANCH_NAME" :audit="audit.enterprise.BRANCH_NAME" :form="form.enterprise.BRANCH_NAME" v-model="form.enterprise.BRANCH_NAME" :limit="show.enterprise.BRANCH_NAME$" :btn="button('enterprise.BRANCH_NAME')" :upload="upload" :fileList="fileList" field="enterprise.BRANCH_NAME" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(2, now.enterprise.BRANCH_NAME)" v-model="show.enterprise.BRANCH_NAME$" :label="tips"></el-checkbox>&nbsp;
        </el-col>
        <el-col :span="10">
          <ent-input label="分部地址" :cli="cli.enterprise.BRANCH_ADDRESS" :before="old.enterprise.BRANCH_ADDRESS" :after="now.enterprise.BRANCH_ADDRESS" :audit="audit.enterprise.BRANCH_ADDRESS" :form="form.enterprise.BRANCH_ADDRESS" v-model="form.enterprise.BRANCH_ADDRESS" :limit="show.enterprise.BRANCH_ADDRESS$" :btn="button('enterprise.BRANCH_ADDRESS')" :upload="upload" :fileList="fileList" field="enterprise.BRANCH_ADDRESS" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(2, now.enterprise.BRANCH_ADDRESS)" v-model="show.enterprise.BRANCH_ADDRESS$" :label="tips"></el-checkbox>&nbsp;
        </el-col>
        <el-col :span="10">
          <ent-textarea label="备注" :cli="cli.enterprise.REMARK" :before="old.enterprise.REMARK" :after="now.enterprise.REMARK" :audit="audit.enterprise.REMARK" :form="form.enterprise.REMARK" v-model="form.enterprise.REMARK" :limit="show.enterprise.REMARK$" :rows="4" :btn="button('enterprise.REMARK')" :upload="upload" :fileList="fileList" field="enterprise.REMARK" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-textarea>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(2, now.enterprise.REMARK)" v-model="show.enterprise.REMARK$" :label="tips"></el-checkbox>&nbsp;
        </el-col>
      </el-row>
      <h3 class="zx">资信信息</h3>
      <el-row :gutter="24">
        <el-col :span="10">
          <ent-input label="开户名称" prop="enterprise.ACCOUNT_NAME" :cli="cli.enterprise.ACCOUNT_NAME" :before="old.enterprise.ACCOUNT_NAME" :after="now.enterprise.ACCOUNT_NAME" :audit="audit.enterprise.ACCOUNT_NAME" :form="form.enterprise.ACCOUNT_NAME" v-model="form.enterprise.ACCOUNT_NAME" :limit="show.enterprise.ACCOUNT_NAME$" :btn="button('enterprise.ACCOUNT_NAME')" :upload="upload" :fileList="fileList" field="enterprise.ACCOUNT_NAME" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(2, now.enterprise.ACCOUNT_NAME)" v-model="show.enterprise.ACCOUNT_NAME$" :label="tips"></el-checkbox>&nbsp;
        </el-col>
        <el-col :span="10">
          <ent-input label="开户银行" prop="enterprise.ACCOUNT_BANK" :cli="cli.enterprise.ACCOUNT_BANK" :before="old.enterprise.ACCOUNT_BANK" :after="now.enterprise.ACCOUNT_BANK" :audit="audit.enterprise.ACCOUNT_BANK" :form="form.enterprise.ACCOUNT_BANK" v-model="form.enterprise.ACCOUNT_BANK" :limit="show.enterprise.ACCOUNT_BANK$" :btn="button('enterprise.ACCOUNT_BANK')" :upload="upload" :fileList="fileList" field="enterprise.ACCOUNT_BANK" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(2, now.enterprise.ACCOUNT_BANK)" v-model="show.enterprise.ACCOUNT_BANK$" :label="tips"></el-checkbox>&nbsp;
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="10">
          <ent-input label="开户账号" prop="enterprise.ACCOUNT_NUMBER" :cli="cli.enterprise.ACCOUNT_NUMBER" :before="old.enterprise.ACCOUNT_NUMBER" :after="now.enterprise.ACCOUNT_NUMBER" :audit="audit.enterprise.ACCOUNT_NUMBER" :form="form.enterprise.ACCOUNT_NUMBER" v-model="form.enterprise.ACCOUNT_NUMBER" :limit="show.enterprise.ACCOUNT_NUMBER$" :btn="button('enterprise.ACCOUNT_NUMBER')" :upload="upload" :fileList="fileList" field="enterprise.ACCOUNT_NUMBER" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(2, now.enterprise.ACCOUNT_NUMBER)" v-model="show.enterprise.ACCOUNT_NUMBER$" :label="tips"></el-checkbox>&nbsp;
        </el-col>
        <el-col :span="10">
          <ent-input label="纳税人登记号" prop="enterprise.TAXPAYER_CODE" :cli="cli.enterprise.TAXPAYER_CODE" :before="old.enterprise.TAXPAYER_CODE" :after="now.enterprise.TAXPAYER_CODE" :audit="audit.enterprise.TAXPAYER_CODE" :form="form.enterprise.TAXPAYER_CODE" v-model="form.enterprise.TAXPAYER_CODE" :limit="show.enterprise.TAXPAYER_CODE$" :btn="button('enterprise.TAXPAYER_CODE')" :upload="upload" :fileList="fileList" field="enterprise.TAXPAYER_CODE" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(2, now.enterprise.TAXPAYER_CODE)" v-model="show.enterprise.TAXPAYER_CODE$" :label="tips"></el-checkbox>&nbsp;
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="10">
          <ent-input label="邮政编码" :cli="cli.enterprise.POST_CODE" :before="old.enterprise.POST_CODE" :after="now.enterprise.POST_CODE" :audit="audit.enterprise.POST_CODE" :form="form.enterprise.POST_CODE" v-model="form.enterprise.POST_CODE" :limit="show.enterprise.POST_CODE$" :btn="button('enterprise.POST_CODE')" :upload="upload" :fileList="fileList" field="enterprise.POST_CODE" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(2, now.enterprise.POST_CODE)" v-model="show.enterprise.POST_CODE$" :label="tips"></el-checkbox>&nbsp;
        </el-col>
        <el-col :span="10">
          <ent-input label="企业电话" prop="enterprise.TEL" :cli="cli.enterprise.TEL" :before="old.enterprise.TEL" :after="now.enterprise.TEL" :audit="audit.enterprise.TEL" :form="form.enterprise.TEL" v-model="form.enterprise.TEL" :limit="show.enterprise.TEL$" :btn="button('enterprise.TEL')" :upload="upload" :fileList="fileList" field="enterprise.TEL" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(2, now.enterprise.TEL)" v-model="show.enterprise.TEL$" :label="tips"></el-checkbox>&nbsp;
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <!--<el-col :span="10">-->
          <!--<ent-input label="固定电话" :cli="cli.enterprise.LANDLINE_TEL" :before="old.enterprise.LANDLINE_TEL" :after="now.enterprise.LANDLINE_TEL" :audit="audit.enterprise.LANDLINE_TEL" :form="form.enterprise.LANDLINE_TEL" v-model="form.enterprise.LANDLINE_TEL" :limit="show.enterprise.LANDLINE_TEL$" :btn="button('enterprise.LANDLINE_TEL')" :upload="upload" :fileList="fileList" field="enterprise.LANDLINE_TEL" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>-->
        <!--</el-col>-->
        <!--<el-col :span="2">-->
          <!--<el-checkbox v-if="off(2, now.enterprise.LANDLINE_TEL)" v-model="show.enterprise.LANDLINE_TEL$" :label="tips"></el-checkbox>&nbsp;-->
        <!--</el-col>-->
        <el-col :span="10">
          <ent-input label="企业传真" :cli="cli.enterprise.FAX" :before="old.enterprise.FAX" :after="now.enterprise.FAX" :audit="audit.enterprise.FAX" :form="form.enterprise.FAX" v-model="form.enterprise.FAX" :limit="show.enterprise.FAX$" :btn="button('enterprise.FAX')" :upload="upload" :fileList="fileList" field="enterprise.FAX" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(2, now.enterprise.FAX)" v-model="show.enterprise.FAX$" :label="tips"></el-checkbox>&nbsp;
        </el-col>
        <el-col :span="10">
          <ent-input label="企业网址" :cli="cli.enterprise.WEBSITE" :before="old.enterprise.WEBSITE" :after="now.enterprise.WEBSITE" :audit="audit.enterprise.WEBSITE" :form="form.enterprise.WEBSITE" v-model="form.enterprise.WEBSITE" :limit="show.enterprise.WEBSITE$" :btn="button('enterprise.WEBSITE')" :upload="upload" :fileList="fileList" field="enterprise.WEBSITE" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(2, now.enterprise.WEBSITE)" v-model="show.enterprise.WEBSITE$" :label="tips"></el-checkbox>&nbsp;
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="10">
          <ent-input label="企业QQ号" prop="enterprise.QQ" :cli="cli.enterprise.QQ" :before="old.enterprise.QQ" :after="now.enterprise.QQ" :audit="audit.enterprise.QQ" :form="form.enterprise.QQ" v-model="form.enterprise.QQ" :limit="show.enterprise.QQ$" :btn="button('enterprise.QQ')" :upload="upload" :fileList="fileList" field="enterprise.QQ" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(2, now.enterprise.QQ)" v-model="show.enterprise.QQ$" :label="tips"></el-checkbox>&nbsp;
        </el-col>
      </el-row>
      <h3 class="sbrxx" v-show="flag != 2 && flag != 3 && flag != 6">申报人信息</h3>
      <div v-if="flag != 2 && flag != 3 && flag != 6" class="tableset">
        <el-table :data="old.attached" border stripe>
          <el-table-column label="申报人">
            <template slot-scope="scope">
              {{ scope.row.LINK_PERSON }}
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
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <div class="operates">
              <span><a href="javascript:;" class="operation-btn" @click="editAttached(scope.$index)">详情</a></span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <attached ref="attached" :type="type" :flag="flag" :limit="limit" :showQuestion="showQuestion" :tips="tips" :upload="upload" :btn="btn" :clarify="clarify" @faq="question"></attached>
      </div>
      <h3 class="yyzz">营业执照信息</h3>
      <el-row :gutter="24">
        <el-col :span="20">
          <ent-input label="注册号" prop="enterprise.REG_NO" :cli="cli.enterprise.REG_NO" :before="old.enterprise.REG_NO" :after="now.enterprise.REG_NO" :audit="audit.enterprise.REG_NO" :form="form.enterprise.REG_NO" v-model="form.enterprise.REG_NO" :limit="show.enterprise.REG_NO$" :btn="button('enterprise.REG_NO')" :upload="upload" :fileList="fileList" field="enterprise.REG_NO" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(2, now.enterprise.REG_NO)" v-model="show.enterprise.REG_NO$" :label="tips"></el-checkbox>&nbsp;
        </el-col>
        <el-col :span="20">
          <ent-input label="企业名称" prop="enterprise.REG_NAME" :cli="cli.enterprise.REG_NAME" :before="old.enterprise.REG_NAME" :after="now.enterprise.REG_NAME" :audit="audit.enterprise.REG_NAME" :form="form.enterprise.REG_NAME" v-model="form.enterprise.REG_NAME" :limit="show.enterprise.REG_NAME$" :btn="button('enterprise.REG_NAME')" :upload="upload" :fileList="fileList" field="enterprise.REG_NAME" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(1, now.enterprise.REG_NAME)" v-model="show.enterprise.REG_NAME$" :label="tips"></el-checkbox>&nbsp;
        </el-col>
        <el-col :span="20">
          <el-form-item label="类型" prop="enterprise.REG_TYPE">
            <!--<div :class="{ 'orange' : now.enterprise.REG_TYPE }">-->
            <div>
              <span v-if="now.enterprise.REG_TYPE">变更前：</span>
              {{ getValueByKey(companyType, old.enterprise.REG_TYPE) }}
              <a class="audit-answer-if" v-if="btn && cli.enterprise.REG_TYPE" @click="question(cli.enterprise.REG_TYPE)">{{button("enterprise.REG_TYPE")}}</a>
            </div>
            <div v-if="now.enterprise.REG_TYPE" class="orange">变更后：{{now.enterprise.REG_TYPE}}</div>
            <div v-if="audit.enterprise.REG_TYPE" class="orange">审核后：{{audit.enterprise.REG_TYPE}}</div>
            <el-select v-if="show.enterprise.REG_TYPE$" v-model="form.enterprise.REG_TYPE" placeholder="类型">
              <el-option v-for="x in companyType" :key="x.key" :label="x.value"
                         :value="x.key"></el-option>
            </el-select>
            <upload-button class="button-start" v-if="show.enterprise.REG_TYPE$ && upload" buttonFlag="enterprise.REG_TYPE" :fileListFlag='fileList["enterprise.REG_TYPE"] || []' fileType="1" @uploadList="getUploadList"></upload-button>
            <images-preview
              v-if="show.enterprise.REG_TYPE$ && upload"
              refName="enterprise.REG_TYPE"
              ref="imagesPreview"
              :imgIdListUnUnique="fileList['enterprise.REG_TYPE'] || []"
              @imgIdListChange="uploadList"></images-preview>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(2, now.enterprise.REG_TYPE)" v-model="show.enterprise.REG_TYPE$" :label="tips"></el-checkbox>&nbsp;
        </el-col>
        <el-col :span="20">
          <ent-input label="住所" prop="enterprise.ADDRESS" :cli="cli.enterprise.ADDRESS" :before="old.enterprise.ADDRESS" :after="now.enterprise.ADDRESS" :audit="audit.enterprise.ADDRESS" :form="form.enterprise.ADDRESS" v-model="form.enterprise.ADDRESS" :limit="show.enterprise.ADDRESS$" :btn="button('enterprise.ADDRESS')" :upload="upload" :fileList="fileList" field="enterprise.ADDRESS" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(2, now.enterprise.ADDRESS)" v-model="show.enterprise.ADDRESS$" :label="tips"></el-checkbox>&nbsp;
        </el-col>
        <el-col :span="20">
          <ent-input label="法定代表人" prop="enterprise.JURIDICAL_PERSON" :cli="cli.enterprise.JURIDICAL_PERSON" :before="old.enterprise.JURIDICAL_PERSON" :after="now.enterprise.JURIDICAL_PERSON" :audit="audit.enterprise.JURIDICAL_PERSON" :form="form.enterprise.JURIDICAL_PERSON" v-model="form.enterprise.JURIDICAL_PERSON" :limit="show.enterprise.JURIDICAL_PERSON$" :btn="button('enterprise.JURIDICAL_PERSON')" :upload="upload" :fileList="fileList" field="enterprise.JURIDICAL_PERSON" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(2, now.enterprise.JURIDICAL_PERSON)" v-model="show.enterprise.JURIDICAL_PERSON$" :label="tips"></el-checkbox>&nbsp;
        </el-col>
        <el-col :span="20">
          <ent-input label="注册资本" :cli="cli.enterprise.REG_CAPITAL" :before="old.enterprise.REG_CAPITAL" :after="now.enterprise.REG_CAPITAL" :audit="audit.enterprise.REG_CAPITAL" :form="form.enterprise.REG_CAPITAL" v-model="form.enterprise.REG_CAPITAL" :limit="show.enterprise.REG_CAPITAL$" :btn="button('enterprise.REG_CAPITAL')" :upload="upload" :fileList="fileList" field="enterprise.REG_CAPITAL" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(2, now.enterprise.REG_CAPITAL)" v-model="show.enterprise.REG_CAPITAL$" :label="tips"></el-checkbox>&nbsp;
        </el-col>
        <el-col :span="20">
          <el-form-item label="注册资金" prop="enterprise.REG_AMOUNT">
            <el-col :span="14" style="padding: 0;">
              <!--<div :class="{ 'orange' : now.enterprise.REG_AMOUNT }">-->
              <div>
                <span v-if="now.enterprise.REG_AMOUNT">变更前：</span>{{old.enterprise.REG_AMOUNT}}
                <a class="audit-answer-if" v-if="btn && cli.enterprise.REG_AMOUNT" @click="question(cli.enterprise.REG_AMOUNT)">{{button('enterprise.REG_AMOUNT')}}</a>
              </div>
              <div v-if="now.enterprise.REG_AMOUNT" class="orange">变更后：{{now.enterprise.REG_AMOUNT}}</div>
              <div v-if="audit.enterprise.REG_AMOUNT" class="orange">审核后：{{audit.enterprise.REG_AMOUNT}}</div>
              <el-input v-if="show.enterprise.REG_AMOUNT$" v-model="form.enterprise.REG_AMOUNT" placeholder="注册资金"></el-input>
              <upload-button class="button-start" v-if="show.enterprise.REG_AMOUNT$ && upload" buttonFlag="enterprise.REG_AMOUNT" :fileListFlag='fileList["enterprise.REG_AMOUNT"] || []' fileType="1" @uploadList="getUploadList"></upload-button>
              <images-preview
                v-if="show.enterprise.REG_AMOUNT$ && upload"
                refName="enterprise.REG_AMOUNT"
                ref="imagesPreview"
                :imgIdListUnUnique="fileList['enterprise.REG_AMOUNT'] || []"
                @imgIdListChange="uploadList"></images-preview>
            </el-col>
            <el-col :span="10" style="padding-right: 0;">
              <!--<div :class="{ 'orange' : now.enterprise.REG_AMOUNT_UNIT }">-->
              <div>
                <span v-if="now.enterprise.REG_AMOUNT_UNIT">变更前：</span>{{ getValueByKey(moneyType, old.enterprise.REG_AMOUNT_UNIT) }}
                <a class="audit-answer-if" v-if="btn && cli.enterprise.REG_AMOUNT_UNIT" @click="question(cli.enterprise.REG_AMOUNT_UNIT)">{{button('enterprise.REG_AMOUNT_UNIT')}}</a>
              </div>
              <div v-if="now.enterprise.REG_AMOUNT_UNIT" class="orange">变更后：{{ getValueByKey(moneyType, now.enterprise.REG_AMOUNT_UNIT) }}</div>
              <div v-if="audit.enterprise.REG_AMOUNT_UNIT" class="orange">审核后：{{ getValueByKey(moneyType, audit.enterprise.REG_AMOUNT_UNIT) }}</div>
              <el-select v-if="show.enterprise.REG_AMOUNT$" v-model="form.enterprise.REG_AMOUNT_UNIT" placeholder="币种">
                <el-option v-for="x in moneyType" :key="x.key" :label="x.value"
                           :value="x.key"></el-option>
              </el-select>
              <upload-button class="button-start" v-if="show.enterprise.REG_AMOUNT$ && upload" buttonFlag="enterprise.REG_AMOUNT_UNIT" :fileListFlag='fileList["enterprise.REG_AMOUNT_UNIT"] || []' fileType="1" @uploadList="getUploadList"></upload-button>
              <images-preview
                v-if="show.enterprise.REG_AMOUNT$ && upload"
                refName="enterprise.REG_AMOUNT_UNIT"
                ref="imagesPreview"
                :imgIdListUnUnique="fileList['enterprise.REG_AMOUNT_UNIT'] || []"
                @imgIdListChange="uploadList"></images-preview>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(2, now.enterprise.REG_AMOUNT)" v-model="show.enterprise.REG_AMOUNT$" :label="tips"></el-checkbox>&nbsp;
        </el-col>
        <el-col :span="20">
          <ent-date label="成立日期" prop="enterprise.FOUND_DATE" :cli="cli.enterprise.FOUND_DATE" :before="old.enterprise.FOUND_DATE" :after="now.enterprise.FOUND_DATE" :audit="audit.enterprise.FOUND_DATE" :form="form.enterprise.FOUND_DATE" v-model="form.enterprise.FOUND_DATE" :limit="show.enterprise.FOUND_DATE$" :btn="button('enterprise.FOUND_DATE')" :upload="upload" :fileList="fileList" field="enterprise.FOUND_DATE" @faq="question"></ent-date>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(2, now.enterprise.FOUND_DATE)" v-model="show.enterprise.FOUND_DATE$" :label="tips"></el-checkbox>&nbsp;
        </el-col>
        <el-col :span="20">
          <el-form-item label="营业期限" prop="REG_EXPIRE">
            <el-col :span="8" style="padding: 0;" class="datePickerW">
              <!--<div :class="{ 'orange' : now.enterprise.REG_EXPIRE_S }">-->
              <div>
                <span v-if="now.enterprise.REG_EXPIRE_S">变更前：</span>{{ old.enterprise.REG_EXPIRE_S }}
              </div>
              <div v-if="now.enterprise.REG_EXPIRE_S" class="orange">变更后：{{now.enterprise.REG_EXPIRE_S}}</div>
              <div v-if="audit.enterprise.REG_EXPIRE_S" class="orange">审核后：{{audit.enterprise.REG_EXPIRE_S}}</div>
              <el-date-picker
                v-if="show.REG_EXPIRE$"
                v-model="form.enterprise.REG_EXPIRE_S"
                placeholder="开始日期">
              </el-date-picker>
              <upload-button class="button-start" v-if="show.REG_EXPIRE$ && upload" buttonFlag="enterprise.REG_EXPIRE" :fileListFlag='fileList["enterprise.REG_EXPIRE"] || []' fileType="1" @uploadList="getUploadList"></upload-button>
              <images-preview
                v-if="show.REG_EXPIRE$ && upload"
                refName="enterprise.REG_EXPIRE"
                ref="imagesPreview"
                :imgIdListUnUnique="fileList['enterprise.REG_EXPIRE'] || []"
                @imgIdListChange="uploadList"></images-preview>
            </el-col>
            <el-col :span="1">
              至
            </el-col>
            <el-col :span="8" style="padding-right: 0;" class="datePickerW">
              <!--<div :class="{ 'orange' : now.enterprise.REG_EXPIRE_E || now.enterprise.REG_EXPIRE_Y }">-->
              <div>
                <span v-if="now.enterprise.REG_EXPIRE_E || now.enterprise.REG_EXPIRE_Y">变更前：</span>{{ !!old.enterprise.REG_EXPIRE_Y ? '永久有效' : old.enterprise.REG_EXPIRE_E}}
              </div>
              <div v-if="now.enterprise.REG_EXPIRE_E" class="orange">变更后：{{now.enterprise.REG_EXPIRE_E}}</div>
              <div v-if="audit.enterprise.REG_EXPIRE_E" class="orange">审核后：{{audit.enterprise.REG_EXPIRE_E}}</div>
              <el-date-picker
                v-if="show.REG_EXPIRE$"
                v-model="form.enterprise.REG_EXPIRE_E"
                :disabled="form.enterprise.REG_EXPIRE_Y"
                placeholder="结束日期">
              </el-date-picker>
            </el-col>
            <el-col :span="7" style="padding: 0;">
              <a class="audit-answer-if" v-if="btn && cli.enterprise.REG_EXPIRE" @click="question(cli.enterprise.REG_EXPIRE)">{{button("enterprise.REG_EXPIRE")}}</a>
              <el-checkbox v-if="show.REG_EXPIRE$" v-model="form.enterprise.REG_EXPIRE_Y" label="永久有效"></el-checkbox>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(2, now.enterprise.REG_EXPIRE_S)" v-model="show.REG_EXPIRE$" :label="tips"></el-checkbox>&nbsp;
        </el-col>
        <el-col :span="20">
          <ent-textarea label="经营范围" prop="enterprise.REG_SCOPE" :cli="cli.enterprise.REG_SCOPE" :before="old.enterprise.REG_SCOPE" :after="now.enterprise.REG_SCOPE" :audit="audit.enterprise.REG_SCOPE" :form="form.enterprise.REG_SCOPE" v-model="form.enterprise.REG_SCOPE" :limit="show.enterprise.REG_SCOPE$" :rows="4" :btn="button('enterprise.REG_SCOPE')" :upload="upload" :fileList="fileList" field="enterprise.REG_SCOPE" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-textarea>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(2, now.enterprise.REG_SCOPE)" v-model="show.enterprise.REG_SCOPE$" :label="tips"></el-checkbox>&nbsp;
        </el-col>
        <el-col :span="20">
          <ent-input label="登记机关" :cli="cli.enterprise.REG_DEPARTMENT" :before="old.enterprise.REG_DEPARTMENT" :after="now.enterprise.REG_DEPARTMENT" :audit="audit.enterprise.REG_DEPARTMENT" :form="form.enterprise.REG_DEPARTMENT" v-model="form.enterprise.REG_DEPARTMENT" :limit="show.enterprise.REG_DEPARTMENT$" :btn="button('enterprise.REG_DEPARTMENT')" :upload="upload" :fileList="fileList" field="enterprise.REG_DEPARTMENT" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(2, now.enterprise.REG_DEPARTMENT)" v-model="show.enterprise.REG_DEPARTMENT$" :label="tips"></el-checkbox>&nbsp;
        </el-col>
        <el-col :span="20">
          <ent-date label="发证日期" :cli="cli.enterprise.REG_DATE" :before="old.enterprise.REG_DATE" :after="now.enterprise.REG_DATE" :audit="audit.enterprise.REG_DATE" :form="form.enterprise.REG_DATE" v-model="form.enterprise.REG_DATE" :limit="show.enterprise.REG_DATE$" :btn="button('enterprise.REG_DATE')" :upload="upload" :fileList="fileList" field="enterprise.REG_DATE" @faq="question"></ent-date>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(2, now.enterprise.REG_DATE)" v-model="show.enterprise.REG_DATE$" :label="tips"></el-checkbox>&nbsp;
        </el-col>
        <el-col :span="20">
          <el-form-item label="查看附件">
            <div class="orange" v-if="now.enterprise.fileList && now.enterprise.fileList.length > 0">变更前：</div>
            <images-preview ref="imagesPreview" :operate="false" v-if="old.enterprise.fileList" :imgIdListUnUnique="old.enterprise.fileList"></images-preview>
            <div class="orange" v-if="now.enterprise.fileList && now.enterprise.fileList.length > 0">变更后：</div>
            <images-preview ref="imagesPreview" :operate="false" v-if="now.enterprise.fileList" :imgIdListUnUnique="now.enterprise.fileList"></images-preview>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(0, now.enterprise.fileList)" v-model="show.enterprise.fileList$" :label="tips"></el-checkbox>&nbsp;
        </el-col>
        <el-col :span="20" v-if="show.enterprise.fileList$">
          <el-form-item>
            <el-button @click="handleChooseFiles('enterprise')">上传图片</el-button>
            <images-preview ref="imagesPreview" refName="enterprise" v-if="form.enterprise.fileList" :imgIdListUnUnique="form.enterprise.fileList || []" @imgIdListChange="upLoadImgIdList"></images-preview>
          </el-form-item>
        </el-col>
      </el-row>
      <h3 class="scxk" v-show="old.enterprise.FACTORY_FLAG">生产许可信息</h3>
      <div v-if="old.enterprise.FACTORY_FLAG">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-row :gutter="24">
              <el-col :span="20">
                <ent-input label="编号" :cli="cli.manufacture.PERMIT_CODE" :before="old.manufacture.PERMIT_CODE" :after="now.manufacture.PERMIT_CODE" :audit="audit.manufacture.PERMIT_CODE" :form="form.manufacture.PERMIT_CODE" v-model="form.manufacture.PERMIT_CODE" :limit="show.manufacture.PERMIT_CODE$" :btn="button('manufacture.PERMIT_CODE')" :upload="upload" :fileList="fileList" field="manufacture.PERMIT_CODE" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
              </el-col>
              <el-col :span="4">
                <el-checkbox v-if="off(2, now.manufacture.PERMIT_CODE)" v-model="show.manufacture.PERMIT_CODE$" :label="tips"></el-checkbox>&nbsp;
              </el-col>
              <el-col :span="20">
                <ent-input label="企业名称" :cli="cli.manufacture.COMPANY_NAME" :before="old.manufacture.COMPANY_NAME" :after="now.manufacture.COMPANY_NAME" :audit="audit.manufacture.COMPANY_NAME" :form="form.manufacture.COMPANY_NAME" v-model="form.manufacture.COMPANY_NAME" :limit="show.manufacture.COMPANY_NAME$" :btn="button('manufacture.COMPANY_NAME')" :upload="upload" :fileList="fileList" field="manufacture.COMPANY_NAME" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
              </el-col>
              <el-col :span="4">
                <el-checkbox v-if="off(1, now.manufacture.COMPANY_NAME)" v-model="show.manufacture.COMPANY_NAME$" :label="tips"></el-checkbox>&nbsp;
              </el-col>
              <el-col :span="20">
                <ent-input label="注册地址" :cli="cli.manufacture.ADDRESS" :before="old.manufacture.ADDRESS" :after="now.manufacture.ADDRESS" :audit="audit.manufacture.ADDRESS" :form="form.manufacture.ADDRESS" v-model="form.manufacture.ADDRESS" :limit="show.manufacture.ADDRESS$" :btn="button('manufacture.ADDRESS')" :upload="upload" :fileList="fileList" field="manufacture.ADDRESS" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
              </el-col>
              <el-col :span="4">
                <el-checkbox v-if="off(2, now.manufacture.ADDRESS)" v-model="show.manufacture.ADDRESS$" :label="tips"></el-checkbox>&nbsp;
              </el-col>
              <el-col :span="20">
                <ent-input label="法定代表人" :cli="cli.manufacture.JURIDICAL_PERSON" :before="old.manufacture.JURIDICAL_PERSON" :after="now.manufacture.JURIDICAL_PERSON" :audit="audit.manufacture.JURIDICAL_PERSON" :form="form.manufacture.JURIDICAL_PERSON" v-model="form.manufacture.JURIDICAL_PERSON" :limit="show.manufacture.JURIDICAL_PERSON$" :btn="button('manufacture.JURIDICAL_PERSON')" :upload="upload" :fileList="fileList" field="manufacture.JURIDICAL_PERSON" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
              </el-col>
              <el-col :span="4">
                <el-checkbox v-if="off(2, now.manufacture.JURIDICAL_PERSON)" v-model="show.manufacture.JURIDICAL_PERSON$" :label="tips"></el-checkbox>&nbsp;
              </el-col>
              <el-col :span="20">
                <ent-input label="企业负责人" :cli="cli.manufacture.CHARGE_PERSON" :before="old.manufacture.CHARGE_PERSON" :after="now.manufacture.CHARGE_PERSON" :audit="audit.manufacture.CHARGE_PERSON" :form="form.manufacture.CHARGE_PERSON" v-model="form.manufacture.CHARGE_PERSON" :limit="show.manufacture.CHARGE_PERSON$" :btn="button('manufacture.CHARGE_PERSON')" :upload="upload" :fileList="fileList" field="manufacture.CHARGE_PERSON" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
              </el-col>
              <el-col :span="4">
                <el-checkbox v-if="off(2, now.manufacture.CHARGE_PERSON)" v-model="show.manufacture.CHARGE_PERSON$" :label="tips"></el-checkbox>&nbsp;
              </el-col>
              <el-col :span="20">
                <el-form-item label="类型" prop="manufacture.COMPANY_TYPE">
                  <!--<div :class="{ 'orange' : now.manufacture.COMPANY_TYPE }"><span v-if="now.manufacture.COMPANY_TYPE">变更前：</span>-->
                  <div><span v-if="now.manufacture.COMPANY_TYPE">变更前：</span>
                    {{ getValueByKey(companyType, old.manufacture.COMPANY_TYPE) }}
                    <a class="audit-answer-if" v-if="btn && cli.manufacture.COMPANY_TYPE" @click="question(cli.manufacture.COMPANY_TYPE)">{{button("manufacture.COMPANY_TYPE")}}</a>
                  </div>
                  <div v-if="now.manufacture.COMPANY_TYPE" class="orange">变更后：{{now.manufacture.COMPANY_TYPE}}</div>
                  <div v-if="audit.manufacture.COMPANY_TYPE" class="orange">审核后：{{audit.manufacture.COMPANY_TYPE}}</div>
                  <el-select v-if="show.manufacture.COMPANY_TYPE$" v-model="form.manufacture.COMPANY_TYPE" placeholder="类型">
                    <el-option v-for="x in companyType" :key="x.key" :label="x.value"
                               :value="x.key"></el-option>
                  </el-select>
                  <upload-button class="button-start" v-if="show.manufacture.COMPANY_TYPE$ && upload" buttonFlag="manufacture.COMPANY_TYPE" :fileListFlag='fileList["manufacture.COMPANY_TYPE"] || []' fileType="1" @uploadList="getUploadList"></upload-button>
                  <images-preview
                    v-if="show.manufacture.COMPANY_TYPE$ && upload"
                    refName="manufacture.COMPANY_TYPE"
                    ref="imagesPreview"
                    :imgIdListUnUnique="fileList['manufacture.COMPANY_TYPE'] || []"
                    @imgIdListChange="uploadList"></images-preview>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-checkbox v-if="off(2, now.manufacture.COMPANY_TYPE)" v-model="show.manufacture.COMPANY_TYPE$" :label="tips"></el-checkbox>&nbsp;
              </el-col>
              <el-col :span="20">
                <ent-input label="质量负责人" :cli="cli.manufacture.QUALITY_OWNER" :before="old.manufacture.QUALITY_OWNER" :after="now.manufacture.QUALITY_OWNER" :audit="audit.manufacture.QUALITY_OWNER" :form="form.manufacture.QUALITY_OWNER" v-model="form.manufacture.QUALITY_OWNER" :limit="show.manufacture.QUALITY_OWNER$" :btn="button('manufacture.QUALITY_OWNER')" :upload="upload" :fileList="fileList" field="manufacture.QUALITY_OWNER" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
              </el-col>
              <el-col :span="4">
                <el-checkbox v-if="off(2, now.manufacture.QUALITY_OWNER)" v-model="show.manufacture.QUALITY_OWNER$" :label="tips"></el-checkbox>&nbsp;
              </el-col>
              <el-col :span="20">
                <ent-input label="分类码" :cli="cli.manufacture.KIND_CODE" :before="old.manufacture.KIND_CODE" :after="now.manufacture.KIND_CODE" :audit="audit.manufacture.KIND_CODE" :form="form.manufacture.KIND_CODE" v-model="form.manufacture.KIND_CODE" :limit="show.manufacture.KIND_CODE$" :btn="button('manufacture.KIND_CODE')" :upload="upload" :fileList="fileList" field="manufacture.KIND_CODE" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
              </el-col>
              <el-col :span="4">
                <el-checkbox v-if="off(2, now.manufacture.KIND_CODE)" v-model="show.manufacture.KIND_CODE$" :label="tips"></el-checkbox>&nbsp;
              </el-col>
              <el-col :span="20">
                <ent-date label="有效期至" :cli="cli.manufacture.EXPIRY_DATE" :before="old.manufacture.EXPIRY_DATE" :after="now.manufacture.EXPIRY_DATE" :audit="audit.manufacture.EXPIRY_DATE" :form="form.manufacture.EXPIRY_DATE" v-model="form.manufacture.EXPIRY_DATE" :limit="show.manufacture.EXPIRY_DATE$" :btn="button('manufacture.EXPIRY_DATE')" :upload="upload" :fileList="fileList" field="manufacture.EXPIRY_DATE" @faq="question"></ent-date>
              </el-col>
              <el-col :span="4">
                <el-checkbox v-if="off(2, now.manufacture.EXPIRY_DATE)" v-model="show.manufacture.EXPIRY_DATE$" :label="tips"></el-checkbox>&nbsp;
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="10">
            <ent-textarea label="生产地址和生产范围" :cli="cli.manufacture.PRODUCE_CATEGORY" :before="old.manufacture.PRODUCE_CATEGORY" :after="now.manufacture.PRODUCE_CATEGORY" :audit="audit.manufacture.PRODUCE_CATEGORY" :form="form.manufacture.PRODUCE_CATEGORY" v-model="form.manufacture.PRODUCE_CATEGORY" :limit="show.manufacture.PRODUCE_CATEGORY$" :rows="21" :btn="button('manufacture.PRODUCE_CATEGORY')" :upload="upload" :fileList="fileList" field="manufacture.PRODUCE_CATEGORY" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-textarea>
          </el-col>
          <el-col :span="2">
            <el-checkbox v-if="off(2, now.manufacture.PRODUCE_CATEGORY)" v-model="show.manufacture.PRODUCE_CATEGORY$" :label="tips"></el-checkbox>&nbsp;
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="10">
            <ent-input label="日常监管机构" :cli="cli.manufacture.REGULATORY_AGENCY" :before="old.manufacture.REGULATORY_AGENCY" :after="now.manufacture.REGULATORY_AGENCY" :audit="audit.manufacture.REGULATORY_AGENCY" :form="form.manufacture.REGULATORY_AGENCY" v-model="form.manufacture.REGULATORY_AGENCY" :limit="show.manufacture.REGULATORY_AGENCY$" :btn="button('manufacture.REGULATORY_AGENCY')" :upload="upload" :fileList="fileList" field="manufacture.REGULATORY_AGENCY" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
          </el-col>
          <el-col :span="2">
            <el-checkbox v-if="off(2, now.manufacture.REGULATORY_AGENCY)" v-model="show.manufacture.REGULATORY_AGENCY$" :label="tips"></el-checkbox>&nbsp;
          </el-col>
          <el-col :span="10">
            <ent-input label="发证机关" :cli="cli.manufacture.PD_INSTITUTION" :before="old.manufacture.PD_INSTITUTION" :after="now.manufacture.PD_INSTITUTION" :audit="audit.manufacture.PD_INSTITUTION" :form="form.manufacture.PD_INSTITUTION" v-model="form.manufacture.PD_INSTITUTION" :limit="show.manufacture.PD_INSTITUTION$" :btn="button('manufacture.PD_INSTITUTION')" :upload="upload" :fileList="fileList" field="manufacture.PD_INSTITUTION" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
          </el-col>
          <el-col :span="2">
            <el-checkbox v-if="off(2, now.manufacture.PD_INSTITUTION)" v-model="show.manufacture.PD_INSTITUTION$" :label="tips"></el-checkbox>&nbsp;
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="10">
            <ent-input label="日常监管人员" :cli="cli.manufacture.REGULATORY_PERSON" :before="old.manufacture.REGULATORY_PERSON" :after="now.manufacture.REGULATORY_PERSON" :audit="audit.manufacture.REGULATORY_PERSON" :form="form.manufacture.REGULATORY_PERSON" v-model="form.manufacture.REGULATORY_PERSON" :limit="show.manufacture.REGULATORY_PERSON$" :btn="button('manufacture.REGULATORY_PERSON')" :upload="upload" :fileList="fileList" field="manufacture.REGULATORY_PERSON" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
          </el-col>
          <el-col :span="2">
            <el-checkbox v-if="off(2, now.manufacture.REGULATORY_PERSON)" v-model="show.manufacture.REGULATORY_PERSON$" :label="tips"></el-checkbox>&nbsp;
          </el-col>
          <el-col :span="10">
            <ent-date label="发证日期" :cli="cli.manufacture.PD_DATE" :before="old.manufacture.PD_DATE" :after="now.manufacture.PD_DATE" :audit="audit.manufacture.PD_DATE" :form="form.manufacture.PD_DATE" v-model="form.manufacture.PD_DATE" :limit="show.manufacture.PD_DATE$" :btn="button('manufacture.PD_DATE')" :upload="upload" :fileList="fileList" field="manufacture.PD_DATE" @faq="question"></ent-date>
          </el-col>
          <el-col :span="2">
            <el-checkbox v-if="off(2, now.manufacture.PD_DATE)" v-model="show.manufacture.PD_DATE$" :label="tips"></el-checkbox>&nbsp;
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="10">
            <ent-input label="监督举报电话" :cli="cli.manufacture.SUPERVISORY_REPORT_TEL" :before="old.manufacture.SUPERVISORY_REPORT_TEL" :after="now.manufacture.SUPERVISORY_REPORT_TEL" :audit="audit.manufacture.SUPERVISORY_REPORT_TEL" :form="form.manufacture.SUPERVISORY_REPORT_TEL" v-model="form.manufacture.SUPERVISORY_REPORT_TEL" :limit="show.manufacture.SUPERVISORY_REPORT_TEL$" :btn="button('manufacture.SUPERVISORY_REPORT_TEL')" :upload="upload" :fileList="fileList" field="manufacture.SUPERVISORY_REPORT_TEL" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
          </el-col>
          <el-col :span="2">
            <el-checkbox v-if="off(2, now.manufacture.SUPERVISORY_REPORT_TEL)" v-model="show.manufacture.SUPERVISORY_REPORT_TEL$" :label="tips"></el-checkbox>&nbsp;
          </el-col>
          <el-col :span="10">
            <el-form-item label="查看附件">
              <div class="orange" v-if="now.manufacture.fileList && now.manufacture.fileList.length > 0">变更前：</div>
              <images-preview ref="imagesPreview" :operate="false" v-if="old.manufacture.fileList" :imgIdListUnUnique="old.manufacture.fileList"></images-preview>
              <div class="orange" v-if="now.manufacture.fileList && now.manufacture.fileList.length > 0">变更后：</div>
              <images-preview ref="imagesPreview" :operate="false" v-if="now.manufacture.fileList" :imgIdListUnUnique="now.manufacture.fileList"></images-preview>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-checkbox v-if="off(0, now.manufacture.fileList)" v-model="show.manufacture.fileList$" :label="tips"></el-checkbox>&nbsp;
          </el-col>
          <el-col :span="20" v-if="show.manufacture.fileList$">
            <el-form-item>
              <el-button @click="handleChooseFiles('manufacture')">上传图片</el-button>
              <images-preview ref="imagesPreview" refName="manufacture" v-if="form.manufacture.fileList" :imgIdListUnUnique="form.manufacture.fileList || []" @imgIdListChange="upLoadImgIdList"></images-preview>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <h3 class="yyxk" v-show="old.enterprise.SALER_FLAG">经营许可信息</h3>
      <div v-if="old.enterprise.SALER_FLAG">
        <el-row :gutter="24">
          <el-col :span="10">
            <ent-input label="证号" :cli="cli.dealer.PERMIT_CODE" :before="old.dealer.PERMIT_CODE" :after="now.dealer.PERMIT_CODE" :audit="audit.dealer.PERMIT_CODE" :form="form.dealer.PERMIT_CODE" v-model="form.dealer.PERMIT_CODE" :limit="show.dealer.PERMIT_CODE$" :btn="button('dealer.PERMIT_CODE')" :upload="upload" :fileList="fileList" field="dealer.PERMIT_CODE" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
          </el-col>
          <el-col :span="2">
            <el-checkbox v-if="off(2, now.dealer.PERMIT_CODE)" v-model="show.dealer.PERMIT_CODE$" :label="tips"></el-checkbox>&nbsp;
          </el-col>
          <el-col :span="10">
            <ent-input label="经营方式" :cli="cli.dealer.DEAL_NAME" :before="old.dealer.DEAL_NAME" :after="now.dealer.DEAL_NAME" :audit="audit.dealer.DEAL_NAME" :form="form.dealer.DEAL_NAME" v-model="form.dealer.DEAL_NAME" :limit="show.dealer.DEAL_NAME$" :btn="button('dealer.DEAL_NAME')" :upload="upload" :fileList="fileList" field="dealer.DEAL_NAME" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
          </el-col>
          <el-col :span="2">
            <el-checkbox v-if="off(2, now.dealer.DEAL_NAME)" v-model="show.dealer.DEAL_NAME$" :label="tips"></el-checkbox>&nbsp;
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-row :gutter="24">
              <el-col :span="20">
                <ent-input label="企业名称" :cli="cli.dealer.DEAL_NAME" :before="old.dealer.DEAL_NAME" :after="now.dealer.DEAL_NAME" :audit="audit.dealer.DEAL_NAME" :form="form.dealer.DEAL_NAME$" v-model="form.dealer.DEAL_NAME" :limit="show.dealer.DEAL_NAME$" :btn="button('dealer.DEAL_NAME')" :upload="upload" :fileList="fileList" field="dealer.DEAL_NAME" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
              </el-col>
              <el-col :span="4">
                <el-checkbox v-if="off(2, now.dealer.DEAL_NAME)" v-model="show.dealer.DEAL_NAME$" :label="tips"></el-checkbox>&nbsp;
              </el-col>
              <el-col :span="20">
                <ent-input label="注册地址" :cli="cli.dealer.ADDRESS" :before="old.dealer.ADDRESS" :after="now.dealer.ADDRESS" :audit="audit.dealer.ADDRESS" :form="form.dealer.ADDRESS" v-model="form.dealer.ADDRESS" :limit="show.dealer.ADDRESS$" :btn="button('dealer.ADDRESS')" :upload="upload" :fileList="fileList" field="dealer.ADDRESS" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
              </el-col>
              <el-col :span="4">
                <el-checkbox v-if="off(2, now.dealer.ADDRESS)" v-model="show.dealer.ADDRESS$" :label="tips"></el-checkbox>&nbsp;
              </el-col>
              <el-col :span="20">
                <ent-input label="法定代表人" :cli="cli.dealer.JURIDICAL_PERSON" :before="old.dealer.JURIDICAL_PERSON" :after="now.dealer.JURIDICAL_PERSON" :audit="audit.dealer.JURIDICAL_PERSON" :form="form.dealer.JURIDICAL_PERSON" v-model="form.dealer.JURIDICAL_PERSON" :limit="show.dealer.JURIDICAL_PERSON$" :btn="button('dealer.JURIDICAL_PERSON')" :upload="upload" :fileList="fileList" field="dealer.JURIDICAL_PERSON" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
              </el-col>
              <el-col :span="4">
                <el-checkbox v-if="off(2, now.dealer.JURIDICAL_PERSON)" v-model="show.dealer.JURIDICAL_PERSON$" :label="tips"></el-checkbox>&nbsp;
              </el-col>
              <el-col :span="20">
                <ent-input label="企业负责人" :cli="cli.dealer.ENTERPRISE_PRINCIPAL" :before="old.dealer.ENTERPRISE_PRINCIPAL" :after="now.dealer.ENTERPRISE_PRINCIPAL" :audit="audit.dealer.ENTERPRISE_PRINCIPAL" :form="form.dealer.ENTERPRISE_PRINCIPAL" v-model="form.dealer.ENTERPRISE_PRINCIPAL" :limit="show.dealer.ENTERPRISE_PRINCIPAL$" :btn="button('dealer.ENTERPRISE_PRINCIPAL')" :upload="upload" :fileList="fileList" field="dealer.ENTERPRISE_PRINCIPAL" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
              </el-col>
              <el-col :span="4">
                <el-checkbox v-if="off(2, now.dealer.ENTERPRISE_PRINCIPAL)" v-model="show.dealer.ENTERPRISE_PRINCIPAL$" :label="tips"></el-checkbox>&nbsp;
              </el-col>
              <el-col :span="20">
                <ent-input label="质量负责人" :cli="cli.dealer.QUALITY_PRINCIPAL" :before="old.dealer.QUALITY_PRINCIPAL" :after="now.dealer.QUALITY_PRINCIPAL" :audit="audit.dealer.QUALITY_PRINCIPAL" :form="form.dealer.QUALITY_PRINCIPAL" v-model="form.dealer.QUALITY_PRINCIPAL" :limit="show.dealer.QUALITY_PRINCIPAL$" :btn="button('dealer.QUALITY_PRINCIPAL')" :upload="upload" :fileList="fileList" field="dealer.QUALITY_PRINCIPAL" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
              </el-col>
              <el-col :span="4">
                <el-checkbox v-if="off(2, now.dealer.QUALITY_PRINCIPAL)" v-model="show.dealer.QUALITY_PRINCIPAL$" :label="tips"></el-checkbox>&nbsp;
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="10">
            <ent-textarea label="经营范围" :cli="cli.dealer.BUSINESS_CATEGORY" :before="old.dealer.BUSINESS_CATEGORY" :after="now.dealer.BUSINESS_CATEGORY" :audit="audit.dealer.BUSINESS_CATEGORY" :form="form.dealer.BUSINESS_CATEGORY" v-model="form.dealer.BUSINESS_CATEGORY" :limit="show.dealer.BUSINESS_CATEGORY$" :rows="8" :btn="button('dealer.BUSINESS_CATEGORY')" :upload="upload" :fileList="fileList" field="dealer.BUSINESS_CATEGORY" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-textarea>
          </el-col>
          <el-col :span="2">
            <el-checkbox v-if="off(2, now.dealer.BUSINESS_CATEGORY)" v-model="show.dealer.BUSINESS_CATEGORY$" :label="tips"></el-checkbox>&nbsp;
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="10">
            <ent-input label="仓库地址" :cli="cli.dealer.DEPOSITORY_ADDRESS" :before="old.dealer.DEPOSITORY_ADDRESS" :after="now.dealer.DEPOSITORY_ADDRESS" :audit="audit.dealer.DEPOSITORY_ADDRESS" :form="form.dealer.DEPOSITORY_ADDRESS" v-model="form.dealer.DEPOSITORY_ADDRESS" :limit="show.dealer.DEPOSITORY_ADDRESS$" :btn="button('dealer.DEPOSITORY_ADDRESS')" :upload="upload" :fileList="fileList" field="dealer.DEPOSITORY_ADDRESS" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
          </el-col>
          <el-col :span="2">
            <el-checkbox v-if="off(2, now.dealer.DEPOSITORY_ADDRESS)" v-model="show.dealer.DEPOSITORY_ADDRESS$" :label="tips"></el-checkbox>&nbsp;
          </el-col>
          <el-col :span="10">
            <ent-input label="发证机关" :cli="cli.dealer.CERTIFICATE_DEPARTMENT" :before="old.dealer.CERTIFICATE_DEPARTMENT" :after="now.dealer.CERTIFICATE_DEPARTMENT" :audit="audit.dealer.CERTIFICATE_DEPARTMENT" :form="form.dealer.CERTIFICATE_DEPARTMENT" v-model="form.dealer.CERTIFICATE_DEPARTMENT" :limit="show.dealer.CERTIFICATE_DEPARTMENT$" :btn="button('dealer.CERTIFICATE_DEPARTMENT')" :upload="upload" :fileList="fileList" field="dealer.CERTIFICATE_DEPARTMENT" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
          </el-col>
          <el-col :span="2">
            <el-checkbox v-if="off(2, now.dealer.CERTIFICATE_DEPARTMENT)" v-model="show.dealer.CERTIFICATE_DEPARTMENT$" :label="tips"></el-checkbox>&nbsp;
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="10">
            <ent-date label="有效期至" :cli="cli.dealer.EXPIRY_DATE" :before="old.dealer.EXPIRY_DATE" :after="now.dealer.EXPIRY_DATE" :audit="audit.dealer.EXPIRY_DATE" :form="form.dealer.EXPIRY_DATE" v-model="form.dealer.EXPIRY_DATE" :limit="show.dealer.EXPIRY_DATE$" :btn="button('dealer.EXPIRY_DATE')" :upload="upload" :fileList="fileList" field="dealer.EXPIRY_DATE" @faq="question"></ent-date>
          </el-col>
          <el-col :span="2">
            <el-checkbox v-if="off(2, now.dealer.EXPIRY_DATE)" v-model="show.dealer.EXPIRY_DATE$" :label="tips"></el-checkbox>&nbsp;
          </el-col>
          <el-col :span="10">
            <ent-date label="发证日期" :cli="cli.dealer.PD_DATE" :before="old.dealer.PD_DATE" :after="now.dealer.PD_DATE" :audit="audit.dealer.PD_DATE" :form="form.dealer.PD_DATE" v-model="form.dealer.PD_DATE" :limit="show.dealer.PD_DATE$" :btn="button('dealer.PD_DATE')" :upload="upload" :fileList="fileList" field="dealer.PD_DATE" @faq="question"></ent-date>
          </el-col>
          <el-col :span="2">
            <el-checkbox v-if="off(2, now.dealer.PD_DATE)" v-model="show.dealer.PD_DATE$" :label="tips"></el-checkbox>&nbsp;
          </el-col>
          <el-col :span="20">
            <el-form-item label="查看附件">
              <div class="orange" v-if="now.dealer.fileList && now.dealer.fileList.length > 0">变更前：</div>
              <images-preview ref="imagesPreview" :operate="false" v-if="old.dealer.fileList" :imgIdListUnUnique="old.dealer.fileList"></images-preview>
              <div class="orange" v-if="now.dealer.fileList && now.dealer.fileList.length > 0">变更后：</div>
              <images-preview ref="imagesPreview" :operate="false" v-if="now.dealer.fileList" :imgIdListUnUnique="now.dealer.fileList"></images-preview>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-checkbox v-if="off(0, now.dealer.fileList)" v-model="show.dealer.fileList$" :label="tips"></el-checkbox>&nbsp;
          </el-col>
          <el-col :span="20" v-if="show.dealer.fileList$">
            <el-form-item>
              <el-button @click="handleChooseFiles('dealer')">上传图片</el-button>
              <images-preview ref="imagesPreview" refName="dealer" v-if="form.dealer.fileList" :imgIdListUnUnique="form.dealer.fileList || []" @imgIdListChange="upLoadImgIdList"></images-preview>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <h3 class="gpmone" v-show="old.enterprise.FACTORY_FLAG">GMP信息</h3>
      <div v-if="old.enterprise.FACTORY_FLAG">
        <!-- 表格列表 -->
        <div class="tableset">
          <el-table :data="old.gmp" border stripe>
            <el-table-column label="证书编号">
              <template slot-scope="scope">
                {{ scope.row.CERTIFICATE_NUMBER }}
              </template>
            </el-table-column>
            <el-table-column label="发证机关">
              <template slot-scope="scope">
                <span>{{ scope.row.OFFICE_LICENCE }}</span>
              </template>
            </el-table-column>
            <el-table-column label="发证日期" :formatter="dateformat" prop="LICENCE_DATE" />
            <el-table-column label="有效期至" :formatter="dateformat" prop="EXPIRY_DATE" />
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <div class="operates">
                <span v-if="!scope.row.PROJECT_ORG_ID"><a href="javascript:;" class="operation-btn" @click="addGmp(scope.$index)">修改</a></span>
                <span v-if="!scope.row.PROJECT_ORG_ID"><a href="javascript:;" class="operation-btn" @click="delGmp(scope.$index)">删除</a></span>
                <span v-if="scope.row.PROJECT_ORG_ID"><a href="javascript:;" class="operation-btn" @click="editGmp(scope.$index)">
                  {{type == 2 && flag == 1 ? '变更' : '详情'}}
                </a></span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 当公共页是变更申报时 -->
        <p v-if="type == 2 && flag == 1">
          <el-button @click="addGmp()" type="">新增</el-button>
        </p>
      </div>
      <h3 class="gpmtwo" v-show="old.enterprise.SALER_FLAG">GSP信息</h3>
      <div v-if="old.enterprise.SALER_FLAG">
        <el-row :gutter="24">
          <el-col :span="14">
            <ent-input label="证书编号" :cli="cli.gsp.CERTIFACATE_NUMBER" :before="old.gsp.CERTIFACATE_NUMBER" :after="now.gsp.CERTIFACATE_NUMBER" :audit="audit.gsp.CERTIFACATE_NUMBER" :form="form.gsp.CERTIFACATE_NUMBER" v-model="form.gsp.CERTIFACATE_NUMBER" :limit="show.gsp.CERTIFACATE_NUMBER$" :btn="button('gsp.CERTIFACATE_NUMBER')" :upload="upload" :fileList="fileList" field="gsp.CERTIFACATE_NUMBER" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
          </el-col>
          <el-col :span="2">
            <el-checkbox v-if="off(2, now.gsp.CERTIFACATE_NUMBER)" v-model="show.gsp.CERTIFACATE_NUMBER$" :label="tips"></el-checkbox>&nbsp;
          </el-col>
          <el-col :span="14">
            <ent-input label="企业名称" :cli="cli.gsp.COMPANY_NAME" :before="old.gsp.COMPANY_NAME" :after="now.gsp.COMPANY_NAME" :audit="audit.gsp.COMPANY_NAME" :form="form.gsp.COMPANY_NAME" v-model="form.gsp.COMPANY_NAME" :limit="show.gsp.COMPANY_NAME$" :btn="button('gsp.COMPANY_NAME')" :upload="upload" :fileList="fileList" field="gsp.COMPANY_NAME" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
          </el-col>
          <el-col :span="2">
            <el-checkbox v-if="off(2, now.gsp.COMPANY_NAME)" v-model="show.gsp.COMPANY_NAME$" :label="tips"></el-checkbox>&nbsp;
          </el-col>
          <el-col :span="14">
            <ent-input label="地址" :cli="cli.gsp.ENTERPRISE_ADDRESS" :before="old.gsp.ENTERPRISE_ADDRESS" :after="now.gsp.ENTERPRISE_ADDRESS" :audit="audit.gsp.ENTERPRISE_ADDRESS" :form="form.gsp.ENTERPRISE_ADDRESS" v-model="form.gsp.ENTERPRISE_ADDRESS" :limit="show.gsp.ENTERPRISE_ADDRESS$" :btn="button('gsp.ENTERPRISE_ADDRESS')" :upload="upload" :fileList="fileList" field="gsp.ENTERPRISE_ADDRESS" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
          </el-col>
          <el-col :span="2">
            <el-checkbox v-if="off(2, now.gsp.ENTERPRISE_ADDRESS)" v-model="show.gsp.ENTERPRISE_ADDRESS$" :label="tips"></el-checkbox>&nbsp;
          </el-col>
          <el-col :span="14">
            <ent-input label="认证范围" :cli="cli.gsp.ATTESTATION_CATEGORY" :before="old.gsp.ATTESTATION_CATEGORY" :after="now.gsp.ATTESTATION_CATEGORY" :audit="audit.gsp.ATTESTATION_CATEGORY" :form="form.gsp.ATTESTATION_CATEGORY" v-model="form.gsp.ATTESTATION_CATEGORY" :limit="show.gsp.ATTESTATION_CATEGORY$" :btn="button('gsp.ATTESTATION_CATEGORY')" :upload="upload" :fileList="fileList" field="gsp.ATTESTATION_CATEGORY" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
          </el-col>
          <el-col :span="2">
            <el-checkbox v-if="off(2, now.gsp.ATTESTATION_CATEGORY)" v-model="show.gsp.ATTESTATION_CATEGORY$" :label="tips"></el-checkbox>&nbsp;
          </el-col>
          <el-col :span="14">
            <ent-date label="有效期至" :cli="cli.gsp.EXPIRY_DATE" :before="old.gsp.EXPIRY_DATE" :after="now.gsp.EXPIRY_DATE" :audit="audit.gsp.EXPIRY_DATE" :form="form.gsp.EXPIRY_DATE" v-model="form.gsp.EXPIRY_DATE" :limit="show.gsp.EXPIRY_DATE$" :btn="button('gsp.EXPIRY_DATE')" :upload="upload" :fileList="fileList" field="gsp.EXPIRY_DATE" @faq="question"></ent-date>
          </el-col>
          <el-col :span="2">
            <el-checkbox v-if="off(2, now.gsp.EXPIRY_DATE)" v-model="show.gsp.EXPIRY_DATE$" :label="tips"></el-checkbox>&nbsp;
          </el-col>
          <el-col :span="14">
            <ent-input label="发证机关" :cli="cli.gsp.OFFICE_LICENCE" :before="old.gsp.OFFICE_LICENCE" :after="now.gsp.OFFICE_LICENCE" :audit="audit.gsp.OFFICE_LICENCE" :form="form.gsp.OFFICE_LICENCE" v-model="form.gsp.OFFICE_LICENCE" :limit="show.gsp.OFFICE_LICENCE$" :btn="button('gsp.OFFICE_LICENCE')" :upload="upload" :fileList="fileList" field="gsp.OFFICE_LICENCE" @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
          </el-col>
          <el-col :span="2">
            <el-checkbox v-if="off(2, now.gsp.OFFICE_LICENCE)" v-model="show.gsp.OFFICE_LICENCE$" :label="tips"></el-checkbox>&nbsp;
          </el-col>
          <el-col :span="14">
            <ent-date label="发证日期" :cli="cli.gsp.LICENCE_DATE" :before="old.gsp.LICENCE_DATE" :after="now.gsp.LICENCE_DATE" :audit="audit.gsp.LICENCE_DATE" :form="form.gsp.LICENCE_DATE" v-model="form.gsp.LICENCE_DATE" :limit="show.gsp.LICENCE_DATE$" :btn="button('gsp.LICENCE_DATE')" :upload="upload" :fileList="fileList" field="gsp.LICENCE_DATE" @faq="question"></ent-date>
          </el-col>
          <el-col :span="2">
            <el-checkbox v-if="off(2, now.gsp.LICENCE_DATE)" v-model="show.gsp.LICENCE_DATE$" :label="tips"></el-checkbox>&nbsp;
          </el-col>
          <el-col :span="14">
            <el-form-item label="查看附件">
              <div class="orange" v-if="now.gsp.fileList && now.gsp.fileList.length > 0">变更前：</div>
              <images-preview ref="imagesPreview" :operate="false" v-if="old.gsp.fileList" :imgIdListUnUnique="old.gsp.fileList"></images-preview>
              <div class="orange" v-if="now.gsp.fileList && now.gsp.fileList.length > 0">变更后：</div>
              <images-preview ref="imagesPreview" :operate="false" v-if="now.gsp.fileList" :imgIdListUnUnique="now.gsp.fileList"></images-preview>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-checkbox v-if="off(0, now.gsp.fileList)" v-model="show.gsp.fileList$" :label="tips"></el-checkbox>&nbsp;
          </el-col>
          <el-col :span="14" v-if="show.gsp.fileList$">
            <el-form-item>
              <el-button @click="handleChooseFiles('gsp')">上传图片</el-button>
              <images-preview ref="imagesPreview" refName="gsp" v-if="form.gsp.fileList" :imgIdListUnUnique="form.gsp.fileList || []" @imgIdListChange="upLoadImgIdList"></images-preview>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <h3 class="xmxx">项目附加信息</h3>
      <el-row :gutter="24">
        <el-col v-for="(att, i) in old.annex" :key="i" v-if="att">
          <el-row :gutter="24">
            <el-col :span="5">
              <el-form-item :label="att.dicName" />
            </el-col>
            <el-col :span="19">
              <div v-for="(x, y) in att.options" :key="y">
                <el-row :gutter="24">
                  <el-col :span="10">
                    <!-- 变更前 -->
                    <!--<div :class="{ 'orange' : now.annex[i] && now.annex[i].options[y] && now.annex[i].options[y].value }">-->
                    <div>
                      <span v-if="now.annex[i] && now.annex[i].options[y] && now.annex[i].options[y].value">变更前：</span>
                      <span v-if="x.type == 1 || x.type == 2">
                        {{x.value}}
                      </span>
                      <span v-if="x.type == 3">
                        {{dateform(x.value)}}
                      </span>
                      <span v-if="x.type == 5">
                        {{attInit(x.options, x.value)}}
                      </span>
                      <span v-if="x.type == 4 || x.type == 6">
                        {{getOptions(x.options, x.value)}}
                      </span>
                      <a
                        class="audit-answer-if"
                        v-if="btn && cli.annex[i] && cli.annex[i].options[y] && cli.annex[i].options[y].value"
                        @click="question(cli.annex[i].options[y].value, x.type, x.options)">
                        {{button("annex." + i + ".options." + y + ".value")}}
                      </a>
                    </div>
                    <images-preview ref="imagesPreview" :operate="false" :imgIdListUnUnique="old.fileList[x.id] || []"></images-preview>
                    <!-- 变更后 -->
                    <div v-if="now.annex[i] && now.annex[i].options[y] && now.annex[i].options[y].value" class="orange">
                      <span v-if="now.annex[i] && now.annex[i].options[y] && now.annex[i].options[y].value">变更后：</span>
                      <span v-if="x.type == 1 || x.type == 2">
                        {{now.annex[i].options[y].value}}
                      </span>
                      <span v-if="x.type == 3">
                        {{dateform(now.annex[i].options[y].value)}}
                      </span>
                      <span v-if="x.type == 5">
                        {{attInit(x.options, now.annex[i].options[y].value)}}
                      </span>
                      <span v-if="x.type == 4 || x.type == 6">
                        {{getOptions(x.options, now.annex[i].options[y].value)}}
                      </span>
                    </div>
                    <images-preview ref="imagesPreview" :operate="false" :imgIdListUnUnique='now.fileList["annex." + i + ".options." + y + ".value"] || []'></images-preview>
                    <!-- 审核后 -->
                    <div v-if="audit.annex[i] && audit.annex[i].options[y] && audit.annex[i].options[y].value" class="orange">
                      <span v-if="audit.annex[i] && audit.annex[i].options[y] && audit.annex[i].options[y].value">审核后：</span>
                      <span v-if="x.type == 1 || x.type == 2">
                        {{audit.annex[i].options[y].value}}
                      </span>
                      <span v-if="x.type == 3">
                        {{dateform(audit.annex[i].options[y].value)}}
                      </span>
                      <span v-if="x.type == 5">
                        {{attInit(x.options, audit.annex[i].options[y].value)}}
                      </span>
                      <span v-if="x.type == 4 || x.type == 6">
                        {{getOptions(x.options, audit.annex[i].options[y].value)}}
                      </span>
                    </div>
                    <!-- 变更/质疑/不正确 -->
                    <el-input v-if="x.type == 1 && show.annex[i].options[y].value$" :placeholder="x.label" v-model="form.annex[i].options[y].value" />
                    <el-input v-if="x.type == 2 && show.annex[i].options[y].value$" :placeholder="x.label" v-model="form.annex[i].options[y].value" type="textarea" />
                    <el-date-picker v-if="x.type == 3 && show.annex[i].options[y].value$" :placeholder="x.label" v-model="form.annex[i].options[y].value" type="date" />
                    <el-select v-if="x.type == 4 && show.annex[i].options[y].value$" :placeholder="x.label" v-model="form.annex[i].options[y].value">
                      <el-option
                        v-for="item in x.options"
                        :key="item.id"
                        :label="item.text"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <el-checkbox-group v-if="x.type == 5 && show.annex[i].options[y].value$" :placeholder="x.label" v-model="checkbox[x.id]" @change="attChange(x.id, i, y)">
                      <el-checkbox v-for="(option, index) in x.options" :label="option.value" :key="index">
                        {{option.text}}
                      </el-checkbox>
                    </el-checkbox-group>
                    <el-radio-group v-if="x.type == 6 && show.annex[i].options[y].value$" :placeholder="x.label" v-model="form.annex[i].options[y].value">
                      <el-radio v-for="(option, index) in x.options" :label="option.value" :key="index">
                        {{option.text}}
                      </el-radio>
                    </el-radio-group>

                    <upload-button class="button-start" v-if="show.annex[i].options[y].value$ && (upload || x.imageFlag == 1 && flag != 4)" :buttonFlag='"annex." + i + ".options." + y + ".value"' :fileListFlag='fileList["annex." + i + ".options." + y + ".value"] || []' fileType="1" @uploadList="getUploadList"></upload-button>
                    <images-preview
                      v-if="show.annex[i].options[y].value$ && (upload || flag == 1 && type == 2)"
                      :refName='"annex." + i + ".options." + y + ".value"'
                      ref="imagesPreview"
                      :imgIdListUnUnique='fileList["annex." + i + ".options." + y + ".value"] || []'
                      @imgIdListChange="uploadList" />
                  </el-col>
                  <el-col :span="5">
                    {{x.label}}&nbsp;
                  </el-col>
                  <el-col :span="5">
                    <el-form-item>
                      <el-button class="audit-item font-size12" type="text" :href="x.tipUrl">{{x.tipText}}</el-button>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-checkbox v-if="off(2, now.annex[i] && now.annex[i].options[y] && now.annex[i].options[y].value)" v-model="show.annex[i].options[y].value$" :label="tips"></el-checkbox>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <gmp ref="gmp" :type="type" :flag="flag" :limit="limit" :showQuestion="showQuestion" :tips="tips" :upload="upload" :btn="btn" :clarify="clarify" @faq="question"></gmp>
      <create-gmp ref="createGmp"></create-gmp>
    </el-form>
    <el-dialog :close-on-click-modal="false" top="10vh" :title="btn" width="80%" :visible.sync="showQuestion" :before-close="closeQuestion" append-to-body>
      <question ref="question" :flag="flag"></question>
      <div v-if="flag == '3'">
        <h3>澄清</h3>
        <!--澄清-->
        <el-form ref="talk" :model="talk" label-width="100px" label-position="right" size="small">
          <el-row :gutter="24">
            <el-col :span="18">
              <el-form-item class="need-before" label="澄清内容">
                <el-input type="textarea" v-model="talk.content" placeholder="澄清内容" :rows="4"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item>
                <upload-button class="button-start" :buttonFlag="talk.field" :fileListFlag='talk.fileList' fileType="1" @uploadList="getClariList"></upload-button>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item>
                <images-preview
                  :refName="talk.field"
                  ref="imagesPreview"
                  :imgIdListUnUnique="talk.fileList"
                  @imgIdListChange="clariList"></images-preview>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div v-if="flag == '4' && talk.content">
        <h3>回复</h3>
        <!--澄清-->
        <el-form ref="talk" :model="talk" label-width="100px" label-position="right" size="small">
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="澄清内容">
                {{talk.content }}
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item>
                <images-preview
                  :refName="talk.field"
                  :operate="false"
                  ref="imagesPreview"
                  :imgIdListUnUnique="talk.fileList"
                  @imgIdListChange="clariList"></images-preview>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24" v-if="false">
            <el-col :span="24">
              <el-form-item label="澄清回复">
                <el-input type="textarea" v-model="talk.reply" placeholder="回复内容" :rows="4"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer">
        <el-button type="primary" v-if="flag == 3" @click="save">保存</el-button>
        <el-button @click="closeQuestion">关闭</el-button>
      </span>
    </el-dialog>
    <choose-files ref="treeView" v-if="dialogVisible"  @handleSelectedFolder="selectedData"></choose-files>
  </div>
</template>

<script>
  import { queryRegion, initRegion, cascRegion, findRegion } from "src/axios/auditchanges/common/region"
  import { doubt, clarify, clarifySave } from "src/axios/auditchanges/messageClarify/enterprise"
  import { updateTalk } from "src/axios/auditchanges/auditManage/enterprise"
  import { dateFormat } from 'src/axios/auditchanges/common/nestedJson'
  import { metaShow, businessFlag, companyType, moneyType, metaForm, metaDict } from 'src/axios/auditchanges/common/enterprise'
  import { getProjectSubjoinMessage } from "src/axios/auditchanges/systemManage/subjoinMessageManage"
  import entInput from "./control/entInput"
  import entTextarea from "./control/entTextarea"
  import entDate from "./control/entDate"
  import question from "./question"
  import attached from "./attached"
  import gmp from "./gmp"
  import createGmp from "src/pages/auditchanges/messageDeclare/enterpriseDeclare/gmp"
  import moment from "moment"
  import chooseFiles from 'src/pages/auditchanges/common/chooseFiles';
  import imagesPreview from 'src/pages/auditchanges/common/imagesPreview'
  import uploadButton from 'src/pages/auditchanges/common/uploadButton'

  export default {
    name: "info",
    components: {
      entInput, entTextarea, entDate, question, attached, gmp, createGmp, chooseFiles, imagesPreview, uploadButton
    },
    data() {
      return {
        dialogVisible: false,
        type: 1, // 类型：1-申报、2-变更
        flag: 1, // 标识：1-申请、2-公示、3-澄清、4-审核、5-确认、6-挂网
        limit: false, // 是否开启修改
        showQuestion: false, // 质疑列表显示状态
        tips: '不正确',
        upload: false, // 是否显示上传
        btn: undefined, // 按钮显示文字
        clarify: false, // 是否澄清
        businessFlag: businessFlag(),
        companyType: companyType(),
        moneyType: moneyType(),
        region: [],
        area: undefined,
        old: metaForm(), // 申报信息or变更前信息
        now: metaForm(), // 变更后信息
        audit: metaForm(), // 审核信息
        form: metaForm(), // 要提交的信息
        cli: metaForm(), // 澄清按钮每项开关
        show: metaForm(), // 修改每项开关
        talk: {
          fileList: [],
        }, // 澄清or澄清回复框内容
        dictionary: metaDict(), // 质疑和澄清回复
        doubt: undefined, // 质疑信息
        clari: undefined, // 澄清信息

        fileList: {}, // 要保存的质疑文件列表
        checkbox: {}, // 变更复选框特殊处理
      }
    },
    created() {
      initRegion(this.region);
    },
    methods: {
      async init(op) {
        if(!op){
          return;
        }
        this.limit = op.limit;
        this.tips = op.tips || "不正确";
        this.upload = op.upload;
        this.btn = op.btn;
        this.type = op.type;
        this.flag = op.flag;
        this.clarify = op.clarify;

        this.fileList = op.fileList || {};

        this.area = undefined;

        // 坑逼now回显
        if(op.now) {
          for(let key in op.now) {
            if(op.now[key].fileList && !(op.now[key].fileList instanceof Array)) {
              op.now[key].fileList = JSON.parse(op.now[key].fileList);
            } else {
              delete op.now[key].fileList;
            }
          }
          op.now.gmp.forEach(x => {
            if(x.fileList && !(x.fileList instanceof Array)) {
              x.fileList = JSON.parse(x.fileList);
            }
          })
        }

        // 坑逼form回显，old没问题，form死活不回显，只能这么写
        if(op.form) {
          for(let key in op.form) {
            if(op.form[key].fileList && !(op.form[key].fileList instanceof Array)) {
              op.form[key].fileList = JSON.parse(op.form[key].fileList);
            }
          }
          op.form.gmp.forEach(x => {
            if(x.fileList && !(x.fileList instanceof Array)) {
              x.fileList = JSON.parse(x.fileList);
            }
          })
        }

        // form用于数据修改和回传
        this.form = op.form || metaForm();
        // old用于数据展示/变更前展示
        this.old = op.old || metaForm();
        // now用于变更后数据，可空，如果为空old前不显示变更前
        this.now = op.now || metaForm();
        // audit用于审核后结果，可空
        this.audit = op.audit || metaForm();
        // cli用于澄清按钮展示条件
        this.cli = op.cli || metaForm();

        // 格式化所有日期字段
        dateFormat(this.old, ["DATE", "EXPIRE_S", "EXPIRE_E"], "YYYY-MM-DD");
        dateFormat(this.now, ["DATE", "EXPIRE_S", "EXPIRE_E"], "YYYY-MM-DD");
        dateFormat(this.audit, ["DATE", "EXPIRE_S", "EXPIRE_E"], "YYYY-MM-DD");

        this.dictionary = op.dictionary || metaDict();
        this.doubt = op.doubt || undefined;
        this.clari = op.clari || undefined;

        this.$set(this.old.enterprise, "FACTORY_FLAG", this.old.enterprise.FACTORY_FLAG == "1");
        this.$set(this.old.enterprise, "SALER_FLAG", this.old.enterprise.SALER_FLAG == "1");
        this.$set(this.old.enterprise, "SEND_FLAG", this.old.enterprise.SEND_FLAG == "1");

        // 初始化附加信息
        let subjoin = await getProjectSubjoinMessage({
          attachedType: '1',
          projectId: this.old.org.PROJECT_ID,
        });

        let orgAtt = this.old.annex;
        this.old.annex = [];

        subjoin.data.forEach(x => {
          let annex = {
            dicName: x.dicName,
            options: [],
          };
          x.catAttachedDictionaryDomains.forEach(y => {
            if(y.fieldType == "5") {
              this.$set(this.checkbox, y.id, []);
            }
            annex.options.push({
              id: y.id,
              type: y.fieldType,
              label: y.remark,
              tipUrl: y.tipUrl,
              tipText: y.tipText,
              fileTypeName: y.fileTypeName,
              value: orgAtt[y.id],
              imageFlag: y.hasImageFlag,
              options: y.catAttachedDictionaryOptions,
            });
          });
          this.old.annex.push(annex);
        });

        // 初始化质疑回复状态
        if(op.doubt) {
          for(let first in this.doubt) {
            for(let second in this.doubt[first]) {
              this.$set(this.dictionary.doubt, second, this.doubt[first][second].REPLY_CONTENT);
            }
          }
        }

        // 初始化澄清回复状态
        if(op.clari) {
          for(let key in this.clari) {
            this.$set(this.dictionary.clarify, key, this.clari[key].REPLY_CONTENT);
          }
        }

        let show = metaShow();

        // 初始化附加信息质疑
        show.annex = [];
        for(let x in this.old.annex) {
          show.annex[x] = { options: [] }
          if(!this.form.annex[x]) {
            this.$set(this.form.annex, x, { options: [] });
          }
          for(let y in this.old.annex[x].options) {
            show.annex[x].options[y] = { value$: null };
            // 如果没值，在这里初始化
            if(!this.form.annex[x].options[y]) {
              this.$set(this.form.annex[x].options, y, {});
            }
            if(this.old.annex[x].options[y].type == '5') {
              if(this.form.annex[x].options[y].value) {
                this.$set(this.checkbox,
                  this.old.annex[x].options[y].id,
                  JSON.parse(this.form.annex[x].options[y].value));
              }
            }
          }
        }

        // 这段为了让审核界面不显示上传图片按钮
        for(let key in this.form) {
          if(this.form[key].fileList && this.form[key].fileList.length == 0) {
            delete this.form[key].fileList;
          }
        }

        // 默认质疑开关的选中状态
        for(let x in this.form) {
          // 如果是申报人和GMP
          if(this.form[x] instanceof Array) {
            show[x] = [];
            // y为数组索引，数字
            for(let y in this.old[x]) {
              // 初始化数组
              show[x][y] = metaShow(x);
              // z为申报人或gmp的key值
              if(!this.form[x][y]) {
                continue
              }
              for(let z in this.form[x][y]) {
                // 如果是附加信息
                if(this.form[x][y][z] instanceof Array) {
                  let annex = this.form[x][y][z];
                  show[x][y][z] = [];
                  for(let n in annex) {
                    show[x][y][z][n] = {
                      value$: !!annex[n].value
                    }
                  }
                  continue;
                }
                // 如果不为空，显示出来
                if(this.form[x][y][z] || this.form[x][y][z] == 0) {
                  show[x][y][z + "$"] = true;
                }
              }
            }
            continue;
          }

          // 如果是其他对象
          if(this.form[x] instanceof Object) {
            // 直接遍历，y为key值
            for(let y in this.form[x]) {
              // 如果有值，显示出来
              if(this.form[x][y] || this.form[x][y] == 0) {
                show[x][y + "$"] = true;
              }
            }
          }
        }

        // show用于质疑/变更/不正确/审核开关展示
        this.show = show;

        // 特殊字段处理
        if(op.form) {
          // 所选区域回显
          if(this.form.enterprise.COUNTRY_ID) {
            this.$set(this.show, "region$", true);

            this.area = [];
            let ent = this.form.enterprise;
            if(ent.COUNTRY_ID) {
              this.area.push(ent.COUNTRY_ID);
              await cascRegion(this.region, this.area);
            }
            if(ent.PROVINCE_ID) {
              this.area.push(ent.PROVINCE_ID);
              await cascRegion(this.region, this.area);
            }
            if(ent.CITY_ID) {
              this.area.push(ent.CITY_ID);
              await cascRegion(this.region, this.area);
            }
            if(ent.COUNTY_ID) {
              this.area.push(ent.COUNTY_ID);
            }
          }
          // 营业期限回显
          if(this.form.enterprise.REG_EXPIRE_S) {
            this.$set(this.show, "REG_EXPIRE$", true);
          }
        }

        let oldEnt = this.old.enterprise;
        findRegion([oldEnt.COUNTRY_ID, oldEnt.PROVINCE_ID, oldEnt.CITY_ID, oldEnt.COUNTY_ID]).then(res => {
          oldEnt.COUNTRY_ID = res.data[oldEnt.COUNTRY_ID];
          oldEnt.PROVINCE_ID = res.data[oldEnt.PROVINCE_ID];
          oldEnt.CITY_ID = res.data[oldEnt.CITY_ID];
          oldEnt.COUNTY_ID = res.data[oldEnt.COUNTY_ID];
        });

        let nowEnt = this.now.enterprise;
        let auditEnt = this.audit.enterprise;
        if(this.now && nowEnt.COUNTRY_ID) {
          findRegion([nowEnt.COUNTRY_ID, nowEnt.PROVINCE_ID, nowEnt.CITY_ID, nowEnt.COUNTY_ID]).then(res => {
            nowEnt.COUNTRY_ID = res.data[nowEnt.COUNTRY_ID];
            nowEnt.PROVINCE_ID = res.data[nowEnt.PROVINCE_ID];
            nowEnt.CITY_ID = res.data[nowEnt.CITY_ID];
            nowEnt.COUNTY_ID = res.data[nowEnt.COUNTY_ID];
          });
        }
        if(this.now && auditEnt.COUNTRY_ID) {
          findRegion([auditEnt.COUNTRY_ID, auditEnt.PROVINCE_ID, auditEnt.CITY_ID, auditEnt.COUNTY_ID]).then(res => {
            auditEnt.COUNTRY_ID = res.data[auditEnt.COUNTRY_ID];
            auditEnt.PROVINCE_ID = res.data[auditEnt.PROVINCE_ID];
            auditEnt.CITY_ID = res.data[auditEnt.CITY_ID];
            auditEnt.COUNTY_ID = res.data[auditEnt.COUNTY_ID];
          });
        }

        this.$nextTick(() => {
          for(let key in this.old) {
            if(this.old[key].fileList) {
              this.old[key].fileList.splice(0, 0);
            }
            if(this.now[key] && this.now[key].fileList) {
              this.now[key].fileList.splice(0, 0);
            }
            if(this.form[key] && this.form[key].fileList) {
              this.form[key].fileList.splice(0, 0);
            }
          }
          for(let key in this.old.fileList) {
            this.old.fileList[key].splice(0, 0);
          }
          for(let key in this.now.fileList) {
            if(this.now.fileList[key] instanceof Array) {
              this.now.fileList[key].splice(0, 0);
            }
          }
          for(let x in this.fileList) {
            this.fileList[x].splice(0, 0);
          }
        });
      },
      off(op, chg) {
        // 如果是申报
        if(this.type == 1) {
          // 不可质疑，可变更不需要审核
          if(op == 0) {
            return false;
          }
          // 2-公示
          if(this.flag == 2) {
            return this.limit;
          }
          // 4-审核
          if(this.flag == 4) {
            return this.limit;
          }
          return false;
        }
        // 如果是变更，op：1-可变更需要审核，2-可变更不需要审核，3-不可变更，chg：true-已变更
        if(this.type == 2) {
          // 1-申请
          if(this.flag == 1) {
            // 不可质疑，可变更不需要审核
            if(op == 0) {
              return this.limit;
            }
            // 可变更需要审核
            if(op == 1) {
              return this.limit;
            }
            // 可变更不需要审核
            if(op == 2) {
              return this.limit;
            }
            return false;
          }
          // 2-公示
          if(this.flag == 2) {
            // 可变更需要审核，并且已变更
            if(op == 1 && chg) {
              return this.limit;
            }
            // 可变更不需要审核，并且已变更
            if(op == 2 && chg) {
              return this.limit;
            }
            return false;
          }
          // 4-审核
          if(this.flag == 4) {
            // 可变更需要审核，并且已变更
            if(op == 1 && chg) {
              return this.limit;
            }
            return false;
          }
          return false;
        }
      },
      // 打开澄清界面
      async question(key, type, options) {
        this.talk.field = key;
        this.talk.content = this.clari[key] ? this.clari[key].TALK_CONTENT : "";
        this.talk.fileList = this.clari[key] ? this.clari[key].fileList : [];
        if(!this.clari[key] && this.flag != '4') {
          this.$set(this.clari, key, {});
        }
        this.$nextTick(() => {
          // 不加这句澄清图片初始化不显示
          if(this.talk.fileList) {
            this.talk.fileList.splice(0, 0);
          }
        });

        if(this.doubt) {
          this.showQuestion = true;
          this.talk.reply = this.dictionary.clarify[this.talk.field];
          this.$nextTick(() => {
            this.$refs.question.init(this.doubt, this.dictionary, key, {
              type, options
            });
          });
        }
      },
      // 关闭澄清界面
      closeQuestion() {
        if(this.flag != '4') {
          this.clari[this.talk.field].fileList = this.talk.fileList;
        }
        this.showQuestion = false;
      },
      metaForm() {
        return metaForm();
      },
      metaDict() {
        return metaDict();
      },
      editAttached(index) {
        this.form.attached[index] = this.form.attached[index] || {};
        this.$refs.attached.init({
          index,
          old: this.old,
          now: this.now,
          audit: this.audit,
          form: this.form,
          cli: this.cli,
          show: this.show,
          doubt: this.doubt,
          clari: this.clari,
          dictionary: this.dictionary,
          fileList: this.fileList,
        });
      },
      addGmp(index) {
        this.$nextTick(() => {
          this.$refs.createGmp.init(this.old.gmp, index);
        });
      },
      editGmp(index) {
        this.form.gmp[index] = this.form.gmp[index] || {};
        console.log(this.fileList);
        this.$refs.gmp.init({
          index,
          old: this.old,
          now: this.now,
          audit: this.audit,
          form: this.form,
          cli: this.cli,
          show: this.show,
          doubt: this.doubt,
          clari: this.clari,
          dictionary: this.dictionary,
          fileList: this.fileList,
        });
      },
      delGmp(index) {
        this.$confirm('确定删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.old.gmp.splice(index, 1);
        });
      },
      async save() {
        if(this.flag == "3") {
          // 澄清操作
          if(!this.talk.fileList || this.talk.fileList.length == 0) {
            this.$message({
              message: '请上传澄清文件',
              type: 'warning'
            });
            return;
          }
          let res = await clarifySave(this.talk.field, this.talk.content, this.old.org.ID, this.talk.fileList);
          console.log(res);
          this.$set(this.clari[this.talk.field], 'TALK_CONTENT', this.talk.content);
          this.$set(this.clari[this.talk.field], 'fileList', this.talk.fileList);
          if (res.success) {
            this.showQuestion = false;
            this.$message({
              message: '保存成功',
              type: 'success'
            });
          } else {
            this.$message({
              message: res.message,
              type: 'warning'
            });
          }
        } else if(this.flag == "4") {
          // 澄清回复
          let res = await updateTalk(this.old.org.ID, this.talk.field, this.talk.reply);
          this.$set(this.dictionary.clarify, this.talk.field, this.talk.reply);
          this.showQuestion = false;
        }
      },
      dateformat(row, column) {
        let date = row[column.property];
        if (!date) {
          return "";
        }
        return moment(date).format("YYYY-MM-DD");
      },
      button(key) {
        if(this.flag == 3) {
          if (this.clari[key] && this.clari[key].TALK_CONTENT) {
            return "已澄清";
          }
          return "未澄清";
        } else if(this.flag == 4) {
          for (let id in this.doubt[key]) {
            if (!this.dictionary.doubt[id]) {
              return this.btn;
            }
          }
//          if (!this.clari[key]) {
//            return "已回复";
//          }
//          if (!this.dictionary.clarify[key]) {
//            return this.btn;
//          }
          return "已回复";
        }
        return this.btn;
      },
      handleRegionChange(val) {
        cascRegion(this.region, val);
      },
      getValueByKey(collection, key) {
        for(let i in collection) {
          if(collection[i].key == key) {
            return collection[i].value;
          }
        }
      },
      getOptions(collection, key) {
        for(let i in collection) {
          if(collection[i].value == key) {
            return collection[i].text;
          }
        }
      },
      attChange(x, y, z) {
        this.form.annex[y].options[z].value = JSON.stringify(this.checkbox[x]);
      },
      attInit(dict, key) {
        if(!key) {
          return;
        }
        key = JSON.parse(key);
        let result = "";
        key.forEach(x => {
          for(let i in dict) {
            if(dict[i].value == x) {
              result += dict[i].text + " ";
            }
          }
        });
        return result;
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
        if(!this.form[res.refName].fileList) {
          this.$set(this.form[res.refName], "fileList", []);
        }
        this.$nextTick(()=>{
          res.data.forEach(function (item) {
            this.form[res.refName].fileList.push(item);
          }.bind(this));
        })
      },
      upLoadImgIdList(res){
        //需要上传的id集合
        console.log('========从预览里面来的');
        console.log(res);

        this.$set(this.form[res.refName], "fileList", res.data);
      },
      getClariList(res){
        console.log(res);
        res.data.forEach(function (item) {
          this.talk.fileList.push(item);
        }.bind(this))
      },
      //本地上传示例
      getUploadList(res){
        console.log(res);
        res.data.forEach(function (item) {
          if(!this.fileList[res.refName]) {
            this.$set(this.fileList, res.refName, []);
          }
          this.fileList[res.refName].push(item)
        }.bind(this))
      },
      uploadList(res) {
        console.log(res);
        this.$set(this.fileList, res.refName, res.data);
      },
      clariList(res) {
        console.log(res);
        this.$set(this.talk.fileList, res.refName, res.data);
      },
    }
  }
</script>

