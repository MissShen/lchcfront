<template>
  <el-dialog
    width="90%"
    title="全国省级最低中标价申报"
    :close-on-click-modal="false"
    :visible.sync="visible"
    @close="goBack"
    append-to-body>
    <el-form ref="dataForm"  class="form-view nomar gap-40" inline label-width="130px" size="small" label-position="left">
      <!--从变更进来的-->
      <el-row :gutter="60">
        <el-col :span="12">
          <el-form-item label="目录范围">
            <span>{{catalogAreaName}}</span>
            <el-select class="gap-40" v-model="dataForm[0].CATALOGAREA" placeholder="请选择">
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
      <hr>
      <!--文本回显-->
      <el-row :gutter="60">
        <el-col :span="12">
          <el-form-item label="价格类型" class="audit-declare-radio">
            <span>{{{'0':'全国最低中标价','1':'计算价格','2':'无最低中标价','3':'京津冀三地价格'}[showForm[0].PRICETYPE]}}&nbsp;</span>
          </el-form-item>
        </el-col>
      </el-row>
      <hr class="marbottom15">
      <div v-if="showForm[0].CATALOGAREA == '0' || showForm[0].CATALOGAREA == '1'">
        <div v-if="showForm[0].PRICETYPE === '1'">
          <el-row :gutter="60">
            <el-col :span="12">
              <el-form-item label="产品名称" >
                <span>{{showForm[0].PRODUCTNAME}}&nbsp;</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="剂型">
                <span>{{showForm[0].DOSAGEFORM}}&nbsp;</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="12">
              <el-form-item label="规格" >
                <span>{{showForm[0].SPEC}}&nbsp;</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="转换比">
                <span>{{showForm[0].STANDRATE}}&nbsp;</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="12">
              <el-form-item label="单位">
                <span>{{showForm[0].METRIC}}&nbsp;</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="包材">
                <span>{{showForm[0].PACKAGING}}&nbsp;</span>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-row :gutter="60" v-if="showForm[0].PRICETYPE != '2'">
          <el-col :span="12">
            <el-form-item label="年度">
              <span>{{showForm[0].YEARID}}&nbsp;</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="省份">
              <span>{{showForm[0].PROVINCENAME}}&nbsp;</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="60" v-if="showForm[0].PRICETYPE != '2'">
          <el-col :span="12">
            <el-form-item label="项目名称">
              <span>{{showForm[0].PROJECTNAME}}&nbsp;</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item label="价格" prop="PRICE">
              <span>{{showForm[0].INPRICE }}&nbsp;</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="60" v-if="showForm[0].PRICETYPE != '2'">
          <el-col :span="12" >
            <el-form-item label="执行日期" prop="EXECUTIONDATE">
              <span>{{showForm[0].EXECUTIONDATE}}&nbsp;</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label=" ">
              <images-preview
                ref="imagesPreview"
                :operate="false" :imgIdListUnUnique="showFiles"
                ></images-preview>
              &nbsp;
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="60" v-if="showForm[0].PRICETYPE == '1'">
          <el-col :span="8">
            <el-form-item label="计算方法">
              <span>{{showForm[0].METHOD}}&nbsp;</span>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <div class="lh32"><a class="blue" src="">查看取值方法</a></div>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计算价格">
              <span>{{showForm[0].CALCULATEPRICE}}&nbsp;</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="60" v-if="showForm[0].PRICETYPE != '2'">
          <el-col :span="12">
            <el-form-item label="说明">
              <span>{{showForm[0].REMARK}}&nbsp;</span>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div v-if="showForm[0].CATALOGAREA == '2' || showForm[0].CATALOGAREA == '3'">
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="日服用折算价格">
              <span>{{showForm[0].DISCOUNTPRICE}}&nbsp;</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col class="marbottom15" :span="12" >
            <el-form-item label="价格类型">
              <span>京津冀三地报价</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24" v-for="(item,index) in showForm" :key="index">
          <el-col :span="4">
            <el-form-item class="acc-price-label" label="省份:">{{item.PROVINCENAME}}&nbsp;</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item class="acc-price-label" label="项目名称：
