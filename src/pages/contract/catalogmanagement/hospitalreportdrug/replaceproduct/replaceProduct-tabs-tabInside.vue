<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" :inline="true" class="table-form" size="small">
            <el-form-item>
              <el-input size="small" placeholder="产品编码" maxlength="200" v-model="query.productCode" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input size="small" placeholder="品名" maxlength="200" v-model="query.productName" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input size="small" placeholder="生产企业" maxlength="200" v-model="query.manufactureName" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input size="small" placeholder="规格" maxlength="100" v-model="query.spec" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="success" @click="searchEnterFun">查询</el-button>
               <el-button size="small" type="warning" @click="reset()">重置</el-button>
            </el-form-item>
        </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe
          @sort-change="sortChange">
          <el-table-column label="序号" width="50"  :show-overflow-tooltip="true" align="center" header-align="left">
            <template slot-scope="scope">
              <span> {{(resData.pageNum - 1) * resData.pageSize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="通用名" prop="NAME_CHN" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.nameChn }}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品信息" prop="drugDetail">
            <template slot-scope="scope">
              <div class="ellipsis es200">
                {{ scope.row.productName }}（{{ scope.row.tradeName }}）
              </div>
              <div class="drugCon ellipsis es200">
                <!--规格×单位转换比 最小使用单位/最小包装单位 (包装材质)(剂型)-->
                规格包装：{{ scope.row.spec}} × {{ scope.row.standRate}} {{ scope.row.smallestUnits}} / {{scope.row.specUnit}} ({{scope.row.wrapName}}) ({{ scope.row.doseageFormName }})
              </div>
              <!--<p>
                中大包装：{{ scope.row.middleStandRate}}/{{ scope.row.bigMiddleRate}}
              </p>-->
              <div class="drugCon ellipsis es200">生产企业：{{ scope.row.manufactureName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="参考价" prop="MIN_PRICE" sortable="custom" width="85" align="right" header-align="left">
            <template slot-scope="scope">
              <!--<el-tooltip effect="dark"  placement="top">
                <div slot="content">{{referencePrice(scope.row.minPrice,scope.row.orgName,scope.row.bjPrice,scope.row.hbPrice,scope.row.tjPrice)}}</div>
                <span>{{priceFormat(scope.row.minPrice)}}</span>
              </el-tooltip>-->
              <span>{{priceFormat(scope.row.minPrice)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="企业报价" prop="BID_PRICE"  align="right" header-align="left"sortable="custom" width="90">
            <template slot-scope="scope">
              <span v-if="scope.row.resState != 1">待议价</span>
              <span v-else>{{ priceFormat(scope.row.minPrice) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="最小单价" prop="minUnitPrice" sortable="custom" width="90" align="right" header-align="left">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.minUnitPrice) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否加入采购" prop="isExistPurchaseCatalog" sortable="custom" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.isExistPurchaseCatalog>0" style="color: #FF0000">已加入</span>
              <span v-else>未加入</span>
            </template>
          </el-table-column>
          <el-table-column label="其他方式加入采购" width="140">
            <template slot-scope="scope">
              <span v-if="scope.row.isExistPurchaseCatalog==0 && scope.row.isExistOtherPurchaseCatalog>0" style="color: #FF0000">已加入</span>
              <span v-else>未加入</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="140">
            <template slot-scope="scope">
              <div v-if="scope.row.enableFlag == '1'">
                <a class="operation-btn" v-if="scope.row.resState==1"
                   @click="(scope.row.hosCount)>0?removePurchaseCatalog(scope.row.productId):addPurchaseCatalog(scope.row)"
                   size="small">{{(scope.row.hosCount)>0?"从采购目录删除":"加入采购目录"}}</a>
              </div>
              <div v-if="scope.row.enableFlag == '0'">
                <el-tooltip class="item" effect="dark" placement="top">
                  <div slot="content" v-html="scope.row.comments"></div>
                  <span style="color: #ff0000">已禁用</span>
                </el-tooltip>
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

    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求  引自js文件
  import {selectReplaceProductCatalogInsideList,insertPurchaseCatalog} from "src/axios/contract/hospitalreportdrug/replaceproduct/replaceProduct";
  import {deletePurchaseCatalog} from 'src/axios/contract/hospitalreportdrug/hospitalReportDrug'
  import {priceFormat} from "src/utils"
  import { keyBoardEnter } from "src/utils"

  export default {
    props: {
      obj: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        currentOrder: undefined,
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        }
      }
    },
    created () {
      // this.list()
    },
    filters: {
      //保留小数点后四位的方法
      keepFourNum:function (value) {
        value = Number(value);
        return value.toFixed(4);
      }
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      priceFormat,
      metaData () {
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
      metaQuery () { // 表单查询数据初始化
        return {
          query: {
            productCode: "",
            productName: "",
            manufactureName: "",
            spec: ""
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      toggleForm () {
        this.showForm = !this.showForm
      },
      // 获取替换产品列表
      list () {
        this.resData.orderBy = this.currentOrder;
        selectReplaceProductCatalogInsideList(this.resData, this.query, this.obj).then(res => {
          this.resData = res.data
          if (this.resData.pageNum === 0) {
            this.resData.pageNum = 1;
          }
        })
      },
      reset() {
        this.query = this.metaQuery();
        this.list();
      },
      //参考价
      referencePrice(minPrice,orgName,bjPrice,hbPrice,tjPrice){

        if(minPrice == ""||minPrice == null){
          return "空";
        }else {
          if(orgName=="医管局"){
            return  "全国最低价:"+this.priceFormat(minPrice);
          }else{
            return "河北最低价:"+((hbPrice!=null && hbPrice!='')?this.priceFormat(hbPrice):'无')+","+"天津最低价:"+((tjPrice!=null && tjPrice!='')?this.priceFormat(tjPrice):'无')+","+"北京最低价:"+((bjPrice!=null && bjPrice!='')?this.priceFormat(bjPrice):'无');
          }
        }
      },
      //加入采购目录
      addPurchaseCatalog(row) {
        this.$confirm('是否加入采购目录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          insertPurchaseCatalog(row,this.obj.pid).then(res => {
            this.$message({
              message: res.success == true ? res.data : res.message,
              type: res.success == true ? "success" : "error",
              onClose: () => {
                this.list();
              }
            })
          })
        }).catch(()=>{
          /* this.$message({
             message: '已取消操作',
             type: 'info'
           });*/
        });
      },
      //删除采购目录
      removePurchaseCatalog(productId) {
        this.$confirm('是否删除采购目录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deletePurchaseCatalog(productId).then(res => {
            this.$message({
              message: res.success == true ? res.data : res.message,
              type: res.success == true ? "success" : "error",
              onClose: () => {
                this.list();
              }
            })
          })
        }).catch(()=>{
          /* this.$message({
             message: '已取消操作',
             type: 'info'
           });*/
        });
      },
      //-----------加入目录的操作begin-------------------
      //单条数据 加入 采购目录
      addPurchaseList(row){
        let params = [];
        params.push(row)
        const url =  'contract/basicDrugData/insertBatchPurchaseList';
        mockapi.getMockData(url, params)
          .then(res => {
            if(res.data>0){
              this.$message({
                message: '加入成功',
                type: 'success'
              });
              this.list();
            }
          });
      },
      //-----------加入目录的操作end-------------------

      //-----------删除目录的操作begin-------------------
      //单个删除采购目录
      delPurchaseList(row){
        //删除操作
        let ids = [];
        ids.push(row.productId);
        console.log(ids);
        deleteBatchPurchaseList(ids).then(res=>{
          if(res.data>0){
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.list();
          }
        })
      },

      //-----------删除目录的操作end-------------------
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      },
      sortChange(value){
        let sortType=" desc"
        if(!!value.order){
          if(value.order.startsWith("asc")){
            sortType=" asc";
          }
          this.currentOrder=value.prop + sortType;
        } else {
          this.currentOrder=undefined;
        }
        this.list();
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e , ()=>{
          this.list();
        })
      },
    }
  }
</script>

