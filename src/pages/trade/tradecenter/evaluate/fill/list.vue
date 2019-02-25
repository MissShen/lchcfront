<template xmlns="http://www.w3.org/1999/html">
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" class="table-form" :inline="true">
            <el-form-item class="width-120">
              <el-input v-model="query.orgName"  @keyup.enter.native="searchEnterFun"  placeholder="买方机构" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-120">
              <el-input v-model="query.bakSenderEasy"  @keyup.enter.native="searchEnterFun"  placeholder="配送企业" size="small"></el-input>
            </el-form-item>
          <el-form-item class="width-120">
            <el-input v-model="query.purchaseCode"  @keyup.enter.native="searchEnterFun"  placeholder="采购单号" size="small"></el-input>
          </el-form-item>
          <el-form-item>
              <!--<el-date-picker type="date" class="width-120"  @keyup.enter.native="searchEnterFun"  size="small" placeholder="创建开始日期" format="yyyy-MM-dd" value-format="query.searchBenDate"></el-date-picker>-->
              <!--&nbsp;至&nbsp;-->
              <!--<el-date-picker type="date" class="width-120"  @keyup.enter.native="searchEnterFun"  size="small" placeholder="创建结束日期" format="yyyy-MM-dd" value-format="query.searchEndDate"></el-date-picker>-->
              <el-date-picker type="date" placeholder="创建开始日期" v-model="query.searchBenDate" size="small" @keyup.enter.native="searchEnterFun"
                              format="yyyy-MM-dd" value-format="yyyy-MM-dd" ></el-date-picker>
              &nbsp;至&nbsp;
              <el-date-picker type="date" placeholder="创建结束日期" v-model="query.searchEndDate" size="small" @keyup.enter.native="searchEnterFun"
                              format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item class="width-120">
             <el-select size="small" v-model="query.evaluateFlag" @keyup.enter.native="searchEnterFun"  placeholder="是否评价">
               <el-option label="全部" value=""></el-option>
               <el-option label="已评价" value="1"></el-option>
               <el-option label="未评价" value="0"></el-option>
             </el-select>
          </el-form-item>
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
                @selection-change="handleSelectionChange"
                ref="multipleTable"
                @sort-change="sortChang"
        >
          <el-table-column type="selection" width="40" align="center" :selectable="selectable"></el-table-column>
          <!--<el-table-column type="index" width="50" header-align="left" align="center" label="序号"></el-table-column>-->
          <el-table-column label="采购单号" width="76" prop="item.PURCHASE_CODE" sortable="custom" >
            <template slot-scope="scope">
              <span>
                {{ scope.row.purchaseCode}}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="产品名" min-width="130" prop="item.BAK_PRODUCT_NAME" sortable="custom">
            <template slot-scope="scope" class="drugMessage"  >
              <ul class="ico-zt">
                <li class="ico-left">
                  <div class="icon-box">
                  <i class="ico icon-ji" v-if="scope.row.degreeFlag == '2'"  ></i>
                  <i class="ico icon-jihui" v-if="scope.row.degreeFlag == '0'"  ></i>
                  <i  v-if="scope.row.basicMedicantFlag!= '0'" class="ico icon-jc"></i>
                  </div>
                </li>

                <li>
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
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column  label="产品信息" min-width="130" prop="item.BAK_PRODUCT_SPEC" sortable="custom" >
            <template slot-scope="scope">

              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{getHints(scope.row.bakProductSpec,scope.row.bakWrapName)}}<br/>
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
            <el-table-column label="买方机构"  width="120" prop="item.BUYER_ORG_EASY" sortable="custom" >
              <template slot-scope="scope">
                <span>{{ scope.row.buyerOrgEasy }}</span>
              </template>
            </el-table-column>
          <el-table-column label="配送企业"  width="120" prop="bakSenderEasy" sortable="custom" >
            <template slot-scope="scope">
              <span>{{ scope.row.bakSenderEasy }}</span>
            </template>
          </el-table-column>
          <el-table-column  label="总到/订金额" width="100" header-align="left" align="right" prop="totalReceiveMoney" sortable="custom" >
            <template slot-scope="scope">
              {{ (scope.row.totalReceiveMoney).toFixed(2) }}<br>
              {{ (scope.row.totalRequestMoney).toFixed(2) }}
            </template>
          </el-table-column>
            <el-table-column label="创建时间" prop="item.CREATE_DATE" width="100" sortable="custom" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.createDate }}</span>
              </template>
            </el-table-column>
          <el-table-column  label="操作" width="150">
            <template slot-scope="scope">
              <div class="operates">
                <a href="javaScript:" class="green" v-if="scope.row.evaluateFlag == '1'" @click="evaluateAgain(scope.row.id)">再次评价</a>
                <a href="javaScript:" class="green" v-if="scope.row.evaluateFlag == '0'|| scope.row.evaluateFlag == null" @click="handleFromInfo(scope)" >评价</a>
                <a href="javaScript:" class="green" @click="show(scope.row)">评价内容</a>
              </div>
            </template>
          </el-table-column>
          <el-table-column  type="expand">
            <template slot-scope="scope">
              <el-form label-position="left" height="30px" inline class="demo-table-expand">
                <el-form-item label="评价内容:" class="nomar">
                  <span>{{ scope.row.evaluate }}</span>
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
          <el-button type="primary" @click="evaluateAll" size="small" >评价</el-button>
        </div>
      </div>
    </div>
    <!--评价订单对话框-->
    <el-dialog title="评价订单" top="2vh" width="500px" :visible.sync="showForm" :before-close="closeForm">
      <el-form ref="form" :model="form" class="info-view">
        <input type="hidden" v-model="ids" />
        <dl class="nopad-left">
          <dt>配送速度：</dt>
          <dd><el-rate v-model="form.speedState" show-score text-color="#ff9900" score-template="{value}" ></el-rate></dd>
        </dl>
        <dl class="nopad-left">
          <dt>服务态度：</dt>
          <dd><el-rate v-model="form.serviceState" show-score text-color="#ff9900" score-template="{value}"></el-rate></dd>
        </dl>
        <dl class="nopad-left">
          <dt>药品包装：</dt>
          <dd><el-rate v-model="form.productPack" show-score text-color="#ff9900" score-template="{value}"></el-rate></dd>
        </dl>
        <dl class="nopad-left">
          <dt>库存信息描述：</dt>
          <dd>
            <el-radio-group v-model="form.stockInfoState">
              <el-radio label="1">准确</el-radio>
              <el-radio label="2">不准确</el-radio>
            </el-radio-group>
          </dd>
        </dl>
        <el-form-item label="评价内容：" label-width="100">
          <el-input type="textarea" :rows="4" v-model="form.evaluate" class="width-320"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
          <el-button type="primary" size="small" @click="handleForm('form')">提交</el-button>
          <el-button @click="showForm=false" size="small" class="el-button-pale">取消</el-button>
        </span>
    </el-dialog>
    <!-- 弹窗：再次修改 -->
    <form-view v-if="formViewVisible" :parent-id="id" ref="formView" @refreshData="metaList"></form-view>
    <!-- ========================== 主内容end ========================= -->
  </div>
