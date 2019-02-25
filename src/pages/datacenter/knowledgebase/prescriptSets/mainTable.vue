<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
            <el-form-item class="width-100">
              <el-input v-model="query.drugName" placeholder="药品名称" @keyup.enter.native="searchEnterFun" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-120">
              <el-select v-model="query.baseDrugFlag" placeholder="基药标识" size="small">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="width-120">
              <el-select v-model="query.medicalInsuranceFlag" placeholder="医保标识" size="small">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="width-120">
              <el-select v-model="query.medicalInsuranceType" placeholder="医保类别" size="small">
                <el-option label="甲类" value="1"></el-option>
                <el-option label="乙类" value="2"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item class="width-100">
              <el-input v-model="query.createUsername" placeholder="操作人" @keyup.enter.native="searchEnterFun" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-150">
              <el-input v-model="query.formularyCategoryName" placeholder="处方集分类最后一层" @keyup.enter.native="searchEnterFun" size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-date-picker class="width-120" type="date" placeholder="创建开始日期" v-model="query.startTime" size="small"></el-date-picker>
              &nbsp;到&nbsp;
              <el-date-picker class="width-120" type="date" placeholder="创建结束日期" v-model="query.endTime" size="small"></el-date-picker>
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
          border
          @selection-change="handleSelectionChange"
          stripe>
          <el-table-column type="selection" :reserve-selection="true" width="50" align="center"></el-table-column>
          <el-table-column label="药品名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.drugName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="基药标识" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.baseDrugFlag == 1?'是':'否' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="医保标识" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.medicalInsuranceFlag == 1?'是':'否' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="医保类别" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.medicalInsuranceType == 1?'甲类':'乙类' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="处方集分类最后一层" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.formularyCategoryName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="制剂与规格" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.preparationSpecification }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <div class="operates"><a href="javascript:;" @click="goDetail(scope.row.id)" class="operation-btn">查看</a>
                <a href="javascript:;" @click="goEdit(scope.row.id)" class="operation-btn">修改</a></div>
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

  import {formularyList,deleteCatFormularyByIds} from 'src/axios/datacenter/basedata/formulary/formulary'
  import {keyBoardEnter} from "src/utils";

  export default {
    data () {
      return {
        activeName: '2',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        deleteDataList:[],
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
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {// 前后台交互数据封装格式
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
            drugName: "",
            formularyCategoryName: "",
            startTime: "",
            endTime: "",
            baseDrugFlag: "",
            medicalInsuranceFlag: "",
            medicalInsuranceType: "",
            createUsername: "",
          }
        }
      },
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
      getRowkeys(row){
        return row.id;
      },
      search(){//查询
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        this.list();
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.$store.state.pageSeach = this.query;
        formularyList(this.query, this.resData).then(res => {
          this.resData = res.data
        })
      },
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
                return data.id
              })
          deleteCatFormularyByIds(codes.join(',').toString()).then(res=>{
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
      goAdd(){
        this.$router.push("/DATA/basedata/knowledgebase/prescriptSets/insertForm")
      },
      goDetail(id){
        this.$router.push("/DATA/basedata/knowledgebase/prescriptSets/tableDetail/"+id)
      },
      goEdit(id){
        this.$router.push("/DATA/basedata/knowledgebase/prescriptSets/updateForm/"+id)
      },
      handleSelectionChange(val){
        this.deleteDataList=val
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

