<template>
  <div>
    <div class="tablebox">
      <el-form :inline="true" :model="query" ref="query" class="table-form">
          <el-form-item class="width-120">
           <el-select size="small" v-model="query.searchOrderState" @keyup.enter.native="searchEnterFun"  placeholder="订单状态">
             <el-option label="全部" value=""></el-option>
             <el-option label="未阅读" value="1"></el-option>
             <el-option label="已阅读" value="2"></el-option>
             <el-option label="缺货" value="7"></el-option>
             <el-option label="断货" value="8"></el-option>
           </el-select>
        </el-form-item>
          <el-form-item class="width-100">
            <el-input v-model="query.purchaseCode" @keyup.enter.native="searchEnterFun"  placeholder="采购单编号" size="small"></el-input>
          </el-form-item>
        <el-form-item class="width-100">
          <el-input v-model="query.name" @keyup.enter.native="searchEnterFun"  placeholder="品名" size="small"></el-input>
        </el-form-item>
          <el-form-item class="width-100">
          <el-input v-model="query.specification" @keyup.enter.native="searchEnterFun"  placeholder="规格" size="small"></el-input>
        </el-form-item>
        <el-form-item class="width-100">
          <el-input v-model="query.bakFactoryEasy" @keyup.enter.native="searchEnterFun"  placeholder="生产企业" size="small"></el-input>
        </el-form-item>
        <el-form-item class="width-100">
          <el-input v-model="query.bakBuyerName" @keyup.enter.native="searchEnterFun"  placeholder="买方机构" size="small"></el-input>
        </el-form-item>
        <el-form-item>
           <el-date-picker type="date" @keyup.enter.native="searchEnterFun"  placeholder="开始日期" format="yyyy-MM-dd" size="small" value-format="yyyy-MM-dd" v-model="query.beginTime" ></el-date-picker>
              &nbsp;到&nbsp;
           <el-date-picker type="date" @keyup.enter.native="searchEnterFun"  placeholder="结束日期" format="yyyy-MM-dd" size="small" value-format="yyyy-MM-dd" v-model="query.endTime"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
          <el-button type="warning" size="small"  @click="restForm">重置</el-button>
        </el-form-item>
      </el-form>

      <div class="tableset">
      <el-table :data="resData.list"   @sort-change="sortChang" style="width: 100%" border stripe ref="multipleTable" :row-class-name="setRowClass" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" align="center" :selectable="selectable"></el-table-column>

        <el-table-column label="采购单编号" width="76"  prop="ooi.PURCHASE_CODE" sortable="custom">
          <template slot-scope="scope">
            <!--tootip提示气泡-->
            <el-tooltip placement="top" :enterable="false">
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

