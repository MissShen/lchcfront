<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="main">
      <ul class="side side-init" id="side-menu">
        <li><a @click="changeScrollHeight(nodesPosition.qyjc,'jump_item',0)" class="d_jump jump_item current">企业基础信息</a></li>
        <li><a @click="changeScrollHeight(nodesPosition.zzxx,'jump_item',1)" class="d_jump jump_item">资信信息</a></li>
        <li><a @click="changeScrollHeight(nodesPosition.yyzz,'jump_item',2)" class="d_jump jump_item">营业执照信息</a></li>
        <li><a @click="changeScrollHeight(nodesPosition.jyxx,'jump_item',3)" class="d_jump jump_item">经营信息</a></li>
        <li><a @click="changeScrollHeight(nodesPosition.gsp,'jump_item',4)" class="d_jump jump_item">GSP信息</a></li>
      </ul>
      <div class="scroll-content">
        <div class="gap-40">
        <el-form id="right-main-box" :model="query" ref="from" label-width="120px" class="demo-ruleForm" size="small" label-position="left">

          <h3 class="qyjc">企业基础信息</h3>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="企业类型：" prop="name">
                <span v-if="query.catRetailEnterprise.retailType == 1">单体零售企业</span>
                <span v-if="query.catRetailEnterprise.retailType == 2">零售连锁企业</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否会员：" prop="name">
                <span v-if="query.catRetailEnterprise.memberType == 1">是</span>
                <span v-if="query.catRetailEnterprise.memberType == 0">否</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="企业编码：" prop="name">
                {{ query.catRetailEnterprise.code}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="企业名称：" prop="name">
                {{ query.catRetailEnterprise.name}}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="企业简称：" prop="name">
                {{ query.catRetailEnterprise.abbr}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="拼音简称：" prop="name">
                {{ query.catRetailEnterprise.spellAbbr}}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="企业曾用名：" prop="name">
                {{ query.catRetailEnterprise.usedName}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="归档文件号：" prop="name">
                {{ query.catRetailEnterprise.archiveNum}}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="备注：" prop="name">
                {{ query.catRetailEnterprise.remark}}
              </el-form-item>
            </el-col>
          </el-row>

          <h3 class="zzxx">资信信息</h3>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="开户名称：" prop="name">
                {{ query.catRetailEnterprise.accountName}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="开户银行：" prop="name">
                {{ query.catRetailEnterprise.accountBank}}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="开户账号：" prop="name">
                {{ query.catRetailEnterprise.accountNumber}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="纳税人登记号：" prop="name">
                {{ query.catRetailEnterprise.taxpayerCode}}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="邮政编码：" prop="name">
                {{ query.catRetailEnterprise.postCode}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="企业电话：" prop="name">
                {{ query.catRetailEnterprise.tel}}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="企业网址：" prop="name">
                {{ query.catRetailEnterprise.website}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="企业传真：" prop="name">
                {{ query.catRetailEnterprise.fax}}
              </el-form-item>
            </el-col>
          </el-row>

          <h3 class="yyzz">营业执照信息</h3>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="注册号：" prop="name">
                {{ query.catRetailEnterprise.regNo}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="名称：" prop="name">
                {{ query.catRetailEnterprise.regName}}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="类型：" prop="name">
                {{ query.catRetailEnterprise.regType}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="法定代表人：" prop="name">
                {{ query.catRetailEnterprise.juridicalPerson}}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="住所：" prop="name">
                {{ query.catRetailEnterprise.address}}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="注册资本：" prop="name">
                {{ query.catRetailEnterprise.regCapital}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="注册资金：" prop="name">
                {{ query.catRetailEnterprise.regAmount}}
                <span v-if="query.catRetailEnterprise.regAmountUnit == 1">人民币</span>
                <span v-if="query.catRetailEnterprise.regAmountUnit == 2">美元</span>
                <span v-if="query.catRetailEnterprise.regAmountUnit == 3">欧元</span>
                <span v-if="query.catRetailEnterprise.regAmountUnit == 4">港币</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="成立日期：" prop="name">
                {{ query.catRetailEnterprise.foundDate}}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="营业期限：" prop="name">
                {{ query.catRetailEnterprise.regExpireS}}&nbsp;&nbsp;<span>至</span>&nbsp;&nbsp;
                <span v-if="immortal(query.catRetailEnterprise.regExpireY)">{{ query.catRetailEnterprise.businessLicenseDate}}</span>
                <span v-else="immortal(query.catRetailEnterprise.regExpireY)">永久</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="经营范围：" prop="name">
                {{ query.catRetailEnterprise.regScope}}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="登记机关：" prop="name">
                {{ query.catRetailEnterprise.regDepartment}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发证日期：" prop="name">
                {{ query.catRetailEnterprise.regDate}}
              </el-form-item>
            </el-col>
          </el-row>

          <h3 class="jyxx">经营信息</h3>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="证号：" prop="name">
                {{ query.catRetailEnterprise.permitCode}}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="企业名称：" prop="name">
                {{ query.catRetailEnterprise.name}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="注册地址：" prop="name">
                {{ query.catRetailEnterprise.regAddres}}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="法定代表人：" prop="name">
                {{ query.catRetailEnterprise.juridicalPerson}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="企业负责人：" prop="name">
                {{ query.catRetailEnterprise.enterprisePrincipal}}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="企业类型：" prop="name">
                {{ query.catRetailEnterprise.regType}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="有效期至：" prop="name">
                {{ query.catRetailEnterprise.expiryDate}}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="发证机关：" prop="name">
                {{ query.catRetailEnterprise.officeLicence}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发证日期：" prop="name">
                {{ query.catRetailEnterprise.awardDate}}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="经营范围：" prop="name">
                {{ query.catRetailEnterprise.businessCategory}}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="经营方式：" prop="name">
                {{ query.catRetailEnterprise.operationMode}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="仓库地址：" prop="name">
                {{ query.catRetailEnterprise.depositoryAddress}}
              </el-form-item>
            </el-col>
          </el-row>

          <h3 class="gsp">GSP信息</h3>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="证书编号：" prop="name">
                {{ query.catAuthGsp.certifacateNumber}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="企业名称：" prop="name">
                {{ query.catAuthGsp.companyName}}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="地址：" prop="name">
                {{ query.catAuthGsp.dealerAddres}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所在省：" prop="name">
                {{ query.catAuthGsp.province}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="认证范围：" prop="name">
                {{ query.catAuthGsp.attestationCategory}}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="发证机关：" prop="name">
                {{ query.catAuthGsp.officeLicence}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发证日期：" prop="name">
                {{ query.catAuthGsp.licenceDate}}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="有效期至：" prop="name">
                {{ query.catAuthGsp.expiryDate}}
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </div>
      <div class="foot-btn">
        <div class="foot-left">
          <el-button @click="goBack()">返回</el-button>
        </div>
      </div>
        </div>
    </div>
  </div>
</template>

<script>

  // 引入用户相关请求
  import {getRetailerInfoById} from 'src/axios/datacenter/orgdata/retailorg/retailorg';
  import "../../../../../assets/css/datacenter.css";
  export default {
    data() {
      return {
        query: {
          catRetailEnterprise:{},
          catAuthGsp:{}
        },
        nodesPosition: {},//保存节点位置
      }
    },
   created(){
      var id = this.$route.params.id || undefined;
      if (id) {
        this.list(id);
      }
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      list(id){
        getRetailerInfoById(id).then(res => {
          this.query = res.data
      })
      },
      //  返回
      goBack() {
        this.$router.go(-1);
      },
      //  营业期限永久额
      immortal(flag){
        var isImmoral=true;
        if(flag == 1){
          isImmoral=false;
        }
        return isImmoral;
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
            if (viewNodeChildeNodes[i].className == 'qyjc') {
              this.nodesPosition.qyjc = viewNodeChildeNodes[i].offsetTop
            }
            if (viewNodeChildeNodes[i].className == 'zzxx') {
              this.nodesPosition.zzxx = viewNodeChildeNodes[i].offsetTop
            }
            if (viewNodeChildeNodes[i].className == 'yyzz') {
              this.nodesPosition.yyzz = viewNodeChildeNodes[i].offsetTop
            }
            if (viewNodeChildeNodes[i].className == 'jyxx') {
              this.nodesPosition.jyxx = viewNodeChildeNodes[i].offsetTop
            }
            if (viewNodeChildeNodes[i].className == 'gsp') {
              this.nodesPosition.gsp = viewNodeChildeNodes[i].offsetTop
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
        if (vieNodeScrollTop < this.nodesPosition.qyjc) {
          this.removeClassCurrent(jumpNodeName)[0].classList.add('current');
        }
        else if (vieNodeScrollTop > this.nodesPosition.qyjc && vieNodeScrollTop < this.nodesPosition.zzxx) {
          this.removeClassCurrent(jumpNodeName)[0].classList.add('current');
        }
        else if (vieNodeScrollTop > this.nodesPosition.zzxx && vieNodeScrollTop < this.nodesPosition.yyzz) {
          this.removeClassCurrent(jumpNodeName)[1].classList.add('current');
        }
        else if (vieNodeScrollTop > this.nodesPosition.yyzz && vieNodeScrollTop < this.nodesPosition.jyxx) {
          this.removeClassCurrent(jumpNodeName)[2].classList.add('current');
        }
        else if (vieNodeScrollTop > this.nodesPosition.jyxx && vieNodeScrollTop < this.nodesPosition.gsp) {
          this.removeClassCurrent(jumpNodeName)[3].classList.add('current');
        }
        else if (vieNodeScrollTop > this.nodesPosition.gsp) {
          this.removeClassCurrent(jumpNodeName)[4].classList.add('current');
        }

        //增加或删除菜单浮动类名
        if (vieNodeScrollTop <= this.nodesPosition.qyjc) {
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
