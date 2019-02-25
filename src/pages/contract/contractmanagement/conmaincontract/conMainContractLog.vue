<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="contractLogs"
          border
          stripe>
          <el-table-column label="版本号" prop="jiaName" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>version_{{ moment(scope.row.logDate).format("YYYYMMDDHHmmss") }}</span>
            </template>
          </el-table-column>
          <el-table-column label="变更类型" prop="yiName" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.conStateName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="变更时间" prop="productNum" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <el-tooltip :enterable="false" class="item" effect="dark" placement="top-start">
                <div slot="content">{{ scope.row.logDate }}</div>
                <span v-if="scope.row.logDate">{{ moment(scope.row.logDate).format("YYYY-MM-DD") }}</span>
                <span v-else></span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="下载附件" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <template v-if="scope.row.contractFile">
                <a class="operation-btn" type="text" size="small" @click="downLoadFile(scope.row.id)">下载</a>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

  </div>

</template>
<script>

  // 引入用户相关请求  引自js文件
  import { queryContractLogList } from 'src/axios/contract/contractmanagement/signEntrustmentAgreement'
  import { downLoadLogPdf } from 'src/axios/contract/contractmanagement/contractManagement'

  import fileUpload from 'js-file-download'
  import moment from "moment";

  export default {
    data () {
      return {
        contractId:undefined,
        contractLogs:[],
        partyCode:undefined,
      }
    },
    created () {
      this.contractId = this.$route.params.contractId;
      this.partyCode = this.$route.params.partyCode;
      console.log(this.contractId + "---" + this.partyCode);
      this.list();
    },
    methods: {
      moment,
      //  获取用户分页列表
      list () {
        queryContractLogList(this.contractId, this.partyCode).then(res => {
          console.log(res);
          this.contractLogs = res.data
        })
      },
      //  下载PDF
      downLoadFile (logId) {
        downLoadLogPdf(logId).then(res => {
          let headers = res.headers
          let title = ""
          if (!title) {
            console.info("title",title)
            const fileName = headers['content-disposition'];
            console.info("fileName " , fileName)
            console.info(fileName)
            title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
          }
          fileUpload(res.data, title, "application/pdf")
        })
      }
    }
  }
</script>
