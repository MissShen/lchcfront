<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" :inline="true" size="small" class="table-form">
           <el-form-item>
            <el-select v-model="query.searchType" placeholder="请选择" size="small">
              <el-option label="特殊包装材质编码" value="1"></el-option>
              <el-option label="特殊包装材质名称" value="2"></el-option>
            </el-select>
           </el-form-item>

          <el-form-item>
            <el-input v-model="query.searchText" placeholder="关键词" @keyup.enter.native="searchEnterFun" size="small"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
            <el-button type="warning" @click="resetForm" size="small">重置</el-button>
          </el-form-item>
        </el-form>


      <!-- 表格列表 -->
      <div class="tableset">

        <el-table
          ref="tableInfo"
          :data="resData.list"
          :row-key="getRowkeys"
          @selection-change="handleSelectionChange"
          border
          stripe>

          <el-table-column type="selection" :reserve-selection="true" align="center" width="50"></el-table-column>
          <el-table-column label="特殊包装材质编码">
            <template slot-scope="scope">
              <span>{{ scope.row.code }}</span>
            </template>
          </el-table-column>

          <el-table-column label="特殊包装材质中文名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.nameChn }}</span>
            </template>
          </el-table-column>

          <el-table-column
            fixed="right"
            label="操作"
            width="160">
            <template slot-scope="scope">
              <div class="operates"><a class="operation-btn" @click="goInfo(scope.row.code)">查看</a>
                <a class="operation-btn" @click="goEdit(scope.row.code)">修改</a></div>
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
      <div class="foot-btn">
        <div class="foot-left">
          <el-button type="success" size="small" @click="goAdd">
            增加
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete()">
            删除
          </el-button>
        </div>
      </div>

    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求
  import {wrapList,remove} from 'src/axios/datacenter/basedata/wrap/wrap'
  import {keyBoardEnter} from "src/utils";

  export default {
    data () {
      return {
        resData: this.metaData(),
        query: this.metaQuery (), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        deleteDataList:[]
      }
    },
    created () {
      if(!!this.$store.state.pageSeach.pageNum){
        this.query = this.$store.state.pageSeach;
        this.resData.pageSize = this.$store.state.pageSeach.pageSize;
        this.resData.pageNum = this.$store.state.pageSeach.pageNum;
      }
      this.$store.state.pageSeach=this.query;
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {// 前后台交互数据封装格式
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
          searchType: '1',
          searchText: ''
        }
      },
      search(){//查询
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        this.list();
      },
      resetForm () {
        this.query = this.metaQuery ();
        this.$refs.tableInfo.clearSelection();
        this.search();
      },
      // search(){//查询
      //   this.$store.state.pageSeach.pageNum = 1;
      //   this.resData.pageNum=1;
      //   this.list();
      // },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.$store.state.pageSeach = this.query;
        wrapList(this.query, this.resData).then(res => {
          this.resData = res.data
          if(this.resData.pageNum===0){
            this.resData.pageNum=1
          }
        })
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.$store.state.pageSeach.pageSize = val
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.$store.state.pageSeach.pageNum = val
        this.resData.pageNum = val
        this.list()
      },
      //删除
      handleDelete() {
        if(this.deleteDataList.length<1){
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })
          return false
        }else{
          this.$confirm('确定删除选中的'+this.deleteDataList.length+'条数据吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let  codes=this.deleteDataList.map(data=>{
              return data.code
            })
            remove(codes.join(',').toString()).then(res=>{
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.list()
                }
              })
            })
          }).catch(() => {
          });
        }
      },
      getRowkeys(row){
        return row.code;
      },
      handleSelectionChange(val){
        this.deleteDataList=val
      },
      //  回车查询
      searchEnterFun:function (e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      // 跳转新增页面
      goAdd () {
        this.$router.push("/DATA/basedata/wrap/add");
      },
      // 跳转详情页面
      goInfo(code) {
        this.$router.push("/DATA/basedata/wrap/info/"+code);
      },
      // 跳转编辑页面
      goEdit(code) {
        this.$router.push("/DATA/basedata/wrap/edit/"+code);
      }
    }
  }
</script>

