<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
            <el-form-item>
              <el-select v-model="query.searchType" size="small">
                <el-option label="公告药品名称" value="0"></el-option>
                <el-option label="标示生产企业" value="1"></el-option>
                <el-option label="经营企业" value="2"></el-option>
                <el-option label="被抽样单位名称" value="3"></el-option>
                <el-option label="公报时间" value="4"></el-option>
                <el-option label="公报期数" value="5"></el-option>
                <el-option label="总期数" value="6"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input v-model="query.searchText" placeholder="关键词" size="small"
                        @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="query.createUserName" placeholder="录入人名称" size="small"
                        @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-date-picker type="date" placeholder="录入开始时间" v-model="query.beginDate" size="small"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-date-picker type="date" placeholder="录入结束时间" v-model="query.endDate" size="small"></el-date-picker>
            </el-form-item>

            <el-form-item>
              <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
              <el-button type="warning" @click="resetForm" size="small">重置</el-button>
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
          border
          ref="mainTable"
          :row-key="getRowKeys"
          @sort-change="sortChange"
          @selection-change="handleSelectionChange"
          stripe>
          <el-table-column type="selection" width="50" :reserve-selection="true" align="center"></el-table-column>
          <el-table-column label="被抽样单位类型" show-overflow-tooltip sortable="custom" prop="SAMPLED_ORG_TYPE">
            <template slot-scope="scope">
              <span>{{ getOrgType(scope.row.sampledOrgType) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="被抽样单位名称" show-overflow-tooltip sortable="custom" prop="SAMPLED_ORG_NAME">
            <template slot-scope="scope">
              <span>{{ scope.row.sampledOrgName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="公告药品名" show-overflow-tooltip sortable="custom" prop="DRUG_NAME">
            <template slot-scope="scope">
              <span>{{ scope.row.drugName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="规格" show-overflow-tooltip width="90" sortable="custom" prop="DRUG_SPEC">
            <template slot-scope="scope">
              <span>{{ scope.row.drugSpec }}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品批号" show-overflow-tooltip sortable="custom" prop="PERMIT_NUMBER">
            <template slot-scope="scope">
              <span>{{ scope.row.permitNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column label="生产企业" show-overflow-tooltip sortable="custom" prop="MANUFACTURER_NAME">
            <template slot-scope="scope">
              <span>{{ scope.row.manufacturerName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="公报期数" show-overflow-tooltip sortable="custom" prop="PROCLAMATION_NUMBER">
            <template slot-scope="scope">
              <span>{{ scope.row.proclamationNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column label="总期数" show-overflow-tooltip width="70" sortable="custom" prop="PROCLAMATION_TOTAL">
            <template slot-scope="scope">
              <span>{{ scope.row.proclamationTotal }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否撤销基本文号" width="120" sortable="custom" prop="PERMIT_STATE">
            <template slot-scope="scope">
              <span>{{ getPermitState(scope.row.permitState) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="150">
            <template slot-scope="scope">
              <div class="operates"><a class="operation-btn" size="small" @click="goInfo(scope.row.id)">查看</a>
              <a class="operation-btn" @click="goEdit(scope.row.id)" type="text">修改</a>
                <a class="operation-btn" @click="goBulletin(scope.row.id)" type="text">公告信息</a></div>
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

  import {badDrugList} from 'src/axios/datacenter/authdata/qualitybulletin/qualityBulletin'
  import {del} from 'src/axios/datacenter/authdata/qualitybulletin/qualityBulletin'
  import {keyBoardEnter} from "src/utils";

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
        this.resData.pageSize = this.$store.state.pageSeach.pageSize || 10;
        this.resData.pageNum = this.$store.state.pageSeach.pageNum || 1;
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

      list () {
        this.$store.state.pageSeach = this.query;
        badDrugList(this.query, this.resData).then(res => {
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
            del(ids.toString()).then(res => {
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

      getPermitState(val) {
        if (val === "0") {
          return "否";
        } else if (val === "1") {
          return "是";
        } else {
          return val;
        }
      },

      getOrgType(val) {
        switch (val) {
          case "1":
            return "生产企业";
          case "2":
            return "经营企业";
          case "3":
            return "医院";
          case "4":
            return "药店";
          default:
            return val;
        }
      },

      searchEnterFun: function (e) {
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },

      handleSelectionChange(val){
        this.deleteDataList = val;
      },

      resetForm() {
        this.$refs.mainTable.clearSelection();
        this.query = this.metaQuery();
        this.resData = this.metaData();
        this.list();
      },

      goAdd() {
        this.$router.push("/DATA/basedata/authdata/qualityBulletin/insertForm");
      },
      goInfo(id) {
        this.$router.push("/DATA/basedata/authdata/qualityBulletin/tableDetail/" + id);
      },
      goEdit(id) {
        this.$router.push("/DATA/basedata/authdata/qualityBulletin/updateForm/" + id);
      },
      goBulletin(id) {
        this.$router.push("/DATA/basedata/authdata/qualityBulletin/bulletinForm/" + id);
      },

      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() {
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
          searchType: "0",
          searchText: "",
          createUserName: "",
          beginDate: undefined,
          endDate: undefined,
          orderBy:null
        }
      },

      // ************************ 分页操作 ************************
      handleSizeChange(val){
        this.resData.pageSize = val;
        this.$store.state.pageSeach.pageSize = val;
        this.list()
      },

      handleCurrentChange(val){
        this.resData.pageNum = val;
        this.$store.state.pageSeach.pageNum = val;
        this.list()
      }
    }
  }
</script>

