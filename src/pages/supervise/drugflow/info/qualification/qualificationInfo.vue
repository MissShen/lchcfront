<template>
  <div>
    <el-table
      :data="resQualificationData"
      :show-header="headVisible">
      <!--      <el-table-column prop="projectName" label="项目"></el-table-column>
            <el-table-column prop="declarant" label="最新申报人"></el-table-column>
            <el-table-column prop="declareTime" label="申报时间"></el-table-column>
            <el-table-column prop="queryTimes" label="质疑次数"></el-table-column>
            <el-table-column prop="auditTimes" label="审核次数"></el-table-column>
            <el-table-column prop="clarifyTimes" label="澄清次数"></el-table-column>
            <el-table-column prop="changeTimes" label="变更次数"></el-table-column>
            <el-table-column prop="passTimes" label="通过时间"></el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <a class="operation-btn" @click="showAuditDetail(scope.row.id)">质疑审核明细</a>
                <a class="operation-btn" @click="showChangeDetail(scope.row.id)">查看变更详情</a>
              </template>
            </el-table-column>-->
      <el-table-column label="产品信息">
        <template slot-scope="scope">
          <div class="tb-from">
            <el-row :span="24">
              <el-col :span="12">
                <p>申报企业名称：{{scope.row.declareOrgName}}</p>
              </el-col>
              <el-col :span="12">
                <p>申报日期：{{scope.row.declareDate}}</p>
              </el-col>
            </el-row>
            <el-row :span="24">
              <el-col :span="12">
                <p>初审人员：{{scope.row.firstAuditPerson}}</p>
              </el-col>
              <el-col :span="12">
                <p>初审日期：{{scope.row.firstAuditDate}}</p>
              </el-col>
            </el-row>
            <el-row :span="24">
              <el-col :span="12">
                <p>复审人员：{{scope.row.reAuditPerson}}</p>
              </el-col>
              <el-col :span="12">
                <p>复审日期：{{scope.row.reAuditDate}}</p>
              </el-col>
            </el-row>
            <div class="s-title"><i class="el-icon-document"></i>质疑、澄清情况如下</div>
            <el-row :span="24">
              <el-col :span="12">
                <p>质疑名称：{{scope.row.talkName }}</p>
              </el-col>
              <el-col :span="12">
                <p>质疑内容：{{scope.row.talkContent }}</p>
              </el-col>
            </el-row>
            <el-row :span="24">
              <el-col :span="12">
                <p>质疑时间：{{scope.row.talkDate }}</p>
              </el-col>
              <el-col :span="12">
                <p>质疑企业：{{scope.row.talkOrgName }}</p>
              </el-col>
            </el-row>
            <el-row :span="24">
              <el-col :span="12">
                <p>回复人员：{{scope.row.replyPerson }}</p>
              </el-col>
              <el-col :span="12">
                <p>回复内容：{{scope.row.replyContent }}</p>
              </el-col>
            </el-row>
            <el-row :span="24">
              <el-col :span="24">
                <p>回复时间：{{scope.row.gmpNumber }}</p>
              </el-col>
            </el-row>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <audit-detail ref="AuditDetail"></audit-detail>
    <change-detail ref="ChangeDetail"></change-detail>
  </div>
</template>

<script>

  import AuditDetail from './auditDetail'
  import ChangeDetail from './changeDetail'
  import {findQualificationInfoByProductId} from 'src/axios/supervise/drug-flow/drugFlow'

  export default {
    components: {
      AuditDetail,
      ChangeDetail
    },
    name: "qualification-info",
    data() {
      return {
        productId: this.$route.query.id,
        headVisible: false,
        resQualificationData: [],
        queryData: this.metaQuery(),
      }
    },
    methods: {
      metaData() {
        return {
          pageNum: 1,
          pageSize: 10,
          total: 0,
          pages: 0,
          list: [
            {
              projectName: '北京市昌平区采购项目',
              declarant: '西安杨森',
              declareTime: '2001/1/1 01:01',
              queryTimes: '4',
              auditTimes: '4',
              clarifyTimes: '2',
              changeTimes: '1',
              passTimes: '2001/1/1 01:01',
            }, {
              projectName: '北京市朝阳区采购项目',
              declarant: '拜耳药业',
              declareTime: '2001/1/1 01:01',
              queryTimes: '3',
              auditTimes: '2',
              clarifyTimes: '1',
              changeTimes: '2',
              passTimes: '2001/1/1 01:01',
            }, {
              projectName: '北京市西城区采购项目',
              declarant: '拜耳药业',
              declareTime: '2001/1/1 01:01',
              queryTimes: '3',
              auditTimes: '2',
              clarifyTimes: '1',
              changeTimes: '1',
              passTimes: '2001/1/1 01:01',
            },
          ]
        }
      },
      metaQuery() { // 查询数据封装格式
        return {
          name: undefined,
          code: undefined
        }
      },
      metaList() {

      },
      showAuditDetail(id) {
        this.$nextTick(() => {
          this.$refs.AuditDetail.fillData(id)
        })
      },
      showChangeDetail(id) {
        this.$nextTick(() => {
          this.$refs.ChangeDetail.fillData(id)
        })
      },
      getQualificationInfoByProductId() {
        findQualificationInfoByProductId(this.productId).then((res) => {
          this.resQualificationData = [];
          this.resQualificationData.push(res.data)
        })
      },
    },
    mounted() {
      this.getQualificationInfoByProductId();
    }
  }
</script>

<style scoped>

</style>
