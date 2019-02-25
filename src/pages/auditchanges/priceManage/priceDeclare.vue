<template>
    <el-dialog
      width="80%"
      title="全国省级最低中标价申报"
      :close-on-click-modal="false"
      :visible.sync="visible"
      @close="goBack"
      append-to-body>
      <el-form ref="dataForm"  class="form-view nomar gap-40" inline label-width="105px" size="small" label-position="left">
        <el-row class="audit-item-box">
          <el-col :span="12">
            <el-form-item label="目录范围">
              <span>{{{'0':'西药竞价谈判目录','1':'中药竞价谈判目录','2':'西药低价药品目录','3':'中药低价药品目录','4':'短缺药品目录','5':'国家谈判目录'}[showForm[0].CATALOGAREA]}}&nbsp;</span>
            </el-form-item>
          </el-col>
        </el-row>
        <hr>
        <div v-if="changeCatalogArea == '0' || changeCatalogArea == '1'">
          <el-row :gutter="60">
            <el-col :span="12">
              <el-form-item label="价格类型" class="audit-declare-radio">
                <el-radio-group @change="watchPriceType(dataForm[0].PRICETYPE)" v-model="dataForm[0].PRICETYPE">
                  <el-radio  label="0">全国最低中标价</el-radio>
                  <el-radio  label="1">计算价格</el-radio>
                  <el-radio  label="2">无最低中标价</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <hr class="marbottom15">
          <div v-if="dataForm[0].PRICETYPE === '1'">
            <el-row :gutter="60">
              <el-col :span="12">
                <el-form-item label="产品名称">
                  <span class="orange" v-if="checkShow">{{showForm[0].PRODUCTNAME}}&nbsp;</span>
                  <div :class="{'price-operate-box':checkShow}">
                    <el-checkbox
                      class="orange"
                      v-model="controlData[0].PRODUCTNAME$"
                      label="变更"
                      v-if="checkShow"
                      @change="updateInput('PRODUCTNAME',0)"></el-checkbox>
                    <el-input
                      v-if="controlData[0].PRODUCTNAME$ || !checkShow"
                      :class="{w70:checkShow}"
                      v-model="dataForm[0].PRODUCTNAME"></el-input>
                  </div>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="剂型">
                  <span class="orange" v-if="checkShow">{{showForm[0].DOSAGEFORM}}&nbsp;</span>
                  <div :class="{'price-operate-box':checkShow}">
                    <el-checkbox
                      class="orange"
                      v-model="controlData[0].DOSAGEFORM$"
                      label="变更"
                      v-if="checkShow"
                      @change="updateInput('DOSAGE',0)"></el-checkbox>
                    <el-input  v-if="controlData[0].DOSAGEFORM$ || !checkShow" :class="{w70:checkShow}" v-model="dataForm[0].DOSAGEFORM"></el-input>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="60">
              <el-col :span="12">
                <el-form-item label="规格" >
                  <span class="orange" v-if="checkShow">{{showForm[0].SPEC}}&nbsp;</span>
                  <div :class="{'price-operate-box':checkShow}">
                    <el-checkbox
                      class="orange"
                      v-model="controlData[0].SPEC$"
                      label="变更"
                      v-if="checkShow"
                      @change="updateInput('SPEC',0)"></el-checkbox>
                    <el-input  v-if="controlData[0].SPEC$ || !checkShow"  :class="{w70:checkShow}" v-model="dataForm[0].SPEC"></el-input>
                  </div>
                </el-form-item>
              </el-col>

              <el-col :span="12" >
                <el-form-item label="转换比">
                  <span class="orange" v-if="checkShow">{{showForm[0].STANDRATE}}&nbsp;</span>
                  <div :class="{'price-operate-box':checkShow}">
                    <el-checkbox
                      class="orange"
                      v-model="controlData[0].STANDRATE$"
                      label="变更"
                      v-if="checkShow"
                      @change="updateInput('STANDRATE',0)"></el-checkbox>
                    <el-input v-if="controlData[0].STANDRATE$ || !checkShow"  :class="{w70:checkShow}" v-model="dataForm[0].STANDRATE"></el-input>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="60">
              <el-col :span="12">
                <el-form-item label="单位">
                  <span class="orange" v-if="checkShow">{{showForm[0].METRIC}}&nbsp;</span>
                  <div :class="{'price-operate-box':checkShow}">
                    <el-checkbox
                      class="orange"
                      v-model="controlData[0].METRIC$"
                      label="变更"
                      v-if="checkShow"
                      @change="updateInput('METRIC',0)"></el-checkbox>
                    <el-input v-if="controlData[0].METRIC$ || !checkShow"   :class="{w70:checkShow}" v-model="dataForm[0].METRIC"></el-input>
                  </div>
                </el-form-item>
              </el-col>

              <el-col :span="12" >
                <el-form-item label="包材">
                  <span class="orange" v-if="checkShow">{{showForm[0].PACKAGING}}&nbsp;</span>
                  <div :class="{'price-operate-box':checkShow}">
                    <el-checkbox
                      class="orange"
                      v-model="controlData[0].PACKAGING$"
                      label="变更"
                      v-if="checkShow"
                      @change="updateInput('WRAP',0)"></el-checkbox>
                    <el-input v-if="controlData[0].PACKAGING$ || !checkShow"  :class="{w70:checkShow}" v-model="dataForm[0].PACKAGING"></el-input>
                  </div>
                </el-form-item>
              </el-col>

            </el-row>
          </div>
          <el-row :gutter="60" v-if="dataForm[0].PRICETYPE != '2'">
            <el-col :span="12">
              <el-form-item label="年度">
                <span class="orange" v-if="checkShow">{{showForm[0].YEARID}}&nbsp;</span>
                <div :class="{'price-operate-box':checkShow}">
                  <el-checkbox
                    class="orange"
                    v-model="controlData[0].YEARID$"
                    label="变更"
                    v-if="checkShow"
                    @change="updateInput('YEAR',0)"></el-checkbox>
                  <el-select v-if="controlData[0].YEARID$ || !checkShow" v-model="dataForm[0].YEARID" :class="{w70:checkShow,w100:!checkShow}" placeholder="请选择" size="small">
                    <el-option v-for="item in yearList"
                               :key="item.key"
                               :label="item.label"
                               :value="item.value"
                               class="fundInput">
                    </el-option>
                  </el-select>
                </div>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="省份">
                <span class="orange" v-if="checkShow">{{showForm[0].PROVINCENAME}}&nbsp;</span>
                <div :class="{'price-operate-box':checkShow}">
                  <el-checkbox
                    class="orange"
                    v-model="controlData[0].PROVINCENAME$"
                    label="变更"
                    v-if="checkShow"
                    @change="updateInput('PROVINCENAME',0)"></el-checkbox>
                  <el-select v-if="controlData[0].PROVINCENAME$ || !checkShow" v-model="dataForm[0].PROVINCENAME" :class="{w70:checkShow,w100:!checkShow}" placeholder="请选择" size="small">
                    <el-option v-for="item in provinceList"
                               :key="item.ID"
                               :label="item.NAME_CHN"
                               :value="item.ID"
                               class="fundInput">
                    </el-option>
                  </el-select>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="60" v-if="dataForm[0].PRICETYPE != '2'">
            <el-col :span="12">
              <el-form-item label="项目名称" >
                <span class="orange" v-if="checkShow">{{showForm[0].PROJECTNAME}}&nbsp;</span>
                <div :class="{'price-operate-box':checkShow}">
                  <el-checkbox
                    class="orange"
                    v-model="controlData[0].PROJECTNAME$"
                    label="变更"
                    v-if="checkShow"
                    @change="updateInput('PROJECTNAME',0)"></el-checkbox>
                  <el-input v-if="controlData[0].PROJECTNAME$ || !checkShow" :class="{w70:checkShow}" v-model="dataForm[0].PROJECTNAME"></el-input>
                </div>
              </el-form-item>
            </el-col>

            <el-col :span="12" >
              <el-form-item label="价格">
                <span class="orange" v-if="checkShow">{{showForm[0].INPRICE}}&nbsp;</span>
                <div :class="{'price-operate-box':checkShow}">
                  <el-checkbox
                    class="orange"
                    v-model="controlData[0].INPRICE$"
                    label="变更"
                    v-if="checkShow"
                    @change="updateInput('INPRICE',0)"></el-checkbox>
                  <el-input v-if="controlData[0].INPRICE$ || !checkShow" :class="{w70:checkShow,red:true}" v-model="dataForm[0].INPRICE"></el-input>
                </div>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="60" v-if="dataForm[0].PRICETYPE != '2'">
            <el-col :span="12" >
              <el-form-item label="执行日期">
                <span class="orange" v-if="checkShow">{{showForm[0].EXECUTIONDATE}}&nbsp;</span>
                <div :class="{'price-operate-box':checkShow}">
                  <el-checkbox
                    class="orange"
                    v-model="controlData[0].EXECUTIONDATE$"
                    label="变更"
                    v-if="checkShow"
                    @change="updateInput('EXECUTIONDATE',0)"></el-checkbox>
                  <el-date-picker v-if="controlData[0].EXECUTIONDATE$ || !checkShow"   type="date" v-model="dataForm[0].EXECUTIONDATE"></el-date-picker>
                </div>
              </el-form-item>
            </el-col>

            <el-col :span="12" v-if="changeCatalogArea == '2'">
              <el-form-item>
                <el-button
                  v-if="controlData[0].FILES$ || !checkShow"
                  slot="label"
                  @click="handleChooseFiles('files')">选择文件</el-button>
                <images-preview
                  :class="{w70:checkShow,w100:!checkShow}"
                  refName="files"
                  ref="imagesPreview"
                  :operate="false"
                  :imgIdListUnUnique="showfiles"
            ></images-preview>
                <div :class="{'price-operate-box':checkShow}">
                  <el-checkbox
                    class="orange"
                    v-model="controlData[0].FILES$"
                    label="变更"
                    v-if="checkShow"
                    @change="updateInput('FILES',0)"></el-checkbox>
                  <div v-if="!files.length>0" class="w100" style="height: 10px">&nbsp;</div>
                  <images-preview
                    :class="{w70:checkShow,w100:!checkShow}"
                    refName="files"
                    ref="imagesPreview"
                    :imgIdListUnUnique="files"
                    @imgIdListChange="uploadList"></images-preview>
                </div>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="60" v-if="dataForm[0].PRICETYPE == '1'">
            <el-col :span="8">
              <el-form-item label="计算方法">
                <span class="orange" v-if="checkShow">{{showForm[0].METHOD}}&nbsp;</span>
                <div :class="{'price-operate-box':checkShow}">
                  <el-checkbox
                    class="orange"
                    v-model="controlData[0].METHOD$"
                    label="变更"
                    v-if="checkShow"
                    @change="updateInput('METHOD',0)"></el-checkbox>
                  <el-select                   v-if="controlData[0].METHOD$ || !checkShow" v-model="dataForm[0].METHOD" size="small">
                    <el-option v-for="item in methodList"
                               :key="item.key"
                               :label="item.label"
                               :value="item.value"
                               class="fundInput">
                    </el-option>
                  </el-select>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <div class="lh32"><a class="blue" src="">查看取值方法</a></div>
            </el-col>
            <el-col :span="12">
              <el-form-item label="计算价格">
                <span class="orange" v-if="checkShow">{{showForm[0].CALCULATEPRICE}}&nbsp;</span>
                <div :class="{'price-operate-box':checkShow}">
                  <el-checkbox
                    class="orange"
                    v-model="controlData[0].CALCULATEPRICE$"
                    label="变更"
                    v-if="checkShow"
                    @change="updateInput('CALCULATEPRICE',0)"></el-checkbox>
                  <el-input v-if="controlData[0].CALCULATEPRICE$ || !checkShow" :class="{w70:checkShow,red:true}" v-model="dataForm[0].CALCULATEPRICE"></el-input>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <div v-if="changeCatalogArea == '2' || changeCatalogArea == '3'">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item :class="{'is-error':accountFlag}"  label="日服用折算价格">
                <span class="orange" v-if="checkShow">{{showForm[0].DISCOUNTPRICE}}&nbsp;</span>
                <div :class="{'price-operate-box':checkShow}">
                  <el-checkbox
                    class="orange"
                    v-model="controlData[0].DISCOUNTPRICE$"
                    label="变更"
                    v-if="checkShow"
                    @change="updateInput('DISCOUNTPRICE',0)"></el-checkbox>
                  <el-input
                    v-if="controlData[0].DISCOUNTPRICE$ || !checkShow"
                    :class="{w70:checkShow}"
                    @blur="judgePrice"
                    v-model="dataForm[0].DISCOUNTPRICE"></el-input>
                  <div v-if="accountFlag" class="el-form-item__error">
                    {{accountTip}}
                  </div>
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
            <el-col :span="4">
              <el-form-item label="省份:">{{item.PROVINCENAME}}</el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item class="acc-price-label" label="项目名称：
