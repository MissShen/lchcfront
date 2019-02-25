<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">

        <el-form ref="query" :model="query" size="small" :inline="true" class="table-form">
            <el-form-item>
              <el-input v-model="query.name"
                        maxlength="200" placeholder="配送企业" size="small" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item>
                  <el-select size="small"  v-model="query.twoVote" placeholder="两票制">
                    <el-option-group
                      key="两票制"
                      label="两票制">
                      <el-option
                        v-for="item in twoVoteSelection"
                        :key="item.value"
                        :label="item.label"
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
          @sort-change="sortChange">
          <el-table-column label="配送企业" prop="NAME" sortable="custom" width="320">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="联系人" prop="LINKPERSON" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.linkPerson }}</span>
            </template>
          </el-table-column>
          <el-table-column label="手机" prop="LINKPHONE" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.linkPhone }}</span>
            </template>
          </el-table-column>
          <el-table-column label="电话" prop="LINKTEL" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.linkTel }}</span>
            </template>
          </el-table-column>
          <el-table-column label="配送评价" prop="serviceState" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>
                <el-rate
                  v-model= scope.row.serviceState disabled>
                </el-rate>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="不良记录" prop="complainedCount" sortable="custom">
            <template slot-scope="scope">
              <a @click="complainedTable(scope.row.id)" v-if="scope.row.complainedCount >0&&scope.row.complainedCount != null && scope.row.complainedCount != ''">{{ scope.row.complainedCount }}</a>
              <span v-if="scope.row.complainedCount == 0||scope.row.complainedCount == null || scope.row.complainedCount == ''">无不良记录</span>
            </template>
          </el-table-column>
          <el-table-column label="两票制" prop="twoVote" sortable="custom">
            <template slot-scope="scope">
              <span v-if="scope.row.twoVote == 0" style="color:red">未签订</span>
              <span v-if="scope.row.twoVote == 1">已签订</span>
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
    </div>  <!--不良记录table-->
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
            <span>{{ scope.row.createdAt }}</span>
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

  // 引入用户相关请求
  import {queryDistributionEnterpriseList} from 'src/axios/contract/sender/distributionEnterprise';
  import {complainedTableQueryHttp,complainedDetailsHttp} from 'src/axios/contract/sender/hospitalSelectSender';
  import { keyBoardEnter } from "src/utils"

  export default {
    data() {
      return {
        currentOrder: undefined,
        resData: this.metaData(),
        // 查询初始化
        query: this.metaQuery(),
        twoVoteSelection :[
        {
          value:'',
          label:'全部'
        },{
          value:'0',
          label:'未签订'
        }, {
          value: '1',
          label: '已签订'
        }],
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
        serviceStates:[{label:"全部",value:""},{label:"一星",value:"1"},{label:"二星",value:"2"},{label:"三星",value:"3"},{label:"四星",value:"4"},{label:"五星",value:"5"}],
        //---------------不良记录所用的状态--------
        ////不良记录配送ID
        complainedSenderId:"",
        //不良记录弹出框状态
        showComplainedTable:false,
        //不良记录列表
        complainedTableQuery:this.complainedTableData(),

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
      this.list();
    },
    methods: {
      sortChang(value){
        let sortType=" desc"
        if(value.order.startsWith("asc")){
          sortType=" asc";
        }
        this.currentOrder=value.prop + sortType;
        this.list()
      },
      // -------------------------------------------- 数据初始化  -----------------------------------------
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
      complainedTableData() {
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
      // 表单数据初始化
      metaForm() {
        return {
          name: '',
        }
      },
      metaQuery() {
        return {
          query: {
            twoVote : undefined,
            name: undefined,
            complainedCount : undefined,
            serviceState : undefined
          }
        }
      },

      //  获取用户分页列表
      list() {
        this.resData.orderBy=this.currentOrder;
        queryDistributionEnterpriseList(this.resData, this.query).then(res => {
          this.resData = res.data;
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1;
          }
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
      // 重置表单
      resetForm() {
        this.query = this.metaForm();
        this.list();
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
      },
    }
  }
</script>

