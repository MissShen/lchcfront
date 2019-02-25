<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible"
    append-to-body
    title="产品信息申报"
    id="product-addup-box"
    class="audit-dialog"
  >
    <div v-if="visible">
      <div class="main audit-main">
        <ul class="side side-init" id="product-addup-view-side">
          <li v-for="(nodeItem,index) in nodesPosition" :key="index"><a
            @click="changeScrollHeight(nodeItem.nodePosition,'product-addup-box','jump-product-addup',index)"
            class="d_jump jump-product-addup">{{nodeItem.itemName}}</a></li>

        </ul>
        <div class="right-box">
          <div class="gap-40">
            <el-form :model="dataForm" id="product-addup" ref="dataForm" :rules="rules" label-width="160px" size="small"
                     label-position="left">
              <h3 class="cpjc">产品基础信息</h3>
              <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item label="产品名称" prop="PRODUCT" data-max="200"  ref="PRODUCT">
                    <span>{{dataForm.PRODUCT}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="剂型" data-max="200" ref="DOSAGE" prop="DOSAGE">
                    <span>{{dataForm.DOSAGE}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item label="规格" data-max="200" ref="SPEC" prop="SPEC">
                    <span>{{dataForm.SPEC}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="转换比" data-max="200" ref="STANDRATE" prop="STANDRATE">
                    <span>{{dataForm.STANDRATE}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item label="包材" data-max="200" ref="WRAP" prop="WRAP">
                    <span>{{dataForm.WRAP}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="生产企业" data-max="200" ref="MANUFACTURE" prop="MANUFACTURE">
                    <span>{{dataForm.MANUFACTURE}}</span>
                    <a v-if="factoryFlag" @click="selectOrg" class="blue">选择</a>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item label="单位"data-max="200"  ref="METRIC" prop="METRIC">
                    <span>{{dataForm.METRIC}}</span>
                    <a @click="selectMetric" class="blue">选择</a>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="商品名" data-max="200" ref="TRADE" prop="TRADE">
                    <el-input v-model="dataForm.TRADE"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--<el-row :gutter="24">-->
              <!--<el-col :span="12">-->
              <!--<el-form-item label="北京地标码" prop="STANDARDCODE">-->
              <!--<el-input v-model="dataForm.STANDARDCODE"></el-input>-->
              <!--</el-form-item>-->
              <!--</el-col>-->
              <!--</el-row>-->
              <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item label="产品来源" data-max="1" ref="SOURCE"  prop="SOURCE">
                    <el-radio-group v-model="dataForm.SOURCE">
                      <el-radio  label="0">国产</el-radio>
                      <el-radio  label="1">进口</el-radio>
                      <el-radio  label="2">进口分装</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <!--<el-col :span="12" v-if="dataForm.SOURCE == '2'">-->
                <!--<el-form-item label="分装企业">-->
                <!--<el-input></el-input>-->
                <!--</el-form-item>-->
                <!--</el-col>-->
              </el-row>
              <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item label="最小使用单位" data-max="50" ref="UNIT"  prop="UNIT">
                    <el-input v-model="dataForm.UNIT"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="批准文号" data-max="150"  ref="PERMITNUMBER" prop="PERMITNUMBER">
                        <el-input v-model="dataForm.PERMITNUMBER"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <span class="audit-check-box preview-btn">
                          <el-button size="small" @click="handleChooseFiles('1088')">上传图片</el-button>
                        </span>
                    </el-col>
                    <images-preview class="" refName="1088" ref="imagesPreview" :imgIdListUnUnique="fileList['1088']"
                                    @imgIdListChange="upLoadImgIdList"></images-preview>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="12">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="中包装数量" data-mustNum="true" data-max="50" ref="SWRAP" prop="SWRAP">
                        <el-input v-model="dataForm.SWRAP"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <span class="audit-check-box preview-btn">
                          <el-button size="small" @click="handleChooseFiles('1013')">上传图片</el-button>
                        </span>
                    </el-col>
                    <images-preview class="" refName="1013" ref="imagesPreview" :imgIdListUnUnique="fileList['1013']"
                                    @imgIdListChange="upLoadImgIdList"></images-preview>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="大包装数量" prop="BWRAP" data-mustNum="true" data-max="50" ref="BWRAP">
                        <el-input v-model="dataForm.BWRAP"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <span class="audit-check-box preview-btn">
                          <el-button size="small" @click="handleChooseFiles('1012')">上传图片</el-button>
                        </span>
                    </el-col>
                    <images-preview class="" refName="1012" ref="imagesPreview" :imgIdListUnUnique="fileList['1012']"
                                    @imgIdListChange="upLoadImgIdList"></images-preview>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="12">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="药品检验报告编号" prop="JYNUM" data-max="100" ref="JYNUM">
                        <el-input v-model="dataForm.JYNUM"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <span class="audit-check-box preview-btn">
                          <el-button size="small" @click="handleChooseFiles('1014')">上传图片</el-button>
                        </span>
                    </el-col>
                    <images-preview class="" refName="1014" ref="imagesPreview" :imgIdListUnUnique="fileList['1014']"
                                    @imgIdListChange="upLoadImgIdList"></images-preview>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="有效期至" prop="JYDATE" data-max="unlimited" ref="JYDATE">
                    <el-date-picker type="date" :disabled="dataForm.JYYJ=='1'"
                                    v-model="dataForm.JYDATE"></el-date-picker>
                    <el-checkbox @change="changeJYYJ" true-label="1" false-label="0" v-model="dataForm.JYYJ">永久有效</el-checkbox>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24" v-if="dataForm.SOURCE === '0' ">
                <el-col :span="12">
                  <el-form-item label="国产药品批件编号" prop="PRODUCTIONNUM" data-max="100" ref="PRODUCTIONNUM">
                    <el-input v-model="dataForm.PRODUCTIONNUM"></el-input>
                  </el-form-item>
                  <span class="audit-check-box preview-btn">
                          <el-button size="small" @click="handleChooseFiles('1016')">上传图片</el-button>
                        </span>
                  <images-preview class="" refName="1016" ref="imagesPreview" :imgIdListUnUnique="fileList['1016']"
                                  @imgIdListChange="upLoadImgIdList"></images-preview>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="有效期至" prop="PRODUCTIONDATE" data-max="unlimited" ref="PRODUCTIONDATE">
                    <el-date-picker type="date" v-model="dataForm.PRODUCTIONDATE"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24" v-if="dataForm.SOURCE == '1' || dataForm.SOURCE == '2'">
                <el-col :span="12">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="进口药品注册证编号" prop="JKNUM" data-max="100" ref="JKNUM">
                        <el-input v-model="dataForm.JKNUM"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <span class="audit-check-box preview-btn">
                          <el-button size="small" @click="handleChooseFiles('1015')">上传图片</el-button>
                        </span>
                    </el-col>
                    <images-preview class="" refName="1015" ref="imagesPreview" :imgIdListUnUnique="fileList['1015']"
                                    @imgIdListChange="upLoadImgIdList"></images-preview>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="有效期至" prop="JKDATE" data-max="unlimited" ref="JKDATE">
                    <el-date-picker type="date" v-model="dataForm.JKDATE"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="24">
                <el-col :span="12" v-if="dataForm.SOURCE == '0' || dataForm.SOURCE == '2'">
                  <el-form-item label="GMP证书编号" prop="GMP" data-max="unlimited" ref="GMP">
                    <el-select v-model="dataForm.GMP" @change="gmpFileChange()" placeholder="请选择" size="small"
                               class="w100">
                      <el-option v-for="item in gmpList"
                                 :key="item.ID"
                                 :label="item.CERTIFICATE_NUMBER"
                                 :value="item.ID"
                                 class="fundInput">
                      </el-option>
                    </el-select>
                    <images-preview
                      ref="imagesPreview"
                      :imgIdListUnUnique="dataForm.GMPFILE || []"
                      :operate="false"></images-preview>
                  </el-form-item>
                </el-col>
                <el-col :span="12" v-if="dataForm.SOURCE == '1'">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="代理授权书有效期至" prop="AGENCYORGDATE" data-max="unlimited" ref="AGENCYORGDATE">
                        <el-date-picker type="date" v-model="dataForm.AGENCYORGDATE"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <span class="audit-check-box preview-btn">
                          <el-button size="small" @click="handleChooseFiles('1006')">上传图片</el-button>
                        </span>
                    </el-col>
                    <images-preview class="" refName="1006" ref="imagesPreview" :imgIdListUnUnique="fileList['1006']"
                                    @imgIdListChange="upLoadImgIdList"></images-preview>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="是否专利保护" prop="PATENTFLAG">
                    <el-radio-group @change="patenFlagChange" v-model="dataForm.PATENTFLAG">
                      <el-radio label="1">是</el-radio>
                      <el-radio label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24" v-if="dataForm.PATENTFLAG == '1'">
                <el-col :span="12">
                  <el-form-item label="专利保护开始时间" prop="PATENTBEGINDATE">
                    <el-date-picker type="date" v-model="dataForm.PATENTBEGINDATE" :picker-options="startPickerOptions"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="专利保护结束时间" prop="PATENTENDDATE">
                    <el-date-picker type="date" v-model="dataForm.PATENTENDDATE" :picker-options="endPickerOptions"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="12">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="药品质量标准" prop="STANDRD" data-max="100" ref="STANDRD">
                        <el-input v-model="dataForm.STANDRD"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <span class="audit-check-box preview-btn">
                          <el-button size="small" @click="handleChooseFiles('1018')">上传图片</el-button>
                        </span>
                    </el-col>
                    <images-preview class="" refName="1018" ref="imagesPreview" :imgIdListUnUnique="fileList['1018']"
                                    @imgIdListChange="upLoadImgIdList"></images-preview>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="是否中药保护" prop="PROTECTIONFLAG" data-max="unlimited" ref="PROTECTIONFLAG">
                    <el-radio-group v-model="dataForm.PROTECTIONFLAG">
                      <el-radio  label="1">是</el-radio>
                      <el-radio  label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--<el-row :gutter="24">-->
                <!--<el-col :span="12">-->
                  <!--<el-form-item label="目录范围" prop="CATALOGAREA" data-max="unlimited" ref="CATALOGAREA">-->
                    <!--<el-select v-model="dataForm.CATALOGAREA" placeholder="请选择" size="small" class="w100">-->
                      <!--<el-option v-for="item in catalogAreaList"-->
                                 <!--:key="item.key"-->
                                 <!--:label="item.label"-->
                                 <!--:value="item.value"-->
                                 <!--class="fundInput">-->
                      <!--</el-option>-->
                    <!--</el-select>-->
                  <!--</el-form-item>-->
                <!--</el-col>-->
              <!--</el-row>-->
              <h3 class="sms">说明书信息</h3>
              <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item label="用法用量" prop="USEUNIT" data-max="4000" ref="USEUNIT">
                    <el-input type="textarea" :rows="3" v-model="dataForm.USEUNIT"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item label="每次使用量最小值" prop="USEMIN"  data-max="50" ref="USEMIN">
                    <el-input v-model="dataForm.USEMIN"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="每次使用量最大值" prop="USEMAX"   data-max="50" ref="USEMAX">
                    <el-input v-model="dataForm.USEMAX"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item label="每日次数最小值" prop="NUMMIN"  data-max="50" ref="NUMMIN">
                    <el-input v-model="dataForm.NUMMIN"></el-input>

                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="平均日用量" prop="AVENUM"  data-mustNum="true"  data-max="50" maxlength="50" ref="AVENUM">
                    <el-input v-model="dataForm.AVENUM"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item label="每次使用极量" prop="MAXIMUN"  data-max="20" ref="MAXIMUN">
                    <el-input v-model="dataForm.MAXIMUN"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="疗程" prop="TREATMENT" data-max="100" ref="TREATMENT">
                    <el-input v-model="dataForm.TREATMENT"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="24">
                  <el-form-item class="need-before" label="说明书">
                    <el-button size="small" @click="handleChooseFiles('1017')">上传图片</el-button>
                    <div v-if="specFlag" class="el-form-item__error">
                      请上传说明书文件
                    </div>
                  </el-form-item>
                </el-col>
                <images-preview
                  class="margin160"
                  refName="1017"
                  ref="imagesPreview"
                  :imgIdListUnUnique="fileList['1017']"
                  @imgIdListChange="upLoadImgIdList"></images-preview>
              </el-row>
              <h3 class="xmfj">项目附加信息</h3>
              <el-row :gutter="24">
                <el-col :span="24" v-for="(att, i) in annex" :key="i">
                  <el-row :gutter="24">
                    <el-col class="width-160">
                      <el-form-item :label="att.dicName"/>
                    </el-col>
                    <el-col :span="24">
                      <div v-for="(x, y) in att.options" :key="y">
                        <el-row :gutter="24">
                          <el-col :span="8">
                            <el-input v-if="x.type == 1" :placeholder="x.label" v-model="x.value" size="small"
                                      class="width-260"/>
                            <el-input v-if="x.type == 2" :placeholder="x.label" v-model="x.value" type="textarea"
                                      size="small" class="width-260"/>
                            <el-date-picker v-if="x.type == 3" :placeholder="x.label" v-model="x.value" type="date"
                                            size="small"/>
                            <el-select v-if="x.type == 4" :placeholder="x.label" v-model="x.value" size="small"
                                       class="width-260">
                              <el-option
                                v-for="item in x.options"
                                :key="item.id"
                                :label="item.text"
                                :value="item.value">
                              </el-option>
                            </el-select>
                            <el-checkbox-group
                              v-if="x.type == 5"
                              :placeholder="x.label"
                              @change="checkChange"
                              v-model="x.optionsVal">
                              <el-checkbox :data-val="option.value" v-for="(option,index) in x.options"
                                           :label="option.value" :key="index">
                                {{option.text}}
                              </el-checkbox>
                            </el-checkbox-group>
                            <el-radio-group v-if="x.type == 6" :placeholder="x.label" v-model="x.value">
                              <el-radio v-for="(option, index) in x.options" :label="option.value" :key="index">
                                {{option.text}}
                              </el-radio>
                            </el-radio-group>
                            <images-preview ref="imagesPreview" :refName="x.id"
                                            :imgIdListUnUnique="attachedFileList[x.id]"
                                            @imgIdListChange="upLoadImgIdList"></images-preview>
                          </el-col>
                          <el-col :span="6">
                            <span>{{x.label}}</span>
                          </el-col>
                          <el-col :span="5">
                            <el-button class="audit-item font-size12" type="text" :href="x.tipUrl" size="small">
                              {{x.tipText}}
                            </el-button>
                          </el-col>
                          <el-col :span="5">
                            <div class="grid-content bg-purple-light" v-if="x.imageFlag==1">
                              <el-button size="small" @click="handleChooseFiles(x.id)">选择文件</el-button>
                              <div><span class="audit-item font-size12">{{x.fileTypeName}}</span></div>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <h3 class="jgxx">产品价格信息</h3>
              <h5>项目名称应包括项目年度和省份名称，请按照各省公布的标准项目录名称录入。最低价请如实、谨慎填写，注意不同规格包装间的合理比价关系!</h5>
              <el-row :gutter="24">
                <el-col :span="24">
                  <el-form-item label="目录范围"  prop="CATALOGAREA" data-max="unlimited" ref="CATALOGAREA">
                    <el-select v-model="dataForm.CATALOGAREA" placeholder="请选择">
                      <el-option
                        v-for="item in catalogAreaList"
                        :key="item.key"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <div v-if="dataForm.CATALOGAREA == '0' || dataForm.CATALOGAREA == '1'">
                <el-row :gutter="24">
                  <el-col :span="24">
                    <el-form-item label="价格类型" class="audit-declare-radio" prop="PRICETYPE" data-max="unlimited" ref="PRICETYPE">
                      <el-radio-group v-model="dataForm.PRICETYPE">
                        <el-radio  label="0">全国最低中标价</el-radio>
                        <el-radio  label="1">计算价格</el-radio>
                        <el-radio  label="2">无最低中标价</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24" v-if="dataForm.PRICETYPE != '2'">
                  <el-col :span="12">
                    <el-form-item label="年度" prop="YEAR" data-max="unlimited" ref="YEAR">
                      <el-select v-model="dataForm.YEAR" placeholder="请选择" size="small" class="w100">
                        <el-option v-for="item in yearList"
                                   :key="item.key"
                                   :label="item.label"
                                   :value="item.value"
                                   class="fundInput">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="省份" prop="PROVINCE" data-max="unlimited" ref="PROVINCE">
                      <el-select v-model="dataForm.PROVINCE" placeholder="请选择" size="small" class="w100">
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
                <el-row :gutter="24">
                  <el-col :span="12" v-if="dataForm.PRICETYPE!='2'">
                    <el-form-item label="项目名称" prop="PROJECTNAME" data-max="200" ref="PROJECTNAME">
                      <el-input v-model="dataForm.PROJECTNAME"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" v-if="dataForm.PRICETYPE == '0'">
                    <el-form-item label="中标价" prop="PRICE">
                      <el-input v-model="dataForm.PRICE"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" v-if="dataForm.PRICETYPE == '1'">
                    <el-form-item label="代表品装量规格" prop="REPRESENTATIVESPEC" data-max="100" ref="REPRESENTATIVESPEC">
                      <el-input v-model="dataForm.REPRESENTATIVESPEC"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24" v-if="dataForm.PRICETYPE == '1'">
                  <el-col :span="12">
                    <el-form-item label="代表品价格" prop="REPRESENTATIVEPRICE"  data-mustNum="true" data-max="unlimited" ref="REPRESENTATIVEPRICE">
                      <el-input v-model="dataForm.REPRESENTATIVEPRICE"></el-input>
                    </el-form-item>
                    <!--<el-select v-model="dataForm.REPRESENTATIVEMETRIC" size="small" class="fundInput">-->
                    <!--<el-option v-for="item in metricList"-->
                    <!--:key="item.key"-->
                    <!--:label="item.label"-->
                    <!--:value="item.value"-->
                    <!--class="fundInput">-->
                    <!--</el-option>-->
                    <!--</el-select>-->
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="代表品装量包装" prop="REPRESENTATIVEPACKAGING" data-max="100" ref="REPRESENTATIVEPACKAGING">
                      <el-input v-model="dataForm.REPRESENTATIVEPACKAGING"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24" v-if="dataForm.PRICETYPE == '1'">
                  <el-col :span="12">
                    <el-form-item label="计算方法" prop="METHOD" data-max="100" ref="METHOD">
                      <el-select v-model="dataForm.METHOD" size="small" class="w100">
                        <el-option v-for="item in methodList"
                                   :key="item.key"
                                   :label="item.label"
                                   :value="item.value"
                                   class="fundInput">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <div class="lh32"><a class="blue" src="">查看取值方法</a></div>
                  </el-col>
                </el-row>
                <el-row :gutter="24" v-if="dataForm.PRICETYPE == '1'">
                  <el-col :span="12">
                    <el-form-item label="计算价格" prop="CALCULATEPRICE" data-mustNum="true" data-max="unlimited" ref="CALCULATEPRICE">
                      <el-input v-model="dataForm.CALCULATEPRICE"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24" v-if="dataForm.PRICETYPE == '1'">
                  <el-col :span="12">
                    <el-form-item label="备注" prop="REMARK" data-maxx="2000" ref="REMARK">
                      <el-input type="textarea" :rows="3" v-model="dataForm.REMARK"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="12" v-if="dataForm.PRICETYPE == '0'">
                    <el-form-item label="执行日期" prop="EXECUTIONDATE">
                      <el-date-picker type="date" v-model="dataForm.EXECUTIONDATE"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <div v-if="dataForm.CATALOGAREA == '2' || dataForm.CATALOGAREA == '3'">
                <el-row :gutter="24">
                  <el-col :span="9">
                    <el-form-item :class="{'is-error':accountFlag}"  label="日服用折算价格：
">
                      <el-input @blur="judgePrice"  v-model="dataForm.DISCOUNTPRICE"></el-input>
                      <div v-if="accountFlag" class="el-form-item__error">
                        {{accountTip}}
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col class="marbottom15" :span="12" >
                      <el-radio v-model="quoteAbove" label="1">京津冀三地报价</el-radio>
                  </el-col>
                </el-row>
                <el-row :gutter="24" v-for="(item,index) in threeProvincePrice" :key="index">
                <el-col :span="5">
                  <el-form-item class="acc-price-label" label="省份:">{{item.PROVINCENAME}}</el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item class="acc-price-label" label="项目名称：
">
                    <el-input v-model="item.PROJECTNAME"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item class="acc-price-label" label="中标价：
">
                    <el-input v-model="item.PRICE"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item class="acc-price-label" label="执行日期:">
                    <el-date-picker type="date" v-model="item.EXECUTIONDATE"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              </div>
              <div v-if="dataForm.CATALOGAREA == '4' || dataForm.CATALOGAREA == 5"></div>
            </el-form>
          </div>
        </div>
      </div>
      <select-metric ref="selectMetric" @selectMetric="getMetric"></select-metric>
      <select-org ref="selectOrg" @selectOrg="getOrg"></select-org>
      <choose-files ref="chooseFiles" v-if="dialogVisible" @handleSelectedFolder="selectedData"></choose-files>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" size="small" :disabled="submitFlag" @click="submit">保存</el-button>
      <el-button size="small" @click="goBack()">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import {
    findProductById,
    queryDrugByDrugId,
    update,
    queryPROVINCE,
    insert,
    queryGmpList,
    findOrg,
    checkProduct,
    copy,
    findAttachedFiles
  } from 'src/axios/auditchanges/messageDeclare/product'
  import {findFilesById, returnYearList} from 'src/axios/auditchanges/common/catProduct'
  import selectMetric from './selectMetric'
  import selectOrg from './selectOrg'
  import chooseFiles from 'src/pages/auditchanges/common/chooseFiles'
  import imagesPreview from 'src/pages/auditchanges/common/imagesPreview'
  import {getProjectSubjoinMessage} from "src/axios/auditchanges/systemManage/subjoinMessageManage"
  import {boxScroll} from "src/components/mixins/scrolls"
  import {changeToBite,isNumber} from 'src/utils/validateUtil'
  import {dateFormatter} from 'src/utils/index'
  export default {
    mixins: [boxScroll],
    components: {
      selectMetric,
      selectOrg,
      chooseFiles,
      imagesPreview
    },
    data() {
      let that = this;
      let changeBite =(rule, value, callback)=>{
        let filedName = rule.field;
        let nodeEl = this.$refs[filedName].$el;
        //可输入字符限制
        let nodeMaxLimit = nodeEl.getAttribute('data-max');
        //是否必须数字
        let ifNum = nodeEl.getAttribute('data-mustNum') || "";
        let biteNum = nodeMaxLimit=='unlimited'?"": changeToBite(value);
        let tipMessage;
        switch (filedName){
          case 'PRODUCT':
            tipMessage = "请输入产品名称";
            break;
          case 'TRADE':
            tipMessage = "请输入商品名称";
            break;
          case 'DOSAGE':
            tipMessage = "请输入剂型";
            break;
          case 'SPEC':
            tipMessage = "请输入规格";
            break;
          case 'STANDRATE':
            tipMessage = "请输入转换比";
            break;
          case 'METRIC':
            tipMessage = "请输入单位";
            break;
          case 'WRAP':
            tipMessage = "请输入包材";
            break;
          case 'MANUFACTURE':
            tipMessage = "请输入生产企业";
            break;
          case 'STANDARDCODE':
            tipMessage = "请输入本位码";
            break;
          case 'SOURCE':
            tipMessage = "请输入产品来源";
            break;
          case 'UNIT':
            tipMessage = "请输入最小使用单位";
            break;
          case 'PERMITNUMBER':
            tipMessage = "请输入批准文号";
            break;
          case 'SWRAP':
            tipMessage = "请输入中包装数量";
            break;
          case 'BWRAP':
            tipMessage = "请输入大包装数量";
            break;
          case 'JYNUM':
            tipMessage = "请输入药品检验报告编号";
            break;
          case 'JYDATE':
            tipMessage = "请输入药品检验报告有效期";
            break;
          case 'JYYJ':
            tipMessage = "请选择有效期";
            break;
          case 'JKNUM':
            tipMessage = "请输入进口药品注册证编号";
            break;
          case 'JKDATE':
            tipMessage = "请输入有效期";
            break;
          case 'AGENCYORGDATE':
            tipMessage = "请输入代理授权书有效期至";
            break;
          case 'PRODUCTIONNUM':
            tipMessage = "请输入国产药品批件编号";
            break;
          case 'PRODUCTIONDATE':
            tipMessage = "请输入有效期";
            break;
          case 'IMPORTNUM':
            tipMessage = "请输入进口药品注册证编号";
            break;
          case 'GMP':
            tipMessage = "请选择GMP证书编号";
            break;
          case 'STANDRD':
            tipMessage = "请输入药品质量标准";
            break;
          case 'PROTECTIONFLAG':
            tipMessage = "请选择是否中药保护";
            break;
          case 'USEUNIT':
            tipMessage = "请输入用法用量";
            break;
          case 'TREATMENT':
            tipMessage = "请输入疗程";
            break;
            case 'CATALOGAREA':
            tipMessage = "请选择目录范围";
            break;
            case 'PRICETYPE':
            tipMessage = "请输入价格类型";
            break;
            case 'YEAR':
            tipMessage = "请选择年度";
            break;
            case 'PROVINCE':
            tipMessage = "请选择省份";
            break;
            case 'PROJECTNAME':
            tipMessage = "请输入项目名称";
            break;
            case 'REPRESENTATIVESPEC':
            tipMessage = "请输入代表品装量规格";
            break;
            case 'REPRESENTATIVEPRICE':
            tipMessage = "请输入代表品价格";
            break;
            case 'REPRESENTATIVEPACKAGING':
            tipMessage = "请输入代表品装量包装";
            break;
            case 'METHOD':
            tipMessage = "请输入计算方法";
            break;
            case 'CALCULATEPRICE':
            tipMessage = "请输入计算价格";
            break;
        }
        if(!value){
          if(rule.required){
            return callback(new Error(tipMessage));
          }
          else{
            return callback()
          }
        }
        else{
          //限制为数字
          if(ifNum && isNumber(value)){
            return callback()
          }
          else if(ifNum && !isNumber(value)){
            return callback(new Error('请输入数字'));
          }

          //不限制长度 传入'data-max="unlimited"'
          if(nodeMaxLimit == 'unlimited'){
            return callback()
          }else{
            //有自字符限制
            if(biteNum){
              if (biteNum > nodeMaxLimit) {
                return callback(new Error('长度不超过'+nodeMaxLimit+'个字节'));
              }else{
                return callback()
              }
            }
          }
        }
      };
      return {
        specFlag:false,
        dialogVisible: false,
        fileList: this.metaFileList(),
        visible: false,
        copyFlag: false,
        factoryFlag: false,
        gmpList: [],
        yearList: [],
        provinceList: [],
        catalog:'',
        checkData: {
          "CDID": '',
          "ORGID": ''
        },
        catalogAreaList: [
          {key: "0", value: "0", label: "西药竞价谈判目录",disabled:false},
          {key: "1", value: "1", label: "中药竞价谈判目录",disabled:false},
          {key: "2", value: "2", label: "西药低价药品目录",disabled:false},
          {key: "3", value: "3", label: "中药低价药品目录",disabled:false},
          {key: "4", value: "4", label: "短缺药品目录"},
          {key: "5", value: "5", label: "国家谈判目录"}
        ],
        methodList: [
          {key: "0", value: "其他", label: "其他"},
          {key: "1", value: "计算方法一", label: "计算方法一"},
          {key: "2", value: "计算方法二", label: "计算方法二"},
          {key: "3", value: "计算方法三", label: "计算方法三"},
          {key: "4", value: "计算方法四", label: "计算方法四"},
          {key: "5", value: "计算方法五", label: "计算方法五"},
          {key: "6", value: "计算方法六", label: "计算方法六"}
        ],
        oldOrgId: '',
        dataForm: this.metaDataForm(),
        rules: {
          PRODUCT: {required: true,validator: changeBite,trigger: 'blur'},
          TRADE: {required: false,validator: changeBite,trigger: 'blur'},
          DOSAGE: {required: true,validator: changeBite,trigger: 'blur'},
          SPEC:{required: true,validator: changeBite,trigger: 'blur'},
          STANDRATE:{required: true,validator: changeBite,trigger: 'blur'},
          METRIC:{required: true,validator: changeBite,trigger: 'blur'},
          WARP:{required: true,validator: changeBite,trigger: 'blur'},
          MANUFACTURE:{required: true,validator: changeBite,trigger: 'blur'},
          SOURCE:{required: true,validator: changeBite,trigger: 'blur'},
          UNIT:{required: true,validator: changeBite,trigger: 'blur'},
          PERMITNUMBER:{required: true,validator: changeBite,trigger: 'blur'},
          SWRAP:{required: true,validator: changeBite,trigger: 'blur'},
          BWRAP:{ required: true,validator: changeBite,trigger: 'blur'},
          JYNUM:{ required: true,validator: changeBite,trigger: 'blur'},
          JYDATE:{ required: true,validator: changeBite,trigger: 'blur'},
          PRODUCTIONNUM:{ required: true,validator: changeBite,trigger: 'blur'},
          PRODUCTIONDATE:{ required: true,validator: changeBite,trigger: 'blur'},
          JKNUM:{ required: true,validator: changeBite,trigger: 'blur'},
          JKDATE:{ required: true,validator: changeBite,trigger: 'blur'},
          GMP:{ required: true,validator: changeBite,trigger: 'change'},
          AGENCYORGDATE:{ required: true,validator: changeBite,trigger: 'blur'},
          STANDRD:{ required: true,validator: changeBite,trigger: 'blur'},
          PROTECTIONFLAG:{ required: true,validator: changeBite,trigger: 'change'},
          CATALOGAREA:{ required: true,validator: changeBite,trigger: 'change'},
          USEUNIT:{ required: true,validator: changeBite,trigger: 'blur'},
          USEMIN:{ required: false,validator: changeBite,trigger: 'blur'},
          USEMAX:{ required: false,validator: changeBite,trigger: 'blur'},
          NUMMIN:{ required: false,validator: changeBite,trigger: 'blur'},
          AVENUM:{ required: false,validator: changeBite,trigger: 'blur'},
          MAXIMUN:{ required: false,validator: changeBite,trigger: 'blur'},
          TREATMENT:{ required: true,validator: changeBite,trigger: 'blur'},
          PRICETYPE:{ required: true,validator: changeBite,trigger: 'blur'},
          YEAR:{ required: true,validator: changeBite,trigger: 'change'},
          PROVINCE:{ required: true,validator: changeBite,trigger: 'change'},
          PROJECTNAME:{ required: true,validator: changeBite,trigger: 'blur'},
          PRICE:{ required: true,validator: (rule, value, callback)=>{
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
              callback(new Error('请输入中标价'))
            }
          },trigger: 'blur'},
          REPRESENTATIVESPEC:{ required: true,validator: changeBite,trigger: 'blur'},
          REPRESENTATIVEPRICE:{ required: true,validator: changeBite,trigger: 'blur'},
          REPRESENTATIVEPACKAGING:{ required: true,validator: changeBite,trigger: 'blur'},
          METHOD:{ required: true,validator: changeBite,trigger: 'blur'},
          CALCULATEPRICE:{ required: true,validator: changeBite,trigger: 'blur'},
          REMARK:{ required: false,validator: changeBite,trigger: 'blur'},
          EXECUTIONDATE:{ required: false,message: '请输入执行日期',trigger: 'blur'},
          PATENTFLAG:{required: true,message: '请选择是否专利保护',trigger: 'blur'},
          PATENTBEGINDATE:{required: false,message: '请选择专利保护开始时间',trigger: 'change'},
          PATENTENDDATE:{required: false,message: '请选择专利保护结束时间',trigger: 'change'}
        },
        nodesPosition: [
          {itemName: '基础信息', nodePosition: null, itemAbb: 'cpjc'},
          {itemName: '说明书信息', nodePosition: null, itemAbb: 'sms'},
          {itemName: '项目附加信息', nodePosition: null, itemAbb: 'xmfj'},
          {itemName: '价格信息', nodePosition: null, itemAbb: 'jgxx'}
        ],
        annex: [],
        attachedFileList: {},
        submitFlag: false,//提交按钮是否可用
        startPickerOptions: {//开始时间与结束时间大小判断
          disabledDate(time) {
            if (that.dataForm.PATENTENDDATE * 1 == '') {
              return false;
            } else {
              return time.getTime() > new Date(that.dataForm.PATENTENDDATE * 1) - 3600 * 24 * 1000;
            }
          }
        },
        endPickerOptions: {
          disabledDate(time) {
            return time.getTime() < (new Date(that.dataForm.PATENTBEGINDATE * 1)) * 1 + 3600 * 24 * 1000;
          }
        },
        accountFlag:false,//校验日服用价格是否符合
        accountTip:'',
        quoteAbove:'1',
        threeProvincePrice:this.threeProvincePriceInit()
      };
    },
    created () {
      this.yearList = returnYearList();
    },
    methods: {
      threeProvincePriceInit(){
        return [
          {
            PROVINCENAME:'北京',
            PROVINCE:'',
            PROJECTNAME:'',
            PRICE:'',
            EXECUTIONDATE:''
          },
          {
            PROVINCENAME:'天津',
            PROVINCE:'',
            PROJECTNAME:'',
            PRICE:'',
            EXECUTIONDATE:''
          },
          {
            PROVINCENAME:'河北省',
            PROVINCE:'',
            PROJECTNAME:'',
            PRICE:'',
            EXECUTIONDATE:''
          }
        ]
      },
      judgePrice(){
        let tis = this;
        function init() {
          tis.accountFlag = false;
          tis.accountTip = ''
        }
        if(isNumber(this.dataForm.DISCOUNTPRICE)){
          init()
//          this.accountPrice = Number(this.accountPrice).toFixed(2);
          if(this.dataForm.CATALOGAREA == '2' && this.dataForm.DISCOUNTPRICE > 3.00){
            this.accountFlag = true;
            this.accountTip = '日服用折算价格不能大于3'
          }else if(this.dataForm.CATALOGAREA == '2' && this.dataForm.DISCOUNTPRICE < 3.00){
            init()
          }

            if(this.dataForm.CATALOGAREA == '3' && this.DISCOUNTPRICE > 5.00){
            this.accountFlag = true;
            this.accountTip = '日服用折算价格不能大于5'
            }else if(this.dataForm.CATALOGAREA == '3' && this.dataForm.DISCOUNTPRICE < 5.00){
              init()
            }
        }else{
          this.accountFlag = true;
          this.accountTip = '请输入数字'
        }
      },
      changeJYYJ(){
        let errorParentNode = this.$refs.JYDATE.$el.childNodes[1];
        let erroTipNode =errorParentNode.childNodes[3]
        if(this.dataForm.JYYJ=='0' && errorParentNode && erroTipNode.className =='el-form-item__error'){
          erroTipNode.style.display = 'block';
          this.rules.JYDATE.required = true;
        }else if(this.dataForm.JYYJ  == '1' && errorParentNode && erroTipNode.className =='el-form-item__error'){
          erroTipNode.style.display = 'none';
          this.rules.JYDATE.required = false;
        }
      },
      metaDataForm() {
        return {
//          GMPFILE:[],
          ID: '',
          PRICEID: '',
          CDID: '',
          MANUFACTUREID: '',
          PRODUCT: '', /*产品名称*/
          TRADE: '', /*商品名*/
          DOSAGE: '', /*剂型*/
          SPEC: '', /*规格*/
          STANDRATE: '', /*转换比*/
          METRIC: '', /*单位*/
          WRAP: '', /*包材*/
          MANUFACTURE: '', /*生产企业*/
          STANDARDCODE: '', /*本位码*/
          SOURCE: '', /*产品来源*/
          FZORG: '', /*分装企业*/
          UNIT: '', /*最小使用单位*/
          PERMITNUMBER: '', /*批准文号*/
          SWRAP: '', /*中包装*/
          BWRAP: '', /*大包装*/
          JYNUM: '', /*药品检验报告编号*/
          JYDATE: '', /*药品检验报告有效期*/
          JYYJ: '0', /*永久有效*/
          JKNUM: '', /*进口药品注册证编号(进口/进口分装)*/
          JKDATE: '', /*有效期至(进口/进口分装)*/
          AGENCYORGDATE: '', /*代理授权书有效期至(进口)*/
          PRODUCTIONNUM: '', /*国产药品批件编号*/
          PRODUCTIONDATE: '', /*国产药品批件编号有效期*/
          GMP: '', /*GMP证书编号(国产/进口分装)*/
          PATENTFLAG: '', /*是否专利保护*/
          PATENTBEGINDATE: '', /*专利保护开始时间*/
          PATENTENDDATE: '', /*专利保护结束时间*/
          STANDRD: '', /*药品质量标准*/
          PROTECTIONFLAG: '', /*是否中药保护*/
          USEUNIT: '', /*用法用量*/
          USEMIN: '', /*每次使用量最小值*/
          USEMAX: '', /*每次使用量最大值*/
          NUMMIN: '', /*每日次数最小值*/
          AVENUM: '', /*平均日用量*/
          MAXIMUN: '', /*每次使用极量*/
          TREATMENT: '', /*疗程*/
          SPECIFICATION: '', /*说明书*/
          ATTACHED: {},
          DISCOUNTPRICE:''
        }
      },
      metaFileList(){
        return {
          "1088": [],//批准文号不知道多少先写个1088
          "1013": [],//中包装数量
          "1012": [],//大包装数量
          "1014": [],//药品检验报告
          "1015": [],//进口药品注册证
          "1006": [],//代理授权书
          "1016": [],//国产药品批件
          "1018": [],//药品质量标准
          "1017": []//说明书
        }
      },
      copy(id){
        this.copyFlag = true;
        this.list(id);
      },
      async list(id) {
        this.visible = true;
        //查看详情
        let res = await findProductById(id)

        if(!res.data.PRICETYPE){
          res.data.PRICETYPE= '0'
        }
        this.dataForm = res.data
        this.dataForm.DISCOUNTPRICE = res.data.THREEPRICE? res.data.THREEPRICE[0].DISCOUNTPRICE:'';
        this.threeProvincePrice = res.data.THREEPRICE || this.threeProvincePriceInit();
        this.patenFlagChange();
        this.$set(this.dataForm, "PROVINCE", this.dataForm.PROVINCEID)
        this.oldOrgId = this.dataForm.MANUFACTUREID;
//        if (this.dataForm.JYYJ != undefined) {
//          if (this.dataForm.JYYJ == '1') {
//            this.$set(this.dataForm, "JYYJ", true);
//          } else {
//            this.$set(this.dataForm, "JYYJ", false);
//          }
//        }
        if(!this.dataForm.JYYJ){
          this.$set(this.dataForm,'JYYJ',0)
        }
        if (this.dataForm.PRICETYPE == undefined) {
          this.$set(this.dataForm, "PRICETYPE", "1");
        }
        res = await findFilesById(id)
        if (res.data != undefined) {
          for (let x in res.data) {
            this.fileList[x] = res.data[x]
          }
        } else {
          this.fileList = this.metaFileList();
        }
        res = await findAttachedFiles(id)
        if (res.data != undefined) {
          this.attachedFileList = res.data;
        }
        await this.initMethod();
        await this.$nextTick(() => {
          if (this.dataForm.GMPFILE) {
            this.dataForm.GMPFILE.splice(0, 0);
          }
          if (this.attachedFileList) {
            for (let x in this.attachedFileList) {
              this.attachedFileList[x].splice(0, 0);
            }
          }
          setTimeout(function () {
            /**
             * 查询设置锚点位置
             * */
            //恢复初始状态
            this.removeClassCurrent('jump-product-addup')[0].classList.add('current');
            this.getNodesHeight('product-addup')
          }.bind(this), 0)

        })
      },
      async checkFactoryFlag(){
        await findOrg().then(res => {
          //有数据当前企业是生产企业
          if (res.data == undefined || res.data == null) {
            this.factoryFlag = true;
          };
        })
      },
      add(data) {
        this.visible = true;
        let cdId = data.CDID;
        //通过药品id查药品等信息
        queryDrugByDrugId(cdId).then(res => {
          if(!res.data.PRICETYPE){
            res.data.PRICETYPE='0';
          }
          this.dataForm = res.data
          if(!this.dataForm.JYYJ){
            this.$set(this.dataForm,'JYYJ',0)
          }
          this.$set(this.dataForm, "SOURCE", '0')
          this.$set(this.dataForm, "MANUFACTURE", data.ORGNAME);
          this.$set(this.dataForm, "CDID", cdId);
          this.$set(this.dataForm, "MANUFACTUREID", data.ORGID);
          this.$set(this.dataForm, "MANUFACTURECODE", data.ORGCODE);
        })
        this.initMethod();
      },
      patenFlagChange(){
        if(this.dataForm.PATENTFLAG == '1'){
          this.rules.PATENTBEGINDATE.required = true;
          this.rules.PATENTENDDATE.required = true;
        }else{
          this.rules.PATENTBEGINDATE.required = false;
          this.rules.PATENTENDDATE.required = false;
        }
      },
      submitUseIf(useFlag){
        //如果请求不成功则打开按钮限制
        if (!useFlag) {
          this.submitFlag = false;
        } else {
          window.location.reload()
        }
      },
      submit(){
        this.submitFlag = true;
        this.patenFlagChange();
        this.fileList['1017'].splice(0,0);
        this.fileList['1017'].length?this.specFlag=false:this.specFlag=true;
        //如果选择了永久有效 有效期清空
        if(this.dataForm.JYYJ == '1'){
          this.dataForm.JYDATE = '';
          this.rules.JYDATE.required = false;
        }else{
          this.rules.JYDATE.required = true;
        };
        let validResult;
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            validResult = true;
          } else {
            validResult = false;
            return false;
          }
        });
        if(this.specFlag || !validResult){
          this.$message({
            message:'请正确填写所有必填项',
            type:'warning'
          });
          this.submitFlag = false;
          return;
        }

        if(this.accountFlag){
          this.$message({
            message:'请正确填写日服用折算价格',
            type:'warning'
          });
          this.submitFlag = false;
          return;
        }

        //区分国产0 进口1 进口封装数据2
        switch (this.dataForm.SOURCE){
          case '0':
            this.dataForm.JKNUM = '';
            this.fileList['1015'] = [];
            this.dataForm.JKDATE = '';
            this.dataForm.AGENCYORGDATE = '';
            this.fileList['1006'] = [];
            break;
          case '1':
            this.dataForm.PRODUCTIONNUM = '';
            this.fileList['1016'] = [];
            this.dataForm.PRODUCTIONDATE = '';
            this.dataForm.GMP = '';
            break;
          case '2':
            this.dataForm.PRODUCTIONNUM = '';
            this.fileList['1016'] = [];
            this.dataForm.PRODUCTIONDATE = '';
            this.dataForm.AGENCYORGDATE = '';
            this.fileList['1006'] = [];
            break;
        }


        //提交之前先验证生产企业和药品 产品是否已经申报过了
//        this.checkData.CDID = this.dataForm.CDID;
//        this.checkData.ORGID = this.dataForm.MANUFACTUREID;
//        console.log("submit")
//        console.log(this.dataForm)
//        return;
//        if(this.checkData.ORGID!=this.oldOrgId){
//          checkProduct(this.checkData).then(res=>{
//            if(res.data.COUNT!='0'){
//              alert("抱歉，系统检测您填写的产品信息已存在，不能新增。")
//              return ;
//            }
//          })
//        }

        let att = {};
        let thrPP = null;
        if(this.dataForm.CATALOGAREA == '2' || this.dataForm.CATALOGAREA == '3'){
          thrPP =  this.threeProvincePrice
          thrPP.forEach(item=>{
            item.EXECUTIONDATE = item.EXECUTIONDATE?dateFormatter(item.EXECUTIONDATE).split(' ')[0]:''
          })
        }
        this.annex.forEach(x => {
          x.options.forEach(y => {
            if (y.type == '5') {
              if (Object.keys(y.optionsVal).length != 0) {
                att[y.id] = [y.fileTypeId, y.optionsVal];
              }
            } else {
              if (y.value) {
                att[y.id] = [y.fileTypeId, y.value];
              }
            }
          })
        })

        if (this.dataForm.METRICID == undefined) {
          this.$message("请先选择单位")
          this.submitFlag = false;
          return;
        } else {
          if (this.dataForm.PRODUCTID == undefined) {
            this.$set(this.dataForm, "DECLARESOURCE", '0')
//

            insert(this.dataForm, this.fileList, att, this.attachedFileList,thrPP).then(res => {
              this.submitUseIf(res.success);
              this.$message(res.data)
            })
          } else {
            this.dataForm.CPID = this.dataForm.PRODUCTID;
            if (this.dataForm.PATENTFLAG != "1") {
              this.dataForm.PATENTBEGINDATE = "";
              this.dataForm.PATENTENDDATE = "";
            }
            if (this.copyFlag) {
              copy(this.dataForm, this.fileList, att, this.attachedFileList,thrPP).then(res => {
                this.submitUseIf(res.success);
              })
            } else {
              update(this.dataForm, this.fileList, att, this.attachedFileList,thrPP).then(res => {
                this.submitUseIf(res.success);
              })
            }
          }
        }
        this.visible = false;
      },
      async initMethod(){
        if (this.dataForm.PRICETYPE == undefined || this.dataForm.PRICETYPE == '') {
          this.$set(this.dataForm, "PRICETYPE", "0");
        }
        await queryGmpList("1").then(res => {
          this.gmpList = res.data;
          for (let x in this.gmpList) {
            if (this.gmpList[x]['CERTIFICATE_NUMBER'] == this.dataForm.GMPNUMBER) {
             this.dataForm.GMP = this.gmpList[x]['ID']
            }
          }
        })
        await queryPROVINCE().then(res => {
          this.provinceList = res.data;
          this.provinceList.forEach(item =>{
            this.threeProvincePrice.forEach(x =>{
              if(x.PROVINCENAME == item.NAME_CHN){
                x.PROVINCE = item.ID;
              }
            })
          })
        })
        await this.checkFactoryFlag();
        let annexStemp = [];
        await getProjectSubjoinMessage({attachedType: '2'}).then(subjoin => {
          subjoin.data.forEach(x => {
            console.log(x)
            let annex = {
              dicName: x.dicName,
              options: [],
            };
            x.catAttachedDictionaryDomains.forEach(y => {
              annex.options.push({
                id: y.id,
                type: y.fieldType,
                label: y.remark,
                tipUrl: y.tipUrl,
                tipText: y.tipText,
                fileTypeId: y.fileTypeId,
                fileTypeName: y.fileTypeName,
                value: this.dataForm.ATTACHED ? this.dataForm.ATTACHED[y.id] : '',
                imageFlag: y.hasImageFlag,
                options: y.catAttachedDictionaryOptions,
                optionsVal: y.fieldType == '5' && this.dataForm.ATTACHED && this.dataForm.ATTACHED[y.id] ? this.dataForm.ATTACHED[y.id].split(",") : []
              })
            });
            annexStemp.push(annex)
          })
        });
        this.annex = annexStemp;
        this.$nextTick(()=>{
          setTimeout(function () {
            /**
             * 查询设置锚点位置
             * */
            //恢复初始状态
            this.removeClassCurrent('jump-product-addup')[0].classList.add('current');
            this.getNodesHeight('product-addup')
          }.bind(this), 0)
        })
      },
      goBack(){
        this.dataForm = this.metaDataForm();
        this.visible = false;
      },
      selectMetric(){
        this.$nextTick(() => {
          this.$refs.selectMetric.list()
        })
      },
      getMetric(data){
        //id 药品ID
        this.$set(this.dataForm, "METRIC", data['1']);
        this.$set(this.dataForm, "METRICID", data['0']);
      },
      selectOrg(){
        this.$nextTick(() => {
          this.$refs.selectOrg.list()
        })
      },
      getOrg(data){
        //企业ID
        this.$set(this.dataForm, "MANUFACTURE", data['1']);
        this.$set(this.dataForm, "MANUFACTUREID", data['0']);
        this.$set(this.dataForm, "MANUFACTURECODE", data['2']);
      },
      gmpFileChange(){
        let id = this.dataForm.GMP
        for (let x in this.gmpList) {
          if (this.gmpList[x]['ID'] == id) {
            this.dataForm.GMPFILE = this.gmpList[x]['FILEIDS'] == undefined ? [] : this.gmpList[x]['FILEIDS'];
          }
        }
      },
      handleChooseFiles(refName){
        const tis = this;
        tis.dialogVisible = true;
        this.$nextTick(() => {
          this.$refs.chooseFiles.initData(refName);
        })
      },
      selectedData(res){
        if (!/\D/.test(res.refName)) {
          res.data.forEach(function (item) {
            this.fileList[res.refName].push(item)
          }.bind(this));
        } else {
          res.data.forEach(function (item) {
            if (!this.attachedFileList[res.refName]) {
              this.$set(this.attachedFileList, res.refName, []);
            }
            this.attachedFileList[res.refName].push(item)
          }.bind(this));
        }
      },
      upLoadImgIdList(res){
        if (!/\D/.test(res.refName)) {
          this.fileList[res.refName] = res.data;
        } else {
          this.attachedFileList[res.refName] = res.data;
        }
        if(res.refName == '1017'){
          if(res.data.length > 0){
            this.specFlag = false
          }else{
            this.specFlag = true
          }
        }

      },
      checkChange(val){
        console.log('val============', val)
      }
    },
    watch: {
      visible(newVal){
        let vieNode = document.getElementById('product-addup-box');
        if (vieNode) {
          if (newVal == false) {
            vieNode.onscroll = null;
            this.removeFixed('product-addup-view-side')
          } else {
            vieNode.onscroll = function () {
              this.dialogBoxScroll(vieNode, 'jump-product-addup', 'product-addup-view-side')
            }.bind(this)
          }
        }
      }
    },
    mounted(){
      let vieNode = document.getElementById('product-addup-box');
      if (vieNode) {
        vieNode.onscroll = function () {
          this.dialogBoxScroll(vieNode, 'jump-product-addup', 'product-addup-view-side')
        }.bind(this)
      }
    }
  }
</script>
<style>
  @import "../../../../assets/css/auditchanges.css";
</style>
