<template>
  <el-dialog
    title="产品申报详情"
    :close-on-click-modal="false"
    :visible.sync="visible"
    class="audit-dialog"
    append-to-body
    id="product-view-box"
  >
    <div v-if="visible">
    <div>
      <div class="main audit-main">
        <ul class="side side-init" id="product-view-side">
          <li v-for="(nodeItem,index) in nodesPosition" :key="index"><a
            @click="changeScrollHeight(nodeItem.nodePosition,'product-view-box','jump-pro-view',index)"
            class="d_jump jump-pro-view">{{nodeItem.itemName}}</a></li>
        </ul>
        <!--<div class="scroll-content">-->
        <div class="right-box">
          <product-info-detail id="product-view" ref="productInfoDetail"></product-info-detail>
          <div class="audit-info">
            <el-form ref="showForm" label-width="140px" size="small" label-position="left" class="demo-form-inline" :inline="true">
            <h3 id="jgxx-pro-view" v-show="showForm.SHOWFLAG">产品价格信息</h3>
              <el-row :gutter="24">
                <el-col :span="24">
                  <el-form-item label="目录范围">
                    <span>{{showForm.CATALOGAREANAME}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            <div v-if="showForm.CATALOGAREA == '0' || showForm.CATALOGAREA == '1'">
              <el-row :gutter="24" v-if="showForm.SHOWFLAG">
                <el-col :span="24">
                  <el-form-item label="价格类型">
                    <span>{{{'0':'全国最低中标价','1':'计算价格','2':'无最低中标价'}[showForm.PRICETYPE]}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24" v-if="(showForm.SHOWFLAG && showForm.PRICETYPE == '0') || (showForm.SHOWFLAG && showForm.PRICETYPE == '1')">
                <el-col :span="12">
                  <el-form-item label="年度">
                    <span>
                      {{showForm.YEAR}}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="省份" >
                  <span>
                      {{showForm.PROVINCE}}
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24" v-if="showForm.SHOWFLAG">
                <el-col :span="12" v-if="showForm.PRICETYPE == '0' || showForm.PRICETYPE == '1'">
                  <el-form-item label="项目名称">
                    <span>{{showForm.PROJECTNAME}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12" v-if="showForm.PRICETYPE == '0'">
                  <el-form-item label="中标价" >
                    <span>{{showForm.PRICE}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12" v-if="showForm.PRICETYPE == '1'">
                  <el-form-item label="代表品装量规格" >
                    <span>{{showForm.REPRESENTATIVESPEC}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24" v-if="showForm.PRICETYPE == '1' && showForm.SHOWFLAG">
                <el-col :span="12" >
                  <el-form-item label="代表品价格" >
                    <span>{{showForm.REPRESENTATIVEPRICE}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12" >
                  <el-form-item label="代表品装量包装" >
                    <span>{{showForm.REPRESENTATIVEPACKAGING}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24" v-if="showForm.PRICETYPE == '1' && showForm.SHOWFLAG">
                <el-col :span="12">
                  <el-form-item label="计算方法" prop="TREATMENT">
                    <span>
                      {{showForm.METHOD}}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <a src="">查看取值方法</a>
                </el-col>
              </el-row>
              <el-row :gutter="24" v-if="showForm.PRICETYPE == '1' && showForm.SHOWFLAG">
                <el-col :span="24">
                  <el-form-item label="计算价格">
                    <span >{{showForm.CALCULATEPRICE}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24" v-if="showForm.PRICETYPE == '1' && showForm.SHOWFLAG">
                <el-col :span="24">
                  <el-form-item label="备注" >
                    <span type="textarea" :rows="3" >{{showForm.REMARK}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24" v-if="showForm.SHOWFLAG">
              <el-col :span="24" v-if="showForm.PRICETYPE == '0'">
                <el-form-item label="执行日期">
                  <span>{{showForm.EXECUTIONDATE}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            </div>

              <div v-if="showForm.CATALOGAREA == '2' || showForm.CATALOGAREA == '3'">
                <el-row :gutter="24">
                  <el-col :span="9">
                    <el-form-item  label="日服用折算价格：">
                      <span>{{showForm.DISCOUNTPRICE}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col class="marbottom15" :span="12" >
                    <span>京津冀三地报价</span>
                  </el-col>
                </el-row>
                <el-row :gutter="5" v-for="(item,index) in threeProvincePrice" :key="index">
                  <el-col :span="5">
                    <el-form-item class="acc-price-label" label="省份：">
                      <span>{{item.PROVINCENAME}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item class="acc-price-label" label="项目名称：">
                      <span>{{item.PROJECTNAME}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item class="acc-price-label" label="中标价：">
                      <span>{{item.PRICE}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item class="acc-price-label" label="执行日期：">
                      <span>{{item.EXECUTIONDATE}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

              <div v-if="showForm.CATALOGAREA == '4' || showForm.CATALOGAREA == '5'"></div>

            <el-row :gutter="24" v-if="showForm.SHOWFLAG && (showForm.CATALOGAREA != '4' && showForm.CATALOGAREA != '5')">
              <span>项目名称应包括项目年度和省份名称，请按照各省公布的标准项目录名称录入。   最低价请如实、谨慎填写，注意不同规格包装间的合理比价关系！</span>
            </el-row>
              <div class="tableset" v-show="this.checkFlag">
                <h3 id="shxx-pro-view">审核信息</h3>
                <el-table
                  :data="this.checkRecording"
                  border
                  stripe>
                  <el-table-column label="审核人">
                    <template slot-scope="scope">
                      <span>{{scope.row.CHECKNAME}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="审核时间">
                    <template slot-scope="scope">
                      <span>{{scope.row.CHECKDATE}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="审核结果">
                    <template slot-scope="scope">
                      <span>{{scope.row.CHECKRESULT}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="审核备注">
                    <template slot-scope="scope">
                      <span>{{scope.row.CHECKREMARK}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-form>
          </div>
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
  import {findProductInfoById,findAttachedFiles} from 'src/axios/auditchanges/messageDeclare/product'
  import productInfoDetail from 'src/pages/auditchanges/common/productInfoDetail'
  import{queryCheckRecording}from 'src/axios/auditchanges/auditManage/productDeclareAudit'
  import {checkJydate, returnAnnex, returnAnnexFile, returnDataAnnex} from 'src/axios/auditchanges/common/catProduct'
  import {boxScroll} from "src/components/mixins/scrolls"
  export default {
    mixins:[boxScroll],
    components:{
      productInfoDetail
    },
    data() {
      return {
        visible:false,
        showForm:this.metaShowForm(),
        checkRecording:[],
        checkFlag:false,
        nodesPosition: [
          {itemName: '基础信息', nodePosition: null, itemAbb: 'cpjc'},
          {itemName: '说明书信息', nodePosition: null, itemAbb: 'sms'},
          {itemName: '价格信息', nodePosition: null, itemAbb: 'xmfj'},
          {itemName: '项目附加信息', nodePosition: null, itemAbb: 'jgxx'},
          {itemName: '审核信息', nodePosition: null, itemAbb: 'shxx'}
        ],
        annex: {},
        attachedFileList:{},
        threeProvincePrice:this.threeProvincePriceInit()
      };
    },
    created () {
    },
    methods: {
      threeProvincePriceInit(){
        return [
          {
            PROVINCENAME:'北京',
            PROVINCE:'',
            PROJECTNAME:'',
            PRICE:'',
            EXECUTIONDATE:''
          },
          {
            PROVINCENAME:'天津',
            PROVINCE:'',
            PROJECTNAME:'',
            PRICE:'',
            EXECUTIONDATE:''
          },
          {
            PROVINCENAME:'河北省',
            PROVINCE:'',
            PROJECTNAME:'',
            PRICE:'',
            EXECUTIONDATE:''
          }
        ]
      },
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
          }],
          CATALOGAREA:'',
        }
      },
      list(id) {
//        申报详情
//        this.showForm.SHOWFLAG=true;
//        this.showForm
          this.visible = true;
        findProductInfoById(id).then(res => {
            this.showForm = res.data;
          console.log('res.data========',res.data)
          this.showForm.ID = id;
          this.showForm.SHOWFLAG = true;
          res.data.THREEPRICE?this.threeProvincePrice = res.data.THREEPRICE:this.threeProvincePrice = this.threeProvincePriceInit();

          this.$nextTick( async () => {
            this.annex = returnAnnex(this.showForm.ATTACHED);
            let findAttachedFilesObj =  await findAttachedFiles(id)
            this.attachedFileList = returnAnnexFile(findAttachedFilesObj.data);
            console.log(this.attachedFileList)
            this.$refs.productInfoDetail.list(this.showForm,{},{},{},{},{},this.annex,this.attachedFileList);
             setTimeout(function () {
               /**
                * 查询设置锚点位置
                * */
               //恢复初始状态
               this.removeClassCurrent('jump-pro-view')[0].classList.add('current');
               this.getNodesHeight('product-view','shxx-pro-view','jgxx-pro-view')
             }.bind(this),0)
          })
        })
      },
      copy(id){
        //复制的详情
        //需要展示审核记录
        this.list(id)
        this.checkFlag = true;
        this.checkRecording = [];
        queryCheckRecording(id,'0').then(res =>{
          this.checkRecording = res.data
        })
      },
      goBack() {
        this.visible = false;
      }
    },
    watch:{
      visible(newVal){
        let vieNode = document.getElementById('product-view-box');
        if(vieNode){
          if(newVal == false){
            vieNode.onscroll = null;
            this.removeFixed('product-view-side')
          }else{
            vieNode.onscroll = function () {
              this.dialogBoxScroll(vieNode,'jump-pro-view','product-view-side')
            }.bind(this)
          }
        }
      }
    },
    mounted(){
      let vieNode = document.getElementById('product-view-box');
      if(vieNode){
        vieNode.onscroll = function () {
          this.dialogBoxScroll(vieNode,'jump-pro-view','product-view-side')
        }.bind(this)
      }
    }
  }
</script>
<style>
 @import "../../../../assets/css/auditchanges.css";
</style>
