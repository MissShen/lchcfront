<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">


        <el-form ref="query" :model="query" size="small" :inline="true" class="table-form">
            <el-form-item>
              <el-input v-model="query.senderName" maxlength="200" placeholder="配送企业" size="small" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>

            <el-form-item>
              <el-select v-model="query.contractState" placeholder="合同状态" size="small">
                <el-option-group
                  key="合同状态"
                  label="合同状态">
                  <el-option
                    v-for="item in contractStates"
                    :key="item.contractState"
                    :label="item.name"
                    :value="item.value">
                  </el-option>
                </el-option-group>
              </el-select>
            </el-form-item>

            <el-form-item class="width-150">
              <el-select v-model="query.complainedCount" placeholder="不良记录" size="small">
                <el-option-group
                  key="不良记录"
                  label="不良记录">
                  <el-option
                    v-for="item in records"
                    :key="item.record"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-option-group>
              </el-select>
            </el-form-item>

            <el-form-item class="width-150">
              <el-select v-model="query.serviceState" placeholder="配送评价" size="small">
                <el-option-group
                  key="配送评价"
                  label="配送评价">
                  <el-option
                    v-for="item in serviceStates"
                    :key="item.serviceState"
                    :label="item.name"
                    :value="item.value">
                  </el-option>
                </el-option-group>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
              <el-button type="warning" @click="resetForm()" size="small">重置</el-button>
            </el-form-item>
        </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe
          @sort-change="sortChangeMain">
          <el-table-column label="配送企业" prop="SEND_NAME" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.sendName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="联系人" prop="LINK_PERSON" sortable="custom" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.linkPerson }}</span>
            </template>
          </el-table-column>

          <el-table-column label="联系方式" prop="LINK_PHONE" sortable="custom" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.linkPhone }}</span>
            </template>
          </el-table-column>

          <el-table-column label="不良记录" prop="COMPLAINED_COUNT" sortable="custom">
            <template slot-scope="scope">
              <a @click="complainedTable(scope.row.sendOrgid)" v-if="scope.row.complainedCount >0&&scope.row.complainedCount != null && scope.row.complainedCount != ''">{{ scope.row.complainedCount }}</a>
              <span v-if="scope.row.complainedCount == 0||scope.row.complainedCount == null || scope.row.complainedCount == ''">无不良记录</span>
            </template>
          </el-table-column>

            <el-table-column label="配送评价" prop="SERVICESTATE" sortable="custom" width="135">
            <template slot-scope="scope">
              <span>
                <el-rate
                  v-model= scope.row.serviceState disabled>
                </el-rate>
              </span>
            </template>
          </el-table-column>

          <el-table-column label="合同状态" prop="CON_STATE" sortable="custom" width="100" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.conState == '' || scope.row.conState == null">未签订</span>
              <span v-else-if="scope.row.conState == '0'">待处理</span>
              <span v-else-if="scope.row.conState == '10'">签订中</span>
              <span v-else-if="scope.row.conState == '20'">签章同意</span>
              <span v-else-if="scope.row.conState == '40'">变更处理中</span>
              <span v-else-if="scope.row.conState == '41'">变更完成</span>
              <span v-else-if="scope.row.conState == '42'">变更拒绝</span>
              <span v-else-if="scope.row.conState == '50'">追加处理中</span>
              <span v-else-if="scope.row.conState == '51'">追加成功</span>
              <span v-else-if="scope.row.conState == '52'">追加失败</span>
              <span v-else-if="scope.row.conState == '60'">解除中</span>
              <span v-else-if="scope.row.conState == '62'">解除失败</span>
              <span v-else-if="scope.row.conState == '70'">合同交易完成</span>
              <span v-else-if="scope.row.conState == '80'">解除</span>
              <span v-else-if="scope.row.conState == '90'">无效</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <div class="operates">
                <a class="green" @click="openSelectedPage(scope.row.sendOrgid)">查看产品</a>
              </div>
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

      <!--  ====================================== 弹窗 ====================================== -->
      <el-dialog title="查看产品" top="2vh" :visible.sync="showSelectedForm" width="80%">
        <el-form ref="selectedQuery" :model="selectedQuery" :inline="true" class="table-form" size="small">
            <el-form-item>
              <el-input v-model="selectedQuery.productName"
                        maxlength="200" placeholder="品名" size="small" @keyup.enter.native="searchEnterFunView"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="selectedQuery.manufactureName"
                        maxlength="200" placeholder="生产企业名称" size="small" @keyup.enter.native="searchEnterFunView"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="searchEnterFunView" size="small">查询</el-button>
              <el-button type="warning" @click="resetSelectedForm()" size="small">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table
          :data="selectedData.list"
          border
          stripe
          @sort-change="sortChangeAlert">
          <!--<el-table-column
            type="selection"
            width="55">
          </el-table-column>-->
          <el-table-column label="通用名" prop="NAME_CHN" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.nameChn }}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品名" prop="PRODUCT_NAME" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.productName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品名" prop="TRADE_NAME" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.tradeName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="剂型" prop="DOSEAGE_FORM_NAME" sortable="custom" width="80" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.doseageFormName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="规格" prop="SPEC" sortable="custom" width="80" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.spec }}</span>
            </template>
          </el-table-column>
          <el-table-column label="转换比" prop="STAND_RATE" sortable="custom" width="80" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.standRate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="单位" prop="SPEC_UNIT" sortable="custom" width="80" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.specUnit }}</span>
            </template>
          </el-table-column>
          <el-table-column label="包材" prop="WRAP_NAME" sortable="custom" width="60" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.wrapName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="生产企业" prop="MANUFACTURE_NAME" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.manufactureName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="两票制" prop="twoVoteId" sortable="custom" width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.twoVoteId != null">已签订</span>
              <span v-else style="color: #FF0000">未签订</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagebox">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange2"
            @current-change="handleCurrentChange2"
            :page-sizes="[10, 20, 30]"
            :total="selectedData.total"
            :page-size="selectedData.pageSize"
            :page-count="selectedData.pages"
            :current-page.sync="selectedData.pageNum">
          </el-pagination>
        </div>
        <span slot="footer">
          <el-button @click="showSelectedForm = false">关闭</el-button>
        </span>
      </el-dialog>

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

    <!-- 可选产品列表 -->
    <unselected-view v-if="unselectedViewVisible" :parent-id="this.senderId" ref="unselectedView"></unselected-view>
  </div>
