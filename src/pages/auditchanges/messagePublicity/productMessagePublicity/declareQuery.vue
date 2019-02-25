<template>
  <el-dialog
    custom-class="w80"
    title="产品公示"
    :close-on-click-modal="false"
    :visible.sync="visible"
    append-to-body
    class="audit-dialog"
    id="product-query-box"

  >
    <div v-if="visible">
      <!--<div>-->
      <div class="main audit-main">
        <ul class="side side-init" id="product-query-side">
          <li
            v-for="(item,index) in nodesPosition"
            :key="index">
            <a @click="changeScrollHeight(item.nodePosition,'product-query-box','jump-product-query',index)"
               class="d_jump jump-product-query">{{item.itemName}}</a></li>
        </ul>
        <div class="right-box">
          <product-info id="product-query-view" ref="productInfo"></product-info>
        </div>
      </div>
      <!--</div>-->
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" :disabled="submitFlag" @click="handleForm()">提交</el-button>
      <el-button @click="goBack">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import productInfo from 'src/pages/auditchanges/common/productInfoDetail'
  import {findAttachedFiles} from 'src/axios/auditchanges/messageDeclare/product'
  import {
    findProductDetailById,
    declareAdd,
    deleteQuestion,
    selectFieldById,
    findQuestionFileById
  } from 'src/axios/auditchanges/messagePublicity/productPublicity'
  import {
    checkJydate,
    returnAnnex,
    returnAnnexFile,
    returnDataAnnex,
    selectControl
  }from 'src/axios/auditchanges/common/catProduct'
  import{checkControl} from 'src/axios/auditchanges/common/nestedJson'
  import {boxScroll} from 'src/components/mixins/scrolls'
  export default {
    mixins:[boxScroll],
    components: {
      productInfo
    },
    data() {
      return {
        visible: false,
        dataForm: this.metaDataForm(),
        showForm: this.metaShowForm(),
        changeForm: {},
        auditForm: {},
        flagForm: {},
        fileForm: this.metaFileForm(),
        submitFlag: false,//提交按钮是否可用
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
          SPECIFICATION: ''/*,说明书*/
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
        let anchor = this.$el.querySelector(selector)
        document.body.scrollTop = anchor.offsetTop; // chrome
        document.documentElement.scrollTop = anchor.offsetTop; // firefox
      },
      list(id) {
//        申报公示
//        this.showForm.QUERYFLAG=true;
//        this.showForm
//        this.dataForm//质疑数据
        this.visible = true;
        //查询产品详情
        this.dataForm = this.metaDataForm();
        this.showForm = this.metaShowForm();
        this.$nextTick(async () => {
          await findProductDetailById(id).then(res => {
            this.showForm = res.data
            this.showForm.QUERYFLAG = true;
            this.showForm.ID = id;
          })
          await selectFieldById(id).then(res => {
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
          await findQuestionFileById(id).then(res => {
            if (res.data != undefined) {
              this.fileForm = res.data
            } else {
              this.fileForm = this.metaFileForm()
            }
          })

          this.annex = returnAnnex(this.showForm.ATTACHED, this.dataForm);
          let findAttachedFilesObj = await findAttachedFiles(id)
          this.attachedFileList = returnAnnexFile(findAttachedFilesObj.data, this.fileForm);
          await this.$refs.productInfo.list(
            this.showForm,
            this.dataForm,
            this.changeForm,
            this.flagForm,
            this.auditForm,
            this.fileForm,
            this.annex,
            this.attachedFileList
          );

          /**
           * 查询设置锚点位置
           * */
          //恢复初始状态
          this.removeClassCurrent('jump-product-query')[0].classList.add('current');
          this.getNodesHeight('product-query-view')
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
        let controlData = this.$refs.productInfo.controlData;
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
        check = checkControl(this.dataForm, controlData);
        if (!check) {
          this.$message({
            message: '请填写所有质疑项',
            type: 'warning'
          });
          this.submitFlag = false;
          return;
        }
        let fileForm = this.$refs.productInfo.fileForm;
        for (let x in this.attachedFileList.dataFile) {
          fileForm[x] = this.attachedFileList.dataFile[x]
        }
        deleteQuestion(this.showForm.ID)
        declareAdd(this.dataForm, this.showForm.ID, fileForm).then(res => {
          this.submitUseIf(res)
        })
      },
      goBack() {
        this.visible = false;
      }
    },
    watch: {
      visible(newVal){
        let vieNode = document.getElementById('product-query-box');
        if (vieNode) {
          if (newVal == false) {
            this.removeFixed('product-query-side')
            vieNode.onscroll = null;
          } else {
            vieNode.onscroll = function () {
              this.dialogBoxScroll(vieNode, 'jump-product-query', 'product-query-side')
            }.bind(this)
          }
        }
      }
    },
    mounted() {
      let vieNode = document.getElementById('product-query-box');
      if (vieNode) {
        vieNode.onscroll = function () {
          this.dialogBoxScroll(vieNode, 'jump-product-query', 'product-query-side')
        }.bind(this)
      }
    }
  }
</script>
<style>
  @import "../../../../assets/css/auditchanges.css";
</style>
