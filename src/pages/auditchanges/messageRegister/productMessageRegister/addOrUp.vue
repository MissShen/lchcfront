<template>
  <el-dialog
    custom-class="w80"
    title="产品信息注册"
    :close-on-click-modal="false"
    :visible.sync="visible"
    append-to-body
    class="audit-dialog"
    id="product-addup-view-box"
  >
    <div v-if="visible">
      <div class="main audit-main">
        <ul class="side side-init" id="product-addup-view-side">
          <li v-for="(nodeItem,index) in nodesPosition" :key="index"><a
            @click="changeScrollHeight(nodeItem.nodePosition,'product-addup-view-box','jump-pro-addup-view',index)"
            class="d_jump jump-pro-addup-view">{{nodeItem.itemName}}</a></li>
        </ul>
        <div class="right-box">
          <div id="product-addup-view" class="from-view form-inner audit-info audit-form-input-box">
            <h3 class="cpjc">产品基础信息</h3>
            <el-form
              :model="ruleForm"
              ref="ruleForm"
              :rules="rules"
              label-width="145px"
              size="small"
              label-position="left"
              class="demo-form-inline"
              :inline="true"
            >
              <el-row class="audit-item-box">
                <el-col :span="12">
                  <el-form-item data-max="200" ref="PRODUCT" label="产品名称" prop="PRODUCT">
                    <el-input v-model="ruleForm.PRODUCT"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item data-max="200" ref="DOSAGE" label="剂型" prop="DOSAGE">
                    <el-input v-model="ruleForm.DOSAGE"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="audit-item-box">
                <el-col :span="12">
                  <el-form-item label="商品名" data-max="200" ref="TRADE" prop="TRADE">
                    <el-input v-model="ruleForm.TRADE"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="转换比" data-max="200" ref="STANDRATE" prop="STANDRATE">
                    <el-input v-model="ruleForm.STANDRATE"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="audit-item-box">
                <el-col :span="12">
                  <el-form-item label="规格" data-max="200" ref="SPEC" prop="SPEC">
                    <el-input v-model="ruleForm.SPEC"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="单位" data-max="200" ref="METRIC" prop="METRIC">
                    <el-input v-model="ruleForm.METRIC"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="audit-item-box">
                <el-col :span="12">
                  <el-form-item label="包材" data-max="200" ref="WRAP" prop="WRAP">
                    <el-input v-model="ruleForm.WRAP"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="生产企业" data-max="200" ref="MANUFACTURE" prop="MANUFACTURE">
                    <el-input v-if="ruleForm.SOURCE != '0'" v-model="ruleForm.MANUFACTURE"></el-input>
                    <span v-if="ruleForm.SOURCE=='0'">{{myOrgName}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--<el-row>-->
              <!--<el-col :span="12">-->
              <!--<el-form-item label="北京地标码" prop="STANDARDCODE" >-->
              <!--<el-input v-model="ruleForm.STANDARDCODE"></el-input>-->
              <!--</el-form-item>-->
              <!--</el-col>-->
              <!--</el-row>-->
              <el-row class="audit-item-box">
                <el-col :span="12">
                  <el-form-item label="产品来源" data-max="1" ref="SOURCE"  prop="SOURCE">
                    <el-radio-group @change="sourceChange" v-model="ruleForm.SOURCE">
                      <el-radio  label="0">国产</el-radio>
                      <el-radio  label="1">进口</el-radio>
                      <el-radio  label="2">进口分装</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <!--<el-col :span="12" v-if="ruleForm.SOURCE == '2'">-->
                <!--<el-form-item label="分装企业" prop="">-->
                <!--<el-input></el-input>-->
                <!--</el-form-item>-->
                <!--</el-col>-->
              </el-row>
              <el-row class="audit-item-box">
                <el-col :span="12">
                  <el-form-item label="最小使用单位" data-max="50" ref="UNIT"  prop="UNIT">
                    <el-input v-model="ruleForm.UNIT"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="批准文号" data-max="150"  ref="PERMITNUMBER" prop="PERMITNUMBER">
                    <el-input v-model="ruleForm.PERMITNUMBER"></el-input>
                  </el-form-item>
                  <el-row>
                    <el-col :span="24">
                    <span class="audit-check-box preview-btn">
                      <el-button @click="handleChooseFiles('1088')" size="small">选择文件</el-button>
                    </span>
                      <div v-if="filesFlag['1088']" class="el-form-item__error">
                        请上传批准文号
                      </div>
                      <images-preview
                        refName="1088"
                        ref="imagesPreview"
                        :imgIdListUnUnique="fileList['1088']"
                        @imgIdListChange="upLoadImgIdList"></images-preview>
                    </el-col>
                  </el-row>

                </el-col>
              </el-row>
              <el-row class="audit-item-box">
                <el-col :span="12">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="中包装数量" data-mustNum="true" data-max="50" ref="SWRAP" prop="SWRAP">
                        <el-input v-model="ruleForm.SWRAP"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                    <span class="audit-check-box preview-btn">
                      <el-button @click="handleChooseFiles('1013')" size="small">选择文件</el-button>
                    </span>
                      <div v-if="filesFlag['1013']" class="el-form-item__error">
                        请上传中包装数量
                      </div>
                      <images-preview class="" refName="1013" ref="imagesPreview"
                                      :imgIdListUnUnique="fileList['1013']"
                                      @imgIdListChange="upLoadImgIdList"></images-preview>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="大包装数量" prop="BWRAP" data-mustNum="true" data-max="50" ref="BWRAP">
                        <el-input v-model="ruleForm.BWRAP"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                    <span class="audit-check-box preview-btn">
                      <el-button @click="handleChooseFiles('1012')" size="small">选择文件</el-button>
                    </span>
                      <div v-if="filesFlag['1012']" class="el-form-item__error">
                        请上传大包装数量
                      </div>
                      <images-preview class="" refName="1012" ref="imagesPreview"
                                      :imgIdListUnUnique="fileList['1012']"
                                      @imgIdListChange="upLoadImgIdList"></images-preview>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row class="audit-item-box">
                <el-col :span="12">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="药品检验报告编号"  prop="JYNUM" data-max="100" ref="JYNUM">
                        <el-input v-model="ruleForm.JYNUM"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                    <span class="audit-check-box preview-btn">
                      <el-button @click="handleChooseFiles('1014')" size="small">选择文件</el-button>
                    </span>
                      <div v-if="filesFlag['1014']" class="el-form-item__error">
                        请上传药品检验报告编号
                      </div>
                      <images-preview class="" refName="1014" ref="imagesPreview"
                                      :imgIdListUnUnique="fileList['1014']"
                                      @imgIdListChange="upLoadImgIdList"></images-preview>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-form-item style="margin-bottom: 0!important;" label="有效期至" prop="JYDATE" data-max="unlimited" ref="JYDATE">
                    <el-date-picker :disabled="ruleForm.JYYJ == '1'" type="date"
                                    v-model="ruleForm.JYDATE" @change="formValeChange" ref="jydateValue"></el-date-picker>
                  </el-form-item>
                  <el-form-item style="margin-left: 160px" class="space-20" label="永久有效" prop="JYYJ" data-max="unlimited" ref="JYYJ">
                    <el-checkbox @change="tipValChange('JYDATE')" true-label="1" false-label="0" v-model="ruleForm.JYYJ">永久有效</el-checkbox>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="ruleForm.SOURCE === '0' " class="audit-item-box">
                <el-col :span="12">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="国产药品批件编号" prop="PRODUCTIONNUM" data-max="100" ref="PRODUCTIONNUM">
                        <el-input v-model="ruleForm.PRODUCTIONNUM"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                    <span class="audit-check-box preview-btn">
                      <el-button @click="handleChooseFiles('1016')" size="small">选择文件</el-button>
                    </span>
                      <div v-if="filesFlag['1016']" class="el-form-item__error">
                        请上传国产药品批件编号
                      </div>
                      <images-preview class="" refName="1016" ref="imagesPreview"
                                      :imgIdListUnUnique="fileList['1016']"
                                      @imgIdListChange="upLoadImgIdList"></images-preview>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="有效期至" prop="PRODUCTIONDATE" data-max="unlimited" ref="PRODUCTIONDATE">
                    <el-date-picker type="date" v-model="ruleForm.PRODUCTIONDATE"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="ruleForm.SOURCE == '1' || ruleForm.SOURCE == '2'" class="audit-item-box">
                <el-col :span="12">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="进口药品注册证编号" prop="JKNUM" data-max="100" ref="JKNUM">
                        <el-input v-model="ruleForm.JKNUM"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                    <span class="audit-check-box preview-btn">
                      <el-button @click="handleChooseFiles('1015')" size="small">选择文件</el-button>
                    </span>
                      <div v-if="filesFlag['1015']" class="el-form-item__error">
                        请上传进口药品注册证编号
                      </div>
                      <images-preview class="" refName="1015" ref="imagesPreview"
                                      :imgIdListUnUnique="fileList['1015']"
                                      @imgIdListChange="upLoadImgIdList"></images-preview>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="有效期至" prop="JKDATE" data-max="unlimited" ref="JKDATE">
                    <el-date-picker type="date" v-model="ruleForm.JKDATE"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="audit-item-box">
                <el-col :span="12" v-if="ruleForm.SOURCE == '0' || ruleForm.SOURCE == '2'">
                  <el-form-item label="GMP证书编号" prop="GMP" data-max="unlimited" ref="GMP">
                    <!--class="fundInput"-->
                    <el-select v-model="ruleForm.GMP" placeholder="请选择" @change="gmpFileChange()" size="small">
                      <el-option v-for="item in gmpList"
                                 :key="item.ID"
                                 :label="item.CERTIFICATE_NUMBER"
                                 :value="item.ID"
                                 class="fundInput">
                      </el-option>
                    </el-select>
                    <images-preview
                      ref="imagesPreview"
                      :imgIdListUnUnique="ruleForm.GMPFILE || []"
                      :operate="false"></images-preview>
                  </el-form-item>
                </el-col>
                <el-col :span="12" v-if="ruleForm.SOURCE == '1'">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="代理授权书有效期至" prop="AGENCYORGDATE" data-max="unlimited" ref="AGENCYORGDATE">
                        <el-date-picker type="date" v-model="ruleForm.AGENCYORGDATE"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                    <span class="audit-check-box preview-btn">
                      <el-button @click="handleChooseFiles('1006')" size="small">选择文件</el-button>
                    </span>
                      <div v-if="filesFlag['1006']" class="el-form-item__error">
                        请上传代理授权书有效期至
                      </div>
                      <images-preview class="" refName="1006" ref="imagesPreview"
                                      :imgIdListUnUnique="fileList['1006']"
                                      @imgIdListChange="upLoadImgIdList"></images-preview>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="是否专利保护" prop="PATENTFLAG">
                    <el-radio-group @change="patenFlagChange" v-model="ruleForm.PATENTFLAG">
                      <el-radio label="1">是</el-radio>
                      <el-radio label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="ruleForm.PATENTFLAG == '1'" class="audit-item-box">
                <el-col :span="12">
                  <el-form-item label="专利保护开始时间" prop="PATENTBEGINDATE">
                    <el-date-picker type="date" v-model="ruleForm.PATENTBEGINDATE" :picker-options="startPickerOptions"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="专利保护结束时间" prop="PATENTENDDATE">
                    <el-date-picker  type="date" v-model="ruleForm.PATENTENDDATE" :picker-options="endPickerOptions"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="audit-item-box">
                <el-col :span="12">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="药品质量标准" prop="STANDRD" data-max="100" ref="STANDRD">
                        <el-input v-model="ruleForm.STANDRD"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                    <span class="audit-check-box preview-btn">
                      <el-button @click="handleChooseFiles('1018')" size="small">选择文件</el-button>
                    </span>
                      <div v-if="filesFlag['1018']" class="el-form-item__error">
                        请上传药品质量标准
                      </div>
                      <images-preview class="" refName="1018" ref="imagesPreview"
                                      :imgIdListUnUnique="fileList['1018']"
                                      @imgIdListChange="upLoadImgIdList"></images-preview>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="是否中药保护" prop="PROTECTIONFLAG" data-max="unlimited" ref="PROTECTIONFLAG">
                    <el-radio v-model="ruleForm.PROTECTIONFLAG" label="1">是</el-radio>
                    <el-radio v-model="ruleForm.PROTECTIONFLAG" label="0">否</el-radio>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <h3 class="sms">说明书信息</h3>
            <el-form :model="ruleForm" ref="ruleFormRef" :rules="rules" label-width="160px" size="small"
                     label-position="left" class="demo-form-inline" :inline="true">
              <el-row>
                <el-col :span="13">
                  <el-form-item label="用法用量" prop="USEUNIT" data-max="4000" ref="USEUNIT">
                    <el-input class="use-desc-text-area" type="textarea" :rows="3"
                              v-model="ruleForm.USEUNIT"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="每次使用量最小值" prop="USEMIN"  data-max="50" ref="USEMIN">
                    <el-input v-model="ruleForm.USEMIN"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="每次使用量最大值" prop="USEMAX"   data-max="50" ref="USEMAX">
                    <el-input v-model="ruleForm.USEMAX"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="每日次数最小值" prop="NUMMIN"  data-max="50" ref="NUMMIN">
                    <el-input v-model="ruleForm.NUMMIN"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="平均日用量" prop="AVENUM"  data-mustNum="true"  data-max="50" maxlength="50" ref="AVENUM">
                    <el-input v-model="ruleForm.AVENUM"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="每次使用极量" prop="MAXIMUN"  data-max="20" ref="MAXIMUN">
                    <el-input v-model="ruleForm.MAXIMUN"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="疗程" prop="TREATMENT" data-max="100" ref="TREATMENT">
                    <el-input v-model="ruleForm.TREATMENT"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="说明书"></el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                     <span class="audit-check-box button-start preview-btn">
                      <el-button @click="handleChooseFiles('1017')" size="small">选择文件</el-button>
                    </span>
                  <div v-if="filesFlag['1017']" class="el-form-item__error">
                    请上传说明书文件
                  </div>
                  <images-preview class="" refName="1017" ref="imagesPreview"
                                  :imgIdListUnUnique="fileList['1017']"
                                  @imgIdListChange="upLoadImgIdList"></images-preview>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </div>
      <div slot="footer" class="clearfixed gap-40">
      <span class="flo-right">
        <el-button type="primary" :disabled="submitFlag" @click="submit" size="small">保存</el-button>
        <el-button size="small" @click="goBack">关闭</el-button>
      </span>
      </div>
      <choose-files ref="chooseFiles" v-if="dialogVisible" @handleSelectedFolder="selectedData"></choose-files>
    </div>
  </el-dialog>
</template>
<script>
  import {
    findById,
    queryGmpList,
    insert,
    update,
    findOrgName
  } from 'src/axios/auditchanges/messageRegister/productMessageRegister'
  import {findFilesById} from 'src/axios/auditchanges/common/catProduct'
  import chooseFiles from 'src/pages/auditchanges/common/chooseFiles';
  import imagesPreview from 'src/pages/auditchanges/common/imagesPreview'
  import {boxScroll} from "src/components/mixins/scrolls"
  import {changeToBite,isNumber} from 'src/utils/validateUtil'
  export default {
    mixins: [boxScroll],
    components: {
      chooseFiles,
      imagesPreview,
    },
    data() {
      let that = this;
      let changeBite =(rule, value, callback)=>{
        let filedName = rule.field;
        let nodeEl = this.$refs[filedName].$el;
        //可输入字符限制
        let nodeMaxLimit = nodeEl.getAttribute('data-max');
        //是否必须数字
        let ifNum = nodeEl.getAttribute('data-mustNum') || "";
        let biteNum = nodeMaxLimit=='unlimited'?"": changeToBite(value);
        let tipMessage;
        switch (filedName){
          case 'PRODUCT':
            tipMessage = "请输入产品名称";
            break;
          case 'TRADE':
            tipMessage = "请输入商品名称";
            break;
          case 'DOSAGE':
            tipMessage = "请输入剂型";
            break;
          case 'SPEC':
            tipMessage = "请输入规格";
            break;
          case 'STANDRATE':
            tipMessage = "请输入转换比";
            break;
          case 'METRIC':
            tipMessage = "请输入单位";
            break;
          case 'WRAP':
            tipMessage = "请输入包材";
            break;
          case 'MANUFACTURE':
            tipMessage = "请输入生产企业";
            break;
          case 'STANDARDCODE':
            tipMessage = "请输入本位码";
            break;
          case 'SOURCE':
            tipMessage = "请输入产品来源";
            break;
          case 'UNIT':
            tipMessage = "请输入最小使用单位";
            break;
          case 'PERMITNUMBER':
          tipMessage = "请输入批准文号";
          break;
          case 'SWRAP':
            tipMessage = "请输入中包装数量";
            break;
          case 'BWRAP':
            tipMessage = "请输入大包装数量";
            break;
          case 'JYNUM':
            tipMessage = "请输入药品检验报告编号";
            break;
          case 'JYDATE':
              tipMessage = "请输入药品检验报告有效期";
            break;
          case 'JYYJ':
            tipMessage = "请选择有效期";
            break;
          case 'JKNUM':
            tipMessage = "请输入药品注册证编号";
            break;
          case 'JKDATE':
            tipMessage = "请输入有效期";
            break;
            case 'AGENCYORGDATE':
          tipMessage = "请输入代理授权书有效期至";
          break;
          case 'PRODUCTIONNUM':
            tipMessage = "请输入药品批件编号";
            break;
          case 'PRODUCTIONDATE':
            tipMessage = "请输入有效期";
            break;
          case 'IMPORTNUM':
            tipMessage = "请输入进口药品注册证编号";
            break;
          case 'GMP':
            tipMessage = "请输入GMP证书编号";
            break;
          case 'STANDRD':
            tipMessage = "请输入药品质量标准";
            break;
            case 'PROTECTIONFLAG':
          tipMessage = "请输入是否中药保护";
          break;
          case 'USEUNIT':
            tipMessage = "请输入用法用量";
          break;
          case 'TREATMENT':
            tipMessage = "请输入疗程";
            break;
        }
        if(!value){
          if(rule.required){
            return callback(new Error(tipMessage));
          }
          else{
            return callback()
          }
        }
        else{
          //限制为数字
          if(ifNum && isNumber(value)){
            return callback()
          }
          else if(ifNum && !isNumber(value)){
            return callback(new Error('请输入数字'));
          }

          //不限制长度 传入'data-max="unlimited"'
          if(nodeMaxLimit == 'unlimited'){
            return callback()
          }else{
            //有自字符限制
            if(biteNum){
              if (biteNum > nodeMaxLimit) {
                return callback(new Error('长度不超过'+nodeMaxLimit+'个字节'));
              }else{
                return callback()
              }
            }
          }
        }
      };
      return {
        // specFlag:false,
        filesFlag:{
          "1088": false,
          "1013": false,
          "1012": false,
          "1014": false,
          "1015": false,
          "1006": false,
          "1016": false,
          "1018": false,
          "1017": false
        },
        activeName: 'first',
        myOrgName: '',
        visible: false,
        gmpList: [],
        ruleForm: this.ruleFormInit(),
        fileList: this.metaFileList(),
        submitFlag: false,//提交按钮是否可用
        rules: {
          PRODUCT: {required: true,validator: changeBite,trigger: 'blur'},
          TRADE: {required: true,validator: changeBite,trigger: 'blur'},
          DOSAGE: {required: true,validator: changeBite,trigger: 'blur'},
          SPEC: {required: true,validator: changeBite,trigger: 'blur'},
          STANDRATE:{required: true,validator: changeBite,trigger: 'blur'},
          METRIC: {required: true,validator: changeBite,trigger: 'blur'},
          WRAP: {required: true,validator: changeBite,trigger: 'blur'},
          MANUFACTURE: {required: false,validator: changeBite,trigger: 'blur'},
          STANDARDCODE: {required: true,validator: changeBite,trigger: 'blur'},
          SOURCE:{required: true,validator: changeBite,trigger: 'blur'},
          UNIT: {required: true,validator: changeBite,trigger: 'blur'},
          PERMITNUMBER: {required: true,validator: changeBite,trigger: 'blur'},
          SWRAP: {required: true,validator: changeBite,trigger: 'blur'},
          BWRAP: {required: true,validator: changeBite,trigger: 'blur'},
          JYNUM: {required: true,validator: changeBite,trigger: 'blur'},
          JYDATE: {required: true,validator: changeBite,trigger: 'blur'},
          JYYJ: {required: false,validator: changeBite,trigger: 'blur'},
          JKNUM: {required: true,validator: changeBite,trigger: 'blur'},
          JKDATE:{required: true,validator: changeBite,trigger: 'blur'},
          AGENCYORGDATE: {required: true,validator: changeBite,trigger: 'blur'},
          PRODUCTIONNUM: {required: true,validator: changeBite,trigger: 'blur'},
          PRODUCTIONDATE: {required: true,validator: changeBite,trigger: 'blur'},
          IMPORTNUM: {required: true,validator: changeBite,trigger: 'blur'},
          IMPORTDATE: {required: true,validator: changeBite,trigger: 'blur'},
          GMP: {required: true,validator: changeBite,trigger: 'blur'},
          STANDRD: {required: true,validator: changeBite,trigger: 'blur'},
          TREATMENT:{required: true,validator: changeBite,trigger: 'blur'},
          PROTECTIONFLAG: {required: true,validator: changeBite,trigger: 'blur'},
          USEUNIT: {required: true,validator: changeBite,trigger: 'blur'},
          AVENUM:{required: false,validator: changeBite,trigger: 'blur'},
          USEMIN:{required: false,validator: changeBite,trigger: 'blur'},
          USEMAX:{required: false,validator: changeBite,trigger: 'blur'},
          NUMMIN:{required: false,validator: changeBite,trigger: 'blur'},
          MAXIMUN:{required: false,validator: changeBite,trigger: 'blur'},
          PATENTFLAG:{required: true,message: '请选择是否专利保护',trigger: 'blur'},
          PATENTBEGINDATE:{required: false,message: '请选择专利保护开始时间',trigger: 'change'},
          PATENTENDDATE:{required: false,message: '请选择专利保护结束时间',trigger: 'change'}
        },
        dialogVisible: false,
        nodesPosition: [
          {itemName: '基础信息', nodePosition: null, itemAbb: 'cpjc'},
          {itemName: '说明书信息', nodePosition: null, itemAbb: 'sms'},
        ],
        startPickerOptions: {//开始时间与结束时间大小判断
          disabledDate(time) {
            if (that.ruleForm.PATENTENDDATE * 1 == '') {
              return false;
            } else {
              return time.getTime() > new Date(that.ruleForm.PATENTENDDATE * 1) - 3600 * 24 * 1000;
            }
          }
        },
        endPickerOptions: {
          disabledDate(time) {
            return time.getTime() < (new Date(that.ruleForm.PATENTBEGINDATE * 1)) * 1 + 3600 * 24 * 1000;
          }
        },
      };
    },
    created() {

    },
    methods: {
      sourceChange(){
        //生产企业验证
        let errorParentNode = this.$refs.MANUFACTURE.$el.childNodes[1];
        let erroTipNode =errorParentNode.childNodes[3]
        if(this.ruleForm.SOURCE == '0' && errorParentNode && erroTipNode.className =='el-form-item__error'){
          erroTipNode.style.display = 'none';
          this.rules.MANUFACTURE.required = false;
        }else if(this.ruleForm.SOURCE != '0' && errorParentNode && erroTipNode.className =='el-form-item__error'){
          erroTipNode.style.display = 'block';
          this.rules.MANUFACTURE.required = true;
        }
      },
      ruleFormInit(){
        return {
          ID: undefined,
          CPID: undefined,
          CDID: undefined,
          CPAID: undefined,
          ISTEMP: undefined,
          PRODUCT: undefined,
          TRADE: undefined,
          DOSAGE: undefined,
          SPEC: undefined,
          STANDRATE: undefined,
          METRIC: undefined,
          WRAP: undefined,
          MANUFACTURE: undefined,
          STANDARDCODE: undefined,
          SOURCE: '0',
          UNIT: undefined,
          PERMITNUMBER: undefined,
          SWRAP: undefined,
          BWRAP: undefined,
          JYNUM: undefined,
          JYDATE: undefined,
          JYYJ: undefined,
          JKNUM: undefined,
          JKDATE: undefined,
          AGENCYORGDATE: undefined,
          PRODUCTIONNUM: undefined,
          PRODUCTIONDATE: undefined,
          IMPORTNUM: undefined,
          IMPORTDATE: undefined,
          GMP: undefined,
          GMPNUMBER: undefined,
          GMPFILE: [],
          PATENTFLAG: undefined,
          PATENTBEGINDATE: undefined,
          PATENTENDDATE: undefined,
          STANDRD: undefined,
          PROTECTIONFLAG: undefined,
          USEUNIT: undefined,
          USEMIN: undefined,
          USEMAX: undefined,
          NUMMIN: undefined,
          AVENUM: undefined,
          MAXIMUN: undefined,
          TREATMENT: undefined
        }
      },
      metaFileList(){
        return {
          "1088": [],//批准文号不知道多少先写个1088
          "1013": [],//中包装数量
          "1012": [],//大包装数量
          "1014": [],//药品检验报告
          "1015": [],//进口药品注册证
          "1006": [],//代理授权书
          "1016": [],//国产药品批件
          "1018": [],//药品质量标准
          "1017": []//说明书
        }
      },
      async list(id) {
        this.ruleForm = this.ruleFormInit();
        this.visible = true;
        this.ruleForm.ID = id
        //查当前企业名称
        let res = await findOrgName()
        this.myOrgName = res.data
        if (this.ruleForm.ID != '0') {
          res = await findById(this.ruleForm.ID, 1)
          this.ruleForm = res.data
          this.patenFlagChange();
          if (!!this.ruleForm.PATENTENDDATE == true) {
            this.ruleForm.PATENTENDDATE?new Date(res.data.PATENTENDDATE):'';
          }
          if (!!this.ruleForm.PATENTBEGINDATE == true) {
            this.ruleForm.PATENTBEGINDATE ?new Date(res.data.PATENTBEGINDATE):'';
          }
          this.ruleForm.PRODUCTIONDATE?new Date(res.data.PRODUCTIONDATE):''
          res = await findFilesById(id)
          if (res.data != undefined) {
            for (let i in res.data) {
              this.fileList[i] = res.data[i]
            }
          } else {
            this.fileList = this.metaFileList()
          }
        }
        res = await queryGmpList()
        this.gmpList = res.data
        /**
         * 查询设置锚点位置
         * */
        //恢复初始状态
        this.removeClassCurrent('jump-pro-addup-view')[0].classList.add('current');
        this.getNodesHeight('product-addup-view')
      },
      goBack() {
        this.visible = false;
      },
      patenFlagChange(){
        if(this.ruleForm.PATENTFLAG == '1'){
          this.rules.PATENTBEGINDATE.required = true;
          this.rules.PATENTENDDATE.required = true;
        }else{
          this.rules.PATENTBEGINDATE.required = false;
          this.rules.PATENTENDDATE.required = false;
        }
      },
      submitUseIf(res){
        //如果请求不成功则打开按钮限制
        if (!res.success) {
          this.submitFlag = false;
          this.$message.error("保存失败")
        } else {
          this.$message({
            message: "保存成功",
            type: 'success',
            onClose: function () {
              window.location.reload()
            }
          });
        }
      },
      submit() {
        this.patenFlagChange();
        if(this.ruleForm.SOURCE == '0'){
          this.rules.MANUFACTURE.required = false;
        }else{
          this.rules.MANUFACTURE.required = true;
        }

        this.submitFlag = false;
        //0国产1016  1进口+2进口封装1015  1 1006 清值
        switch (this.ruleForm.SOURCE){
          case '0'://国产
            this.fileList['1015'] = [];
            this.fileList['1006'] = [];
            this.ruleForm.MANUFACTURE = '';
            this.ruleForm.JKNUM = '';
            this.ruleForm.JKDATE = '';
            this.ruleForm.AGENCYORGDATE = '';
            break;
          case '1':
            this.fileList['1016'] = [];
            this.ruleForm.PRODUCTIONDATE = '';
            this.ruleForm.GMP = '';
            this.fileList['1016'] = [];
            this.ruleForm.PRODUCTIONNUM = '';
            this.ruleForm.PRODUCTIONDATE = '';
            break;
          case '2':
            this.ruleForm.AGENCYORGDATE = '';
            this.fileList['1016'] = [];
            this.ruleForm.PRODUCTIONNUM = '';
            this.ruleForm.PRODUCTIONDATE = '';
            break;
        }

        let formOne = false;
        let formTwo = false;
        if(this.ruleForm.JYYJ =='1' ){
          this.ruleForm.JYDATE = '';
          this.rules.JYDATE.required =false
        }else{
          this.rules.JYDATE.required =true
        }
        // this.fileList['1017'].splice(0,0);
        // this.fileList['1017'].length?this.filesFlag['1017']=false:this.filesFlag['1017']=true;
        for(let x in  this.fileList){
          this.fileList[x].splice(0,0)
          this.fileList[x].length?this.filesFlag[x]=false:this.filesFlag[x]=true;

        }

        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            formOne = true;
          } else {
           formOne = false;
            return false;
          }
        });

        this.$refs.ruleFormRef.validate((valid) => {
          if (valid) {
            formTwo = true;
          } else {
            formTwo = false;
            return false;
          }
        });
        //  验证不通过 且说明书未上传
        let specFlag = false;
        for(let item in this.filesFlag){
          if(this.filesFlag[item]){
            specFlag = true;
          }else{
            specFlag = false;
          }
        }

        if(!formOne || !formTwo || specFlag){
          this.$message({
            message:'请填写所有必填项',
            type:'warning'
          });
          this.submitFlag = false;
          return;
        }
        if (this.ruleForm.SOURCE == '0') {
          this.ruleForm.MANUFACTURE = this.myOrgName;
        }
        if (this.ruleForm.PATENTFLAG != "1") {
          this.ruleForm.PATENTBEGINDATE = "";
          this.ruleForm.PATENTENDDATE = "";
        }
        /* this.ruleForm.ID == '0' ? insert(this.ruleForm, this.fileList) : update(this.ruleForm, this.fileList);
         this.visible = false;*/
        if (this.ruleForm.ID == '0') {
          insert(this.ruleForm, this.fileList).then(res => {
            this.submitUseIf(res)
          })
        } else {
          update(this.ruleForm, this.fileList).then(res => {
            this.submitUseIf(res)
          })
        }

      },
      handleChooseFiles(refName) {
        const tis = this;
        tis.dialogVisible = true;
        this.$nextTick(() => {
          this.$refs.chooseFiles.initData(refName);
        })
      },
      selectedData(res) {
        console.log('res=========', res)
        res.data.forEach(function (item) {
          this.fileList[res.refName].push(item)
        }.bind(this));
      },
      upLoadImgIdList(res) {
        this.fileList[res.refName] = res.data;
        for(let item in this.filesFlag){
          if(res.refName == item){
            if(res.data.length > 0){
              this.filesFlag[item] = false
            }else{
              this.filesFlag[item] = true
            }
          }
        }
        console.log('this.filesFlag1111111111111',this.filesFlag)
      },
      gmpFileChange(){
        let id = this.ruleForm.GMP
        for (let x in this.gmpList) {
          if (this.gmpList[x]['ID'] == id) {
            this.ruleForm.GMPFILE = this.gmpList[x]['FILEIDS'] == undefined ? [] : this.gmpList[x]['FILEIDS'];
          }
        }
      },
      tipValChange(refName){
        this.$nextTick(()=>{
          let errorParentNode = this.$refs[refName].$el.childNodes[1];
          let erroTipNode =errorParentNode.childNodes[1]
          if(this.ruleForm.JYYJ === '1' && errorParentNode && erroTipNode.className =='el-form-item__error'){
            erroTipNode.style.display = 'none'
            this.rules.JYDATE.required = false;
          }else if(this.ruleForm.JYYJ === '0' && errorParentNode && erroTipNode.className =='el-form-item__error'){
            erroTipNode.style.display = 'block'
            this.rules.JYDATE.required = true;
          }
        })
      },
      formValeChange(){
        if(!this.ruleForm.JYDATE){
          this.$refs.jydateValue.focus();
          this.rules.JYYJ.required = false;
        }
      }
    },
    watch: {
      visible(newVal){
        let vieNode = document.getElementById('product-addup-view-box');
        if (vieNode) {
          if (newVal == false) {
            vieNode.onscroll = null;
            this.removeFixed('product-addup-view-side')
          } else {
            vieNode.onscroll = function () {
              this.dialogBoxScroll(vieNode, 'jump-pro-addup-view', 'product-addup-view-side')
            }.bind(this)
          }
        }
      }
    },
    mounted(){
      let vieNode = document.getElementById('product-addup-view-box');
      if (vieNode) {
        vieNode.onscroll = function () {
          this.dialogBoxScroll(vieNode, 'jump-pro-addup-view', 'product-addup-view-side')
        }.bind(this)
      }
    }
  }
</script>

<style>
  @import "../../../../assets/css/auditchanges.css";

</style>
