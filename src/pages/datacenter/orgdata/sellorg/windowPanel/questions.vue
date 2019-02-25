<template>
  <el-dialog
    :title="'企业质疑列表'"
    :close-on-click-modal="false"
    width="80%"
     append-to-body="true"
    :visible.sync="visible">

    <div class="tableset">
      <el-table
        :data="resData.list"
        @sort-change="sortChangeFunc"
        border
        stripe>
        <el-table-column label="质疑图片" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <images-preview class="img-pre-text" :dilogFlag="false" v-if="scope.row.orgFileIds.length>0" :imgIdListUnUnique="scope.row.orgFileIds"></images-preview>
          </template>
        </el-table-column>
        <el-table-column label="质疑内容" prop="question_editval" sortable="custom" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.questionEditval }}</span>
          </template>
        </el-table-column>
        <el-table-column label="质疑发起人" prop="question_username" sortable="custom" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.questionUsername }}</span>
          </template>
        </el-table-column>
        <el-table-column label="质疑发起时间" prop="question_date" sortable="custom" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ setQuestionDate(scope.row.questionDate) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="质疑类型" prop="question_type" sortable="custom" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ setQuestionType(scope.row.questionType) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="回复状态" prop="reply_flag" sortable="custom" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ setReplyFlag(scope.row.replyFlag) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="回复内容" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.replyContent }}</span>
          </template>
        </el-table-column>
         <el-table-column label="操作">
          <template slot-scope="scope">
            <a @click="replyBtn(scope.row.id)">回复</a>
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
    <span slot="footer">
      <el-button size="small" @click="visible = false">关闭</el-button>
    </span>
     <el-dialog
    :title="'质疑回复'"
    :close-on-click-modal="false"
    width="80%"
    append-to-body="true"
    :visible.sync="reviewShow"
    >
    <el-form :model="fromReply" ref="fromReply" label-width="140px"  >
      <el-form-item label="请输入回复内容" prop="replyCR">
          <el-input placeholder="请输入回复内容"  type="textarea" :rows="3" v-model="fromReply.replyContent">

          </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button size="small" type="primary" @click="submitReply('fromReply')">提交</el-button>
      <el-button size="small" @click="reviewShow = false">关闭</el-button>
    </span>
    </el-dialog>
  </el-dialog>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  import imagesPreview from 'src/pages/datacenter/windowPanel/imagesPreview';
  import {queryQuestions,saveReply} from 'src/axios/datacenter/orgdata/sell/seller'
  import {keyBoardEnter} from "src/utils";
  import moment from 'moment'

  export default {
    components: {ElCol,moment,imagesPreview},
    data() {
      return {
        visible: false,
        id:undefined,
        moreFormVisible:false,
        moreVisible:true,
        resData: this.metaData(),
        query: this.metaQuery(),
        radio: undefined,
        reviewShow:false,
        fromReply:{
          replyId:'',
          replyContent:''
        },
        rules:{
          replyCR:{ required: true, message: '请填写回复内容', trigger: 'blur' },
        }
      }
    },
    methods: {
      metaData() {
        return {
          // 前后台交互数据封装格式
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
      metaQuery() {
        return {
          // 表单查询数据初始化
          id:undefined,
          orderBy:'question_date desc'
        }
      },
      submitReply(fromReply) {
        console.log(this.fromReply)
        if(!this.fromReply.replyContent){
          return this.$message.error('请填写回复内容');
        }
        this.$refs[fromReply].validate((valid) => {
          if (valid) {
            saveReply(this.fromReply).then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                }
              });
              this.list();
              this.reviewShow = false;
            })
          }
        });
      },
      //  排序查询
      sortChangeFunc(value){
        let sortType=" desc"
        if(value.order != null) {
          if (value.order.startsWith("asc")) {
            sortType = " asc";
          }
          this.query.orderBy = value.prop + sortType;
          this.list();
        }
      },
      fillData(id) {
        this.visible = true;
        if(!!this.$store.state.pageSeach.pageNum){
          this.query = this.$store.state.pageSeach;
          this.resData.pageSize = this.$store.state.pageSeach.pageSize;
          this.resData.pageNum = this.$store.state.pageSeach.pageNum;
        }
        this.query.id=id;
        this.$store.state.pageSeach=this.query;
        this.list();
      },
      replyBtn(id){
        this.reviewShow = true;
        this.fromReply.replyId = id;
      },
      //  获取药品名分页列表
      list () {
        this.$store.state.pageSeach = this.query;
        queryQuestions(this.query,this.resData).then(res => {
          this.resData = res.data
        })
      },
      // 质疑时间
      setQuestionDate(dateTime){
        var result;
        if(typeof (dateTime)!='undefined'&& dateTime!=null ){
          result=moment(dateTime).format("YYYY-MM-DD");
        }
        return result;
      },
      //  质疑类型
      setQuestionType(type){
        var typeName='';
        switch(type){
          case '0':
            typeName='注册';
            break;
          case '1':
            typeName='申报';
            break;
          case '2':
            typeName='变更';
            break;
          case '3':
            typeName='转产';
            break;
        }
        return typeName;
      },
      //  回复标志
      setReplyFlag(flag){
        var replyName='';
        switch(flag){
          case '0':
                replyName = '未回复';
                break;
          case  '1':
                replyName = '已回复';
                break;
        }
        return replyName;
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.$store.state.pageSeach.pageSize = val
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.$store.state.pageSeach.pageNum = val
        this.resData.pageNum = val
        this.list()
      }
    }
  }
</script>

