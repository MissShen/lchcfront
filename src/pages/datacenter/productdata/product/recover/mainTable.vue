<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
        <el-form-item class="width-160">
          <el-select v-model="query.platId" placeholder="全部平台" size="small">
            <el-option
                    v-for="item in plats.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="width-160">
          <el-select v-model="query.searchTypeA" size="small">
            <el-option  label="品名" value="1"></el-option>
            <el-option  label="产品编码" value="2"></el-option>
            <el-option  label="产品ID" value="3"></el-option>
            <el-option  label="批准文号" value="4"></el-option>
            <el-option  label="药品本位码" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="width-160">
          <el-input v-model="query.searchContentA" placeholder="关键词" size="small" @keyup.enter.native="searchEnterFun"></el-input>
        </el-form-item>

          <span v-if="showQuery" class="ftsz0">
            <el-form-item class="width-160">
              <el-select v-model="query.searchTypeB" size="small">
                <el-option label="生产企业" value="1"></el-option>
                <el-option label="代理企业" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="width-160">
              <el-input v-model="query.searchContentB" placeholder="关键词" size="small" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item class="width-160">
              <el-select v-model="query.readyFlag" placeholder="备用标识" size="small">
                <el-option label="全部" value="0"></el-option>
                <el-option label="正常" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="width-160">
              <el-select v-model="query.dataState" placeholder="数据状态" size="small">
                <el-option label="全部" value="0"></el-option>
                <el-option label="中心" value="1"></el-option>
                <el-option label="替换" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-date-picker class="width-200" type="date" placeholder="最后一次审核时间-开始" v-model="query.examineTimeBegin" size="small"></el-date-picker>
              &nbsp;至&nbsp;
              <el-date-picker class="width-200" type="date" placeholder="最后一次审核时间-开始" v-model="query.examineTimeEnd" size="small"></el-date-picker>
            </el-form-item>
          </span>
        <el-form-item>
          <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
          <el-button type="warning" @click="resetForm()" size="small">重置</el-button>
          <el-button type="" v-if="showForm" @click="more()" size="small">更多</el-button>
          <el-button type="" v-if="showQuery" @click="less()" size="small">收起</el-button>
        </el-form-item>
      </el-form>
      <div class="foot-btn">
        <div class="foot-left">
          <el-button type="primary" @click="handleRestore()" size="small">还原</el-button>
        </div>
      </div>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table ref="multipleTable"
                  :data="resData.list"
                  @selection-change="handleSelectionChange"
                  :row-key="getRowKeys"
                  @sort-change="sortChangeFunc"
                  border
                  stripe>
          <el-table-column type="selection" width="50" :reserve-selection="true" align="center"></el-table-column>
          <el-table-column label="通用名" prop="drug_name" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope" >
              <span>{{ setNameChn(scope.row.catDrug) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品名" prop="trade_name" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.catProduct.tradeName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="剂型" prop="doseage_name" sortable="custom" width="110" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ setNameChn(scope.row.catDoseageForm) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="规格" prop="spec" sortable="custom" width="80" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ setSpec(scope.row.catDrug) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="单位" prop="metric_id" sortable="custom" width="50">
            <template slot-scope="scope">
              <span>{{ scope.row.catProduct.metricId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="包材" prop="wrap_code" sortable="custom" width="60" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.catProduct.wrapCode }}</span>
            </template>
          </el-table-column>
          <el-table-column label="价格层次" prop="quality_code" sortable="custom"  width="140">
            <template slot-scope="scope">
              <span>{{ scope.row.catProduct.qualityCode }}</span>
            </template>
          </el-table-column>
          <el-table-column label="生产企业" prop="factory_name" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.catOrg.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="审核标记" prop="check_flag" sortable="custom" width="80">
            <template slot-scope="scope">
              <span>{{ checkStaus(scope.row.catProduct.checkFlag) }}</span>
            </template>
          </el-table-column>
          <el-table-column
                  label="操作"
                  width="120">
            <template slot-scope="scope">
              <div class="operates"><a href="javascript:;" class="operation-btn" v-if="codeExit(scope.row.catProduct)" @click="goCopyCode(scope.row.catProduct)">复制编码</a>
                <a href="javascript:;" class="operation-btn" @click="goProductInfo(scope.row.catProduct)">查看</a></div>
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
    <copyCode v-if="copyCodeVisible" ref="copyCode"></copyCode>
  </div>

</template>
<script>

  // 引入用户相关请求
  import {productRecyleList} from 'src/axios/datacenter/productdata/productinfo/productinfo';
  import {productPlats} from 'src/axios/datacenter/productdata/productinfo/productinfo';
  import {restore} from 'src/axios/datacenter/productdata/productinfo/productinfo';
  import {keyBoardEnter} from "src/utils";
  import copyCode from '../windowPanel/copyCode'

  export default {
    components: {
      copyCode
    },
    data () {
      return {
        copyCodeVisible:false,
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: true, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        plats:this.platData(),
        selectDataList:[],//  全部选中数据
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
      this.setPlats();
    },
    methods: {
      //  回车查询
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum=1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          if(this.query.platId || this.query.searchContentA || this.query.searchContentB
        || this.query.readyFlag || this.query.dataState){
          this.list2();
        }
      })
      },
      //  查询
      // search(){
      //   this.$store.state.pageSeach.pageNum=1;
      //   this.resData.pageNum=1;
      //   this.list2();
      // },
      // -------------------------------------------- 数据初始化  -----------------------------------------
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
      metaQuery () { // 表单查询数据初始化
        return {
          // 表单查询数据初始化
          platId:undefined,
          searchTypeA: '1',
          searchContentA: undefined,
          searchTypeB: '1',
          searchContentB: undefined,
          examineTimeBegin:undefined,
          examineTimeEnd:undefined,
          readyFlag:'0',
          dataState:'0',
          selectList:[],
          orderBy:undefined
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
      //  所在省数据初始化
      platData(){
        return{
          options:undefined,
          value:''
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  查询重置
      list2 () {
        this.$refs.multipleTable.clearSelection();
        this.$store.state.pageSeach=this.query;
        productRecyleList(this.resData, this.query).then(res => {
          this.resData = res.data;
      })
      },
      //  获取用户分页列表
      list () {
        this.$store.state.pageSeach=this.query;
        productRecyleList(this.resData, this.query).then(res => {
          this.resData = res.data;
      })
      },
      setPlats(){
        productPlats().then(res => {
          this.plats.options=res.data;
      })
      },
      //  重置
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
      //  审核状态
      checkStaus(num){
        var status;
        switch (num){
          case "0":
          {status='未审核';}
            break;
          case "1":
          {status='已提交';}
            break;
          case "2":
          {status='未通过';}
            break;
          case "3":
          {status='临时数据';}
            break;
          case "4":
          {status='被质疑';}
            break;
          case "5":
          {status='已通过';}
            break;
        }
        return status;
      },
      getRowKeys(row){
        return row.catProduct.id;
      },
      //  选中的记录
      handleSelectionChange(val){
        this.selectDataList=val;
      },
      //  还原选中产品
      handleRestore() {
        if (this.selectDataList.length < 1) {
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false;
        } else {
          this.$confirm(`确定还原选中的`+this.selectDataList.length+`条数据吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var ids = [];
          for (var row of this.selectDataList) {
            ids.push(row.catProduct.id);
          }
          restore(ids.toString()).then(res => {
            this.$message({
                    message: res.data,
                    type: 'success',
                    duration: 1000,
                    onClose: () => {
                    this.list();
          this.$refs.multipleTable.clearSelection();
        }
        })
        })
        }).catch(() => {
          });
        }
      },
      //  setNameChn
      setNameChn(entity){
        var label='无';
        if(entity!=null){
          label=entity.nameChn;
        }
        return label;
      },
      //  setSpec
      setSpec(entity){
        var label='无';
        if(entity!=null){
          label=entity.spec;
        }
        return label;
      },
      //  复制编码按钮显示控制
      codeExit(entity){
        if(entity.productCode!=null){
          return true;
        }else{
          return false;
        }
      },
      //    复制编码加载页面
      goCopyCode(entity){
        this.copyCodeVisible = true;
        this.$nextTick(() => {
          this.$refs.copyCode.initWindows(entity.productCode);
      })
      },
      //  跳转查看页面
      goProductInfo(product){
        var id=product.id+","+product.checkFlag;
        this.$router.push("/DATA/basedata/productdata/productRecover/tableDetail/" + id);
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
  @import "../../../../../assets/css/datacenter.css";
</style>
