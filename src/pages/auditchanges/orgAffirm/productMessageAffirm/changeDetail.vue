<template>
  <el-dialog
    custom-class="w80"
    title="产品变更确认"
    :close-on-click-modal="false"
    :visible.sync="visible"
    append-to-body
    class="audit-dialog"
    id="product-declare-view-box"
  >
    <div v-if="visible">
    <div class="main audit-main">
      <ul class="side side-init" id="product-declare-view-side">
        <li v-for="(item,index) in nodesPosition" :key="index"><a @click="changeScrollHeight(item.nodePosition,'product-declare-view-box','jump-pro-declare-view',index)" class="d_jump jump-pro-declare-view">{{item.itemName}}</a></li>
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
  import {findProductById,queryProductChangeAfter,findAttachedFiles,findChangeAttachedFile} from 'src/axios/auditchanges/messageChanges/productChange'
  import {selectQueryFieldById,changerefuse,insertChange} from 'src/axios/auditchanges/orgAffirm/productAffirm'
  import {checkJydate,returnAnnex,returnAnnexFile,returnDataAnnex} from 'src/axios/auditchanges/common/catProduct'
  import {boxScroll} from 'src/components/mixins/scrolls'

  export default {
    mixins:[boxScroll],
    components:{
      productInfoDetail
    },
    data() {
      return {
        productId:'',
        upProductId:'',
        visible:false,
        changeForm: this.metaChangeForm(),
        showForm: this.metaShowForm(),
        auditForm: this.metaAuditForm(),
        rules:{
          AUDITSTATE:{ required: true, message: '审核结果不能为空', trigger: 'blur'}
        },
        nodesPosition:[
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
          AFFIRMFLAG:true,/*确认标识*/
          CHANGEFLAG:true,/*变更标识*/
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
      metaAuditForm() {
        return {
          PRODUCT:'',/*产品名称标识*/
          TRADE:'',/*商品名标识*/
          DOSAGE:'',/*剂型标识*/
          SPEC:'',/*规格标识*/
          STANDRATE:'',/*转换比标识*/
          METRIC:'',/*单位标识*/
          WRAP:'',/*包材标识*/
          MANUFACTURE:'',/*生产企业标识*/
          STANDARDCODE:'',/*本位码标识*/
          SOURCE: '',/*产品来源标识*/
          FZORG:'',/*分装企业标识*/
          UNIT:'',/*最小使用单位标识*/
          PERMITNUMBER:'',/*批准文号标识*/
          SWRAP:'',/*中包装标识*/
          BWRAP:'',/*大包装标识*/
          JYNUM:'',/*药品检验报告编号标识*/
          JYDATE:'',/*药品检验报告有效期标识*/
          JYYJ:'',/*永久有效标识*/
          JKNUM:'',/*进口药品注册证编号(进口/进口分装)标识*/
          JKDATE:'',/*有效期至(进口/进口分装)标识*/
          AGENCYORGDATE:'',/*代理授权书有效期至(进口)标识*/
          PRODUCTIONNUM:'',/*国产药品批件编号标识*/
          PRODUCTIONDATE:'',/*国产药品批件编号有效期标识*/
          GMP:'',/*GMP证书编号(国产/进口分装)标识*/
          PATENTFLAG:'',/*是否专利保护标识*/
          PATENTBEGINDATE:'',/*专利保护开始时间标识*/
          PATENTENDDATE:'',/*专利保护结束时间标识*/
          STANDRD:'',/*药品质量标准标识*/
          PROTECTIONFLAG:'',/*是否中药保护标识*/
          USEUNIT:'',/*用法用量标识*/
          USEMIN:'',/*每次使用量最小值标识*/
          USEMAX:'',/*每次使用量最大值标识*/
          NUMMIN:'',/*每日次数最小值标识*/
          AVENUM:'',/*平均日用量标识*/
          MAXIMUN:'',/*每次使用极量标识*/
          TREATMENT:'',/*疗程标识*/
          SPECIFICATION:'',/*说明书标识*/
        }
      },
      metaChangeForm() {
        return {
          STANDARDCODE:'',/*本位码标识*/
          TRADE:'',/*商品名*/
          UNIT:'',/*最小使用单位标识*/
          PERMITNUMBER:'',/*批准文号标识*/
          SWRAP:'',/*中包装标识*/
          BWRAP:'',/*大包装标识*/
          JYNUM:'',/*药品检验报告编号标识*/
          JYDATE:'',/*药品检验报告有效期标识*/
          JYYJ:'',/*永久有效标识*/
          JKNUM:'',/*进口药品注册证编号(进口/进口分装)标识*/
          JKDATE:'',/*有效期至(进口/进口分装)标识*/
          AGENCYORGDATE:'',/*代理授权书有效期至(进口)标识*/
          PRODUCTIONNUM:'',/*国产药品批件编号标识*/
          PRODUCTIONDATE:'',/*国产药品批件编号有效期标识*/
          GMP:'',/*GMP证书编号(国产/进口分装)标识*/
          PATENTCHANGE:'',/*是否专利保护标识*/
          PATENTBEGINDATE:'',/*专利保护开始时间标识*/
          PATENTENDDATE:'',/*专利保护结束时间标识*/
          STANDRD:'',/*药品质量标准标识*/
          PROTECTIONCHANGE:'',/*是否中药保护标识*/
          USEUNIT:'',/*用法用量标识*/
          USEMIN:'',/*每次使用量最小值标识*/
          USEMAX:'',/*每次使用量最大值标识*/
          NUMMIN:'',/*每日次数最小值标识*/
          AVENUM:'',/*平均日用量标识*/
          MAXIMUN:'',/*每次使用极量标识*/
          TREATMENT:'',/*疗程标识*/
          SPECIFICATION:''/*说明书标识*/
        }
      },
      list(id,upProductId) {
//        变更确认
//        this.showForm.CHANGEFLAG=true;
//        this.showForm.AFFIRMFLAG=true;
//        this.showForm
//        this.changeForm//变更后数据
//        this.auditForm//审核后数据
       /* this.productId = id;*/

        /*this.visible = true;
        this.showForm.CHANGEFLAG=true;
        this.showForm.AFFIRMFLAG=true;
        this.$nextTick(() => {
          this.$refs.productInfoDetail.list(this.showForm,{},this.changeForm,{},this.auditForm)
        })*/
        this.productId = id;
        this.upProductId = upProductId;
        this.visible = true;
        this.$nextTick( async () => {
          await findProductById(id).then(res => {
            this.showForm = res.data;
            this.showForm.ID = upProductId;
            this.showForm.PRODUCTID = id;
            this.showForm.CHANGEFLAG=true;
            this.showForm.AFFIRMFLAG=true;
          })
          await queryProductChangeAfter(upProductId).then(res => {
            this.changeForm = res.data;
          })
          await selectQueryFieldById(upProductId).then(res => {
            this.auditForm = res.data;
          })
          let changeFile = await findChangeAttachedFile(this.showForm.ID)
          this.annex = returnAnnex(this.showForm.ATTACHED,{},this.changeForm,this.auditForm);
          let findAttachedFilesObj = await findAttachedFiles(id)
          this.attachedFileList = returnAnnexFile(findAttachedFilesObj.data,{},changeFile.data);
          await this.$refs.productInfoDetail.list(this.showForm,{},this.changeForm,{},this.auditForm,{},this.annex,this.attachedFileList);
          /**
           * 查询设置锚点位置
           * */
          //恢复初始状态
          this.removeClassCurrent('jump-pro-declare-view')[0].classList.add('current');
          this.getNodesHeight('product-declare-view')
        })
      },
      goBack() {
        this.visible =false;
      },
      refuse() {
        this.$confirm('拒绝后该信息将作为未通过审核处理，是否确定完成此操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          changerefuse(this.productId).then(res => {
            this.visible = false;
          })
        })
      },
      affirm() {
        insertChange(this.productId,this.upProductId)
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
