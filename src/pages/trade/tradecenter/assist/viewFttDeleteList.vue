<template>
  <div>
    <!-- ========================== 非两票制药品列表 ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
            <el-form-item class="width-120">
              <el-input v-model="query.searchBuyerName" @keyup.enter.native="searchEnterFun"  placeholder="医院名称" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-120">
              <el-input v-model="query.searchSpec" @keyup.enter.native="searchEnterFun"  placeholder="产品名称" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-120">
              <el-input v-model="query.searchStandRate" @keyup.enter.native="searchEnterFun"  placeholder="商品名" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-120">
              <el-input v-model="query.searchManufactureName" @keyup.enter.native="searchEnterFun"  placeholder="生产企业名称" size="small"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
                <el-button type="warning" size="small" @click="reset()">重置</el-button>
            </el-form-item>
        </el-form>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          @selection-change="handleSelectionChange"
          border
          stripe  ref="multipleTable"
          @sort-change="sortChang"
        >
          <!--<el-table-column type="index" width="80" label="序号" header-center="left" align="center"></el-table-column>-->
          <el-table-column label="上报机构" prop="buyerOrgName" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.buyerOrgName}}
            </template>
          </el-table-column>
          <el-table-column label="产品名"  width="300">
            <template slot-scope="scope">
              <!--tootip提示气泡-->
              <!--:enterable="false" 鼠标不可进入tooltip中-->
              <el-tooltip placement="top" :enterable="false">
                <!--气泡内容（必须放在slot="content"内）,布局与源内容保持一致-->
                <div slot="content">
                  <div>{{ scope.row.nameChn }}</div>
                  <div>{{ scope.row.doseageFormName }}
                    <span v-if="scope.row.tradeName != '无' && scope.row.tradeName !=null">({{ scope.row.tradeName }})</span>
                  </div>
                </div>

                <!--源内容（必须放在class="el-tooltip-box"内）-->
                <div class="el-tooltip-box">
                  <!--加class="text-inline"确保内容不折行-->
                  <div class="text-inline">{{ scope.row.nameChn }}</div>
                  <div class="text-inline">{{ scope.row.doseageFormName }}
                    <span v-if="scope.row.tradeName != '无' && scope.row.tradeName !=null">({{ scope.row.tradeName }})</span>
                  </div>
                </div>
              </el-tooltip>

            </template>
          </el-table-column>
          <el-table-column label="产品信息" width="300">
            <template slot-scope="scope">
              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{getSpecHints(scope.row.spec,scope.row.standRate,scope.row.doseageFormName,scope.row.specUnit,scope.row.wrapName)}}<br/>
                  {{getPackHints(scope.row.manufactureName,scope.row.middleStandRate,scope.row.bigMiddleRate)}}
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    {{ scope.row.spec}} × {{ scope.row.standRate}} {{ scope.row.doseageFormName}} / {{scope.row.specUnit}} &nbsp;&nbsp;
                    <span v-if="scope.row.wrapName != '空' && scope.row.wrapName != null">{{ scope.row.wrapName}}</span>
                  </div>
                  <div class="text-inline" >
                    {{ scope.row.manufactureName}}&nbsp;&nbsp; 中大包装: {{ scope.row.middleStandRate}}/{{ scope.row.bigMiddleRate}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
              <el-table-column label="单价" width="100" prop="BID_PRICE" sortable="custom" >
                <template slot-scope="scope">
                  <span>{{ priceFormat(scope.row.bidPrice) }}</span>
                </template>
             </el-table-column>
          <el-table-column label="非两票制原因" width="120">
            <template slot-scope="scope">
              <div class="operates">
                <a href="javaScript:;" class="green" @click="show(scope.row)">查看</a>
              </div>
            </template>
          </el-table-column>
          <el-table-column  type="expand">
            <template slot-scope="scope">
              <el-form label-position="left"  height="30px" inline class="demo-table-expand">
                <el-form-item label="非两票制原因:" class="nomar">
                  <span>{{ scope.row.remark }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
        </el-table>
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
      <div class="foot-btn">
        <div class="foot-left">
          <el-button type="success" size="small"  @click="exportExcel">导出</el-button>
        </div>
      </div>
    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入数据请求
  import {viewFttDeleteList,exportDeleteEXL} from  'src/axios/trade/assist/assistConfig'
  import fileUpload from 'js-file-download'
  import {priceFormat,keyBoardEnter} from "src/utils";
  import {getSpecHints,getPackHints} from "src/utils/validateUtil";
  export default {
    data () {
      return {
        currentOrder: undefined,
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        expanded:true,
        multipleSelection:[]
      }
    },
    created () {
      this.list()
    },
    methods: {
      priceFormat,getSpecHints,getPackHints,
      // -------------------------------------------- 数据初始化  -----------------------------------------
      sortChang(value){
        let sortType=" desc"
        if(value.order.startsWith("asc")){
          sortType=" asc";
        }
        this.currentOrder=value.prop + sortType;
        this.list()
      },
      metaData () {
        return {
          // 前后台交互数据封装格式
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
            requestInfo:[]

        }
      },
      show(row){
        this.$refs.multipleTable.toggleRowExpansion(row,this.expanded);
        this.expanded = !this.expanded
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      metaQuery () { // 表单查询数据初始化
        return {

            searchBuyerName:undefined,
            searchSpec:undefined,
            searchStandRate:undefined,
            searchManufactureName:undefined

        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        viewFttDeleteList(this.resData, this.query).then(res => {
          this.resData = res.data;
          if(this.resData.pageNum===0){
            this.resData.pageNum=1
          }
          this.$emit("return",this.resData.total);
        })
      },
      exportExcel(){
        exportDeleteEXL(this.query).then(res => {
          let headers = res.headers;
          let title = ""
          if (!title) {
            const fileName = headers['content-disposition'];
            title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
          }
          fileUpload(res.data,title,"application/vnd.ms-excel")
        })
      },
      reset(){
        this.query=this.metaQuery();
        this.list();
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val;
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val;
        this.list()
      },
      goAdd () {
        this.$router.push("/trade/dataReport/assistAdd");
      },
      goInfo(id) {
        this.$router.push("/trade/dataReport/assistInfo/" + id);
      },
      goEdit(id) {
        this.$router.push("/trade/dataReport/assistUpdate/" + id);
      }
    }
  }
</script>
