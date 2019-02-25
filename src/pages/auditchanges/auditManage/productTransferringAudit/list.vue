<template>
  <!-- 表格 -->
  <div class="tablebox">
    <!-- 表格查询表单 -->
    <el-form ref="reqData" :model="reqData" label-position="right" size="small" class="table-form" :inline="true">
      <el-form-item>
        <el-input v-model="reqData.requsertCode" placeholder="申请单号" size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="reqData.inOrgName" placeholder="申请企业名称" size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="reqData.outOrgName" placeholder="转出企业名称" size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="reqData.upTypeId" placeholder="全部" size="small">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.value"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
        <el-button type="warning" @click="restQuery" size="small">重置</el-button>
      </el-form-item>
    </el-form>

    <div class="tableset">
      <el-table
        :data="resData.list"
        border
        stripe
        @selection-change="handleSelectionChange">
        <el-table-column
          align="center"
          type="selection"
          width="50" :reserve-selection="true">
        </el-table-column>
        <el-table-column label="申请单号" width="100px" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.requestCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新类型名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.upTypeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请企业名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.inOrgName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="转出企业名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.outOrgName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请时间" width="150px">
          <template slot-scope="scope">
            <span>{{ scope.row.submitDate|dateConvert }}</span>
          </template>
        </el-table-column>
        <el-table-column label="转产状态" width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.stateAudit|statusConvert }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核状态" width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.auditResults|resultConvert}}</span>
          </template>
        </el-table-column>
        <el-table-column label="质疑状态" width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.questionDate != null?'已质疑':'未质疑'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="回复状态" width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.replyFlag=='1'?'已回复':'未回复'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="质疑次数" width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.questionCount}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100px">
          <template slot-scope="scope">
            <div class="operates">
              <span>
                <a href="javascript:;" v-if="scope.row.stateAudit == '4' || scope.row.stateAudit == '5'" title="审核"
                   class="operation-btn"
                   @click="auditHandle(scope.row.id)">审核</a>
              </span>
              <span v-if="scope.row.questionDate != null">
                <a @click="questionView(scope.row.id)">质疑记录</a>
              </span>
              <span>
                <a href="javascript:;" title="详情" class="operation-btn"
                   @click="detailHandel(scope.row.id)">详情</a>
              </span>
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
        <!--<el-button type="primary" size="small" @click="productDownPublicity(1)">开启公示</el-button>-->
        <!--<el-button type="warning" size="small" @click="productDownPublicity(0)">关闭公示</el-button>-->
      </div>
    </div>
  </div>
</template>

<script>
  // 引入用户相关请求
  import {findByOperatorType} from 'src/axios/auditchanges/messageChanges/upType';
  import {findAuditList, publicityTransfer} from 'src/axios/auditchanges/messageChanges/productTransfer';
  import moment from 'moment';

  export default {
    data() {
      return {
        reqData: this.queryData(),
        resData: this.metaData(),
        activeName: 'first',//标签页默认选中第一个
        query: this.metaQuery(), // 查询初始化
        options: [],
        publicityId: '',
        publicityList: []
      }
    },
    created() {
      if (!!this.$store.state.pageSeach.pageNum) {
        this.query = this.$store.state.pageSeach;
        this.resData.pageSize = this.$store.state.pageSeach.pageSize;
        this.resData.pageNum = this.$store.state.pageSeach.pageNum;
      }
      this.$store.state.pageSeach = this.query;
      findByOperatorType(this.options).then(res => {
        this.options = res.data;
        this.options.splice(0, 0, {id: '', value: '全部'})
      });
      this.list()
    },
    methods: {
      questionView(id){
        this.$router.push("/AUDIT/messageChanges/transferQuestionRecord/"+id);
      },
      productDownPublicity(flag) {
        this.publicityId = "";

        if (this.publicityList.length == 0) {
          this.$message({
            message: '请选择转产记录',
            type: 'error'
          });
        } else {
          this.publicityList.forEach(value => {
            this.publicityId += value.id + ',';
          })
          console.log(this.publicityId)
          publicityTransfer(this.publicityId, flag).then(value => {
            if (value.data == 1) {
              this.$message({
                message: '已关闭公示！',
                type: 'success'
              });
              this.list();
            } else {
              this.$message({
                message: '关闭失败,含有非公示中的转产！',
                type: 'error'
              });
              this.list();
            }
          })
          this.publicityId = '';
          this.publicityList = [];
        }
      },


      queryData() {
        return {
          requsertCode: '',
          inOrgName: '',
          outOrgName: '',
          upTypeId: ''
        }
      },
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() {
        return {
          resData: { // 前后台交互数据封装格式
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
        }
      },
      metaQuery() {
        return {
          query: {
            code: undefined,
            inOrgName: undefined,
            outOrgName: undefined,
            upType: undefined
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      list() {
        findAuditList(this.reqData).then(res => {
          this.resData = res.data;
          if (this.resData.pageNum == 0) {
            this.resData.pageNum = 1;
          }
        })
      },
      //查询
      searchEnterFun(e) {
        this.list();
      },
      restQuery() {//重置
        this.reqData= this.queryData();
        this.list();
      },
      handleQuery() {
        this.list()
      },
      auditHandle(transferId) {
        this.$router.push("/AUDIT/auditManage/productTransferringAuditDetail/" + transferId + "/edit");
      },
      detailHandel(transferId) {
        this.$router.push("/AUDIT/auditManage/productTransferringAuditDetail/" + transferId + "/detail");
      },
      handleSizeChange(val) {
        this.$store.state.pageSeach.pageSize = val
        this.resData.pageSize = val
        this.list()
      },
      handleSelectionChange(val) {
        //val 所选对象
        this.publicityList = val;
        this.publicityId = "";
        this.publicityList.forEach(value => {
          this.publicityId += value.id + ',';
        })
      },
      handleCurrentChange(val) {
        this.$store.state.pageSeach.pageNum = val
        this.resData.pageNum = val
        this.list()
      }
    },
    filters: {
      dateConvert: function (value) {
        if (value == null || value == '' || value == 'underfind') {
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
            return "待确认";
          }
          else if (status == '2') {
            return "确认中";
          }
          else if (status == '3') {
            return "公示中";
          }
          else if (status == '4') {
            return "待审核";
          }
          else if (status == '5') {
            return "审核中";
          }
          else if (status == '6') {
            return "未澄清";
          }
          else if (status == '7') {
            return "已澄清";
          }
          else if (status == '8') {
            return "已审核";
          }
        }
      },
      resultConvert: function (status) {
        // 审核结果(0.未审核，1.审核通过，2.待确认，3.审核不通过)
        if (status == null || status == '' || status == 'undefined') {
          return '未审核'
        } else {
          if (status == '0') {
            return "未审核";
          }
          else if (status == '1') {
            return "审核通过";
          } else if (status == '2') {
            return "审核中";
          } else if (status == '3') {
            return "审核不通过";
          }
        }
      }
    }
  }
</script>
