<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">

        <el-form-item label="禁用状态：">
          <el-radio-group v-model="query.enableFlag">
            <el-radio label="">全部</el-radio>
            <el-radio label="0">是</el-radio>
            <el-radio label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item class="width-120">
          <el-select v-model="query.searchType" size="small">
            <el-option label="品名" value="0"></el-option>
            <el-option label="药品编码" value="1"></el-option>
            <el-option label="发布期数/文号" value="2"></el-option>
            <el-option label="英文名称" value="3"></el-option>
            <el-option label="分类" value="4"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="width-120">
          <el-input v-model="query.searchText" placeholder="关键词" @keyup.enter.native="searchEnterFun"
                    size="small"></el-input>
        </el-form-item>

        <el-form-item class="width-120">
          <el-select v-model="query.otcFlag" placeholder="全部" size="small">
            <el-option label="中药" value="1"></el-option>
            <el-option label="西药" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="width-120">
          <el-input v-model="query.userName" placeholder="录入人名称" @keyup.enter.native="searchEnterFun"
                    size="small"></el-input>
        </el-form-item>

        <el-form-item>
          <el-date-picker type="date" class="width-130" placeholder="录入开始时间" v-model="query.beginDate"
                          size="small"></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-date-picker type="date" class="width-130" placeholder="录入结束时间" v-model="query.endDate"
                          size="small"></el-date-picker>
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
          @selection-change="handleSelectionChange"
          ref="mainTable"
          :row-key="getRowKeys"
          @sort-change="sortChange"
          border
          stripe>
          <el-table-column type="selection" width="50" :reserve-selection="true" align="center"></el-table-column>
          <el-table-column label="中西药类别" width="120" sortable="custom" prop="OTC_FLAG">
            <template slot-scope="scope">
              <span>{{ otcFlag(scope.row.catOtc.otcFlag) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="分类" show-overflow-tooltip sortable="custom" prop="DRUG_CATEGORY">
            <template slot-scope="scope">
              <span>{{ scope.row.catOtc.drugCategory }}</span>
            </template>
          </el-table-column>
          <el-table-column label="公告药品名称" show-overflow-tooltip sortable="custom" prop="BULLETIN_DRUG">
            <template slot-scope="scope">
              <span>{{ scope.row.catOtc.bulletinDrug }}</span>
            </template>
          </el-table-column>
          <el-table-column label="公告剂型" show-overflow-tooltip show-overflow-tooltip sortable="custom"
                           prop="BULLETIN_DOSEAGE_NAME">
            <template slot-scope="scope">
              <span>{{ scope.row.catOtc.bulletinDoseageName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="规格组成" show-overflow-tooltip show-overflow-tooltip sortable="custom" prop="INGREDIENT">
            <template slot-scope="scope">
              <span>{{ scope.row.catOtc.ingredient }}</span>
            </template>
          </el-table-column>
          <el-table-column label="发布期数/文号" sortable="custom" prop="PROCLAMATION_NUMBER">
            <template slot-scope="scope">
              <span>{{ scope.row.catOtc.proclamationNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column label="OTC类别" width="100" sortable="custom" prop="OTC_TYPE">
            <template slot-scope="scope">
              <span>{{ otcType(scope.row.catOtc.otcType) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否禁用" width="80" sortable="custom" prop="ENABLE_FLAG">
            <template slot-scope="scope">
              <span>{{ enableFlag(scope.row.catOtc.enableFlag) }}</span>
            </template>
          </el-table-column>

          <el-table-column
            fixed="right"
            label="操作"
            width="160">
            <template slot-scope="scope">
              <div class="operates"><a class="operation-btn" @click="goInfo(scope.row.catOtc.id)">查看</a>
                <a @click="goEdit(scope.row.catOtc.id)" class="operation-btn">修改</a>
                <a @click="goBulletin(scope.row.catOtc.id)" class="operation-btn">公告信息</a></div>
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
  import {list} from 'src/axios/datacenter/authdata/otcdrugs/catOtc'
  import {del} from 'src/axios/datacenter/authdata/otcdrugs/catOtc'
  import {keyBoardEnter} from "src/utils";

  export default {
    data () {
      return {
        deleteDataList: [],
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        }
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
        return row.catOtc.id
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
              ids.push(row.catOtc.id)
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

      //OTC_FLAG转换
      otcFlag(status){
        if (status === "0") {
          return "西药"
        } else if (status === "1") {
          return "中药"
        } else {
          return status;
        }
      },

      //OTC_TYPE转换
      otcType(status){
        if (status === "0") {
          return "甲类"
        } else if (status === "1") {
          return "乙类"
        } else {
          return status;
        }
      },

      //ENABLE_FLAG转换
      enableFlag(status){
        if (status === "0") {
          return "是"
        } else if (status === "1") {
          return "否"
        } else {
          return status;
        }
      },

      searchEnterFun(e) {
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },

      goBack() {
        this.$router.go(-1);
      },
      goAdd () {
        this.$router.push("/DATA/basedata/authdata/otcDrugs/insertForm");
      },
      goInfo(id) {
        this.$router.push("/DATA/basedata/authdata/otcDrugs/tableDetail/" + id);
      },
      goEdit(id) {
        this.$router.push("/DATA/basedata/authdata/otcDrugs/updateForm/" + id);
      },
      goBulletin(id) {
        this.$router.push("/DATA/basedata/authdata/otcDrugs/bulletinInfo/" + id);
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

      metaQuery () { // 表单查询数据初始化
        return {
          searchType: "0",
          searchText: "",
          otcFlag: "",
          enableFlag: "",
          userName: "",
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

