<template>
  <el-dialog
    width="70%"
    :close-on-click-modal="false"
    :visible.sync="visible"
    title="产品信息举报"
    append-to-body
  >
  <div>

    <!-- 表格 -->
    <!--<div class="main">-->
          <el-form ref="dataForm" :model="dataForm" :rules="dataRule" @keyup.enter.native="submit()" label-width="160px" size="small" label-position="left">
            <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item label="产品名称">
                    <span>{{ruleForm.PRODUCT}}</span>
                    <a class="blue" size="small" @click="findProductMessage(id)">查看产品信息</a>
                  </el-form-item>
                </el-col>
              <el-col :span="12">
                <el-form-item label="剂型">
                  <span>{{ruleForm.DOSAGE}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
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
            <el-row :gutter="24">
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
            <el-row :gutter="24">
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
            <el-row :gutter="24" v-if="ruleForm.PRICETYPE != '2'">
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
            <el-row :gutter="24" v-if="ruleForm.PRICETYPE == '1'">
              <el-col :span="12">
                <el-form-item label="计算方法" prop="METHOD">
                  <span>{{ruleForm.METHOD}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <a class="audit-declare-a">查看取值方法</a>
              </el-col>
            </el-row>
            <el-row :gutter="24" v-if="ruleForm.PRICETYPE == '1'">
              <el-col :span="12">
                <el-form-item label="计算价格" prop="CALCULATEPRICE">
                  <span>{{ruleForm.CALCULATEPRICE}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24" v-if="ruleForm.PRICETYPE == '1'">
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


            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="举报类型" prop="content">
                    <el-radio v-model="dataForm.TYPE" label="0">基础信息举报</el-radio>
                    <el-radio v-model="dataForm.TYPE" label="1">价格信息举报</el-radio>
                    <el-radio v-model="dataForm.TYPE" label="2">附加信息举报</el-radio>
                    <el-radio v-model="dataForm.TYPE" label="3">其他</el-radio>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="举报内容" prop="CONTENT">
                  <el-input type="textarea" :rows = "3" v-model="dataForm.CONTENT" placeholder="请输入举报内容" class="w70"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="举报附件:">
                  <!--<el-button >上传图片</el-button>-->
                  <upload-button :buttonFlag="btnText" :fileListFlag='fromUploadIdList' :fileType="fileType"
                                 @uploadList="getUploadList"></upload-button>
                  <images-preview :refName="btnText" ref="imagesPreview" :imgIdListUnUnique="fromUploadIdList"
                                  @imgIdListChange="uploadList"></images-preview>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      <!--</div>-->
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="goBack" >关闭</el-button>
      <el-button type="primary" @click="submit()">提交</el-button>
    </span>
    <find-product-message ref="findProductMessage"></find-product-message>
  </el-dialog>
</template>
<script>
import findProductMessage from './findProductMessage'
import {findProductDetailById} from 'src/axios/auditchanges/infoshow/productInfoShow'
import {insertReport} from 'src/axios/auditchanges/messageReportManager/messageReport/productReport'
import imagesPreview from 'src/pages/auditchanges/common/imagesPreview'
import uploadButton from 'src/pages/auditchanges/common/uploadButton'

  export default {
    components: {
      findProductMessage,
      imagesPreview,
      uploadButton
    },
    data() {
      return {
        visible: false,
        id: '',
        btnText: 'fileInput',
        fileType: '1',
        fromUploadIdList: [],
        finalUploadIdList: [],
        dataForm: this.metaDataForm(),
        dataRule: this.metaRule(),
        ruleForm:''
      }
    },
    created () {
    },
    methods: {
      metaDataForm(){
        return{
          "CONTENT":'',
          "FILEPATH":'',
          "TYPE":'0'
        }
      },
      metaRule() {
        return {
          CONTENT: [
            { required: true, message: '举报内容不能为空', trigger: 'blur' }
            /*{ min: 1, max:10, message: '菜单名称长度大于1小于10', trigger: 'blur' }*/
          ],
        }
      },
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
      fillData(id) {
        this.id = id;
        this.visible = true;
        findProductDetailById(id).then(res =>{
          //走查询当前产品详情
          this.ruleForm = res.data;
        })
      },
      getUploadList(res) {
        res.data.forEach(function (item) {
          this.fromUploadIdList.push(item)
        }.bind(this))
      },
      uploadList(res) {
          this.fromUploadIdList = res.data
      },
      submit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {

            this.$confirm('确认举报不可修改，是否确定完成此操作?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.dataForm.PRODUCTID = this.id
              insertReport(this.dataForm,this.fromUploadIdList)
             /* this.goBack();*/
              this.$router.go(-1)
            })

          }
        })
      },
      goBack() {
        this.visible = false;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
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


