<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">

        <el-form ref="query" :model="query" size="small" :inline="true" class="table-form">
            <el-form-item class="width-150">
              <el-input v-model="query.name" maxlength="200" placeholder="配送企业" size="small" @keyup.enter.native="searchEnterFun"></el-input>
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
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
            <el-form-item class="width-150">
              <el-select v-model="query.conState" placeholder="合同状态" size="small">
                <el-option-group
                  key="合同状态"
                  label="合同状态">
                  <el-option
                    v-for="item in conStateOptions"
                    :key="item.serviceState"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
            <el-form-item class="width-150">
              <el-select v-model="query.twoVote" placeholder="两票制" size="small">
                <el-option-group
                  key="两票制"
                  label="两票制">
                  <el-option
                    v-for="item in twoVotes"
                    :key="item.twoVote"
                    :label="item.label"
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
          @sort-change="sortChangeMain"
          @selection-change="mainHandleSelectionChange">
          <el-table-column type="selection" :selectable="selectableFun" align="center"></el-table-column>
          <el-table-column label="配送企业" prop="NAME" sortable="custom" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="联系人" prop="LINK_PERSON" sortable="custom" width="90">
            <template slot-scope="scope">
              <span>{{ scope.row.linkPerson }}</span>
            </template>
          </el-table-column>
          <el-table-column label="联系方式" prop="LINK_PHONE" sortable="custom" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.linkPhone }}</span>
            </template>
          </el-table-column>
          <el-table-column label="不良记录" prop="COMPLAINED_COUNT" sortable="custom" width="100" align="center">
            <template slot-scope="scope">
              <a class="orange" @click="complainedTable(scope.row.id)" v-if="scope.row.complainedCount >0&&scope.row.complainedCount != null && scope.row.complainedCount != ''">{{ scope.row.complainedCount }}</a>
              <span v-if="scope.row.complainedCount == 0||scope.row.complainedCount == null || scope.row.complainedCount == ''">无</span>
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
          <el-table-column label="两票制" prop="twoVoteId" sortable="custom" width="80" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.twoVoteId == null" class="orange">未签订</span>
              <span v-if="scope.row.twoVoteId != null">已签订</span>
            </template>
          </el-table-column>
          <el-table-column label="已选医院" prop="selectHosCount" sortable="custom" width="90" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.selectHosCount }}</span>
            </template>
          </el-table-column>
          <el-table-column label="合同状态" prop="CON_STATE" sortable="custom" width="90" align="center">
            <template slot-scope="scope">
              <i :class="getClassByState(scope.row.conStateIcon)" :title="scope.row.conStateName"></i>
            </template>
          </el-table-column>
          <el-table-column label="是否已选" prop="shsId" sortable="custom" width="80" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.shsId != null" :class="scope.row.conStateIcon == null ? 'orange' : ''">是</span>
              <span v-else>否</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="170">
            <template slot-scope="scope">
              <div class="operates w100">
                <!--<span class="btn-word-2">
                  <a href="javascript:;" v-if="scope.row.conState != '20' && scope.row.conState != '41' && scope.row.conState != '51'" class="blue-bord" @click="openUnselectedPage(scope.row.id, 'select')">选择产品</a>
                  <a href="javascript:;" v-if="scope.row.conState == '20' || scope.row.conState == '41' || scope.row.conState == '51'" class="blue-bord" @click="openUnselectedPage(scope.row.id, 'supplement')">选择产品</a>
                </span>-->
                <a href="javascript:;" v-if="isShowSelectButton(scope.row.conMainState)" class="blue-bord" @click="batchChoice(scope.row)">选择</a>
                <a href="javascript:;" v-if="isShowDeleteButton(scope.row.conMainState)" class="green" @click="deleteHosSendContract(scope.row)">删除</a>
                <a href="javascript:;" class="green" @click="openUnselectedPage(scope.row.id)">查看产品</a>
                <!--<a href="javascript:;" class="green" @click="openSelectedPage(scope.row.id)">已选产品</a>-->
                <!--<a href="javascript:;" v-if="scope.row.shsId != null" class="red" @click="scope.row.conState==null ? removeCurrentSend(scope.row.shsId) : jumpToReleaseContract(scope.row.shsId)">{{ scope.row.conState==null ? '删除' : '解除' }}</a>-->
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 表格分页 -->
        <div class="pagebox">
          <ul class="explain">
            标记说明：
            <li><i class="ico-status ico-ty"></i><span>同意</span></li>
            <li><i class="ico-status ico-clz"></i><span>处理中</span></li>
            <li><i class="ico-status ico-jc"></i><span>解除</span></li>
            <li><i class="ico-status ico-juj"></i><span>拒签</span></li>
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
      </div>
      <div class="foot-btn">
        <div class="foot-left">
          <span><el-button type="warning" size="small" @click="generate()">预生成合同</el-button></span>
          <span><el-button type="success" size="small" @click="batchChoice('')">批量选择</el-button></span>
        </div>
      </div>

      <!--  ====================================== 弹窗 ====================================== -->
      <el-dialog title="已选产品" top="2vh" :visible.sync="showSelectedForm" width="80%">
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
          @selection-change="handleSelectionChange"
          @sort-change="sortChangeShowProduct">
          <!--<el-table-column
            type="selection"
            width="55">
          </el-table-column>-->
          <el-table-column align="center" type="selection" width="40"></el-table-column>
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
          <el-table-column label="转换比" prop="STAND_RATE" sortable="custom" width="80" align="right">
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
          <el-table-column label="价格" prop="DEAL_PRICE" sortable="custom" :show-overflow-tooltip="true" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.dealPrice }}</span>
            </template>
          </el-table-column>
          <el-table-column label="两票制" prop="twoVoteId" sortable="custom" width="150" align="center">
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
          <el-button @click="closeFrom()" size="small" class="el-button-pale">关闭</el-button>
          <el-button @click="deleteBatchSelectProductList()" type="danger" size="small">删除</el-button>
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

            <el-table-column label="投诉编号" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>x
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
            <el-table-column label="投诉时间" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{ scope.row.createdAt }}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="220">
              <template slot-scope="scope">
                <div class="operates">
                  <a href="javascript:;" @click="complainedDetails(scope.row.reasonTypeId)">详情</a>
                </div>
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
    <hospital-select-sender-main v-if="selectedViewVisible" :parent-id="this.senderId" ref="selectedView"></hospital-select-sender-main>
  </div>
