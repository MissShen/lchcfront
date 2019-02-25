<template>
  <div>
    <!--<div class="tabs-panel">-->
      <!--<span class="active">产品转出详情</span>-->
    <!--</div>-->

    <h4 style="padding: 10px; text-align: center;">将 「<span class="red">{{this.outOrgName}}</span>」 以下产品转移到 「<span
      class="red">{{this.inOrgName}} </span>」
    </h4>

    <div v-if="way =='detail'">
      <h4 style="padding: 10px; text-align: center;">现在转产状态处于： 「<span class="red">{{this.status|statusConvert}}</span>」
      </h4>
    </div>

    <!-- ========================== 主内容start ========================= -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="本次转移产品" name="first">
        <product-transfer ref="productTransfer"></product-transfer>
      </el-tab-pane>
      <!--<el-tab-pane label="企业资质" name="second">-->
        <!--<org-aptitude ref="orgAptitude"></org-aptitude>-->
      <!--</el-tab-pane>-->
    </el-tabs>



    <!-- ========================== 主内容end ========================= -->
  </div>
</template>

<script>
  // 引入tab的页面组件
  import productTransfer from "src/pages/auditchanges/messageChanges/productRollOutVerify/transferProducts";
  import orgAptitude from "src/pages/auditchanges/messageChanges/productRollOutVerify/orgAptitude";
  import {findById} from "src/axios/auditchanges/messageChanges/productTransfer";

  export default {
    name: "transferTabs",
    components: {
      productTransfer,
      orgAptitude
    },
    created() {
      let id = this.$route.params.id;
      this.id = id;
      let way = this.$route.params.way;
      this.way = way;

      findById(this.id).then(res => {
        this.inOrgName = res.data.inOrgName;
        this.outOrgName = res.data.outOrgName;
        this.status = parseInt(res.data.stateAudit);
        this.orgId = res.data.outOrgId;
      });
    },
    data() {
      return {
        activeName: "first",
        id: undefined,
        way: undefined,
        status: 0,
        inOrgName: undefined,
        outOrgName: undefined
      }
    },
    methods: {
      handleClick(tab, event) {
      },
    }, filters: {
      statusConvert: function (status) {
        if (status == null || status == '' || status == 'underfind') {
          return ''
        } else {
          if (status == '0') {
            return "未提交";
          }
          else if (status == '1') {
            return "待确认";
          }
          else if (status == '2') {
            return "确认中";
          }
          else if (status == '3') {
            return "已确认";
          }
          else if (status == '4') {
            return "待审核";
          }
          else if (status == '5') {
            return "审核中";
          }
          else if (status == '6') {
            return "未澄清";
          }
          else if (status == '7') {
            return "已澄清";
          }
          else if (status == '8') {
            return "已审核";
          }
        }
      },
    },
  };
</script>
