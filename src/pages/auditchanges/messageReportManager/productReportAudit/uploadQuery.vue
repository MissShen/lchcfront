<template>
  <el-dialog
    width="70%"
    :close-on-click-modal="false"
    :visible.sync="visible"
    append-to-body
    title="产品举报处理"
    class="audit-dialog"
  >
  <div>
    <!-- 表格 -->
    <!--<div class="main audit-main">-->
          <el-form ref="ruleForm" :model="dataForm" label-width="130px" size="small" label-position="left">
            <el-row>
                <el-col :span="12">
                  <el-form-item label="产品名称">
                    <span>{{ruleForm.PRODUCT}}</span>
                    <a class="blue" @click="findProductMessage(id)">查看产品信息</a>
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
                  <span>{{ruleForm.METHOD}}</span>
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
              <el-col :span="24">
                <el-form-item label="被举报企业">
                  <span>{{dataForm.NAME}}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="举报企业">
                  <span>{{dataForm.ORGNAME}}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="举报时间">
                  <span>{{dataForm.CREATEDATE}}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="举报类型">
                  <span>{{dataForm.REPORTTYPE=='0'?"基础信息举报":dataForm.REPORTTYPE=='1'?"价格信息举报":dataForm.REPORTTYPE=='2'?"附加信息举报":dataForm.REPORTTYPE=='3'?"其他":""}}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="举报内容" prop="content">
                  <span>{{dataForm.CONTENT}}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="举报附件">
                  <images-preview ref="imagesPreview" :imgIdListUnUnique="dataForm.FILEIDS"
                                  :operate="false"></images-preview>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      <!--</div>-->
    <find-product-message ref="findProductMessage"></find-product-message>
    <reject ref="reject"></reject>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" type="success" @click="updatestate" >受理并请企业澄清</el-button>
      <el-button size="small" type="danger" @click="refuse" >拒绝</el-button>
      <el-button size="small" @click="goBack" >关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import {findReportById,update} from 'src/axios/auditchanges/messageReportManager/messageReport/productReport'
  import {findProductDetailById} from 'src/axios/auditchanges/infoshow/productInfoShow'
  import findProductMessage from './findProductMessage'
  import imagesPreview from 'src/pages/auditchanges/common/imagesPreview'
  import reject from './reject'
  export default {
    components: {
      findProductMessage,
      imagesPreview,
      reject
    },
    data() {
      return {
        visible:false,
        id:'',
        reportId:'',
        dataForm:{},
        ruleForm:''
        }

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
      fillData(id,qtID,REPORTID) {
        this.id = id;
        this.reportId = REPORTID;
        this.visible = true;
        findReportById(qtID).then(res => {
          this.dataForm = res.data;
        })
        findProductDetailById(id).then(res =>{
          //走查询当前产品详情
          this.ruleForm = res.data;
        })
      },
      updatestate() {
        update(this.reportId);
        console.log('emit update data')
        this.$emit('update')
        // this.goBack();
        this.visible = false;
      },
      refuse(){
        this.$nextTick(() => {
          this.$refs.reject.fillData(this.reportId)
        })
      },
      goBack() {
        this.visible = false;
      },
      findProductMessage(id){
        this.$nextTick(() => {
          this.$refs.findProductMessage.list(id)
        })
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
