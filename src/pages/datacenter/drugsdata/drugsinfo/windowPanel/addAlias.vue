<template>
  <el-dialog
    :title="'新增药品通用名称'"
    :close-on-click-modal="false"
    :append-to-body="true"
    width="50%"
    :visible.sync="visible">
      <div>
        <el-form :model="query" ref="query"
                 label-width="150px" label-position="right" :inline="true" size="small">

          <el-row :gutter="24">
              <el-form-item label="通用名中文名称：" prop="">
                <el-input v-model="query.nameChn"></el-input>
              </el-form-item>
          </el-row>
          <el-row :gutter="24">
              <el-form-item label="通用名英文名称：">
                <el-input v-model="query.nameEng"></el-input>
              </el-form-item>
          </el-row>
        </el-form>
      </div>

    <span slot="footer">
      <el-button size="small" type="primary" @click="submit">保存</el-button>
      <el-button size="small" @click="visible = false">关闭</el-button>
    </span>

  </el-dialog>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  import {insertCommonName} from 'src/axios/datacenter/drugdata/druginfo/druginfo'

  export default {
    components: {ElCol},
    name: "addAlias",
    data() {
      return {
        visible: false,
        form: {},
        query: {
          nameChn: undefined,
          nameEng: undefined
        },
        codeBig: undefined,
        codeSmall: undefined
      }
    },

    methods: {
      fillData(codeBig, codeSmall) {
        this.codeBig = codeBig;
        this.codeSmall = codeSmall;
        this.query.nameChn = '';
        this.query.nameEng = '';
        this.visible = true;
      },
      submit() {
        // 新增
        insertCommonName(this.codeBig, this.codeSmall, this.query.nameChn, this.query.nameEng).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.visible = false;
              this.$emit('updateData');
            }
          });
        })
      }
    }
  }
</script>
