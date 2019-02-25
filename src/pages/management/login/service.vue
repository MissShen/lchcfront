<template>
  <div>
    <div class="login-main" @click="hidePopPic">
      <div class="service">
      </div>
      <div class="popPic" v-show="picVisible" id="popPic">
        <img :src="userImageCode">
      </div>

      <div class="service-main">
        <div class="service-from">
          <div class="formrow">
            <span><el-input v-model="queryData.name" placeholder="产品名称" size="small"></el-input></span>
            <span class="service-yzm service-code-box">
              <el-input v-model="queryData.code" placeholder="验证码" size="small"></el-input>
              <!--<img src="../../../assets/images/yzm.jpg" width="100"/>-->
              <div class="code-box" @click="refreshCode">
                <s-identify :identifyCode="identifyCode" ref="SIdentify" @click="refreshCode"></s-identify>
              </div>
            </span>
            <el-button type="primary" size="small" @click="serviceQuery" style="margin-right: -90px">查询</el-button>
          </div>
        </div>
        <div class="tableset service-table" v-show="isShow">
          <template>
            <el-table :data="resData.list" stripe border style="width: 100%">
              <el-table-column type="index" label="序号" width="50"></el-table-column>
              <el-table-column prop="productName" label="产品名"></el-table-column>
              <el-table-column prop="tradeName" label="商品名"></el-table-column>
              <el-table-column prop="doseageFormName" label="剂型" width="100"></el-table-column>
              <el-table-column prop="drugStorage" label="产品信息">
                <template slot-scope="scope">
                  <div class="pro-details ellipsis es300 ">
                    {{ scope.row.spec}} × {{ scope.row.standRate}} {{scope.row.specUnit}} / {{ scope.row.specUnit}}
                    &nbsp;&nbsp; 中大包装: {{ scope.row.middleStandRate}}/{{scope.row.bigMiddleRate}}
                  </div>
                  <div :title="scope.row.manufactureName" class="pro-details ellipsis es200"
                       v-if="scope.row.manufactureName!=''">{{ scope.row.manufactureName}}
                  </div>
                </template>
              </el-table-column>
              <!--<el-table-column prop="specification" label="规格" width="100">
                <template slot-scope="scope" class="drugMessage">
                  {{ scope.row.bakMedicalSpec}} × {{ scope.row.bakStandSpecRate}} {{scope.row.bakUseUnit}} / {{ scope.row.bakSpecUnit}}
                </template>
              </el-table-column>
              <el-table-column prop="standRate" label="包装数量" width="100"></el-table-column>
              <el-table-column prop="bakProducerFullname" label="生产企业" width="200" :show-overflow-tooltip="true"></el-table-column>-->
              <el-table-column prop="permitNumber" label="批准文号">
                <template slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content" class="alink">
                      <a @click="showHospital(scope.row.productId)">查看医院</a>
                      <a @click="showPic(scope.row.productId)">说明书</a>
                    </div>
                    <span>{{scope.row.permitNumber}}</span>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
            <!-- 表格分页 -->
            <div class="pagebox">
              <el-pagination
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 30]"
                :total="resData.total"
                :page-size="resData.pageSize"
                :page-count="resData.pages"
                :current-page.sync="resData.pageNum">
              </el-pagination>
            </div>
          </template>
        </div>
        <p class="service-text" v-show="!isShow">欢迎使用购药服务指引，请输入产品名称进行查询合理用药，健康生活</p>
      </div>
    </div>
    <service-hospital ref="serviceHospital"></service-hospital>
  </div>
</template>
<script>

  import {message} from "src/axios/interceptor"
  import {getProductList, findImageIdByProductId} from "src/axios/login/service";
  import serviceHospital from './serviceHospital'
  import SIdentify from './identify'

  export default {
    components: {
      SIdentify,
      serviceHospital
    },
    name: 'service',
    data() {
      return {
        identifyCodes: "1234567890",
        identifyCode: "",
        userImageCode: "",
        picVisible: false,
        serviceHospitalVisible: false,
        isShow: false,
        resData: this.metaData(),
        queryData: this.metaQuery(),
      }
    },
    methods: {
      metaData() {
        return {
          pageNum: 1,
          pageSize: 10,
          total: 0,
          pages: 0,
          list: []
        }
      },
      metaQuery() { // 查询数据封装格式
        return {
          name: undefined,
          code: undefined
        }
      },
      metaList() {
        getProductList(this.resData, this.queryData).then(res => {
          if (res.data) {
            this.resData = res.data;
            if (0 === this.resData.pageNum) {
              this.resData.pageNum = 1;
            }
            console.log(this.resData.list)
            this.isShow = true;
          }
        });
      },
      serviceQuery() {
        if (!this.queryData.name) {
          message("请输入搜索内容", "warning")
          return
        }
        if (!this.queryData.code) {
          message("请输入验证码", "warning")
          return
        }
        if (this.queryData.code !== this.identifyCode) {
          message("验证码错误", "warning")
          return
        }
        this.metaList()
        this.queryData.code = ''
        this.refreshCode()
      },
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.metaList()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.metaList()

      },
      showHospital(id) {
        this.$nextTick(() => {
          this.$refs.serviceHospital.fillData(id)

        })
      },
      showPic(id) {
        this.picVisible = true
        id = 'DATA00000000000000604521'
        findImageIdByProductId(id).then(res => {
          console.log(this)
          this.userImageCode = 'data:application/octet-stream;base64,' + res.data
          console.log(this.userImageCode)
        })
      },
      hidePopPic(e) {
        var sp = document.getElementById("popPic");
        if (sp) {
          if (!sp.contains(e.target)) {            //这句是说如果我们点击到了id为myPanel以外的区域
            this.picVisible = false;
          }
        }
      },
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },
      refreshCode() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
      },
      makeCode(o, l) {
        for (let i = 0; i < l; i++) {
          this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
            ];
        }
        console.log(this.identifyCode);
      }
    },
    mounted() {
      this.makeCode(this.identifyCodes, 4);
    }

  }
</script>
<style>
  @import "./../../../assets/css/login.css";
</style>
