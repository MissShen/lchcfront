<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
            <el-form-item>
              <el-input v-model="query.catDrug.nameChn" placeholder="名称" size="small" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="query.catOrg.name" placeholder="生产企业" size="small" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="query.catDrug.spec" placeholder="规格" size="small" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="query.catManual.permitNumber" placeholder="批准文号" size="small" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
              <el-button type="warning" @click="resetForm()" size="small">重置</el-button>
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
        <el-table ref="multipleTable"
          :data="resData.list"
          @selection-change="handleSelectionChange"
          @sort-change="sortChangeFunc"
          :row-key="getRowKeys"
          border
          stripe>
          <el-table-column type="selection" :reserve-selection="true" align="center"></el-table-column>
          <el-table-column label="通用名" prop="general_name" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.catDrug==null?'无':scope.row.catDrug.nameChn }}</span>
            </template>
          </el-table-column>
          <el-table-column label="商业名" prop="TRADE_NAME" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.catProduct.tradeName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="剂型" prop="doseage_name" sortable="custom" width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.catDoseageForm==null?'无':scope.row.catDoseageForm.nameChn }}</span>
            </template>
          </el-table-column>
          <el-table-column label="规格" prop="SPEC" sortable="custom" width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.catDrug.spec }}</span>
            </template>
          </el-table-column>
          <el-table-column label="批准文号" prop="PERMIT_NUMBER" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.catManual.permitNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column label="生产企业" prop="MANUFACTURE_ID" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.catOrg.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="140">
            <template slot-scope="scope">
              <div class="operates"><a href="javascript:;" class="operation-btn" size="small" @click="goInfo(scope.row.catProductManual.manualId)">查看</a>
              <a href="javascript:;" class="operation-btn" @click="goEdit(scope.row.catProductManual.manualId)" size="small">修改</a>
                <a href="javascript:;" class="operation-btn" @click="goCopy(scope.row.catProductManual.manualId)" size="small">复制</a></div>
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
  import {list} from 'src/axios/datacenter/basedata/manual/manual';
  import {del} from 'src/axios/datacenter/basedata/manual/manual';
  import {keyBoardEnter} from "../../../../utils";
  export default {
    data () {
      return {
        query: this.metaQuery(), // 查询初始化
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        deleteDataList: [],
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
          catDrug: {nameChn: '', spec: ''},
          catOrg: {name: ''},
          catManual: {permitNumber: ''},
          orderBy:undefined
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
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
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum=1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list2();
          // if(this.query.catDrug.nameChn || this.query.catOrg.name
          //   || this.query.catDrug.spec || this.query.catManual.permitNumber){
          //   this.list2();
          // }
        })
      },
      //  查询
      // search(){
      //   this.$store.state.pageSeach.pageNum=1;
      //   this.resData.pageNum=1;
      //   this.list2();
      // },
      //  查询重置
      list2 () {
        this.$refs.multipleTable.clearSelection();
        this.$store.state.pageSeach=this.query;
        list(this.query, this.resData).then(res => {
          this.resData = res.data;
      })
      },
      //  获取用户分页列表
      list () {
        this.$store.state.pageSeach=this.query;
        list(this.query, this.resData).then(res => {
          this.resData = res.data;
        })
      },
      resetForm() {
        this.query = this.metaQuery();
        this.resData= this.metaData();
        this.list2();
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
      },
      getRowKeys(row){
        return row.catProductManual.manualId;
      },
      handleSelectionChange(val){
        this.deleteDataList=val;
      },
      handleDelete() {
        if (this.deleteDataList.length < 1) {
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false
        } else {
          this.$confirm(`确定删除选中的`+this.deleteDataList.length+`条数据吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var ids = [];
            for (var row of this.deleteDataList) {
              ids.push(row.catProductManual.manualId)
            }
            del(ids.toString()).then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.list()
                  this.$refs.multipleTable.clearSelection();
                }
              })
            })
          }).catch(() => {
          });
        }
      },
      goAdd () {
        this.$router.push("/DATA/basedata/knowledgebase/drupInstruct/insertForm");
      },
      goInfo(id) {
        this.$router.push("/DATA/basedata/knowledgebase/drupInstruct/tableDetail/" + id);
      },
      goEdit(id) {
        this.$router.push("/DATA/basedata/knowledgebase/drupInstruct/updateForm/"+id);
      },
      goCopy(id) {
        this.$router.push("/DATA/basedata/knowledgebase/drupInstruct/copyForm/"+id);
      }
    }
  }
</script>

