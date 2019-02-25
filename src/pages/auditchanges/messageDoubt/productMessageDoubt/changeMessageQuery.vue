<template>
  <el-dialog
    custom-class="w80"
    :close-on-click-modal="false"
    :visible.sync="visible"
    append-to-body
    title="产品变更信息质疑详情"
  >
  <div>
    <!-- 表格 -->
    <div class="audit-main">
          <el-form ref="ruleForm" label-width="100px" size="small" label-position="left">
            <el-form-item :label="getChn(ruleForm.QUESTIONFIELD)">
              <span>变更前:{{this.value}}</span>
              <span><br/>变更后:{{this.changeValue}}</span>
            </el-form-item>
            <el-form-item label="回复时间">
              <span>{{ruleForm.REPLYDATE}}</span>
            </el-form-item>
            <el-form-item label="质疑内容">
              <span>{{ruleForm.QUESTIONEDITVAL}}</span>
              <images-preview ref="imagesPreview" :imgIdListUnUnique="ruleForm.FILEIDS ? ruleForm.FILEIDS.split(',') : []"
                              :operate="false"></images-preview>
            </el-form-item>
            <el-form-item label="回复内容">
              <span>{{ruleForm.CONTENT}}</span>
            </el-form-item>
          </el-form>
        </div>
      </div>
    <findChangeProductMessage ref="findChangeProductMessage"></findChangeProductMessage>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" type="warning" @click="findProductMessage(id)">查看产品信息</el-button>
      <el-button size="small" @click="goBack" >关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
import findChangeProductMessage from './findChangeProductMessage'
import {findDoubtById,findValueByField} from 'src/axios/auditchanges/messageDoubt/productDoubt'
import {queryProductChange} from 'src/axios/auditchanges/messageChanges/productChange'
import {getJsonChn} from 'src/axios/auditchanges/common/catProduct'
import imagesPreview from 'src/pages/auditchanges/common/imagesPreview'
  export default {
    components: {
      findChangeProductMessage,
      imagesPreview
    },
    data() {
      return {
        visible:false,
        value:'',
        changeValue:'',
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
        }
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
      getChn(field){
        return getJsonChn(field)
      },
      fillData(id,qtID,upProductId) {
        this.id = id;
        this.visible = true;
        findDoubtById(qtID).then(res => {
          this.ruleForm = res.data;
          findValueByField(upProductId,this.ruleForm.QUESTIONFIELD).then(res =>{
            this.value = res.data;
          })
        })
        queryProductChange(upProductId).then(res =>{
          //走查询当前变更产品详情
          this.changeValue = res.data[this.ruleForm.QUESTIONFIELD]
        })

      },
      goBack() {
        this.visible = false;
      },
      findProductMessage(id){
        this.$nextTick(() => {
          this.$refs.findChangeProductMessage.list(id)
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
