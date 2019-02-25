<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <ul class="tabs-panel">
      <li class="active">查看药品信息</li>
    </ul>

    <div class="tablebox">
      <div style="width: 1800px">
        <el-form :model="from" ref="from" :rules="rules" label-position="left" label-width="100px" class="demo-ruleForm"
                 size="small">

          <el-row :gutter="24">
            <el-col :span="7">
              <el-form-item label="药品编码：" labelWidth="170px">
                <span>121212212121</span>
              </el-form-item>
            </el-col>
            <el-col :span="6" offset="1">
              <el-form-item label="剂型：" labelWidth="170px">
                <span>素片</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item label="药品大分类：" labelWidth="170px">
                <span>素片</span>
              </el-form-item>
            </el-col>
            <el-col :span="6" offset="2">
              <el-form-item label="规格：" labelWidth="170px">
                <span>素片</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item label="药品小分类：" labelWidth="170px">
                <span>素片</span>
              </el-form-item>
            </el-col>
            <el-col :span="6" offset="2">
              <el-form-item label="一级盐类衍生物：" labelWidth="170px">
                <span>素片</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item label="通用名：" labelWidth="170px">
                <span>素片</span>
              </el-form-item>
            </el-col>
            <el-col :span="6" offset="2">
              <el-form-item label="二级盐类衍生物：" labelWidth="170px">
                <span>素片</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item label="英文名称：" labelWidth="170px">
                <span>素片</span>
              </el-form-item>
            </el-col>
            <el-col :span="6" offset="2">
              <el-form-item label="复方及小儿标记：" labelWidth="170px">
                <span>素片</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item label="转换比：" labelWidth="170px">
                <span>素片</span>
              </el-form-item>
            </el-col>
            <el-col :span="6" offset="2">
              <el-form-item label="备用标识：" labelWidth="170px">
                <span>素片</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item label="含量：" labelWidth="170px">
                <span>素片</span>
              </el-form-item>
            </el-col>
            <el-col :span="6" offset="2">
              <el-form-item label="重（装）量：" labelWidth="170px">
                <span>素片</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item label="质量标准编号：" labelWidth="170px">
                <span>素片</span>
              </el-form-item>
            </el-col>
            <el-col :span="6" offset="2">
              <el-form-item label="质量标准类别：" labelWidth="170px">
                <span>素片</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item label="质量标准有效期：" labelWidth="170px">
                <span>素片</span>
              </el-form-item>
            </el-col>
            <el-col :span="6" offset="2">
              <el-form-item label="用法用量：" labelWidth="170px">
                <span>素片</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item label="国家基本药物：" labelWidth="170px">
                <el-radio-group v-model="value">
                  <el-radio label="soleType">是</el-radio>
                  <el-radio label="chainType">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item label="国家基本医疗保险药品：" labelWidth="170px">
                <el-radio-group v-model="value">
                  <el-radio label="soleType">甲类</el-radio>
                  <el-radio label="chainType">乙类</el-radio>
                  <el-radio label="1">民族药</el-radio>
                  <el-radio label="2">非国家基本医疗保险药品</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="6" offset="2">
              <el-form-item label="ATC中文名称：" labelWidth="170px">
                <el-input v-model="form.telephone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item label="OTC药品：" labelWidth="170px">
                <el-radio-group v-model="value">
                  <el-radio label="soleType">非OTC药品</el-radio>
                  <el-radio label="chainType">甲类OTC</el-radio>
                  <el-radio label="1">乙类OTC</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="6" offset="2">
              <el-form-item label="ATC编码：" labelWidth="170px">
                <el-input v-model="form.telephone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="20">
              <el-form-item label="新编药物医学分类：" labelWidth="170px">
                <el-input v-model="form.telephone" style="width: 22%"></el-input>
                <el-input v-model="form.telephone" style="width: 22%"></el-input>
                <el-input v-model="form.telephone" style="width: 22%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="" labelWidth="170px">
                <el-input v-model="form.telephone" style="width: 22%"></el-input>
                <el-input v-model="form.telephone" style="width: 22%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="15">
              <el-form-item label="备注：" prop="name" labelWidth="170px">
                <span>素片11111111111111111111111111111111111111</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-button>返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import ElCol from "element-ui/packages/col/src/col";
  export default {
    components: {ElCol},
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

