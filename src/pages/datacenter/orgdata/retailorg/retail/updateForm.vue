<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
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

          <el-form :model="ruleForm" id="right-main-box" :rules="rules" ref="ruleForm" label-width="100px" size="small"
                   label-position="left">
            <h3 class="qyjc">企业基础信息</h3>
            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="企业类型" >
                  <el-radio-group v-model="ruleForm.catRetailEnterprise.retailType" @change="setRetailType()">
                    <el-radio label="1">单体零售企业</el-radio>
                    <el-radio label="2">零售连锁企业</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="是否会员" >
                  <el-radio-group v-model="ruleForm.catRetailEnterprise.memberType">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="企业编码" prop="catRetailEnterprise.code">
                  <el-input v-model="ruleForm.catRetailEnterprise.code"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="企业名称" prop="catRetailEnterprise.name">
                  <el-input v-model="ruleForm.catRetailEnterprise.name" @change="setName()"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="企业简称" prop="catRetailEnterprise.abbr">
                  <el-input v-model="ruleForm.catRetailEnterprise.abbr"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="拼音简称" prop="catRetailEnterprise.spellAbbr">
                  <el-input v-model="ruleForm.catRetailEnterprise.spellAbbr"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="企业曾用名" prop="catRetailEnterprise.usedName">
                  <el-input type="textarea" :rows="3" v-model="ruleForm.catRetailEnterprise.usedName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="备注" prop="catRetailEnterprise.remark">
                  <el-input type="textarea" :rows="3" v-model="ruleForm.catRetailEnterprise.remark"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="归档文件号">
                  <el-input v-model="ruleForm.catRetailEnterprise.archiveNum"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <h3 class="zzxx">资信信息</h3>
            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="开户名称">
                  <el-input v-model="ruleForm.catRetailEnterprise.accountName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="开户银行">
                  <el-input v-model="ruleForm.catRetailEnterprise.accountBank"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="开户账号">
                  <el-input v-model="ruleForm.catRetailEnterprise.accountNumber"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="纳税人登记号">
                  <el-input v-model="ruleForm.catRetailEnterprise.taxpayerCode"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="邮政编码">
                  <el-input v-model="ruleForm.catRetailEnterprise.postCode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="企业电话">
                  <el-input v-model="ruleForm.catRetailEnterprise.tel"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="企业网址">
                  <el-input v-model="ruleForm.catRetailEnterprise.website"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="企业传真">
                  <el-input v-model="ruleForm.catRetailEnterprise.fax"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <h3 class="yyzz">营业执照信息</h3>
            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="注册号">
                  <el-input v-model="ruleForm.catRetailEnterprise.regNo"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="名称">
                  <el-input v-model="ruleForm.catRetailEnterprise.regName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="类别">
                  <el-input v-model="ruleForm.catRetailEnterprise.regType" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="法定代表人">
                  <el-input v-model="ruleForm.catRetailEnterprise.juridicalPerson"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="住所">
                  <el-input v-model="ruleForm.catRetailEnterprise.address"></el-input>
                    <!--<span><i class="el-icon-question"></i></span>-->
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="注册资本">
                  <el-input v-model="ruleForm.catRetailEnterprise.regCapital"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="注册资金">
                    <el-input v-model="ruleForm.catRetailEnterprise.regAmount" class="width-120"></el-input>
                      <el-select v-model="ruleForm.catRetailEnterprise.regAmountUnit" placeholder="请选择" class="width-100">
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
                  <el-date-picker v-model="ruleForm.catRetailEnterprise.foundDate" type="date">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :offset="1">
                <el-form-item label="营业期限">
                      <el-date-picker v-model="ruleForm.catRetailEnterprise.regExpireS" type="date">
                      </el-date-picker>
                      &nbsp;至&nbsp;
                      <el-date-picker v-model="ruleForm.catRetailEnterprise.businessLicenseDate" type="date" :disabled="this.ruleForm.regExpireY">
                      </el-date-picker>
                      <el-checkbox v-model="ruleForm.catRetailEnterprise.regExpireY==1" @change="setRegExpireY()">永久有效</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="经营范围" prop="catRetailEnterprise.regScope">
                  <el-input type="textarea" :rows="3" v-model="ruleForm.catRetailEnterprise.regScope"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="登记机关">
                  <el-input v-model="ruleForm.catRetailEnterprise.regDepartment"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="发证日期" class="date-wrapper">
                  <el-date-picker v-model="ruleForm.catRetailEnterprise.regDate" type="date">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

           <!-- <el-row>
              <el-col :span="8" :offset="4">
                <el-form-item label="上传附件">
                  <el-button type="">选择文件</el-button>
                </el-form-item>
              </el-col>
            </el-row>-->

            <h3 class="jyxx">经营信息</h3>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="证号">
                  <el-input v-model="ruleForm.catRetailEnterprise.permitCode"></el-input>
                </el-form-item>
              </el-col>
            </el-row>


            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="企业名称">
                  <el-input v-model="ruleForm.catRetailEnterprise.name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="注册地址">
                  <el-input v-model="ruleForm.catRetailEnterprise.regAddres"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="法定代表人">
                  <el-input v-model="ruleForm.catRetailEnterprise.juridicalPerson" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="企业负责人">
                  <el-input v-model="ruleForm.catRetailEnterprise.enterprisePrincipal"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="企业类型">
                  <el-input v-model="ruleForm.catRetailEnterprise.regType" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="有效期至" class="date-wrapper">
                  <el-date-picker v-model="ruleForm.catRetailEnterprise.expiryDate" type="date">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="发证机关">
                  <el-input v-model="ruleForm.catRetailEnterprise.officeLicence"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="发证日期" class="date-wrapper">
                  <el-date-picker v-model="ruleForm.catRetailEnterprise.awardDate" type="date">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="经营范围" prop="catRetailEnterprise.businessCategory">
                  <el-input type="textarea" :rows="3" v-model="ruleForm.catRetailEnterprise.businessCategory"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="经营方式">
                  <el-input v-model="ruleForm.catRetailEnterprise.operationMode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="仓库地址">
                  <el-input v-model="ruleForm.catRetailEnterprise.depositoryAddress"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <!--<el-row>
              <el-col :span="8" :offset="4">
                <el-form-item label="上传附件">
                  <el-button type="">选择文件</el-button>
                </el-form-item>
              </el-col>
            </el-row>-->

            <h3 class="gsp">GSP信息</h3>
            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="证书编号" prop="catAuthGsp.certifacateNumber">
                  <el-input v-model="ruleForm.catAuthGsp.certifacateNumber"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="企业名称" prop="catAuthGsp.companyName">
                  <el-input v-model="ruleForm.catAuthGsp.companyName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="地址">
                  <el-input v-model="ruleForm.catAuthGsp.dealerAddres"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="所在省" prop="catAuthGsp.province">
                  <el-select v-model="ruleForm.catAuthGsp.province" placeholder="省">
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
                <el-form-item label="认证范围" prop="catAuthGsp.attestationCategory">
                  <el-input type="textarea" :rows="3" v-model="ruleForm.catAuthGsp.attestationCategory"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="发证机关">
                  <el-input v-model="ruleForm.catAuthGsp.officeLicence"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="发证日期" class="date-wrapper">
                  <el-date-picker v-model="ruleForm.catAuthGsp.licenceDate" type="date">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="有效期至" class="date-wrapper">
                  <el-date-picker v-model="ruleForm.catAuthGsp.expiryDate" type="date">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <!--<el-row>
              <el-col :span="8" :offset="4">
                <el-form-item label="上传附件">
                  <el-button type="">选择文件</el-button>
                </el-form-item>
              </el-col>
            </el-row>-->

            <el-row>
              <el-col :offset="1">
              <el-form-item label="">
                <el-button size="small" type="primary" @click="submitForm('ruleForm')">保存</el-button>
                <el-button size="small" @click="goBack()">返回</el-button>
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
  import {getRetailerInfoById} from 'src/axios/datacenter/orgdata/retailorg/retailorg';
  import {update} from 'src/axios/datacenter/orgdata/retailorg/retailorg';
  import {provinceList} from 'src/axios/datacenter/orgdata/retailorg/retailorg';
  import "../../../../../assets/css/datacenter.css";
  import {changeToBite,isEnglish} from 'src/utils/validateUtil'

  export default {
    components: {

    },
    created(){
      var id = this.$route.params.id || undefined;
      if (id) {
        this.list(id);
      }
      this.setProvice();
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
        query:undefined,
        ruleForm: {
          catRetailEnterprise:{},
          //GSP认证信息
          catAuthGsp:{},
          regExpireY:undefined,
          fileList: []
        },
        rules: {
          catRetailEnterprise:{
            code: {required: true, message: '请输入企业编码', trigger: 'blur'},
            name: {required: true, message: '请输入企业名称', trigger: 'blur'},
            abbr: {required: true, message: '请输入企业简称', trigger: 'blur'},
            spellAbbr: {required: true, message: '请输入企业拼音简称', trigger: 'blur'},
            usedName: {required: false, validator:checkLength, trigger: 'blur'},
            remark: {required: false, validator:checkLength, trigger: 'blur'},
            regScope:{required: false, validator:checkLength2, trigger: 'blur'},
            businessCategory:{required: false, validator:checkLength3, trigger: 'blur'},
          },
          catAuthGsp:{
            certifacateNumber: {required: true, message: '请输入GSP证书编号', trigger: 'blur'},
            companyName:{required: true, message: '请输入GSP企业名称', trigger: 'blur'},
            attestationCategory:{required: true, validator:checkAttestation , trigger: 'blur'},
            province: {required: true, message: '请选择省份', trigger: 'blur'}
          }
        },
        provinces:this.provinceData(),
        nodesPosition: {}//保存节点位置
      };
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
      setRegExpireY(){
        this.ruleForm.catRetailEnterprise.regExpireY=1-this.ruleForm.catRetailEnterprise.regExpireY;
        this.setBusinessLicenseDate();
      },
      setBusinessLicenseDate(){
        if(this.ruleForm.catRetailEnterprise.regExpireY==1){
          this.ruleForm.regExpireY=true;
          this.ruleForm.catRetailEnterprise.businessLicenseDate=undefined;
        }else{
          this.ruleForm.regExpireY=false;
        }
      },
      //  同步营业执照企业类型
      setRetailType(){
        if(this.ruleForm.catRetailEnterprise.retailType==1){
          this.ruleForm.catRetailEnterprise.regType='单体零售企业';
        }
        if(this.ruleForm.catRetailEnterprise.retailType==2){
          this.ruleForm.catRetailEnterprise.regType='零售连锁企业';
        }
      },
      //  同步营业执照企业名称
      setName(){
        this.ruleForm.catRetailEnterprise.regName=this.ruleForm.catRetailEnterprise.name;
      },
      // 数据初始化
      list(id){
        getRetailerInfoById(id).then(res => {
          this.ruleForm=res.data;
          this.setBusinessLicenseDate();
      })
      },
      //  提交保存
      submitForm(ruleForm){
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            update(this.ruleForm.catRetailEnterprise,this.ruleForm.catAuthGsp).then(res => {
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
