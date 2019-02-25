<template>
  <el-dialog
    custom-class="w80"
    :title="this.showForm.SHOWFLAG?'价格变更澄清详情':'价格变更澄清'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    append-to-body
    class="audit-dialog"
    id="product-declare-audit-box"
  >

    <div v-if="visible">
      <div class="main audit-main">
        <ul class="side side-init" id="product-declare-audit-side">
          <li v-for="(item,index) in nodesPosition" :key="index"><a @click="changeScrollHeight(item.nodePosition,'product-declare-audit-box','jump-pro-dec-audit',index)"
                 class="current d_jump jump-pro-dec-audit">{{item.itemName}}</a></li>
        </ul>

        <div class="right-box">
          <div class="tableset audit-info">
            <el-form id="product-declare-audit" ref="showForm" label-width="150px" size="small" label-position="left">

              <h3 class="cpjc">产品基础信息</h3>
              <price-basics :projectProductId="this.productId" :changeFlag="this.changeFlag"></price-basics>
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
              <el-row class="audit-item-box">
                <el-col :span="24">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item class="audit-form-item" label="价格类型">
                        <span>{{{
                          "0": "全国最低中标价",
                          "1": "计算价格",
                          "2": "无最低中标价"
                          ,"3":"京津冀三地价格"
                        }[showForm[0].PRICETYPE]}}
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
                    <span>{{changeCatalogAreaName}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <div v-if="changeCatalogArea == '0' || changeCatalogArea == '1'">
                <el-row class="audit-item-box">
                  <el-col :span="24">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="价格类型">
                          <span class="orange">{{{
                            "0": "全国最低中标价",
                            "1": "计算价格",
                            "2": "无最低中标价"
                            ,"3":"京津冀三地价格"
                          }[changeForm[0].PRICETYPE]}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                    <span class="audit-check-box">
                      <a class="audit-answer-if" v-if="flagForm[0].PRICETYPE" type="warning"
                         @click="findQueryInfo('PRICETYPE',flagForm[0].ID)">{{flagForm[0].PRICETYPE == '0' ? '已澄清' : '未澄清'}}</a>
                  </span>
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
                      <el-col :span="24">
                  <span class="audit-check-box">
                      <a class="audit-answer-if" v-if="flagForm[0].YEAR" type="warning" @click="findQueryInfo('YEAR',flagForm[0].ID)">{{flagForm[0].YEAR == '0' ? '已澄清' : '未澄清'}}</a>
                  </span>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="省份">
                          <span class="orange">{{changeForm[0].PROVINCENAME}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                    <span class="audit-check-box">
                        <a class="audit-answer-if" v-if="flagForm[0].PROVINCE" type="warning"
                           @click="findQueryInfo('PROVINCE',flagForm[0].ID)">{{flagForm[0].PROVINCE == '0' ? '已澄清' : '未澄清'}}</a>
                    </span>
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
                      <el-col :span="24">
                    <span class="audit-check-box">
                        <a class="audit-answer-if" v-if="flagForm[0].PROJECTNAME" type="warning"
                           @click="findQueryInfo('PROJECTNAME',flagForm[0].ID)">{{flagForm[0].PROJECTNAME == '0' ? '已澄清' : '未澄清'}}</a>
                    </span>
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
                      <el-col :span="24">
                   <span class="audit-check-box">
                        <a class="audit-answer-if" v-if="flagForm[0].PRICE" type="warning"
                           @click="findQueryInfo('PRICE',flagForm[0].ID)">{{flagForm[0].PRICE == '0' ? '已澄清' : '未澄清'}}</a>
                    </span>
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
                      <el-col :span="24">
                    <span class="audit-check-box">
                        <a class="audit-answer-if" v-if="flagForm[0].REPRESENTATIVESPEC" type="warning"
                           @click="findQueryInfo('REPRESENTATIVESPEC',flagForm[0].ID)">{{flagForm[0].REPRESENTATIVESPEC == '0' ? '已澄清' : '未澄清'}}</a>
                    </span>
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
                      <el-col :span="12">
                   <span class="audit-check-box">
                        <a class="audit-answer-if" v-if="flagForm[0].EXECUTIONDATE" type="warning"
                           @click="findQueryInfo('EXECUTIONDATE',flagForm[0].ID)">{{flagForm[0].EXECUTIONDATE == '0' ? '已澄清' : '未澄清'}}</a>
                    </span>
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
                      <el-col :span="24">
                   <span class="audit-check-box">
                        <a class="audit-answer-if" v-if="flagForm[0].REPRESENTATIVEPRICE" type="warning"
                           @click="findQueryInfo('REPRESENTATIVEPRICE',flagForm[0].ID)">{{flagForm[0].REPRESENTATIVEPRICE == '0' ? '已澄清' : '未澄清'}}</a>
                    </span>
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
                      <el-col :span="24">
                   <span class="audit-check-box">
                        <a class="audit-answer-if" v-if="flagForm[0].REPRESENTATIVEPACKAGING" type="warning"
                           @click="findQueryInfo('REPRESENTATIVEPACKAGING',flagForm[0].ID)">{{flagForm[0].REPRESENTATIVEPACKAGING == '0' ? '已澄清' : '未澄清'}}</a>
                    </span>
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
                          <el-col :span="24">
                       <span class="audit-check-box">
                        <a class="audit-answer-if" v-if="flagForm[0].METHOD" type="warning"
                           @click="findQueryInfo('METHOD',flagForm[0].ID)">{{flagForm[0].METHOD == '0' ? '已澄清' : '未澄清'}}</a>
                    </span>
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
                      <el-col :span="24">
                   <span class="audit-check-box">
                        <a class="audit-answer-if" v-if="flagForm[0].CALCULATEPRICE" type="warning"
                           @click="findQueryInfo('CALCULATEPRICE',flagForm[0].ID)">{{flagForm[0].CALCULATEPRICE == '0' ? '已澄清' : '未澄清'}}</a>
                    </span>
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
                      <el-col :span="24">
                   <span class="audit-check-box">
                        <a class="audit-answer-if" v-if="flagForm[0].REMARK" type="warning"
                           @click="findQueryInfo('REMARK',flagForm[0].ID)">{{flagForm[0].REMARK == '0' ? '已澄清' : '未澄清'}}</a>
                    </span>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
              <div v-if="changeCatalogArea == '2' || changeCatalogArea == '3'">
                <el-row>
                  <el-col :span="24">
                    <el-form-item class="audit-form-item" label="日服用折算价格:">
                      <span class="orange">{{changeForm[0].DISCOUNTPRICE}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <span class="audit-check-box">
                        <a class="audit-answer-if" v-if="flagForm[0].DISCOUNTPRICE" type="warning"
                           @click="findQueryInfo('DISCOUNTPRICE',flagForm[0].ID)">{{flagForm[0].DISCOUNTPRICE == '0' ? '已澄清' : '未澄清'}}</a>
                    </span>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col class="marbottom15" :span="12" >
                    <el-form-item class="audit-form-item" label="价格类型：">
                      <span>京津冀三地报价</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="" :gutter="2" v-for="(item,index) in changeForm" :key="index">
                  <el-col :span="5">
                    <el-form-item class="acc-price-label" label="省份：">
                      <span>{{item.PROVINCENAME}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="acc-price-label audit-form-item" label="项目名称:">
                          <span class="orange">{{item.PROJECTNAME}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                    <span class="audit-check-box">
                        <a class="audit-answer-if" v-if="flagForm[index].PROJECTNAME" type="warning"
                           @click="findQueryInfo('PROJECTNAME',flagForm[index].ID)">{{flagForm[index].PROJECTNAME == '0' ? '已澄清' : '未澄清'}}</a>
                    </span>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="6">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="acc-price-label audit-form-item" label="中标价:">
                          <span class="orange">{{item.PRICE}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                    <span class="audit-check-box">
                        <a class="audit-answer-if" v-if="flagForm[index].PRICE" type="warning"
                           @click="findQueryInfo('PRICE',flagForm[index].ID)">{{flagForm[index].PRICE == '0' ? '已澄清' : '未澄清'}}</a>
                    </span>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="6">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item acc-price-label" label="执行日期:">
                          <span class="orange">{{item.EXECUTIONDATE}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                    <span class="audit-check-box">
                        <a class="audit-answer-if" v-if="flagForm[index].EXECUTIONDATE" type="warning"
                           @click="findQueryInfo('EXECUTIONDATE',flagForm[index].ID)">{{flagForm[index].EXECUTIONDATE == '0' ? '已澄清' : '未澄清'}}</a>
                    </span>
                      </el-col>
                    </el-row>
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
    <productQueryInfo ref="productQueryInfo"></productQueryInfo>

  </el-dialog>

</template>

<script>
  import priceBasics from 'src/pages/auditchanges/common/priceDetailCommon/priceBasics'
  import imagesPreview from 'src/pages/auditchanges/common/imagesPreview'
  import uploadButton from 'src/pages/auditchanges/common/uploadButton'
  import productQueryInfo from 'src/pages/auditchanges/common/productQueryInfo'
  import {queryPROVINCE} from 'src/axios/auditchanges/messageDeclare/product'
  import {findShowPriceByProductId} from 'src/axios/auditchanges/messagePublicity/price'
  import {findById} from 'src/axios/auditchanges/messageChanges/price'
  import {selectChangeQueryFieldById} from 'src/axios/auditchanges/messageClarify/price'
  import {boxScroll} from 'src/components/mixins/scrolls'
  import {dateFormatter} from 'src/utils/index'
  export default {
    name: "price-publicity-doubt",
    mixins:[boxScroll],
    components: {
      priceBasics,
      imagesPreview,
      uploadButton,
      productQueryInfo
    },
    data() {
      return {
        fileType: '3',//上传文件类型 3 质疑
        visible: false,
        productId:'',
        catalogAreaName:'',
        catalogArea:'',
        changeCatalogAreaName:'',
        changeCatalogArea:'',
        auditstate:'',
        auditremark:'',
        id: '', //申报/变更过程ID 用于查产品基础数据
        changeFlag: true,//变更标识
        showForm: this.metaShowForm(),//变更前数据展示
        changeForm:this.metaChangeForm(),
        flagForm:this.metaFlagForm(),
        yearList: [
          {key: '2018', label: '2018', value: '2018'},
          {key: '2017', label: '2017', value: '2017'},
          {key: '2016', label: '2016', value: '2016'},
          {key: '2015', label: '2015', value: '2015'},
          {key: '2014', label: '2014', value: '2014'},
          {key: '2013', label: '2013', value: '2013'},
          {key: '2012', label: '2012', value: '2012'},
          {key: '2011', label: '2011', value: '2011'},
          {key: '2010', label: '2010', value: '2010'},
          {key: '2009', label: '2009', value: '2009'}
        ],//年份
        provinceList: [],//省份
        methodList: [
          {key: "0", value: "其他", label: "其他"},
          {key: "1", value: "计算方法一", label: "计算方法一"},
          {key: "2", value: "计算方法二", label: "计算方法二"},
          {key: "3", value: "计算方法三", label: "计算方法三"},
          {key: "4", value: "计算方法四", label: "计算方法四"},
          {key: "5", value: "计算方法五", label: "计算方法五"},
          {key: "6", value: "计算方法六", label: "计算方法六"}
        ],//计算方法
        nodesPosition:[
          {itemName: '基础信息', nodePosition: null, itemAbb: 'cpjc'},
          {itemName: '价格基础', nodePosition: null, itemAbb: 'jgxx'},
        ],
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
          PRICETYPE: '2',
          REMARK: '',
          REPRESENTATIVEPACKAGING: '',
          PRICE: '',
          YEAR: '',
          METHOD: '',
          REPRESENTATIVEPRICE: '',
          EXECUTIONDATE: '',
          REPRESENTATIVESPEC: ''
        }]
      },//变更前展示数据
      metaChangeForm() {
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
          REPRESENTATIVESPEC: ''
        },
          {
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
            REPRESENTATIVESPEC: ''
          },
          {
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
            REPRESENTATIVESPEC: ''
          }
        ]
      },//变更后展示数据
      metaFlagForm() {
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
          REPRESENTATIVESPEC: ''
        },
          {
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
            REPRESENTATIVESPEC: ''
          },
          {
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
            REPRESENTATIVESPEC: ''
          }
        ]
      },//用于审核/澄清页面弹层 区分是否有质疑、澄清数据
      makeDataFrame(resData,dataName){
        if(resData.length > 0) {
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
      async list(id,productId,flag) {
        this.id = id;
        this.productId = productId;
        this.visible = true;
        let res = await queryPROVINCE()
        this.provinceList = res.data;
        //变更前价格数据
        await findShowPriceByProductId(productId).then(res => {
//          if (res.data.provinceId) {
//            for (let x in this.provinceList) {
//              if (res.data.provinceId == this.provinceList[x].ID) {
//                res.data.provinceId = this.provinceList[x].NAME_CHN
//              }
//            }
//          }
          this.catalogAreaName = res.data[0].CATALOGAREANAME;
          this.catalogArea = res.data[0].CATALOGAREA;
          this.showForm = res.data
          this.showForm.ID = id;
          if (flag != undefined) {
            this.showForm.SHOWFLAG = true;
          }
        })
        await findById(id).then(res =>{
//          if (res.data.provinceId) {
//            for (let x in this.provinceList) {
//              if (res.data.provinceId == this.provinceList[x].ID) {
//                res.data.provinceId = this.provinceList[x].NAME_CHN
//              }
//            }
//          }
          this.changeCatalogAreaName = res.data[0].CATALOGAREANAME;
          this.changeCatalogArea = res.data[0].CATALOGAREA;
          this.changeForm = res.data
        })
        await selectChangeQueryFieldById(id).then(res => {
          this.flagForm = this.makeDataFrame(res.data,this.flagForm)        })
        /**
         * 查询设置锚点位置
         * */
        this.removeClassCurrent('jump-pro-dec-audit')[0].classList.add('current');
        this.getNodesHeight('product-declare-audit');
      },
      goBack() {
        this.visible = false;
        window.location.reload()
      },
      findQueryInfo(filed,id) {
        let clarifyDomain = {
          "ID":id,
          "TALKTYPE":'6',
          "SHOWFLAG":this.showForm.SHOWFLAG
        }
        this.$refs.productQueryInfo.list(filed, clarifyDomain, this.flagForm,null,true)
      }
    },
    watch: {
      visible(newVal) {
        let vieNode = document.getElementById('product-declare-audit-box');
        if(vieNode){
          if (newVal == false) {
            vieNode.onscroll = null;
            this.removeFixed('product-declare-audit-side')
          }
          else {
            vieNode.onscroll = function () {
              this.dialogBoxScroll(vieNode, 'jump-pro-dec-audit', 'product-declare-audit-side')
            }.bind(this)
          }
        }
      }
    },
    mounted() {
      let vieNode = document.getElementById('product-declare-audit-box');
      if(vieNode){
        vieNode.onscroll = function () {
          this.dialogBoxScroll(vieNode, 'jump-pro-dec-audit', 'product-declare-audit-side')
        }.bind(this)
      }
    }
  }
</script>
<style>
  @import '../../../../assets/css/auditchanges.css';
</style>
