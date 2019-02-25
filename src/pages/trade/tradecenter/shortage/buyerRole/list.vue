<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
          <el-form-item class="width-120">
            <el-input v-model="query.searchMedicalName" @keyup.enter.native="searchEnterFun"  placeholder="产品名称"  size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-120">
            <el-input v-model="query.searchDaseageFormName" @keyup.enter.native="searchEnterFun"  placeholder="剂型名称"  size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-120">
            <el-input v-model="query.searchSpec" placeholder="制剂规格" @keyup.enter.native="searchEnterFun"   size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-120">
            <el-input v-model="query.searchStandRate" placeholder="转换系数"  @keyup.enter.native="searchEnterFun"  size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-120">
            <el-input v-model="query.searchManufactureName" placeholder="生产企业名称  " @keyup.enter.native="searchEnterFun"   size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-120">
                <el-select v-model="query.searchState" placeholder="状态"  @keyup.enter.native="searchEnterFun"  size="small">
                <el-option label="已提交" value="1"></el-option>
                <el-option label="未提交" value="0"></el-option>
              </el-select>
           </el-form-item>
          <el-form-item>
            <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
            <el-button type="warning" size="small" @click="resetQuery()">重置</el-button>
          </el-form-item>
        </el-form>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table :data="resData.list" @selection-change="handleSelectionChange" @sort-change="sortChang" style="width: 100%" border stripe>
          <el-table-column type="selection" header-align="left" align="center" width="55" :selectable="checkSelectable"></el-table-column>
          <el-table-column label="批准文号" prop="PERMIT_NUMBER" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.permitNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品名称" prop="MEDICAL_NAME" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.medicalName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="剂型名称" prop="DOSEAGE_FORM_NAME" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.doseageFormName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="制剂规格" prop="spec" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.spec }}</span>
            </template>
          </el-table-column>
          <el-table-column label="转换系数"  width="90" prop="STAND_RATE" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.standRate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="生产企业名称" prop="MANUFACTURE_NAME" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.manufactureName }}</span>
            </template>
          </el-table-column>
          <el-table-column  label="填表状态" width="90" prop="STATE" sortable="custom">
            <template slot-scope="scope">
              <span v-if="scope.row.state==0">未提交</span>
              <span v-else>已提交</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
                  <span v-if="scope.row.state==0&&key!=='check'"><a @click="changeOrderItemState(scope.row.id)" class="operation-btn">&nbsp修改&nbsp</a></span>
                  <span v-else><a class="operation-gray">修改</a></span>
                  <span><a @click="showAllInfo(scope.row.id)" class="operation-btn">详情</a></span>
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
          <el-button type="success" size="small" @click="doAdd()" v-if="this.key==='operator'">新增</el-button>
          <el-button type="primary" size="small" @click="submitToWsj()"  v-if="this.key==='operator'">提交</el-button>
          <el-button type="danger" size="small" @click="deleteFromTable()"  v-if="this.key==='operator'">删除</el-button>
          <el-button type="" size="small" @click="returnEx()">返回</el-button>
        </div>
      </div>

    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求
  import {queryDqyOrgShortageList,deleteShortageByIds,submitShortageByIds} from  'src/axios/trade/shortage/buyerRole/shortageUpList'
  import {priceFormat,keyBoardEnter} from "src/utils";

  export default {
    data () {
      return {
        activeName: 'first',  // 当前标签
        currentOrder:undefined,
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        chooseList: [],
        key:'',
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
      this.query.id=this.$route.params.id;
      this.key=this.$route.params.key;
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
          // 前后台交互数据封装格式
          orderBy:undefined,

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
            list: [],

        }
      },
      metaQuery () { // 表单查询数据初始化
        return {

            id:undefined,
            searchMedicalName: undefined,
            searchDaseageFormName: undefined,
            searchSpec: undefined,
            searchStandRate: undefined,
            searchManufactureName: undefined,
            searchState: undefined

        }
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        queryDqyOrgShortageList(this.resData, this.query).then(res => {
          this.resData = res.data
          if(this.resData.pageNum===0){
            this.resData.pageNum=1
          }
        })
      },
      sortChang(value){
        let sortType=" desc"
        if(value.order.startsWith("asc")){
          sortType=" asc";
        }
        this.currentOrder=value.prop + sortType;
        this.list()
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      },
      resetQuery() {
        this.query = this.metaQuery();
        this.list()
      },
      handleSelectionChange(val){
        this.chooseList = val
      },
      returnEx(){
        window.history.go(-1)
      },
      doAdd(){
      this.$router.push("/trade/dataReport/shortageProductList/"+this.query.id)
    },
      deleteFromTable() {
        if(this.chooseList.length<1){
          this.$alert('请选择需要删除的短缺药品！', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })
          return false
        }else{
          this.$confirm(`是否删除短缺药品`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var idList=[], arr = this.chooseList;
            for(var i=0; i<arr.length; i++){
              idList.push(arr[i].id)
            }
            deleteShortageByIds(idList).then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.list()
                }
              })
            })
          }).catch(() => {
          });
        }
      },
      submitToWsj() {
        if(this.chooseList.length<1){
          this.$alert('请选择需要提交的短缺药品！', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })
          return false
        }else{
          this.$confirm(`短缺药品提交以后不能进行删除和修改，是否提交！`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var idList=[], arr = this.chooseList;
            for(var i=0; i<arr.length; i++){
              idList.push(arr[i].id)
            }
            submitShortageByIds(idList).then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.list()
                }
              })
            })
          }).catch(() => {
          });
        }
      },
      checkSelectable(row, index) {
        //通过state来禁止不能选择的项
         return row.state != 1

      },
      changeOrderItemState(id){
        this.$router.push("/trade/dataReport/addOrUpdateList/edit/"+id)
      },
      showAllInfo(id){
        this.$router.push("/trade/dataReport/showAllInfo/"+id)
      },
    }
  }
</script>

