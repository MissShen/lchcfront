<template>
  <div>
    <!-- ========================== 全部退货单 ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
          <el-form-item class="width-110">
            <el-select v-model="query.returnState" @keyup.enter.native="searchEnterFun"  placeholder="退货单状态" size="small">
              <el-option label="未发送" value="0"></el-option>
              <el-option label="已发送" value="1"></el-option>
              <el-option label="已撤销" value="2"></el-option>
              <el-option label="对方已同意" value="3"></el-option>
              <el-option label="对方已拒绝" value="4"></el-option>
              <el-option label="送二审" value="5"></el-option>
              <el-option label="二审拒绝" value="6"></el-option>
              <el-option label="送一审" value="7"></el-option>
              <el-option label="一审拒绝" value="8"></el-option>
            </el-select>
         </el-form-item>
          <el-form-item class="width-100">
            <el-input v-model="query.purchaseCode" @keyup.enter.native="searchEnterFun"  placeholder="采购单号" size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-120">
            <el-input v-model="query.bakFactoryEasy" @keyup.enter.native="searchEnterFun"  placeholder="生产企业" size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-100">
              <el-input v-model="query.buyerName" @keyup.enter.native="searchEnterFun"  placeholder="医疗机构" size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-100">
              <el-input v-model="query.senderName" @keyup.enter.native="searchEnterFun"  placeholder="配送企业" size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-100">
              <el-input v-model="query.bakProductName" @keyup.enter.native="searchEnterFun"  placeholder="品名" size="small"></el-input>
            </el-form-item>
          <el-form-item>
            <el-date-picker type="date" placeholder="创建日期" class="width-110" format="yyyy-MM-dd" @keyup.enter.native="searchEnterFun"
                            value-format="yyyy-MM-dd" size="small" v-model="query.createBenDate"></el-date-picker>
              &nbsp;至&nbsp;
            <el-date-picker type="date" placeholder="创建日期" class="width-110" format="yyyy-MM-dd" @keyup.enter.native="searchEnterFun"
                            value-format="yyyy-MM-dd" size="small" v-model="query.createEenDate"></el-date-picker>
          </el-form-item>
          <el-form-item class="width-100">
              <el-input v-model="query.returnCode" @keyup.enter.native="searchEnterFun"  placeholder="退货单号" size="small"></el-input>
            </el-form-item>
          <el-form-item>
              <el-button type="success" size="small"  @click="searchEnterFun">查询</el-button>
              <el-button type="warning" size="small" @click="resetForm()">重置</el-button>
           </el-form-item>
      </el-form>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          @sort-change="sortChang"
          border
          stripe>
          <!--<el-table-column type="index" width="50" header-align="left" align="center" label="序号"></el-table-column>-->
          <el-table-column label="退货单号" width="90" prop="t.return_code" sortable="custom">
            <template slot-scope="scope">
              {{ scope.row.returnCode }}
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="100" show-overflow-tooltip  prop="t.create_date" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="采购单号" width="100" prop="item.purchase_code" sortable="custom">
            <template slot-scope="scope">
              {{ scope.row.purchaseCode }}
            </template>
          </el-table-column>
          <el-table-column label="产品名" min-width="130" prop="item.bak_product_name" sortable="custom">
          <template slot-scope="scope">
            <span class="text-inline">{{ scope.row.bakProductName }}</span>
          </template>
        </el-table-column>
          <el-table-column label="医疗机构" min-width="140" prop="buyer_name" sortable="custom">
            <template slot-scope="scope">
              <div>{{ scope.row.buyerName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="药库" v-if="!repositoryFlag" show-overflow-tooltip prop="item.repository_Name" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.repositoryName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="生产企业" show-overflow-tooltip prop="item.bak_factory_easy" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.bakFactoryEasy }}</span>
            </template>
          </el-table-column>
          <el-table-column label="配送企业" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.bakSenderEasy }}</span>
            </template>
          </el-table-column>
          <el-table-column label="地址" show-overflow-tooltip  prop="item.address_abbr" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.addressAbbr }}</span>
            </template>
          </el-table-column>
          <el-table-column label="退货数量"  prop="t.return_qty" sortable="custom" width="90"  header-align="left"  align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.returnQty }}</span>
            </template>
          </el-table-column>
          <el-table-column label="退货金额"  prop="return_total" sortable="custom" width="90"  header-align="left" align="right">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.returnTotal) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="90" prop="t.return_state" sortable="custom">
            <template slot-scope="scope">
              <span>{{ getFlag(scope.row.returnState) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="90">
            <template slot-scope="scope">
              <span><a @click="handleFromInfo(scope.row.id)" class="operation-btn">详情</a></span>
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
          <el-button size="small" @click="handleGoAdd()" type="success">创建退货</el-button>
         <!-- <el-button size="small" @click="getPrintData" type="warning">打印</el-button>-->
          <el-button type="warning" size="small" @click="exportExcel()">导出excel</el-button>
        </div>
      </div>
    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入数据请求
  import {handleList,getRepositoryFlag,exportHandleList} from 'src/axios/trade/senderRole/waitVerifyList'
  import {priceFormat,keyBoardEnter} from "src/utils";
  import fileUpload from 'js-file-download'
  const lables = [{'labelName':'退货单号','labelValue':'returnCode',hidden:false},
    {'labelName':'创建时间','labelValue':'createDate','width':100,hidden:false},
    {'labelName':'采购单号','labelValue':'purchaseCode',hidden:false},
    {'labelName':'产品名','labelValue':'bakProductName',hidden:false},
    {'labelName':'医疗机构','labelValue':'buyerName',hidden:false},
    {'labelName':'药库','labelValue':'repositoryFlag',hidden:false},
    {'labelName':'生产企业','labelValue':'bakFactoryEasy','width':90,hidden:false},
    {'labelName':'配送企业','labelValue':'bakSenderEasy','width':90,hidden:false},
    {'labelName':'地址','labelValue':'addressAbbr','width':90,hidden:false},
    {'labelName':'退货数量','labelValue':'returnQty','width':80,'align':'right',hidden:false},
    {'labelName':'退货金额','labelValue':'returnTotal','width':80,'align':'right',hidden:false},
    {'labelName':'状态','labelValue':'returnStates','width':80,hidden:false}
  ];
  export default {
    name:'based-city-snder-list',
    data () {
      return {
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        currentOrder:undefined,
        repositoryFlag: true,
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        printList: {
          printData:[],
          printLabel:[]
        },
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
      }
    },
    created () {
      this.list();
    },
    methods: {
      priceFormat,
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
         // 前后台交互数据封装格式
            pageNum: 1,
          orderBy:undefined,
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
      getFlag(flag){
        var arrFlag = ['未发送','已发送','已撤销','对方已同意','对方已拒绝','送二审','二审拒绝','送一审','一审拒绝'];
        return arrFlag[flag];
      },
      metaQuery () { // 表单查询数据初始化
        return {
            returnState:undefined,
            strNameKind:undefined,
            bakFactoryEasy:undefined,
            bakProductName:undefined,
            returnCode:undefined,
            createBenDate:undefined,
            createEenDate:undefined,
            buyerName:undefined,
            purchaseCode:undefined,
            senderName:undefined
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
        handleList(this.resData, this.query).then(res => {
          this.resData = res.data;
          if(this.resData.pageNum===0){
            this.resData.pageNum=1
          }
        });
        getRepositoryFlag().then(res=>{
          if(!res.data){
            this.repositoryFlag = true;
          }
        });
      },
      sortChang(value){
        let sortType=" desc";
        if(value.order.startsWith("asc")){
          sortType=" asc";
        }
        this.currentOrder=value.prop + sortType;
        this.list()
      },
      // 重置用户表单
      resetForm () {
        this.query= this.metaQuery();
        this.list();
      },
      // 打开退货详情页面
      handleFromInfo(id) {
        this.$router.push("/trade/manage/returnDetails/" + id)
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val;
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val;
        this.list()
      },
      handleGoAdd(){
        this.$router.push("/trade/manage/chooseNewList")
      },
      getLabel(){
        for (let item of lables){
          if(item.labelName === '药库'){
            if(this.repositoryFlag){
              item.hidden = true
            }
          }
        }
        return lables;
      },
      getPrintData(){
        let _this=this;
        this.printList.printData = this.resData.list.map(item => {
          item.returnStates  = '<div class="hiddenfont" ><span>' + _this.getFlag(item.returnState) + '</span></div>';
          return item
        });
        this.printList.printLabel = this.getLabel();
        sessionStorage.removeItem('printList');
        sessionStorage.setItem('printList',JSON.stringify(this.printList));
        let routeData = this.$router.resolve({path:'/printTable'});
        window.open(routeData.href, '_blank');
      },
      //--------------------------------------------导出Excel------------------------------------
      exportExcel() {
        if(this.query.createBenDate == undefined || this.query.createBenDate == ''||this.query.createEenDate == undefined || this.query.createEenDate == null ){
          this.$message({
            type: 'error',
            message: '请选择创建的开始日期及创建的结束日期'
          });
          return false;
        }else {
          exportHandleList(this.resData, this.query).then(res => {
            let headers = res.headers;
            let title = ""
            if (!title) {
              const fileName = headers['content-disposition'];
              title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
            }
            fileUpload(res.data, title, "application/vnd.ms-excel")
          })
        }
      },
      // ----------------------------------------------结束--------------------------------------------------

    }
  }
</script>

