<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tablebox">
      <div>
        <el-form :model="form" ref="form" label-position="left" label-width="110px" class="demo-ruleForm"
                 size="small">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="标示药品：" prop="name">
                <span>{{form.drugName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="标示规格：">
                <span>{{form.drugSpecification}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="标示批号：" prop="name">
                <span>{{form.permitNumber}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="标示生产企业：">
                <span>{{form.manufacturer}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="被抽样单位：" prop="name">
                <span>{{form.sampledOrg}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="购销途径：">
                <span>{{form.tradeDesc}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="购入企业名称：" prop="name">
                <span>{{form.saleOrgName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="核查结果：">
                <span>{{form.inspectionResult}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="公报期数：" prop="name">
                <span>{{form.proclamationNumber}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公报时间：">
                <span>{{form.proclamationDate}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="创建人：" prop="name">
                <span>{{form.createUserName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="创建时间：">
                <span>{{form.createDate}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="最后修改人：" prop="name">
                <span>{{form.lastUpdateUserName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="最后修改时间：">
                <span>{{form.lastUpdateDate}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="备注：" prop="name">
                <span>{{form.remark}}</span>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
        <div class="foot-btn">
          <div class="foot-left">
            <el-button @click="goBack()">返回</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ElCol from "element-ui/packages/col/src/col";
  import {findShamDrugById} from 'src/axios/datacenter/authdata/qualitybulletin/qualityBulletin'

  export default {
    components: {ElCol},
    data() {
      return {
        id: "",
        form: {}
      }
    },

    created(){
      this.id = this.$route.params.id || undefined;
      this.load();
    },

    methods: {
      load() {
        findShamDrugById(this.id).then(res => {
          this.form = res.data;
        });
      },
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>

