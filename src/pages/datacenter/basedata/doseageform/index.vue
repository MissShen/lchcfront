<!--<script src="../../../../axios/datacenter/basedata/doseageform/doseageform.js"></script>-->
<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" :inline="true" size="small" class="table-form">
          <el-form-item>
            <el-select v-model="query.mergeNum" placeholder="剂型是否合并" size="small">
              <el-option label="否" value="0"></el-option>
              <el-option label="是" value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-select v-model="query.searchType" placeholder="剂型单位编码" size="small">
              <el-option label="剂型单位编码" value="1"></el-option>
              <el-option label="剂型单位英文名称" value="2"></el-option>
              <el-option label="机型单位中文名称" value="3"></el-option>
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
          :data="resData.list"
          :row-key="getRowkeys"
          @selection-change="handleSelectionChange"
          border
          stripe>
          <el-table-column type="selection" :reserve-selection="true" align="center" width="50"></el-table-column>
          <el-table-column label="剂型编码">
            <template slot-scope="scope">
              <span>{{ scope.row.code }}</span>
            </template>
          </el-table-column>
          <el-table-column label="剂型中文名称">
            <template slot-scope="scope">
              <span>{{ scope.row.nameChn }}</span>
            </template>
          </el-table-column>
          <el-table-column label="剂型英文名称">
            <template slot-scope="scope">
              <span>{{ scope.row.nameEng }}</span>
            </template>
          </el-table-column>
          <el-table-column label="剂型是否合并" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.mergeNum == 1">是</span>
              <span v-if="scope.row.mergeNum == 0">否</span>
            </template>
          </el-table-column>

          <el-table-column
            fixed="right"
            label="操作"
            width="160">
            <template slot-scope="scope">
              <div class="operates"><a class="operation-btn" @click="goInfo(scope.row.code)">查看</a>
                <a @click="goEdit(scope.row.code)" class="operation-btn">修改</a></div>
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
  import {catDoseageList,remove} from 'src/axios/datacenter/basedata/doseageform/doseageform'
  import {keyBoardEnter} from "src/utils";

  export default {
    data () {
      return {
        resData: this.metaData(),
        query: this.metaQuery (),// 查询初始化
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
      // ------------------------------------------------- 处理方法 ----------------------------------------
      metaQuery () { // 表单查询数据初始化
        return {
          searchType: '',
          searchText: ''
        }
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      search(){//查询
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        this.list();
      },
      // 重置
      resetForm () {
        this.query = this.metaQuery ();
        this.search();
      },
      //  获取列表
      list () {
        this.$store.state.pageSeach = this.query;
        catDoseageList(this.query, this.resData).then(res => {
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
      // 跳转新增页面
      goAdd () {
        this.$router.push("/DATA/basedata/doseageform/add");
      },
      // 跳转详情页面
      goInfo(code) {
        this.$router.push("/DATA/basedata/doseageform/info/"+code);
      },
      // 跳转编辑页面
      goEdit(code) {
        this.$router.push("/DATA/basedata/doseageform/edit/"+code);
      }
    }
  }
</script>


