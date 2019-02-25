<template>
  <el-dialog title="" :visible.sync="visible" width="60%" top="2vh">
    <div>
      <!-- ========================== 主内容start ========================= -->
      <div class="news-detail">
        <h2 class="news-title">关于维护医疗机构联系方式的通知</h2>
        <div class="news-content">
          <p>各医疗机构：</p>

          <p class="txt-indent">我市药品阳光采购工作已正式执行，运行平稳。为进一步畅通联系渠道，更好地开展工作，及时向医疗机构提供业务指导、问题解答、咨询反馈、消息推送、培训材料邮寄等服务，阳光采购平台交易系统中已开通【黄页信息维护】功能，请医疗机构及时填报：</p>

          <ol class="news-content-list">
            <li>请将药品采购工作联系人姓名、所在部门、职务（选填）、座机号码、手机号码、传真号码、QQ号码（选填）、通讯地址（能收取快递）、邮政编码等信息填写准确、完整；</li>

            <li>本次新增了几项黄页信息，以前维护过的医疗机构也需进行补充维护。</li>

            <li>遇有联系人、联系方式等发生变化时，请及时更新。</li>
          </ol>

          <p class="txt-indent">感谢您的理解和支持！</p>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false" class="el-button-pale" size="small">关闭</el-button>
      <el-button type="primary" size="small" @click="toHandle()">立即维护</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: "notice-yellowpage",
    data(){
      return {
        visible: true
      }
    },
    methods: {
      toHandle(){
        this.$router.push({path: '/TRADE/information/linkManList'});
      }
    }
  }
</script>
