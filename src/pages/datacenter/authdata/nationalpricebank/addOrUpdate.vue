<template>
  <el-dialog
    :title="this.type"
    :close-on-click-modal="false"
    width="58%"
    :visible.sync="visible">

    <div class="padding20">
      <el-form :model="form" :rules="rules" ref="form" @keyup.enter.native="dataFormSubmit()"
               label-width="120px" label-position="left" size="small">

        <el-form-item label="选择地区" prop="province">
          <el-select v-model="form.province" placeholder="请选择" class="width-300">
            <el-option
              v-for="item in provinceList"
              :key="item.id"
              :label="item.nameChn"
              :value="item.nameChn">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="form.projectName" class="width-300"></el-input>
        </el-form-item>

        <el-form-item label="年度" prop="projectYear">
          <el-input v-model="form.projectYear" class="width-300"></el-input>
        </el-form-item>

        <el-form-item label="项目价格" prop="projectPrice">
          <el-input type="number" v-model="form.projectPrice" class="width-300"></el-input>
        </el-form-item>

        <el-form-item label="执行日期" prop="zxDate" class="width-420">
          <el-date-picker type="date" v-model="form.zxDate" class="width-300"></el-date-picker>
        </el-form-item>

        <el-form-item label="是否最低价" prop="isMin">
          <el-radio-group v-model="form.isMin">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否交易" prop="isMin">
          <el-radio-group v-model="form.isJy">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form>
    </div>

    <span slot="footer">
      <el-button size="small" type="primary" @click="submitForm('form')">保存</el-button>
      <el-button size="small" @click="close()">关闭</el-button>
    </span>

  </el-dialog>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  import {regions} from 'src/axios/datacenter/orgdata/catbuyer/catBuyer'
  import {add} from 'src/axios/datacenter/authdata/nationalprice/nationPrice'
  import {update} from 'src/axios/datacenter/authdata/nationalprice/nationPrice'
  import {findPriceById} from 'src/axios/datacenter/authdata/nationalprice/nationPrice'
  import {isNumber} from 'src/utils/validateUtil'

  export default {
    components: {ElCol},
    name: "addOrUpdate",
    data() {
      return {
        id: '',
        visible: false,
        provinceList: [],
        form: this.metaData(),
        rules: {
          province: {required: true, message: '必填项不能为空', trigger: 'blur'},
          projectName: {required: true, message: '必填项不能为空', trigger: 'blur'},
          projectPrice: {required: true, message: '必填项不能为空', trigger: 'blur'},
          projectYear: [
            {required: true, message: '必填项不能为空', trigger: 'blur'},
            {min: 4, max: 4, message: '长度必须为4位', trigger: 'blur'}
          ],
          zxDate: {required: true, message: '必填项不能为空', trigger: 'blur'},
          isMin: {required: true, message: '必填项不能为空', trigger: 'blur'}
        }
      }
    },

    methods: {
      fillData(type, id) {
        this.visible = true;
        if (type === "ADD") {
          this.type = "新增";
          this.form = this.metaData();
        } else if (type === "UPDATE") {
          this.type = "修改";
          findPriceById(id).then(res => {
            this.form = res.data;
          });
        }

        this.id = id;
        regions().then(res => {
          this.provinceList = res.data;
          this.provinceList.push({id: '1', nameChn: '总后'});
          this.provinceList.push({id: '2', nameChn: '全军统筹'});
        });
      },

      submitForm(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            if (this.type === "新增") {
              this.form.productId = this.id;
              add(this.form).then(res => {
                this.$message({
                  message: res.data,
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                    this.visible = false;
                    this.$refs[form].resetFields();
                    this.$emit('refreshData');
                  }
                })
              })
            } else if (this.type === "修改") {
              update(this.form).then(res => {
                this.$message({
                  message: res.data,
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                    this.visible = false;
                    this.$refs[form].resetFields();
                    this.$emit('refreshData');
                  }
                })
              })
            }
          } else {
            this.$alert('请完善必填信息', '提示', {
              confirmButtonText: '确定',
              type: 'warning',
            });
            return false;
          }
        });
      },

      close() {
        this.visible = false;
        this.form = this.metaData();
      },

      metaData() {
        return {
          id: '',
          productId: '',
          province: '',
          projectName: '',
          projectPrice: undefined,
          projectYear: '',
          zxDate: undefined,
          isMin: "0",
          isJy: "0"
        }
      }
    }
  }
</script>
