<template>
  <el-dialog
    custom-class="w80"
    title="价格公示详情"
    :close-on-click-modal="false"
    :visible.sync="visible"
    append-to-body
    class="audit-dialog"
    id="product-detail-view-box"
  >
    <div v-if="visible">
      <div class="main audit-main">
        <ul class="side side-init" id="product-detail-audit-side">
          <li v-for="(nodeItem,index) in nodesPosition" :key="index"><a @click="changeScrollHeight(nodeItem.nodePosition,'product-detail-view-box','jump-pro-detail-audit',index)"
                                                                        class="d_jump jump-pro-detail-audit">{{nodeItem.itemName}}</a></li>
        </ul>
        <div class="right-box">
          <div class="tableset audit-info">
            <el-form id="product-detail-audit" ref="dataForm"   label-width="150px" size="small" label-position="left">
              <h3 class="cpjc">产品基础信息</h3>
              <price-basics :projectProductId="this.id" :changeFlag="this.changeFlag"></price-basics>
              <!--——————————————————————————————————————————————————————-->

              <h3 class="jgxx">价格信息</h3>
              <el-row class="audit-item-box">
                <el-col :span="24">
                  <el-form-item label="目录范围">
                    <span>{{catalogAreaName}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <div v-if="catalogArea == '0' || catalogArea == '1'">
                <el-row class="">
                  <el-col :span="24">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="价格类型">
                          <span>{{{"0": "全国最低中标价", "1": "计算价格", "2": "无最低中标价","3":"京津冀三地价格"}[showForm[0].PRICETYPE]}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row class="audit-item-box" v-if="showForm[0].PRICETYPE != '2'">
                  <el-col :span="12">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="年度">
                          <span>{{showForm[0].YEAR}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="省份">
                          <span>{{showForm[0].PROVINCENAME}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row class="audit-item-box">
                  <el-col :span="12" v-if="showForm[0].PRICETYPE !='2'">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="项目名称">
                          <span>{{showForm[0].PROJECTNAME}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12" v-if="showForm[0].PRICETYPE =='0'">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item  class="audit-form-item" label="中标价">
                          <span>{{showForm[0].PRICE}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12" v-if="showForm[0].PRICETYPE =='1'">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="代表品装量规格">
                          <span>{{showForm[0].REPRESENTATIVESPEC}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row class="audit-item-box">
                  <el-col :span="24" v-if="showForm[0].PRICETYPE == '0'">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="执行日期">
                          <span>{{showForm[0].EXECUTIONDATE}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12" v-if="showForm[0].PRICETYPE == '1'">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="代表品价格">
                          <span>{{showForm[0].REPRESENTATIVEPRICE}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12" v-if="showForm[0].PRICETYPE == '1'">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="代表品装量包装">
                          <span>{{showForm[0].REPRESENTATIVEPACKAGING}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row class="audit-item-box" v-if="showForm[0].PRICETYPE=='1'">
                  <el-col :span="12">
                    <el-row>
                      <el-col :span="12">
                        <el-row>
                          <el-col :span="24">
                            <el-form-item class="audit-form-item" label="计算方法">
                              <span>{{showForm[0].METHOD}}</span>
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
                          <span>{{showForm[0].CALCULATEPRICE}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row class="audit-item-box" v-if="showForm[0].PRICETYPE=='1'">
                  <el-col :span="24">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="备注">
                          <span>{{showForm[0].REMARK}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
              <div v-if="catalogArea == '2' || catalogArea == '3'">
                <el-row>
                  <el-col :span="24">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="日服用折算价格：">
                          <span>{{showForm[0].DISCOUNTPRICE}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row class="audit-item-box" :gutter="24">
                  <el-col class="marbottom15" :span="12" >
                    <el-form-item class="audit-form-item" label="价格类型：">
                      <span>京津冀三地报价</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="audit-item-box" :gutter="2" v-for="(item,index) in showForm" :key="index">
                  <el-col :span="5">
                    <el-form-item class="acc-price-label" label="省份：">
                      <span>{{item.PROVINCENAME}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item class="acc-price-label" label="项目名称：">
                      <span>{{item.PROJECTNAME}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item class="acc-price-label" label="中标价：">
                      <span>{{item.PRICE}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item class="acc-price-label" label="执行日期：">
                      <span>{{item.EXECUTIONDATE}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <span>
            <h3>项目名称应包括项目年度和省份名称，请按照各省公布的标准项目录名称录入。   最低价请如实、谨慎填写，注意不同规格包装间的合理比价关系！</h3>
          </span>

            </el-form>
          </div>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
       <el-button size="small" @click="goBack">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import priceBasics from 'src/pages/auditchanges/common/priceDetailCommon/priceBasics'
  import {findProjectProductPrice} from 'src/axios/auditchanges/messagePublicity/price'
  import {boxScroll} from 'src/components/mixins/scrolls'

  export default {
    name: "price-publicity-detail",
    mixins:[boxScroll],
    components: {
      priceBasics,
    },
    data(){
      return {
        fileType: '3',//上传文件类型 3 质疑
        visible: false,
        catalogAreaName:'',
        catalogArea:'',
        changeFlag:false,
        id: '', //申报/变更过程ID 用于查产品基础数据
        showForm: this.metaShowForm(),//变更前数据展示
        nodesPosition:[
          {itemName: '基础信息', nodePosition: null, itemAbb: 'cpjc'},
          {itemName: '价格基础', nodePosition: null, itemAbb: 'jgxx'},
        ],
      }
    },
    methods: {
      metaShowForm(){
        return [{
          PROJECTNAME: '',
          CALCULATEPRICE: '',
          PROVINCE: '',
          PRICETYPE: '1',
          REMARK: '',
          REPRESENTATIVEPACKAGING: '',
          PRICE: '',
          YEAR: '',
          METHOD: '',
          REPRESENTATIVEPRICE: '',
          EXECUTIONDATE: '',
          REPRESENTATIVESPEC: '',
          DISCOUNTPRICE:'',
          ID:''
        }]
      },//变更前展示数据
      async list(id){
        this.id = id;
        this.visible = true;
        await findProjectProductPrice(id).then(res => {
          this.catalogAreaName = res.data[0].CATALOGAREANAME;
          this.catalogArea = res.data[0].CATALOGAREA;
          this.showForm = res.data;
        })
        /**
         * 查询设置锚点位置
         * */
        this.removeClassCurrent('jump-pro-detail-audit')[0].classList.add('current');
        this.getNodesHeight('product-detail-audit');
      },
      goBack(){
          this.visible = false;
      }
    },
    watch: {
      visible(newVal){
        let vieNode = document.getElementById('product-detail-view-box');
        if (vieNode) {
          if (newVal == false) {
            vieNode.onscroll = null;
            this.removeFixed('product-detail-audit-side')
          }
          else {
            vieNode.onscroll = function () {
              this.dialogBoxScroll(vieNode, 'jump-pro-detail-audit', 'product-detail-audit-side')
            }.bind(this)
          }
        }
      }
    },
    mounted(){
      let vieNode = document.getElementById('product-detail-audit-box');
      if (vieNode) {
        vieNode.onscroll = function () {
          this.dialogBoxScroll(vieNode, 'jump-pro-detail-audit', 'product-detail-audit-side')
        }.bind(this)
      }
    }
  }
</script>
