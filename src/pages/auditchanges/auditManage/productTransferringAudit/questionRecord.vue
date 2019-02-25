<template>
  <div>
    <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
      <el-form-item>
        <el-select v-model="query.upTypeId" placeholder="全部" size="small">
          <el-option
            v-for="item in productTransferOpts"
            :label="item.value"
            :value="item.id"
            :key="item.id">
          </el-option>
        </el-select>
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
    <div class="tablebox">
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
        <el-table-column label="回复状态">
          <template slot-scope="scope">
            <span>{{scope.row.REPLYFLAG=='0'?'未回复':'已回复'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="回复内容">
          <template slot-scope="scope">
            <span>{{scope.row.REPLYCONTENT==''?'暂无':scope.row.REPLYCONTENT==null?'暂无':scope.row.REPLYCONTENT==undefined?'暂无':scope.row.REPLYCONTENT}}</span>
          </template>
        </el-table-column>
        <el-table-column label="质疑内容">
          <template slot-scope="scope">
            <a @click="openVisible(scope.row.ID,scope.row.REPLYFLAG)">查看</a>
            &nbsp;
            <a v-if="scope.row.REPLYFLAG=='0'" type="default" @click="replyTransfer(scope.row.QUESTIONID)"
               plain>回复
            </a>
            <a v-else style="color: rgba(55,64,52,0.31)">已回复</a>
          </template>
        </el-table-column>
      </el-table>
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


    <el-dialog top="2vh" :close-on-click-modal="false" width="50%" :visible.sync="dialogVisible">
      <el-form>
        <div v-for="item in imageList">
          <el-form-item label="质疑内容：">
            <span>{{item.questionEditval}}</span>
          </el-form-item>
          <el-form-item label="质疑文件:">
            <images-preview refName="preLoadBtn" :imgIdListUnUnique="item.fileIds"
                            @imgIdListChange="uploadList"></images-preview>
          </el-form-item>
          <el-form-item label="澄清内容:">
            <span>{{item.talkContent}}</span>
          </el-form-item>
          <el-form-item label="澄清文件:">
            <images-preview refName="preLoadBtn" :imgIdListUnUnique="item.talkInfoFileIds"
                            @imgIdListChange="uploadList"></images-preview>
          </el-form-item>
          <div v-if="replyFlag=='1'">
            <el-form-item label="回复内容:">
              <span>{{item.replyContent}}</span>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <span slot="footer" style="float: inherit">
      <el-button @click="dialogVisible=false">关闭</el-button>
    </span>
    </el-dialog>

    <el-dialog top="2vh" :close-on-click-modal="false" width="50%" :visible.sync="visible">
      <el-form>
        <el-form-item label="回复内容：">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="replyTran.replyContent">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" style="float: inherit">
      <el-button @click="transferReply()">提交</el-button>
      <el-button @click="visible=false">关闭</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  import {findByOperatorType} from 'src/axios/auditchanges/messageChanges/upType';
  import {
    findTransferQuestionList,
    findTransferQuestion,
    transferReply
  } from 'src/axios/auditchanges/messageChanges/productTransfer'
  import imagesPreview from 'src/pages/auditchanges/common/imagesPreview'
  import uploadButton from 'src/pages/auditchanges/common/uploadButton'
  import chooseFiles from 'src/pages/auditchanges/common/chooseFiles';

  export default {
    name: "question-record",
    created() {
      findByOperatorType(this.productTransferOpts).then(res => {
        this.productTransferOpts = res.data;
        this.productTransferOpts.splice(0, 0, {id: '', value: '全部'})
      });
      this.list()
    },
    components: {
      imagesPreview, uploadButton, chooseFiles
    },
    data() {
      return {
        productTransferOpts: [],
        resData: this.metaData(),
        query: this.reqData(),
        activeName: 'fourth',
        imageList: [],
        dialogVisible: false,
        replyTran: this.replyData(),
        visible: false,
        replyFlag: '',
      }
    },
    methods: {
      transferReply() {
        transferReply(this.replyTran).then(res => {
          if (res.code == 200) {
            this.$message({
              message: '提交成功！',
              type: 'success'
            });
            window.location.reload();
          }
        })
      },
      replyData() {
        return {
          questionId: '',
          replyContent: '',
        }
      },

      replyTransfer(questionId) {
        this.replyTran.questionId = questionId;
        this.visible = true;
      },

      openVisible(id, replyFlag) {
        this.dialogVisible = true;
        console.log(id)
        findTransferQuestion(id).then(res => {
          console.log(res.data)
          this.imageList = res.data
        })
        this.replyFlag = replyFlag;
      },
      uploadList(res) {
        this.fromUploadIdList = res.data
      },


      restQuery() {
        this.query = this.reqData();
        this.list();
      },
      reqData() {
        return {
          orgId: '',
          upTypeId: '',
          startDate: '',
          endDate: ''
        }
      },
      list() {
        this.query.orgId = this.$route.params.id;
        console.log(this.query.orgId)
        findTransferQuestionList(this.query).then(res => {
          console.log(res)
          this.resData = res.data;
          if (this.resData.pageNum == 0) {
            this.resData.pageNum = 1;
          }
        })
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
