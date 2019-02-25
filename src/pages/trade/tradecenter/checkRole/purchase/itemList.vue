<template>
  <div>    <!-- ================ ================ ========================== 不要了 ============= ============================ -->
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="query" :model="query" label-position="right" size="small">
          <div class="formrow">
            <span>
              <el-select v-model="value" placeholder="采购单状态" size="small">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </span>
            <span>
                <el-input v-model="query.code" placeholder="采购单编号" size="small"></el-input>
            </span>
            <span>
              <el-date-picker type="date" placeholder="创建开始日期" v-model="query.beginDate"
                              format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
              <el-date-picker type="date" placeholder="创建结束日期" v-model="query.endDate"
                              format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
            </span>
            <!--<span>
                <el-button type="warning" size="small">查询</el-button>
                <el-button type="primary" size="small">重置</el-button>
            </span>-->
          </div>
        </el-form>
      </div>

      <div class="table-caption">
        <el-button type="primary" size="small">
          导出采购单
        </el-button>
        <template>
          <el-checkbox v-model="checked">包含明细</el-checkbox>
        </template>
      </div>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe>
          <!--<el-table-column type="index" width="50" label="序号">
          </el-table-column>-->
          <el-table-column label="采购单编号">
            <template slot-scope="scope">
              <span>{{ scope.row.purchaseCode }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="买方机构">
            <template slot-scope="scope">
              {{ scope.row.buyerName }}
            </template>
          </el-table-column>
          <el-table-column label="拟采购金额（元）">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.requestTotal) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="采购类别">
            <template slot-scope="scope">
              <span>{{ scope.row.purchaseState }}</span>
            </template>
          </el-table-column>
          <el-table-column label="采购单别名">
            <template slot-scope="scope">byName
              <span>{{ scope.row.byName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <span>{{ scope.row.purchaseState }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" plain>详情</el-button>
              <el-button type="primary" plain>制单</el-button>
              <el-button type="primary" plain>编辑</el-button>
              <el-button type="primary" plain>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 表格分页 -->
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
        <span class="icon-sign sign-district">区</span>
        <span class="text">区目录药品</span>
        <span class="icon-sign sign-basic">基</span>
        <span class="text">基本药物目录</span>
        <span class="icon-sign icon-jixu"></span>
        <span class="text">急需商品</span>
      </div>

    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求
  import {itemList} from 'src/axios/trade/purchase/purchase'
  import {priceFormat} from "src/utils";

  export default {
    name:'based-city-snder-list',
    data () {
      return {
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        }
      }
    },
    created () {
      this.list()
    },
    methods: {
      priceFormat,
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
          resData: { // 前后台交互数据封装格式
            pageNum: 1,
            pageSize: 20,
            size: undefined,
            startRow: undefined,
            endRow: undefined,
            total: undefined,
            pages: undefined,
            prePage: undefined,
            nextPage: undefined,
            isFirstPage: true,
            isLastPage: undefined,
            hasPreviousPage: undefined,
            hasNextPage: undefined,
            navigatePages: undefined,
            navigatepageNums: undefined,
            navigateFirstPage: undefined,
            navigateLastPage: undefined,
            firstPage: undefined,
            lastPage: undefined,
            list: undefined
          }
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
          query: {
            id: undefined,
            orgAllName: undefined,
            searchAllproductName: undefined,
            searchAllproductName:undefined,
            senderOrgName:undefined,
            searchBenDate:undefined,
            searchEndDate:undefined
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        checkAllList(this.resData, this.query).then(res => {
          this.resData = res.data
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1
          }
        })
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      }
    }
  }
</script>

<style>
  p{
    margin: 0;
  }
  .drugCon{
    font-size: 12px;
    color: #c0c4cc;
  }
  .fixed-toolbar{
    left:60px;
    width:100%;
    background:#eee;
    text-align:right;
    line-height:60px;
    height:60px;
  }
  .box{
    float:right;
    margin-right: 15px;
  }
  .amount{
    float:left;
    font-size:14px;
    margin-right: 15px;
  }
  .red{
    color: #f43530;
  }
  .btn-pitchon{
    float:left;
    color:#008dd8;
    background: #fff;
    border-top: 1px solid #008dd8;
    border-left:1px solid #008dd8;
    padding:0 30px;
    cursor: pointer;
    height: 58px;
  }
  .btn-purchase{
    float:left;
    color:#fff;
    background: #008dd8;
    padding:0 30px;
    cursor: pointer;
    height: 58px;
  }
  .sign{
    height: 22px;
    margin-bottom: 10px;
  }
  .sign > span{
    display: inline-block;
    vertical-align: middle;
  }
  .icon-sign{
    height: 22px;
    line-height: 22px;
    padding:0 5px;
    font-size: 12px;
    border-radius:4px;
  }
  .sign-district{
    background-color:rgba(32,160,255,0.1);
    border:solid 1px rgba(32,160,255,0.2);
    color:#2b86cc;
  }
  .sign-basic{
    background-color:rgba(247,186,42,0.1);
    border:solid 1px rgba(247,186,42,0.2) ;
    color:#ef8e05;
  }
  .text{
    padding: 0 5px;
  }
  .icon-jixu{
    display: inline-block;
    width:10px;
    height:10px;
    border-radius:2px;
    background-color:#e64340;
  }
</style>

