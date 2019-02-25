<template>
  <div class="tablebox">
    <div class="tabs-panel">
      <span class="active">价格挂网信息质疑</span>
    </div>
    <el-form ref="dataForm" :model="dataForm">
      <el-row :gutter="24">
        <el-col :span="4">
          <el-form-item>
            <el-input type="text" placeholder="产品名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-input type="text" placeholder="剂型"/>
        </el-col>
        <el-col :span="4">
          <el-input type="text" placeholder="规格"/>
        </el-col>
        <el-col :span="4">
          <el-input type="text" placeholder="生产企业"/>
        </el-col>
        <el-col :span="4">
          <el-select placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4"></el-col>
      </el-row>
    </el-form>
    <div class="tableset">
      <el-table
        :data="resData.list"
        border
        stripe
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column label="产品名称">
          <template slot-scope="scope"><span></span></template>
        </el-table-column>
        <el-table-column label="商品名">
          <template slot-scope="scope"><span></span></template>
        </el-table-column>
        <el-table-column label="剂型">
          <template slot-scope="scope"><span></span></template>
        </el-table-column>
        <el-table-column label="规格">
          <template slot-scope="scope"><span></span></template>
        </el-table-column>
        <el-table-column label="转换比">
          <template slot-scope="scope"><span></span></template>
        </el-table-column>
        <el-table-column label="单位">
          <template slot-scope="scope"><span></span></template>
        </el-table-column>
        <el-table-column label="包材">
          <template slot-scope="scope"><span></span></template>
        </el-table-column>
        <el-table-column label="生产企业">
          <template slot-scope="scope"><span></span></template>
        </el-table-column>
        <el-table-column label="质疑时间">
          <template slot-scope="scope"><span></span></template>
        </el-table-column>
        <el-table-column label="提交状态">
          <template slot-scope="scope"><span></span></template>
        </el-table-column>
        <el-table-column label="回复状态">
          <template slot-scope="scope"><span></span></template>
        </el-table-column>
        <el-table-column label="回复时间">
          <template slot-scope="scope"><span></span></template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small">提交</el-button>
            <el-button type="text" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table-caption">
      <el-button type="primary" size="small" @click="fromDoubt">发起质疑</el-button>
      <el-button type="primary" size="small"  @click="handleView('0')">详情</el-button>
      <el-button type="primary" size="small"  @click="handleEdit('0')">修改</el-button>
    </div>
    <!-- 表格分页 -->
    <div class="pagebox">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="listSizeChange"
        @current-change="listCurrentChange"
        :page-sizes="[10, 20, 30]"
        :total="resData.total"
        :page-size="resData.pageSize"
        :page-count="resData.pages"
        :current-page.sync="resData.pageNum">
      </el-pagination>
    </div>
    <go-doubt ref="goDoubt"></go-doubt>
    <find-view ref="findView"></find-view>
  </div>
</template>

<script>
  import findView from "./findView";
  import goDoubt from './doubt';
  export default {
    components:{
      findView,
      goDoubt
    },
    data() {
      return {
        resData: this.mataData(),
        options: [{
          value: '选项1',
          label: '全部'
        }, {
          value: '选项2',
          label: '未回复'
        }, {
          value: '选项3',
          label: '已回复'
        }],
        dataForm: {}
      }
    },
    created() {
    },
    methods: {
      mataData() {
        return {
          resData: { // 前后台交互数据封装格式
            pageNum: 0,
            pageSize: 20,
            size: 10,
            startRow: 0,
            endRow: 0,
            total: 0,
            pages: 0,
            prePage: 0,
            nextPage: 0,
            isFirstPage: false,
            isLastPage: true,
            hasPreviousPage: false,
            hasNextPage: false,
            navigatePages: 8,
            navigatepageNums: [],
            navigateFirstPage: 0,
            navigateLastPage: 0,
            firstPage: 0,
            lastPage: 0,
            list: []
          }
        }
      },
      list() {

      },
      fromDoubt(){
        this.$router.push("/messageQuestion/priceListDoubt")
      },
      handleView(id) {
        this.$nextTick(() => {
          this.$refs.findView.list(id)
        })
      },
      handleSelectionChange(val){
        //val 所选对象
      },
      handleEdit(id) {
        this.$nextTick(() => {
          this.$refs.goDoubt.list(id,true)
        })
      }
    }
  }
</script>

<style scoped>

</style>
