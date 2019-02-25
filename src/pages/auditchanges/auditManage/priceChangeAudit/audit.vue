<template>
  <el-dialog
    width="95%"
    title="价格变更审核"
    :close-on-click-modal="false"
    :visible.sync="visible"
    append-to-body
    id="product-audit-view-box"
  >
    <div v-if="visible">
      <div class="main audit-main">
        <ul class="side side-init" id="product-audit-side">
          <li><a @click="changeScrollHeight(nodesPosition.cpjc,'product-audit-view-box','jump-pro-dec-audit',0)"
                 class="current d_jump jump-pro-dec-audit">基础信息</a></li>
          <li><a @click="changeScrollHeight(nodesPosition.jgxx,'product-audit-view-box','jump-pro-dec-audit',1)"
                 class="d_jump jump-pro-dec-audit">价格基础</a></li>
          <li><a @click="changeScrollHeight(nodesPosition.qgjgk,'product-audit-view-box','jump-pro-dec-audit',2)"
                 class="d_jump jump-pro-dec-audit">全国价格库</a></li>
          <li><a @click="changeScrollHeight(nodesPosition.shxx,'product-audit-view-box','jump-pro-dec-audit',3)"
                 class="d_jump jump-pro-dec-audit">审核记录</a></li>
        </ul>
        <div class="right-box">
          <div class="tableset audit-info">
            <el-form id="product-audit"  ref="dataForm" label-width="150px" size="small" label-position="left">
              <h3 class="cpjc">产品基础信息</h3>
              <price-basics :projectProductId="this.proId" :changeFlag="this.changeFlag"></price-basics>
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
                          <span>
                            {{{"0": "全国最低中标价", "1": "计算价格", "2": "无最低中标价","3":"京津冀三地价格"}[showForm[0].PRICETYPE]}}
                          </span>
                        </el-form-item>
                      </el-col>
                      <!--<el-col :span="24">-->
                      <!--<el-form-item class="audit-form-item" prop="priceType" ref="priceType">-->
                      <!--<span slot="label" class="audit-check-box">-->
                      <!--<el-checkbox class="orange" v-if="changeForm.priceType" v-model="controlData.priceType$" label="不正确"-->
                      <!--@change="updateInput('priceType')"></el-checkbox>-->
                      <!--<a class="audit-answer-if" v-if="flagForm.priceType" type="warning"-->
                      <!--@click="findQueryInfo('priceType')">{{flagForm.priceType == 0 ? '已回复' : '未回复'}}</a>-->
                      <!--</span>-->
                      <!--<el-radio-group v-if="controlData.priceType$" v-model="dataForm.priceType">-->
                      <!--<el-radio label="0">全国最低中标价</el-radio>-->
                      <!--<el-radio label="1">计算价格</el-radio>-->
                      <!--<el-radio label="2">无最低中标价</el-radio>-->
                      <!--</el-radio-group>-->
                      <!--</el-form-item>-->
                      <!--</el-col>-->
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
                    <span class="orange">{{changeCatalogAreaName}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <div v-if="changeCatalogArea == '0' || changeCatalogArea == '1'">
                <el-row class="">
                  <el-col :span="24">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="价格类型">
                          <span class="orange" v-if="changeForm[0].PRICETYPE">
                            {{{"0": "全国最低中标价", "1": "计算价格", "2": "无最低中标价","3":"京津冀三地价格"}[changeForm[0].PRICETYPE]}}
                          </span>
                        </el-form-item>
                      </el-col>
                      <!--<el-col :span="24">-->
                        <!--<el-form-item class="audit-form-item" prop="priceType" ref="priceType">-->
                          <!--<span slot="label" class="audit-check-box">-->
                      <!--<el-checkbox class="orange" v-if="changeForm.priceType" v-model="controlData.priceType$" label="不正确"-->
                                   <!--@change="updateInput('priceType')"></el-checkbox>-->
                      <!--<a class="audit-answer-if" v-if="flagForm.priceType" type="warning"-->
                         <!--@click="findQueryInfo('priceType')">{{flagForm.priceType == 0 ? '已回复' : '未回复'}}</a>-->
                    <!--</span>-->
                          <!--<el-radio-group v-if="controlData.priceType$" v-model="dataForm.priceType">-->
                            <!--<el-radio label="0">全国最低中标价</el-radio>-->
                            <!--<el-radio label="1">计算价格</el-radio>-->
                            <!--<el-radio label="2">无最低中标价</el-radio>-->
                          <!--</el-radio-group>-->
                        <!--</el-form-item>-->
                      <!--</el-col>-->
                    </el-row>
                  </el-col>
                </el-row>
                <el-row class="audit-item-box" v-if="changeForm[0].PRICETYPE != '2'">
                  <el-col :span="12">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="年度">
                          <span class="orange" v-if="changeForm[0].YEAR">{{changeForm[0].YEAR}}
                          </span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item  class="audit-form-item" prop="yearId" ref="yearId">
                          <span slot="label" class="audit-check-box">
                      <el-checkbox class="orange" v-if="changeForm[0].YEAR" v-model="controlData[0].YEAR$" label="不正确"
                                   @change="updateInput('YEAR',0)"></el-checkbox>
                      <a class="audit-answer-if" v-if="flagForm[0].YEAR" type="warning"
                         @click="findQueryInfo('YEAR',flagForm[0].ID)">{{flagForm[0].YEAR == 0 ? '已回复' : '未回复'}}</a>
                    </span>
                          <el-select v-if="controlData[0].YEAR$" v-model="dataForm[0].YEAR" placeholder="请选择" size="small"
                                     class="fundInput">
                            <el-option v-for="item in yearList"
                                       :key="item.key"
                                       :label="item.label"
                                       :value="item.value"
                                       class="fundInput">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="省份">
                          <span class="orange" v-if="changeForm[0].PROVINCE">{{changeForm[0].PROVINCENAME}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" prop="provinceId" ref="provinceId">
                          <span slot="label" class="audit-check-box">
                      <el-checkbox class="orange" v-if="changeForm[0].PROVINCE" v-model="controlData[0].PROVINCE$"
                                   label="不正确"
                                   @change="updateInput('PROVINCE',0)"></el-checkbox>
                      <a class="audit-answer-if" v-if="flagForm[0].PROVINCE" type="warning"
                         @click="findQueryInfo('PROVINCE',flagForm[0].ID)">{{flagForm[0].PROVINCE == 0 ? '已回复' : '未回复'}}</a>
                    </span>
                          <el-select v-if="controlData[0].PROVINCE$" v-model="dataForm[0].PROVINCE" placeholder="请选择"
                                     size="small" class="fundInput">
                            <el-option v-for="item in provinceList"
                                       :key="item.ID"
                                       :label="item.NAME_CHN"
                                       :value="item.ID"
                                       class="fundInput">
                            </el-option>
                          </el-select>
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
                          <span class="orange" v-if="changeForm[0].PROJECTNAME">{{changeForm[0].PROJECTNAME}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" prop="projectName" ref="projectName" data-max="200">
                          <span slot="label" class="audit-check-box">
                      <el-checkbox class="orange" v-if="changeForm[0].PROJECTNAME" v-model="controlData[0].PROJECTNAME$"
                                   label="不正确"
                                   @change="updateInput('PROJECTNAME',0)"></el-checkbox>
                      <a class="audit-answer-if" v-if="flagForm[0].PROJECTNAME" type="warning"
                         @click="findQueryInfo('PROJECTNAME',flagForm[0].ID)">{{flagForm[0].PROJECTNAME == 0 ? '已回复' : '未回复'}}</a>
                    </span>
                          <el-input class="audit-detail-input" v-if="controlData[0].PROJECTNAME$"
                                    v-model="dataForm[0].PROJECTNAME"></el-input>
                        </el-form-item>

                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12" v-if="changeForm[0].PRICETYPE =='0'">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="中标价">

                          <span :class="{red:changeForm[0].PRICE > priceLibrary.price,orange:changeForm[0].PRICE <= priceLibrary.price}" v-if="changeForm[0].PRICE">
                           {{changeForm[0].PRICE}}
                          </span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item"  prop="inPrice" ref="inPrice">
                           <span slot="label" class="audit-check-box">
                      <el-checkbox class="orange" v-if="changeForm[0].PRICE" v-model="controlData[0].PRICE$" label="不正确"
                                   @change="updateInput('PRICE',0)"></el-checkbox>
                      <a class="audit-answer-if" v-if="flagForm[0].PRICE" type="warning" @click="findQueryInfo('PRICE',flagForm[0].ID)">{{flagForm[0].PRICE == 0 ? '已回复' : '未回复'}}</a>
                    </span>
                          <el-input class="audit-detail-input" v-if="controlData[0].PRICE$"
                                    v-model="dataForm[0].PRICE"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12" v-if="changeForm[0].PRICETYPE =='1'">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="代表品装量规格">
                          <span class="orange" v-if="changeForm[0].REPRESENTATIVESPEC">{{changeForm[0].REPRESENTATIVESPEC}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" prop="representativeSpec" ref="representativeSpec" data-max="100">
                           <span slot="label" class="audit-check-box">
                      <el-checkbox class="orange" v-if="changeForm[0].REPRESENTATIVESPEC"
                                   v-model="controlData[0].REPRESENTATIVESPEC$" label="不正确"
                                   @change="updateInput('REPRESENTATIVESPEC',0)"></el-checkbox>
                      <a class="audit-answer-if" v-if="flagForm[0].REPRESENTATIVESPEC" type="warning"
                         @click="findQueryInfo('REPRESENTATIVESPEC',flagForm[0].ID)">{{flagForm[0].REPRESENTATIVESPEC == 0 ? '已回复' : '未回复'}}</a>
                    </span>
                          <el-input class="audit-detail-input" v-if="controlData[0].REPRESENTATIVESPEC$"
                                    v-model="dataForm[0].REPRESENTATIVESPEC"></el-input>
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
                          <span class="orange" v-if="changeForm[0].EXECUTIONDATE">{{changeForm[0].EXECUTIONDATE}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item class="audit-form-item"  prop="executionDate" ref="executionDate">
                          <span slot="label" class="audit-check-box">
                      <el-checkbox class="orange" v-if="changeForm[0].EXECUTIONDATE" v-model="controlData[0].EXECUTIONDATE$"
                                   label="不正确"
                                   @change="updateInput('EXECUTIONDATE',0)"></el-checkbox>
                      <a class="audit-answer-if" v-if="flagForm[0].EXECUTIONDATE" type="warning"
                         @click="findQueryInfo('EXECUTIONDATE',flagForm[0].ID)">{{flagForm[0].EXECUTIONDATE == 0 ? '已回复' : '未回复'}}</a>
                    </span>
                          <el-date-picker type="date" v-if="controlData[0].EXECUTIONDATE$"
                                          v-model="dataForm[0].EXECUTIONDATE"></el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12" v-if="changeForm[0].PRICETYPE == '1'">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="代表品价格">
                          <span class="orange" v-if="changeForm[0].REPRESENTATIVEPRICE">{{changeForm[0].REPRESENTATIVEPRICE}}
                          </span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" prop="representativePrice" ref="representativePrice">
                          <span slot="label" class="audit-check-box">
                      <el-checkbox class="orange" v-if="changeForm[0].REPRESENTATIVEPRICE"
                                   v-model="controlData[0].REPRESENTATIVEPRICE$" label="不正确"
                                   @change="updateInput('REPRESENTATIVEPRICE',0)"></el-checkbox>
                      <a class="audit-answer-if" v-if="flagForm[0].REPRESENTATIVEPRICE" type="warning"
                         @click="findQueryInfo('REPRESENTATIVEPRICE',flagForm[0].ID)">{{flagForm[0].REPRESENTATIVEPRICE == 0 ? '已回复' : '未回复'}}</a>
                    </span>
                          <el-input class="audit-detail-input" v-if="controlData[0].REPRESENTATIVEPRICE$"
                                    v-model="dataForm[0].REPRESENTATIVEPRICE"></el-input>
                        </el-form-item>

                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12" v-if="changeForm[0].PRICETYPE == '1'">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="代表品装量包装">
                          <span class="orange" v-if="changeForm[0].REPRESENTATIVEPACKAGING">{{changeForm[0].REPRESENTATIVEPACKAGING}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" prop="representativePackaging" ref="representativePackaging" data-max="100">
                          <span slot="label" class="audit-check-box">
                      <el-checkbox class="orange" v-if="changeForm[0].REPRESENTATIVEPACKAGING"
                                   v-model="controlData[0].REPRESENTATIVEPACKAGING$" label="不正确"
                                   @change="updateInput('REPRESENTATIVEPACKAGING',0)"></el-checkbox>
                      <a class="audit-answer-if" v-if="flagForm[0].REPRESENTATIVEPACKAGING" type="warning"
                         @click="findQueryInfo('REPRESENTATIVEPACKAGING',flagForm[0].ID)">{{flagForm[0].REPRESENTATIVEPACKAGING == 0 ? '已回复' : '未回复'}}</a>
                    </span>
                          <el-input class="audit-detail-input" v-if="controlData[0].REPRESENTATIVEPACKAGING$"
                                    v-model="dataForm[0].REPRESENTATIVEPACKAGING"></el-input>
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
                              <span class="orange" v-if="changeForm[0].METHOD">{{changeForm[0].METHOD}}</span>
                            </el-form-item>
                          </el-col>
                          <el-col :span="24">
                            <el-form-item class="audit-form-item" prop="computationalMethod" ref="computationalMethod">
                              <span slot="label" class="audit-check-box">
                          <el-checkbox class="orange" v-if="changeForm[0].METHOD"
                                       v-model="controlData[0].METHOD$" label="不正确"
                                       @change="updateInput('METHOD',0)"></el-checkbox>
                          <a class="audit-answer-if" v-if="flagForm[0].METHOD" type="warning"
                             @click="findQueryInfo('METHOD',flagForm[0].ID)">{{flagForm[0].METHOD == 0 ? '已回复' : '未回复'}}</a>
                        </span>
                              <el-select v-if="controlData[0].METHOD$" v-model="dataForm[0].METHOD"
                                         placeholder="请选择" size="small" class="fundInput">
                                <el-option v-for="item in methodList"
                                           :key="item.key"
                                           :label="item.label"
                                           :value="item.value"
                                           class="fundInput">
                                </el-option>
                              </el-select>
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
                          <span class="orange" v-if="changeForm[0].CALCULATEPRICE">{{changeForm[0].CALCULATEPRICE}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" prop="calculatePrice" ref="calculatePrice"  data-mustNum="true">
                          <span slot="label" class="audit-check-box">
                      <el-checkbox class="orange" v-if="changeForm[0].CALCULATEPRICE" v-model="controlData[0].CALCULATEPRICE$"
                                   label="不正确"
                                   @change="updateInput('CALCULATEPRICE',0)"></el-checkbox>
                      <a class="audit-answer-if" v-if="flagForm[0].CALCULATEPRICE" type="warning"
                         @click="findQueryInfo('CALCULATEPRICE',flagForm[0].ID)">{{flagForm[0].CALCULATEPRICE == 0 ? '已回复' : '未回复'}}</a>
                    </span>
                          <el-input class="audit-detail-input" v-if="controlData[0].CALCULATEPRICE$"
                                    v-model="dataForm[0].CALCULATEPRICE"></el-input>
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
                          <span class="orange" v-if="changeForm[0].REMARK">{{changeForm[0].REMARK}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" prop="remark" ref="remark" data-max="2000">
                          <span slot="label" class="audit-check-box">
                      <el-checkbox class="orange" v-if="changeForm[0].REMARK" v-model="controlData[0].REMARK$" label="不正确"
                                   @change="updateInput('REMARK',0)"></el-checkbox>
                      <a class="audit-answer-if" v-if="flagForm[0].REMARK" type="warning"
                         @click="findQueryInfo('REMARK',flagForm[0].ID)">{{flagForm[0].REMARK == 0 ? '已回复' : '未回复'}}</a>
                    </span>
                          <el-input class="audit-detail-input" v-if="controlData[0].REMARK$"
                                    v-model="dataForm[0].REMARK"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
              <div v-if="changeCatalogArea == '2' || changeCatalogArea == '3'">
                <el-row class="">
                      <el-col :span="12">
                        <el-form-item class="audit-form-item" label="日服用折算价格:">
                          <span class="orange" v-if="changeForm[0].DISCOUNTPRICE">{{changeForm[0].DISCOUNTPRICE}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" prop="remark" ref="remark" data-max="2000">
                          <span slot="label" class="audit-check-box">
                      <el-checkbox class="orange" v-if="changeForm[0].DISCOUNTPRICE" v-model="controlData[0].DISCOUNTPRICE$" label="不正确"
                                   @change="updateInput('DISCOUNTPRICE',0)"></el-checkbox>
                      <a class="audit-answer-if" v-if="flagForm[0].DISCOUNTPRICE" type="warning"
                         @click="findQueryInfo('DISCOUNTPRICE',flagForm[0].ID)">{{flagForm[0].DISCOUNTPRICE == 0 ? '已回复' : '未回复'}}</a>
                    </span>
                          <el-input class="audit-detail-input" v-if="controlData[0].DISCOUNTPRICE$"
                                    v-model="dataForm[0].DISCOUNTPRICE"></el-input>
                        </el-form-item>
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
                        <el-form-item class="acc-price-label" label="项目名称:">
                          <span class="orange">
                            {{item.PROJECTNAME}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item class="acc-price-label audit-form-item" prop="remark" ref="remark" data-max="2000">
                          <span slot="label" class="audit-check-box">
                      <el-checkbox class="orange" v-if="item.PROJECTNAME" v-model="controlData[index].PROJECTNAME$" label="不正确"
                                   @change="updateInput('PROJECTNAME',index)"></el-checkbox>
                      <a class="audit-answer-if" v-if="flagForm[index].PROJECTNAME" type="warning"
                         @click="findQueryInfo('PROJECTNAME',flagForm[index].ID)">{{flagForm[index].PROJECTNAME == 0 ? '已回复' : '未回复'}}</a>
                    </span>
                          <el-input size="small"  v-if="controlData[index].PROJECTNAME$"
                                    v-model="dataForm[index].PROJECTNAME"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="6">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="acc-price-label " label="中标价:">
                          <span :class="{red:item.PRICE > priceLibrary.price,orange:item.PRICE <= priceLibrary.price}">{{item.PRICE}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item class="acc-price-label audit-form-item" prop="remark" ref="remark" data-max="2000">
                          <span slot="label" class="audit-check-box">
                      <el-checkbox class="orange" v-if="item.PRICE" v-model="controlData[index].PRICE$" label="不正确"
                                   @change="updateInput('PRICE',index)"></el-checkbox>
                      <a class="audit-answer-if" v-if="flagForm[index].PRICE" type="warning"
                         @click="findQueryInfo('PRICE',flagForm[index].ID)">{{flagForm[index].PRICE == 0 ? '已回复' : '未回复'}}</a>
                    </span>
                          <el-input size="small" v-if="controlData[index].PRICE$"
                                    v-model="dataForm[index].PRICE"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="6">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="acc-price-label" label="执行日期:">
                          <span class="orange" >{{item.EXECUTIONDATE}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item class="acc-price-label audit-form-item" prop="remark" ref="remark" data-max="2000">
                          <span slot="label" class="audit-check-box">
                      <el-checkbox class="orange" v-if="item.EXECUTIONDATE" v-model="controlData[index].EXECUTIONDATE$" label="不正确"
                                   @change="updateInput('EXECUTIONDATE',index)"></el-checkbox>
                      <a class="audit-answer-if" v-if="flagForm[index].EXECUTIONDATE" type="warning"
                         @click="findQueryInfo('EXECUTIONDATE',flagForm[index].ID)">{{flagForm[index].EXECUTIONDATE == 0 ? '已回复' : '未回复'}}</a>
                    </span>
                          <el-date-picker size="small" v-if="controlData[index].EXECUTIONDATE$"
                                    v-model="dataForm[index].EXECUTIONDATE"></el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
              <!--——————————————————————————————————————————————————————-->

              <h3 class="qgjgk">全国价格库</h3>
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
              <span>
                <h4>项目名称应包括项目年度和省份名称，请按照各省公布的标准项目录名称录入。   最低价请如实、谨慎填写，注意不同规格包装间的合理比价关系！</h4></span>
            </el-form>
            <h3 id="audit-shxx">审核记录</h3>
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
            <el-form  ref="dataForm2"
                     label-width="100px" size="small" label-position="left">
              <el-row>
                <el-form-item label="审核结果" porp="AUDITSTATE" ref="AUDITSTATE">
                  <el-radio-group v-model="auditstate">
                    <el-radio label="1">审核通过</el-radio>
                    <el-radio label="3">审核不通过</el-radio>
                    <el-radio label="2">待确认</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
              <el-row>
                <el-col :span="22">
                  <el-form-item label="审核备注" prop="AUDITREMARK" ref="AUDITREMARK" data-max="4000">
                    <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="auditremark"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <product-query-info-by-audit ref="productQueryInfoByAudit" @queryChange="fieldChange"></product-query-info-by-audit>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" :disabled="submitFlag" @click="submit">提交</el-button>
        <el-button size="small" @click="goBack">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import priceBasics from 'src/pages/auditchanges/common/priceDetailCommon/priceBasics'
  import {queryPROVINCE} from 'src/axios/auditchanges/messageDeclare/product'
  import {findShowPriceByProductId, findUpProjectProductById} from 'src/axios/auditchanges/messagePublicity/price'
  import {checkPriceControl,checkPriceData} from 'src/axios/auditchanges/common/nestedJson'
  import {
    queryCheckRecording,
    queryPriceLibrary,
    checkData,
    submitData
  } from 'src/axios/auditchanges/auditManage/productDeclareAudit'
  import productQueryInfoByAudit from 'src/pages/auditchanges/common/productQueryInfoByAudit'
  import {upAudit,queryChangeQuestionField,queryChangeAuditData} from 'src/axios/auditchanges/auditManage/price'
  import {changeToBite,isNumber} from 'src/utils/validateUtil'
  import {findById} from 'src/axios/auditchanges/messageChanges/price'
  import {dateFormatter} from 'src/utils/index'
  export default {
    name: "price-publicity-doubt",
    components: {
      priceBasics,
      productQueryInfoByAudit
    },
    data() {
      var changeBiteRep = (rule,value,callback)=>{
        let filedName = rule.field;
        let nodeEl = this.$refs[filedName].$el;
        //可输入字符限制
        let nodeMaxLimit = nodeEl.getAttribute('data-max');
        //是否必须数字
        let ifNum = nodeEl.getAttribute('data-mustNum') || "";
        let biteNum = nodeMaxLimit=='unlimited'?"": changeToBite(value);
        let tipMessage;
        switch(filedName){
          case 'projectName':
            tipMessage = "请输入项目名称";
            break;
          case 'representativeSpec':
            tipMessage = "请输入代表品装量规格";
            break;
          case 'representativePackaging':
            tipMessage = "请输入代表品装量包装";
            break;
          case 'remark':
            tipMessage = "请输入备注";
            break;
        }
        if(!value){
          if(rule.require){
            callback(new Error(tipMessage));
          }
          else{
            callback()
          }
        }
        else{
          //限制为数字
          if(ifNum && isNumber(value)){
            callback()
          }
          else if(ifNum && !isNumber(value)){
            callback(new Error('请输入数字'));
          }

          //不限制长度 传入'data-max="unlimited"'
          if(nodeMaxLimit == 'unlimited'){
            callback()
          }else{
            //有自字符限制
            if(biteNum){
              if (biteNum > nodeMaxLimit) {
                callback(new Error('长度不超过'+nodeMaxLimit+'个字节'));
              }else{
                callback()
              }
            }
          }
        }
      };
      var yearAndPro = (rule,value,callback)=>{
        let filedName = rule.field;
        let tipMsg;
        switch(filedName){
          case 'yearId':
            tipMsg = '请选择年份';
            break;
          case 'provinceId':
            tipMsg = '请选择省份';
            break;
        }
        if(rule.require){
          if(value){
            callback()
          }else{
            callback(new Error(tipMsg))
          }
        }else{
          callback()
        }
      };
      var price =(rule,value,callback)=>{
        let dotExp = /\./;
        let isNumberFixed = /(^[1-9]\d*$)|(^[0-9]+([.]{1}[0-9]{1,2})?$)/ig;
        if(value && isNumberFixed.test(value)){
          if(value.length > 16 && dotExp.test(value)){
            callback(new Error('长度限制为16(包含小数点和小数位数)字符'))
          }else if(value.length > 13 && !dotExp.test(value)){
            callback(new Error('长度限制为13'))
          }
          else{
            callback()
          }
        }else if(value && !isNumberFixed.test(value) ){
          callback(new Error('请输入数字（或数字保留两位小数）'))
        }else{
          if(rule.require){
            callback(new Error('请输入中标价'))
          }else{
            callback()
          }
        }
      };
      var executionDate =(rule,value,callback)=>{
        if(rule.require){
          if(value){
            callback()
          }else{
            if(rule.require){
              callback(new Error('请选择执行日期'))
            }
          }
        }else{
          callback()
        }
      };
      var representativePrice = (rule,value,callback)=>{
        if(rule.require){
          if(value){
            if(isNumber(value)){
              callback()
            }else{
              callback(new Error('请输入输入数字'))
            }
          }else{
            callback(new Error('请输入代表品价格'))
          }
        }else{
          callback()
        }
      };
      var calculatePrice = (rule,value,callback)=>{
        if(rule.require){
          if(value){
            if(isNumber(value)){
              callback()
            }else{
              callback(new Error('请输入数字'))
            }
          }else{
            callback(new Error('请输入计算价格'))
          }
        }else{
          callback()
        }
      };
      return {
        visible: false,
        catalogAreaName:'',
        catalogArea:'',
        changeCatalogAreaName:'',
        changeCatalogArea:'',
        auditstate:'',
        auditremark:'',
        requestCode:'',
        id: '', //申报/变更过程ID 用于查产品基础数据
        proId:'',
        changeFlag: true,//变更标识
        showForm: this.metaShowForm(),//变更前数据展示
        changeForm: this.metaChangeForm(),
        dataForm: this.metaDataForm(),//提交数据
        submitFlag: false,//提交按钮是否可用
        controlData: this.metaControlForm(),//多选按钮
        flagForm: this.metaFlagForm(),//回显质疑是否回复
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
        checkRecording: [],
        priceLibrary: [],
        nodesPosition: {},
        field:'',
        rules:{
          yearId:{require:false,validator:yearAndPro,trigger:'change'},
          provinceId:{require:false,validator:yearAndPro,trigger:'change'}, projectName:{require:false,validator:changeBiteRep,trigger:'blur'},
          inPrice:{require:false,validator:price,trigger:'blur'},
          representativeSpec:{require:false,validator:changeBiteRep,trigger:'blur'},
          executionDate:{type:'date',require:false,validator:executionDate,trigger:'change'},
          representativePrice:{require:false,validator:representativePrice,trigger:'blur'},
          representativePackaging:{require:false,validator:changeBiteRep,trigger:'blur'},
          computationalMethod:{require:false,validator:(rule,value,callback)=>{
            if(rule.require){
              if(value){
                callback()
              }else{
                callback(new Error('请选择计算方法'))
              }
            }else{
              callback()
            }
          },trigger:'change'},
          calculatePrice:{require:false,validator:calculatePrice,trigger:'blur'},
          remark:{require:false,validator:changeBiteRep,trigger:'blur'},
          AUDITSTATE:{require:true,message:'请选择审核结果',trigger:'change'} ,
          AUDITREMARK:{require:false,validator:changeBiteRep,trigger:'change'}
        }
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
        },
          {
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
          },
          {
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
      },//变更后展示数据
      metaDataForm() {
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
          REPRESENTATIVESPEC: '',
          ID:''
        },
          {
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
            ID:''
          },
          {
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
            ID:''
          }]
      },//提交数据
      metaFlagForm() {
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
          REPRESENTATIVESPEC: '',
        },
          {
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
          },
          {
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
          }]
      },//用于审核/澄清页面弹层 区分是否有质疑、澄清数据
      metaControlForm() {
        return [{
          PROJECTNAME$: '',
          CALCULATEPRICE$: '',
          PROVINCE$: '',
          PRICETYPE$: '',
          REMARK$: '',
          REPRESENTATIVEPACKAGING$: '',
          PRICE$: '',
          YEAR$: '',
          METHOD$: '',
          REPRESENTATIVEPRICE$: '',
          EXECUTIONDATE$: '',
          REPRESENTATIVESPEC$: ''
        },
          {
            PROJECTNAME$: '',
            CALCULATEPRICE$: '',
            PROVINCE$: '',
            PRICETYPE$: '',
            REMARK$: '',
            REPRESENTATIVEPACKAGING$: '',
            PRICE$: '',
            YEAR$: '',
            METHOD$: '',
            REPRESENTATIVEPRICE$: '',
            EXECUTIONDATE$: '',
            REPRESENTATIVESPEC$: ''
          },
          {
            PROJECTNAME$: '',
            CALCULATEPRICE$: '',
            PROVINCE$: '',
            PRICETYPE$: '',
            REMARK$: '',
            REPRESENTATIVEPACKAGING$: '',
            PRICE$: '',
            YEAR$: '',
            METHOD$: '',
            REPRESENTATIVEPRICE$: '',
            EXECUTIONDATE$: '',
            REPRESENTATIVESPEC$: ''
          }]
      },
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
      async list(id,proId) {
        this.id = id;
        this.proId = proId;
        this.visible = true;
        let res = await queryPROVINCE()
        this.provinceList = res.data;
        await findShowPriceByProductId(proId).then(res => {
          console.log('展示的数据======', res)
          this.catalogAreaName = res.data[0].CATALOGAREANAME;
          this.catalogArea = res.data[0].CATALOGAREA;
//          if (res.data.provinceId) {
//            for (let x in this.provinceList) {
//              if (res.data.provinceId == this.provinceList[x].ID) {
//                res.data.provinceId = this.provinceList[x].NAME_CHN
//              }
//            }
//          }
          this.showForm = res.data;
        })
        await findById(id).then(res => {
          console.log('changeForm回显数据',res)
//          if (res.data.provinceId) {
//            for (let x in this.provinceList) {
//              if (res.data.provinceId == this.provinceList[x].ID) {
//                res.data.provinceId = this.provinceList[x].NAME_CHN
//              }
//            }
//          }
          this.changeCatalogAreaName = res.data[0].CATALOGAREANAME;
          this.changeCatalogArea = res.data[0].CATALOGAREA;
          this.changeForm = res.data;
        })
        //查询审核数据
        await queryChangeAuditData(id).then(res => {
//          this.dataForm = res.data
          this.dataForm = this.makeDataFrame(res.data,this.dataForm)
//          let key = JSON.parse(JSON.stringify(this.dataForm));
//          let data = {};
//          for (var i in key) {
//            if (this.dataForm[i] != '') {
//              data[i + "$"] = true;
//            } else {
//              data[i + "$"] = false;
//            }
//          }
          let data = [];
          this.dataForm.forEach((item,index)=>{
            data.push({});
            for(let i in item){
              if(item[i]){
                data[index][i+"$"]=true;
              }else{
                data[index][i+"$"]=false;
              }
            }
          })
          this.controlData = data;
//          this.changeForm.forEach((item,index)=>{
//            for(let i in item){
//              if(!this.controlData[index][i+'$']){
//                this.controlData[index][i+'$']=false;
//              }
//            }
//          })

          //初始 表单 验证是否require
//          for(let item in data){
//            let item_new = item.substr(0,item.length-1);
//            if(this.rules[item_new]){
//              this.rules[item_new]['require'] = data[item]
//            }
//          }
        })
        //查询质疑/澄清是否回复
        await queryChangeQuestionField(id).then(res => {
          console.log('flagForm!!!!',res.data);
          this.flagForm = this.makeDataFrame(res.data,this.flagForm)
//          this.flagForm = res.data
          this.changeForm.forEach((item,index)=>{
            for(let i in item){
              if(!this.changeForm[index][i]){
                this.changeForm[index][i]='';
              }
            }
          })
        })
        await queryCheckRecording(id,'4').then(res => {
          this.checkRecording = res.data
        })
        await queryPriceLibrary(proId,true).then(res => {
          this.priceLibrary = res.data
        })
        /**
         * 查询设置锚点位置
         * */
        this.removeClassCurrent('jump-pro-dec-audit')[0].classList.add('current');
        this.getNodesHeight('product-audit', 'audit-shxx');
      },
      initValidate(){
//        this.controlData = this.metaControlForm();
//        this.dataForm = this.metaDataForm();
//        for(let item in this.dataForm) {
//          if (this.rules[item]) {
//            this.rules[item]['require'] = false;
//          }
//        }
//        this.$refs['dataForm'].resetFields()
      },
      goBack() {
        this.initValidate();
        this.$nextTick(()=>{
          this.visible = false;
        })
      },
      fieldChange(count){
        this.flagForm.forEach((item,index)=>{
          if(item.ID == this.showForm.ID){
            this.$set(this.flagForm[index],this.field,count);
          }
        })
      },
      findQueryInfo(field,id) {
        this.field = field;
        this.$nextTick(() => {
          this.showForm.ID = id
          this.$refs.productQueryInfoByAudit.list(field,this.showForm,this.flagForm,null,true)
        })
      },
      updateInput(filed,index) {
//        this.$set(this.dataForm, filed, "");
//        this.dataForm[filed] = '';
//        delete this.dataForm[filed]
//        let errorNode,errorParentNode,errorNodeList;
//        errorParentNode = this.$refs[filed].$el.childNodes[1];
//        errorNodeList = errorParentNode.childNodes;
//        errorNodeList.forEach(item =>{
//          if(item.className == 'el-form-item__error'){
//            errorNode = item
//          }
//        })
//
//        if(this.controlData[filed+'$']){
//          this.rules[filed].require = true;
//          if(errorNode){
//            errorNode.style.display = 'block'
//          }
//        }else{
//          this.rules[filed].require = false;
//          if(errorNode){
//            errorNode.style.display = 'none'
//          }
//        }
//        delete this.dataForm[filed]

        if(this.changeCatalogArea == '2' || this.changeCatalogArea == '3') {
          if(filed == 'DISCOUNTPRICE'){
            this.dataForm.forEach(item =>{
              delete item.DISCOUNTPRICE
            })
          }
        }
        this.dataForm.forEach((item,itemIndex) =>{
          if(itemIndex == index ){
            delete item[filed]
          }
        })
      },
      submitUseIf(res){
        //如果请求不成功则打开按钮限制
        if (!res.success) {
          this.submitFlag = false;
          this.$message.error("提交失败")
        } else {
          this.$message({
            message: "提交成功",
            type: 'success',
            onClose: function () {
              window.location.reload()
            }
          })
        }

      },
      submit() {
        this.submitFlag = true;
        let validResult;
//        this.$refs.dataForm.validate((valid)=>{
//          if(valid){
//            validResult = true;
//          }else{
//            validResult = false;
//            this.submitFlag = false;
//          }
//        });
//
//        this.$refs.dataForm2.validate((valid)=>{
//          if(valid){
//            validResult = true;
//          }else{
//            validResult = false;
//            this.submitFlag = false;
//          }
//        });

//        let check = checkControl(this.dataForm, this.controlData);
//        if (!check) {
//          this.message('请填写所有不正确项')
//          this.submitFlag = false;
//          return;
//        }
        console.log(this.flagForm)
       let check = checkPriceData(this.flagForm);
        if (!check) {
          this.message('请先回复完再提交审核数据')
          this.submitFlag = false;
          return;
        }

        check = checkPriceControl(this.dataForm, this.controlData);
        if (!check) {
          this.message('请填写所有不正确项')
          this.submitFlag = false;
          return;
        }

        if(!this.auditstate){
          this.message('请先填写审核结果')
          this.submitFlag = false;
          return;
        }

        this.dataForm.forEach((item,index)=>{
          item.EXECUTIONDATE = item.EXECUTIONDATE?dateFormatter(item.EXECUTIONDATE).split(' ')[0]:'';
          for(let i in  item){
            if(!item[i]){
              delete item[i];
            }
          }
          if(this.dataForm[0].DISCOUNTPRICE){
            item.DISCOUNTPRICE = this.dataForm[0].DISCOUNTPRICE
          }
        })

//        if(!validResult){
//          this.$message({
//            message: '请填写所有不正确项',
//            type: 'warning'
//          });
//          this.submitFlag = false;
//          return;
//        }
        console.log('我到最后了',this.dataForm)
        let checkMark = this.auditremark;
        let checkResult = this.auditstate;
        upAudit(this.id, '4', checkMark, checkResult, '', this.dataForm).then(res => {
          this.submitUseIf(res)
        })
      },
      message(text) {
        this.$message({
          message: text,
          type: 'warning'
        });
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
            if (viewNodeChildeNodes[i].className == 'qgjgk') {
              this.nodesPosition.qgjgk = viewNodeChildeNodes[i].offsetTop
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
        if (vieNodeScrollTop < this.nodesPosition.cpjc || vieNodeScrollTop < this.nodesPosition.jgxx) {
          this.removeClassCurrent(jumpNodeName)[0].classList.add('current');
        }
        else if (vieNodeScrollTop > this.nodesPosition.jgxx && vieNodeScrollTop < this.nodesPosition.qgjgk) {
          this.removeClassCurrent(jumpNodeName)[1].classList.add('current');
        }
        else if (vieNodeScrollTop > this.nodesPosition.qgjgk && vieNodeScrollTop < this.nodesPosition.shxx) {
          this.removeClassCurrent(jumpNodeName)[2].classList.add('current');
        }
        else if (vieNodeScrollTop > this.nodesPosition.shxx) {
          this.removeClassCurrent(jumpNodeName)[3].classList.add('current');
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
        let vieNode = document.getElementById('product-audit-view-box');
        if (vieNode) {
          if (newVal == false) {
            vieNode.onscroll = null;
            this.removeFixed('product-audit-side')
          }
          else {
            vieNode.onscroll = function () {
              this.dialogBoxScroll(vieNode, 'jump-pro-dec-audit', 'product-audit-side')
            }.bind(this)
          }
        }
      }
    },
    mounted() {
      let vieNode = document.getElementById('product-audit-view-box');
      if (vieNode) {
        vieNode.onscroll = function () {
          this.dialogBoxScroll(vieNode, 'jump-pro-dec-audit', 'product-audit-side')
        }.bind(this)
      }
    }
  }
</script>
<style>
  @import "../../../../assets/css/auditchanges.css";
</style>
