<template>
  <el-dialog
    title="发起主动降价"
    :close-on-click-modal="false"
    :visible.sync="visible" width="80%"
    @close="closeForm()">

    <!-- 表格 -->
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
              <el-button size="small" type="success" @click="searchEnterFun">查询</el-button>
              <el-button size="small" type="warning" @click="resetFrom()">重置</el-button>
            </el-form-item>
        </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          @selection-change="handleSelectionChange"
          @sort-change="sortChange">
          <el-table-column type="selection" width="50" :selectable="selectable"></el-table-column>
          <el-table-column label="通用名" prop="name_Chn" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.nameChn }}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品名" min-width="150">
            <template slot-scope="scope">
              <div class="text-inline" :title="scope.row.productName">{{ scope.row.productName }}</div>
              <div class="text-inline" :title="scope.row.tradeName">{{ scope.row.doseageFormName }}{{ tradeNameInfo(scope.row.tradeName) }}</div>
            </template>
          </el-table-column>
          <el-table-column label="产品信息" min-width="150">
            <template slot-scope="scope">
              <div class="text-inline"
                   :title="scope.row.spec+'×'+scope.row.standRate+scope.row.smallestUnits+'/'+scope.row.specUnit+wrapNameInfo(scope.row.wrapName)">
                {{ scope.row.spec}} × {{ scope.row.standRate}} {{ scope.row.smallestUnits}} / {{scope.row.specUnit}} {{wrapNameInfo(scope.row.wrapName)}}
              </div>
              <div class="text-inline" :title="scope.row.manufactureName">{{ scope.row.manufactureName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="目录范围" prop="catalog_Area" sortable="custom" width="145" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.catalogArea}}</span>
            </template>
          </el-table-column>
          <el-table-column label="参考价" prop="referencePrice" sortable="custom" align="right" header-align="left">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.referencePrice) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="降价前价格" prop="before_Price" sortable="custom" whith="110" align="right" header-align="left" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.beforePrice) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="降价后价格" prop="last_Price" sortable="custom" whith="110" align="right" header-align="left" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.lastPrice) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" whith="100" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <a class="operation-btn" type="text" size="small" v-if="reducedPriceForm(scope.row.isNegotiate)" @click="showReducedPriceForm(scope.row)">确认议价</a>
              <!--采购目录-->
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 表格分页 -->
      <div class="pagebox">
        <span class="flo-left">
          <el-button  size="small" type="primary" @click="showReducedPriceView()">确认议价</el-button>
        </span>
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

    <!-- ========================== 主内容end ========================= -->
    <!-- 确认议价弹框 -->
    <addReduced-Price v-on:closeFrom="resetFrom($event)" v-if="addReducedPriceView" ref="addReducedPrice"></addReduced-Price>

    <span slot="footer">
      <el-button @click="closeForm()" size="small">关闭</el-button>
    </span>

  </el-dialog>




</template>
<script>

  // 引入用户相关请求  引自js文件
  import {queryReducedPriceList} from 'src/axios/contract/bargainmanagement/manufacturelowerprice/manufactureLowerPriceList'
  import {priceFormat} from "src/utils"

  //引入子页面
  import addReducedPrice from 'src/pages/contract/bargainmanagement/bargainquote/addReducedPrice';
  import { keyBoardEnter } from "src/utils"

  export default {
    components: {
      addReducedPrice
    },
    data () {
      return {
        currentOrder:undefined, //分页的时候缓存
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        multipleSelection: [],//多选checkbox的数据
        showAlternativeReducedPrice :false,
        AlternativeReducedPriceText:{executeDate:undefined},//弹出框的值
        addReducedPriceView : false,
        visible: false,
        modalId : [],
        upIds : []
      }
    },
    created () {
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      priceFormat,
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
          query: {
            productName : undefined,
            doseageFormName : undefined,
            spec :undefined
          }
        }
      },
      fillData() {
        this.visible = true;
        this.query = this.metaQuery();
        this.list();
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  关闭弹窗
      closeForm(){
        this.visible = false;
        this.$parent.list();
      },
      //多选框改变状态
      handleSelectionChange(val) {
        console.log(val);
        this.multipleSelection = val;
      },
      //降价表单展示
      reducedPriceForm(isNegotiate){
          if(isNegotiate>0){
            return false;
          }
            return true;
      },
      //确认降价
      showReducedPriceForm(row){

        let productIds = [];
        let upId = [];
        productIds.push(row.productId);
        upId.push(row.upId);
        this.modalId = productIds;
        this.upIds = upId;

        this.addReducedPriceView = true;
        this.$nextTick(() => {
          this.$refs.addReducedPrice.fillData(this.modalId,this.upIds);
        });
      },
      //批量加入窗口弹出
      showReducedPriceView(){
        if(this.multipleSelection.length<1){
          this.$message({
            message: '请先选择产品！',
            type: 'warning'
          });
          return
        }
        let productIds = [];
        for(let i= 0;i<this.multipleSelection.length;i++){
          productIds.push(this.multipleSelection[i].productId)
        }
        let upId = [];
        for(let i= 0;i<this.multipleSelection.length;i++){
          upId.push(this.multipleSelection[i].upId)
        }
        this.upIds = upId;
        this.modalId = productIds;
        this.addReducedPriceView = true;
        this.$nextTick(() => {
          this.$refs.addReducedPrice.fillData(this.modalId,this.upIds);
        });
      },
      //判断多选框是否可以勾选
      //如果加入了降价表 那么不可选
      selectable(row,index) {
        if(row.isNegotiate>0){
          return false;
        }else{
          return true;
        }
      },
      resetFrom(value){
        console.log(value);
        this.query = this.metaQuery();
        this.list();
      },
      //  获取用户分页列表
      list () {
        this.resData.orderBy = this.currentOrder;
        queryReducedPriceList(this.resData, this.query).then(res => {
          console.log(res)
          this.resData = res.data
          if(this.resData.pageNum === 0){
            this.resData.pageNum =1;
          }
        })
      },
      tradeNameInfo(tradeName){
        if (tradeName!=null && tradeName!='无' && tradeName!=''){
          return '(商品名：'+tradeName+')';
        }
        return '';
      },
      wrapNameInfo(wrapName){
        if (wrapName!=null && wrapName!='空' && wrapName!=''){
          return '('+wrapName+')';
        }
        return '';
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

