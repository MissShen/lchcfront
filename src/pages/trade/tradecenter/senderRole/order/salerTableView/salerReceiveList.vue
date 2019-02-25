<template>
  <div>
    <div class="tablebox">
        <el-form :inline="true" :model="query" ref="query" class="table-form">
            <el-form-item class="width-100">
              <el-input v-model="query.purchaseCode" @keyup.enter.native="searchEnterFun" placeholder="采购单编号" size="small"></el-input>
            </el-form-item>
          <el-form-item class="width-100">
            <el-input v-model="query.name" @keyup.enter.native="searchEnterFun" placeholder="品名" size="small"></el-input>
          </el-form-item>
            <el-form-item class="width-100">
            <el-input v-model="query.specification" @keyup.enter.native="searchEnterFun" placeholder="规格" size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-100">
            <el-input v-model="query.bakBuyerName" @keyup.enter.native="searchEnterFun" placeholder="买方机构" size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-100">
            <el-input v-model="query.bakFactoryEasy" @keyup.enter.native="searchEnterFun" placeholder="生产企业" size="small"></el-input>
          </el-form-item>
            <el-form-item>
             <el-date-picker type="date" @keyup.enter.native="searchEnterFun" placeholder="开始日期" format="yyyy-MM-dd" size="small" value-format="yyyy-MM-dd" v-model="query.beginTime"></el-date-picker>
                &nbsp;到&nbsp;
             <el-date-picker type="date" @keyup.enter.native="searchEnterFun"  placeholder="结束日期" format="yyyy-MM-dd" size="small" value-format="yyyy-MM-dd" v-model="query.endTime"></el-date-picker>
          </el-form-item>
            <el-form-item>
            <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
            <el-button type="warning" size="small"  @click="restForm">重置</el-button>
          </el-form-item>
        </el-form>
      <div class="tableset">
      <el-table :data="resData.list" style="width: 100%" border stripe   @sort-change="sortChang" ref="multipleTable">
        <el-table-column  type="expand"  >
            <template slot-scope="scope">
              <el-form label-position="left" height="30px" inline class="demo-table-expand">
                <el-form-item label="备注" style="height:13px;">
                  <span>订单明细备注:{{ scope.row.remark }}，订单备注:{{scope.row.orderRemark}}</span>
                </el-form-item>
             </el-form>
            </template>
          </el-table-column>
          <el-table-column label="采购单编号" width="80" prop="ooi.PURCHASE_CODE" sortable="custom">
            <template slot-scope="scope">
              <span v-if="scope.row.orderFlag == '2'||scope.row.orderFlag == '3'" :title="scope.row.purchaseCode"><i class="ico icon-budan"></i></span> {{ scope.row.purchaseCode }}
            </template>
          </el-table-column>

     <!--     <el-table-column prop="drugDetail" label="产品信息">
            <template slot-scope="scope" class="drugMessage">
              <span v-if="scope.row.degreeFlag ==1"><span class="jinji_ye"></span> <p>{{ scope.row.bakProductName }}(商品名: {{ scope.row.bakTradeName }})</p></span>
              <span v-else-if="scope.row.degreeFlag ==2"><span class="jinji_red"></span><p>{{ scope.row.bakProductName }}(商品名: {{ scope.row.bakTradeName }})</p></span>
              <span v-else><p>{{ scope.row.bakProductName }}(商品名: {{ scope.row.bakTradeName }})</p></span>
              <p class="drugCon">规格包装:{{ scope.row.bakProductSpec}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                 中大包装:{{scope.row.middleStandRate }}/{{ scope.row.bigMiddleRate}}</p>
              <p class="drugCon">生产企业:{{ scope.row.bakFactoryEasy}}</p>
            </template>
          </el-table-column>
        -->

        <el-table-column label="产品名" min-width="150" prop="ooi.BAK_PRODUCT_NAME" sortable="custom">
          <template slot-scope="scope" class="drugMessage">
            <ul class="ico-zt">
              <li class="ico-left">
                <div class="icon-box">
                  <i class="ico icon-ji" v-if="scope.row.degreeFlag == '2'"  ></i>
                  <i  v-if="scope.row.basicMedicantFlag!= '0'" class="ico icon-jc"></i>
                </div>
              </li>
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
        <el-table-column label="产品信息" min-width="150">
          <template slot-scope="scope">
            <div class="pro-details text-inline"
                 :title="scope.row.bakProductSpec">
              <span >  {{ scope.row.bakProductSpec}}</span>
            </div>
            <div :title="getPackHints(scope.row.bakFactoryEasy,scope.row.bakMiddleStandRate,scope.row.bakBigMiddleRate)" class="pro-details text-inline"
                 v-if="scope.row.bakFactoryEasy!=''">{{ scope.row.bakFactoryEasy}}&nbsp;&nbsp; 中大包装: {{ scope.row.bakMiddleStandRate}}/{{ scope.row.bakBigMiddleRate}}
            </div>
          </template>
        </el-table-column>

        <el-table-column  label="单价" width="80" header-align="left" align="right"  prop="ooi.UNIT_PRICE" sortable="custom">
            <template slot-scope="scope">
                {{ (scope.row.unitPrice).toFixed(2)  }}
            </template>
          </el-table-column>
          <el-table-column prop="ooi.RECEIVE_QTY" sortable="custom" label="总到/订货量" width="110" header-align="left" align="right">
             <template slot-scope="scope">
                 {{ scope.row.receiveQty }}<br>{{ scope.row.requestQty }}
             </template>
          </el-table-column>
           <el-table-column prop="totalReceiveMoney"  show-overflow-tooltip  sortable="custom" label="总到/订金额" width="110" header-align="left" align="right">
               <template slot-scope="scope">
                 {{ (scope.row.totalReceiveMoney).toFixed(2) }}<br>
                 {{ (scope.row.totalRequestMoney).toFixed(2) }}
               </template>
           </el-table-column>
             <el-table-column prop="ooi.BUYER_ORG_EASY"  show-overflow-tooltip  sortable="custom"label="买方机构" width="120" show-overflow-tooltip>
                  <template slot-scope="scope">
                       {{ scope.row.buyerOrgEasy }}<br><span algin="center">(地址:{{ scope.row.address }})</span>
                  </template>
              </el-table-column>
              <el-table-column prop="oor.RECEIVE_DATE"  show-overflow-tooltip sortable="custom" label="到货时间" width="90" >
                   <template slot-scope="scope">
                        {{ scope.row.receiveDate }}
                   </template>
               </el-table-column>
          <el-table-column label="批号/有效期" width="120"  show-overflow-tooltip  prop="oos.LOT_NO" sortable="custom">
             <template slot-scope="scope">
                  {{ scope.row.lotNo }}<br>{{ scope.row.medicalExpiredDate }}
             </template>
          </el-table-column>
          <el-table-column prop="oor.RECEIVE_QTY"  show-overflow-tooltip sortable="custom" label="到货量" width="80" header-align="left" align="right">
             <template slot-scope="scope">
                {{ scope.row.receiveCount }}
             </template>
          </el-table-column>
        <el-table-column prop="operate" label="操作" width="70" align="center">
          <template slot-scope="scope">
              <a href="javascript:;" class="green" @click="show(scope.row)">备注</a>
          </template>

        </el-table-column>

          </el-table>
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
        <ul class="explain">
          <li>标记说明：</li>
          <li><i class="ico icon-ji"></i><span>急需药品</span></li>
          <li><i class="ico icon-budan"></i><span>补单</span></li>
        </ul>
      </div>
      <div class="foot-btn">
        <div class="foot-left">
          <!--<el-button type="warning" size="small" @click="getPrintData">打印</el-button>-->
          <el-button type="warning" size="small" @click="exportExcel()">导出excel</el-button>
        </div>
      </div>
         <!--  ====================================== 弹窗 ====================================== -->
    </div>
  </div>
</template>
<script>
  import {salerItemListReceive,exportItemListReceive} from 'src/axios/trade/senderRole/order/salerTableView/salerHandleList'
  import {dateFormatter} from "src/utils/index";
  import {getPackHints,getSpecHints} from "src/utils/validateUtil";
  import {priceFormat,keyBoardEnter} from "src/utils";
  import fileUpload from 'js-file-download'
  export default {
    name: "salerHandleList",
    data() {
      return {
              activeName: 'first',  // 当前标签
              resData: this.metaData(),
              itemId:'',
              orderId:'',
              currentOrder:undefined,
              expanded:true,
              query: this.metaQuery(), // 查询初始化
              showQuery: false, // 表单查询初始化
              state:undefined,
              active: 0,
              oid:'',
              order:this.orderData(),
              id:undefined,
              isShow:false,
              printShow: false,
              printList: {
              printData: [],
                printLabel: [
                  {'labelName': '采购单编号', 'labelValue': 'purchaseCode'},
                  {'labelName': '产品名', 'labelValue': 'htmlBakProductName'},
                  {'labelName': '产品信息', 'labelValue': 'htmlBakProductSpec'},
                  {'labelName': '单价', 'labelValue': 'unitPrice', 'width':60,  'headerAlign': 'left', 'align':'right'},
                  {'labelName': '总到/订货量', 'labelValue': 'htmlDelivery','width':110,  'headerAlign': 'left', 'align':'right'},
                  {'labelName': '总到/订金额', 'labelValue': 'htmlTotalSendMoney','width':110,  'headerAlign': 'left', 'align':'right'},
                  {'labelName': '买方机构', 'labelValue': 'htmlBuyerOrgEasy', 'width': 120},
                  {'labelName': '到货时间', 'labelValue': 'createDate', 'width': 90},
                  {'labelName': '批号/有效期', 'labelValue': 'htmlLtNo', 'width': 90},
                  {'labelName': '到货量', 'labelValue': 'receiveCount', 'width':80,  'headerAlign': 'left', 'align':'right'},
                ]
            },
      };
    },
     created () {
          this.query.orderId=this.$route.query.orderId,
          this.list()
     },
     watch:{
       "$route":"list"
     },
    methods: {
      next() {
        if (this.active++ > 2) this.active = 0;
      },
      orderData() {
        return {
          orderState:undefined,
          readDate:undefined,
          senderName:undefined,
          buyerEasy:undefined,
          repositoryName:undefined,
          orderCode:undefined,
          requestPrice:undefined,
          receivePrice:undefined
        }
      },
      metaData() {
        return {
          // 前后台交互数据封装格式
          pageNum: 1,
          pageSize: 10,
          size: "",
          startRow: "",
          endRow: "",
          total: 4,
          pages: 10,
          prePage: "",
          nextPage: "",
          isFirstPage: true,
          isLastPage: "",
          orderBy:undefined,
          hasPreviousPage: "",
          hasNextPage: "",
          navigatePages: "",
          navigatepageNums: "",
          navigateFirstPage: "",
          navigateLastPage: "",
          firstPage: "",
          lastPage: "",
          list: []

        }
      },
      getPackHints,
      getSpecHints,
      restForm(){
         this.oid = this.query.orderId
         this.query = this.metaQuery()
         this.query.orderId = this.oid
        this.list()
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      show(row){
        this.$refs.multipleTable.toggleRowExpansion(row,this.expanded)
        this.expanded = !this.expanded
      },
      metaQuery () { // 表单查询数据初始化
        var date = new Date(),
          y = date.getFullYear(),m = date.getMonth();
         return {
      //            id: undefined,
             orderId:this.$route.query.orderId,
             name:undefined,
             specification:undefined,
             pageSign:'5',
             bakMedicalSpec:'',
             bakFactoryEasy:'',
             searchOrderState:'',
             purchaseCode:'',
             bakBuyerName:'',
             beginTime:dateFormatter(new Date(y, m, 1),false),
             endTime:dateFormatter(new Date(),false),
        }
     },
      sortChang(value){
        let sortType=" desc"
        if(value.order.startsWith("asc")){
          sortType=" asc";
        }
        this.currentOrder=value.prop + sortType;
        this.list()
      },

      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        salerItemListReceive(this.resData, this.query).then(res => {
           this.resData = res.data
            if(this.resData.pageNum === 0 ){
               this.resData.pageNum = 1
            }
         })
       },
      handleSizeChange (val) {
         this.resData.pageSize = val
         this.list()
       },
       handleCurrentChange (val) {
         this.resData.pageNum = val
         this.list()
       },
       // 重置用户表单
      resetForm(formName) {
        if (this.$refs[formName]!==undefined) {
          this.$refs[formName].resetFields();
        }
      },

      //打印功能
      getPrintData() {
        this.printList.printData = this.resData.list.map(item => {
          item.htmlBakProductName  = '<div class="hiddenfont"><span>' + item.bakProductName + '</span></div>'
                                if(item.bakTradeName === null || item.bakTradeName === ''){
                                  item.htmlBakProductName += '<div class="hiddenfont">(商品名：无)</div>'
                                }else {
                                  item.htmlBakProductName += '<div class="hiddenfont">(商品名：' + item.bakTradeName + ')</div>'
                                }

          item.htmlBakProductSpec='<div>'+item.bakProductSpec
                                if(item.middleStandRate === null || item.middleStandRate === ''){
                                  item.htmlBakProductSpec+=  ' &nbsp;&nbsp; 中大包装:/' +'</div>'+'<div>'+item.bakFactoryEasy+'</div>';
                                }else {
                                  item.htmlBakProductSpec+=   ' &nbsp;&nbsp; 中大包装:'+ item.middleStandRate+'/'+item.bigMiddleRate+'</div>'+'<div>'+item.bakFactoryEasy+'</div>';
                                }
          item.htmlDelivery=item.receiveQty+'<br>'+item.requestQty;
          item.htmlTotalSendMoney=item.totalReceiveMoney.toFixed(2)+'<br>'+item.totalRequestMoney.toFixed(2);
          item.htmlBuyerOrgEasy=item.buyerOrgEasy+'<br>'+'<span algin="center">(地址:'+item.address+')</span>';
          item.htmlLtNo=item.lotNo +'<br>'+item.medicalExpiredDate;

          return item
        });
        sessionStorage.removeItem('printList');
        sessionStorage.setItem('printList', JSON.stringify(this.printList))
        //在新页面打开
        let routeData = this.$router.resolve({path: '/printTable'});
        window.open(routeData.href, '_blank');
      },
      //--------------------------------------------导出Excel------------------------------------
      exportExcel() {
        if(this.query.beginTime == undefined || this.query.beginTime == ''||this.query.endTime == undefined || this.query.endTime == null ){
          this.$message({
            type: 'error',
            message: '请选择创建的开始日期及创建的结束日期'
          });
          return false;
        }else {
          exportItemListReceive(this.resData, this.query).then(res => {
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
