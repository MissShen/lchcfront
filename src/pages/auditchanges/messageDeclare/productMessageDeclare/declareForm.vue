<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="main audit-main">
      <ul class="side side-init" id="product-addup-side">
        <li
          v-for="(item,index) in nodesPosition"
          :key="index">
          <a @click="changeScrollHeight(item.nodePosition,'jump-product-addup',index)"
             class="d_jump jump-product-addup">{{item.itemName}}</a></li>
      </ul>
      <div class="right-box">
        <div class="gap-40" id="product-addup-box">
          <el-form :model="dataForm" ref="dataForm" :rules="rules" label-position="left" label-width="160px"
                   class="demo-ruleForm"
                   size="small">

            <h3 class="cpjc">产品基础信息</h3>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="产品名称" prop="PRODUCT">
                  <el-input v-model="dataForm.PRODUCT" :disabled="READ_ONLY"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="剂型" prop="DOSAGE">
                  <el-input v-model="dataForm.DOSAGE" :disabled="READ_ONLY"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="规格" prop="SPEC">
                  <el-input v-model="dataForm.SPEC" :disabled="READ_ONLY"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="转换比" prop="STANDRATE">
                  <el-input type="number" v-model="dataForm.STANDRATE" :disabled="READ_ONLY"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="单位" prop="METRIC">
                  <el-input v-model="dataForm.METRIC" :disabled="READ_ONLY"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="生产企业" prop="MANUFACTURE">
                  <el-input v-model="dataForm.MANUFACTURE" :disabled="READ_ONLY"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="包材" prop="WRAP">
                  <el-input v-model="dataForm.WRAP" :disabled="READ_ONLY"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商品名" prop="TRADE">
                  <el-input v-model="dataForm.TRADE"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="产品来源" prop="SOURCE">
                  <el-radio v-model="dataForm.SOURCE" label="0">国产</el-radio>
                  <el-radio v-model="dataForm.SOURCE" label="1">进口</el-radio>
                  <el-radio v-model="dataForm.SOURCE" label="2">进口分装</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="dataForm.SOURCE == '2'">
                <el-form-item label="分装企业">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="最小使用单位" prop="UNIT">
                  <el-input v-model="dataForm.UNIT"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="批准文号" prop="PERMITNUMBER">
                      <el-input v-model="dataForm.PERMITNUMBER"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                        <span class="audit-check-box preview-btn">
                          <el-button @click="handleChooseFiles('1088')">上传图片</el-button>
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
                    <el-form-item label="中包装数量" prop="SWRAP">
                      <el-input type="number" v-model="dataForm.SWRAP"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                        <span class="audit-check-box preview-btn">
                          <el-button @click="handleChooseFiles('1013')">上传图片</el-button>
                        </span>
                  </el-col>
                  <images-preview class="" refName="1013" ref="imagesPreview" :imgIdListUnUnique="fileList['1013']"
                                  @imgIdListChange="upLoadImgIdList"></images-preview>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="大包装数量" prop="BWRAP">
                      <el-input type="number" v-model="dataForm.BWRAP"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                        <span class="audit-check-box preview-btn">
                          <el-button @click="handleChooseFiles('1012')">上传图片</el-button>
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
                    <el-form-item label="药品检验报告编号" prop="JYNUM">
                      <el-input v-model="dataForm.JYNUM"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                        <span class="audit-check-box preview-btn">
                          <el-button @click="handleChooseFiles('1014')">上传图片</el-button>
                        </span>
                  </el-col>
                  <images-preview class="" refName="1014" ref="imagesPreview" :imgIdListUnUnique="fileList['1014']"
                                  @imgIdListChange="upLoadImgIdList"></images-preview>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-form-item label="有效期至" prop="JYDATE">
                  <el-date-picker type="date" :disabled="dataForm.JYYJ=='1'"
                                  v-model="dataForm.JYDATE"></el-date-picker>
                  <el-checkbox true-label="1" false-label="0" v-model="dataForm.JYYJ">永久有效</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24" v-if="dataForm.SOURCE === '0' ">
              <el-col :span="12">
                <el-form-item label="国产药品批件编号" prop="PRODUCTIONNUM">
                  <el-input v-model="dataForm.PRODUCTIONNUM"></el-input>
                </el-form-item>
                <span class="audit-check-box preview-btn">
                          <el-button @click="handleChooseFiles('1016')">上传图片</el-button>
                        </span>
                <images-preview class="" refName="1016" ref="imagesPreview" :imgIdListUnUnique="fileList['1016']"
                                @imgIdListChange="upLoadImgIdList"></images-preview>
              </el-col>
              <el-col :span="12">
                <el-form-item label="有效期至" prop="PRODUCTIONDATE">
                  <el-date-picker type="date" v-model="dataForm.PRODUCTIONDATE"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24" v-if="dataForm.SOURCE == '1' || dataForm.SOURCE == '2'">
              <el-col :span="12">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="进口药品注册证编号" prop="JKNUM">
                      <el-input v-model="dataForm.JKNUM"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                        <span class="audit-check-box preview-btn">
                          <el-button @click="handleChooseFiles('1015')">上传图片</el-button>
                        </span>
                  </el-col>
                  <images-preview class="" refName="1015" ref="imagesPreview" :imgIdListUnUnique="fileList['1015']"
                                  @imgIdListChange="upLoadImgIdList"></images-preview>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-form-item label="有效期至" prop="JKDATE">
                  <el-date-picker type="date" v-model="dataForm.JKDATE"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="24">
              <el-col :span="12" v-if="dataForm.SOURCE == '0' || dataForm.SOURCE == '2'">
                <el-form-item label="GMP证书编号" prop="GMP">
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
                    <el-form-item label="代理授权书有效期至" prop="AGENCYORGDATE">
                      <el-date-picker type="date" v-model="dataForm.AGENCYORGDATE"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                        <span class="audit-check-box preview-btn">
                          <el-button @click="handleChooseFiles('1006')">上传图片</el-button>
                        </span>
                  </el-col>
                  <images-preview class="" refName="1006" ref="imagesPreview" :imgIdListUnUnique="fileList['1006']"
                                  @imgIdListChange="upLoadImgIdList"></images-preview>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否专利保护">
                  <el-radio v-model="dataForm.PATENTFLAG" label="1">是</el-radio>
                  <el-radio v-model="dataForm.PATENTFLAG" label="0">否</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24" v-if="dataForm.PATENTFLAG=='1'">
              <el-col :span="12">
                <el-form-item label="专利保护开始时间">
                  <el-date-picker type="date" v-model="dataForm.PATENTBEGINDATE"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="专利保护结束时间">
                  <el-date-picker type="date" v-model="dataForm.PATENTENDDATE"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="药品质量标准" prop="STANDRD">
                      <el-input v-model="dataForm.STANDRD"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                        <span class="audit-check-box preview-btn">
                          <el-button @click="handleChooseFiles('1018')">上传图片</el-button>
                        </span>
                  </el-col>
                  <images-preview class="" refName="1018" ref="imagesPreview" :imgIdListUnUnique="fileList['1018']"
                                  @imgIdListChange="upLoadImgIdList"></images-preview>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否中药保护" prop="PROTECTIONFLAG">
                  <el-radio v-model="dataForm.PROTECTIONFLAG" label="1">是</el-radio>
                  <el-radio v-model="dataForm.PROTECTIONFLAG" label="0">否</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="目录范围" prop="CATALOGAREA">
                  <el-select v-model="dataForm.CATALOGAREA" placeholder="请选择" size="small" class="w100">
                    <el-option v-for="item in catalogAreaList"
                               :key="item.key"
                               :label="item.label"
                               :value="item.value"
                               class="fundInput">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <h3 class="sms">说明书信息</h3>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="用法用量" prop="USEUNIT">
                  <el-input type="textarea" :rows="3" v-model="dataForm.USEUNIT"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="每次使用量最小值" prop="USEMIN">
                  <el-input v-model="dataForm.USEMIN"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="每次使用量最大值" prop="USEMAX">
                  <el-input v-model="dataForm.USEMAX"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="每日次数最小值" prop="NUMMIN">
                  <el-input v-model="dataForm.NUMMIN"></el-input>

                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="平均日用量" prop="AVENUM">
                  <el-input v-model="dataForm.AVENUM"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="每次使用极量" prop="MAXIMUN">
                  <el-input v-model="dataForm.MAXIMUN"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="疗程" prop="TREATMENT">
                  <el-input v-model="dataForm.TREATMENT"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="说明书" required="true">
                  <el-button @click="handleChooseFiles('1017')">上传图片</el-button>
                </el-form-item>
              </el-col>
              <images-preview
                class="margin160"
                refName="1017"
                ref="imagesPreview"
                :imgIdListUnUnique="fileList['1017']"
                @imgIdListChange="upLoadImgIdList"></images-preview>
            </el-row>

            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item>
                  <el-button type="primary" @click="onSubmit('dataForm')">保存</el-button>
                  <el-button @click="goBack()">返回</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <choose-files ref="chooseFiles" v-if="dialogVisible" @handleSelectedFolder="selectedData"></choose-files>
    </div>
  </div>
