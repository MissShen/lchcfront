<template>
  <div>
    <!-- ========================== 创建退货记录 ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
            <el-form-item class="width-90">
                <el-input v-model="query.bakFactoryEasy" @keyup.enter.native="searchEnterFun"  placeholder="生产企业" size="small"></el-input>
             </el-form-item>
            <el-form-item class="width-90">
                <el-input v-model="query.buyerName" @keyup.enter.native="searchEnterFun"  placeholder="医疗机构" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-90">
                <el-input v-model="query.senderName" @keyup.enter.native="searchEnterFun"  placeholder="配送企业" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-90">
                <el-input v-model="query.bakProductName" @keyup.enter.native="searchEnterFun"  placeholder="品名" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-90">
                <el-input v-model="query.lotNo" @keyup.enter.native="searchEnterFun"  placeholder="批号" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-90">
                <el-input v-model="query.purchaseCode" @keyup.enter.native="searchEnterFun"  placeholder="采购单号" size="small"></el-input>
            </el-form-item>
            <el-form-item>
            <el-date-picker type="date" placeholder="创建日期" @keyup.enter.native="searchEnterFun"  format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small" v-model="query.createBenDate"></el-date-picker>
                        &nbsp;至&nbsp;
            <el-date-picker type="date" placeholder="创建日期" @keyup.enter.native="searchEnterFun"  format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small" v-model="query.createEenDate"></el-date-picker>
            </el-form-item>
            <!--<span  v-if="roleCode==='serviceCenter'">-->
                <!--<el-checkbox v-model="checkedAll">全部</el-checkbox>-->
            <!--</span>-->
            <el-form-item>
                <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
                <el-button type="warning" size="small" @click="reset()">重置</el-button>
            </el-form-item>
        </el-form>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe @select="handleSelect"
          @sort-change="sortChang"
          ref="multipleTable"
        >
          <el-table-column type="selection" width="40" align="center"></el-table-column>
          <!--<el-table-column type="index" width="50" header-align="left" align="center" label="序号"></el-table-column>-->
          <el-table-column label="采购单号" width="75" prop="purchaseCode" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.purchaseCode }}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品名" min-width="180" prop="ooi.BAK_PRODUCT_NAME" sortable="custom" >
            <template slot-scope="scope" class="drugMessage">
              <ul class="ico-zt">
                <div>
                  <li class="text-inline" :title="scope.row.bakProductName" >{{ scope.row.bakProductName }}</li>
                </div>
                <div class="text-inline"> {{ scope.row.bakMedicalMode }}<span v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName != '' && scope.row.bakTradeName != null ">({{ scope.row.bakTradeName }})</span></div>
              </ul>
            </template>
          </el-table-column>
          <el-table-column label="生产企业" width="100" prop="item.bak_Factory_Easy" sortable="custom">
            <template slot-scope="scope">
              {{ scope.row.bakFactoryEasy }}
            </template>
          </el-table-column>
          <el-table-column label="配送企业" width="100" prop="senderEasy" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.bakSenderEasy }}</span>
            </template>
          </el-table-column>
          <el-table-column label="医疗机构" show-overflow-tooltip prop="buyer_easy" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.buyerEasy }}</span>
            </template>
          </el-table-column>

          <el-table-column label="药库"  v-if="repositoryFlag" prop="item.REPOSITORY_NAME" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.repositoryName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="单价" sortable width="70" header-align="left" align="right" prop="item.unit_Price" sortable="custom">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.unitPrice) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="批号" sortable align="center" prop="r.lot_no" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.lotNo }}</span>
            </template>
          </el-table-column>
          <el-table-column label="到货时间" width="100" prop="r.receive_date" sortable="custom" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.receiveDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="可退数量" sortable prop="return_qty" sortable="custom" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.returnQty }}</span>
            </template>
          </el-table-column>
          <el-table-column label="退货数量" sortable align="right" >
            <template slot-scope="scope">
              <span><el-input size="mini" v-model="scope.row.returnSaveQty"  @focus="handleEdit(scope.row)"></el-input></span>
            </template>
          </el-table-column>
          <el-table-column label="退货原因">
            <template slot-scope="scope">
              <span><el-input size="mini" v-model="scope.row.remarks"></el-input></span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <div class="operates">
                <a href="javascript:void(0)" @click="handleGoShow(scope.row.id)" >详情</a>
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
          <el-button type="primary" size="small" @click="confirmReturn()">确认退货</el-button>
          <el-button size="small" class="el-button-pale" @click="goBack()" >返回</el-button>
        </div>
      </div>

      <el-dialog top="2vh" :visible.sync="showForm" :before-close="handleClose" custom-class="w50">
        <div style="width: 500px">
          <el-form ref="form" :model="this.form" label-width="100px">
            <el-form-item label="产品名：">
              {{this.form.bakProductName}}
            </el-form-item>
            <el-form-item label="商品名：">
              {{this.form.bakTradeName}}
            </el-form-item>
            <el-form-item label="规格包装：">
              {{this.form.bakProductSpec}}
            </el-form-item>
            <el-form-item label="剂型：">
              {{this.form.bakMedicalMode}}
            </el-form-item>
            <el-form-item label="有效期：">
              {{this.form.invoiceExpireDate}}
            </el-form-item>
            <el-form-item label="销售发批号：">
              {{this.form.lotNo}}
            </el-form-item>
            <el-form-item label="采购单号：">
              {{this.form.purchaseCode}}
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose" size="small">关闭</el-button>
        </span>
      </el-dialog>


    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入数据请求
  import {chooseNewList,findNewReturnDetails,saveConfirm,getRepositoryFlag} from 'src/axios/trade/senderRole/waitVerifyList'
  import {isNumber} from "src/utils/validateUtil";
  import {priceFormat,keyBoardEnter} from "src/utils";
  export default {
    name:'based-city-snder-list',
    data () {
      return {
        currentOrder: undefined,
        returnSaveQty: undefined,
        remarks: undefined,
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        repositoryFlag:false,
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        dataList: [],
        form:{
          bakProductName:'',
          bakTradeName:'',
          bakProductSpec:'',
          bakMedicalMode:'',
          orderCode:'',
          invoiceExpireDate:'',
          lotNo:''
        },
        checkedAll:false,
        roleCode:''
      }

    },
    created () {
      this.list()
    },
    methods: {
      priceFormat,
      // -------------------------------------------- 数据初始化  -----------------------------------------
      sortChang(value){
        let sortType=" desc";
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
            list: []
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
            ids: undefined,
            keys: undefined,
            bakFactoryEasy: undefined,
            buyerName: undefined,
            bakProductName: undefined,
            lotNo: undefined,
            orderCode: undefined,
            createBenDate: undefined,
            createEenDate: undefined,
            purchaseCode:undefined,
            dataFlag:undefined,
            senderName:undefined
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
        let dataFlag;
        if(this.checkedAll==false){
          this.dataFlag = '';
        }
        else{
          this.dataFlag = "1";
        }
        this.query.dataFlag=this.dataFlag;
        this.resData.orderBy=this.currentOrder;
        chooseNewList(this.resData, this.query).then(res => {
          this.resData = res.data;
          if(this.resData.pageNum===0){
            this.resData.pageNum=1
          }
          if(this.resData.list.length!=='0'){
            this.roleCode=this.resData.list[0].roleCode;
          }
        });
        getRepositoryFlag().then(res=>{
          this.repositoryFlag=res.data;
        });
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
      handleClose(done) {
        this.$refs['form'].resetFields();
        this.toggleForm();
      },
      toggleForm() {
        this.showForm = !this.showForm
      },
      // 打开退货详情页面
      handleGoShow (id) {
        findNewReturnDetails(id).then(res => {
          this.showForm = true;
          this.form = res.data;
        })
      },
      reset(){
        this.query = this.metaQuery();
        this.list();
      },
      //确认退货

      confirmReturn(){
        if(this.dataList.length<1){
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false;
        }
        if(null == this.dataList[0].returnSaveQty ){
          this.$alert('请输入退货数量', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false;
        }

        else{
//          for (var noticeType1 of this.dataList) {
          for(var i=0;i<this.dataList.length;i++){
            if (this.dataList[i].returnSaveQty) {
              if (!isNumber(this.dataList[i].returnSaveQty)) {
                this.$message({
                  message: '请正确输入到货数量!',
                  type: 'warning'
                });
                return false;
              }
            }
            if (this.dataList[i].returnSaveQty == 0) {
              this.$message({
                message: '数量列请输入大于零的数!',
                type: 'warning'
              });
              return false;
              this.dataList[i].returnSaveQty.focus();
              return false;
            }
            if (parseFloat(this.dataList[i].returnSaveQty) > parseFloat(this.dataList[i].returnQty)) {
              var a = i+ 1;
              this.$message({
                message: '第'+ a + "行实退数已大于可退数，请重新填写！",
                type: 'warning'
              });
              return false;
            }
          }
          var idList='';
          var returnQtyList='';
          var returnReasonList='';

          for(var noticeType of this.dataList){
            idList += (noticeType.id + ',');
            returnQtyList += (noticeType.returnSaveQty + ',');
            if(noticeType.remarks == undefined){
              noticeType.remarks = '';
            }
            returnReasonList += (noticeType.remarks + ',');
          }
          idList=idList.slice(0, -1);
          returnQtyList=returnQtyList.slice(0, -1);
          returnReasonList=returnReasonList.slice(0, -1);
          this.query.ids=idList;
          this.query.returnSaveQty=returnQtyList;
          this.query.remarks=returnReasonList;
          this.query.keys=idList;
          saveConfirm(this.query).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.goBack()
              }
            })
          })
        }
      },
      handleSelect(val) {
        this.dataList = val;
      },
      //表格内编辑
      handleEdit(row) {
        let flag = true;
        this.dataList.some((item) => {
          if (item.id === row.id) {
            flag = false;
          }
        })
        if (flag) {
          this.$refs.multipleTable.toggleRowSelection(row, true);
          this.dataList.push(row);
        }
      },
      goBack(){
        this.$router.go(-1);
      },
      handleGoAdd(){}
    }
  }
</script>

