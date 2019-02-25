<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!--<ul class="tabs-panel">-->
      <!--<li class="active">{{getTitle()}}</li>-->
    <!--</ul>-->

    <div class="tablebox">
      <div>
        <el-form :model="form" :rules="rules" ref="form" label-position="left" label-width="180px" class="demo-ruleForm"
                 size="small">

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item class="nomar-btm">
                <div class="code-wrapper">
                  <span>药品分类</span>
                  <span>药品小分类</span>
                  <span>通用名</span>
                  <span>剂型</span>
                  <span>规格</span>
                  <span>一级盐类衍生物</span>
                  <span>二级盐类衍生物</span>
                  <span>复方及小儿标记</span>
                  <span>转换比</span>
                  <span>包材</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="药品编码选择：">
                <div class="code-content">
                  <span class="code-choose">
                    <el-input v-model="form.codeBig" readonly></el-input>
                    <a href="javascript:;" class="choose-btn" @click="drugCategory()">选择</a>
                  </span>
                    <span class="code-choose">
                    <el-input v-model="form.codeSmall" readonly></el-input>
                    <a href="javascript:;" class="choose-btn" @click="smallCategory()">选择</a>
                  </span>
                    <span class="code-choose">
                    <el-input v-model="form.name" readonly></el-input>
                    <a href="javascript:;" class="choose-btn" @click="chooseAlias()">选择</a>
                  </span>
                    <span class="code-choose">
                    <el-input v-model="form.dos" readonly></el-input>
                    <a href="javascript:;" class="choose-btn" @click="chooseDosageForm()">选择</a>
                  </span>
                    <span class="code-choose">
                    <el-input v-model="form.spec" readonly></el-input>
                    <a href="javascript:;" class="choose-btn" @click="chooseDrugSpec()">选择</a>
                  </span>
                    <span class="code-choose">
                    <el-input v-model="form.one" readonly></el-input>
                    <a href="javascript:;" class="choose-btn" @click="chooseSalt1()">选择</a>
                  </span>
                    <span class="code-choose">
                    <el-input v-model="form.two" readonly></el-input>
                    <a href="javascript:;" class="choose-btn" @click="chooseSalt2()">选择</a>
                  </span>
                    <span class="code-choose">
                    <el-input v-model="form.child" readonly></el-input>
                    <a href="javascript:;" class="choose-btn" @click="chooseCompound()">选择</a>
                  </span>
                    <span class="code-choose">
                    <el-input v-model="form.rate" readonly></el-input>
                    <a href="javascript:;" class="choose-btn" @click="chooseStandRate()">选择</a>
                  </span>
                    <span class="code-choose">
                    <el-input v-model="form.wrap" readonly></el-input>
                    <a href="javascript:;" class="choose-btn" @click="chooseWrap()">选择</a>
                  </span>
                </div>
              </el-form-item>
            </el-col>
            <!--<el-col :span="24">-->
              <!--<el-form-item>-->
                <!--<span class="code-choose"><el-button @click="drugCategory()">选择</el-button></span>-->
                <!--<span class="code-choose"><el-button @click="smallCategory()">选择</el-button></span>-->
                <!--<span class="code-choose"><el-button @click="chooseAlias">选择</el-button></span>-->
                <!--<span class="code-choose"><el-button @click="chooseDosageForm">选择</el-button></span>-->
                <!--<span class="code-choose"><el-button @click="chooseDrugSpec">选择</el-button></span>-->
                <!--<span class="code-choose"><el-button @click="chooseSalt1">选择</el-button></span>-->
                <!--<span class="code-choose"><el-button @click="chooseSalt2">选择</el-button></span>-->
                <!--<span class="code-choose"><el-button @click="chooseCompound">选择</el-button></span>-->
                <!--<span class="code-choose"><el-button @click="chooseStandRate">选择</el-button></span>-->
                <!--<span class="code-choose"><el-button @click="chooseWrap">选择</el-button></span>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="药品编码：">
                <el-input v-model="form.CODE" class="width-240" readonly></el-input>
                <!--<el-button @click="importCode()">导入编码</el-button>-->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="剂型：">
                <el-input v-model="form.CDF_NAME_CHN" class="width-240" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="药品大分类：">
                <el-input v-model="form.BIG_NAME" class="width-240" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="规格：">
                <el-input v-model="form.SPEC" class="width-240" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="药品小分类：">
                <el-input v-model="form.SMALL_NAME" class="width-240" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="一级盐类衍生物：">
                <el-input v-model="form.SALT_CODE_NAME" class="width-240" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="通用名：">
                <el-input v-model="form.NAME_CHN" class="width-240" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="二级盐类衍生物：">
                <el-input v-model="form.SALT_CODE2_NAME" class="width-240" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="转换比：">
                <el-input v-model="form.STAND_RATE" class="width-240" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="复方及小儿标记：">
                <el-input v-model="form.COMPOUND_CHILDREN" class="width-240" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="包材名称：">
                <el-input v-model="form.CW_NAME_CHN" class="width-240" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="英文名称：" prop="NAME_ENG">
                <el-input v-model="form.NAME_ENG" class="width-240" maxlength="150"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="备用标识：">
                <el-select v-model="form.READY_FLAG" class="width-240">
                  <el-option label="全部" :value="9"></el-option>
                  <el-option label="正常" value=""></el-option>
                  <el-option label="毒麻精放" :value="1"></el-option>
                  <el-option label="实际转换比注射" :value="2"></el-option>
                  <el-option label="备用粉针剂" :value="3"></el-option>
                  <el-option label="非药准字号产品" :value="4"></el-option>
                  <el-option label="毒药" :value="5"></el-option>
                  <el-option label="麻药" :value="6"></el-option>
                  <el-option label="精神类药品" :value="7"></el-option>
                  <el-option label="放射性药品" :value="8"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="含量：" prop="CONTENT_NUM">
                <el-input v-model="form.CONTENT_NUM" class="width-80"></el-input>
                <el-select v-model="form.CONTENT_UNIT" class="width-160">
                  <el-option label="g" value="g"></el-option>
                  <el-option label="mg" value="mg"></el-option>
                  <el-option label="IU" value="IU"></el-option>
                  <el-option label="ml" value="ml"></el-option>
                  <el-option label="l" value="l"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="重（装）量：" prop="WEIGHT_NUM">
                <el-input v-model="form.WEIGHT_NUM" class="width-80"></el-input>
                <el-select v-model="form.WEIGHT_UNIT" class="width-160">
                  <el-option label="g" value="g"></el-option>
                  <el-option label="mg" value="mg"></el-option>
                  <el-option label="IU" value="IU"></el-option>
                  <el-option label="ug" value="ug"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="质量标准编号：" prop="CRITERION_NUM">
                <el-input v-model="form.CRITERION_NUM" class="width-240" maxlength="60"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- TODO 所有下拉框测试 -->
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="质量标准类别：">
                <el-select v-model="form.CRITERION_TYPE" class="width-240">
                  <el-option label="空" value="00"></el-option>
                  <el-option label="药典标准" value="01"></el-option>
                  <el-option label="SFDA标准" value="02"></el-option>
                  <el-option label="部颁标准" value="03"></el-option>
                  <el-option label="进口标准" value="04"></el-option>
                  <el-option label="生物制品规程" value="05"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="质量标准有效期：" class="width-420">
                <el-date-picker v-model="form.CRITERION_EXPIRE_DATE" type="date"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="用法用量：">
                <el-input type="textarea" :rows="3" maxlength="200" v-model="form.DOSEAGE_DESC" class="width-240"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="国家基本药物：">
                <el-radio-group v-model="form.NATIONAL_BASIC_DRUG">
                  <el-radio label="1">是</el-radio>
                  <el-radio label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="国家基本医疗保险药品：">
                <el-radio-group v-model="form.NATIONAL_INSURANCE_DRUG">
                  <el-radio label="1" class="nomar-left marright30 marbottom15">甲类</el-radio>
                  <el-radio label="2" class="nomar-left marright30 marbottom15">乙类</el-radio>
                  <el-radio label="3" class="nomar-left marright30 marbottom15">民族药</el-radio>
                  <el-radio label="0" class="nomar-left marright30">非国家基本医疗保险药品</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="ATC中文名称：">
                <el-input v-model="form.ATC_NAME" class="width-240" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="OTC药品：" prop="name">
                <el-radio-group v-model="form.PRESCRIPTION">
                  <el-radio label="1">非OTC药品</el-radio>
                  <el-radio label="2">甲类OTC</el-radio>
                  <el-radio label="3">乙类OTC</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="ATC编码：">
                <el-input v-model="form.ATC_CODE" class="width-240" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="20">
              <el-form-item label="新编药物医学分类：">
                <el-input v-if="form.FIRST_CLASS" v-model="form.FIRST_CLASS" class="w19" readonly></el-input>
                <el-input v-if="form.SECOND_CLASS" v-model="form.SECOND_CLASS" class="w19" readonly></el-input>
                <el-input v-if="form.THIRD_CLASS" v-model="form.THIRD_CLASS" class="w19" readonly></el-input>
                <el-input v-if="form.FOURTH_CLASS" v-model="form.FOURTH_CLASS" class="w19" readonly></el-input>
                <el-input v-if="form.FIVE_CLASS" v-model="form.FIVE_CLASS" class="w19" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="备注：" prop="name">
                <el-input
                  type="textarea" :rows="4" v-model="form.DESCRIPTION" class="width-240" maxlength="800">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item>
                <el-button size="small" type="primary" @click="onSubmit">保存</el-button>
                <el-button size="small" @click="goBack()">返回</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <drug-category @callBack="setCodeBig" v-if="drugCategoryVisible" ref="DrugCategory"></drug-category>
    <small-category @callBack="setCodeSmall" v-if="smallCategoryVisible" ref="SmallCategory"></small-category>
    <drug-alias @callBack="setCodeName" v-if="aliasVisible" ref="DrugAlias"></drug-alias>
    <dosage-form @callBack="setCodeDos" v-if="dosageFormVisible" ref="DosageForm"></dosage-form>
    <choose-drug-spec @callBack="setCodeSpec" v-if="specVisible" ref="ChooseDrugSpec"></choose-drug-spec>
    <choose-salt1 @callBack="setCodeSalt1" v-if="salt1Visible" ref="ChooseSalt1"></choose-salt1>
    <choose-salt2 @callBack="setCodeSalt2" v-if="salt2Visible" ref="ChooseSalt2"></choose-salt2>
    <choose-compound @callBack="setCodeChild" v-if="compoundVisible" ref="ChooseCompound"></choose-compound>
    <choose-stand-rate @callBack="setCodeRate" v-if="standRateVisible" ref="ChooseStandRate"></choose-stand-rate>
    <choose-wrap @callBack="setCodeWrap" v-if="wrapVisible" ref="ChooseWrap"></choose-wrap>
  </div>
