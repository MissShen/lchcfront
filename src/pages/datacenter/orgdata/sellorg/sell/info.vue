<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
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
            <el-form :model="from" ref="from" :rules="rules"  label-width="160px" class="demo-ruleForm" size="small" label-position="left">

              <h3 class="qyjc">企业基础信息</h3>

              <el-row :gutter="24">
                <el-col :span="24">
                  <el-form-item label="企业名称：" prop="name">
                    <span>{{from.NAME}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="24">
                <el-col :span="10">
                  <el-form-item label="统一社会信用代码：" prop="name">
                    <span>{{from.CREDIT_CODE}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="组织机构代码：">
                    <span>{{from.ORGANIZE_CODE}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="24">
                <el-col :span="10">
                  <el-form-item label="企业类型：" prop="name">
                    <span>{{ isWholesale(from.SALER_FLAG) }} {{ isDistribution(from.SEND_FLAG) }} {{ isProduce(from.FACTORY_FLAG) }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="企业编码：">
                    <span>{{from.CODE}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="24">
                <el-col :span="10">
                  <el-form-item label="企业简称：" prop="name">
                    <span>{{from.ABBR}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="拼音简码：">
                    <span>{{from.SPELL_ABBR}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="24">
                <el-col :span="10">
                  <el-form-item label="企业曾用名：" prop="name">
                    <span>{{from.USED_NAME}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="经济性质：">
                    <span>{{getBusiness(from.BUSINESS_FLAG)}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="24">
                <el-col :span="10">
                  <el-form-item label="所在国家：" prop="name">
                    <span>{{from.COUNTRY}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="所在省/自治区/直辖市：">
                    <span>{{from.PROVINCE}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="24">
                <el-col :span="10">
                  <el-form-item label="所在市/地/州：" prop="name">
                    <span>{{from.CITY}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="所在区/县市/县：">
                    <span>{{from.COUNTY}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="24">
                <el-col :span="10">
                  <el-form-item label="是否法人企业：" prop="name">
                    <el-radio-group v-model="from.IS_JURIDICAL_COMPANY" disabled>
                      <el-radio label="1" >是</el-radio>
                      <el-radio label="0" >否</el-radio>
                    </el-radio-group>
                    <!--<span>{{from.IS_JURIDICAL_COMPANY}}</span>-->
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="分部负责人：">
                    <span>{{from.BRANCH_PRINCIPAL}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="24">
                <el-col :span="10">
                  <el-form-item label="分部名称：" prop="name">
                    <span>{{from.BRANCH_NAME}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="分部地址：">
                    <span>{{from.BRANCH_ADDRESS}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="24">
                <el-col :span="24">
                  <el-form-item label="关联企业列表：" prop="name">
                    <a @click="relatedOrg(from.ID)">已关联</a>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="24">
                <el-col :span="24">
                  <el-form-item label="备注：" prop="name">
                    <span>{{from.REMARK}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <h3 class="zx">资信信息</h3>

              <el-row :gutter="24">
                <el-col :span="10">
                  <el-form-item label="开户名称：" prop="name">
                    <span>{{from.ACCOUNT_NAME}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="开户银行：" labelWidth="180px">
                    <span>{{from.ACCOUNT_BANK}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="24">
                <el-col :span="10">
                  <el-form-item label="开户账号：" prop="name" labelWidth="180px">
                    <span>{{from.ACCOUNT_NUMBER}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="纳税人登记号：">
                    <span>{{from.TAXPAYER_CODE}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="24">
                <el-col :span="10">
                  <el-form-item label="邮政编码：" prop="name">
                    <span>{{from.POST_CODE}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="企业电话：">
                    <span>{{from.TEL}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="10">
                  <el-form-item label="企业网址：" prop="name">
                    <span>{{from.WEBSITE}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="企业传真：">
                    <span>{{from.FAX}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="24">
                <el-col :span="10">
                  <el-form-item label="企业QQ：" prop="name">
                    <span>{{from.QQ}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <h3 class="yyzz">营业执照信息</h3>

              <el-row :gutter="24">
                <el-col :span="10">
                  <el-form-item label="注册号：" prop="name">
                    <span>{{from.REG_NO}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="名称：">
                    <span>{{from.REG_NAME}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="24">
                <el-col :span="10">
                  <el-form-item label="类型：" prop="name">
                    <span>{{from.REG_TYPE}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="法定代表人：">
                    <span>{{from.JURIDICAL_PERSON}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="24">
                <el-col :span="10">
                  <el-form-item label="住所：" prop="name">
                    <span>{{from.ADDRESS}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="24">
                <el-col :span="10">
                  <el-form-item label="注册资本：" prop="name">
                    <span>{{from.REG_CAPITAL}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="注册资金：">
                    <span>{{from.REG_AMOUNT}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="24">
                <el-col :span="10">
                  <el-form-item label="成立日期：" prop="name">
                    <span>{{from.FOUND_DATE | dateCon}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="营业期限：">
                    <span>{{from.REG_EXPIRE_S | dateCon}} 至 {{isEndTime(from.REG_EXPIRE_Y,from.BUSINESS_LICENSE_DATE)}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="24">
                <el-col :span="24">
                  <el-form-item label="经营范围：" prop="name">
                    <span>{{from.REG_SCOPE}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="24">
                <el-col :span="10">
                  <el-form-item label="登记机关：" prop="name">
                    <span>{{from.REG_DEPARTMENT}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="发证日期：">
                    <span>{{from.REG_DATE | dateCon}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="24">
                <el-col :span="24">
                  <images-preview :dilogFlag="true" v-if="from.orgInfoFiles.length > 0" :imgIdListUnUnique="from.orgInfoFiles"></images-preview>
                </el-col>
              </el-row>

              <h3 class="scxx"  v-show="from.FACTORY_FLAG = 1">生产许可信息</h3>
              <div v-if="from.FACTORY_FLAG = 1">
                <el-row :gutter="24">
                  <el-col :span="10">
                    <el-form-item label="编号：" prop="name">
                      <span>{{from.PERMIT_CODE}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="企业名称：">
                      <span>{{from.COMPANY_NAME}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="24">
                  <el-col :span="10">
                    <el-form-item label="注册地址：" prop="name">
                      <span>{{from.CM_ADDRESS}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="企业类型：">
                      <span>{{from.COMPANY_TYPE}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="24">
                  <el-col :span="10">
                    <el-form-item label="法定代表人：" prop="name">
                      <span>{{from.JURIDICAL_PERSON}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="企业负责人：">
                      <span>{{from.CHARGE_PERSON}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="24">
                  <el-col :span="10">
                    <el-form-item label="生产地址和生产范围：" prop="name">
                      <span>{{from.PRODUCE_CATEGORY}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="质量负责人：">
                      <span>{{from.QUALITY_OWNER}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="24">
                  <el-col :span="10">
                    <el-form-item label="分类码：" prop="name">
                      <span>{{from.KIND_CODE}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="有效期至：">
                      <span>{{from.EXPIRY_DATE | dateCon}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="24">
                  <el-col :span="10">
                    <el-form-item label="发证机关：" prop="name">
                      <span>{{from.PD_INSTITUTION}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="发证日期：">
                      <span>{{from.PD_DATE | dateCon}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="24">
                  <el-col :span="10">
                    <el-form-item label="日常监管机构：" prop="name">
                      <span>{{from.REGULATORY_AGENCY}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="日常监管人员：">
                      <span>{{from.REGULATORY_PERSON}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="24">
                  <el-col :span="24">
                    <el-form-item label="监督举报电话：" prop="name">
                      <span>{{from.SUPERVISORY_REPORT_TEL}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="24">
                  <el-col :span="10">
                    <el-form-item label="分装企业：" prop="name">
                      <span>{{from.MOLECULE_ORG_NAME}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="分装企业编码：">
                      <span>{{from.MOLECULE_ORG_CODE}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="24">
                  <el-col :span="10">
                    <el-form-item label="产品类型代码：" prop="name">
                      <span>{{from.SORT_CODE}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="药品类型属性代码：">
                      <span>{{from.DRUG_TYPE_ATTRIBUTE_CODE}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="24">
                  <el-col :span="24">
                    <images-preview :dilogFlag="true" v-if="from.produceOrgFiles.length>0" :imgIdListUnUnique="from.produceOrgFiles"></images-preview>
                  </el-col>
                </el-row>
              </div>

              <h3 class="jyxx" v-show="from.SALER_FLAG == 1 || from.SEND_FLAG == 1">经营许可信息</h3>
              <div v-if="from.SALER_FLAG == 1 || from.SEND_FLAG == 1">
                <el-row :gutter="24">
                  <el-col :span="24">
                    <el-form-item label="证号：" prop="name">
                      <span>{{from.CD_PERMIT_CODE}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="24">
                  <el-col :span="10">
                    <el-form-item label="企业名称：" prop="name">
                      <span>{{from.DEAL_NAME}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="注册地址：">
                      <span>{{from.CD_ADDRESS}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="24">
                  <el-col :span="10">
                    <el-form-item label="法定代表人：" prop="name">
                      <span>{{from.CD_JURIDICAL_PERSON}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="企业负责人：">
                      <span>{{from.ENTERPRISE_PRINCIPAL}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="24">
                  <el-col :span="10">
                    <el-form-item label="质量负责人：" prop="name">
                      <span>{{from.QUALITY_PRINCIPAL}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="仓库地址：">
                      <span>{{from.DEPOSITORY_ADDRESS}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="24">
                  <el-col :span="10">
                    <el-form-item label="发证机关：" prop="name">
                      <span>{{from.CERTIFICATE_DEPARTMENT}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="有效期至：">
                      <span>{{from.CD_EXPIRY_DATE | dateCon}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="24">
                  <el-col :span="10">
                    <el-form-item label="经营范围：" prop="name">
                      <span>{{from.BUSINESS_CATEGORY}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="经营方式：">
                      <span>{{from.BUSINESS_TYPE}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="24">
                  <el-col :span="24">
                    <images-preview :dilogFlag="true" v-if="from.businessOrgFiles.length > 0" :imgIdListUnUnique="from.businessOrgFiles"></images-preview>
                  </el-col>
                </el-row>

                <el-row :gutter="24">
                  <el-col :span="24">
                    <el-form-item label="质量公告：" prop="name">
                      <a @click="fakeDrugsView()">假冒药记录</a>
                      <a @click="badDrugsView()">伪劣药记录</a>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

              <h3 class="gmp" v-show="from.FACTORY_FLAG = 1">GMP信息</h3>
              <div v-if="from.FACTORY_FLAG = 1">
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
                        <images-preview :dilogFlag="false" v-if="scope.row.gmpFiles.length > 0" :imgIdListUnUnique="scope.row.gmpFiles"></images-preview>
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
                <el-row :gutter="24">
                  <el-col :span="10">
                    <el-form-item label="证书编号：" prop="name">
                      <span>{{from.CERTIFACATE_NUMBER}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="企业名称：">
                      <span>{{from.CAG_COMPANY_NAME}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="24">
                  <el-col :span="10">
                    <el-form-item label="认证范围：" prop="name">
                      <span>{{from.ATTESTATION_CATEGORY}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="地址：">
                      <span>{{from.ENTERPRISE_ADDRESS}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="24">
                  <el-col :span="10">
                    <el-form-item label="发征机关：" prop="name">
                      <span>{{from.OFFICE_LICENCE}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="发证日期：">
                      <span>{{from.LICENCE_DATE | dateCon}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="24">
                  <el-col :span="24">
                    <el-form-item label="有效期至：" prop="name">
                      <span>{{from.CAG_EXPIRY_DATE | dateCon}}</span>
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
              <el-row :gutter="24">
                <el-col :span="10">
                  <el-form-item label="审核状态：" prop="name">
                    <span>{{from.CHECK_FLAG}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="使用状态：">
                    <span>{{from.USED_FLAG}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="24">
                <el-col :span="10">
                  <el-form-item label="审核人：" prop="name">
                    <span>{{from.CHECKUSER_NAME}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="审核时间：">
                    <span>{{from.CHECK_DATE | dateCon}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="24">
                <el-col :span="10">
                  <el-form-item label="审核意见：" prop="name">
                    <span>{{from.CHECK_DESC}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

            </el-form>
            <div class="foot-btn">
              <div class="foot-left">
                <el-button size="small" @click="goBack()">返回</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    <form-view v-if="formViewVisible" :parent-id="id" ref="formView"></form-view>
    <fake-Drugs v-if="fakeDrugsVisible" :parent-id="id" ref="fakeDrugs"></fake-Drugs>
    <bad-Drugs v-if="badDrugsVisible" :parent-id="id" ref="badDrugs"></bad-Drugs>
  </div>
</template>

<script>
  import ElButton from "../../../../../../node_modules/element-ui/packages/button/src/button";
  import formView from '../windowPanel/orgForm'
  import fakeDrugs from '../windowPanel/fakeDrugs'
  import badDrugs from '../windowPanel/badDrugs'
  import moment from 'moment'
  import imagesPreview from 'src/pages/datacenter/windowPanel/imagesPreview';
  import "../../../../../assets/css/datacenter.css";

  import {info,queryGmpList} from 'src/axios/datacenter/orgdata/sell/seller'

  export default {
    components: {ElButton,formView,fakeDrugs,badDrugs,imagesPreview},
    data() {
      return {
        formViewVisible: false,
        fakeDrugsVisible: false,
        badDrugsVisible: false,
        from: {
          // name: '',
          // consignee:'',
          // phone:'',
          // address:'',
          // district:'',
          // county:'',
          // region:''
        },
        id: '',
        rules:{},
        resData: this.metaData(),
        nodesPosition: this.nodesPositionInit()
      };
    },
    //界面加载完成后执行
    created(){
      this.id = this.$route.params.id || undefined;
      if(this.id) {
        this.metaFrom(this.id);
        this.list();
        // this.queryGmpList(this.id)
      }
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
      metaData () {
        return {
          pageNum: 1,
          pageSize: 10,
          id: ''
        }
      },
      metaFrom(id){
        info(id).then(res => {
          this.from = res.data;
          console.log(this.from, 'shuju')
          queryGmpList(id,this.resData).then(res => {
            this.resData = res.data
            console.log(res,'GMP信息')
          })

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

          this.$nextTick(()=>{
            /**
             * 查询设置锚点位置
             * */
            this.getNodesHeight('product-addup-box');
            //恢复初始状态
            this.removeClassCurrent('jump-product-addup')[0].classList.add('current');
          })

        })

      },

      list(){
        queryGmpList(this.id,this.resData).then(res => {
          this.resData = res.data
          console.log(res,'GMP信息')
        })
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
      isWholesale(status){
        return status == 1?'代理 ':''
      },
      isDistribution(status) {
        return status == 1?'配送 ':''
      },
      isProduce(status) {
        return status == 1?'生产 ':''
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
      // 结束日期
      isEndTime(endFlag, endTime) {
        if(0 == endFlag) {
          // return endTime;
          return moment(endTime).format('YYYY-MM-DD')
        }
        if(1 == endFlag) {
          return '永久';
        }
        return '';
      },
      // 已关联企业
      relatedOrg(id) {
        this.formViewVisible = true;
        this.$nextTick(() => {
          this.$refs.formView.fillData(id);
        })
      },
      fakeDrugsView(id) {
        this.fakeDrugsVisible = true;
        this.$nextTick(() => {
          this.$refs.fakeDrugs.fillData(id);
        })
      },
      badDrugsView(id) {
        this.badDrugsVisible = true;
        this.$nextTick(() => {
          this.$refs.badDrugs.fillData(id);
        })
      },
      goBack() {
        this.$router.go(-1);
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
<style>
  @import "../../../../../assets/css/auditchanges.css";
</style>
