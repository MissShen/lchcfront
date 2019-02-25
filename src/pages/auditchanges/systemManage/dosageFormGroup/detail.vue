<template>
  <el-dialog top="2vh" title="合并剂型查看" :visible.sync="visible" :close-on-click-modal="false" width="60%">
    <div>
      <el-form ref="form" :model="form" label-width="110px" label-position="left" class="gap-40 form-bold">
        <el-form-item label="选择项目" prop="CAT_PROJECT_ID">
          {{ form.PROJECT_NAME }}
        </el-form-item>
        <el-form-item label="合并剂型名称" prop="GROUP_NAME">
          {{ form.GROUP_NAME }}
        </el-form-item>
        <el-form-item label="实际剂型名称" prop="DOSAGE_FORM_NAMES">
          {{ form.DOSAGE_FORM_NAMES }}
        </el-form-item>
        <el-form-item label="备注" prop="REMARK">
          {{ form.REMARK }}
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button @click="visible = false" size="small">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {dosageView} from 'src/axios/auditchanges/systemManage/dosageFormGroup'

  export default {
      name: "detail",
      data() {
        return {
          visible: false,
          form: this.metaForm(),
        }
      },
      methods: {
        init(id) {
          this.visible = true;
          dosageView(id).then(res => {
            console.log(res);
            this.form = res.data;
          })
        },
        metaForm() { // 表单数据初始化
          return {
            /*   form: {*/
            id: undefined,
            GROUP_NAME: undefined,
            DOSAGE_FORM_IDS: undefined,
            DOSAGE_FORM_NAMES: undefined,
            PROJECT_NAME: undefined,
            REMARK: undefined,
            CAT_PROJECT_ID: undefined,
            ENABLE_FLAG: "1",
            /* }*/
          }
        },
      }
    }
</script>
