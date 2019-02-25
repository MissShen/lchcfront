<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" size="small" :inline="true" class="table-form">
          <el-form-item>
            <el-input placeholder="机构名称"
                      max="200" size="small" v-model="input10" clearable></el-input>
          </el-form-item>
            <el-form-item>
              <el-select v-model="query.conState" size="small" placeholder="全部">
                <el-option
                  v-for="item in contractTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="success">查询</el-button>
                <el-button type="warning" size="small">重置</el-button>
            </el-form-item>
        </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe>
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></el-checkbox>
          <el-table-column type="index" width="50" label="序号"></el-table-column>
          <el-table-column label="甲方" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.aaa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="乙方" :show-overflow-tooltip="true">
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
            <template slot-scope="scope">

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

    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求  引自js文件
  import {queryContractList, findContractType} from 'src/axios/contract/contractmanagement/contractManagement'

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
        contractTypes : []
      }
    },
    created () {
      this.getDownList();
      this.list3()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
            pageNum: 1,
            pageSize: 10,
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
      },
      metaQuery () { // 表单查询数据初始化
        return {
          conState: undefined,
          orgName: undefined
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list3 () {
        // selectSysRuleList(this.resData, this.query).then(res => {
        //   console.log(res);
        //   this.resData = res.data
        //   if(this.resData.pageNum === 0){
        //     this.resData.pageNum = 1;
        //   }
        // })
      },
      //  查合同状态列表
      getDownList () {
        findContractType().then(res => {
          console.log(res);
          this.contractTypes = res.data
        })
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list3()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list3()
      }
    }
  }
</script>

