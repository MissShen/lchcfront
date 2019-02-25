<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tablebox">
      <div>
        <el-form :model="form" ref="form" :rules="rules" label-position="left" label-width="130px" class="demo-ruleForm"
                 size="small">

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="国家医保序号：">
                <el-input v-model="form.insuredNationNubmer" class="width-260"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="省医保序号：">
                <el-input v-model="form.insuredDrugNubmer" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="第一层分类：">
                <el-select v-model="form.drugCategory" placeholder="请选择" @change="initSecondStage()" class="width-260">
                  <el-option
                          v-for="item in firstStage"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                  </el-option>
                </el-select>
                <span>{{ firstStageCode }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="第二层分类：">
                <el-select v-model="form.middleCategory" placeholder="请选择" @change="initThirdStage()" class="width-260">
                  <el-option
                          v-for="item in secondStage"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                  </el-option>
                </el-select>
                <span>{{ secondStageCode }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="第三层分类：">
                <el-select v-model="form.smallCategory" placeholder="请选择" @change="initFirthStage()" class="width-260">
                  <el-option
                          v-for="item in thirdStage"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                  </el-option>
                </el-select>
                <span>{{ thirdStageCode }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="第四层分类：">
                <el-select v-model="form.fourthCategory" placeholder="请选择" @change="selectFirthStage()" class="width-260">
                  <el-option
                          v-for="item in forthStage"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                  </el-option>
                </el-select>
                <span>{{ forthStageCode }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="医保药类别：">
                <el-select v-model="form.insuredDrugType" placeholder="请选择" class="width-260">
                  <el-option label="甲类" value="1"></el-option>
                  <el-option label="乙类" value="2"></el-option>
                  <el-option label="民族药" value="3"></el-option>
                </el-select>

              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="分类编码：">
                <el-input  v-model="form.categoryCode" class="width-260"></el-input>
                <a @click="setCategoryCode()">导入编码</a>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="英文名称：" prop="englishName">
                <el-input v-model="form.englishName" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="公告药品名称：" >
                <el-input v-model="form.bulletinDrugName" class="width-260"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公告剂型：" >
                <el-input v-model="form.bulletinDoseageName" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="药品：">
                <el-input class="width-260" placeholder="查询药品"></el-input>
                <a @click="drugsInfo()">选择</a>
                <el-checkbox-group v-model="checkDrugsList" labelWidth="150px" @change="removeDrug">
                  <el-checkbox v-for="drug in backDrugsList" :label="drug" :key="drug" >{{drug.nameChn}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="剂型：">
                <el-input class="width-260" placeholder="查询剂型"></el-input>
                <a @click="dosageInfo()">选择</a>
                <el-checkbox-group v-model="checkDoseageList" labelWidth="150px" @change="removeDosage">
                  <el-checkbox v-for="dosage in backDoseageList" :label="dosage" :key="dosage" >{{dosage.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="中西药类别：">
                <template>
                  <el-radio-group v-model="form.westernOrCn">
                    <el-radio  label="0">西药</el-radio>
                    <el-radio  label="1">中成药</el-radio>
                  </el-radio-group>
                </template>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否限制使用：">
                <template>
                  <el-radio-group v-model="form.permitFlag">
                    <el-radio  label="1">是</el-radio>
                    <el-radio  label="0">否</el-radio>
                  </el-radio-group>
                </template>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="是否禁用：">
                <template>
                  <el-radio-group v-model="form.limitedFlag">
                    <el-radio  label="0">是</el-radio>
                    <el-radio  label="1">否</el-radio>
                  </el-radio-group>
                </template>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="维护地区：" >
                <el-select  placeholder="请选择" v-model="form.provinceId" class="width-260">
                  <el-option
                          v-for="item in area.options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="文件备注：" prop="fileRemark">
                <el-input type="textarea" v-model="form.fileRemark" class="width-260"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注：" prop="remark">
                <el-input type="textarea" v-model="form.remark" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="相关药品信息：">
                <span>已选择
                  <el-input class="width-200" placeholder="0" v-model="relatedDrugsNum"></el-input>
                            种药品</span>
                <a @click="chooseDrugs()">选择</a>
                <el-checkbox-group v-model="checkRelatedDrugs" labelWidth="150px" @change="removeRelateDrug">
                  <el-checkbox v-for="drug in backRelatedDrugs" :label="drug" :key="drug" >{{drug.nameChn}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">保存</el-button>
                <el-button @click="goBack">返回</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <drugs-info v-if="drugsVisible" ref="DrugsInfo" @chooseDrugsList="chooseDrugsList"></drugs-info>
    <dosage-index v-if="dosageVisible" ref="DosageIndex" @chooseDosageList="chooseDosageList"></dosage-index>
    <not-asso-drugs v-if="notAssoVisible" ref="NotAssoDrugs" @chooseRelateDrugsList="chooseRelateDrugsList"></not-asso-drugs>
  </div>
</template>
<script>

  import ElCol from "element-ui/packages/col/src/col";
  import ElButton from "../../../../../node_modules/element-ui/packages/button/src/button";
  // 引入用户相关请求
  import {queryListByParentId} from 'src/axios/datacenter/authdata/medicalinsurance/classification';
  import {areaList,insertMedicare} from 'src/axios/datacenter/authdata/medicalinsurance/medicalinsurance';
  import DrugsInfo from "./windowPanel/drugsInfo";
  import NotAssoDrugs from "./windowPanel/notAssoDrugs";
  import DosageIndex from "./windowPanel/dosage/index";
  import {changeToBite,isEnglish} from 'src/utils/validateUtil'

  export default {
    components: {
      DosageIndex,
      NotAssoDrugs,
      DrugsInfo,
      ElButton,
      ElCol
    },
    data() {
      let checkNameEng = (rule, value, callback) => {
        if(value){
          if(changeToBite(value) > 160){
            callback(new Error('输入英文名称不超过160字节'))
          }else{
            let valueTemp = value;
            valueTemp =  valueTemp.replace(/\s/g,"");
            if(!isEnglish(valueTemp)){
              callback(new Error('请输入正确格式英文名称'))
            }else{
              callback()
            }
          }
        }else{
          callback()
        }
      }
      let checkLength = (rule, value, callback) => {
        if(value){
          if(changeToBite(value) > 4000){
            callback(new Error('输入不超过4000字节'))
          }else{
            callback()
          }
        }else{
          callback()
        }
      }
      return {
        notAssoVisible:false,
        dosageVisible:false,
        drugsVisible: false,
        parentId:'000000000000000000000000',
        firstStage:[],
        secondStage:[],
        thirdStage:[],
        forthStage:[],
        firstResData:[],
        secondResData:[],
        thirdResData:[],
        forthResData:[],
        resData:undefined,
        firstStageCode:'',
        secondStageCode:'',
        thirdStageCode:'',
        forthStageCode:'',
        area:this.checkArea(),
        backDrugsList:[],
        checkDrugsList:[],
        checkDoseageList:[],
        backDoseageList:[],
        lastBackDoseageList:[],
        backRelatedDrugs:[],
        checkRelatedDrugs:[],
        relatedDrugsNum:0,
        form: {
          insuredNationNubmer:undefined,
          insuredDrugNubmer:undefined,
          drugCategory:undefined,
          middleCategory:undefined,
          smallCategory:undefined,
          fourthCategory:undefined,
          drugCategoryId:undefined,
          middleCategoryId:undefined,
          smallCategoryId:undefined,
          fourthCategoryId:undefined,
          categoryCode:undefined,
          englishName:'',
          insuredDrugType:'1',
          bulletinDrugName:undefined,
          bulletinDoseageName:undefined,
          chooseDrugsId:'',
          chooseDrugsCode:'',
          chooseDosagesCode:'',
          westernOrCn:'0',
          permitFlag:'1',
          limitedFlag:'1',
          provinceId:'FR20T0000010000000050000',
          fileRemark:undefined,
          remark:undefined,
          chooseRelateDrugsId:'',
        },
       rules: {
         'englishName': {required: false, validator:checkNameEng, trigger: 'blur'},
         'fileRemark':{required: false, validator:checkLength, trigger: 'blur'},
         'remark':{required: false, validator:checkLength, trigger: 'blur'},
        }
      }
    },
    created(){
      this.initFirstStage();
      this.queryArea();
    },
    methods: {
      //   查询地区初始化
      checkArea(){
        return{
          options:undefined,
          value:''
        }
      },
      //  医保药品分类层级初始化
      list(stage,restore){
        queryListByParentId( this.parentId).then(res => {
          this.resData=res.data;
          for(var i=0;i<this.resData.length;i++){
            var jo={};
            jo.value=this.resData[i].nameChn;
            jo.label=this.resData[i].nameChn;
            stage.push(jo);
            restore.push(this.resData[i]);
        }

      })
      },
      //  第一层分类初始化
      initFirstStage(){
        this.list(this.firstStage,this.firstResData);
      },
      //  当第一层分类变动,第二层分类初始化
      initSecondStage(){
        this.form.categoryCode=undefined;
        this.firstStageCode='';
        this.secondStageCode='';
        this.thirdStageCode='';
        this.forthStageCode='';
        this.secondStage=[];
        this.thirdStage=[];
        this.forthStage=[];
        this.form.drugCategoryId='';
        this.form.middleCategoryId='';
        this.form.smallCategoryId='';
        this.form.fourthCategoryId='';
        this.form.middleCategory=undefined;
        this.form.smallCategory=undefined;
        this.form.fourthCategory=undefined;
        for(var i=0;i<this.firstResData.length;i++){
          if(this.form.drugCategory==this.firstResData[i].nameChn){
            this.form.drugCategoryId=this.firstResData[i].id;
            this.firstStageCode=this.firstResData[i].code;
            this.parentId=this.firstResData[i].id;
          }
        }
        this.list(this.secondStage,this.secondResData);
      },
      //  当第二层分类变动,第三层分类初始化
      initThirdStage(){
        this.form.categoryCode=undefined;
        this.secondStageCode='';
        this.thirdStageCode='';
        this.forthStageCode='';
        this.thirdStage=[];
        this.forthStage=[];
        this.form.middleCategoryId='';
        this.form.smallCategoryId='';
        this.form.fourthCategoryId='';
        this.form.smallCategory=undefined;
        this.form.fourthCategory=undefined;
        for(var i=0;i<this.secondResData.length;i++){
          if(this.form.middleCategory==this.secondResData[i].nameChn){
            this.form.middleCategoryId=this.secondResData[i].id;
            this.secondStageCode=this.secondResData[i].code;
            this.parentId=this.secondResData[i].id;
          }
        }
        this.list(this.thirdStage,this.thirdResData);
      },
      //  当第三层分类变动,第四层分类初始化
      initFirthStage(){
        this.form.categoryCode=undefined;
        this.thirdStageCode='';
        this.forthStageCode='';
        this.forthStage=[];
        this.form.smallCategoryId='';
        this.form.fourthCategoryId='';
        this.form.fourthCategory=undefined;
        for(var i=0;i<this.thirdResData.length;i++){
          if(this.form.smallCategory==this.thirdResData[i].nameChn){
            this.form.smallCategoryId=this.thirdResData[i].id;
            this.thirdStageCode=this.thirdResData[i].code;
            this.parentId=this.thirdResData[i].id;
          }
        }
        this.list(this.forthStage,this.forthResData);
      },
      //  当第四层分类变化
      selectFirthStage(){
        this.form.categoryCode=undefined;
        this.forthStageCode='';
        this.form.fourthCategoryId='';
        for(var i=0;i<this.forthResData.length;i++){
          if(this.form.fourthCategory==this.forthResData[i].nameChn){
            this.form.fourthCategoryId=this.forthResData[i].id;
            this.forthStageCode=this.forthResData[i].code;
          }
        }
      },
      //  生成分类编码
      setCategoryCode(){
        this.form.categoryCode=this.firstStageCode+this.secondStageCode+this.thirdStageCode+this.forthStageCode;
      },
      //  查询地区
      queryArea(){
        areaList().then(res => {
          this.area.options=res.data;
      })
      },
      //选择药品信息
      drugsInfo() {
        this.drugsVisible = true;
        this.$nextTick(() => {
          this.$refs.DrugsInfo.fillData();
        })
      },
      //  处理选中药品信息
      chooseDrugsList(val){
        this.backDrugsList=[];
        this.checkDrugsList=[];
        for(var i=0;i<val.value.length;i++){
          this.backDrugsList.push(val.value[i]);
          this.checkDrugsList.push(val.value[i]);
        }
        this.form.chooseDrugsId=this.setDrugIds(this.checkDrugsList);
        this.form.chooseDrugsCode=this.setDrugCodes(this.checkDrugsList);
      },
      //  生成选中药品id集合字符串
      setDrugIds(list){
        var ids=[];
        for(var i=0;i<list.length;i++){
          ids.push(list[i].id);
        }
        return ids.toString();
      },
      //  生成选中药品code集合字符串，中间以逗号隔可
      setDrugCodes(list){
        var codes=[];
        for(var i=0;i<list.length;i++){
          codes.push(list[i].code);
        }
        return codes.toString();
      },
      //  移除选定药品
      removeDrug(){
        if(confirm("您确定要删除吗？")){
          this.backDrugsList=[];
          for(var i=0;i<this.checkDrugsList.length;i++){
            this.backDrugsList.push(this.checkDrugsList[i]);
          }
          this.linkedRemoveRalatedDrugs1();
        }else{
          this.checkDrugsList=[];
          for(var i=0;i<this.backDrugsList.length;i++){
            this.checkDrugsList.push(this.backDrugsList[i]);
          }
        }
        this.form.chooseDrugsId=this.setDrugIds(this.checkDrugsList);
        this.form.chooseDrugsCode=this.setDrugCodes(this.checkDrugsList);
      },

      //选择剂型信息
      dosageInfo() {
        this.dosageVisible = true;
        this.$nextTick(() => {
          this.$refs.DosageIndex.fillData();
        })
      },
      //  处理返回剂型数据
      chooseDosageList(data){
        this.checkDoseageList=[];
        this.backDoseageList=[];
        for(var i=0;i<data.value.length;i++){
          this.checkDoseageList.push(data.value[i]);
          this.backDoseageList.push(data.value[i]);
        }
        this.form.chooseDosagesCode=this.setDosageCodes(this.checkDoseageList);
      },
      //  生成选中剂型code集合字符串
      setDosageCodes(list){
        var codes=[];
        for(var i=0;i<list.length;i++){
          codes.push(list[i].code);
        }
        return codes.toString();
      },
      //  删除选中的剂型
      removeDosage(){
        if(confirm("您确定要删除吗？")){
          this.backDoseageList=[];
          for(var i=0;i<this.checkDoseageList.length;i++){
            this.backDoseageList.push(this.checkDoseageList[i]);
          }
          this.linkedRemoveRalatedDrugs2();
        }else{
          this.checkDoseageList=[];
          for(var i=0;i<this.backDoseageList.length;i++){
            this.checkDoseageList.push(this.backDoseageList[i]);
          }
        }
        this.form.chooseDosagesCode=this.setDosageCodes(this.checkDoseageList);
      },
      //  选择关联药品
      chooseDrugs() {
        if(this.form.chooseDrugsId.length==0){
          confirm("请选择药品信息！");
        }else if(this.form.chooseDosagesCode.length==0){
          confirm("请选择剂型信息！")
        }else{
          this.notAssoVisible = true;
          this.$nextTick(() => {
            this.$refs.NotAssoDrugs.fillData(this.form.chooseDrugsId,this.form.chooseDosagesCode);
           })
        }
      },
      //  处理选中的相关药品窗口传回的信息
      chooseRelateDrugsList(val){
        this.form.chooseRelateDrugsId='';
        this.checkRelatedDrugs=[];
        this.backRelatedDrugs=[];
        for(var i=0;i<val.value.length;i++){
          this.checkRelatedDrugs.push(val.value[i]);
          this.backRelatedDrugs.push(val.value[i]);
        }
        this.relatedDrugsNum=this.checkRelatedDrugs.length;
        this.form.chooseRelateDrugsId=this.setChooseRelateDrugsId();
      },
      //  生成选中id集合
      setChooseRelateDrugsId(){
        var ids=[];
        for(var i=0;i<this.checkRelatedDrugs.length;i++){
          ids.push(this.checkRelatedDrugs[i].id);
        }
        return ids.toString();
      },
      //  删除关联产品
      removeRelateDrug(){
        if(confirm("您确定要删除吗？")){
          this.backRelatedDrugs=[];
          for(var i=0;i<this.checkRelatedDrugs.length;i++){
            this.backRelatedDrugs.push(this.checkRelatedDrugs[i]);
          }
        }else{
          this.checkRelatedDrugs=[];
          for(var i=0;i<this.backRelatedDrugs.length;i++){
            this.checkRelatedDrugs.push(this.backRelatedDrugs[i]);
          }
        }
        this.relatedDrugsNum=this.checkRelatedDrugs.length;
        this.form.chooseRelateDrugsId=this.setChooseRelateDrugsId();
      },
      //  药品信息删除联动删除关联药品
      linkedRemoveRalatedDrugs1(){
        var data=[];
        if(this.backDrugsList.length>0){
          for(var j=0;j<this.backDrugsList.length;j++) {
            for(var i=0;i<this.backRelatedDrugs.length;i++){
              if(this.backRelatedDrugs[i].code.substring(0,8)==this.backDrugsList[j].code){
                data.push(this.backRelatedDrugs[i]);
              }
            }
          }
        }
        this.ReSetRelateDrugs(data);
      },
      //  剂型信息删除联动删除关联药品
      linkedRemoveRalatedDrugs2(){
        var data=[];
        if(this.backRelatedDrugs.length>0){
          for(var i=0;i<this.backDoseageList.length;i++){
            for(var j=0;j<this.backRelatedDrugs.length;j++){
              if(this.backDoseageList[i].code==this.backRelatedDrugs[j].code.substring(8,11)){
                data.push(this.backRelatedDrugs[j]);
              }
            }
          }
        }
        this.ReSetRelateDrugs(data);
      },
      //  ReSetRelateDrugs(data)
      ReSetRelateDrugs(data){
        this.backRelatedDrugs.length=0;
        this.checkRelatedDrugs.length=0;
        for(var i=0;i<data.length;i++){
          this.backRelatedDrugs.push(data[i]);
          this.checkRelatedDrugs.push(data[i]);
        }
        this.relatedDrugsNum=this.checkRelatedDrugs.length;
        this.form.chooseRelateDrugsId=this.setChooseRelateDrugsId();
      },
      //  保存新增医保信息
      onSubmit(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            insertMedicare(this.form).then(res => {
              this.$message({
                      message: res.data,
                      type: 'success',
                      duration: 1000,
                      onClose: () => {
                      this.goBack();
          }
          });
          });
          } else {
            return false;
          }
        });
      },
      //  返回上一级
      goBack(){
        this.$router.go(-1);
      },
    }
  }
</script>

