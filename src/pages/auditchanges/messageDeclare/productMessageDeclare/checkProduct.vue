<template>
  <el-dialog
    title="新增产品申报"
    width="60%"
    :close-on-click-modal="false"
    :visible.sync="visible"
    append-to-body
  >
    <div v-if="visible">
      <div class="from-view form-inner">
            <el-form :model="dataForm" ref="dataForm" :rules="rules" label-width="140px" size="small" label-position="left" class="demo-form-inline" :inline="true">
              <el-row :gutter="24">
                <el-col :span="24">
                  <el-form-item label="药品">
                    <span>{{dataForm.DRUGNAME}}</span>
                    <a @click="selectDrug" class="blue">选择</a>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="生产企业">
                    <span>{{dataForm.ORGNAME}}</span>
                    <a v-if="factoryFlag" @click="selectOrg" class="blue">选择</a>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--<el-row :gutter="24">-->
                <!--<el-col :span="12">-->
                  <!--<el-form-item label="包材">-->
                    <!--<span>{{dataForm.WRAPNAME}}</span>-->
                    <!--<el-button type="primary" @click="selectWrap" size="small">选择</el-button>-->
                  <!--</el-form-item>-->
                <!--</el-col>-->
                <!--<el-col :span="12">-->
                  <!--<el-form-item label="单位" >-->
                    <!--<span>{{dataForm.METRICNAME}}</span>-->
                    <!--<el-button type="primary" @click="selectMetric" size="small">选择</el-button>-->
                  <!--</el-form-item>-->
                <!--</el-col>-->
              <!--</el-row>-->
              <!--<el-row :gutter="24">-->
                <!--<el-col :span="12">-->
                  <!--<el-form-item label="产品名称" >-->
                    <!--<el-input v-model="dataForm.PRODUCT"></el-input>-->
                  <!--</el-form-item>-->
                <!--</el-col>-->
                <!--<el-col :span="12">-->
                  <!--<el-form-item label="商用名" >-->
                    <!--<el-input v-model="dataForm.TRADE"></el-input>-->
                  <!--</el-form-item>-->
                <!--</el-col>-->
              <!--</el-row>-->
            </el-form>
      </div>
    </div>
    <span slot="footer">
      <el-button type="primary" @click="submit" size="small">下一步</el-button>
      <el-button size="small"  @click="goBack">关闭</el-button>
    </span>
    <select-org ref="selectOrg" @selectOrg="getOrg"></select-org>
    <select-drug ref="selectDrug" @selectDrug="getDrug"></select-drug>
    <add-or-up v-if="addOrUpShow" ref="addOrUp"></add-or-up>
  </el-dialog>
</template>
<script>
  import {checkProduct,findOrg} from 'src/axios/auditchanges/messageDeclare/product'
  import selectOrg from './selectOrg'
  import selectDrug from './selectDrug'
  import addOrUp from './addOrUp'
  export default {
    components:{
      selectOrg,
      selectDrug,
      addOrUp
    },
    data() {
      return {
        addOrUpShow:false,
        activeName:'first',
        visible:false,
        factoryFlag:false,
        dataForm:this.metaDataForm(),
        rules:{
//          DRUG:{ required: true,message: '请输入名称',trigger: 'blur'},
//          DOSEAGE:{ required: true,message: '请输入商品名称',trigger: 'blur'},
//          SPEC:{ required: true, message: '请输入剂型', trigger: 'blur'},
//          STANDRATE:{ required: true, message: '请输入规格', trigger: 'blur'},
//          WRAP:{ required: true, message: '请输入转换比', trigger: 'blur'},
//          METRIC:{ required: true, message: '请输入单位', trigger: 'blur'},
//          PRODUCT:{ required: true, message: '请输入包材', trigger: 'blur'},
//          MANUFACTURE:{ required: true, message: '请输入生产企业', trigger: 'blur'}
        },
      };
    },
    created () {
    },
    methods: {
      metaDataForm(){
        return {
          CDID:'',
          ORGID:'',
          PRODUCT:'',
          ORGNAME:'',
          TRADE:''
        }
      },
      //上传文件里的方法
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      goAnchor(selector) {
        var anchor = this.$el.querySelector(selector)
        document.body.scrollTop = anchor.offsetTop; // chrome
        document.documentElement.scrollTop = anchor.offsetTop; // firefox
      },
      list(){
        this.visible = true;
        this.dataForm = this.metaDataForm()
        //查当前企业是否是生产企业
        //生产企业不可选择生产企业
        findOrg().then(res=>{
          if(res.data == undefined){
            this.factoryFlag = true;
          }else {
            this.factoryFlag = false;
            this.dataForm.ORGID = res.data.ID;
            this.dataForm.ORGNAME = res.data.NAME;
            this.dataForm.ORGCODE = res.data.CODE;
          }
        })
      },
      goBack() {
        this.visible = false;
      },
      submit(){
        if(this.dataForm.CDID == undefined||this.dataForm.CDID==null||this.dataForm.CDID==''){
          this.$message({
            message:'请先选择药品',
            type:'warning'
          });
          return ;
        }
        if(this.dataForm.ORGID == undefined||this.dataForm.ORGID==null||this.dataForm.ORGID==''){
          this.$message({
            message:'请先选择生产企业',
            type:'warning'
          });
          return ;
        }
        checkProduct(this.dataForm).then(res=>{
          //验证完 走新增或变更
          if(res.data.COUNT=='0'){
            this.addOrUpShow = true;
            this.$nextTick(() => {
              this.$refs.addOrUp.add(this.dataForm)
              this.visible = false;
            })
          }else{
            this.$message({
              message:'抱歉，系统检测您填写的产品信息已存在，不能新增。',
              type:'warning'
            });
          }
        })
      },
      selectDrug(){
        this.$refs.selectDrug.list()
      },
      getDrug(data){
        //id 药品ID
        this.$set(this.dataForm,'DRUGNAME',data['1']);
        this.$set(this.dataForm,'CDID',data['0']);
      },
      selectOrg(){
        this.$refs.selectOrg.list()
      },
      getOrg(data){
        //企业ID
        this.$set(this.dataForm,'ORGNAME',data['1']);
        this.$set(this.dataForm,'ORGID',data['0']);
        this.$set(this.dataForm,'ORGCODE',data['2']);
      }
    }
  }
</script>

<style>
  @import "../../../../assets/css/auditchanges.css";
</style>
