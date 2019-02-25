<template>
  <div class="padding10">
      <el-form ref="query" :model="query" :inline="true" class="table-form" size="small">
          <el-form-item class="width-120">
            <el-input v-model="query.senderName"
                      maxlength="200" placeholder="企业名称" size="small" @keyup.enter.native="searchEnterFun"></el-input>
          </el-form-item>
          <el-form-item class="width-120">
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
          <el-form-item class="width-120">
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
        <el-table-column label="首选配送" prop="firstSender" sortable="custom" width="80" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.firstSender == '1' ? '是' : '否' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="合同已选" prop="contractId" sortable="custom" width="80" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.contractId != null ? '是' : '否' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="配送企业" prop="senderName" sortable="custom" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.senderName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="不良记录" prop="COMPLAINED_COUNT" sortable="custom">
          <template slot-scope="scope">
            <a @click="complainedTable(scope.row.senderId)" v-if="scope.row.complainedCount >0&&scope.row.complainedCount != null && scope.row.complainedCount != ''">{{ scope.row.complainedCount }}</a>
            <span v-if="scope.row.complainedCount == 0||scope.row.complainedCount == null || scope.row.complainedCount == ''">无不良记录</span>
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
        <el-table-column label="两票制" prop="twoVoteId" sortable="custom" width="120" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.twoVoteId != null">已签订</span>
            <span v-else style="color: #FF0000">未签订</span>
          </template>
        </el-table-column>
        <el-table-column label="电话" prop="LINK_PHONE" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.linkPhone }}</span>
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
    <!--<div slot="footer" class="dialog-footer" align="right">-->
      <!--<el-button @click="closeDialog()" size="small">关闭</el-button>-->
    <!--</div>-->

  </div>
</template>
<script>

  // 引入用户相关请求
  import {queryUnselectedSenderList} from 'src/axios/contract/sender/hospitalSelectProductSender'
  import { keyBoardEnter } from "src/utils"

  export default {
    props: {
      productId: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        currentOrder: undefined,
        resData: this.metaData(),
        form: this.metaForm(), // 表单初始化
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        dataForm: this.metaForm(),


        serviceStates:[
          {label:"全部",value:""},
          {label:"一星",value:"1"},
          {label:"二星",value:"2"},
          {label:"三星",value:"3"},
          {label:"四星",value:"4"},
          {label:"五星",value:"5"}
        ],
        records: [
          {
            value: "",
            label: "全部"
          },
          {
            value: "1",
            label: "是"
          }, {
            value: "0",
            label: "否"
          }
        ],

        senderId: undefined,

      }
    },
    created () {
      this.list2();
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
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
      metaForm () { // 表单数据初始化
        return {
          senderName: undefined,
          complainedCount: undefined
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
          senderName: undefined,
          complainedCount: undefined
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list2 () {
        this.resData.orderBy = this.currentOrder;
        queryUnselectedSenderList(this.resData, this.query, this.productId).then(res => {
          this.resData = res.data
          0 === this.resData.pageNum ? this.resData.pageNum = 1 : null;
        })
      },
      // 重置用户表单
      resetForm () {
        this.query = this.metaQuery()
        this.list2()
      },
      //调用父组件的函数
      fatherMathod(){
        this.$emit("refreshbizlines_selected","");
      },
      //父组件用来控制当前组件刷新的函数
      refreshList(){
        this.list2()
      },
      closeDialog(){
        this.$emit("closeDialog");
      },


      //调用父页面的方法 去让他显示dialog
      complainedTable(senderId){
        this.$emit("showComplainedTable_selected",{senderId:senderId});
      },


      // ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list2()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list2()
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
        this.list2();
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e , ()=>{
          this.list2();
        })
      }
    }
  }
</script>
