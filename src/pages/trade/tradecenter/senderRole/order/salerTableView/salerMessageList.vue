<template>
  <div>
    <div class="tablebox">
        <el-form :inline="true" :model="query" ref="query" class="table-form">
            <el-form-item class="width-120">
              <el-input v-model="query.purchaseCode" @keyup.enter.native="searchEnterFun" placeholder="采购单编号" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-120">
              <el-input v-model="query.name" @keyup.enter.native="searchEnterFun" placeholder="品名" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-120">
              <el-input v-model="query.specification" @keyup.enter.native="searchEnterFun" placeholder="规格" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-120">
              <el-input v-model="query.bakBuyerName" @keyup.enter.native="searchEnterFun" placeholder="买方机构" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-120">
              <el-input v-model="query.bakFactoryEasy" @keyup.enter.native="searchEnterFun" placeholder="生产企业" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-120">
               <el-select size="small" v-model="query.readyFlag" @keyup.enter.native="searchEnterFun" placeholder="订单状态">
                 <el-option label="全部" value=""></el-option>
                 <el-option label="已备货" value="9"></el-option>
                 <el-option label="已发货" value="0"></el-option>
               </el-select>
            </el-form-item>
          <el-form-item>
            <el-date-picker type="date" @keyup.enter.native="searchEnterFun" placeholder="开始日期" format="yyyy-MM-dd" size="small" value-format="yyyy-MM-dd" v-model="query.beginTime"></el-date-picker>
            &nbsp;到&nbsp;
            <el-date-picker type="date"  @keyup.enter.native="searchEnterFun" placeholder="结束日期" format="yyyy-MM-dd" size="small" value-format="yyyy-MM-dd" v-model="query.endTime"></el-date-picker>
          </el-form-item>
            <el-form-item>
              <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
              <el-button type="warning" size="small"   @click="restForm">重置</el-button>
            </el-form-item>
        </el-form>
      <div class="tableset" >
        <el-table :data="resData.list" ref="multipleTable" @sort-change="sortChang"
                  style="width: 100%" border stripe @selection-change="handleSelectionChange">
         <el-table-column type="selection" width="40" align="center" :selectable="selectable"></el-table-column>
          <el-table-column label="采购单编号" width="80"  prop="ooi.PURCHASE_CODE" sortable="custom">
            <template slot-scope="scope">
              <!--tootip提示气泡-->
              <el-tooltip placement="top">
                <!--气泡内容（必须放在slot="content"内）-->
                <div slot="content">
                  <div>
                  <span v-if="scope.row.orderFlag == '2'||scope.row.orderFlag == '3'">
                  <i class="ico icon-budan"></i></span>{{ scope.row.purchaseCode }}
                  </div>
                  <span class="gray">{{ scope.row.createDate }}</span>
                </div>
                <!--源内容（必须放在class="el-tooltip-box"内）,布局与源内容保持一致-->
                <div class="el-tooltip-box">
                  <!--加class="text-inline"确保内容不折行-->
                  <div class="text-inline">
                  <span v-if="scope.row.orderFlag == '2'||scope.row.orderFlag == '3'">
                  <i class="ico icon-budan"></i></span>{{ scope.row.purchaseCode }}
                  </div>
                  <span class="gray">{{ scope.row.createDate }}</span>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