</template>

<script>
  import {
    findProductById,
    queryDrugByDrugId,
    update,
    queryPROVINCE,
    insert,
    findOrg,
    checkProduct,
    copy,
    findAttachedFiles
  } from 'src/axios/auditchanges/messageDeclare/product'
  import chooseFiles from 'src/pages/auditchanges/common/chooseFiles'
  import imagesPreview from 'src/pages/auditchanges/common/imagesPreview'
  import {findDeclareMessageByCode, addFilingProductDeclare} from 'src/axios/auditchanges/messageDeclare/product'
  import {getProjectSubjoinMessage} from "src/axios/auditchanges/systemManage/subjoinMessageManage"
  import {queryGmpList} from 'src/axios/auditchanges/messageRegister/productMessageRegister'
  export default {
    components: {
      chooseFiles,
      imagesPreview
    },
    data() {
      return {
        READ_ONLY: false,
        code: "",
        dialogVisible: false,
        fileList: this.metaFileList(),
        visible: false,
        copyFlag: false,
        factoryFlag: false,
        gmpList: [],
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
        ],
        provinceList: [],
        checkData: {
          "CDID": '',
          "ORGID": ''
        },
        catalogAreaList: [
          {key: "0", value: "0", label: "西药竞价谈判目录"},
          {key: "1", value: "1", label: "中药竞价谈判目录"},
          {key: "2", value: "2", label: "西药低价药品目录"},
          {key: "3", value: "3", label: "中药低价药品目录"},
          {key: "4", value: "4", label: "短缺药品目录"}
        ],
        oldOrgId: '',
        dataForm: this.metaDataForm(),
        rules: {
          PRODUCT: {required: true, message: '请输入产品名称', trigger: 'blur'},
          TRADE: {required: true, message: '请输入商品名称', trigger: 'blur'},
          DOSAGE: {required: true, message: '请输入剂型', trigger: 'blur'},
          SPEC: {required: true, message: '请输入规格', trigger: 'blur'},
          STANDRATE: {required: true, message: '请输入转换比', trigger: 'blur'},
          METRIC: {required: true, message: '请输入单位', trigger: 'blur'},
          WRAP: {required: true, message: '请输入包材', trigger: 'blur'},
          MANUFACTURE: {required: true, message: '请输入生产企业', trigger: 'blur'},
          STANDARDCODE: {required: true, message: '请输入本位码', trigger: 'blur'},
          SOURCE: {required: true, message: '请输入产品来源', trigger: 'blur'},
          UNIT: {required: true, message: '请输入最小使用单位', trigger: 'blur'},
          PERMITNUMBER: {required: true, message: '请输入批准文号', trigger: 'blur'},
          SWRAP: {required: true, message: '请输入中包装数量', trigger: 'blur'},
          BWRAP: {required: true, message: '请输入大包装数量', trigger: 'blur'},
          JYNUM: {required: true, message: '请输入药品检验报告编号', trigger: 'blur'},
          JYDATE: {required: true, message: '请输入有效期至', trigger: 'blur'},
          JYYJ: {required: true, message: '请输入有效期是否永久', trigger: 'blur'},
          JKNUM: {required: true, message: '请输入进口药品注册证编号', trigger: 'blur'},
          JKDATE: {required: true, message: '请输入有效期', trigger: 'blur'},
          AGENCYORGDATE: {required: true, message: '请输入代理授权书有效期至', trigger: 'blur'},
          PRODUCTIONNUM: {required: true, message: '请输入国产药品批件编号', trigger: 'blur'},
          PRODUCTIONDATE: {required: true, message: '请输入有效期至', trigger: 'blur'},
          IMPORTNUM: {required: true, message: '请输入进口药品注册证编号', trigger: 'blur'},
          IMPORTDATE: {required: true, message: '请输入有效期至', trigger: 'blur'},
          GMP: {required: true, message: '请输入GMP证书编号', trigger: 'blur'},
          STANDRD: {required: true, message: '请输入药品质量标准', trigger: 'blur'},
          PROTECTIONFLAG: {required: true, message: '请输入是否中药保护', trigger: 'blur'},
          USEUNIT: {required: true, message: '请输入用法用量', trigger: 'blur'},
          TREATMENT: {required: true, message: '请输入疗程', trigger: 'blur'}
        },
        nodesPosition: this.nodesPositionInit(),
        annex: [],
        attachedFileList: {},
      };
    },

    created() {
      this.code = this.$route.params.code || undefined;
      this.$set(this.dataForm, "FILINGNUMBER", this.code);
      this.initMethod();
    },
    methods: {
      nodesPositionInit(){
        return [
          {itemName: '产品基础信息', nodePosition: null, itemAbb: 'cpjc'},
          {itemName: '说明书信息', nodePosition: null, itemAbb: 'sms'}
        ]
      },
      async initMethod(){
        await findDeclareMessageByCode(this.code).then(res => {
          this.$set(this.dataForm, "PRODUCT", res.data.nameChn);
          this.$set(this.dataForm, "DOSAGE", res.data.modeName);
          this.$set(this.dataForm, "SPEC", res.data.spec);
          this.$set(this.dataForm, "STANDRATE", res.data.standRate);
          this.$set(this.dataForm, "METRIC", res.data.specUnit);
          this.$set(this.dataForm, "TRADE", res.data.tradeName);
          this.$set(this.dataForm, "MANUFACTURE", res.data.manufactureName);
          this.$set(this.dataForm, "WRAP", res.data.wrapName);
          this.READ_ONLY = res.data.isNewProduct === "0" ? true : false;
        });
        if (this.dataForm.PRICETYPE == undefined || this.dataForm.PRICETYPE == '') {
          this.$set(this.dataForm, "PRICETYPE", "0");
        }
        await queryGmpList().then(res => {
          this.gmpList = res.data;
        });
        await queryPROVINCE().then(res => {
          this.provinceList = res.data;
        });
        let annexStemp = [];
        await getProjectSubjoinMessage({attachedType: '2'}).then(subjoin => {
          subjoin.data.forEach(x => {
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
        this.$nextTick(() => {
          /**
           * 查询设置锚点位置
           * */
          this.getNodesHeight('product-addup-box', 'enter-shxx');
          //恢复初始状态
          this.removeClassCurrent('jump-product-addup')[0].classList.add('current');
        })
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
          STANDRATE: undefined, /*转换比*/
          METRIC: '', /*单位*/
          WRAP: '', /*包材*/
          MANUFACTURE: '', /*生产企业*/
          STANDARDCODE: '', /*本位码*/
          SOURCE: '0', /*产品来源*/
          FZORG: '', /*分装企业*/
          UNIT: '', /*最小使用单位*/
          PERMITNUMBER: '', /*批准文号*/
          SWRAP: undefined, /*中包装*/
          BWRAP: undefined, /*大包装*/
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
          ATTACHED: {},
          CALCULATEPRICE: undefined, /*计算价格*/
          REPRESENTATIVEPRICE: undefined, /*代表品价格*/
          FILINGNUMBER: ""/*备案号*/
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
      onSubmit(dataForm) {
        if (this.fileList['1017'].length == 0) {
          this.$alert('请上传说明书图片', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false
        }
        this.$refs[dataForm].validate((valid) => {
          if (this.dataForm.PATENTFLAG != "1") {
            this.dataForm.PATENTBEGINDATE = "";
            this.dataForm.PATENTENDDATE = "";
          }
          if (valid) {
            let att = {};
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
            });
            addFilingProductDeclare(this.dataForm, this.fileList, att, this.attachedFileList).then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.goBack();
                }
              })
            });
          } else {
            this.$alert('请完善必填信息', '提示', {
              confirmButtonText: '确定',
              type: 'warning',
            });
            return false;
          }
        });
      },
      goBack() {
        this.$router.go(-1);
      },
      gmpFileChange(){
        let id = this.dataForm.GMP;
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
      },
      checkChange(val){
        console.log('val============', val)
      },
      changeScrollHeight(pageY, jumpNodeName, currentNodeIndex) {
        window.scrollTo(0, pageY);
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
        this.nodesPosition = this.nodesPositionInit();
        let vieNode = document.getElementById(proInfoDetaiBox);
        let viewNodeChildeNodes = vieNode.childNodes[0].childNodes;
        viewNodeChildeNodes.forEach(nodeItem => {
          if (nodeItem.nodeName == 'H3') {
            this.nodesPosition.forEach(item => {
              if (nodeItem.className == item.itemAbb) {
                item.nodePosition = nodeItem.offsetTop
              }
            })
          }
        });
        if (currentShxx) {
          let shxx = document.getElementById(currentShxx);
          this.nodesPosition.forEach(item => {
            if ('shxx' == item.itemAbb) {
              item.nodePosition = shxx.offsetTop;
            }
          })
        }
        //去除位置为0的值
        for (let i = 0; i < this.nodesPosition.length; i++) {
          if (!this.nodesPosition[i].nodePosition) {
            this.nodesPosition.splice(i, 1);
            i--;
          }
        }
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
      dialogBoxScroll(scrolltop, jumpNodeName, sideNodeName) {
        let vieNodeScrollTop = scrolltop;
        if (vieNodeScrollTop < this.nodesPosition[0].nodePosition) {
          this.removeClassCurrent(jumpNodeName)[0].classList.add('current');
        }
        this.nodesPosition.forEach((item, index) => {
          if (vieNodeScrollTop > (item.nodePosition - 120)) {
            this.removeClassCurrent(jumpNodeName)[index].classList.add('current');
          }
        });

        if (vieNodeScrollTop < this.nodesPosition[0].nodePosition + 50) {
          this.removeFixed(sideNodeName)
        }
        else {
          this.addFixed(sideNodeName)
        }
      }
    },
    mounted() {
      window.onscroll = function () {
        let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
        this.dialogBoxScroll(scrolltop, 'jump-product-addup', 'product-addup-side')
      }.bind(this)
    },
    destroyed(){
      window.onscroll = null
    }
  }
</script>
<style>
  @import "../../../../assets/css/auditchanges.css";
</style>


