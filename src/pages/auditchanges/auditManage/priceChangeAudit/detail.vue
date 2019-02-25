<template>
  <el-dialog
    width="88%"
    title="价格变更审核详情"
    :close-on-click-modal="false"
    :visible.sync="visible"
    append-to-body
    id="product-declare-audit-box"

  >
    <div v-if="visible" class="main audit-main">
      <ul class="side side-init" id="product-declare-detail-side">
        <li><a @click="changeScrollHeight(nodesPosition.cpjc,'product-declare-audit-box','jump-pro-detail-audit',0)"
               class="current d_jump jump-pro-detail-audit">基础信息</a></li>
        <li><a @click="changeScrollHeight(nodesPosition.jgxx,'product-declare-audit-box','jump-pro-detail-audit',1)"
               class="d_jump jump-pro-detail-audit">价格基础</a></li>
        <li><a @click="changeScrollHeight(nodesPosition.shxx,'product-declare-audit-box','jump-pro-detail-audit',2)"
               class="d_jump jump-pro-detail-audit">审核记录</a></li>
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
              <el-row class="">
                <el-col :span="24">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item class="audit-form-item" label="价格类型">
                          <span>
                            {{{"0": "全国最低中标价", "1": "计算价格", "2": "无最低中标价","3":"京津冀三地价格"}[showForm[0].PRICETYPE]}}
                          </span>
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
                          <span>
                            {{showForm[0].YEAR}}
                          </span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item class="audit-form-item" label="省份">
                          <span>
                            {{showForm[0].PROVINCENAME}}
                          </span>
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
                          <span>
                            {{showForm[0].PROJECTNAME}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12" v-if="showForm[0].PRICETYPE =='0'">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item class="audit-form-item" label="中标价">
                          <span>
                            {{showForm[0].PRICE}}
                          </span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12" v-if="showForm[0].PRICETYPE =='1'">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item class="audit-form-item" label="代表品装量规格">
                          <span>
                            {{showForm[0].REPRESENTATIVESPEC}}
                          </span>
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
                          <span>
                            {{showForm[0].EXECUTIONDATE}}
                          </span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12" v-if="showForm[0].PRICETYPE == '1'">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item class="audit-form-item" label="代表品价格">
                          <span>
                            {{showForm[0].REPRESENTATIVEPRICE}}
                          </span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12" v-if="showForm[0].PRICETYPE == '1'">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item class="audit-form-item" label="代表品装量包装">
                          <span>
                            {{showForm[0].REPRESENTATIVEPACKAGING}}
                          </span>
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
                              <span>
                                {{showForm[0].METHOD}}
                              </span>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item class="audit-form-item" label="计算价格">
                          <span>
                                {{showForm[0].CALCULATEPRICE}}
                              </span>
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
                          <span>
                                {{showForm[0].REMARK}}
                              </span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
            <div v-if="showForm[0].CATALOGAREA == '2' || showForm[0].CATALOGAREA == '3'">
              <el-row class="audit-item-box">
                <el-col :span="24">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item class="audit-form-item" label="日服用折算价格:">
                          <span>
                                {{showForm[0].DISCOUNTPRICE}}
                              </span>
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
              <el-row class="audit-item-box" :gutter="2" v-for="(item,index) in showForm" :key="index">
                <el-col :span="5">
                  <el-form-item class="acc-price-label" label="省份：">
                    <span>{{item.PROVINCENAME}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item class="audit-form-item" label="项目名称:">
                          <span>
                                {{item.PROJECTNAME}}
                              </span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="6">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item class="audit-form-item" label="中标价:">
                          <span>
                                {{item.PRICE}}
                              </span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="6">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item class="audit-form-item" label="执行日期:">
                          <span>
                                {{item.EXECUTIONDATE}}
                              </span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>

            <el-row class="audit-item-box">
              <el-col :span="24">
                <el-form-item label="目录范围">
                  <span class="orange">{{changeForm[0].CATALOGAREANAME}}</span>
                  <span v-if="auditForm[0].CATALOGAREANAME" class="orange">{{auditForm[0].CATALOGAREANAME}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <div v-if="changeForm[0].CATALOGAREA == '0' || changeForm[0].CATALOGAREA == '1'">
              <el-row class="">
                <el-col :span="24">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item class="audit-form-item" label="价格类型">
                          <span class="orange">
                            {{{"0": "全国最低中标价", "1": "计算价格", "2": "无最低中标价","3":"京津冀三地价格"}[changeForm[0].PRICETYPE]}}
                          </span>
                        <span v-if="auditForm[0].PRICETYPE" class="orange">
                           <br>审核后：{{{"0": "全国最低中标价", "1": "计算价格", "2": "无最低中标价","3":"京津冀三地价格"}[auditForm[0].PRICETYPE]}}
                          </span>
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
                          <span class="orange">
                            {{changeForm[0].YEAR}}
                          </span>
                        <span v-if="changeForm[0].YEAR" class="orange"><br>审核后：{{changeForm[0].YEAR}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item class="audit-form-item" label="省份">
                          <span class="orange">{{changeForm[0].PROVINCENAME}}</span>

                        <span v-if="auditForm[0].PROVINCE" class="orange"><br>审核后：{{auditForm[0].PROVINCE}}</span>
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
                          <span v-if="auditForm[0].PROJECTNAME" class="orange"><br>审核后：{{auditForm[0].PROJECTNAME}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12" v-if="changeForm[0].PRICETYPE =='0'">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item class="audit-form-item" label="中标价">
                          <span :class="{red:changeForm[0].PRICE > priceLibrary.price,orange:changeForm[0].PRICE <= priceLibrary.price}">{{changeForm[0].PRICE}}</span>
                          <span v-if="auditForm[0].PRICE" class="orange"><br>审核后：{{auditForm[0].PRICE}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12" v-if="changeForm[0].PRICETYPE =='1'">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item class="audit-form-item" label="代表品装量规格">
                          <span class="orange">{{changeForm[0].REPRESENTATIVESPEC}}</span>
                          <span v-if="auditForm[0].REPRESENTATIVESPEC" class="orange"><br>审核后：{{auditForm[0].REPRESENTATIVESPEC}}</span>
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
                          <span v-if="auditForm[0].EXECUTIONDATE" class="orange"><br>审核后：{{auditForm[0].EXECUTIONDATE}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12" v-if="changeForm[0].PRICETYPE == '1'">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item class="audit-form-item" label="代表品价格">
                          <span class="orange">{{changeForm[0].REPRESENTATIVEPRICE}}</span>
                          <span v-if="auditForm[0].REPRESENTATIVEPRICE" class="orange"><br>审核后：{{auditForm[0].REPRESENTATIVEPRICE}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12" v-if="changeForm[0].PRICETYPE == '1'">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item class="audit-form-item" label="代表品装量包装">
                          <span class="orange">{{changeForm[0].REPRESENTATIVEPACKAGING}}</span>
                          <span v-if="auditForm[0].REPRESENTATIVEPACKAGING" class="orange"><br>审核后：{{auditForm[0].REPRESENTATIVEPACKAGING}}</span>
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
                              <span v-if="auditForm[0].METHOD" class="orange"><br>审核后：{{auditForm[0].METHOD}}</span>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item class="audit-form-item" label="计算价格">
                          <span class="orange">{{changeForm[0].CALCULATEPRICE}}</span>
                          <span v-if="auditForm[0].CALCULATEPRICE" class="orange"><br>审核后：{{auditForm[0].CALCULATEPRICE}}</span>
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
                          <span v-if="auditForm[0].REMARK" class="orange"><br>审核后：{{auditForm[0].REMARK}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
            <div v-if="changeForm[0].CATALOGAREA == '2' || changeForm[0].CATALOGAREA == '3'">
              <el-row class="audit-item-box">
                <el-col :span="24">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item class="audit-form-item" label="日服用折算价格:">
                          <span class="orange">{{changeForm[0].DISCOUNTPRICE}}</span>
                          <span v-if="auditForm[0].DISCOUNTPRICE" class="orange"><br>审核后：{{auditForm[0].DISCOUNTPRICE}}</span>
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
              <el-row class="audit-item-box" :gutter="2" v-for="(item,index) in showForm" :key="index">
                <el-col :span="5">
                  <el-form-item class="acc-price-label" label="省份：">
                    <span class="orange">{{item.PROVINCENAME}}</span>
                    <span v-if="auditForm[index].PROVINCENAME" class="orange"><br>审核后：{{auditForm[index].PROVINCENAME}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item class="audit-form-item" label="项目名称:">
                          <span class="orange">{{item.PROJECTNAME}}</span>
                        <span v-if="auditForm[index].PROJECTNAME" class="orange"><br>审核后：{{auditForm[index].PROJECTNAME}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="6">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item class="audit-form-item" label="中标价:">
                          <span :class="{red:item.PRICE > priceLibrary.price,orange:item.PRICE <= priceLibrary.price}">{{item.PRICE}}</span>
                          <span v-if="auditForm[index].PRICE" class="orange"><br>审核后：{{auditForm[index].PRICE}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="6">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item class="audit-form-item" label="执行日期:">
                          <span class="orange">{{item.EXECUTIONDATE}}</span>
                        <span v-if="auditForm[index].EXECUTIONDATE" class="orange"><br>审核后：{{auditForm[index].EXECUTIONDATE}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
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
  import {findShowPriceByProductId} from 'src/axios/auditchanges/messagePublicity/price'
  import {findById} from 'src/axios/auditchanges/messageChanges/price'
  import {queryChangeAuditData} from 'src/axios/auditchanges/auditManage/price'
  import {
    queryQuestionField,
    queryCheckRecording,
    queryPriceLibrary
  } from 'src/axios/auditchanges/auditManage/productDeclareAudit'
  import priceBasics from 'src/pages/auditchanges/common/priceDetailCommon/priceBasics'
  import productQueryInfoByAudit from 'src/pages/auditchanges/common/productQueryInfoByAudit'

  export default {
    name: "price-publicity-doubt",
    components: {
      priceBasics,
      productQueryInfoByAudit
    },
    data() {
      return {
        visible: false,
        id: '', //申报/变更过程ID 用于查产品基础数据
        changeFlag: true,//变更标识
        showForm: this.metaShowForm(),//变更前数据展示
        auditForm: this.metaAuditForm(),
        changeForm: this.metaChangeForm(),
        checkRecording: [],
        priceLibrary: [],
        nodesPosition: {},
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
          PRICETYPE: '',
          REMARK: '',
          REPRESENTATIVEPACKAGING: '',
          PRICE: '',
          YEAR: '',
          METHOD: '',
          REPRESENTATIVEPRICE: '',
          EXECUTIONDATE: '',
          REPRESENTATIVESPEC: ''
        },]
      },//变更前展示数据
      metaAuditForm() {
        return [{
          PROJECTNAME: '',
          CALCULATEPRICE: '',
          PROVINCE: '',
          REMARK: '',
          REPRESENTATIVEPACKAGING: '',
          PRICE: '',
          YEAR: '',
          METHOD: '',
          REPRESENTATIVEPRICE: '',
          EXECUTIONDATE: '',
          REPRESENTATIVESPEC: '',
          PRICETYPE:''
        }]
      },//审核后数据
      metaChangeForm() {
        return [{
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
          REPRESENTATIVESPEC: ''
        }]
      },//审核后数据
      makeDataFrame(resData,dataName){
        if(resData.length > 1) {
          dataName = resData;
          let indexArr = [];
          this.changeForm.forEach((item,index)=>{
            let b = true;
            dataName.forEach((x,y)=>{
              if(item.ID==x.ID){
                b = false;
              }
            })
            if(b){
              indexArr.push(index);
            }
          })
          for(let  i = 0 ; i < indexArr.length ; i ++) {
            dataName.splice(indexArr[i], 0, {'ID': this.changeForm[indexArr[i]].ID})
          }
        }else{
          this.changeForm.forEach((item,index)=>{
            dataName[index].ID = item.ID;
          });
        }
        return dataName
      },
      async list(id, projectProductId) {
        this.id = projectProductId;
        this.visible = true;
        await findShowPriceByProductId(projectProductId).then(res => {
          if(res.data.length > 0) {
            this.showForm = res.data;
          }
        })
        await findById(id).then(res =>{
          if(res.data.length > 0) {
            this.changeForm = res.data;
          }
        })
        //查询审核数据
        await queryChangeAuditData(id).then(res => {
          this.auditForm = this.makeDataFrame(res.data,this.auditForm)
        })
        await queryCheckRecording(projectProductId,'4').then(res => {
          this.checkRecording = res.data
        })
        await queryPriceLibrary(projectProductId,true).then(res => {
          this.priceLibrary = res.data
        })


        console.log(this.changeForm,this.auditForm)
        /**
         * 查询设置锚点位置
         * */
        this.removeClassCurrent('jump-pro-detail-audit')[0].classList.add('current');
        this.getNodesHeight('product-declare-audit', 'shxx-product-declare');
      },
      goBack() {
        this.visible = false;
      },
      findQueryInfo(filed) {
        this.$nextTick(() => {
          this.showForm.SHOWFLAG = true;
          this.showForm.ID = this.id;
          this.$refs.productQueryInfoByAudit.list(filed, this.showForm, this.flagForm)
        })
      },
      changeScrollHeight(pageY, scrollBoxNodeName, jumpNodeName, currentNodeIndex) {
        let vieNode = document.getElementById(scrollBoxNodeName);
        vieNode.scrollTo(0, pageY);
        this.removeClassCurrent(jumpNodeName)[currentNodeIndex].classList.add('current');

      },
      removeClassCurrent(nodeClassName) {
        let jumpNodes = document.getElementsByClassName(nodeClassName);
        for (let i = 0; i < jumpNodes.length; i++) {
          jumpNodes[i].classList.remove('current')
        }
        return jumpNodes
      },
      getNodesHeight(proInfoDetaiBox, currentShxx) {
        let vieNode = document.getElementById(proInfoDetaiBox);
        let viewNodeChildeNodes = vieNode.childNodes;
        for (let i = 0; i < viewNodeChildeNodes.length; i++) {
          if (viewNodeChildeNodes[i].nodeName == 'H3') {
            if (viewNodeChildeNodes[i].className == 'cpjc') {
              this.nodesPosition.cpjc = viewNodeChildeNodes[i].offsetTop
            }
            if (viewNodeChildeNodes[i].className == 'jgxx') {
              this.nodesPosition.jgxx = viewNodeChildeNodes[i].offsetTop
            }
          }
        }
        let shxx = document.getElementById(currentShxx);
        this.nodesPosition.shxx = shxx.offsetTop;
        console.log(this.nodesPosition)
      },
      removeFixed(sideNodeName) {
        let sideNode = document.getElementById(sideNodeName);
        sideNode.classList.remove('side-scroll');
        sideNode.classList.add('side-init');
      },
      addFixed(sideNodeName) {
        let sideNode = document.getElementById(sideNodeName);
        sideNode.classList.remove('side-init');
        sideNode.classList.add('side-scroll');
      },
      dialogBoxScroll(vieNode, jumpNodeName, sideNodeName) {
        let vieNodeScrollTop = vieNode.scrollTop;
        if (vieNodeScrollTop < this.nodesPosition.cpjc && vieNodeScrollTop <= this.nodesPosition.jgxx) {
          this.removeClassCurrent(jumpNodeName)[0].classList.add('current');
        }
        else if (vieNodeScrollTop > this.nodesPosition.jgxx && vieNodeScrollTop < this.nodesPosition.shxx) {
          this.removeClassCurrent(jumpNodeName)[1].classList.add('current');
        }
        else if (vieNodeScrollTop > this.nodesPosition.shxx) {
          this.removeClassCurrent(jumpNodeName)[2].classList.add('current');
        }

        if (vieNodeScrollTop <= this.nodesPosition.cpjc + 50) {
          this.removeFixed(sideNodeName)
        }
        else {
          this.addFixed(sideNodeName)
        }
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
