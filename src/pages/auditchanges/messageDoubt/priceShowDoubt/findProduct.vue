<template>
  <el-dialog
    custom-class="w80"
    title="产品信息"
    :close-on-click-modal="false"
    :visible.sync="visible"
    append-to-body
  >
    <div class="main">
      <ul class="side">
        <li><a href="#cpjc" class="current d_jump">产品基础信息</a></li>
        <li><a href="#sms" class="d_jump">产品说明书信息</a></li>
        <li><a href="#fj" class="d_jump">项目附加信息</a></li>
      </ul>
      <div class="scroll-content">
        <product-info-detail ref="productInfoDetail"></product-info-detail>
        <div class="gap-40">
          <el-row>
            <el-col :span="24">
                    <span class="btn-mar">
                      <el-button size="small" @click="goBack">返回</el-button>
                    </span>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
  import productInfoDetail from 'src/pages/auditchanges/common/productInfoDetail.vue'
  export default {
    components: {
      productInfoDetail
    },
    data() {
      return {
        visible:false,
        dataForm:{},
        showForm:{
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
      list(showForm,dataForm) {
        this.visible =true;
        this.showForm = showForm;
        this.dataForm = dataForm;
        this.$nextTick(() => {
          this.$refs.productInfoDetail.list(this.showForm,this.dataForm)
        })
      },
      goBack() {
        this.visible=false;
      }
    }
  }
</script>
<style>
  @import "../../../../assets/css/auditchanges.css";
</style>
