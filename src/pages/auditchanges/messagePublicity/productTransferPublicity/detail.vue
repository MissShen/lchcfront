<template>
  <div>

    <!--<div class="tabs-panel">-->
    <!--<span class="active">产品转产公示详情</span>-->
    <!--</div>-->

    <h4 style="padding: 10px; text-align: center;">将 「<span class="red">{{this.outOrgName}}</span>」 以下产品转移到 「<span
      class="red">{{this.inOrgName}} </span>」
    </h4>

    <div class="tablebox">
      <el-tabs v-model="activeName">
        <el-tab-pane label="本次转移产品" name="first">
          <div class="tableset">
            <el-table :data="resData.list" border stripe>
              <el-table-column label="产品名称">
                <template slot-scope="scope">
                  <div>
                    <div class="text-inline">{{ scope.row.productName }}</div>
                  </div>
                  <div class="text-inline">{{ scope.row.mixDosage }}</div>
                </template>
              </el-table-column>
              <el-table-column label="产品信息">
                <template slot-scope="scope">
                  <div class="pro-details">
                    <div class="text-inline">{{ scope.row.combined }}&nbsp;&nbsp;{{scope.row.wrap}}</div>
                  </div>
                  <div class="text-inline">{{ scope.row.abbr }}</div>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                  <div class="operates">
                    <span>
                      <a href="javascript:;" @click="openPreviewVisible(scope.row.id)" class="operation-btn">产品资质</a>
                    </span>
                    <span>
                      <a href="javascript:;" @click="productMessage(scope.row.pfpbId)" class="operation-btn">产品信息</a>
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
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="table-caption foot-btn">
      <div class="foot-left">
        <span v-if="pageFlag == 1">
          <span v-if="questionFlag == 0"><el-button type="default" @click="assail" plain>质疑</el-button></span>
          <span v-else><el-button disabled>已质疑</el-button></span>
        </span>
        <span><el-button type="default" @click="goBack" plain>返回</el-button></span>
      </div>
    </div>
    <!--<div class="ft-btn">-->
    <!--<span><el-button type="default" @click="goBack" plain>返回</el-button></span>-->
    <!--</div>-->

    <find-product-message ref="findProductMessage"></find-product-message>

    <file-preview ref="filePreview" @refresh="list()"></file-preview>


    <el-dialog top="2vh" :close-on-click-modal="false" width="50%" :visible.sync="visible">
      <div>
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="80px">
          <el-form-item label="理由">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="dataForm.questionEditval">
            </el-input>
          </el-form-item>
          <el-form-item label="上传附件">
            <!--<el-button >上传图片</el-button>-->
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
          <el-button type="primary" @click="insertQuestion">提交</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    productTransferDetail,
    insertTransferQuestion,
    findTransferQuestion
  } from 'src/axios/auditchanges/messagePublicity/productTransfer'
  import filePreview from '../../messageChanges/productMessageTransferDialog/filePreview'
  import findProductMessage from 'src/pages/auditchanges/messageDoubt/productMessageDoubt/findChangeProductMessage'
  import {findById} from "src/axios/auditchanges/messageChanges/productTransfer";
  import imagesPreview from 'src/pages/auditchanges/common/imagesPreview'
  import uploadButton from 'src/pages/auditchanges/common/uploadButton'

  export default {
    components: {filePreview, findProductMessage, imagesPreview, uploadButton},
    data() {
      return {
        resData: this.metaData(),
        activeName: 'first',//标签页默认选中第一个
        query: this.metaQuery(), // 查询初始化
        inOrgName: '',
        outOrgName: '',
        dataForm: this.metaForm(),
        dataRule: this.metaRules(),
        visible: false,
        fromUploadIdList: [],
        finalUploadIdList: [],
        fileType: '1',
        btnText: 'fileInput',
        questionFlag: 0,
        pageFlag: 0
      }
    },
    created() {
      this.resData.pageSize = 10;
      this.query.id = this.$route.params.id;
      this.pageFlag = this.$route.params.flag;
      findById(this.query.id).then(res => {
        this.inOrgName = res.data.inOrgName;
        this.outOrgName = res.data.outOrgName;
      });
      console.log(this.query.id)
      findTransferQuestion(this.query.id).then(res => {
        console.log(res)
        if (res.data.length > 0) {
          this.questionFlag = 1;
        }
      })
      this.list()
    },
    methods: {
      insertQuestion() {
        this.dataForm.foreignId = this.query.id;
        this.dataForm.fileIds = this.fromUploadIdList
        insertTransferQuestion(this.dataForm).then(res => {
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
      metaRules() {
        return {
          reason: [
            {required: true, message: '请输入原因', trigger: 'blur'}
          ]
        }
      },
      metaForm() { // 表单数据初始化
        return {
          questionEditval: '',
          foreignId: '',
          fileIds: []
        }
      },
      assail() {
        this.visible = true
      },
      productMessage(id) {
        console.log(id)
        this.$nextTick(() => {
          this.$refs.findProductMessage.list(id)
        })
      },
      openPreviewVisible(id) {
        this.updateDialog = true;
        this.$nextTick(() => {
          this.$refs.filePreview.openVisible(id, this.type)
        })
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
      metaQuery() { // 表单查询数据初始化
        return {
          id: undefined,
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      toggleQuery() {
        this.showQuery = !this.showQuery
      },
      //  获取用户分页列表
      list() {
        productTransferDetail(this.resData, this.query).then(res => {
          this.resData = res.data
          if (this.resData.pageNum == 0) {
            this.resData.pageNum = 1;
          }
        })
      },
      goBack() {
        this.$router.go(-1);
      },
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.list()
      }
    }
  }
</script>

