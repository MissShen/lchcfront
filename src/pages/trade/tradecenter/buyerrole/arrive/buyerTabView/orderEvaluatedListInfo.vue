<template xmlns="http://www.w3.org/1999/html">
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" class="table-form" :inline="true">
            <el-form-item class="width-120">
              <el-input v-model="query.purchaseCode" @keyup.enter.native="searchEnterFun"  placeholder="采购单号" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-120">
              <el-input v-model="query.bakBuyerEasy" @keyup.enter.native="searchEnterFun"  placeholder="品名" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-120">
              <el-input v-model="query.bakMedicalSpec" @keyup.enter.native="searchEnterFun"  placeholder="规格" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-120">
              <el-input v-model="query.bakFactoryName" @keyup.enter.native="searchEnterFun"  placeholder="生产企业" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-120">
              <el-input v-model="query.bakSenderEasy" @keyup.enter.native="searchEnterFun"  placeholder="配送企业" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-50" v-if="roleCode==='serviceCenter'">
              <el-checkbox v-model="checkedAll">全部</el-checkbox>
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
          @sort-change="sortChang"
          border
          @selection-change="handleSelectionChange"
          ref="multipleTable"
          stripe>
          <!--<el-table-column type="index" width="80" label="序号" header-align="left" align="center"></el-table-column>-->
          <el-table-column type="selection" width="40" align="center" :selectable="selectable"></el-table-column>
          <el-table-column label="采购单号" prop="i.purchase_Code" sortable="custom" min-width="80">
            <template slot-scope="scope">
              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{scope.row.purchaseCode}}<br/>
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    {{ scope.row.purchaseCode}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="产品名" min-width="180" prop="i.bak_Medical_Name" sortable="custom">
            <template slot-scope="scope" class="drugMessage">
              <ul class="ico-zt">
                <li class="ico-left">
                  <div class="icon-box" style="position:relative; width: 40px; height: 40px;">
                    <i class="ico icon-ji" v-if="scope.row.degreeFlag == '2'"></i>
                    <i class="ico icon-jihui" v-if="scope.row.degreeFlag == '0'"></i>
                    <i class="ico icon-jc" v-if="scope.row.contractType != '0'"></i>
                    <i class="ico icon-qu" v-if="scope.row.regionId != '0'"></i>
                    <i class="ico icon-liang" v-if="scope.row.twoVoteType != '0'" ></i>
                  </div>
                </li>
                <li>
                  <!--tootip提示气泡-->
                  <!--:enterable="false" 鼠标不可进入tooltip中-->
                  <el-tooltip placement="top" :enterable="false">
                    <!--气泡内容（必须放在slot="content"内）,布局与源内容保持一致-->
                    <div slot="content">
                      <div>{{ scope.row.bakMedicalName }}</div>
                      <div v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName !=null">{{ scope.row.bakMedicalMode }}({{ scope.row.bakTradeName }})</div>
                      <div v-if="scope.row.bakTradeName == '无' || scope.row.bakTradeName ==null">{{ scope.row.bakMedicalMode }}</div>
                    </div>

                    <!--源内容（必须放在class="el-tooltip-box"内）-->
                    <div class="el-tooltip-box">
                      <!--加class="text-inline"确保内容不折行-->
                      <div class="text-inline">{{ scope.row.bakMedicalName }}</div>
                      <div class="text-inline"  v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName !=null">{{ scope.row.bakMedicalMode }}({{ scope.row.bakTradeName }})</div>
                      <div class="text-inline"  v-if="scope.row.bakTradeName == '无' || scope.row.bakTradeName ==null">{{ scope.row.bakMedicalMode }}</div>
                    </div>
                  </el-tooltip>
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column  label="产品信息" min-width="180">
            <template slot-scope="scope">

              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{getSpecHints(scope.row.bakMedicalSpec,scope.row.bakStandSpecRate,scope.row.useUnit,scope.row.metricName,scope.row.wrapName)}}<br/>
                  {{getPackHints(scope.row.bakFactoryEasy,scope.row.bakMiddleStandRate,scope.row.bakBigMiddleRate)}}
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    <span class="text-inline"  v-if="scope.row.wrapName != '空' && scope.row.wrapName != null">{{ scope.row.bakMedicalSpec}} × {{ scope.row.bakStandSpecRate}} {{scope.row.useUnit}} / {{ scope.row.metricName}} &nbsp;&nbsp; {{ scope.row.wrapName}}</span>
                    <span class="text-inline"  v-if="scope.row.wrapName == '空' || scope.row.wrapName == null">{{ scope.row.bakMedicalSpec}} × {{ scope.row.bakStandSpecRate}} {{scope.row.useUnit}} / {{ scope.row.metricName}}</span>
                  </div>
                  <div class="text-inline" >
                    {{ scope.row.bakFactoryEasy}}&nbsp;&nbsp; 中大包装: {{ scope.row.bakMiddleStandRate}}/{{ scope.row.bakBigMiddleRate}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>

          <el-table-column label="配送企业" prop="i.sender_Org_Easy" sortable="custom" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.senderOrgEasy }}</span>
            </template>
          </el-table-column>
          <el-table-column label="单价" prop="i.unit_price" sortable="custom"  header-align="left" align="right" width="100">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.unitPrice) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="总到/订货量" sortable header-align="left" align="right" width="110" prop="i.receive_qty" sortable="custom">
            <template slot-scope="scope">
              <div class="hold-height">
                <span>{{ scope.row.receiveQty }}</span>
              </div>
              <div class="hold-height">
                <span>{{ scope.row.requestQty }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="总到/订购金额" header-align="left" align="right" width="110" prop="totalRequestMoney" sortable="custom">
            <template slot-scope="scope" sortable>
              <div class="hold-height">{{  priceFormat(scope.row.totalReceiveMoney) }}</div>
              <div class="hold-height">{{ priceFormat(scope.row.totalRequestMoney)  }}</div>
            </template>
          </el-table-column>
          <!--<el-table-column label="订购量" prop="i.request_qty" sortable="custom" header-align="left" align="right" width="90">-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{ scope.row.requestQty }}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column label="订购金额" prop="o.request_total" sortable="custom" header-align="left" align="right" width="90">-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{  priceFormat(scope.row.requestTotal) }}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column label="操作" width="80" align="center">
            <template slot-scope="scope">
             <span class="green" style=" color:#04BA41; cursor:pointer;" @click="handleFromInfo(scope)" >评价</span>
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
        </ul>
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30]"
          :total="resData.total"
          :page-size="resData.pageSize"
          :page-count="resData.pages"
          :pager-count="5"
          :current-page.sync="resData.pageNum">
        </el-pagination>
      </div>
     <div class="foot-btn">
       <div class="foot-left">
         <el-button type="primary" @click="evaluateAll" size="small" >评价</el-button>
       </div>
       <div class="foot-right">
         <a class="padding20" target="_blank" href="https://inv-veri.chinatax.gov.cn/">点击进入"国家税务局全国<span class="red">增值税发票查验</span>平台"</a>
       </div>
     </div>
      <!--评价订单对话框-->
      <el-dialog title="评价订单" top="2vh" width="50%" :visible.sync="showForm" :before-close="closeForm">
        <div style="width: 500px" class="padding20">
          <el-form ref="form" :model="form" label-width="180px">
            <el-input type="hidden"  v-model="ids"></el-input>
            <el-form-item  label="配送速度：">
              <el-rate v-model="form.speedState"   show-score text-color="#ff9900" score-template="{value}" >
              </el-rate>
            </el-form-item>
            <el-form-item label="服务态度：" >
              <el-rate v-model="form.serviceState"  show-score text-color="#ff9900" score-template="{value}"></el-rate>
            </el-form-item>
            <el-form-item label="药品包装：" >
              <el-rate v-model="form.productPack"  show-score text-color="#ff9900" score-template="{value}"></el-rate>
            </el-form-item>
            <el-form-item label="库存信息描述：" >
              <el-radio-group v-model="form.stockInfoState">
                <el-radio label="1">准确</el-radio>
                <el-radio label="2">不准确</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="评价内容：" >
              <el-input type="textarea" :rows="6" v-model="form.evaluate"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer">
          <el-button type="primary" size="small" @click="handleForm('form')">提交</el-button>
          <el-button @click="closeForm" size="small">取消</el-button>
        </span>
      </el-dialog>

    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>


  // 引入用户相关请求
  import {queryEvaluatedOrderItemList,evaFill} from 'src/axios/trade/buyerrole/arrive/buyerTabView/receiveListInfo'
  import {priceFormat,keyBoardEnter} from "src/utils";
  import {findRole} from 'src/axios/trade/purchase/purchase'
  import {getSpecHints,getPackHints} from "src/utils/validateUtil";

  export default {
    name: "orderEvaluatedList",
    data () {
      return {
        multipleSelection:[]
      }
    },
    methods: {
      getSpecHints,
      getPackHints,
      priceFormat,
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
          orderBy:undefined,
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
      restQuery(){
        this.query=this.metaQuery();
        this.list()
      },
      metaForm () { // 表单数据初始化
        return {
          stockInfoState: '1',
          speedState:5,
          serviceState:5,
          orderItemId:undefined,
          evaluate:'',
          productPack:5
        }
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
      toggleForm () {
        this.showForm = !this.showForm
      },
      selectable(row,index) {
        if(Number(row.evaluateFlag)== 1){
          return false
        }else {
          return true
        }
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
          this.showForm = ! this.showForm
        }
      },
      closeForm () {
        this.toggleForm();
        this.form = this.metaForm();
        this.multipleSelection = []
      },
      toggleForm () {
        this.showForm = !this.showForm
      },
      metaQuery () { // 表单查询数据初始化
        return {
          purchaseCode: undefined,
          bakBuyerEasy: undefined,
          bakMedicalSpec: undefined,
          bakFactoryName: undefined,
          bakSenderEasy: undefined,
          dataFlag:undefined
        }
      },
      // 提交用户表单
      handleForm (form) {
        this.$refs[form].validate(valid => {
          if (valid) {
            this.toggleForm();
            this.multipleSelection = [];
            evaFill(this.form,this.ids).then(res => {
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
          }
        })
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        let dataFlag;
        if(this.checkedAll==false){
          this.dataFlag = '0';
        }
        else{
          this.dataFlag = "1";
        }
        this.query.dataFlag=this.dataFlag;
        this.resData.orderBy=this.currentOrder;
        queryEvaluatedOrderItemList(this.resData, this.query).then(res => {
          this.resData = res.data;
          if(this.resData.pageNum===0){
            this.resData.pageNum=1
          }
          this.$emit("evalue",this.resData.total);
          findRole().then(res => {
            this.roleCode = res.data;
          })
        });
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val;
        this.list()
      },
      sortChang(column){
        let sortType=" desc";
        if(column.order.startsWith("asc")){
          sortType=" asc";
        }
        this.currentOrder=column.prop + sortType;
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val;
        this.list()
      },
      getDrugStorage(bakMedicalSpec,bakStandSpecRate,useUnit,metricName){
        let _bakMedicalSpec = bakMedicalSpec || '';
        let _bakStandSpecRate = bakStandSpecRate || '';
        let _useUnit = useUnit || '';
        let _metricName = metricName || '';
        return _bakMedicalSpec +'×'+ _bakStandSpecRate+ _useUnit+'/'+_metricName
      }
    },
    data () {
      return {
        checked:false,
        ids:[],
        formViewVisible: false,
        multipleSelection:[],
        currentOrder:undefined,
        form: this.metaForm(), // 表单初始化
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        checkedAll:false,
        roleCode:''
      }
    },
    created () {
      this.list()
    }
  }
</script>



