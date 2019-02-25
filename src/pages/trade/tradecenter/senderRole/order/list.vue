<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tabs-panel">
      <span class="active">订单列表</span>
    </div>

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="query" :model="query" label-position="right" size="small">
          <el-row :gutter="24">
            <el-col :span="3">
              <template>
                <el-select v-model="value1" @keyup.enter.native="searchEnterFun"  size="small" placeholder="订单状态">
                  <!--<el-option label="未阅读" value="xc"></el-option>
                  <el-option label="已阅读" value="cy"></el-option>
                  <el-option label="已发货" value="xc"></el-option>
                  <el-option label="到货中" value="cy"></el-option>
                  <el-option label="缺货" value="xc"></el-option>
                  <el-option label="断货" value="cy"></el-option>-->
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-col>
            <el-col :span="3">
              <template>
                <el-select v-model="value2" @keyup.enter.native="searchEnterFun"  size="small" placeholder="机构类别">
                  <!--<el-option label="社区医院" value="xc"></el-option>
                  <el-option label="二级以上医疗机构" value="cy"></el-option>-->
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-col>
            <el-col :span="3">
              <template>
                <el-select v-model="value1" @keyup.enter.native="searchEnterFun"  size="small" placeholder="紧急程度">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-col>
            <el-col :span="3">
              <el-form-item size="small">
                <el-input @keyup.enter.native="searchEnterFun"  v-model="query.searchSenderName" placeholder="买方机构"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item size="small">
                <el-input v-model="query.searchSenderName" @keyup.enter.native="searchEnterFun"  placeholder="订单号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item>
                <span>
                      <el-date-picker type="date" size="small" @keyup.enter.native="searchEnterFun"  placeholder="开始日期" v-model="query.beginDate"></el-date-picker>
                </span>
                <span>到</span>
                <span>
                      <el-date-picker type="date" size="small" @keyup.enter.native="searchEnterFun"  placeholder="结束日期" v-model="query.endDate"></el-date-picker>
                </span>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item>
                <el-button type="warning">查询</el-button>
                <el-button type="primary">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
                :data="resData.list"
                border
                stripe>
          <!--<el-table-column type="index" width="50" label="序号"></el-table-column>-->
          <el-table-column label="订单号">
            <template slot-scope="scope">
              {{ scope.row.medicalName }}
            </template>
          </el-table-column>
          <el-table-column label="买方机构">
            <template slot-scope="scope">
              <span>{{ scope.row.productName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="药库">
              <template slot-scope="scope">
                <span>{{ scope.row.aaa }}</span>
              </template>
          </el-table-column>
            <el-table-column label="药库">
                <template slot-scope="scope">
                  <span>{{ scope.row.aaa }}</span>
                </template>
            </el-table-column>
            <el-table-column label="发送时间">
              <template slot-scope="scope">
                <span>{{ scope.row.aaa }}</span>
              </template>
            </el-table-column>
            <el-table-column label="订购金额">
              <template slot-scope="scope">
                <span>{{ scope.row.aaa }}</span>
              </template>
            </el-table-column>
            <el-table-column label="到货金额">
              <template slot-scope="scope">
                <span>{{ scope.row.aaa }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">
                <span>{{ scope.row.aaa }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              详情 | 处理
            </el-table-column>
        </el-table>
      </div>
      <div style="margin: 20px 0">
        标记说明：  部分药品急需   全部药品急需
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

    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求
  import {selectParameterSettingList} from 'src/axios/trade/audit/auditConfig'

  export default {
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
        },
        value1: [{
          value: '选项1',
          label: '未阅读'
        },{
          value: '选项2',
          label: '已阅读'
        },{
          value: '选项3',
          label: '已发货'
        },{
          value: '选项4',
          label: '到货中'
        },{
          value: '选项5',
          label: '缺货'
        },{
          value: '选项6',
          label: '断货'
        }],
        //value1:'',
        value2: [{
          value: '选项7',
          label: '社区医院'
        },{
          value: '选项8',
          label: '二级以上医疗机构'
        }],
       // value2:''
      }
    },
    created () {
      this.list()
    },
    methods: {
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
            searchSenderName: undefined,
            searchSenderAbbr: undefined,
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        selectParameterSettingList(this.resData, this.query).then(res => {
          this.resData = res.data
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

