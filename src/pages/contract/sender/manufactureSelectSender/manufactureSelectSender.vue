<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
        <el-form ref="query" :model="query" size="small" :inline="true" class="table-form" onsubmit="return false;">
            <el-form-item>
              <el-input v-model="query.productName"
                        maxlength="200" placeholder="品名" size="small" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
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
          <el-table-column align="center"
                           type="selection"
                           width="40">
          </el-table-column>
          <el-table-column label="通用名" min-width="150" prop="NAME_CHN" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.nameChn }}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品名" min-width="150">
            <template slot-scope="scope">
              <div class="text-inline">{{ scope.row.productName }}</div>
              <div class="text-inline">(商品名：{{ scope.row.tradeName }})</div>
            </template>
          </el-table-column>
          <el-table-column label="产品信息" min-width="200">
            <template slot-scope="scope">
              <div class="pro-details text-inline"
                   :title="scope.row.spec+'×'+scope.row.standRate+scope.row.smallestUnits+'/'+scope.row.specUnit+'('+scope.row.wrapName+')'+'('+scope.row.doseageFormName+')'">
                {{ scope.row.spec}} × {{ scope.row.standRate}} {{ scope.row.smallestUnits}} / {{scope.row.specUnit}} ({{scope.row.wrapName}}) ({{ scope.row.doseageFormName }})
              </div>
              <div class="pro-details text-inline" :title="scope.row.manufactureName">{{ scope.row.manufactureName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="两票制" prop="twoVoteId" sortable="custom" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.twoVoteId == null" style="color:red">未签订</span>
              <span v-if="scope.row.twoVoteId != null">已签订</span>
            </template>
          </el-table-column>
          <el-table-column label="配送企业数量" prop="senderNum" sortable="senderNum" width="130" align="right" header-align="left">
            <template slot-scope="scope">
              <span>{{ scope.row.senderNum }}</span>
            </template>
          </el-table-column>
          <el-table-column label="目录范围" prop="CATALOG_AREA" sortable="catalogArea" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.catalogArea }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="130">
            <template slot-scope="scope">
              <div v-if="scope.row.disableProductId != null && scope.row.disableProductId != ''">
                <el-tooltip class="item" effect="dark" placement="top">
                  <div slot="content" v-html="scope.row.comments"></div>
                  <span style="color: #FF0000">已禁用</span>
                </el-tooltip>
              </div>
              <div class="operates" v-if="scope.row.disableProductId == null || scope.row.disableProductId == ''">
                <a class="flo-left green" type="text" size="small" @click="openMainPage(scope.row.productId)">选择配送企业</a>
                <a class="flo-left green" type="text" size="small" @click="selectedSender(scope.row.productId)">查看已选配送企业</a>
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
          <span><el-button type="warning" size="small" @click="openAllSenderPage()">查看所有配送企业</el-button></span>
          <span><el-button type="warning" size="small" @click="openMainPageForBatch()">选择配送企业</el-button></span>
          <!--<span><el-button type="warning" size="small" @click=openMainPageForBatch()>预生成</el-button></span>-->
        </div>
      </div>
      <!-- 已选配送列表 -->
      <!--<main-view v-if="mainViewVisible" :parent-id="this.productId" ref="mainView"></main-view>-->


      <el-dialog
        title="查看已选配送企业"
        :close-on-click-modal="false"
        :visible.sync="selectedVisible" width="80%">
        <selectedSender ref="selectedVisible" v-on:visible_selected="visible_selected($event)" v-on:refreshFather="refresh($event)" v-on:showComplainedTable_selected="showComplainedTable_selected($event)"></selectedSender>
        <span slot="footer" class="dialog-footer">
        <el-button @click="visible_selected()" size="small">关闭</el-button>
      </span>
      </el-dialog>
      <!--查看已选配送企业 不良记录的弹框，写在这里是因为不能dialog 套dialog   begin-->
      <el-dialog title="不良记录" :visible.sync="showComplainedTable" :before-close="closeForm" width="60%">
        <el-table
          :data="complainedTableQuery.list"
          style="width: 100%"
          max-height="200"
          border
          stripe>

          <el-table-column label="投诉编号">
            <template slot-scope="scope">
              <span>{{ scope.row.code }}</span>
            </template>
          </el-table-column>
          <el-table-column label="被投诉企业" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.beComplainedOrgname }}</span>
            </template>
          </el-table-column>
          <el-table-column label="买方机构" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.createdByOrgname }}</span>
            </template>
          </el-table-column>
          <el-table-column label="投诉时间">
            <template slot-scope="scope">
              <el-tooltip :enterable="false" class="item" effect="dark" placement="top-start">
                <div slot="content">{{ scope.row.createdAt }}</div>
                <span v-if="scope.row.createdAt!=null && scope.row.createdAt!=''">{{ moment(scope.row.createdAt).format("YYYY-MM-DD") }}</span>
                <span v-else></span>
              </el-tooltip>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="220">
            <template slot-scope="scope">
              <a class="operation-btn" @click="complainedDetails(scope.row.reasonTypeId)">详情</a>
            </template>
          </el-table-column>
        </el-table>
        <!-- 表格分页 -->
        <div class="pagebox">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange3"
            @current-change="handleCurrentChange3"
            :page-sizes="[10, 20, 30]"
            :total="complainedTableQuery.total"
            :page-size="complainedTableQuery.pageSize"
            :page-count="complainedTableQuery.pages"
            :current-page.sync="complainedTableQuery.pageNum">
          </el-pagination>
        </div>
      </el-dialog>
      <!--投诉详情-->
      <el-dialog title="投诉详情" :visible.sync="showComplainedDetails" :before-close="closeComplainedDetails" width="50%">
        <div v-model="complainedDetailsData">
          <el-row>
            <el-col :span="4" style="text-align: center">投诉对象:</el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light">{{complainedDetailsData.name}}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="4" style="text-align: center">投诉原因:</el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light">{{complainedDetailsData.reason}}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="4" style="text-align: center">投诉说明:</el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light">{{complainedDetailsData.instructions}}</div></el-col>
          </el-row>
        </div>
      </el-dialog>
      <!--查看已选配送企业 不良记录的弹框，写在这里是因为不能dialog 套dialog   end-->
    </div>
  </div>
