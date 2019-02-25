<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="padding20">
      <div class="width-520">
        <el-form :model="from" ref="from" :rules="rules" label-position="left" label-width="120px" class="demo-ruleForm" size="small">
              <el-form-item label="所在省份：" prop="consignee">
                  <el-select v-model="province" placeholder="请选择" class="w100" @change="selectChangeProvince()">
                    <el-option
                      v-for="item in provinces"
                      :key="item.code"
                      :label="item.nameChn"
                      :value="item.code">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="所在城市：" prop="city">
                  <el-select v-model="from.city" class="w100" placeholder="请选择" @change="selectChangeCity()">
                    <el-option
                      v-for="item in cities"
                      :key="item.code"
                      :label="item.nameChn"
                      :value="item.code">
                    </el-option>
                  </el-select>
              </el-form-item>

              <el-form-item label="县(县市)编码：" prop="code" class="coleWidth">
                <ul class="only-from">
                  <li class="w50"><el-input type="phone" v-model="from.twoCode" :disabled="true"></el-input></li>
                  <li class="w50"><el-input type="phone" v-model="from.code" maxlength="2"></el-input></li>
                </ul>
              </el-form-item>

              <el-form-item label="县(县市)名称：" prop="nameChn">
                <el-input type="phone" v-model="from.nameChn" maxlength="40"></el-input>
              </el-form-item>

              <el-form-item label="字母码：">
                <el-input type="consignee" v-model="from.letterCode" maxlength="10"></el-input>
              </el-form-item>

              <el-form-item label="备注：">
                <el-input type="textarea" :rows="2" v-model="from.remark" maxlength="40">
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="primary" @click="submitForm('from')">保存</el-button>
                <el-button size="small" @click="goBack()">返回</el-button>
              </el-form-item>

        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

  import {provinceAllList, cityAllListOfCode, addCounty} from 'src/axios/datacenter/basedata/region/region'

  export default {
    data() {
      return {
        province: '',
        provinces: '',
        cities: '',
        from: {
          city: '',
          twoCode: '00',
          code: '',
          nameChn: '',
          letterCode: '',
          remark: '',
          parentCode: ''
        },
        rules:{
          // consignee:{ required: true, message: '请选择所在省份', trigger: 'blur'},
          city:{ required: true, message: '请选择所在城市', trigger: 'blur'},
          code:{ required: true, message: '请输入县(县市)编码', trigger: 'blur'},
          nameChn:{ required: true, message: '请输入县(县市)名称', trigger: 'blur'}
        }
      };
    },
    //界面加载完成后执行
    created(){

      provinceAllList().then(res => {
        this.provinces = res.data
      })

      cityAllListOfCode(this.province).then(res => {
        this.cities = res.data
      })

    },
    methods: {
      submitForm(from) {
        this.$refs[from].validate((valid) => {
          if (valid) {

            addCounty(this.from).then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                }
              });
              this.goBack()
            })
          }
        });
      },
      goBack() {
        this.$router.go(-1);
      },
      selectChangeProvince() {

        this.from.twoCode = this.province + this.from.city

        //更新城市
        cityAllListOfCode(this.province).then(res => {
          this.cities = res.data
//          this.from.city = this.cities[0];
        })

      },
      selectChangeCity() {
        this.from.twoCode = this.province + this.from.city
      }
    }
  }
</script>
