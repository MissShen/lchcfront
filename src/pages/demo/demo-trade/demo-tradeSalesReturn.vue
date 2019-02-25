<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tabs-panel">
      <span class="active">退货单详情</span>
    </div>
    <div class="tabs-echo">
      <div class="tabs-echo-left">
        <div class="title">
          <span>状态：</span>
          <span class="status">送一审</span>
        </div>
        <div class="tools">
          <el-button type="primary" size="small">通过</el-button>
          <el-button type="primary" size="small">拒绝</el-button>
          <el-button size="small">返回</el-button>
        </div>
      </div>
      <div class="tabs-echo-right">
        <ul class="detail-from-ul">
          <li>配送企业：<span>烟台正方制药</span></li>
          <li>医疗机构：<span>永新站</span></li>
        </ul>
        <ul class="detail-from-ul">
          <li>退货单号：<span>C2018031847762374</span></li>
          <li>创建时间：<span>创建时间</span></li>
        </ul>
        <ul class="detail-from-ul">
          <li>退货数量：<span>1</span>&nbsp;&nbsp;&nbsp;&nbsp;退货原因：<span>1</span></li>
          <li>退货金额：<span>23.21</span></li>
        </ul>
      </div>
    </div>
    <div class="tablebox">
      <div class="title-name border-btm">退货单明细</div>
      <div class="detail-from">
        <ul class="detail-from-ul">
          <li>订单号：<span>C201803160447762361</span></li>
          <li>产品名：<span>尼群地平片2</span></li>
          <li>商品名：<span>尼群地平片</span></li>
          <li>单价：<span>23.21</span></li>
        </ul>
        <ul class="detail-from-ul">
          <li>规格包装：<span>10mg*100 片/盒</span></li>
          <li>剂型：<span>素片</span></li>
          <li>生产企业：<span>上海罗氏制药（生产代理）有限公司</span></li>
          <li>批号：<span>34687</span></li>
        </ul>
        <ul class="detail-from-ul">
          <li>到货时间：<span>2018-03-16</span></li>
          <li>销售发票号：<span>78545</span></li>
          <li>有效期：<span>2018-03-16</span></li>
        </ul>
      </div>
      <div class="log-box noborder nopad-left">
        <div class="title-name border-btm">退货单处理记录</div>
        <ul class="log-con">
          <li>
            <span>2018-03-10 15:54</span>
            【烟台正方制药】阅读了订单
          </li>
          <li>无数据</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
      }
    }
  }
</script>
