<template>
  <el-dialog
    custom-class="w80"
    title="价格变更确认"
    :close-on-click-modal="false"
    :visible.sync="visible"
    append-to-body
    class="audit-dialog"
    id="product-declare-audit-box"

  >
    <div v-if="visible" class="main audit-main">
      <ul class="side side-init" id="product-declare-detail-side">
        <li v-for="(item,index) in nodesPosition" :key="index"><a @click="changeScrollHeight(item.nodePosition,'product-declare-audit-box','jump-pro-detail-audit',index)"
               class="d_jump jump-pro-detail-audit">{{item.itemName}}</a></li>
      </ul>
      <div class="right-box">
        <div class="tableset audit-info">
          <el-form id="product-declare-audit" ref="showForm" label-width="150px" size="small" label-position="left">
            <h3 class="cpjc">产品基础信息</h3>
            <price-basics :projectProductId="this.id" :changeFlag="this.changeFlag"></price-basics>
            <h3 class="jgxx">价格信息</h3>
            <el-row>
              <el-col :span="24">
                <el-row>
                  <el-col :span="24">
                    <el-form-item class="audit-form-item" label="价格类型">
                      <span>
                        {{{
                        "0": "全国最低中标价",
                        "1": "计算价格",
                        "2": "无最低中标价"
                      }[showForm.priceType]}}
                        </span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row v-if="showForm.priceType != '2'">
              <el-col :span="12">
                <el-row>
                  <el-col :span="24">
                    <el-form-item class="audit-form-item" label="年度">
                      <span>
                        <span v-if="changeForm.yearId">变更前:</span>
                        {{showForm.yearId}}
                        </span>
                      <span class="orange" v-if="changeForm.yearId">
                          <br/>变更后:{{changeForm.yearId}}
                        </span>
                      <span class="orange" v-if="auditForm.yearId"><br/>审核后:{{auditForm.yearId}}</span>

                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="24">
                    <el-form-item class="audit-form-item" label="省份">
                      <span>
                        <span v-if="changeForm.provinceId">变更前:</span>
                        {{showForm.provinceId}}
                        </span>
                      <span class="orange" v-if="changeForm.provinceId">
                          <br/>变更后:{{changeForm.provinceId}}
                        </span>
                      <span class="orange" v-if="auditForm.provinceId"><br/>审核后:{{auditForm.provinceId}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" v-if="showForm.priceType !='2'">
                <el-row>
                  <el-col :span="24">
                    <el-form-item class="audit-form-item" label="项目名称">
                      <span>
                        <span v-if="changeForm.projectName">变更前:</span>
                        {{showForm.projectName}}
                        </span>
                      <span class="orange" v-if="changeForm.projectName">
                          <br/>变更后:{{changeForm.projectName}}
                        </span>
                      <span class="orange" v-if="auditForm.projectName"><br/>审核后:{{auditForm.projectName}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12" v-if="showForm.priceType =='0'">
                <el-row>
                  <el-col :span="24">
                    <el-form-item class="audit-form-item" label="中标价">
                      <span>
                        <span v-if="changeForm.inPrice">变更前:</span>
                        {{showForm.inPrice}}
                        </span>
                      <span class="orange" v-if="changeForm.inPrice">
                          <br/>变更后:{{changeForm.inPrice}}
                        </span>
                      <span class="orange" v-if="auditForm.inPrice"><br/>审核后:{{auditForm.inPrice}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12" v-if="showForm.priceType =='1'">
                <el-row>
                  <el-col :span="24">
                    <el-form-item class="audit-form-item" label="代表品装量规格">
                      <span>
                        <span v-if="changeForm.representativeSpec">变更前:</span>
                        {{showForm.representativeSpec}}
                        </span>
                      <span class="orange" v-if="changeForm.representativeSpec">
                          <br/>变更后:{{changeForm.representativeSpec}}
                        </span>
                      <span class="orange" v-if="auditForm.representativeSpec"><br/>审核后:{{auditForm.representativeSpec}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" v-if="showForm.priceType == '0'">
                <el-row>
                  <el-col :span="24">
                    <el-form-item class="audit-form-item" label="执行日期">
                      <span>
                        <span v-if="changeForm.executionDate">变更前:</span>
                        {{showForm.executionDate}}
                        </span>
                      <span class="orange" v-if="changeForm.executionDate">
                          <br/>变更后:{{changeForm.executionDate}}
                        </span>
                      <span class="orange" v-if="auditForm.executionDate"><br/>审核后:{{auditForm.executionDate}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12" v-if="showForm.priceType == '1'">
                <el-row>
                  <el-col :span="24">
                    <el-form-item class="audit-form-item" label="代表品价格">
                      <span>
                        <span v-if="changeForm.representativePrice">变更前:</span>
                        {{showForm.representativePrice}}
                        </span>
                      <span class="orange" v-if="changeForm.representativePrice">
                          <br/>变更后:{{changeForm.representativePrice}}
                        </span>
                      <span class="orange" v-if="auditForm.representativePrice"><br/>审核后:{{auditForm.representativePrice}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12" v-if="showForm.priceType == '1'">
                <el-row>
                  <el-col :span="24">
                    <el-form-item class="audit-form-item" label="代表品装量包装">
                      <span>
                        <span v-if="changeForm.representativePackaging">变更前:</span>
                        {{showForm.representativePackaging}}
                        </span>
                      <span class="orange" v-if="changeForm.representativePackaging">
                          <br/>变更后:{{changeForm.representativePackaging}}
                        </span>
                      <span class="orange"
                            v-if="auditForm.representativePackaging"><br/>审核后:{{auditForm.representativePackaging}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row v-if="showForm.priceType=='1'">
              <el-col :span="12">
                <el-row>
                  <el-col :span="12">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="计算方法">
                          <span>
                        <span v-if="changeForm.computationalMethod">变更前:</span>
                        {{showForm.computationalMethod}}
                        </span>
                          <span class="orange" v-if="changeForm.computationalMethod">
                          <br/>变更后:{{changeForm.computationalMethod}}
                        </span>
                          <span class="orange"
                                v-if="auditForm.computationalMethod"><br/>审核后:{{auditForm.computationalMethod}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12">
                    <a>查看取值办法</a>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="24">
                    <el-form-item class="audit-form-item" label="计算价格">
                      <span>
                        <span v-if="changeForm.calculatePrice">变更前:</span>
                        {{showForm.calculatePrice}}
                        </span>
                      <span class="orange" v-if="changeForm.calculatePrice">
                          <br/>变更后:{{changeForm.calculatePrice}}
                        </span>
                      <span class="orange" v-if="auditForm.calculatePrice"><br/>审核后:{{auditForm.calculatePrice}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row v-if="showForm.priceType=='1'">
              <el-col :span="24">
                <el-row>
                  <el-col :span="24">
                    <el-form-item class="audit-form-item" label="备注">
                      <span>
                        <span v-if="changeForm.remark">变更前:</span>
                        {{showForm.remark}}
                        </span>
                      <span class="orange" v-if="changeForm.remark">
                          <br/>变更后:{{changeForm.remark}}
                        </span>
                      <span class="orange" v-if="auditForm.remark"><br/>审核后:{{auditForm.remark}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <span>
            <h4>项目名称应包括项目年度和省份名称，请按照各省公布的标准项目录名称录入。   最低价请如实、谨慎填写，注意不同规格包装间的合理比价关系！</h4>
          </span>
          </el-form>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" type="primary" @click="affirmBtn">确认</el-button>
      <el-button size="small" type="danger" @click="refuseBtn">拒绝</el-button>
      <el-button size="small" @click="goBack">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import priceBasics from 'src/pages/auditchanges/common/priceDetailCommon/priceBasics'
  import {queryPROVINCE} from 'src/axios/auditchanges/messageDeclare/product'
  import {findShowPriceByProductId, findUpProjectProductById} from 'src/axios/auditchanges/messagePublicity/price'
  import {queryAuditData, queryQuestionField} from 'src/axios/auditchanges/auditManage/productDeclareAudit'
  import {affirm, refuse} from 'src/axios/auditchanges/orgAffirm/price'
  import {boxScroll} from 'src/components/mixins/scrolls'

  export default {
    name: "price-publicity-doubt",
    mixins:[boxScroll],
    components: {
      priceBasics
    },
    data() {
      return {
        visible: false,
        id: '', //申报/变更过程ID 用于查产品基础数据
        changeFlag: true,//变更标识
        showForm: this.metaShowForm(),//变更前数据展示
        //dataForm:this.metaDataForm(),//提交数据
        //fileForm:this.metaFileForm(),//提交文件对象
        //controlData:this.metaControlForm(),//多选按钮
//        flagForm: this.metaFlagForm(),
        auditForm: this.metaAuditForm(),
        changeForm: this.metaChangeForm(),
        provinceList: [],//省份
        //checkRecording: [],
        //priceLibrary: [],
        nodesPosition:[
          {itemName: '基础信息', nodePosition: null, itemAbb: 'cpjc'},
          {itemName: '价格基础', nodePosition: null, itemAbb: 'jgxx'},
        ],
      }
    },
    methods: {
      metaShowForm() {
        return {
          projectName: '北京采购项目',
          calculatePrice: '',
          provinceId: '',
          priceType: '1',
          remark: '',
          representativePackaging: '',
          inPrice: '123',
          yearId: '2018',
          computationalMethod: '',
          representativePrice: '',
          executionDate: '2018-06-01',
          representativeSpec: ''
        }
      },
      metaAuditForm() {
        return {
          projectName: '采购项目',
          calculatePrice: '',
          provinceId: '',
          priceType: '2',
          remark: '',
          representativePackaging: '',
          inPrice: '',
          yearId: '',
          computationalMethod: '',
          representativePrice: '',
          executionDate: '',
          representativeSpec: ''
        }
      },//审核后数据
      metaChangeForm() {
        return {
          projectName: '采购项目',
          calculatePrice: '',
          provinceId: '',
          priceType: '2',
          remark: '',
          representativePackaging: '',
          inPrice: '',
          yearId: '',
          computationalMethod: '',
          representativePrice: '',
          executionDate: '',
          representativeSpec: ''
        }
      },//审核后数据
      metaFlagForm() {
        return {
          projectName: '0',
          calculatePrice: '',
          provinceId: '',
          priceType: '',
          remark: '',
          representativePackaging: '',
          inPrice: '',
          yearId: '',
          computationalMethod: '',
          representativePrice: '',
          executionDate: '',
          representativeSpec: ''
        }
      },//用于审核/澄清页面弹层 区分是否有质疑、澄清数据
      async list(id, projectProductId) {
        this.id = id;
        this.visible = true;
        let res = await queryPROVINCE()
        this.provinceList = res.data;
        await findShowPriceByProductId(id).then(res => {
          if (res.data.provinceId) {
            for (let x in this.provinceList) {
              if (res.data.provinceId == this.provinceList[x].ID) {
                res.data.provinceId = this.provinceList[x].NAME_CHN
              }
            }
          }
          this.showForm = res.data;
        })
        await findUpProjectProductById(id).then(res => {
          if (res.data.provinceId) {
            for (let x in this.provinceList) {
              if (res.data.provinceId == this.provinceList[x].ID) {
                res.data.provinceId = this.provinceList[x].NAME_CHN
              }
            }
          }
          this.changeForm = res.data;
        })
        //查询审核数据
        await queryAuditData(id).then(res => {
          if (res.data.provinceId) {
            for (let x in this.provinceList) {
              if (res.data.provinceId == this.provinceList[x].ID) {
                res.data.provinceId = this.provinceList[x].NAME_CHN
              }
            }
          }
          this.auditForm = res.data
          /**
           * 查询设置锚点位置
           * */
          this.removeClassCurrent('jump-pro-detail-audit')[0].classList.add('current');
          this.getNodesHeight('product-declare-audit', 'shxx-product-declare');
        })

      },
      goBack() {
        this.visible = false;
      },
      submitUseIf(res){
        //如果请求不成功则打开按钮限制
        if (!res.success) {
          this.submitFlag = false;
          this.$message.error(res.message)
        } else {
          this.$message({
            message: res.message,
            type: 'success',
            onClose: function () {
              window.location.reload()
            }
          })
        }
      },
      affirmBtn(){
        this.submitFlag = true;
        affirm(this.id).then(res => {
          res.success ? res.message = "确认成功" : res.message = "确认失败"
          this.submitUseIf(res)
        })
      },
      refuseBtn(){
        this.submitFlag = true;
        refuse(this.id).then(res => {
          res.success ? res.message = "拒绝成功" : res.message = "拒绝失败"
          this.submitUseIf(res)
        })
      }
    },
    watch: {
      visible(newVal) {
        let vieNode = document.getElementById('product-declare-audit-box');
        if (vieNode) {
          if (newVal == false) {
            vieNode.onscroll = null;
            this.removeFixed('product-declare-detail-side')
          }
          else {
            vieNode.onscroll = function () {
              this.dialogBoxScroll(vieNode, 'jump-pro-detail-audit', 'product-declare-detail-side')
            }.bind(this)
          }
        }
      }
    },
    mounted() {
      let vieNode = document.getElementById('product-declare-audit-box');
      if (vieNode) {
        vieNode.onscroll = function () {
          this.dialogBoxScroll(vieNode, 'jump-pro-detail-audit', 'product-declare-detail-side')
        }.bind(this)
      }
    }
  }
</script>
<style>
  @import "../../../../assets/css/auditchanges.css";
</style>
