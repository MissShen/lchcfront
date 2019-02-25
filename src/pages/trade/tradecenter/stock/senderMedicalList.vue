<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
      <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" :inline="true" class="table-form">
            <el-form-item>
                <el-input v-model="query.searchProductName"  @keyup.enter.native="searchEnterFun"   placeholder="产品名" size="small"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="query.orgName"   @keyup.enter.native="searchEnterFun"  placeholder="生产企业" size="small"></el-input>
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
                tooltip-effect="dark"
                border
                stripe
                @sort-change="sortChang"
        >
         <!-- <el-table-column type="index" width="50" label="序号"></el-table-column>-->
          <el-table-column label="产品名" prop="ooi.BAK_PRODUCT_NAME" sortable="custom" >
            <template slot-scope="scope" class="drugMessage">
              <ul class="ico-zt">
                <li>
                  <!--tootip提示气泡-->
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
          <el-table-column  label="产品信息" prop="ooi.BAK_MEDICAL_SPEC" sortable="custom">
            <template slot-scope="scope">
              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{scope.row.bakMedicalSpec}}<br/>
                  <span v-if="scope.row.bakFactoryEasy!=''">{{getPackHints(scope.row.bakFactoryEasy,scope.row.bakMiddleStandRate,scope.row.bakBigMiddleRate)}}</span>
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    {{ scope.row.bakMedicalSpec}}
                  </div>
                  <div class="text-inline" v-if="scope.row.bakFactoryEasy!=''">
                    {{ scope.row.bakFactoryEasy}}&nbsp;&nbsp; 中大包装: {{ scope.row.bakMiddleStandRate}}/{{ scope.row.bakBigMiddleRate}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>

            <el-table-column label="库存状态" width="90" prop="sendr_stock_state" sortable="custom" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.senderStockState }}</span>
              </template>
            </el-table-column>
            <el-table-column label="目录状态" width="90" prop="se_state" sortable="custom" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.seState }}</span>
              </template>
            </el-table-column>
          <el-table-column label="是否基药" width="80" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.contractType }}</span>
            </template>
          </el-table-column>T
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
      <div class="foot-btn">
        <div class="foot-left"><el-button type="warning" size="small" @click="exportExcel">导出Excel</el-button></div>
      </div>
    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求
  import {querySenderMedicineList,exportSenderMedicineList} from "src/axios/trade/stock/stock"
  import fileUpload from 'js-file-download'
  import {priceFormat,keyBoardEnter} from "src/utils";
  import {getPackHints,getSpecHints} from "src/utils/validateUtil";
  export default {
    data () {
      return {
        currentOrder: undefined,
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false // 表单查询初始化
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

      exportExcel(){
        exportSenderMedicineList(this.query).then(res => {
          let headers = res.headers;
          let title = ""
          if (!title) {
            const fileName = headers['content-disposition'];
            title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
          }
          fileUpload(res.data,title,"application/vnd.ms-excel")
        })
      },
      // -------------------------------------------- 数据初始化  -----------------------------------------
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
          orgName: '',
          searchProductName: ''
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
        querySenderMedicineList(this.resData, this.query).then(res => {
          this.resData = res.data
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1
          }
        })
      },
      getPackHints,
      getSpecHints,
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      },
      reset(){
        this.query = this.metaQuery();
        this.list();
      }
    }
  }
</script>

