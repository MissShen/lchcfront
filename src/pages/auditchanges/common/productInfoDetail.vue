<template>
  <div class="gap-30">
    <el-form ref="dataForm"  :model="dataForm" label-width="150px" size="small" label-position="left">
      <h3 class="cpjc">产品基础信息</h3>
      <el-row :gutter="12">
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item class="audit-form-item" label="产品名称:">
                <span>{{showForm.PRODUCT}}</span>
                <!--<span v-if="auditForm.PRODUCT"><br/>审核后:{{auditForm.PRODUCT}}</span>-->
              </el-form-item>
            </el-col>
            <!--<el-col :span="24">-->
            <!--<span class="audit-check-box">-->
            <!--<el-checkbox class="orange" v-if="limit && nChange" v-model="controlData.PRODUCT$" :label="CHECKBOXTEXT" @change="updateInput('PRODUCT')"></el-checkbox>&lt;!&ndash;不可变更&ndash;&gt;-->
            <!--<a class="audit-answer-if" v-if="flagForm.PRODUCT" type="warning" @click="findQueryInfo('PRODUCT')">{{flagForm.PRODUCT==0?'己':'未'}}{{BUTTEXT}}</a>-->
            <!--</span>-->
            <!--<el-input class="audit-detail-input" v-if="controlData.PRODUCT$" v-model="dataForm.PRODUCT" placeholder="产品名称"></el-input>-->
            <!--<product-upload-->
            <!--v-if="showForm.QUERYFLAG && controlData.PRODUCT$"-->
            <!--ref="productUpload"></product-upload>-->
            <!--</el-col>-->
          </el-row>
        </el-col>

        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item class="audit-form-item" label="剂型:">
                <span>{{showForm.DOSAGE}}</span>
                <!--<span v-if="auditForm.DOSAGE"><br/>审核后:{{auditForm.DOSAGE}}</span>-->
              </el-form-item>
            </el-col>
            <!--<el-col :span="24">-->
            <!--<span class="audit-check-box">-->
            <!--<el-checkbox  class="orange" v-if="limit && nChange" v-model="controlData.DOSAGE$" :label="CHECKBOXTEXT" @change="updateInput('DOSAGE')"></el-checkbox>-->
            <!--<a class="audit-answer-if" v-if="flagForm.DOSAGE" type="warning" @click="findQueryInfo('DOSAGE')">{{flagForm.DOSAGE==0?'己':'未'}}{{BUTTEXT}}</a>-->
            <!--</span>-->
            <!--<el-input class="audit-detail-input" v-if="controlData.DOSAGE$" v-model="dataForm.DOSAGE" placeholder="剂型"></el-input>-->
            <!--<product-upload-->
            <!--v-if="showForm.QUERYFLAG && controlData.DOSAGE$"-->
            <!--ref="productUpload"></product-upload>-->
            <!--</el-col>-->
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="12" class="audit-item-box">
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item class="audit-form-item" label="商品名:">
                <span v-if="changeForm.TRADE">变更前:</span><span>{{showForm.TRADE}}</span>
                <span class="orange" v-if="changeForm.TRADE"><br/>变更后:{{changeForm.TRADE}}</span>
                <span class="orange" v-if="auditForm.TRADE"><br/>审核后:{{auditForm.TRADE}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item data-max="200" ref="TRADE" prop="TRADE" class="audit-form-item">
                    <span slot="label" class="audit-check-box">
                      <el-checkbox class="orange" v-if="limit || (changeAudit && changeForm.TRADE)"
                                   v-model="controlData.TRADE$" :label="CHECKBOXTEXT"
                                   @change="updateInput('TRADE')"></el-checkbox>
                      <a class="audit-answer-if" v-if="flagForm.TRADE" type="warning"
                         @click="findQueryInfo('TRADE')">{{flagForm.TRADE == 0 ? '已' : '未'}}{{BUTTEXT}}</a>
                      <!--<upload-button v-if="showForm.QUERYFLAG && controlData.TRADE$" :buttonFlag="btnText" :fileListFlag='fromUploadIdList' :fileType="fileType" @uploadList="getUploadList"></upload-button>-->
                      <upload-button
                        class="preview-btn"
                        v-if="showForm.QUERYFLAG && controlData.TRADE$"
                        buttonFlag="TRADE"
                        :fileListFlag='fileForm["TRADE"]'
                        :fileType="fileType"
                        @uploadList="getUploadList">
                      </upload-button>
                    </span>
                <el-input class="audit-detail-input" v-if="controlData.TRADE$" v-model="dataForm.TRADE"
                          placeholder="商品名"></el-input>
                <images-preview
                  v-if="showForm.QUERYFLAG && controlData.TRADE$"
                  refName="TRADE"
                  ref="imagesPreview"
                  :imgIdListUnUnique="fileForm['TRADE']"
                  @imgIdListChange="uploadList"></images-preview>
              </el-form-item>
            </el-col>
          </el-row>

        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item class="audit-form-item" label="转换比:">
                <span>{{showForm.STANDRATE}}</span>
                <!--<span class="orange" v-if="auditForm.STANDRATE"><br/>审核后:{{auditForm.STANDRATE}}</span>-->

              </el-form-item>
            </el-col>
            <!--<el-col :span="24">-->
            <!--<span class="audit-check-box">-->
            <!--<el-checkbox class="orange" v-if="limit && nChange" v-model="controlData.STANDRATE$" :label="CHECKBOXTEXT" @change="updateInput('STANDRATE')"></el-checkbox>-->
            <!--<a class="audit-answer-if" v-if="flagForm.STANDRATE" type="warning" @click="findQueryInfo('STANDRATE')">{{flagForm.STANDRATE==0?'已':'未'}}{{BUTTEXT}}</a>-->
            <!--</span>-->
            <!--<el-input class="audit-detail-input" v-if="controlData.STANDRATE$" v-model="dataForm.STANDRATE" placeholder="转换比"></el-input>-->
            <!--<product-upload-->
            <!--v-if="showForm.QUERYFLAG && controlData.STANDRATE$"-->
            <!--ref="productUpload"></product-upload>-->
            <!--</el-col>-->
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item class="audit-form-item" label="规格:">
                <span>{{showForm.SPEC}}</span>
                <!--<span class="orange" v-if="auditForm.SPEC"><br/>审核后:{{auditForm.SPEC}}</span>-->
              </el-form-item>
            </el-col>
            <!--<el-col :span="24">-->
            <!--<span class="audit-check-box">-->
            <!--<el-checkbox class="orange" v-if="limit && nChange" v-model="controlData.SPEC$" :label="CHECKBOXTEXT" @change="updateInput('SPEC')"></el-checkbox>-->
            <!--<a class="audit-answer-if" v-if="flagForm.SPEC" type="warning" @click="findQueryInfo('SPEC')">{{flagForm.SPEC==0?'已':'未'}}{{BUTTEXT}}</a>-->
            <!--</span>-->
            <!--<el-input class="audit-detail-input" v-if="controlData.SPEC$" v-model="dataForm.SPEC" placeholder="规格"></el-input>-->
            <!--<product-upload-->
            <!--v-if="showForm.QUERYFLAG && controlData.SPEC$"-->
            <!--ref="productUpload"></product-upload>-->
            <!--</el-col>-->
          </el-row>
        </el-col>

        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item class="audit-form-item" label="单位:">
                <span>{{showForm.METRIC}}</span>
                <span class="orange" v-if="auditForm.METRIC"><br/>审核后:{{auditForm.METRIC}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item class="audit-form-item">
                  <span slot="label" class="audit-check-box">
                      <el-checkbox class="orange" v-if="limit && nChange" v-model="controlData.METRIC$"
                                   :label="CHECKBOXTEXT" @change="updateInput('METRIC')"></el-checkbox>
                    <a class="audit-answer-if" v-if="flagForm.METRIC" type="warning"
                       @click="findQueryInfo('METRIC')">{{flagForm.METRIC == 0 ? '已' : '未'}}{{BUTTEXT}}</a>
                    <upload-button
                      class="preview-btn"
                      v-if="showForm.QUERYFLAG && controlData.METRIC$"
                      buttonFlag="METRIC"
                      :fileListFlag='fileForm["METRIC"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                      </upload-button>
                    </span>
                <a class="audit-answer-if" v-if="controlData.METRIC$" @click="selectMetric" size="small">选择</a>
                <span>{{dataForm.METRIC}}</span>
                <images-preview
                  v-if="showForm.QUERYFLAG && controlData.METRIC$"
                  refName="METRIC"
                  ref="imagesPreview"
                  :imgIdListUnUnique="fileForm['METRIC']"
                  @imgIdListChange="uploadList"></images-preview>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item class="audit-form-item" label="包材:">
                <span>{{showForm.WRAP}}</span>
                <!--<span class="orange" v-if="auditForm.WRAP"><br/>审核后:{{auditForm.WRAP}}</span>-->
              </el-form-item>
            </el-col>
            <!--<el-col :span="24">-->
            <!--<span class="audit-check-box">-->
            <!--<el-checkbox class="orange" v-if="limit && nChange" v-model="controlData.WRAP$" :label="CHECKBOXTEXT" @change="updateInput('WRAP')"></el-checkbox>-->
            <!--<a class="audit-answer-if" v-if="flagForm.WRAP" type="warning" @click="findQueryInfo('WRAP')">{{flagForm.WRAP==0?'已':'未'}}{{BUTTEXT}}</a>-->
            <!--</span>-->
            <!--<el-input class="audit-detail-input" v-if="controlData.WRAP$" v-model="dataForm.WRAP" placeholder="包材"></el-input>-->
            <!--<product-upload-->
            <!--v-if="showForm.QUERYFLAG && controlData.WRAP$"-->
            <!--ref="productUpload"></product-upload>-->
            <!--</el-col>-->
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item class="audit-form-item" label="生产企业:">
                <span>{{showForm.MANUFACTURE}}</span>
                <span class="orange" v-if="auditForm.MANUFACTURE"><br/>审核后:{{auditForm.MANUFACTURE}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item class="audit-form-item">
                <span slot="label" class="audit-check-box">
                       <el-checkbox class="orange" v-if="limit && nChange" v-model="controlData.MANUFACTURE$"
                                    :label="CHECKBOXTEXT" @change="updateInput('MANUFACTURE')"></el-checkbox>
                    <a class="audit-answer-if" v-if="flagForm.MANUFACTURE" type="warning"
                       @click="findQueryInfo('MANUFACTURE')">{{flagForm.MANUFACTURE == 0 ? '已' : '未'}}{{BUTTEXT}}</a>
                    <upload-button
                      class="preview-btn"
                      v-if="showForm.QUERYFLAG && controlData.MANUFACTURE$"
                      buttonFlag="MANUFACTURE"
                      :fileListFlag='fileForm["MANUFACTURE"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                      </upload-button>
                    </span>
                <a class="audit-answer-if" v-if="controlData.MANUFACTURE$" @click="selectOrg">选择</a>
                <span>{{dataForm.MANUFACTURE}}</span>
                <images-preview
                  v-if="showForm.QUERYFLAG && controlData.MANUFACTURE$"
                  refName="MANUFACTURE"
                  ref="imagesPreview"
                  :imgIdListUnUnique="fileForm['MANUFACTURE']"
                  @imgIdListChange="uploadList"></images-preview>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!--<el-row class="audit-item-box">-->
      <!--<el-col :span="12">-->
      <!--<el-row >-->
      <!--<el-col :span="24">-->
      <!--<el-form-item class="audit-form-item" label="北京地标码:">-->
      <!--<span v-if="changeForm.STANDARDCODE">变更前:</span><span>{{showForm.STANDARDCODE}}</span>-->
      <!--<span class="orange" v-if="changeForm.STANDARDCODE"><br/>变更后:{{changeForm.STANDARDCODE}}</span>-->
      <!--<span class="orange" v-if="auditForm.STANDARDCODE"><br/>审核后:{{auditForm.STANDARDCODE}}</span>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--<el-col :span="24">-->
      <!--<span class="audit-check-box">-->
      <!--<el-checkbox class="orange" v-if="limit || (changeNAudit && changeForm.STANDARDCODE)" v-model="controlData.STANDARDCODE$" :label="CHECKBOXTEXT" @change="updateInput('STANDARDCODE')"></el-checkbox>-->
      <!--<a class="audit-answer-if" v-if="flagForm.STANDARDCODE" type="warning" @click="findQueryInfo('STANDARDCODE')">{{flagForm.STANDARDCODE==0?'已':'未'}}{{BUTTEXT}}</a>-->
      <!--<upload-button-->
      <!--class="preview-btn"-->
      <!--v-if="showForm.QUERYFLAG && controlData.STANDARDCODE$"-->
      <!--buttonFlag="STANDARDCODE"-->
      <!--:fileListFlag='fileForm["STANDARDCODE"]'-->
      <!--:fileType="fileType"-->
      <!--@uploadList="getUploadList">-->
      <!--</upload-button>-->
      <!--</span>-->
      <!--<el-input class="audit-detail-input" v-if="controlData.STANDARDCODE$" v-model="dataForm.STANDARDCODE" placeholder="北京地标码"></el-input>-->
      <!--<images-preview-->
      <!--v-if="showForm.QUERYFLAG && controlData.STANDARDCODE$"-->
      <!--refName="STANDARDCODE"-->
      <!--ref="imagesPreview"-->
      <!--:imgIdListUnUnique="fileForm['STANDARDCODE']"-->
      <!--@imgIdListChange="uploadList"></images-preview>-->
      <!--</el-col>-->
      <!--</el-row>-->
      <!--</el-col>-->
      <!--</el-row>-->
      <el-row :gutter="12">
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item class="audit-form-item" label="产品来源:">
                <span>{{ {"0": "国产", "1": "进口", "2": "进口分装"}[showForm.SOURCE]}}</span>
                <span class="orange" v-if="auditForm.SOURCE"><br/>审核后:{{ {
                  "0": "国产",
                  "1": "进口",
                  "2": "进口分装"
                }[auditForm.SOURCE]}}</span>
                <!--<el-input class=audit-detail-input v-if="dataForm.SOURCE$" v-model="dataForm.SOURCE" placeholder="产品来源"></el-input>-->
              </el-form-item>
            </el-col>
            <!--<el-col :span="24">-->
                    <!--<span class="audit-check-box">-->
                       <!--<el-checkbox class="orange" v-if="limit && nChange" v-model="controlData.SOURCE$"-->
                                    <!--:label="CHECKBOXTEXT" @change="updateInput('SOURCE')"></el-checkbox>-->
                    <!--<a class="audit-answer-if" v-if="flagForm.SOURCE" type="warning"-->
                       <!--@click="findQueryInfo('SOURCE')">{{flagForm.SOURCE == 0 ? '已' : '未'}}{{BUTTEXT}}</a>-->
                    <!--<upload-button-->
                      <!--class="preview-btn"-->
                      <!--v-if="showForm.QUERYFLAG && controlData.SOURCE$"-->
                      <!--buttonFlag="SOURCE"-->
                      <!--:fileListFlag='fileForm["SOURCE"]'-->
                      <!--:fileType="fileType"-->
                      <!--@uploadList="getUploadList">-->
                      <!--</upload-button>-->
                    <!--</span>-->
              <!--<el-radio v-if="controlData.SOURCE$" v-model="dataForm.SOURCE" label="0">国产</el-radio>-->
              <!--<el-radio v-if="controlData.SOURCE$" v-model="dataForm.SOURCE" label="1">进口</el-radio>-->
              <!--<el-radio v-if="controlData.SOURCE$" v-model="dataForm.SOURCE" label="2">进口分装</el-radio>-->
              <!--<images-preview-->
                <!--v-if="showForm.QUERYFLAG && controlData.SOURCE$"-->
                <!--refName="SOURCE"-->
                <!--ref="imagesPreview"-->
                <!--:imgIdListUnUnique="fileForm['SOURCE']"-->
                <!--@imgIdListChange="uploadList"></images-preview>-->
            <!--</el-col>-->
          </el-row>
        </el-col>
        <el-col :span="12" v-if="showForm.FILINGNUMBER">
          <el-form-item class="audit-form-item" label="备案码:">
            {{showForm.FILINGNUMBER}}
          </el-form-item>
        </el-col>
        <!--分装企业-->
        <!--<el-col :span="12" v-if="showForm.SOURCE == 2">-->
          <!--<el-row>-->
            <!--<el-col :span="24">-->
              <!--<el-form-item class="audit-form-item" label="分装企业:">-->
                <!--<span>{{showForm.FZORG}}</span>-->
                <!--<span class="orange" v-if="auditForm.FZORG"><br/>审核后:{{auditForm.FZORG}}</span>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="24" v-if="showForm.SOURCE == 2">-->
                    <!--<span class="audit-check-box">-->
                       <!--<el-checkbox class="orange" v-if="limit && nChange" v-model="controlData.FZORG$"-->
                                    <!--:label="CHECKBOXTEXT" @change="updateInput('FZORG')"></el-checkbox>-->
                    <!--<a class="audit-answer-if" v-if="flagForm.FZORG" type="warning"-->
                       <!--@click="findQueryInfo('FZORG')">{{flagForm.FZORG == 0 ? '已' : '未'}}{{BUTTEXT}}</a>-->
                    <!--<upload-button-->
                      <!--class="preview-btn"-->
                      <!--v-if="showForm.QUERYFLAG && controlData.FZORG$"-->
                      <!--buttonFlag="FZORG"-->
                      <!--:fileListFlag='fileForm["FZORG"]'-->
                      <!--:fileType="fileType"-->
                      <!--@uploadList="getUploadList">-->
                      <!--</upload-button>-->
                    <!--</span>-->
              <!--<el-input class="audit-detail-input" v-if="controlData.FZORG$" v-model="dataForm.FZORG"-->
                        <!--placeholder="分装企业"></el-input>-->
              <!--<images-preview-->
                <!--v-if="showForm.QUERYFLAG && controlData.FZORG$"-->
                <!--refName="FZORG"-->
                <!--ref="imagesPreview"-->
                <!--:imgIdListUnUnique="fileForm['FZORG']"-->
                <!--@imgIdListChange="uploadList"></images-preview>-->
            <!--</el-col>-->
          <!--</el-row>-->
        <!--</el-col>-->

      </el-row>
      <el-row :gutter="12" class="audit-item-box">
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item class="audit-form-item" label="最小使用单位:">
                <span v-if="changeForm.UNIT">变更前:</span><span>{{showForm.UNIT}}</span>
                <span class="orange" v-if="changeForm.UNIT"><br/>变更后:{{changeForm.UNIT}}</span>
                <span class="orange" v-if="auditForm.UNIT"><br/>审核后:{{auditForm.UNIT}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item class="audit-form-item">
                <span slot="label" class="audit-check-box">
                      <el-checkbox class="orange" v-if="limit || (changeNAudit && changeForm.UNIT)"
                                   v-model="controlData.UNIT$" :label="CHECKBOXTEXT"
                                   @change="updateInput('UNIT')"></el-checkbox>
                    <a class="audit-answer-if" v-if="flagForm.UNIT" type="warning"
                       @click="findQueryInfo('UNIT')">{{flagForm.UNIT == 0 ? '已' : '未'}}{{BUTTEXT}}</a>
                    <upload-button
                      class="preview-btn"
                      v-if="showForm.QUERYFLAG && controlData.UNIT$"
                      buttonFlag="UNIT"
                      :fileListFlag='fileForm["UNIT"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                      </upload-button>
                    </span>
                <el-input class="audit-detail-input" v-if="controlData.UNIT$" v-model="dataForm.UNIT"
                          placeholder="最小使用单位"></el-input>
                <images-preview
                  v-if="showForm.QUERYFLAG && controlData.UNIT$"
                  refName="UNIT"
                  ref="imagesPreview"
                  :imgIdListUnUnique="fileForm['UNIT']"
                  @imgIdListChange="uploadList"></images-preview>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item class="audit-form-item" label="批准文号:">
                <span v-if="changeForm.PERMITNUMBER">变更前:</span>
                <span>{{showForm.PERMITNUMBER}}</span>
                <images-preview class="margin-50" refName="1088" ref="imagesPreview"
                                :imgIdListUnUnique="fileList['1088']" :operate="false"></images-preview>
                <span class="orange" v-if="changeForm.PERMITNUMBER">
                      <br/>变更后:{{changeForm.PERMITNUMBER}}</span>
                <images-preview class="margin-50" v-if="change" refName="1088" ref="imagesPreview"
                                :imgIdListUnUnique="changeFileList['1088']" :operate="false"></images-preview>
                <span class="orange" v-if="auditForm.PERMITNUMBER"><br/>审核后:{{auditForm.PERMITNUMBER}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item class="audit-form-item">
                <span slot="label" class="audit-check-box">
                        <el-checkbox class="orange" v-if="limit || (changeNAudit && changeForm.PERMITNUMBER)"
                                     v-model="controlData.PERMITNUMBER$" :label="CHECKBOXTEXT"
                                     @change="updateInput('PERMITNUMBER')"></el-checkbox>
                    <a class="audit-answer-if" v-if="flagForm.PERMITNUMBER" type="warning"
                       @click="findQueryInfo('PERMITNUMBER')">{{flagForm.PERMITNUMBER == 0 ? '已' : '未'}}{{BUTTEXT}}</a>
                    <upload-button
                      class="preview-btn"
                      v-if="showForm.QUERYFLAG && controlData.PERMITNUMBER$"
                      buttonFlag="PERMITNUMBER"
                      :fileListFlag='fileForm["PERMITNUMBER"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                      </upload-button>
                      <el-button v-if="controlData.PERMITNUMBER$ && !change"
                                 @click="handleChooseFiles('1088')">上传图片</el-button>
                    </span>
                <el-input class="audit-detail-input" v-if="controlData.PERMITNUMBER$" v-model="dataForm.PERMITNUMBER"
                          placeholder="批准文号"></el-input>
                <images-preview
                  v-if="(showForm.QUERYFLAG ||showForm.CHANGEFLAG) && controlData.PERMITNUMBER$"
                  refName="PERMITNUMBER"
                  ref="imagesPreview"
                  :imgIdListUnUnique="showForm.QUERYFLAG?fileForm['PERMITNUMBER']:changeFileList['1088']"
                  @imgIdListChange="uploadList"></images-preview>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item class="audit-form-item" label="中包装数量:">
                <span v-if="changeForm.SWRAP">变更前:</span><span>{{showForm.SWRAP}}</span>
                <images-preview class="margin-50" refName="1013" ref="imagesPreview"
                                :imgIdListUnUnique="fileList['1013']" :operate="false"></images-preview>
                <span class="orange" v-if="changeForm.SWRAP"><br/>变更后:{{changeForm.SWRAP}}</span>
                <images-preview class="margin-50" v-if="change" refName="1013" ref="imagesPreview"
                                :imgIdListUnUnique="changeFileList['1013']" :operate="false"></images-preview>
                <span class="orange" v-if="auditForm.SWRAP"><br/>审核后:{{auditForm.SWRAP}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item class="audit-form-item">
                <span slot="label" class="audit-check-box">
                      <el-checkbox class="orange" v-if="limit || (changeNAudit && changeForm.SWRAP)"
                                   v-model="controlData.SWRAP$" :label="CHECKBOXTEXT"
                                   @change="updateInput('SWRAP')"></el-checkbox>
                    <a class="audit-answer-if" v-if="flagForm.SWRAP" type="warning"
                       @click="findQueryInfo('SWRAP')">{{flagForm.SWRAP == 0 ? '已' : '未'}}{{BUTTEXT}}</a>
                    <upload-button
                      class="preview-btn"
                      v-if="showForm.QUERYFLAG && controlData.SWRAP$"
                      buttonFlag="SWRAP"
                      :fileListFlag='fileForm["SWRAP"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                      </upload-button>
                      <el-button v-if="controlData.SWRAP$ && !change"
                                 @click="handleChooseFiles('1013')">上传图片</el-button>
                    </span>
                <el-input class="audit-detail-input" v-if="controlData.SWRAP$" v-model="dataForm.SWRAP"
                          placeholder="中包装数量"></el-input>
                <images-preview
                  v-if="(showForm.QUERYFLAG ||showForm.CHANGEFLAG) && controlData.SWRAP$"
                  refName="SWRAP"
                  ref="imagesPreview"
                  :imgIdListUnUnique="showForm.QUERYFLAG?fileForm['SWRAP']:changeFileList['1013']"
                  @imgIdListChange="uploadList"></images-preview>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item class="audit-form-item" label="大包装数量:">
                <span v-if="changeForm.BWRAP">变更前:</span><span>{{showForm.BWRAP}}</span>
                <images-preview class="margin-50" refName="1012" ref="imagesPreview"
                                :imgIdListUnUnique="fileList['1012']" :operate="false"></images-preview>
                <span class="orange" v-if="changeForm.BWRAP"><br/>变更后:{{changeForm.BWRAP}}</span>
                <images-preview class="margin-50" v-if="change" refName="1012" ref="imagesPreview"
                                :imgIdListUnUnique="changeFileList['1012']" :operate="false"></images-preview>
                <span class="orange" v-if="auditForm.BWRAP"><br/>审核后:{{auditForm.BWRAP}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item class="audit-form-item">
                <span slot="label" class="audit-check-box">
                      <el-checkbox class="orange" v-if="limit || (changeNAudit && changeForm.BWRAP)"
                                   v-model="controlData.BWRAP$" :label="CHECKBOXTEXT"
                                   @change="updateInput('BWRAP')"></el-checkbox>
                    <a class="audit-answer-if" v-if="flagForm.BWRAP" type="warning"
                       @click="findQueryInfo('BWRAP')">{{flagForm.BWRAP == 0 ? '已' : '未'}}{{BUTTEXT}}</a>
                    <upload-button
                      class="preview-btn"
                      v-if="showForm.QUERYFLAG && controlData.BWRAP$"
                      buttonFlag="BWRAP"
                      :fileListFlag='fileForm["BWRAP"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                      </upload-button>
                      <el-button v-if="controlData.BWRAP$ && !change"
                                 @click="handleChooseFiles('1012')">上传图片</el-button>
                    </span>
                <el-input class="audit-detail-input" v-if="controlData.BWRAP$" v-model="dataForm.BWRAP"
                          placeholder="大包装数量"></el-input>
                <images-preview
                  v-if="(showForm.QUERYFLAG ||showForm.CHANGEFLAG) && controlData.BWRAP$"
                  refName="BWRAP"
                  ref="imagesPreview"
                  :imgIdListUnUnique="showForm.QUERYFLAG?fileForm['BWRAP']:changeFileList['1012']"
                  @imgIdListChange="uploadList"></images-preview>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item class="audit-form-item" label="药品检验报告编号:">
                <span v-if="changeForm.JYNUM">变更前:</span><span>{{showForm.JYNUM}}</span>
                <images-preview class="margin-50" refName="1014" ref="imagesPreview"
                                :imgIdListUnUnique="fileList['1014']" :operate="false"></images-preview>
                <span class="orange" v-if="changeForm.JYNUM"><br/>变更后:{{changeForm.JYNUM}}</span>
                <images-preview class="margin-50" v-if="change" refName="1014" ref="imagesPreview"
                                :imgIdListUnUnique="changeFileList['1014']" :operate="false"></images-preview>
                <span class="orange" v-if="auditForm.JYNUM"><br/>审核后:{{auditForm.JYNUM}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item class="audit-form-item">
                <span slot="label" class="audit-check-box">
                      <el-checkbox class="orange" v-if="limit || (changeNAudit && changeForm.JYNUM)"
                                   v-model="controlData.JYNUM$" :label="CHECKBOXTEXT"
                                   @change="updateInput('JYNUM')"></el-checkbox>
                    <a class="audit-answer-if" v-if="flagForm.JYNUM" type="warning"
                       @click="findQueryInfo('JYNUM')">{{flagForm.JYNUM == 0 ? '已' : '未'}}{{BUTTEXT}}</a>
                    <upload-button
                      class="preview-btn"
                      v-if="showForm.QUERYFLAG && controlData.JYNUM$"
                      buttonFlag="JYNUM"
                      :fileListFlag='fileForm["JYNUM"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                      </upload-button>
                      <el-button v-if="controlData.JYNUM$ && !change"
                                 @click="handleChooseFiles('1014')">上传图片</el-button>
                    </span>
                <el-input class="audit-detail-input" v-if="controlData.JYNUM$" v-model="dataForm.JYNUM"
                          placeholder="药品检验报告编号"></el-input>
                <images-preview
                  v-if="(showForm.QUERYFLAG ||showForm.CHANGEFLAG) && controlData.JYNUM$"
                  refName="JYNUM"
                  ref="imagesPreview"
                  :imgIdListUnUnique="showForm.QUERYFLAG?fileForm['JYNUM']:changeFileList['1014']"
                  @imgIdListChange="uploadList"></images-preview>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item class="audit-form-item" label="有效期至:">
                <span
                  v-if="changeForm.JYDATE||changeForm.JYYJ">变更前:</span><span>{{showForm.JYYJ == "1" ? "永久有效" : showForm.JYDATE}}</span>
                <span class="orange"
                      v-if="changeForm.JYDATE||changeForm.JYYJ"><br/>变更后:{{changeForm.JYYJ == "1" ? "永久有效" : changeForm.JYDATE}}</span>
                <span class="orange"
                      v-if="auditForm.JYDATE||auditForm.JYYJ"><br/>审核后:{{auditForm.JYYJ == "1" ? "永久有效" : auditForm.JYDATE}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item class="audit-form-item">
                <span slot="label" class="audit-check-box">
                      <el-checkbox class="orange"
                                   v-if="limit || (changeNAudit && (changeForm.JYYJ || changeForm.JYDATE))"
                                   v-model="controlData.JYDATE$" :label="CHECKBOXTEXT"
                                   @change="updateJydate"></el-checkbox>
                    <a class="audit-answer-if" v-if="flagForm.JYDATE" type="warning"
                       @click="findQueryInfo('JYDATE')">{{flagForm.JYDATE != '0' ? '未' : '已'}}{{BUTTEXT}}</a>
                    <upload-button
                      class="preview-btn"
                      v-if="showForm.QUERYFLAG && controlData.JYDATE$"
                      buttonFlag="JYDATE"
                      :fileListFlag='fileForm["JYDATE"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                      </upload-button>
                    </span>
                <el-date-picker v-if="controlData.JYDATE$" :disabled="dataForm.JYYJ == '1'" type="date"
                                v-model="dataForm.JYDATE"></el-date-picker>
                <el-checkbox class="audit-limit-check orange" v-if="controlData.JYDATE$" v-model="dataForm.JYYJ"
                             @change="selectCheckbox()" label="永久有效" true-label="1" false-label="0"></el-checkbox>
                <images-preview
                  v-if="showForm.QUERYFLAG && controlData.JYDATE$"
                  refName="JYDATE"
                  ref="imagesPreview"
                  :imgIdListUnUnique="fileForm['JYDATE']"
                  @imgIdListChange="uploadList"></images-preview>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="12" v-if="showForm.SOURCE === 0 ">
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item class="audit-form-item" label="国产药品批件编号:">
                <span v-if="changeForm.PRODUCTIONNUM">变更前:</span><span>{{showForm.PRODUCTIONNUM}}</span>
                <images-preview class="margin-50" refName="1016" ref="imagesPreview"
                                :imgIdListUnUnique="fileList['1016']" :operate="false"></images-preview>
                <span class="orange" v-if="changeForm.PRODUCTIONNUM"><br/>变更后:{{changeForm.PRODUCTIONNUM}}</span>
                <images-preview class="margin-50" v-if="change" refName="1016" ref="imagesPreview"
                                :imgIdListUnUnique="changeFileList['1016']" :operate="false"></images-preview>
                <span class="orange" v-if="auditForm.PRODUCTIONNUM"><br/>审核后:{{auditForm.PRODUCTIONNUM}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item class="audit-form-item">
                 <span slot="label" class="audit-check-box">
                        <el-checkbox class="orange" v-if="limit || (changeNAudit && changeForm.PRODUCTIONNUM)"
                                     v-model="controlData.PRODUCTIONNUM$" :label="CHECKBOXTEXT"
                                     @change="updateInput('PRODUCTIONNUM')"></el-checkbox>
                    <a class="audit-answer-if" v-if="flagForm.PRODUCTIONNUM" type="warning"
                       @click="findQueryInfo('PRODUCTIONNUM')">{{flagForm.PRODUCTIONNUM == 0 ? '已' : '未'}}{{BUTTEXT}}</a>
                    <upload-button
                      class="preview-btn"
                      v-if="showForm.QUERYFLAG && controlData.PRODUCTIONNUM$"
                      buttonFlag="PRODUCTIONNUM"
                      :fileListFlag='fileForm["PRODUCTIONNUM"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                      </upload-button>
                      <el-button v-if="controlData.PRODUCTIONNUM$ && !change"
                                 @click="handleChooseFiles('1016')">上传图片</el-button>
                    </span>
                <el-input class="audit-detail-input" v-if="controlData.PRODUCTIONNUM$" v-model="dataForm.PRODUCTIONNUM"
                          placeholder="国产药品批件编号"></el-input>
                <images-preview
                  v-if="(showForm.QUERYFLAG ||showForm.CHANGEFLAG) && controlData.PRODUCTIONNUM$"
                  refName="PRODUCTIONNUM"
                  ref="imagesPreview"
                  :imgIdListUnUnique="showForm.QUERYFLAG?fileForm['PRODUCTIONNUM']:changeFileList['1016']"
                  @imgIdListChange="uploadList"></images-preview>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item class="audit-form-item" label="有效期至:">
                <span v-if="changeForm.PRODUCTIONDATE">变更前:</span><span>{{showForm.PRODUCTIONDATE}}</span>
                <span class="orange" v-if="changeForm.PRODUCTIONDATE"><br/>变更后:{{changeForm.PRODUCTIONDATE}}</span>
                <span class="orange" v-if="auditForm.PRODUCTIONDATE"><br/>审核后:{{auditForm.PRODUCTIONDATE}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item class="audit-form-item">
                <span slot="label" class="audit-check-box">
                      <el-checkbox class="orange" v-if="limit || (changeNAudit && changeForm.PRODUCTIONDATE)"
                                   v-model="controlData.PRODUCTIONDATE$" :label="CHECKBOXTEXT"
                                   @change="updateInput('PRODUCTIONDATE')"></el-checkbox>
                    <a class="audit-answer-if" v-if="flagForm.PRODUCTIONDATE" type="warning"
                       @click="findQueryInfo('PRODUCTIONDATE')">{{flagForm.PRODUCTIONDATE == 0 ? '已' : '未'}}{{BUTTEXT}}</a>
                    <upload-button
                      class="preview-btn"
                      v-if="showForm.QUERYFLAG && controlData.PRODUCTIONDATE$"
                      buttonFlag="PRODUCTIONDATE"
                      :fileListFlag='fileForm["PRODUCTIONDATE"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                      </upload-button>
                    </span>
                <el-date-picker v-if="controlData.PRODUCTIONDATE$" type="date"
                                v-model="dataForm.PRODUCTIONDATE"></el-date-picker>
                <images-preview
                  v-if="showForm.QUERYFLAG && controlData.PRODUCTIONDATE$"
                  refName="PRODUCTIONDATE"
                  ref="imagesPreview"
                  :imgIdListUnUnique="fileForm['PRODUCTIONDATE']"
                  @imgIdListChange="uploadList"></images-preview>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="12" v-if="showForm.SOURCE == 1 || showForm.SOURCE == 2">
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item class="audit-form-item" label="进口药品注册证编号:">
                <span v-if="changeForm.JKNUM">变更前:</span><span>{{showForm.JKNUM}}</span>
                <images-preview class="margin-50" refName="1015" ref="imagesPreview"
                                :imgIdListUnUnique="fileList['1015']" :operate="false"></images-preview>
                <span class="orange" v-if="changeForm.JKNUM"><br/>变更后:{{changeForm.JKNUM}}</span>
                <images-preview class="margin-50" v-if="change" refName="1015" ref="imagesPreview"
                                :imgIdListUnUnique="changeFileList['1015']" :operate="false"></images-preview>
                <span class="orange" v-if="auditForm.JKNUM"><br/>审核后:{{auditForm.JKNUM}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item class="audit-form-item">
<span slot="label" class="audit-check-box">
                      <el-checkbox class="orange" v-if="limit || (changeNAudit && changeForm.JKNUM)"
                                   v-model="controlData.JKNUM$" :label="CHECKBOXTEXT"
                                   @change="updateInput('JKNUM')"></el-checkbox>
                    <a class="audit-answer-if" v-if="flagForm.JKNUM" type="warning"
                       @click="findQueryInfo('JKNUM')">{{flagForm.JKNUM == 0 ? '已' : '未'}}{{BUTTEXT}}</a>
                    <upload-button
                      class="preview-btn"
                      v-if="showForm.QUERYFLAG && controlData.JKNUM$"
                      buttonFlag="JKNUM"
                      :fileListFlag='fileForm["JKNUM"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                      </upload-button>
                      <el-button v-if="controlData.JKNUM$ && !change"
                                 @click="handleChooseFiles('1015')">上传图片</el-button>
                    </span>
                <el-input class="audit-detail-input" v-if="controlData.JKNUM$" v-model="dataForm.JKNUM"
                          placeholder="进口药品注册证编号"></el-input>
                <images-preview
                  v-if="(showForm.QUERYFLAG ||showForm.CHANGEFLAG) && controlData.JKNUM$"
                  refName="JKNUM"
                  ref="imagesPreview"
                  :imgIdListUnUnique="showForm.QUERYFLAG?fileForm['JKNUM']:changeFileList['1015']"
                  @imgIdListChange="uploadList"></images-preview>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item class="audit-form-item" label="有效期至:">
                <span v-if="changeForm.JKDATE">变更前:</span><span>{{showForm.JKDATE}}</span>
                <span class="orange" v-if="changeForm.JKDATE"><br/>变更后:{{changeForm.JKDATE}}</span>
                <span class="orange" v-if="auditForm.JKDATE"><br/>审核后:{{auditForm.JKDATE}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item class="audit-form-item">
                <span slot="label" class="audit-check-box">
                      <el-checkbox class="orange" v-if="limit || (changeNAudit && changeForm.JKDATE)"
                                   v-model="controlData.JKDATE$" :label="CHECKBOXTEXT"
                                   @change="updateInput('JKDATE')"></el-checkbox>
                    <a class="audit-answer-if" v-if="flagForm.JKDATE" type="warning"
                       @click="findQueryInfo('JKDATE')">{{flagForm.JKDATE == 0 ? '已' : '未'}}{{BUTTEXT}}</a>
                    <upload-button
                      class="preview-btn"
                      v-if="showForm.QUERYFLAG && controlData.JKDATE$"
                      buttonFlag="JKDATE"

                      :fileListFlag='fileForm["JKDATE"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                      </upload-button>
                </span>
                <el-date-picker v-if="controlData.JKDATE$" type="date" v-model="dataForm.JKDATE"></el-date-picker>
                <images-preview
                  v-if="showForm.QUERYFLAG && controlData.JKDATE$"
                  refName="JKDATE"
                  ref="imagesPreview"
                  :imgIdListUnUnique="fileForm['JKDATE']"
                  @imgIdListChange="uploadList"></images-preview>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="12" v-if="showForm.SOURCE == 0 || showForm.SOURCE == 2">
          <el-row>
            <el-col :span="24">
              <el-form-item class="audit-form-item" label="GMP证书编号:">
                <span v-if="changeForm.GMP">变更前:</span><span>{{showForm.GMP}}</span>
                <images-preview
                  ref="imagesPreview"
                  :imgIdListUnUnique=showForm.GMPFILE
                  :operate="false"></images-preview>
                <span class="orange" v-if="changeForm.GMP"><br/>变更后:{{changeForm.GMP}}</span>
                <images-preview
                  ref="imagesPreview"
                  :imgIdListUnUnique=changeForm.GMPFILE
                  :operate="false"></images-preview>
                <span class="orange" v-if="auditForm.GMP"><br/>审核后:{{auditForm.GMP}}</span>
                <images-preview
                  ref="imagesPreview"
                  :imgIdListUnUnique=auditForm.GMPFILE
                  :operate="false"></images-preview>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="showForm.SOURCE == 0 || showForm.SOURCE == 2">
              <el-form-item class="audit-form-item">
                <span slot="label" class="audit-check-box">
                        <el-checkbox class="orange" v-if="limit || (changeNAudit && changeForm.GMP)"
                                     v-model="controlData.GMP$" :label="CHECKBOXTEXT"
                                     @change="updateInput('GMP')"></el-checkbox>
                    <a class="audit-answer-if" v-if="flagForm.GMP" type="warning"
                       @click="findQueryInfo('GMP')">{{flagForm.GMP == 0 ? '已' : '未'}}{{BUTTEXT}}</a>
                    <upload-button
                      class="preview-btn"
                      v-if="showForm.QUERYFLAG && controlData.GMP$"
                      buttonFlag="GMP"
                      :fileListFlag='fileForm["GMP"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                      </upload-button>
                    </span>
                <span>
                    <el-select v-if="controlData.GMP$" v-model="dataForm.GMP" @change="gmpFileChange()"
                               placeholder="GMP证书编号" size="small" class="fundInput">
                      <el-option v-for="item in gmpList"
                                 :key="item.ID"
                                 :label="item.CERTIFICATE_NUMBER"
                                 :value="item.ID"
                                 class="fundInput">
                      </el-option>
                    </el-select>
                    <images-preview
                      v-if="controlData.GMP$"
                      ref="imagesPreview"
                      :imgIdListUnUnique="gmpFile"
                      :operate="false"></images-preview>
                    </span>
                <images-preview
                  v-if="showForm.QUERYFLAG && controlData.GMP$"
                  refName="GMP"
                  ref="imagesPreview"
                  :imgIdListUnUnique="fileForm['GMP']"
                  @imgIdListChange="uploadList"></images-preview>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="12" v-if="showForm.SOURCE == 1">
          <el-row>
            <el-col :span="24">
              <el-form-item class="audit-form-item" label="代理授权书有效期至:">
                <span v-if="changeForm.AGENCYORGDATE">变更前:</span><span>{{showForm.AGENCYORGDATE}}</span>
                <images-preview class="margin-50" refName="1006" ref="imagesPreview"
                                :imgIdListUnUnique="fileList['1006']" :operate="false"></images-preview>
                <span class="orange" v-if="changeForm.AGENCYORGDATE"><br/>变更后:{{changeForm.AGENCYORGDATE}}</span>
                <images-preview class="margin-50" v-if="change" refName="1006" ref="imagesPreview"
                                :imgIdListUnUnique="changeFileList['1006']" :operate="false"></images-preview>
                <span class="orange" v-if="auditForm.AGENCYORGDATE"><br/>审核后:{{auditForm.AGENCYORGDATE}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="showForm.SOURCE == 1">
              <el-form-item class="audit-form-item">
                <span slot="label" class="audit-check-box">
                      <el-checkbox class="orange" v-if="limit || (changeNAudit && changeForm.AGENCYORGDATE)"
                                   v-model="controlData.AGENCYORGDATE$" :label="CHECKBOXTEXT"
                                   @change="updateInput('AGENCYORGDATE')"></el-checkbox>
                    <a class="audit-answer-if" v-if="flagForm.AGENCYORGDATE" type="warning"
                       @click="findQueryInfo('AGENCYORGDATE')">{{flagForm.AGENCYORGDATE == 0 ? '已' : '未'}}{{BUTTEXT}}</a>
                    <upload-button
                      class="preview-btn"
                      v-if="showForm.QUERYFLAG && controlData.AGENCYORGDATE$"
                      buttonFlag="AGENCYORGDATE"
                      :fileListFlag='fileForm["AGENCYORGDATE"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                      </upload-button>
                      <el-button v-if="controlData.AGENCYORGDATE$ && !change"
                                 @click="handleChooseFiles('1006')">上传图片</el-button>
                    </span>
                <el-date-picker v-if="controlData.AGENCYORGDATE$" type="date"
                                v-model="dataForm.AGENCYORGDATE"></el-date-picker>
                <images-preview
                  v-if="(showForm.QUERYFLAG ||showForm.CHANGEFLAG) && controlData.AGENCYORGDATE$"
                  refName="AGENCYORGDATE"
                  ref="imagesPreview"
                  :imgIdListUnUnique="showForm.QUERYFLAG?fileForm['AGENCYORGDATE']:changeFileList['1088']"
                  @imgIdListChange="uploadList"></images-preview>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item class="audit-form-item" label="是否专利保护:">
                <span v-if="changeForm.PATENTFLAG">变更前:</span><span>{{this.flagJson[showForm.PATENTFLAG]}}</span>
                <span class="orange"
                      v-if="changeForm.PATENTFLAG"><br/>变更后:{{this.flagJson[changeForm.PATENTFLAG]}}</span>
                <span class="orange" v-if="auditForm.PATENTFLAG"><br/>审核后:{{this.flagJson[auditForm.PATENTFLAG]}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item class="audit-form-item">
                <span slot="label" class="audit-check-box">
                      <el-checkbox class="orange" v-if="limit || (changeNAudit && changeForm.PATENTFLAG)"
                                   v-model="controlData.PATENTFLAG$" :label="CHECKBOXTEXT"
                                   @change="updateInput('PATENTFLAG')"></el-checkbox>
                    <a class="audit-answer-if" v-if="flagForm.PATENTFLAG" type="warning"
                       @click="findQueryInfo('PATENTFLAG')">{{flagForm.PATENTFLAG == 0 ? '已' : '未'}}{{BUTTEXT}}</a>
                    <upload-button
                      class="preview-btn"
                      v-if="showForm.QUERYFLAG && controlData.PATENTFLAG$"
                      buttonFlag="PATENTFLAG"
                      :fileListFlag='fileForm["PATENTFLAG"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                      </upload-button>
                    </span>
                <el-radio v-if="controlData.PATENTFLAG$" v-model="dataForm.PATENTFLAG" label="1">是</el-radio>
                <el-radio v-if="controlData.PATENTFLAG$" v-model="dataForm.PATENTFLAG" label="0">否</el-radio>
                <images-preview
                  v-if="showForm.QUERYFLAG && controlData.PATENTFLAG$"
                  refName="PATENTFLAG"
                  ref="imagesPreview"
                  :imgIdListUnUnique="fileForm['PATENTFLAG']"
                  @imgIdListChange="uploadList"></images-preview>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="12" v-if="showForm.PATENTFLAG == 1 || changeForm.PATENTFLAG == 1 || auditForm.PATENTFLAG == 1 || dataForm.PATENTFLAG == 1 || flagForm.PATENTFLAG == 1">
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item class="audit-form-item" label="专利保护开始时间:">
                <span v-if="changeForm.PATENTBEGINDATE">变更前:</span><span>{{showForm.PATENTBEGINDATE}}</span>
                <span class="orange" v-if="changeForm.PATENTBEGINDATE"><br/>变更后:{{changeForm.PATENTBEGINDATE}}</span>
                <span class="orange" v-if="auditForm.PATENTBEGINDATE"><br/>审核后:{{auditForm.PATENTBEGINDATE}}</span>
              </el-form-item>

            </el-col>
            <el-col :span="24">
              <el-form-item class="audit-form-item">
                <span slot="label" class="audit-check-box">
                      <el-checkbox class="orange" v-if="limit || (changeNAudit && changeForm.PATENTBEGINDATE)"
                                   v-model="controlData.PATENTBEGINDATE$" :label="CHECKBOXTEXT"
                                   @change="updateInput('PATENTBEGINDATE')"></el-checkbox>
                    <a class="audit-answer-if" v-if="flagForm.PATENTBEGINDATE" type="warning"
                       @click="findQueryInfo('PATENTBEGINDATE')">{{flagForm.PATENTBEGINDATE == 0 ? '已' : '未'}}{{BUTTEXT}}</a>
                    <upload-button
                      class="preview-btn"
                      v-if="showForm.QUERYFLAG && controlData.PATENTBEGINDATE$"
                      buttonFlag="PATENTBEGINDATE"
                      :fileListFlag='fileForm["PATENTBEGINDATE"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                      </upload-button>
                    </span>
                <el-date-picker v-if="controlData.PATENTBEGINDATE$" type="date"
                                v-model="dataForm.PATENTBEGINDATE"></el-date-picker>
                <images-preview
                  v-if="showForm.QUERYFLAG && controlData.PATENTBEGINDATE$"
                  refName="PATENTBEGINDATE"
                  ref="imagesPreview"
                  :imgIdListUnUnique="fileForm['PATENTBEGINDATE']"
                  @imgIdListChange="uploadList"></images-preview>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item class="audit-form-item" label="专利保护结束时间:">
                <span v-if="changeForm.PATENTENDDATE">变更前:</span><span>{{showForm.PATENTENDDATE}}</span>
                <span class="orange" v-if="changeForm.PATENTENDDATE"><br/>变更后:{{changeForm.PATENTENDDATE}}</span>
                <span class="orange" v-if="auditForm.PATENTENDDATE"><br/>审核后:{{auditForm.PATENTENDDATE}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item class="audit-form-item">
                <span slot="label" class="audit-check-box">
                      <el-checkbox class="orange" v-if="limit || (changeNAudit && changeForm.PATENTENDDATE)"
                                   v-model="controlData.PATENTENDDATE$" :label="CHECKBOXTEXT"
                                   @change="updateInput('PATENTENDDATE')"></el-checkbox>
                    <a class="audit-answer-if" v-if="flagForm.PATENTENDDATE" type="warning"
                       @click="findQueryInfo('PATENTENDDATE')">{{flagForm.PATENTENDDATE == 0 ? '已' : '未'}}{{BUTTEXT}}</a>
                    <upload-button
                      class="preview-btn"
                      v-if="showForm.QUERYFLAG && controlData.PATENTENDDATE$"
                      buttonFlag="PATENTENDDATE"
                      :fileListFlag='fileForm["PATENTENDDATE"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                      </upload-button>
                    </span>
                <el-date-picker v-if="controlData.PATENTENDDATE$" type="date"
                                v-model="dataForm.PATENTENDDATE"></el-date-picker>
                <images-preview
                  v-if="showForm.QUERYFLAG && controlData.PATENTENDDATE$"
                  refName="PATENTENDDATE"
                  ref="imagesPreview"
                  :imgIdListUnUnique="fileForm['PATENTENDDATE']"
                  @imgIdListChange="uploadList"></images-preview>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item class="audit-form-item" label="药品质量标准:">
                <span v-if="changeForm.STANDRD">变更前:</span><span>{{showForm.STANDRD}}</span>
                <images-preview class="margin-50" refName="1018" ref="imagesPreview"
                                :imgIdListUnUnique="fileList['1018']" :operate="false"></images-preview>
                <span class="orange" v-if="changeForm.STANDRD"><br/>变更后:{{changeForm.STANDRD}}</span>
                <images-preview class="margin-50" v-if="change" refName="1018" ref="imagesPreview"
                                :imgIdListUnUnique="changeFileList['1018']" :operate="false"></images-preview>
                <span class="orange" v-if="auditForm.STANDRD"><br/>审核后:{{auditForm.STANDRD}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item class="audit-form-item">
                <span slot="label" class="audit-check-box">
                      <el-checkbox class="orange" v-if="limit || (changeNAudit && changeForm.STANDRD)"
                                   v-model="controlData.STANDRD$" :label="CHECKBOXTEXT"
                                   @change="updateInput('STANDRD')"></el-checkbox>
                    <a class="audit-answer-if" v-if="flagForm.STANDRD" type="warning" @click="findQueryInfo('STANDRD')">{{flagForm.STANDRD == 0 ? '已' : '未'}}{{BUTTEXT}}</a>
                    <upload-button
                      class="preview-btn"
                      v-if="showForm.QUERYFLAG && controlData.STANDRD$"
                      buttonFlag="STANDRD"
                      :fileListFlag='fileForm["STANDRD"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                      </upload-button>
                      <el-button v-if="controlData.STANDRD$ && !change"
                                 @click="handleChooseFiles('1018')">上传图片</el-button>
                    </span>
                <el-input class="audit-detail-input" v-if="controlData.STANDRD$" v-model="dataForm.STANDRD"
                          placeholder="药品质量标准"></el-input>
                <images-preview
                  v-if="(showForm.QUERYFLAG ||showForm.CHANGEFLAG) && controlData.STANDRD$"
                  refName="STANDRD"
                  ref="imagesPreview"
                  :imgIdListUnUnique="showForm.QUERYFLAG?fileForm['STANDRD']:changeFileList['1018']"
                  @imgIdListChange="uploadList"></images-preview>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item class="audit-form-item" label="是否中药保护:">
                <span
                  v-if="changeForm.PROTECTIONFLAG">变更前:</span><span>{{this.flagJson[showForm.PROTECTIONFLAG]}}</span>
                <span class="orange"
                      v-if="changeForm.PROTECTIONFLAG"><br/>变更后:{{this.flagJson[changeForm.PROTECTIONFLAG]}}</span>
                <span class="orange" v-if="auditForm.PROTECTIONFLAG"><br/>审核后:{{this.flagJson[auditForm.PROTECTIONFLAG]}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item class="audit-form-item">
                <span slot="label" class="audit-check-box">
                      <el-checkbox class="orange" v-if="limit || (changeNAudit && changeForm.PROTECTIONFLAG)"
                                   v-model="controlData.PROTECTIONFLAG$" :label="CHECKBOXTEXT"
                                   @change="updateInput('PROTECTIONFLAG')"></el-checkbox>
                    <a class="audit-answer-if" v-if="flagForm.PROTECTIONFLAG" type="warning"
                       @click="findQueryInfo('PROTECTIONFLAG')">{{flagForm.PROTECTIONFLAG == 0 ? '已' : '未'}}{{BUTTEXT}}</a>
                    <upload-button
                      class="preview-btn"
                      v-if="showForm.QUERYFLAG && controlData.PROTECTIONFLAG$"
                      buttonFlag="PROTECTIONFLAG"
                      :fileListFlag='fileForm["PROTECTIONFLAG"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                      </upload-button>
                    </span>
                <el-radio v-if="controlData.PROTECTIONFLAG$" v-model="dataForm.PROTECTIONFLAG" label="1">是</el-radio>
                <el-radio v-if="controlData.PROTECTIONFLAG$" v-model="dataForm.PROTECTIONFLAG" label="0">否</el-radio>
                <images-preview
                  v-if="showForm.QUERYFLAG && controlData.PROTECTIONFLAG$"
                  refName="PROTECTIONFLAG"
                  ref="imagesPreview"
                  :imgIdListUnUnique="fileForm['PROTECTIONFLAG']"
                  @imgIdListChange="uploadList"></images-preview>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item class="audit-form-item" label="目录范围:">
                <span
                  v-if="changeForm.CATALOGAREA">变更前:</span><span>{{this.catalogAreaJson[showForm.CATALOGAREA]}}</span>
                <span class="orange"
                      v-if="changeForm.CATALOGAREA"><br/>变更后:{{this.catalogAreaJson[changeForm.CATALOGAREA]}}</span>
                <span class="orange" v-if="auditForm.CATALOGAREA"><br/>审核后:{{this.catalogAreaJson[auditForm.CATALOGAREA]}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item class="audit-form-item">
                <span slot="label" class="audit-check-box">
                      <el-checkbox class="orange" v-if="limit || (changeAudit && changeForm.CATALOGAREA)"
                                   v-model="controlData.CATALOGAREA$" :label="CHECKBOXTEXT"
                                   @change="updateInput('CATALOGAREA')"></el-checkbox>
                    <a class="audit-answer-if" v-if="flagForm.CATALOGAREA" type="warning"
                       @click="findQueryInfo('CATALOGAREA')">{{flagForm.CATALOGAREA == 0 ? '已' : '未'}}{{BUTTEXT}}</a>
                    <upload-button
                      class="preview-btn"
                      v-if="showForm.QUERYFLAG && controlData.CATALOGAREA$"
                      buttonFlag="CATALOGAREA"
                      :fileListFlag='fileForm["CATALOGAREA"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                      </upload-button>
                    </span>
                <el-select v-if="controlData.CATALOGAREA$" v-model="dataForm.CATALOGAREA" placeholder="目录范围" size="small"
                           class="fundInput">
                  <el-option v-for="item in catalogAreaList"
                             :key="item.key"
                             :label="item.label"
                             :value="item.value"
                             class="fundInput">
                  </el-option>
                </el-select>
                <images-preview
                  v-if="showForm.QUERYFLAG && controlData.CATALOGAREA$"
                  refName="CATALOGAREA"
                  ref="imagesPreview"
                  :imgIdListUnUnique="fileForm['CATALOGAREA']"
                  @imgIdListChange="uploadList"></images-preview>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <h3 class="sms">说明书信息</h3>
      <el-row :gutter="12" class="audit-item-box">
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item class="audit-form-item" label="用法用量:">
                <span v-if="changeForm.USEUNIT">变更前:</span><span>{{showForm.USEUNIT}}</span>
                <span class="orange" v-if="changeForm.USEUNIT"><br/>变更后:{{changeForm.USEUNIT}}</span>
                <span class="orange" v-if="auditForm.USEUNIT"><br/>审核后:{{auditForm.USEUNIT}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item class="audit-form-item">
                <span slot="label" class="audit-check-box">
                       <el-checkbox class="orange" v-if="limit || (changeNAudit && changeForm.USEUNIT)"
                                    v-model="controlData.USEUNIT$" :label="CHECKBOXTEXT"
                                    @change="updateInput('USEUNIT')"></el-checkbox>
                    <a class="audit-answer-if" v-if="flagForm.USEUNIT" type="warning" @click="findQueryInfo('USEUNIT')">{{flagForm.USEUNIT == 0 ? '已' : '未'}}{{BUTTEXT}}</a>
                    <upload-button
                      class="preview-btn"
                      v-if="showForm.QUERYFLAG && controlData.USEUNIT$"
                      buttonFlag="USEUNIT"
                      :fileListFlag='fileForm["USEUNIT"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                      </upload-button>
                    </span>
                <el-input class="audit-detail-input" v-if="controlData.USEUNIT$" v-model="dataForm.USEUNIT"
                          placeholder="用法用量"></el-input>
                <images-preview
                  v-if="showForm.QUERYFLAG && controlData.USEUNIT$"
                  refName="USEUNIT"
                  ref="imagesPreview"
                  :imgIdListUnUnique="fileForm['USEUNIT']"
                  @imgIdListChange="uploadList"></images-preview>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item class="audit-form-item" label="每次使用量最小值:">
                <span v-if="changeForm.USEMIN">变更前:</span><span>{{showForm.USEMIN}}</span>
                <span class="orange" v-if="changeForm.USEMIN"><br/>变更后:{{changeForm.USEMIN}}</span>
                <span class="orange" v-if="auditForm.USEMIN"><br/>审核后:{{auditForm.USEMIN}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item class="audit-form-item">
                <span slot="label" class="audit-check-box">
                       <el-checkbox class="orange" v-if="limit || (changeNAudit && changeForm.USEMIN)"
                                    v-model="controlData.USEMIN$" :label="CHECKBOXTEXT"
                                    @change="updateInput('USEMIN')"></el-checkbox>
                    <a class="audit-answer-if" v-if="flagForm.USEMIN" type="warning"
                       @click="findQueryInfo('USEMIN')">{{flagForm.USEMIN == 0 ? '已' : '未'}}{{BUTTEXT}}</a>
                    <upload-button
                      class="preview-btn"
                      v-if="showForm.QUERYFLAG && controlData.USEMIN$"
                      buttonFlag="USEMIN"
                      :fileListFlag='fileForm["USEMIN"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                      </upload-button>
                    </span>
                <el-input class="audit-detail-input" v-if="controlData.USEMIN$" v-model="dataForm.USEMIN"
                          placeholder="每次使用量最小值"></el-input>
                <images-preview
                  v-if="showForm.QUERYFLAG && controlData.USEMIN$"
                  refName="USEMIN"
                  ref="imagesPreview"
                  :imgIdListUnUnique="fileForm['USEMIN']"
                  @imgIdListChange="uploadList"></images-preview>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item class="audit-form-item" label="每次使用量最大值:">
                <span v-if="changeForm.USEMAX">变更前:</span><span>{{showForm.USEMAX}}</span>
                <span class="orange" v-if="changeForm.USEMAX"><br/>变更后:{{changeForm.USEMAX}}</span>
                <span class="orange" v-if="auditForm.USEMAX"><br/>审核后:{{auditForm.USEMAX}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item class="audit-form-item">
                <span slot="label" class="audit-check-box">
                       <el-checkbox class="orange" v-if="limit || (changeNAudit && changeForm.USEMAX)"
                                    v-model="controlData.USEMAX$" :label="CHECKBOXTEXT"
                                    @change="updateInput('USEMAX')"></el-checkbox>
                    <a class="audit-answer-if" v-if="flagForm.USEMAX" type="warning"
                       @click="findQueryInfo('USEMAX')">{{flagForm.USEMAX == 0 ? '已' : '未'}}{{BUTTEXT}}</a>
                    <upload-button
                      class="preview-btn"
                      v-if="showForm.QUERYFLAG && controlData.USEMAX$"
                      buttonFlag="USEMAX"
                      :fileListFlag='fileForm["USEMAX"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                      </upload-button>
                    </span>
                <el-input class="audit-detail-input" v-if="controlData.USEMAX$" v-model="dataForm.USEMAX"
                          placeholder="每次使用量最大值"></el-input>
                <images-preview
                  v-if="showForm.QUERYFLAG && controlData.USEMAX$"
                  refName="USEMAX"
                  ref="imagesPreview"
                  :imgIdListUnUnique="fileForm['USEMAX']"
                  @imgIdListChange="uploadList"></images-preview>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item class="audit-form-item" label="每日次数最小值:">
                <span v-if="changeForm.NUMMIN">变更前:</span><span>{{showForm.NUMMIN}}</span>
                <span class="orange" v-if="changeForm.NUMMIN"><br/>变更后:{{changeForm.NUMMIN}}</span>
                <span class="orange" v-if="auditForm.NUMMIN"><br/>审核后:{{auditForm.NUMMIN}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item class="audit-form-item">
                <span slot="label" class="audit-check-box">
                        <el-checkbox class="orange" v-if="limit || (changeNAudit && changeForm.NUMMIN)"
                                     v-model="controlData.NUMMIN$" :label="CHECKBOXTEXT"
                                     @change="updateInput('NUMMIN')"></el-checkbox>
                    <a class="audit-answer-if" v-if="flagForm.NUMMIN" type="warning"
                       @click="findQueryInfo('NUMMIN')">{{flagForm.NUMMIN == 0 ? '已' : '未'}}{{BUTTEXT}}</a>
                    <upload-button
                      class="preview-btn"
                      v-if="showForm.QUERYFLAG && controlData.NUMMIN$"
                      buttonFlag="NUMMIN"
                      :fileListFlag='fileForm["NUMMIN"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                      </upload-button>
                    </span>
                <el-input class="audit-detail-input" v-if="controlData.NUMMIN$" v-model="dataForm.NUMMIN"
                          placeholder="每日次数最小值"></el-input>
                <images-preview
                  v-if="showForm.QUERYFLAG && controlData.NUMMIN$"
                  refName="NUMMIN"
                  ref="imagesPreview"
                  :imgIdListUnUnique="fileForm['NUMMIN']"
                  @imgIdListChange="uploadList"></images-preview>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item class="audit-form-item" label="平均日用量:">
                <span v-if="changeForm.AVENUM">变更前:</span><span>{{showForm.AVENUM}}</span>
                <span class="orange" v-if="changeForm.AVENUM"><br/>变更后:{{changeForm.AVENUM}}</span>
                <span class="orange" v-if="auditForm.AVENUM"><br/>审核后:{{auditForm.AVENUM}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item class="audit-form-item">
                <span slot="label" class="audit-check-box">
                      <el-checkbox class="orange" v-if="limit || (changeNAudit && changeForm.AVENUM)"
                                   v-model="controlData.AVENUM$" :label="CHECKBOXTEXT"
                                   @change="updateInput('AVENUM')"></el-checkbox>
                    <a class="audit-answer-if" v-if="flagForm.AVENUM" type="warning"
                       @click="findQueryInfo('AVENUM')">{{flagForm.AVENUM == 0 ? '已' : '未'}}{{BUTTEXT}}</a>
                    <upload-button
                      class="preview-btn"
                      v-if="showForm.QUERYFLAG && controlData.AVENUM$"
                      buttonFlag="AVENUM"
                      :fileListFlag='fileForm["AVENUM"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                      </upload-button>
                    </span>
                <el-input class="audit-detail-input" v-if="controlData.AVENUM$" v-model="dataForm.AVENUM"
                          placeholder="平均日用量"></el-input>
                <images-preview
                  v-if="showForm.QUERYFLAG && controlData.AVENUM$"
                  refName="AVENUM"
                  ref="imagesPreview"
                  :imgIdListUnUnique="fileForm['AVENUM']"
                  @imgIdListChange="uploadList"></images-preview>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item class="audit-form-item" label="每次使用极量:">
                <span v-if="changeForm.MAXIMUN">变更前:</span><span>{{showForm.MAXIMUN}}</span>
                <span class="orange" v-if="changeForm.MAXIMUN"><br/>变更后:{{changeForm.MAXIMUN}}</span>
                <span class="orange" v-if="auditForm.MAXIMUN"><br/>审核后:{{auditForm.MAXIMUN}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item class="audit-form-item">
                <span slot="label" class="audit-check-box">
                      <el-checkbox class="orange" v-if="limit || (changeNAudit && changeForm.MAXIMUN)"
                                   v-model="controlData.MAXIMUN$" :label="CHECKBOXTEXT"
                                   @change="updateInput('MAXIMUN')"></el-checkbox>
                    <a class="audit-answer-if" v-if="flagForm.MAXIMUN" type="warning" @click="findQueryInfo('MAXIMUN')">{{flagForm.MAXIMUN == 0 ? '已' : '未'}}{{BUTTEXT}}</a>
                    <upload-button
                      class="preview-btn"
                      v-if="showForm.QUERYFLAG && controlData.MAXIMUN$"
                      buttonFlag="MAXIMUN"
                      :fileListFlag='fileForm["MAXIMUN"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                      </upload-button>
                    </span>
                <el-input class="audit-detail-input" v-if="controlData.MAXIMUN$" v-model="dataForm.MAXIMUN"
                          placeholder="每次使用极量"></el-input>
                <images-preview
                  v-if="showForm.QUERYFLAG && controlData.MAXIMUN$"
                  refName="MAXIMUN"
                  ref="imagesPreview"
                  :imgIdListUnUnique="fileForm['MAXIMUN']"
                  @imgIdListChange="uploadList"></images-preview>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item class="audit-form-item" label="疗程:">
                <span v-if="changeForm.TREATMENT">变更前:</span><span>{{showForm.TREATMENT}}</span>
                <span class="orange" v-if="changeForm.TREATMENT"><br/>变更后:{{changeForm.TREATMENT}}</span>
                <span class="orange" v-if="auditForm.TREATMENT"><br/>审核后:{{auditForm.TREATMENT}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item class="audit-form-item">
                <span slot="label" class="audit-check-box">
                      <el-checkbox class="orange" v-if="limit || (changeNAudit && changeForm.TREATMENT)"
                                   v-model="controlData.TREATMENT$" :label="CHECKBOXTEXT"
                                   @change="updateInput('TREATMENT')"></el-checkbox>
                    <a class="audit-answer-if" v-if="flagForm.TREATMENT" type="warning"
                       @click="findQueryInfo('TREATMENT')">{{flagForm.TREATMENT == 0 ? '已' : '未'}}{{BUTTEXT}}</a>
                    <upload-button
                      class="preview-btn"
                      v-if="showForm.QUERYFLAG && controlData.TREATMENT$"
                      buttonFlag="TREATMENT"
                      :fileListFlag='fileForm["TREATMENT"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                      </upload-button>
                    </span>
                <el-input class="audit-detail-input" v-if="controlData.TREATMENT$" v-model="dataForm.TREATMENT"
                          placeholder="疗程"></el-input>
                <images-preview
                  v-if="showForm.QUERYFLAG && controlData.TREATMENT$"
                  refName="TREATMENT"
                  ref="imagesPreview"
                  :imgIdListUnUnique="fileForm['TREATMENT']"
                  @imgIdListChange="uploadList"></images-preview>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item class="audit-form-item" label="说明书:">
                <span v-if="changeForm.SPECIFICATION">变更前:</span><span>{{showForm.SPECIFICATION}}</span>
                <images-preview class="margin-50" refName="1017" ref="imagesPreview"
                                :imgIdListUnUnique="fileList['1017']" :operate="false"></images-preview>
                <span class="orange" v-if="changeForm.SPECIFICATION"><br/>变更后:{{changeForm.SPECIFICATION}}</span>
                <images-preview class="margin-50" v-if="change" refName="1017" ref="imagesPreview"
                                :imgIdListUnUnique="changeFileList['1017']" :operate="false"></images-preview>
                <!--<span class="orange" v-if="auditForm.SPECIFICATION"><br/>审核后:{{auditForm.SPECIFICATION}}</span>-->
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item class="audit-form-item">
                <span slot="label" class="audit-check-box">
                       <!--<el-checkbox class="orange" v-if="limit || (changeAudit && changeForm.SPECIFICATION)" v-model="controlData.SPECIFICATION$" :label="CHECKBOXTEXT" @change="updateInput('SPECIFICATION')"></el-checkbox>-->
                      <el-checkbox class="orange" v-if="!change" v-model="controlData.SPECIFICATION$"
                                   :label="CHECKBOXTEXT" @change="updateInput('SPECIFICATION')"></el-checkbox>
                      <a class="audit-answer-if" v-if="flagForm.SPECIFICATION" type="warning"
                         @click="findQueryInfo('SPECIFICATION')">{{flagForm.SPECIFICATION == 0 ? '已' : '未'}}{{BUTTEXT}}</a>
                    <upload-button
                      class="preview-btn"
                      v-if="showForm.QUERYFLAG && controlData.SPECIFICATION$"
                      buttonFlag="SPECIFICATION"
                      :fileListFlag='fileForm["SPECIFICATION"]'
                      :fileType="fileType"
                      @uploadList="getUploadList">
                      </upload-button>
                      <el-button v-if="controlData.SPECIFICATION$ && !change"
                                 @click="handleChooseFiles('1017')">上传图片</el-button>
                    </span>
                <!--<el-input class="audit-detail-input" v-if="controlData.SPECIFICATION$" v-model="dataForm.SPECIFICATION" placeholder="说明书"></el-input>-->
                <images-preview
                  v-if="(showForm.QUERYFLAG ||showForm.CHANGEFLAG) && controlData.SPECIFICATION$"
                  refName="SPECIFICATION"
                  ref="imagesPreview"
                  :imgIdListUnUnique="showForm.QUERYFLAG?fileForm['SPECIFICATION']:changeFileList['1017']"
                  @imgIdListChange="uploadList"></images-preview>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <h3 class="xmfj">项目附加信息</h3>
      <el-row :gutter="12">
        <el-col :span="24" v-for="(att, i) in annex" :key="i">
          <el-row :gutter="24">
            <el-col class="width-160">
              <el-form-item :label="att.dicName"/>
            </el-col>
            <el-col :span="24">
              <div v-for="(x, y) in att.options" :key="y">
                <el-row :gutter="24">
                  <el-col :span="8" class="min-height14 margin5">
                    <div >
                      <span v-if="x.changeValue">变更前:</span>
                      <span v-if="x.type== 1 || x.type== 2 || x.type== 3 || x.type== 4">
                        <span class="width-260">{{x.showValue}}</span>
                      </span>
                      <span v-if="x.type== 5" v-for="(item,index) in x.showOptionsVal" :key="index">
                        <span class="width-260 marright30" v-if="item == valItem.value" v-for="(valItem,valIndex) in x.options"  :key="valIndex">
                          {{valItem.text}}
                        </span>
                      </span>
                      <span v-if="x.type== 6" v-for="(item,index) in x.options" :key="index">
                        <span class="width-260" v-if="item.value == x.showValue">{{item.text}}</span>
                      </span>
                      <images-preview ref="imagesPreview" :operate="false" :refName="x.id+'show'"
                                      :imgIdListUnUnique="attachedFileList.showFile&& attachedFileList.showFile[x.id]?attachedFileList.showFile[x.id]:[]"></images-preview>
                    </div>
                    <div class="orange" v-if="x.changeValue">
                      <span>变更后:</span>
                      <span v-if="x.type== 1 || x.type== 2 || x.type== 3 || x.type== 4">
                        <span class="width-260 orange">{{x.changeValue}}</span>
                      </span>
                      <span v-if="x.type== 5" v-for="(item,index) in x.changeOptionsVal" :key="index">
                        <span class="width-260 marright30" v-if="item == valItem.value" v-for="(valItem,valIndex) in x.options" :key="valIndex">{{valItem.text}}</span>
                      </span>
                      <span v-if="x.type== 6" v-for="(item, index) in x.options" :key="index">
                          <span class="width-260" v-if="item.value == x.changeValue">{{item.text}}</span>
                      </span>
                      <images-preview ref="imagesPreview" :operate="false" :refName="x.id+'change'"
                                      :imgIdListUnUnique="attachedFileList.changeFile && attachedFileList.changeFile[x.id]?attachedFileList.changeFile[x.id]:[]"></images-preview>
                    </div>
                    <div class="orange" v-if="x.auditValue">
                      <span>审核后:</span>
                      <span v-if="x.type== 1 || x.type== 2 || x.type== 3 || x.type== 4">
                        <span class="width-260">{{x.auditValue}}</span>
                      </span>
                      <span v-if="x.type== 5" v-for="(item,index) in x.auditOptionsVal" :key="index">
                        <span class="width-260 marright30" v-if="item == itemVal.value" v-for="(itemVal,valIndex) in x.options" :key="valIndex">{{itemVal.text}}</span>
                      </span>
                      <span v-if="x.type== 6" v-for="(item, index) in x.options" :key="index">
                        <span class="width-260" v-if="item.value == x.auditValue">{{item.text}}</span>
                      </span>
                      <images-preview ref="imagesPreview" :operate="false" :refName="x.id+'audit'"
                                      :imgIdListUnUnique="attachedFileList.auditFile&&attachedFileList.auditFile[x.id]?attachedFileList.auditFile[x.id]:[]"></images-preview>
                    </div>
                  </el-col>
                  <el-col :span="8" class="margin5">
                    <span>{{x.label}}</span>
                  </el-col>
                  <el-col :span="5" class="margin5">
                    <el-button class="audit-item font-size12" type="text" :href="x.tipUrl" size="small">{{x.tipText}}
                    </el-button>
                  </el-col>
                  <el-col :span="24" >
                    <el-form-item class="audit-form-item">
                      <span slot="label" class="audit-check-box">
                            <el-checkbox class="orange" v-if="limit || (changeAudit && x.changeValue)"
                                         v-model="controlData[x.id+'$']" :label="CHECKBOXTEXT"></el-checkbox>
                            <a class="audit-answer-if" v-if="x.flagValue" type="warning"
                               @click="findQueryInfo(x.id)">{{flagForm[x.id] == 0 ? '已' : '未'}}{{BUTTEXT}}</a>
                            <upload-button
                              class="preview-btn"
                              v-if="showForm.QUERYFLAG && controlData[x.id+'$']"
                              :buttonFlag="x.id"
                              :fileListFlag="attachedFileList.dataFile&&attachedFileList.dataFile[x.id]?attachedFileList.dataFile[x.id]:[]"
                              :fileType="fileType"
                              @uploadList="getUploadList">
                            </upload-button>
                            <el-button v-if="controlData[x.id+'$'] && !change && x.imageFlag==1"
                                       @click="handleChooseFiles(x.id)">上传图片</el-button>
                          </span>
                      <div v-if="controlData[x.id+'$']">
                        <div v-if="x.type== 1">
                          <el-input :placeholder="x.label" v-model="x.dataValue" size="small" class="width-260"/>
                        </div>
                        <div v-if="x.type== 2">
                          <el-input :placeholder="x.label" v-model="x.dataValue" type="textarea" size="small"
                                    class="width-260"/>
                        </div>
                        <div v-if="x.type== 3">
                          <el-date-picker :placeholder="x.label" v-model="x.dataValue" type="date" size="small"/>
                        </div>
                        <div v-if="x.type== 4">
                          <el-select :placeholder="x.label" v-model="x.dataValue" size="small" class="width-260">
                            <el-option
                              v-for="item in x.options"
                              :key="item.id"
                              :label="item.text"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </div>
                        <div v-if="x.type== 5">
                          <el-checkbox-group
                            :placeholder="x.label"
                            @change="checkChange"
                            v-model="x.dataOptionsVal">
                            <el-checkbox :data-val="option.value" v-for="(option,index) in x.options"
                                         :label="option.value" :key="index">
                              {{option.text}}
                            </el-checkbox>
                          </el-checkbox-group>
                        </div>
                        <div v-if="x.type== 6">
                          <el-radio-group :placeholder="x.label" v-model="x.dataValue">
                            <el-radio v-for="(option, index) in x.options" :label="option.value" :key="index">
                              {{option.text}}
                            </el-radio>
                          </el-radio-group>
                        </div>
                      </div>
                      <images-preview
                        v-if="(showForm.QUERYFLAG ||showForm.CHANGEFLAG) && controlData[x.id+'$']"
                        :refName="x.id"
                        ref="imagesPreview"
                        :imgIdListUnUnique="(attachedFileList.dataFile&&attachedFileList.dataFile[x.id])?attachedFileList.dataFile[x.id]:[]"
                        @imgIdListChange="uploadList"></images-preview>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-form>
    <select-metric ref="selectMetric" @selectMetric="getMetric"></select-metric>
    <select-org ref="selectOrg" @selectOrg="getOrg"></select-org>
    <product-query-info ref="productQueryInfo"></product-query-info>
    <product-query-info-by-audit @queryChange="infoChange" ref="productQueryInfoByAudit"></product-query-info-by-audit>
    <choose-files ref="chooseFiles" v-if="dialogVisible" @handleSelectedFolder="selectedData"></choose-files>
  </div>
</template>
<script>
  import productQueryInfo from './productQueryInfo'
  import productQueryInfoByAudit from './productQueryInfoByAudit'
  import selectMetric from 'src/pages/auditchanges/messageDeclare/productMessageDeclare/selectMetric'
  import selectOrg from 'src/pages/auditchanges/messageDeclare/productMessageDeclare/selectOrg'
  import {changeToBite,isNumber} from 'src/utils/validateUtil'
  import {
    queryDeclareGmp,
    queryGmpList,
    queryGmpListById,
    queryGmpListByUpId,
    findAttachedFiles
  } from 'src/axios/auditchanges/messageDeclare/product'
  import imagesPreview from 'src/pages/auditchanges/common/imagesPreview'
  import uploadButton from 'src/pages/auditchanges/common/uploadButton'
  import chooseFiles from 'src/pages/auditchanges/common/chooseFiles';
  import {findFilesById} from 'src/axios/auditchanges/common/catProduct'
  import {findChangeFiles,queryShowGmp} from 'src/axios/auditchanges/messageChanges/productChange'

  export default {
    name: "productInfoDetail",
    components: {
      selectOrg,
      selectMetric,
      productQueryInfo,
      productQueryInfoByAudit,
      imagesPreview,
      uploadButton,
      chooseFiles
    },
    data() {
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
        filed:"",
        annex: {},
        attachedFileList: {},
        dialogVisible: false,
        CHECKBOXTEXT: '',//checkbox文本
        BUTTEXT: '',//按钮文本
        limit: false,
        changeAudit: false,//可变更可审核可质疑checkbox控制
        nChange: true,//不可变更
        changeNAudit: false,//可变更不可审核可质疑
        dataForm: this.metaDataForm(),
        showForm: this.metaShowForm(),
        changeForm: this.metaChangeForm(),
        flagForm: this.metaFlagForm(),
        auditForm: this.metaAuditForm(),
        controlData: this.metaControlData(),
        fileForm: this.metaFileForm(),//质疑文件
        catalogAreaList: [
          {key: "0", value: "0", label: "西药竞价谈判目录"},
          {key: "1", value: "1", label: "中药竞价谈判目录"},
          {key: "2", value: "2", label: "西药低价药品目录"},
          {key: "3", value: "3", label: "中药低价药品目录"},
          {key: "4", value: "4", label: "短缺药品目录"}
        ],
        catalogAreaJson: {"0": "西药竞价谈判目录", "1": "中药竞价谈判目录", "2": "西药低价药品目录", "3": "中药低价药品目录", "4": "短缺药品目录"},
        gmpList: [],
        flagJson: {"0": "否", "1": "是"},
        btnText: 'fileInput',
        fileType: '3',//质疑
        fileList: {
          "1088": [],//批准文号不知道多少先写个1088
          "1013": [],//中包装数量
          "1012": [],//大包装数量
          "1014": [],//药品检验报告
          "1015": [],//进口药品注册证
          "1006": [],//代理授权书
          "1016": [],//国产药品批件
          "1018": [],//药品质量标准
          "1017": []//说明书
        },//变更前文件
        changeFileList: {
          "1088": [],//批准文号不知道多少先写个1088
          "1013": [],//中包装数量
          "1012": [],//大包装数量
          "1014": [],//药品检验报告
          "1015": [],//进口药品注册证
          "1006": [],//代理授权书
          "1016": [],//国产药品批件
          "1018": [],//药品质量标准
          "1017": []//说明书
        },//变更后文件
        change: true, //用于判断变更后是否展示文件
        gmpFile: [],
        rules:{
          TRADE: {required: false,validator: changeBite,trigger: 'blur'},
          METRIC:{required: true,message: '请输入单位',trigger: 'blur'},
          WRAP: {required: true,message: '请输入包材',trigger: 'blur'},
          MANUFACTURE: {required: true,message: '请输入生产企业',trigger: 'blur'},
          SOURCE: {required: true,message: '请选择产品来源',trigger: 'blur'},
          UNIT: {required: true,message: '请输入最小使用单位',trigger: 'blur'},
          PERMITNUMBER: {required: true,message: '请输入批准文号',trigger: 'blur'},
          SWRAP: {required: true,message: '请输入中包装数量',trigger: 'blur'},
          BWRAP: {required: true,message: '请输入大包装数量',trigger: 'blur'},
          JYNUM: {required: true,message: '请输入药品检验报告编号',trigger: 'blur'},
          JYDATE: {required: true,message: '请输入药品检验报告有效期',trigger: 'blur'},
          JYYJ: {required: false,message: '请选择有效期是否永久有效',trigger: 'blur'},
          JKNUM: {required: true,message: '请输入进口药品注册证编号',trigger: 'blur'},
          JKDATE: {required: true,message: '请输入有效期',trigger: 'blur'},
          AGENCYORGDATE: {required: true,message: '请输入代理授权书有效期',trigger: 'blur'},
          PRODUCTIONNUM: {required: true,message: '请输入国产药品批件编号',trigger: 'blur'},
          PRODUCTIONDATE: {required: true,message: '请输入国产药品批件编号有效期',trigger: 'blur'}, /*国产药品批件编号有效期*/
          GMP: {required: true,message: '请输入GMP证书编号',trigger: 'blur'},
          STANDRD: {required: true,message: '请输入药品质量标准',trigger: 'blur'},
          PROTECTIONFLAG: {required: true,message: '请选择是否中药保护',trigger: 'blur'},
          USEUNIT:  {required: true,message: '请输入用法用量',trigger: 'blur'},
          USEMIN: {required: false,message: '请输入每次使用量最小值',trigger: 'blur'},
          USEMAX: {required: false,message: '请输入每次使用量最大值',trigger: 'blur'},
          NUMMIN:{required: false,message: '请输入每日次数最小值',trigger: 'blur'},
          AVENUM: {required: false,message: '请输入平均日用量',trigger: 'blur'},
          MAXIMUN: {required: false,message: '请输入每次使用极量',trigger: 'blur'},
          TREATMENT: {required: true,message: '请输入疗程',trigger: 'blur'},
          SPECIFICATION:  {required: true,message: '请选择说明书',trigger: 'blur'}
        },
      }
    },
    created() {
    },
    methods: {
      infoChange(res){
        console.log(this.filed,this.flagForm)
        this.$set(this.flagForm,this.filed,res);
      },
      async list(showForm, dataForm, changeForm, flagForm, auditForm, questionFileForm, annex, attachedFileList) {
        this.annex = annex||{};
        this.attachedFileList = attachedFileList||{};
        this.showForm = showForm;
        if (this.showForm.change != undefined) {
          this.change = false
        }
        dataForm == undefined || dataForm == {} || dataForm == null ? this.controlData = this.dataForm : this.controlData = dataForm;

        this.dataForm = dataForm;
        this.changeForm = changeForm;
        this.flagForm = flagForm;
        this.auditForm = auditForm;
        if (questionFileForm != null && questionFileForm != undefined) {
          for (let x in questionFileForm) {
            this.$set(this.fileForm, x, questionFileForm[x])//质疑图片
          }
        }
        if (Object.keys(this.annex).length != 0) {
          for (let x in this.annex) {
            for (let y in this.annex[x].options) {
              this.$set(this.controlData, this.annex[x].options[y].id, this.annex[x].options[y].dataValue);
            }
          }
        }
        var key = JSON.parse(JSON.stringify(this.controlData));
        let data = {};
        for (var i in key) {
          if (this.controlData[i] != '') {
            if (i == "JYYJ") {
              data["JYDATE$"] = true;
            }
            this.$set(data, i + "$", true);
          } else {
            this.$set(data, i + "$", false);
          }
        }
        delete data["JYYJ$"]
        this.controlData = data
        //------------------------------------------------------------
//        申报审核
//        this.showForm.AUDITFLAG=true;
//        this.showForm
//        this.dataForm//审核数据
//        this.flagForm//质疑数据
//        申报审核详情
//        this.showForm.SHOWFLAG = true;
//        this.showForm
//        this.auditForm//审核后数据
//        this.flagForm//质疑数据
//        变更审核
//        this.showForm.AUDITFLAG=true;
//        this.showForm.CHANGEFLAG=true;
//        this.showForm
//        this.changeForm//变更后数据
//        this.dataForm//审核数据
//        this.flagForm//质疑数据
//        变更审核详情
//        this.showForm.SHOWFLAG=true;
//        this.showForm
//        this.changeForm//变更后数据
//        this.auditForm//审核后数据
//        this.flagForm//质疑数据
//        产品变更
//        this.showForm.CHANGEFLAG=true;
//        this.showForm
//        this.dataForm//变更数据
//        产品变更详情
//        this.showForm.SHOWFLAG=true;
//        this.showForm
//        this.changeForm//变更后数据
//        申报公示
//        this.showForm.QUERYFLAG=true;
//        this.showForm
//        this.dataForm//质疑数据
//        申报公示详情
//        this.showForm.SHOWFLAG=true;
//        this.showForm
//        this.flagForm//质疑数据
//        变更公示
//        this.showForm.CHANGEFLAG=true;
//        this.showForm.QUERYFLAG=true;
//        this.showForm
//        this.changeForm//变更后数据
//        this.dataForm//质疑数据
//        变更公示详情
//        this.showForm.SHOWFLAG=true;
//        this.showForm
//        this.changeForm//变更后数据
//        this.flagForm//质疑数据
//        申报澄清
//        this.showForm.CLARIFYFLAG=true;
//        this.showForm
//        this.flagForm//质疑数据
//        变更澄清
//        this.showForm.CHANGEFLAG=true;
//        this.showForm.CLARIFYFLAG=true;
//        this.showForm
//        this.changeForm//变更后数据
//        this.flagForm//质疑数据
//        申报确认
//        this.showForm
//        this.auditForm//审核后数据
//        变更确认
//        this.showForm.CHANGEFLAG=true;
//        this.showForm.AFFIRMFLAG=true;
//        this.showForm
//        this.changeForm//变更后数据
//        this.auditForm//审核后数据
//        挂网
//        this.showForm.SHOWFLAG=true;
//        this.showForm
        if (!this.showForm.SHOWFLAG) {//不是详情
          if (!this.change) {
            //变更
            queryShowGmp(this.showForm.PRODUCTID).then(res => {
              this.gmpList = res.data;
            })
          } else if (this.showForm.CHANGEFLAG && (this.showForm.AUDITFLAG || this.showForm.QUERYFLAG)) {
            //变更质疑/变更审核
            queryShowGmp(this.showForm.PRODUCTID).then(res => {
              this.gmpList = res.data;
            })
          } else if (this.showForm.AUDITFLAG || this.showForm.QUERYFLAG) {
            //申报质疑/申报审核
            queryDeclareGmp(this.showForm.ID).then(res => {
              this.gmpList = res.data;
            })
          }

          this.showForm.CHANGEFLAG ? this.nChange = false : this.nChange = true;
          //变更审核/变更公示 需要匹配字段是否有变更才展示
          this.changeAudit = this.showForm.CHANGEFLAG && (this.showForm.AUDITFLAG || this.showForm.QUERYFLAG);
          //变更审核 不展示按钮
          this.changeNAudit = !this.showForm.CLARIFYFLAG && !this.showForm.AFFIRMFLAG && !(this.showForm.AUDITFLAG && this.showForm.CHANGEFLAG);
          this.limit = this.changeAudit ? false : this.showForm.AUDITFLAG || this.showForm.QUERYFLAG || (!this.showForm.AFFIRMFLAG && !this.showForm.CLARIFYFLAG && this.showForm.CHANGEFLAG && !(this.showForm.AUDITFLAG || this.showForm.QUERYFLAG));
        }
        //------------------------------------------------------------
        if (this.showForm.CHANGEFLAG) {
          //公示
          this.CHECKBOXTEXT = '变更';
        }
        if (this.showForm.AUDITFLAG) {
          //审核
          this.CHECKBOXTEXT = '不正确';
        } else if (this.showForm.QUERYFLAG) {
          //变更
          this.CHECKBOXTEXT = '质疑';
        }
        this.BUTTEXT = this.showForm.CLARIFYFLAG ? '澄清' : '回复';

        //查询申报/变更前图片 this.showForm.ID
        let res = await findFilesById(this.showForm.CHANGEFLAG ? this.showForm.PRODUCTID : this.showForm.ID);//.then(res=>{
        if (res.data != undefined) {
          for (let i in res.data) {
            this.fileList[i] = res.data[i]
          }
        }
//        })
        //查询变更后图片 up_product_id 变更过程表ID
        if (this.showForm.CHANGEFLAG) {
          findChangeFiles(this.showForm.ID).then(res => {
            if (res.data != undefined) {
              for (let x in res.data) {
                this.$set(this.changeFileList, x, res.data[x])
              }
            }
          })
        }
        this.$nextTick(() => {
          if (this.fileForm) {
            for (let key in this.fileForm) {
              this.fileForm[key].splice(0, 0);
            }
          }

          if (this.attachedFileList) {
            for (let x in this.attachedFileList) {
              if (this.attachedFileList[x]) {
                for (let k in this.attachedFileList[x]) {
                  this.attachedFileList[x][k].splice(0, 0);
                }
              }
            }
          }
          setTimeout(function () {
            this.$emit('listDown')
          }.bind(this),50)
        });
      },
      selectMetric() {
        this.$nextTick(() => {
          this.$refs.selectMetric.list()
        })
      },
      getMetric(data) {
        //id 药品ID
        console.log(this.dataForm)
        this.$set(this.dataForm, "METRIC", data[1]);
        this.$set(this.dataForm, "METRICID", data[0]);
//        this.dataForm.METRIC = data['1'];
//        this.dataForm.METRICID = data['0'];
      },
      selectOrg() {
        this.$nextTick(() => {
          this.$refs.selectOrg.list()
        })
      },
      getOrg(data) {
        //企业ID
        this.$set(this.dataForm, "MANUFACTURE", data['1']);
        this.$set(this.dataForm, "MANUFACTUREID", data['0']);
      },
      metaDataForm() {
        return {
          ID: '', /*产品ID*/
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
          JYYJ: '', /*永久有效*/
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
          SPECIFICATION: ''/*,说明书*/
          // attached: [{
          //   /*附加信息数组*/
          //   dicName: "测试1", /*字段组名称*/
          //   options: [{
          //     type: "1", /*字段类型*/
          //     label: "值1",
          //     value: "值1", /*值*/
          //     imageFlag: 1, /*是否有图*/
          //   }]
          // }]
        }
      },
      metaControlData() {
        return {
          ID$: '', /*产品ID*/
          PRODUCT$: '', /*产品名称*/
          TRADE$: '', /*商品名*/
          DOSAGE$: '', /*剂型*/
          SPEC$: '', /*规格*/
          STANDRATE$: '', /*转换比*/
          METRIC$: '', /*单位*/
          WRAP$: '', /*包材*/
          MANUFACTURE$: '', /*生产企业*/
          STANDARDCODE$: '', /*本位码*/
          SOURCE$: '', /*产品来源*/
          FZORG$: '', /*分装企业*/
          UNIT$: '', /*最小使用单位*/
          PERMITNUMBER$: '', /*批准文号*/
          SWRAP$: '', /*中包装*/
          BWRAP$: '', /*大包装*/
          JYNUM$: '', /*药品检验报告编号*/
          JYDATE$: '', /*药品检验报告有效期*/
          JYYJ$: '', /*永久有效*/
          JKNUM$: '', /*进口药品注册证编号(进口/进口分装)*/
          JKDATE$: '', /*有效期至(进口/进口分装)*/
          AGENCYORGDATE$: '', /*代理授权书有效期至(进口)*/
          PRODUCTIONNUM$: '', /*国产药品批件编号*/
          PRODUCTIONDATE$: '', /*国产药品批件编号有效期*/
          GMP$: '', /*GMP证书编号(国产/进口分装)*/
          PATENTFLAG$: '', /*是否专利保护*/
          PATENTBEGINDATE$: '', /*专利保护开始时间*/
          PATENTENDDATE$: '', /*专利保护结束时间*/
          STANDRD$: '', /*药品质量标准*/
          PROTECTIONFLAG$: '', /*是否中药保护*/
          USEUNIT$: '', /*用法用量*/
          USEMIN$: '', /*每次使用量最小值*/
          USEMAX$: '', /*每次使用量最大值*/
          NUMMIN$: '', /*每日次数最小值*/
          AVENUM$: '', /*平均日用量*/
          MAXIMUN$: '', /*每次使用极量*/
          TREATMENT$: '', /*疗程*/
          SPECIFICATION$: ''/*,说明书*/
          // attached: [{
          //   /*附加信息数组*/
          //   dicName: "测试1", /*字段组名称*/
          //   options: [{
          //     type: "1", /*字段类型*/
          //     label: "值1",
          //     value: "值1", /*值*/
          //     imageFlag: 1, /*是否有图*/
          //   }]
          // }]
        }
      },
      metaShowForm() {
        return {
          AUDITFLAG: false, /*审核标识(不正确+查看质疑)*/
          AFFIRMFLAG: false, /*确认标识*/
          QUERYFLAG: false, /*公示质疑标识(质疑+上传文件)*/
          SHOWFLAG: false, /*详情标识*/
          CHANGEFLAG: false, /*变更标识*/
          CLARIFYFLAG: false, /*澄清标识*/
          ID: '', /*产品ID*/
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
          JYYJ: '', /*永久有效*/
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
          attached: [{
            /*附加信息数组*/
            dicName: "测试1", /*字段组名称*/
            options: [{
              type: "1", /*字段类型*/
              label: "值1",
              value: "值1", /*值*/
              imageFlag: 1, /*是否有图*/
            }]
          }]
        }
      },
      metaAuditForm() {
        return {
          PRODUCT: '', /*产品名称标识*/
          TRADE: '', /*商品名标识*/
          DOSAGE: '', /*剂型标识*/
          SPEC: '', /*规格标识*/
          STANDRATE: '', /*转换比标识*/
          METRIC: '', /*单位标识*/
          WRAP: '', /*包材标识*/
          MANUFACTURE: '', /*生产企业标识*/
          STANDARDCODE: '', /*本位码标识*/
          SOURCE: '', /*产品来源标识*/
          FZORG: '', /*分装企业标识*/
          UNIT: '', /*最小使用单位标识*/
          PERMITNUMBER: '', /*批准文号标识*/
          SWRAP: '', /*中包装标识*/
          BWRAP: '', /*大包装标识*/
          JYNUM: '', /*药品检验报告编号标识*/
          JYDATE: '', /*药品检验报告有效期标识*/
          JYYJ: '', /*永久有效标识*/
          JKNUM: '', /*进口药品注册证编号(进口/进口分装)标识*/
          JKDATE: '', /*有效期至(进口/进口分装)标识*/
          AGENCYORGDATE: '', /*代理授权书有效期至(进口)标识*/
          PRODUCTIONNUM: '', /*国产药品批件编号标识*/
          PRODUCTIONDATE: '', /*国产药品批件编号有效期标识*/
          GMP: '', /*GMP证书编号(国产/进口分装)标识*/
          PATENTFLAG: '', /*是否专利保护标识*/
          PATENTBEGINDATE: '', /*专利保护开始时间标识*/
          PATENTENDDATE: '', /*专利保护结束时间标识*/
          STANDRD: '', /*药品质量标准标识*/
          PROTECTIONFLAG: '', /*是否中药保护标识*/
          USEUNIT: '', /*用法用量标识*/
          USEMIN: '', /*每次使用量最小值标识*/
          USEMAX: '', /*每次使用量最大值标识*/
          NUMMIN: '', /*每日次数最小值标识*/
          AVENUM: '', /*平均日用量标识*/
          MAXIMUN: '', /*每次使用极量标识*/
          TREATMENT: '', /*疗程标识*/
          SPECIFICATION: '', /*说明书标识*/
        }
      },
      metaChangeForm() {
        return {
          STANDARDCODE: '', /*本位码标识*/
          TRADE: '', /*商品名*/
          UNIT: '', /*最小使用单位标识*/
          PERMITNUMBER: '', /*批准文号标识*/
          SWRAP: '', /*中包装标识*/
          BWRAP: '', /*大包装标识*/
          JYNUM: '', /*药品检验报告编号标识*/
          JYDATE: '', /*药品检验报告有效期标识*/
          JYYJ: '', /*永久有效标识*/
          JKNUM: '', /*进口药品注册证编号(进口/进口分装)标识*/
          JKDATE: '', /*有效期至(进口/进口分装)标识*/
          AGENCYORGDATE: '', /*代理授权书有效期至(进口)标识*/
          PRODUCTIONNUM: '', /*国产药品批件编号标识*/
          PRODUCTIONDATE: '', /*国产药品批件编号有效期标识*/
          GMP: '', /*GMP证书编号(国产/进口分装)标识*/
          PATENTCHANGE: '', /*是否专利保护标识*/
          PATENTBEGINDATE: '', /*专利保护开始时间标识*/
          PATENTENDDATE: '', /*专利保护结束时间标识*/
          STANDRD: '', /*药品质量标准标识*/
          PROTECTIONCHANGE: '', /*是否中药保护标识*/
          USEUNIT: '', /*用法用量标识*/
          USEMIN: '', /*每次使用量最小值标识*/
          USEMAX: '', /*每次使用量最大值标识*/
          NUMMIN: '', /*每日次数最小值标识*/
          AVENUM: '', /*平均日用量标识*/
          MAXIMUN: '', /*每次使用极量标识*/
          TREATMENT: '', /*疗程标识*/
          SPECIFICATION: ''/*说明书标识*/
        }
      },
      metaFlagForm() {
        return {
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
          JYYJ: '', /*永久有效*/
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
          attached: [{
            /*附加信息数组*/
            dicName: "测试1", /*字段组名称*/
            options: [{
              type: "1", /*字段类型*/
              label: "值1",
              value: "值1", /*值*/
              imageFlag: 1, /*是否有图*/
            }]
          }]
        }
      },
      metaFileForm() {
        return {
          PRODUCT: [], /*产品名称*/
          TRADE: [], /*商品名*/
          DOSAGE: [], /*剂型*/
          SPEC: [], /*规格*/
          STANDRATE: [], /*转换比*/
          METRIC: [], /*单位*/
          WRAP: [], /*包材*/
          MANUFACTURE: [], /*生产企业*/
          STANDARDCODE: [], /*本位码*/
          SOURCE: [], /*产品来源*/
          FZORG: [], /*分装企业*/
          UNIT: [], /*最小使用单位*/
          PERMITNUMBER: [], /*批准文号*/
          SWRAP: [], /*中包装*/
          BWRAP: [], /*大包装*/
          JYNUM: [], /*药品检验报告编号*/
          JYDATE: [], /*药品检验报告有效期*/
          JYYJ: [], /*永久有效*/
          JKNUM: [], /*进口药品注册证编号(进口/进口分装)*/
          JKDATE: [], /*有效期至(进口/进口分装)*/
          AGENCYORGDATE: [], /*代理授权书有效期至(进口)*/
          PRODUCTIONNUM: [], /*国产药品批件编号*/
          PRODUCTIONDATE: [], /*国产药品批件编号有效期*/
          GMP: [], /*GMP证书编号(国产/进口分装)*/
          PATENTFLAG: [], /*是否专利保护*/
          PATENTBEGINDATE: [], /*专利保护开始时间*/
          PATENTENDDATE: [], /*专利保护结束时间*/
          STANDRD: [], /*药品质量标准*/
          PROTECTIONFLAG: [], /*是否中药保护*/
          USEUNIT: [], /*用法用量*/
          USEMIN: [], /*每次使用量最小值*/
          USEMAX: [], /*每次使用量最大值*/
          NUMMIN: [], /*每日次数最小值*/
          AVENUM: [], /*平均日用量*/
          MAXIMUN: [], /*每次使用极量*/
          TREATMENT: [], /*疗程*/
          SPECIFICATION: []/*说明书*/
        }
      },
      updateJydate() {
        this.updateInput('JYDATE');
        this.updateInput('JYYJ');
      },
      findQueryInfo(filed) {
        this.filed = filed
        this.$nextTick(() => {
          if (this.showForm.AUDITFLAG) {
            //审核 走审核的
            this.$refs.productQueryInfoByAudit.list(filed, this.showForm, this.flagForm,this.annex)
          } else if (this.showForm.CLARIFYFLAG) {
            //澄清 走澄清的
            this.$refs.productQueryInfo.list(filed, this.showForm, this.flagForm,this.annex)
          }
        })
      },
      updateInput(filed) {
//        this.$set(this.dataForm, filed, "");
//        this.dataForm[filed] = '';
//        delete this.dataForm[filed]
        delete this.dataForm[filed]
        this.$set(this.fileForm, filed, [])
        console.log(this.dataForm)
      },
      updateAnnex(index) {
        this.annex[index].options.forEach(x => {
          if (x.type == '5') {
            x.dataOptionsVal = [];
          } else {
            x.dataValue = "";
          }
        })
        console.log(this.annex);
      },
      selectCheckbox() {
        let value = this.dataForm.JYYJ;
        if (value == '0') {
          this.updateInput("JYYJ");
        } else if (value == '1') {
          this.updateInput("JYDATE")
        }
      },
      getUploadList(res) {
        if (!/\d/ig.test(res.refName)) {
          res.data.forEach(item => {
            this.fileForm[res.refName].push(item)
          });
        } else {
          res.data.forEach(item => {
            if (!this.attachedFileList.dataFile[res.refName]) {
              this.$set(this.attachedFileList.dataFile, res.refName, []);
            }
            this.attachedFileList.dataFile[res.refName].push(item);
          });
        }
      },
      uploadList(res) {
        if (!/\d/ig.test(res.refName)) {
          if (this.showForm.QUERYFLAG) {
            this.$set(this.fileForm, res.refName, res.data);
          }
        } else {
          this.$set(this.attachedFileList.dataFile, res.refName, res.data)
        }
      },
      handleChooseFiles(refName) {
        const tis = this;
        tis.dialogVisible = true;
        this.$nextTick(() => {
          this.$refs.chooseFiles.initData(refName);
        })
      },
      selectedData(res) {
        if(/^[0-9]*$/.test(res.refName)){
            res.data.forEach(function (item) {
              this.changeFileList[res.refName].push(item)
            }.bind(this));
        }else{
          res.data.forEach(function (item) {
              if (!this.attachedFileList.dataFile[res.refName]) {
                this.$set(this.attachedFileList.dataFile, res.refName, []);
              }
              this.attachedFileList.dataFile[res.refName].push(item)
            }.bind(this));
        }
//        if (!/\d/ig.test(res.refName)) {
//            res.data.forEach(function (item) {
//              this.fileForm[res.refName].push(item)
//            }.bind(this));
//          } else {
//            res.data.forEach(function (item) {
//              if (!this.attachedFileList.dataFile[res.refName]) {
//                this.$set(this.attachedFileList.dataFile, res.refName, []);
//              }
//              this.attachedFileList.dataFile[res.refName].push(item)
//            }.bind(this));
//        }
      },
      gmpFileChange() {
        let id = this.dataForm.GMP
        for (let x in this.gmpList) {
          if (this.gmpList[x]['ID'] == id) {
            this.gmpFile = this.gmpList[x]['FILEIDS'] == undefined ? [] : this.gmpList[x]['FILEIDS'];
          }
        }
      },
      checkChange(val) {
        console.log('val============', val)
      }
    }
  }
</script>

<style>
  @import "../../../assets/css/auditchanges.css";
</style>
