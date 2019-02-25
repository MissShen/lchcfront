<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
            <el-form-item class="width-120">
                <el-input v-model="query.bakFactoryName"   @keyup.enter.native="searchEnterFun" size="small" placeholder="生产企业"></el-input>
            </el-form-item>
            <el-form-item class="width-120">
                <el-input v-model="query.buyerEasy"  @keyup.enter.native="searchEnterFun"  size="small" placeholder="医疗机构"></el-input>
            </el-form-item>
            <el-form-item class="width-120">
                <el-input v-model="query.bakProductName"  @keyup.enter.native="searchEnterFun"  size="small" placeholder="产品名"></el-input>
              </el-form-item>
            <el-form-item class="width-120">
                <el-input v-model="query.returnCode"  @keyup.enter.native="searchEnterFun"  size="small" placeholder="退货单号"></el-input>
                <input v-model="query.pageType"  @keyup.enter.native="searchEnterFun" type="hidden" size="small" value="portion" width="0"></input>
                <input v-model="query.pageType2"   @keyup.enter.native="searchEnterFun" type="hidden" size="small" value="portion" width="0"></input>
              </el-form-item>
            <el-form-item>
                      <el-date-picker type="date"  @keyup.enter.native="searchEnterFun" size="small" placeholder="创建开始日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="query.searchBenDate"></el-date-picker>
                &nbsp;至&nbsp;
                      <el-date-picker type="date"  @keyup.enter.native="searchEnterFun" placeholder="创建结束日期"  format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small" v-model="query.searchEndDate"></el-date-picker>
            </el-form-item>
              <el-form-item>
                <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
                <el-button size="small" type="warning" @click="resetButton()">重置</el-button>
            </el-form-item>
        </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
                :data="resData.list"
                border
                stripe
                @selection-change="handleSelectionChange"
                @sort-change="sortChang">
          <el-table-column
            type="selection"
            align="center"  width="40">
          </el-table-column>
          <!--<el-table-column type="index" width="50" header-align="left" align="center" label="序号"></el-table-column>-->
          <el-table-column label="退货单号" prop="t.return_code" sortable="custom" width="75">
            <template slot-scope="scope">
              <span :title="scope.row.returnCode">{{ scope.row.returnCode }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="100" prop="t.create_date" sortable="custom" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.rtnCreateDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品名" min-width="130" prop="ooi.BAK_PRODUCT_NAME" sortable="custom" >
            <template slot-scope="scope" class="drugMessage">
              <ul class="ico-zt">
                <li>
                  <div>
                    <span class="text-inline" :title="scope.row.bakProductName" >{{ scope.row.bakProductName }}</span>
                  </div>
                  <div class="text-inline">
                    <span class="text-inline" :title="scope.row.bakMedicalMode+' ('+scope.row.bakTradeName+')'"  v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName !=null">{{ scope.row.bakMedicalMode }}({{ scope.row.bakTradeName }})</span>
                    <span class="text-inline" :title="scope.row.bakMedicalMode"  v-if="scope.row.bakTradeName == '无' || scope.row.bakTradeName ==null">{{ scope.row.bakMedicalMode }}</span>
                  </div>
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column  label="产品信息" min-width="150" prop="ooi.BAK_MEDICAL_SPEC" sortable="custom">
            <template slot-scope="scope">
              <div class="pro-details text-inline" >
                <div class="pro-details text-inline"
                     :title="scope.row.bakProductSpec">
                  <span>  {{ scope.row.bakProductSpec}}</span>
                </div>
                <div :title="getPackHints(scope.row.bakFactoryEasy,scope.row.bakMiddleStandRate,scope.row.bakBigMiddleRate)" class="pro-details text-inline"
                     v-if="scope.row.bakFactoryEasy!=''">{{ scope.row.bakFactoryEasy}}&nbsp;&nbsp; 中大包装: {{ scope.row.bakMiddleStandRate}}/{{ scope.row.bakBigMiddleRate}}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="医疗机构"  prop="o.bak_buyer_easy" sortable="custom" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.buyerEasy }}</span>
              </template>
          </el-table-column>
            <el-table-column label="药库" prop="ow.warehouse_name" sortable="custom" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.warehouseName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="退货数量" header-align="left" width="90" align="right" prop="t.return_qty" sortable="custom">
              <template slot-scope="scope">
                <span>{{ scope.row.returnQty }}</span>
              </template>
            </el-table-column>
            <el-table-column label="退货金额" header-align="left" width="90" align="right" prop="return_total" sortable="custom">
              <template slot-scope="scope">
                <span>{{ scope.row.returnTotal }}</span>
              </template>
            </el-table-column>
            <el-table-column label="退货原因" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.buyerRemark == 'undefined' ? '' : scope.row.buyerRemark }}</span>
              </template>
            </el-table-column>
          <el-table-column label="配送地址" width="80" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.address}}</span>
            </template>
          </el-table-column>
            <el-table-column label="状态" prop="t.return_state" sortable="custom" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.returnState }}</span>
                </template>
            </el-table-column>
            <el-table-column label="附注">
              <template slot-scope="scope">
                <el-input v-model="scope.row.salerRemark" size="mini"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                  <div class="operates">
                    <a href="javaScript:;" class="green" @click="handleFromInfo(scope.row.id)">详情</a>
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
          <el-button type="primary" size="small" @click="salesReturn(1)">同意退货</el-button>
          <el-button type="danger" size="small" @click="salesReturn(2)">拒绝退货</el-button>
          <!--<el-button type="warning" size="small" @click="getPrintData">打印</el-button>-->
          <el-button type="warning" size="small" @click="exportExcel">导出excel</el-button>
        </div>
      </div>
    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求
  import {queryReturnSenderList,updateReturn,exportEXL} from 'src/axios/trade/senderRole/waitVerifyList'
  import fileUpload from 'js-file-download'
  import {priceFormat,keyBoardEnter} from "src/utils";
  import {getPackHints,getSpecHints} from "src/utils/validateUtil";

  export default {
    data () {
      return {
        currentOrder: undefined,
        multipleSelection: [],
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        printList: {
          printData: [],
          printLabel: [
            {'labelName': '退货单号', 'labelValue': 'returnCode'},
            {'labelName': '创建时间', 'labelValue': 'rtnCreateDate', 'width': 100, 'align': 'center'},
            {'labelName': '产品名', 'labelValue': 'htmlProductName'},
            {'labelName': '医疗机构', 'labelValue': 'buyerEasy'},
            {'labelName': '药库', 'labelValue': 'warehouseName'},
            {'labelName': '生产企业', 'labelValue': 'bakFactoryName'},
            {'labelName': '退货数量', 'labelValue': 'returnQty', 'width': 90, 'align': 'right', 'headerAlign': 'left'},
            {'labelName': '退货金额', 'labelValue': 'returnTotal', 'width': 90, 'align': 'right', 'headerAlign': 'left'},
            {'labelName': '配送地址', 'labelValue': 'address', 'width': 90},
            {'labelName': '状态', 'labelValue': 'returnState', 'width': 80},
            {'labelName': '附注', 'labelValue': 'salerRemark', 'width': 80}
          ]
        },
        options: [{
          value: 'factoryEasy',
          label: '生产企业'
        },{
          value: 'buyerEasy',
          label: '医疗企业'
        }]
      }
    },

    created () {
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 打开退货详情页面
      handleFromInfo(id) {
        let displayState = 'portion'
        this.$router.push("/trade/manage/returnReturnDetails/" + id+"/"+displayState)
      },
      salesReturn(whether){
        if(this.multipleSelection.length > 0){
            let arr = [];
            for(let i in this.multipleSelection){
                arr.push({id: this.multipleSelection[i].id,remark: this.multipleSelection[i].salerRemark})
            }
            updateReturn(arr,whether).then(() =>{
              this.$message({
                message: "操作成功！",
                type: 'success',
                duration: 1000
              })
            });
              this.list();
        }else {
          this.$message.error('请选择数据!');
          return false;
        }
      },
      getPackHints,
      getSpecHints,
      metaData () {
        return {
          orderBy: undefined,
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
            list: []
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {

            id: undefined,
            bakProductName: '',
            returnCode:'',  //退货号
            enterpriseState:'',
            searchName:'',
            searchEndDate:'',
            searchBenDate:'',
            pageType:'portion',
            salerRemark:'',
            bakFactoryName: '',
            buyerEasy: '',
            pageType2:'1'
        }
      },
      exportExcel(){
        if (this.query.searchEndDate == ''||this.query.searchBenDate == null ||this.query.searchBenDate == null || this.query.searchEndDate == undefined) {
          this.$message({
            type: 'error',
            message: '请选择创建的开始日期及创建的结束日期'
          });
          return false;
        } else {
          exportEXL(this.query).then(res => {
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
      getPrintData() {
//        bakTradeName
        this.printList.printData = this.resData.list.map(item => {
          item.htmlProductName  = '<div class="hiddenfont"><span>' + item.bakProductName + '</span></div>' + '<div class="hiddenfont">(商品名：' + item.bakTradeName + ')</div>';
          return item
        });
        sessionStorage.removeItem('printList');
        sessionStorage.setItem('printList', JSON.stringify(this.printList))
        //在新页面打开
        let routeData = this.$router.resolve({path: '/printTable'});
        window.open(routeData.href, '_blank');
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        queryReturnSenderList(this.resData, this.query).then(res => {
          this.resData = res.data;
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1
          }
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
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      resetButton(){
        this.query = this.metaData();
        this.list()
      }
    }
  }
</script>