</template>
<script>

  import mainView from 'src/pages/contract/sender/manufactureSelectSender/manufactureSelectSender-main';
  import selectedSender from 'src/pages/contract/sender/manufactureSelectSender/manufactureSelectSender-selected';
  import { keyBoardEnter } from "src/utils"


  // 引入用户相关请求
  import {queryFactorySenderRelationList} from 'src/axios/contract/sender/manufactureSelectSender'
  import {complainedDetailsHttp,complainedTableQueryHttp} from 'src/axios/contract/sender/hospitalSelectSender'
  import moment from "moment";

  export default {
    components: {
      mainView: mainView,
      selectedSender:selectedSender
    },
    data() {
      return {
        currentOrder: undefined,
        resData: this.metaData(),
        form: this.metaForm(), // 表单初始化
        query: this.metaQuery(), // 查询初始化
        roleTree: [], // 角色分配树节点
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        mainViewVisible: false,
        multipleSelection:[],//多选checkbox的数据

        selectedVisible:false,//查看已选配送企业 显示

        //---------------不良记录所用的状态--------
        ////不良记录配送ID
        complainedSenderId:"",
        //不良记录弹出框状态
        showComplainedTable:false,
        //不良记录列表
        complainedTableQuery:this.metaData(),

        //不良记录详情显示状态
        showComplainedDetails:false,
        complainedDetailsData:{
          name:"",//投诉对象
          Instructions:"",//投诉说明
          reason:""//投诉原因
        },
      }
    },
    created() {
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      moment,
      metaData() {
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
            list: undefined
        }
      },
      metaForm() { // 表单数据初始化
        return {
          /*   form: {*/
          id: undefined,
          userCode: undefined,
          userName: undefined,
          password: '',
          pwd2: undefined,
          orgName: "1",
          orgId: "1",
          modifyId: "1",
          mobile: undefined,
          telephone: undefined,
          enableFlag: "1",
          userCaKey: "1",
          createId: "1",
          createName: "1",
          createDate: "1",
          modifyName: "1",
          modifyDate: "1",
          remark: undefined

          /* }*/
        }
      },
      metaQuery() { // 表单查询数据初始化
        return {
          query: {
            productName: undefined
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list() {
        this.resData.orderBy = this.currentOrder;
        queryFactorySenderRelationList(this.resData, this.query).then(res => {
          this.resData = res.data
          if(this.resData.pageNum == 0){
            this.resData.pageNum = 1
          }
        })
      },
      //多选框改变状态
      handleSelectionChange(val) {
        let productId = [];
        for(let i = 0; i < val.length; i++) {
          productId.push(val[i].productId);
        }
        this.multipleSelection = productId;
      },
      //点击选择企业配送
      openMainPage(productId) {
        /*this.productId = productId;// 传递Id
        this.mainViewVisible = true;
        console.log(productId);
        this.$nextTick(() => {
          this.$refs.mainView.fillData(productId);
        });*/
        //this.$router.push("/contract/sender/factoryChooseSender/"+productId);

        // this.$router.push({name:'factoryChooseSender',params:{productId:productId}});
        this.$router.push("/contract/contractmanagement/factoryChooseSender/" + productId);
      },
      //查看已选配送企业
      selectedSender(productId){
        //this.productId = productId;// 传递Id
       this.selectedVisible = true;
       this.$nextTick(() => {
         this.$refs.selectedVisible.fillData(productId);
       });
      },
      //点击  批量  选择企业配送
      openMainPageForBatch() {
        // lyf router 跳转
        //this.$router.push("/contract/sender/factoryChooseSender/"+this.multipleSelection.toString());

        if(this.multipleSelection.length == 0){
          this.$message({
            message: '当前未选中任何药品',
            type: 'warning'
          });
          return;
        }
        this.$router.push({name:'factoryChooseSender',params:{productId:this.multipleSelection.toString()}});
      },
      //  打开 所有配送企业 页面
      openAllSenderPage() {
        this.$router.push("/CONTRACT/contractmanagement/senderShowAllSender");
      },
      // 重置用户表单
      resetForm() {
        this.query = this.metaQuery();
        this.list();
      },
      visible_selected(type){
        this.selectedVisible = type;
      },



      //不良记录相关
      //不良记录table
      showComplainedTable_selected(data){
        this.complainedSenderId = data.senderId;
        this.complainedTableList(data);
      },
      //不良记录请求list
      complainedTableList(){
        complainedTableQueryHttp(this.complainedSenderId,this.complainedTableQuery).then(res =>{
          this.complainedTableQuery = res.data;
          this.showComplainedTable = true;
        });
      },

      //不良记录详情弹出
      complainedDetails(reasonTypeId){

        complainedDetailsHttp(reasonTypeId).then(res=>{
          this.complainedDetailsData = res.data;
          this.showComplainedDetails = true;
        })
      },
      //关闭不良详情
      closeComplainedDetails(){
        this.showComplainedDetails = false;
      },
      closeForm(){
        this.showComplainedTable = false;
      },

      refresh(){
        this.list();
      },

      // ************************
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.list()
      },
      handleSizeChange3 (val) {
        this.complainedTableQuery.pageSize = val
        this.complainedTableList()
      },
      handleCurrentChange3 (val) {
        this.complainedTableQuery.pageNum = val
        this.complainedTableList()
      },
      sortChange(value){
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
      }
    }
  }
</script>

