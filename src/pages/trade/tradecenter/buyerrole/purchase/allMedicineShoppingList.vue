<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" size="small" :inline="true" class="demo-form-inline table-form">
            <el-form-item class="width-100">
              <el-input v-model="query.searchProductName" @keyup.enter.native="searchEnterFun" placeholder="品名" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-100">
              <el-input v-model="query.searchMedicalSpec" @keyup.enter.native="searchEnterFun" placeholder="规格" size="small"></el-input>
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
          <!--<el-form-item class="width-120">-->
            <!--<el-select v-model="query.searchTwoVotes" @keyup.enter.native="searchEnterFun" placeholder="是否两票制" size="small">-->
              <!--<el-option label="全部" value=""></el-option>-->
              <!--<el-option label="是" value="1"></el-option>-->
              <!--<el-option label="否" value="0"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
            <el-form-item>
              <el-button type="success" @click="searchEnterFun" size="small" >查询</el-button>
              <el-button type="warning" @click="restQuery()" size="small">重置</el-button>
            </el-form-item>
        </el-form>
      <div class="tableset">

          <el-table ref="multipleTable" :data="resData.list" tooltip-effect="dark" @sort-change="sortChang"
                    style="width: 100%" @selection-change="handleSelectionChange"  @cell-click="handleCell" stripe border>
          <el-table-column label="产品名称" min-width="150" prop="f.PRODUCT_NAME" sortable="custom" >
            <template slot-scope="scope">
              <ul class="ico-zt">
                <li class="ico-left">
                  <div class="icon-box">
                    <i class="ico icon-ji" v-if="scope.row.degreeFlag == '2'"
                       @click="handleUpdateDegreeCancelicon(scope.row.purchaseItemId,scope.row.purchaseId)" style="cursor:pointer" ></i>
                    <i class="ico icon-jihui" v-if="scope.row.degreeFlag == '0'"
                       @click="handleUpdateDegreeSeticon(scope.row.purchaseItemId,scope.row.purchaseId)" style="cursor:pointer" ></i>
                    <i class="ico icon-jc" v-if="scope.row.contractType != '0'"></i>
                    <i class="ico icon-budan" v-if="scope.row.flag == '3'"></i>
                    <i  v-if="scope.row.twoVoteType != '0'" class="ico icon-liang"></i>
                  </div>
                </li>

                <li>
                  <!--tootip提示气泡-->
                  <!--:enterable="false" 鼠标不可进入tooltip中-->
                  <el-tooltip placement="top" :enterable="false">
                    <!--气泡内容（必须放在slot="content"内）,布局与源内容保持一致-->
                    <div slot="content">
                      <div>{{ scope.row.productName }}</div>
                      <div v-if="scope.row.tradeName != '无' && scope.row.tradeName !=null">{{ scope.row.doseageFormName }}({{ scope.row.tradeName }})</div>
                      <div v-if="scope.row.tradeName == '无' || scope.row.tradeName ==null">{{ scope.row.doseageFormName }}</div>
                    </div>

                    <!--源内容（必须放在class="el-tooltip-box"内）-->
                    <div class="el-tooltip-box">
                      <!--加class="text-inline"确保内容不折行-->
                      <div class="text-inline">{{ scope.row.productName }}</div>
                      <div class="text-inline"  v-if="scope.row.tradeName != '无' && scope.row.tradeName !=null">{{ scope.row.doseageFormName }}({{ scope.row.tradeName }})</div>
                      <div class="text-inline"  v-if="scope.row.tradeName == '无' || scope.row.tradeName ==null">{{ scope.row.doseageFormName }}</div>
                    </div>
                  </el-tooltip>
                </li>
              </ul>
            </template>
          </el-table-column>

            <el-table-column prop="drugStorage" min-width="150" label="产品信息">
              <template slot-scope="scope">
                <el-tooltip placement="top" :enterable="false">
                  <div slot="content">
                    {{getSpecHints(scope.row.spec,scope.row.standRate,scope.row.smallestUnits,scope.row.specUnit,scope.row.wrapName)}}<br/>
                    {{getPackHints(scope.row.manufactureName,scope.row.middleStandRate,scope.row.bigMiddleRate)}}
                  </div>
                  <div class="el-tooltip-box">
                    <div class="text-inline">
                      <span v-if="scope.row.wrapName != '空' && scope.row.wrapName != null"> {{ scope.row.spec}} × {{ scope.row.standRate}} {{ scope.row.smallestUnits}}/ {{ scope.row.specUnit}}&nbsp;&nbsp; {{ scope.row.wrapName}}</span>
                      <span v-if="scope.row.wrapName == '空' || scope.row.wrapName == null"> {{ scope.row.spec}} × {{ scope.row.standRate}} {{ scope.row.smallestUnits}}/ {{ scope.row.specUnit}}</span>
                    </div>
                    <div class="text-inline" >
                      {{ scope.row.manufactureName}} &nbsp;&nbsp; 中大包装: {{ scope.row.middleStandRate}}/{{ scope.row.bigMiddleRate}}
                    </div>
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
<!--

          <el-table-column  label="规格包装" >
            <template slot-scope="scope">
              <div class="pro-details ellipsis es200 " >规格包装: {{ scope.row.spec}} × {{ scope.row.standRate}} {{ scope.row.smallestUnits}}/ {{ scope.row.specUnit}}</div>
              <div class="pro-details ellipsis es200" >中大包装: {{getBigMiddleRate(scope.row, scope.row.itemSenderOrgId)}}</div>
            </template>
          </el-table-column>
          <el-table-column  label="生产企业"  prop="f.manufacture_Name" sortable="custom" >
            <template slot-scope="scope">
              <span v-if="scope.row.manufactureAbbr == null ">{{ scope.row.manufactureName}}</span>
              <span v-if="scope.row.manufactureAbbr != null ">{{ scope.row.manufactureAbbr}}</span>
            </template>
          </el-table-column>
