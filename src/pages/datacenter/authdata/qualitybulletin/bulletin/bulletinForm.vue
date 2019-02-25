<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tablebox">
      <div>
        <el-form :model="form" ref="form" :rules="rules" label-position="left" label-width="110px" class="demo-ruleForm"
                 size="small">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="品名：">
                <span>{{ form.drugName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="标示生产企业：">
                <span>{{ form.manufacturerName }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="生产批号：" prop="name">
                <span>{{ form.permitNumber }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="药品规格：">
                <span>{{ form.drugSpec }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="检品来源：" prop="name">
                <span>{{ form.sampledOrgName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="检验依据：">
                <span>{{ form.testAccouting }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="检验结果：" prop="name">
                <span>{{ getCheckFlag(form.checkFlag) }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="不合格项目：">
                <span>{{ form.disqualificationItem }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="检验机构：" prop="name">
                <span>{{ form.testOffice }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="foot-btn">
        <div class="foot-left">
          <el-button @click="goBack()">返回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ElCol from "element-ui/packages/col/src/col";
  import {findBadDrugById} from 'src/axios/datacenter/authdata/qualitybulletin/qualityBulletin'

  export default {
    components: {ElCol},
    data() {
      return {
        id: '',
        form: {}
      }
    },

    created(){
      this.id = this.$route.params.id || undefined;
      this.load();
    },

    methods: {

      load() {
        findBadDrugById(this.id).then(res => {
          this.form = res.data;
        });
      },

      getCheckFlag(val) {
        if (val === "0") {
          return "不合格";
        } else if (val === "1") {
          return "合格";
        }
      },

      goBack() {
        this.$router.go(-1);
      },
    }
  }
</script>

