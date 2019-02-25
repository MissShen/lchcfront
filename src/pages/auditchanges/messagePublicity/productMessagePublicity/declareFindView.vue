<template>
  <el-dialog
    custom-class="w80"
    title="产品公示"
    :close-on-click-modal="false"
    :visible.sync="visible"
    append-to-body
    class="audit-dialog"
    id="product-declare-view-box"
  >
    <div v-if="visible">
    <div class="main audit-main">
      <ul class="side side-init" id="product-declare-view-side">
        <li  v-for="(item,index) in nodesPosition" :key="index"><a @click="changeScrollHeight(item.nodePosition,'product-declare-view-box','jump-pro-declare-view',index)" class="d_jump jump-pro-declare-view">{{item.itemName}}</a></li>
      </ul>
      <div class="right-box">
        <product-info-detail id="product-declare-view" ref="productInfoDetail"></product-info-detail>
      </div>
    </div>
    </div>
    <span slot="footer" class="dialog-footer">
       <el-button size="small" @click="goBack">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import productInfoDetail from 'src/pages/auditchanges/common/productInfoDetail'
  import {findProductDetailById} from 'src/axios/auditchanges/messagePublicity/productPublicity'
  import {findAttachedFiles} from 'src/axios/auditchanges/messageDeclare/product'
  import {returnAnnex,returnAnnexFile} from 'src/axios/auditchanges/common/catProduct'
  import {boxScroll} from 'src/components/mixins/scrolls'
  export default {
    mixins:[boxScroll],
    components:{
      productInfoDetail
    },
    data() {
      return {
        visible:false,
        dataForm:{},
        showForm: this.metaShowForm(),
        flagForm: this.metaFlagForm(),
        changeForm:{},
        auditForm:{},
        nodesPosition: [
          {itemName: '基础信息', nodePosition: null, itemAbb: 'cpjc'},
          {itemName: '说明书信息', nodePosition: null, itemAbb: 'sms'},
          {itemName: '项目附加信息', nodePosition: null, itemAbb: 'xmfj'}
        ],
        annex:{},
        attachedFileList:{}
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
      metaFlagForm() {
        return {
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
//        申报公示详情
//        this.showForm.SHOWFLAG=true;
//        this.showForm
//        this.flagForm//质疑数据
        this.visible = true;
        findProductDetailById(id).then(res =>{
          this.showForm = res.data;
          this.showForm.ID = id;
          this.showForm.SHOWFLAG=true;
          this.annex = returnAnnex(this.showForm.ATTACHED);
          this.$nextTick(async () => {
          let findAttachedFilesObj = await findAttachedFiles(id);
          this.attachedFileList = returnAnnexFile(findAttachedFilesObj.data);
          this.$refs.productInfoDetail.list(this.showForm,this.dataForm,this.changeForm,this.flagForm,this.auditForm,{},this.annex,this.attachedFileList)
            // this.visible = true;
            /**
             * 查询设置锚点位置
             * */
            //恢复初始状态
            this.removeClassCurrent('jump-pro-declare-view')[0].classList.add('current');
            this.getNodesHeight('product-declare-view')
          })
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
 @import "../../../../assets/css/auditchanges.css";
</style>