</template>
<script>

  // 引入用户相关请求
  import {querySenderList, querySelectedProductList, deleteCurrentSend,complainedTableQueryHttp,complainedDetailsHttp} from 'src/axios/contract/sender/hospitalSelectSender';
  import {querySenderForHospitalList} from 'src/axios/contract/sender/senderForHospitalList'
  import {generateContract} from 'src/axios/contract/sender/hospitalSelectProductSender'
  import moment from "moment";
  import { keyBoardEnter } from "src/utils"

  //  引入子页面
  import unselectedView from 'src/pages/contract/sender/hospitalSelectSender-allProduct';

  export default {
    components: {
      unselectedView
    },
    data() {
      return {
        currentOrder: undefined,
        resData: this.metaData(),
        selectedData: this.metaSelectedData(),

        // 表单初始化
        form: this.metaForm(),
        selectedForm: this.metaSelectedForm(),

        // 查询初始化
        query: this.metaQuery(),
        selectedQuery: this.metaSelectedQuery(),

        // 表单可见性初始化
        showSelectedForm: false,
        unselectedViewVisible: false,

        records: [
          {
            value: "",
            label: "全部"
          },{
            value: "1",
            label: "是"
          }, {
            value: "0",
            label: "否"
        }],
        contractStates:[{name:"全部",value:""},
                        {name:"未签订",value:"-1"},
                        {name:"待处理",value:"0"},
                        {name:"签订中",value:"10"},
                        {name:"签章同意",value:"20"},
                        {name:"变更处理中",value:"40"},
                        {name:"变更完成",value:"41"},
                        {name:"变更拒绝",value:"42"},
                        {name:"追加处理中",value:"50"},
                        {name:"追加成功",value:"51"},
                        {name:"追加失败",value:"52"},
                        {name:"解除中",value:"60"},
                        {name:"解除失败",value:"62"},
                        {name:"合同交易完成",value:"70"},
                        {name:"解除",value:"80"},
                        {name:"无效",value:"90"},
                        ],
        serviceStates:[{name:"全部",value:""},{name:"一星",value:"1"},{name:"二星",value:"2"},{name:"三星",value:"3"},{name:"四星",value:"4"},{name:"五星",value:"5"}],
        senderId: undefined,

        //不良记录配送ID
        complainedSenderId:"",
        //不良记录弹出框状态
        showComplainedTable:false,
        //不良记录列表
        complainedTableQuery:this.metaData(),

        //不良记录详情显示状态
        showComplainedDetails:false,
        //不良记录数据
        complainedDetailsData:{
          name:"",//投诉对象
          Instructions:"",//投诉说明
          reason:""//投诉原因
        },
      }
    },
    created() {
      this.list();
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      moment,
      //  Start 接口结果集
      metaData() {
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
      metaSelectedData() {
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
          selectedList: []
        }
      },
      //  End 接口结果集

      // 表单数据初始化
      metaForm() {
        return {
          senderName: undefined,
          contractState: undefined,
          complainedCount: undefined,
          serviceState: undefined
        }
      },
      metaSelectedForm() {
        return {
          productName: '',
          manufactureName: ''
        }
      },
      metaQuery() {
        return {
            name: undefined,
            history: undefined,
            twoVote: undefined,
            complainedCount: undefined,
            serviceState: undefined,
            contractState:undefined
        }
      },
      metaSelectedQuery() {
        return {
          productName: undefined,
          manufactureName: undefined
        }
      },
      //  获取用户分页列表
      list() {
        this.resData.orderBy=this.currentOrder;
        querySenderForHospitalList(this.resData, this.query).then(res => {
          this.resData = res.data;
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1;
          }
        })
      },
      selectedList() {
        this.selectedData.orderBy=this.currentOrder;
        querySelectedProductList(this.selectedData, this.selectedQuery, '', this.senderId).then(res => {
          this.selectedData = res.data;
          if(this.selectedData.pageNum === 0){
            this.selectedData.pageNum = 1;
          }
        });
      },
      // 重置表单
      resetForm() {
        this.query = this.metaForm();
        this.list();
      },
      resetSelectedForm() {
        this.selectedQuery = this.metaSelectedForm();
        this.selectedList();
      },
      // 打开已选产品页面
      openSelectedPage(senderId) {
        this.senderId = senderId;// 传递Id
        this.resetSelectedForm();// 重置已选窗口内的查询表单
        this.showSelectedForm = true;// 打开已选窗口
       // this.selectedList();//  查询已选数据
      },
      //显示不良记录table
      complainedTable(senderId){
        this.complainedSenderId = senderId;
        this.complainedTableList();
      },
      //不良记录请求list
      complainedTableList(){
        complainedTableQueryHttp(this.complainedSenderId,this.complainedTableQuery).then(res =>{
          this.complainedTableQuery = res.data;
          this.showComplainedTable = true;
        });
      },
      closeForm(){
        this.showComplainedTable = false;
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
      // 分页************************
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.list()
      },
      handleSizeChange2(val) {
        this.selectedData.pageSize = val
        this.selectedList()
      },
      handleCurrentChange2(val) {
        this.selectedData.pageNum = val
        this.selectedList()
      },
      handleSizeChange3 (val) {
        this.complainedTableQuery.pageSize = val
        this.complainedTableList()
      },
      handleCurrentChange3 (val) {
        this.complainedTableQuery.pageNum = val
        this.complainedTableList()
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e , ()=>{
          this.list();
        })
      },
      searchEnterFunView(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e , ()=>{
          this.selectedList();
        })
      },
      sortChangeMain(value){
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
      sortChangeAlert(value){
        let sortType=" desc"
        if(!!value.order){
          if(value.order.startsWith("asc")){
            sortType=" asc";
          }
          this.currentOrder=value.prop + sortType;
        } else {
          this.currentOrder=undefined;
        }
        this.selectedList();
      }
    }
  }
</script>