</template>
<script>

  // 引入用户相关请求
  import {querySenderList, querySelectedProductList, deleteCurrentSend,complainedTableQueryHttp,complainedDetailsHttp} from 'src/axios/contract/sender/hospitalSelectSender';
  import {generateContract} from 'src/axios/contract/sender/hospitalSelectProductSender'

  //  引入子页面
  import hospitalSelectSenderMain from 'src/pages/contract/sender/hospitalSelectSender-main';
  import { keyBoardEnter } from "src/utils"

  import { deleteSender } from 'src/axios/contract/sender/hospitalSelectProductSender'

  export default {
    components: {
      hospitalSelectSenderMain
    },
    data() {
      return {
        currentOrder: undefined,
        ShowProductCurrentOrder: undefined,
        resData: this.metaData(),
        selectedData: this.metaSelectedData(),
        multipleSelection:[],
        mainMultipleSelection:[],


        // 表单初始化
        form: this.metaForm(),
        selectedForm: this.metaSelectedForm(),

        // 查询初始化
        query: this.metaQuery(),
        selectedQuery: this.metaSelectedQuery(),

        // 表单可见性初始化
        showSelectedForm: false,
        selectedViewVisible: false,

        histories: [
          {
            value: "",
            label: "全部"
          }, {
            value: "1",
            label: "是"
          }, {
            value: "0",
            label: "否"
          }
        ],
        twoVotes: [
          {
            value: "",
            label: "全部"
          }, {
            value: "1",
            label: "已签订"
          }, {
            value: "0",
            label: "未签订"
          }
        ],
        records: [
          {
            value: "",
            label: "全部"
          }, {
            value: "1",
            label: "是"
          }, {
            value: "0",
            label: "否"
          }
        ],
        serviceStates:[
          {label:"全部",value:""},
          {label:"一星",value:"1"},
          {label:"二星",value:"2"},
          {label:"三星",value:"3"},
          {label:"四星",value:"4"},
          {label:"五星",value:"5"}
        ],
        conStateOptions : [
          {label:"全部",value:""},
          {label : "待处理", value : "0"},
          {label : "签订中", value : "10"},
          {label : "签章同意", value : "20"},
          {label : "变更处理中", value : "40"},
          {label : "变更完成", value : "41"},
          {label : "变更拒绝", value : "42"},
          {label : "追加处理中", value : "50"},
          {label : "追加成功", value : "51"},
          {label : "追加失败", value : "52"},
          {label : "解除中", value : "60"},
          {label : "解除失败", value : "62"},
          {label : "合同交易完成", value : "70"},
          {label : "解除", value : "80"},
          {label : "无效", value : "90"}
        ],
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
      //  Start 接口结果集
      metaData() {
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
      metaSelectedData() {
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
          selectedList: []
        }
      },
      //  End 接口结果集

      // 表单数据初始化
      metaForm() {
        return {
          name: undefined,
          history: undefined,
          twoVote: undefined,
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
          conState: undefined,
          complainedCount: undefined,
          serviceState: undefined
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
        this.resData.orderBy = this.currentOrder;
        querySenderList(this.resData, this.query).then(res => {
          this.resData = res.data;
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1;
          }
        })
      },
      selectedList() {
        this.selectedData.orderBy = this.ShowProductCurrentOrder;
        querySelectedProductList(this.selectedData, this.selectedQuery, '', this.senderId).then(res => {
          this.selectedData = res.data;
          if(this.selectedData.pageNum === 0){
            this.selectedData.pageNum = 1;
          }
        });
      },
      closeFrom(){
        this.query = this.metaForm();
        this.showSelectedForm = false;
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
      },
      // 删除已选产品
      deleteBatchSelectProductList(){
        let productIds = [];
        this.multipleSelection.map(function(item,key,ary) {
          productIds.push(item.productId);
        });

        //如果当前选择数据都未加入到了目录那么就return 不使他提交
        if(productIds.length==0){
          this.$message({
            message: '请至少选择一条产品',
            type: 'warning'
          });
          return;
        }

        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteSender(this.senderId, productIds).then(res => {
            this.$message({
              message: res.success ? '删除成功' : '删除失败',
              type: res.success ? 'success' : 'error',
            });
            if(res.success) {
              this.selectedList();
              this.list();
            }
          })
        }).catch(()=>{})
      },
      openUnselectedPage(senderId) {
        this.senderId = senderId;// 传递Id
        this.selectedViewVisible = true;
        this.$nextTick(() => {
          // 通过组件中设置的ref属性调取unselectedView.vue中的fillData()方法加载弹窗内容
          this.$refs.selectedView.fillData(senderId);
        });
      },
      //  判断合同状态图标
      getClassByState(state){
        if(state=="CONSENT"){
          return 'ico-status ico-ty'
        }else if(state=="BEING_PROCESSED"){
          return 'ico-status ico-clz'
        }else if(state=="RELIEVED"){
          return 'ico-status ico-jc'
        }else if(state=="SIGN_REJECT"){
          return 'ico-status ico-juj'
        }else if(state=="RELIEVE_REJECT"){
          return 'ico-status ico-njc'
        }
      },
      //删除当前配送
      removeCurrentSend(sendId){
        this.$confirm('确认删除当前配送？','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          deleteCurrentSend(sendId,"").then(res=>{
            this.list();
            this.$message({
              message: res.success == true ? res.data : "删除当前配送失败",
              type: res.success == true ? "success" : "error"
            })
          })
        }).catch(()=>{})
      },
      jumpToReleaseContract(sendId){
        this.$router.push({
          name : 'contractManagementContractMain',
          params: {
            'sendId': sendId
          }
        })
      },
      /**
       * 预生成合同
       */
      generate () {
        generateContract().then(res => {
          this.$message({
            message: res.success == true ? res.data : res.message,
            type: res.success == true ? "success" : "error",
            onClose: () => {
              this.list();
            }
          })
        })
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
      conStateData(conState){
          if(conState == '' || conState == null){
            return "";
          }else if(conState == '0'){
            return "待处理";
          }else if(conState == '10'){
            return "签订中";
          }else if(conState == '20'){
            return "签章同意";
          }else if(conState == '40'){
            return "变更处理中";
          }else if(conState == '41'){
            return "变更完成";
          }else if(conState == '42'){
            return "变更拒绝";
          }else if(conState == '50'){
            return "追加处理中";
          }else if(conState == '51'){
            return "追加成功";
          }else if(conState == '52'){
            return "追加失败";
          }else if(conState == '60'){
            return "解除中";
          }else if(conState == '62'){
            return "解除失败";
          }else if(conState == '70'){
            return "合同交易完成";
          }else if(conState == '80'){
            return "解除";
          }else if(conState == '90'){
            return "无效";
          }
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      sortChangeShowProduct(value){
        let sortType=" desc"
        if(!!value.order){
          if(value.order.startsWith("asc")){
            sortType=" asc";
          }
          this.ShowProductCurrentOrder=value.prop + sortType;
        } else {
          this.ShowProductCurrentOrder=undefined;
        }
        this.selectedList();
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
      mainHandleSelectionChange(val){
        this.mainMultipleSelection = val;
      },
      batchChoice(row){
        var senderIdAndNameList = new Array();
        function senderIdAndNameObject(id,name){
          this.id = id;
          this.name = name;
        };
        var json = '';
        if(row != null && row != ''){
          var obj = new senderIdAndNameObject(row.id,row.name);
          senderIdAndNameList[0] = obj;
          json = JSON.stringify(senderIdAndNameList);
        }else{
          for (var i = 0; i < this.mainMultipleSelection.length; i++){
            var obj = new senderIdAndNameObject(this.mainMultipleSelection[i].id,this.mainMultipleSelection[i].name);
            senderIdAndNameList[i] = obj;
          }
          json = JSON.stringify(senderIdAndNameList);
        }
        if(json != null && json.length != 0){
          generateContract(json).then(res => {
            this.$message({
              message: res.success == true ? res.data : res.message,
              type: res.success == true ? "success" : "error",
              onClose: () => {
                this.list();
              }
            })
          })
        }else{
          this.$message({
            message: "请至少选择一条数据",
            type: "warning"
          })
        }
      },
      selectableFun(row, index){
        if(row.conMainState == null || row.conMainState == ''){
          return true;
        }
      },
      isShowSelectButton(state){
        if(state != null && state != ''){
          if(state == '80' || state == '90'){
            return true;
          }else{
            return false;
          }
        }else{
          return true;
        }
      },
      isShowDeleteButton(state){
        if(state != null && state != ''){
          if(state == '0' || state == '10'){
            return true;
          }else {
            return false;
          }
        }else{
          return false;
        }
      },
      deleteHosSendContract(row){
        console.log(row);
        this.$confirm(`确定删除?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteCurrentSend(row.conId,row.id).then(res => {
            this.$message({
              message: res.success ? "删除成功" : "删除失败",
              type: res.success ? "success" : "error",
              onClose: () => {
                this.list();
              }
            })
          })
        }).catch(()=>{})
      }
    }
  }
</script>