</template>
<script>

  // 引入用户相关请求
  import {BuyerEvaluateList} from 'src/axios/trade/evaluate/evaluate'
  import {priceFormat,keyBoardEnter} from "src/utils";
  import {evaFill} from 'src/axios/trade/buyerrole/arrive/buyerTabView/receiveListInfo'
  import formView from 'src/pages/trade/tradecenter/evaluate/fill/evaluateUpdate.vue';
  import {getSpecHints,getPackHints} from "src/utils/validateUtil";
  import {dateFormatter} from "src/utils/index";

  export default {
    data () {
      return {
        currentOrder: undefined,
        evaluate:'5',
        ids:[],
        formViewVisible: false,
        multipleSelection:[],
        form: this.metaForm(), // 表单初始化
        expanded:true,
        showForm: false, // 表单可见性初始化
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
      }
    },
    created () {
      this.list()
    },
    components: {
      formView
    },
    methods: {
      getSpecHints,
      getPackHints,
      restQuery() {
        this.query = this.metaQuery()
        this.list()
      },
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
          // 前后台交互数据封装格式
            pageNum: 1,
            pageSize: 10,
            size: "",
            startRow: "",
            endRow: "",
            total: 4,
            pages: 10,
            prePage: "",
            nextPage: "",
            isFirstPage: true,
            isLastPage: "",
            orderBy:undefined,
            hasPreviousPage: "",
            hasNextPage: "",
            navigatePages: "",
            navigatepageNums: "",
            navigateFirstPage: "",
            navigateLastPage: "",
            firstPage: "",
            lastPage: "",
            list: []
        }
      },
      metaQuery () { // 表单查询数据初始化
        var date = new Date(),
          y = date.getFullYear(),m = date.getMonth();
        return {
            orgName: '',
            searchBenDate: dateFormatter(new Date(y, m, 1),true),
            searchEndDate: this.getLocalTime(),
            bakSenderEasy:'',
            evaluateFlag:'',
            purchaseCode:''
        }
      },
      evaluateAgain(id){
        this.formViewVisible = true;
        this.$nextTick(() => {
          // 通过组件中设置的ref属性调取formView.vue中的fillData()方法加载弹窗内容
          this.$refs.formView.fillData(id);
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      evaluateAll(){
        if(this.multipleSelection.length<1){
          this.$message.error('请选择需要评价的订单');
          return false;
        }else {
            let idsArr = [] , arr = this.multipleSelection;
            for(let i = 0; i < arr.length; i++){
              idsArr.push(arr[i].recordId);
            }
            this.ids = idsArr;
          this.showForm = ! this. showForm
        }
      },
      selectable(row,index) {
        if(Number(row.evaluateFlag)== 1){
          return false
        }else {
          return true
        }
      },
      metaList(){
        this.list();
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        BuyerEvaluateList(this.resData, this.query).then(res => {
          this.resData = res.data;
          if(this.resData.pageNum === 0 ){
            this.resData.pageNum = 1
          }
        })
      },
      closeForm(){
        this.showForm = false
      },
      metaForm () { // 表单数据初始化
        return {
          stockInfoState: '1',
          speedState:5,
          serviceState:5,
          orderItemId:undefined,
          evaluate:'',
          productPack:5,
          ids:[]
        }
      },
      toggleForm () {
        this.showForm = !this.showForm
      },
      // 提交用户表单
      handleForm (form) {
        this.$refs[form].validate(valid => {
          if (valid) {
            this.toggleForm();
              evaFill(this.form,this.ids).then(res => {
                this.list();
                this.form = this.metaForm();
                this.multipleSelection = [];
                this.$message({
                  type: 'success',
                  message: '评价成功',
                  onClose: () => {
                    this.list()
                    this.multipleSelection = [];
                    this.form = this.metaForm();
                  }
                })
              })
          } else {
            return false
          }
        })
      },
      show(row){
        this.$refs.multipleTable.toggleRowExpansion(row,this.expanded)
        this.expanded = !this.expanded
      },
      getLocalTime (){
        let date = new Date();
        let YY = date.getFullYear();
        let MM = (date.getMonth()+1 < 10 ? '0'+ (date.getMonth()+1) : date.getMonth()+1);
        let DD = date.getDate()+1 < 10 ? '0'+ date.getDate() : date.getDate();
        let hh = date.getHours() < 10 ? '0'+ date.getHours() : date.getHours();
        let mm = date.getMinutes() < 10 ? '0'+ date.getMinutes() : date.getMinutes();
        let ss = date.getSeconds() < 10 ? '0'+ date.getSeconds() : date.getSeconds();
        return YY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss;

      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      handleFromInfo (scope) {
        this.multipleSelection.push(scope.row);
        this.evaluateAll();
      },
      getLocalYear (){
        let date = new Date();
        let YY = date.getFullYear()-1;
        let MM = '01';
        let DD = '01';
        let hh = '00';
        let mm = '00';
        let ss = '00';
        return YY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss;
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
      sortChang(value){
        let sortType=" desc"
        if(value.order.startsWith("asc")){
          sortType=" asc";
        }
        this.currentOrder=value.prop + sortType;
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

