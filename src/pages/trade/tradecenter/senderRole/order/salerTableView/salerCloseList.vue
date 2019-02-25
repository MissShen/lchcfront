<template>
  <div>
    <div class="tablebox">
      <div class="table-form">
        <el-form :inline="true" :model="query" ref="query" class="demo-form-inline">
          <div class="formrow">
            <span>
              <el-input v-model="query.purchaseCode" @keyup.enter.native="searchEnterFun" placeholder="采购单编号" size="small"></el-input>
            </span>
            <span>
            <el-input v-model="query.name" @keyup.enter.native="searchEnterFun" placeholder="品名" size="small"></el-input>
          </span>
            <span>
            <el-input v-model="query.specification" @keyup.enter.native="searchEnterFun" placeholder="规格" size="small"></el-input>
          </span>
            <span>
            <el-input v-model="query.bakFactoryEasy" @keyup.enter.native="searchEnterFun" placeholder="生产企业" size="small"></el-input>
          </span>
            <span>
            <el-input v-model="query.bakBuyerName" @keyup.enter.native="searchEnterFun" placeholder="买方机构" size="small"></el-input>
          </span>
            <span>
             <el-select size="small" v-model="query.readyFlag" @keyup.enter.native="searchEnterFun" placeholder="订单状态">
               <el-option label="全部" value=""></el-option>
               <el-option label="已关闭" value="4"></el-option>
               <el-option label="关闭待确" value="2"></el-option>
             </el-select>
          </span>
          <span class="date-group">
             <el-date-picker type="date" @keyup.enter.native="searchEnterFun" placeholder="开始日期" format="yyyy-MM-dd" size="small" value-format="yyyy-MM-dd" v-model="query.beginTime"></el-date-picker>
                &nbsp;到&nbsp;
             <el-date-picker type="date"  @keyup.enter.native="searchEnterFun" placeholder="结束日期" format="yyyy-MM-dd" size="small" value-format="yyyy-MM-dd" v-model="query.endTime"></el-date-picker>
           </span>
            <span>
            <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
            <el-button type="warning" size="small"  @click="restForm">重置</el-button>
          </span>
          </div>
        </el-form>
      </div>
      <div class="tableset">
        <el-table :data="resData.list" style="width: 100%" border stripe ref="multipleTable"
                  @sort-change="sortChang" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" align="center" :selectable="selectable"></el-table-column>
          <el-table-column label="采购单编号" width="100"  prop="ooi.PURCHASE_CODE" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.orderFlag == '2'||scope.row.orderFlag == '3'" :title="scope.row.purchaseCode"><i class="ico icon-budan"></i></span> {{ scope.row.purchaseCode }}
            </template>
          </el-table-column>
          <el-table-column label="产品名" min-width="150" prop="ooi.BAK_PRODUCT_NAME" sortable="custom"  show-overflow-tooltip>
            <template slot-scope="scope" class="drugMessage">
              <ul class="ico-zt">
                <li class="ico-left">
                  <div class="icon-box">
                    <i class="ico icon-ji" v-if="scope.row.degreeFlag == '2'"  ></i>
                    <i class="ico icon-jihui" v-if="scope.row.degreeFlag == '0'"  ></i>
                    <i  v-if="scope.row.basicMedicantFlag!= '0'" class="ico icon-jc"></i>
                  </div>
                </li>
                <li>

                  <div>
                    <span class="text-inlie" :title="scope.row.bakProductName" >{{ scope.row.bakProductName }}</span>
                  </div>
                  <div class="text-inlie">
                    <span class="text-inlie" :title="scope.row.bakMedicalMode+' ('+scope.row.bakTradeName+')'"  v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName !=null">{{ scope.row.bakMedicalMode }}({{ scope.row.bakTradeName }})</span>
                    <span class="text-inlie" :title="scope.row.bakMedicalMode"  v-if="scope.row.bakTradeName == '无' || scope.row.bakTradeName ==null">{{ scope.row.bakMedicalMode }}</span>
                  </div>
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column label="产品信息">
            <template slot-scope="scope">
              <div class="pro-details"
                   :title="getSpecHints(scope.row.bakMedicalSpec,scope.row.bakStandSpecRate,scope.row.bakUseUnit,scope.row.bakSpecUnit,scope.row.bakWrapName)">
                <span   v-if="scope.row.bakWrapName != '空' && scope.row.bakWrapName != null">  {{ scope.row.bakMedicalSpec}} × {{ scope.row.bakStandSpecRate}} {{scope.row.bakUseUnit}} / {{ scope.row.bakSpecUnit}} &nbsp;&nbsp; {{ scope.row.bakWrapName}}</span>
                <span   v-if="scope.row.bakWrapName == '空' || scope.row.bakWrapName == null">  {{ scope.row.bakMedicalSpec}} × {{ scope.row.bakStandSpecRate}} {{scope.row.bakUseUnit}} / {{ scope.row.bakSpecUnit}}</span>
              </div>
              <div :title="getPackHints(scope.row.bakFactoryEasy,scope.row.bakMiddleStandRate,scope.row.bakBigMiddleRate)" class="pro-details"
                   v-if="scope.row.bakFactoryEasy!=''">{{ scope.row.bakFactoryEasy}}&nbsp;&nbsp; 中大包装: {{ scope.row.bakMiddleStandRate}}/{{ scope.row.bakBigMiddleRate}}
              </div>
            </template>
          </el-table-column>
          <el-table-column  prop="ooi.UNIT_PRICE" sortable="custom" label="单价" width="60" header-align="left" align="right"  show-overflow-tooltip>
            <template slot-scope="scope">
              <span :title="(scope.row.unitPrice).toFixed(2)">{{ (scope.row.unitPrice).toFixed(2)  }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ooi.RECEIVE_QTY" sortable="custom" label="总到/订货量" width="110" header-align="left" align="right"  show-overflow-tooltip>
            <template slot-scope="scope">
               <span :title="scope.row.receiveQty">{{ scope.row.receiveQty }}</span><br>  <span :title="scope.row.requestQty">{{ scope.row.requestQty }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="totalReceiveMoney" sortable="custom" label="总到/订金额" width="110" header-align="left" align="right"  show-overflow-tooltip>
            <template slot-scope="scope">
              <span :title="(scope.row.totalReceiveMoney).toFixed(2)">{{ (scope.row.totalReceiveMoney).toFixed(2) }}</span><br>
              <span :title="(scope.row.totalRequestMoney).toFixed(2)">{{ (scope.row.totalRequestMoney).toFixed(2) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ooi.BUYER_ORG_EASY" sortable="custom" label="买方机构" width="100" show-overflow-tooltip>
            <template slot-scope="scope">
                <span :title="scope.row.buyerOrgEasy">{{ scope.row.buyerOrgEasy }}</span><br><span algin="center" :title="scope.row.address">(地址:{{ scope.row.address }})</span>
            </template>
          </el-table-column>
          <el-table-column prop="oos.LOT_NO" sortable="custom" label="批号/有效期"  width="110"  show-overflow-tooltip>
            <template slot-scope="scope">
                    <span :title="scope.row.lotNo">{{ scope.row.lotNo }}</span><br>
                    <span :title="scope.row.medicalExpiredDate">{{ scope.row.medicalExpiredDate }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="oos.INVOICE_NO" sortable="custom" label="销售发票号/采购发票号" width="100"  show-overflow-tooltip>
            <template slot-scope="scope">
                         <span :title="scope.row.invoiceNo">{{ scope.row.invoiceNo }}</span><br>
                         <span :title="scope.row.purchaseInvoiceNo">{{ scope.row.purchaseInvoiceNo }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="oos.amount" sortable="custom" label="送货量"  width="80" header-align="left" align="right"  show-overflow-tooltip>
            <template slot-scope="scope">
                      <span :title="scope.row.amount">{{ scope.row.amount }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="70"   prop="oos.READY_FLAG"  show-overflow-tooltip sortable="custom">
            <template slot-scope="scope">
              <span  v-if="scope.row.readyFlag=='2'">关闭待确</span>
              <span  v-else-if="scope.row.readyFlag=='3'">拒绝关闭</span>
              <span  v-else-if="scope.row.readyFlag=='4'">已关闭</span>
            </template>
          </el-table-column>
          <el-table-column prop="operate" label="操作" width="70">
            <template slot-scope="scope">
              <span class="operation-btn" @click="show(scope.row)">备注</span>
              <span v-if="scope.row.readyFlag == '2'">
                 <span class="operation-btn" @click="confirmCloseById(scope.row.id)">确认关闭</span>
                 <span class="operation-btn" @click="refuseCloseById(scope.row.id)">拒绝关闭</span>
              </span>

            </template>
          </el-table-column>
          <el-table-column  type="expand"  >
            <template slot-scope="scope">
              <el-form label-position="left" height="30px" inline class="demo-table-expand">
                <el-form-item label="备注" class="nomar">
                  <span>订单明细备注:{{ scope.row.remark }}，订单备注:{{scope.row.orderRemark}}</span>
                </el-form-item>
              </el-form>
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
          <el-button type="primary" size="small" @click="confirmClose">确认关闭</el-button>
          <el-button type="danger" size="small" @click="refuseClose">拒绝关闭</el-button>
        </div>
      </div>
      <!--  ====================================== 弹窗 ====================================== -->
    </div>
  </div>
</template>
<script>
  import {salerCloseList,confirmCloseItem,refuseCloseItem} from 'src/axios/trade/senderRole/order/salerTableView/salerHandleList'
  import {dateFormatter} from "src/utils/index";
  import {getPackHints,getSpecHints} from "src/utils/validateUtil";
  import {priceFormat,keyBoardEnter} from "src/utils";
  export default {
    name: "salerCloseList",
    data() {
      return {
        activeName: 'five',  // 当前标签
        resData: this.metaData(),
        itemId:'',
        currentOrder:undefined,
        expanded:true,
        query: this.metaQuery(), // 查询初始化
        showQuery: false, // 表单查询初始化
        active: 0,
        id:undefined
      };
    },
    created () {
        this.list()
    },
    methods: {
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
            hasPreviousPage: "",
            hasNextPage: "",
            navigatePages: "",
            navigatepageNums: "",
            orderBy:undefined,
            navigateFirstPage: "",
            navigateLastPage: "",
            firstPage: "",
            lastPage: "",
            list: []

        }
      },
      restForm(){
        this.query = this.metaQuery()
        this.list()
      },
      selectable(row,index) {
        if(row.readyFlag == '3' || row.readyFlag == '4' ){
          return false
        }else {
          return true
        }
      },
      getPackHints,
      getSpecHints,
      show(row){
        this.$refs.multipleTable.toggleRowExpansion(row,this.expanded)
        this.expanded = !this.expanded
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      metaQuery () { // 表单查询数据初始化
        var date = new Date(),
          y = date.getFullYear(),m = date.getMonth();
        return {
          //            id: undefined,
          name:undefined,
          specification:undefined,
          bakMedicalSpec:'',
          bakFactoryEasy:'',
          searchOrderState:'',
          purchaseCode:'',
          beginTime:dateFormatter(new Date(y, m, 1),false),
          endTime:dateFormatter(new Date(),false),
          bakBuyerName:'',
          readyFlag:''
        }
      },
      confirmClose(){
        if(this.multipleSelection.length<1){
          this.$message.error('请选择要关闭的明细!');
          return false;
        }else {
          this.$confirm('确定关闭选中的明细么?', '信息', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let ids = [],arr = this.multipleSelection;
            for(let i = 0; i < arr.length; i++){
              ids.push(arr[i].id);
            }
            confirmCloseItem(ids).then(res => {
              this.list()
            })
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
          })
        }
      },
      refuseClose(){
        if(this.multipleSelection.length<1){
          this.$message.error('请选择拒绝关闭的明细!');
          return false;
        }else {
          this.$confirm('确定拒绝关闭选中的明细么?', '信息', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let ids = [],arr = this.multipleSelection;
            for(let i = 0; i < arr.length; i++){
              ids.push(arr[i].id);
            }
            refuseCloseItem(ids).then(res => {
                 this.list()
               })
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
          })
        }
      },
      confirmCloseById(id){
          this.$confirm('确定关闭选中的明细么?', '信息', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let ids = []
            ids.push(id);
            confirmCloseItem(ids).then(res => {
              this.list()
            })
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
          })

      },
      refuseCloseById(id){
          this.$confirm('确定拒绝关闭选中的明细么?', '信息', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              let ids = [];
              ids.push(id);
            refuseCloseItem(ids).then(res => {
              this.list()
            })
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
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

      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        salerCloseList(this.resData, this.query).then(res => {
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
    }
  }
</script>
