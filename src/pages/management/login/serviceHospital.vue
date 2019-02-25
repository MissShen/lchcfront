<template>
  <el-dialog
    title="查看医院"
    :visible.sync="visible"
    width="900px">
    <div class="formrow">
          <span>
            <el-input v-model="hQueryData.hosName" placeholder="医院名称" size="small"></el-input>
          </span>
          <span class="service-yzm service-code-box">
            <el-input v-model="hQueryData.code" placeholder="验证码" size="small"></el-input>
        <!--<img src="../../../assets/images/yzm.jpg" width="100"/>-->
            <div  @click="hRefreshCode" class="code-box">
              <h-s-identify :identifyCode="hIdentifyCode" ref="HSIdentify"></h-s-identify>
            </div>
          </span>
          <span>
            <el-button type="primary" size="small" @click="serviceQuery">查询</el-button>
          </span>
    </div>
    <div class="tableset service-table" v-show="isShow">
      <template>
        <el-table :data="resData.list" stripe border style="width: 100%">
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="bakBuyerFullname" label="医院名称"></el-table-column>
          <el-table-column prop="bakProductName" label="产品名"></el-table-column>
          <el-table-column prop="bakTradeName" label="商品名"></el-table-column>
          <el-table-column prop="bakMedicalMode" label="剂型" width="100"></el-table-column>
          <el-table-column prop="drugStorage" label="产品信息">
            <template slot-scope="scope">
              <div class="pro-details ellipsis es300 " >
                {{ scope.row.bakMedicalSpec}} × {{ scope.row.bakStandRate}} {{scope.row.useUnit}} / {{ scope.row.bakSpecUnit}}
                &nbsp;&nbsp; 中大包装: {{ scope.row.standRate}}
              </div>
              <div :title="scope.row.bakProducerFullname" class="pro-details ellipsis es200" v-if="scope.row.bakProducerFullname!=''">{{ scope.row.bakProducerFullname}}</div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 表格分页 -->
        <div class="pagebox">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[5, 10, 20]"
            :total="resData.total"
            :page-size="resData.pageSize"
            :page-count="resData.pages"
            :current-page.sync="resData.pageNum">
          </el-pagination>
        </div>
      </template>
    </div>
  </el-dialog>
</template>

<script>
  import {message} from "src/axios/interceptor"
  import {getHosList} from "src/axios/login/service";

  import HSIdentify from './hIdentify'

  export default {
    name: "service-hospital",
    components: {
      HSIdentify,
    },
    data() {
      return {
        hIdentifyCodes: "1234567890",
        hIdentifyCode: "",
        priceData: '',
        visible: false,
        isShow: false,
        resData: this.metaData(),
        hQueryData: this.metaQuery(),
      }
    },
    methods: {
      fillData(id) {
        this.visible = true;
        this.resData = this.metaData();
        this.hQueryData = this.metaQuery();
        this.hQueryData.productId = id

        this.metaList();
        this.hRefreshCode(this.hIdentifyCodes, 4);
      },
      metaList() {
        getHosList(this.resData, this.hQueryData).then(res => {
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
      metaData() {
        return {
          pageNum: 1,
          pageSize: 5,
          total: 0,
          pages: 0,
          list: []
        }
      },
      metaQuery() { // 查询数据封装格式
        return {
          hosName: undefined,
          code: undefined,
          productId: undefined
        }
      },
      serviceQuery() {
        if (!this.hQueryData.hosName) {
          message("请输入搜索内容", "warning")
          return
        }
        if (!this.hQueryData.code) {
          message("请输入验证码", "warning")
          return
        }
        if (this.hQueryData.code !== this.hIdentifyCode) {
          message("验证码错误", "warning")
          return
        }
        this.metaList();
        this.hQueryData.code = ''
        this.hRefreshCode();

      },
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.metaList()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.metaList()

      },
      hRandomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },
      hRefreshCode() {
        this.hIdentifyCode = "";
        this.hMakeCode(this.hIdentifyCodes, 4);
      },
      hMakeCode(o, l) {
        for (let i = 0; i < l; i++) {
          this.hIdentifyCode += this.hIdentifyCodes[
            this.hRandomNum(0, this.hIdentifyCodes.length)
            ];
        }
        console.log(this.hIdentifyCode);
      }

    },
  }
</script>

<style>
  @import "./../../../assets/css/login.css";
</style>