<!--          <el-table-column prop="drugDetail" label="产品信息">
            <template slot-scope="scope" class="drugMessage">
              <span class="ellipsis es200" v-if="scope.row.degreeFlag ==1"><i class="jinji_ye"></i> <p :title="scope.row.bakProductName +'(商品名:'+scope.row.bakTradeName+')'">{{ scope.row.bakProductName }}(商品名: {{ scope.row.bakTradeName }})</p></span>
              <span class="ellipsis es200" v-else-if="scope.row.degreeFlag ==2"><i class="jinji_red"></i><p :title="scope.row.bakProductName +'(商品名:'+scope.row.bakTradeName+')'">{{ scope.row.bakProductName }}(商品名: {{ scope.row.bakTradeName }})</p></span>
              <span class="ellipsis es200" v-else>
                <p :title="scope.row.bakProductName +'(商品名:'+scope.row.bakTradeName+')'">{{ scope.row.bakProductName }}(商品名: {{ scope.row.bakTradeName }})</p>
              </span>
              <p class="ellipsis es200 drugCon" :title="'规格包装:'+scope.row.bakProductSpec+'中大包装:'+scope.row.middleStandRate+'/'+scope.row.bigMiddleRate">规格包装:{{ scope.row.bakMedicalSpec}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                 中大包装:{{scope.row.middleStandRate }}/{{ scope.row.bigMiddleRate}}</p>
              <p class="ellipsis es200 drugCon" :title="'规格包装:'+scope.row.bakFactoryEasy">生产企业:{{ scope.row.bakFactoryEasy}}</p>
            </template>
          </el-table-column>-->

        <el-table-column label="产品名" min-width="150" prop="ooi.BAK_PRODUCT_NAME" sortable="custom"  show-overflow-tooltip>
          <template slot-scope="scope" class="drugMessage">
            <ul class="ico-zt">
              <li class="ico-left">
                <i class="ico icon-ji" v-if="scope.row.degreeFlag == '2'"  ></i>
                <i class="ico icon-jihui" v-if="scope.row.degreeFlag == '0'" ></i>
                <i class="ico icon-jc" v-if="scope.row.basicMedicantFlag!= '0'"></i>
                <i class="ico icon-qu" v-if="scope.row.isRegion == '1'"></i>
                <i class="ico icon-liang" v-if="scope.row.twoVoteType != '0'" ></i>
              </li>
              <li>

                <!--tootip提示气泡-->
                <el-tooltip placement="top" :enterable="false">
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
        <el-table-column label="产品信息" min-width="150">
          <template slot-scope="scope">
            <el-tooltip placement="top" :enterable="false">
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
          <el-table-column label="单价" prop="ooi.UNIT_PRICE" sortable="custom" width="70" show-overflow-tooltip align="right">
            <template slot-scope="scope">
              <span  :title="(scope.row.unitPrice).toFixed(2)">{{ (scope.row.unitPrice).toFixed(2)  }}</span>
            </template>
          </el-table-column>
        <el-table-column prop="ooi.RECEIVE_QTY" sortable="custom" label="发货量\订货量" width="90" :render-header="labelHead" align="right">
          <template slot-scope="scope">
            <div v-if="scope.row.buttonState == '0'" class="hold-height red">
              {{ scope.row.amount }}
            </div>
            <div v-else class="hold-height red">
               <el-input @change="Calculation(scope.row)"  v-model="scope.row.amount" size="mini"></el-input>
            </div>
            {{ scope.row.requestQty }}
          </template>
        </el-table-column>
        <el-table-column prop="totalReceiveMoney" sortable="custom" label="发货金额\订购金额"  width="90" :render-header="labelHead" align="right">
          <template slot-scope="scope">
            <div class="hold-height red">{{ priceFormat(scope.row.totalSendMoney) }}</div>
            <div class="hold-height">{{ (scope.row.totalRequestMoney).toFixed(2) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="ooi.BUYER_ORG_EASY" sortable="custom"  label="买方机构\买方地址" :render-header="labelHead" show-overflow-tooltip width="150">
          <template slot-scope="scope">
            <el-tooltip placement="top" :enterable="false">
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
        <el-table-column prop="oos.LOT_NO"  sortable="custom" label="批号\有效期" :render-header="labelHead" width="110" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.buttonState == '0'">
              <div class="hold-height">{{ scope.row.lotNo }}</div>
              <div class="hold-height">{{ scope.row.medicalExpiredDate }}</div>
            </template>
            <template v-else>
               <div><el-input class="width-100" v-model="scope.row.lotNo" size="mini"></el-input></div>
               <div class="martop5"><el-date-picker format="yyyy-MM-dd" class="width-100" value-format="yyyy-MM-dd" v-model="scope.row.medicalExpiredDate" type="date" placeholder="选择日期" size="mini"></el-date-picker></div>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="oos.INVOICE_NO" sortable="custom" label="发票号" width="110">
          <template slot-scope="scope">
            <div v-if="scope.row.buttonState == '0'">
              {{ scope.row.invoiceNo }}
            </div>
            <div v-else>
              <el-input v-model="scope.row.invoiceNo" type="textarea" resize="none" :maxlength="20"></el-input>
                   <input type="hidden" v-model="scope.row.recordId"/>
                   <input type="hidden" v-model="scope.row.orderId"/>
             </div>
          </template>
        </el-table-column>
        <el-table-column prop="ooi.order_item_state" sortable="custom" label="状态" width="60" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.orderItemState.trim() == '1'" >未阅读</span>
            <span v-if="scope.row.orderItemState.trim() == '2'" >已阅读</span>
            <span v-if="scope.row.orderItemState.trim() == '7'" >缺货</span>
            <span v-if="scope.row.orderItemState.trim() == '8'" >断货</span>
          </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作"  width="110">
          <template slot-scope="scope">
            <div v-if="(scope.row.orderItemState.trim() == '2' || scope.row.orderItemState.trim() == '1') &&
               (scope.row.readyFlag == null || scope.row.readyFlag == '')" class="operates">
               <span class="flo-left"><a href="javascript:;" class="blue-bord" @click="save(scope)">保存</a></span>
               <span class="flo-left"><a href="javascript:;" class="blue-bord" @click="stockUp(scope.row.recordId)">多批号</a></span>
               <span class="flo-left"><a href="javascript:;" class="red-bord" @click="breakShow(scope.row.recordId,scope.row.orderId)">断货 </a></span>
               <span class="flo-left"><a href="javascript:;" class="red-bord" @click="showEvaluate(scope.row.recordId,scope.row.orderId)">缺货</a></span>
             <!--  <span v-if="scope.row.remark != null"><a href="javascript:;" class="green" @click="show(scope.row)">备注</a></span>-->
            </div>
            <div v-else-if=" scope.row.readyFlag == '9'&& scope.row.buttonState =='0'" class="operates">
                 <span class="flo-left"><a href="javascript:;" class="blue-bord"  @click="update(scope.row)">修改</a></span>
                 <span class="flo-left"><a href="javaScript:;" class="blue-bord"  @click="sendGoods(scope)">发货</a></span>
                 <span class="flo-left"><a href="javascript:;" class="green"  @click="deleteStockup(scope)">撤销</a></span>
              <!--   <span v-if="scope.row.remark != null"><a href="javascript:;" class="green" @click="show(scope.row)">备注</a></span>-->
                </div>
            <div v-else-if="scope.row.readyFlag== '9'&& scope.row.buttonState =='1'" class="operates">
                 <span class="flo-left"><a href="javascript:;" class="blue-bord" @click="updateSave(scope)">保存</a></span>
                 <span class="flo-left"><a href="javascript:;" class="blue-bord"  @click="sendGoods(scope)">发货</a></span>
                 <span class="flo-left"><a href="javascript:;" class="green"  @click="deleteStockup(scope)">撤销</a></span>
                <!-- <span v-if="scope.row.remark != null"><a href="javascript:;" class="green" @click="show(scope.row)">备注</a></span>-->
            </div>
            <div v-else-if=" scope.row.orderItemState.trim() == '7'" class="operates">
                <a href="javascript:;" class="green" @click="removeEvaluate(scope.row.recordId,scope.row.orderId)">取消缺货</a>
               <!-- <span v-if="scope.row.remark != null"><a href="javascript:;" class="green" @click="show(scope.row)">备注</a></span>-->
            </div>
            <div v-else-if=" scope.row.orderItemState.trim() == '8'">
                <a href="javascript:;" class="green" @click="removeBreak(scope.row.recordId,scope.row.orderId)">取消断货</a>
               <!-- <span v-if="scope.row.remark != null"><a href="javascript:;" class="green" @click="show(scope.row)">备注</a></span>-->
            </div>
            <div v-else-if="scope.row.orderItemState.trim() == '4' && scope.row.buttonState =='0'" class="operates">
               <a href="javascript:;" class="blue-bord" @click="update(scope.row)">修改</a>
              <!-- <span v-if="scope.row.remark != null"><a href="javascript:;" class="green" @click="show(scope.row)">备注</a></span>-->
            </div>
            <div v-else-if="scope.row.orderItemState.trim() == '4' && scope.row.buttonState =='1'" class="operates">
              <a href="javascript:;" class="blue-bord" @click="updateSave(scope)">保存</a>
            <!--  <span v-if="scope.row.remark != null"><a href="javascript:;" class="green" @click="show(scope.row)">备注</a></span>-->
            </div>
          </template>
        </el-table-column>

        <el-table-column v-if="show" type="expand"  prop="ooi.REMARK" sortable="custom">
          <template slot-scope="scope">
            <div>
              <strong>备注：</strong>{{ scope.row.remark }}
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
         <!-- <el-button type="warning" size="small" @click="getPrintData">打印</el-button>-->
          <el-button type="warning" size="small" @click="exportExcel()">导出excel</el-button>
          <el-button type="primary" size="small" @click="read">阅读</el-button>
        </div>
      </div>
         <!--  ====================================== 弹窗 ====================================== -->
            <!-- 弹窗：断货 -->
            <el-dialog title="断货原因"
              top="2vh" custom-class="w50" :visible.sync="showBreakForm"  :before-close="handleCloseA">
                <el-form ref="breakForm" :model="breakForm" :rules="rules">
                  <el-form-item prop="breakReason">
                    <el-input type="textarea" :rows="8" placeholder="请输入断货原因" v-model="breakForm.breakReason" ></el-input>
                     <el-input v-model="breakForm.orderId" type="hidden" size="small"></el-input>
                     <el-input v-model="breakForm.itemId" type="hidden" size="small"></el-input>
                  </el-form-item>
                </el-form>
              <span slot="footer">
                <el-button type="primary" @click="submitFormA('breakForm')">提交</el-button>
                <el-button @click="handleCloseA">取消</el-button>
              </span>
            </el-dialog>

            <!-- 弹窗：缺货 -->
            <el-dialog title="缺货原因"
              top="2vh" :visible.sync="showEvalForm" :before-close="handleCloseB" custom-class="w50">
              <div>
                <el-form ref="evalForm" :model="evalForm" :rules="rulesB">
                  <el-form-item prop="evalReason">
                    <el-radio-group v-model="evalForm.evalReason" >
                        <el-radio label="厂家无货"><span>厂家无货</span><br/><br/></el-radio><br/>
                        <el-radio label="药品在途"><span>药品在途</span><br/><br/></el-radio><br/>
                        <el-radio label="有效期较近"><span>有效期较近</span><br/><br/></el-radio><br/>
                        <el-radio label="库存不足"><span>库存不足</span><br/><br/></el-radio><br/>
                       <el-row :gutter="24">
                          <el-col :span="24">
                            <el-radio label="">
                            <span>其他</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <el-input placeholder="请输入缺货原因" class="inputWidth" v-model="evalForm.otherReason" size="small"></el-input>
                            </el-radio>
                          </el-col>
                       </el-row>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item >
                      <el-input v-model="evalForm.orderId" type="hidden" size="small"></el-input>
                      <el-input v-model="evalForm.itemId" type="hidden" size="small"></el-input>
                    </el-form-item>
                </el-form>
              </div>
              <span slot="footer">
                <el-button type="primary"  @click="submitFormB('evalForm')">提交</el-button>
                <el-button @click="handleCloseB">取消</el-button>
              </span>
            </el-dialog>

            <!-- 弹窗：备货 -->
            <form-view v-if="formViewVisible" :parent-id="id" ref="formView" @refreshData="metaList"></form-view>
    </div>
  </div>
</template>
<script>
  import {salerItemList,breakReason,oosReason,removeBreakById,
    removeEvaluateById,Stocking,readItem,completeStockUp,
    exportEXL, salerItemListReceive,updateStocking,sendOrder,
    deleteSendOrder,saveStockUp,updateOrSave} from 'src/axios/trade/senderRole/order/salerTableView/salerHandleList'
  import formView from 'src/pages/trade/tradecenter/senderRole/order/salerTableView/stockUp';
  import {priceFormat,keyBoardEnter,dateFormatter,labelHead} from "src/utils";
  import {getPackHints,getSpecHints,isNumber} from "src/utils/validateUtil";
  import fileUpload from 'js-file-download'
  export default {
    name: "salerHandleList",
    data() {
      return {
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        breakForm:this.metaFormOne(),
        evalForm:this.metaFormTwo(),
        isFinish:'1',
        totalSendMoney:0,
        currentOrder:undefined,
        finsh:true,
        formViewVisible: false,
        itemId:'',
        expanded:true,
        multipleSelection:[],
        stockState:'',
        orderId:'',
        addData:[{
          lotNo:'',
          medicalExpiredDate:'',
          purchaseInvoiceNo:'',
          invoiceNo:'',
          amount:'',
          orderId:'',
          itemId:''
        }],
        query: this.metaQuery(), // 查询初始化
        showBreakForm: false, // 表单可见性初始化
        showEvalForm:false,
        showAddForm:false,
        showQuery: false, // 表单查询初始化
        state:undefined,
        active: 0,
        oid:'',
        order:this.orderData(),
        pState: this.pageState(),
        rules:this.metaRules(),
        rulesB:this.metaRulesB(),
        bakProductName:'',
        bakTradeName:'',
        requestQty:'',
        delivery:'',
        id:undefined,
        printList: {
          printData: [],
          printLabel: [
            {'labelName': '采购单编号', 'labelValue': 'purchaseCode'},
            {'labelName': '产品名', 'labelValue': 'htmlBakProductName'},
            {'labelName': '产品信息', 'labelValue': 'htmlBakProductSpec'},
            {'labelName': '单价', 'labelValue': 'unitPrice', 'width':60,  'headerAlign': 'left', 'align':'right'},
            {'labelName': '总到/订货量', 'labelValue': 'htmlDelivery','width':110,  'headerAlign': 'left', 'align':'right'},
            {'labelName': '总到/订金额', 'labelValue': 'htmlTotalSendMoney','width':110,  'headerAlign': 'left', 'align':'right'},
            {'labelName': '买方机构', 'labelValue': 'htmlBuyerOrgEasy'},
            {'labelName': '发送时间', 'labelValue': 'createDate', 'width': 90},
            {'labelName': '状态', 'labelValue': 'returnStates', 'width': 70},
          ]
        },
      };
    },
    created () {
      this.query.orderId=this.$route.query.orderId,
        this.evalForm.orderId=this.$route.query.orderId,
        this.breakForm.orderId=this.$route.query.orderId,
        this.pageState.state=this.$route.query.state,
        this.query.orderItemstate='',
        this.list()
    },
    watch:{
      "$route":"orderInfo",
      "$route":"list"
    },
    components: {
      formView
    },
    methods: {
      setRowClass({row, index}){
        // 是否展开二级表格（如果不需要展开二级表格则添加'unexpand'类）
        return row.remark ? '' : 'unexpand';
      },
      next() {
        if (this.active++ > 2) this.active = 0;
      },
      isNumber,
      priceFormat,
      labelHead,
      pageState () {
        return {
          state:this.$route.query.state
        }
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
      update(row){
        console.log(row)
        this.resData.orderBy=this.currentOrder;
        this.query.affectButtonState = "1";
        this.query.id = row.id;
        salerItemList(this.resData, this.query).then(res => {
          this.resData = res.data
          console.log(res)
          if(this.resData.pageNum === 0 ){
            this.resData.pageNum = 1
          }
        })
      },
      deleteStockup(scope){
        this.multipleSelection.push(scope.row)
        if(scope.row.readyFlag=='0') {
          this.$confirm('确认撤销选中的发货信息?', '信息', {
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
            })
            this.$message({
              type: 'success',
              message: '操作成功!'
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
            })
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
          })
        }
      },
      Calculation(row){
        console.log(row)
        row.totalSendMoney = row.amount*row.unitPrice;
        parseFloat( row.totalSendMoney ).toFixed(2);
      },
      sendGoods(scope){
        this.multipleSelection = [];
        this.multipleSelection.push(scope.row)
        let ids = [],arr = this.multipleSelection;
        ids.push(arr[0].id);
        console.log(ids)
        sendOrder(ids).then(res => {
          this.list()
          this.multipleSelection = []
        })
        this.$message({
          type: 'success',
          message: '发货成功!'
        });
      },
      getPackHints,
      getSpecHints,
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      updateSave(scope){
        if (!isNumber(scope.row.amount)) {
          this.$message({
            message: '请正确输入本次送货量！',
            type: 'warning'
          });
        } else if(Number(scope.row.amount)>Number(scope.row.requestQty)*2){
          this.$message.error("备货量不能超过订购量的两倍");
          return false;
        }else  if(scope.row.lotNo.trim()==''){
          this.$message.error('批号不能为空');
          return false;
        }else if(scope.row.medicalExpiredDate == ''||scope.row.medicalExpiredDate ==null){
          this.$message.error('有效期不能为空');
          return false;
        }else{
          updateOrSave(scope.row).then(res => {
            console.log(res)
            if(res.data == 0){
              this.$message.error("总备货量不能超过订购量的两倍");
              return false;
            }
            this.$message({
              type: 'success',
              message: '修改成功',
              onClose: () => {
                this.query.affectButtonState = "0";
                this.list()
              }
            })
          })
        }
      },
      save(scope) {
        if (!isNumber(scope.row.amount)) {
          this.$message({
            message: '请正确输入本次送货量！',
            type: 'warning'
          });
        } else if(Number(scope.row.amount)>Number(scope.row.requestQty)*2){
          this.$message.error("备货量不能超过订购量的两倍");
          return false;
        }else  if(scope.row.lotNo ==null ||scope.row.lotNo.trim()==''){
          this.$message.error('批号不能为空');
          return false;
        }else if(scope.row.medicalExpiredDate == ''||scope.row.medicalExpiredDate ==null){
          this.$message.error('有效期不能为空');
          return false;
        }else{
          saveStockUp(scope.row).then(res => {
            this.$message({
              type: 'success',
              message: '提交成功',
              onClose: () => {
                this.list()
              }
            })
          })

        }
      },
      metaFormOne(){
        return {
          breakReason:'',
          orderId:'',
          itemId:''
        }
      },
      cancel(scope){
        this.list()
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      metaFormTwo () {
        return {
          evalReason:'厂家无货',
          otherReason:'',
          orderId:'',
          itemId:''
        }
      },
      selectable(row,index) {
        if(Number(row.orderItemState)>= 2){
          return false
        }else {
          return true
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
          hasPreviousPage: "",
          hasNextPage: "",
          navigatePages: "",
          navigatepageNums: "",
          navigateFirstPage: "",
          navigateLastPage: "",
          firstPage: "",
          orderBy:undefined,
          lastPage: "",
          list: []

        }
      },
      show(row){
        this.$refs.multipleTable.toggleRowExpansion(row,this.expanded)
        this.expanded = !this.expanded
      },
      restForm(){
        this.oid = this.query.orderId
        this.query = this.metaQuery()
        this.query.orderId = this.oid
        this.list()
      },
      metaQuery () { // 表单查询数据初始化
        var date = new Date(),
          y = date.getFullYear(),m = date.getMonth();
        return {
          //            id: undefined,
          orderId:this.$route.query.orderId,
          name:undefined,
          specification:undefined,
          orderItemstate:'',
          bakMedicalSpec:'',
          bakFactoryEasy:'',
          searchOrderState:'',
          pageSign:'1',
          purchaseCode:'',
          beginTime:dateFormatter(new Date(y, m, 1),false),
          endTime:dateFormatter(new Date(),false),
          bakBuyerName:'',
          affectButtonState:'',
          id:''
        }
      },
      finishStockUp(recordId){
        completeStockUp(recordId).then(res => {
          this.list()
        })
      },
      read(){
        if(this.multipleSelection.length<1){
          this.$message.error('请选择已阅读的订单');
          return false;
        }else {
          this.$confirm('确认将选中的订单状态设置为阅读?', '信息', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let ids = [],arr = this.multipleSelection;
            for(let i = 0; i < arr.length; i++){
              ids.push(arr[i].recordId);
            }
            readItem(ids).then(res => {
              this.list()
            })
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
          })
        }
      },
      metaList(){
        this.list();
        this.stockState = '1'
      },
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        salerItemList(this.resData, this.query).then(res => {
          this.resData = res.data
          console.log(res)
          if(this.resData.pageNum === 0 ){
            this.resData.pageNum = 1
          }
          this.$emit("beSend",this.resData.total);
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

      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      },
      handleCloseA(done) {
        this.$refs['breakForm'].resetFields();
        this.toggleFormA();
      },
      handleCloseB(done) {
        this.$refs['evalForm'].resetFields();
        this.toggleFormB();
      },
      handleCloseC(done) {
        this.addData= [{
          lotNo:'',
          medicalExpiredDate:'',
          purchaseInvoiceNo:'',
          invoiceNo:'',
          amount:'',
          orderId:'',
          itemId:''
        }],
          this.isFinish='1',
          this.toggleFormC();
      },
      toggleFormA () {
        this.showBreakForm = !this.showBreakForm
      },
      toggleFormB () {
        this.showEvalForm = !this.showEvalForm
      },
      toggleFormC () {
        this.showAddForm = !this.showAddForm
      },
      deleteRow(index, rows) {
        if(rows.length === 1){
          this.$message.error('至少需要有一项备货');
          return false;
        }
        rows.splice(index, 1);
      },
      addInput(rows){
        rows.splice(rows.length, 0,{ lotNo:'', medicalExpiredDate:'',purchaseInvoiceNo:'', invoiceNo:'', amount:'', orderId:'', itemId:''});
      },
      // 重置用户表单
      resetForm(formName) {
        if (this.$refs[formName]!==undefined) {
          this.$refs[formName].resetFields();
        }
      },
      breakShow (itemId,orderId) {
        this.breakForm = this.metaFormOne();
        this.breakForm.orderId = orderId;
        this.breakForm.itemId = itemId,
          this.showBreakForm = true;
        this.$nextTick(function(){
          this.resetForm('breakForm'); // 重置表单，清除验证提示
        });
      },
      showEvaluate (itemId,orderId) {
        this.evalForm = this.metaFormTwo();
        this.evalForm.orderId = orderId;
        this.evalForm.itemId = itemId,
          this.showEvalForm = true;
        this.$nextTick(function(){
          this.resetForm('evalForm'); // 重置表单，清除验证提示
          this.rulesB = this.metaRulesB()
        });
      },
      stockUp(id){
        this.formViewVisible = true;
        this.$nextTick(() => {
          // 通过组件中设置的ref属性调取formView.vue中的fillData()方法加载弹窗内容
          this.$refs.formView.fillData(id);
        })
      },
      metaRules () {
        return {
          breakReason :[{  validator:(rule,value,callback)=>{
            if(this.breakForm.breakReason == ''){
              callback(new Error("  "));
            }else{
              callback();
            }
          }, trigger: 'blur'} ]
        }
      },
      metaRulesB () {
        return {
          evalReason :[{ validator:(rule,value,callback)=>{
            if(this.evalForm.evalReason == "" && this.evalForm.otherReason == ''){
              callback(new Error(" "));
            }else{
              callback();
            }
          }, trigger: 'blur'}]
        }
      },
      submitFormA(from) {
        this.$refs[from].validate((valid) => {
          if (valid) {
            breakReason(this.breakForm).then(res => {
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.toggleFormA(),
                this.$router.push({path: 'handleHome', query: {orderId: this.breakForm.orderId}}),
                this.list()
            })
          } else {
            this.$message({
              message: '断货原因不能为空',
              type: 'error'
            })
            return false;
          }
        });
      },
      submitFormB(from) {
        this.rulesB = this.metaRulesB()
        this.$refs[from].validate((valid) => {
          if (valid) {
            oosReason(this.evalForm).then(res => {
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.toggleFormB(),
                this.$router.push({path: 'handleHome', query: {orderId:this.evalForm.orderId}}),
                this.list()
            })
          } else {
            this.$message({
              message: '缺货原因不能为空',
              type: 'error'
            })
          }
        });
      },
      removeBreak(oderItemId,orderId){
        removeBreakById(oderItemId,orderId).then(res => {
          this.$router.push({path: 'handleHome', query: {orderId:orderId}}),
            this.$message({
              message: '提交成功',
              type: 'success'
            })
          this.list()
        })
      },
      removeEvaluate(oderItemId,orderId) {
        removeEvaluateById(oderItemId,orderId).then(res => {
          this.$router.push({path: 'handleHome',query: {}}),
            this.$message({
              message: '提交成功',
              type: 'success'
            })
          this.list()
        })
      },
      // 打印功能
      getPrintData() {
        let _this=this;
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
          item.htmlTotalSendMoney= item.totalReceiveMoney.toFixed(2)+'<br>'+item.totalRequestMoney.toFixed(2);
          item.htmlBuyerOrgEasy=item.buyerOrgEasy+'<br>'+'<span algin="center">(地址:'+item.address+')</span>';
          item.returnStates  = '<div class="hiddenfont" ><span>' + _this.getFlag(item.orderItemState) + '</span></div>';
          return item
        });
        sessionStorage.removeItem('printList');
        sessionStorage.setItem('printList', JSON.stringify(this.printList))
        //在新页面打开
        let routeData = this.$router.resolve({path: '/printTable'});
        window.open(routeData.href, '_blank');
      },
      getFlag(flag){
        var arrFlag = ['准备','未阅读','已阅读','已确认','到货中','完成','作废','缺货','断货','到货修改','关闭','申请作废','同意作废','拒绝作废']
        return arrFlag[flag];
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
          exportEXL(this.resData, this.query).then(res => {
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
