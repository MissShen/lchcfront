<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
        <el-form-item class="width-100">
          <el-input v-model="query.drugName" placeholder="公告药品名称" size="small"
                    @keyup.enter.native="searchEnterFun"></el-input>
        </el-form-item>
        <el-form-item class="width-100">
          <el-input v-model="query.drugCode" placeholder="药品编码" size="small"
                    @keyup.enter.native="searchEnterFun"></el-input>
        </el-form-item>
        <el-form-item class="width-100">
          <el-input v-model="query.proclamationNumber" placeholder="公告号" size="small"
                    @keyup.enter.native="searchEnterFun"></el-input>
        </el-form-item>
        <el-form-item class="width-100">
          <el-input v-model="query.protectionionNumber" placeholder="保护品种号" size="small"
                    @keyup.enter.native="searchEnterFun"></el-input>
        </el-form-item>
        <el-form-item class="width-100">
          <el-input v-model="query.corpName" placeholder="生产企业名称" size="small"
                    @keyup.enter.native="searchEnterFun"></el-input>
        </el-form-item>
        <el-form-item class="width-120">
          <el-select v-model="query.protectStatus" placeholder="保护状态" size="small"
                     @keyup.enter.native="searchEnterFun">
            <el-option label="保护中" value="0"></el-option>
            <el-option label="终止保护" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="width-100">
          <el-input v-model="query.createUserName" placeholder="录入人名称" size="small"
                    @keyup.enter.native="searchEnterFun"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker type="date" class="width-130" placeholder="录入开始时间" v-model="query.beginDate" size="small"
                          @keyup.enter.native="searchEnterFun"></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-date-picker type="date" class="width-130" placeholder="录入结束时间" v-model="query.endDate" size="small"
                          @keyup.enter.native="searchEnterFun"></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="success" size="small" @click="search">查询</el-button>
          <el-button type="warning" size="small" @click="resetForm">重置</el-button>
        </el-form-item>

      </el-form>

      <div class="foot-btn">
        <div class="foot-left">
          <el-button type="success" size="small" @click="goAdd">
            新增
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete()">
            删除
          </el-button>
        </div>
      </div>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          @selection-change="handleSelectionChange"
          ref="mainTable"
          :row-key="getRowKeys"
          @sort-change="sortChange"
          border
          stripe>
          <el-table-column align="center" type="selection" width="50" :reserve-selection="true"></el-table-column>
          <el-table-column label="公告药品名称" show-overflow-tooltip sortable="custom" prop="DRUG_NAME">
            <template slot-scope="scope">
              <span>{{ scope.row.drugName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="公告生产企业" show-overflow-tooltip sortable="custom" prop="CORP_NAME">
            <template slot-scope="scope">
              <span>{{ scope.row.corpName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="关联企业名称" show-overflow-tooltip sortable="custom" prop="COMPANY_NAME">
            <template slot-scope="scope">
              <span>{{ scope.row.companyName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="公告号" show-overflow-tooltip sortable="custom" prop="PROCLAMATION_NUMBER">
            <template slot-scope="scope">
              <span>{{ scope.row.proclamationNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column label="保护开始日期" width="120" sortable="custom" prop="PROTECTIONION_START_DATE">
            <template slot-scope="scope">
              <span>{{ scope.row.protectionionStartDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="保护终止日期" width="120" sortable="custom" prop="PROTECTIONION_EXPIRY_DATE">
            <template slot-scope="scope">
              <span>{{ scope.row.protectionionExpiryDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="公告时间" width="120" sortable="custom" prop="BULLETIN_DATE">
            <template slot-scope="scope">
              <span>{{ scope.row.bulletinDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="保护状态" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.protectionionExpiryDate >= scope.row.protectStatus ? "保护中" : "终止保护" }}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <div class="operates"><a class="operation-btn" size="small" @click="goInfo(scope.row.id)">查看</a>
                <a class="operation-btn" size="small" @click="goEdit(scope.row.id)">修改</a></div>
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
  import {list} from 'src/axios/datacenter/authdata/cnprotecteddrug/cnProtected'
  import {deleteCnProtectedByIds} from 'src/axios/datacenter/authdata/cnprotecteddrug/cnProtected'

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
        deleteDataList: []
      }
    },

    created () {
      if (!!this.$store.state.pageSeach.pageNum) {
        this.query = this.$store.state.pageSeach;
        this.resData.pageSize = this.$store.state.pageSeach.pageSize;
        this.resData.pageNum = this.$store.state.pageSeach.pageNum;
      }
      this.list();
    },

    methods: {

      sortChange(value){
        let sortType = " desc";
        if (value.order != null) {
          if (value.order.startsWith("asc")) {
            sortType = " asc";
          }
          this.query.orderBy = value.prop + sortType;
          this.list()
        }
      },

      getRowKeys(row){
        return row.id
      },

      search() {
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        this.list();
      },

      //初始化数据
      list () {
        this.$store.state.pageSeach = this.query;
        list(this.query, this.resData).then(res => {
          this.resData = res.data;
          if (this.resData.pageNum == 0) {
            this.resData.pageNum = 1
          }
        })
      },

      handleDelete() {
        if (this.deleteDataList.length < 1) {
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false
        } else {
          this.$confirm('确定删除选中的' + this.deleteDataList.length + '条数据吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var ids = [];
            for (var row of this.deleteDataList) {
              ids.push(row.id)
            }
            deleteCnProtectedByIds(ids.toString()).then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.$refs.mainTable.clearSelection();
                  this.list()
                }
              })
            })
          }).catch(() => {
          });
        }
      },

      handleSelectionChange(val){
        this.deleteDataList = val;
      },

      //重置
      resetForm() {
        this.$refs.mainTable.clearSelection();
        this.query = this.metaQuery();
        this.resData = this.metaData();
        this.list();
      },

      searchEnterFun: function (e) {
        var keyCode = window.event ? e.keyCode : e.which;
        if (keyCode == 13) {
          this.list();
        }
      },

      goAdd () {
        this.$router.push("/DATA/basedata/authdata/cnpvDrugs/insertForm");
      },
      goInfo(id) {
        this.$router.push("/DATA/basedata/authdata/cnpvDrugs/tableDetail/" + id);
      },
      goEdit(id) {
        this.$router.push("/DATA/basedata/authdata/cnpvDrugs/updateForm/" + id);
      },

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

      metaQuery () {
        return {
          drugName: "",
          drugCode: "",
          proclamationNumber: "",
          protectionionNumber: "",
          corpName: "",
          protectStatus: "",
          createUserName: "",
          beginDate: undefined,
          endDate: undefined,
          orderBy: null
        }
      },

      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val;
        this.$store.state.pageSeach.pageSize = val;
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val;
        this.$store.state.pageSeach.pageNum = val;
        this.list()
      }
    }
  }
</script>

