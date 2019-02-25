<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">

      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" size="small" :inline="true" class="demo-form-inline table-form">
            <el-form-item>
              <el-input v-model="query.searchProductName" @keyup.enter.native="searchEnterFun"  placeholder="品名" size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="query.searchMedicalSpec" @keyup.enter.native="searchEnterFun"  placeholder="规格" size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
              <el-button type="warning" @click="restQuery()" size="small">重置</el-button>
            </el-form-item>
        </el-form>
      <div class="tableset">

        <el-table ref="multipleTable" :data="resData.list" tooltip-effect="dark"
                  style="width: 100%" @selection-change="handleSelectionChange" stripe @cell-click="handleCell" border>
          <el-table-column type="selection" width="40" align="center"></el-table-column>

 <!--         <el-table-column label="药品信息" width="300" prop="drugDetail">
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
          <el-table-column label="产品名" prop="drugDetail" min-width="180">
            <template slot-scope="scope" class="drugMessage">
              <ul class="ico-zt">
                <li class="ico-left">
                  <i class="ico icon-ji" v-if="scope.row.degreeFlag == '2'" style="cursor:pointer" @click="handleUpdateDegreeCancelicon(scope.row.purchaseId,scope.row.purchaseItemId,'0')"></i>
                  <i class="ico icon-jihui" v-if="scope.row.degreeFlag == '0'" style="cursor:pointer" @click="handleUpdateDegreeSeticon(scope.row.purchaseId,scope.row.purchaseItemId,'1')"></i>
                  <i class="ico icon-jc" v-if="scope.row.contractType != '0'"></i>
                  <i class="ico icon-qu" v-if="scope.row.regionId != '0'"></i>
                </li>
                <div><li :title="scope.row.bakProductName"> {{ scope.row.bakProductName }}</li></div>
                <div>
                  <span class="text-inlie" :title="scope.row.bakMedicalMode"  v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName !=null">{{ scope.row.bakMedicalMode }}({{ scope.row.bakTradeName }})</span>
                  <span class="text-inlie" :title="scope.row.bakMedicalMode"  v-if="scope.row.bakTradeName == '无' || scope.row.bakTradeName ==null">{{ scope.row.bakMedicalMode }}</span>
                </div>

              </ul>
            </template>
          </el-table-column>
          <el-table-column prop="drugStorage" label="产品信息" min-width="200">
            <template slot-scope="scope">
              <div class="pro-details" :title="getDrugStorage(scope.row.bakMedicalSpec,scope.row.bakStandSpecRate,scope.row.bakUseUnit,scope.row.bakSpecUnit,scope.row.bakMiddleStandRate,scope.row.bakBigMiddleRate)" >
                <span   v-if="scope.row.bakWrapName != '空' && scope.row.bakWrapName != null">   {{ scope.row.bakMedicalSpec}} × {{ scope.row.bakStandSpecRate}} {{scope.row.bakUseUnit}} / {{ scope.row.bakSpecUnit}}  &nbsp;&nbsp; {{ scope.row.bakWrapName}}</span>
                <span   v-if="scope.row.bakWrapName == '空' || scope.row.bakWrapName == null">   {{ scope.row.bakMedicalSpec}} × {{ scope.row.bakStandSpecRate}} {{scope.row.bakUseUnit}} / {{ scope.row.bakSpecUnit}} </span>
              </div>
              <div :title="scope.row.bakProducerShortname" class="pro-details" v-if="scope.row.bakProducerShortname!=''">{{ scope.row.bakProducerShortname}}  &nbsp;&nbsp; 中大包装: {{getBigMiddleRate(scope.row, scope.row.itemSenderOrgId)}}</div>
            </template>
          </el-table-column>

          <el-table-column prop="drugStorage" label="药库" v-if="this.repositoryFlag" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.repositoryName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="enterprise" label="配送地址" show-overflow-tooltip width="120">
            <template slot-scope="scope">
              <el-select v-model="scope.row.addressId" placeholder="请选择" size="small"
                         @change="handleChangeAddress(scope.row.addressId,scope.row.purchaseId,scope.row.purchaseItemId,scope.row.repositoryId)">
                <el-option v-for="(item,index) in scope.row.addresses" :key="item.index" :label="item.addressAbbr" :value="item.id">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="价格" header-align="left" align="center" width="200">
            <template slot-scope="scope">
              <div>{{ priceFormat(scope.row.hitPrice) }}</div>
              <range-bar :rangeData="[scope.row.hitPrice,scope.row.minTradePrice,scope.row.maxTradePrice,1]"></range-bar>
            </template>
          </el-table-column>
          <el-table-column prop="enterprise" label="配送企业" width="130">
            <template slot-scope="scope">
              <el-select v-model="scope.row.itemSenderOrgId" placeholder="请选择" size="small"
                         @change="handleChangeSender(scope.row.itemSenderOrgId,scope.row.purchaseId,scope.row.purchaseItemId,scope.row.repositoryId,scope.row.productId)">
                <el-option v-for="(item,index) in scope.row.sendBusiness" :key="item.index" :label="item.senderEasy" :value="item.senderId">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="数量" width="130">
            <template slot-scope="scope">
              <el-input-number size="small" class="width-120" v-model="scope.row.requestQty" :min="1" :step="10"
                               @change="handleAddMinus(scope.row.requestQty,scope.row.purchaseItemId,scope.row.purchaseId,scope.row.repositoryId)"
                               @blur="amountStatistics(scope.row.requestQty,scope.row.purchaseItemId,scope.row.purchaseId,scope.row.repositoryId)">
              </el-input-number>
            </template>
          </el-table-column>
          <el-table-column prop="buyerRemark" label="备注" show-overflow-tooltip>
            <template slot-scope="scope">
              <span @click="dataBackFillGoods" v-if="scope.row.purchaseItemId !=cellIndex">{{ scope.row.remark }}</span>
              <span><el-input size="small" v-model="scope.row.remark"
                              v-if="scope.row.purchaseItemId===cellIndex"
                              @blur="handleCellSubmit(scope.row.purchaseItemId,scope.row.remark)"
              ></el-input></span>
            </template>
          </el-table-column>

        </el-table>
      </div>
      <!--:current-page="currentPage4"-->
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
      <el-dialog title="采购计划名称" :visible.sync="dialogFormVisible3" width="20%">
        <el-form>
          <el-input placeholder="请输入内容" size="small" v-model="byName" ></el-input>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible3 = false">取 消</el-button>
          <el-button type="primary" @click="shoppingRemarks">确 定</el-button>
        </div>
      </el-dialog>
      <ul class="explain">
        <li>标记说明：</li>
        <li><i class="ico icon-qu"></i><span>区目录药品</span></li>
        <li><i class="ico icon-jc"></i><span>基本药物目录</span></li>
        <li><i class="ico icon-ji"></i><span>急需药品</span></li>
        <li><i class="ico icon-yi"></i><span>医保药品</span></li>
        <li><i class="ico icon-liang"></i><span>两票制</span></li>
        <li><i class="ico icon-kang"></i><span>抗菌药</span></li>
        <li><i class="ico icon-budan"></i><span>补单</span></li>
      </ul>
    </div>
    <div class="foot-btn">
      <div class="foot-left">
        <el-button type="success" size="small" @click="handleAddMedicine()">
          增加药品
        </el-button>
        <el-button type="danger" size="small" @click="handleDeleteMedicine()">
          删除药品
        </el-button>
        <el-button type="primary" size="small" @click="handleUpdateDegreeSet('1')">
          设置急需
        </el-button>
        <el-button type="warning" size="small" @click="handleUpdateDegreeCancel('0')">
          取消急需
        </el-button>
        <el-button type="success" size="small" @click="handleByName()">
          计划名称
        </el-button>
      </div>
      <div class="foot-right">
        <span>共：<a class="red">{{this.requestCarQty}}</a>款药品</span>
        <span>总价:<a class="red">￥{{ priceFormat(this.requestTotal) }}</a></span>
          <a  @click="handleSavePurchase()"class="shop-btn">
            <span>创建采购计划</span>
          </a>
        <a v-if="this.isSub=='1'"  @click="queryPurchaseSubList" class="">
          <span><a class="shop-btn bj-yellow">代替下级创建采购计划</a></span>
        </a>
      </div>
    </div>

    <el-dialog title="选择下级机构" :visible.sync="dialogTableVisible" width="90%" >
      <el-table :data="gridData.list" width="100%" >
        <!--<el-table-column label="序号" type="index" width="50"></el-table-column>-->
        <el-table-column label="机构名称" width="380">
          <template slot-scope="scope">
            <span>{{ scope.row.approveName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="机构简介" width="300">
          <template slot-scope="scope">
            <span>{{ scope.row.approveAbbr }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span><a @click="createBuyPlan(scope.row.approveOrgid)">创建采购计划</a></span>
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
    </el-dialog>

  </div>
</template>
<script>

  // 引入用户相关请求
  import {queryPurchaseSubList}from 'src/axios/trade/purchase/purchase'
  import {findCarTotal,planShoppingList,updatePurchaseItemRemark,
    updatePurchaseItemSender,updatePurchaseItemQty,deleteMedicineShoppingCar,
    updateDegreeSet,savePlan,saveSubPlan,updatePlanByName,updateDegreeCancel}
  from 'src/axios/trade/plan/planList'
  import {priceFormat,keyBoardEnter} from "src/utils";
  import RangeBar from 'src/components/RangeBar'

  export default {
    components: {
      RangeBar
    },
    data() {
      return {
        resData: this.metaData(),
        resDatas:this.metaDataRequest(),
        gridData:this.metaDataRequest(),
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
        isSub: undefined,
        byName: '',
        repositoryFlag: false,
        dialogTableVisible: false,
        dialogFormVisible: false,
        dialogFormVisible3: false,
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
        formLabelWidth: '120px'
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
      priceFormat,
      //  获取用户分页列表
      list () {
        planShoppingList(this.resData, this.query,this.purchaseId).then(res => {
          this.resData = res.data
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1
          }
          //本院查询
          findCarTotal("0").then(res => {
            this.requestCarQty = res.data.requestCarQty;
            this.requestTotal = res.data.requestTotal;
            this.isSub=res.data.isSub;
            this.repositoryFlag=res.data.repositoryFlag;
            this.byName = res.data.byName;
          })
        })
      },
      createBuyPlan(orgId){
        saveSubPlan(this.purchaseId,orgId).then(res =>{
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
      queryPurchaseSubList(){
        this.dialogTableVisible = true;
        queryPurchaseSubList(this.resDatas, this.query).then(res => {
          this.gridData=res.data;
        })
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
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
      lists(){
        this.dialogTableVisible = true;
        queryPurchaseSubList(this.resDatas, this.query).then(res => {
          this.gridData=res.data;
        })

      },
      handleByName(){
        if("undefined" == this.purchaseId){
          this.$alert('该采购计划已清空', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })
          return false
        }else {
          this.dialogFormVisible3 = true
        }
      },
      handleSavePurchase(){
        if("null" === this.purchaseId||"undefined"===this.productId||""===this.productId){
          this.$alert('该采购计划已清空', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })
          return false
        }else {
        savePlan(this.purchaseId).then(res => {
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
      shoppingRemarks(){
        updatePlanByName(this.byName,this.purchaseId).then(res => {
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
      handleCellSubmit(planItemId,buyerRemark){
        updatePurchaseItemRemark(planItemId,buyerRemark).then(res => {
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
          lists: []
        }
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
          list: undefined
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
            buyerRemark: undefined
        }
      },
      handleAddMedicine(){
        this.$router.push("/trade/manage/createPurchaseOrder")
      },
      handleDeleteMedicine(){
        if(this.dataList.length<1){
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })
          return false
        }else{
//          this.$confirm(`确定删除选中的数据吗?`, '提示', {
//            confirmButtonText: '确定',
//            cancelButtonText: '取消',
//            type: 'warning'
//          }).then(() => {
//          }).catch(() => {
//          });
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
        }
      },

      //批量设置急需
      handleUpdateDegreeSet(planDegreeFlag){
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
              updateDegreeSet(purchaseId, idList, planDegreeFlag).then(res => {
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

      //图标设置
      handleUpdateDegreeSeticon(purchaseId, id, planDegreeFlag){
        updateDegreeSet(purchaseId, id, planDegreeFlag).then(res => {
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


      //图标取消急需
      handleUpdateDegreeCancelicon(purchaseId,id,planDegreeFlag){
        updateDegreeSet(purchaseId,id,planDegreeFlag).then(res => {
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
      handleUpdateDegreeCancel(planDegreeFlag){
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
              updateDegreeSet(purchaseId, idList, planDegreeFlag).then(res => {
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
      handleSelectionChange(val) {
        this.dataList = val;
      },
      handleSizeChange(val) {
        this.resData.pageSize=val;
        this.list();
      },
      handleCurrentChange(val) {
        this.resData.pageNum=val;
        this.list();
      },
      handleSizeChanges(val) {

        this.resDatas.pageSize=val;
        this.lists();
      },
      handleCurrentChanges(val) {

        this.resDatas.pageNum=val;
        this.lists();
      },
      handleCell(row, column, cell, event){
        //console.log(row, column, cell, event)
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
      amountStatistics(requestQty,purchaseItemId,purchaseId,repositoryId){
        updatePurchaseItemQty(requestQty,purchaseItemId,purchaseId,repositoryId).then(res => {
          this.list()
        })
      },
      handleAddMinus(requestQty,purchaseItemId,purchaseId,repositoryId){
        updatePurchaseItemQty(requestQty,purchaseItemId,purchaseId,repositoryId).then(res => {
          this.list()
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
      handleChangeSender(senderId,purchaseId,planItemId,productId){
        updatePurchaseItemSender(senderId,purchaseId,planItemId,productId).then(res => {
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
      getDrugStorage(bakMedicalSpec,bakStandSpecRate,bakUseUnit,bakSpecUnit,bakMiddleStandRate,bakBigMiddleRate){
        let _bakMedicalSpec = bakMedicalSpec || '';
        let _bakStandSpecRate = bakStandSpecRate || '';
        let _bakUseUnit = bakUseUnit || '';
        let _bakSpecUnit = bakSpecUnit || '';
        let _bakMiddleStandRate = bakMiddleStandRate || '';
        let _bakBigMiddleRate = bakBigMiddleRate || '';
        return _bakMedicalSpec+'×'+_bakStandSpecRate+_bakUseUnit+'/'+_bakSpecUnit+' \n中大包装:'+_bakMiddleStandRate +'/'+_bakBigMiddleRate
      }
    }
  }
</script>
