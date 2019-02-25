<template>
  <el-dialog
    custom-class="w80"
    title="价格变更公示"
    :close-on-click-modal="false"
    :visible.sync="visible"
    append-to-body
    @before-close="initValidate"
    class="audit-dialog"
    id="product-change-view-box"
  >
    <div v-if="visible">
      <div class="main audit-main">
        <ul class="side side-init" id="product-change-side">
          <li v-for="(nodeItem,index) in nodesPosition" :key="index"><a @click="changeScrollHeight(nodeItem.nodePosition,'product-change-view-box','jump-change',index)"
                 class="d_jump jump-change">{{nodeItem.itemName}}</a></li>
        </ul>
        <div class="right-box">
          <div class="tableset audit-info">
            <el-form ref="dataForm" id="product-change-view" label-width="150px" size="small" label-position="left">
              <h3 class="cpjc">产品基础信息</h3>
              <price-basics :projectProductId="this.productId" :changeFlag="this.changeFlag"></price-basics>
              <!--——————————————————————————————————————————————————————-->
              <h3 class="jgxx">价格信息</h3>
              <el-row  class="audit-item-box">
                <el-col :span="24">
                  <el-form-item label="目录范围">
                    <span>{{catalogAreaName}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <div v-if="catalogArea == '0' || catalogArea == '1'">
              <el-row>
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
              <el-row v-if="showForm[0].PRICETYPE != '2'">
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
              <el-row>
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
              <el-row>
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
              <el-row v-if="showForm[0].PRICETYPE=='1'">
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
              <el-row v-if="showForm[0].PRICETYPE=='1'">
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
                    <el-form-item class="audit-form-item orange" label="价格类型：">
                      <span class="orange">京津冀三地报价</span>
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
                <el-row>
                  <el-col :span="24">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item orange" label="价格类型">
                          <span class="orange">{{{"0": "全国最低中标价", "1": "计算价格", "2": "无最低中标价","3":"京津冀三地价格"}[changeForm[0].PRICETYPE]}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row v-if="changeForm[0].PRICETYPE != '2'">
                  <el-col :span="12">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="年度">
                          <span class="orange" v-if="changeForm[0].YEAR">{{changeForm[0].YEAR}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item"  prop="yearId" ref="yearId">
                        <span slot="label" class="audit-check-box">
                    <el-checkbox class="orange" v-if="changeForm[0].YEAR" v-model="controlData[0].YEAR$" label="质疑"
                                 @change="updateInput('YEAR',0)"></el-checkbox>
                    <upload-button
                      class="preview-btn"
                      v-if="controlData[0].YEAR$"
                      buttonFlag="YEAR0"
                      :fileListFlag='fileForm[0]["YEAR"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                    </upload-button>
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
                          <images-preview
                            v-if="controlData[0].YEAR$"
                            refName="YEAR0"
                            ref="imagesPreview"
                            :imgIdListUnUnique="fileForm[0]['YEAR']"
                            @imgIdListChange="uploadList">
                          </images-preview>
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
                        <el-form-item class="audit-form-item"  prop="provinceId" ref="provinceId">
                        <span slot="label" class="audit-check-box">
                    <el-checkbox class="orange" v-if="changeForm[0].PROVINCE" v-model="controlData[0].PROVINCE$"
                                 label="质疑" @change="updateInput('PROVINCE',0)"></el-checkbox>
                    <upload-button
                      class="preview-btn"
                      v-if="controlData[0].PROVINCE$"
                      buttonFlag="PROVINCE0"
                      :fileListFlag='fileForm[0]["PROVINCE"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                    </upload-button>
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
                          <images-preview
                            v-if="controlData[0].PROVINCE$"
                            refName="PROVINCE0"
                            ref="imagesPreview"
                            :imgIdListUnUnique="fileForm[0]['PROVINCE']"
                            @imgIdListChange="uploadList">
                          </images-preview>
                        </el-form-item>

                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" v-if="changeForm[0].PRICETYPE !='2'">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="项目名称">
                          <span class="orange" v-if="changeForm[0].PROJECTNAME">{{changeForm[0].PROJECTNAME}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item"  prop="projectName" data-max="200" ref="projectName">
                        <span slot="label" class="audit-check-box">
                    <el-checkbox class="orange" v-if="changeForm[0].PROJECTNAME" v-model="controlData[0].PROJECTNAME$"
                                 label="质疑" @change="updateInput('PROJECTNAME',0)"></el-checkbox>
                    <upload-button
                      class="preview-btn"
                      v-if="controlData[0].PROJECTNAME$"
                      buttonFlag="PROJECTNAME0"
                      :fileListFlag='fileForm[0]["PROJECTNAME"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                    </upload-button>
                  </span>
                          <el-input class="audit-detail-input" v-if="controlData[0].PROJECTNAME$"
                                    v-model="dataForm[0].PROJECTNAME"></el-input>
                          <images-preview
                            v-if="controlData[0].PROJECTNAME$"
                            refName="PROJECTNAME0"
                            ref="imagesPreview"
                            :imgIdListUnUnique="fileForm[0]['PROJECTNAME']"
                            @imgIdListChange="uploadList">
                          </images-preview>
                        </el-form-item>

                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12" v-if="changeForm[0].PRICETYPE =='0'">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="中标价">
                          <span class="orange" v-if="changeForm[0].PRICE">{{changeForm[0].PRICE}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item"  ref="inPrice" prop="inPrice">
                        <span slot="label" class="audit-check-box">
                    <el-checkbox class="orange" v-if="changeForm[0].PRICE" v-model="controlData[0].PRICE$" label="质疑"
                                 @change="updateInput('PRICE',0)"></el-checkbox>
                    <upload-button
                      class="preview-btn"
                      v-if="controlData[0].PRICE$"
                      buttonFlag="PRICE0"
                      :fileListFlag='fileForm[0]["PRICE"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                    </upload-button>
                  </span>
                          <el-input class="audit-detail-input" v-if="controlData[0].PRICE$"
                                    v-model="dataForm[0].PRICE"></el-input>
                          <images-preview
                            v-if="controlData[0].PRICE$"
                            refName="PRICE0"
                            ref="imagesPreview"
                            :imgIdListUnUnique="fileForm[0]['PRICE']"
                            @imgIdListChange="uploadList">
                          </images-preview>
                        </el-form-item>

                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12" v-if="changeForm[0].PRICETYPE =='1'">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="代表品装量规格">
                          <span class="orange"
                                v-if="changeForm[0].REPRESENTATIVESPEC">{{changeForm[0].REPRESENTATIVESPEC}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item"  prop="representativeSpec" ref="representativeSpec" data-max="100">
                        <span slot="label" class="audit-check-box">
                    <el-checkbox class="orange" v-if="changeForm[0].REPRESENTATIVESPEC"
                                 v-model="controlData[0].REPRESENTATIVESPEC$" label="质疑"
                                 @change="updateInput('REPRESENTATIVESPEC',0)"></el-checkbox>
                    <upload-button
                      class="preview-btn"
                      v-if="controlData[0].REPRESENTATIVESPEC$"
                      buttonFlag="REPRESENTATIVESPEC0"
                      :fileListFlag='fileForm[0]["REPRESENTATIVESPEC"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                    </upload-button>
                  </span>
                          <el-input class="audit-detail-input" v-if="controlData[0].REPRESENTATIVESPEC$"
                                    v-model="dataForm[0].REPRESENTATIVESPEC"></el-input>
                          <images-preview
                            v-if="controlData[0].REPRESENTATIVESPEC$"
                            refName="REPRESENTATIVESPEC0"
                            ref="imagesPreview"
                            :imgIdListUnUnique="fileForm[0]['REPRESENTATIVESPEC']"
                            @imgIdListChange="uploadList">
                          </images-preview>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" v-if="changeForm[0].PRICETYPE == '0'">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="执行日期">
                          <span class="orange"
                                v-if="changeForm[0].EXECUTIONDATE">{{changeForm[0].EXECUTIONDATE}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item class="audit-form-item"  prop="executionDate" ref="executionDate">
                        <span slot="label" class="audit-check-box">
                    <el-checkbox class="orange" v-if="changeForm[0].EXECUTIONDATE" v-model="controlData[0].EXECUTIONDATE$"
                                 label="质疑" @change="updateInput('EXECUTIONDATE',0)"></el-checkbox>
                    <upload-button
                      class="preview-btn"
                      v-if="controlData[0].EXECUTIONDATE$"
                      buttonFlag="EXECUTIONDATE0"
                      :fileListFlag='fileForm[0]["EXECUTIONDATE"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                    </upload-button>
                  </span>
                          <el-date-picker type="date" v-if="controlData[0].EXECUTIONDATE$"
                                          v-model="dataForm[0].EXECUTIONDATE"></el-date-picker>
                          <images-preview
                            v-if="controlData[0].EXECUTIONDATE$"
                            refName="EXECUTIONDATE0"
                            ref="imagesPreview"
                            :imgIdListUnUnique="fileForm[0]['EXECUTIONDATE']"
                            @imgIdListChange="uploadList">
                          </images-preview>
                        </el-form-item>

                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12" v-if="changeForm[0].PRICETYPE == '1'">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="代表品价格">
                          <span class="orange"
                                v-if="changeForm[0].REPRESENTATIVEPRICE">{{changeForm[0].REPRESENTATIVEPRICE}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item"  prop="representativePrice" ref="representativePrice">
                        <span slot="label" class="audit-check-box">
                    <el-checkbox class="orange" v-if="changeForm[0].REPRESENTATIVEPRICE"
                                 v-model="controlData[0].REPRESENTATIVEPRICE$" label="质疑"
                                 @change="updateInput('REPRESENTATIVEPRICE',0)"></el-checkbox>
                    <upload-button
                      class="preview-btn"
                      v-if="controlData[0].REPRESENTATIVEPRICE$"
                      buttonFlag="REPRESENTATIVEPRICE0"
                      :fileListFlag='fileForm[0]["REPRESENTATIVEPRICE"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                    </upload-button>
                  </span>
                          <el-input class="audit-detail-input" v-if="controlData[0].REPRESENTATIVEPRICE$"
                                    v-model="dataForm[0].REPRESENTATIVEPRICE"></el-input>
                          <images-preview
                            v-if="controlData[0].REPRESENTATIVEPRICE$"
                            refName="REPRESENTATIVEPRICE0"
                            ref="imagesPreview"
                            :imgIdListUnUnique="fileForm[0]['REPRESENTATIVEPRICE']"
                            @imgIdListChange="uploadList">
                          </images-preview>
                        </el-form-item>

                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12" v-if="changeForm[0].PRICETYPE == '1'">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="代表品装量包装">
                          <span class="orange"
                                v-if="changeForm[0].REPRESENTATIVEPACKAGING">{{changeForm[0].REPRESENTATIVEPACKAGING}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item"  prop="representativePackaging" ref="representativePackaging" data-max="100">
                         <span slot="label" class="audit-check-box">
                    <el-checkbox class="orange" v-if="changeForm[0].REPRESENTATIVEPACKAGING"
                                 v-model="controlData[0].REPRESENTATIVEPACKAGING$" label="质疑"
                                 @change="updateInput('REPRESENTATIVEPACKAGING',0)"></el-checkbox>
                    <upload-button
                      class="preview-btn"
                      v-if="controlData[0].REPRESENTATIVEPACKAGING$"
                      buttonFlag="REPRESENTATIVEPACKAGING0"
                      :fileListFlag='fileForm[0]["REPRESENTATIVEPACKAGING"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                    </upload-button>
                  </span>
                          <el-input class="audit-detail-input" v-if="controlData[0].REPRESENTATIVEPACKAGING$"
                                    v-model="dataForm[0].REPRESENTATIVEPACKAGING"></el-input>
                          <images-preview
                            v-if="controlData[0].REPRESENTATIVEPACKAGING$"
                            refName="REPRESENTATIVEPACKAGING0"
                            ref="imagesPreview"
                            :imgIdListUnUnique="fileForm[0]['REPRESENTATIVEPACKAGING']"
                            @imgIdListChange="uploadList">
                          </images-preview>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row v-if="changeForm[0].PRICETYPE=='1'">
                  <el-col :span="12">
                    <el-row>
                      <el-col :span="12">
                        <el-row>
                          <el-col :span="24">
                            <el-form-item class="audit-form-item" label="计算方法">
                              <span class="orange"
                                    v-if="changeForm[0].METHOD">{{changeForm[0].METHOD}}</span>
                            </el-form-item>
                          </el-col>
                          <el-col :span="24">
                            <el-form-item class="audit-form-item"  prop="computationalMethod" ref="computationalMethod">
                            <span slot="label" class="audit-check-box">
                        <el-checkbox class="orange" v-if="changeForm[0].METHOD"
                                     v-model="controlData[0].METHOD$" label="质疑"
                                     @change="updateInput('METHOD',0)"></el-checkbox>
                        <upload-button
                          class="preview-btn"
                          v-if="controlData[0].METHOD$"
                          buttonFlag="METHOD0"
                          :fileListFlag='fileForm[0]["METHOD"]'
                          :fileType="fileType"
                          @uploadList="getUploadList">
                        </upload-button>
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
                              <images-preview
                                v-if="controlData[0].METHOD$"
                                refName="METHOD0"
                                ref="imagesPreview"
                                :imgIdListUnUnique="fileForm[0]['METHOD']"
                                @imgIdListChange="uploadList">
                              </images-preview>
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
                          <span class="orange"
                                v-if="changeForm[0].CALCULATEPRICE">{{changeForm[0].CALCULATEPRICE}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item"  prop="calculatePrice" ref="calculatePrice">
                        <span slot="label" class="audit-check-box">
                    <el-checkbox class="orange" v-if="changeForm[0].CALCULATEPRICE" v-model="controlData[0].CALCULATEPRICE$"
                                 label="质疑" @change="updateInput('CALCULATEPRICE',0)"></el-checkbox>
                    <upload-button
                      class="preview-btn"
                      v-if="controlData[0].CALCULATEPRICE$"
                      buttonFlag="CALCULATEPRICE0"
                      :fileListFlag='fileForm[0]["CALCULATEPRICE"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                    </upload-button>
                  </span>
                          <el-input class="audit-detail-input" v-if="controlData[0].CALCULATEPRICE$"
                                    v-model="dataForm[0].CALCULATEPRICE"></el-input>
                          <images-preview
                            v-if="controlData[0].CALCULATEPRICE$"
                            refName="CALCULATEPRICE0"
                            ref="imagesPreview"
                            :imgIdListUnUnique="fileForm[0]['CALCULATEPRICE']"
                            @imgIdListChange="uploadList">
                          </images-preview>
                        </el-form-item>

                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row v-if="changeForm[0].PRICETYPE=='1'">
                  <el-col :span="24">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item" label="备注">
                          <span class="orange" v-if="changeForm[0].REMARK">{{changeForm[0].REMARK}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item"  prop="remark" ref="remark" data-max="2000">
                        <span slot="label" class="audit-check-box">
                    <el-checkbox class="orange" v-if="changeForm[0].REMARK" v-model="controlData[0].REMARK$" label="质疑"
                                 @change="updateInput('REMARK',0)"></el-checkbox>
                    <upload-button
                      class="preview-btn"
                      v-if="controlData[0].REMARK$"
                      buttonFlag="REMARK0"
                      :fileListFlag='fileForm[0]["REMARK"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                    </upload-button>
                  </span>
                          <el-input class="audit-detail-input" v-if="controlData[0].REMARK$"
                                    v-model="dataForm[0].REMARK"></el-input>
                          <images-preview
                            v-if="controlData[0].REMARK$"
                            refName="REMARK0"
                            ref="imagesPreview"
                            :imgIdListUnUnique="fileForm[0]['REMARK']"
                            @imgIdListChange="uploadList">
                          </images-preview>
                        </el-form-item>

                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <span>
            <h3>项目名称应包括项目年度和省份名称，请按照各省公布的标准项目录名称录入。   最低价请如实、谨慎填写，注意不同规格包装间的合理比价关系！</h3>
          </span>
              </div>
              <div  v-if="changeCatalogArea == '2' || changeCatalogArea == '3'">
                <el-row>
                  <el-col :span="24">
                    <el-form-item class="audit-form-item" label="日服用折算价格:">
                      <span class="orange">{{changeForm[0].DISCOUNTPRICE}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item class="audit-form-item">
                        <span slot="label" class="audit-check-box">
                    <el-checkbox class="orange" v-if="changeForm[0].DISCOUNTPRICE"
                                 v-model="controlData[0].DISCOUNTPRICE$" label="质疑"
                                 @change="updateInput('DISCOUNTPRICE',0)"></el-checkbox>
                    <upload-button
                      class="preview-btn"
                      v-if="controlData[0].DISCOUNTPRICE$"
                      buttonFlag="DISCOUNTPRICE0"
                      :fileListFlag='fileForm[0]["DISCOUNTPRICE"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                    </upload-button>
                  </span>
                      <el-input class="audit-detail-input" v-if="controlData[0].DISCOUNTPRICE$"
                                v-model="dataForm[0].DISCOUNTPRICE"></el-input>
                      <images-preview
                        v-if="controlData[0].DISCOUNTPRICE$"
                        refName="DISCOUNTPRICE0"
                        ref="imagesPreview"
                        :imgIdListUnUnique="fileForm[0]['DISCOUNTPRICE']"
                        @imgIdListChange="uploadList">
                      </images-preview>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                <el-col class="marbottom15" :span="12" >
                  <el-form-item class="audit-form-item orange" label="价格类型：">
                    <span class="orange">京津冀三地报价</span>
                  </el-form-item>
                </el-col>
              </el-row>
                <el-row :gutter="2" v-for="(item,index) in changeForm" :key="index">
                  <el-col :span="5">
                    <el-form-item class="acc-price-label orange" label="省份：">
                      <span class="orange">{{item.PROVINCENAME}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="acc-price-label" label="项目名称:">
                          <span class="orange">{{changeForm[index].PROJECTNAME}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item">
                        <span slot="label" class="audit-check-box acc-price-label">
                    <el-checkbox
                      class="orange"
                      v-if="changeForm[index].PROJECTNAME"
                      v-model="controlData[index].PROJECTNAME$"
                      label="质疑"
                      @change="updateInput('PROJECTNAME',index)"></el-checkbox>
                    <upload-button
                      class="preview-btn"
                      v-if="controlData[index].PROJECTNAME$"
                      :buttonFlag="'PROJECTNAME'+index" :fileListFlag='fileForm[index]["PROJECTNAME"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                    </upload-button>
                  </span>
                          <el-input class="audit-detail-input" v-if="controlData[index].PROJECTNAME$"
                                    v-model="dataForm[index].PROJECTNAME"></el-input>
                          <images-preview
                            v-if="controlData[index].PROJECTNAME$"
                            :refName="'PROJECTNAME'+index"
                            ref="imagesPreview"
                            :imgIdListUnUnique="fileForm[index]['PROJECTNAME']"
                            @imgIdListChange="uploadList">
                          </images-preview>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="6">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="acc-price-label orange" label="中标价:">
                          <span class="orange">{{changeForm[index].PRICE}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item">
                        <span slot="label" class="audit-check-box acc-price-label">
                    <el-checkbox class="orange"
                                 v-if="changeForm[index].PRICE"
                                 v-model="controlData[index].PRICE$" label="质疑"
                                 @change="updateInput('PRICE',index)"></el-checkbox>
                    <upload-button
                      class="preview-btn"
                      v-if="controlData[index].PRICE$"
                      :buttonFlag="'PRICE'+index" :fileListFlag='fileForm[index]["PRICE"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                    </upload-button>
                  </span>
                          <el-input class="audit-detail-input" v-if="controlData[index].PRICE$"
                                    v-model="dataForm[index].PRICE"></el-input>
                          <images-preview
                            v-if="controlData[index].PRICE$" :refName="'PRICE'+index"
                            ref="imagesPreview"
                            :imgIdListUnUnique="fileForm[index]['PRICE']"
                            @imgIdListChange="uploadList">
                          </images-preview>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="6">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item class="acc-price-label" label="执行日期:">
                          <span class="orange">{{changeForm[index].EXECUTIONDATE}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item class="audit-form-item">
                        <span slot="label" class="audit-check-box acc-price-label">
                    <el-checkbox class="orange"
                                 v-if="changeForm[index].EXECUTIONDATE"
                                 v-model="controlData[index].EXECUTIONDATE$" label="质疑"
                                 @change="updateInput('EXECUTIONDATE',index)"></el-checkbox>
                    <upload-button
                      class="preview-btn"
                      v-if="controlData[index].EXECUTIONDATE$"
                      :buttonFlag="'EXECUTIONDATE'+index" :fileListFlag='fileForm[index]["EXECUTIONDATE"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                    </upload-button>
                  </span>
                          <el-date-picker class="audit-detail-input" v-if="controlData[index].EXECUTIONDATE$"
                                    v-model="dataForm[index].EXECUTIONDATE"></el-date-picker>
                          <images-preview
                            v-if="controlData[index].EXECUTIONDATE$" :refName="'EXECUTIONDATE'+index"
                            ref="imagesPreview"
                            :imgIdListUnUnique="fileForm[index]['EXECUTIONDATE']"
                            @imgIdListChange="uploadList">
                          </images-preview>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
              <!--——————————————————————————————————————————————————————-->

            </el-form>
          </div>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" :disabled="submitFlag" size="small" @click="submit">提交</el-button>
       <el-button size="small" @click="goBack">关闭</el-button>
      </span>
  </el-dialog>
</template>

<script>
  import priceBasics from 'src/pages/auditchanges/common/priceDetailCommon/priceBasics'
  import imagesPreview from 'src/pages/auditchanges/common/imagesPreview'
  import uploadButton from 'src/pages/auditchanges/common/uploadButton'
  import {queryPROVINCE} from 'src/axios/auditchanges/messageDeclare/product'
  import {selectControl, returnYearList} from 'src/axios/auditchanges/common/catProduct'
  import {
    findShowPriceByProductId,
    changeAdd
  } from 'src/axios/auditchanges/messagePublicity/price'
  import {checkPriceControl,checkPriceData,selectPriceControl} from 'src/axios/auditchanges/common/nestedJson'
  import {
    deleteQuestion,
    selectFieldById,
    findQuestionFileById
  } from 'src/axios/auditchanges/messagePublicity/productPublicity'
  import {findById} from 'src/axios/auditchanges/messageChanges/price'
  import {boxScroll} from 'src/components/mixins/scrolls'
  import {changeToBite,isNumber} from 'src/utils/validateUtil'
  import {dateFormatter} from 'src/utils/index'

  export default {
    name: "price-publicity-doubt",
    mixins:[boxScroll],
    components: {
      priceBasics,
      imagesPreview,
      uploadButton
    },
    data(){
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
        catalogAreaName:'',
        catalogArea:'',
        changeCatalogAreaName:'',
        changeCatalogArea:'',
        auditstate:'',
        auditremark:'',
        requestCode:'',
        fileType: '3',//上传文件类型 3 质疑
        visible: false,
        id: '', //申报/变更过程ID 用于查产品基础数据
        productId:'',
        changeFlag: true,//变更标识
        showForm: this.metaShowForm(),//变更前数据展示
        dataForm: this.metaDataForm(),//提交数据
        changeForm: this.metaChangeForm(),//变更后数据
        fileForm: this.metaFileForm(),//文件对象
        controlData: this.metaControlForm(),//多选按钮
        submitFlag: false,//提交按钮是否可用
        yearList: [],//年份
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
          remark:{require:false,validator:changeBiteRep,trigger:'blur'}
        }
      }
    },
    created(){
      this.yearList = returnYearList();
    },
    methods: {
      metaShowForm(){
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
          REPRESENTATIVESPEC: ''
        }]
      },
      metaChangeForm(){
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
      },//变更后数据
      metaDataForm(){
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
        }
        ]
      },
      metaFileForm(){
        return [{
          PROJECTNAME: [],
          CALCULATEPRICE: [],
          PROVINCEID: [],
          PRICETYPE: [],
          REMARK: [],
          REPRESENTATIVEPACKAGING: [],
          INPRICE: [],
          YEARID: [],
          COMPUTATIONALMETHOD: [],
          REPRESENTATIVEPRICE: [],
          EXECUTIONDATE: [],
          REPRESENTATIVESPEC: []
        },
          {
            PROJECTNAME: [],
            CALCULATEPRICE: [],
            PROVINCEID: [],
            PRICETYPE: [],
            REMARK: [],
            REPRESENTATIVEPACKAGING: [],
            INPRICE: [],
            YEARID: [],
            COMPUTATIONALMETHOD: [],
            REPRESENTATIVEPRICE: [],
            EXECUTIONDATE: [],
            REPRESENTATIVESPEC: []
          },
          {
            PROJECTNAME: [],
            CALCULATEPRICE: [],
            PROVINCEID: [],
            PRICETYPE: [],
            REMARK: [],
            REPRESENTATIVEPACKAGING: [],
            INPRICE: [],
            YEARID: [],
            COMPUTATIONALMETHOD: [],
            REPRESENTATIVEPRICE: [],
            EXECUTIONDATE: [],
            REPRESENTATIVESPEC: []
          }
        ]
      },//用于审核/质疑存放文件ID
      metaControlForm(){
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
          REPRESENTATIVESPEC$: '',
          DISCOUNTPRICE$:''
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
            REPRESENTATIVESPEC$: '',
            DISCOUNTPRICE$:''
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
            REPRESENTATIVESPEC$: '',
            DISCOUNTPRICE$:''

          }
        ]
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

      async list(id,productId){
        this.productId= productId;
        this.id = id;//价格变更ID
        this.visible = true;
        let res = await queryPROVINCE()
        this.provinceList = res.data;
        //查询变更信息
        await findById(id).then(res => {
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
          this.dataForm = this.makeDataFrame(res.data,this.dataForm);
          console.log("提交数据初始化：",this.dataForm)
        })
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
        })
        //回显质疑信息
//        await selectFieldById(id).then(res => {
//          this.dataForm = res.data;
//          let key = JSON.parse(JSON.stringify(this.dataForm));
//          let data = {};
//          for (var i in key) {
//            if (this.dataForm[i] != '') {
//              data[i + "$"] = true;
//            } else {
//              data[i + "$"] = false;
//            }
//          }
//          this.controlData = data
//          //初始 表单 验证是否require
//          for(let item in data){
//            let item_new = item.substr(0,item.length-1);
//            if(this.rules[item_new]){
//              this.rules[item_new]['require'] = data[item]
//            }
//          }

//        })
//        //回显质疑文件
//        await findQuestionFileById(id).then(res => {
//          if (res.data != undefined) {
//            this.fileForm = res.data
//          } else {
//            this.fileForm = this.metaFileForm()
//          }
//        });
        /**
         * 查询设置锚点位置
         * */
        this.removeClassCurrent('jump-change')[0].classList.add('current');
        this.getNodesHeight('product-change-view');
      },
      initValidate(){
//        this.controlData = this.metaControlForm()
//          this.dataForm = this.metaDataForm();
//        for(let item in this.dataForm) {
//          if (this.rules[item]) {
//            this.rules[item]['require'] = false;
//          }
//        }
//        this.$refs['dataForm'].resetFields()
      },
      goBack(){
        this.initValidate();
        this.$nextTick(()=>{
          this.visible = false;
        })
      },
      getUploadList(res){
        res.data.forEach(function (item) {
          this.fileForm[res.refName.substr(res.refName.length-1,res.refName.length)][res.refName.substr(0,res.refName.length-1)].push(item)
        }.bind(this))
      },
      uploadList(res) {
        console.log('uploadList', res)
        this.$set(this.fileForm[res.refName.substr(res.refName.length-1,res.refName.length)], res.refName.substr(0,res.refName.length-1), res.data);
      },
      updateInput(filed,index){
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
            this.dataForm.forEach((item,index) =>{
              delete item.DISCOUNTPRICE
              this.$set(this.fileForm[index],filed, [])
            })
          }
        }
        this.dataForm.forEach((item,itemIndex) =>{
          if(itemIndex == index ){
            delete item[filed]
          }
        })
        this.$set(this.fileForm[index], filed, [])
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
      submit () {
//        this.submitFlag = true;
        let validResult;
//        this.$refs.dataForm.validate((valid)=>{
//          if(valid){
//            validResult = true;
//          }else{
//            validResult = false;
//            this.submitFlag = false;
//          }
//        });
        let check;
        check = selectPriceControl(this.controlData);
        if (check) {
          this.$message({
            message: '请选择质疑项',
            type: 'warning'
          });
          this.submitFlag = false;
          return;
        }


        check = checkPriceControl(this.dataForm, this.controlData);
        if (!check) {
          this.$message({
            message: '请填写所有质疑项',
            type: 'warning'
          });
          this.submitFlag = false;
          return;
        }

        console.log('!!!!!!!!',this.dataForm)
        this.dataForm.forEach((item, index) => {
          item.EXECUTIONDATE = item.EXECUTIONDATE ? dateFormatter(item.EXECUTIONDATE).split(' ')[0] : '';
          item['ID'] = this.changeForm[index]['ID']
          for (let i in  item) {
            if (!item[i]) {
              delete item[i];
            }
          }
          if (this.dataForm[0].DISCOUNTPRICE) {
            item.DISCOUNTPRICE = this.dataForm[0].DISCOUNTPRICE
          }
        });
//        if(!validResult){
//          this.$message({
//            message: '请正确填写所有质疑项',
//            type: 'warning'
//          });
//          this.submitFlag = false;
//          return;
//        }

        deleteQuestion(this.id)
        this.dataForm.forEach((item, index) => {
          let id = item.ID;
          delete item.ID
          changeAdd(item, id, this.fileForm[index])
          this.$message({
            message: "提交成功",
            type: 'success',
            onClose: function () {
              window.location.reload()
            }
          });
        })
      }
    },
    watch: {
      visible(newVal){
        let vieNode = document.getElementById('product-change-view-box');
        if (vieNode) {
          if (newVal == false) {
            vieNode.onscroll = null;
            this.removeFixed('product-change-side')
          }
          else {
            vieNode.onscroll = function () {
              this.dialogBoxScroll(vieNode, 'jump-change', 'product-change-side')
            }.bind(this)
          }
        }
      }
    },
    mounted(){
      let vieNode = document.getElementById('product-change-view-box');
      if (vieNode) {
        vieNode.onscroll = function () {
          this.dialogBoxScroll(vieNode, 'jump-pro-dec-audit', 'product-change-audit-side')
        }.bind(this)
      }
    }
  }
</script>
