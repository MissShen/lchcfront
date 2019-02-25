<template>
  <el-dialog
    custom-class="w80"
    title="产品信息注册详情"
    :close-on-click-modal="false"
    :visible.sync="visible"
    id="pro-msg-register-view-box"
    class="audit-dialog"
    append-to-body
  >
    <div v-if="visible">
      <div class="main audit-main">
        <ul class="side side-init" id="pro-msg-register-side">
          <li v-for="(nodeItem,index) in nodesPosition" :key="index"><a @click="changeScrollHeight(nodeItem.nodePosition,'pro-msg-register-view-box','jump-msg-register-view',index)"  class="d_jump jump-msg-register-view">{{nodeItem.itemName}}</a></li>
        </ul>
        <div class="right-box">
          <div  id="pro-msg-register-view" class="from-view form-inner audit-info audit-form-input-box">
            <el-form ref="ruleForm" label-width="150px" size="small" label-position="left" class="demo-form-inline" :inline="true">
              <h3 class="cpjc">产品基础信息</h3>
              <el-row>
                <el-col :span="12">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="产品名称：" >
                      <span>{{ruleForm.PRODUCT}}</span>
                    </el-form-item></el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="剂型：">
                        <span>{{ruleForm.DOSAGE}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="商品名：">
                      <span>{{ruleForm.TRADE}}</span>
                    </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="转换比：">
                        <span>{{ruleForm.STANDRATE}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row>
                  <el-col :span="12">
                    <el-col :span="24">
                      <el-form-item label="规格：">
                        <span>{{ruleForm.SPEC}}</span>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-col :span="24">
                      <el-form-item label="单位：">
                        <span>{{ruleForm.METRIC}}</span>
                      </el-form-item>
                    </el-col>
                  </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-col :span="24">
                    <el-form-item label="包材：">
                      <span>{{ruleForm.WRAP}}</span>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="12">
                  <el-col :span="24">
                    <el-form-item label="生产企业：">
                      <span>{{ruleForm.MANUFACTURE}}</span>
                    </el-form-item>
                  </el-col>
                </el-col>
              </el-row>
              <!--<el-row>-->
                  <!--<el-col :span="12">-->
                    <!--<el-col :span="24">-->
                      <!--<el-form-item label="北京地标码：">-->
                        <!--<span>{{ruleForm.STANDARDCODE}}</span>-->
                      <!--</el-form-item>-->
                    <!--</el-col>-->
                  <!--</el-col>-->
                <!--</el-row>-->
              <el-row>
                  <el-col :span="12">
                    <el-col :span="24">
                      <el-form-item label="产品来源：">
                        <span v-if="ruleForm.SOURCE == 0">国产</span>
                        <span v-if="ruleForm.SOURCE == 1">进口</span>
                        <span v-if="ruleForm.SOURCE == 2">进口分装</span>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <!--<el-col :span="12">-->
                    <!--<el-col :span="24" v-if="ruleForm.SOURCE == 2">-->
                      <!--<el-form-item label="分装企业：" >-->
                        <!--<span></span>-->
                      <!--</el-form-item>-->
                    <!--</el-col>-->
                  <!--</el-col>-->
              </el-row>
              <el-row>
                  <el-col :span="12">
                    <el-col :span="24">
                      <el-form-item label="最小使用单位：" >
                        <span>{{ruleForm.UNIT}}</span>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-col :span="24">
                      <el-form-item label="批准文号：">
                        <span>{{ruleForm.PERMITNUMBER}}</span>
                      </el-form-item>
                      <images-preview class="" refName="1088" ref="imagesPreview" :imgIdListUnUnique="fileList['1088']" :operate="false"></images-preview>
                    </el-col>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="12">
                    <el-col :span="24">
                      <el-form-item label="中包装数量：">
                        <span>{{ruleForm.SWRAP}}</span>
                      </el-form-item>
                      <images-preview class="" refName="1013" ref="imagesPreview" :imgIdListUnUnique="fileList['1013']" :operate="false"></images-preview>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-col :span="24">
                      <el-form-item label="大包装数量：">
                        <span>{{ruleForm.BWRAP}}</span>
                      </el-form-item>
                      <images-preview class="" refName="1012" ref="imagesPreview" :imgIdListUnUnique="fileList['1012']" :operate="false"></images-preview>
                    </el-col>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="12">
                    <el-col :span="24">
                      <el-form-item label="药品检验报告编号：">
                        <span>{{ruleForm.JYNUM}}</span>
                      </el-form-item>
                      <images-preview class="" refName="1014" ref="imagesPreview" :imgIdListUnUnique="fileList['1014']" :operate="false"></images-preview>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-col :span="24">
                      <el-form-item label="有效期至：">
                        <span v-if="ruleForm.JYDATE">{{ruleForm.JYDATE}}</span>
                        <span v-if="ruleForm.JYYJ == '1'">永久有效</span>
                      </el-form-item>
                    </el-col>
                  </el-col>
              </el-row>
              <el-row v-if="ruleForm.SOURCE == 0 ">
                <el-col :span="12">
                  <el-col :span="24">
                    <el-form-item label="国产药品批件编号：">
                      <span>{{ruleForm.PRODUCTIONNUM}}</span>
                    </el-form-item>
                    <images-preview class="" refName="1016" ref="imagesPreview" :imgIdListUnUnique="fileList['1016']" :operate="false"></images-preview>
                  </el-col>
                </el-col>
                <el-col :span="12">
                  <el-col :span="24">
                    <el-form-item label="有效期至：">
                      <span>{{ruleForm.PRODUCTIONDATE}}</span>
                    </el-form-item>
                  </el-col>
                </el-col>
              </el-row>
              <el-row v-if="ruleForm.SOURCE == 1 || ruleForm.SOURCE == 2">
                <el-col :span="12">
                  <el-col :span="24">
                    <el-form-item label="进口药品注册证编号：">
                      <span>{{ruleForm.JKNUM}}</span>
                    </el-form-item>
                    <images-preview class="" refName="1015" ref="imagesPreview" :imgIdListUnUnique="fileList['1015']" :operate="false"></images-preview>
                  </el-col>
                </el-col>
                <el-col :span="12">
                  <el-col :span="24">
                    <el-form-item label="有效期至：">
                      <span>{{ruleForm.JKDATE}}</span>
                    </el-form-item>
                  </el-col>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-col :span="24" v-if="ruleForm.SOURCE == 0 || ruleForm.SOURCE == 2">
                    <el-form-item label="GMP证书编号：">
                      <span>{{ruleForm.GMPNUMBER}}</span>
                      <images-preview
                        ref="imagesPreview"
                        :imgIdListUnUnique="ruleForm.GMPFILE || []"
                        :operate="false"></images-preview>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="12">
                  <el-col :span="24" v-if="ruleForm.SOURCE == 1">
                    <el-form-item label="代理授权书有效期至：">
                      <span>{{ruleForm.AGENCYORGDATE}}</span>
                    </el-form-item>
                    <images-preview class="" refName="1006" ref="imagesPreview" :imgIdListUnUnique="fileList['1006']" :operate="false"></images-preview>
                  </el-col>
                </el-col>
              <el-col :span="12">
                <el-form-item label="是否专利保护：">
                  <span>{{ruleForm.PATENTFLAG == 1?'是':'否'}}</span>
                </el-form-item>
              </el-col>
              </el-row>
              <el-row v-if="ruleForm.PATENTFLAG == 1">
                <el-col :span="12">
                  <el-col :span="24">
                    <el-form-item label="专利保护开始时间：">
                      <span>{{ruleForm.PATENTBEGINDATE}}</span>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="12">
                  <el-col :span="24">
                    <el-form-item label="专利保护结束时间：">
                      <span>{{ruleForm.PATENTENDDATE}}</span>
                    </el-form-item>
                  </el-col>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-col :span="24">
                    <el-form-item label="药品质量标准：">
                      <span>{{ruleForm.STANDRD}}</span>
                    </el-form-item>
                    <images-preview class="" refName="1018" ref="imagesPreview" :imgIdListUnUnique="fileList['1018']" :operate="false"></images-preview>
                  </el-col>
                </el-col>
                <el-col :span="12">
                  <el-col :span="24">
                    <el-form-item label="是否中药保护：">
                      <span>{{ruleForm.PROTECTIONFLAG == 1?'是':'否'}}</span>
                    </el-form-item>
                  </el-col>
                </el-col>
              </el-row>
              <h3 class="sms">说明书信息</h3>
              <el-row>
                <el-col :span="12">
                  <el-col :span="24">
                    <el-form-item label="用法用量：">
                      <span>{{ruleForm.USEUNIT}}</span>
                    </el-form-item>
                  </el-col>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-col :span="24">
                    <el-form-item label="每次使用量最小值：">
                      <span>{{ruleForm.USEMIN}}</span>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="12">
                  <el-col :span="24">
                    <el-form-item label="每次使用量最大值：">
                      <span>{{ruleForm.USEMAX}}</span>
                    </el-form-item>
                  </el-col>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-col :span="24">
                    <el-form-item label="每日次数最小值：">
                      <span>{{ruleForm.NUMMIN}}</span>

                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="12">
                  <el-col :span="24">
                    <el-form-item label="平均日用量：">
                      <span>{{ruleForm.AVENUM}}</span>
                    </el-form-item>
                  </el-col>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-col :span="24">
                    <el-form-item label="每次使用极量：">
                      <span>{{ruleForm.MAXIMUN}}</span>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="12">
                  <el-col :span="24">
                    <el-form-item label="疗程：">
                      <span>{{ruleForm.TREATMENT}}</span>
                    </el-form-item>
                  </el-col>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="说明书：">
                  </el-form-item>
                  <images-preview class="" refName="1017" ref="imagesPreview" :imgIdListUnUnique="fileList['1017']" :operate="false"></images-preview>
                </el-col>
              </el-row>
          </el-form>
          </div>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="success" size="small" @click="query">质疑</el-button>
      <el-button type="primary" size="small" @click="queryInfo">质疑记录</el-button>
      <el-button size="small" @click="goBack">关闭</el-button>
    </span>
    <el-dialog
      title="质疑"
      :close-on-click-modal="false"
      :visible.sync="queryVisible"
      class="audit-dialog"
      append-to-body>
      <div class="tableset">
          <el-form label-width="160px" size="small" label-position="left">
            <el-row>
              <el-col :span="24">
                <el-form-item label="质疑内容" prop="content">
                  <el-input type="textarea" :rows="3" v-model="queryValue" placeholder="请输入质疑内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="质疑文件">
                  <upload-button
                    buttonFlag="QUERYFILE"
                    :fileListFlag='queryFiles'
                    fileType="3"
                    @uploadList="getUploadList">
                  </upload-button>
                  <images-preview
                    refName="QUERYFILE"
                    ref="imagesPreview"
                    :imgIdListUnUnique="queryFiles"
                    @imgIdListChange="uploadList"></images-preview>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitQuery">提交</el-button>
        <el-button @click="closeForm">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="质疑记录"
      :close-on-click-modal="false"
      :visible.sync="queryInfoVisible"
      class="audit-dialog"
      append-to-body>
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe
          style="width:100%">
          <el-table-column label="质疑时间">
            <template slot-scope="scope">
              <span>{{scope.row.QUERYDATE}}</span>
            </template>
          </el-table-column>
          <el-table-column label="质疑内容">
            <template slot-scope="scope">
              <span>{{scope.row.QUERYVALUE}}</span>
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
          <el-table-column label="回复时间">
            <template slot-scope="scope">
              <span>{{scope.row.REPLYDATE}}</span>
            </template>
          </el-table-column>
          <el-table-column label="回复内容">
            <template slot-scope="scope">
              <span>{{scope.row.REPLYVALUE}}</span>
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeQueryInfo">关闭</el-button>
      </span>
      </div>
    </el-dialog>
  </el-dialog>
</template>
<script>
  import {findById,findQueryInfo,submitQueryInfo,queryProduct} from 'src/axios/auditchanges/messageRegister/productMessageRegister'
  import {findFilesById} from 'src/axios/auditchanges/common/catProduct'
  import imagesPreview from 'src/pages/auditchanges/common/imagesPreview'
  import {boxScroll} from "src/components/mixins/scrolls"
  import uploadButton from 'src/pages/auditchanges/common/uploadButton'
  export default {
    mixins:[boxScroll],
    components:{
      imagesPreview,uploadButton
    },
    data() {
      return {
        queryValue:'',
        queryFiles:[],
        queryVisible:false,
        queryInfoVisible:false,
        visible:false,
        queryFlag : false,
        id:'',
        ruleForm:{
          CPID:undefined,
          CDID:undefined,
          CPAID:undefined,
          ISTEMP:undefined,
          PRODUCT:undefined,
          TRADE:undefined,
          DOSAGE:undefined,
          SPEC:undefined,
          STANDRATE:undefined,
          METRIC:undefined,
          WRAP:undefined,
          MANUFACTURE:undefined,
          STANDARDCODE:undefined,
          SOURCE: '0',
          UNIT:undefined,
          PERMITNUMBER:undefined,
          SWRAP:undefined,
          BWRAP:undefined,
          JYNUM:undefined,
          JYDATE:undefined,
          JYYJ:undefined,
          JKNUM:undefined,
          JKDATE:undefined,
          AGENCYORGDATE:undefined,
          PRODUCTIONNUM:undefined,
          PRODUCTIONDATE:undefined,
          IMPORTNUM:undefined,
          IMPORTDATE:undefined,
          GMP:undefined,
          PATENTFLAG:undefined,
          PATENTBEGINDATE:undefined,
          PATENTENDDATE:undefined,
          STANDRD:undefined,
          PROTECTIONFLAG:undefined,
          USEUNIT:undefined,
          USEMIN:undefined,
          USEMAX:undefined,
          AVENUM:undefined,
          MAXIMUN:undefined,
          TREATMENT:undefined
        },
        fileList:{
          "1088":[],//批准文号不知道多少先写个1088
          "1013":[],//中包装数量
          "1012":[],//大包装数量
          "1014":[],//药品检验报告
          "1015":[],//进口药品注册证
          "1006":[],//代理授权书
          "1016":[],//国产药品批件
          "1018":[],//药品质量标准
          "1017":[]//说明书
        },
        nodesPosition: [
          {itemName: '基础信息', nodePosition: null, itemAbb: 'cpjc'},
          {itemName: '说明书信息', nodePosition: null, itemAbb: 'sms'},
        ],
        resData:{
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
        },
      };
    },
    methods: {
      list(id,istemp,queryFlag) {
        this.queryFlag= queryFlag;
        this.id = id;
        this.$set(this.ruleForm,'ID',id)
        this.$set(this.ruleForm,'ISTEMP',istemp)
        this.visible = true;
        findById(this.ruleForm.ID,this.ruleForm.ISTEMP).then(res => {
          for(let i in res.data){
            this.$set(this.ruleForm,i,res.data[i])
          }
        })
        findFilesById(id).then(res=>{
          if(res.data!=undefined){
            for(let i in res.data) {
              this.fileList[i] = res.data[i]
            }
          }
        });

        this.$nextTick(()=>{
          /**
           * 查询设置锚点位置
           * */
          this.removeClassCurrent('jump-msg-register-view')[0].classList.add('current');
          this.getNodesHeight('pro-msg-register-view');
        })
      },
      goBack() {
        this.visible=false;
      },
      closeForm(){
        this.queryVisible=false;
      },
      closeQueryInfo(){
        this.queryInfoVisible=false;
      },
      query(){
        this.queryVisible=true;
      },
      queryInfo(){
        this.queryInfoVisible=true;
        findQueryInfo(this.id).then(res=>{
          this.resData = res.data;
        })
      },
      submitQuery(){
        queryProduct(this.id)
        submitQueryInfo(this.id,this.queryValue,this.queryFiles)
        this.queryVisible=false;
        this.visible=false;
      },
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.queryInfo()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.queryInfo()
      },
      getUploadList(res) {
        res.data.forEach(function (item) {
          this.queryFiles.push(item)
        }.bind(this))
      },
      uploadList(res) {
        this.queryFiles = res.data;
      }
    },
    watch:{
      visible(newVal){
        let vieNode = document.getElementById('pro-msg-register-view-box');
        if(vieNode){
          if(newVal == false){
            vieNode.onscroll = null;
            this.removeFixed('pro-msg-register-side')
          }
          else{
            vieNode.onscroll = function () {
              this.dialogBoxScroll(vieNode,'jump-msg-register-view','pro-msg-register-side')
            }.bind(this)
          }
        }
      }
    },
    mounted(){
      let vieNode = document.getElementById('pro-msg-register-view-box');
      if(vieNode){
        vieNode.onscroll = function () {
          this.dialogBoxScroll(vieNode,'jump-msg-register-view','pro-msg-register-side')
        }.bind(this)
      }
    }
  }
</script>
<style>
  @import "../../../../assets/css/auditchanges.css";
</style>
