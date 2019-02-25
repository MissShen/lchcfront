<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="toChange">
      <el-tab-pane label="产品转入申报" name="first"/>
      <el-tab-pane label="产品转出确认" name="second"/>
      <el-tab-pane label="产品转产澄清" name="third"/>
      <el-tab-pane label="产品转产质疑记录" name="fourth"/>
    </el-tabs>
    <div class="tablebox">
      <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
        <el-form-item>
          <el-select v-model="query.transferType" placeholder="全部" size="small">
            <el-option
              v-for="item in productTransferOpts"
              :label="item.value"
              :value="item.id"
              :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.outOrgName" placeholder="转出企业名称" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="query.startDate"
            type="date"
            placeholder="创建开始日期"
            format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small">
          </el-date-picker>
          &nbsp;至&nbsp;
          <el-date-picker
            v-model="query.endDate"
            type="date"
            placeholder="创建结束日期"
            format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="list" size="small">查询</el-button>
          <el-button type="warning" @click="restQuery" size="small">重置</el-button>
        </el-form-item>

      </el-form>
      <el-table
        :data="resData.list"
        border
        stripe>
        <el-table-column label="申报号">
          <template slot-scope="scope">
            <span>{{scope.row.CODE}}</span>
          </template>
        </el-table-column>
        <el-table-column label="转产类型">
          <template slot-scope="scope">
            <span>{{scope.row.TRANSFERTYPE}}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请企业名称">
          <template slot-scope="scope">
            <span>{{scope.row.INORGNAME}}</span>
          </template>
        </el-table-column>
        <el-table-column label="转出企业名称">
          <template slot-scope="scope">
            <span>{{scope.row.OUTORGNAME}}</span>
          </template>
        </el-table-column>
        <el-table-column label="申报时间">
          <template slot-scope="scope">
            <span>{{scope.row.CREATEDATE}}</span>
          </template>
        </el-table-column>
        <el-table-column label="澄清状态">
          <template slot-scope="scope">
            <span>{{scope.row.STATES==0?'未澄清':'已澄清'}}</span>
          </template>
          s
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="assail(scope.row.ID,scope.row.QUESTIONFIELD)" v-if="scope.row.STATES==0">澄清</el-button>
            <el-button v-else disabled>已澄清</el-button>
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


    <el-dialog top="2vh" :close-on-click-modal="false" width="50%" :visible.sync="visible">
      <div>
        <el-form :model="dataForm" ref="dataForm" label-width="80px">
          <el-form-item label="质疑内容:">
            <span>{{questionObj.questionEditval}}</span>
          </el-form-item>
          <el-form-item label="质疑文件:">
            <images-preview refName="preLoadBtn" :operate="false" :imgIdListUnUnique="questionObj.fileId"></images-preview>
          </el-form-item>
          <el-form-item label="澄清内容:" prop="reason">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="dataForm.talkContent">
            </el-input>
          </el-form-item>
          <el-form-item label="上传附件">
            <upload-button
              :buttonFlag="btnText"
              :fileListFlag='fromUploadIdList'
              :fileType="fileType"
              @uploadList="getUploadList"></upload-button>
            <images-preview
              :refName="btnText"
              ref="imagesPreview"
              :imgIdListUnUnique="fromUploadIdList"
              @imgIdListChange="uploadList"></images-preview>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" style="float: inherit">
      <el-button @click="visible=false">取消</el-button>
          <el-button type="primary" @click="insertTalkInfo">提交</el-button>
    </span>
    </el-dialog>

  </div>
</template>

<script>
  import {
    insertTransferTalkInfo, findQuestionAndFiles
  } from 'src/axios/auditchanges/messagePublicity/productTransfer'
  import {findByOperatorType} from 'src/axios/auditchanges/messageChanges/upType';
  import {findTransferClarifyList} from 'src/axios/auditchanges/messageClarify/transferClarify'
  import imagesPreview from 'src/pages/auditchanges/common/imagesPreview'
  import uploadButton from 'src/pages/auditchanges/common/uploadButton'

  export default {
    components: {imagesPreview, uploadButton},
    name: "list",
    created() {
      this.list();
    },
    data() {
      return {
        resData: this.metaData(),
        query: this.reqData(),
        productTransferOpts: [],
        activeName: 'third',
        visible: false,
        fromUploadIdList: [],
        finalUploadIdList: [],
        fileType: '1',
        btnText: 'fileInput',
        dataForm: this.mataData(),
        questionObj: this.questionData()
      }
    },
    methods: {
      questionData() {
        return {
          id: '',
          questionEditval: '',
          fileId: []
        }
      },
      insertTalkInfo() {
        this.dataForm.fileIds = this.fromUploadIdList;
        insertTransferTalkInfo(this.dataForm).then(res => {
          console.log(res)
          if (res.code == 200) {
            this.$message({
              message: "提交成功",
              type: 'success',
            })
            this.visible = false;
            window.location.reload();
          }
        })
      },
      mataData() {
        return {
          foreignId: '',
          talkContent: '',
          fileIds: []
        }
      },
      getUploadList(data) {
        data = data.data;
        data.forEach(function (item) {
          this.fromUploadIdList.push(item)
        }.bind(this))
      },
      uploadList(data) {
        console.log(data);
        this.fromUploadIdList = data.data;
      },
      assail(id, questionField) {
        this.dataForm.foreignId = id;
        this.dataForm.questionField = questionField;
        findQuestionAndFiles(questionField).then(res => {
          this.questionObj.id = res.data.id;
          this.questionObj.questionEditval = res.data.questionEditval;
          this.questionObj.fileId = res.data.fileIds;
        })
        this.visible = true
      },
      toChange(t) {
        if (t.name == "second") {
          this.$router.push('/AUDIT/orgAffirm/productRollOutVerifyList');
        } else if (t.name == 'third') {
          this.$router.push('/AUDIT/orgClarify/productTransferClarify')
        } else if (t.name == 'first') {
          this.$router.push('/AUDIT/messageDeclare/productMessageTransferList')
        } else if (t.name == 'fourth') {
          this.$router.push('/AUDIT/messagePublicity/transferQuestionRecord')
        }
      },
      metaData() {
        return {
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
      reqData() {
        return {
          outOrgName: '',
          transferType: '',
          startDate: '',
          endDate: ''
        }
      },
      restQuery() {
        this.query = this.reqData();
      },
      list() {
        findTransferClarifyList(this.query, this.resData).then(res => {
          console.log(res.data);
          this.resData = res.data;
          if (this.resData.pageNum == 0) {
            this.resData.pageNum = 1;
          }
        }),
          findByOperatorType(this.productTransferOpts).then(res => {
            this.productTransferOpts = res.data;
            this.productTransferOpts.splice(0, 0, {id: '', value: '全部'})
          });
      },
      handleSizeChange(val) {
        this.$store.state.pageSeach.pageSize = val
        this.resData.pageSize = val
        this.list()
      }
      ,
      handleCurrentChange(val) {
        this.$store.state.pageSeach.pageNum = val
        this.resData.pageNum = val
        this.list()
      }
    }
  }
</script>

<style scoped>

</style>
