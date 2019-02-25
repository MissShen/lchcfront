<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
            <el-form-item>
              <el-input v-model="query.name" placeholder="剂型打包名称" @keyup.enter.native="searchEnterFun" size="small"></el-input>
            </el-form-item>
              <el-form-item>
              <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
              <el-button type="warning" @click="reset()" size="small">重置</el-button>
            </el-form-item>
        </el-form>
      <div class="foot-btn">
        <div class="foot-left">
            <el-button type="success" @click="goAdd()">新增</el-button>
            <el-button type="danger" @click="goDelete()">删除</el-button>
        </div>
      </div>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          ref="multipleTable"
          :data="resData.list"
          @selection-change="handleSelectionChange"
          @sort-change="sortChangeFunc"
          :row-key="getRowKeys"
          border
          stripe>
            <el-table-column width="50" type="selection" :reserve-selection="true" align="center"></el-table-column>
          <el-table-column label="剂型打包名称" prop="name" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="剂型" prop="dosage_name" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.dosageName }}</span>
            </template>
          </el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <a class="operation-btn" @click="goDosageGroupInfo(scope.row.id)">修改</a>
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

  // 引入用户相关请求
  import {dosageDroupList,deleteDosageGroup} from 'src/axios/datacenter/authdata/medicalinsurance/dosageformpackage'
  import {keyBoardEnter} from "src/utils";

  export default {
    data () {
      return {
          assoList:[],
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
          query: this.metaQuery(), // 查询初始化
      }
    },
    created () {
        if(!!this.$store.state.pageSeach.pageNum){
            this.query=this.$store.state.pageSeach;
            this.resData.pageSize=this.$store.state.pageSeach.pageSize;
            this.resData.pageNum=this.$store.state.pageSeach.pageNum;
        }
        this.$store.state.pageSeach=this.query;
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
          // 前后台交互数据封装格式
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
                code:undefined,
                name: undefined, // 查询条件
                orderBy:undefined
            }
        },
        //  排序查询
        sortChangeFunc(value){
            let sortType=" desc"
            if(value.order != null) {
                if (value.order.startsWith("asc")) {
                    sortType = " asc";
                }
                this.query.orderBy = value.prop + sortType;
                this.list();
            }
        },
      // ------------------------------------------------- 处理方法 ----------------------------------------
        //  回车查询
        searchEnterFun(e){
          this.$store.state.pageSeach.pageNum=1;
          this.resData.pageNum=1;
          keyBoardEnter(e, () => {
            this.list();
          })
        },
        //  查询
        // search(){
        //     this.$store.state.pageSeach.pageNum=1;
        //     this.resData.pageNum=1;
        //     this.list();
        // },
      //  获取用户分页列表
      list () {
          this.$store.state.pageSeach=this.query;
        dosageDroupList(this.resData, this.query).then(res => {
          this.resData = res.data
        })
      },
      //  重置
      reset(){
        this.query.name=undefined;
        this.resData=this.metaData();
        this.list();
      },
      //  单击跳转新增页面
      goAdd(){
        this.$router.push("/DATA/basedata/authdata/dosPackageInsert");
      },
        //  修改
        goDosageGroupInfo(id){
            this.$router.push("/DATA/basedata/authdata/dosPackageUpdate/"+id);
        },
        getRowKeys(row){
            return row.id;
        },

        //  选择选中对象存入数据组中
        handleSelectionChange(val){
            this.assoList = val;
        },
        //  删除
        goDelete(){
            if (this.assoList.length > 0) {
                this.$confirm('确认删除' + this.assoList.length + '个信息', '确认', {
                    confirmButtonText: '确定',
                    cancelButtonText: '重选',
                    type: 'warning'
                }).then(() => {
                    var ids = [];
                for (var row of this.assoList) {
                    ids.push(row.id);
                }
                deleteDosageGroup(ids.toString()).then(res => {
                    this.$message({
                            message: res.data,
                            type: 'success',
                            duration: 1000,
                            onClose: () => {
                            this.list();
                this.$refs.multipleTable.clearSelection();
            }
            })
            })
            });
            } else {
                this.$alert('请至少选择一条数据', '提示', {
                    confirmButtonText: '确定',
                    type: 'warning',
                });
                return false;
            }
        },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
          this.$store.state.pageSeach.pageSize=val;
        this.resData.pageSize = val;
        this.list();
      },
      handleCurrentChange (val) {
          this.$store.state.pageSeach.pageNum=val;
        this.resData.pageNum = val;
        this.list();
      }
    }
  }
</script>

