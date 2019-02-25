<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">

      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" size="small" :inline="true" class="demo-form-inline table-form">
            <el-form-item class="width-100">
              <el-input v-model="query.searchProductName"  @keyup.enter.native="searchEnterFun" placeholder="品名" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-100">
              <el-input v-model="query.searchMedicalSpec"  @keyup.enter.native="searchEnterFun" placeholder="规格" size="small"></el-input>
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
              <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
              <el-button type="warning" @click="restQuery()" size="small">重置</el-button>
            </el-form-item>
        </el-form>
      <div class="tableset">

        <el-table ref="multipleTable" :data="resData.list" tooltip-effect="dark" @sort-change="sortChang"
                  style="width: 100%" @selection-change="handleSelectionChange"  @cell-click="handleCell" stripe border>
          <!--<el-table-column type="selection" width="40" align="center"></el-table-column>-->
         <!--
          <el-table-column label="药品信息" width="300" prop="drugDetail">
          <template slot-scope="scope" class="drugMessage">
            <p>
              <span class="icon-sign icon-jixu" v-if="scope.row.degreeFlag == '2'"></span>
              {{ scope.row.bakProductName }}（商品名：{{ scope.row.bakTradeName }}）
              <span class="icon-sign sign-basic" v-if="scope.row.contractType != '0'">基</span>
              <span class="icon-sign sign-district" v-if="scope.row.regionId != '0'">区</span>
            </p>
            <p class="drugCon">
              规格包装：{{ scope.row.bakMedicalSpec}} × {{ scope.row.bakStandSpecRate}} {{scope.row.bakUseUnit}} / {{ scope.row.bakSpecUnit}}
              中大包装：{{ scope.row.bakMiddleStandRate}}/{{ scope.row.bakBigMiddleRate}}
            </p>
            <p class="drugCon">生产企业：{{ scope.row.bakProducerShortname}}</p>
          </template>
          </el-table-column>
  -->
          <el-table-column label="产品名称"  prop="h.bak_product_name" sortable="custom" min-width="180">
            <template slot-scope="scope" class="drugMessage">
              <ul class="ico-zt">
                <li class="ico-left">
                  <i class="ico icon-ji " v-if="scope.row.degreeFlag == '2'" style="cursor:pointer" @click="handleUpdateDegreeCancelIcon(scope.row.purchaseItemId,scope.row.purchaseId)"></i>
                  <i class="ico icon-jihui" v-if="scope.row.degreeFlag == '0'" style="cursor:pointer" @click="handleUpdateDegreeSetIcon(scope.row.purchaseItemId,scope.row.purchaseId)"></i>
                  <i class="ico icon-jc" v-if="scope.row.contractType != '0'"></i>
                  <i class="ico icon-qu" v-if="scope.row.regionId != '0'"></i>
                  <i class="ico icon-budan" v-if="scope.row.flag == '2'"></i>
                  <i class="ico icon-liang" v-if="scope.row.twoVoteType != '0'" ></i>
                </li>
                <li>
                  <!--tootip提示气泡-->
                  <!--:enterable="false" 鼠标不可进入tooltip中-->
                  <el-tooltip placement="top" :enterable="false">
                    <!--气泡内容（必须放在slot="content"内）,布局与源内容保持一致-->
                    <div slot="content">
                      <div>{{ scope.row.bakProductName }}</div>
                      <div v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName !=null">{{ scope.row.bakMedicalMode }}({{ scope.row.bakTradeName }})</div>
                      <div v-if="scope.row.bakTradeName == '无' || scope.row.bakTradeName ==null">{{ scope.row.bakMedicalMode }}</div>
                    </div>

                    <!--源内容（必须放在class="el-tooltip-box"内）-->
                    <div class="el-tooltip-box">
                      <!--加class="text-inline"确保内容不折行-->
                      <div class="text-inline">{{ scope.row.bakProductName }}</div>
                      <div class="text-inline"  v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName !=null">{{ scope.row.bakMedicalMode }}({{ scope.row.bakTradeName }})</div>
                      <div class="text-inline"  v-if="scope.row.bakTradeName == '无' || scope.row.bakTradeName ==null">{{ scope.row.bakMedicalMode }}</div>
                    </div>
                  </el-tooltip>
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column  label="产品信息" min-width="180">
            <template slot-scope="scope">

               <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{getSpecHints(scope.row.bakMedicalSpec,scope.row.bakStandSpecRate,scope.row.bakUseUnit,scope.row.bakSpecUnit,scope.row.bakWrapName)}}<br/>
                  {{getPackHints(scope.row.bakProducerShortname,scope.row.middleStandRate,scope.row.bigMiddleRate)}}
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    <span v-if="scope.row.bakWrapName != '空' && scope.row.bakWrapName != null">{{ scope.row.bakMedicalSpec}} × {{ scope.row.bakStandSpecRate}} {{scope.row.bakUseUnit}} / {{ scope.row.bakSpecUnit}} &nbsp;&nbsp; {{ scope.row.bakWrapName}}</span>
                    <span v-if="scope.row.bakWrapName == '空' || scope.row.bakWrapName == null">{{ scope.row.bakMedicalSpec}} × {{ scope.row.bakStandSpecRate}} {{scope.row.bakUseUnit}} / {{ scope.row.bakSpecUnit}}</span>
                  </div>
                  <div class="text-inline" >
                    {{ scope.row.bakProducerShortname}}&nbsp;&nbsp; 中大包装: {{ scope.row.middleStandRate}}/{{ scope.row.bigMiddleRate}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column  prop="pi.repository_name" sortable="custom" label="药库" v-if="this.repositoryFlag" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.repositoryName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="enterprise" label="配送地址" width="150">
            <template slot-scope="scope">
              <el-select v-model="scope.row.itemSenderAddressId" placeholder="请选择" size="small"
                         @change="handleChangeAddress(scope.row.itemSenderAddressId,scope.row.purchaseId,scope.row.purchaseItemId,scope.row.repositoryId,scope.row.productId)">
                <el-option v-for="(item,index) in scope.row.addresses" :key="item.index" :label="item.addressAbbr" :value="item.id">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column  prop="h.hit_price" sortable="custom" label="单价" header-align="left" align="center" width="180">
            <template slot-scope="scope">
              <!--<div>{{ priceFormat(scope.row.hitPrice) }}</div>-->
              <div v-if="scope.row.enableFlag == '1' && scope.row.priceSource == '0'">
                {{ priceFormat(scope.row.hitPrice) }}
              </div>
              <div v-if="scope.row.enableFlag == '1' && scope.row.priceSource == '1'">
                {{ priceFormat(scope.row.hitPrice) }}(议价)
              </div>
              <div v-if="scope.row.enableFlag == '1' && scope.row.priceSource == '2'">
                {{ priceFormat(scope.row.hitPrice) }}(降价)
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
                <div class="rangebar">
                  <span class="light">{{ priceFormat(scope.row.minTradePrice) }}</span>
                  <span class="mutebar">
                    <i class="iconfont ico-sanjiao2"></i>
                  </span>
                  <span class="light">{{ priceFormat(scope.row.maxTradePrice) }}</span>
                </div>
              </template>
              <template v-else>
                <range-bar :rangeData="[scope.row.hitPrice,scope.row.minTradePrice,scope.row.maxTradePrice,1]"></range-bar>
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="enterprise" label="配送企业" width="150">
            <template slot-scope="scope">
              <el-select v-model="scope.row.itemSenderOrgId" placeholder="请选择" size="small"
                         @change="handleChangeSender(scope.row.itemSenderOrgId,scope.row.purchaseId,scope.row.purchaseItemId,scope.row.repositoryId,scope.row,scope.row.sendBusiness,scope.row.productId)">
                <el-option v-for="(item,index) in scope.row.sendBusiness" :key="item.index" :label="item.senderEasy" :value="item.senderId">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="数量" width="150">
            <template slot-scope="scope">
             <!-- <el-input-number size="small" v-model="scope.row.requestQty" :min="1" :step="10"
                               @change="handleAddMinus(scope.row.requestQty,scope.row.purchaseItemId,scope.row.purchaseId)"
                               @blur="amountStatistics(scope.row.requestQty,scope.row.purchaseItemId,scope.row.purchaseId)">
              </el-input-number>-->
              <!--<el-input-number size="small" style="width: 110px !important;" v-model="scope.row.requestQty" :min="1" :step="10"-->
                               <!--@change="handleAddMinus(scope.row.requestQty,scope.row.purchaseItemId,scope.row.purchaseId)"-->
                               <!--@focus="amountStatistics(scope.row)">-->
              <!--</el-input-number>-->
              <el-input size="small" style="width: 110px;" @change="handleAddMinus(scope.row.requestQty,scope.row.purchaseItemId,scope.row.purchaseId)" v-model="scope.row.requestQty"></el-input>
              <i class="iconfont icon-shanchu" style="cursor:pointer" @click="handleDeleteOneMedicine(scope.row.purchaseItemId)"></i>
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
                              @blur="handleCellSubmit(scope.row.purchaseItemId,scope.row.remark)">
                </el-input>
              </span>
              <!--<span @click="dataBackFillGoods" v-if="scope.row.purchaseItemId !=cellIndex">{{ scope.row.remark }}</span>-->
              <!--<span><el-input size="small" v-model="scope.row.remark"-->
                              <!--v-if="scope.row.purchaseItemId===cellIndex"-->
                              <!--@blur="handleCellSubmit(scope.row.purchaseItemId,scope.row.remark)"-->
              <!--&gt;</el-input></span>-->
            </template>
          </el-table-column>

        </el-table>
      </div>
      <!--:current-page="currentPage4"-->
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
    </div>
    <div class="foot-btn">
      <div class="foot-left btn-min" style="padding: 0 5px;">
        <el-button type="success" size="small" @click="handleAddMedicine()">
          增加
        </el-button>
        <!--<el-button type="danger" size="small" @click="handleDeleteMedicine()">-->
          <!--删除-->
        <!--</el-button>-->
        <!--<el-button type="primary" size="small" @click="handleUpdateDegreeSet()">-->
          <!--设置急需-->
        <!--</el-button>-->
        <!--<el-button type="warning" size="small" @click="handleUpdateDegreeCancel()">-->
          <!--取消急需-->
        <!--</el-button>-->
        <el-button v-if="this.degreeFlag == '2'" type="primary" size="small" @click="handleUpdateAllDegreeCancel()">
          整单急需
        </el-button>
        <el-button v-else type="warning" size="small" @click="handleUpdateAllDegreeSet()">
          整单急需
        </el-button>
        <el-button type="primary" size="small" @click="handleUpdateSuppleSet()"
          v-if="this.flag == '0' || this.flag == '1'">
          设置补单
        </el-button>
        <el-button type="warning" size="small" @click="handleUpdateSuppleCancel()"
          v-if="this.flag == '2' || this.flag == '3'">
          取消补单
        </el-button>
        <el-button type="success" size="small" @click="handlePurchaseRemark()">
          整单备注
        </el-button>
        <el-button type="success" size="small" @click="handleApproveRemark()">
          送审说明
        </el-button>
        <!--<el-button type="success" size="small" @click="handleByName()">-->
          <!--采购别名-->
        <!--</el-button>-->
      </div>
      <div class="foot-right">
        <span style="margin-right:5px;">共：<a class="red">{{this.requestCarQty}}</a>款药品</span>
        <span style="margin-right:5px;">总价:<a class="red">￥{{ priceFormat(this.requestTotal) }}</a></span>
        <!--<span style="margin-right:5px;">基药总价:<a class="red">￥{{priceFormat(this.basicRequestTotal)}}</a></span>-->
        <span style="margin-right:5px;">基药占比:<a class="red">{{priceFormat(this.basicProportionTotal)}}%</a></span>
        <a @click="handleSavePurchaseReady" class="shop-btn" style="width: 80px">保存</a>
        <a @click="handleSavePurchase" class="shop-btn bj-blue" style="width: 80px">发送</a>
        <a v-if="this.isSub=='1'" @click="queryPurchaseSubList" class="shop-btn bj-blue" style="width: 90px">代下级发单</a>
      </div>
    </div>

    <el-dialog title="选择下级机构" :visible.sync="dialogTableVisible" width="80%" >
      <el-table :data="gridData.list" width="100%" stripe border  >
        <!--<el-table-column label="序号" type="index" width="50"></el-table-column>-->
        <el-table-column label="机构名称">
          <template slot-scope="scope">
            <span>{{ scope.row.approveName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="机构简介" >
          <template slot-scope="scope">
            <span>{{ scope.row.approveAbbr }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <div class="operates">
              <a href="javaScript:" class="green" @click="createBuyPlan(scope.row.approveOrgid)">创建采购单</a>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 表格分页 -->
      <div class="pagebox">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChanges"
          @current-change="handleCurrentChanges"
          :page-sizes="[10, 20, 30]"
          :total="gridData.total"
          :page-size="gridData.pageSize"
          :page-count="gridData.pages"
          :current-page.sync="gridData.pageNum">
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">关闭</el-button>
      </span>
    </el-dialog>

    <el-dialog title="整单备注" :visible.sync="dialogFormVisible" width="30%">
      <el-form>
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="createOrderRemark">
          </el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="orderRemark">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="送审说明" :visible.sync="dialogFormVisible2" width="30%">
      <el-form>
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="auditingRemark">
          </el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="auditingRemarks">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="采购别名" :visible.sync="dialogFormVisible3" width="20%">
      <el-form>
          <el-input placeholder="请输入内容" size="small" v-model="byName"></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="shoppingRemarks">确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>
<script>

  // 引入用户相关请求
  import {medicineShoppingList,findCarTotal,deleteMedicineShoppingCar,updateDegreeSet,
          updateDegreeCancel,updatePurchaseItemRemark,updatePurchaseItemQty,updatePurchaseItemSender,
          savePurchase,savePurchaseReady,queryPurchaseSubList,saveSubPurchase,updateRemark,updateSuppleSet,updateSuppleCancel,
          updatePurchaseItemAddress,updateAllDegreeSet,updateAllDegreeCancel,selectLiang}
  from 'src/axios/trade/purchase/purchase'
  import {isNotNull, isNumber} from "src/utils/validateUtil";
  import {priceFormat,keyBoardEnter} from "src/utils";
  import {getSpecHints,getPackHints} from "src/utils/validateUtil";
  import RangeBar from 'src/components/RangeBar';

  export default {
    components: {
      RangeBar
    },
    data() {
      return {
        resData: this.metaData(),
        currentOrder:undefined,
        resDatas:this.metaDataRequest(),
        query: this.metaQuery(),
        tableData: [],
        dataList: [],
        value: '',
//        currentPage4: 4,
        remarkShow:true,
        cellIndex:undefined,
        purchaseItemId: undefined,
        purchaseId: undefined,
        requestTotal: undefined,
        requestQty: undefined,
        requestCarQty: undefined,
        createOrderRemark:"",
        auditingRemark:"",
        byName:"",
        isSub:undefined,
        flag: undefined,
        degreeFlag : undefined,
        basicRequestTotal: undefined,
        basicProportionTotal: undefined,
        repositoryFlag: false,
        gridData: this.metaDatas(),
        dialogTableVisible: false,
        dialogFormVisible: false,
        dialogFormVisible2:false,
        dialogFormVisible3:false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        curentMode:undefined
      }
    },
    created () {
      this.purchaseId = this.$route.params.purchaseId;
      this.list();
    },
    mounted(){
      var _this = this;
      // 初始化表格已选数据
      var apiData = this.resData.list;
      if(apiData == undefined){
        return false;
      }
      var checkArr = [];
      for(let i=0; i<apiData.length; i++){
        if(apiData[i].isChecked){
          checkArr.push(i);
        }
      }
      _this.checkedItems = checkArr;
      _this.tableData = apiData;
      _this.$nextTick(function(){
        _this.checked(); // 每次更新了数据就触发这个函数
      });
    },
    methods: {
      getSpecHints,
      getPackHints,
      priceFormat,
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        medicineShoppingList(this.resData, this.query,this.purchaseId).then(res => {
          this.resData = res.data;
//          for (var i of res.data.list){
//            this.createOrderRemark=i.orderRemark;
//            this.auditingRemark=i.approveRemark;
//            this.byName=i.byName;
//          }
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1
          }
          //本院查询
          findCarTotal("0").then(res => {
            this.repositoryFlag = res.data.repositoryFlag;
            this.isSub = res.data.isSub;
            this.purchaseId = res.data.purchaseId;
            this.degreeFlag = res.data.degreeFlag;
            if(res.data != undefined){
              this.requestCarQty = res.data.requestCarQty;
              this.requestTotal = res.data.requestTotal;
              this.flag = res.data.flag;
              this.basicRequestTotal = res.data.basicRequestTotal;
              this.basicProportionTotal = res.data.basicProportionTotal;
              this.createOrderRemark=res.data.orderRemark;
              this.auditingRemark=res.data.approveRemark;
              this.byName=res.data.byName;
            }
          })
        })
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
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
      metaDatas(){
        return {
          orderBy:undefined,
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
          lists:[]
        }
      },
      orderRemark(){
        updateRemark(this.auditingRemark,this.createOrderRemark,this.byName,this.purchaseId).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.dialogFormVisible = false
            }
          })
        })
      },
      getBigMiddleRate(row, id){
        let str = '';
        row.sendBusiness.some((item)=>{
          if(item.senderId === id){
            const _str1 = item.middleStandRate || '';
            const _str2 = item.bigMiddleRate || '';
            str = _str1+"/"+_str2;
          }
        })
        return str;
      },
      handlePurchaseRemark(){
        if("null" == this.purchaseId || undefined == this.purchaseId){
          this.$alert('该购物车产品已清空', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })
          return false
        }else {
          this.dialogFormVisible = true
        }
      },

      handleApproveRemark(){
        if("null" == this.purchaseId || undefined == this.purchaseId){
          this.$alert('该购物车产品已清空', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })
          return false
        }else {
          this.dialogFormVisible2 = true
        }
      },

      handleByName(){
        if("null" == this.purchaseId || undefined == this.purchaseId){
          this.$alert('该购物车产品已清空', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })
          return false
        }else {
          this.dialogFormVisible3 = true
        }
      },

      auditingRemarks(){
        updateRemark(this.auditingRemark,this.createOrderRemark,this.byName,this.purchaseId).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.dialogFormVisible2 = false;
            }
          })
        })
      },
      shoppingRemarks(){
        updateRemark(this.auditingRemark,this.createOrderRemark,this.byName,this.purchaseId).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.dialogFormVisible3 = false;
            }
          })
        })

      },
      getDrugStorage(bakMedicalSpec,bakStandSpecRate,bakUseUnit,bakSpecUnit,bakMiddleStandRate,bakBigMiddleRate){
        let _bakMedicalSpec = bakMedicalSpec || '';
        let _bakStandSpecRate = bakStandSpecRate || '';
        let _bakUseUnit = bakUseUnit || '';
        let _bakSpecUnit = bakSpecUnit || '';
        let _bakMiddleStandRate = bakMiddleStandRate || '';
        let _bakBigMiddleRate = bakBigMiddleRate || '';
        return _bakMedicalSpec+'×'+_bakStandSpecRate+_bakUseUnit+'/'+_bakSpecUnit+' \n中大包装:'+_bakMiddleStandRate +'/'+_bakBigMiddleRate
      },
      handleSavePurchase(){
        if("null" == this.purchaseId || undefined == this.purchaseId){
          this.$alert('该购物车产品已清空', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })
          return false
        }else{
          savePurchase(this.purchaseId).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
//                this.$router.push("/trade/manage/buyerrole/purchaseTabs")
                this.$router.push("/trade/manage/orderReceiveTabs/"+1)
              }
            })
          })
        }
      },
      handleSavePurchaseReady(){
        if("null" == this.purchaseId || undefined == this.purchaseId){
          this.$alert('该购物车产品已清空', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })
          return false
        }else{
          savePurchaseReady(this.purchaseId).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
//                this.$router.push("/trade/manage/buyerrole/purchaseTabs")
                this.$router.push("/trade/manage/orderReceiveTabs/"+1)
//                this.$router.push("/trade/manage/firstInstanceRole/allPurchaseOrder")
              }
            })
          })
        }
      },
      restQuery(){
        this.query=this.metaQuery()
        this.list();
      },
      checked(){
        //首先el-table添加ref="multipleTable"引用标识
        var checkedItem = this.checkedItems;
        for(let i=0; i<checkedItem.length; i++){
          this.$refs.multipleTable.toggleRowSelection(this.tableData[checkedItem[i]],true);
        }
      },
      handleCellSubmit(purchaseItemId,buyerRemark){
        updatePurchaseItemRemark(purchaseItemId,buyerRemark).then(res => {
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
      metaData () {
        return {
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
            purchaseItemId: undefined,
            searchProductName: undefined,
            searchMedicalSpec: undefined,
            requestTotal: undefined,
            requestQty: undefined,
            buyerRemark: undefined,
            searchOrgName:undefined,
            searchSenderName:undefined,
            searchAddress:undefined,
            searchIsRegion: undefined,
            searchTwoVotes: undefined,
            searchBasicFlag: undefined
        }
      },
      handleAddMedicine(){
        this.$router.push("/trade/manage/buyerrole/purchaseTabs")
      },
      auditingRemarks(){
        updateRemark(this.auditingRemark,this.createOrderRemark,this.byName,this.purchaseId).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.dialogFormVisible2 = false;
            }
          })
        })
      },
      handleDeleteMedicine(){
        if(this.dataList.length<1){
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })
          return false
        }else{
          this.$confirm(`确定删除选中的数据吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var idList='';
            var purchaseId=this.purchaseId;
            for(var noticeType of this.dataList){
              idList += (noticeType.purchaseItemId + ',');
            }
            deleteMedicineShoppingCar(idList,purchaseId).then(res => {
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
      handleDeleteOneMedicine(purchaseItemId){
            var purchaseId=this.purchaseId;
            deleteMedicineShoppingCar(purchaseItemId,purchaseId).then(res => {
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
      handleUpdateDegreeSet(){
        if (this.dataList.length < 1) {
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })
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
                idList += (noticeType.purchaseItemId + ',');
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
      //图标设置急需
      handleUpdateDegreeSetIcon(purchaseItemId,purchaseId){
        updateDegreeSet(purchaseItemId, purchaseId).then(res => {
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

      lists(){
        queryPurchaseSubList(this.gridData, this.query).then(res => {
          this.gridData=res.data;
        })
      },
      queryPurchaseSubList(){
        if("null" == this.purchaseId || undefined == this.purchaseId){
          this.$alert('该购物车产品已清空', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })
          return false
        }else{
          this.dialogTableVisible = true;
          queryPurchaseSubList(this.gridData, this.query).then(res => {
            this.gridData=res.data;
          })
        }
      },
      //批量取消急需
      handleUpdateDegreeCancel(){
        if (this.dataList.length < 1) {
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })
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
                idList += (noticeType.purchaseItemId + ',');
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
      //图标取消急需
      handleUpdateDegreeCancelIcon(purchaseItemId,purchaseId){
        updateDegreeCancel(purchaseItemId, purchaseId).then(res => {
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
      handleUpdateSuppleSet(){
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
      handleUpdateSuppleCancel(){
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
      metaDataRequest () {
        return {
          pageNum: 1,
          pageSize: 10
        }
      },
      createBuyPlan(ordId){
        if(this.purchaseId == "null" || undefined == this.purchaseId){
          this.$alert('该购物车产品已清空', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })
          return false
        }else{
          saveSubPurchase(this.purchaseId,ordId).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.$router.push("/trade/manage/buyerrole/purchaseTabs")
              }
            })
          })
        }

      },
      handleSelectionChange(val) {
        this.dataList = val;
      },
      handleSizeChange(val) {
        this.resData.pageSize=val;
        this.list();
      },
      handleSizeChanges(val) {
        this.gridData.pageSize=val;
        this.lists();
      },
      handleCurrentChange(val) {
        this.resData.pageNum=val;
        this.list();
      },
      handleCurrentChanges(val) {
        this.gridData.pageNum=val;
        this.lists();
      },
      handleCell(row, column, cell, event){
        if(column.label=="备注"){
          this.cellIndex=row.purchaseItemId;
          this.onCellClick(event);
        }else{
          this.cellIndex=undefined;
        }

      },
      onCellClick(event){
        this.$nextTick(function () {
          $(event.target).children().find('input').focus();
        })
      },
//      handleCellSubmit(row){
//        alert(row.id);
//      },
      dataBackFillGoods () {
        this.remarkShow=!this.remarkShow;
      },

      amountStatistics(row){
        this.curentMode=row;
        if(!isNumber(newVal)){
          this.$nextTick(function () {
            this.curentMode.requestQty=oldVal;
          })
        }else {
          updatePurchaseItemQty(this.curentMode.requestQty, this.curentMode.purchaseItemId, this.curentMode.purchaseId).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.list()
              }
            })
          });
        }
      },
      handleAddMinus(requestQty,purchaseItemId,purchaseId){
        if(!isNumber(requestQty)){
          this.$message({
            message: '请正确输入数量！',
            type: 'warning'
          });
          this.list();
          return false
        }else{
          updatePurchaseItemQty(requestQty,purchaseItemId,purchaseId).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.list()
              }
            })
          });
        }
      },
      handleChangeSender(senderId,purchaseId,purchaseItemId,repositoryId,row,sendBusiness,productId){
        updatePurchaseItemSender(senderId,purchaseId,purchaseItemId,repositoryId,productId).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.list()
            }
          })
        });
        selectLiang(senderId).then(res => {
          row.twoVoteType=res.data;
        })
        for(let i=0;i<sendBusiness.length;i++){
          if(sendBusiness[i].senderId==senderId){
            row.bakBigMiddleRate=sendBusiness[i].bigMiddleRate;
            row.bakMiddleStandRate=sendBusiness[i].middleStandRate;
          }
        }
      },
      handleChangeAddress(addressId,purchaseId,purchaseItemId,repositoryId,productId){
        updatePurchaseItemAddress(addressId,purchaseId,purchaseItemId,repositoryId,productId).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.list()
            }
          })
        });
      }
    }
  }
</script>
