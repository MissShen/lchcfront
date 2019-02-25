<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">

            <el-form-item class="width-160">
              <el-select v-model="query.searchType" size="small">
                <el-option label="企业名称" value="0"></el-option>
                <el-option label="企业编码" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="width-160">
              <el-input v-model="query.searchText" placeholder="关键词" size="small" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>

          <span v-if="showQuery">
            <el-form-item class="width-160">
              <el-select v-model="query.retailType" placeholder="企业类型" size="small">
                <el-option label="单体零售企业" value="1"></el-option>
                <el-option label="零售连锁企业" value="2"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item class="width-160">
              <el-select v-model="query.loadUser" placeholder="录入人" size="small">
                <el-option
                        v-for="item in loadUsers.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-date-picker type="date" placeholder="录入时间-开始" v-model="query.loadBeginDate" size="small"></el-date-picker>
              &nbsp;到&nbsp;
              <el-date-picker type="date" placeholder="录入时间-结束" v-model="query.loadEndDate" size="small"></el-date-picker>
            </el-form-item>
            <el-form-item class="width-160">
              <el-select v-model="query.memberType" placeholder="会员类型" size="small">
                <el-option label="会员" value="1"></el-option>
                <el-option label="非会员" value="0"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item class="width-160">
              <el-select v-model="query.updateUser" placeholder="修改人" size="small">
                <el-option
                        v-for="item in updateUsers.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-date-picker type="date" placeholder="修改时间-开始" v-model="query.updateBeginDate" size="small"></el-date-picker>
              &nbsp;到&nbsp;
              <el-date-picker type="date" placeholder="修改时间-结束" v-model="query.updateEndDate" size="small"></el-date-picker>
            </el-form-item>
          </span>
          <el-form-item>
            <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
            <el-button type="warning" @click="resetForm()" size="small">重置</el-button>
            <el-button v-if="showForm" @click="more()" size="small">更多</el-button>
            <el-button v-if="showQuery" @click="less()" size="small">收起</el-button>
          </el-form-item>
        </el-form>
      <div class="foot-btn">
        <div class="foot-left">
          <el-button type="success" size="small" @click="goAdd()">新增</el-button>
          <el-button type="danger" size="small" @click="handleDelete()">删除</el-button>
        </div>
      </div>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table ref="multipleTable"
          :row-key="getRowKeys"
          :data="resData.list"
          @selection-change="handleSelectionChange"
          @sort-change="sortChangeFunc"
          border
          stripe>
          <el-table-column type="selection" :reserve-selection="true" width="50" align="center"></el-table-column>
          <el-table-column label="企业类型" prop="retail_type" sortable="custom" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.retailType }}</span>
            </template>
          </el-table-column>
          <el-table-column label="企业代码" prop="code" sortable="custom" width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.code }}</span>
            </template>
          </el-table-column>
          <el-table-column label="企业名称" prop="name" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="企业简称" prop="abbr" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.abbr }}</span>
            </template>
          </el-table-column>
          <el-table-column
                  fixed="right"
                  label="操作"
                  width="100">
            <template slot-scope="scope">
              <div class="operates"><a href="javascript:;" class="operation-btn" size="small" @click="goInfo(scope.row.id)">查看</a>
                <a href="javascript:;" class="operation-btn" size="small" @click="goEdit(scope.row.id)">修改</a></div>
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
  import {retailList,queryLoadUsersList,queryUpdateUsersList,del} from 'src/axios/datacenter/orgdata/retailorg/retailorg'
  import {keyBoardEnter} from "src/utils";

  export default {
    data () {
      return {
        activeName: '1',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: true, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        loadUsers:this.loadUserData(),
        updateUsers:this.updateUserDate(),
        selectDataList:[],
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        }
      }
    },
    created () {
      if(!!this.$store.state.pageSeach.pageNum){
        this.query=this.$store.state.pageSeach;
        this.resData.pageSize=this.$store.state.pageSeach.pageSize;
        this.resData.pageNum=this.$store.state.pageSeach.pageNum;
      }
      this.$store.state.pageSeach=this.query;
      this.list();
      this.loadUserList();
      this.updateUserList();
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {// 前后台交互数据封装格式
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
      // 表单查询数据初始化
      metaQuery () {
        return {
          searchType: '0',
          searchText: undefined,
          updateEndDate: undefined,
          updateBeginDate: undefined,
          loadEndDate: undefined,
          loadBeginDate: undefined,
          retailType:undefined,
          loadUser:undefined,
          memberType:undefined,
          updateUser:undefined,
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
      //  回车查询
      searchEnterFun:function (e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list2();
        })
      },
      //  查询
      search(){
        this.$store.state.pageSeach.pageNum=1;
        this.resData.pageNum=1;
        this.list2();
      },
      //  录入人数据初始化
      loadUserData(){
        return{
          options:undefined,
          value:''
        }
      },
      //  修改人数据初始化
      updateUserDate(){
        return{
          options:undefined,
          value:''
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  查询重置
      list2 () {
        this.$refs.multipleTable.clearSelection();
        this.$store.state.pageSeach=this.query;
        retailList(this.resData, this.query).then(res => {
          this.resData = res.data
      })
      },
      //  获取用户分页列表
      list () {
        this.$store.state.pageSeach=this.query;
        retailList(this.resData, this.query).then(res => {
          this.resData = res.data
        })
      },
      //  获取录入人信息
      loadUserList(){
        queryLoadUsersList().then(res => {
          this.loadUsers.options = res.data;
        })
      },
      //  获取修改人信息
      updateUserList(){
        queryUpdateUsersList().then(res => {
          this.updateUsers.options = res.data;
        })
      },
      //  重置
      resetForm() {
        this.query = this.metaQuery();
        this.resData= this.metaData();
        this.list2();
      },
      //  更多查询选项
      more(){
        this.showForm=false;
        this.showQuery=true;
      },
      less(){
        this.showForm=true;
        this.showQuery=false;
      },
      getRowKeys(row){
        return row.id;
      },
      //  删除选中的记录
      handleSelectionChange(val){
        this.selectDataList=val;
      },
      handleDelete() {
        if (this.selectDataList.length < 1) {
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false;
        } else {
          this.$confirm(`确定删除选中的`+this.selectDataList.length+`条数据吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var ids = [];
          for (var row of this.selectDataList) {
            ids.push(row.id);
          }
          del(ids.toString()).then(res => {
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
        }).catch(() => {
          });
        }
      },
      // 跳转新增页面
      goAdd () {
        this.$router.push("/DATA/DatacenterLayDetail/orgdata/retailorg/insertForm");
      },
      //  跳转详情页面
      goInfo(id){
        this.$router.push("/DATA/basedata/orgdata/retailorg/retail/info/" + id);
      },
      goEdit(id){
        this.$router.push("/DATA/DatacenterLayDetail/orgdata/retailorg/updateForm/" + id);
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val;
        this.$store.state.pageSeach.pageSize=val;
        this.list();
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val;
        this.$store.state.pageSeach.pageNum=val;
        this.list();
      }
    }
  }
</script>

