<template>
  <el-dialog
    custom-class="w80"
    :close-on-click-modal="false"
    :visible.sync="visible"
    append-to-body
    title="价格申报信息质疑详情"
    class="audit-dialog"
  >
  <div>
    <!-- 表格 -->
    <div class="audit-main">
          <el-form ref="ruleForm" :model="dataForm" label-width="230px" size="small" label-position="left">
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="产品名称">
                  <span>{{ruleForm.PRODUCT}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="剂型">
                  <span>{{ruleForm.DOSAGE}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="商品名">
                  <span>{{ruleForm.TRADE}}</span>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="转换比">
                  <span>{{ruleForm.STANDRATE}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="规格">
                  <span>{{ruleForm.SPEC}}</span>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="单位">
                  <span>{{ruleForm.METRIC}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="包材">
                  <span>{{ruleForm.WRAP}}</span>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="生产企业">
                  <span>{{ruleForm.MANUFACTURE}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="价格类型" prop="PRICETYPE">
                  <span>{{{"0":"全国最低中标价","1":"计算价格","2":"无最低中标价"}[ruleForm.PRICETYPE]}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="ruleForm.PRICETYPE != '2'">
              <el-col :span="12">
                <el-form-item label="年度" prop="YEAR">
                  <span>{{ruleForm.YEARID}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="省份" prop="PROVINCE">
                  <span>{{ruleForm.PROVINCEID}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12" v-if="ruleForm.PRICETYPE!='2'">
                <el-form-item label="项目名称" prop="PROJECTNAME">
                  <span>{{ruleForm.PROJECTNAME}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="ruleForm.PRICETYPE == '0'">
                <el-form-item label="中标价" prop="PRICE">
                  <span>{{ruleForm.INPRICE}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12" class="audit-declare-label" v-if="ruleForm.PRICETYPE == '1'">
                <el-form-item class="audit-declare-label" label="代表品装量规格" prop="REPRESENTATIVESPEC">
                  <span>{{ruleForm.REPRESENTATIVESPEC}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24" v-if="ruleForm.PRICETYPE == '1'">
              <el-col :span="12" >
                <el-form-item label="代表品价格" prop="REPRESENTATIVEPRICE">
                  <span>{{ruleForm.REPRESENTATIVEPRICE}}</span>
                  <span>{{ruleForm.REPRESENTATIVEMETRIC}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12" class="audit-declare-label" >
                <el-form-item class="audit-declare-label" label="代表品装量包装" prop="REPRESENTATIVEPACKAGING">
                  <span>{{ruleForm.REPRESENTATIVEPACKAGING}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="ruleForm.PRICETYPE == '1'">
              <el-col :span="12">
                <el-form-item label="计算方法" prop="METHOD">
                  <span>{{ruleForm.COMPUTATIONALMETHOD}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <a class="audit-declare-a">查看取值方法</a>
              </el-col>
            </el-row>
            <el-row v-if="ruleForm.PRICETYPE == '1'">
              <el-col :span="12">
                <el-form-item label="计算价格" prop="CALCULATEPRICE">
                  <span>{{ruleForm.CALCULATEPRICE}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="ruleForm.PRICETYPE == '1'">
              <el-col :span="12">
                <el-form-item label="备注" prop="REMARK">
                  <span>{{ruleForm.REMARK}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12" v-if="ruleForm.PRICETYPE == '0'">
                <el-form-item label="执行日期" prop="EXECUTIONDATE">
                  <span>{{ruleForm.EXECUTIONDATE}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                  <el-form-item :label="getChn(dataForm.QUESTIONFIELD)">
                    <span>{{value}}</span>
                  </el-form-item>
                </el-col>
              <el-col :span="12">
                <el-form-item label="回复时间">
                  <span>{{dataForm.REPLYDATE}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="质疑内容">
                  <span>{{dataForm.QUESTIONEDITVAL}}</span>
                  <images-preview ref="imagesPreview" :imgIdListUnUnique="dataForm.FILEIDS ? dataForm.FILEIDS.split(',') : []"
                                  :operate="false"></images-preview>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="回复内容">
                  <span>{{dataForm.CONTENT}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    <find-product-message ref="findProductMessage"></find-product-message>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" type="warning" @click="findProductMessage(id)">查看产品信息</el-button>
      <el-button size="small" @click="goBack" >关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
import findProductMessage from './findProductMessage'
import {findDoubtById} from 'src/axios/auditchanges/messageDoubt/productDoubt'
import {getJsonChn} from 'src/axios/auditchanges/common/catProduct'
import {findProductDetailById} from 'src/axios/auditchanges/messageDoubt/priceDoubt'
import {queryPROVINCE} from 'src/axios/auditchanges/messageDeclare/product'
import imagesPreview from 'src/pages/auditchanges/common/imagesPreview'
export default {
    components: {
      findProductMessage,
      imagesPreview
    },
    data() {
      return {
        visible:false,
        value:'',
        id:'',
        dataForm:{},
        ruleForm:{
          questionField:'中包装数量',
          PRODUCTFLAG:'123',
          ID:undefined,
          PRODUCT:'123',
          TRADE:undefined,
          DOSAGE:'123',
          SPEC:undefined,
          STANDRATE:undefined,
          METRIC:undefined,
          WARP:undefined,
          MANUFACTURE:undefined,
          STANDARDCODE:undefined,
          SOURCE: 2,
          UNIT:undefined,
          PERMITNUMBER:undefined,
          SWRAP:undefined,
          BWRAP:undefined,
          JYNUM:undefined,
          JYDATE:undefined,
          JYYJ:undefined,
          IMPORTNUM:undefined,
          IMPORTDATE:undefined,
          AGENCYORGDATE:undefined,
          PRODUCTIONNUM:undefined,
          PRODUCTIONDATE:undefined,
          IMPORTNUM:undefined,
          IMPORTDATE:undefined,
          GMP:undefined,
          PATENTFLAG:undefined,
          PATENTDATE:undefined,
          PATENTDATE:undefined,
          STANDRD:undefined,
          PROTECTIONFLAG:undefined,
          USEUNIT:undefined,
          USEMIN:undefined,
          USEMAX:undefined,
          AVENUM:undefined,
          MAXIMUN:undefined,
          PRICETYPE:'1',
          attached: [{
            dicName: "测试1",
            options: [{
              type: "1",
              label: "值1",
              value: "值1",
              imageFlag: 1,
            },{
              type: "2",
              label: "值2",
              value: "值2",
              imageFlag: 1,
            },{
              type: "3",
              label: "值3",
              value: "值3",
              imageFlag: 0,
            },],
          },{
            dicName: "测试2",
            options: [{
              type: "1",
              label: "值4",
              value: "值4",
              imageFlag: 1,
            },{
              type: "2",
              label: "值5",
              value: "值5",
              imageFlag: 0,
            },],
          }],
          TREATMENT:undefined
        },
        provinceList:[]
      };
    },
    created () {

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
      list() {

      },
      async fillData(id,qtID) {
        this.id = id;
        this.visible = true;
        await findDoubtById(qtID).then(res => {
          if(res.data.QUESTIONFIELD == 'provinceId'){
            queryPROVINCE().then(x =>{
              this.provinceList = x.data
              for (let k in x.data){
                if(x.data[k].ID == res.data.QUESTIONEDITVAL){
                  res.data.QUESTIONEDITVAL = x.data[k].NAME_CHN
                }
              }
            })
          }
          this.dataForm = res.data;
        })
        await findProductDetailById(id).then(res =>{
          //走查询当前产品详情
          this.value = res.data[this.dataForm.QUESTIONFIELD.toLocaleUpperCase()]
          this.ruleForm = res.data;
        })

      },
      goBack() {
        this.visible = false;
      },
      findProductMessage(id){
        this.$nextTick(() => {
          this.$refs.findProductMessage.list(id)
        })
      },getChn(field){
        return getJsonChn(field)
      }
    }
  }
</script>
<!--<style>
  .side{
    position: absolute;
    width: 150px;
    margin: 0;
    padding: 0;
  }
  .side > li > a{
    display: block;
    margin:20px 0;
    padding-left:15px;
    border-right:4px solid #fff;
    line-height:20px;
    cursor:pointer;
    font-size:14px;
    color:#333;
  }
  .side > li > a.current{
    display: block;
    border-right:4px solid #333;
    font-size:16px;
    cursor:default;
  }
  .scroll-content{
    margin-left: 150px;
    margin-bottom: 20px;
    width: 100%;
    border-left: 1px solid #e6e6e6;
  }
  .el-input__inner {
    width:300px !important;
  }
  .el-textarea__inner{
    width:300px !important;
  }
  .fundInput .el-input__inner,fundInput .el-input&#45;&#45;suffix{
    width:140px !important;
  }
  .icon-center{
    vertical-align: middle;
    line-height: 32px;
  }
  .btn-mar{
    display: block;
    margin:20px 0 20px 100px;
  }
  .el-dialog {
    width: 80% !important;
  }
</style>-->
