<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tabs-echo">
      <div class="tabs-echo-left">
        <div class="title">
          <span v-if="this.resMainData != undefined">采购单状态：{{getState(this.resMainData.purchaseState)}}</span>
        </div>
        <div class="tools">
          <span v-if="this.resMainData != undefined && this.resMainData.purchaseState!='0'">
              <el-button type="primary" size="small " @click="handlePass()">通过</el-button>
          </span>
          <span v-if="(this.resMainData != undefined && this.resMainData.purchaseState!='0')
              && (
                ((this.roleCode == 'serviceCenter' || this.roleCode == 'director') && this.resMainData.purchaseState == '1')
                ||
                (this.roleCode == 'manage' && this.resMainData.purchaseState == '5' )
              )">
            <el-button type="danger" size="small " @click="handleRefuse()">拒绝</el-button>
          </span>
          <span
            v-if="(this.resMainData != undefined) && (this.resMainData.purchaseState=='0') && (this.resMainData.approveConfigFlag==true) ">
            <el-button type="primary" size="small " @click="handlePass()">送审</el-button>
          </span>
          <span
            v-if="(this.resMainData != undefined) && (this.resMainData.purchaseState=='0') && (this.resMainData.approveConfigFlag==false) ">
            <el-button type="primary" size="small " @click="handlePass()">发送</el-button>
          </span>
          <!--<span v-if="this.resMainData.purchaseState !='5'">-->
          <!--<el-button type="primary" size="small " @click="handlePass()">送审</el-button>-->
          <!--</span>-->
          <el-button size="small" class="el-button-pale" @click="handleBack()">返回</el-button>
        </div>
      </div>
      <div class="tabs-echo-right">
        <ul class="tabs-echo-ul">
          <li>采购单编号：<span v-if="this.resMainData != undefined">{{this.resMainData.purchaseCode}}</span></li>
          <li>创建时间：<span v-if="this.resMainData != undefined">{{this.resMainData.createDate}}</span></li>
          <li>拟采金额：<span class="red" v-if="this.resMainData != undefined">{{ priceFormat(this.resMainData.requestTotal) }}</span>
          </li>
        </ul>
        <ul class="tabs-echo-ul">
          <li>创建人：<span v-if="this.resMainData != undefined">{{this.resMainData.createName}}</span></li>
          <li>买方机构：<span v-if="this.resMainData != undefined">{{this.resMainData.bakBuyerEasy}}</span></li>
          <li>联系电话：<span v-if="this.resMainData != undefined">{{this.resMainData.linkPhone}}</span></li>
        </ul>
        <ul class="tabs-echo-ul">
          <li>是否补单：
            <span
              v-if="this.resMainData != undefined && (this.resMainData.flag == '2' || this.resMainData.flag == '3')">是</span>
            <span
              v-if="this.resMainData != undefined && (this.resMainData.flag == '0' || this.resMainData.flag == '1')">否</span>
          </li>
          <li>整单备注：
              <el-tooltip placement="bottom" v-if="resMainData.orderRemark">
                <div slot="content" class="width-160">{{resMainData.orderRemark}}</div>
                <el-input v-model="resMainData.orderRemark" size="small" class="width-120" :disabled="true"></el-input>
              </el-tooltip>
          </li>
          <li>送审说明：
            <el-tooltip placement="bottom" v-if="resMainData.approveRemark">
              <div slot="content" class="width-160">{{resMainData.approveRemark}}</div>
              <el-input v-model="resMainData.approveRemark" size="small" class="width-120" :disabled="true"></el-input>
            </el-tooltip>
          </li>
        </ul>
      </div>
    </div>
    <!-- 表格列表 -->
    <div class="tablebox">
        <el-form :inline="true" :model="query" ref="formQuery" class="table-form">
          <el-form-item class="width-100">
            <el-input v-model="query.searchProductName"  @keyup.enter.native="searchEnterFun" placeholder="品名"
                      size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-100">
            <el-input v-model="query.searchMedicalSpec" @keyup.enter.native="searchEnterFun" placeholder="规格"
                      size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-100">
            <el-input v-model="query.searchOrgName"  @keyup.enter.native="searchEnterFun" placeholder="生产企业" size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-100">
            <el-input v-model="query.searchSenderName"  @keyup.enter.native="searchEnterFun" placeholder="配送企业" size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-100">
            <el-input v-model="query.searchAddress"  @keyup.enter.native="searchEnterFun" placeholder="配送地址" size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-100">
            <el-select v-model="query.searchBasicFlag" @keyup.enter.native="searchEnterFun" placeholder="是否基药" size="small">
              <el-option label="全部" value=""></el-option>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="width-120">
            <el-select v-model="query.searchIsRegion" @keyup.enter.native="searchEnterFun" placeholder="是否区目录" size="small">
              <el-option label="全部" value=""></el-option>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item class="width-120">-->
          <!--<el-select v-model="query.searchTwoVotes" @keyup.enter.native="searchEnterFun" placeholder="是否两票制" size="small">-->
          <!--<el-option label="全部" value=""></el-option>-->
          <!--<el-option label="是" value="1"></el-option>-->
          <!--<el-option label="否" value="0"></el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <el-form-item>
            <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
            <el-button type="warning" size="small" @click="restQuery()">重置</el-button>
          </el-form-item>
        </el-form>

      <div class="tableset">

        <el-table ref="multipleTable" :data="resData.list" tooltip-effect="dark"
                  style="width: 100%" @selection-change="handleSelectionChange" @sort-change="sortChang"
                  @cell-click="handleCell" stripe border>
          <!--<el-table-column type="selection" width="40" align="center"></el-table-column>-->
          <!--
            <el-table-column label="药品信息" width="300" prop="drugDetail">
                     <template slot-scope="scope" class="drugMessage">
                       <p>
                         <i class="ico icon-ji" v-if="scope.row.degreeFlag == '2'"></i>
                         {{ scope.row.bakProductName }}（商品名：{{ scope.row.bakTradeName }}）
                         <i class="ico icon-jc" v-if="scope.row.contractType != '0'"></i>
                         <i class="ico icon-qu" v-if="scope.row.regionId != '0'"></i>
                       </p>
                       <p class="drugCon">
                         规格包装：{{ scope.row.bakMedicalSpec}} × {{ scope.row.bakStandRate}} {{scope.row.useUnit}} / {{ scope.row.metricName}}
                         中大包装：{{ scope.row.middleStandRate}}/{{ scope.row.bigMiddleRate}}
                       </p>
                       <p class="drugCon">生产企业：{{ scope.row.bakFactoryEasy}}</p>
                     </template>
                   </el-table-column>
         -->
          <el-table-column label="产品名称" min-width="200" prop="p.BAK_PRODUCT_NAME" sortable="custom">
            <template slot-scope="scope" class="drugMessage">
              <ul class="ico-zt">
                <li class="ico-left">
                  <div class="icon-box">
                    <i class="ico icon-ji" v-if="scope.row.degreeFlag == '2'" style="cursor:pointer"
                       @click="handleUpdateDegreeCancelIcon(scope.row.id,scope.row.purchaseId)"></i>
                    <i class="ico icon-jihui" v-if="scope.row.degreeFlag == '0'" style="cursor:pointer"
                       @click="handleUpdateDegreeSetIcon(scope.row.id,scope.row.purchaseId)"></i>
                    <i class="ico icon-jc" v-if="scope.row.basicMedicantFlag != '0'"></i>
                    <i class="ico icon-qu" v-if="scope.row.isRegion != '0'"></i>
                    <i class="ico icon-budan" v-if="scope.row.flag == '2' || scope.row.flag == '3'"></i>
                    <i class="ico icon-liang" v-if="scope.row.twoVoteType != '0'" ></i>
                  </div>
                </li>
                <li>
                  <!--tootip提示气泡-->
                  <!--:enterable="false" 鼠标不可进入tooltip中-->
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
          <el-table-column prop="drugStorage" label="产品信息" min-width="200">
            <template slot-scope="scope">
              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{getSpecHints(scope.row.bakMedicalSpec,scope.row.bakStandRate,scope.row.useUnit,scope.row.metricName,scope.row.bakWrapName )}}<br/>
                  {{getPackHints(scope.row.bakFactoryEasy,scope.row.middleStandRate,scope.row.bigMiddleRate)}}
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    {{ scope.row.bakMedicalSpec}} × {{ scope.row.bakStandRate}} {{scope.row.useUnit}} / {{ scope.row.metricName}} &nbsp;&nbsp;
                    <span v-if="scope.row.bakWrapName != '空' && scope.row.bakWrapName != null">{{ scope.row.bakWrapName}}</span>
                  </div>
                  <div class="text-inline">
                    {{ scope.row.bakFactoryEasy}}&nbsp;&nbsp; 中大包装: {{scope.row.middleStandRate}}/{{ scope.row.bigMiddleRate}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="drugStorage" label="药库"
                           v-if="this.resMainData != undefined && this.resMainData.repositoryFlag">
            <template slot-scope="scope">
              <span>{{ scope.row.repositoryName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="enterprise" label="配送地址" width="150">
            <template slot-scope="scope">
              <el-select v-model="scope.row.addressId" placeholder="请选择" size="small"
                         @change="handleChangeAddress(scope.row.addressId,scope.row.purchaseId,scope.row.id,scope.row.repositoryId,scope.row.productId)">
                <el-option v-for="item in scope.row.addresses" :key="item.address" :label="item.addressAbbr"
                           :value="item.id">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="单价" header-align="left" align="center" width="150" prop="p.UNIT_PRICE"
                           sortable="custom">
            <template slot-scope="scope">
              <!--<div>{{ priceFormat(scope.row.unitPrice) }}</div>-->
              <div v-if="scope.row.enableFlag == '1' && scope.row.priceSource == '0'">
                {{ priceFormat(scope.row.unitPrice) }}
              </div>
              <div v-if="scope.row.enableFlag == '1' && scope.row.priceSource == '1'">
                {{ priceFormat(scope.row.unitPrice) }}(议价)
              </div>
              <div v-if="scope.row.enableFlag == '1' && scope.row.priceSource == '2'">
                {{ priceFormat(scope.row.unitPrice) }}(降价)
              </div>
              <div v-if="scope.row.enableFlag == '1' && scope.row.priceSource == '3'">
                {{ priceFormat(scope.row.hitPrice) }}(被动降价)
              </div>
              <div v-if="scope.row.enableFlag == '1' && scope.row.priceSource == '4'">
                {{ priceFormat(scope.row.hitPrice) }}(涨价)
              </div>
              <div v-if="scope.row.enableFlag == '2' || scope.row.enableFlag == '3' || scope.row.enableFlag == '4' || scope.row.enableFlag == '5'">
                (待谈判)
              </div>
              <template v-if="scope.row.minTradePrice == '0.00' && scope.row.maxTradePrice == '0.00'">
                <range-bar :rangeData="[scope.row.unitPrice,scope.row.minTradePrice,scope.row.maxTradePrice]"></range-bar>
              </template>
              <template v-else>
                <range-bar :rangeData="[scope.row.unitPrice,scope.row.minTradePrice,scope.row.maxTradePrice,1]"></range-bar>
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="enterprise" label="配送企业" width="174">
            <template slot-scope="scope">
              <el-select v-model="scope.row.senderOrgid" placeholder="请选择" size="small" class="width-160"
                         @change="handleChangeSender(scope.row.senderOrgid,scope.row.purchaseId,scope.row.id,scope.row,scope.row.sendBusiness,scope.row.senderOrgid,scope.row.productId)">
                <el-option v-for="(item,index)  in scope.row.sendBusiness" :key="item.index" :label="item.senderEasy"
                           :value="item.senderId">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="数量" width="112">
            <!--@input="handleAddMinus(scope.row.requestQty,scope.row.id,scope.row.purchaseId)"-->
            <!--<template slot-scope="scope">
              <el-input-number size="small" v-model="scope.row.requestQty" :min="1" :step="10"
                               @change="handleAddMinus(scope.row.requestQty,scope.row.id,scope.row.purchaseId)"
                               @blur="amountStatistics(scope.row.requestQty,scope.row.id,scope.row.purchaseId)">
              </el-input-number>
            </template>-->
            <template slot-scope="scope">
              <!--<el-input-number-->
              <!--size="small"-->
              <!--v-model="scope.row.requestQty"-->
              <!--:min="1"-->
              <!--:step="10"-->
              <!--:precision="0"-->
              <!--class="width-120"-->
              <!--type="number"-->
              <!--@change="handleAddMinus(scope.row)"-->
              <!--@focus="amountStatistics(scope.row)">-->
              <!--</el-input-number>-->
              <el-input
                size="small"
                v-model="scope.row.requestQty"
                @change="handleAddMinus(scope.row)"
                class="width-80">
              </el-input>
              <i class="iconfont icon-shanchu ahand"
                 @click="handleDeleteOneMedicine(scope.row.id)"></i>
            </template>
          </el-table-column>
          <el-table-column label="金额" width="70" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.itemRequestTotal }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="buyerRemark" label="备注" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>
                <el-input size="small" v-model="scope.row.remark"
                          @blur="handleCellSubmit(scope.row.id,scope.row.remark)">
                </el-input>
              </span>
              <!--<span @click="dataBackFillGoods" v-if="scope.row.id !=cellIndex">{{ scope.row.remark }}</span>-->
              <!--<span><el-input size="small" v-model="scope.row.remark"-->
              <!--v-if="scope.row.id===cellIndex"-->
              <!--@blur="handleCellSubmit(scope.row.id,scope.row.remark)"-->
              <!--&gt;</el-input></span>-->
            </template>
          </el-table-column>

        </el-table>
      </div>

      <div class="pagebox">
        <ul class="explain">
          <li><i class="ico icon-qu"></i><span>区目录</span></li>
          <li><i class="ico icon-jc"></i><span>基本药物</span></li>
          <li><i class="ico icon-ji"></i><span>急需药品</span></li>
          <li><i class="ico icon-yi"></i><span>医保药品</span></li>
          <li><i class="ico icon-liang"></i><span>两票制</span></li>
          <li><i class="ico icon-kang"></i><span>抗菌药</span></li>
          <li><i class="ico icon-budan"></i><span>补单</span></li>
        </ul>
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30]"
          :total="resData.total"
          :page-size="resData.pageSize"
          :page-count="resData.pages"
          :pager-count="5"
          :current-page.sync="resData.pageNum">
        </el-pagination>
      </div>
      <el-dialog title="整单备注" :visible.sync="dialogFormVisible" custom-class="w30">
        <el-form>
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="createOrderRemark">
          </el-input>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="orderRemark" size="small">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="送审说明" :visible.sync="dialogFormVisible2" custom-class="w30">
        <el-form>
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="auditingRemark">
          </el-input>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false" size="small">取 消</el-button>
          <el-button type="primary" @click="auditingRemarks" size="small">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="log-box">
      <div class="title-name"></div>
      <ul class="log-con">

      </ul>
    </div>
    <div class="foot-btn">
      <div class="foot-left">
        <el-button type="success" size="small" @click="handleAddMedicine()"
                   v-if="this.resMainData != undefined && (this.resMainData.flag == '0' || this.resMainData.flag == '2')">
          增加
        </el-button>
        <el-button type="success" size="small" @click="handleAddTempMedicine()"
                   v-if="this.resMainData != undefined && (this.resMainData.flag == '1' || this.resMainData.flag == '3')">
          增加
        </el-button>
        <!--<el-button type="danger" size="small" @click="handleDeleteMedicine()">删除药品</el-button>-->

        <!--<el-button type="primary" size="small" @click="handleUpdateDegreeSet()">设置急需</el-button>-->

        <!--<el-button type="warning" size="small" @click="handleUpdateDegreeCancel()">取消急需</el-button>-->
        <el-button v-if="this.degreeFlag == '2'" type="primary" size="small" @click="handleUpdateAllDegreeCancel()">
          整单急需
        </el-button>
        <el-button v-else type="warning" size="small" @click="handleUpdateAllDegreeSet()">
          整单急需
        </el-button>

        <el-button type="primary" size="small" @click="handleUpdateSuppleSet()"
                   v-if="this.resMainData != undefined && (this.resMainData.flag == '0' || this.resMainData.flag == '1')">
          设置补单
        </el-button>
        <el-button type="warning" size="small" @click="handleUpdateSuppleCancel()"
                   v-if="this.resMainData != undefined && (this.resMainData.flag == '2' || this.resMainData.flag == '3')">
          取消补单
        </el-button>
        <el-button type="success" size="small" @click="handlePurchaseRemark()">
          整单备注
        </el-button>
        <el-button type="success" size="small" @click="handleApproveRemark()">
          送审说明
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>

  // 引入用户相关请求
  import {
    queryFirstApprovePurchaseItemList, findFirstApprovePurchase, updatePurchaseItemQty,
    updatePurchaseItemRemark, updateDegreeSet, updateDegreeCancel, deleteMedicineShoppingCar,
    updatePassOrRefusePurchase, updatePurchaseItemSender, updateSuppleSet, updateSuppleCancel,
    updatePurchaseItemAddress, updateRemark, savePurchase, checkPurchaseSend, updateCheckPurchase,
    updateAllDegreeSet,updateAllDegreeCancel,selectLiang
  }
    from 'src/axios/trade/purchase/purchase'
  import {isNotNull, isNumber} from "src/utils/validateUtil";
  import {priceFormat, keyBoardEnter} from "src/utils";
  import {getSpecHints, getPackHints} from "src/utils/validateUtil";
  import RangeBar from 'src/components/RangeBar';

  export default {
    components: {
      RangeBar
    },
    data() {
      return {
        query: this.metaQuery(),
        currentOrder: undefined,
        degreeFlag: undefined,
        resData: this.metaData(),
        resMainData: this.metaMainData(),
        cellIndex: undefined,
        roleCode: '',
        dataList: [],
        tableData: [],
        purchaseId: undefined,
        jump: undefined,
        dialogFormVisible: false,
        dialogFormVisible2: false,
        createOrderRemark: "",
        auditingRemark: "",
        paginations: { // 初始化分页
          pageNum: 1,
          pageSize: 20,
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
        },
//        curentMode:undefined
        curentMode: {}

      }
    },

    created() {
      this.purchaseId = this.$route.params.purchaseId;
      this.jump = this.$route.params.jump;
//      if(this.$route.params.jump == '' || this.$route.params.jump == undefined){
//        this.jump == 'order';
//      }
      this.list();
    },
    mounted() {
      var _this = this;
      // 初始化表格已选数据
      var checkArr = [];
      var apiList = this.resData.list;
      for (let i = 0; i < apiList.length; i++) {
        if (apiList[i].isChecked) {
          checkArr.push(i);
        }
      }
      _this.checkedItems = checkArr;
      _this.tableData = apiList;
      _this.$nextTick(function () {
        _this.checked(); // 每次更新了数据就触发这个函数
      });
    },
    methods: {
      getSpecHints,
      getPackHints,
      priceFormat,
      list() {
        this.resData.orderBy = this.currentOrder;
        queryFirstApprovePurchaseItemList(this.resData, this.query, this.purchaseId).then(res => {
          this.resData = res.data;
          findFirstApprovePurchase(this.purchaseId).then(res => {
            this.resMainData = res.data;
            this.degreeFlag = res.data.degreeFlag;
            this.createOrderRemark = res.data.orderRemark;
            this.auditingRemark = res.data.approveRemark;
            this.byName=res.data.byName;
            this.roleCode = res.data.roleCode;
          });
        })
      },
      sortChang(value) {
        let sortType = " desc";
        if (value.order.startsWith("asc")) {
          sortType = " asc";
        }
        this.currentOrder = value.prop + sortType;
        this.list()
      },
      searchEnterFun(e) {
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      auditingRemarks() {
        updateRemark(this.auditingRemark,this.createOrderRemark,this.byName,this.purchaseId).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.dialogFormVisible2 = false;
              this.list();
            }
          })
        })
      },
      handleUpdateSuppleSet() {
        updateSuppleSet(this.purchaseId).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.list()
            }
          })
        })
      },
      handleUpdateSuppleCancel() {
        updateSuppleCancel(this.purchaseId).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.list()
            }
          })
        })
      },
      orderRemark() {
        updateRemark(this.auditingRemark,this.createOrderRemark,this.byName,this.purchaseId).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.dialogFormVisible = false
              this.list();
            }
          })
        })

      },
      handlePass() {
        //1，审核通过；0，审核拒绝。
        let _this = this;
        if (this.resMainData == undefined) {
          _this.$alert('该采购单已失效', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false
        } else {
          checkPurchaseSend(_this.purchaseId).then(res => {
            if (res.data.type == "0") {
              _this.$confirm(res.data.message + "\n是否继续？", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                dangerouslyUseHTMLString: true
              }).then(() => {
                updateCheckPurchase(_this.purchaseId);
                updatePassOrRefusePurchase(_this.purchaseId, '1').then(res => {
                  _this.$message({
                    message: res.success == true ? res.data : res.message,
                    type: res.success == true ? 'success' : 'error',
                    duration: res.success == true ? 1000: 3000,
                    onClose: () => {
//                      _this.$router.push("/trade/manage/firstInstanceRole/allPurchaseOrder")
                      if(this.jump == "order"){
                        this.$router.push("/trade/manage/orderReceiveTabs/"+1)
                      }else{
                        this.$router.push("/trade/manage/approvalTabs")
                      }

                    }
                  })
                })
              });
            } else if (res.data.type == "1") {
              _this.$alert(res.data.message + "\n是否继续？", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                dangerouslyUseHTMLString: true
              }).then(() => {
                updateCheckPurchase(_this.purchaseId);
//                _this.$router.push("/trade/manage/firstInstanceRole/allPurchaseOrder")
//                this.$router.push("/trade/manage/orderReceiveTabs")
                if(this.jump == "order"){
                  this.$router.push("/trade/manage/orderReceiveTabs/"+1)
                }else{
                  this.$router.push("/trade/manage/approvalTabs")
                }
              });
            } else {
              updatePassOrRefusePurchase(_this.purchaseId, '1').then(res => {
                _this.$message({
                  message: res.success == true ? res.data : res.message,
                  type: res.success == true ? 'success' : 'error',
                  duration: res.success == true ? 1000 : 3000,
                  onClose: () => {
//                    _this.$router.push("/trade/manage/firstInstanceRole/allPurchaseOrder")
//                    _this.$router.push("/trade/manage/orderReceiveTabs")
                    if(this.jump == "order" || (this.roleCode == 'service' || this.roleCode == 'doctor')){
                      this.$router.push("/trade/manage/orderReceiveTabs/"+1)
                    }else{
                      this.$router.push("/trade/manage/approvalTabs")
                    }
                  }
                })
              })
            }
          })
        }
      },
      handleRefuse() {
        if (this.resMainData == undefined) {
          this.$alert('该采购单已失效', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false
        } else {
          //1，审核通过；0，审核拒绝。
          updatePassOrRefusePurchase(this.purchaseId, '0').then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
//                this.$router.push("/trade/manage/orderReceiveTabs")
                if(this.jump == "order"){
                  this.$router.push("/trade/manage/orderReceiveTabs/"+1)
                }else{
                  this.$router.push("/trade/manage/approvalTabs")
                }
              }
            })
          })
        }
      },
      handleBack() {
//        this.$router.push("/trade/manage/firstInstanceRole/allPurchaseOrder")
//        this.$router.push("/trade/manage/orderReceiveTabs")
        if(this.jump == "order"){
          this.$router.push("/trade/manage/orderReceiveTabs/"+1)
        }else{
          this.$router.push("/trade/manage/approvalTabs")
        }
      },
      handleSavePurchase() {
        savePurchase(this.purchaseId).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
//              this.$router.push("/trade/manage/buyerrole/purchaseTabs")
              if(this.jump == "order"){
                this.$router.push("/trade/manage/orderReceiveTabs/"+1)
              }else{
                this.$router.push("/trade/manage/approvalTabs")
              }
            }
          })
        })
      },
      restQuery() {
        this.query = this.metaQuery();
        this.list();
      },
      handleCellSubmit(id, buyerRemark) {
        updatePurchaseItemRemark(id, buyerRemark).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.list()
            }
          })
        })
      },
      handleAddMedicine() {
        if (this.resMainData == undefined) {
          this.$alert('该采购单已失效', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false
        } else {
          this.$router.push("/trade/manage/firstInstanceRole/addMedicine/" + this.purchaseId)
        }

      },
      handleAddTempMedicine() {
        if (this.resMainData == undefined) {
          this.$alert('该采购单已失效', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false
        } else {
          this.$router.push("/trade/manage/firstInstanceRole/addTempMedicine/" + this.purchaseId)
        }

      },
      handleDeleteMedicine() {
        if (this.dataList.length < 1) {
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false
        } else {

          this.$confirm(`确定删除选中的数据吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var idList = '';
            var purchaseId = this.purchaseId;
            for (var noticeType of this.dataList) {
              idList += (noticeType.id + ',');
            }
            deleteMedicineShoppingCar(idList, purchaseId).then(res => {
              this.$message({
                message: res.data,
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
      },
      handleDeleteOneMedicine(id) {
        var purchaseId = this.purchaseId;
        deleteMedicineShoppingCar(id, purchaseId).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.list()
            }
          })
        })
      },
      //批量设置急需
      handleUpdateDegreeSet() {
        if (this.dataList.length < 1) {
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false
        } else {
          this.$confirm(`确定修改选中的数据吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              var idList = '';
              var purchaseId = this.purchaseId;
              for (var noticeType of this.dataList) {
                idList += (noticeType.id + ',');
              }
              updateDegreeSet(idList, purchaseId).then(res => {
                this.$message({
                  message: res.data,
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                    this.list()
                  }
                })
              })
            })
        }
      },

      //图标设置急需
      handleUpdateDegreeSetIcon(id, purchaseId) {
        updateDegreeSet(id, purchaseId).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.list()
            }
          })
        })
      },

      getDrugStorage(bakMedicalSpec, bakStandRate, useUnit, metricName, middleStandRate, bigMiddleRate) {
        let _bakMedicalSpec = bakMedicalSpec || '';
        let _bakStandRate = bakStandRate || '';
        let _useUnit = useUnit || '';
        let _metricName = metricName || '';
        let _middleStandRate = middleStandRate || '';
        let _bigMiddleRate = bigMiddleRate || '';
        return _bakMedicalSpec + '×' + _bakStandRate + _useUnit + '/' + _metricName + '\n中大包装:' + _middleStandRate + '/' + _bigMiddleRate
      },
      //批量取消急需
      handleUpdateDegreeCancel() {
        if (this.dataList.length < 1) {
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false
        } else {
          this.$confirm(`确定修改选中的数据吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              var idList = '';
              var purchaseId = this.purchaseId;
              for (var noticeType of this.dataList) {
                idList += (noticeType.id + ',');
              }
              updateDegreeCancel(idList, purchaseId).then(res => {
                this.$message({
                  message: res.data,
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                    this.list()
                  }
                })
              })
            })
        }
      },

      //图标取消急需
      handleUpdateDegreeCancelIcon(id, purchaseId) {
        updateDegreeCancel(id, purchaseId).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.list()
            }
          })
        })
      },
      getBigMiddleRate(row, id) {
        let str = '';
        row.sendBusiness.some((item) => {
          if (item.senderId === id) {
            const _str1 = item.middleStandRate || '';
            const _str2 = item.bigMiddleRate || '';
            str = _str1 + "/" + _str2;
          }
        })
        return str;
      },
      handleChangeSender(senderId, purchaseId, planItemId,row,productId) {
//        for(let i=0;i<row.length;i++){
//          if(row[i].senderId==business){
//            rowSide.bigMiddleRate=row[i].bigMiddleRate;
//            rowSide.middleStandRate=row[i].middleStandRate;
//          }
//        }
        selectLiang(senderId).then(res => {
          row.twoVoteType=res.data;
        })
        updatePurchaseItemSender(senderId, purchaseId, planItemId,productId).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.list()
            }
          })
        });
      },

      checked() {
        //首先el-table添加ref="multipleTable"引用标识
        var checkedItem = this.checkedItems;
        for (let i = 0; i < checkedItem.length; i++) {
          this.$refs.multipleTable.toggleRowSelection(this.tableData[checkedItem[i]], true);
        }
      },
      metaQuery() {
        return {
          id: undefined,
          id: undefined,
          searchProductName: undefined,
          searchMedicalSpec: undefined,
          requestTotal: undefined,
          requestQty: undefined,
          buyerRemark: undefined,
          repositoryFlag: false,
          searchOrgName:undefined,
          searchSenderName:undefined,
          searchAddress:undefined,
          searchIsRegion: undefined,
          searchTwoVotes: undefined,
          searchBasicFlag: undefined
        }
      },
      handleChangeAddress(addressId, purchaseId, purchaseItemId, repositoryId,productId) {
        updatePurchaseItemAddress(addressId, purchaseId, purchaseItemId, repositoryId,productId).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.list()
            }
          })
        });
      },
      dataBackFillGoods() {
        this.remarkShow = !this.remarkShow;
      },
      amountStatistics(row) {
        for (let x in row) {
          this.$set(this.curentMode, x, row[x])
        }
      },
      handleAddMinus(row) {
        this.$nextTick(() => {
          for (let x in row) {
            this.$set(this.curentMode, x, row[x])
          }
          updatePurchaseItemQty(this.curentMode.requestQty, this.curentMode.id, this.curentMode.purchaseId).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.list()
              }
            })
          })
        })
      },
      handlePurchaseRemark() {
        if (this.resMainData == undefined) {
          this.$alert('该产品明细已清空', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false
        } else {
          this.dialogFormVisible = true
        }
      },
      handleApproveRemark() {
        if (this.resMainData == undefined) {
          this.$alert('该产品明细已清空', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false
        } else {
          this.dialogFormVisible2 = true
        }
      },

      handleUpdateAllDegreeSet(){
        this.$confirm(`确定设置急需吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            updateAllDegreeSet(this.purchaseId).then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.list()
                }
              })
            })
          })
      },
      //整单取消急需
      handleUpdateAllDegreeCancel(){
        this.$confirm(`确定取消急需吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            updateAllDegreeCancel(this.purchaseId).then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.list()
                }
              })
            })
          })
      },
      handleCell(row, column, cell, event) {
        if (column.label == "备注") {
          this.cellIndex = row.id;
        } else {
          this.cellIndex = undefined;
        }

      },
      getState(state) {
        var arrState = ['准备', '送一审', '发送', '一审拒绝', '完成', '送二审', '二审拒绝', '购物车状态'];
        return arrState[state];
      },
      handleSelectionChange(val) {
        this.dataList = val;
      },
      handleSizeChange(val) {
        this.tableData3.pageSize = val
        /*this.list()*/
      },
      handleCurrentChange(val) {
        this.tableData3.pageNum = val
        /*this.list()*/
      },
      metaMainData() {
        return {
          purchaseCode: undefined,
          createDate: undefined,
          requestTotal: undefined,
          createName: undefined,
          linkPhone: undefined,
          bakBuyerEasy: undefined,
          purchaseState: undefined,
          purchaseRemark: undefined,
          approveRemark: undefined,
          byName: undefined,
          roleCode: undefined,
          flag: undefined,
          repositoryFlag: false,
          orderRemark: undefined
        }
      },
      metaData() {
        // 前后台交互数据封装格式
        return {
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
    }
  }
</script>




