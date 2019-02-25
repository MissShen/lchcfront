<template>
  <div>
    <!-- ========================== 采购目录维护 ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" class="table-form" :inline="true">
          <el-form-item class="width-120">
            <el-select v-model="query.state"  @keyup.enter.native="searchEnterFun" placeholder="目录状态"  size="small">
              <el-option label="目录状态" value=""></el-option>
              <el-option label="禁用" value="0"></el-option>
              <el-option label="正常" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="width-120">
            <el-input v-model="query.manufactureName" @keyup.enter.native="searchEnterFun" placeholder="生产企业"  size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-120">
            <el-input v-model="query.searchProductName" @keyup.enter.native="searchEnterFun" placeholder="产品名"  size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-120">
            <el-input v-model="query.searchMedicalSpec" @keyup.enter.native="searchEnterFun" placeholder="规格"  size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="searchEnterFun"  size="small">查询</el-button>
            <el-button type="warning" size="small"  @click="restForm">重置</el-button>
          </el-form-item>
        </el-form>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          @sort-change="sortChang"
          border
          stripe>
          <!--<el-table-column type="index" width="50" header-align="left" align="center" label="序号"></el-table-column>-->
          <el-table-column label="产品名" prop="h.BAK_PRODUCT_NAME" sortable="custom" min-width="200">
            <template slot-scope="scope">
           <!--   {{ scope.row.bakProductName }}-->
                <!--tootip提示气泡-->
                <!--:enterable="false" 鼠标不可进入tooltip中-->
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

            </template>
          </el-table-column>
          <el-table-column label="产品信息" show-overflow-tooltip prop="h.BAK_TRADE_NAME" sortable="custom" min-width="200">
            <template slot-scope="scope">
             <!-- <span>{{ scope.row.bakTradeName }}</span>-->
              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{getHints(scope.row.bakMedicalSpec,scope.row.wrapName)}}<br/>
                  {{getPackHints(scope.row.bakProducerFullname,scope.row.bakMiddleStandRate,scope.row.bakBigMiddleRate)}}
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    {{ scope.row.bakMedicalSpec }}&nbsp;&nbsp;
                    <span v-if="scope.row.wrapName != '空' && scope.row.wrapName != null">{{scope.row.wrapName}}</span>
                  </div>
                  <div class="text-inline" >
                    {{ scope.row.bakProducerFullname}}&nbsp;&nbsp; 中大包装: {{scope.row.bakMiddleStandRate}}/{{scope.row.bakBigMiddleRate}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
    <!--      <el-table-column label="剂型" show-overflow-tooltip width="100" prop="h.BAK_MEDICAL_MODE" sortable="custom">
            <template slot-scope="scope">
              {{ scope.row.bakMedicalMode }}
            </template>
          </el-table-column>
          <el-table-column label="规格包装" show-overflow-tooltip prop="h.BAK_MEDICAL_SPEC" sortable="custom">
            <template slot-scope="scope">
              {{ scope.row.bakMedicalSpec }}
            </template>
          </el-table-column>
          <el-table-column label="生产企业" show-overflow-tooltip prop="h.BAK_PRODUCER_FULLNAME" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.bakProducerFullname }}</span>
            </template>
          </el-table-column>-->
          <el-table-column label="配送企业" width="150" show-overflow-tooltip prop="h.BAK_SENDER_FULLNAME" sortable="custom">
            <template slot-scope="scope">
              <span v-if="scope.row.bakSenderShortname != '' && scope.row.bakSenderShortname != null">
                {{ scope.row.bakSenderShortname }}
              </span>
              <span v-else>
              {{ scope.row.bakSenderFullname }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="目录状态" width="150" prop="disState" sortable="custom" align="center">
            <template slot-scope="scope">
               {{ scope.row.disState }}
            </template>
          </el-table-column>
          <el-table-column label="单价" sortable width="100" header-align="left" align="right" prop="h.HIT_PRICE" sortable="custom">
            <template slot-scope="scope">
              {{ priceFormat(scope.row.hitPrice) }}
            </template>
          </el-table-column>
          <el-table-column label="更新时间" width="120" prop="h.LAST_UPDATE_DATE" sortable="custom" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.lastUpdateDate  }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <div class="operates">
                <a href="javaScript:" @click="handleFromView(scope.row.recordId)" class="green" size="small">修改</a>
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
      <div class="foot-btn">
        <div class="foot-left">
          <span>
             <el-button type="warning" size="small" @click="exportExcel">导出可采购药品Excel</el-button>
             <!--<el-button type="warning" size="small" @click="getPrintData" >打印</el-button>-->
          </span>
        </div>
      </div>
    </div>
    <!-- ========================== 主内容end ========================= -->
        <!-- “新增菜单/修改菜单” demo-auditmenu.vue -->
        <form-view v-if="formViewVisible" :parent-id="id" ref="formView" @refreshData="metaList"></form-view>
  </div>
