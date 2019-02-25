<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!--<div class="tabs-panel">-->
      <!--<span class="active">新增零售企业（零售）药店信息</span>-->
    <!--</div>-->
    <!-- 表格 -->
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
          <el-form id="right-main-box"
                   :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="100px"
                    size="small"
                    label-position="left">
            <h3 class="qyjc">企业基础信息</h3>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="企业类型" >
                  <el-radio-group v-model="ruleForm.retailType" @change="setRetailType()">
                    <el-radio :label="1">单体零售企业</el-radio>
                    <el-radio :label="2">零售连锁企业</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="是否会员" >
                  <el-radio-group v-model="ruleForm.memberType">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="企业编码" prop="code">
                  <el-input v-model="ruleForm.code"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="企业名称" prop="name">
                  <el-input v-model="ruleForm.name" @change="setName()"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="企业简称" prop="abbr">
                  <el-input v-model="ruleForm.abbr"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="拼音简称" prop="spellAbbr">
                  <el-input v-model="ruleForm.spellAbbr"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="企业曾用名" prop="usedName">
                  <el-input type="textarea" :rows="3" v-model="ruleForm.usedName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4" >
                <el-form-item label="备注" prop="remark">
                  <el-input type="textarea" :rows="3" v-model="ruleForm.remark"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="归档文件号">
                  <el-input v-model="ruleForm.archiveNum"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <h3 class="zzxx">资信信息</h3>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="开户名称">
                  <el-input v-model="ruleForm.accountName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="开户银行">
                  <el-input v-model="ruleForm.accountBank"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="开户账号">
                  <el-input v-model="ruleForm.accountNumber"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="纳税人登记号">
                  <el-input v-model="ruleForm.taxpayerCode"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="邮政编码">
                  <el-input v-model="ruleForm.postCode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="企业电话">
                  <el-input v-model="ruleForm.tel"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="企业网址">
                  <el-input v-model="ruleForm.website"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="企业传真">
                  <el-input v-model="ruleForm.fax"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <h3 class="yyzz">营业执照信息</h3>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="注册号">
                  <el-input v-model="ruleForm.regNo"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="名称">
                  <el-input v-model="ruleForm.regName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="类别">
                  <el-input v-model="ruleForm.regType" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="法定代表人">
                  <el-input v-model="ruleForm.juridicalPerson"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="住所">
                    <el-input v-model="ruleForm.address"></el-input>
                    <!--<span><i class="el-icon-question"></i></span>-->
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="注册资本">
                  <el-input v-model="ruleForm.regCapital"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="注册资金">
                  <el-input v-model="ruleForm.regAmount" class="width-120"></el-input>
                      <el-select v-model="ruleForm.regAmountUnit" placeholder="下拉框" class="width-100">
                        <el-option label="人民币" value="1"></el-option>
                        <el-option label="美元" value="2"></el-option>
                        <el-option label="欧元" value="3"></el-option>
                        <el-option label="港币" value="4"></el-option>
                      </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="成立日期" class="date-wrapper">
                  <el-date-picker v-model="ruleForm.foundDate" type="date">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="20" :offset="1">
                <el-form-item label="营业期限">
                      <el-date-picker v-model="ruleForm.regExpireS" type="date">
                    </el-date-picker>
                      &nbsp;至&nbsp;
                      <el-date-picker v-model="ruleForm.businessLicenseDate" type="date" :disabled="this.ruleForm.regExpireY">
                    </el-date-picker>
                      <el-checkbox v-model="ruleForm.regExpireY" @change="setBusinessLicenseDate()">永久有效</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="经营范围" prop="regScope">
                  <el-input type="textarea" :rows="3" v-model="ruleForm.regScope"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="登记机关">
                  <el-input v-model="ruleForm.regDepartment"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="发证日期" class="date-wrapper">
                  <el-date-picker v-model="ruleForm.regDate" type="date">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

           <!-- <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="上传附件">
                  <el-button @click="handleMoveFiles">上传图片</el-button>
                  <input type="file" id="uploadFile" @change="getFile($event)" style="display:none;">
                </el-form-item>
              </el-col>
            </el-row>-->

            <h3 class="jyxx">经营信息</h3>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="证号">
                  <el-input v-model="ruleForm.permitCode"></el-input>
                </el-form-item>
              </el-col>
            </el-row>


            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="企业名称">
                  <el-input v-model="ruleForm.name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="注册地址">
                  <el-input v-model="ruleForm.regAddres"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="法定代表人">
                  <el-input v-model="ruleForm.juridicalPerson" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="企业负责人">
                  <el-input v-model="ruleForm.enterprisePrincipal"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="企业类型">
                  <el-input v-model="ruleForm.regType" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="有效期至" class="date-wrapper">
                  <el-date-picker v-model="ruleForm.expiryDate1" type="date">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="发证机关">
                  <el-input v-model="ruleForm.officeLicence1"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="发证日期" class="date-wrapper">
                  <el-date-picker v-model="ruleForm.awardDate" type="date">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="经营范围" prop="businessCategory">
                  <el-input type="textarea" :rows="3" v-model="ruleForm.businessCategory"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="经营方式">
                  <el-input v-model="ruleForm.operationMode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="仓库地址">
                  <el-input v-model="ruleForm.depositoryAddress"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

           <!-- <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="上传附件">
                  <el-button @click="handleMoveFiles">上传图片</el-button>
                </el-form-item>
              </el-col>
            </el-row>-->

            <h3 class="gsp">GSP信息</h3>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="证书编号" prop="certifacateNumber">
                  <el-input v-model="ruleForm.certifacateNumber"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="企业名称" prop="companyName">
                  <el-input v-model="ruleForm.companyName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="地址">
                  <el-input v-model="ruleForm.dealerAddress"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="所在省" prop="province">
                  <el-select v-model="ruleForm.province" placeholder="省">
                    <el-option
                            v-for="item in provinces.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="认证范围" prop="attestationCategory">
                  <el-input type="textarea" :rows="3" v-model="ruleForm.attestationCategory"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="发证机关">
                  <el-input v-model="ruleForm.officeLicence"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="发证日期" class="date-wrapper">
                  <el-date-picker v-model="ruleForm.licenceDate" type="date">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="有效期至" class="date-wrapper">
                  <el-date-picker v-model="ruleForm.expiryDate" type="date">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <!--<el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="上传附件">
                  <el-button @click="handleMoveFiles">上传图片</el-button>
                </el-form-item>
              </el-col>
            </el-row>-->

            <el-row>
              <el-col :offset="1">
              <el-form-item label="">
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                <el-button @click="goBack()">返回</el-button>
              </el-form-item>
              </el-col>
            </el-row>

          </el-form>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  // 引入用户相关请求
  import {add} from 'src/axios/datacenter/orgdata/retailorg/retailorg';
  import {provinceList} from 'src/axios/datacenter/orgdata/retailorg/retailorg';
  import "../../../../../assets/css/datacenter.css";
  import {changeToBite,isEnglish} from 'src/utils/validateUtil'

  export default {
    components:{
    },
    data() {
      let checkLength = (rule, value, callback) => {
        if(value){
          if(changeToBite(value) > 1000){
            callback(new Error('输入不超过1000字节'))
          }else{
            callback()
          }
        }else{
          callback()
        }
      }
      let checkLength2 = (rule, value, callback) => {
        if(value){
          if(changeToBite(value) > 4000){
            callback(new Error('输入不超过4000字节'))
          }else{
            callback()
          }
        }else{
          callback()
        }
      }
      let checkLength3 = (rule, value, callback) => {
        if(value){
          if(changeToBite(value) > 2000){
            callback(new Error('输入不超过2000字节'))
          }else{
            callback()
          }
        }else{
          callback()
        }
      }
      let checkAttestation = (rule, value, callback) => {
        if(value){
          if(changeToBite(value) > 150){
            callback(new Error('输入不超过150字节'))
          }else{
            callback()
          }
        }else{
          callback(new Error('请输入GSP认证范围'))
        }
      }
      return {
        ruleForm: {
          retailType:1,
          memberType:0,
          code:undefined,
          name:undefined,
          abbr:undefined,
          spellAbbr:undefined,
          usedName:undefined,
          remark:undefined,
          archiveNum:undefined,
          accountName:undefined,
          accountBank:undefined,
          accountNumber:undefined,
          taxpayerCode:undefined,
          postCode:undefined,
          tel:undefined,
          website:undefined,
          fax:undefined,
          regNo:undefined,
          regName:undefined,
          regType:undefined,
          juridicalPerson:undefined,
          address:undefined,
          regCapital:undefined,
          regAmount:undefined,
          regAmountUnit:undefined,
          foundDate:undefined,
          regExpireS:undefined,
          businessLicenseDate:undefined,
          regExpireY:false,
          regScope:undefined,
          regDepartment:undefined,
          regDate:undefined,
          permitCode:undefined,
          //name
          regAddres:undefined,
          //juridicalPerson:undefined,
          enterprisePrincipal:undefined,
          //regType
          expiryDate1:undefined,
          officeLicence1:undefined,
          awardDate:undefined,
          businessCategory:undefined,
          operationMode:undefined,
          depositoryAddress:undefined,
          //GSP认证信息
          certifacateNumber:undefined,
          companyName:undefined,
          dealerAddress:undefined,
          attestationCategory:undefined,
          officeLicence:undefined,
          licenceDate:undefined,
          expiryDate:undefined,
          province:undefined,
          fileList: []
        },
        rules: {
          'code': {required: true, message: '请输入企业编码', trigger: 'blur'},
          'name': {required: true, message: '请输入企业名称', trigger: 'blur'},
          'abbr': {required: true, message: '请输入企业简称', trigger: 'blur'},
          'spellAbbr': {required: true, message: '请输入企业拼音简称', trigger: 'blur'},
          'certifacateNumber': {required: true, message: '请输入GSP证书编号', trigger: 'blur'},
          'companyName':{required: true, message: '请输入GSP企业名称', trigger: 'blur'},
          'attestationCategory':{required: true, validator:checkAttestation, trigger: 'blur'},
          'province': {required: true, message: '请选择省份', trigger: 'blur'},
          'usedName':{required: false, validator:checkLength, trigger: 'blur'},
          'remark':{required: false, validator:checkLength, trigger: 'blur'},
          'regScope':{required: false, validator:checkLength2, trigger: 'blur'},
          'businessCategory':{required: false, validator:checkLength3, trigger: 'blur'},
        },
        provinces:this.provinceData(),
        nodesPosition: {}//保存节点位置
      };
    },
    created () {
      this.setRetailType();
      this.setProvice();
    },
    methods: {
      //  所在省数据初始化
      provinceData(){
        return{
          options:undefined,
          value:''
        }
      },
      //  所在省
      setProvice(){
        provinceList().then(res => {
          this.provinces.options = res.data;
      })
      },
      //  永久有效
      setBusinessLicenseDate(){
        if(this.ruleForm.regExpireY){
          this.ruleForm.businessLicenseDate=undefined;
        }
      },
      //  同步营业执照企业类型
      setRetailType(){
        if(this.ruleForm.retailType==1){
          this.ruleForm.regType='单体零售企业';
        }
        if(this.ruleForm.retailType==2){
          this.ruleForm.regType='零售连锁企业';
        }
      },
      //  同步营业执照企业名称
      setName(){
        this.ruleForm.regName=this.ruleForm.name;
      },
      //  提交
      submitForm(ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            add(this.ruleForm).then(res => {
              this.$message({
                      message: res.data,
                      type: 'success',
                      duration: 1000,
                      onClose: () => {
                      this.goBack();
                      }
              });
            });
          } else {
            return false;
          }
      });
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
      },
      //------------------------------------------------------------- 文件上传----------------------------------------
      //上传文件里的方法
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      goAnchor(selector) {
        var anchor = this.$el.querySelector(selector)
        document.body.scrollTop = anchor.offsetTop; // chrome
        document.documentElement.scrollTop = anchor.offsetTop; // firefox
      },

      selectedData(data){
        // 所选择的树节点id
        console.log('selected data===', data);
      },
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
