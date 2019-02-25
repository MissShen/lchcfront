<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tablebox">
      <div style="width: 500px" class="padding20">
        <el-form :model="dataForm" ref="dataForm" :rules="rules" label-width="100px" class="demo-ruleForm" size="small">
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="买方名称：" prop="name">
                <span>{{ this.orgName }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="地址简称：" prop="addressAbbr">
            <el-input type="consignee" v-model="dataForm.addressAbbr" maxlength="100"></el-input>
          </el-form-item>
          <el-form-item label="收货人：" prop="receivers">
            <el-input type="consignee" v-model="dataForm.receivers" maxlength="100"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：" prop="mobile">
            <el-input type="phone" v-model="dataForm.mobile" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="区域：" required class="nomar">
            <ul class="only-from">
              <li class="w50">
                <el-form-item prop="city" size="small">
                  <el-select v-model="dataForm.city"  :disabled="dataForm.dCity" size="small" placeholder="市" @change="queryRegions()">
                    <el-option
                      v-for="item in cities"
                      :key="item.id"
                      :label="item.nameChn"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </li>
              <li class="w50">
                <el-form-item prop="area" size="small">
                  <el-select v-model="dataForm.area" :disabled="dataForm.dArea" size="small" placeholder="区" @change="showRegion()">
                    <el-option
                      v-for="item in regions"
                      :key="item.id"
                      :label="item.nameChn"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </li>
            </ul>
          </el-form-item>
          <el-form-item label="详细地址：" prop="address">
            <el-input type="address" v-model="dataForm.address"  maxlength="500"></el-input>
          </el-form-item>
          <el-form-item label="默认地址：" prop="defaultFlag">
            <el-radio-group v-model="dataForm.defaultFlag">
              <el-radio size="small" value="1" label="1">是</el-radio>
              <el-radio size="small" value="0" label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="dataFormSubmit()">保存</el-button>
            <el-button size="small" @click="goBack()">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

  import {queryOrg} from 'src/axios/contract/datamanagement/orgCommon'
  import {
    queryHospitalAddress,
    addHospitalAddress,
    updateHospitalAddress,
    queryIsApproveConfig,
    findByParentId,
    checkAddress,
    checkAddressAbbr,
    checkDefaultAddress} from 'src/axios/contract/datamanagement/hospitalAddress'

  export default {
    data() {
      return {
        dataForm: {
          id: '',
          name: '',
          receivers: '',
          mobile: '',
          address: '',
          district: '',
          city: '',
          area: '',
          defaultFlag: '1',
          dCity: false,
          dArea: false,
          addressAbbr : ''
        },
        isPath : "",
        buyerId : "",
        rules: this.metaRule(),  // 表单验证初始化
        districts: [],
        cities: [],
        regions: [],
        orgName: undefined,
        orgCommon: undefined
      };
    },
    created() {
      this.dataForm.id = this.$route.query.id || '-1';
      if(this.$route.query.type == 'isDown'){
        this.buyerId = this.$route.query.buyerId;
      }
      this.queryCities();
    },
    methods: {
      metaRule(){
        var sendCode = (rule, value, callback) => {

          let isMobile=/^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|17[012356789][0-9]{8}|18[012356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
          let isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
          if (isPhone.test(this.dataForm.mobile) || isMobile.test(this.dataForm.mobile)) {
            callback()
          } else {
            callback(new Error('联系电话格式不正确'));
          }
        }
        var checkAddressInfo = (rule, value, callback) => {
          if(value!=""){
            checkAddress(value,this.dataForm.id,this.dataForm.city,this.dataForm.area,this.buyerId).then(res => {
              if(res.data){
                callback();
              }else{
                callback(new Error('该地址已存在，请检查后重新设置。'));
              }
            })
          }else{
            callback(new Error('详细地址不能为空'));
          }
        }
        var checkAddressAbbrInfo = (rule, value, callback) => {
          if(value!=""){
            checkAddressAbbr(value,this.dataForm.id,this.buyerId).then(res => {
              if(res.data){
                callback();
              }else{
                callback(new Error('该地址已存在，请检查后重新设置。'));
              }
            })
          }else{
            callback(new Error('地址简称不能为空'));
          }
        }
/*        var checkRadioParam = (rule, value, callback) => {
          if(value!=0){
            checkDefaultAddress(value,this.dataForm.id,this.buyerId).then(res => {
              if(res.data.state=="true"){
                callback();
              }else{
                callback(new Error("您已经设置了："+res.data.cityName+"-"+res.data.areaName+"-"+res.data.address+" 为默认地址！"));
              }
            })
          }else{
            callback();
          }
        }*/
        return {
          mobile: {required:true,validator: sendCode, trigger: 'blur'},
          receivers: {required: true, message: '请输入收货人', trigger: 'blur'},
          city: {required: true, message: '请选择市', trigger: 'change'},
          area: {required: true, message: '请选择区', trigger: 'change'},
          address: {required:true,validator: checkAddressInfo, trigger: 'submit'},
          addressAbbr: {required:true,validator: checkAddressAbbrInfo, trigger: 'submit'},
          // defaultFlag: {required:true,validator: checkRadioParam, trigger: 'submit'}
        }
      },
      submitForm(dataForm) {
        this.$refs[dataForm].validate((valid) => {
          if (valid) {
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      queryCities() {
        findByParentId('FR20T0000011000000050066').then(res => {
          console.log('queryCities: ', res);
          this.cities = res.data;
          this.dataForm.city = this.cities[0].id;
          this.queryRegions();
        })
      },
      queryRegions() {
        findByParentId(this.dataForm.city).then(res => {
          console.log('queryRegions: ', res);
          this.regions = res.data;
          if (this.regions.length > 0) {
            this.dataForm.area = this.regions[0].id;
          } else {
            this.dataForm.area = [];
          }
          this.queryAddress(this.dataForm.id);
          this.queryIsApprove();
        })
      },
      showRegion() {
        console.log(this.dataForm.region);
      },
      goBack() {
        if(this.$route.query.type == 'isDown' && this.$route.query.id =="-1"){
          this.$router.push("/contract/datamanagement/hospitalDeliveryAddressList/"+'isDown');
        }else if(this.$route.query.type == 'isUp'){
          this.$router.push("/contract/datamanagement/hospitalDeliveryAddressList/"+'isUp');
        }else if(this.$route.query.type == 'isDown' && this.$route.query.id !="-1"){
          this.$router.push("/CONTRACT/datamanagement/hospitalAddressList/" + this.buyerId);
        }
      },
      dataFormSubmit() {
          this.$refs['dataForm'].validate((valid) => {
            if (valid) {
              var http = this.dataForm.id === '-1' ? addHospitalAddress(this.dataForm,this.buyerId) : updateHospitalAddress(this.dataForm,this.buyerId)
              http.then(res => {
                if(res.success){
                  this.$message({
                    type : 'success',
                    message: res.data,
                    onClose: () => {
                      if(this.$route.query.type == 'isUp'){
                        this.$router.push("/contract/datamanagement/hospitalDeliveryAddressList/"+'isUp');
                      }else if(this.$route.query.type == 'isDown'){
                        this.$router.push("/CONTRACT/datamanagement/hospitalAddressList/" + this.buyerId);
                      }
                    }
                  })
                }else{
                  this.$message({
                    message: '保存失败',
                    type: 'error',
                  })
                }
              })
            }
          })
      },
      queryIsApprove(){
        queryIsApproveConfig().then(resp => {
          console.log(resp);
          if(resp.data.isType!='0'){
            this.dataForm.city = resp.data.city;
            this.dataForm.area = resp.data.area;
            this.dataForm.dCity = true;
            this.dataForm.dArea = true;
          }else{
          }
        })
      },
      queryAddress() {
        console.log("------id:" + this.dataForm.id);
        if (this.dataForm.id === '-1') {
          //  查医院名称
          queryOrg(this.buyerId).then(resp => {
            console.log(resp);
            this.orgName = resp.data.name;
          })
        } else {
          //
          queryHospitalAddress(this.dataForm.id).then(resp => {
            console.log(resp);
            this.orgName = resp.data.buyerName;
            this.orgCommon = resp.data;
            //  回显数据
            this.dataForm.addressAbbr = resp.data.addressAbbr;
            this.dataForm.receivers = resp.data.receivers;
            this.dataForm.mobile = resp.data.mobile;
            this.dataForm.city = resp.data.city;
            this.dataForm.area = resp.data.area;
            this.dataForm.address = resp.data.address;
            this.dataForm.defaultFlag = resp.data.defaultFlag;
          })
        }
      }
    }
  }
</script>
