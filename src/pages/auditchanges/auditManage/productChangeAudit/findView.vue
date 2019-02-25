<template>
  <el-dialog
    title="详情"
    :close-on-click-modal="false"
    :visible.sync="visible"
    append-to-body
    width="88%"
    id="product-find-box"
  >
    <!--<div v-if="visible">-->
      <div class="main audit-main">
        <ul class="side side-init" id="product-find-side">
          <li
            v-for="(item,index) in nodesPosition"
            :key="index">
            <a @click="changeScrollHeight(item.nodePosition,'product-find-box','jump-product-find',index)"
               class="d_jump jump-product-find">{{item.itemName}}</a></li>
        </ul>
        <div class="right-box">
          <product-info-detail ref="productInfoDetail" id="product-find"></product-info-detail>
          <div class="gap-40">
            <h3 id="find-shxx">审核信息</h3>
            <div class="tableset">
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
                <el-table-column label="审核备注" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span>{{scope.row.CHECKREMARK}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    <span slot="footer" class="dialog-footer">
       <el-button size="small" @click="goBack">关闭</el-button>
    </span>
    <!--</div>-->
  </el-dialog>
</template>
<script>
  import productInfoDetail from 'src/pages/auditchanges/common/productInfoDetail'
  import{findProductById,queryProductChangeAfter,findAttachedFiles,findChangeAttachedFile}from 'src/axios/auditchanges/messageChanges/productChange'
  import{queryAuditData,queryCheckRecording}from 'src/axios/auditchanges/auditManage/productDeclareAudit'
  import {checkJydate,returnAnnex,returnAnnexFile,returnDataAnnex} from 'src/axios/auditchanges/common/catProduct'
  import {boxScroll} from "src/components/mixins/scrolls"
  export default {
    mixins:[boxScroll],
    components:{
      productInfoDetail
    },
    data() {
      return {
        visible:false,
        dataForm: {},
        showForm: this.metaShowForm(),
        changeForm: this.metaChangeForm(),
        flagForm: {},
        auditForm: this.metaAuditForm(),
        checkRecording:[],
        nodesPosition: [
          {itemName: '基础信息', nodePosition: null, itemAbb: 'cpjc'},
          {itemName: '说明书信息', nodePosition: null, itemAbb: 'sms'},
          {itemName: '项目附加信息', nodePosition: null, itemAbb: 'xmfj'},
          {itemName: '审核信息', nodePosition: null, itemAbb: 'shxx'}
        ],
        annex:{},
        attachedFileList:{}
      };
    },
    created () {},
    methods: {
      metaShowForm(){//展示数据
        return {
          SHOWFLAG:true,/*详情标识*/
          CHANGEFLAG:true,/*变更标识*/
          AUDITFLAG:true,
          ID:'',/*产品ID*/
          PRODUCT:'产品名称',/*产品名称*/
          TRADE:'商品名',/*商品名 可变更 审核*/
          DOSAGE:'',/*剂型*/
          SPEC:'',/*规格*/
          STANDRATE:'转换比',/*转换比 不可变更*/
          METRIC:'',/*单位*/
          WARP:'',/*包材*/
          MANUFACTURE:'',/*生产企业*/
          STANDARDCODE:'本位码',/*本位码 可变更 不需要审核*/
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
      metaDataForm(){//无
        return {
          AUDITSTATE:'',
          //交互数据/审核页中不正确数据 放这里
          ID:'',/*产品ID*/
          PRODUCT:'',/*产品名称*/
          TRADE:'',/*商品名*/
          DOSAGE:'',/*剂型*/
          SPEC:'',/*规格*/
          STANDRATE:'',/*转换比*/
          METRIC:'',/*单位*/
          WARP:'',/*包材*/
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
      metaChangeForm(){//变更后数据
        return{
          STANDARDCODE:'变更后本位码',/*本位码标识*/
          TRADE:'变更后商品名',/*商品名*/
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
          SPECIFICATION:'',/*说明书标识*/
        }
      },
      metaFlagForm(){//(判断是否有质疑/澄清数据)
        return{
          PRODUCT:'',/*产品名称标识*/
          TRADE:'1234',/*商品名标识*/
          DOSAGE:'',/*剂型标识*/
          SPEC:'',/*规格标识*/
          STANDRATE:'',/*转换比标识*/
          METRIC:'',/*单位标识*/
          WARP:'',/*包材标识*/
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
      metaAuditForm() {//审核后数据
        return {
          PRODUCT: '', /*产品名称标识*/
          TRADE: '审核后商品名', /*商品名标识*/
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
      list(id,productId) {
//        变更审核详情
//        this.showForm.SHOWFLAG=true;
//        this.showForm
//        this.changeForm//变更后数据
//        this.auditForm//审核后数据
//        this.flagForm//质疑数据
//        this.visible=true;
//        this.showForm.SHOWFLAG=true;
//        this.$nextTick(() => {
//          this.$refs.productInfoDetail.list(this.showForm,this.dataForm,this.changeForm,this.flagForm,this.auditForm)
//        })
//        id='DATA00000000000000603696';//变更过程ID
//        productId = '123456781234567812345678';//挂网产品ID
        //查询审核记录
        queryCheckRecording(id,'2').then(res =>{
          console.log(res)
          this.checkRecording = res.data
        })
        /**
         * 1.查询当前挂网产品申报数据
         * 2.查询当前变更产品审核数据
         * 3.查询当前变更产品变更数据
         * 4.查询当前变更产品未回复的字段及数量=0 已回复
         */
        this.$nextTick(async() => {
          this.visible = true;
          //this.showForm,this.dataForm 审核数据,this.flagForm质疑数据
          //查询产品申报信息
          await findProductById(productId).then(res =>{
            this.showForm = res.data
            this.showForm.SHOWFLAG = true;
            this.showForm.CHANGEFLAG = true;
            this.showForm.ID = id;
            this.showForm.PRODUCTID = productId;
          })

          //查询审核数据
          await queryAuditData(id).then(res =>{
            this.auditForm = res.data
          })

          await queryProductChangeAfter(id).then(res =>{
            this.changeForm = res.data
          })
          let changeFile = await findChangeAttachedFile(this.showForm.ID)
          this.annex = returnAnnex(this.showForm.ATTACHED,this.dataForm,this.changeForm,{},this.flagForm);
          let findAttachedFilesObj = await findAttachedFiles(productId)
          this.attachedFileList = returnAnnexFile(findAttachedFilesObj.data,{},changeFile.data);
          this.$refs.productInfoDetail.list(this.showForm,{},this.changeForm,{},this.auditForm,{},this.annex,this.attachedFileList)
          setTimeout(function () {
            /**
             * 查询设置锚点位置
             * */
            this.getNodesHeight('product-find', 'find-shxx');
          }.bind(this),0)
        })
      },
      goBack() {
        this.visible=false;
        this.showForm = this.metaShowForm();
        this.changeForm = this.metaChangeForm();
        this.auditForm = this.metaAuditForm();
      }
    },
    watch: {
      visible(newVal) {
        let vieNode = document.getElementById('product-find-box');
        if(vieNode){
          if (newVal == false) {
            vieNode.onscroll = null;
            this.removeFixed('product-find-side')
          } else {
            vieNode.onscroll = function () {
              this.dialogBoxScroll(vieNode, 'jump-product-find', 'product-find-side')
            }.bind(this)
          }
        }
      }
    },
    mounted() {
      let vieNode = document.getElementById('product-find-box');
      if(vieNode){
        vieNode.onscroll = function () {
          this.dialogBoxScroll(vieNode, 'jump-product-find', 'product-find-side')
        }.bind(this)
      }
    }
  }
</script>
<style>
  @import "../../../../assets/css/auditchanges.css";
</style>
