<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
            <el-form-item class="width-160">
              <el-select v-model="query.searchTypeA" size="small">
                <el-option  label="品名" value="1"></el-option>
                <el-option  label="产品编码" value="2"></el-option>
                <el-option  label="产品ID" value="3"></el-option>
                <el-option  label="批准文号" value="4"></el-option>
                <el-option  label="药品本位码" value="5"></el-option>
                <el-option  label="进口药品注册证号" value="6"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="width-160">
              <el-input v-model="query.searchContentA" placeholder="关键词" size="small" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item class="width-160">
              <el-select v-model="query.searchTypeB" size="small">
                <el-option label="生产企业" value="1"></el-option>
                <el-option label="代理企业" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="width-160">
              <el-input v-model="query.searchContentB" placeholder="关键词" size="small" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
             <el-form-item>
              <el-radio-group v-model="query.enableFlag">
                <el-radio  label="1">正常</el-radio>
                <el-radio  label="0">禁用</el-radio>
              </el-radio-group>
            </el-form-item>

          <span v-if="showQuery" class="ftsz0">
            <el-form-item class="width-160">
              <el-input v-model="query.spec" placeholder="规格" size="small" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item class="width-160">
              <el-select v-model="query.checkFlag" placeholder="审核状态" size="small" @keyup.enter.native="searchEnterFun">
                <el-option label="未审核" value="0"></el-option>
                <el-option label="已通过" value="1"></el-option>
                <el-option label="未通过" value="2"></el-option>
                <!--<el-option label="临时数据" value="3"></el-option>-->
              </el-select>
            </el-form-item>
              <el-form-item class="width-160">
              <el-select v-model="query.medicalInsuranceFlag" placeholder="医保标记" size="small" @keyup.enter.native="searchEnterFun">
                <el-option label="非医保" value="0"></el-option>
                <el-option label="国家医保" value="1"></el-option>
                <el-option label="北京医保" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="width-160">
              <el-select v-model="query.lowestType" placeholder="低价药标记" size="small" @keyup.enter.native="searchEnterFun">
                <el-option label="非低价" value="0"></el-option>
                <el-option label="国家低价" value="1"></el-option>
                <el-option label="北京低价" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="width-160">
              <el-select v-model="query.contractType" placeholder="基药标记" size="small" @keyup.enter.native="searchEnterFun">
                <el-option label="非基药" value="2"></el-option>
                <el-option label="国家基药" value="0"></el-option>
                <el-option label="北京基药" value="1"></el-option>
              </el-select>
            </el-form-item>
          </span>
          <el-form-item>
            <el-button type="success" @click="search()" size="small">查询</el-button>
            <el-button type="warning" @click="resetForm()" size="small">重置</el-button>
            <el-button type="" v-if="showForm" @click="more()" size="small">更多</el-button>
            <el-button type="" v-if="showQuery" @click="less()" size="small">收起</el-button>
          </el-form-item>
        </el-form>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table ref="multipleTable"
          :data="resData.list"
          @sort-change="sortChangeFunc"
          border
          stripe>
          <el-table-column label="通用名" prop="drug_name" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope" >
              <span>{{ scope.row.generalName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品名" prop="trade_name" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.tradeName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="剂型" prop="doseage_form_code" sortable="custom" width="110" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.doseage }}</span>
            </template>
          </el-table-column>
          <el-table-column label="规格" prop="spec" sortable="custom" width="80" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.spec }}</span>
            </template>
          </el-table-column>
          <el-table-column label="单位" prop="metric_id" sortable="custom" width="50">
            <template slot-scope="scope">
              <span>{{ scope.row.metric }}</span>
            </template>
          </el-table-column>
          <el-table-column label="转换比" prop="stand_rate" sortable="custom" width="60" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.standRate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="包材" prop="wrap_code" sortable="custom" width="60" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.wrap }}</span>
            </template>
          </el-table-column>
          <el-table-column label="批准文号" prop="permit_number" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.permitNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column label="生产企业" prop="factory_name" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.factory }}</span>
            </template>
          </el-table-column>
          <el-table-column
                  label="操作"
                  width="160">
            <template slot-scope="scope">
              <div class="operates"><a class="operation-btn" size="small" @click="goSpecialMarks(scope.row.id)">查看</a></div>
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
  import {productList} from 'src/axios/datacenter/productdata/specialmaintain/specialmaintain';
  import {keyBoardEnter} from "src/utils";

  export default {
    components: {
    },
    data () {
      return {
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: true, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
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
      metaQuery () {
        return {
          // 表单查询数据初始化
          searchTypeA: '1',
          searchContentA: undefined,
          searchTypeB: '1',
          searchContentB: undefined,
          enableFlag: undefined,
          spec:undefined,
          checkFlag:undefined,
          medicalInsuranceFlag:undefined,
          lowestType:undefined,
          contractType:undefined,
          orderBy:undefined
        }
      },
      metaData () {
        return {
          // 前后台交互数据封装格式
          pageNum: 1,
          pageSize: 10,
          size: undefined,
          startRow: undefined,
          endRow: undefined,
          total: undefined,
          pages: undefined,
          prePage: undefined,
          nextPage: undefined,
          isFirstPage: true,
          isLastPage: undefined,
          hasPreviousPage: undefined,
          hasNextPage: undefined,
          navigatePages: undefined,
          navigatepageNums: undefined,
          navigateFirstPage: undefined,
          navigateLastPage: undefined,
          firstPage: undefined,
          lastPage: undefined,
          list: undefined
        }
      },
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
          if(this.query.searchContentA || this.query.searchContentB || this.query.spec
            || this.query.checkFlag || this.query.medicalInsuranceFlag || this.query.lowestType
            || this.query.contractType){
            this.list2();
          }
        })
      },
      //  查询
      search(){
        this.$store.state.pageSeach.pageNum=1;
        this.resData.pageNum=1;
        this.list2();
      },

      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  查询重置
      list2 () {
        this.$refs.multipleTable.clearSelection();
        this.$store.state.pageSeach=this.query;
        productList(this.resData, this.query).then(res => {
          this.resData = res.data;
      })
      },
      //  获取用户分页列表
      list () {
        this.$store.state.pageSeach=this.query;
        productList(this.resData, this.query).then(res => {
          this.resData = res.data;
        })
      },

      /*  重置*/
      resetForm() {
        this.query = this.metaQuery();
        this.resData= this.metaData();
        this.list2();
      },
      //  更多查询选项
      more(){
        this.showForm=false;
        this.showQuery=true;
      },
      less(){
        this.showForm=true;
        this.showQuery=false;
      },
      //  跳转查看页面
      goSpecialMarks(id){
        this.$router.push("/DATA/basedata/productdata/specialmaintain/specilMarks/" + id);
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
      }
    }
  }
</script>
<style>
  @import "../../../../assets/css/datacenter.css";
</style>
