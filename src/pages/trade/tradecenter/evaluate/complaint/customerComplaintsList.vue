<template>
  <div>
    <!-- ========================== 用户投诉 ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" class="table-form" :inline="true">
          <el-form-item class="width-120">
            <el-input v-model="query.beComplainedOrgName" v-if="roleCode!='send'" @keyup.enter.native="searchEnterFun" placeholder="被投诉企业" size="small"></el-input>
            <el-input v-model="query.beComplainedOrgName" v-if="roleCode==='send'" @keyup.enter.native="searchEnterFun" placeholder="投诉企业" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-date-picker type="date" class="width-120" placeholder="投诉日期" @keyup.enter.native="searchEnterFun" v-model="query.searchBenDate"  format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
             &nbsp;至&nbsp;
            <el-date-picker type="date" class="width-120" placeholder="投诉日期" @keyup.enter.native="searchEnterFun" v-model="query.searchEndDate"  format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
            <el-button type="warning" size="small" @click="resetQuery()">重置</el-button>
          </el-form-item>
        </el-form>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe
          @sort-change="sortChang"
        >
          <!--<el-table-column type="index" width="50" header-align="left" align="center" label="序号"></el-table-column>-->
          <el-table-column label="投诉编号" prop="e.code" sortable="custom">
            <template slot-scope="scope">
              {{ scope.row.code }}
            </template>
          </el-table-column>
            <el-table-column label="被投诉企业" prop="e.beComplainedOrgName " sortable="custom" >
            <template slot-scope="scope">
              <span>{{ scope.row.beComplainedOrgName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="投诉机构" prop="e.buyerOrgName " sortable="custom" >
            <template slot-scope="scope">
              {{ scope.row.buyerOrgName }}
            </template>
          </el-table-column>
          <el-table-column label="投诉时间" width="120" prop="e.CREATED_AT" sortable="custom" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createdAt }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="100" prop="e.stateName " sortable="custom" align="center">
            <template slot-scope="scope">
              {{ scope.row.stateName }}
            </template>
          </el-table-column>
          <el-table-column label="扣分情况" width="100" prop="e.deduction_Score " sortable="custom" >
            <template slot-scope="scope"  v-if="scope.row.state==4">
              {{ scope.row.deductionScore}}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <div class="operates">
                <a @click="showDetails(scope.row.id,scope.row.orderItemId)" title="详情" class="green" size="small">详情</a>
                <a v-if="scope.row.state==='1'&&roleCode!='send'" @click="toHealthBureau(scope.row.id)" title="上报" class="green" size="small">上报</a>
                <a v-if="scope.row.state==='1'&&roleCode!='send'" @click="revoke(scope.row.id)" title="撤销" class="green" size="small">撤销</a>
                <a v-if="scope.row.state==='1'&&roleCode!='send'" @click="updateComplaint(scope.row.beComplainedOrgType,scope.row.id,scope.row.orderItemId)" title="修改" class="green" size="small">修改</a>
              </div>
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
          <el-button type="success" size="small" @click="addComplaint()" v-if="roleCode!='send'">新增</el-button>
        </div>
      </div>

    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求
  import {queryCustomerComplaintsList,upToHealthBureau,revokeComplaint,getRoleCode} from 'src/axios/trade/evaluate/evaluate'
  import {priceFormat,keyBoardEnter} from "src/utils";

  export default {
    name:'query-wait-handle-list',
    data () {
      return {
        currentOrder: undefined,
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        roleCode:'',
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
      this.getRoleCode()
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      sortChang(value){
        let sortType=" desc"
        if(value.order.startsWith("asc")){
          sortType=" asc";
        }
        this.currentOrder=value.prop + sortType;
        this.list()
      },

      metaData () {
        return {
          // 前后台交互数据封装格式
          orderBy: undefined,
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
            beComplainedOrgName:undefined,
            searchBenDate:undefined,
            searchEndDate:undefined
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        queryCustomerComplaintsList(this.resData, this.query).then(res => {
          this.resData = res.data
          if(this.resData.pageNum===0){
            this.resData.pageNum=1
          }
        })
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      getRoleCode(){
        getRoleCode().then(res => {
            this.roleCode = res.data
          })
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
      addComplaint(){
        this.$router.push("/trade/manage/customerComplaintTabs")
      },
      showDetails(id,orderItemId){
        this.$router.push("/trade/manage/tradeComplainDetails/"+id+"/"+orderItemId)
      },
      updateComplaint(type,id,orderId){
        if(orderId==null){
          this.$router.push("/trade/manage/createCompanyComplain/"+id+"/update/"+type)
        }else{
          this.$router.push("/trade/manage/createTradeComplain/"+type+"/"+id+"/"+orderId)
        }
      },
      toHealthBureau(id){
        this.$confirm(`确定上报到卫生局？`, '信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          upToHealthBureau(id).then(res => {
            this.$message({
              message: '上报成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.list()
              }
            })
          })
        }).catch(() => {
        });
      } ,
      revoke(id){
        this.$confirm(`确定撤销投诉？`, '信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          revokeComplaint(id).then(res => {
            this.$message({
              message: '撤销成功',
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
    }
  }
</script>

