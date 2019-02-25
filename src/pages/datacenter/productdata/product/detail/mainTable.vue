<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
        <el-form-item class="width-120">
          <el-select v-model="query.searchTypeA" size="small">
            <el-option  label="品名" value="1"></el-option>
            <el-option  label="产品编码" value="2"></el-option>
            <el-option  label="产品ID" value="3"></el-option>
            <el-option  label="批准文号" value="4"></el-option>
            <el-option  label="药品本位码" value="5"></el-option>
            <el-option  label="进口药品注册证号" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="width-120">
          <el-input v-model="query.searchContentA" placeholder="关键词" size="small" @keyup.enter.native="searchEnterFun"></el-input>
        </el-form-item>
        <el-form-item class="width-120">
          <el-select v-model="query.searchTypeB" size="small">
            <el-option label="生产企业" value="1"></el-option>
            <el-option label="代理企业" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="width-120">
          <el-input v-model="query.searchContentB" placeholder="关键词" size="small" @keyup.enter.native="searchEnterFun"></el-input>
        </el-form-item>

          <span v-if="showQuery" class="ftsz0">
            <el-form-item class="width-120">
              <el-select v-model="query.examineFlag" placeholder="审核状态" size="small">
                <el-option label="未审核" value="0"></el-option>
                <el-option label="已提交" value="1"></el-option>
                <el-option label="未通过" value="2"></el-option>
                <!--<el-option label="临时数据" value="3"></el-option>-->
                <el-option label="被质疑" value="4"></el-option>
                <el-option label="已通过" value="5"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="width-120">
              <el-input v-model="query.doseage" placeholder="剂型" size="small" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item class="width-120">
              <el-input v-model="query.spec" placeholder="规格" size="small" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <!-- <span class="width-160">
               <el-select v-model="query.examinePeople" placeholder="审核人" size="small" @keyup.enter.native="searchEnterFun">
                 <el-option
                         v-for="item in checkPeoples.options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
                 </el-option>
               </el-select>
             </span>-->
              <el-form-item class="width-120">
              <el-select v-model="query.attestationKey" placeholder="认证字段" size="small">
                <el-option label="GMP药品" value="1"></el-option>
                <el-option label="中药保护品种" value="2"></el-option>
                <el-option label="国家基本医疗保险" value="3"></el-option>
                <el-option label="国家基本药物" value="4"></el-option>
                <el-option label="OTC药品" value="5"></el-option>
                <el-option label="行政保护" value="6"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="width-120">
              <el-select v-model="query.attestationFlag" placeholder="认证状态" size="small">
                <el-option label="否" value="0"></el-option>
                <el-option label="是" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-date-picker class="width-180" type="date" placeholder="最后一次审核时间-开始" v-model="query.examineTimeBegin" size="small"></el-date-picker>
              &nbsp;至&nbsp;
              <el-date-picker class="width-180" type="date" placeholder="最后一次审核时间-结束" v-model="query.examineTimeEnd" size="small"></el-date-picker>
            </el-form-item>

            <el-form-item class="width-160">
              <el-select v-model="query.registerType" placeholder="注册证类型" size="small">
                <el-option label="批准文号" value="0"></el-option>
                <el-option label="进口注册证号" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-date-picker class="width-180" type="date" placeholder="注册证类型效期-开始" v-model="query.registerDateBegin" size="small"></el-date-picker>
              &nbsp;至&nbsp;
              <el-date-picker class="width-180" type="date" placeholder="注册证类型效期-结束" v-model="query.registerDateEnd" size="small"></el-date-picker>
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
          <el-button type="success" size="small" @click="goAdd()">新增</el-button>
          <el-button type="primary" @click="remark()" size="small">批量备注</el-button>
          <el-button type="danger" @click="handleDelete()" size="small">删除</el-button>
          <el-button type="danger" @click="goSubmit()" size="small">提交</el-button>
          <el-button type="warning" size="small" @click="getTips()">导出Excel</el-button>
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
          <el-table-column type="selection" :reserve-selection="true" width="50" align="center"></el-table-column>
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
          <el-table-column label="剂型" prop="doseage_name" sortable="custom"  width="110" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ setNameChn(scope.row.catDoseageForm) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="规格" prop="spec" sortable="custom"  width="80" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ setSpec(scope.row.catDrug) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="单位" prop="metric_id" sortable="custom" width="50">
            <template slot-scope="scope">
              <span>{{ scope.row.catProduct.metricId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="转换比" prop="stand_rate" sortable="custom" width="60" align="right">
            <template slot-scope="scope">
              <span>{{ setStandRate(scope.row.catDrug)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="包材" prop="wrap_code" sortable="custom" width="60" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.catProduct.wrapCode }}</span>
            </template>
          </el-table-column>
          <el-table-column label="批准文号"  prop="permit_number" sortable="custom"  show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.catProduct.permitNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column label="生产企业"  prop="factory_name" sortable="custom"  show-overflow-tooltip>
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
                  width="160">
            <template slot-scope="scope">
              <div class="operates"><a class="operation-btn" size="small" v-if="codeExit(scope.row.catProduct)" @click="goCopyCode(scope.row.catProduct)">复制编码</a>
                <a class="operation-btn" size="small" @click="goProductInfo(scope.row.catProduct)">查看</a>
                <a class="operation-btn" size="small" @click="goStand(scope.row.catProduct)">标准化</a>
                <!--<a v-show="scope.row.catProduct.checkFlag=='5'" class="operation-btn" size="small" @click="goSubmit(scope.row.catProduct.id)">提交</a>-->
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

    </div>
    <!-- ========================== 主内容end ========================= -->
    <el-dialog
            :title="tip"
            :close-on-click-modal="false"
            width="400px"
            :visible.sync="tipVisible">
      <div class="tipbox">
        <i class="el-icon-warning"></i>
        <span>导出当前筛选数据或全部数据？</span>
      </div>
      <span slot="footer">
      <el-button size="small" @click="exportExcel(query)">当前数据</el-button>
      <el-button size="small" type="primary" @click="exportExcel(metaQuery())">全部数据</el-button>
    </span>
    </el-dialog>

    <remark v-if="remarkVisible" ref="remark"></remark>
    <copyCode v-if="copyCodeVisible" ref="copyCode"></copyCode>
  </div>
</template>
<script>

  // 引入用户相关请求
  import {productList} from 'src/axios/datacenter/productdata/productinfo/productinfo';
  import {queryCheckUsersList} from 'src/axios/datacenter/productdata/yellowpage/yellowpage';
  import {remove,exportExcel,submitProduct} from 'src/axios/datacenter/productdata/productinfo/productinfo';
  import fileUpload from 'js-file-download'
  import {keyBoardEnter} from "src/utils";
  import remark from '../windowPanel/remark';
  import copyCode from '../windowPanel/copyCode';

  export default {
    components: {
      remark,
      copyCode
    },
    data () {
      return {
        remarkVisible:false,
        copyCodeVisible:false,
        activeName: '1',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: true, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        checkPeoples:this.checkPeopleData(),
        selectData:[],//  当前页选中数据
        selectDataList:[],//  全部选中数据
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        standard: undefined,
        tipVisible: false
      }
    },
    created () {
      if(!!this.$store.state.pageSeach.pageNum){
        this.query=this.$store.state.pageSeach;
        this.resData.pageSize=this.$store.state.pageSeach.pageSize;
        this.resData.pageNum=this.$store.state.pageSeach.pageNum;
      }
      this.$store.state.pageSeach=this.query;

      // 获取是否只展示为标准化的 标识
      this.standard = this.$route.params.standard;
      this.query.standard = this.standard == 'true' ? 'true' : 'false';

      this.list();
      //this.examinePeopleList();
    },
    methods: {
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

      //  查询
      search(){
        this.$store.state.pageSeach.pageNum=1;
        this.resData.pageNum=1;
        this.list2();
      },
      metaQuery () {
        return {
          // 表单查询数据初始化
          searchTypeA: '1',
          searchContentA: undefined,
          searchTypeB: '1',
          searchContentB: undefined,
          examineFlag: undefined,
          doseage:undefined,
          spec:undefined,
          examinePeople:undefined,
          examineTimeBegin:undefined,
          examineTimeEnd:undefined,
          attestationKey:undefined,
          attestationFlag:undefined,
          registerType:undefined,
          registerDateBegin:undefined,
          registerDateEnd:undefined,
          standard: false,
          orderBy:undefined
        }
      },
      //  导出窗口弹出
      getTips(){
        this.tipVisible = true;
      },
      //导出EXCEL
      exportExcel(query){
        exportExcel(query).then(res => {
          let headers = res.headers;
        let title = "";
        if (!title) {
          const fileName = headers['content-disposition'];
          title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
        }
        fileUpload(res.data, title, "application/vnd.ms-excel")
      });
        this.tipVisible = false;
      },
      //  回车查询
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum=1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          if(this.query.searchContentA || this.query.searchContentB || this.query.examineFlag
        || this.query.doseage || this.query.spec || this.query.examinePeople || this.query.registerType){
          this.list2();
        }
        if(this.query.attestationKey && this.query.attestationFlag){
          this.list2();
        }
      })
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
      //   审核人初始化
      checkPeopleData(){
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
        productList(this.resData, this.query).then(res => {
          this.resData = res.data;
      })
      },
      //  获取用户分页列表
      list () {
        this.$store.state.pageSeach=this.query;
        productList(this.resData, this.query).then(res => {
          console.log(res.data);
        this.resData = res.data;
      })
      },

      //  获取审核人列表
      examinePeopleList(){
        queryCheckUsersList().then(res => {
          this.checkPeoples.options=res.data;
      })
      },
      getRowKeys(row){
        return row.catProduct.id;
      },
      //  选中的记录
      handleSelectionChange(val){
        this.selectDataList=val;
      },
      //  删除选中产品
      handleDelete() {
        if (this.selectDataList.length < 1) {
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false;
        } else {
          this.$confirm(`确定删除选中的`+this.selectDataList.length+`条数据吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

            var ids = [];
          for (var row of this.selectDataList) {
            ids.push(row.catProduct.id);
          }
          remove(ids.toString()).then(res => {
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
                /*  case "3":
                 {status='临时数据';}
                 break;*/
          case "4":
          {status='被质疑';}
                break;
          case "5":
          {status='已通过';}
                break;
        }
        return status;
      },
      //  批量备注加载页面
      remark() {
        if (this.selectDataList.length < 1) {
          this.$alert('请选择要添加备注信息的产品', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false;
        } else {
          this.remarkVisible = true;
          var ids = [];
          for (var row of this.selectDataList) {
            ids.push(row.catProduct.id);
          }
          this.$nextTick(() => {
            this.$refs.remark.initWindow(ids.toString());
          this.$refs.multipleTable.clearSelection();
        })
        }
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
      //  setStandRate
      setStandRate(entity){
        var label='无';
        if(entity!=null){
          label=entity.standRate;
        }
        return label;
      },
      //  新增产品信息
      goAdd(){
        this.$router.push("/DATA/DatacenterLayDetail/productDetail/addProduct");
      },
      //  跳转查看页面
      goProductInfo(product){
        var id=product.id+","+product.checkFlag;
        this.$router.push("/DATA/basedata/productdata/productDetail/tableDetail/" + id);
      },
      //  跳转标准化页面
      goStand(product){
        var id=product.id+","+product.checkFlag;
        this.$router.push("/DATA/DatacenterLayDetail/productDetail/benchmarkForm/" + id);
      },
      //  提交
      //  删除选中产品
      goSubmit() {
        if (this.selectDataList.length < 1) {
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false;
        } else {
          this.$confirm(`确定删除选中的`+this.selectDataList.length+`条数据吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

            var ids = [];
          for (var row of this.selectDataList) {
            ids.push(row.catProduct.id);
          }
          submitProduct(ids.toString()).then(res => {
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
