<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tablebox">
      <div>
        <el-form :model="form" ref="form" :rules="rules" label-position="left" label-width="140px" class="demo-ruleForm"
                 size="small">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="被抽样单位类别：">
                <span>{{ getOrgType(form.sampledOrgType) }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="被抽样单位名称：">
                <span>{{ form.sampledOrgName }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="公告药品名：" prop="name">
                <span>{{ form.drugName }}</span>
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
              <el-form-item label="标示生产企业名称：" prop="name">
                <span>{{ form.manufacturerName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="经营企业名称：">
                <span>{{ form.supplierName }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="产品批号：" prop="name">
                <span>{{ form.permitNumber }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="不合格项：">
                <span>{{ form.disqualificationItem }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="公报期数：" prop="name">
                <span>{{ form.proclamationNumber }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="总期数：">
                <span>{{ form.proclamationTotal }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="公报时间：" prop="name">
                <span>{{ form.proclamationDate }}</span>
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
              <el-form-item label="检验部门：">
                <span>{{ form.testOffice }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="是否撤销批准文号：" prop="name">
                <span>{{ getStatus(form.permitState) }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注：">
                <span>{{ form.remark }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="创建人：" prop="name">
                <span>{{ form.createUserName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="创建时间：">
                <span>{{ form.createDate }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="最后修改人：" prop="name">
                <span>{{ form.lastUpdateUserName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="最后修改时间：">
                <span>{{ form.lastUpdateDate }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="foot-btn">
        <div class="foot-left">
          <el-button size="small" @click="goBack()">返回</el-button>
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

      getOrgType(val) {
        switch (val) {
          case "1":
            return "生产企业";
          case "2":
            return "经营企业";
          case "3":
            return "医院";
          case "4":
            return "药店";
          default:
            return val;
        }
      },

      getStatus(val) {
        if (val === "0") {
          return "否";
        } else if (val === "1") {
          return "是";
        } else {
          return val;
        }
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