<!--
          <el-table-column prop="drugDetail" label="产品信息">
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
          <el-table-column label="产品名" min-width="130" prop="ooi.BAK_PRODUCT_NAME" sortable="custom">
            <template slot-scope="scope" class="drugMessage">
              <ul class="ico-zt">
                <li class="ico-left">
                  <div class="icon-box">
                    <i class="ico icon-ji" v-if="scope.row.degreeFlag == '2'"  ></i>
                    <i  v-if="scope.row.basicMedicantFlag!= '0'" class="ico icon-jc"></i>
                  </div>
                </li>
                <li>
                  <!--tootip提示气泡-->
                  <el-tooltip placement="top">
                    <!--气泡内容（必须放在slot="content"内）,布局与源内容保持一致-->
                    <div slot="content">
                      <div>{{ scope.row.bakProductName }}</div>
                      <div>{{ scope.row.bakMedicalMode }}
                        <span v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName !=null">({{ scope.row.bakTradeName }})</span>
                      </div>
                    </div>

                    <!--源内容（必须放在class="el-tooltip-box"内）-->
                    <div class="el-tooltip-box">
                      <!--加class="text-inline"确保内容不折行-->
                      <div class="text-inline">{{ scope.row.bakProductName }}</div>
                      <div class="text-inline">{{ scope.row.bakMedicalMode }}
                        <span v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName !=null">({{ scope.row.bakTradeName }})</span>
                      </div>
                    </div>
                  </el-tooltip>
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column label="产品信息" min-width="130">
            <template slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">
                  {{scope.row.bakProductSpec}}<br/>
                  <span v-if="scope.row.bakFactoryEasy!=''">{{getPackHints(scope.row.bakFactoryEasy,scope.row.bakMiddleStandRate,scope.row.bakBigMiddleRate)}}</span>
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    {{ scope.row.bakProductSpec}}
                  </div>
                  <div class="text-inline" v-if="scope.row.bakFactoryEasy!=''">
                    {{ scope.row.bakFactoryEasy}}&nbsp;&nbsp; 中大包装: {{ scope.row.bakMiddleStandRate}}/{{ scope.row.bakBigMiddleRate}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="单价"  prop="ooi.UNIT_PRICE" sortable="custom" width="60" header-align="left" align="right">
                    <template slot-scope="scope">
                        {{ (scope.row.unitPrice).toFixed(2)  }}
                    </template>
          </el-table-column>
          <el-table-column prop="ooi.RECEIVE_QTY"  sortable="custom" label="总到/订货量" width="100" header-align="left" align="right">
             <template slot-scope="scope">
                 {{ scope.row.receiveQty }}<br>{{ scope.row.requestQty }}
             </template>
          </el-table-column>
          <el-table-column prop="totalReceiveMoney"  sortable="custom"  label="总到/订金额" header-align="left" align="right" width="100">
             <template slot-scope="scope">
                 {{ (scope.row.totalReceiveMoney).toFixed(2) }}<br>
                 {{ (scope.row.totalRequestMoney).toFixed(2) }}
             </template>
           </el-table-column>
           <el-table-column prop="ooi.BUYER_ORG_EASY"  sortable="custom"  label="买方机构" min-width="100">
                <template slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">
                      {{ scope.row.buyerOrgEasy }}<br>
                      <span>{{ scope.row.address }}</span>
                    </div>
                    <div class="el-tooltip-box">
                      <div class="text-inline hold-height">{{ scope.row.buyerOrgEasy }}</div>
                      <div class="text-inline hold-height">{{ scope.row.address }}</div>
                    </div>
                  </el-tooltip>
                </template>
            </el-table-column>
             <el-table-column prop="oos.LOT_NO"  sortable="custom" label="批号/有效期"  width="110" align="center">
                  <template slot-scope="scope">
                  <span v-if="scope.row.enabled == false">
                       {{ scope.row.lotNo }}<br>
                    {{ scope.row.medicalExpiredDate }}
                  </span>
                  <span v-else>
                     <div><el-input    v-model="scope.row.lotNo"  size="mini"></el-input></div>
                    <div class="martop5"><el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd"   v-model="scope.row.medicalExpiredDate" type="date" placeholder="选择日期" size="mini"></el-date-picker></div>
                  </span>
                  </template>
              </el-table-column>
              <el-table-column prop="oos.INVOICE_NO"   sortable="custom" label="发票号" width="100">
                 <template slot-scope="scope">
                    <span v-if="scope.row.enabled == false">
                      {{ scope.row.invoiceNo }}
                   </span>
                    <span v-else>
                      <div><el-input   show-overflow-tooltip v-model="scope.row.invoiceNo"  size="mini"></el-input></div>
                    </span>
                  </template>
               </el-table-column>
              <el-table-column prop="oos.amount"   sortable="custom" label="送货量" min-width="40" width="80" header-align="left" align="right">
                 <template slot-scope="scope">
                  <span v-if="scope.row.enabled == false">
                    {{ scope.row.amount }}
                  </span>
                  <span v-else>
                     <el-input  v-model="scope.row.amount"  size="mini"></el-input>
                    <el-input type="hidden" size="mini"  v-model="scope.row.recordId"></el-input>
                     <el-input type="hidden"  size="mini" v-model="scope.row.orderId"></el-input>
                   </span>
                </template>
              </el-table-column>
              <el-table-column prop="operate" label="操作" width="150">
               <template slot-scope="scope">
                 <div class="operates">
                 <span class="btn-word-2" v-if="scope.row.enabled == false && scope.row.readyFlag.trim() == '9'">
                   <a href="javascript:;" class="blue-bord"  @click="update(scope)">修改</a>
                   <a href="javaScript:;" class="blue-bord"  @click="sendGoods(scope)">发货</a>
                 <!--  <a href="javascript:;" class="green"  @click="deleteStockup(scope)">撤销</a>-->
                  </span>
                   <span v-else-if="scope.row.enabled == true && scope.row.readyFlag.trim() == '9'">
                     <a href="javascript:;" class="blue-bord" @click="updateSave(scope)">保存</a>
                     <a href="javascript:;" class="blue-bord"  @click="sendGoods(scope)">发货</a>
                   <!--  <a href="javascript:;" class="green" @click="cancel(scope)">取消</a>
                     <a href="javascript:;" class="green"  @click="deleteStockup(scope)">撤销</a>-->
                   </span>
                 <span v-else-if="scope.row.enabled == false && scope.row.readyFlag.trim() == '0'">
                   <a href="javascript:;" class="blue-bord"  @click="deleteStockup(scope)">修改</a>
                <!--   <a href="javascript:;" class="green"  @click="deleteStockup(scope)">撤销</a>-->
                  </span>
               <!--  <span v-else-if="scope.row.enabled == true && scope.row.readyFlag.trim() == '0'">
                     <a href="javascript:;" class="blue-bord" @click="save(scope)">保存</a>
                     <a href="javascript:;" class="green"  @click="deleteStockup(scope)">撤销</a>
                   </span>-->
                 </div>
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
          <el-button type="primary" size="small" @click="sendGoodALL">确认发货</el-button>
        </div>
      </div>
         <!--  ====================================== 弹窗 ====================================== -->

    </div>
  </div>
</template>
<script>
  import {salerItemListReceive,updateStocking,sendOrder,updateOrSave,deleteSendOrder,completeStockUp} from 'src/axios/trade/senderRole/order/salerTableView/salerHandleList'
  import {isNumber,isNotNull} from "src/utils/validateUtil";
  import {getPackHints,getSpecHints} from "src/utils/validateUtil";
  import {priceFormat,keyBoardEnter,dateFormatter} from "src/utils";
  export default {
    name: "salerHandleList",
    data() {
      return {
              activeName: 'first',  // 当前标签
              resData: this.metaData(),
              query: this.metaQuery(), // 查询初始化
              showQuery: false, // 表单查询初始化
              state:undefined,
              active: 0,
              currentOrder:undefined,
              expanded:true,
              multipleSelection:[],
              oid:'',
              order:this.orderData(),
              pState: this.pageState(),
              medicalExpiredDate:'',
              lotNo:'',
              invoiceNo :'',
              purchaseInvoiceNo:'',
              amount:''
      };
    },
     created () {
          this.query.orderId=this.$route.query.orderId,
          this.query.orderItemstate="3",
          this.pageState.state=this.$route.query.state,
          this.list()
     },
     watch:{
       "$route":"list"
     },
    methods: {
      next() {
        if (this.active++ > 2) this.active = 0;
      },
      pageState () {
        return {
          state:this.$route.query.state
        }
      },
      orderData() {
        return {
          orderState:undefined,
          senderName:undefined,
          buyerEasy:undefined,
          repositoryName:undefined,
          orderCode:undefined,
          requestPrice:undefined,
          receivePrice:undefined
        }
      },
      getPackHints,
      getSpecHints,
      metaData() {
        return {
         // 前后台交互数据封装格式
          pageNum: 1,
          pageSize: 10,
          size: "",
          orderBy:undefined,
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
          navigateFirstPage: "",
          navigateLastPage: "",
          firstPage: "",
          lastPage: "",
          list: []

        }
      },
      finishStockUp(recordId){
        completeStockUp(recordId).then(res => {
          this.list()
        })
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      restForm(){
        this.oid = this.query.orderId
        this.query = this.metaQuery()
        this.query.orderId = this.oid
        this.list()
      },
      update(scope){
         scope.row.enabled = ! scope.row.enabled
      },
      selectable(row,index) {
         if(row.readyFlag == '0'){
             return false
         }else {
             return true
         }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      cancel(scope){
         this.list()
      },
      updateSave(scope){
        if((scope.row.amount == '' ||scope.row.amount == null )&&
          (scope.row.lotNo == '' ||scope.row.lotNo == null )&&
          (scope.row.medicalExpiredDate == '' ||scope.row.medicalExpiredDate == null )
        ){
          this.$confirm('发货量,批号,有效期同时为空将撤销该条备货信息!?', '信息', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let ids = [];
            ids.push(scope.row.id);
            deleteSendOrder(ids, scope.row.recordId,  scope.row.orderId).then(res => {
              this.$message({
                type: 'success',
                message: '修改成功',
                onClose: () => {
                  this.list()
                }
              })
            })
          })
        }else {
          if (!isNumber(scope.row.amount)) {
            this.$message({
              message: '请正确输入本次送货量！',
              type: 'warning'
            });
          } else if (Number(scope.row.amount) > Number(scope.row.requestQty) * 2) {
            this.$message.error("备货量不能超过订购量的两倍");
            return false;
          } else if (scope.row.lotNo.trim() == '') {
            this.$message.error('批号不能为空');
            return false;
          } else if (scope.row.medicalExpiredDate == '' || scope.row.medicalExpiredDate == null) {
            this.$message.error('有效期不能为空');
            return false;
          } else {
            updateOrSave(scope.row).then(res => {
              console.log(res)
              if (res.data == 0) {
                this.$message.error("总备货量不能超过订购量的两倍");
                return false;
              }
              this.$message({
                type: 'success',
                message: '修改成功',
                onClose: () => {
                  this.query.enabled = false;
                  this.list()
                }
              })
            })
          }
        }
      },
      deleteStockup(scope){
              this.multipleSelection.push(scope.row)
              if(scope.row.readyFlag=='0') {
                let ids = [], arr = this.multipleSelection;
                for (let i = 0; i < arr.length; i++) {
                  ids.push(arr[i].id);
                }
                deleteSendOrder(ids, arr[0].recordId, arr[0].orderId).then(res => {
                  this.$message({
                    type: 'success',
                    message: '操作成功!',
                    onClose: () => {
                      this.multipleSelection= [];
                      this.query.id=ids[0]
                      this.query.enabled = true
                      this.list()
                    }
                  });
                })
              }else {
                this.$confirm('确认撤销选中的备货信息?', '信息', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  let ids = [], arr = this.multipleSelection;
                  for (let i = 0; i < arr.length; i++) {
                    ids.push(arr[i].id);
                  }
                  deleteSendOrder(ids, arr[0].recordId, arr[0].orderId).then(res => {
                    this.list()
                    this.multipleSelection=[];
                  })
                  this.$message({
                    type: 'success',
                    message: '操作成功!'
                  });
                })
              }
      },
    sendGoodALL(){
        if(this.multipleSelection.length<1){
          this.$message.error('请选择要确认发货的药品');
          return false;
        }else {
          this.$confirm('确认将选中的药品发货?', '信息', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let ids = [],arr = this.multipleSelection;
            for(let i = 0; i < arr.length; i++){
              ids.push(arr[i].id);
            }
            sendOrder(ids).then(res => {
              this.list()
            })
            this.$message({
              type: 'success',
              message: '发货成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消发货'
            });
          });
        }
      },
      sendGoods(scope){
             this.multipleSelection = [];
             this.multipleSelection.push(scope.row)
               let ids = [],arr = this.multipleSelection;
                  ids.push(arr[0].id);
                  console.log(ids)
                sendOrder(ids).then(res => {
                  this.$message({
                    type: 'success',
                    message: '发货成功!',
                    onClose: () => {
                      this.multipleSelection= [];
                      this.query.id=ids[0]
                      this.query.enabled = false
                      this.list()
                    }
                  });
                 })

      },
      metaQuery () { // 表单查询数据初始化
        var date = new Date(),
          y = date.getFullYear(),m = date.getMonth();
         return {
      //            id: undefined,
              orderId:this.$route.query.orderId,
              name:undefined,
              beginTime:dateFormatter(new Date(y, m, 1),false),
              endTime:dateFormatter(new Date(),false),
              specification:undefined,
              pageSign:"3",
              id:'',
              readyFlag:'',
              bakMedicalSpec:'',
              bakFactoryEasy:'',
              searchOrderState:'',
              purchaseCode:'',
              enabled:false,
              bakBuyerName:''
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
          console.log(res)
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
      }
    }
  }
</script>