-->

          <!--<el-table-column prop="drugStorage" label="药库">-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{ scope.row.warehouseName }}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column prop="enterprise" label="配送地址" width="150">
            <template slot-scope="scope">
              <el-select v-model="scope.row.itemSenderAddressId" placeholder="请选择" size="small"
                         @change="handleChangeAddress(scope.row.itemSenderAddressId,scope.row.purchaseId,scope.row.purchaseItemId,scope.row.repositoryId)">
                <el-option v-for="(item,index) in scope.row.addresses" :key="item.index" :label="item.addressAbbr" :value="item.id">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column  label="价格"  header-align="left" align="center" width="180" prop="f.bid_Price" sortable="custom" >
            <template slot-scope="scope">
              <div>{{ priceFormat(scope.row.bidPrice) }}</div>
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
                <range-bar :rangeData="[scope.row.bidPrice,scope.row.minTradePrice,scope.row.maxTradePrice,1]"></range-bar>
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="enterprise" label="配送企业" width="150">
            <template slot-scope="scope">
              <el-select v-model="scope.row.itemSenderOrgId" placeholder="请选择" size="small"
                         @change="handleChangeSender(scope.row.itemSenderOrgId,scope.row.purchaseId,scope.row.purchaseItemId,scope.row,scope.row.sendBusiness,scope.row.productId)">
                <el-option v-for="(item,index) in scope.row.sendBusiness" :key="item.index" :label="item.senderEasy" :value="item.senderId">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="数量" width="130"  >
            <template slot-scope="scope">
              <!--<el-input-number size="small" v-model="scope.row.requestQty" :min="1" :step="10"-->
                               <!--@change="handleAddMinus(scope.row.requestQty,scope.row.purchaseItemId,scope.row.purchaseId)"-->
                               <!--@blur="amountStatistics(scope.row.requestQty,scope.row.purchaseItemId,scope.row.purchaseId)">-->
              <!--</el-input-number>-->
              <el-input style="width: 90px;" size="small" @change="handleAddMinus(scope.row.requestQty,scope.row.purchaseItemId,scope.row.purchaseId)" v-model="scope.row.requestQty"></el-input>
              <i class="iconfont icon-shanchu" style="cursor:pointer" @click="handleDeleteOneMedicine(scope.row.purchaseItemId)"></i>
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
        <!--<el-button type="warning" size="small" @click="handleUpdateDegreeSet()">-->
          <!--设置急需-->
        <!--</el-button>-->
        <!--<el-button type="primary" size="small" @click="handleUpdateDegreeCancel()">-->
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
        <!--<span style="margin-right:5px;">基药总价:<a class="red">￥{{ priceFormat(this.basicRequestTotal) }}</a></span>-->
        <span style="margin-right:5px;">基药占比:<a class="red">{{this.basicProportionTotal}}%</a></span>
        <a @click="handleSavePurchaseReady" class="">
          <span><a class="shop-btn" style="width: 80px">保存</a></span>
        </a>
        <a @click="handleSavePurchase()" class="shop-btn" style="min-width: 90px; padding: 0 10px;width: 0;">
          <span>发送</span>
        </a>
        <a  v-if="this.isSub=='1'"  @click="queryPurchaseSubList">
          <span><a class="shop-btn bj-yellow" style="width: 138px">代下级发单</a></span>
        </a>
      </div>
    </div>

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
        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="orderRemark" size="small">确 定</el-button>
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
        <el-button @click="dialogFormVisible2 = false" size="small">取 消</el-button>
        <el-button type="primary" @click="auditingRemarks" size="small">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="采购别名" :visible.sync="dialogFormVisible3" width="30%">
      <el-form>
        <el-input placeholder="请输入内容" size="small" v-model="byName"></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false" size="small">取 消</el-button>
        <el-button type="primary" @click="shoppingRemarks" size="small">确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>
