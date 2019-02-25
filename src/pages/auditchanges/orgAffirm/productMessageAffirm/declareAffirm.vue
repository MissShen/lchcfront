<template>
  <el-dialog
    custom-class="w80"
    title="产品申报确认"
    :close-on-click-modal="false"
    :visible.sync="visible"
    append-to-body
    class="audit-dialog"
    id="product-affirm-view-box"
  >
    <div v-if="visible">
      <div class="main audit-main">
        <ul class="side side-init" id="product-affirm-view-side">
          <li v-for="(item,index) in nodesPosition" :key="index"><a @click="changeScrollHeight(item.nodePosition,'product-affirm-view-box','jump-pro-affirm-view',index)"
                 class="d_jump  jump-pro-affirm-view">{{item.itemName}}</a></li>
        </ul>
        <div class="right-box">
          <product-info id="product-affirm-view" ref="productInfo"></product-info>
          <div class="audit-info">
            <el-form :model="dataForm" ref="showForm" :rules="rules" label-width="125px" size="small"
                     label-position="left">
              <h3 id="affirm-jgxx">产品价格信息</h3>
              <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item label="价格类型" class="audit-declare-radio" prop="PRICETYPE">
                    {{{"0":"全国最低中标价","1":"计算价格","2":"无最低中标价"}[showForm.PRICETYPE]}}
                    <span v-if="auditForm.PRICETYPE"><br/>审核后:{{{"0":"全国最低中标价","1":"计算价格","2":"无最低中标价"}[auditForm.PRICETYPE]}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="showForm.PRICETYPE != '2'">
                <el-col :span="12">
                  <el-form-item label="年度" prop="YEAR">
                    <span>{{showForm.YEAR}}</span>
                    <span v-if="auditForm.YEAR"><br/>审核后:{{auditForm.YEAR}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="省份" prop="PROVINCE">
                    <span>{{showForm.PROVINCE}}</span>
                    <span v-if="auditForm.PROVINCE"><br/>审核后:{{auditForm.PROVINCE}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="12" v-if="showForm.PRICETYPE!='2'">
                  <el-form-item label="项目名称" prop="PROJECTNAME">
                    <span>{{showForm.PROJECTNAME}}</span>
                    <span v-if="auditForm.PROJECTNAME"><br/>审核后:{{auditForm.PROJECTNAME}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="audit-hit-box" v-if="showForm.PRICETYPE == '0'">
                  <el-form-item label="中标价" prop="PRICE">
                    <span>{{showForm.PRICE}}</span>
                    <span v-if="auditForm.PRICE"><br/>审核后:{{auditForm.PRICE}}</span>
                  </el-form-item>
                </el-col>
                <el-col class="audit-declare-label" :span="12" v-if="showForm.PRICETYPE == '1'">
                  <el-form-item class="audit-declare-label" label="代表品装量规格" prop="REPRESENTATIVESPEC">
                    <span>{{showForm.REPRESENTATIVESPEC}}</span>
                    <span v-if="auditForm.REPRESENTATIVESPEC"><br/>审核后:{{auditForm.REPRESENTATIVESPEC}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24" v-if="showForm.PRICETYPE == '1'">
                <el-col :span="12">
                  <el-form-item label="代表品价格" prop="REPRESENTATIVEPRICE">
                    <span>{{showForm.REPRESENTATIVEPRICE}}</span>
                    <span v-if="auditForm.REPRESENTATIVEPRICE"><br/>审核后:{{auditForm.REPRESENTATIVEPRICE}}</span>
                    <span>{{showForm.REPRESENTATIVEMETRIC}}</span>
                    <span v-if="auditForm.REPRESENTATIVEMETRIC"><br/>审核后:{{auditForm.REPRESENTATIVEMETRIC}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="audit-declare-label">
                  <el-form-item class="audit-declare-label" label="代表品装量包装" prop="REPRESENTATIVEPACKAGING">
                    <span>{{showForm.REPRESENTATIVEPACKAGING}}</span>
                    <span v-if="auditForm.REPRESENTATIVEPACKAGING"><br/>审核后:{{auditForm.REPRESENTATIVEPACKAGING}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="showForm.PRICETYPE == '1'">
                <el-col :span="12">
                  <el-form-item label="计算方法" prop="METHOD">
                    <span>{{showForm.METHOD}}</span>
                    <span v-if="auditForm.METHOD"><br/>审核后:{{auditForm.METHOD}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <a class="audit-declare-a">查看取值方法</a>
                </el-col>
              </el-row>
              <el-row v-if="showForm.PRICETYPE == '1'">
                <el-col :span="12">
                  <el-form-item label="计算价格" prop="CALCULATEPRICE">
                    <span>{{showForm.CALCULATEPRICE}}</span>
                    <span v-if="auditForm.CALCULATEPRICE"><br/>审核后:{{auditForm.CALCULATEPRICE}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="showForm.PRICETYPE == '1'">
                <el-col :span="12">
                  <el-form-item label="备注" prop="REMARK">
                    <span>{{showForm.REMARK}}</span>
                    <span v-if="auditForm.REMARK"><br/>审核后:{{auditForm.REMARK}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="12" v-if="showForm.PRICETYPE == '0'">
                  <el-form-item label="执行日期" prop="EXECUTIONDATE">
                    <span>{{showForm.EXECUTIONDATE}}</span>
                    <span v-if="auditForm.EXECUTIONDATE"><br/>审核后:{{auditForm.EXECUTIONDATE}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <span>项目名称应包括项目年度和省份名称，请按照各省公布的标准项目录名称录入。   最低价请如实、谨慎填写，注意不同规格包装间的合理比价关系！</span>
              </el-row>
            </el-form>
          </div>

        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
       <el-button size="small" type="primary" :disabled="submitFlag" @click="affirm">确认</el-button>
       <el-button size="small" type="danger" :disabled="submitFlag" @click="refuse">拒绝</el-button>
       <el-button size="small" @click="goBack">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>

  import productInfo from 'src/pages/auditchanges/common/productInfoDetail'
  import {
    findProductDetailById,
    selectQueryFieldById,
    updaterefuse,
    insert
  } from 'src/axios/auditchanges/orgAffirm/productAffirm'
  import {findAttachedFiles} from 'src/axios/auditchanges/messageDeclare/product'
  import {returnAnnexFile, returnAnnex} from 'src/axios/auditchanges/common/catProduct'
  import {boxScroll} from 'src/components/mixins/scrolls'
  export default {
    mixins:[boxScroll],
    components: {
      productInfo
    },
    data() {
      return {
        productId: '',
        visible: false,
        auditForm: this.metaAuditForm(),
        showForm: this.metaShowForm(),
        submitFlag: false,//提交按钮是否可用
        nodesPosition:[
          {itemName: '基础信息', nodePosition: null, itemAbb: 'cpjc'},
          {itemName: '说明书信息', nodePosition: null, itemAbb: 'sms'},
          {itemName: '项目附加信息', nodePosition: null, itemAbb: 'xmfj'},
          {itemName: '价格信息', nodePosition: null, itemAbb: 'jgxx'},
        ],
        attachedFileList: {},
        annex: {}
      };
    },
    created () {

    },
    methods: {
      metaShowForm() {
        return {
          AFFIRMFLAG: true, /*确认标识*/
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
      metaAuditForm() {
        return {
          PRODUCT: '', /*产品名称标识*/
          TRADE: '', /*商品名标识*/
          DOSAGE: '', /*剂型标识*/
          SPEC: '', /*规格标识*/
          STANDRATE: '', /*转换比标识*/
          METRIC: '', /*单位标识*/
          WRAP: '', /*包材标识*/
          MANUFACTURE: '', /*生产企业标识*/
          STANDARDCODE: '', /*本位码标识*/
          SOURCE: '', /*产品来源标识*/
          FZORG: '', /*分装企业标识*/
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
          PATENTFLAG: '', /*是否专利保护标识*/
          PATENTBEGINDATE: '', /*专利保护开始时间标识*/
          PATENTENDDATE: '', /*专利保护结束时间标识*/
          STANDRD: '', /*药品质量标准标识*/
          PROTECTIONFLAG: '', /*是否中药保护标识*/
          USEUNIT: '', /*用法用量标识*/
          USEMIN: '', /*每次使用量最小值标识*/
          USEMAX: '', /*每次使用量最大值标识*/
          NUMMIN: '', /*每日次数最小值标识*/
          AVENUM: '', /*平均日用量标识*/
          MAXIMUN: '', /*每次使用极量标识*/
          TREATMENT: '', /*疗程标识*/
          SPECIFICATION: '', /*说明书标识*/
        }
      },
      list(id) {
        this.productId = id;
        /*id='DATA00000000000000354658'*/
//        申报确认
//        this.showForm.AFFIRMFLAG=true
//        this.showForm
//        this.auditForm//审核后数据
        this.visible = true;
        findProductDetailById(id).then(res => {
          this.showForm = res.data;
          this.showForm.ID = id;
          selectQueryFieldById(id).then(res => {
            this.auditForm = res.data;
            this.showForm.AFFIRMFLAG = true;
            this.annex = returnAnnex(this.showForm.ATTACHED, {}, {}, this.auditForm);
            let findAttachedFilesObj = findAttachedFiles(id)
            this.attachedFileList = returnAnnexFile(findAttachedFilesObj.data);
            this.$nextTick(() => {
              this.$refs.productInfo.list(this.showForm, {}, {}, {}, this.auditForm, {}, this.annex, this.attachedFileList);
              /**
               * 查询设置锚点位置
               * */
              //恢复初始状态
              this.removeClassCurrent('jump-pro-affirm-view')[0].classList.add('current');
              this.getNodesHeight('product-affirm-view',undefined,'affirm-jgxx')
            })
          })
        })

      },
      goBack() {
        this.visible = false;
      },
      submitUseIf(res){
        //如果请求不成功则打开按钮限制
        if (!res.success) {
          this.submitFlag = false;
          this.$message.error(res.message)
        } else {
          this.$message({
            message: res.message,
            type: 'success',
            onClose: function () {
              window.location.reload()
            }
          })
        }
      },
      refuse() {
        this.submitFlag = true;
        updaterefuse(this.productId).then(res => {
          res.success ? res.message = "拒绝成功" : res.message = "拒绝失败"
          this.submitUseIf(res)
        })
      },
      affirm() {
        this.submitFlag = true;
        insert(this.productId).then(res => {
          res.success ? res.message = "确认成功" : res.message = "确认失败"
          this.submitUseIf(res)
        })
      }
    },
    watch: {
      visible(newVal){
        let vieNode = document.getElementById('product-affirm-view-box');
        if(vieNode){
          if (newVal == false) {
            vieNode.onscroll = null;
            this.removeFixed('product-affirm-view-side')
          } else {
            vieNode.onscroll = function () {
              this.dialogBoxScroll(vieNode, 'jump-pro-affirm-view', 'product-affirm-view-side')
            }.bind(this)
          }
        }
      }
    },
    mounted(){
      let vieNode = document.getElementById('product-affirm-view-box');
      if(vieNode){
        vieNode.onscroll = function () {
          this.dialogBoxScroll(vieNode, 'jump-pro-affirm-view', 'product-affirm-view-side')
        }.bind(this)
      }
    }
  }
</script>
<style>
  @import "../../../../assets/css/auditchanges.css";
</style>
