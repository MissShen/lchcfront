<template>
  <!-- ========================== 主内容start ========================= -->
  <!-- 表格 -->
  <div class="tablebox">
      <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" size="small" :inline="true" class="demo-form-inline table-form">
        <el-form-item class="width-100">
          <el-input v-model="query.searchProductName" @keyup.enter.native="searchEnterFun" placeholder="品名"
                    size="small"></el-input>
        </el-form-item>
        <el-form-item class="width-100">
          <el-input v-model="query.searchMedicalSpec" @keyup.enter.native="searchEnterFun" placeholder="规格"
                    size="small"></el-input>
        </el-form-item>
        <el-form-item class="width-100">
          <el-input v-model="query.searchOrgName" @keyup.enter.native="searchEnterFun" placeholder="生产企业"
                    size="small"></el-input>
        </el-form-item>
        <el-form-item class="width-100">
          <el-input v-model="query.searchSenderName" @keyup.enter.native="searchEnterFun" placeholder="配送企业"
                    size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker type="date" placeholder="历史采购开始日期" v-model="query.searchBenDate"
                          @keyup.enter.native="searchEnterFun"
                          format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
          &nbsp;至&nbsp;
          <el-date-picker type="date" placeholder="历史采购结束日期" v-model="query.searchEndDate"
                          @keyup.enter.native="searchEnterFun"
                          format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
          <el-button type="warning" @click="restQuery()" size="small">重置</el-button>
        </el-form-item>
      </el-form>

      <div class="tableset">
        <el-table ref="multipleTable" :data="resData.list" tooltip-effect="dark" @sort-change="sortChang"
                  style="width: 100%" @selection-change="handleSelectionChange" stripe border>
          <!--<el-table-column type="selection" width="55"></el-table-column>-->
          <!--
            <el-table-column label="药品信息" width="300" prop="drugDetail">
              <template slot-scope="scope" class="drugMessage">
                <p>
                  <span class="icon-sign sign-district" v-if="scope.row.purchaseProductId != '0'">购</span>
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

          <el-table-column label="产品名" width="200" prop="h.bak_product_name" sortable="custom">
            <template slot-scope="scope" class="drugMessage">
              <ul class="ico-zt">
                <li class="ico-left">
                  <i class="ico icon-jc" v-if="scope.row.contractType != '0'"></i>
                  <i class="ico icon-qu" v-if="scope.row.regionId != '0'"></i>
                </li>
                <!--  <div><li class="ellipsis es200" :title="scope.row.bakProductName"> {{ scope.row.bakProductName }}</li></div>
                  <div> (商品名：{{ scope.row.bakTradeName }})</div>

  -->
                <div>
                  <span class="text-inlie" :title="scope.row.bakProductName">{{ scope.row.bakProductName }}</span>
                </div>
                <div class="text-inlie">
                  <span class="text-inlie" :title="scope.row.bakMedicalMode+' ('+scope.row.bakTradeName+')'"
                        v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName !=null">{{ scope.row.bakMedicalMode }}({{ scope.row.bakTradeName }})</span>
                  <span class="text-inlie" :title="scope.row.bakMedicalMode"
                        v-if="scope.row.bakTradeName == '无' || scope.row.bakTradeName ==null">{{ scope.row.bakMedicalMode }}</span>
                </div>
              </ul>
            </template>
          </el-table-column>
          <el-table-column label="产品信息">
            <template slot-scope="scope">
              <!--  <div class="pro-details ellipsis es200 " :title="'规格包装:'+scope.row.bakMedicalSpec+'×'+scope.row.bakStandSpecRate+scope.row.bakUseUnit+'/'+scope.row.bakSpecUnit" >规格包装: {{ scope.row.bakMedicalSpec}} × {{ scope.row.bakStandSpecRate}} {{scope.row.bakUseUnit}} / {{ scope.row.bakSpecUnit}} </div>
                <div class="pro-details ellipsis es200" :title="getDrugStorage(scope.row.bakMiddleStandRate,scope.row.bakBigMiddleRate)" >中大包装: {{ scope.row.bakMiddleStandRate}}/{{ scope.row.bakBigMiddleRate}}</div>
  -->
              <div class="pro-details"
                   :title="getSpecHints(scope.row.bakMedicalSpec,scope.row.bakStandSpecRate,scope.row.bakUseUnit,scope.row.bakSpecUnit,scope.row.bakWrapName)">
                <!--:title="'规格包装:'+scope.row.bakMedicalSpec+'×'+scope.row.bakStandSpecRate+scope.row.bakUseUnit+'/'+scope.row.bakSpecUnit+'  包材:'+scope.row.bakWrapName">-->
                <span v-if="scope.row.bakWrapName != '空' && scope.row.bakWrapName != null">  {{ scope.row.bakMedicalSpec}} × {{ scope.row.bakStandSpecRate}} {{scope.row.bakUseUnit}} / {{ scope.row.bakSpecUnit}} &nbsp;&nbsp; {{ scope.row.wrapName}}</span>
                <span v-if="scope.row.bakWrapName == '空' || scope.row.bakWrapName == null">  {{ scope.row.bakMedicalSpec}} × {{ scope.row.bakStandSpecRate}} {{scope.row.bakUseUnit}} / {{ scope.row.bakSpecUnit}}</span>
              </div>
              <div
                :title="getPackHints(scope.row.bakProducerShortname,scope.row.bakMiddleStandRate,scope.row.bakBigMiddleRate)"
                class="pro-details"
                v-if="scope.row.bakProducerShortname!=''">{{ scope.row.bakProducerShortname}}&nbsp;&nbsp; 中大包装: {{
                scope.row.bakMiddleStandRate}}/{{ scope.row.bakBigMiddleRate}}
              </div>
            </template>
          </el-table-column>

          <!--          <el-table-column  prop="h.bak_producer_shortname" sortable="custom" label="生产企业" show-overflow-tooltip>
                      <template slot-scope="scope">
                        <span>{{ scope.row.bakProducerShortname}}</span>
                      </template>
                    </el-table-column>-->
          <el-table-column prop="drugStorage" label="药库" v-if="this.repositoryFlag" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.warehouseName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="配送地址" width="110" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-select v-model="scope.row.addressId" placeholder="请选择" size="small" name="addresses">
                <el-option v-for="item in scope.row.addresses" :key="item.id" :label="item.addressAbbr"
                           :value="item.id">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="h.hit_price" sortable="custom" label="单价" header-align="left" align="center"
                           min-width="200">
            <template slot-scope="scope">
              <div>{{ priceFormat(scope.row.hitPrice) }}</div>
              <range-bar :rangeData="[scope.row.hitPrice,scope.row.maxTradePrice,scope.row.minTradePrice,1]"></range-bar>
            </template>
          </el-table-column>
          <el-table-column label="配送企业" width="120">
            <template slot-scope="scope">
              <el-select v-model="scope.row.value" placeholder="请选择" size="small">
                <el-option v-for="(item,index) in scope.row.sendBusiness" :key="item.index" :label="item.senderEasy"
                           :value="item.senderId">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="数量" width="130">
            <template slot-scope="scope">
              <el-input-number size="small" class="width-120" v-model="scope.row.requestQty" :min="1"
                               :step="10"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="130">
            <template slot-scope="scope" style="text-align:left">
              <div class="handle-zt">
                <a class="iconfont buy-btn width-120"
                   @click="handleSavePurchase(scope.row,scope.row.recordId, scope.row.value,scope.row.addressId,scope.row.requestQty,scope.row.warehouseId,scope.row.warehouseName)">加入采购计划</a>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
        <li><i class="ico icon-qu"></i><span>区目录药品</span></li>
        <li><i class="ico icon-jc"></i><span>基本药物目录</span></li>
        <li><i class="ico icon-ji"></i><span>急需药品</span></li>
        <li><i class="ico icon-yi"></i><span>医保药品</span></li>
        <li><i class="ico icon-liang"></i><span>两票制</span></li>
        <li><i class="ico icon-kang"></i><span>抗菌药</span></li>
        <li><i class="ico icon-budan"></i><span>补单</span></li>
      </ul>
    </div>

