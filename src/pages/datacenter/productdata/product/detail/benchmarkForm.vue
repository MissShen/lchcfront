<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="main">
      <ul class="side side-init" id="side-menu">
        <li><a @click="changeScrollHeight(nodesPosition.cpjc,'jump_item',0)" class="d_jump jump_item current">产品基础信息</a></li>
        <li><a @click="changeScrollHeight(nodesPosition.sms,'jump_item',1)" class="d_jump jump_item">说明书信息</a></li>
        <li><a @click="changeScrollHeight(nodesPosition.shxx,'jump_item',2)" class="d_jump jump_item">审核信息</a></li>
      </ul>
      <div class="scroll-content">
        <div class="gap-40">

          <el-form :model="ruleForm"   id="right-main-box" :rules="rules" ref="ruleForm" label-width="180px" size="small"
                   label-position="left" class="demo-form-inline" :inline="true">
            <h3 class="cpjc">产品基础信息</h3>
            <el-row>
              <el-col :span="12">
                <el-form-item label="产品名称：" prop="catProduct.tradeName">
                  <el-input v-model="ruleForm.catDrug.nameChn" disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商品名：" prop="catProduct.tradeName">
                  <el-input v-model="ruleForm.catProduct.tradeName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="药品名称：" prop="catDrug.nameChn">
                  <div class="formrow">
                    <span class="width-200"><el-input v-model="ruleForm.catDrug.nameChn"></el-input></span>
                    <span><a @click="drugsNameView(ruleForm.catDrug.nameChn)">选择</a></span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="药品编码：" prop="catDrug.code">
                  <el-input v-model="ruleForm.catDrug.code"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="生产企业：" prop="catOrg.name">
                  <div class="formrow">
                    <span class="width-200">
                      <el-input v-model="ruleForm.catOrg.name"></el-input>
                    </span>
                    <span>
                      <a @click="produOrgView(ruleForm.catOrg.name)">选择</a>
                    </span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="生产企业编码：" prop="catOrg.name">
                  <el-input v-model="ruleForm.catOrg.code"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="产品编码：" prop="catProduct.productCode">
                  <div class="formrow">
                    <span class="width-300"><el-input v-model="ruleForm.catProduct.productCode"></el-input></span>
                    <span><a @click="generateProductCode()">生成</a></span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="剂型：" prop="catDoseageForm.nameChn">
                  <el-input v-model="ruleForm.catDoseageForm.nameChn" disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="规格：" prop="catDrug.spec">
                  <el-input v-model="ruleForm.catDrug.spec" disabled="true"></el-input>
                </el-form-item>
              </el-col>

            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="转换比：" prop="catDrug.standRate">
                  <el-input v-model="ruleForm.catDrug.standRate" disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="包材：" prop="catWrap.nameChn">
                  <div class="formrow">
                    <span class="width-200"><el-input v-model="ruleForm.catWrap.nameChn" disabled="true"></el-input></span>
                    <!--<span><a @click="packMaterialView(ruleForm.catWrap.nameChn)">选择</a></span>-->
                  </div>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="单位：" prop="catMetric.nameChn">
                  <div class="formrow">
                    <span class="width-200"><el-input v-model="ruleForm.catMetric.nameChn"></el-input></span>
                    <span><a @click="unitView(ruleForm.originalMetric)">选择</a></span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="产品来源：" prop="catProduct.productSource">
                  <el-radio-group v-model="ruleForm.catProduct.productSource">
                    <el-radio label="0">国产</el-radio>
                    <el-radio label="1">进口</el-radio>
                    <el-radio label="2">进口分装</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="最小使用单位：" prop="catProduct.useUnit">
                  <el-input v-model="ruleForm.catProduct.useUnit"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="ruleForm.catProduct.productSource != '1'">
                <el-form-item label="批准文号：" prop="catProduct.permitNumber">
                  <el-input v-model="ruleForm.catProduct.permitNumber"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row  v-show="permitNumberImgFlag && ruleForm.catProduct.productSource != '1'">
              <el-col :span="12">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <images-preview :dilogFlag="false" v-if="permitNumberImgFlag" :imgIdListUnUnique="permitNumberImg"></images-preview>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="中包装数量：" prop="catProductAttached.swrap">
                  <el-input v-model="ruleForm.catProductAttached.swrap"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="大包装数量：" prop="catProductAttached.bWrap">
                  <el-input v-model="ruleForm.catProductAttached.bwrap"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-show="wrapImgFlag">
              <el-col :span="12" >
                <images-preview :dilogFlag="false" v-if="wrapImgFlag" :imgIdListUnUnique="swrapImg"></images-preview>
              </el-col>
              <el-col :span="12" >
                <images-preview :dilogFlag="false" v-if="wrapImgFlag" :imgIdListUnUnique="bwrapImg"></images-preview>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="药品检验报告编号：" prop="catProductAttached.medicalJyNum">
                  <el-input v-model="ruleForm.catProductAttached.medicalJyNum"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="检验报告有效期至：">
                  <div class="formrow nomar">
                    <span class="width-200">
                      <el-date-picker v-model="ruleForm.catProductAttached.medicalJyDate" type="date" :disabled="disable">
                      </el-date-picker>
                    </span>
                    <span>
                      <el-checkbox label="1"  name="type" v-model="medicalJyDateForever" @change="setMedicalJyDateForever">永久有效</el-checkbox>
                    </span>
                  </div>

                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-show="medicalJyNumImgFlag">
              <el-col :span="12" >
                <images-preview :dilogFlag="false" v-if="medicalJyNumImgFlag" :imgIdListUnUnique="medicalJyNumImg"></images-preview>
              </el-col>
              <el-col :span="12">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 国产药品 -->
            <el-row v-if="ruleForm.catProduct.productSource === '0' ">
              <el-col :span="12">
                <el-form-item label="国产药品批件编码：" prop="catProductAttached.productionNum">
                  <el-input v-model="ruleForm.catProductAttached.productionNum"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="国产药品批件有效期至：" prop="catProductAttached.productionDate" class="date-wrapper">
                  <el-date-picker v-model="ruleForm.catProductAttached.productionDate" type="date">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
              <el-row v-show="productionNumImgFlag && ruleForm.catProduct.productSource === '0'">
                <el-col :span="12" >
                  <images-preview :dilogFlag="false" v-if="productionNumImgFlag" :imgIdListUnUnique="productionNumImg"></images-preview>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="" >
                  </el-form-item>
                </el-col>
              </el-row>
            <!-- 进口药品及进口分装药品 -->
            <el-row v-if="ruleForm.catProduct.productSource != '0' ">
              <el-col :span="12">
                <el-form-item label="进口药品注册证编码：" prop="catProduct.importDrugLicenceNumber">
                  <el-input v-model="ruleForm.catProduct.importDrugLicenceNumber"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="进口药品注册证有效期至：" prop="catProduct.importLicenceExpiryDate" class="date-wrapper">
                  <el-date-picker v-model="ruleForm.catProduct.importLicenceExpiryDate" type="date">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row >
            <el-row v-show="jkNumImgFlag && ruleForm.catProduct.productSource != '0'">
              <el-col :span="12" >
                <images-preview :dilogFlag="false" v-if="jkNumImgFlag" :imgIdListUnUnique="jkNumImg"></images-preview>
              </el-col>
              <el-col :span="12">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
            </el-row>


            <el-row>
              <el-col :span="12" v-if="ruleForm.catProduct.productSource === '1' ">
                <el-form-item label="代理授权书有效期至：" prop="catProductAttached.agencyorgdate" class="date-wrapper">
                  <el-date-picker v-model="ruleForm.catProductAttached.agencyorgdate" type="date">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="ruleForm.catProduct.productSource === '0' || ruleForm.catProduct.productSource === '2' ">
                <el-form-item label="GMP证书编号：" prop="catProductAttached.gmpNumber">
                  <el-select v-model="ruleForm.catProductAttached.gmpNumber">
                    <el-option
                            v-for="item in gmpJson"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否专利保护：" prop="catProduct.patentFlag" class="catRadio">
                  <el-radio-group v-model="ruleForm.catProduct.patentFlag">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row v-show="agencyImgFlag && ruleForm.catProduct.productSource === '1'">
              <el-col :span="12" >
                <images-preview :dilogFlag="false" v-if="agencyImgFlag" :imgIdListUnUnique="agencyImg"></images-preview>
              </el-col>
              <el-col :span="12">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
            </el-row>

            <el-row v-if="ruleForm.catProduct.patentFlag == '1'">
              <el-col :span="12">
                <el-form-item label="专利保护开始时间：" class="date-wrapper" prop="catProduct.patentBeginDate">
                  <el-date-picker v-model="ruleForm.catProduct.patentBeginDate" type="date" :disabled="disablePatent">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="专利保护结束时间：" class="date-wrapper" prop="catProduct.patentEndDate">
                  <el-date-picker v-model="ruleForm.catProduct.patentEndDate" type="date" :disabled="disablePatent">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="药品质量标准：" prop="catProductAttached.drugStandrd">
                  <el-input v-model="ruleForm.catProductAttached.drugStandrd"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="备注：">
                  <el-input type="textarea" :rows="3" v-model="ruleForm.catProduct.remark" class="width-200"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
                <el-row v-show="drugStandrdImgFlag">
                  <el-col :span="12" >
                    <images-preview :dilogFlag="false" v-if="drugStandrdImgFlag" :imgIdListUnUnique="drugStandrdImg"></images-preview>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="" >
                    </el-form-item>
                  </el-col>
                </el-row>
            <h3 class="sms">说明书信息</h3>
            <el-row>
              <el-form-item label="用法用量：" prop="catProductAttached.useUnit1" >
                <el-input type="textarea" :rows="3"  v-model="ruleForm.catProductAttached.useUnit1" class="width-200"></el-input>
              </el-form-item>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="每次使用量最小值：">
                  <el-input v-model="ruleForm.catProductAttached.dataUseMin"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="每次使用量最大值：">
                  <el-input v-model="ruleForm.catProductAttached.dataUseMax"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="每日次数最小值：">
                  <el-input v-model="ruleForm.catProductAttached.dataNumMin"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="平均日用量：" prop="catProductAttached.aveDateNum">
                  <el-input type="number" v-model.number="ruleForm.catProductAttached.aveDateNum"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="每次使用极量：">
                  <el-input v-model="ruleForm.catProductAttached.useMaximum"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="疗程：">
                  <el-input v-model="ruleForm.catProductAttached.courseTreatment"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row v-show="manualImgFlag">
              <el-form-item label="说明书：">
                <images-preview class="img-pre-text" :dilogFlag="false" v-if="manualImgFlag" :imgIdListUnUnique="manualImg"></images-preview>
              </el-form-item>
            </el-row>
            <h3 class="shxx">审核信息</h3>
            <el-row>
              <el-col :span="12">
                <el-form-item label="审核状态：" prop="catProduct.checkFlag">
                  <el-radio-group v-model="ruleForm.catProduct.checkFlag">
                    <el-radio label="0">未审核</el-radio>
                    <!--<el-radio label="1">已提交</el-radio>-->
                    <el-radio label="5">已通过</el-radio>
                    <el-radio label="2">未通过</el-radio>
                    <el-radio label="4">被质疑</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="使用状态：" prop="catProduct.enableFlag">
                  <el-radio-group v-model="ruleForm.catProduct.enableFlag">
                    <el-radio label="1">正常</el-radio>
                    <el-radio label="0">禁用</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="质疑信息：">
                  <a  @click="goQuestionVue">查看</a>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
             <!-- <el-col :span="12">
                <el-form-item label="审核人：">
                  <span>{{ ruleForm.catProduct.checkUser }}</span>
                </el-form-item>
              </el-col>-->
              <el-col :span="12">
                <el-form-item label="审核时间：">
                  <span>{{ dateChange(ruleForm.catProduct.checkDate) }}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-form-item label="审核意见：">
                <el-input type="textarea" :rows="3" v-model="ruleForm.catProduct.checkRemark" class="width-200"></el-input>
              </el-form-item>
            </el-row>

            <el-row>
              <el-col>
              <span class="btn-mar">
                <el-button type="primary" size="small" @click="submit(`ruleForm`)">提交</el-button>
                <el-button size="small" @click="goBack">返回</el-button>
              </span>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </div>
    <Unit v-if="unitVisible" ref="Unit" @newMetric="newMetric"></Unit>
    <produOrg v-if="produOrgVisible" ref="ProduOrg" @newProduct="newProduct"></produOrg>
    <packaging-material v-if="packVisible" ref="PackagingMaterial" @newWrap="newWrap"></packaging-material>
    <drugs-name v-if="drugsNameVisible" ref="DrugsName" @newDrug="newDrug"></drugs-name>
    <questions v-if="questionsVisible" ref="questions"></questions>
  </div>

