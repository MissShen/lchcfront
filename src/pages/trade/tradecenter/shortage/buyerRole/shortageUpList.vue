<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
          <el-form-item class="width-120">
             <el-input   @keyup.enter.native="searchEnterFun"  v-model="query.bakMedicalName"  placeholder="品名" size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-120">
            <el-input  @keyup.enter.native="searchEnterFun"  v-model="query.proportion" placeholder="到货率" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-date-picker class="width-120" type="date"  @keyup.enter.native="searchEnterFun"  placeholder="选择开始日期" format="yyyy-MM-dd"  value-format="yyyy-MM-dd" size="small" v-model="query.begin" ></el-date-picker>
             &nbsp;至&nbsp;
             <el-date-picker class="width-120" type="date"  @keyup.enter.native="searchEnterFun"  placeholder="选择结束日期" format="yyyy-MM-dd"  value-format="yyyy-MM-dd" size="small" v-model="query.end"  ></el-date-picker>
           </el-form-item>
           <el-form-item>
              <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
              <el-button type="warning" size="small" @click="resetForm">重置</el-button>
           </el-form-item>
        </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe
          @sort-change="sortChang"
        >
          <!--<el-table-column label="序号"  type="index" width="50" header-align="left" align="center"></el-table-column>-->
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
                  {{scope.row.bakProductSpec}}<br/>
                  <span v-if="scope.row.bakFactoryEasy!=''">{{getPackHints(scope.row.bakFactoryEasy,scope.row.bakMiddleStandRate,scope.row.bakBigMiddleRate)}}</span>
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    {{ scope.row.bakProductSpec}}
                  </div>
                  <div class="text-inline" v-if="scope.row.bakFactoryEasy!=''">
                    {{ scope.row.bakFactoryEasy}}&nbsp;&nbsp; 中大包装: {{ scope.row.bakMiddleStandRate}}/{{ scope.row.bakBigMiddleRate}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="订购量" header-align="left" width="80" align="right" prop="t.REQUEST_QTY" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.requestQty }}</span>
            </template>
          </el-table-column>
           <el-table-column label="到货量" header-align="left" width="80" align="right" prop="t.RECEIVE_QTY" sortable="custom">
              <template slot-scope="scope">
                 <span>{{ scope.row.receiveQty }}</span>
               </template>
            </el-table-column>
           <el-table-column label="到货率" header-align="left" width="80" align="right" prop="t.proportion" sortable="custom">
               <template slot-scope="scope">
                  <span>{{ scope.row.proportion }}</span>
                 </template>
            </el-table-column>
            <el-table-column label="发送时间" width="160" prop="t.CREATE_DATE" sortable="custom">
                <template slot-scope="scope">
                   <span>{{ scope.row.createDate }}</span>
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
        <div class="foot-left"><el-button type="warning" size="small" @click="excel()">导出excel</el-button></div>
      </div>

    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求
  import {selectOrdItemStaticList,exportEXL} from  'src/axios/trade/shortage/buyerRole/shortageUpList'
  import fileUpload from 'js-file-download'
  import {priceFormat,keyBoardEnter} from "src/utils";
  import {getPackHints,getSpecHints} from "src/utils/validateUtil";


  export default {
    name:'orderItemStaticList',
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
        }
      }
    },
    created () {
      this.list()
    },
    methods: {
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
        return {// 前后台交互数据封装格式
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
      getPackHints,
      getSpecHints,
      excel(){
        if(this.query.begin == undefined || this.query.begin == ''||this.query.end == undefined || this.query.end == null ){
          this.$message({
            type: 'error',
            message: '请选择创建的开始日期及创建的结束日期'
          });
          return false;
        }else {
          exportEXL(this.query).then(res => {
            let headers = res.headers;
            let title = ""
            if (!title) {
              const fileName = headers['content-disposition'];
              title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
            }
            fileUpload(res.data, title, "application/vnd.ms-excel")
          })
        }
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      resetForm () {
        this.query=this.metaQuery()
        this.list()
      },
      metaQuery () { // 表单查询数据初始化
        return {

         //   id: undefined,
            bakMedicalName: undefined,
            proportion: undefined,
            buyerOrgName:undefined,
            begin:undefined,
            end:undefined

        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        selectOrdItemStaticList(this.resData, this.query).then(res => {
          this.resData = res.data
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
      }
    }
  }
</script>