<script>

  // 引入用户相关请求
  import {allMedicineShoppingList,findCarTotal,deleteMedicineShoppingCar,updateDegreeSet,
    updateDegreeCancel,updatePurchaseItemRemark,updatePurchaseItemQty,updatePurchaseItemSender,
    savePurchase,updateSuppleCancel,updateSuppleSet,updateRemark,queryPurchaseSubList,savePurchaseReady,
    updateAllDegreeSet,updateAllDegreeCancel,selectLiang}
    from 'src/axios/trade/purchase/purchase'
  import {priceFormat,keyBoardEnter} from "src/utils";
  import {isNumber} from "src/utils/validateUtil";
  import {getSpecHints,getPackHints} from "src/utils/validateUtil";
  import RangeBar from 'src/components/RangeBar';

  export default {
    components: {
      RangeBar
    },
    data() {
      return {
        currentOrder: undefined,
        resData: this.metaData(),
        query: this.metaQuery(),
        gridData: this.metaDatas(),
        tableData: [],
        dataList: [],
        degreeFlag : undefined,
        value: '',
//        currentPage4: 4,
        remarkShow:true,
        cellIndex:undefined,
        purchaseItemId: undefined,
        dialogFormVisible: false,
        dialogFormVisible2:false,
        dialogFormVisible3:false,
        createOrderRemark:"",
        auditingRemark:"",
        byName:"",
        isSub:undefined,
        flag: undefined,
        basicRequestTotal: undefined,
        basicProportionTotal: undefined,
        purchaseId: undefined,
        requestTotal: undefined,
        requestQty: undefined,
        requestCarQty: undefined
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
        allMedicineShoppingList(this.resData, this.query,this.purchaseId).then(res => {
          this.resData = res.data
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1
          }
          //本院查询
          findCarTotal("1").then(res => {
            this.isSub = res.data.isSub;
            if(res.data != undefined){
              this.requestCarQty = res.data.requestCarQty;
              this.requestTotal = res.data.requestTotal;
              this.flag = res.data.flag;
              this.basicRequestTotal = res.data.basicRequestTotal;
              this.basicProportionTotal = res.data.basicProportionTotal;
              this.degreeFlag = res.data.degreeFlag;
              this.createOrderRemark=res.data.orderRemark;
              this.auditingRemark=res.data.approveRemark;
              this.byName=res.data.byName;
            }
          })
        })

      },
      metaDatas(){
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
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      queryPurchaseSubList(){
        if("undefined" == this.purchaseId){
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
      handleSavePurchase(){
        savePurchase(this.purchaseId).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.$router.push("/trade/manage/buyerrole/purchaseTabs")
            }
          })
        })
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
      handleSavePurchaseReady(){
        savePurchaseReady(this.purchaseId).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.$router.push("/trade/manage/buyerrole/purchaseTabs")
            }
          })
        })
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
          purchaseItemId: undefined,
          searchProductName: undefined,
          searchMedicalSpec: undefined,
          requestTotal: undefined,
          requestQty: undefined,
          buyerRemark: undefined,
          searchOrgName: undefined,
          searchSenderName: undefined,
          searchAddress: undefined,
          searchBasicFlag: undefined,
          searchTwoVotes: undefined
        }
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
      handleAddMedicine(){
        this.$router.push("/trade/manage/buyerrole/purchaseTabs")
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
      //图标设置急需
      handleUpdateDegreeSeticon(purchaseItemId,purchaseId){
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

      //图标取消急需
      handleUpdateDegreeCancelicon(purchaseItemId,purchaseId){
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
      handleSelectionChange(val) {
        this.dataList = val;
      },
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
      },
      handleCell(row, column, cell, event){
        if(column.label=="备注"){
          this.cellIndex=row.purchaseItemId;
        }else{
          this.cellIndex=undefined;
        }

      },
//      handleCellSubmit(row){
//        alert(row.id);
//      },
      dataBackFillGoods () {
        this.remarkShow=!this.remarkShow;
      },
/*      amountStatistics(requestQty,purchaseItemId,purchaseId){
        updatePurchaseItemQty(requestQty,purchaseItemId,purchaseId).then(res => {
          this.list()
//          this.$message({
//            message: res.data,
//            type: 'success',
//            duration: 1000,
//            onClose: () => {
//              this.list()
//            }
//          })
        })
      },*/
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
      handleAddMinus(requestQty,purchaseItemId,purchaseId){
        if(!isNumber(requestQty)) {
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
      handleChangeSender(senderId,purchaseId,purchaseItemId,row,sendBusiness,productId){
        for(let i=0;i<sendBusiness.length;i++){
          if(sendBusiness[i].senderId==senderId){
            row.bakBigMiddleRate=sendBusiness[i].bigMiddleRate;
            row.bakMiddleStandRate=sendBusiness[i].middleStandRate;
          }
        }
        updatePurchaseItemSender(senderId,purchaseId,purchaseItemId,productId).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.list()
            }
          })
        });
//        selectLiang(senderId).then(res => {
//          row.twoVoteType=res.data;
//        })
      }
    }
  }
</script>


