<template>
  <div>
  <el-dialog
    title="查看配送企业"
    :close-on-click-modal="false"
    :visible.sync="visible" width="80%"
    :key = myKey
    :before-close="closeDialog"
  >
  <div class="tab-box">
    <!-- ========================== 主内容start========================= -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="已选配送" name="joined">
        <selected-view @closeDialog="closeDialog" ref="unselectedView" :product-id="productId" :deal-price="dealPrice" v-on:showComplainedTable_unselected="showComplainedTable_selected($event)" v-on:refreshbizlines_unselected="subFun_unselected($event)"></selected-view>
      </el-tab-pane>
      <el-tab-pane label="可选配送" name="alternative">
        <unselected-view @closeDialog="closeDialog" ref="selectedView"  :product-id="productId" v-on:showComplainedTable_selected="showComplainedTable_selected($event)" v-on:refreshbizlines_selected="subFun_selected($event)"></unselected-view>
      </el-tab-pane>

    </el-tabs>
    <!-- ========================== 主内容end ========================= -->
    <div slot="footer" class="dialog-footer" align="right">
      <el-button @click="closeDialog()" size="small">关闭</el-button>
    </div>
  </div>
  </el-dialog>

    <!--
    点击不良记录 的弹出框，如果放到子页面dialog 套dialog 弹出层会有问题，所以放到父页面(此乃不用vuex之祸也,今后谁维护此页面别骂我,我也是被逼的)
    -->
    <!--不良记录table-->
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
  </div>
</template>
<script>

  // 引入tab的页面组件
  import unselectedView from 'src/pages/contract/sender/hospitalSelectProductSender/hospitalSelectProductSender-unselected'
  import selectedView from 'src/pages/contract/sender/hospitalSelectProductSender/hospitalSelectProductSender-selected'
  import {complainedDetailsHttp,complainedTableQueryHttp} from 'src/axios/contract/sender/hospitalSelectSender'
  import moment from "moment";

  export default {
    name: 'hospitalSelectProductSender',
    components: {
      selectedView,
      unselectedView
    },
    data() {
      return {
        activeName: 'joined',
        visible : false,
        productId : undefined,
        dealPrice: undefined,
        selectedVisible : false,
        unselectedVisible : false,
        myKey:"",

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
      };
    },

    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      moment,
      //  Start 接口结果集
      metaData() {
        return {
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
          showback:false,
        }
      },
      //实现基本思路：
      // 当第一个组件删除数据的时候 会通过：this.$emit("refreshbizlines_selected","");调用该父组件的 subFun_selected方法
      //subFun_selected方法中又通过this.$refs.unselectedView .refreshList(); 调用第二个子组件的refreshList方法去刷新第二个组件中的数据
      //这就是不用vuex的坏处。

      //父组件控制第一个子组件的函数
      selectedRefresh(){
        this.$refs.selectedView.refreshList();
      },
      //父组件控制第二个子组件的函数
      unselectedRefresh(){
        this.$refs.unselectedView.refreshList();
      },

      //第一个子组件控制父组件的函数
      subFun_selected(data){
        //可选配送企业
        this.unselectedRefresh();
      },
      //第二个子组件控制父组件的函数
      subFun_unselected(data){
        //刷新已选配送企业列表
        this.selectedRefresh();
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



      fillData(productId,dealPrice,type) {
        this.visible = true;
        this.productId = productId;
        this.dealPrice = dealPrice;
        this.selectedVisible = true;
        this.unselectedVisible = true;
        this.showback = type;
        this.myKey = new Date().toString();
        if(type){
          this.showback = true;
        }
      },
      closeDialog(){
        this.visible = false;
        this.$parent.list();
        this.$nextTick(() => {
          this.$refs.unselectedView.resetForm();
        });
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      // 分页************************
      handleSizeChange3 (val) {
        this.complainedTableQuery.pageSize = val
        this.complainedTableList()
      },
      handleCurrentChange3 (val) {
        this.complainedTableQuery.pageNum = val
        this.complainedTableList()
      },
    }
  }
</script>
