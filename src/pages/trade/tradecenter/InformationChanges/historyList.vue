<template>
  <div>
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="query" :model="query" label-position="right" size="small">
          <div class="formrow">
            <input type="hidden" name="query.productId" value="this.productId">
            <span>
                <el-input v-model="query.searchProductName" @keyup.enter.native="searchEnterFun" placeholder="品名"  size="small"></el-input>
            </span>
            <span>
                <el-input v-model="query.searchManufactureName" @keyup.enter.native="searchEnterFun" placeholder="生产企业" size="small"></el-input>
            </span>
            <span>
                <el-button type="success"  size="small" @click="searchEnterFun">查询</el-button>
                <el-button type="warning" size="small" @click="reset()">重置</el-button>
            </span>
          </div>
        </el-form>
    </div>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe>
         <!-- <el-table-column type="index" width="50" label="序号"></el-table-column>-->
          <el-table-column label="产品ID" show-overflow-tooltip>
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


        <!--  <el-table-column label="产品名" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.nameChn }}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品名" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.tradeName }}
            </template>
          </el-table-column>
          <el-table-column label="剂型" show-overflow-tooltip width="80">
            <template slot-scope="scope">
              {{ scope.row.doseageFormName }}
            </template>
          </el-table-column>
          <el-table-column label="规格" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.spec }}</span>
            </template>
          </el-table-column>
          <el-table-column label="转化比"  sortable width="90" align="right">
            <template slot-scope="scope">
              {{ scope.row.standRate }}
            </template>
          </el-table-column>
          <el-table-column label="单位" width="80">
            <template slot-scope="scope">
              {{ scope.row.specUnit }}
            </template>
          </el-table-column>
          <el-table-column label="包材" width="80" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.wrapName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="生产企业" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.manufactureName }}
            </template>
          </el-table-column>-->
          <el-table-column label="转化比"  sortable width="90" align="right">
            <template slot-scope="scope">
              {{ scope.row.standRate }}
            </template>
          </el-table-column>
          <el-table-column label="变更日期">
            <template slot-scope="scope">
              {{ scope.row.implteDate }}
            </template>
          </el-table-column>
        </el-table>
        <div class="foot-btn">
          <div class="foot-left">
            <el-button type="" @click="goBack">返回</el-button>
          </div>
        </div>
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
  import {historyChangeList}  from 'src/axios/trade/informationChanges/informationChanges'
  import {priceFormat,keyBoardEnter} from "src/utils";
  import {getSpecHints,getPackHints} from "src/utils/validateUtil";

  export default {
    name:'based-city-snder-list',
    data () {
      return {
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
        productId:undefined
      }
    },
    created () {
      this.productId = this.$route.params.productId;
      this.list()
    },
    methods: {
      getSpecHints,
      getPackHints,
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
          resData: { // 前后台交互数据封装格式
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
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
          query: {
            productId: undefined,
            searchProductName: undefined,
            searchManufactureName: undefined,
            searchBenProductDate: undefined,
            searchEenProductDate: undefined
          }
        }
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      reset(){
        this.query=this.metaQuery();
        this.list();
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list() {
        this.query.productId=this.productId;
        historyChangeList(this.resData, this.query).then(res => {
          this.resData = res.data;
          if(this.resData.pageNum===0){
            this.resData.pageNum=1
          }
        })
      },
      goBack() {
        this.$router.go(-1)
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val;
        this.reportList()
      },
      handleCurrentChange (val) {
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

