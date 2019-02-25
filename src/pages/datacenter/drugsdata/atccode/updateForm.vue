<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tablebox">
      <div>
        <el-form :model="form" ref="form" :rules="rules" label-position="left" label-width="170px" class="demo-ruleForm"
                 size="small">

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="药品编码选择：">
                <el-input v-model="form.anatomySortCode" class="w10" disabled="true"></el-input>
                <el-input v-model="form.therapeuticsSortCode" class="w10" disabled="true"></el-input>
                <el-input v-model="form.pharmacologySortCode" class="w10" disabled="true"></el-input>
                <el-input v-model="form.chemistrySortCode" class="w10" disabled="true"></el-input>
                <el-input v-model="form.compoundSort" class="w10" maxlength="2"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item>
                <span class="w10 atc-code-choose"><el-button @click="divideDrugsView('一')">选择</el-button></span>
                <span class="w10 atc-code-choose"><el-button @click="divideDrugsView('二',form.anatomySort)">选择</el-button></span>
                <span class="w10 atc-code-choose"><el-button @click="divideDrugsView('三',form.therapeuticsSort)">选择</el-button></span>
                <span class="w10 atc-code-choose"><el-button @click="divideDrugsView('四',form.pharmacologySort)">选择</el-button></span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="ATC编码：">
                  <el-input v-model="form.code" disabled="true" class="width-240"></el-input>
                  <a @click="addCode()">导入编码</a>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="ATC解剖学分类：">
                <el-input v-model="form.anatomySortName" disabled="true" class="width-240"></el-input>
                <el-input v-model="form.anatomySort" v-show="false" style="width:0;height:0"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="ATC治疗学分类：">
                <el-input v-model="form.therapeuticsSortName" disabled="true" class="width-240"></el-input>
                <el-input v-model="form.therapeuticsSort" v-show="false" style="width:0;height:0"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="ATC药理学分类：">
                <el-input v-model="form.pharmacologySortName" disabled="true" class="width-240"></el-input>
                <el-input v-model="form.pharmacologySort" v-show="false" style="width:0;height:0"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="ATC化学分类：">
                <el-input v-model="form.chemistrySortName" disabled="true" class="width-240"></el-input>
                <el-input v-model="form.chemistrySort" v-show="false" style="width:0;height:0"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="ATC中文名称：" prop="nameChn">
                <el-input v-model="form.nameChn" class="width-240" maxlength="100"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="ATC英文名称：">
                <el-input v-model="form.nameEng" class="width-240" maxlength="100"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="医院药品实用编码：">
                <el-input v-model="form.utilityCode" class="width-240" maxlength="100"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="DDD：">
                <el-input v-model="form.ddd" class="width-240" maxlength="100"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="给药途径：">
                <el-input v-model="form.useMethod" class="width-240"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="中国药典：">
                <el-radio-group v-model="form.codexChina">
                  <el-radio label="1">收载</el-radio>
                  <el-radio label="0">未收载</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="美国药典：">
                <el-radio-group v-model="form.codexUsa">
                  <el-radio label="1">收载</el-radio>
                  <el-radio label="0">未收载</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="英国药典：">
                <el-radio-group v-model="form.codexEngland">
                  <el-radio label="1">收载</el-radio>
                  <el-radio label="0">未收载</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="欧洲药典：">
                <el-radio-group v-model="form.codexEurope">
                  <el-radio label="1">收载</el-radio>
                  <el-radio label="0">未收载</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="日本药局方：">
                <el-radio-group v-model="form.codexJapan">
                  <el-radio label="1">收载</el-radio>
                  <el-radio label="0">未收载</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="临时编码：">
                <el-radio-group v-model="form.tempCode">
                  <el-radio label="1">是</el-radio>
                  <el-radio label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="自主编码：">
                <el-radio-group v-model="form.myCode">
                  <el-radio label="1">是</el-radio>
                  <el-radio label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="优先级别：">
                <el-radio-group v-model="form.priorityLevel">
                  <el-radio label="1">是</el-radio>
                  <el-radio label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注：">
                <el-input type="textarea" :rows="4" v-model="form.remark" class="width-240" maxlength="500">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="关联8位药品：">
                <el-input v-model="form.choicedrugsnum8" class="width-240" disabled="true"></el-input>
                <a @click="bit8DrugsView(id)">查询</a>
                <el-checkbox-group v-model="drugsArr8" v-if="drugsList8.length>0" @change="changeDrugs8()">
                  <el-checkbox v-for="item in drugsList8"
                               :key="item.code"
                               :label="item.code"
                               :value="item.code" checked="checked">{{item.nameChn}}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="关联剂型：">
                <el-input v-model="form.choicedoseagenum" class="width-240" disabled="true"></el-input>
                <a @click="drugsDoseageView(id)">查询</a>
                <el-checkbox-group v-model="doseageArr" v-if="doseageList.length>0" @change="changeDoseage()">
                  <el-checkbox v-for="item in doseageList"
                               :key="item.code"
                               :label="item.code"
                               :value="item.code" checked="checked">{{item.nameChn}}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="关联药品：">
                <el-input v-model="form.drugNum20" class="width-240" disabled="true"></el-input>
                <span>种</span>
                <a @click="drugsListView('2')">已关联</a>
                &nbsp;|&nbsp;
                <a @click="drugsListView('0')">未关联</a>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item>
                <el-button size="small" type="primary" @click="onSubmit('form')">保存</el-button>
                <el-button size="small" @click="goBack()">返回</el-button>
                <input v-show="false" v-model="form.pharmType" style="width:0;height:0">
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <bit8-drugs v-if="bit8DrugsVisible" ref="Bit8Drugs"  @saveDrugIds8="saveDrugIds8"></bit8-drugs>
    <drugs-doseage v-if="drugsdoseageVisible" ref="DrugsDoseage" @saveDoseageIds="saveDoseageIds"></drugs-doseage>
    <drugs-list v-if="drugsListVisible" ref="DrugsList" v-bind="{pharmType:this.pharmType,drugIds8:this.form.drugIds8,doseageIds:this.form.doseageIds,atcId:this.form.id}" @saveDrugIds20="saveDrugIds20"></drugs-list>
    <divide-drugs v-if="divideDrugsVisible" ref="DivideDrugs" v-bind="{level:this.level,sort:this.sort}" @saveChoiceData="saveChoiceData"></divide-drugs>
  </div>
