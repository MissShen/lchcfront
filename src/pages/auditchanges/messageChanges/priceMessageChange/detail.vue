<template>
  <el-dialog
    custom-class="w80"
    title="价格变更"
    :close-on-click-modal="false"
    :visible.sync="visible"
    append-to-body
    class="audit-dialog"
    id="product-detail-view-box"
  >
    <div v-if="visible">
      <div class="main audit-main">
        <ul class="side side-init" id="product-detail-view-side">
          <li v-for="(nodeItem,index) in nodesPosition" :key="index"><a @click="changeScrollHeight(nodeItem.nodePosition,'product-detail-view-box','jump-pro-detail-view',index)" class="d_jump jump-pro-detail-view">{{nodeItem.itemName}}</a></li>
        </ul>
        <div class="right-box">
          <div class="tableset audit-info">
            <el-form id="product-detail-view" ref="showForm" label-width="150px" size="small" label-position="left">
              <h3 class="cpjc">产品基础信息</h3>
              <price-basics :changeFlag="changeFlag" :projectProductId="id"></price-basics>
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
                        <span>{{{"0":"全国最低中标价","1":"计算价格","2":"无最低中标价","3":"京津冀三地价格"}[showForm[0].PRICETYPE]}}</span>
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
                        <span>{{showForm[0].PROVINCE}}</span>
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
              <div v-if="showForm[0].CATALOGAREA == '2' || showForm[0].CATALOGAREA == '3'">
                <el-row class="" :gutter="24">
                  <el-col :span="9">
                    <el-form-item  label="日服用折算价格：">
                      <span>{{showForm[0].DISCOUNTPRICE}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col class="marbottom15" :span="12" >
                    <el-form-item class="audit-form-item" label="价格类型">
                      <span>京津冀三地报价</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="5" v-for="(item,index) in showForm" :key="index">
                  <el-col :span="5">
                    <el-form-item class="acc-price-label" label="省份：">
                      <span>{{item.PROVINCENAME}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
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

              <el-row class="audit-item-box">
                <el-col :span="24">
                  <el-form-item label="目录范围">
                    <span>{{changeForm[0].CATALOGAREANAME}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <div v-if="changeForm[0].CATALOGAREA == '0' || changeForm[0].CATALOGAREA == '1'">
                <el-row class="audit-item-box">
                  <el-col :span="24">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="价格类型">
                          <span class="orange">{{{"0":"全国最低中标价","1":"计算价格","2":"无最低中标价","3":"京津冀三地价格"}[changeForm[0].PRICETYPE]}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row class="audit-item-box" v-if="changeForm[0].PRICETYPE != '2'">
                  <el-col :span="12">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="年度">
                          <span class="orange">{{changeForm[0].YEAR}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="省份">
                          <span class="orange">{{changeForm[0].PROVINCE}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row class="audit-item-box">
                  <el-col :span="12" v-if="changeForm[0].PRICETYPE !='2'">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="项目名称">
                          <span class="orange">{{changeForm[0].PROJECTNAME}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12" v-if="changeForm[0].PRICETYPE =='0'">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="中标价">
                          <span class="orange">{{changeForm[0].PRICE}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12" v-if="changeForm[0].PRICETYPE =='1'">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="代表品装量规格">
                          <span class="orange">{{changeForm[0].REPRESENTATIVESPEC}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row class="audit-item-box">
                  <el-col :span="24" v-if="changeForm[0].PRICETYPE == '0'">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="执行日期">
                          <span class="orange">{{changeForm[0].EXECUTIONDATE}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12" v-if="changeForm[0].PRICETYPE == '1'">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="代表品价格">
                          <span class="orange">{{changeForm[0].REPRESENTATIVEPRICE}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12" v-if="changeForm[0].PRICETYPE == '1'">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="代表品装量包装">
                          <span class="orange">{{changeForm[0].REPRESENTATIVEPACKAGING}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row class="audit-item-box" v-if="changeForm[0].PRICETYPE=='1'">
                  <el-col :span="12">
                    <el-row>
                      <el-col :span="12">
                        <el-row>
                          <el-col :span="24">
                            <el-form-item class="audit-form-item" label="计算方法">
                              <span class="orange">{{changeForm[0].METHOD}}</span>
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
                          <span class="orange">{{changeForm[0].CALCULATEPRICE}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row class="audit-item-box" v-if="changeForm[0].PRICETYPE=='1'">
                  <el-col :span="24">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="备注">
                          <span class="orange">{{changeForm[0].REMARK}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
              <div v-if="changeForm[0].CATALOGAREA == '2' || changeForm[0].CATALOGAREA == '3'">
                <el-row class="" :gutter="24">
                  <el-col :span="9">
                    <el-form-item  label="日服用折算价格：">
                      <span class="orange">{{changeForm[0].DISCOUNTPRICE}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col class="marbottom15" :span="12" >
                    <el-form-item class="audit-form-item" label="价格类型">
                      <span class="orange">京津冀三地报价</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="5" v-for="(item,index) in changeForm" :key="index">
                  <el-col :span="5">
                    <el-form-item class="acc-price-label" label="省份：">
                      <span class="orange">{{item.PROVINCENAME}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
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
  import {checkControl} from 'src/axios/auditchanges/common/nestedJson'
  import priceBasics from 'src/pages/auditchanges/common/priceDetailCommon/priceBasics'
  import {findById,findFinalBasicPrice} from 'src/axios/auditchanges/messageChanges/price'
  import {boxScroll} from "src/components/mixins/scrolls"
  export default {
    mixins:[boxScroll],
    components:{
      priceBasics
    },
    data() {
      return {
        resData:{},
        visible:false,
        id:'',
        changeFlag:true,
        changeForm: this.metaChangeForm(),
        showForm: this.metaShowForm(),
        nodesPosition: [
          {itemName: '基础信息', nodePosition: null, itemAbb: 'cpjc'},
          {itemName: '价格信息', nodePosition: null, itemAbb: 'jgxx'}
        ],
        provinceList:[],//省份
      };
    },
    created () {
    },
    methods: {
      metaChangeForm(){
        return [{
          ID:'',
          PROJECTNAME: '',
          CALCULATEPRICE: '',
          PROVINCE: '',
          PRICETYPE: '',
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
      },
      metaShowForm(){
        return [{
          ID:'',
          PROJECTNAME: '',
          CALCULATEPRICE: '',
          PROVINCE: '',
          PRICETYPE: '',
          REMARK: '',
          REPRESENTATIVEPACKAGING: '',
          PRICE: '',
          YEAR: '',
          METHOD: '',
          REPRESENTATIVEPRICE: '',
          EXECUTIONDATE: '',
          REPRESENTATIVESPEC: '',
          CATALOGAREANAME:''
        }
        ]
      },
      list(id,upProductId) {
        //id 挂网价格Id
        //upProductId 变更过程表Id
        this.$nextTick(async () => {
          this.visible = true;
          this.id = id;
          //1.查询变更前价格信息(用挂网产品ID 查)
          await findFinalBasicPrice(id).then(res => {
            if(res.data.length > 0 ){
              this.showForm = res.data;
            }
          })
          //2.upProductId != undefined查询变更后提交的值(用upProductId)
//          if(upProductId!=undefined) {
            await findById(upProductId).then(res =>{
              if(res.data.length > 0){
                this.changeForm = res.data;
              }
            })
//          }
          console.log(this.showForm,this.changeForm)
          /**
           * 查询设置锚点位置
           * */
          //恢复初始状态
          this.removeClassCurrent('jump-pro-detail-view')[0].classList.add('current');
          this.getNodesHeight('product-detail-view')
        })
      },
      goBack() {
        this.visible = false;
      }
    },
    watch:{
      visible(newVal){
        let vieNode = document.getElementById('product-detail-view-box');
        if(vieNode){
          if(newVal == false){
            vieNode.onscroll = null;
            this.removeFixed('product-detail-view-side')
          }else{
            vieNode.onscroll = function () {
              this.dialogBoxScroll(vieNode,'jump-pro-detail-view','product-detail-view-side')
            }.bind(this)
          }
        }
      }
    },
    mounted(){
      let vieNode = document.getElementById('product-detail-view-box');
      if(vieNode){
        vieNode.onscroll = function () {
          this.dialogBoxScroll(vieNode,'jump-pro-detail-view','product-detail-view-side')
        }.bind(this)
      }
    }
  }
</script>
<style>
  @import "../../../../assets/css/auditchanges.css";
</style>
