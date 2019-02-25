<template>
  <el-dialog
    :title="'买方机构编码生成'"
    :close-on-click-modal="false"
    width="55%"
    :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm" :rules="rules" @keyup.enter.native="dataFormSubmit()"
             label-width="150px" label-position="left" size="small">


      <el-form-item label="行政区域代码：" prop="code">
        <el-input v-model="dataForm.code" class="width-260"></el-input>
      </el-form-item>
      <el-form-item label="医疗机构类别：" prop="buyerKind">
        <el-select filterable v-model="dataForm.buyerKind" placeholder="输入关键词搜索" class="width-260">
          <el-option
            v-for="item in buyerKindList"
            :key="item.code"
            :label="item.name"
            :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="单位隶属关系代码：" prop="subjectFlag">
        <el-select v-model="dataForm.subjectFlag" placeholder="请选择" class="width-260">
          <el-option label="军队" value="1"></el-option>
          <el-option label="中央" value="2"></el-option>
          <el-option label="省（直辖市）" value="3"></el-option>
          <el-option label="地市" value="4"></el-option>
          <el-option label="县级" value="5"></el-option>
          <el-option label="其他" value="6"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button size="small" type="primary" @click="choose('dataForm')">确定</el-button>
      <el-button size="small" @click="visible = false">返回</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  import {findRegionCode} from 'src/axios/datacenter/orgdata/catbuyer/catBuyer'
  import {initBuyerKind} from 'src/axios/datacenter/orgdata/catbuyer/catBuyer'

  export default {
    components: {ElCol},
    name: "buyOrgCode",
    data() {
      return {
        visible: false,
        buyerKindList: undefined,
        dataForm: {
          'code': '',
          'buyerKind': '',
          'subjectFlag': ''
        },
        rules: {
          buyerKind: {required: true, message: '关键信息不能为空', trigger: 'blur'},
          subjectFlag: {required: true, message: '关键信息不能为空', trigger: 'blur'},
          code: [
            {required: true, message: '关键信息不能为空', trigger: 'blur'},
            {min: 6, max: 6, message: '长度必须为6位', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {

      //由父页面进入。
      initWindow(subjectFlag, buyerKind, countyId){
        this.visible = true;
        this.dataForm.subjectFlag = subjectFlag;
        this.dataForm.buyerKind = buyerKind;
        findRegionCode(countyId).then(res => {
          this.dataForm.code = res.data;
        });
        initBuyerKind().then(res => {
          this.buyerKindList = res.data
        });
      },

      //数据同步到父页面
      choose(dataForm){
        this.$refs[dataForm].validate((valid) => {
          if (valid) {
            var data = {subjectFlag: '', buyerKind: '', code: ''};
            data.subjectFlag = this.dataForm.subjectFlag;
            data.buyerKind = this.dataForm.buyerKind;
            data.code = this.dataForm.code + this.dataForm.buyerKind + '0' + this.dataForm.subjectFlag;
            this.$emit('choose', {value: data});
            this.visible = false;
          }
        });
      }
    }
  }
</script>