</template>
<script>
  import ElCol from "element-ui/packages/col/src/col";
  import DivideDrugs from "./windowPanel/divideDrugs";
  import Bit8Drugs from "./windowPanel/bit8Drugs";
  import DrugsDoseage from "./windowPanel/drugsDoseage";
  import DrugsList from "./windowPanel/drugsList";
  import {updateCatAtc,findCatAtcById} from 'src/axios/datacenter/basedata/catatccategory/catatclist';


  export default {
    components: {
      DrugsList,
      Bit8Drugs,
      DivideDrugs,
      DrugsDoseage,
      ElCol},
    data() {
      return {
        level:'',
        sort:'',
        pharmType:'',
        drugsList8:[],
        drugsArr8:[],
        doseageList:[],
        doseageArr:[],
        drugNo20:'',
        divideDrugsVisible:false,
        bit8DrugsVisible:false,
        drugsListVisible:false,
        drugsdoseageVisible:false,
        form: {
          id:'',
          code:'',
          compoundSort:'',
          anatomySortCode: '',
          therapeuticsSortCode: '',
          pharmacologySortCode: '',
          chemistrySortCode: '',
          anatomySortName: '',
          therapeuticsSortName: '',
          pharmacologySortName: '',
          chemistrySortName: '',
          anatomySort: '',
          therapeuticsSort: '',
          pharmacologySort: '',
          chemistrySort: '',
          nameChn:'',
          nameEng:'',
          remark:'',
          tempCode:'',
          codexJapan:'',
          codexEurope:'',
          codexEngland:'',
          codexUsa:'',
          codexChina:'',
          useMethod:'',
          utilityCode:'',
          ddd:'',
          priorityLevel:'',
          myCode:'',
          drugIds8:'',
          drugIds20:'',
          doseageIds:'',
          choicedrugsnum8:'',
          drugNum20:'',
          choicedoseagenum:'',
          pharmType:''
        },
        rules:{
          nameChn:{ required: true, message: '请填写中文名称', trigger: 'blur' },
          atcCode:{ required: true, message: '请填写ATC编码', trigger: 'blur' }
        }
      }
    },
    created(){
      this.id = this.$route.params.id || undefined;
        if (this.id) {
          findCatAtcById(this.id).then(res => {
            this.form = res.data;
            this.drugsList8 = res.data.drugsList8;
            this.doseageList = res.data.doseageList;
            this.form.choicedrugsnum8 = res.data.drugNum8;
            this.drugNo20 = res.data.drugNum20;
            this.form.choicedoseagenum = res.data.doseageNum;
        })
      }
    },
    methods: {
      onSubmit(form) {
        this.form.drugIds8 = this.drugsArr8.toString();
        this.form.doseageIds = this.doseageArr.toString();
        this.$refs[form].validate((valid) => {
          if (valid) {
            updateCatAtc(this.form).then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
              }
            });
            this.goBack();
          })
          }
        });
      },
      saveDrugIds20(ids){
        this.form.drugIds20 = ids;
        if(this.pharmType == '2'){
          this.form.drugNum20 -= ids.split(',').length;
        }else{
          this.form.drugNum20 += ids.split(',').length;
        }
      },
      changeDoseage(){
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var del = true;
          var arr = [];
          for (var i = 0; i < this.doseageList.length; i++) {
            del = true;
            for (var o = 0; o < this.doseageArr.length; o++) {
              if (this.doseageList[i].code == this.doseageArr[o]) {
                del = false
              }
            }
            if (!del) {
              arr.push(this.doseageList[i]);
            }
          }
          this.doseageList = arr;
          this.form.choicedoseagenum = this.doseageList.length;
        }).catch(() => {
          let arr = [];
          this.doseageList.map(item => {
            arr.push(item.code);
          });
          this.doseageArr = arr;
        });
      },
      changeDrugs8(){
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var del = true;
          var arr = [];
          for (var i = 0; i < this.drugsList8.length; i++) {
            del = true;
            for (var o = 0; o < this.drugsArr8.length; o++) {
              if (this.drugsList8[i].code == this.drugsArr8[o]) {
                del = false
              }
            }
            if (!del) {
              arr.push(this.drugsList8[i]);
            }
          }
          this.drugsList8 = arr;
          this.form.choicedrugsnum8 = this.drugsList8.length;
        }).catch(() => {
          let arr = [];
          this.drugsList8.map(item => {
            arr.push(item.code);
          });
          this.drugsArr8 = arr;
        });
      },
      addCode(){
        if(this.form.anatomySort == null || this.form.anatomySort == '' || this.form.therapeuticsSort == null || this.form.therapeuticsSort == '' || this.form.pharmacologySort == null || this.form.pharmacologySort == '' || this.form.chemistrySort == null || this.form.chemistrySort == '' || this.form.compoundSort == null || this.form.compoundSort == ''){
          return this.$message.error('请填写全部的编码选择');
        }
        let numPett = /^[0-9]{2}?$/;
        if(!numPett.test(this.form.compoundSort)){
          return this.$message.error('只能输入两位数字');
        }
        this.form.code = this.form.anatomySortCode+this.form.therapeuticsSortCode+this.form.pharmacologySortCode+this.form.chemistrySortCode+this.form.compoundSort;
      },
      saveChoiceData(id,name,code){
        if(this.level == '一'){
          this.form.anatomySort = id;
          this.form.anatomySortName = name;
          this.form.anatomySortCode = code;

          this.form.therapeuticsSort = '';
          this.form.therapeuticsSortName = '';
          this.form.therapeuticsSortCode = '';

          this.form.pharmacologySort = '';
          this.form.pharmacologySortName = '';
          this.form.pharmacologySortCode = '';

          this.form.chemistrySort = '';
          this.form.chemistrySortName = '';
          this.form.chemistrySortCode = '';
        }
        if(this.level == '二'){
          this.form.therapeuticsSort = id;
          this.form.therapeuticsSortName = name;
          this.form.therapeuticsSortCode = code;

          this.form.pharmacologySort = '';
          this.form.pharmacologySortName = '';
          this.form.pharmacologySortCode = '';

          this.form.chemistrySort = '';
          this.form.chemistrySortName = '';
          this.form.chemistrySortCode = ''
        }
        if(this.level == '三'){
          this.form.pharmacologySort = id;
          this.form.pharmacologySortName = name;
          this.form.pharmacologySortCode = code;

          this.form.chemistrySort = '';
          this.form.chemistrySortName = '';
          this.form.chemistrySortCode = ''
        }
        if(this.level == '四'){
          this.form.chemistrySort = id;
          this.form.chemistrySortName = name;
          this.form.chemistrySortCode = code;
        }
        this.form.code = '';
      },
      divideDrugsView(level,sort) {
        this.level = level;
        if(this.level == '二'){
          if(!this.form.anatomySort || this.form.anatomySort == ''){
            return this.$message.error('请选择一级分类');
          }
        }
        if(this.level == '三'){
          if(!this.form.therapeuticsSort || this.form.therapeuticsSort == ''){
            return this.$message.error('请选择二级分类');
          }
        }
        if(this.level == '四'){
          if(!this.form.pharmacologySort || this.form.pharmacologySort == ''){
            return this.$message.error('请选择三级分类');
          }
        }
        this.divideDrugsVisible = true;
        this.sort = sort;
        this.$nextTick(() => {
          this.$refs.DivideDrugs.fillData(level);
        })
      },
      bit8DrugsView(id) {
        this.bit8DrugsVisible = true;
        this.$nextTick(() => {
          this.$refs.Bit8Drugs.fillData(id);
        })
      },
      drugsDoseageView(id){
        this.drugsdoseageVisible = true;
        this.$nextTick(() => {
          this.$refs.DrugsDoseage.fillData(id);
        })
      },
      saveDrugIds8(data){
        if (this.drugsList8.length > 0) {
          this.drugsList8 = this.unique1(this.drugsList8,data);
        } else {
          this.drugsList8 = data;
        }
        this.form.choicedrugsnum8 = this.drugsList8.length;
      },
      unique1(array1,array2){
        var n = []; //一个新的临时数组
        for(var i = 0; i < array1.length; i++){
          n.push(array1[i].code);
        }
        for(var i = 0; i < array2.length; i++){
          if (n.indexOf(array2[i].code) == -1){
              array1.push(array2[i]);
          }
        }
        return array1;
      },
      goBack() {
        this.$router.go(-1);
      },
      saveDoseageIds(data){
        if (this.drugsList8.length > 0) {
          this.doseageList = this.unique1(this.doseageList,data);
        } else {
          this.doseageList = data;
        }
        this.form.choicedoseagenum = this.doseageList.length;
      },
      drugsListView(id) {
        if(this.pharmType != '2'){
          if(this.drugsArr8.length == 0){
            return this.$message.error('请选择关联8位药品');
          }
          if(this.doseageArr.length == 0){
              return this.$message.error('请选择关联剂型');
          }
        }

        this.form.drugNum20 = this.drugNo20;
        this.form.drugIds8 = this.drugsArr8.toString();
        this.form.doseageIds = this.doseageArr.toString();
        this.pharmType = id;
        this.form.pharmType = id;
        this.drugsListVisible = true;
        this.$nextTick(() => {
          this.$refs.DrugsList.fillData(id);
        })
      }
    }
  }
</script>

