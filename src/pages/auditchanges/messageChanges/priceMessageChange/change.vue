<template>
  <el-dialog
    title="价格变更"
    :close-on-click-modal="false"
    :visible.sync="visible"
    @before-close="initValidate"
    append-to-body
    class="audit-dialog"
    :id="changeId"
  >
    <div v-if="visible">
      <div class="main audit-main">
        <ul class="side side-init" id="product-change-view-side">
          <li v-for="(nodeItem,index) in nodesPosition" :key="index"><a @click="changeScrollHeight(nodeItem.nodePosition,changeId,'jump-pro-change-view',index)"
                 class="d_jump jump-pro-change-view">{{nodeItem.itemName}}</a></li>
        </ul>
        <div class="right-box">
          <div class="tableset audit-info">
            <el-form id="product-change-audit"
                     ref="dataForm"
                     label-width="150px"
                     size="small"
                     label-position="left">
              <h3 class="cpjc">产品基础信息</h3>
              <div>
                <el-row :gutter="24">
                  <el-col :span="12">
                    <el-form-item label="产品名称:">
                      <span>{{resData.product}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="剂型:">
                      <span>{{resData.dosage}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="12">
                    <el-form-item label="商品名:">
                      <span>{{resData.trade}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="转换比:">
                      <span>{{resData.standRate}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="12">
                    <el-form-item label="规格:">
                      <span>{{resData.spec}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="单位:">
                      <span>{{resData.metric}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="12">
                    <el-form-item label="包材:">
                      <span>{{resData.wrap}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="生产企业:">
                      <span>{{resData.manufacture}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <h3 class="jgxx">价格信息</h3>
              <el-row class="audit-item-box">
                <el-col :span="24">
                  <el-form-item label="目录范围">
                    <span>{{catalogAreaName}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="">
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
              <div v-if="catalogArea == '0' || catalogArea == '1'">
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

              <div v-if="catalogArea == '2' || catalogArea == '3'">
                <el-row class="audit-item-box" :gutter="24">
                  <el-col :span="9">
                    <el-form-item  label="日服用折算价格：">
                      <span>{{showForm[0].DISCOUNTPRICE}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col class="marbottom15" :span="12" >
                    <span>京津冀三地报价</span>
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
              <el-form-item  label="目录范围">
                <el-select v-model="dataForm[0].CATALOGAREA" placeholder="请选择">
                  <el-option
                    v-for="item in catalogAreaList"
                    :key="item.key"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled">
                  </el-option>
                </el-select>
              </el-form-item>
              <div v-if="dataForm[0].CATALOGAREA == '0' || dataForm[0].CATALOGAREA == '1'">
                <el-row :gutter="24">
                  <el-col :span="24">
                    <el-form-item label="价格类型" class="audit-declare-radio" prop="PRICETYPE" data-max="unlimited" ref="PRICETYPE">
                      <el-radio-group
                        @change="updateDataForm"
                        v-model="dataForm[0].PRICETYPE">
                        <el-radio  label="0">全国最低中标价</el-radio>
                        <el-radio  label="1">计算价格</el-radio>
                        <el-radio  label="2">无最低中标价</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24" v-if="dataForm[0].PRICETYPE && dataForm[0].PRICETYPE != '2'">
                  <el-col :span="12">
                    <el-form-item label="年度" prop="YEAR" data-max="unlimited" ref="YEAR">
                      <el-select v-model="dataForm[0].YEAR" placeholder="请选择" size="small" class="w100">
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
                      <el-select v-model="dataForm[0].PROVINCE" placeholder="请选择" size="small" class="w100">
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
                <el-row :gutter="24" v-if="dataForm[0].PRICETYPE && dataForm[0].PRICETYPE!='2'">
                  <el-col :span="12">
                    <el-form-item label="项目名称" prop="PROJECTNAME" data-max="200" ref="PROJECTNAME">
                      <el-input v-model="dataForm[0].PROJECTNAME"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" v-if="dataForm[0].PRICETYPE == '0'">
                    <el-form-item label="中标价" prop="PRICE">
                      <el-input v-model="dataForm[0].PRICE"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" v-if="dataForm[0].PRICETYPE == '1'">
                    <el-form-item label="代表品装量规格" prop="REPRESENTATIVESPEC" data-max="100" ref="REPRESENTATIVESPEC">
                      <el-input v-model="dataForm[0].REPRESENTATIVESPEC"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24" v-if="dataForm[0].PRICETYPE == '1'">
                  <el-col :span="12">
                    <el-form-item label="代表品价格" prop="REPRESENTATIVEPRICE"  data-mustNum="true" data-max="unlimited" ref="REPRESENTATIVEPRICE">
                      <el-input v-model="dataForm[0].REPRESENTATIVEPRICE"></el-input>
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
                      <el-input v-model="dataForm[0].REPRESENTATIVEPACKAGING"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24" v-if="dataForm[0].PRICETYPE == '1'">
                  <el-col :span="12">
                    <el-form-item label="计算方法" prop="METHOD" data-max="100" ref="METHOD">
                      <el-select v-model="dataForm[0].METHOD" size="small" class="w100">
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
                    <div class="lh32"><a class="blue">查看取值方法</a></div>
                  </el-col>
                </el-row>
                <el-row :gutter="24" v-if="dataForm[0].PRICETYPE == '1'">
                  <el-col :span="12">
                    <el-form-item label="计算价格" prop="CALCULATEPRICE" data-mustNum="true" data-max="unlimited" ref="CALCULATEPRICE">
                      <el-input v-model="dataForm[0].CALCULATEPRICE"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24" v-if="dataForm[0].PRICETYPE == '1'">
                  <el-col :span="12">
                    <el-form-item label="备注" prop="REMARK" data-maxx="2000" ref="REMARK">
                      <el-input type="textarea" :rows="3" v-model="dataForm[0].REMARK"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24" v-if="dataForm[0].PRICETYPE == '0'">
                  <el-col :span="12">
                    <el-form-item label="执行日期" prop="EXECUTIONDATE">
                      <el-date-picker type="date" v-model="dataForm[0].EXECUTIONDATE"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <div v-if="dataForm[0].CATALOGAREA == '2' || dataForm[0].CATALOGAREA == '3'">
                <el-row :gutter="24">
                  <el-col :span="9">
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
              <span>
            <h3>项目名称应包括项目年度和省份名称，请按照各省公布的标准项目录名称录入。   最低价请如实、谨慎填写，注意不同规格包装间的合理比价关系！</h3>
            </span>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" type="primary" :disabled="submitFlag" @click="submit">提交</el-button>
      <el-button size="small" @click="goBack">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import {checkControl} from 'src/axios/auditchanges/common/nestedJson'
  import {selectControl, returnYearList} from 'src/axios/auditchanges/common/catProduct'
  import priceBasics from 'src/pages/auditchanges/common/priceDetailCommon/priceBasics'
  import {findById, findFinalBasicPrice, findShowProduct, submitData} from 'src/axios/auditchanges/messageChanges/price'
  import {queryPROVINCE} from 'src/axios/auditchanges/messageDeclare/product'
  import {boxScroll} from "src/components/mixins/scrolls"
  import {changeToBite,isNumber} from 'src/utils/validateUtil'
  import {dateFormatter} from 'src/utils/index'

  export default {
    mixins:[boxScroll],
    props: {
      changeId: {
        type: String,
        default: 'productChangeBox'
      }
    },
    components: {
      priceBasics
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
        resData: {},
        visible: false,
        id: '',
        changeFlag: true,
        dataForm: this.metaDataForm(),
        showForm: this.metaShowForm(),
        submitFlag: false,//提交按钮是否可用
        controlData: this.metaControlData(),
        nodesPosition: [
          {itemName: '基础信息', nodePosition: null, itemAbb: 'cpjc'},
          {itemName: '价格信息', nodePosition: null, itemAbb: 'jgxx'}
        ],
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
        rules:{
          yearId:{require:false,validator:yearAndPro,trigger:'change'},
          provinceId:{require:false,validator:yearAndPro,trigger:'change'},
          projectName:{require:false,validator:changeBiteRep,trigger:'blur'},
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
        },
        catalogAreaName:'',
        catalogArea:'',
        accountTip:'',
        quoteAbove:'1',
        accountFlag:false,//校验日服用价格是否符合
        threeProvincePrice:this.threeProvincePriceInit(),
        catalogAreaList: [
          {key: "0", value: "0", label: "西药竞价谈判目录",disabled:false},
          {key: "1", value: "1", label: "中药竞价谈判目录",disabled:false},
          {key: "2", value: "2", label: "西药低价药品目录",disabled:false},
          {key: "3", value: "3", label: "中药低价药品目录",disabled:false},
          {key: "4", value: "4", label: "短缺药品目录"},
          {key: "5", value: "5", label: "国家谈判目录"}
        ],
        productId:'',
        requestCode:''
      }
    },
    created () {
      this.yearList = returnYearList();
    },
    methods: {
      threeProvincePriceInit(){
        return [
          {
            PRODUCTID:'',
            PROVINCENAME:'北京',
            PROVINCE:'',
            PROJECTNAME:'',
            PRICE:'',
            EXECUTIONDATE:'',
            DISCOUNTPRICE:'',
            CATALOGAREA:'',
            REQUESTCODE:''
          },
          {
            PRODUCTID:'',
            PROVINCENAME:'天津',
            PROVINCE:'',
            PROJECTNAME:'',
            PRICE:'',
            EXECUTIONDATE:'',
            DISCOUNTPRICE:'',
            CATALOGAREA:'',
            REQUESTCODE:''
          },
          {
            PRODUCTID:'',
            PROVINCENAME:'河北省',
            PROVINCE:'',
            PROJECTNAME:'',
            PRICE:'',
            EXECUTIONDATE:'',
            DISCOUNTPRICE:'',
            CATALOGAREA:'',
            REQUESTCODE:''
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
      metaDataForm(){
        return [{
          REQUESTCODE:'',
          PRODUCTID:'',
          ID: '',
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
          CATALOGAREA:'',
          DISCOUNTPRICE:'',
        }]
      },
      metaShowForm(){
        return [{
          ID: '',
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
      },
      metaControlData(){
        return {
          projectName$: '',
          calculatePrice$: '',
          provinceId$: '',
          priceType$: '',
          remark$: '',
          representativePackaging$: '',
          inPrice$: '',
          yearId$: '',
          computationalMethod$: '',
          representativePrice$: '',
          executionDate$: '',
          representativeSpec$: ''
        }
      },
      list(id, requestCode) {
        this.productId = id ;
        //id 挂网价格Id
        //upProductId 变更过程表Id
        this.$nextTick(async () => {
          this.visible = true;
          this.id = id;
          await queryPROVINCE().then(res => {
            this.provinceList = res.data;
          })
          await findShowProduct(id).then(res => {
            this.resData = res.data;
          })
          //1.查询变更前价格信息(用挂网产品ID 查)
          await findFinalBasicPrice(id).then(res => {
            console.log('展示的数据！！',res)
            if (res.data && res.data.provinceId) {
              for (let x in this.provinceList) {
                if (res.data.provinceId == this.provinceList[x].ID) {
                  res.data.provinceId = this.provinceList[x].NAME_CHN
                }
              }
            }
            this.catalogAreaName = res.data[0].CATALOGAREANAME;
            this.catalogArea = res.data[0].CATALOGAREA;
            this.showForm = res.data;

          })
          //2.upProductId != undefined查询变更后提交的值(用upProductId)
//          if (upProductId != undefined) {

//         ----------------以下列表查询有问题！！！！-------------------------
            await findById(requestCode).then(res => {
              console.log('要提交的数据',id,res)
              this.requestCode = requestCode;
              if(!res.data || res.data.length < 1){
                this.provinceList.forEach(item =>{
                  this.threeProvincePrice.forEach(x =>{
                    if(x.PROVINCENAME == item.NAME_CHN){
                      x.PROVINCE = item.ID;
                    }
                  })
                })
              }else{
                this.dataForm =res.data
//                this.dataForm = this.makeDataFrame(res.data,this.dataForm);
              }
//              console.log(this.dataForm)
//              let key = JSON.parse(JSON.stringify(this.dataForm));
//              let data = {};
//              for (var i in key) {
//                if (this.dataForm[i]) {
//                  data[i + "$"] = true;
//                } else {
//                  data[i + "$"] = false;
//                }
//              }
//              data["id$"] = false;
//              this.controlData = data;
//              //初始 表单 验证是否require
//              for(let item in data){
//                let item_new = item.substr(0,item.length-1);
//                if(this.rules[item_new]){
//                  this.rules[item_new]['require'] = data[item]
//                }
//              }
            })

          //----------------end----------------------
//          } else {
//            this.dataForm.projectProductId = id;
//          }
          /**
           * 查询设置锚点位置
           * */
          //恢复初始状态
          this.removeClassCurrent('jump-pro-change-view')[0].classList.add('current');
          this.getNodesHeight('product-change-audit')
        })
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
          console.log('indexARr----',indexArr)
          for(let  i = 0 ; i < indexArr.length ; i ++) {
            dataName.splice(indexArr[i], 0, {'ID': this.showForm[indexArr[i]].ID})
          }
        }else{
          this.showForm.forEach((item,index)=>{
            dataName[index].ID = item.ID;
          });
        }
        return dataName
      },
      initValidate(){
//        this.controlData = this.metaControlData();
//        this.dataForm = this.metaDataForm();
//        for(let item in this.dataForm) {
//          if (this.rules[item]) {
//            this.rules[item]['require'] = false;
//          }
//        }
//        this.$refs['dataForm'].resetFields()
      },
      updateDataForm(){
        switch (this.dataForm[0].PRICETYPE){
          case '0':
            this.dataForm[0].REPRESENTATIVEPRICE = '';
            this.dataForm[0].REPRESENTATIVEPACKAGING = '';
            this.dataForm[0].METHOD = '';
            this.dataForm[0].CALCULATEPRICE = '';
            this.dataForm[0].REMARK = '';
            break;
          case '1':
            this.dataForm[0].EXECUTIONDATE = '';
            break;
          case '2':
            this.dataForm.forEach(item=>{
              for(let i in item){
                if(i != 'PRICETYPE' && i != 'CATALOGAREA'){
                  item[i] = ''
                }
              }
            });
            break;
        }
      },
      goBack() {
        this.initValidate()
        this.$nextTick(()=>{
          this.visible = false;
        })
      },
      submitUseIf(res){
        //如果请求不成功则打开按钮限制
        if (!res.success) {
          this.submitFlag = false;
          this.$message.error("提交失败")
        } else {
          this.$message({
            message: "保存成功",
            type: 'success',
            onClose: function () {
              window.location.reload()
            }
          })
        }
      },
      submit(){
//        this.submitFlag = true;
//        let validResult;
//        this.$refs.dataForm.validate((valid)=>{
//          if(valid){
//            validResult = true;
//          }else{
//            validResult = false;
//            this.submitFlag = false;
//          }
//        });
//        let check = selectControl(this.controlData);
//        if (!check) {
//          this.$message({
//            message: '请选择变更项',
//            type: 'warning'
//          });
//          this.submitFlag = false;
//          return;
//        }
//        check = checkControl(this.dataForm, this.controlData);
//        if (!check) {
//          this.$message({
//            message: '请填写所有变更项',
//            type: 'warning'
//          });
//          this.submitFlag = false;
//        }
//        if(!validResult){
//          this.$message({
//            message: '请正确填写所有变更项',
//            type: 'warning'
//          });
//          this.submitFlag = false;
//          return;
//        }
//        this.dataForm[0].CATALOGAREA

        let thrPP = null;
        if(this.dataForm[0].CATALOGAREA == '2' || this.dataForm[0].CATALOGAREA == '3'){
          thrPP =  this.threeProvincePrice;
          thrPP.forEach(item=>{
            item.PRODUCTID = this.productId;
            item.REQUESTCODE = this.requestCode;
            item.CATALOGAREA = this.dataForm[0].CATALOGAREA;
            item.DISCOUNTPRICE = this.dataForm[0].DISCOUNTPRICE;
            item.EXECUTIONDATE = item.EXECUTIONDATE?dateFormatter(item.EXECUTIONDATE).split(' ')[0]:''
          });
          this.dataForm  =  thrPP;
        }else{
          this.dataForm.forEach(item=>{
            item.PRODUCTID = this.productId;
            item.REQUESTCODE = this.requestCode;
            item.DISCOUNTPRICE = this.dataForm[0].DISCOUNTPRICE;
            item.EXECUTIONDATE = item.EXECUTIONDATE?dateFormatter(item.EXECUTIONDATE).split(' ')[0]:''
          })
        }
        submitData(this.dataForm).then(res => {
          this.submitUseIf(res)
        })
      },
      updateInput(filed){
//        let errorNode,errorParentNode,errorNodeList;
//          errorParentNode = this.$refs[filed].$el.childNodes[1];
//          errorNodeList = errorParentNode.childNodes;
//          errorNodeList.forEach(item =>{
//            if(item.className == 'el-form-item__error'){
//              errorNode = item
//            }
//          })
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
        delete this.dataForm[filed]
      }
    },
    watch: {
      visible(newVal){
        let vieNode = document.getElementById(this.changeId);
        if (vieNode) {
          if (newVal == false) {
            vieNode.onscroll = null;
            this.removeFixed('product-change-view-side')
          } else {
            vieNode.onscroll = function () {
              this.dialogBoxScroll(vieNode, 'jump-pro-change-view', 'product-change-view-side')
            }.bind(this)
          }
        }
      }
    },
    mounted(){
      let vieNode = document.getElementById(this.changeId);
      if (vieNode) {
        vieNode.onscroll = function () {
          this.dialogBoxScroll(vieNode, 'jump-pro-change-view', 'product-change-view-side')
        }.bind(this)
      }
    }
  }
</script>
<style>
  @import "../../../../assets/css/auditchanges.css";
</style>
