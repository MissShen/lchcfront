<template>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
        <el-form-item>
          <el-input v-model="query.searchProductName" placeholder="品名" @keyup.enter.native="searchEnterFun"  size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.searchMedicalSpec" placeholder="规格" @keyup.enter.native="searchEnterFun"  size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.searchOrgName" placeholder="生产企业" @keyup.enter.native="searchEnterFun"  size="small"></el-input>
        </el-form-item>
        <el-form-item class="width-120">
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
          <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
          <el-button type="warning" @click="restQuery()" size="small">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe
          style="width: 100%"
          @sort-change="sortChang"
        >
          <el-table-column label="产品名" min-width="200"  >
            <template slot-scope="scope" class="drugMessage">
              <ul class="ico-zt">
                <li class="ico-left">
                  <div class="icon-box">
                    <i  v-if="scope.row.contractType != '0'" class="ico icon-jc"></i>
                    <i  v-if="scope.row.regionId != '0'" class="ico icon-qu"></i>
                  </div>
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
                      <div>{{ scope.row.bakProductName }}</div>
                      <div v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName !=null">{{ scope.row.bakMedicalMode }}({{ scope.row.bakTradeName }})</div>
                      <div v-if="scope.row.bakTradeName == '无' || scope.row.bakTradeName ==null">{{ scope.row.bakMedicalMode }}</div>
                    </div>
                  </el-tooltip>
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column  label="产品信息" min-width="200" >
            <template slot-scope="scope">
              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{getSpecHints(scope.row.bakMedicalSpec,scope.row.bakStandSpecRate,scope.row.bakUseUnit,scope.row.bakSpecUnit,scope.row.wrapName)}}<br/>
                  {{getPackHints(scope.row.bakProducerShortname,scope.row.middleStandRate,scope.row.bigMiddleRate )}}
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    <span class="text-inline"  v-if="scope.row.wrapName != '空' && scope.row.wrapName != null" > {{ scope.row.bakMedicalSpec}} × {{ scope.row.bakStandSpecRate}} {{scope.row.bakUseUnit}} / {{ scope.row.bakSpecUnit}}&nbsp;&nbsp; {{ scope.row.wrapName}}</span>
                    <span class="text-inline"  v-if="scope.row.wrapName == '空' || scope.row.wrapName == null" > {{ scope.row.bakMedicalSpec}} × {{ scope.row.bakStandSpecRate}} {{scope.row.bakUseUnit}} / {{ scope.row.bakSpecUnit}}</span>

                  </div>
                  <div class="text-inline">
                    {{ scope.row.bakProducerShortname}}&nbsp;&nbsp; 中大包装: {{ scope.row.bakMiddleStandRate}}/{{ scope.row.bakBigMiddleRate}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>


          <el-table-column label="本院价格" width="160" header-align="left" align="right"  >
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.hitPrice) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="最低价格" width="160" header-align="left" align="right" >
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.minTradePrice) }}</span>
            </template>
          </el-table-column>


          <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
              <div class="operates">
                <a class="green" @click="showInfo(scope.row.productId,scope.row.minTradePrice)">详情</a>
            </div>
          </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 表格分页 -->
      <div class="pagebox">
        <ul class="explain">
          <li><i class="ico icon-qu"></i><span>区目录</span></li>
          <li><i class="ico icon-jc"></i><span>基本药物</span></li>
          <li><i class="ico icon-ji"></i><span>急需药品</span></li>
          <li><i class="ico icon-yi"></i><span>医保药品</span></li>
          <!--<li><i class="ico icon-liang"></i><span>两票制</span></li>-->
          <li><i class="ico icon-kang"></i><span>抗菌药</span></li>
        </ul>
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

  // 引入用户相关请求
  import {priceWarning} from 'src/axios/trade/purchase/purchase'
  import {priceFormat,keyBoardEnter} from "src/utils";
  import {getPackHints,getSpecHints} from "src/utils/validateUtil";
  //import {priceWarningCount} from 'src/axios/trade/purchase/purchase'


  export default {
    name:'based-city-snder-list',
    data () {
      return {
        currentOrder: undefined,
        visible_second: true,
        totalCount:'',
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        formViewVisible: false,
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        roleCode:''
      }
    },
    created () {
      this.list()
    },
    methods: {
      priceFormat,
      getSpecHints,
      getPackHints,
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
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
      metaQuery () { // 表单查询数据初始化
        return {
            id: undefined,
            buyerOrgId: undefined,
            enableFlag: undefined,
            searchProductName: undefined,
            searchMedicalSpec: undefined,
            searchOrgName:undefined,
            searchBasicFlag: undefined,
            searchTwoVotes: undefined,

        }
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        priceWarning(this.resData, this.query).then(res => {
          this.resData = res.data
          this.totalCount=this.resData.list.length
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1
          }
          this.$emit("evalue",this.resData.total);
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

      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      },
      restQuery() {
        this.query = this.metaQuery()
        this.list();
      },
        /*展示详情*/
      showInfo(productId,minTradePrice){
        this.$router.push("/trade/manage/buyerrole/priceWarningShow/" + productId +"/"+ minTradePrice);
      },
    }
  }
</script>

