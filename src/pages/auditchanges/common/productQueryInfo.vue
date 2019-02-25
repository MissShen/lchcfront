<template>
  <el-dialog
    title="澄清"
    :close-on-click-modal="false"
    :visible.sync="visible"
    class="audit-dialog"
    append-to-body>
    <div class="tableset">
      <el-table
        :data="resData.list"
        border
        stripe
        style="width:100%">
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
              :imgIdListUnUnique=scope.row.QUERYFILE
              :operate="false"
            ></images-preview>
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
      <div>
        <el-form :model="dataForm" label-width="160px" size="small" label-position="left">
          <el-row>
            <el-col :span="24">
              <el-form-item label="澄清内容" prop="content">
                <el-input type="textarea" :rows="3" v-model="dataForm.VALUE" placeholder="请输入澄清内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="澄清文件">
                <upload-button
                  buttonFlag="CLARIFYFILE"
                  :fileListFlag='dataForm["CLARIFYFILE"]'
                  fileType="4"
                  @uploadList="getUploadList">
                </upload-button>
                <images-preview
                  refName="CLARIFYFILE"
                  ref="imagesPreview"
                  :operate="!showFlag"
                  :imgIdListUnUnique="dataForm['CLARIFYFILE']"
                  @imgIdListChange="uploadList"></images-preview>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
       <el-button v-if="!showFlag" type="primary" @click="submit()">提交</el-button>
        <el-button @click="closeForm">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {selectQueryInfoByField, selectClarify, insert} from 'src/axios/auditchanges/messageClarify/productClarify'
  import {queryDeclareGmp, queryPROVINCE} from 'src/axios/auditchanges/messageDeclare/product'
  import {queryShowGmp} from 'src/axios/auditchanges/messageChanges/productChange'
  import imagesPreview from 'src/pages/auditchanges/common/imagesPreview'
  import uploadButton from 'src/pages/auditchanges/common/uploadButton'

  export default {
    name: "productQueryInfo",
    components: {
      imagesPreview,
      uploadButton
    },
    data() {
      return {
        isPrice:false,
        showFlag: false,
        visible: false,
        submitFlag:false,
        field: '',
        foreignId: '',
        flagForm: '',
        talkType: '2',
        gmpList: [],
        dataForm: this.metaDataForm(),
        showForm: this.metaShowForm(),
        resData: this.metaData(),
        rules: {
          content: {required: true, message: '澄清内容不能为空', trigger: 'blur'}
        },
        provinceList: [],//省份
        addInfoFlag: false,//是否是附加信息
        annex: {}
      }
    },
    created() {
    },
    methods: {
      metaData() {
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
            list: []
          }
        }
      },
      metaDataForm() {
        return {
          VALUE: '',
          CLARIFYFILE: []
        }
      },
      metaShowForm() {
        return {
          ID: '',
          AUDITFLAG: false,
          CLARIFYFLAG: false
        }
      },
      // ---------------
      async list(field, showForm, flagForm, annex, isPrice) {
        // this.$nextTick(() => {
        //   this.$refs['dataForm'].resetFields()
        // })
        //用ID去查质疑内容和澄清内容
        this.isPrice = isPrice;
        this.talkType = showForm.TALKTYPE;
        this.showFlag = showForm.SHOWFLAG;
        this.flagForm = flagForm;
        this.field = field;
        this.foreignId = showForm.ID;
        await selectQueryInfoByField(this.foreignId, field).then(res => {
          this.resData = res.data
          //SOURCE
          //PATENTFLAG
          //PROTECTIONFLAG
          //GMP
          //CATALOGAREAcatalogAreaJson:{"0":"西药竞价谈判目录","1":"中药竞价谈判目录","2":"西药低价药品目录","3":"中药低价药品目录","4":"短缺药品目录"},
        })
        if (this.field == 'PROVINCE') {
          await queryPROVINCE().then(res => {
            this.provinceList = res.data
          })
        }
        for (let x in this.resData.list) {
          if (this.field == "SOURCE") {
            //产品来源
            this.resData.list[x].VALUE = {"0": "国产", "1": "进口", "2": "进口分装"}[this.resData.list[x].VALUE]
          } else if (this.field == "PATENTFLAG") {
            this.resData.list[x].VALUE = {"0": "否", "1": "是"}[this.resData.list[x].VALUE]
          } else if(this.field == "PRICETYPE"){
            this.resData.list[x].VALUE = {"0": "全国最低中标价", "1": "计算价格", "2": "无最低中标价","3":"京津冀三地价格"}[this.resData.list[x].VALUE]
          } else if (this.field == "PROTECTIONFLAG") {
            this.resData.list[x].VALUE = {"0": "否", "1": "是"}[this.resData.list[x].VALUE]
          } else if (this.field == "CATALOGAREA") {
            this.resData.list[x].VALUE = {
              "0": "西药竞价谈判目录",
              "1": "中药竞价谈判目录",
              "2": "西药低价药品目录",
              "3": "中药低价药品目录",
              "4": "短缺药品目录",
              "5": "国家谈判目录"
            }[this.resData.list[x].VALUE]
          } else if (this.field == "GMP") {
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
          } else if (this.field == "JYDATE") {
            let jyDateArr = this.resData.list[x].VALUE.split(",");
            if (jyDateArr[0] != "") {
              this.resData.list[x].VALUE = jyDateArr[0];
            } else {
              if (jyDateArr[1] == '1') {
                this.resData.list[x].VALUE = "永久有效";
              }
            }
          } else if (this.field == "PROVINCE") {
            for (let k in this.provinceList) {
              if (this.resData.list[x].VALUE == this.provinceList[k].ID) {
                this.resData.list[x].VALUE = this.provinceList[k].NAME_CHN
              }
            }
          }
        }
        console.log("================123", this.resData)
        //查当前产品当前字段是否有澄清信息

        selectClarify(this.foreignId, field).then(res => {
          if (res.data == undefined) {
            this.dataForm = this.metaDataForm();
          } else {
            this.dataForm.VALUE = res.data.VALUE;
            if (res.data.CLARIFYFILE == undefined) {
              this.dataForm.CLARIFYFILE = [];
            } else {
              this.dataForm.CLARIFYFILE = res.data.CLARIFYFILE;
            }
          }
        })

        //有澄清信息 add = false;
        /* this.data= [{'ID':id},{'ID':'质疑内容'}];*/
        //this.showForm.AUDITFLAG = showForm.AUDITFLAG;
        //this.showForm.CLARIFYFLAG = showForm.CLARIFYFLAG;
        this.visible = true;
        this.$nextTick(() => {
          for (let x in this.resData.list) {
            if (!this.resData.list[x].QUERYFILE) {
              this.resData.list[x].QUERYFILE = []
            }
            this.resData.list[x].QUERYFILE.splice(0, 0);
          }
        })

        //是否来自附加信息 带数字则是 true为来自附加信息
        let numExp = /(\d)/ig;
        this.addInfoFlag = numExp.test(field)
        this.annex = annex
        console.log(this.annex)
      },
      submitUseIf(res){
        //如果请求不成功则打开按钮限制
        if(!res.success){
          this.submitFlag = false;
          this.$message.error("澄清失败")
        }else{
          if(this.isPrice) {
            this.flagForm.forEach((item,index) =>{
              if(item.ID == this.foreignId){
                this.$set(this.flagForm[index],this.field,'0')
              }
            })
          }else {
            this.$set(this.flagForm, this.field, '0');
          }
          this.$message({
            message:"澄清成功",
            type:'success'
          })
          this.visible = false;
        }
      },
      submit() {
        this.submitFlag = true;
        if(this.field == "DISCOUNTPRICE"){
          for(let i = 1;i<this.flagForm.length;i++) {
            insert(this.field, this.dataForm.VALUE, this.talkType, this.flagForm[i].ID, this.dataForm.CLARIFYFILE)
          }
        }
        insert(this.field, this.dataForm.VALUE, this.talkType, this.foreignId, this.dataForm.CLARIFYFILE).then(res => {
          this.submitUseIf(res)
        })

      },
      closeForm() {
        this.visible = false;
      },
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.list(this.dataForm.FIELD, this.dataForm)
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.list(this.dataForm.FIELD, this.dataForm)
      },
      //本地上传示例
      getUploadList(res) {
        res.data.forEach(function (item) {
          this.dataForm[res.refName].push(item)
        }.bind(this))
      },
      uploadList(res) {
        this.$set(this.dataForm, res.refName, res.data);
      }
    }
  }
</script>

<style scoped>
  .margin-top15 {
    margin-top: 10px;
  }
</style>
