<template>
  <!-- ==========================  ========================= -->
  <!-- 表格 -->
  <div class="tablebox">
    <!-- 表格查询表单 -->
    <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
      <el-form-item>
        <el-input v-model="query.searchProductName" @keyup.enter.native="searchEnterFun" placeholder="品名"
                  size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.searchManufactureName" @keyup.enter.native="searchEnterFun" placeholder="生产企业"
                  size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker type="date" placeholder="变更时间" @keyup.enter.native="searchEnterFun" format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd" size="small" v-model="query.searchBenProductDate"></el-date-picker>
        &nbsp;至&nbsp;
        <el-date-picker type="date" placeholder="变更时间" @keyup.enter.native="searchEnterFun" format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd" size="small" v-model="query.searchEndProductDate"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
        <el-button type="warning" size="small" @click="reset()">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格列表 -->
    <div class="tableset">
      <el-table
        :data="resData.list"
        border
        @sort-change="sortChang"
        stripe ref="multipleTable">
        <!-- <el-table-column type="index" width="50" label="序号"></el-table-column>-->
        <el-table-column label="产品ID" prop="DATA_PRODUCT_ID" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tooltip placement="top" :enterable="false">
              <div slot="content">
                {{scope.row.dataProductId}}<br/>
              </div>
              <div class="el-tooltip-box">
                <div class="text-inline">
                  {{ scope.row.dataProductId}}
                </div>
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="产品名" prop="NAME_CHN" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <!--<span>{{ scope.row.nameChn }}</span>-->

              <!--tootip提示气泡-->
              <!--:enterable="false" 鼠标不可进入tooltip中-->
              <el-tooltip placement="top" :enterable="false">
                <!--气泡内容（必须放在slot="content"内）,布局与源内容保持一致-->
                <div slot="content">
                  <div>{{ scope.row.nameChn }}</div>
                  <div  v-if="scope.row.tradeName != '无' && scope.row.tradeName !=null">{{ scope.row.doseageFormName }}({{ scope.row.tradeName }})</div>
                  <div  v-if="scope.row.tradeName == '无' || scope.row.tradeName ==null">{{ scope.row.doseageFormName }}</div>
                </div>

                <!--源内容（必须放在class="el-tooltip-box"内）-->
                <div class="el-tooltip-box">
                  <!--加class="text-inline"确保内容不折行-->
                  <div class="text-inline">{{ scope.row.nameChn }}</div>
                  <div class="text-inline"  v-if="scope.row.tradeName != '无' && scope.row.tradeName !=null">{{ scope.row.doseageFormName }}({{ scope.row.tradeName }})</div>
                  <div class="text-inline"  v-if="scope.row.tradeName == '无' || scope.row.tradeName ==null">{{ scope.row.doseageFormName }}</div>
                </div>
              </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="产品信息" prop="TRADE_NAME" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">

            <el-tooltip placement="top" :enterable="false">
              <div slot="content">
                {{getHints(scope.row.spec,scope.row.wrapName)}}<br/>
                {{ scope.row.manufactureName}}
              </div>
              <div class="el-tooltip-box">
                <div class="text-inline">
                  <span class="text-inline" v-if="scope.row.wrapName != '空' && scope.row.wrapName != null">  {{ scope.row.spec}} &nbsp;&nbsp; {{ scope.row.wrapName}}</span>
                  <span class="text-inline" v-if="scope.row.wrapName == '空' || scope.row.wrapName == null">  {{ scope.row.spec}} </span>
                </div>
                <div class="text-inline" >
                  {{ scope.row.manufactureName}}
                </div>
              </div>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column label="单位" prop="SPEC_UNIT" sortable="custom">
          <template slot-scope="scope">
            <el-tooltip placement="top" :enterable="false">
              <div slot="content">
                {{scope.row.specUnit}}<br/>
              </div>
              <div class="el-tooltip-box">
                <div class="text-inline">
                  {{ scope.row.specUnit}}
                </div>
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="转换比" prop="STAND_RATE" sortable="custom" width="90" align="right">
          <template slot-scope="scope">
            {{ scope.row.standRate }}
          </template>
        </el-table-column>
        <!--<el-table-column label="剂型" prop="DOSEAGE_FORM_NAME" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.doseageFormName }}
          </template>
        </el-table-column>
        <el-table-column label="规格" prop="SPEC" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.spec }}</span>
          </template>
        </el-table-column>
        <el-table-column label="转换比"   prop="STAND_RATE" sortable="custom" width="90" align="right">
          <template slot-scope="scope">
            {{ scope.row.standRate }}
          </template>
        </el-table-column>
        <el-table-column label="单位" prop="SPEC_UNIT" sortable="custom">
          <template slot-scope="scope">
            {{ scope.row.specUnit }}
          </template>
        </el-table-column>
        <el-table-column label="包材" prop="WRAP_NAME" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.wrapName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="生产企业" prop="MANUFACTURE_NAME" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.manufactureName }}
          </template>
        </el-table-column>-->
        <el-table-column label="变更原因" prop="CHANGE_REASON" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.changeReason }}
          </template>
        </el-table-column>
        <el-table-column label="变更时间" prop="IMPLTE_DATE" sortable="custom">
          <template slot-scope="scope">
            {{ scope.row.implteDate }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span class="operation-btn" @click="show(scope.row)">原产品</span>
            <span class="operation-btn" @click="goHistory(scope.row.productId)">历史产品</span>
          </template>
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <table width="100%" cellpadding="0" cellspacing="0" class="inline-table" style="table-layout:fixed;">
              <thead>
              <tr>
                <!--<th>产品id</th>-->
                <!--<th>产品名称</th>-->
                <!--<th width="60">商品名</th>-->
                <!--<th width="60">剂型</th>-->
                <!--<th width="150">规格</th>-->
                <!--<th width="60">转换比</th>-->
                <!--<th width="60">单位</th>-->
                <!--<th width="60">包材</th>-->
                <!--<th>生产企业</th>-->
                <th width="12%">产品id</th>
                <th width="12%">产品名称</th>
                <th width="10%">商品名</th>
                <th width="10%">剂型</th>
                <th width="12%">规格</th>
                <th width="10%">转换比</th>
                <th width="10%">单位</th>
                <th width="10%">包材</th>
                <th width="14%">生产企业</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="hiddenfont" :title="scope.row.ydataProductId">{{scope.row.ydataProductId}}</td>
                <td class="hiddenfont" :title="scope.row.ynameChn">{{scope.row.ynameChn}}</td>
                <td class="hiddenfont" :title="scope.row.ytradeName">{{scope.row.ytradeName}}</td>
                <td class="hiddenfont" :title="scope.row.ydoseageFormName">{{scope.row.ydoseageFormName}}</td>
                <td class="hiddenfont" :title="scope.row.yspec">{{scope.row.yspec}}</td>
                <td class="hiddenfont" :title="scope.row.ystandRate">{{scope.row.ystandRate}}</td>
                <td class="hiddenfont" :title="scope.row.yspecUnit">{{scope.row.yspecUnit}}</td>
                <td class="hiddenfont" :title="scope.row.ywrapName">{{scope.row.ywrapName}}</td>
                <td class="hiddenfont" :title="scope.row.ymanufactureName">{{scope.row.ymanufactureName}}</td>
              </tr>
              </tbody>
            </table>
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

</template>
<script>

  // 引入数据请求
  import {productChangeList} from 'src/axios/trade/informationChanges/informationChanges'
  import {priceFormat, keyBoardEnter} from "src/utils";
  import {getSpecHints, getPackHints} from "src/utils/validateUtil";

  export default {
    name: 'based-city-snder-list',
    data() {
      return {
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        currentOrder: undefined,
        innerData: [],
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        expanded: true,

      }
    },
    created() {
      this.list()
    },
    methods: {
      getSpecHints,
      getPackHints,
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() {
        return {
          resData: { // 前后台交互数据封装格式
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
            list: [],
          }
        }
      },
      searchEnterFun(e) {
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      metaQuery() { // 表单查询数据初始化
        return {
          query: {
//            id: undefined,
            searchProductName: undefined,
            searchManufactureName: undefined,
            searchBenProductDate: undefined,
            searchEndProductDate: undefined
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list() {
        this.resData.orderBy = this.currentOrder;
        productChangeList(this.resData, this.query).then(res => {
          this.resData = res.data;
          if (this.resData.pageNum === 0) {
            this.resData.pageNum = 1
          }
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
      reset() {
        this.query = this.metaQuery();
        this.list();
      },
      show(row) {
        this.$refs.multipleTable.toggleRowExpansion(row, this.expanded);
        this.expanded = !this.expanded
      },
      // 历史产品
      goHistory(productId) {
        this.$router.push("/trade/information/historyList/" + productId);
      },
      // ************************ 分页操作 ************************
      handleSizeChange(val) {
        this.resData.pageSize = val;
        this.reportList()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val;
        this.reportList()
      },
      getHints(spec, wrapName) {
        let _spec, _wrapName;
        if (spec == null || spec == undefined || spec == "空") {
          _spec = "";
        } else {
          _spec = spec;
        }
        if (wrapName == null || wrapName == undefined || wrapName == "空") {
          _wrapName = "";
        } else {
          _wrapName = wrapName;
        }
        return _spec + _wrapName
      },


    }
  }
</script>
