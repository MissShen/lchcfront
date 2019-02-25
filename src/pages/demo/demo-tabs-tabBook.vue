<template>
<div>
  <div class="tabs-echo">
    <div class="tabs-echo-left">
      <div class="title">r
        <span>订单状态：</span>
        <span class="red">已阅读</span>
      </div>
      <div class="tools">
        <el-button size="small">返回</el-button>
      </div>
    </div>
    <div class="tabs-echo-right">
      <ul class="tabs-echo-ul">
        <li>配送企业：<span>烟台正方制药</span></li>
        <li>买方机构：<span>中日友好医院 （药库：中药）</span></li>
      </ul>
      <ul class="tabs-echo-ul">
        <li>订单号：<span>C201803150747762334</span></li>
        <li>订购金额：<span class="red">220.00</span></li>
        <li>到货金额：<span class="red">0.00</span></li>
      </ul>
    </div>
  </div>
  <div class="process">
    <div class="process-box">
      <el-steps :active="2" align-center >
        <el-step title="发送" description="2018-03-15 19:35" ></el-step>
        <el-step title="已阅读" description="2018-03-15 19:35"></el-step>
        <el-step title="已发货"></el-step>
        <el-step title="到货中"></el-step>
        <el-step title="已完成"></el-step>
      </el-steps>
    </div>
  </div>
  <div class="tablebox">
    <div class="title-name border-btm">商品清单</div>
    <div class="table-form">
      <el-form :inline="true" :model="queryFrom" ref="formQuery" class="demo-form-inline">
        <div class="formrow">
          <span>
            <el-input v-model="queryFrom.name" placeholder="产品名" size="small"></el-input>
          </span>
          <span>
            <el-input v-model="queryFrom.specification" placeholder="规格" size="small"></el-input>
          </span>
          <span>
            <el-button type="success" size="small">查询</el-button>
            <el-button size="warning">重置</el-button>
          </span>
        </div>
      </el-form>
    </div>
    <div class="table-caption">
      <el-button type="primary" size="small ">打印</el-button>
    </div>
    <div class="tableset">
      <el-table :data="resData.list" style="width: 100%" border stripe>
        <el-table-column prop="drugDetail" label="药品信息" width="300">
          <template slot-scope="scope" class="drugMessage">
            <p>{{ scope.row.drugDetail }}</p>
            <p class="drugCon">{{ scope.row.drugContent}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="单价"></el-table-column>
        <el-table-column prop="order" label="订购量"></el-table-column>
        <el-table-column prop="deliver" label="总送货量"></el-table-column>
        <el-table-column prop="advice" label="总到货量"></el-table-column>
        <el-table-column prop="state" label="状态"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="operate" label="操作"></el-table-column>
      </el-table>
      <div class="pagebox">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30]"
          :total="resData.total"
          :page-size="resData.pageSize"
          :page-count="resData.pages"
          :current-page.sync="resData.pageNum">
        </el-pagination>
      </div>
      <div class="sign">
        <span class="text">标记说明：</span>
        <span class="icon-sign icon-jixu"></span>
        <span class="text">急需商品</span>
      </div>
    </div>
  </div>
</div>
</template>
<script>
  export default {
    name: "demo-tabs-tab-book",
    data() {
      return {
        queryFrom: this.metaQuery(),// 查询初始化
        resData: this.metaData(),  // 展示数据初始化
        active: 0
      };
    },
    methods: {
      next() {
        if (this.active++ > 2) this.active = 0;
      },
      metaQuery(){
        return {
          name:'',
          specification:''
        }
      },
      metaData() { // 前后台交互数据封装格式
        return {
          pageNum: 1,
          pageSize: 20,
          total: 0,
          pages: 0,
          list: [{
            drugDetail: '尼群地平片(商品名：尼群地平片)',
            drugContent:'规格包装：10mg*100 盒/片中大包装：20/10生产企业：北京太洋药业',
            price: '22.00',
            order: '23',
            deliver: '40',
            advice: '0',
            state: '已阅读',
            remark: '0',
            operate: '23'
          }, {
            drugDetail: '尼群地平片(商品名：尼群地平片)',
            drugContent:'规格包装：10mg*100 盒/片中大包装：20/10生产企业：北京太洋药业',
            price: '22.00',
            order: '23',
            deliver: '40',
            advice: '0',
            state: '已阅读',
            remark: '0',
            operate: '23'
          }, {
            drugDetail: '尼群地平片(商品名：尼群地平片)',
            drugContent:'规格包装：10mg*100 盒/片中大包装：20/10生产企业：北京太洋药业',
            price: '22.00',
            order: '23',
            deliver: '40',
            advice: '0',
            state: '已阅读',
            remark: '0',
            operate: '23'
          },{
            drugDetail: '尼群地平片(商品名：尼群地平片)',
            drugContent:'规格包装：10mg*100 盒/片中大包装：20/10生产企业：北京太洋药业',
            price: '22.00',
            order: '23',
            deliver: '40',
            advice: '0',
            state: '已阅读',
            remark: '0',
            operate: '23'
          }]
        }
      },
      handleSizeChange (val) {
        this.tableData3.pageSize = val
        /*this.list()*/
      },
      handleCurrentChange (val) {
        this.tableData3.pageNum = val
        /*this.list()*/
      }
    }
  }
</script>
