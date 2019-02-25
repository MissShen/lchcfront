<template>
  <el-dialog
    title="产品变更公示"
    :close-on-click-modal="false"
    :visible.sync="visible"
    class="audit-dialog"
    id="product-declare-view-box"
    append-to-body
  >
    <div v-if="visible">
      <div>
        <div class="main audit-main">
          <ul class="side side-init" id="product-declare-view-side">
            <li v-for="(item,index) in nodesPosition" :key="index"><a @click="changeScrollHeight(item.nodePosition,'product-declare-view-box','jump-pro-declare-view',index)"
                   class="d_jump jump-pro-declare-view">{{item.itemName}}</a></li>
          </ul>
          <div class="right-box">
            <product-info-detail id="product-declare-view" ref="productInfoDetail"></product-info-detail>
          </div>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
       <el-button type="primary" :disabled="submitFlag" @click="handleForm('form')">保存</el-button>
       <el-button @click="goBack">返回</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import productInfoDetail from 'src/pages/auditchanges/common/productInfoDetail'
  import {
    changeAdd,
    deleteQuestion,
    selectFieldById,
    findQuestionFileById
  } from 'src/axios/auditchanges/messagePublicity/productPublicity'
  import {
    findProductById,
    queryProductChangeAfter,
    findAttachedFiles,
    findChangeAttachedFile
  } from 'src/axios/auditchanges/messageChanges/productChange'
  import {checkControl}from 'src/axios/auditchanges/common/nestedJson'
  import {
    checkJydate,
    returnAnnex,
    returnAnnexFile,
    returnDataAnnex,
    selectControl
  } from 'src/axios/auditchanges/common/catProduct'
  import {boxScroll} from 'src/components/mixins/scrolls'
  export default {
    mixins:[boxScroll],
    components: {
      productInfoDetail
    },
    data() {
      return {
        visible: false,
        dataForm: this.metaDataForm(),
        showForm: this.metaShowForm(),
        changeForm: this.metaChangeForm(),
        submitFlag: false,//提交按钮是否可用
        auditForm: {},
        flagForm: {},
        fileForm: this.metaFileForm(),
        rules: {
          AUDITSTATE: {required: true, message: '审核结果不能为空', trigger: 'blur'}
        },
        nodesPosition: [
          {itemName: '基础信息', nodePosition: null, itemAbb: 'cpjc'},
          {itemName: '说明书信息', nodePosition: null, itemAbb: 'sms'},
          {itemName: '项目附加信息', nodePosition: null, itemAbb: 'xmfj'}
        ],
        annex: {},
        attachedFileList: {}
      };
    },
    created () {

    },
    methods: {
      metaDataForm() {
        return {
          ID: '', /*产品ID*/
          PRODUCT: '', /*产品名称*/
          TRADE: '', /*商品名*/
          DOSAGE: '', /*剂型*/
          SPEC: '', /*规格*/
          STANDRATE: '', /*转换比*/
          METRIC: '', /*单位*/
          WRAP: '', /*包材*/
          MANUFACTURE: '', /*生产企业*/
          STANDARDCODE: '', /*本位码*/
          SOURCE: '', /*产品来源*/
          FZORG: '', /*分装企业*/
          UNIT: '', /*最小使用单位*/
          PERMITNUMBER: '', /*批准文号*/
          SWRAP: '', /*中包装*/
          BWRAP: '', /*大包装*/
          JYNUM: '', /*药品检验报告编号*/
          JYDATE: '', /*药品检验报告有效期*/
          JYYJ: '', /*永久有效*/
          JKNUM: '', /*进口药品注册证编号(进口/进口分装)*/
          JKDATE: '', /*有效期至(进口/进口分装)*/
          AGENCYORGDATE: '', /*代理授权书有效期至(进口)*/
          PRODUCTIONNUM: '', /*国产药品批件编号*/
          PRODUCTIONDATE: '', /*国产药品批件编号有效期*/
          GMP: '', /*GMP证书编号(国产/进口分装)*/
          PATENTFLAG: '', /*是否专利保护*/
          PATENTBEGINDATE: '', /*专利保护开始时间*/
          PATENTENDDATE: '', /*专利保护结束时间*/
          STANDRD: '', /*药品质量标准*/
          PROTECTIONFLAG: '', /*是否中药保护*/
          USEUNIT: '', /*用法用量*/
          USEMIN: '', /*每次使用量最小值*/
          USEMAX: '', /*每次使用量最大值*/
          NUMMIN: '', /*每日次数最小值*/
          AVENUM: '', /*平均日用量*/
          MAXIMUN: '', /*每次使用极量*/
          TREATMENT: '', /*疗程*/
          SPECIFICATION: ''/*说明书*/
          // attached: [{
          //   /*附加信息数组*/
          //   dicName: "测试1", /*字段组名称*/
          //   options: [{
          //     type: "1", /*字段类型*/
          //     label: "值1",
          //     value: "值1", /*值*/
          //     imageFlag: 1, /*是否有图*/
          //   }]
          // }]
        }
      },
      metaShowForm() {
        return {
          QUERYFLAG: true, /*公示质疑标识(质疑+上传文件)*/
          CHANGEFLAG: true, /*变更标识*/
          ID: '', /*产品ID*/
          PRODUCT: '', /*产品名称*/
          TRADE: '', /*商品名*/
          DOSAGE: '', /*剂型*/
          SPEC: '', /*规格*/
          STANDRATE: '', /*转换比*/
          METRIC: '', /*单位*/
          WRAP: '', /*包材*/
          MANUFACTURE: '', /*生产企业*/
          STANDARDCODE: '', /*本位码*/
          SOURCE: '', /*产品来源*/
          FZORG: '', /*分装企业*/
          UNIT: '', /*最小使用单位*/
          PERMITNUMBER: '', /*批准文号*/
          SWRAP: '', /*中包装*/
          BWRAP: '', /*大包装*/
          JYNUM: '', /*药品检验报告编号*/
          JYDATE: '', /*药品检验报告有效期*/
          JYYJ: '', /*永久有效*/
          JKNUM: '', /*进口药品注册证编号(进口/进口分装)*/
          JKDATE: '', /*有效期至(进口/进口分装)*/
          AGENCYORGDATE: '', /*代理授权书有效期至(进口)*/
          PRODUCTIONNUM: '', /*国产药品批件编号*/
          PRODUCTIONDATE: '', /*国产药品批件编号有效期*/
          GMP: '', /*GMP证书编号(国产/进口分装)*/
          PATENTFLAG: '', /*是否专利保护*/
          PATENTBEGINDATE: '', /*专利保护开始时间*/
          PATENTENDDATE: '', /*专利保护结束时间*/
          STANDRD: '', /*药品质量标准*/
          PROTECTIONFLAG: '', /*是否中药保护*/
          USEUNIT: '', /*用法用量*/
          USEMIN: '', /*每次使用量最小值*/
          USEMAX: '', /*每次使用量最大值*/
          NUMMIN: '', /*每日次数最小值*/
          AVENUM: '', /*平均日用量*/
          MAXIMUN: '', /*每次使用极量*/
          TREATMENT: '', /*疗程*/
          SPECIFICATION: '', /*说明书*/
          attached: [{
            /*附加信息数组*/
            dicName: "测试1", /*字段组名称*/
            options: [{
              type: "1", /*字段类型*/
              label: "值1",
              value: "值1", /*值*/
              imageFlag: 1, /*是否有图*/
            }]
          }]
        }
      },
      metaFileForm(){
        return {
          PRODUCT: [], /*产品名称*/
          TRADE: [], /*商品名*/
          DOSAGE: [], /*剂型*/
          SPEC: [], /*规格*/
          STANDRATE: [], /*转换比*/
          METRIC: [], /*单位*/
          WRAP: [], /*包材*/
          MANUFACTURE: [], /*生产企业*/
          STANDARDCODE: [], /*本位码*/
          SOURCE: [], /*产品来源*/
          FZORG: [], /*分装企业*/
          UNIT: [], /*最小使用单位*/
          PERMITNUMBER: [], /*批准文号*/
          SWRAP: [], /*中包装*/
          BWRAP: [], /*大包装*/
          JYNUM: [], /*药品检验报告编号*/
          JYDATE: [], /*药品检验报告有效期*/
          JYYJ: [], /*永久有效*/
          JKNUM: [], /*进口药品注册证编号(进口/进口分装)*/
          JKDATE: [], /*有效期至(进口/进口分装)*/
          AGENCYORGDATE: [], /*代理授权书有效期至(进口)*/
          PRODUCTIONNUM: [], /*国产药品批件编号*/
          PRODUCTIONDATE: [], /*国产药品批件编号有效期*/
          GMP: [], /*GMP证书编号(国产/进口分装)*/
          PATENTFLAG: [], /*是否专利保护*/
          PATENTBEGINDATE: [], /*专利保护开始时间*/
          PATENTENDDATE: [], /*专利保护结束时间*/
          STANDRD: [], /*药品质量标准*/
          PROTECTIONFLAG: [], /*是否中药保护*/
          USEUNIT: [], /*用法用量*/
          USEMIN: [], /*每次使用量最小值*/
          USEMAX: [], /*每次使用量最大值*/
          NUMMIN: [], /*每日次数最小值*/
          AVENUM: [], /*平均日用量*/
          MAXIMUN: [], /*每次使用极量*/
          TREATMENT: [], /*疗程*/
          SPECIFICATION: []/*说明书*/
        }
      },
      metaChangeForm() {
        return {
          QUERYFLAG: true, /*公示质疑标识(质疑+上传文件)*/
          CHANGEFLAG: true, /*变更标识*/
          STANDARDCODE: '', /*本位码标识*/
          TRADE: '', /*商品名*/
          UNIT: '', /*最小使用单位标识*/
          PERMITNUMBER: '', /*批准文号标识*/
          SWRAP: '', /*中包装标识*/
          BWRAP: '', /*大包装标识*/
          JYNUM: '', /*药品检验报告编号标识*/
          JYDATE: '', /*药品检验报告有效期标识*/
          JYYJ: '', /*永久有效标识*/
          JKNUM: '', /*进口药品注册证编号(进口/进口分装)标识*/
          JKDATE: '', /*有效期至(进口/进口分装)标识*/
          AGENCYORGDATE: '', /*代理授权书有效期至(进口)标识*/
          PRODUCTIONNUM: '', /*国产药品批件编号标识*/
          PRODUCTIONDATE: '', /*国产药品批件编号有效期标识*/
          GMP: '', /*GMP证书编号(国产/进口分装)标识*/
          PATENTCHANGE: '', /*是否专利保护标识*/
          PATENTBEGINDATE: '', /*专利保护开始时间标识*/
          PATENTENDDATE: '', /*专利保护结束时间标识*/
          STANDRD: '', /*药品质量标准标识*/
          PROTECTIONCHANGE: '', /*是否中药保护标识*/
          USEUNIT: '', /*用法用量标识*/
          USEMIN: '', /*每次使用量最小值标识*/
          USEMAX: '', /*每次使用量最大值标识*/
          NUMMIN: '', /*每日次数最小值标识*/
          AVENUM: '', /*平均日用量标识*/
          MAXIMUN: '', /*每次使用极量标识*/
          TREATMENT: '', /*疗程标识*/
          SPECIFICATION: ''/*说明书标识*/
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
      list(productId, upProductId) {
//        变更公示
//        this.showForm.CHANGEFLAG=true;
//        this.showForm.QUERYFLAG=true;
//        this.showForm
//        this.changeForm//变更后数据
//        this.dataForm//质疑数据
        this.visible = true;
        this.$nextTick(async () => {
          await findProductById(productId).then(res => {
            res.data.ID = upProductId
            res.data.PRODUCTID = productId;
            res.data.QUERYFLAG = true;
            res.data.CHANGEFLAG = true;
            this.showForm = res.data;
          })
          await queryProductChangeAfter(upProductId).then(res => {
            this.changeForm = res.data;
          })
          await selectFieldById(upProductId).then(res => {
            if (res.data.JYDATE != undefined) {
              let jyDate = res.data.JYDATE;
              let jyValue = jyDate.split(",");
              res.data.JYDATE = jyValue[0]
              res.data.JYYJ = jyValue[1]
            } else {
              res.data.JYYJ = "";
            }
            this.dataForm = res.data
          })
          await findQuestionFileById(upProductId).then(res => {
            if (res.data != undefined) {
              for (let x in res.data) {
                this.fileForm[x] = res.data[x]
              }
            } else {
              this.fileForm = this.metaFileForm()
            }
          })
          let changeFile = await findChangeAttachedFile(this.showForm.ID)
          this.annex = returnAnnex(this.showForm.ATTACHED, this.dataForm, this.changeForm);
          let findAttachedFilesObj = await findAttachedFiles(productId)
          this.attachedFileList = returnAnnexFile(findAttachedFilesObj.data, this.fileForm, changeFile.data);
          await this.$refs.productInfoDetail.list(this.showForm, this.dataForm, this.changeForm, this.flagForm, this.auditForm, this.fileForm, this.annex, this.attachedFileList);
          /**
           * 查询设置锚点位置
           * */
          //恢复初始状态
          this.removeClassCurrent('jump-pro-declare-view')[0].classList.add('current');
          this.getNodesHeight('product-declare-view')
        })
      },
      submitUseIf(res){
        //如果请求不成功则打开按钮限制
        if (!res.success) {
          this.submitFlag = false;
          this.$message.error("提交失败")
        } else {
          this.$message({
            message: "提交成功",
            type: 'success',
            onClose: function () {
              window.location.reload()
            }
          })
        }
      },
      // 提交用户表单
      handleForm () {
        this.submitFlag = true;
        let controlData = this.$refs.productInfoDetail.controlData;
        let check = selectControl(controlData);
        if (!check) {
          this.$message({
            message: '请选择质疑项',
            type: 'warning'
          });
          this.submitFlag = false;
          return;
        }

        check = checkJydate(controlData, this.dataForm);
        if (!check) {
          this.$message({
            message: '请填写所有质疑项',
            type: 'warning'
          });
          this.submitFlag = false;
          return;
        }
        let att = returnDataAnnex(this.annex)
        for (let x in att) {
          this.dataForm[x] = att[x]
        }
//        check = checkControl(this.dataForm,controlData);
//        if(!check) {
//          this.$message({
//            message: '请填写所有质疑项',
//            type: 'warning'
//          });
//          return;
//        }
        let fileForm = this.$refs.productInfoDetail.fileForm;
        for (let x in this.attachedFileList.dataFile) {
          fileForm[x] = this.attachedFileList.dataFile[x]
        }
        deleteQuestion(this.showForm.ID)
        changeAdd(this.dataForm, this.showForm.ID, fileForm).then(res => {
          this.submitUseIf(res)
        })
      },
      goBack() {
        this.visible = false;
      }
    },
    watch: {
      visible(newVal){
        let vieNode = document.getElementById('product-declare-view-box');
        if(vieNode){
          if (newVal == false) {
            vieNode.onscroll = null;
            this.removeFixed('product-declare-view-side')
          } else {
            vieNode.onscroll = function () {
              this.dialogBoxScroll(vieNode, 'jump-pro-declare-view', 'product-declare-view-side')
            }.bind(this)
          }
        }
      }
    },
    mounted(){
      let vieNode = document.getElementById('product-declare-view-box');
      if(vieNode){
        vieNode.onscroll = function () {
          this.dialogBoxScroll(vieNode, 'jump-pro-declare-view', 'product-declare-view-side')
        }.bind(this)
      }
    }
  }
</script>
<style>
  @import "../../../../assets/css/auditchanges.css";
</style>