</template>
<script>

  import {findDrugInfo, insertDrugInfo, updateDrugInfo, codeIsRepeat} from 'src/axios/datacenter/drugdata/druginfo/druginfo'
  import {isNumberOrEng,isNumberLimit,isChinese} from "../../../../../utils/validateUtil";

  import ElCol from "element-ui/packages/col/src/col";
  import DrugCategory from "../windowPanel/drugCategory";
  import SmallCategory from "../windowPanel/smallCategory";
  import DrugAlias from "../windowPanel/chooseDrugAlias";
  import DosageForm from "../windowPanel/dosageForm";
  import ChooseDrugSpec from "../windowPanel/chooseDrugSpec";
  import ChooseSalt1 from "../windowPanel/chooseSalt1";
  import ChooseSalt2 from "../windowPanel/chooseSalt2";
  import ChooseCompound from "../windowPanel/chooseCompound";
  import ChooseStandRate from "../windowPanel/chooseStandRate";
  import ChooseWrap from "../windowPanel/chooseWrap";

  export default {
    components: {
      ChooseWrap,
      ChooseStandRate,
      ChooseCompound,
      ChooseSalt2,
      ChooseSalt1,
      ChooseDrugSpec,
      DosageForm,
      DrugAlias,
      SmallCategory,
      DrugCategory,
      ElCol
    },
    data() {
      //验证英文名称
      var validateEngName = (rule, value, callback) => {
        if (!isNumberOrEng(value)) {
          callback('请输入英文或者数字');
        }else{
          callback();
        }
      };
      //验证含量
      var validateContentNum = (rule, value, callback) => {
        if (!value){
          callback();
        }else{
          if (!isNumberLimit(value)){
            callback('请输入小于等于10的正整数或小数');
          }
        }
      };
      //验证质量编号
      var validateChinese = (rule, value, callback) => {
        if (!isChinese(value)&&value) {
          callback('质量标准标号不可为中文')
        }else {
          callback()
        }
      }
      return {
        type: "add",
        id: undefined,
        aliasVisible: false,
        salt1Visible: false,
        salt2Visible: false,
        specVisible: false,
        compoundVisible: false,
        dosageFormVisible: false,
        drugCategoryVisible: false,
        smallCategoryVisible: false,
        standRateVisible: false,
        wrapVisible: false,
        form: {
          DRUG_SERIAL_NUMBER: undefined,
          NAME_CHN: undefined,
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',

          desc: '',
          DOSEAGE_FORM_CODE: undefined,
          WRAP_CODE: undefined,

          // 弹出框

          idBig: undefined,

          codeBig: undefined,
          codeSmall: undefined,
          name: undefined,
          dos: undefined,
          spec: undefined,
          one: undefined,
          two: undefined,
          child: undefined,
          rate: undefined,
          wrap: undefined,
          CODE: undefined
        },
        rules:{
          NAME_ENG:[
            {validator: validateEngName, trigger: 'blur'}
          ],
          CONTENT_NUM: [
            {validator: validateContentNum, trigger: 'blur'}
          ],
          WEIGHT_NUM: [
            {validator: validateContentNum, trigger: 'blur'}
          ],
          CRITERION_NUM: [
            {validator: validateChinese, trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this.initData();
    },
    methods: {
      getTitle() {
        if (this.type === 'add') {
          return "新增药品信息";
        }
        if (this.type === 'edit') {
          return "修改药品信息";
        }
        if (this.type === 'copy') {
          return "复制药品信息";
        }
        return 'XXX';
      },
      // 提交
      onSubmit() {

        console.log("==>onSubmit")
        if (this.type === 'add' || this.type === 'copy') {

          console.log("==>add or copy   this.form=", this.form)

          // 新增
          insertDrugInfo(this.form).then(res => {
            if(res.data == '新增成功'){
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.goBack()
                }
              });
            }else{
              this.$message({
                message: res.data,
                type: 'error',
                duration: 1000,
                onClose: () => {
                }
              });
            }
              
          })

          return;
        }
        if (this.type === 'edit') {

          console.log("==>edit, this.form==>", this.form)
          // 修改
          updateDrugInfo(this.form).then(res => {
            console.log(res,'res')
            if (res.code == 200){
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.goBack()
                }
              });
            } else {
              this.$message({
                message: '保存失败.',
                type: 'error',
                duration: 1000,
                onClose: () => {
                }
              });
            }
          })

          return;
        }
      },
      initData() {
        this.type = this.$route.params.type;
        this.id = this.$route.params.id;
        this.id = this.id === 'undefined' ? undefined : this.id;

        let _this = this;
        // 编辑 和 复制 都需要查询详情
        if (this.type === 'edit' || this.type === 'copy') {
          findDrugInfo(this.id).then(res => {
            _this.form = res.data;
            console.log("result=>", res.data)
            // 拆分code, 显示到对应位置
            _this.form.idBig = _this.form.BIG_ID;
            _this.form.codeBig = _this.form.CODE.substr(0, 2);
            _this.form.codeSmall = _this.form.CODE.substr(2, 2);
            _this.form.name = _this.form.CODE.substr(4, 4);
            _this.form.dos = _this.form.CODE.substr(8, 3);
            _this.form.spec = _this.form.CODE.substr(11, 2);
            _this.form.one = _this.form.CODE.substr(13, 2);
            _this.form.two = _this.form.CODE.substr(15, 2);
            _this.form.child = _this.form.CODE.substr(17, 1);
            _this.form.rate = _this.form.CODE.substr(18, 2);
            _this.form.wrap = _this.form.CODE.substr(20, 3);
          })
          return;
        }

        // 新增
        if (this.type === 'add') {
          // no code
        }

      },

      // 判断值存在
      judgeVal(val,msg){
        if (val==undefined||!val){
          this.$message({
            message: msg,
            type: 'warning'
          });
        }
      },
      drugCategory(){
        this.drugCategoryVisible = true;
        this.$nextTick(() => {
          this.$refs.DrugCategory.fillData();
        })
      },
      smallCategory(){
        console.log("this.form.codeBig==>", this.form.codeBig)
        this.judgeVal(this.form.codeBig,'请先选择药品分类');
        if(this.form.codeBig){
          this.smallCategoryVisible = true;
          this.$nextTick(() => {
            this.$refs.SmallCategory.fillData(this.form.idBig);
          })
        }
      },
      chooseAlias(){
        this.judgeVal(this.form.codeSmall,'请先选择药品小分类');
        if (this.form.codeSmall){
          this.aliasVisible = true;
          this.$nextTick(() => {
            this.$refs.DrugAlias.fillData(this.form.codeBig, this.form.codeSmall);
          })
        }
      },
      chooseDosageForm(){
        this.judgeVal(this.form.name,'请先选择通用名');
        if (this.form.name){
          this.dosageFormVisible = true;
          this.$nextTick(() => {
            this.$refs.DosageForm.fillData(this.form.codeBig, this.form.codeSmall, this.form.name);
          })
        }
      },
      chooseDrugSpec(){
        this.judgeVal(this.form.dos,'请先选择剂型');
        if (this.form.dos){
          this.specVisible = true;
          this.$nextTick(() => {
            this.$refs.ChooseDrugSpec.fillData(this.form.codeBig, this.form.codeSmall, this.form.name, this.form.dos);
          })
        }
      },
      chooseSalt1(){
        this.judgeVal(this.form.spec,'请先选择规格');
        if (this.form.spec){
          this.salt1Visible = true;
          this.$nextTick(() => {
            this.$refs.ChooseSalt1.fillData();
          })
        }
      },
      chooseSalt2(){
        this.judgeVal(this.form.one,'请先选择一级盐类衍生物');
        if (this.form.one) {
          this.salt2Visible = true;
          this.$nextTick(() => {
            this.$refs.ChooseSalt2.fillData();
          })
        }
      },
      chooseCompound(){
        this.judgeVal(this.form.two,'请先选择二级盐类衍生物');
        if (this.form.two) {
          this.compoundVisible = true;
          this.$nextTick(() => {
            this.$refs.ChooseCompound.fillData();
          })
        }
      },
      chooseStandRate(){
        this.judgeVal(this.form.child,'请先选择复方及小儿标记');
        if (this.form.child) {
          this.standRateVisible = true;
          this.$nextTick(() => {
            this.$refs.ChooseStandRate.fillData(this.form.codeBig, this.form.codeSmall, this.form.name, this.form.dos, this.form.spec, this.form.one, this.form.two, this.form.child);
          })
        }
      },
      chooseWrap(){
        this.judgeVal(this.form.rate,'请先选择转换比');
        if (this.form.rate) {
          this.wrapVisible = true;
          this.$nextTick(() => {
            this.$refs.ChooseWrap.fillData();
          })
        }
      },

      // 返回
      goBack() {
        this.$router.go(-1);
      },
      // 导入编码
      importCode() {
        let code = this.getValue(this.form.codeBig)
          +""+this.getValue(this.form.codeSmall)
          +""+this.getValue(this.form.name)
          +""+this.getValue(this.form.dos)
          +""+this.getValue(this.form.spec)
          +""+this.getValue(this.form.one)
          +""+this.getValue(this.form.two)
          +""+this.getValue(this.form.child)
          +""+this.getValue(this.form.rate)
          +""+this.getValue(this.form.wrap);
        codeIsRepeat(code).then(res => {
          if (res.data){
            this.$message({
              message: '药品编码已存在',
              type: 'error',
              duration: 1000,
            });
          }else{
            this.form.CODE = code;
          }
        })
      },
      getValue(value) {
        return (value == undefined || value == null) ? "" : value;
      },
      // 接收弹框传来的参数
      setCodeBig(code, id, name) {
        this.form.codeBig = code;
        this.form.idBig = id;
        this.form.BIG_NAME = name;
        this.form.CODE = '';
        this.drugCategoryVisible = false;

        this.form.codeSmall = '';
        this.form.SMALL_NAME = '';
        this.form.name = '';
        this.form.NAME_CHN = '';
        this.form.dos = '';
        this.form.CDF_NAME_CHN = '';
        this.form.spec = '';
        this.form.SPEC = '';
        this.form.one = '';
        this.form.SALT_CODE_NAME = '';
        this.form.two = '';
        this.form.SALT_CODE2_NAME = '';
        this.form.child = '';
        this.form.COMPOUND_CHILDREN = '';
        this.form.rate = '';
        this.form.STAND_RATE = '';
        this.form.wrap = '';
        this.form.CW_NAME_CHN = '';
      },
      setCodeSmall(code, id, name) {
        this.form.codeSmall = code;
        this.form.SMALL_NAME = name;
        this.form.CODE = '';
        this.smallCategoryVisible = false;

        this.form.name = '';
        this.form.NAME_CHN = '';
        this.form.dos = '';
        this.form.CDF_NAME_CHN = '';
        this.form.spec = '';
        this.form.SPEC = '';
        this.form.one = '';
        this.form.SALT_CODE_NAME = '';
        this.form.two = '';
        this.form.SALT_CODE2_NAME = '';
        this.form.child = '';
        this.form.COMPOUND_CHILDREN = '';
        this.form.rate = '';
        this.form.STAND_RATE = '';
        this.form.wrap = '';
        this.form.CW_NAME_CHN = '';
      },
      setCodeName(code, id, name) {
        this.form.name = code;
        this.form.NAME_CHN = name;
        this.form.CODE = this.getValue(this.form.codeBig)
          +""+this.getValue(this.form.codeSmall)
          +""+this.getValue(this.form.name);
        this.aliasVisible = false;

        this.form.dos = '';
        this.form.CDF_NAME_CHN = '';
        this.form.spec = '';
        this.form.SPEC = '';
        this.form.one = '';
        this.form.SALT_CODE_NAME = '';
        this.form.two = '';
        this.form.SALT_CODE2_NAME = '';
        this.form.child = '';
        this.form.COMPOUND_CHILDREN = '';
        this.form.rate = '';
        this.form.STAND_RATE = '';
        this.form.wrap = '';
        this.form.CW_NAME_CHN = '';
      },
      setCodeDos(code, id, name) {
        this.form.dos = code;
        this.form.CDF_NAME_CHN = name;
        this.form.CODE = this.form.CODE
          +""+this.getValue(this.form.dos);
        this.dosageFormVisible = false;

        this.form.spec = '';
        this.form.SPEC = '';
        this.form.one = '';
        this.form.SALT_CODE_NAME = '';
        this.form.two = '';
        this.form.SALT_CODE2_NAME = '';
        this.form.child = '';
        this.form.COMPOUND_CHILDREN = '';
        this.form.rate = '';
        this.form.STAND_RATE = '';
        this.form.wrap = '';
        this.form.CW_NAME_CHN = '';
      },
      setCodeSpec(code, spec) {
        this.form.spec = code;
        this.form.SPEC = spec;
        this.form.CODE = this.form.CODE
          +""+this.getValue(this.form.spec);
        this.specVisible = false;

        this.form.one = '';
        this.form.SALT_CODE_NAME = '';
        this.form.two = '';
        this.form.SALT_CODE2_NAME = '';
        this.form.child = '';
        this.form.COMPOUND_CHILDREN = '';
        this.form.rate = '';
        this.form.STAND_RATE = '';
        this.form.wrap = '';
        this.form.CW_NAME_CHN = '';
      },
      setCodeSalt1(code,name) {
        this.form.one = code;
        this.form.SALT_CODE_NAME = name;
        this.form.CODE = this.getValue(this.form.codeBig)
          +""+this.getValue(this.form.codeSmall)
          +""+this.getValue(this.form.name)
          +""+this.getValue(this.form.dos)
          +""+this.getValue(this.form.spec);
        this.salt1Visible = false;

        this.form.two = '';
        this.form.SALT_CODE2_NAME = '';
        this.form.child = '';
        this.form.COMPOUND_CHILDREN = '';
        this.form.rate = '';
        this.form.STAND_RATE = '';
        this.form.wrap = '';
        this.form.CW_NAME_CHN = '';
      },
      setCodeSalt2(code,name) {
        this.form.two = code;
        this.form.SALT_CODE2_NAME = name;
        this.form.CODE = this.getValue(this.form.codeBig)
          +""+this.getValue(this.form.codeSmall)
          +""+this.getValue(this.form.name)
          +""+this.getValue(this.form.dos)
          +""+this.getValue(this.form.spec);
        this.salt2Visible = false;

        this.form.child = '';
        this.form.COMPOUND_CHILDREN = '';
        this.form.rate = '';
        this.form.STAND_RATE = '';
        this.form.wrap = code;
        this.form.CW_NAME_CHN = '';
      },
      setCodeChild(code,name) {
        this.form.child = code;
        this.form.COMPOUND_CHILDREN = name;
        this.form.CODE = this.form.CODE
          +""+this.getValue(this.form.one)
          +""+this.getValue(this.form.two)
          +""+this.getValue(this.form.child);
        this.compoundVisible = false;

        this.form.rate = '';
        this.form.STAND_RATE = '';
        this.form.wrap = '';
        this.form.CW_NAME_CHN = '';
      },
      setCodeRate(code,name) {
        this.form.rate = code;
        this.form.STAND_RATE = name;
        this.form.CODE = this.form.CODE
          +""+this.getValue(this.form.rate);
        this.standRateVisible = false;

        this.form.wrap = '';
        this.form.CW_NAME_CHN = '';
      },
      setCodeWrap(code,name) {
        this.form.wrap = code;
        this.form.CW_NAME_CHN = name;
        this.form.CODE = this.getValue(this.form.codeBig)
          +""+this.getValue(this.form.codeSmall)
          +""+this.getValue(this.form.name)
          +""+this.getValue(this.form.dos)
          +""+this.getValue(this.form.spec)
          +""+this.getValue(this.form.one)
          +""+this.getValue(this.form.two)
          +""+this.getValue(this.form.child)
          +""+this.getValue(this.form.rate)
          +""+this.getValue(this.form.wrap);
        this.wrapVisible = false;
      }
    }
  }
</script>
<style>
  @import "../../../../../assets/css/datacenter.css";
</style>
