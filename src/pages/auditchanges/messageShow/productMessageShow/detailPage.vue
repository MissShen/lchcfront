<template>
  <el-dialog
    custom-class="w80"
    title="产品信息挂网详情"
    :close-on-click-modal="false"
    :visible.sync="visible"
    class="audit-dialog"
    id="product-declare-view-box"
    append-to-body
  >
    <div v-if="visible">
    <!-- 表格 -->
    <div class="main audit-main">
      <ul class="side side-init" id="product-declare-view-side">
        <li v-for="(item,index) in nodesPosition" :key="index"><a @click="changeScrollHeight(item.nodePosition,'product-declare-view-box','jump-pro-declare-view',index)" class="d_jump jump-pro-declare-view">{{item.itemName}}</a></li>
      </ul>
      <div class="right-box">
        <product-info-detail @listDown="infoDetailDown" id="product-declare-view" ref="productInfoDetail"></product-info-detail>
        <div class="audit-info">
          <el-form ref="showForm"  label-width="160px" size="small" label-position="left">
            <h3 id="pro-show-jgxx">产品价格信息</h3>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="价格类型">
                  <span>{{{"0":"全国最低中标价","1":"计算价格","2":"无最低中标价"}[showForm.PRICETYPE]}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="showForm.PRICETYPE != '2'">
              <el-col :span="12">
                <el-form-item label="年度">
                  <span>{{showForm.YEARID}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="省份">
                  <span>{{showForm.PROVINCEID}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12" v-if="showForm.PRICETYPE!='2'">
                <el-form-item label="项目名称">
                  <span>{{showForm.PROJECTNAME}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="showForm.PRICETYPE == '0'">
                <el-form-item label="中标价">
                  <span>{{showForm.INPRICE}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12" class="audit-declare-label" v-if="showForm.PRICETYPE == '1'">
                <el-form-item class="audit-declare-label" label="代表品装量规格">
                  <span>{{showForm.REPRESENTATIVESPEC}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24" v-if="showForm.PRICETYPE == '1'">
              <el-col :span="12" >
                <el-form-item label="代表品价格">
                  <span>{{showForm.REPRESENTATIVEPRICE}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12" class="audit-declare-label" >
                <el-form-item class="audit-declare-label" label="代表品装量包装">
                  <span>{{showForm.REPRESENTATIVEPACKAGING}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="showForm.PRICETYPE == '1'">
              <el-col :span="12">
                <el-form-item label="计算方法">
                  <span>{{showForm.COMPUTATIONALMETHOD}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <a class="audit-declare-a">查看取值方法</a>
              </el-col>
            </el-row>
            <el-row v-if="showForm.PRICETYPE == '1'">
              <el-col :span="12">
                <el-form-item label="计算价格">
                  <span>{{showForm.CALCULATEPRICE}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="showForm.PRICETYPE == '1'">
              <el-col :span="12">
                <el-form-item label="备注">
                  <span>{{showForm.REMARK}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12" v-if="showForm.PRICETYPE == '0'">
                <el-form-item label="执行日期">
                  <span>{{showForm.EXECUTIONDATE}}</span>
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
      <el-button size="small" @click="goBack">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import {findProductDetailById} from 'src/axios/auditchanges/infoshow/productInfoShow'
  import {findFilesById,returnAnnex,returnAnnexFile} from 'src/axios/auditchanges/common/catProduct'
  import productInfoDetail from 'src/pages/auditchanges/common/productInfoDetail'
  import imagesPreview from 'src/pages/auditchanges/common/imagesPreview'
  import {findAttachedFiles} from'src/axios/auditchanges/messageChanges/productChange'
  import {boxScroll} from 'src/components/mixins/scrolls'
  export default {
    mixins:[boxScroll],
    components:{
      productInfoDetail,imagesPreview
    },
    data() {
      return {
        visible:false,
        showForm:this.metaShowForm(),
        nodesPosition:[
          {itemName: '基础信息', nodePosition: null, itemAbb: 'cpjc'},
          {itemName: '说明书信息', nodePosition: null, itemAbb: 'sms'},
          {itemName: '项目附加信息', nodePosition: null, itemAbb: 'xmfj'},
          {itemName: '价格信息', nodePosition: null, itemAbb: 'jgxx'}
        ],
      };
    },
    created () {
    },
    methods: {
      metaShowForm() {
        return {
          SHOWFLAG:true,/*详情标识*/
          ID:'',/*产品ID*/
          PRODUCT:'',/*产品名称*/
          TRADE:'',/*商品名*/
          DOSAGE:'',/*剂型*/
          SPEC:'',/*规格*/
          STANDRATE:'',/*转换比*/
          METRIC:'',/*单位*/
          WRAP:'',/*包材*/
          MANUFACTURE:'',/*生产企业*/
          STANDARDCODE:'',/*本位码*/
          SOURCE: '',/*产品来源*/
          FZORG:'',/*分装企业*/
          UNIT:'',/*最小使用单位*/
          PERMITNUMBER:'',/*批准文号*/
          SWRAP:'',/*中包装*/
          BWRAP:'',/*大包装*/
          JYNUM:'',/*药品检验报告编号*/
          JYDATE:'',/*药品检验报告有效期*/
          JYYJ:'',/*永久有效*/
          JKNUM:'',/*进口药品注册证编号(进口/进口分装)*/
          JKDATE:'',/*有效期至(进口/进口分装)*/
          AGENCYORGDATE:'',/*代理授权书有效期至(进口)*/
          PRODUCTIONNUM:'',/*国产药品批件编号*/
          PRODUCTIONDATE:'',/*国产药品批件编号有效期*/
          GMP:'',/*GMP证书编号(国产/进口分装)*/
          PATENTFLAG:'',/*是否专利保护*/
          PATENTBEGINDATE:'',/*专利保护开始时间*/
          PATENTENDDATE:'',/*专利保护结束时间*/
          STANDRD:'',/*药品质量标准*/
          PROTECTIONFLAG:'',/*是否中药保护*/
          USEUNIT:'',/*用法用量*/
          USEMIN:'',/*每次使用量最小值*/
          USEMAX:'',/*每次使用量最大值*/
          NUMMIN:'',/*每日次数最小值*/
          AVENUM:'',/*平均日用量*/
          MAXIMUN:'',/*每次使用极量*/
          TREATMENT:'',/*疗程*/
          SPECIFICATION:'',/*说明书*/
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
      list(id) {
//        挂网
//        this.showForm.SHOWFLAG=true;
//        this.showForm

        findProductDetailById(id).then(async res => {
          this.showForm = res.data;
          this.visible = true;
          this.showForm.SHOWFLAG = true;
          this.showForm.ID=id;
          this.annex = await returnAnnex(this.showForm.ATTACHED);
          let findAttachedFilesObj = await findAttachedFiles(id)
          this.attachedFileList = await returnAnnexFile(findAttachedFilesObj.data);
//          this.$nextTick(() => {
            this.$refs.productInfoDetail.list(this.showForm,{},{},{},{},{},this.annex,this.attachedFileList);
          });
//          })
        },
      infoDetailDown(){
        this.$nextTick(()=>{
          /**
           * 查询设置锚点位置
           * */
          //恢复初始状态
          this.removeClassCurrent('jump-pro-declare-view')[0].classList.add('current');
          this.getNodesHeight('product-declare-view',undefined,'pro-show-jgxx')
        })
      },
      goBack() {
        this.visible = false;
      }
      },
    watch:{
      visible(newVal){
        let vieNode = document.getElementById('product-declare-view-box');
        if(vieNode){
          if(newVal == false){
            vieNode.onscroll = null;
            this.removeFixed('product-declare-view-side')
          }else{
            vieNode.onscroll = function () {
              this.dialogBoxScroll(vieNode,'jump-pro-declare-view','product-declare-view-side')
            }.bind(this)
          }
        }
      }
    },
    mounted(){
      let vieNode = document.getElementById('product-declare-view-box');
      if(vieNode){
        vieNode.onscroll = function () {
          this.dialogBoxScroll(vieNode,'jump-pro-declare-view','product-declare-view-side')
        }.bind(this)
      }
    }
  }
</script>
<style>
  @import '../../../../assets/css/auditchanges.css';
</style>
