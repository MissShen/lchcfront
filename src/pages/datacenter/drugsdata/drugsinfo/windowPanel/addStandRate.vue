<template>
  <el-dialog
    :title="'新增转换比'"
    :close-on-click-modal="false"
    :append-to-body="true"
    width="50%"
    :visible.sync="visible">
      <div>
        <el-form :model="form" ref="form"
                 label-width="150px" label-position="right" :inline="true">

          <el-row :gutter="24">
              <el-form-item label="新增转换比：" prop="">
                <el-input v-model="form.rate"></el-input>
              </el-form-item>
          </el-row>

        </el-form>
      </div>

    <span slot="footer">
      <el-button size="small" @click="submit()" type="primary">保存</el-button>
      <el-button size="small" @click="visible = false">关闭</el-button>
    </span>

  </el-dialog>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  import {insertConvertRateList} from 'src/axios/datacenter/drugdata/druginfo/druginfo'


  export default {
    components: {ElCol},
    name: "addStandRate",
    data() {
      return {
        visible: false,
        form: {
          rate: ''
        },
        codeBig: undefined,
        codeSmall: undefined,
        name: undefined,
        dos: undefined,
        spec: undefined,
        preCode: undefined,
      }
    },

    methods: {

      fillData(codeBig, codeSmall, name, dos, spec, preCode) {

        this.codeBig = codeBig;
        this.codeSmall = codeSmall;
        this.name = name;
        this.dos = dos;
        this.spec = spec;
        this.preCode = preCode;

        this.visible = true;

      },

      submit() {
        console.log("点击提交按钮，参数为：",this.codeBig, this.codeSmall, this.name, this.dos, this.spec, this.form.rate, this.preCode)
        // 新增
        insertConvertRateList(this.codeBig, this.codeSmall, this.name, this.dos, this.spec, this.form.rate, this.preCode).then(res => {
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
