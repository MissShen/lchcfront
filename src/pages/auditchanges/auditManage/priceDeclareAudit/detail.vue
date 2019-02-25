<template>
  <el-dialog
    width="88%"
    title="价格申报审核详情"
    :close-on-click-modal="false"
    :visible.sync="visible"
    append-to-body
    id="product-declare-audit-box"

  >
    <div v-if="visible" class="main audit-main">
      <ul class="side side-init" id="product-declare-detail-side">
        <li v-for="(nodeItem,index) in nodesPosition" :key="index"><a @click="changeScrollHeight(nodeItem.nodePosition,'product-declare-audit-box','jump-pro-detail-audit',index)" class="current d_jump jump-pro-detail-audit">{{nodeItem.itemName}}</a></li>
      </ul>
      <div class="right-box">
        <div class="tableset audit-info">
          <el-form id="product-declare-audit" ref="showForm" label-width="150px" size="small" label-position="left">
            <h3 class="cpjc">产品基础信息</h3>
            <price-basics :projectProductId="this.id" :changeFlag="this.changeFlag"></price-basics>
            <h3 class="jgxx">价格信息</h3>
            <el-row class="audit-item-box">
              <el-col :span="24">
                <el-form-item label="目录范围">
                  <span>{{showForm[0].CATALOGAREANAME}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <div v-if="showForm[0].CATALOGAREA == '0' || showForm[0].CATALOGAREA == '1'">
              <el-row class="audit-item-box">
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
                      <el-form-item class="audit-form-item" label="中标价">
                        <span :class="{red:showForm[0].PRICE > priceLibrary.price}">{{showForm[0].PRICE}}</span>
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
                      <el-form-item class="audit-form-item" >
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
            <div v-if="showForm[0].CATALOGAREA == '2' || showForm[0].CATALOGAREA == '3'">
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
              <el-row :gutter="24">
                <el-col class="marbottom15" :span="12" >
                  <el-form-item class="audit-form-item" label="价格类型：">
                    <span>京津冀三地报价</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="2" v-for="(item,index) in showForm" :key="index">
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
                    <span :class="{red:item.PRICE > priceLibrary.price}" >{{item.PRICE}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item class="acc-price-label" label="执行日期：">
                    <span>{{item.EXECUTIONDATE}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>

            <el-row class="audit-item-box">
              <el-col :span="24">
                <el-form-item label="目录范围">
                  <span>{{auditForm[0].CATALOGAREANAME}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <div v-if="auditForm[0].CATALOGAREA == '0' || auditForm[0].CATALOGAREA == '1'">
              <el-row class="audit-item-box">
                <el-col :span="24">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item class="audit-form-item" label="价格类型">
                        <span class="orange">{{{"0": "全国最低中标价", "1": "计算价格", "2": "无最低中标价","3":"京津冀三地价格"}[auditForm[0].PRICETYPE]}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row class="audit-item-box" v-if="auditForm[0].PRICETYPE != '2'">
                <el-col :span="12">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item class="audit-form-item" label="年度">
                        <span class="orange">{{auditForm[0].YEAR}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item class="audit-form-item" label="省份">
                        <span class="orange">{{auditForm[0].PROVINCENAME}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row class="audit-item-box">
                <el-col :span="12" v-if="auditForm[0].PRICETYPE !='2'">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item class="audit-form-item" label="项目名称">
                        <span class="orange">{{auditForm[0].PROJECTNAME}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12" v-if="auditForm[0].PRICETYPE =='0'">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item class="audit-form-item" label="中标价">
                        <span class="orange">{{auditForm[0].INPRICE}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12" v-if="auditForm[0].PRICETYPE =='1'">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item class="audit-form-item" label="代表品装量规格">
                        <span class="orange">{{auditForm[0].REPRESENTATIVESPEC}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row class="audit-item-box">
                <el-col :span="24" v-if="auditForm[0].PRICETYPE == '0'">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item class="audit-form-item" label="执行日期">
                        <span class="orange">{{auditForm[0].EXECUTIONDATE}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12" v-if="auditForm[0].PRICETYPE == '1'">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item class="audit-form-item" >
                        <span class="orange">{{auditForm[0].REPRESENTATIVEPRICE}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12" v-if="auditForm[0].PRICETYPE == '1'">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item class="audit-form-item" label="代表品装量包装">
                        <span class="orange">{{auditForm[0].REPRESENTATIVEPACKAGING}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row class="audit-item-box" v-if="auditForm[0].PRICETYPE=='1'">
                <el-col :span="12">
                  <el-row>
                    <el-col :span="12">
                      <el-row>
                        <el-col :span="24">
                          <el-form-item class="audit-form-item" label="计算方法">
                            <span class="orange">{{auditForm[0].METHOD}}</span>
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
                        <span class="orange">{{auditForm[0].CALCULATEPRICE}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row class="audit-item-box" v-if="auditForm[0].PRICETYPE=='1'">
                <el-col :span="24">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item class="audit-form-item" label="备注">
                        <span class="orange">{{auditForm[0].REMARK}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
            <div v-if="auditForm[0].CATALOGAREA == '2' || auditForm[0].CATALOGAREA == '3'">
              <el-row>
                <el-col :span="24">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item class="audit-form-item" label="日服用折算价格：">
                        <span class="orange">{{auditForm[0].DISCOUNTPRICE}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col class="marbottom15" :span="12" >
                  <el-form-item class="audit-form-item" label="价格类型：">
                    <span>京津冀三地报价</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="2" v-for="(item,index) in auditForm" :key="index">
                <el-col :span="5">
                  <el-form-item class="acc-price-label" label="省份：">
                    <span class="orange">{{item.PROVINCENAME}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item class="acc-price-label" label="项目名称：">
                    <span class="orange">{{item.PROJECTNAME}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item class="acc-price-label" label="中标价：">
                    <span class="orange">{{item.PRICE}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item class="acc-price-label" label="执行日期：">
                    <span class="orange">{{item.EXECUTIONDATE}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>

            <div class="audit-info">
              <h3 id="qgjgk-pro-declare-audit">全国价格库</h3>
              <div class="tableset">
                <el-table
                  :data="this.priceLibrary"
                  border
                  stripe>
                  <el-table-column label="项目名称">
                    <template slot-scope="scope">
                      <span>{{scope.row.name}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="项目年度">
                    <template slot-scope="scope">
                      <span>{{scope.row.year}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="省份">
                    <template slot-scope="scope">
                      <span>{{scope.row.province}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="项目价格">
                    <template slot-scope="scope">
                      <span>{{scope.row.price}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="执行日期">
                    <template slot-scope="scope">
                      <span>{{scope.row.date}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <span>
            <h4>项目名称应包括项目年度和省份名称，请按照各省公布的标准项目录名称录入。   最低价请如实、谨慎填写，注意不同规格包装间的合理比价关系！</h4>
          </span>
          </el-form>
          <div class="audit-info">
            <h3 id="shxx-product-declare">审核记录</h3>
            <div class="tableset">
              <el-table
                :data="this.checkRecording"
                border
                stripe>
                <el-table-column label="审核人">
                  <template slot-scope="scope">
                    <span>{{scope.row.CHECKNAME}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="审核时间">
                  <template slot-scope="scope">
                    <span>{{scope.row.CHECKDATE}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="审核结果">
                  <template slot-scope="scope">
                    <span>{{scope.row.CHECKRESULT}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="审核备注">
                  <template slot-scope="scope">
                    <span>{{scope.row.CHECKREMARK}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
         <el-button size="small" @click="goBack">关闭</el-button>
        </span>
    <product-query-info-by-audit ref="productQueryInfoByAudit"></product-query-info-by-audit>
  </el-dialog>
</template>

<script>
  import {findProjectProductPrice} from 'src/axios/auditchanges/messagePublicity/price'
  import {queryAuditData} from 'src/axios/auditchanges/auditManage/productDeclareAudit'
  import {
    queryCheckRecording,
    queryPriceLibrary,
    checkData,
    submitData
  } from 'src/axios/auditchanges/auditManage/productDeclareAudit'
  import priceBasics from 'src/pages/auditchanges/common/priceDetailCommon/priceBasics'
  import productQueryInfoByAudit from 'src/pages/auditchanges/common/productQueryInfoByAudit'
  import {boxScroll} from 'src/components/mixins/scrolls'

  export default {
    name: "price-publicity-doubt",
    mixins:[boxScroll],
    components: {
      priceBasics,
      productQueryInfoByAudit
    },
    data() {
      return {
        visible: false,
        id: '', //申报/变更过程ID 用于查产品基础数据
        changeFlag: false,//变更标识
        showForm: this.metaShowForm(),//变更前数据展示
        auditForm: this.metaAuditForm(),
        nodesPosition: [
          {itemName: '基础信息', nodePosition: null, itemAbb: 'cpjc'},
          {itemName: '价格基础', nodePosition: null, itemAbb: 'jgxx'},
          {itemName: '全国价格库', nodePosition: null, itemAbb: 'qgjgk'},
          {itemName: '审核记录', nodePosition: null, itemAbb: 'shxx'}
        ],
        priceLibrary:[],
        checkRecording:[]
      }
    },
    created() {
    },
    methods: {
      metaShowForm() {
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
          CATALOGAREANAME:''
        }]

      },//变更前展示数据
      metaAuditForm() {
        return[{
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
          CATALOGAREANAME:''
        }]
      },//审核后展示数据
      async list(id) {
        console.log(id)
        this.id = id;
        this.visible = true;
        await findProjectProductPrice(id).then(res => {
          if(res.data.length > 0){
            this.showForm = res.data;
          }

          /**
           * 查询设置锚点位置
           * */
          this.removeClassCurrent('jump-pro-detail-audit')[0].classList.add('current');
          this.getNodesHeight('product-declare-audit','shxx-product-declare');
        })
        //查询审核数据
        await queryAuditData(id).then(res => {
          if(res.data.length > 0) {
            this.auditForm = res.data
          }
        })
        await queryPriceLibrary(id).then(res => {
          this.priceLibrary = res.data
        })


        console.log(this.showForm,this.auditForm)
      },
      goBack() {
        this.visible = false;
      }
    },
    watch:{
      visible(newVal){
        let vieNode = document.getElementById('product-declare-audit-box');
        if(vieNode){
          if(newVal == false){
            vieNode.onscroll = null;
            this.removeFixed('product-declare-detail-side')
          }
          else{
            vieNode.onscroll = function () {
              this.dialogBoxScroll(vieNode,'jump-pro-detail-audit','product-declare-detail-side')
            }.bind(this)
          }
        }
      }
    },
    mounted(){
      let vieNode = document.getElementById('product-declare-audit-box');
      if(vieNode){
        vieNode.onscroll = function () {
          this.dialogBoxScroll(vieNode,'jump-pro-detail-audit','product-declare-detail-side')
        }.bind(this)
      }
    }
  }
</script>
