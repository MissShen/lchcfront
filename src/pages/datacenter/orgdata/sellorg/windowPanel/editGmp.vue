<template>
  <el-dialog
    title="编辑GMP信息"
    :close-on-click-modal="false"
    width="75%"
    :visible.sync="visible">

      <div class="gap-40">
        <el-form :model="resData" ref="form" :rules="rules" class="form-bold" size="small" label-width="100px" label-position="left">

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="证书编号" prop="CERTIFICATE_NUMBER">
                <el-input type="phone" v-model="resData.CERTIFICATE_NUMBER" maxlength="200"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="地址" prop="PRODUCTION_LOCATION">
                <el-input type="textarea" v-model="resData.PRODUCTION_LOCATION" maxlength="150"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="认证范围" prop="ATTESTATION_CATEGORY">
                <el-input type="textarea" v-model="resData.ATTESTATION_CATEGORY" maxlength="4000"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="有效期至" prop="nameChn">
                <el-date-picker
                  v-model="resData.EXPIRY_DATE"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>

              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发证机关" prop="OFFICE_LICENCE">
                <el-input type="name" v-model="resData.OFFICE_LICENCE" maxlength="150"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="发证日期" prop="nameChn">
                <el-date-picker
                  v-model="resData.LICENCE_DATE"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否新版GMP" prop="nameChn">
                <el-radio-group v-model="resData.IS_NEW">
                  <el-radio label="1" >是</el-radio>
                  <el-radio label="0" >否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <!--<el-row>-->
            <!--<el-col :span="12">-->
              <!--<el-form-item label="查看附件" prop="nameChn">-->
                <!--<el-input type="name" v-model="resData.GMP_ATTACH_ID"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
          <!--</el-row>-->

        </el-form>

      </div>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="myClose()" class="el-button-pale">取消</el-button>
        <el-button size="small" type="primary" @click="saveGmp()">保存</el-button>
      </span>

  </el-dialog>
</template>

<script>

  import {findGmp, updateGmp} from 'src/axios/datacenter/orgdata/sell/seller'
  import DivideDrugs from "../../../drugsdata/atccode/windowPanel/divideDrugs";

  export default {
    components: {DivideDrugs},
    name: "orgForm",
    props: {
      parentId: {}
    },
    data() {
      return {
        visible: false,
        id: undefined,
        resData: undefined,
        rules: {
          CERTIFICATE_NUMBER: [{ required: true, message: '证书编号不能为空', trigger: 'blur' }],
          ATTESTATION_CATEGORY: [{ required: true, message: '认证范围不能为空', trigger: 'blur' }],
          OFFICE_LICENCE: [{ required: true, message: '发证机关不能为空', trigger: 'blur' }]
        }
      }
    },
    methods: {
      fillData(id) {

        this.id = id || undefined
        this.visible = true

        this.metaList(id)

      },
      metaList(id) {
        findGmp(id).then(res => {
          this.resData = res.data;
          this.resData.gmpId = this.id
        })
      },
      // 返回
      myClose() {
        this.$emit('myChangeGmpList');
        this.resetForm('form');
        this.visible = false;
      },
      saveGmp() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            updateGmp(this.resData).then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                }
              });
              this.myClose()
            })
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
