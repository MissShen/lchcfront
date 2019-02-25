<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
              <el-form-item class="width-120">
                <el-select v-model="query.searchType" placeholder="请选择" size="small">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item class="width-100">
                <el-input v-model="query.searchContent" placeholder="关键词" @keyup.enter.native="searchEnterFun" size="small"></el-input>
              </el-form-item>

              <el-form-item class="width-120">
                <el-select v-model="query.tempCode" placeholder="临时编码" size="small">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item class="width-120">
                <el-select v-model="query.myCode" placeholder="自主编码" size="small">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item class="width-100">
                <el-input v-model="query.createUsername" placeholder="创建人" size="small" @keyup.enter.native="searchEnterFun"></el-input>
              </el-form-item>

              <el-form-item>
                <el-date-picker
                  v-model="query.createDate"
                  type="date"
                  placeholder="创建日期" size="small">
                </el-date-picker>
              </el-form-item>

              <el-form-item class="width-100">
                <el-input v-model="query.lastUpdateUsername" placeholder="最后修改人" size="small" @keyup.enter.native="searchEnterFun"></el-input>
              </el-form-item>

              <el-form-item>
                <el-date-picker
                  v-model="query.lastUpdateDate"
                  type="date"
                  placeholder="最后修改日期" size="small">
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
          <el-table-column type="selection" align="center" :reserve-selection="true" width="50"></el-table-column>

          <el-table-column label="ATC编码">
            <template slot-scope="scope">
              <span>{{ scope.row.code }}</span>
            </template>
          </el-table-column>

          <el-table-column label="ATC中文名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.nameChn }}</span>
            </template>
          </el-table-column>

          <el-table-column label="DDD" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.DDD }}</span>
            </template>
          </el-table-column>

          <el-table-column label="给药途径" width="140" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.useMethod }}</span>
            </template>
          </el-table-column>

          <el-table-column label="ATC解刨学分类" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.anatomySortName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="ATC治疗学分类" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.therapeuticsSortName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="ATC药理学分类" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.pharmacologySortName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="ATC化学分类" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.chemistrySortName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="临时数据" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.tempCode == '1'?'是':'否' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <div class="operates"><a class="operation-btn" href="javascript:;" @click="goDetail(scope.row.id)">查看</a>
                <a class="operation-btn" href="javascript:;" @click="goEdit(scope.row.id)">修改</a></div>
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

  import {catListPage,deleteCatAtcByIds} from 'src/axios/datacenter/basedata/catatccategory/catatclist';
  import {keyBoardEnter} from "src/utils";

  export default {
    data () {
      return {
        categorys:'',
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        deleteDataList:[],
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        options: [{
          value: '1',
          label: 'ATC编码'
        },{
          value: '2',
          label: 'ATC中文名称'
        },{
          value: '3',
          label: 'ATC英文名称'
        },{
          value: '4',
          label: '通用名'
        },{
          value: '5',
          label: '药品编码'
        }],
        options1: [{
          value: '1',
          label: '是'
        },{
          value: '0',
          label: '否'
        }],
      }
    },
    created () {
      this.query = this.$store.state.pageSeach;
      this.resData.pageSize = this.$store.state.pageSeach.pageSize;
      this.resData.pageNum = this.$store.state.pageSeach.pageNum;
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
          lastUpdateDate:"",
          createDate:"",
          searchType:"1",
          searchContent:"",
          createUsername:"",
          lastUpdateUsername:"",
          myCode:"",
          tempCode:""
        }
      },
      // search(){//查询
      //   this.$store.state.pageSeach.pageNum = 1;
      //   this.resData.pageNum=1;
      //   this.list();
      // },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      list () {
        this.$store.state.pageSeach = this.query;
        catListPage(this.query, this.resData).then(res => {
          this.resData = res.data
        })
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      getRowkeys(row){
        return row.id;
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
          deleteCatAtcByIds(codes.join(',').toString()).then(res=>{
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
      //重置
      resetForm() {
        this.query = this.metaQuery();
        this.$refs.tableInfo.clearSelection();
        this.list();
      },
      goAdd(){
        this.$router.push("/DATA/basedata/atccode/insertForm")
      },
      goDetail(id){
        this.$router.push("/DATA/basedata/atccode/tableDetail/"+id)
      },
      goEdit(id){
        this.$router.push("/DATA/basedata/atccode/updateForm/"+id)
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


