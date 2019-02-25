<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" :inline="true" size="small" class="table-form">
            <el-form-item>
              <el-select v-model="query.searchType" placeholder="搜索条件" size="small">
                <el-option label="名称" value="1"></el-option>
                <el-option label="编码" value="3"></el-option>
                <el-option label="所在城市" value="4"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-input v-model="query.searchText" placeholder="关键词" @keyup.enter.native="searchEnterFun" size="small"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
              <el-button type="warning" @click="resetForm()" size="small">重置</el-button>
            </el-form-item>
        </el-form>



      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          ref="tableInfo"
          :data="resData.list"
          :row-key="getRowkeys"
          @selection-change="handleSelectionChange"
          @sort-change="sortChange"
          border
          stripe>
          <el-table-column type="selection" :reserve-selection="true" aglin="center" width="50"></el-table-column>
          <el-table-column sortable="custom" prop="code" label="县(县市)编码">
            <template slot-scope="scope">
              <span>{{ scope.row.code }}</span>
            </template>
          </el-table-column>
          <el-table-column label="所在城市">
            <template slot-scope="scope">
              <span>{{ scope.row.parentName }}</span>
            </template>
          </el-table-column>
          <el-table-column sortable="custom" prop="name_chn" label="县(县市)名称">
            <template slot-scope="scope">
              <span>{{ scope.row.nameChn }}</span>
            </template>
          </el-table-column>

          <el-table-column
            fixed="right"
            label="操作"
            width="160">
            <template slot-scope="scope">
              <div class="operates"><a class="operation-btn" @click="goInfo(scope.row.id)">查看</a>
                <a class="operation-btn" @click="goEdit(scope.row.id)">修改</a></div>
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
  import {countyList, remove} from 'src/axios/datacenter/basedata/region/region'
  import {keyBoardEnter} from "src/utils";

  export default {
    data () {
      return {
        activeName: '4',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
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
        return {
            pageNum: 1,
            pageSize: 10,
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
      },
      metaQuery () { // 表单查询数据初始化
        return {
          query: {
            id: undefined,
            code: undefined,
            name: undefined,
            beginDate: undefined,
            endDate: undefined
          }
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
          searchType:'1',
          searchText:''
        }
      },
      // 重置
      resetForm () {
        this.query = this.metaQuery ();
        this.$refs.tableInfo.clearSelection();
        this.list();
      },
      getRowkeys(row){
        return row.id;
      },
      handleSelectionChange(val){
        this.deleteDataList=val
      },
      //查询
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list();
        })
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
            let  ids=this.deleteDataList.map(data=>{
              return data.id
            })
            remove(ids.join(',').toString()).then(res=>{
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.list();
                  this.$refs.tableInfo.clearSelection();
                }
              })
            })
          }).catch(() => {
          });
        }
      },
      sortChange(value){
        let sortType=" desc"
        if(value.order != null){
          if(value.order.startsWith("asc")){
            sortType=" asc";
          }
          this.query.orderBy=value.prop + sortType;
          this.list()
        }
      },
      // search(){//查询
      //   this.$store.state.pageSeach.pageNum = 1;
      //   this.resData.pageNum=1;
      //   this.list();
      // },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取列表
      list () {
        this.$store.state.pageSeach = this.query;
        countyList(this.query, this.resData).then(res => {
          this.resData = res.data
          if (this.resData.pageNum === 0) {
            this.resData.pageNum = 1
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
      // 跳转新增页面
      goAdd () {
        this.$router.push("/DATA/basedata/county/add");
      },
      // 跳转详情页面
      goInfo(id) {
        this.$router.push("/DATA/basedata/county/info/"+id);
      },
      // 跳转编辑页面
      goEdit(id) {
        this.$router.push("/DATA/basedata/county/edit/"+id);
      }
    }
  }
</script>