">
              <span>{{item.PROJECTNAME}}&nbsp;</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item class="acc-price-label" label="中标价：
">
              <span>{{item.INPRICE}}&nbsp;</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item class="acc-price-label" label="执行日期:">
              <span>{{item.EXECUTIONDATE}}&nbsp;</span>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <hr>
      <div  v-if="showForm[0].PRICETYPE != '2'">
        <div class="el-dialog__title space-30">北京承诺供应价申报</div>
        <strong>本市承诺以成交参考价</strong>
        <span class="red">{{priceFormat(showForm[0].REFERENCEPRICE )}}</span>
        <strong>元供应北京市场</strong>
      </div>


<!--操作-->
      <div class="space-40" v-if="dataForm[0].CATALOGAREA == '0' || dataForm[0].CATALOGAREA == '1'">
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
        <div v-if="dataForm[0].PRICETYPE === '1'">
          <el-row :gutter="60">
            <el-col>
              <el-form-item >
                <h4 slot="label">代表品信息</h4>&nbsp;
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="12">
              <el-form-item label="产品名称" >
                <el-input  v-model="dataForm[0].PRODUCTNAME"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="剂型">
                <el-input  v-model="dataForm[0].DOSAGEFORM"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="12">
              <el-form-item label="规格" >
                <el-input  v-model="dataForm[0].SPEC"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="转换比">
                <el-input  v-model="dataForm[0].STANDRATE"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="12">
              <el-form-item label="单位">
                <el-input  v-model="dataForm[0].METRIC"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" >
              <el-form-item label="包材">
                <el-input  v-model="dataForm[0].PACKAGING"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <hr class="marbottom15">
        <el-row :gutter="60" v-if="dataForm[0].PRICETYPE != '2'">
          <el-col :span="12">
            <el-form-item label="年度">
              <el-select v-model="dataForm[0].YEARID" placeholder="请选择" size="small" class="w100">
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
            <el-form-item label="省份">
              <el-select v-model="dataForm[0].PROVINCEID" placeholder="请选择" size="small" class="w100">
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
        <el-row :gutter="60" v-if="dataForm[0].PRICETYPE != '2'">
          <el-col :span="12">
            <el-form-item label="项目名称">
              <el-input v-model="dataForm[0].PROJECTNAME"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item label="价格" prop="PRICE">
              <el-input class="red" v-model="dataForm[0].INPRICE"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="60" v-if="dataForm[0].PRICETYPE != '2'">
          <el-col :span="12" >
            <el-form-item label="执行日期" prop="EXECUTIONDATE">
              <el-date-picker type="date" v-model="dataForm[0].EXECUTIONDATE"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-button
                slot="label"
                @click="handleChooseFiles('files')">上传图片</el-button>
              <div v-if="!files.length>0" class="w100" style="height: 10px">&nbsp;</div>
              <images-preview
                style="width: 100%"
                refName="files"
                ref="imagesPreview"
                :imgIdListUnUnique="files"
                @imgIdListChange="uploadList"></images-preview>

            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="60" v-if="dataForm[0].PRICETYPE == '1'">
          <el-col :span="8">
            <el-form-item label="计算方法" prop="METHOD" data-max="100" ref="METHOD">
              <el-select v-model="dataForm[0].METHOD" size="small">
                <el-option v-for="item in methodList"
                           :key="item.key"
                           :label="item.label"
                           :value="item.value"
                           class="fundInput">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <div class="lh32"><a class="blue" src="">查看取值方法</a></div>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计算价格">
              <el-input class="red"  v-model="dataForm[0].CALCULATEPRICE"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div v-if="dataForm[0].CATALOGAREA == '2' || dataForm[0].CATALOGAREA == '3'">
        <hr class="marbottom15">
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item :class="{'is-error':accountFlag}"  label="日服用折算价格：
">
              <el-input @blur="judgePrice"  v-model="dataForm[0].DISCOUNTPRICE"></el-input>
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
          <el-col :span="4">
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
              <el-input v-model="item.INPRICE"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item class="acc-price-label" label="执行日期:">
              <el-date-picker class="" type="date" v-model="item.EXECUTIONDATE"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <el-row :gutter="60" v-if="dataForm[0].PRICETYPE != '2'">
        <el-col :span="(dataForm[0].CATALOGAREA == '2' || dataForm[0].CATALOGAREA == '3')?9:12">
          <el-form-item label="说明" prop="REMARK">
            <el-input placeholder="原全国最低价变更说明或计算价格参考说明" type="textarea" :rows="3" v-model="dataForm[0].REMARK"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="dataForm[0].CATALOGAREA == '2' || dataForm[0].CATALOGAREA == '3'">
        <el-col :span="12">
          <el-form-item>
            <el-button
              slot="label"
              @click="handleChooseFiles('files')">上传图片</el-button>
            <div v-if="!files.length>0" class="w100" style="height: 10px">&nbsp;</div>
            <images-preview
              style="width: 100%"
              refName="files"
              ref="imagesPreview"
              :imgIdListUnUnique="files"
              @imgIdListChange="uploadList"></images-preview>

          </el-form-item>
        </el-col>
      </el-row>
      <span>
            <h4>项目名称应包括项目年度和省份名称，请按照各省公布的标准项目录名称录入。   最低价请如实、谨慎填写，注意不同规格包装间的合理比价关系！</h4>
        </span>
      <hr>
      <div  v-if="dataForm[0].PRICETYPE != '2'">
        <div class="el-dialog__title space-30">北京承诺供应价申报</div>
        <strong>本市承诺以成交参考价</strong>
        <el-input size="small" class="width-90 red" v-model="dataForm[0].REFERENCEPRICE"></el-input>
        <strong>元供应北京市场</strong>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" size="small"  @click="submit" :disabled="submitFlag">确定</el-button>
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
  import imagesPreview from 'src/pages/auditchanges/common/imagesPreview'
  import chooseFiles from 'src/pages/auditchanges/common/chooseFiles';
  export default {
    name:'priceManage',
    props:{
      changeFlag:{
        default:function () {
          return false
        }
      }
    },
    components:{
      imagesPreview,
      chooseFiles
    },
    data(){
      return{
        visible:true,
        dialogVisible:false,
        catalogAreaName:'',
        productId:"",
        catalogAreaChange:'0',
        files:[],
        showFiles:[],
        showForm:this.metaShowForm(),
        dataForm: this.metaDataForm(),//提交数据
        catalogAreaList: [
          {key: "0", value: "0", label: "西药竞价谈判目录",disabled:false},
          {key: "1", value: "1", label: "中药竞价谈判目录",disabled:false},
          {key: "2", value: "2", label: "西药低价药品目录",disabled:false},
          {key: "3", value: "3", label: "中药低价药品目录",disabled:false}
        ],
        accountFlag:false,//校验日服用价格是否符合
        accountTip:'',
        quoteAbove:'1',
        threeProvincePrice:this.threeProvincePriceInit(),
        yearList: [],
        provinceList: [],
        submitFlag: false,//提交按钮是否可用
        methodList: [
          {key: "0", value: "其他", label: "其他"},
          {key: "1", value: "计算方法一", label: "计算方法一"},
          {key: "2", value: "计算方法二", label: "计算方法二"},
          {key: "3", value: "计算方法三", label: "计算方法三"},
          {key: "4", value: "计算方法四", label: "计算方法四"},
          {key: "5", value: "计算方法五", label: "计算方法五"},
          {key: "6", value: "计算方法六", label: "计算方法六"}
        ],
      }
    },
    created () {
      this.yearList = returnYearList();
      this.queryProvince()
    },
    methods:{
      priceFormat,
      threeProvincePriceInit(){
        return [
          {
            PROVINCENAME:'北京',
            PROVINCE:'',
            PROJECTNAME:'',
            INPRICE:'',
            EXECUTIONDATE:'',
            DISCOUNTPRICE:'',
            REFERENCEPRICE:'',
            REMARK:''
          },
          {
            PROVINCENAME:'天津',
            PROVINCE:'',
            PROJECTNAME:'',
            INPRICE:'',
            EXECUTIONDATE:'',
            DISCOUNTPRICE:'',
            REFERENCEPRICE:'',
            REMARK:''
          },
          {
            PROVINCENAME:'河北省',
            PROVINCE:'',
            PROJECTNAME:'',
            INPRICE:'',
            EXECUTIONDATE:'',
            DISCOUNTPRICE:'',
            REFERENCEPRICE:'',
            REMARK:''
          }
        ]
      },
      judgePrice(){
        let tis = this;
        function init() {
          tis.accountFlag = false;
          tis.accountTip = ''
        }
        if(isNumber(this.dataForm[0].DISCOUNTPRICE)){
          init()
//          this.accountPrice = Number(this.accountPrice).toFixed(2);
          if(this.dataForm[0].CATALOGAREA == '2' && this.dataForm[0].DISCOUNTPRICE > 3.00){
            this.accountFlag = true;
            this.accountTip = '日服用折算价格不能大于3'
          }else if(this.dataForm[0].CATALOGAREA == '2' && this.dataForm[0].DISCOUNTPRICE < 3.00){
            init()
          }

          if(this.dataForm[0].CATALOGAREA == '3' && this.dataForm[0].DISCOUNTPRICE > 5.00){
            this.accountFlag = true;
            this.accountTip = '日服用折算价格不能大于5'
          }else if(this.dataForm[0].CATALOGAREA == '3' && this.dataForm[0].DISCOUNTPRICE < 5.00){
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
      },
      list(productId){
        this.visible = true;
        this.productId = productId;
        declareDataShow(productId).then(res =>{
          let oldVal = res.data[0].CATALOGAREA;
          let newVal = null;
          oldVal>1?newVal = oldVal-2:newVal = parseInt(oldVal) + 2;
          this.catalogAreaList.forEach(item=>{
            if(item.value == oldVal){
              this.catalogAreaName = item.label
            }
            if(item.key!=newVal){
              item.disabled = true;
            }
          })
          this.catalogAreaChange = newVal+'';
          this.dataForm[0].CATALOGAREA = newVal+'';
          this.showForm = res.data;


        })
        getShowPriceFiles(productId).then(res =>{
          this.showFiles =  res.data
        })
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
          this.dataForm[0].CATALOGAREA = this.catalogAreaChange;
        }
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
        this.files =  res.data
      },
      goBack(){
        this.dataForm = this.metaDataForm();
        this.visible = false;
        this.submitFlag = false;
      },
      submit(){
        this.submitFlag =  true;
        if(this.catalogAreaChange == '2' || this.catalogAreaChange == '3'){
          let thp = this.dataForm;
          this.threeProvincePrice.forEach(item=>{
            item.DISCOUNTPRICE = thp[0].DISCOUNTPRICE;
            item.REFERENCEPRICE = thp[0].REFERENCEPRICE;
            item.REMARK = thp[0].REMARK;
            item.CATALOGAREA = this.catalogAreaChange;
          })
          this.dataForm = this.threeProvincePrice
        }

        this.dataForm.forEach(item=>{
          item.EXECUTIONDATE = item.EXECUTIONDATE?dateFormatter(item.EXECUTIONDATE).split(' ')[0]:'';
          for(let x in item){
            if(!item[x]){
              delete item[x]
            }
          }
        })

        submitDeclareData(this.dataForm,this.files).then(res=>{
          this.submitUseIf(res)
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
          });
        }
      },
    }
  }
</script>
