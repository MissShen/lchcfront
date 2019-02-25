<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!--<ul class="tabs-panel">-->
      <!--<li class="active">查看产品信息</li>-->
    <!--</ul>-->

    <div class="main">
      <ul class="side side-init" id="side-menu">
        <li><a @click="changeScrollHeight(nodesPosition.cpjc,'jump_item',0)" class="d_jump jump_item current">产品基础信息</a></li>
        <li><a @click="changeScrollHeight(nodesPosition.sms,'jump_item',1)" class="d_jump jump_item">说明书信息</a></li>
        <li><a @click="changeScrollHeight(nodesPosition.shxx,'jump_item',2)" class="d_jump jump_item">审核信息</a></li>
      </ul>
      <div class="scroll-content">
        <div class="gap-40">
        <el-form id="right-main-box" :model="from" ref="from" label-position="left" label-width="180px" class="demo-ruleForm"
                 size="small">
          <h3 class="cpjc">产品基础信息</h3>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="产品名称：" prop="name">
                <span>{{ from.catDrug.nameChn }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商用名：" prop="name">
                <span>{{ from.catProduct.tradeName }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="药品名称：" prop="name">
                <span>{{ from.catDrug.nameChn }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="药品编码：">
                <span>{{ from.catDrug.code }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="生产企业：" prop="name">
                <span>{{ from.catOrg.name }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="生产企业编码：">
                <span>{{ from.catOrg.code }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="产品编码：" prop="name">
                <span>{{ from.catProduct.productCode }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="剂型：">
                <span>{{ from.catDoseageForm==null?'无':from.catDoseageForm.nameChn }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="规格：" prop="name">
                <span>{{ from.catDrug.spec }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="转换比：">
                <span>{{ from.catDrug.standRate }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="包材：" prop="name">
                <span>{{ from.catWrap==null?'':from.catWrap.nameChn }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="单位：" prop="name">
                <span>{{ from.catMetric.nameChn }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="产品来源：">
                <span>{{ setProductSource(from.catProduct.productSource) }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="最小使用单位：" prop="name">
                <span>{{ from.catProduct.useUnit }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="from.catProduct.productSource != '1'">
              <el-form-item label="批准文号：">
                <span>{{ from.catProduct.permitNumber }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="中包装数量：" prop="name">
                <span>{{ from.catProductAttached.swrap }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="大包装数量：">
                <span>{{ from.catProductAttached.bwrap }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="药品检验报告编码：" prop="name">
                <span>{{ from.catProductAttached.medicalJyNum }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="检验报告有效期至：">
                <span>{{ from.catProductAttached.medicalJyDate }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24" v-if="from.catProduct.productSource === '0'">
            <el-col :span="12">
              <el-form-item label="国产药品批件编号：" prop="name">
                <span>{{ from.catProductAttached.productionNum }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="国产药品批件有效期至：">
                <span>{{ from.catProductAttached.productionDate }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24" v-if="from.catProduct.productSource === '1' || from.catProduct.productSource === '2'">
            <el-col :span="12">
              <el-form-item label="进口药品注册证编号：" prop="name">
                <span>{{ from.catProduct.importDrugLicenceNumber }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="进口药品注册证有效期至：">
                <span>{{ dateChange(from.catProduct.importLicenceExpiryDate) }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24" v-if="from.catProduct.productSource === '2'">
            <el-col :span="12">
              <el-form-item label="代理授权书有效期：" prop="name">
                <span>{{ from.catProductAttached.agencyorgdate }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="GMP证书编号：" prop="name">
                <span>{{ from.catProductAttached.gmpNumber }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否专利保护：">
                <span>{{ patentStaus(from.catProduct.patentFlag) }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24" v-if="from.catProduct.patentFlag == '1'">
            <el-col :span="12">
              <el-form-item label="专利保护开始时间：" prop="name">
                <span>{{ dateChange(from.catProduct.patentBeginDate) }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="专利保护结束时间：">
                <span>{{ dateChange(from.catProduct.patentEndDate) }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="药品质量标准：">
                <span>{{ from.catProductAttached.drugStandrd }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注：" prop="name">
                <span>{{ from.catProduct.remark }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <h3 class="sms">说明书信息</h3>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="每次使用量最小值：" prop="name">
                <span>{{ from.catProductAttached.dataUseMin }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="每次使用量最大值：">
                <span>{{ from.catProductAttached.dataUseMax }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="每日次数最小值：" prop="name">
                <span>{{ from.catProductAttached.dataNumMin }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="平均日用量：">
                <span>{{ from.catProductAttached.aveDateNum }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="每次使用极量：" prop="name">
                <span>{{ from.catProductAttached.useMaximum }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="疗程：">
                <span>{{ from.catProductAttached.courseTreatment }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="用法用量：" prop="name">
                <span>{{ from.catProductAttached.useUnit1 }}</span>
              </el-form-item>
            </el-col>
          </el-row>


          <h3 class="shxx">审核信息</h3>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="审核状态：" prop="name">
                <span>{{ checkStaus(from.catProduct.checkFlag) }}</span>
                <a  @click="goQuestionVue">查看质疑</a>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="使用状态：">
                <span>{{ enableStaus(from.catProduct.enableFlag) }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
           <!-- <el-col :span="12">
              <el-form-item label="审核人：" prop="name">
                <span>{{ from.catProduct.checkUser }}</span>
              </el-form-item>
            </el-col>-->
            <el-col :span="12">
              <el-form-item label="审核时间：">
                <span>{{ dateChange(from.catProduct.checkDate) }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="审核意见：" prop="name">
                <span>{{ from.catProduct.checkRemark }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="foot-btn">
        <div class="foot-left">
          <el-button size="small" @click="goBack">返回</el-button>
        </div>
      </div>
        </div>
    </div>
    <questions v-if="questionsVisible" ref="questions"></questions>
  </div>
</template>
<script>
  import "../../../../../assets/css/datacenter.css";
  // 引入用户相关请求
  import {check,queryQuestions} from 'src/axios/datacenter/productdata/productinfo/productinfo';
  import questions from '../windowPanel/questions';
  import moment from 'moment';
  export default {
    components: {
      questions
    },
    data() {
      return {
        id:undefined,
        productVisible: false,
        resData: this.metaData(),
        query: this.metaQuery(),
        from: {
          catProduct: '',
          catProductAttached:'',
          catDrug:'',
          catMetric:'',
          catDoseageForm:'',
          catWrap:'',
          catOrg:''
        },
        questions:undefined,
        questionsVisible:false,
        nodesPosition: {}//保存节点位置
      }
    },
    created(){
      this.id = this.$route.params.id || undefined;
      this.query.id = this.id.split(',')[0]
      if (this.id) {
        this.initPage(this.id);
      }
    },
    methods: {
      metaData() {
        return {
          // 前后台交互数据封装格式
          pageNum: 1,
          pageSize: 10,
        }
      },
      metaQuery() {
        return {
          // 表单查询数据初始化
          id:undefined,
          enableFlag:'1',
          orderBy:'question_date desc'
        }
      },
      //  查看质疑信息
      goQuestionVue(){
        this.questionsVisible = true;
        this.$nextTick(() => {
          this.$refs.questions.fillData(this.id.split(',')[0]);
      })
      },
      //  页面初始化
      initPage(id){
        check(id).then(res => {
          this.from = res.data
        })
        /*queryQuestions(this.query,this.resData).then(res => {
          this.questions = res.data
        })*/
      },
      //  审核状态
      checkStaus(num){
        var status='';
        switch (num){
          case "0":
          {status='未审核';}
            break;
          case "1":
          {status='已提交';}
            break;
          case "2":
          {status='未通过';}
            break;
          case "3":
          {status='临时数据';}
            break;
          case "4":
          {status='被质疑';}
            break;
          case "5":
          {status='已通过';}
            break;
        }
        return status;
      },
      //  审核状态
      enableStaus(num){
        var status='';
        switch (num){
          case "0":
          {status='禁用';}
            break;
          case "1":
          {status='正常';}
            break;
        }
        return status;
      },
      //  产品来源
      setProductSource(num){
        var status='';
        switch (num){
          case "0":
          {status='国产';}
            break;
          case "1":
          {status='进口';}
            break;
          case "2":
          {status='进口分装';}
            break;
        }
        return status;
      },
      //  专利保护
      patentStaus(num){
        var status='';
        switch (num){
          case "0":
          {status='否';}
            break;
          case "1":
          {status='是';}
            break;
        }
        return status;
      },
      //  时间格式转换
      dateChange(data){
        var result;
        if(typeof (data)!='undefined'&& data!=null ){
          result=moment(data).format("YYYY-MM-DD");
        }
        return result;
      },
      //  返回
      goBack() {
        this.$router.go(-1);
      },
      //  锚点定位
      changeScrollHeight(pageY, jumpNodeName, currentNodeIndex){
        window.scrollTo(0, pageY);
        this.removeClassCurrent(jumpNodeName)[currentNodeIndex].classList.add('current');
      },
      removeClassCurrent(nodeClassName){
        let jumpNodes = document.getElementsByClassName(nodeClassName);
        for (let i = 0; i < jumpNodes.length; i++) {
          jumpNodes[i].classList.remove('current')
        }
        return jumpNodes
      },
      //获取节点所在位置 根据具体情况适当增加
      getNodesHeight(proInfoDetaiBox){
        let vieNode = document.getElementById(proInfoDetaiBox);
        let viewNodeChildeNodes = vieNode.childNodes;
        for (let i = 0; i < viewNodeChildeNodes.length; i++) {
          if (viewNodeChildeNodes[i].nodeName == 'H3') {
            if (viewNodeChildeNodes[i].className == 'cpjc') {
              this.nodesPosition.cpjc = viewNodeChildeNodes[i].offsetTop
            }
            if (viewNodeChildeNodes[i].className == 'sms') {
              this.nodesPosition.sms = viewNodeChildeNodes[i].offsetTop
            }
            if (viewNodeChildeNodes[i].className == 'shxx') {
              this.nodesPosition.shxx = viewNodeChildeNodes[i].offsetTop
            }
          }
        }
      },
      removeFixed(sideNodeName){
        let sideNode = document.getElementById(sideNodeName);
        sideNode.classList.remove('side-scroll');
        sideNode.classList.add('side-init');
      },
      addFixed(sideNodeName){
        let sideNode = document.getElementById(sideNodeName);
        sideNode.classList.remove('side-init');
        sideNode.classList.add('side-scroll');
      },
      dialogBoxScroll(vieNodeScrollTop, jumpNodeName, sideNodeName){
        if (vieNodeScrollTop < this.nodesPosition.cpjc) {
          this.removeClassCurrent(jumpNodeName)[0].classList.add('current');
        }
        else if (vieNodeScrollTop > this.nodesPosition.cpjc && vieNodeScrollTop < this.nodesPosition.sms) {
          this.removeClassCurrent(jumpNodeName)[0].classList.add('current');
        }
        else if (vieNodeScrollTop > this.nodesPosition.sms && vieNodeScrollTop < this.nodesPosition.shxx) {
          this.removeClassCurrent(jumpNodeName)[1].classList.add('current');
        }
        else if (vieNodeScrollTop > this.nodesPosition.shxx ) {
          this.removeClassCurrent(jumpNodeName)[2].classList.add('current');
        }
        //增加或删除菜单浮动类名
        if (vieNodeScrollTop <= this.nodesPosition.cpjc) {
          this.removeFixed(sideNodeName)
        }
        else {
          this.addFixed(sideNodeName)
        }
      }
    },
    mounted(){
      //获取节点所在位置 初始右边菜单起始
      this.$nextTick(() => {
        this.getNodesHeight('right-main-box');
        this.removeClassCurrent('jump_item')[0].classList.add('current');
      });
      window.onscroll = function () {
        let windowScrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        this.dialogBoxScroll(windowScrollTop, 'jump_item', 'side-menu')
      }.bind(this)
    },
    beforeDestroy(){
      window.onscroll = null;
    },
  }
</script>

