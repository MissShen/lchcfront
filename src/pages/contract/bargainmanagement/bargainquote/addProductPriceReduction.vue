<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" size="small" :inline="true" class="table-form">
        <el-form-item>
          <el-input size="small" v-model="query.productName" maxlength="200" placeholder="通用名" @keyup.enter.native="searchEnterFun"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input size="small" v-model="query.doseageFormName" maxlength="50" placeholder="剂型" @keyup.enter.native="searchEnterFun"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input size="small" v-model="query.spec" maxlength="100" placeholder="规格" @keyup.enter.native="searchEnterFun"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
          <el-button type="warning" size="small" @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe
          @sort-change="sortChange">
          <el-table-column label="通用名" prop="nameChn" sortable="custom" width="150" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.nameChn }}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品名称" prop="productName" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.productName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品名" prop="tradeName" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.tradeName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="剂型" prop="doseageFormName" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.doseageFormName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="规格" prop="spec" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.spec }}</span>
            </template>
          </el-table-column>
          <el-table-column label="转换比" prop="standRate" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.standRate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="单位" prop="specUnit" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.specUnit }}</span>
            </template>
          </el-table-column>
          <el-table-column label="包材" prop="wrapName" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.wrapName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="生产企业" prop="manufactureName" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.manufactureName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="价格" prop="bidPrice" sortable="custom" width="90" align="right" header-align="left" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.bidPrice) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <div v-if="scope.row.bargainFlag == '0'">
                <span class="flo-left">执行中</span>
              </div>
              <div class="operates">
                <span class="flo-left"><a href="javascript:;" class="blue-bord" @click="openPriceReduction(scope.row)">申请</a></span>
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
        <!--        <div class="foot-left"><el-button type="primary" size="small" @click="intoReducedPrice()">发起议价</el-button></div>-->
        <div class="foot-left"><el-button type="primary" size="small" @click="addProductPriceReduction()">返回</el-button></div>
      </div>

      <el-dialog title="降价信息" :visible.sync="priceReductionView"  width="30%" @close="closePriceReduction()">
        <el-form ref="priceReductionFrom" :rules="rules" :model="priceReductionFrom">
          <el-form-item prop="lastPrice">
            请输入价格 <span class="red">(降价价格必须小于成交参考价)</span>
            <el-input v-model="priceReductionFrom.lastPrice" size="small"></el-input>
          </el-form-item>
          <el-form-item prop="executeDate">
            执行时间 ：
            <el-date-picker class="w100"
              v-model="priceReductionFrom.executeDate"
              :picker-options="pickerOptions"
              type="date"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="explain">
            请输入备注 ：
            <el-input type="textarea" v-model="priceReductionFrom.explain" class="w100"></el-input>
          </el-form-item>

          <!--</div>-->
        </el-form>
        <span slot="footer">
          <el-button @click="closePriceReduction()" class="el-button-pale" size="small">取消</el-button>
          <el-button type="primary" @click="savePriceReduction()" size="small">发送</el-button>
        </span>
      </el-dialog>

    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求  引自js文件
  import {queryLowerPriceList,insertPriceReductionHttp} from 'src/axios/contract/bargainmanagement/manufacturelowerprice/manufactureLowerPriceList'
  import {priceFormat} from "src/utils"
  import { keyBoardEnter } from "src/utils"

  //引入子页面
  import moment from 'moment'

  export default {

    components: {
      moment,
    },
    data () {
      return {
        currentOrder:undefined, //分页的时候缓存
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        priceReductionView : false,
        priceReductionFrom :  this.priceReductionDate(),
        rules: this.metaRule(),  // 表单验证初始化
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
      }
    },
    created () {
      this.list()
    },
    methods: {
      moment,
      // -------------------------------------------- 数据初始化  -----------------------------------------
      priceFormat,
      metaRule (){
        var priceRule = function(rule, value, callback) {
          let regExp = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
          if(value!=""){
            if (regExp.test(value) === false) {
              callback(new Error('只能填写非零非负数的两位小数'));
            } else {
              callback();
            }
          }else{
            callback(new Error('价格不能为空、请填写价格'));
          }
        }

        var executeRule = function(rule, value, callback) {
          if(value==undefined){
            callback(new Error('执行时间不能为空'));
          }else{
            callback();
          }
        }

        var explainRule = function (rule , value ,callback){
          if(value!=undefined && value!=""){
            callback();
          }else{
            callback(new Error('备注不能为空'));
          }
        }
        return {
          lastPrice :{required:true,validator: priceRule, trigger: 'submit'},
          executeDate : {validator: executeRule, trigger: 'submit'},
          explain: {required:true,validator: explainRule, trigger: 'submit'}
        }
      },
      metaData () {
        return {
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
          query: {
            productName : undefined,
            doseageFormName : undefined,
            spec :undefined
          }
        }
      },
      priceReductionDate(){
        return {
          productId : undefined,
          lastPrice : undefined,
          explain : undefined,
          executeDate : undefined
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      openPriceReduction(value){
        this.priceReductionFrom.bidPrice = value.bidPrice;
        this.priceReductionFrom.productId = value.productId;
        this.priceReductionView = true;
      },
      closePriceReduction(){
        this.$refs['priceReductionFrom'].resetFields();
        this.priceReductionFrom.lastPrice = '';
        this.priceReductionFrom.executeDate = undefined;
        this.priceReductionFrom.explain = '';
        this.priceReductionView = false;
      },
      addProductPriceReduction(){
        this.$router.push("/CONTRACT/registrationAndDeclaration/bargainManagementManufactureLowerPrice");
      },
      savePriceReduction(){
        this.$refs['priceReductionFrom'].validate((valid) => {
          if (valid) {
        insertPriceReductionHttp(this.priceReductionFrom).then(res=>{
            this.$message({
              type : res.success == true ? "success" : "error",
              message: res.success == true ? res.data : res.message
            })
          if(res.success == true){
            this.closePriceReduction();
            this.list();
          }
        })
          }
        })
      },
      //重置表单
      resetForm(){
        this.query = this.metaQuery();
        this.list();
      },
      //  获取用户分页列表
      list () {
        this.resData.orderBy = this.currentOrder;
        queryLowerPriceList(this.resData, this.query).then(res => {
          console.log(res)
          this.resData = res.data
          if(this.resData.pageNum === 0){
            this.resData.pageNum =1;
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
      sortChange(value){
        console.log("value: ", value);
        let sortType=" desc"
        if(!!value.order){
          if(value.order.startsWith("asc")){
            sortType=" asc";
          }
          this.currentOrder=value.prop + sortType;
        } else {
          this.currentOrder=undefined;
        }
        this.list();
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e , ()=>{
          this.list();
        })
      },
    }
  }
</script>
