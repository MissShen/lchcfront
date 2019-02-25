<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible"
    class="audit-dialog"
    append-to-body>
    <div class="tableset">
      <el-table
        :data="resData.list"
        border
        stripe>
        <el-table-column label="质疑人">
          <template slot-scope="scope">
            <span>{{scope.row.USERNAME}}</span>
          </template>
        </el-table-column>
        <el-table-column label="质疑内容">
          <template slot-scope="scope">
            <span v-if="addInfoFlag" v-for="(att,index) in annex" :key="index">
              <span v-for="(options,opIndex) in att.options" :key="opIndex">
                  <span
                    v-if="(options.type == '1' || options.type == '2' || options.type == '3' || options.type == '4' ) && (field == options.id)">
                    <span>{{scope.row.VALUE}}</span>
                  </span>
                 <span v-if="options.type== '5' && field == options.id"
                       v-for="(item,index) in options.options"
                       :key="index">
                        <span class="width-260 marright30" v-if="item.value == checkItem"
                              v-for="(checkItem,checkIndex) in scope.row.VALUE.split(',')" :key="checkIndex">{{item.text}}</span>
                      </span>
                <span
                  v-if="options.type== '6' && field == options.id" v-for="(item,itemindex) in options.options"
                  :key="itemindex">
                  <span class="width-260"
                        v-if="item.value == scope.row.VALUE">
                        {{item.text}}
                  </span>

                      </span>
              </span>
            </span>
            <span v-if="!addInfoFlag">{{scope.row.VALUE}}</span>
          </template>
        </el-table-column>
        <el-table-column label="质疑时间">
          <template slot-scope="scope">
            <span>{{scope.row.QUESTIONDATE}}</span>
          </template>
        </el-table-column>
        <el-table-column label="查看图片">
          <template slot-scope="scope">
            <images-preview
              ref="imagesPreview"
              :imgIdListUnUnique=scope.row.FILEPATH
              :operate="false"
            ></images-preview>
          </template>
        </el-table-column>
        <el-table-column label="是否回复">
          <template slot-scope="scope">
            <span>{{scope.row.REPLYFLAG=='0'?"否":"是"}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="operates">
              <span>
              <a class="operation-btn" @click="reply(scope.row.QUESTIONID)">回复</a>
              </span>
            </div>
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
      <div v-if = "clarify">
        <el-form :model="dataForm" label-width="160px" size="small" label-position="right" >
          <el-row>
            <el-col :span="22">
              <el-form-item label="澄清内容">
                <span>{{clarifyInfo}}</span>
                <images-preview
                  ref="imagesPreview"
                  :imgIdListUnUnique=clarifyFile
                  :operate="false"
                ></images-preview>
              </el-form-item>
            </el-col>
          </el-row>
          <!--<el-row>-->
            <!--<el-col :span="22">-->
              <!--<el-form-item label="澄清回复">-->
                <!--<el-input type="textarea" :rows = "3" v-model="dataForm.REPLYCONTENT" placeholder="请输入澄清回复"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
          <!--</el-row>-->
        </el-form>
      </div>
    </div>
    <product-reply-query-info ref="productReplyQueryInfo" @submitChange="filedChange"></product-reply-query-info>
    <span slot="footer" class="dialog-footer">
       <!--<el-button v-if="this.buttonFlag && this.dataForm.ID" type="primary" @click="submit()">保存</el-button>-->
        <el-button @click="closeForm">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {updateReply,queryQuestionInfoByField,queryClarifyInfoByField} from 'src/axios/auditchanges/auditManage/productDeclareAudit'
  import {queryDeclareGmp,queryPROVINCE} from 'src/axios/auditchanges/messageDeclare/product'
  import {queryShowGmp} from 'src/axios/auditchanges/messageChanges/productChange'
  import productReplyQueryInfo from './productReplyQueryInfo'
  import imagesPreview from 'src/pages/auditchanges/common/imagesPreview'
  export default {
    components:{
      productReplyQueryInfo,imagesPreview
    },
    data() {
      return {
        id:'',
        isPrice: false,
        visible: false,
        buttonFlag:true,
        clarify:false,
        submitFlag:false,
        clarifyInfo:'',
        clarifyFile:[],
        field:'',
        num:0,
        dataForm: this.metaDataForm(),
        showForm: this.metaShowForm(),
        flagForm:'',
        resData: this.metaData(),
        provinceList:[],//省份
        addInfoFlag: false,//是否是附加信息
        annex: {},
      }
    },
    created() {
    },
    methods: {
      filedChange(res){
        this.$emit('queryChange',res)
      },
      metaData () {
        return {
          resData: { // 前后台交互数据封装格式
            pageNum: 0,
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
            list: [],
          }
        }
      },
      metaDataForm() {
        return {
          REPLYCONTENT: ''
        }
      },
      metaShowForm() {
        return {
          ID:'',
          AUDITFLAG:false,
          CLARIFYFLAG:false
        }
      },
      // ---------------
      async list(field,showForm,flagForm,annex , isPrice) {
        this.isPrice = isPrice;
        this.field = field;
        this.flagForm = flagForm;
        // this.$nextTick(() => {
        //   this.$refs['dataForm'].resetFields()
        // })
        //用ID去查质疑内容和澄清内容
        this.id = showForm.ID;
        let id = showForm.ID;
        this.buttonFlag = !showForm.SHOWFLAG
        this.dataForm.FIELD = field; // field
        if(field == "PROVINCE"){
          await queryPROVINCE().then(res => {
            this.provinceList = res.data
          })
        }
        await queryQuestionInfoByField(id,field).then(res=>{
          this.resData = res.data
          for (let x in this.resData.list){
            if(this.field == "SOURCE"){
              //产品来源
              this.resData.list[x].VALUE = {"0":"国产","1":"进口","2":"进口分装","3":"京津冀三地价格"}[this.resData.list[x].VALUE]
            }else if(this.field == "PATENTFLAG"){
              this.resData.list[x].VALUE = {"0":"否","1":"是"}[this.resData.list[x].VALUE]
            }else if(this.field == "PROTECTIONFLAG"){
              this.resData.list[x].VALUE = {"0":"否","1":"是"}[this.resData.list[x].VALUE]
            }else if(this.field == "CATALOGAREA"){
              this.resData.list[x].VALUE = {"0":"西药竞价谈判目录","1":"中药竞价谈判目录","2":"西药低价药品目录","3":"中药低价药品目录","4":"短缺药品目录","5":"京津冀三地价格"}[this.resData.list[x].VALUE]
            }else if(this.field == "GMP"){
              if(showForm.CHANGEFLAG){
                queryShowGmp(showForm.PRODUCTID).then(res => {
                  this.gmpList = res.data
                  for (let i in this.gmpList) {
                    if (this.gmpList[i].ID == this.resData.list[x].VALUE) {
                      this.resData.list[x].VALUE = this.gmpList[i].CERTIFICATE_NUMBER
                    }
                  }
                })
              }else {
                queryDeclareGmp(showForm.ID).then(res => {
                  this.gmpList = res.data
                  for (let i in this.gmpList) {
                    if (this.gmpList[i].ID == this.resData.list[x].VALUE) {
                      this.resData.list[x].VALUE = this.gmpList[i].CERTIFICATE_NUMBER
                    }
                  }
                })
              }
            }else if(this.field == "JYDATE"){
              let jyDateArr = this.resData.list[x].VALUE.split(",");
              if(jyDateArr[0] != ""){
                this.resData.list[x].VALUE = jyDateArr[0];
              }else{
                if(jyDateArr[1] == '1'){
                  this.resData.list[x].VALUE = "永久有效";
                }
              }
            }else if(this.field == 'PROVINCE'){
              for(let k in this.provinceList){
                if(this.resData.list[x].VALUE == this.provinceList[k].ID){
                  this.resData.list[x].VALUE = this.provinceList[k].NAME_CHN
                }
              }
            }
          }
        })
        await queryClarifyInfoByField(id,field).then(res=>{
          if(res.data != undefined) {
            this.clarify = true;
            this.dataForm.ID = res.data.CLARIFYID;
            this.clarifyInfo = res.data.VALUE;
            if(res.data.FILEPATH!=undefined) {
              this.clarifyFile = res.data.FILEPATH
            }
            this.dataForm.REPLYCONTENT = res.data.REPLYCONTENT;
            if (this.dataForm.REPLYCONTENT == null || this.dataForm.REPLYCONTENT == undefined || this.dataForm.REPLYCONTENT == '') {
              this.num = 1;
            }
          }else{
            this.clarify = false;
          }
        })
          this.visible = true
        this.$nextTick(() => {
          for(let x in this.resData.list){
            if(this.resData.list[x].FILEPATH) {
              this.resData.list[x].FILEPATH.splice(0, 0);
            }
          }
          if(this.clarifyFile) {
            this.clarifyFile.splice(0,0)
          }
        })

        //是否来自附加信息 带数字则是 true为来自附加信息
        let numExp = /(\d)/ig;
        this.addInfoFlag = numExp.test(field)
        this.annex = annex
      },
      submitUseIf(res){
        //如果请求不成功则打开按钮限制
        if(!res.success){
          this.submitFlag = false;
          this.$message.error("回复失败")
        }else{
          let count = parseInt(this.flagForm[this.field]) - this.num + "";
          this.$emit('queryChange',count)
          this.$message({
            message:"回复成功",
            type:'success'
          })
          this.visible = false;
        }
      },
      submit() {
        this.submitFlag = true;
        if(this.dataForm.ID == undefined){
          this.submitFlag = false;
          return;
        }
//        if(this.clarifyInfo && this.dataForm.REPLYCONTENT == undefined){
//          this.$message({
//            message: '请输入澄清回复',
//            type: 'warning'
//          });
//          this.submitFlag = false;
//          return
//        }
        //判断 add  --> true 代表新增  false 代表修改
        //add?insert(this.dataForm):update(this.dataForm);
        this.dataForm.TABLE = '1'
        updateReply(this.dataForm).then( res =>{
          this.submitUseIf(res)
        });

      },
      reply(id){
        //弹出回复质疑页
        this.$nextTick(() => {
          this.$refs.productReplyQueryInfo.list(id,this.flagForm,this.field,this.buttonFlag,this.resData,this.isPrice,this.id);
        })
      },
      closeForm() {
        this.visible = false;
        this.resData = this.metaData()
        this.dataForm = this.metaDataForm()
      },
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list(this.dataForm.FIELD,this.dataForm)
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list(this.dataForm.FIELD,this.dataForm)
      }
    }
  }
</script>

<style scoped>

</style>
