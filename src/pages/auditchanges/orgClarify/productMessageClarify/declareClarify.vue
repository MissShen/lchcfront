<template>
  <el-dialog
    custom-class="w80"
    :close-on-click-modal="false"
    :visible.sync="visible"
    append-to-body
    class="audit-dialog"
    id="product-declare-view-box"
    title="产品申报澄清"
  >
    <div v-if="visible">
    <div class="main audit-main">
      <ul class="side side-init" id="product-declare-view-side">
        <li><a @click="changeScrollHeight(nodesPosition.cpjc,'product-declare-view-box','jump-pro-declare-view',0)" class="d_jump jump-pro-declare-view">基础信息</a></li>
        <li><a @click="changeScrollHeight(nodesPosition.sms,'product-declare-view-box','jump-pro-declare-view',1)" class="d_jump jump-pro-declare-view">说明书信息</a></li>
        <li><a @click="changeScrollHeight(nodesPosition.xmfj,'product-declare-view-box','jump-pro-declare-view',2)" class="d_jump jump-pro-declare-view">项目附加信息</a></li>
      </ul>
      <div class="right-box">
        <product-info-detail id="product-declare-view" ref="productInfoDetail"></product-info-detail>
      </div>
    </div>
    </div>
    <span slot="footer" class="dialog-footer">
        <!--<el-button size="small" type="primary" @click="">提交</el-button>-->
        <el-button size="small" @click="goBack">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import productInfoDetail from 'src/pages/auditchanges/common/productInfoDetail'
  import {findProductDetailById,selectQueryFieldById} from 'src/axios/auditchanges/messageClarify/productClarify'
  import {returnAnnex,returnAnnexFile} from 'src/axios/auditchanges/common/catProduct'
  import {findAttachedFiles} from 'src/axios/auditchanges/messageDeclare/product'
  export default {
    components:{
      productInfoDetail
    },
    data() {
      return {
        visible:false,
        annex:{},
        attachedFileList:{},
        flagForm: this.metaFlagForm(),
        showForm: this.metaShowForm(),
        nodesPosition:{}
      };
    },
    created () {

    },
    methods: {
      metaShowForm() {
        return {
          CLARIFYFLAG:true,/*澄清标识*/
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
//        申报澄清
//        this.showForm.CLARIFYFLAG=true;
//        this.showForm
//        this.flagForm//质疑数据

        this.visible = true;
        findProductDetailById(id).then(res => {
          this.showForm = res.data;
          this.showForm.ID = id;
          this.showForm.TALKTYPE='2';
          selectQueryFieldById(id).then(res => {
            this.flagForm = res.data;
            this.showForm.CLARIFYFLAG=true;
            this.annex = returnAnnex(this.showForm.ATTACHED,null,null,null,this.flagForm);
            let findAttachedFilesObj = findAttachedFiles(id)
            this.attachedFileList = returnAnnexFile(findAttachedFilesObj.data);
            this.$nextTick(() => {
                this.$refs.productInfoDetail.list(this.showForm,{},{},this.flagForm,{},{},this.annex,this.attachedFileList);
                /**
                 * 查询设置锚点位置
                 * */
                //恢复初始状态
                this.removeClassCurrent('jump-pro-declare-view')[0].classList.add('current');
                this.getNodesHeight('product-declare-view')
              })
          })
        })

      },
      goBack() {
        this.visible = false;
        window.location.reload();
      },
      changeScrollHeight(pageY,scrollBoxNodeName,jumpNodeName,currentNodeIndex){
        let vieNode = document.getElementById(scrollBoxNodeName);
        vieNode.scrollTo(0,pageY);
        this.removeClassCurrent(jumpNodeName)[currentNodeIndex].classList.add('current');

      },
      removeClassCurrent(nodeClassName){
        let jumpNodes = document.getElementsByClassName(nodeClassName);
        for (let i = 0 ; i < jumpNodes.length; i ++ ){
          jumpNodes[i].classList.remove('current')
        }
        return jumpNodes
      },
      getNodesHeight(proInfoDetaiBox){
        let vieNode = document.getElementById(proInfoDetaiBox);
        let viewNodeChildeNodes = vieNode.childNodes[0].childNodes;
        for(let i = 0 ; i < viewNodeChildeNodes.length ; i ++ ) {
          if(viewNodeChildeNodes[i].nodeName == 'H3'){
            if(viewNodeChildeNodes[i].className == 'cpjc'){
              this.nodesPosition.cpjc =viewNodeChildeNodes[i].offsetTop
            }
            if(viewNodeChildeNodes[i].className == 'sms'){
              this.nodesPosition.sms =viewNodeChildeNodes[i].offsetTop
            }
            if(viewNodeChildeNodes[i].className == 'xmfj'){
              this.nodesPosition.xmfj =viewNodeChildeNodes[i].offsetTop
            }
          }
        }
      },
      removeFixed(sideNodeName){
        let sideNode = document.getElementById(sideNodeName);
        sideNode.classList.remove('side-scroll');
        sideNode.classList.add('side-init');
      },
      addFixed(sideNodeName){
        let sideNode = document.getElementById(sideNodeName);
        sideNode.classList.remove('side-init');
        sideNode.classList.add('side-scroll');
      },
      dialogBoxScroll(vieNode,jumpNodeName,sideNodeName){
        let vieNodeScrollTop = vieNode.scrollTop ;
        if(vieNodeScrollTop < this.nodesPosition.sms &&  vieNodeScrollTop >= this.nodesPosition.cpjc){
          this.removeClassCurrent(jumpNodeName)[0].classList.add('current');
        }
        else if( vieNodeScrollTop > this.nodesPosition.sms && vieNodeScrollTop < this.nodesPosition.xmfj){
          this.removeClassCurrent(jumpNodeName)[1].classList.add('current');
        }
        else if( vieNodeScrollTop > this.nodesPosition.xmfj && vieNodeScrollTop < this.nodesPosition.shxx){
          this.removeClassCurrent(jumpNodeName)[2].classList.add('current');
        }
        else if(vieNodeScrollTop > this.nodesPosition.shxx){
          this.removeClassCurrent(jumpNodeName)[3].classList.add('current');
        }
        if(vieNodeScrollTop <= this.nodesPosition.cpjc+50){
          this.removeFixed(sideNodeName)
        }
        else{
          this.addFixed(sideNodeName)
        }
      }
    },
    watch:{
      visible(newVal){
        let vieNode = document.getElementById('product-declare-view-box');
        if(newVal == false){
          vieNode.onscroll = null;
          this.removeFixed('product-declare-view-side')
        }else{
          vieNode.onscroll = function () {
            this.dialogBoxScroll(vieNode,'jump-pro-declare-view','product-declare-view-side')
          }.bind(this)
        }
      }
    },
    mounted(){
      let vieNode = document.getElementById('product-declare-view-box');
      vieNode.onscroll = function () {
        this.dialogBoxScroll(vieNode,'jump-pro-declare-view','product-declare-view-side')
      }.bind(this)
    }
  }
</script>
<style>
  @import "../../../../assets/css/auditchanges.css";
</style>
