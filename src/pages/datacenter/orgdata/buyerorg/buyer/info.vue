<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tablebox">
      <div>

        <el-form :model="form" ref="form" label-width="170px" class="demo-ruleForm" size="small" label-position="left">

          <h3>企业基础信息</h3>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="统一社会信用代码：" prop="name">
                <span>{{form.catOrg.creditCode}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="组织机构代码：" prop="name">
                <span>{{form.catOrg.organizeCode}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="单位名称：" prop="name">
                <span>{{form.catOrg.name}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位代码：" prop="name">
                <span>{{form.catOrg.code}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="单位简称：" prop="name">
                <span>{{form.catOrg.abbr}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="拼音简称：" prop="name">
                <span>{{form.catOrg.spellAbbr}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="五笔简称：" prop="name">
                <span>{{form.catOrg.nameWb}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="医疗机构等级：" prop="name">
                <span>{{gradeNo(form.catBuyer.gradeNo)}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="医疗机构性质：" prop="name">
                <span>{{orgKind(form.catBuyer.orgKind)}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="医疗机构类别：" prop="name">
                <span>{{buyerKind(form.catBuyer.buyerKind)}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="隶属关系：" prop="name">
                <span>{{subjectFlag(form.catBuyer.subjectFlag)}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="法人代表：" prop="name">
                <span>{{form.catBuyer.orgPresider}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="单位地址：" prop="name">
                <span>{{form.catBuyer.orgAddress}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="医院定点机构：" prop="name">
                <span>{{getStatus(form.catBuyer.medicareFlag)}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="所在省/自治区/直辖市：" prop="name">
                <span>{{form.catBuyer.provinceName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所在市/地/州：" prop="name">
                <span>{{form.catBuyer.cityName}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="所在区/县市/县：" prop="name">
                <span>{{form.catBuyer.countyName}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="床位数：" prop="name">
                <span>{{form.catBuyer.bedNumber}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="医院的所有制：" prop="name">
                <span>{{form.catBuyer.proprietorship}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="日门诊量：" prop="name">
                <span>{{form.catBuyer.outpatientPerDay}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="人均用药金额：" prop="name">
                <span>{{form.catBuyer.sumPerPerson}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="年药品销售收入：" prop="name">
                <span>{{form.catBuyer.salesumPerYear}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="医院的特色门诊：" prop="name">
                <span>{{form.catBuyer.featureClinic}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="医师数：" prop="name">
                <span>{{form.catBuyer.doctorNum}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="门诊药品金额：" prop="name">
                <span>{{form.catBuyer.clinicMedicalMoney}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="住院人数：" prop="name">
                <span>{{form.catBuyer.inpatientNum}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位备注：" prop="name">
                <span>{{form.catBuyer.orgDesc}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="联系人：" prop="name">
                <span>{{form.catBuyer.linkPerson}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话：" prop="name">
                <span>{{form.catBuyer.linkPhone}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="联系人邮箱：" prop="name">
                <span>{{form.catBuyer.linkEmail}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <h3>资信信息</h3>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="开户名称：" prop="name">
                <span>{{form.catBuyer.orgAccountName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="开户银行：" prop="name">
                <span>{{form.catBuyer.orgBank}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="开户账号：" prop="name">
                <span>{{form.catBuyer.orgAccount}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="纳税人登记号：" prop="name">
                <span>{{form.catBuyer.taxCode}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="邮政编码：" prop="name">
                <span>{{form.catBuyer.postCode}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位电话：" prop="name">
                <span>{{form.catBuyer.orgPhone}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="单位网址：" prop="name">
                <span>{{form.catBuyer.orgUrl}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位传真：" prop="name">
                <span>{{form.catBuyer.orgFaxe}}</span>
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
  import {info} from 'src/axios/datacenter/orgdata/catbuyer/catBuyer'
  import ElCol from "element-ui/packages/col/src/col";
  export default {
    components: {ElCol},
    data() {
      return {
        id: '',
        form: {
          catBuyer: {},
          catOrg: {},
        }
      };
    },

    created(){
      this.id = this.$route.params.id || undefined;
      this.load(this.id);
    },
    methods: {
      load(id) {
        info(id).then(res => {
          this.form = res.data;
        })
      },

      subjectFlag(status) {
        if (status === "1") {
          return "军队";
        } else if (status === "2") {
          return "中央";
        } else if (status === "3") {
          return "省（直辖市）"
        } else if (status === "4") {
          return "地市"
        } else if (status === "5") {
          return "县级"
        } else if (status === "6") {
          return "其他"
        }
      },

      buyerKind(status) {
        if (status === "1") {
          return "综合医院";
        } else if (status === "2") {
          return "中医医院";
        } else if (status === "3") {
          return "中西医结合医院"
        } else if (status === "4") {
          return "民族医院"
        } else if (status === "5") {
          return "专科医院"
        } else if (status === "6") {
          return "疗养院"
        } else if (status === "7") {
          return "护理院（站）"
        } else if (status === "8") {
          return "卫生院"
        } else if (status === "9") {
          return "急救中心（站）"
        } else if (status === "A") {
          return "妇幼保健院（所、站）"
        } else if (status === "B") {
          return "专科疾病防治院（所、站）"
        } else if (status === "C") {
          return "其他"
        } else {
          return status;
        }
      },

      gradeNo(status) {
        if (status === "1") {
          return "一级甲等";
        } else if (status === "2") {
          return "一级乙等";
        } else if (status === "3") {
          return "一级丙等"
        } else if (status === "4") {
          return "二级甲等"
        } else if (status === "5") {
          return "二级乙等"
        } else if (status === "6") {
          return "二级丙等"
        } else if (status === "7") {
          return "三级甲等"
        } else if (status === "8") {
          return "三级乙等"
        } else if (status === "9") {
          return "三级丙等"
        } else if (status === "A") {
          return "三级特等"
        } else if (status === "B") {
          return "其他"
        } else if (status === "C") {
          return "一级"
        } else if (status === "D") {
          return "二级"
        } else if (status === "E") {
          return "三级"
        } else {
          return status;
        }
      },
      getStatus(code){
        const arrStatus = ['否', '是'];
        return arrStatus[code];
      },
      orgKind(status){
        const arrStatus = ['非盈利', '盈利'];
        return arrStatus[status];
      },
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>
