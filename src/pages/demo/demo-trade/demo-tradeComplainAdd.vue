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
          <el-steps align-center>
            <el-step title="买方机构发起投诉"></el-step>
            <el-step title="被投诉企业与机构协商处理"></el-step>
            <el-step title="上报卫生局处理"></el-step>
            <el-step title="处理完成"></el-step>
          </el-steps>
        </div>
      </div>
      <div class="complain-box">
        <div class="complain-left">
          <div class="complain-list">
            <el-form :model="fromData" ref="from" :rules="rules" label-position="left" label-width="150px">
              <el-form-item label="投诉对象：" prop="name" required>
                <el-radio-group v-model="fromData.name">
                  <p><el-radio :label="1" @change="changDelivery">【配送企业】烟台正方制药</el-radio></p>
                  <p class="space-30"><el-radio :label="2" @change="changProduction">【生产企业】罗氏制药</el-radio></p>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="投诉原因：" prop="cause" required>
                <el-radio-group v-model="fromData.cause">
                  <p><el-radio :label="1">援助</el-radio></p>
                  <p class="space-20" v-show="isShow"><el-radio :label="2">下单后长时间未配送</el-radio></p>
                  <p class="space-20" v-show="isShow"><el-radio :label="3">配送药品种类不正确</el-radio></p>
                  <p class="space-20"><el-radio :label="4">药品质量不好</el-radio></p>
                  <p class="space-20"><el-radio :label="5">其他</el-radio></p>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="投诉说明：" prop="explain">
                <el-input type="textarea" :rows="4" v-model="fromData.explain">
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="small">保存</el-button>
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
          name:1,
          cause:1,
          explain:''
        },
        rules:{
          explain:[{ required: true, message: '请输入投诉说明', trigger: 'blur' }]
        },
        isShow:true
      };
    },
    methods:{
      changProduction(){
        this.isShow=false;
      },
      changDelivery(){
        this.isShow=true;
      }
    }
  }
</script>
