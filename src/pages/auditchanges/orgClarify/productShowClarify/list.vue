<template>
  <div class="tablebox">
    <div class="tabs-panel">
      <span class="active">挂网产品澄清</span>
    </div>
    <el-form ref="dataForm" :model="dataForm">
      <el-row :gutter="24">
        <el-col :span="4">
          <el-form-item>
            <el-input type="text" placeholder="质疑内容"/>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-col :span="5"><h3>质疑时间：</h3></el-col>
          <el-date-picker
            v-model="value7"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2">
          </el-date-picker>
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
        <el-col :span="6">
          <el-form-item>
            <el-button type="warning" @click="handleQuery">查询</el-button>
            <el-button type="primary" @click="restQuery">重置</el-button>
          </el-form-item>
        </el-col>
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
        <el-table-column label="质疑内容">
          <template slot-scope="scope"><span></span></template>
        </el-table-column>
        <el-table-column label="质疑时间">
          <template slot-scope="scope"><span></span></template>
        </el-table-column>
        <el-table-column label="回复内容">
          <template slot-scope="scope"><span></span></template>
        </el-table-column>
        <el-table-column label="回复时间">
          <template slot-scope="scope"><span></span></template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small">澄清</el-button>
            <el-button type="text" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table-caption">
      <el-button type="primary" size="small" @click="fromDoubt">澄清</el-button>
      <el-button type="primary" size="small"  @click="handleView('0')">详情</el-button>
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
    <find-view ref="findView"></find-view>
    <clarify ref="clarify"></clarify>
  </div>
</template>

<script>
  import clarify from './clarify'
  import findView from "./findView";
  export default {
    components:{
      findView,
      clarify,
    },
    data() {
      return {
        resData: this.mataData(),
        options: [{
          value: '选项1',
          label: '未澄清'
        }, {
          value: '选项2',
          label: '已澄清'
        },{
          value: '选项3',
          label: '已选择'
        }],
        dataForm: {},
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value6: '',
        value7: ''
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

      }, handleQuery(){
        this.list()
      },
      restQuery(){
        this.query=this.metaQuery()
      },
      fromDoubt(){
        this.$nextTick(() => {
          this.$refs.clarify.list()
        })
      },
      handleSelectionChange(val){
        //val 所选对象
      },
      handleView(id) {
        this.$nextTick(() => {
          this.$refs.findView.list(id)
        })
      }
    }
  }
</script>
