<template>
  <!-- ========================== 北京市阳光采购目录 ========================= -->
  <!-- 表格 -->
  <div class="tablebox">
    <!-- 表格查询表单 -->
    <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
      <el-form-item class="width-120">
        <el-select v-model="query.resState" @keyup.enter.native="searchEnterFun" placeholder="目录" size="small">
          <el-option label="候选目录内" value="1"></el-option>
          <el-option label="候选目录外" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <!--	中药国家谈判药品目录
            1000	中药低价药品目录
            1090	西药国家谈判药品目录
            1020	短缺药品目录
            1060	西药竞价谈判目录
            1082	中药竞价谈判目录
            1040	西药低价药品目录
        -->
        <el-select v-model="query.catalogState" @keyup.enter.native="searchEnterFun" placeholder="目录范围" size="small">
          <el-option
            v-for="item in pullDownList"
            :key="item.CATALOG_ID"
            :label="item.CATALOG_DESC"
            :value="item.CATALOG_ID">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="width-120">
        <el-select v-model="query.basicFlag" @keyup.enter.native="searchEnterFun" placeholder="是否基药" size="small">
          <el-option label="是" value="1"></el-option><!--0，非基药；1，国家基药；2，北京增补三种，，，0否 1是   -->
          <el-option label="否" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.productName" @keyup.enter.native="searchEnterFun" placeholder="品名"
                  size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.manufactureName" @keyup.enter.native="searchEnterFun" placeholder="生产企业"
                  size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
        <el-button type="warning" size="small" @click="reset()">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格列表 -->
    <div class="tableset">
      <el-table
        :data="resData.list" @selection-change="handleSelectionChange"
        border
        stripe
        @sort-change="sortChang"
      >
        <el-table-column type="selection" align="center" width="55"></el-table-column>
        <!-- <el-table-column type="index" width="50" header-align="left" align="center" label="序号"></el-table-column>-->
        <el-table-column label="产品名" prop="PRODUCT_NAME" sortable="custom">
          <template slot-scope="scope">
              <!--tootip提示气泡-->
              <!--:enterable="false" 鼠标不可进入tooltip中-->
              <el-tooltip placement="top" :enterable="false">
                <!--气泡内容（必须放在slot="content"内）,布局与源内容保持一致-->
                <div slot="content">
                  <div>{{ scope.row.productName }}</div>
                  <div class="text-inline">{{ scope.row.doseageFormName }}
                    <span v-if="scope.row.tradeName != '无' && scope.row.tradeName !=null">({{ scope.row.tradeName }})</span>
                  </div>
                </div>

                <!--源内容（必须放在class="el-tooltip-box"内）-->
                <div class="el-tooltip-box">
                  <!--加class="text-inline"确保内容不折行-->
                  <div class="text-inline">{{ scope.row.productName }}</div>
                  <div class="text-inline">{{ scope.row.doseageFormName }}
                    <span v-if="scope.row.tradeName != '无' && scope.row.tradeName !=null">({{ scope.row.tradeName }})</span>
                  </div>
                </div>
              </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="产品信息" prop="TRADE_NAME" sortable="custom">
          <template slot-scope="scope">
            <el-tooltip placement="top" :enterable="false">
              <div slot="content">
                {{getSpecHints(scope.row.spec, scope.row.standRate,scope.row.smallestUnits,scope.row.specUnit,scope.row.wrapName)}}<br/>
                {{getPackHints(scope.row.manufactureName,scope.row.middleStandRate,scope.row.bigMiddleRate)}}
              </div>
              <div class="el-tooltip-box">
                <div class="text-inline">
                  {{ scope.row.spec }}× {{ scope.row.standRate }}{{ scope.row.smallestUnits }} / {{ scope.row.specUnit }}&nbsp;&nbsp;
                  <span v-if="scope.row.wrapName != '空' && scope.row.wrapName != null">{{scope.row.wrapName}}</span>
                </div>
                <div class="text-inline" >
                  {{ scope.row.manufactureName}}&nbsp;&nbsp; 中大包装: {{scope.row.middleStandRate}}/{{ scope.row.bigMiddleRate}}
                </div>
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="单价" width="80" align="right" prop="bid_Price" sortable="custom">
          <template slot-scope="scope">
            {{ priceFormat(scope.row.bidPrice) }}
          </template>
        </el-table-column>
        <el-table-column label="全国最低价" width="100" align="right" prop="MIN_PRICE"
                         sortable="custom">
          <template slot-scope="scope">
            <span>{{  priceFormat(scope.row.minPrice) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否基药" width="80" prop="BASIC_FLAG" sortable="custom">
          <template slot-scope="scope">
            {{ getMedicine(scope.row.basicFlag) }}
          </template>
        </el-table-column>
        <el-table-column label="目录" show-overflow-tooltip prop="RES_STATE" sortable="custom">
          <template slot-scope="scope">
            <span>{{ getCatalogue(scope.row.resState) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="目录范围" show-overflow-tooltip prop="CATALOG_AREA" sortable="custom">
          <template slot-scope="scope">
            {{ scope.row.catalogArea }}
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
    <div class="foot-btn" v-if="messageState ===  'purchaseCatalog'">
      <div class="foot-left">
        <el-button type="success" size="small" @click="saveOrDelete(messageState)">
          加入区目录
        </el-button>
      </div>
    </div>
    <div class="foot-btn" v-else>
      <div class="foot-left">
        <el-button type="danger" size="small" @click="saveOrDelete(messageState)">
          移除
        </el-button>
        <el-button type="warning" size="small" @click="exportExcel">
          导出excel
        </el-button>
      </div>
    </div>

  </div>
  <!-- ========================== 主内容end ========================= -->
</template>
<script>

  // 引入用户相关请求
  import {selectAll, selectSysCatalog, saveOrDeleteCatalog, exportEXL} from 'src/axios/trade/information/catalogue'
  import fileUpload from 'js-file-download'
  import {priceFormat, keyBoardEnter} from "src/utils";
  import {getSpecHints, getPackHints} from "src/utils/validateUtil";

  export default {
    data() {
      return {
        currentOrder: undefined,
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        pullDownList: this.restPullDownList,
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        messageState: ''
      }
    },
    created() {
      this.list()
    },
    props: ['messageState'],
    methods: {
      getSpecHints,
      getPackHints,
      priceFormat,
      getMedicine(param) {
        return param === '0' ? "否" : "是";
      },
      getCatalogue(param) {
        return param == '1' ? "候选目录内" : "候选目录外";
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // -------------------------------------------- 数据初始化  -----------------------------------------
      sortChang(value) {
        let sortType = " desc"
        if (value.order.startsWith("asc")) {
          sortType = " asc";
        }
        this.currentOrder = value.prop + sortType;
        this.list()
      },
      searchEnterFun(e) {
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      reset() {
        this.query = this.metaQuery();
        this.list()
      },
      metaData() {
        return {
          orderBy: undefined,
          multipleSelection: [],
          // 前后台交互数据封装格式
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
      metaQuery() { // 表单查询数据初始化
        return {
          catalogState: '',
          resState: '',
          catalogArea: '',
          productName: '',
          manufactureName: '',
          basicFlag: ''
        }
      },
      exportExcel() {
        exportEXL(this.query, this.messageState).then(res => {
          let headers = res.headers;
          let title = ""
          if (!title) {
            const fileName = headers['content-disposition'];
            title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
          }
          fileUpload(res.data, title, "application/vnd.ms-excel")
        })
      },
      restPullDownList() {
        return {
          CATALOG_ID: '',
          CATALOG_DESC: ''
        }
      },
      saveOrDelete(messageState) {
        if (this.multipleSelection.length < 1) {
          this.$alert('请选择药品', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })
          return false
        } else {
          this.$confirm(`确定所选择的?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var drugIdList = [], arr = this.multipleSelection;
            if (messageState === 'purchaseCatalog') {
              for (var i = 0; i < arr.length; i++) {
                drugIdList.push(arr[i].id)
              }
            } else {
              for (var i = 0; i < arr.length; i++) {
                drugIdList.push(arr[i].regionId)
              }
            }
            saveOrDeleteCatalog(messageState, drugIdList).then(res => {
              this.$message({
                message: '成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.list();
                }
              })
            })
          }).catch(() => {
          });
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list() {
        let msgState = this.messageState;
        this.resData.orderBy = this.currentOrder;
        selectAll(this.resData, this.query, msgState).then(res => {
          this.resData = res.data;
          if (this.resData.pageNum === 0) {
            this.resData.pageNum = 1
          }
        });
        selectSysCatalog(this.resData, this.query).then(res => {
          this.pullDownList = res.data;
        })
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
    }
  }
</script>

