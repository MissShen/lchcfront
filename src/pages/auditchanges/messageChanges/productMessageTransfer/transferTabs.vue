<template>
  <div>
    <!--<div class="tabs-panel">-->
    <!--<span class="active">产品转出详情</span>-->
    <!--</div>-->

    <h4 style="padding: 10px; text-align: center;">将 「<span class="red">{{this.outOrgName}}</span>」 以下产品转移到 「<span
      class="red">{{this.inOrgName}} </span>」
    </h4>

    <!--进度条 todo 重新确认-->
    <div v-if="this.way ==='detail'">
      <!--<div class="process-box">-->
      <!--&lt;!&ndash; 待对方同意（8，非直接提交的转产类型）、已提交（1）、审核中（5，审核员查看数据时更新为本状态）、确认（5，并且所有数据有审核结果）、已挂网（6） &ndash;&gt;-->
      <!--<el-steps :active="this.status" align-center>-->
      <!--<el-step title="待对方同意"></el-step>-->
      <!--<el-step title="已提交"></el-step>-->
      <!--<el-step title="审核中"></el-step>-->
      <!--<el-step title="确认"></el-step>-->
      <!--<el-step title="已挂网"></el-step>-->
      <!--</el-steps>-->
      <!--</div>-->
      <h4 style="padding: 10px; text-align: center;">现在转产状态处于： 「<span class="red">{{this.status|statusConvert}}</span>」
      </h4>
    </div>

    <!-- ========================== 主内容start ========================= -->
    <div class="tablebox">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="本企业产品" name="first" v-if="this.way !='detail'">
          <org-list-tabs-tab ref="org" v-if="orgId" :status="this.status" :orgId="orgId"></org-list-tabs-tab>
        </el-tab-pane>
        <el-tab-pane label="本次转移产品" name="second">
          <product-list-tabs-tab ref="product" :orgId="this.orgId"></product-list-tabs-tab>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--<div class="ft-btn">-->
    <!--<span><el-button type="save" @click="confirm" plain v-if="this.way !='detail'">保存</el-button></span>-->
    <!--<span><el-button type="default" @click="goBack" plain>返回</el-button></span>-->
    <!--</div>-->
    <div class="table-caption foot-btn">
      <div class="foot-left">
        <span v-if="this.way !='detail'"><el-button type="primary" @click="confirm">提交</el-button></span>
        <span><el-button @click="goBack">返回</el-button></span>
      </div>
    </div>

    <!-- ========================== 主内容end ========================= -->
  </div>
</template>

<script>
  // 引入tab的页面组件
  import orgListTabsTab from "src/pages/auditchanges/messageChanges/productMessageTransfer/orgList";
  import productListTabsTab from "src/pages/auditchanges/messageChanges/productMessageTransfer/productList";
  import {
    listCount,
    commit,
    findById,
    findAgencyStateByid,
    findImageIdListById
  } from "src/axios/auditchanges/messageChanges/productTransfer";

  export default {
    name: "transferTabs",
    components: {
      orgListTabsTab,
      productListTabsTab
    },
    created() {
      var id = this.$route.params.id;
      this.id = id;
      var type = this.$route.params.type;
      this.type = type;
      var way = this.$route.params.way;
      this.way = way;
      var flag = this.$route.params.flag;
      this.flag = flag;
      if (this.way != "detail") {
        this.activeName = "first";
      } else {
        this.activeName = "second";
      }

      findById(this.id).then(res => {
        this.inOrgName = res.data.inOrgName;
        this.outOrgName = res.data.outOrgName;
        this.status = parseInt(res.data.stateAudit);
        this.orgId = res.data.outOrgId;
        this.upTypeId = res.data.upTypeId;
        this.auditResults = res.data.auditResults;
      });
    },
    data() {
      return {
        activeName: "first",
        id: undefined,
        type: undefined,
        way: undefined,
        status: 0,
        inOrgName: undefined,
        outOrgName: undefined,
        upTypeId: undefined,
        orgId: undefined,
        flag: '',
        auditResults: ''
      };
    },
    methods: {
      handleClick(tab, event) {
        if (tab.name == "first") {
          this.$refs["org"].fillData(this.id);
        } else {
          this.$refs["product"].fillData(this.id);
        }
      },
      goBack() {
        this.$router.go(-1);
      },
      confirm() {
        findAgencyStateByid(this.id).then(res => {
          if (res.data != 1) {
            this.$confirm("此操作将提交此次转产, 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              listCount(this.id).then(res => {
                if (res.data > 0) {
                  commit(this.id).then(res => {
                    this.$message({
                      type: "success",
                      message: res.data
                    });
                    this.$router.push(
                      "/AUDIT/messageDeclare/productMessageTransferList"
                    );
                  });
                }
                else {
                  this.$message({
                    type: "error",
                    message: '无转产产品,请核对后重新提交'
                  });
                }
              });
            });
          } else {
            findImageIdListById(this.id).then(res => {
                console.log(res)
                if (res.data > 0) {
                  this.$message({
                    type: "error",
                    message: '有未上传资质的产品,请上传后提交'
                  });
                } else {
                  listCount(this.id).then(res => {
                    if (res.data > 0) {
                      commit(this.id).then(res => {
                        this.$message({
                          type: "success",
                          message: res.data
                        });
                        this.$router.push(
                          "/AUDIT/messageDeclare/productMessageTransferList"
                        );
                      });
                    } else {
                      this.$message({
                        type: "error",
                        message: '无转产产品,请核对后重新提交'
                      });
                    }
                  });
                }
              }
            )
          }
        })
      }
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
