<template>
  <el-dialog
    :title="'新增药品规格信息'"
    :close-on-click-modal="false"
    :append-to-body="true"
    width="50%"
    :visible.sync="visible">
      <div>
        <el-form :model="query" ref="query"
                 label-width="150px" label-position="right" :inline="true" size="small">

          <el-row :gutter="24">
              <el-form-item label="新增规格：" prop="">
                <el-input v-model="form.spec"></el-input>
              </el-form-item>
          </el-row>

        </el-form>
      </div>

    <span slot="footer">
      <el-button size="small" type="primary" @click="submit()">保存</el-button>
      <el-button size="small" @click="visible = false">关闭</el-button>
    </span>

  </el-dialog>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  import {insertSpecification} from 'src/axios/datacenter/drugdata/druginfo/druginfo'


  export default {
    components: {ElCol},
    name: "addSpec",
    data() {
      return {
        visible: false,
        form: {
          spec: undefined
        },
      }
    },

    methods: {
      fillData(preCode) {
        this.preCode = preCode;
        this.visible = true;

      },
      submit() {
        // 新增
        insertSpecification(this.preCode, this.form.spec).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.visible = false;
              this.$emit('updateData')
            }
          });
        })
      }
    }
  }
</script>
