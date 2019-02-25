<template>
    <div>
    <div class="main">
      <ul class="side side-init" id="side-menu">
        <li><a @click="changeScrollHeight(nodesPosition.cpjc,'jump_item',0)" class="current d_jump jump_item">产品基础信息</a></li>
        <li><a @click="changeScrollHeight(nodesPosition.sms,'jump_item',1)" class="d_jump jump_item">产品说明书信息</a></li>
      </ul>
      <div class="scroll-content">
        <div class="gap-40">

          <el-form id="right-main-box" :model="ruleForm" ref="ruleForm" :rules="rules" label-width="145px" size="small"
                   label-position="left" class="demo-form-inline" :inline="true">
            <h3 class="cpjc">产品基础信息</h3>
            <el-row>
              <el-col :span="12">
                <el-form-item label="产品名称" prop="PRODUCT">
                  <el-input v-model="ruleForm.PRODUCT"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="剂型" prop="DOSAGE">
                  <el-input v-model="ruleForm.DOSAGE"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="商品名" prop="TRADE">
                  <el-input v-model="ruleForm.TRADE"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="转换比" prop="STANDRATE">
                  <el-input v-model="ruleForm.STANDRATE"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="规格" prop="SPEC">
                  <el-input v-model="ruleForm.SPEC"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="单位" prop="METRIC">
                  <el-input v-model="ruleForm.METRIC"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="包材" prop="WRAP">
                  <el-input v-model="ruleForm.WRAP"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="生产企业" prop="MANUFACTURE">
                      <el-input v-model="ruleForm.MANUFACTURE"></el-input>
                      <a @click="produOrgView()">选择</a>
                </el-form-item>
              </el-col>
            </el-row>
            <!--<el-row>-->
              <!--<el-col :span="12">-->
                <!--<el-form-item label="北京地标码" prop="STANDARDCODE">-->
                  <!--<el-input v-model="ruleForm.STANDARDCODE"></el-input>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
            <!--</el-row>-->
            <el-row>
              <el-col :span="12">
                <el-form-item label="产品来源" prop="SOURCE">
                  <el-radio v-model="ruleForm.SOURCE" label="0">国产</el-radio>
                  <el-radio v-model="ruleForm.SOURCE" label="1">进口</el-radio>
                  <el-radio v-model="ruleForm.SOURCE" label="2">进口分装</el-radio>
                </el-form-item>
              </el-col>
              <!-- 进口分装企业，表格只保存生产企业ID，不能同时保存生产企业和分装企业-->
              <!--<el-col :span="12" v-if="ruleForm.SOURCE == '2'">
                <el-form-item label="分装企业" prop="">
                  <el-input></el-input>
                </el-form-item>
              </el-col>-->

            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="最小使用单位" prop="UNIT">
                  <el-input v-model="ruleForm.UNIT"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="ruleForm.SOURCE !='1'">
                <el-form-item label="批准文号" prop="PERMITNUMBER">
                  <el-input v-model="ruleForm.PERMITNUMBER"></el-input>
                </el-form-item>
                <el-row>
                  <el-col :span="24">
                    <span class="audit-check-box preview-btn">
                      <el-button size="small" @click="handleChooseFiles('1088')">选择文件</el-button>
                    </span>
                    <images-preview
                      refName="1088"
                      ref="imagesPreview"
                      :imgIdListUnUnique="fileList['1088']"
                      @imgIdListChange="upLoadImgIdList"></images-preview>
                  </el-col>
                </el-row>

              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="中包装数量" prop="SWRAP">
                      <el-input v-model="ruleForm.SWRAP"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <span class="audit-check-box preview-btn">
                      <el-button size="small" @click="handleChooseFiles('1013')">选择文件</el-button>
                    </span>
                    <images-preview class="" refName="1013" ref="imagesPreview"
                                    :imgIdListUnUnique="fileList['1013']"
                                    @imgIdListChange="upLoadImgIdList"></images-preview>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="大包装数量" prop="BWRAP">
                      <el-input v-model="ruleForm.BWRAP"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <span class="audit-check-box preview-btn">
                      <el-button size="small" @click="handleChooseFiles('1012')">选择文件</el-button>
                    </span>
                    <images-preview class="" refName="1012" ref="imagesPreview"
                                    :imgIdListUnUnique="fileList['1012']"
                                    @imgIdListChange="upLoadImgIdList"></images-preview>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="药品检验报告编号" prop="JYNUM">
                      <el-input v-model="ruleForm.JYNUM"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <span class="audit-check-box preview-btn">
                      <el-button size="small" @click="handleChooseFiles('1014')">选择文件</el-button>
                    </span>
                    <images-preview class="" refName="1014" ref="imagesPreview"
                                    :imgIdListUnUnique="fileList['1014']"
                                    @imgIdListChange="upLoadImgIdList"></images-preview>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-form-item style="margin-bottom: 0!important;" label="有效期至" prop="JYDATE">
                  <el-date-picker type="date" v-model="ruleForm.JYDATE" :disabled="JYDATEDisable"></el-date-picker>
                </el-form-item>
                <el-form-item style="margin-left: 160px" label="永久有效" prop="JYYJ">
                  <el-checkbox true-label="1" false-label="0" v-model="ruleForm.JYYJ" @change="setJYYJ">永久有效</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="ruleForm.SOURCE === '0' ">
              <el-col :span="12">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="国产药品批件编号" prop="PRODUCTIONNUM">
                      <el-input v-model="ruleForm.PRODUCTIONNUM"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <span class="audit-check-box preview-btn">
                      <el-button size="small" @click="handleChooseFiles('1016')">选择文件</el-button>
                    </span>
                    <images-preview class="" refName="1016" ref="imagesPreview"
                                    :imgIdListUnUnique="fileList['1016']"
                                    @imgIdListChange="upLoadImgIdList"></images-preview>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-form-item label="有效期至" prop="PRODUCTIONDATE">
                  <el-date-picker type="date" v-model="ruleForm.PRODUCTIONDATE"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="ruleForm.SOURCE == '1' || ruleForm.SOURCE == '2'">
              <el-col :span="12">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="进口药品注册证编号" prop="JKNUM">
                      <el-input v-model="ruleForm.JKNUM"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <span class="audit-check-box preview-btn">
                      <el-button size="small" @click="handleChooseFiles('1015')">选择文件</el-button>
                    </span>
                    <images-preview class="" refName="1015" ref="imagesPreview"
                                    :imgIdListUnUnique="fileList['1015']"
                                    @imgIdListChange="upLoadImgIdList"></images-preview>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-form-item label="有效期至" prop="JKDATE">
                  <el-date-picker type="date" v-model="ruleForm.JKDATE"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" v-if="ruleForm.SOURCE == '0' || ruleForm.SOURCE == '2'">
                <el-form-item label="GMP证书编号" prop="GMP">
                  <el-select v-model="ruleForm.GMP" placeholder="请选择" @change="gmpFileChange()">
                    <el-option v-for="item in gmpList.options"
                               :key="item.ID"
                               :label="item.CERTIFICATE_NUMBER"
                               :value="item.ID">
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
                    <el-form-item label="代理授权书有效期至" prop="AGENCYORGDATE">
                      <el-date-picker type="date" v-model="ruleForm.AGENCYORGDATE"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <span class="audit-check-box preview-btn">
                      <el-button size="small" @click="handleChooseFiles('1006')">选择文件</el-button>
                    </span>
                    <images-preview class="" refName="1006" ref="imagesPreview"
                                    :imgIdListUnUnique="fileList['1006']"
                                    @imgIdListChange="upLoadImgIdList"></images-preview>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否专利保护" prop="PATENTFLAG">
                  <el-radio v-model="ruleForm.PATENTFLAG" label="1">是</el-radio>
                  <el-radio v-model="ruleForm.PATENTFLAG" label="0">否</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="ruleForm.PATENTFLAG == '1'">
              <el-col :span="12">
                <el-form-item label="专利保护开始时间"  prop="PATENTBEGINDATE">
                  <el-date-picker type="date" v-model="ruleForm.PATENTBEGINDATE" :disabled="patentDisabled"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="专利保护结束时间" prop="PATENTENDDATE">
                  <el-date-picker type="date" v-model="ruleForm.PATENTENDDATE" :disabled="patentDisabled"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="药品质量标准" prop="STANDRD">
                      <el-input v-model="ruleForm.STANDRD"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <span class="audit-check-box preview-btn">
                      <el-button size="small" @click="handleChooseFiles('1018')">选择文件</el-button>
                    </span>
                    <images-preview class="" refName="1018" ref="imagesPreview"
                                    :imgIdListUnUnique="fileList['1018']"
                                    @imgIdListChange="upLoadImgIdList"></images-preview>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否中药保护" prop="PROTECTIONFLAG">
                  <el-radio v-model="ruleForm.PROTECTIONFLAG" label="1">是</el-radio>
                  <el-radio v-model="ruleForm.PROTECTIONFLAG" label="0">否</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
          <h3 class="sms">产品说明书信息</h3>
            <el-row>
              <el-col :span="13">
                <el-form-item label="用法用量" prop="USEUNIT">
                  <el-input class="use-desc-text-area" type="textarea" :rows="3" v-model="ruleForm.USEUNIT"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="每次使用量最小值" prop="USEMIN">
                  <el-input v-model="ruleForm.USEMIN"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="每次使用量最大值" prop="USEMAX">
                  <el-input v-model="ruleForm.USEMAX"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="每日次数最小值" prop="NUMMIN">
                  <el-input v-model="ruleForm.NUMMIN"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="平均日用量" prop="AVENUM">
                  <el-input type="number" v-model.number="ruleForm.AVENUM"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="每次使用极量" prop="MAXIMUN">
                  <el-input v-model="ruleForm.MAXIMUN"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="疗程" prop="TREATMENT">
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
                     <span class="audit-check-box preview-btn">
                      <el-button size="small" @click="handleChooseFiles('1017')">选择文件</el-button>
                    </span>
                <images-preview class="" refName="1017" ref="imagesPreview"
                                :imgIdListUnUnique="fileList['1017']"
                                @imgIdListChange="upLoadImgIdList"></images-preview>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label=" ">
                  <el-button type="primary" @click="submit(`ruleForm`)" size="small">提交</el-button>
                  <el-button size="small" @click="goBack">返回</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </div>
      <choose-files ref="chooseFiles" v-if="dialogVisible" @handleSelectedFolder="selectedData"></choose-files>
      <produOrg v-if="produOrgVisible" ref="ProduOrg" @newProduct="newProduct"></produOrg>
    </div>