</template>
<script>

  // 引入用户相关请求
  import {selectHitCommList,exportEXL} from 'src/axios/trade/information/hitCommList';
  import formView from 'src/pages/trade/tradecenter/catalog/comm/update';
  import fileUpload from 'js-file-download'
  import {priceFormat,keyBoardEnter} from "src/utils";
  import {getSpecHints,getPackHints} from "src/utils/validateUtil";
  export default {
    name:'based-city-snder-list',
        components: {
          formView
        },
    data () {
      return {
        id:undefined,
        currentOrder:undefined,
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
        printShow: false,
        printList: {
          printData: [],
          printLabel: [
            {'labelName': '产品名', 'labelValue': 'bakProductName'},
            {'labelName': '商品名', 'labelValue': 'bakTradeName'},
            {'labelName': '剂型', 'labelValue': 'bakMedicalMode','width':"100"},
            {'labelName': '规格包装', 'labelValue': 'bakMedicalSpec'},
            {'labelName': '生产企业 ', 'labelValue': 'bakProducerFullname'},
            {'labelName': '配送企业', 'labelValue': 'bakSenderFullname'},
            {'labelName': '目录状态', 'labelValue': 'disState'},
            {'labelName': '单价', 'labelValue': 'hitPrice', 'width': 80, 'align': 'right', 'headerAlign': 'left'},
            {'labelName': '更新时间', 'labelValue': 'lastUpdateDate', 'width': 120},

          ]
        },
      }
    },
    created () {
      this.list()
      this.metaList();
    },
    methods: {
      getSpecHints,
      getPackHints,
      priceFormat,
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
          orderBy:undefined,
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
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      restForm(){
        this.query = this.metaQuery();
        this.list()
      },
       metaList() {
          this.list()
       },
       handleFromView(id) {
              this.formViewVisible = true;
              this.$nextTick(() => {
                // 通过组件中设置的ref属性调取formView.vue中的fillData()方法加载弹窗内容
                this.$refs.formView.fillData(id);
              })
       },
      exportExcel(){
        exportEXL(this.query).then(res => {
          let headers = res.headers;
          let title = ""
          if (!title) {
            const fileName = headers['content-disposition'];
            title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
          }
          fileUpload(res.data,title,"application/vnd.ms-excel")
        })
      },
      metaQuery () { // 表单查询数据初始化
        return {

//            id: undefined,
            searchMedicalSpec: undefined,
            searchProductName : undefined,
            manufactureName : undefined,
            state:undefined

        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        selectHitCommList(this.resData, this.query).then(res => {
          this.resData = res.data
          if(this.resData.pageNum === 0 ){
            this.resData.pageNum = 1
          }
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
      getPrintData() {
//        bakTradeName
        this.printList.printData = this.resData.list;
        sessionStorage.removeItem('printList');
        sessionStorage.setItem('printList', JSON.stringify(this.printList))
        //在新页面打开
        let routeData = this.$router.resolve({path: '/printTable'});
        window.open(routeData.href, '_blank');
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
//        return "规格: "+_bakMedicalSpec + "    包材:"+_wrapName
        return "啦啦啦";
      },

    }
  }
</script>