</template>
<script>
  import Unit from "../windowPanel/unit";
  import ProduOrg from "../windowPanel/produOrg";
  import PackagingMaterial from "../windowPanel/packagingMaterial";
  import DrugsName from "../windowPanel/drugsName";
  import "../../../../../assets/css/datacenter.css";
  import imagesPreview from 'src/pages/datacenter/windowPanel/imagesPreview';

  // 引入用户相关请求
  import {check,queryImages} from 'src/axios/datacenter/productdata/productinfo/productinfo';
  import {queryGMPList} from 'src/axios/datacenter/productdata/productinfo/productinfo'
  import {standardProduct,findWrapByDrugCode,findDoseageByDrugCode} from 'src/axios/datacenter/productdata/productinfo/productinfo';
  import moment from 'moment';
  import {changeToBite} from 'src/utils/validateUtil'
  import questions from '../windowPanel/questionsForReply';

  export default {
    components: {
      PackagingMaterial,
      imagesPreview,
      ProduOrg,
      Unit,
      DrugsName,
      questions
    },
    data() {
      let checkBite = (rule, value, callback) => {
        if(value){
          if(changeToBite(value) > 4000){
            callback(new Error('输入用法用量不超过4000字节'))
          }else{
            callback()
          }
        }else{
          callback(new Error('请输入用法用量'))
        }
      }
      return {
        id:undefined,
        medicalJyDateForever:undefined,
        disable:false,
        disablePatent:false,
        unitVisible:false,
        produOrgVisible:false,
        questionsVisible:false,
        packVisible:false,
        drugsNameVisible:false,
        findwrap:undefined,// 由药品code查询获得包材信息
        finddoseage:undefined,//  由药品code查询获得剂型信息
        imageList:undefined,//  图片id集
        permitNumberImgFlag:false,
        wrapImgFlag:false,
        medicalJyNumImgFlag:false,
        productionNumImgFlag:false,
        drugStandrdImgFlag:false,
        manualImgFlag:false,
        jkNumImgFlag:false,
        agencyImgFlag:false,
        permitNumberImg:[],
        bwrapImg:[],
        swrapImg:[],
        medicalJyNumImg:[],
        productionNumImg:[],
        drugStandrdImg:[],
        jkNumImg:[],
        agencyImg:[],
        manualImg:[],
        gmpList:undefined,
        gmpJson:[],
        ruleForm: {
          catDoseageForm:{},
          catProduct:{},
          catDrug:{},
          catMetric:{},
          catOrg:{},
          catWrap:{},
          catProductAttached:{},
          originalMetric:'',
        },
        rules: {
          'catProduct.tradeName':{required: true, message: '请输入商品名', trigger: 'blur'},
          'catDoseageForm.nameChn':{required: true, message: '请选择药品', trigger: 'blur'},
          'catDrug.standRate':{required: true, message: '请选择药品', trigger: 'blur'},
          'catDrug.spec':{required: true, message: '请选择药品', trigger: 'blur'},
          'catProduct.productStandardcode':{required: true, message: '请输入本位码', trigger: 'blur'},
          'catMetric.nameChn':{required: true, message: '请选择单位', trigger: 'blur'},
          'catOrg.name':{required: true, message: '请选择生产企业', trigger: 'blur'},
          'catWrap.nameChn':{required: true, message: '请选择药品', trigger: 'blur'},
          'catProduct.wrapCode':{required: true, message: '请选择药品', trigger: 'blur'},
          'catDrug.nameChn':{required: true, message: '请输入药品名称', trigger: 'blur'},
          'catDrug.code':{required: true, message: '请输入药品编码', trigger: 'blur'},
          'catProduct.productCode':{required: true, message: '请输入产品编码', trigger: 'blur'},
          'catProduct.productSource':{required: true, message: '请选择产品来源', trigger: 'blur'},
          'catProduct.useUnit':{required: true, message: '请输入最小使用单位', trigger: 'blur'},
          'catProduct.permitNumber':{required: true, message: '请输入批准文号', trigger: 'blur'},
          'catProductAttached.swrap':{required: true, message: '请输入中包装数量', trigger: 'blur'},
          'catProductAttached.bwrap':{required: true, message: '请输入大包装数量', trigger: 'blur'},
          'catProductAttached.medicalJyNum':{required: true, message: '请输入药品检验报告编号', trigger: 'blur'},
          'catProductAttached.productionNum':{required: true, message: '请输入国产药品批件编码', trigger: 'blur'},
          'catProductAttached.productionDate':{required: true, message: '请选择国产药品批件有效期', trigger: 'blur'},
          'catProductAttached.gmpNumber':{required: true, message: '请输入GMP证书编号', trigger: 'blur'},
          'catProduct.patentFlag':{required: true, message: '请选择专利保护状态', trigger: 'blur'},
          'catProductAttached.drugStandrd':{required: true, message: '请输入药品质量标准', trigger: 'blur'},
          'catProductAttached.useUnit1':{required: true, validator:checkBite, trigger: 'blur'},
          'catProduct.checkFlag':{required: true, message: '请选择审核状态', trigger: 'blur'},
          'catProduct.enableFlag':{required: true, message: '请选择使用状态', trigger: 'blur'},
          'catProductAttached.aveDateNum':{type:'number', message: '请输入数字',trigger: 'blur'},
          'catProduct.patentBeginDate':{required: true, message: '请输入专利开始时间', trigger: 'blur'},
          'catProduct.patentEndDate':{required: true, message: '请输入专利结束时间', trigger: 'blur'},
          'catProduct.importDrugLicenceNumber':{required: true, message: '请输入进口药品注册证编号', trigger: 'blur'},
          'catProduct.importLicenceExpiryDate':{required: true, message: '请输入进口药品注册证有效期', trigger: 'blur'},
          'catProductAttached.agencyorgdate':{required: true, message: '请输入代理授权书 有效期', trigger: 'blur'},
        },
        nodesPosition: {}//保存节点位置
      };
    },
    created(){
      this.id = this.$route.params.id || undefined;
      if (this.id) {
        this.initPage(this.id);
        this.imageDisplay(this.id);
      }
    },
    methods: {
      //  查看质疑信息
      goQuestionVue(){
        this.questionsVisible = true;
        this.$nextTick(() => {
          this.$refs.questions.fillData(this.id.split(',')[0]);
      })
      },
      //  页面初始化
      initPage(id){
        check(id).then(res => {
        this.ruleForm = res.data;
        //  nameChn显示控制
        if(this.ruleForm.catDoseageForm==null){
          this.ruleForm.catDoseageForm={};
          this.ruleForm.catDoseageForm.nameChn='';
        }
        if(this.ruleForm.catWrap==null){
          this.ruleForm.catWrap={};
          this.ruleForm.catWrap.nameChn='';
        }else{
          this.ruleForm.catProduct.wrapCode=this.ruleForm.catWrap.code;
        }
        //  单位显示（标准化后显示，未标准化不显示）
        if(this.ruleForm.catMetric!=null && this.ruleForm.catMetric.code==null){
          //  此时为刚刚提交的产品，未进行标准化
          this.ruleForm.originalMetric=this.ruleForm.catMetric.nameChn;
          this.ruleForm.catMetric.nameChn=undefined;
        }
        this.initialMedicalJyDateForever();
        /*this.setPatentDateAble();*/
        //  GMP下拉列表初始化
        this.initialGMP();
      })
      },
      //  GMP下拉列表初始化
      initialGMP(){
        queryGMPList(this.ruleForm.catOrg).then(res => {
          this.gmpList=res.data;
          this.gmpJson=[];
          console.log(this.gmpList);
          for(var i=0;i<this.gmpList.length;i++){
            var jo={};
            jo.value=this.gmpList[i].id;
            jo.label=this.gmpList[i].certificateNumber;
            this.gmpJson.push(jo);
          }
        console.log(this.gmpJson);
        })
      },
      //  相关图片文件初始化
      /*"1088":[],//批准文号不知道多少先写个1088
      "1013":[],//中包装数量
      "1012":[],//大包装数量
      "1014":[],//药品检验报告
      "1015":[],//进口药品注册证
      "1006":[],//代理授权书
      "1016":[],//国产药品批件
      "1018":[],//药品质量标准
      "1017":[]//说明书*/
      imageDisplay(id){
        queryImages(id).then(res => {
          this.imageList=res.data;
          for(var i=0;i<this.imageList.length;i++){
            if(this.imageList[i].catFileMessageId!=null && this.imageList[i].catFileMessageId!=''){
              switch (this.imageList[i].fileTypeId){
                case "1088":
                  this.permitNumberImgFlag=true;
                  this.permitNumberImg.push(this.imageList[i].catFileMessageId);
                  break;
                case "1006":
                  this.agencyImgFlag=true;
                  this.agencyImg.push(this.imageList[i].catFileMessageId);
                  break;
                case "1012":
                  this.wrapImgFlag=true;
                  this.bwrapImg.push(this.imageList[i].catFileMessageId);
                  break;
                case "1013":
                  this.wrapImgFlag=true;
                  this.swrapImg.push(this.imageList[i].catFileMessageId);
                  break;
                case "1014":
                  this.medicalJyNumImgFlag=true;
                  this.medicalJyNumImg.push(this.imageList[i].catFileMessageId);
                  break;
                case "1015":
                  this.jkNumImgFlag=true;
                  this.jkNumImg.push(this.imageList[i].catFileMessageId);
                  break;
                case "1016":
                  this.productionNumImgFlag=true;
                  this.productionNumImg.push(this.imageList[i].catFileMessageId);
                  break;
                case "1018":
                  this.drugStandrdImgFlag=true;
                  this.drugStandrdImg.push(this.imageList[i].catFileMessageId);
                  break;
                case "1017":
                  this.manualImgFlag=true;
                  this.manualImg.push(this.imageList[i].catFileMessageId);
                  break;
              }
            }
          }
        })
      },
      //  检验报告有效期-永久有效初始化
      initialMedicalJyDateForever(){
        if(this.ruleForm.catProductAttached.medicalJyYj=='1'){
          this.medicalJyDateForever=true;
        }else{
          this.medicalJyDateForever=false;
        }
        this.setMedicalJyDateForever(this.medicalJyDateForever);
      },
      //  永久有效控制
      setMedicalJyDateForever(val){
        this.disable=val;
        if(val){
          this.ruleForm.catProductAttached.medicalJyDate=undefined;
          this.ruleForm.catProductAttached.medicalJyYj='1'
        }else{
          this.ruleForm.catProductAttached.medicalJyYj='0';
        }
      },
      //  是否专利保护
      setPatentDateAble(){
        if(this.ruleForm.catProduct.patentFlag=='1'){
          this.disablePatent=false;
        }else{
          this.disablePatent=true;
          this.ruleForm.catProduct.patentBeginDate=undefined;
          this.ruleForm.catProduct.patentEndDate=undefined;
        }
      },
      //  时间格式转换
      dateChange(data){
        var result;
        if(typeof (data)!='undefined'&& data!=null ){
          result=moment(data).format("YYYY-MM-DD");
        }
        return result;
      },
      //  选择单位
      unitView(name){
        this.unitVisible=true;
        this.$nextTick(() => {
          this.$refs.Unit.fillData(name);
        })
      },
      //  新单位数据同步到主页面
      newMetric(data) {
        this.ruleForm.catProduct.metricId=data.value.id;
        this.ruleForm.catMetric.id=data.value.id;
        this.ruleForm.catMetric.nameChn=data.value.nameChn;
        this.ruleForm.originalMetric=data.value.nameChn;
        this.ruleForm.catMetric.code=data.value.code;
      },
      //  新生产企业数据同步到主页面
      newProduct(data) {
        this.ruleForm.catProduct.manufactureId=data.value.id;
        this.ruleForm.catProduct.productCode=undefined;
        this.ruleForm.catOrg.name=data.value.name;
        this.ruleForm.catOrg.code=data.value.code;
        this.ruleForm.catProductAttached.gmpNumber=undefined;
        //  GMP列表重新初始化
        this.initialGMP();
      },

      //  选择生产企业
      produOrgView(name){
        this.produOrgVisible=true;
        this.$nextTick(() => {
          this.$refs.ProduOrg.fillData(name);
        })
      },
      //  选择包材
      packMaterialView(name){
        this.packVisible=true;
        this.$nextTick(() => {
          this.$refs.PackagingMaterial.fillData(name);
        })
      },
      //  新包材数据同步到主页面
      newWrap(data) {
        this.ruleForm.catWrap.nameChn=data.value.nameChn;
        this.ruleForm.catWrap.code=data.value.code;
        this.ruleForm.catProduct.wrapCode=data.value.code;
      },
      //  选择药品名称
      drugsNameView(name){
        this.drugsNameVisible=true;
        this.$nextTick(() => {
          this.$refs.DrugsName.fillData(name);
        })
      },
      //  新药品名数据同步到主页面
      newDrug(data) {
        this.ruleForm.catProduct.medicalId=data.value.id;
        this.ruleForm.catProduct.productCode=undefined;
        this.ruleForm.catDrug.nameChn=data.value.nameChn;
        this.ruleForm.catDrug.spec=data.value.spec;// 规格
        this.ruleForm.catDrug.standRate=data.value.standRate;// 转换比
        this.ruleForm.catDoseageForm.nameChn=data.value.doseageFormCodeName;
        this.ruleForm.catDrug.code=data.value.code;
        this.findWrap(this.ruleForm.catDrug.code);//  包材
        this.findDoseage(this.ruleForm.catDrug.code);// 剂型
      },
      //  根据药品编码查询包材信息
      findWrap(code){
        findWrapByDrugCode(code).then(res => {
            this.findwrap=res.data;
            this.ruleForm.catWrap={};
            this.ruleForm.catWrap.nameChn=this.findwrap.nameChn;
            this.ruleForm.catProduct.wrapCode=this.findwrap.code;
            this.ruleForm.catWrap.code=this.findwrap.code;
        })
      },
      //  根据药品编码查询剂型信息
      findDoseage(code){
        findDoseageByDrugCode(code).then(res => {
          this.finddoseage=res.data;
          this.ruleForm.catDoseageForm={};
          this.ruleForm.catDoseageForm.nameChn=this.finddoseage.nameChn;
        })
      },
      //  生成新的产品编码
      generateProductCode(){
        if(this.ruleForm.catProduct.productCode==undefined){
          this.ruleForm.catProduct.productCode=this.ruleForm.catDrug.code+'-'+this.ruleForm.catOrg.code;
        }
      },
      //  提交
      submit(ruleForm) {
        for(var i=0;i<this.gmpList.length;i++){
          if(this.ruleForm.catProductAttached.gmpNumber == this.gmpList[i].certificateNumber){
            this.ruleForm.catProductAttached.gmpNumber=this.gmpList[i].id;
          }
        }
        this.$refs[ruleForm].validate((valid) => {
          if(!valid){
            confirm("内容不完整，请完善标准化信息！");
          }else if (valid) {
            standardProduct(this.ruleForm).then(res => {
              this.$message({
                      message: res.data,
                      type: 'success',
                      duration: 1000,
                      onClose: () => {
                      this.goBack();
          }
          })
          })
          } else {
            return false;
      }
      });
      },
      //  返回
      goBack() {
        this.$router.go(-1);
      },
      //  锚点定位
      changeScrollHeight(pageY, jumpNodeName, currentNodeIndex){
        window.scrollTo(0, pageY);
        this.removeClassCurrent(jumpNodeName)[currentNodeIndex].classList.add('current');
      },
      removeClassCurrent(nodeClassName){
        let jumpNodes = document.getElementsByClassName(nodeClassName);
        for (let i = 0; i < jumpNodes.length; i++) {
          jumpNodes[i].classList.remove('current')
        }
        return jumpNodes
      },
      //获取节点所在位置 根据具体情况适当增加
      getNodesHeight(proInfoDetaiBox){
        let vieNode = document.getElementById(proInfoDetaiBox);
        let viewNodeChildeNodes = vieNode.childNodes;
        for (let i = 0; i < viewNodeChildeNodes.length; i++) {
          if (viewNodeChildeNodes[i].nodeName == 'H3') {
            if (viewNodeChildeNodes[i].className == 'cpjc') {
              this.nodesPosition.cpjc = viewNodeChildeNodes[i].offsetTop
            }
            if (viewNodeChildeNodes[i].className == 'sms') {
              this.nodesPosition.sms = viewNodeChildeNodes[i].offsetTop
            }
            if (viewNodeChildeNodes[i].className == 'shxx') {
              this.nodesPosition.shxx = viewNodeChildeNodes[i].offsetTop
            }
          }
        }
      },
      removeFixed(sideNodeName){
        let sideNode = document.getElementById(sideNodeName);
        sideNode.classList.remove('side-scroll');
        sideNode.classList.add('side-init');
      },
      addFixed(sideNodeName){
        let sideNode = document.getElementById(sideNodeName);
        sideNode.classList.remove('side-init');
        sideNode.classList.add('side-scroll');
      },
      dialogBoxScroll(vieNodeScrollTop, jumpNodeName, sideNodeName){
        if (vieNodeScrollTop < this.nodesPosition.cpjc) {
          this.removeClassCurrent(jumpNodeName)[0].classList.add('current');
        }
        else if (vieNodeScrollTop > this.nodesPosition.cpjc && vieNodeScrollTop < this.nodesPosition.sms) {
          this.removeClassCurrent(jumpNodeName)[0].classList.add('current');
        }
        else if (vieNodeScrollTop > this.nodesPosition.sms && vieNodeScrollTop < this.nodesPosition.shxx) {
          this.removeClassCurrent(jumpNodeName)[1].classList.add('current');
        }
        else if (vieNodeScrollTop > this.nodesPosition.shxx ) {
          this.removeClassCurrent(jumpNodeName)[2].classList.add('current');
        }
        //增加或删除菜单浮动类名
        if (vieNodeScrollTop <= this.nodesPosition.cpjc) {
          this.removeFixed(sideNodeName)
        }
        else {
          this.addFixed(sideNodeName)
        }
      }
    },
    mounted(){
      //获取节点所在位置 初始右边菜单起始
      this.$nextTick(() => {
        this.getNodesHeight('right-main-box');
      this.removeClassCurrent('jump_item')[0].classList.add('current');
    });
      window.onscroll = function () {
        let windowScrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        this.dialogBoxScroll(windowScrollTop, 'jump_item', 'side-menu')
      }.bind(this)
    },
    beforeDestroy(){
      window.onscroll = null;
    },
  }
</script>
