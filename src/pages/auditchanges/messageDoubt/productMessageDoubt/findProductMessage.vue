<template>
  <el-dialog
    title="产品信息"
    :close-on-click-modal="false"
    :visible.sync="viewVisible"
    append-to-body
    class="audit-dialog"
    id="product-declare-view-box"
  >
    <!-- 表格 -->
    <div class="main audit-main">
      <ul class="side side-init" id="product-declare-view-side">
        <li v-for="(item,index) in nodesPosition" :key="index"><a @click="changeScrollHeight(item.nodePosition,'product-declare-view-box','jump-pro-declare-view',index)" class="d_jump jump-pro-declare-view">{{item.itemName}}</a></li>
      </ul>
      <div class="right-box">
        <product-info-detail id="product-declare-view" ref="productInfoDetail"></product-info-detail>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="goBack">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import productInfoDetail from 'src/pages/auditchanges/common/productInfoDetail'
  import{findProductDetailById} from 'src/axios/auditchanges/messageDoubt/productDoubt'
  import {findAttachedFiles,findChangeAttachedFile} from 'src/axios/auditchanges/messageChanges/productChange'
  import {checkJydate,returnAnnex,returnAnnexFile,returnDataAnnex} from 'src/axios/auditchanges/common/catProduct'
  import {boxScroll} from 'src/components/mixins/scrolls'
  export default {
    mixins:[boxScroll],
    components: {
      productInfoDetail
    },
    data() {
      return {
        viewVisible:false,
        dataForm:{},
        showForm:{
          CHANGEFLAG:false,
          ID:'',/*产品ID*/
          PRODUCT:'产品名称',/*产品名称*/
          TRADE:'商品名',/*商品名*/
          DOSAGE:'',/*剂型*/
          SPEC:'',/*规格*/
          STANDRATE:'',/*转换比*/
          METRIC:'',/*单位*/
          WARP:'',/*包材*/
          MANUFACTURE:'',/*生产企业*/
          STANDARDCODE:'',/*本位码*/
          SOURCE: '0',/*产品来源*/
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
          PRODUCTFLAG:'',/*产品名称标识*/
          TRADEFLAG:'',/*商品名标识*/
          DOSAGEFLAG:'',/*剂型标识*/
          SPECFLAG:'',/*规格标识*/
          STANDRATEFLAG:'',/*转换比标识*/
          METRICFLAG:'',/*单位标识*/
          WARPFLAG:'',/*包材标识*/
          MANUFACTUREFLAG:'',/*生产企业标识*/
          STANDARDCODEFLAG:'',/*本位码标识*/
          SOURCEFLAG: '0',/*产品来源标识*/
          FZORGFLAG:'',/*分装企业标识*/
          UNITFLAG:'',/*最小使用单位标识*/
          PERMITNUMBERFLAG:'',/*批准文号标识*/
          SWRAPFLAG:'',/*中包装标识*/
          BWRAPFLAG:'',/*大包装标识*/
          JYNUMFLAG:'',/*药品检验报告编号标识*/
          JYDATEFLAG:'',/*药品检验报告有效期标识*/
          JYYJFLAG:'',/*永久有效标识*/
          JKNUMFLAG:'',/*进口药品注册证编号(进口/进口分装)标识*/
          JKDATEFLAG:'',/*有效期至(进口/进口分装)标识*/
          AGENCYORGDATEFLAG:'',/*代理授权书有效期至(进口)标识*/
          PRODUCTIONNUMFLAG:'',/*国产药品批件编号标识*/
          PRODUCTIONDATEFLAG:'',/*国产药品批件编号有效期标识*/
          GMPFLAG:'',/*GMP证书编号(国产/进口分装)标识*/
          PATENTFLAGFLAG:'',/*是否专利保护标识*/
          PATENTBEGINDATEFLAG:'',/*专利保护开始时间标识*/
          PATENTENDDATEFLAG:'',/*专利保护结束时间标识*/
          STANDRDFLAG:'',/*药品质量标准标识*/
          PROTECTIONFLAGFLAG:'',/*是否中药保护标识*/
          USEUNITFLAG:'',/*用法用量标识*/
          USEMINFLAG:'',/*每次使用量最小值标识*/
          USEMAXFLAG:'',/*每次使用量最大值标识*/
          NUMMINFLAG:'',/*每日次数最小值标识*/
          AVENUMFLAG:'',/*平均日用量标识*/
          MAXIMUNFLAG:'',/*每次使用极量标识*/
          TREATMENTFLAG:'',/*疗程标识*/
          SPECIFICATIONFLAG:'',/*说明书标识*/
          FZORGCHANGE:'',/*分装企业标识*/
          UNITCHANGE:'',/*最小使用单位标识*/
          PERMITNUMBERCHANGE:'',/*批准文号标识*/
          SWRAPCHANGE:'',/*中包装标识*/
          BWRAPCHANGE:'',/*大包装标识*/
          JYNUMCHANGE:'',/*药品检验报告编号标识*/
          JYDATECHANGE:'',/*药品检验报告有效期标识*/
          JYYJCHANGE:'',/*永久有效标识*/
          JKNUMCHANGE:'',/*进口药品注册证编号(进口/进口分装)标识*/
          JKDATECHANGE:'',/*有效期至(进口/进口分装)标识*/
          AGENCYORGDATECHANGE:'',/*代理授权书有效期至(进口)标识*/
          PRODUCTIONNUMCHANGE:'',/*国产药品批件编号标识*/
          PRODUCTIONDATECHANGE:'',/*国产药品批件编号有效期标识*/
          GMPCHANGE:'',/*GMP证书编号(国产/进口分装)标识*/
          PATENTCHANGECHANGE:'',/*是否专利保护标识*/
          PATENTBEGINDATECHANGE:'',/*专利保护开始时间标识*/
          PATENTENDDATECHANGE:'',/*专利保护结束时间标识*/
          STANDRDCHANGE:'',/*药品质量标准标识*/
          PROTECTIONCHANGECHANGE:'',/*是否中药保护标识*/
          USEUNITCHANGE:'',/*用法用量标识*/
          USEMINCHANGE:'',/*每次使用量最小值标识*/
          USEMAXCHANGE:'',/*每次使用量最大值标识*/
          NUMMINCHANGE:'',/*每日次数最小值标识*/
          AVENUMCHANGE:'',/*平均日用量标识*/
          MAXIMUNCHANGE:'',/*每次使用极量标识*/
          TREATMENTCHANGE:'',/*疗程标识*/
          SPECIFICATIONCHANGE:'',/*说明书标识*/
          PRICETYPE:'1',/*价格类型*/
          YEAR:'',/*年度*/
          PROVINCE:'',/*省份*/
          PROJECTNAME:'',/*项目名称*/
          INPRICE:'',/*中标价*/
          EXECUTIONDATE:'',/*执行日期*/
          REPRESENTATIVESPEC:'',/*代表品规格*/
          REPRESENTATIVPRICE:'',/*代表品价格*/
          REPRESENTATIVPACKAGING:'',/*代表品装量包装*/
          COMPUTATIONALMETHOD:'',/*计算方法*/
          CALCULATEPRICE:'',/*计算价格*/
          PRICEREMARK:'',/*价格备注*/
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
      list(id) {
        this.viewVisible =true;
        findProductDetailById(id).then(res =>{
          res.data.SHOWFLAG = true;
          this.showForm = res.data;
          this.$nextTick( async () => {
            this.annex = returnAnnex(this.showForm.ATTACHED,{},{});
            let findAttachedFilesObj = await findAttachedFiles(id);
            this.attachedFileList = returnAnnexFile(findAttachedFilesObj.data,{},{});
            this.$refs.productInfoDetail.list(this.showForm,{},{},{},{},{},this.annex,this.attachedFileList);
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
      this.viewVisible=false;
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
