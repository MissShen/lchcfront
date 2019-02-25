<template>
  <el-dialog
    custom-class="w80"
    title="产品变更"
    :close-on-click-modal="false"
    :visible.sync="visible"
    append-to-body
    class="audit-dialog"

    id="product-change-view-box"
  >
    <div>
      <div class="main audit-main">
        <ul class="side side-init" id="product-change-view-side">
          <li v-for="(nodeItem,index) in nodesPosition" :key="index"><a @click="changeScrollHeight(nodeItem.nodePosition,'product-change-view-box','jump-pro-change-view',index)"
                 class="d_jump jump-pro-change-view">{{nodeItem.itemName}}</a></li>
        </ul>
        <div class="right-box">
          <product-info-detail id="product-change-view" ref="productInfoDetail"></product-info-detail>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" type="primary" :disabled="submitFlag" @click="submit">保存</el-button>
      <el-button size="small" @click="goBack">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import productInfoDetail from 'src/pages/auditchanges/common/productInfoDetail'
  import {
    findProductById,
    queryProductChange,
    insertProductChange,
    updateProductChange,
    findAttachedFiles,
    findChangeAttachedFile
  } from 'src/axios/auditchanges/messageChanges/productChange'
  import {
    checkJydate,
    returnAnnex,
    returnAnnexFile,
    returnDataAnnex,
    selectControl
  } from 'src/axios/auditchanges/common/catProduct'
  import {checkControl} from 'src/axios/auditchanges/common/nestedJson'
  import {boxScroll} from 'src/components/mixins/scrolls'

  export default {
    mixins:[boxScroll],
    components: {
      productInfoDetail
    },
    data() {
      return {
        visible: false,
        upProductId: '',
        dataForm: {},
        showForm: this.metaShowForm(),
        submitFlag: false,//提交按钮是否可用
        changeForm: {},
        auditForm: {},
        flagForm: {},
        nodesPosition:[
          {itemName: '基础信息', nodePosition: null, itemAbb: 'cpjc'},
          {itemName: '说明书信息', nodePosition: null, itemAbb: 'sms'},
          {itemName: '项目附加信息', nodePosition: null, itemAbb: 'xmfj'}
        ],
        annex: {},
        productId: '',
        attachedFileList: {},
        copyFlag:false
      };
    },
    created() {
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
        }
      },
      metaShowForm() {
        return {
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
          SPECIFICATION: ''/*说明书*/
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
      list(productId, upProductId,copyFlag) {
        this.copyFlag = copyFlag;
        this.productId = productId;
//        产品变更
//        this.showForm.CHANGEFLAG=true;
//        this.showForm
//        this.dataForm//变更数据
        this.$nextTick(async () => {
          this.visible = true;
          await findProductById(productId).then(res => {
            if (res.success) {
              res.data.CHANGEFLAG = true;
              res.data.ID = upProductId;
              res.data.PRODUCTID = productId;
              res.data.change = false;
              this.showForm = res.data;
            } else {
              this.$message.error(res.message);
            }
          })
          let changeFile = {}
          if (upProductId != undefined) {
            await queryProductChange(upProductId).then(res => {
              if (!res.data.JYYJ) {
                res.data.JYYJ = "";
              }
              this.dataForm = res.data;
            })
            changeFile = await findChangeAttachedFile(this.showForm.ID)
          } else {
            this.$set(this.dataForm, "JYYJ", "");
          }
          this.annex = await returnAnnex(this.showForm.ATTACHED, this.dataForm);
          let findAttachedFilesObj = await findAttachedFiles(productId)
          this.attachedFileList = await returnAnnexFile(findAttachedFilesObj.data, changeFile.data);

          this.$refs.productInfoDetail.list(this.showForm, this.dataForm, {}, {}, {}, {}, this.annex, this.attachedFileList);
          setTimeout(function () {
            /**
             * 查询设置锚点位置
             * */
            //恢复初始状态
            this.removeClassCurrent('jump-pro-change-view')[0].classList.add('current');
            this.getNodesHeight('product-change-view')
          }.bind(this),0)
        })
      },
      goBack() {
        this.visible = false;
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
          })
        }
      },
      submit() {
        this.submitFlag = true;
        let controlData = this.$refs.productInfoDetail.controlData;
        let check = selectControl(controlData);
        if (!check) {
          this.$message({
            message: '请选择变更项',
            type: 'warning'
          });
          this.submitFlag = false;
          return;
        }
        let fileData = this.$refs.productInfoDetail.changeFileList;
        check = checkJydate(controlData, this.dataForm);
        if (!check) {
          this.$message({
            message: '请填写所有变更项',
            type: 'warning'
          });
          this.submitFlag = false;
          return;
        }
        let att = returnDataAnnex(this.annex, true)
        let numExp = /.+(\d)\$$/ig;
        let attachedControlData = {};
        for (let i in controlData) {
          if (numExp.test(i)) {
            numExp.lastIndex=0
            this.$set(attachedControlData, i, controlData[i]);
            delete controlData[i];
          }
        }
        check=checkControl(att,attachedControlData);
        check = checkControl(this.dataForm, controlData);
        if (!check) {
          this.$message({
            message: '请填写所有变更项',
            type: 'warning'
          });
          this.submitFlag = false;
          return;
        }
        if (this.showForm.ID) {
          this.$set(this.dataForm, "ID", this.showForm.ID)
        }
        this.$set(this.dataForm, "PRODUCTID", this.showForm.PRODUCTID);
        if (!this.dataForm.ID || this.copyFlag) {
          insertProductChange(this.dataForm, fileData, att, this.$refs.productInfoDetail.attachedFileList.dataFile).then(res => {
            this.submitUseIf(res)
          })
        } else {
            updateProductChange(this.dataForm, fileData, att, this.$refs.productInfoDetail.attachedFileList.dataFile).then(res => {
              this.submitUseIf(res)
            })
        }
      }
    },
    watch: {
      visible(newVal) {
        let vieNode = document.getElementById('product-change-view-box');
        if(vieNode){
          if (newVal == false) {
            vieNode.onscroll = null;
            this.removeFixed('product-change-view-side')
          } else {
            vieNode.onscroll = function () {
              this.dialogBoxScroll(vieNode, 'jump-pro-change-view', 'product-change-view-side')
            }.bind(this)
          }
        }
      }
    },
    mounted() {
      let vieNode = document.getElementById('product-change-view-box');
      if(vieNode){
        vieNode.onscroll = function () {
          this.dialogBoxScroll(vieNode, 'jump-pro-change-view', 'product-change-view-side')
        }.bind(this)
      }
    }
  }
</script>
<style>
  @import "../../../../assets/css/auditchanges.css";
</style>
