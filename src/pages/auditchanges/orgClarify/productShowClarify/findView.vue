<template>
  <el-dialog
    custom-class="w80"
    title="详情"
    :close-on-click-modal="false"
    :visible.sync="visible"
    append-to-body
  >
    <el-form :model="dataForm"  ref="dataForm" label-width="160px" size="small" label-position="right">
      <el-row>
        <el-col :span="10">
          <el-form-item label="产品名称">
            <span>{{showForm.PRODUCT}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="剂型">
            <span>{{showForm.DOSAGE}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="商品名">
            <span>{{showForm.TRADE}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="转换比">
            <span>{{showForm.STANDRATE}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="规格">
            <span>{{showForm.SPEC}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单位">
            <span>{{showForm.METRIC}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="包材">
            <span>{{showForm.WARP}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="生产企业">
            <span>{{showForm.MANUFACTURE}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="质疑时间">
            <span>{{showForm.doubtDate}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="质疑内容">
            <span type="textarea" :rows="3">{{showForm.doubtText}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="质疑图片">
            <el-button>上传图片</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="澄清内容">
            <span>{{showForm.clarifyDate}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="澄清图片">
            <span type="textarea" :rows="3">{{showForm.clarifyText}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <span class="btn-mar">
            <el-button size="small" @click="goBack">返回</el-button>
          </span>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>
<script>

  export default {
    data () {
      return {
        showForm: {
          doubtDate:'质疑时间',
          doubtText:'质疑内容',
          clarifyDate:'澄清内容',
          clarifyText:'澄清图片',
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
        }, // 表单初始化
        dataForm: {

        }, // 查询初始化
        visible:false,
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        }
      }
    },
    created () {
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      //  获取用户分页列表
      list (id) {
        this.visible = true;
        //查询产品信息
        this.showForm.ID = id;
      },
      // ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      },
      handleQuery(){
        this.list()
      },
      restQuery(){
        this.query=this.metaQuery()
      },
      goBack() {
        this.visible=false;
      }
    }
  }
</script>
