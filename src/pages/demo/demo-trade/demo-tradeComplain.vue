<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tabs-panel">
      <span class="active">投诉详情</span>
    </div>
    <!-- 表格 -->
    <div class="wrapper padding10">
      <div class="process">
        <div class="process-box">
          <el-steps :active="3" align-center>
            <el-step title="买方机构发起投诉"></el-step>
            <el-step title="被投诉企业与机构协商处理"></el-step>
            <el-step title="上报卫生局处理"></el-step>
            <el-step title="处理完成"></el-step>
          </el-steps>
        </div>
      </div>
      <div class="complain-box">
        <div class="complain-left">
          <div class="info-panel">
            <span class="info-title">已上报至卫生局</span>
            <p>卫生局根据投诉情况可能会对被投诉企业进行扣分处罚</p>
          </div>
          <div class="complain-list">
            <el-form :model="fromData" ref="from" label-position="left" label-width="150px" class="demo-ruleForm" size="small">
              <el-form-item label="投诉对象：" prop="name" required>
                <span>【配送企业】烟台正方制药有限公司</span>
              </el-form-item>
              <el-form-item label="投诉原因：" prop="cause" required>
                <span>援助</span>
              </el-form-item>
              <el-form-item label="投诉说明：" prop="explain" required>
                <span>11</span>
              </el-form-item>
              <el-form-item>
                <el-button size="small">返回</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="complain-right">
          <div class="message-item">
            <div class="info-right">
              <i class="iconfont icon-jyxx"></i>
              交易信息
            </div>
            <ul class="message-list">
              <li>
                <span>订单号：</span>
                <span><a href="#">C201803100647762230</a></span>
              </li>
              <li>
                <span>产品名：</span>
                <span>头孢氨苄片(糖衣)</span>
              </li>
              <li>
                <span>商品名：</span>
                <span>头孢氨苄片(糖衣)</span>
              </li>
              <li>
                <span>规格包装：</span>
                <span>0.125g*24 盒/片</span>
              </li>
              <li>
                <span>订购金额：</span>
                <span>¥20.00</span>
              </li>
              <li>
                <span>到货金额：</span>
                <span>¥20.00</span>
              </li>
              <li>
                <span>生产企业：</span>
                <span>北京太洋药业</span>
              </li>
              <li>
                <span>配送企业：</span>
                <span>烟台正方制药</span>
              </li>
              <li>
                <span>买方机构：</span>
                <span>门城中心</span>
              </li>
              <li>
                <span>发送时间：</span>
                <span>2018-03-10</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>
<script>
  export default {
    data() {
      return {
        fromData:{
          name:'',
          cause:'',
          explain:''
        }
      };
    },
  }
</script>