">
                <span class="orange" v-if="checkShow">{{showForm[index].PROJECTNAME}}</span>
                <div :class="{'thp-operate-box':checkShow}">
                  <el-checkbox
                    class="orange"
                    v-model="threeProvinceControl[index].PROJECTNAME$"
                    label="变更"
                    v-if="checkShow"
                    @change="updateInput('PROJECTNAME',index)"></el-checkbox>
                  <el-input v-if="threeProvinceControl[index].PROJECTNAME$ || !checkShow"  :class="{w50:checkShow}"  v-model="item.PROJECTNAME"></el-input>
                </div>
              </el-form-item>
            </el-col>

            <el-col :span="7">
              <el-form-item class="acc-price-label" label="中标价：
">
                <span class="orange" v-if="checkShow">{{showForm[index].INPRICE}}</span>
                <div :class="{'thp-operate-box':checkShow}">
                  <el-checkbox
                    class="orange"
                    v-model="threeProvinceControl[index].INPRICE$"
                    v-if="checkShow"
                    label="变更"
                    @change="updateInput('INPRICE',index)"></el-checkbox>
                  <el-input v-if="threeProvinceControl[index].INPRICE$ || !checkShow" :class="{w50:checkShow}" v-model="item.INPRICE"></el-input>
                </div>
              </el-form-item>
            </el-col>

            <el-col :span="6" >
              <el-form-item class="acc-price-label" label="执行日期:">
                <span class="orange" v-if="checkShow">{{showForm[index].EXECUTIONDATE}}</span>
                <div :class="{'thp-operate-box':checkShow}">
                  <el-checkbox
                    class="orange"
                    v-model="threeProvinceControl[index].EXECUTIONDATE$"
                    label="变更"
                    v-if="checkShow"
                    @change="updateInput('EXECUTIONDATE',index)"></el-checkbox>
                  <el-date-picker
                    v-if="threeProvinceControl[index].EXECUTIONDATE$ || !checkShow"
                    class="width-90"  type="date" v-model="item.EXECUTIONDATE"></el-date-picker>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="说明" prop="REMARK">
              <span class="orange" v-if="checkShow">{{showForm[0].REMARK}}&nbsp;</span>
              <div :class="{'price-operate-box':checkShow}">
                <el-checkbox
                  class="orange"
                  v-model="controlData[0].REMARK$"
                  label="变更"
                  v-if="checkShow"
                  @change="updateInput('REMARK',0)"></el-checkbox>
                <el-input  v-if="controlData[0].REMARK$ || !checkShow" :class="{w70:checkShow}" placeholder="原全国最低价变更说明或计算价格参考说明" type="textarea" :rows="3" v-model="dataForm[0].REMARK"></el-input>
              </div>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row  :gutter="60"  v-if="changeCatalogArea == '2'">
          <images-preview
            :class="{w70:checkShow,w100:!checkShow}"
            style="width: 100%"
            refName="files"
            ref="imagesPreview"
            :operate="false"
            :imgIdListUnUnique="showFiles"></images-preview>
        </el-row>
        <el-row  :gutter="60"  v-if="changeCatalogArea == '2'">
          <el-col :span="12">
            <el-form-item>
              <el-button
                v-if="controlData[0].FILES$ || !checkShow"
                slot="label"
                @click="handleChooseFiles('files')">上传图片</el-button>
              <div :class="{'price-operate-box':checkShow}">
                <el-checkbox
                  class="orange"
                  v-model="controlData[0].FILES$"
                  label="变更"
                  v-if="checkShow"
                  @change="updateInput('FILES',0)"></el-checkbox>
                <div v-if="!files.length>0" class="w100" style="height: 10px">&nbsp;</div>
                <images-preview
                  :class="{w70:checkShow,w100:!checkShow}"
                  style="width: 100%"
                  refName="files"
                  ref="imagesPreview"
                  :imgIdListUnUnique="files"
                  @imgIdListChange="uploadList"></images-preview>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <span>
            <h4>项目名称应包括项目年度和省份名称，请按照各省公布的标准项目录名称录入。   最低价请如实、谨慎填写，注意不同规格包装间的合理比价关系！</h4>
        </span>
        <hr>
        <div  v-if="dataForm[0].PRICETYPE != '2'">
          <div class="el-dialog__title space-30">北京承诺供应价申报</div>
          <div v-if="showForm[0].REFERENCEPRICE" class="orange">
            <strong>本市承诺以成交参考价</strong>
            <span>{{showForm[0].REFERENCEPRICE}}</span>
            <strong>元供应北京市场</strong>
          </div>
          <div>
            <strong>本市承诺以成交参考价</strong>
            <el-input size="small" class="width-90 red" v-model="dataForm[0].DEALPRICE"></el-input>
            <strong>元供应北京市场</strong>
          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button type="primary" size="small" :disabled="submitFlag" @click="submit">确定</el-button>
      <el-button class="el-button-pale" size="small" @click="goBack">关闭</el-button>
    </span>
      <choose-files ref="chooseFiles" v-if="dialogVisible" @handleSelectedFolder="selectedData"></choose-files>
    </el-dialog>
