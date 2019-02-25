<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
          <el-form-item>
            <el-select v-model="query.sendStockState"  @keyup.enter.native="searchEnterFun"  placeholder="库存状态"size="small">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="query.manufactureName"  @keyup.enter.native="searchEnterFun"  size="small" placeholder="生产企业"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="query.productName"  @keyup.enter.native="searchEnterFun"   size="small" placeholder="产品名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
            <el-button size="small" type="warning" @click="resetButton()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
                :data="resData.list"
                border
                stripe
                @sort-change="sortChang"
        >
         <!-- <el-table-column type="index" header-align="left" align="center" width="50" label="序号"></el-table-column>-->
          <el-table-column label="产品名" min-width="200" prop="ooi.BAK_PRODUCT_NAME" sortable="custom" >
            <template slot-scope="scope" class="drugMessage">
              <ul class="ico-zt">
                <li>
                  <!--tootip提示气泡-->
                  <!--:enterable="false" 鼠标不可进入tooltip中-->
                  <el-tooltip placement="top" :enterable="false">
                    <!--气泡内容（必须放在slot="content"内）,布局与源内容保持一致-->
                    <div slot="content">
                      <div>{{ scope.row.bakMedicalName }}</div>
                      <div>{{ scope.row.bakMedicalMode }}
                        <span v-if="scope.row.bakProductName != '无' && scope.row.bakProductName !=null">({{ scope.row.bakProductName }})</span>
                      </div>
                    </div>

                    <!--源内容（必须放在class="el-tooltip-box"内）-->
                    <div class="el-tooltip-box">
                      <!--加class="text-inline"确保内容不折行-->
                      <div class="text-inline">{{ scope.row.bakMedicalName }}</div>
                      <div class="text-inline">{{ scope.row.bakMedicalMode }}
                        <span v-if="scope.row.bakProductName != '无' && scope.row.bakProductName !=null">({{ scope.row.bakProductName }})</span>
                      </div>
                    </div>
                  </el-tooltip>
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column  label="产品信息" min-width="200" prop="ooi.BAK_MEDICAL_SPEC" sortable="custom">
            <template slot-scope="scope">
              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{getHints(scope.row.bakMedicalSpec,scope.row.wrapName)}}<br/>
                  {{getPackHints(scope.row.bakProducerShortName,scope.row.bakMiddleStandRate,scope.row.bakBigMiddleRate)}}
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    {{ scope.row.bakMedicalSpec}}&nbsp;&nbsp;
                    <span v-if="scope.row.wrapName != '空' && scope.row.wrapName != null">{{ scope.row.wrapName}}</span>
                  </div>
                  <div class="text-inline" >
                    {{ scope.row.bakProducerShortName}}&nbsp;&nbsp; 中大包装: {{ scope.row.bakMiddleStandRate}}/{{ scope.row.bakBigMiddleRate}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
            <el-table-column label="库存状态" width="150" prop="oss.sender_stock_state" sortable="custom" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.senderStockState }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" align="center">
              <template slot-scope="scope">
                <div class="operates">
                  <a class="green" type="text" @click="selectCommodity(scope.row.productId)">维护</a>
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

  // 引入用户相关请求
  import {queryStockList} from 'src/axios/trade/stock/stock'
  import {priceFormat,keyBoardEnter} from "src/utils";
  import {getPackHints,getSpecHints} from "src/utils/validateUtil";
  export default {
    data () {
      return {
        currentOrder: undefined,
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        options: [{
          value: 'state',
          label: '库存状态'
        },{
          value: '1',
          label: '充足'
        }, {
          value: '2',
          label: '缺货'
        }, {
          value: '3',
          label: '断货'
        }],
        sendStockState: 'state'
      }
    },
    created () {
      this.list()
    },
    methods: {
      sortChang(value){
        let sortType=" desc"
        if(value.order.startsWith("asc")){
          sortType=" asc";
        }
        this.currentOrder=value.prop + sortType;
        this.list()

      },

      selectCommodity(productId){
          this.$router.push("/trade/manage/stockSenderListPopup/"+productId)
      },
      resetButton(){
        this.query = this.metaQuery();
        this.list()
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
          // 前后台交互数据封装格式
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
            list: undefined

        }
      },
      getPackHints,
      getSpecHints,
      metaQuery () { // 表单查询数据初始化
        return {
            sendStockState: '',
            manufactureName:'',
            productName:'',
            sendStockState:"state"
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        queryStockList(this.resData, this.query).then(res => {
          this.resData = res.data;
          if(this.resData.pageNum === 0 ){
            this.resData.pageNum = 1
          }
        })
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      },
      getHints(bakMedicalSpec, wrapName) {

        let _bakMedicalSpec, _wrapName;
        if (bakMedicalSpec == null || bakMedicalSpec == undefined || bakMedicalSpec == "空") {
          _bakMedicalSpec = "";
        } else {
          _bakMedicalSpec = bakMedicalSpec;
        }
        if (wrapName == null || wrapName == undefined || wrapName == "空") {
          _wrapName = "";
        } else {
          _wrapName = wrapName;
        }
        return  "规格:  "+ _bakMedicalSpec +"    包材:"+ _wrapName
      },
    }
  }
</script>

