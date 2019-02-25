<template>
  <div>
    <div class="tabs-panel">
      <span class="active">企业基础信息</span>
    </div>
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="form" :model="form" :rules="rules" label-position="right" size="small" label-width="160px">
          <el-row :gutter="24">
            <el-col :span="10">
              <el-form-item label="企业名称" prop="name">
                <el-input v-model="form.name" placeholder="企业名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="10">
              <el-form-item label="统一社会信用代码">
                <el-input v-model="form.creditCode" placeholder="统一社会信用代码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="组织机构代码">
                <el-input v-model="form.organizeCode" placeholder="组织机构代码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="企业类型" prop="type">
                <el-checkbox v-model="form.type.factoryFlag" label="生产企业"></el-checkbox>
                <el-checkbox v-model="form.type.salerFlag" label="代理企业"></el-checkbox>
                <el-checkbox v-model="form.type.sendFlag" label="配送企业"></el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="企业简称" prop="abbr">
                <el-input v-model="form.abbr" placeholder="企业简称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="经济性质" prop="businessFlag">
                <el-select v-model="form.businessFlag" placeholder="经济性质">
                  <el-option v-for="x in businessFlag" :key="x.key" :label="x.value"
                             :value="x.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="企业曾用名">
                <el-input
                  type="textarea"
                  :rows="4"
                  v-model="form.usedName"
                  placeholder="企业曾用名">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="20">
              <el-form-item label="所在地区" prop="region">
                <el-cascader
                  size="300"
                  :options="region"
                  v-model="area"
                  @active-item-change="handleRegionChange">
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="是否法人企业">
                <el-radio v-model="form.isJuridicalCompany" label="1">是</el-radio>
                <el-radio v-model="form.isJuridicalCompany" label="0">否</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="分部负责人">
                <el-input v-model="form.branchPrincipal" placeholder="分部负责人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="分部名称">
                <el-input v-model="form.branchName" placeholder="分部名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="分部地址">
                <el-input v-model="form.branchAddress" placeholder="分部地址"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="备注">
                <el-input
                  type="textarea"
                  :rows="4"
                  v-model="form.remark"
                  placeholder="备注">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <p>
            <el-button type="primary" center>提交</el-button>
          </p>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "org-basic-info",
    data() {
      return {
        rules: this.metaRule(),
        businessFlag: [
          {key: "1", value: "国有企业"},
          {key: "2", value: "集体企业"},
          {key: "3", value: "股份合作企业"},
          {key: "4", value: "联营企业"},
          {key: "5", value: "有限责任公司"},
          {key: "6", value: "股份有限公司"},
          {key: "7", value: "私营企业"},
          {key: "8", value: "港澳台商投资企业"},
          {key: "9", value: "外商投资企业"},
          {key: "0", value: "其他企业"},
        ],
        region: [],
        area: undefined,
        form: {
          /* 企业基础信息 */
          name, // 企业名称:CAT_ORG.NAME
          creditCode: null, // 统一社会信用代码:CAT_ORG.CREDIT_CODE
          organizeCode: null, // 组织机构代码:CAT_ORG.ORGANIZE_CODE
          type: {
            factoryFlag: null, // 生产企业:CAT_ENTERPRISE.FACTORY_FLAG
            salerFlag: null, // 经营企业:CAT_ENTERPRISE.SALER_FLAG
            sendFlag: null, // 配送企业:CAT_ENTERPRISE.SEND_FLAG
          },
          abbr: null, // 企业简称:CAT_ORG.ABBR
          businessFlag: null, // 经济性质:CAT_ORG.BUSINESS_FLAG
          usedName: null, // 曾用名:CAT_ENTERPRISE.USED_NAME
          countryId: null, // 所在国家:CAT_ENTERPRISE.COUNTRY_ID
          provinceId: null, // 所在省/自治区/直辖市:CAT_ENTERPRISE.PROVINCE_ID
          cityId: null, // 所在市/地/州:CAT_ENTERPRISE.CITY_ID
          areaId: null, // 所在区/县（数据库里没有）
          isJuridicalCompany: "1", // 是否法人企业:CAT_ENTERPRISE.IS_JURIDICAL_COMPANY
          branchPrincipal: null, // 分部负责人:CAT_ENTERPRISE.BRANCH_PRINCIPAL
          branchName: null, // 分部名称:CAT_ENTERPRISE.BRANCH_NAME
          branchAddress: null, // 分部地址:CAT_ENTERPRISE.BRANCH_ADDRESS
          remark: null // 备注:CAT_ENTERPRISE.REMARK
        }
      }
    },
    created() {
    },
    methods: {
      save() {
        console.log(this.form.isJuridicalCompany);
      },
      metaRule() {
        return {
          name: [
            {required: true, message: '企业名称不能为空', trigger: 'blur'},
          ],
          type: [
            {required: true, message: '企业类型不能为空', trigger: 'blur'},
          ],
          abbr: [
            {required: true, message: '企业简称不能为空', trigger: 'blur'},
          ],
          businessFlag: [
            {required: true, message: '经济性质不能为空', trigger: 'blur'},
          ],
          accountName: [
            {required: true, message: '开户名称不能为空', trigger: 'blur'},
          ],
          accountBank: [
            {required: true, message: '开户银行不能为空', trigger: 'blur'},
          ],
          accountNumber: [
            {required: true, message: '开户账号不能为空', trigger: 'blur'},
          ],
          taxpayerCode: [
            {required: true, message: '纳税人登记号不能为空', trigger: 'blur'},
          ],
          tel: [
            {required: true, message: '企业电话不能为空', trigger: 'blur'},
          ],
          qq: [
            {required: true, message: '企业QQ号不能为空', trigger: 'blur'},
          ],
          regNo: [
            {required: true, message: '注册号不能为空', trigger: 'blur'},
          ],
          regName: [
            {required: true, message: '名称不能为空', trigger: 'blur'},
          ],
          regType: [
            {required: true, message: '类型不能为空', trigger: 'blur'},
          ],
          regFlat: [
            {required: true, message: '住所不能为空', trigger: 'blur'},
          ],
          juridicalPerson: [
            {required: true, message: '法定代表人不能为空', trigger: 'blur'},
          ],
          regAmount: [
            {required: true, message: '注册资金不能为空', trigger: 'blur'},
          ],
          regDate: [
            {required: true, message: '成立日期不能为空', trigger: 'blur'},
          ],
          regExpireS: [
            {required: true, message: '营业期限不能为空', trigger: 'blur'},
          ],
          regScope: [
            {required: true, message: '经营范围不能为空', trigger: 'blur'},
          ],
        }
      },
      addGmp(index) {
        this.$nextTick(() => {
          this.$refs.gmp.init(this.form.gmp, index);
        });
      },
      handleRegionChange(val) {
        cascRegion(this.region, val);
      }
    }
  }
</script>

<style scoped>

</style>