</template>
<script>
  import "../../../../../assets/css/datacenter.css";
  import {queryGmpList,insertProduct} from 'src/axios/datacenter/productdata/productinfo/productinfo';
  import chooseFiles from 'src/pages/datacenter/windowPanel/chooseFiles';
  import imagesPreview from 'src/pages/datacenter/windowPanel/imagesPreview';
  import ProduOrg from "../windowPanel/produOrg";
  import {changeToBite} from 'src/utils/validateUtil'

  export default {
    components: {
      chooseFiles,
      imagesPreview,
      ProduOrg,
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
        activeName: 'first',
        myOrgName: '',
        visible: false,
        nodesPosition: {},//保存节点位置
        gmpList: {
          options:undefined,
          value:''
        },
        produOrgVisible:false,
        JYDATEDisable:false,
        patentDisabled:false,
        ruleForm:{
          ID:undefined,
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
          MANUFACTUREID: undefined,
          STANDARDCODE: undefined,
          SOURCE: '0',
          UNIT: undefined,
          PERMITNUMBER: undefined,
          SWRAP: undefined,
          BWRAP: undefined,
          JYNUM: undefined,
          JYDATE: undefined,
          JYYJ: false,
          JKNUM: undefined,
          JKDATE: undefined,
          AGENCYORGDATE: undefined,
          PRODUCTIONNUM: undefined,
          PRODUCTIONDATE: undefined,
          IMPORTNUM: undefined,
          IMPORTDATE: undefined,
          GMP: undefined,
          GMPNUMBER:undefined,
          GMPFILE:[],
          PATENTFLAG: '1',
          PATENTBEGINDATE: undefined,
          PATENTENDDATE: undefined,
          STANDRD: undefined,
          PROTECTIONFLAG: '1',
          USEUNIT: undefined,
          USEMIN: undefined,
          USEMAX: undefined,
          NUMMIN: undefined,
          AVENUM: undefined,
          MAXIMUN: undefined,
          TREATMENT: undefined
        },
        fileList: this.metaFileList(),
        rules: {
          PRODUCT: {required: true, message: '请输入产品名称', trigger: 'blur'},
          TRADE: {required: true, message: '请输入商品名称', trigger: 'blur'},
          DOSAGE: {required: true, message: '请输入剂型', trigger: 'blur'},
          SPEC: {required: true, message: '请输入规格', trigger: 'blur'},
          STANDRATE: {required: true, message: '请输入转换比', trigger: 'blur'},
          METRIC: {required: true, message: '请输入单位', trigger: 'blur'},
          WRAP: {required: true, message: '请输入包材', trigger: 'blur'},
          MANUFACTURE: {required: true, message: '请选择生产企业', trigger: 'blur'},
          STANDARDCODE: {required: true, message: '请输入本位码', trigger: 'blur'},
          SOURCE: {required: true, message: '请输入产品来源', trigger: 'blur'},
          UNIT: {required: true, message: '请输入最小使用单位', trigger: 'blur'},
          PERMITNUMBER: {required: true, message: '请输入批准文号', trigger: 'blur'},
          SWRAP: {required: true, message: '请输入中包装数量', trigger: 'blur'},
          BWRAP: {required: true, message: '请输入大包装数量', trigger: 'blur'},
          JYNUM: {required: true, message: '请输入药品检验报告编号', trigger: 'blur'},
          JKNUM: {required: true, message: '请输入进口药品注册证编号', trigger: 'blur'},
          JKDATE: {required: true, message: '请输入有效期', trigger: 'blur'},
          AGENCYORGDATE: {required: true, message: '请输入代理授权书有效期至', trigger: 'blur'},
          PRODUCTIONNUM: {required: true, message: '请输入国产药品批件编号', trigger: 'blur'},
          PRODUCTIONDATE: {required: true, message: '请输入有效期至', trigger: 'blur'},
          IMPORTNUM: {required: true, message: '请输入进口药品注册证编号', trigger: 'blur'},
          IMPORTDATE: {required: true, message: '请输入有效期至', trigger: 'blur'},
          GMP: {required: true, message: '请输入GMP证书编号', trigger: 'blur'},
          PATENTFLAG: {required: true, message: '请输入是否专利保护', trigger: 'blur'},
          PATENTBEGINDATE: {required: true, message: '请输入专利保护开始时间', trigger: 'blur'},
          PATENTENDDATE: {required: true, message: '请输入专利保护结束时间', trigger: 'blur'},
          STANDRD: {required: true, message: '请输入药品质量标准', trigger: 'blur'},
          PROTECTIONFLAG: {required: true, message: '请输入是否中药保护', trigger: 'blur'},
          USEUNIT: {required: true, validator:checkBite, trigger: 'blur'},
          AVENUM:{type:'number', message: '请输入数字',trigger: 'blur'}
        },
        dialogVisible: false,

      };
    },
    created() {
      this.initialWindow();
    },
    methods: {
      //上传文件里的方法
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      goAnchor(selector) {
        var anchor = this.$el.querySelector(selector)
        document.body.scrollTop = anchor.offsetTop; // chrome
        document.documentElement.scrollTop = anchor.offsetTop; // firefox
      },
      metaFileList(){
        return {
          "1088":[],//批准文号不知道多少先写个1088
          "1013":[],//中包装数量
          "1012":[],//大包装数量
          "1014":[],//药品检验报告
          "1015":[],//进口药品注册证
          "1006":[],//代理授权书
          "1016":[],//国产药品批件
          "1018":[],//药品质量标准
          "1017":[]//说明书
        }
      },
      //  页面初始化
      initialWindow(){

      },
      //  永久有效
      setJYYJ(){
       if(this.ruleForm.JYYJ == 1){
          this.JYDATEDisable=true;
          this.ruleForm.JYDATE=undefined;
        }else{
          this.JYDATEDisable=false;
        }
      },
      //  专利保护日期
      setPatentDate(){
        if(this.ruleForm.PATENTFLAG == 1){
          this.patentDisabled=false;
        }else{
          this.patentDisabled=true;
          this.ruleForm.PATENTBEGINDATE=undefined;
          this.ruleForm.PATENTENDDATE=undefined;
        }
      },
      //  选择生产企业
      produOrgView(name){
        this.produOrgVisible=true;
        this.$nextTick(() => {
          this.$refs.ProduOrg.fillData(name);
      })
      },
      //  生产企业信息处理
      newProduct(product){
        this.ruleForm.MANUFACTURE=product.value.name;
        this.ruleForm.MANUFACTUREID=product.value.id;
        this.initGMP();
      },
      //  GMP初始化
      initGMP(){
        if(this.ruleForm.MANUFACTUREID == undefined){
          confirm("请选择生产企业");
        }else{
          queryGmpList(this.ruleForm.MANUFACTUREID).then(res => {
            var list=res.data;
            var ja=[];
            for(var i=0;i<list.length;i++){
              var jo={};
              jo.ID=list[i].id;
              jo.CERTIFICATE_NUMBER=list[i].certificateNumber;
              ja.push(jo);
            }
            this.gmpList.options=ja;
          })
        }
      },
      //  GMP认证变化
      gmpFileChange(){
        let id = this.ruleForm.GMP
        for(let x in this.gmpList){
          if(this.gmpList[x]['id'] == id){
            this.ruleForm.GMPFILE = this.gmpList[x]['gmpfile'] == undefined?[]:this.gmpList[x]['gmpfile'];
          }
        }
      },
      goBack() {
        this.$router.go(-1);
      },
      submit(form) {
        console.log(this.fileList);
        this.$refs[form].validate((valid) => {
          if(!valid){
            confirm("内容不完整，请完善标准化信息！");
          }else{
            insertProduct(this.ruleForm,this.fileList).then(res => {
              this.$message({
                      message: res.data,
                      type: 'success',
                      duration: 1000,
                      onClose: () => {
                      this.goBack();
                }
              })
            })
          }
        })

      },
      //    上传文件
      handleChooseFiles(refName) {
        const tis = this;
        tis.dialogVisible = true;
        this.$nextTick(() => {
          this.$refs.chooseFiles.initData(refName);
        })
      },
      //  处理选中图片回执信息
      selectedData(res) {
        console.log('res=========',res)
        res.data.forEach(function (item) {
          this.fileList[res.refName].push(item)
        }.bind(this));
      },
      upLoadImgIdList(res) {
        this.fileList[res.refName] = res.data;
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
            if (viewNodeChildeNodes[i].className == 'sms') {
              this.nodesPosition.sms = viewNodeChildeNodes[i].offsetTop
            }
            if (viewNodeChildeNodes[i].className == 'cpjc') {
              this.nodesPosition.cpjc = viewNodeChildeNodes[i].offsetTop
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
        else if (vieNodeScrollTop > this.nodesPosition.sms) {
          this.removeClassCurrent(jumpNodeName)[1].classList.add('current');
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

<!--<style>
  @import "../../../../../assets/css/datacenter.css";

</style>-->
