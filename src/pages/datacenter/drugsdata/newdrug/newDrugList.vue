<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <div>
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
            <el-form-item class="width-100">
              <el-select v-model="query.searchType" placeholder="通用名" size="small">
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

            <el-form-item class="width-100">
              <el-input v-model="query.createUser" placeholder="创建人" size="small" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>

            <el-form-item>
              <el-date-picker
                v-model="query.cTimeStart1"
                type="date"
                placeholder="创建开始日期" size="small" class="width-120">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-date-picker
                v-model="query.cTimeEnd1"
                type="date"
                placeholder="创建结束日期" size="small" class="width-120">
              </el-date-picker>
            </el-form-item>
            <el-form-item class="width-100">
              <el-input v-model="query.updateUser" placeholder="修改人" size="small" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>

            <el-form-item>
              <el-date-picker
                v-model="query.uTimeStart1"
                type="date"
                placeholder="修改开始日期" size="small" class="width-120">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-date-picker
                v-model="query.uTimeEnd1"
                type="date"
                placeholder="修改结束日期" size="small" class="width-120">
              </el-date-picker>
            </el-form-item>

            <el-form-item class="width-100">
              <el-select v-model="query.pharmacologyId" placeholder="选择分类" filterable size="small">
                  <el-option
                    v-for="item in categorys"
                    :key="item.pid"
                    :label="item.pname"
                    :value="item.pid">
                  </el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
              <el-button type="warning" @click="resetForm()" size="small">重置</el-button>
            </el-form-item>
        </el-form>

      </div>

      <!-- 表格列表 -->
      <div class="tableset">

        <el-table
          ref="tableInfo"
          :data="resData.list"
          border
          :row-key="getRowkeys"
          @selection-change="handleSelectionChange"
          stripe>
          <el-table-column type="selection" :reserve-selection="true" width="50" align="center"></el-table-column>

          <el-table-column label="通用名" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.nameChn }}</span>
            </template>
          </el-table-column>

          <el-table-column label="ATC编码">
            <template slot-scope="scope">
              <span>{{ scope.row.atcCode }}</span>
            </template>
          </el-table-column>

          <el-table-column label="制剂" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.doseageFormCode }}</span>
            </template>
          </el-table-column>

          <el-table-column label="一级分类" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.name1 }}</span>
            </template>
          </el-table-column>

          <el-table-column label="二级分类" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.name2 }}</span>
            </template>
          </el-table-column>

          <el-table-column label="三级分类" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.name3 }}</span>
            </template>
          </el-table-column>

          <el-table-column label="四级分类" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.name4 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
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

    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  import {catListPage,catList,deleteCatNewPharmacologyByIds} from 'src/axios/datacenter/basedata/catpharmcology/catnewpharmcology'
  import {keyBoardEnter} from "src/utils";

  export default {
    data () {
      return {
        categorys:'',
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
        },
        options: [{
          value: '1',
          label: '通用名'
        },{
          value: '2',
          label: 'ATC编码'
        }],
      }
    },
    created () {
      if(!!this.$store.state.pageSeach.pageNum){
        this.query = this.$store.state.pageSeach;
        this.resData.pageSize = this.$store.state.pageSeach.pageSize;
        this.resData.pageNum = this.$store.state.pageSeach.pageNum;
      }
      this.$store.state.pageSeach=this.query;
      catList().then(res => {
        this.categorys = res.data
      })
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
      //重置
      resetForm() {
        this.query = this.metaQuery();
        this.$refs.tableInfo.clearSelection();
        this.search();
      },
      //查询
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
      metaQuery () { // 表单查询数据初始化
        return {
          cTimeStart:"",
          cTimeEnd:"",
          cTimeStart1:"",
          cTimeEnd1:"",
          uTimeStart:"",
          uTimeEnd:"",
          uTimeStart1:"",
          uTimeEnd1:"",
          searchType:"1",
          searchContent:"",
          pharmacologyId:"",
          createUser:"",
          updateUser:""
        }
      },
      search(){//查询
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        this.list();
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {

        if(this.query.cTimeStart1 != null && this.query.cTimeStart1 != ''){
          this.query.cTimeStart = new Date(this.query.cTimeStart1.getTime() + 24 * 60 * 60 * 1000);
        }
        if(this.query.cTimeEnd1 != null && this.query.cTimeEnd1 != ''){
          this.query.cTimeEnd = new Date(this.query.cTimeEnd1.getTime() + 24 * 60 * 60 * 1000);
        }
        if(this.query.uTimeStart1 != null && this.query.uTimeStart1 != ''){
          this.query.uTimeStart = new Date(this.query.uTimeStart1.getTime() + 24 * 60 * 60 * 1000);
        }
        if(this.query.uTimeEnd1 != null && this.query.uTimeEnd1 != ''){
          this.query.uTimeEnd = new Date(this.query.uTimeEnd1.getTime() + 24 * 60 * 60 * 1000);
        }
        this.$store.state.pageSeach = this.query;
        catListPage(this.query, this.resData).then(res => {
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
          deleteCatNewPharmacologyByIds(codes.join(',').toString()).then(res=>{
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
        this.$router.push("/DATA/basedata/newDrug/insertForm")
      },
      goDetail(id){
        this.$router.push("/DATA/basedata/newDrug/tableDetail/"+id)
      },
      goEdit(id){
        this.$router.push("/DATA/basedata/newDrug/updateForm/"+id)
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