</template>
<script>
  import {findFilesById, returnYearList} from 'src/axios/auditchanges/common/catProduct'
  import {queryPROVINCE} from 'src/axios/auditchanges/messageDeclare/product'
  import {
    declareDataShow,
    submitDeclareData,
    getShowPriceFiles} from "src/axios/auditchanges/messageChanges/priceManage"
  import {priceFormat,dateFormatter} from "src/utils/index"
  import {isNumber} from "src/utils/validateUtil"
  import {checkPriceControl} from "src/axios/auditchanges/common/nestedJson"
  import imagesPreview from 'src/pages/auditchanges/common/imagesPreview'
  import chooseFiles from 'src/pages/auditchanges/common/chooseFiles';
  export default {
    name:'priceManage',
    components:{
      imagesPreview,
      chooseFiles
    },
    data(){
      return{
        visible:true,
        dialogVisible:false,
        changeCatalogAreaName:'西药竞价谈判目录',
        changeCatalogArea:'3',
        priceTypeDefault:'3',//用于存储原本的价格类型=>显示变更按钮
        showForm:this.metaShowForm(),
        dataForm: this.metaDataForm(),//提交数据
        controlData: this.metaControlForm(),//多选按钮
        accountFlag:false,//校验日服用价格是否符合
        accountTip:'',
        quoteAbove:'1',
        files:[],
        showFiles:[],
        productId:'',
        threeProvincePrice:this.threeProvincePriceInit(),
        threeProvinceControl:this.threeProvinceControlInit(),
        yearList: [],
        provinceList: [],
        submitFlag: false,//提交按钮是否可用
        catalogAreaList: [
          {key: "0", value: "0", label: "西药竞价谈判目录",disabled:false},
          {key: "1", value: "1", label: "中药竞价谈判目录",disabled:false},
          {key: "2", value: "2", label: "西药低价药品目录",disabled:false},
          {key: "3", value: "3", label: "中药低价药品目录",disabled:false},
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
        checkShow:false,
      }
    },
    created () {
      this.yearList = returnYearList();
      this.queryProvince()
    },
    methods:{
      threeProvincePriceInit(){
        return [
          {
            PROVINCENAME:'北京',
            PROVINCEID:'',
            PROJECTNAME:'',
            PRICE:'',
            EXECUTIONDATE:''
          },
          {
            PROVINCENAME:'天津',
            PROVINCEID:'',
            PROJECTNAME:'',
            PRICE:'',
            EXECUTIONDATE:''
          },
          {
            PROVINCENAME:'河北省',
            PROVINCEID:'',
            PROJECTNAME:'',
            PRICE:'',
            EXECUTIONDATE:''
          }
        ]
      },
      threeProvinceControlInit(){
        return[
          {
            PROVINCEID$:'',
            PROJECTNAME$:'',
            PRICE$:'',
            EXECUTIONDATE$:''
          },
          {
            PROVINCEID$:'',
            PROJECTNAME$:'',
            PRICE$:'',
            EXECUTIONDATE$:''
          },
          {
            PROVINCEID$:'',
            PROJECTNAME$:'',
            PRICE$:'',
            EXECUTIONDATE$:''
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
      metaShowForm(){
        return [{
          PROJECTNAME: '',
          CALCULATEPRICE: '',
          PROVINCE: '',
          PRICETYPE: '0',
          REMARK: '',
          PRICE: '',
          YEAR: '',
          METHOD: '',
          EXECUTIONDATE: '',
          ID:'',
          DISCOUNTPRICE:'',
          PRODUCT: '',
          TRADE: '',
          DOSAGE: '',
          SPEC: '',
          STANDRATE: '',
          METRIC: '',
          WRAP:'',
          MANUFACTURE: '',
          CATALOGAREANAME:'',
          CATALOGAREA:''
        }]
      },
      metaDataForm() {
        return [{
          PRODUCTID:'',
          PROJECTNAME:'',
          CALCULATEPRICE:'',
          PROVINCEID:'',
          PRICETYPE:'',
          REMARK:'',
          PACKAGING:'',
          INPRICE:'',
          YEARID:'',
          METHOD:'',
          PRICE:'',
          EXECUTIONDATE:'',
          SPEC:'',
          METRIC:'',
          DISCOUNTPRICE:'',
          STANDRATE:'',
          REFERENCEPRICE:'',
          PRODUCTNAME:'',
          DOSAGEFORM:'',
          CATALOGAREA:''
        }]
      },//提交数据
      metaControlForm() {
        return [{
          PRODUCTID$:'',
          PROJECTNAME$:'',
          CALCULATEPRICE$:'',
          PROVINCEID$:'',
          PRICETYPE$:'',
          REMARK$:'',
          PACKAGING$:'',
          INPRICE$:'',
          YEARID$:'',
          METHOD$:'',
          PRICE$:'',
          EXECUTIONDATE$:'',
          SPEC$:'',
          METRIC$:'',
          DISCOUNTPRICE$:'',
          STANDRATE$:'',
          REFERENCEPRICE$:'',
          PRODUCTNAME$:'',
          DOSAGEFORM$:'',
          CATALOGAREA$:''
        }]
      },
      async list(productId){
        this.visible = true;
        this.productId = productId;
       await declareDataShow(productId).then(res =>{
          this.changeCatalogArea = res.data[0].CATALOGAREA;
          this.priceTypeDefault = res.data[0].PRICETYPE;
          this.dataForm[0].PRICETYPE = res.data[0].PRICETYPE;
          this.showForm = res.data;
        })
        await getShowPriceFiles(productId).then(res =>{
          this.showFiles =  res.data
        })

        this.checkShow = (this.priceTypeDefault == this.dataForm[0].PRICETYPE)

      },
      queryProvince(){
         queryPROVINCE().then(res => {
          this.provinceList = res.data;
          this.provinceList.forEach(item =>{
            this.threeProvincePrice.forEach(x =>{
              if(x.PROVINCENAME == item.NAME_CHN){
                x.PROVINCE = item.ID;
              }
            })
          })
        })
      },
      watchPriceType(val){
        if(val === '2'){
          this.dataForm = this.metaDataForm();
          this.$set(this.dataForm[0],'PRICETYPE','2')
        }
        this.checkShow = (this.priceTypeDefault == this.dataForm[0].PRICETYPE)
      },
      makeDataFrame(resData,dataName){
        if(resData.length > 0) {
          dataName = resData;
          let indexArr = [];
          this.showForm.forEach((item,index)=>{
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
          for(let  i = 0 ; i < indexArr.length ; i ++){
            dataName.splice(indexArr[i],0,{'ID':this.showForm[indexArr[i]].ID})
          }

        }else{
          this.showForm.forEach((item,index)=>{
            dataName[index].ID = item.ID;
          });
        }
        return dataName
      },
      updateInput(filed,index) {
//        if(this.catalogArea == '2' || this.catalogArea == '3') {
//          if(filed == 'DISCOUNTPRICE'){
//            this.dataForm.forEach((item,index) =>{
//              delete item.DISCOUNTPRICE
//              this.$set(this.fileForm[index],filed, [])
//            })
//          }
//        }
//        this.dataForm.forEach((item,itemIndex) =>{
//          if(itemIndex == index ){
//            delete item[filed]
//          }
//        })
//        this.$set(this.dataForm[index], filed, [])

      },
      handleChooseFiles(refName) {
        const tis = this;
        tis.dialogVisible = true;
        this.$nextTick(() => {
          this.$refs.chooseFiles.initData(refName);
        })
      },
      selectedData(res){
        res.data.forEach(item => {
          this.files.push(item)
        });
      },
      uploadList(res){
        this.files = res.data
      },
      goBack(){
        this.dataForm = this.metaDataForm();
        this.visible = false;
      },
      submit(){

       let check = checkPriceControl(this.dataForm, this.controlData);
        if (!check) {
          this.$message({
            message: '请填写所有变更项',
            type: 'warning'
          });
          this.submitFlag = false;

          return;
        }
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
          });
        }
      },
    }
  }
</script>
