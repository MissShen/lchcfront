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
          @selection-change="handleSelectionChange"
          @sort-change="sortChange">
          <el-table-column type="selection" width="50" :selectable="selectable"></el-table-column>
          <el-table-column label="通用名" prop="name_Chn" sortable="custom" width="150" :show-overflow-tooltip="true">
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
<!--          <el-table-column label="参考价" prop="min_Price" sortable="custom" width="80" align="right" header-align="left">
            <template slot-scope="scope">
              &lt;!&ndash;<el-tooltip effect="dark"  placement="top">
                <div slot="content">{{referencePrice(scope.row.minPrice,scope.row.orgName,scope.row.bjPrice,scope.row.hbPrice,scope.row.tjPrice)}}</div>
                <span>{{priceFormat(scope.row.minPrice)}}</span>
              </el-tooltip>&ndash;&gt;
              <span>{{priceFormat(scope.row.minPrice)}}</span>
            </template>
          </el-table-column>-->
          <el-table-column label="企业报价" prop="referencePrice" sortable="custom" width="90" align="right" header-align="left" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.referencePrice) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="降后价格" prop="markdown_Price" sortable="custom" width="90" align="right" header-align="left" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.markdownPrice) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="执行时间" prop="executeDate" sortable="custom" whith="90"  :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <el-tooltip :enterable="false" class="item" effect="dark" placement="top-start">
                <div slot="content">{{scope.row.executeDate}}</div>
                <span v-if="scope.row.executeDate!=null && scope.row.executeDate!=''">{{ moment(scope.row.executeDate).format("YYYY-MM-DD") }}</span>
                <span v-else></span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="发起时间" prop="createDated" sortable="custom" whith="90" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <el-tooltip :enterable="false" class="item" effect="dark" placement="top-start">
                <div slot="content">{{scope.row.createDated}}</div>
                <span v-if="scope.row.createDated!=null && scope.row.createDated!=''">{{ moment(scope.row.createDated).format("YYYY-MM-DD") }}</span>
                <span v-else></span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="是否降价" prop="flag" sortable="custom">
            <template slot-scope="scope">
              <span v-if="scope.row.flag == '1'">已降价</span>
              <span v-else>未降价</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" whith="100">
            <template slot-scope="scope">
                 <a class="operation-btn" type="text" size="small" v-if="ifBargainFlag(scope.row.flag,scope.row.executeFlag)" @click="confirmPriceReductionForm(scope.row)">确认降价</a>
              <!--采购目录-->
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 表格分页 -->
      <div class="pagebox">
        <span class="flo-left">
          <el-button  size="small" type="primary" @click="confirmPriceReduction()">确认降价</el-button>
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
      <div class="foot-btn">
<!--        <div class="foot-left"><el-button type="primary" size="small" @click="intoReducedPrice()">发起议价</el-button></div>-->
        <div class="foot-left"><el-button type="primary" size="small" @click="addProductPriceReduction()">新增产品降价更新</el-button></div>
      </div>

      <!-- 进入降价产品列表 -->
      <intoReducedPrice-View v-if="intoReducedPriceViewVisible" ref="intoReducedPriceView"></intoReducedPrice-View>

    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求  引自js文件
  import {manufactureLowerPriceList} from 'src/axios/contract/bargainmanagement/manufacturelowerprice/manufactureLowerPriceList'
  import {priceFormat} from "src/utils"
  import { keyBoardEnter } from "src/utils"

  //引入子页面
  import intoReducedPriceView from 'src/pages/contract/bargainmanagement/bargainquote/reducedPriceList';
  import moment from 'moment'
  import {insertBargainPriceReduction} from 'src/axios/contract/bargainmanagement/manufacturelowerprice/manufactureLowerPriceList'


  export default {

    components: {
      moment,
      intoReducedPriceView
    },
    data () {
      return {
        currentOrder:undefined, //分页的时候缓存
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        intoReducedPriceViewVisible : false,
        modalId : [],
        bOrgIds : [],
        multipleSelection: [],//多选checkbox的数据
      }
    },
    created () {
      this.list()
    },
    methods: {
      moment,
      // -------------------------------------------- 数据初始化  -----------------------------------------
      priceFormat,
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
      // ------------------------------------------------- 处理方法 ----------------------------------------
/*      //打开降价列表
      intoReducedPrice(){
        this.intoReducedPriceViewVisible = true;
        this.$nextTick(() => {
          this.$refs.intoReducedPriceView.fillData();
        });
      },*/

      addProductPriceReduction(){
        this.$router.push("/CONTRACT/registrationAndDeclaration/bargainManagementAddProductPriceReduction");
      },
      //重置表单
      resetForm(){
        this.query = this.metaQuery();
        this.list();
      },
      ifBargainFlag(value,executeFlag){
            if(value == '0' && executeFlag =='2'){
              return true;
            }else{
              return false;
            }
      },
      //判断多选框是否可以勾选
      selectable(row,index) {
        if(row.flag>0 || row.executeFlag == '1'){
          return false;
        }else{
          return true;
        }
      },
      //多选框改变状态
      handleSelectionChange(val) {
        console.log(val);
        this.multipleSelection = val;
      },
      //单条确认降价
      confirmPriceReductionForm(dataFrom){
        let productIds = [];
        let bOrgIds = [];
        productIds.push(dataFrom.productId);
        bOrgIds.push(dataFrom.id);
        this.modalId = productIds;
        this.bOrgIds = bOrgIds;
        this.confirm();
      },
      //批量确认降价
      confirmPriceReduction(){
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
        let bId = [];
        for(let i= 0;i<this.multipleSelection.length;i++){
          bId.push(this.multipleSelection[i].id)
        }
        this.bOrgIds = bId;
        this.modalId = productIds;
        this.confirm();
      },
      confirm(){
        console.log('productId：',this.modalId+"--"+"productIds"+this.bOrgIds);
        this.$confirm(`保存后已选择的产品将对所有关联此产品的医院发起主动降价，确认保存？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          insertBargainPriceReduction(this.bOrgIds,this.modalId).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.list()
              }
            })
          })
          console.log("---------------------------华丽的分割线--------------------------------");
        })
      },
      //参考价
      referencePrice(minPrice,orgName,bjPrice,hbPrice,tjPrice){

        if(minPrice == ""||minPrice == null){
          return "空";
        }else {
          if(orgName=="医管局"){
            return  "全国最低价:"+this.priceFormat(minPrice);
          }else{
            return "河北最低价:"+((hbPrice!=null && hbPrice!='')?this.priceFormat(hbPrice):'无')+","+"天津最低价:"+((tjPrice!=null && tjPrice!='')?this.priceFormat(tjPrice):'无')+","+"北京最低价:"+((bjPrice!=null && bjPrice!='')?this.priceFormat(bjPrice):'无');
          }
        }
      },
      //  获取用户分页列表
      list () {
        this.resData.orderBy = this.currentOrder;
        manufactureLowerPriceList(this.resData, this.query).then(res => {
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

