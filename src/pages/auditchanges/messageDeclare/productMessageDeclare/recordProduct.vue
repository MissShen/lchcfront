<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!--<div class="tabs-panel">-->
    <!--<span class="active">备案产品申报</span>-->
    <!--</div>-->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="query" :rules="rules" :model="query" label-position="right" size="small">
          <el-row :gutter="24">
            <el-col :span="10">
              <el-form-item label="请输入备案号：" labelWidth="180px" prop="code">
                <el-input v-model="query.code"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item>
                <el-button type="warning" @click="submit('query')">验证</el-button>
                <el-button size="small" class="el-button-pale" @click="$router.go(-1)">返回</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>

  import {findDeclareMessageByCode, checkFilingNumber} from 'src/axios/auditchanges/messageDeclare/product'

  export default {
    data () {
      return {
        activeName: 'first',  // 当前标签
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        rules: {
          code: [
            {required: true, message: '请输入备案号', trigger: 'blur'},
            {min: 16, max: 16, message: '请填写16位正确备案号', trigger: 'blur'}
          ],
        }
      }
    },

    methods: {
      metaQuery () {
        return {
          code: ""
        }
      },
      submit(form){
        this.$refs[form].validate(async (valid) => {
          if (valid) {
            let res = await findDeclareMessageByCode(this.query.code);
            var data = res.data;
            if (data == undefined || data == null) {
              this.$alert('备案号不存在，无法新增', '提示', {
                confirmButtonText: '确定',
                type: 'warning',
              });
            } else {
              var code = 0;
              await checkFilingNumber(this.query.code).then(res => {
                code = res.data;
              });
              if (code > 0) {
                this.$alert('备案号已失效', '提示', {
                  confirmButtonText: '确定',
                  type: 'warning',
                });
              } else {
                this.$router.push("/AUDIT/messageDeclare/declareForm/" + this.query.code);
              }
            }
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

