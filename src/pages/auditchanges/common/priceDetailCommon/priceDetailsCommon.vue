<template>
  <div class="tableset gap-40">
    <el-form ref="form" :model="form" label-width="80px" label-position="left">
      <price-basics :projectProductId="this.projectProductId" :changeFlag="this.changeFlag"></price-basics>
     <!-- <el-row :gutter="24">
        <el-col :span="24">
          <el-radio-group v-model="form.priceType" label="价格类型">
            <el-radio label="0" v-if="form.priceType=='0'" disabled>全国最低中标价</el-radio>
            <el-radio label="1" v-if="form.priceType=='1'" disabled>计算价格</el-radio>
            <el-radio label="2" v-if="form.priceType=='2'" disabled>无最低中标价</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>-->

      <el-row :gutter="24">
        <el-col :span="24">
          <el-form-item label="价格类型" prop="PRICETYPE">
            <span>{{{"0":"全国最低中标价","1":"计算价格","2":"无最低中标价"}[form.priceType]}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="年度:">
            <span>{{form.yearId}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="省份:">
            <span>{{form.provinceName}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="项目名称:">
            <span>{{form.projectName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-row :gutter="24">
            <el-col :span="24">
              <el-row :gutter="24">
                <el-col :span="10">
                  <el-form-item label="中标价:">
                    <span><span style="color: #F00;" v-if="modelFlag.modelFlag==1||modelFlag.modelFlag==2">
                      变更前:</span>{{priceFormat(form.inPrice)}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-checkbox v-if="modelFlag.modelFlag==1" disabled>变更</el-checkbox>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="24" v-if="modelFlag.modelFlag==1||modelFlag.modelFlag==2">
              <span style=" : #F00;">变更后：<span style="color: #000">{{priceFormat(changeForm.inPrice)}}</span></span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="执行日期:">
            <span>{{form.executionDate |dateConvert}}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import priceBasics from 'src/pages/auditchanges/common/priceDetailCommon/priceBasics';
  import {findProjectProductPrice,findUpProjectProductById,findShowPriceByProductId} from 'src/axios/auditchanges/messagePublicity/price';
  import {priceFormat} from "src/utils";
  import moment from 'moment';

  export default {
    name: "price-details-common",
    components: {
      priceBasics,
      moment
    },
    props: ["projectProductId","changeFlag"],
    data() {
      return {
        changeForm:{},
        form: {},
        modelFlag: '0'
      }
    },
    created() {
      if(this.changeFlag){
        findUpProjectProductById(this.projectProductId).then(res => {
          //变更后
          this.changeForm = res.data;
        })
        findShowPriceByProductId(this.projectProductId).then(res =>{
          this.form = res.data;
        })
      }else{
        findProjectProductPrice(this.projectProductId).then(res =>{
          this.form = res.data;
        })
      }
    }, filters: {
      dateConvert: function (value) {
        if (value == null || value == '' || value == 'underfind') {
          return ''
        } else {
          return moment(value).format('YYYY-MM-DD')
        }
      }
    },
    methods: {
      priceFormat
    }
  }
</script>
