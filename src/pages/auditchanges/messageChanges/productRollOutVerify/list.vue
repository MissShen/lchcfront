<template>
  <!-- 表格 -->
  <div>

    <el-tabs v-model="activeName" @tab-click="toChange">
      <el-tab-pane label="产品转入申报" name="first"/>
      <el-tab-pane label="产品转出确认" name="second"/>
      <el-tab-pane label="产品转产澄清" name="third"/>
      <el-tab-pane label="产品转产质疑记录" name="fourth"/>
    </el-tabs>


  <div class="tablebox">
    <!--<el-tabs v-model="activeName">-->
    <!--<el-tab-pane label="转出确认" name="first">-->

    <!-- 表格查询表单 -->
    <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
      <el-form-item>
        <el-input v-model="query.requestCode" placeholder="申请单号" @keyup.enter.native="searchEnterFun"
                  size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="query.UpTypeId" placeholder="全部" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button v-on:click="searchEnterFun" type="success" size="small">查询</el-button>
        <el-button v-on:click="remove" type="warning" size="small">重置</el-button>
      </el-form-item>
    </el-form>

    <div class="tableset">
      <el-table
        :data="resData.list"
        border
        stripe
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" align="center"></el-table-column>
        <el-table-column label="申请单号" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.REQUESTCODE }}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新类型名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.UPTYPENAME }}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请企业名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.INORGNAME }}</span>

          </template>
        </el-table-column>
        <el-table-column label="转出企业名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.OUTORGNAME }}</span>
          </template>
        </el-table-column>

        <el-table-column label="申请时间">
          <template slot-scope="scope">
            <span>{{ scope.row.DATEADD | dateConvert }}</span>
          </template>
        </el-table-column>

        <el-table-column label="当前状态">
          <template slot-scope="scope">
            <span>{{scope.row.STATEAUDIT|statusConvert}}</span>
          </template>
        </el-table-column>
        <el-table-column label="确认结果">
          <template slot-scope="scope">
            <span>{{scope.row.PROCESSINGSTATE==0?'不同意':scope.row.PROCESSINGSTATE==1?'同意':'待确认'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核结果">
          <template slot-scope="scope">
            <span>{{scope.row.AUDITRESULTS=='1'?'审核通过':scope.row.AUDITRESULTS=='3'?'审核不通过':''}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="operates" v-if="scope.row.STATEAUDIT == '8'">
                  <span><a href="javascript:;" class="operation-btn" @click="gotoConfirmPage(scope.row.ID)"
                           type="text"
                           size="small">确认</a></span>
            </div>
            <div class="operates" v-else>
                  <span><a href="javascript:;" class="operation-btn" @click="gotoDetailedPage(scope.row.ID )"
                           type="text"
                           size="small">详细</a></span>
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
    <!--</el-tab-pane>-->
    <!--</el-tabs>-->
  </div>
  </div>
</template>

<script>
  import {messageList, getUpdateType} from 'src/axios/auditchanges/messageChanges/messageChanges'
  import {keyBoardEnter} from "src/utils";
  import moment from 'moment'

  export default {
    //初始化函数
    data() {
      return {
        resData: this.metaData(),
        query: this.metaQuery(),
        activeName: 'second',//标签页默认选中第一个
        options: [],
      }
    },
    //初始化函数
    created() {
      if (!!this.$store.state.pageSeach.pageNum) {
        this.query = this.$store.state.pageSeach;
        this.resData.pageSize = this.$store.state.pageSeach.pageSize;
        this.resData.pageNum = this.$store.state.pageSeach.pageNum;
      }
      this.$store.state.pageSeach = this.query;
      this.resData.pageSize = 10;
      //初始化列表
      this.list();
      this.getoptions();
    },
    methods: {
      metaData() {
        return {
          pageNum: 1,
          pageSize: 20,
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
      metaQuery() { // 表单查询数据初始化
        return {
          query: {
            Id: undefined,
            UpTypeId: undefined
          }
        }
      },
      //查询
      searchEnterFun(e) {
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      toChange(t) {
        if (t.name == "second") {
          this.$router.push('/AUDIT/orgAffirm/productRollOutVerifyList');
        }else if(t.name == 'third'){
          this.$router.push('/AUDIT/orgClarify/productTransferClarify')
        }else if(t.name == 'first'){
          this.$router.push('/AUDIT/messageDeclare/productMessageTransferList')
        }else if (t.name == 'fourth'){
          this.$router.push('/AUDIT/messagePublicity/transferQuestionRecord')
        }
      },
      //条件查询
      list() {
        this.$store.state.pageSeach = this.query;
        let selectQuery = this.query;
        let resData = this.resData;

        if (resData.pageSize == undefined || resData.pageSize == "") {
          resData.pageSize = 10;
        }
        if (resData.pageNum == undefined || resData.pageNum == "") {
          resData.pageNum = 1;
        }
        messageList(resData, selectQuery).then(res => {
          this.resData = res.data
          console.log(this.resData)
          if (this.resData.pageNum === 0) {
            this.resData.pageNum = 1
          }
        });
      },
      //清空查询表单
      remove() {
        this.query.requestCode = "";
        this.query.UpTypeId = "";
        this.list();
      },
      //跳转到确认页面
      //参数准出id ：id
      gotoConfirmPage(id) {
        this.$router.push("/AUDIT/messageChanges/productRollOutVerifyConfirm/" + id + "/edit" + '/0');
      },
      gotoDetailedPage(id) {
        this.$router.push("/AUDIT/messageChanges/productRollOutVerifyConfirm/" + id + "/detail" + '/1');
      },
      getoptions() {
        getUpdateType().then(res => {
          this.options = res.data;
        });
      },
      handleSizeChange(val) {
        this.$store.state.pageSeach.pageSize = val
        this.resData.pageSize = val
        this.list()
      },
      handleSelectionChange(val) {
        //val 所选对象
      },
      handleCurrentChange(val) {
        this.$store.state.pageSeach.pageNum = val
        this.resData.pageNum = val
        this.list()
      }
    },
    filters: {
      dateConvert: function (value) {
        if (value == null || value == '' || value == 'undefined') {
          return ''
        } else {
          return moment(value).format('YYYY-MM-DD HH:mm:ss')
        }
      },
      statusConvert: function (status) {
        if (status == null || status == '' || status == 'underfind') {
          return ''
        } else {
          if (status == '0') {
            return "未提交";
          }
          else if (status == '1') {
            return "已提交";
          }
          else if (status == '2') {
            return "公式中";
          }
          else if (status == '3') {
            return "质疑中";
          }
          else if (status == '4') {
            return "澄清中";
          }
          else if (status == '5') {
            return "审核中";
          }
          else if (status == '6') {
            return "挂网中";
          }
          else if (status == '7') {
            return "数据中心处理中";
          }
          else if (status == '8') {
            return "确认中";
          }
        }
      },

      resultConvert: function (status) {
        // 审核结果(0.未审核，1.审核通过，2.待确认，3.审核不通过)
        if (status == null || status == '' || status == 'undefined') {
          return '未审核'
        } else {
          if (status == '0') {
            return "已拒绝";
          }
          else if (status == '1') {
            return "已审核";
          }
        }
      }
    },
  }
</script>