</template>
<script>

  // 引入用户相关请求
  import {findCarTotalExist, medicineListExist, insertPlanCartExist} from 'src/axios/trade/plan/planList';
  import {getPackHints, getSpecHints} from "src/utils/validateUtil";
  import {priceFormat, keyBoardEnter} from "src/utils";
  import RangeBar from 'src/components/RangeBar';

  export default {
    components: {
      RangeBar
    },
    data() {
      return {
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        currentOrder: undefined,
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        requestQty: undefined,
        purchaseId: undefined,
        requestCarQty: undefined,
        wareHouseId: undefined,
        repositoryFlag: false,
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        }
      }
    },
    created() {
      this.purchaseId = this.$route.params.purchaseId;
      this.list()
    },
    mounted() {
      var _this = this;
      // 初始化表格已选数据
      var apiData = this.resData.list;

      var checkArr = [];
      for (let i = 0; i < apiData.length; i++) {
        if (apiData[i].isChecked) {
          checkArr.push(i);
        }
      }
      _this.checkedItems = checkArr;
      _this.tableData = apiData;
      _this.$nextTick(function () {
        _this.checked(); // 每次更新了数据就触发这个函数
      });
    },
    methods: {
      priceFormat,
      getPackHints,
      getSpecHints,
      checked() {
        //首先el-table添加ref="multipleTable"引用标识
        var checkedItem = this.checkedItems;
        for (let i = 0; i < checkedItem.length; i++) {
          this.$refs.multipleTable.toggleRowSelection(this.tableData[checkedItem[i]], true);
        }
      },
      searchEnterFun(e) {
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      /*handleSelect(sel, row) {
        row.isChecked = !row.isChecked;
      },*/
      handleChange(value) {
      },
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
      },
      /* getHins(bakProducerShortname,bakMiddleStandRate,bakBigMiddleRate){
         let _bakProducerShortname = bakProducerShortname || '';
         let _bakMiddleStandRate = bakMiddleStandRate || '';
         let _bakBigMiddleRate = bakBigMiddleRate || '';
         return _bakProducerShortname+' \n中大包装:'+_bakMiddleStandRate +'/'+_bakBigMiddleRate
       },*/
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaQuery() { // 表单查询数据初始化
        return {
          id: undefined,
          searchRepositoryId: undefined,
          searchProductName: undefined,
          searchMedicalSpec: undefined,
          searchOrgName: undefined,
          searchSenderName: undefined,
          searchBenDate: undefined,
          searchEndDate: undefined,
          list: undefined
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list() {
        this.resData.orderBy = this.currentOrder;
        medicineListExist(this.resData, this.query, this.purchaseId).then(res => {
          this.resData = res.data
          if (this.resData.pageNum === 0) {
            this.resData.pageNum = 1
          }
          if (this.resData.pageSize === 0) {
            this.resData.pageSize = 10
          }
          findCarTotalExist("0", this.purchaseId).then(res => {
            this.requestCarQty = res.data.requestCarQty;
            this.purchaseId = res.data.purchaseId;
            this.repositoryFlag = res.data.repositoryFlag;
          })
        })

      },
      sortChang(value) {
        let sortType = " desc"
        if (value.order.startsWith("asc")) {
          sortType = " asc";
        }
        this.currentOrder = value.prop + sortType;
        this.list()
      },
      // ************************ 分页操作 ************************
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.list()
      },
      handleMyShopCar() {
        this.$router.push("/trade/manage/plan/planShoppingList/" + this.purchaseId)
      },
      handleSavePurchase(entry, recordId, senderId, addressId, requestQty, repositoryId, repositoryName) {

        if (null == addressId) {
          this.$message({
            message: '请选择配送地址！',
            type: 'warning'
          });
          return false
        } else if (null == senderId) {
          this.$message({
            message: '请选择配送企业！',
            type: 'warning'
          });
          return false
        } else if (null == requestQty) {
          this.$message({
            message: '数量不能为空！',
            type: 'warning'
          });
          return false
        } else if (entry.bakQuantityExcess != null && entry.bakQuantityExcess!= 0 && entry.bakQuantityExcess < requestQty) {
          if (requestQty > 100000) {
            this.$message({
              message: '数量过多请核实！',
              type: 'warning'
            });
          } else {
            /*待解决换行问题*/
            this.$confirm(
              '产品名称：' + entry.bakProductName
              + '<br/> 商 品  名：' + entry.bakTradeName
              + '<br/>规      格：' + entry.bakMedicalSpec + '×' + entry.bakStandSpecRate + '  ' + entry.bakUseUnit + '/' + entry.bakSpecUnit
              + '<br/>生产企业：' + entry.bakProducerShortname
              + '<br/>超限提醒：' + entry.bakQuantityExcess
              + '<br/><br/>采购数量超过限定数量，是否继续制单？',

              '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                dangerouslyUseHTMLString: true
              }).then(() => {
              insertPlanCartExist(recordId, senderId, addressId, this.purchaseId, requestQty, repositoryId, repositoryName).then(res => {
                this.$message({
                  message: res.data,
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                    this.$router.push("/trade/manage/planPurchaseItemList/" + this.purchaseId)
                  }
                })
              })
            })
          }
          return false
        } else {
          insertPlanCartExist(recordId, senderId, addressId, this.purchaseId, requestQty, repositoryId, repositoryName).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.$router.push("/trade/manage/planPurchaseItemList/" + this.purchaseId)
              }
            })
          })
        }
      },
      restQuery() {
        this.query = this.metaQuery()
        this.list();
      },
      metaData() {
        return {
          // 前后台交互数据封装格式
          pageNum: 1,
          orderBy: undefined,
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
      getDrugStorage(bakMiddleStandRate, bakBigMiddleRate) {
        let _bakMiddleStandRate = bakMiddleStandRate || '';
        let _bakBigMiddleRate = bakBigMiddleRate || '';
        return '中大包装:' + _bakMiddleStandRate + '/' + _bakBigMiddleRate

      }
    }
  }
</script>




