<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
          <!-- 第一行 -->
            <el-form-item class="width-100">
              <el-input v-model="query.applyOrg" placeholder="申请人" @keyup.enter.native="searchEnterFun" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-100">
              <el-input v-model="query.drugNameChinese" placeholder="中文通用名" @keyup.enter.native="searchEnterFun" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-100">
              <el-input v-model="query.drugNameEnglish" placeholder="英文通用名" @keyup.enter.native="searchEnterFun" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-100">
              <el-input v-model="query.tradeNameChinese" placeholder="中文商品名" @keyup.enter.native="searchEnterFun" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-100">
              <el-input v-model="query.accreditProclamationNumber" placeholder="授权公告号" @keyup.enter.native="searchEnterFun" size="small"></el-input>
            </el-form-item>

            <el-form-item class="width-100">
              <el-input v-model="query.accreditNumber" placeholder="授权号" @keyup.enter.native="searchEnterFun" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-100">
              <el-input v-model="query.createUserName" placeholder="创建人" @keyup.enter.native="searchEnterFun" size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-date-picker
                v-model="query.startTime"
                type="date"
                placeholder="创建开始时间" size="small" class="width-130">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-date-picker
                v-model="query.endTime"
                type="date"
                placeholder="创建结束时间" size="small" class="width-130">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
              <el-button type="warning" size="small" @click="resetForm()">重置</el-button>
            </el-form-item>
        </el-form>
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
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          ref="tableInfo"
          :data="resData.list"
          :row-key="getRowkeys"
          @selection-change="handleSelectionChange"
          border
          stripe>
          <el-table-column type="selection" :reserve-selection="true" width="50" align="center"></el-table-column>
          <el-table-column label="公告药品名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.drugNameChinese }}</span>
            </template>
          </el-table-column>
          <el-table-column label="公告商品名" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.tradeNameChinese }}</span>
            </template>
          </el-table-column>
          <el-table-column label="申请人" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.applyOrg }}</span>
            </template>
          </el-table-column>
          <el-table-column label="申请企业所在国家" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.countryChinese }}</span>
            </template>
          </el-table-column>
          <el-table-column label="授权号" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.accreditNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column label="行政保护状态" width="140">
            <template slot-scope="scope">
              <span>{{ scope.row.protectionionFlag == '1'?'是':'否' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <div class="operates"><a class="operation-btn" @click="goDetail(scope.row.id)" size="small">查看</a>
                <a class="operation-btn" @click="goEdit(scope.row.id)" size="small">修改</a></div>
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

  import {proDrugPage,del} from 'src/axios/datacenter/authdata/protecteddrug/protecteddrug';
  import {keyBoardEnter} from "src/utils";

  export default {
    data () {
      return {
        deleteDataList:[],
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
      }
    },
    created () {
      if (!!this.$store.state.pageSeach.pageNum) {
        this.query = this.$store.state.pageSeach;
        this.resData.pageSize = this.$store.state.pageSeach.pageSize;
        this.resData.pageNum = this.$store.state.pageSeach.pageNum;
      }
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
            pageNum: 0,
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
          query: {
            applyOrg: undefined,
            drugNameChinese: undefined,
            drugNameEnglish: undefined,
            tradeNameChinese: undefined,
            accreditProclamationNumber: undefined,
            accreditNumber:undefined,
            createUserName:undefined,
            startTime:undefined,
            endTime:undefined,
          }
        }
      },
      search(){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        this.list();
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      list () {
        this.$store.state.pageSeach = this.query;
        proDrugPage(this.query, this.resData).then(res => {
          this.resData = res.data
        })
      },
      getRowkeys(row){
        return row.id;
      },
      //查询
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      resetForm() {
        this.query = this.metaQuery();
        this.$refs.tableInfo.clearSelection();
        this.search();
      },
      handleDelete() {
        if (this.deleteDataList.length < 1) {
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false
        } else {
          this.$confirm('确定删除选中的'+this.deleteDataList.length+'条数据吗?', '提示', {
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
                  this.list();
                  this.$refs.tableInfo.clearSelection();
                }
              })
            })
          }).catch(() => {
          });
        }
      },
      goAdd () {
        this.$router.push("/DATA/basedata/authdata/administration/insertForm");
      },
      goEdit(id){
        this.$router.push("/DATA/basedata/authdata/administration/updateForm/"+id)
      },
      goDetail(id){
        this.$router.push("/DATA/basedata/authdata/administration/tableDetail/"+id)
      },
      handleSelectionChange(val){
        this.deleteDataList = val;
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
      }
    }
  }
</script>

