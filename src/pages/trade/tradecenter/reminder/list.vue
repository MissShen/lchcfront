<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
          <el-form-item>
            <el-date-picker type="date" class="width-120" size="small" @keyup.enter.native="searchEnterFun"  placeholder="发送时间" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="query.searchBenDate"></el-date-picker>
             &nbsp;至&nbsp;
            <el-date-picker type="date" class="width-120" size="small" @keyup.enter.native="searchEnterFun"  placeholder="发送时间" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="query.searchEndDate"></el-date-picker>
          </el-form-item>
          <el-form-item class="width-120">
            <el-input v-model="query.senderOrgEasy" @keyup.enter.native="searchEnterFun"  placeholder="配送企业" size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-120">
            <el-input v-model="query.buyerOrgEasy" @keyup.enter.native="searchEnterFun"  placeholder="医疗机构" size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-120">
            <el-input v-model="query.userName" @keyup.enter.native="searchEnterFun"  placeholder="制单人" size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-120">
            <el-select v-model="query.ordItemState" @keyup.enter.native="searchEnterFun"  placeholder="状态" size="small">
            <el-option label="全部" value=""></el-option>
            <el-option label="新订单" value="1"></el-option>
            <el-option label="已阅读" value="2"></el-option>
            <el-option label="已确认" value="4"></el-option>
            <el-option label="缺货" value="7"></el-option>
          </el-select>
          </el-form-item>
          <el-form-item class="width-130">
            <el-input v-model="query.intHours" @keyup.enter.native="searchEnterFun"  placeholder="距离上次催促大于几个小时未读" size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-130">
            <el-input v-model="query.hours" @keyup.enter.native="searchEnterFun"  placeholder="超过几个小时未阅读" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
            <el-button type="warning" size="small" @click="result()">重置</el-button>
          </el-form-item>
        </el-form>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          @sort-change="sortChang"
          stripe>
          <!--<el-table-column type="index" width="50" header-align="left" align="center" label="序号"></el-table-column>-->
          <el-table-column label="采购单号" min-width="75"  prop="item.PURCHASE_CODE" sortable="custom">
            <template slot-scope="scope">
              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{scope.row.purchaseCode}}<br/>
                </div>
                <div class="el-tooltip-box">
                  {{ scope.row.purchaseCode}}
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="产品名" min-width="100" >
            <template slot-scope="scope" class="drugMessage">
              <ul class="ico-zt">
                <li>
                  <!--tootip提示气泡-->
                  <!--:enterable="false" 鼠标不可进入tooltip中-->
                  <el-tooltip placement="top" :enterable="false">
                    <!--气泡内容（必须放在slot="content"内）,布局与源内容保持一致-->
                    <div slot="content">
                      <div>{{ scope.row.bakProductName }}</div>
                      <div class="text-inline">{{ scope.row.bakMedicalMode }}
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
          <el-table-column  label="产品信息" min-width="100">
            <template slot-scope="scope">
              <el-tooltip placement="top" :enterable="false">

                <div slot="content">
                  {{scope.row.bakFactoryEasy}}<br/>
                  <!--{{getHints(scope.row.bakProductSpec,scope.row.bakWrapName)}}<br/>-->
                  {{getPackHints(scope.row.bakFactoryEasy,scope.row.middleStandRate,scope.row.bigMiddleRate)}}
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    {{ scope.row.bakProductSpec}} &nbsp;&nbsp;
                    <span v-if="scope.row.bakWrapName != '空' && scope.row.bakWrapName != null">{{ scope.row.bakWrapName}}</span>
                  </div>
                  <div class="text-inline" >
                    {{ scope.row.bakFactoryEasy}} &nbsp;&nbsp; 中大包装:{{scope.row.middleStandRate }}/{{ scope.row.bigMiddleRate}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="医疗机构" show-overflow-tooltip prop="item.BUYER_ORG_EASY" sortable="custom">
            <template slot-scope="scope">
              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{scope.row.buyerOrgEasy}}<br/>
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    {{ scope.row.buyerOrgEasy}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="配送企业" prop="item.SENDER_ORG_EASY" sortable="custom">
            <template slot-scope="scope">
              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{scope.row.senderOrgEasy}}
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    {{ scope.row.senderOrgEasy}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="单价" width="100" align="right" prop="item.UNIT_PRICE" sortable="custom">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.unitPrice) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="发送时间" width="100"  prop="item.CREATE_DATE" sortable="custom" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="订单数量" width="100" header-align="left" align="right" prop="item.REQUEST_QTY" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.requestQty }}</span>
            </template>
          </el-table-column>
          <el-table-column label="到货数量" width="100" align="right"  prop="item.RECEIVE_QTY" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.receiveQty }}</span>
            </template>
          </el-table-column>
          <el-table-column label="联系人手机" prop="u.telephone" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.telephone }}</span>
            </template>
          </el-table-column>
          <el-table-column label="联系人电话" prop="u.mobile" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.mobile }}</span>
            </template>
          </el-table-column>
          <el-table-column label="催促时间" width="100" prop="item.last_Urgency_Date" sortable="custom" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.lastUrgencyDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">

            <template slot-scope="scope">
              <div class="operates">
                <a href="javaScript:;" v-if="scope.row.lastUrgencyDate" @click="openPup(scope.row.recordId,scope.row.remarks)" class="green"  title="再催促">再催促</a>
                <a href="javaScript:;" v-else @click="openPup(scope.row.recordId,scope.row.remarks)" class="green"  title="催促">催促</a>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="foot-btn">
        <div class="foot-left">
          <el-button type="warning" size="small" @click="exportExcel">生成excel表</el-button>
        </div>
      </div>
      <div>
        <el-dialog
                title="订单催促"
                :visible.sync="dialogVisible"
                width="35%">
                <div style="width: 400px">
                  <el-form ref="form" :model="form" label-width="20px">
                    <el-form-item prop="remark">
                      描述:<el-input type="textarea"  v-model="form.remark"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="itemUrge('form')">保存</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
              </span>
         </el-dialog>
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
  import {queryReminderList,addReminder,exportEXL} from 'src/axios/trade/reminder/list'
  import fileUpload from 'js-file-download'
  import {getSpecHints,getPackHints} from "src/utils/validateUtil";

  import {priceFormat,keyBoardEnter} from "src/utils";

  export default {
    data () {
      return {
        dialogVisible: false,
        recordId:'',
        currentOrder:undefined,
        remarks:'',
        activeName: 'first',  // 当前标签
        form: this.metaForm(), // 表单初始化
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
      getSpecHints,
      getPackHints,
      priceFormat,
      openPup(recordId,remarks){
        this.dialogVisible = true;
        this.recordId = recordId;
        this.remarks = remarks;
        this.form.remark = remarks;
      },
      itemUrge(form){
        this.dialogVisible = false;
        addReminder(this.recordId,this.form.remark).then(res => {
          this.$message({
            message: '成功！',
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.list()
            }
          })
        })

      },
      result(){
        this.query = this.metaQuery();
        this.list();
      },
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
      // 前后台交互数据封装格式
            pageNum: 1,
            pageSize: 10,
            size: 10,
            orderBy:undefined,
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
          searchBenDate: "",
          searchEndDate: "",
          buyerOrgEasy: "",
          senderOrgEasy: "",
          userName: "",
          ordItemState: "",
          intHours: "",
          hours: ""
        }
      },
      metaForm () { // 表单数据初始化
        return {
          orderId: '',
          remark:''
        }
      },
      sortChang(value){
        let sortType=" desc"
        if(value.order.startsWith("asc")){
          sortType=" asc";
        }
        this.currentOrder=value.prop + sortType;
        this.list()
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
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        queryReminderList(this.resData, this.query).then(res => {
          this.resData = res.data;
          if(this.resData.pageNum===0){
            this.resData.pageNum=1;
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
      getHints(bakProductSpec, bakWrapName) {

        let _bakProductSpec, _bakWrapName;
        if (bakProductSpec == null || bakProductSpec == undefined || bakProductSpec == "空") {
          _bakProductSpec = "";
        } else {
          _bakProductSpec = bakProductSpec;
        }
        if (bakWrapName == null || bakWrapName == undefined || bakWrapName == "空") {
          _bakWrapName = "";
        } else {
          _bakWrapName = bakWrapName;
        }
        return  "规格:  "+ _bakProductSpec +"    包材:"+ _bakWrapName
      },
    }
  }
</script>

