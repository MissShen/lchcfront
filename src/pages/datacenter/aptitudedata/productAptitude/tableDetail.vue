<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!--<div class="tabs-panel">-->
      <!--<span class="active">查看产品资质</span>-->
    <!--</div>-->
    <!-- 表格 -->
    <div class="main">
      <ul class="side" id="side-menu">
        <li><a @click="changeScrollHeight(nodesPosition.cpjc,'jump_item',0)" class="current jump_item d_jump" >产品基础信息</a></li>
        <li><a @click="changeScrollHeight(nodesPosition.sms,'jump_item',1)" class="jump_item d_jump" >说明书信息</a></li>
      </ul>
      <div class="scroll-content">
        <div class="gap-40">

          <el-form :model="ruleForm" id="right-box" ref="ruleForm" label-width="220px" size="small"
                   label-position="left" class="demo-form-inline" :inline="true">
            <h3 class="cpjc">产品基础信息</h3>
            <el-row :gutter="24">
              <el-col :span="11">
                <el-form-item label="药品名称">
                  <span>{{ruleForm.product.drugName}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="11" offset="1">
                <el-form-item label="产品名称">
                  <span>{{ruleForm.product.productName}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="11">
                <el-form-item label="商品名">
                  <span>{{ruleForm.product.tradeName}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="11" offset="1">
                <el-form-item label="剂型">
                  <span>{{ruleForm.product.doseageName}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="11">
                <el-form-item label="商品规格">
                  <span>{{ruleForm.product.drugSpec}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="11" offset="1">
                <el-form-item label="转换比">
                  <span>{{ruleForm.product.standRate}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="11">
                <el-form-item label="最小使用单位">
                  <span>{{ruleForm.product.useUnit}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="11">
                <el-form-item label="包材">
                  <span>{{ruleForm.product.wrapCodeName}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="11" offset="1">
                <el-form-item label="生产企业">
                  <span>{{ruleForm.product.manufactureName}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="11">
                <el-form-item label="产品来源">
                  <span v-if="ruleForm.proAttached != null && ruleForm.proAttached.fromTradeFlag == 0">国产</span>
                  <span v-if="ruleForm.proAttached != null && ruleForm.proAttached.fromTradeFlag == 1">进口</span>
                  <span v-if="ruleForm.proAttached != null && ruleForm.proAttached.fromTradeFlag == 2">进口分装</span>
                </el-form-item>
              </el-col>
              <el-col :span="11" offset="1">
                <el-form-item label="批准文号">
                  <span>{{ruleForm.product.permitNumber}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="11">
                <el-form-item label="中包装数量">
                  <span>{{ruleForm.product.swrap}}</span>
                  <images-preview class="img-pre-text" :dilogFlag="false" v-if="ruleForm.product.swrapFileIds.length>0" :imgIdListUnUnique="ruleForm.product.swrapFileIds"></images-preview>
                </el-form-item>
              </el-col>
              <el-col :span="11" offset="1">
                <el-form-item label="大包装数量">
                  <span>{{ruleForm.product.bwrap}}</span>
                  <images-preview class="img-pre-text" :dilogFlag="false" v-if="ruleForm.product.bwrapFileIds.length>0" :imgIdListUnUnique="ruleForm.product.bwrapFileIds"></images-preview>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="11">
                <el-form-item label="药品检验报告编号">
                  <span>{{ruleForm.product.medicalJyNum}}</span>
                  <images-preview class="img-pre-text" :dilogFlag="false" v-if="ruleForm.product.medicalJyFileIds.length>0" :imgIdListUnUnique="ruleForm.product.medicalJyFileIds"></images-preview>
                </el-form-item>
              </el-col>
              <el-col :span="11" offset="1">
                <el-form-item label="有效期至">
                  <span>{{ruleForm.product.medicalJyDate | capitalize}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="11">
                <el-form-item label="国产药品批件">
                  <span>{{ruleForm.product.productionNum}}</span>
                  <images-preview class="img-pre-text" :dilogFlag="false" v-if="ruleForm.product.productionFileIds.length>0" :imgIdListUnUnique="ruleForm.product.productionFileIds"></images-preview>
                </el-form-item>
              </el-col>
              <el-col :span="11" offset="1">
                <el-form-item label="有效期至">
                  <span>{{ruleForm.product.productionDate | capitalize}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="11">
                <el-form-item label="是否基本药物">
                  <el-radio-group v-if="ruleForm.proAttached != null">
                    <el-radio disabled v-model="ruleForm.proAttached.isJy" label="1">是</el-radio>
                    <el-radio disabled v-model="ruleForm.proAttached.isJy" label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="11" offset="1">
                <el-form-item label="基药目录类型（国家，北京）">
                  <el-radio-group v-if="ruleForm.proAttached != null">
                    <el-radio disabled v-model="ruleForm.proAttached.jyDirectory" label="0">国家</el-radio>
                    <el-radio disabled v-model="ruleForm.proAttached.jyDirectory" label="1">北京</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <h3 class="sms">说明书信息</h3>
            <row>
              <el-col>
                <el-form-item label="用法用量">
                  <span v-if="ruleForm.proAttached != null">{{ruleForm.proAttached.useUnit}}</span>
                </el-form-item>
              </el-col>
            </row>

            <row>
              <el-col>
                <el-form-item label="每次使用量最大值">
                  <span v-if="ruleForm.proAttached != null">{{ruleForm.proAttached.dataUseMax}}</span>
                </el-form-item>
              </el-col>
            </row>

            <row>
              <el-col>
                <el-form-item label="每次使用量最小值">
                  <span v-if="ruleForm.proAttached != null">{{ruleForm.proAttached.dataUseMin}}</span>
                </el-form-item>
              </el-col>
            </row>

            <row>
              <el-col>
                <el-form-item label="每日次数最大值">
                  <span v-if="ruleForm.proAttached != null">{{ruleForm.proAttached.dataNumMax}}</span>
                </el-form-item>
              </el-col>
            </row>

            <row>
              <el-col>
                <el-form-item label="每日次数最小值">
                  <span v-if="ruleForm.proAttached != null">{{ruleForm.proAttached.dataNumMin}}</span>
                </el-form-item>
              </el-col>
            </row>

            <row>
              <el-col>
                <el-form-item label="平均日用量">
                  <span v-if="ruleForm.proAttached != null">{{ruleForm.proAttached.aveDateNum}}</span>
                </el-form-item>
              </el-col>
            </row>
            <row>
              <el-col>
                <el-form-item label="说明书">
                  <images-preview class="img-pre-text" :dilogFlag="false" v-if="ruleForm.product.instructionFileIds.length>0" :imgIdListUnUnique="ruleForm.product.instructionFileIds"></images-preview>
                </el-form-item>
              </el-col>
            </row>
          </el-form>
        </div>
      </div>
    </div>
    <div class="foot-btn">
      <div class="foot-left">
        <el-button @click="goBack()" size="small">返回</el-button>
      </div>
    </div>
  </div>

</template>
<script>
  import {findDetailById} from 'src/axios/datacenter/qualificationdata/productqualification/productqualification';
  import ElButton from "../../../../../node_modules/element-ui/packages/button/src/button";
  import imagesPreview from 'src/pages/datacenter/windowPanel/imagesPreview';
  import moment from 'moment';
  import "../../../../assets/css/datacenter.css";
  export default {
    components: {ElButton,imagesPreview},
    data() {
      return {
        ruleForm: {
          product:undefined,
          proAttached:undefined
        },
        nodesPosition: {}//保存节点位置
      };
    },
    created(){
      this.id = this.$route.params.id || undefined;
      findDetailById(this.id).then(res => {
        this.ruleForm = res.data
        //获取节点所在位置 初始右边菜单起始
        this.$nextTick(() => {
          this.getNodesHeight("right-box");
          this.removeClassCurrent('jump_item')[0].classList.add('current');
        });
      })
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      //获取节点所在位置 根据具体情况适当增加
      getNodesHeight(proInfoDetaiBox){
        let vieNode = document.getElementById(proInfoDetaiBox);
        let viewNodeChildeNodes = vieNode.childNodes;
        for (let i = 0; i < viewNodeChildeNodes.length; i++) {
          if (viewNodeChildeNodes[i].nodeName == 'H3') {
            if (viewNodeChildeNodes[i].className == 'cpjz') {
              this.nodesPosition.cpjz = viewNodeChildeNodes[i].offsetTop
            }
            if (viewNodeChildeNodes[i].className == 'sms') {
              this.nodesPosition.sms = viewNodeChildeNodes[i].offsetTop
            }
          }
        }
      },
      removeClassCurrent(nodeClassName){
        let jumpNodes = document.getElementsByClassName(nodeClassName);
        for (let i = 0; i < jumpNodes.length; i++) {
          jumpNodes[i].classList.remove('current')
        }
        return jumpNodes
      },
      changeScrollHeight(pageY, jumpNodeName, currentNodeIndex){
        window.scrollTo(0, pageY);
        this.removeClassCurrent(jumpNodeName)[currentNodeIndex].classList.add('current');

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
        if (vieNodeScrollTop < this.nodesPosition.cpjz) {
          this.removeClassCurrent(jumpNodeName)[0].classList.add('current');
        }
        else if (vieNodeScrollTop > this.nodesPosition.cpjz && vieNodeScrollTop < this.nodesPosition.sms) {
          this.removeClassCurrent(jumpNodeName)[0].classList.add('current');
        }
        else if (vieNodeScrollTop > this.nodesPosition.sms) {
          this.removeClassCurrent(jumpNodeName)[1].classList.add('current');
        }


        //增加或删除菜单浮动类名
        // if (vieNodeScrollTop <= this.nodesPosition.qyjc) {
        if (vieNodeScrollTop <= 90) {
          this.removeFixed(sideNodeName)
        }
        else {
          this.addFixed(sideNodeName)
        }
      }
    },
    mounted(){

        window.onscroll = function () {
          let windowScrollTop = document.body.scrollTop || document.documentElement.scrollTop;
          this.dialogBoxScroll(windowScrollTop, 'jump_item', 'side-menu')
        }.bind(this)
    },
    beforeDestroy(){
      window.onscroll = null;
    },
    filters:{
      capitalize(date){
        if(date == null || date == undefined || date == ""){
          return "";
        }
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
      }
    }
  }
</script>
