<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="main">
      <ul class="side side-init" id="side-menu">
        <li><a @click="changeScrollHeight(nodesPosition.qyxx,'jump_item',0)" class="d_jump jump_item current">企业基础信息</a>
        </li>
        <li><a @click="changeScrollHeight(nodesPosition.zzxx,'jump_item',1)" class="d_jump jump_item ">资信信息</a></li>
      </ul>
      <div class="scroll-content">
        <div class="gap-40">
          <el-form :model="ruleForm" id="right-main-box" :rules="rules" ref="ruleForm" label-width="180px" size="small"
                   label-position="left" class="demo-form-inline" :inline="true">
            <h3 class="qyxx">企业基础信息</h3>

            <el-row>
              <el-col :span="12">
                <el-form-item label="统一社会信用代码" prop="catOrg.creditCode">
                  <el-input v-model="ruleForm.catOrg.creditCode"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="组织机构代码">
                  <el-input v-model="ruleForm.catOrg.organizeCode" @focus="getOrganizeCode()"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="单位名称" prop="catOrg.name">
                  <el-input v-model="ruleForm.catOrg.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="单位代码" prop="catOrg.code">
                      <el-input class="width-200" v-model="ruleForm.catOrg.code" readonly="true"></el-input>
                      &nbsp;<a @click="checkAndShow">选择</a>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="单位简称" prop="catOrg.abbr">
                  <el-input v-model="ruleForm.catOrg.abbr"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="拼音简称">
                  <el-input v-model="ruleForm.catOrg.spellAbbr"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="五笔简称">
                  <el-input v-model="ruleForm.catOrg.nameWb"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="医疗机构等级">
                  <el-select v-model="ruleForm.catBuyer.gradeNo" placeholder="请选择" class="width-200">
                    <el-option label="一级甲等" value="1"></el-option>
                    <el-option label="一级乙等" value="2"></el-option>
                    <el-option label="一级丙等" value="3"></el-option>
                    <el-option label="二级甲等" value="4"></el-option>
                    <el-option label="二级乙等" value="5"></el-option>
                    <el-option label="二级丙等" value="6"></el-option>
                    <el-option label="三级甲等" value="7"></el-option>
                    <el-option label="三级乙等" value="8"></el-option>
                    <el-option label="三级丙等" value="9"></el-option>
                    <el-option label="三级特等" value="A"></el-option>
                    <el-option label="其他" value="B"></el-option>
                    <el-option label="一级" value="C"></el-option>
                    <el-option label="二级" value="D"></el-option>
                    <el-option label="三级" value="E"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="医疗机构性质" prop="catBuyer.orgKind">
                  <el-radio-group v-model="ruleForm.catBuyer.orgKind">
                    <el-radio label="1">盈利</el-radio>
                    <el-radio label="0">非盈利</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="医疗机构类别" prop="catBuyer.buyerKind">
                  <el-select filterable v-model="ruleForm.catBuyer.buyerKind" placeholder="输入关键词搜索"
                             @change="chooseCounty" class="width-200">
                    <el-option
                      v-for="item in buyerKindList"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="隶属关系" prop="catBuyer.subjectFlag">
                  <el-select v-model="ruleForm.catBuyer.subjectFlag" placeholder="请选择"
                             @change="chooseCounty" class="width-200">
                    <el-option label="军队" value="1"></el-option>
                    <el-option label="中央" value="2"></el-option>
                    <el-option label="省（直辖市）" value="3"></el-option>
                    <el-option label="地市" value="4"></el-option>
                    <el-option label="县级" value="5"></el-option>
                    <el-option label="其他" value="6"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="法人代表">
                  <el-input v-model="ruleForm.catBuyer.orgPresider"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="单位地址" prop="catBuyer.orgAddress">
                  <el-input type="textarea" :rows="3" v-model="ruleForm.catBuyer.orgAddress"
                            class="width-200"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="医院定点机构">
                  <el-radio-group v-model="ruleForm.catBuyer.medicareFlag">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="所在省/自治区/直辖市" prop="catBuyer.provinceId">
                  <el-select v-model="ruleForm.catBuyer.provinceId" placeholder="请选择"
                             @change="chooseProvince(ruleForm.catBuyer.provinceId)" class="width-200">
                    <el-option
                      v-for="item in ruleForm.provinceList"
                      :key="item.id"
                      :label="item.nameChn"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="所在市/地/州" prop="catBuyer.cityId">
                  <el-select v-model="ruleForm.catBuyer.cityId" placeholder="请选择"
                             @change="chooseCity(ruleForm.catBuyer.cityId)" class="width-200">
                    <el-option
                      v-for="item in ruleForm.cityList"
                      :key="item.id"
                      :label="item.nameChn"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="所在区/县市/县" prop="catBuyer.countyId">
                  <el-select v-model="ruleForm.catBuyer.countyId" placeholder="请选择"
                             @change="chooseCounty" class="width-200">
                    <el-option
                      v-for="item in ruleForm.countyList"
                      :key="item.id"
                      :label="item.nameChn"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="床位数">
                  <el-input v-model="ruleForm.catBuyer.bedNumber"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="医院的所有制">
                  <el-input v-model="ruleForm.catBuyer.proprietorship"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="日门诊量">
                  <el-input v-model="ruleForm.catBuyer.outpatientPerDay"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="人均用药金额">
                  <el-input v-model="ruleForm.catBuyer.sumPerPerson"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="年药品销售收入">
                  <el-input v-model="ruleForm.catBuyer.salesumPerYear"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="医院的特色门诊">
                  <el-input v-model="ruleForm.catBuyer.featureClinic"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="医师数">
                  <el-input v-model="ruleForm.catBuyer.doctorNum"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="门诊药品金额">
                  <el-input v-model="ruleForm.catBuyer.clinicMedicalMoney"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="住院人数">
                  <el-input v-model="ruleForm.catBuyer.inpatientNum"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="单位备注">
                  <el-input v-model="ruleForm.catBuyer.orgDesc"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="联系人">
                  <el-input v-model="ruleForm.catBuyer.linkPerson"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话">
                  <el-input v-model="ruleForm.catBuyer.linkPhone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="联系人邮箱">
                  <el-input v-model="ruleForm.catBuyer.linkEmail"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <h3 class="zzxx">资质信息</h3>

            <el-row>
              <el-col :span="12">
                <el-form-item label="开户名称">
                  <el-input v-model="ruleForm.catBuyer.orgAccountName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="开户银行">
                  <el-input v-model="ruleForm.catBuyer.orgBank"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="开户账号">
                  <el-input v-model="ruleForm.catBuyer.orgAccount"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="纳税人登记号">
                  <el-input v-model="ruleForm.catBuyer.taxCode"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="邮政编码">
                  <el-input v-model="ruleForm.catBuyer.postCode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="单位电话">
                  <el-input v-model="ruleForm.catBuyer.orgPhone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="单位网址">
                  <el-input v-model="ruleForm.catBuyer.orgUrl"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="单位传真">
                  <el-input v-model="ruleForm.catBuyer.orgFaxe"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
              <el-form-item label=" ">
                <el-button type="primary" size="small" @click="submitForm('ruleForm')">提交</el-button>
                <el-button size="small" @click="goBack()">返回</el-button>
              </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </div>
    <buy-org-code v-if="orgCodevisible" ref="BuyOrgCode" @choose="choose"></buy-org-code>
  </div>

</template>
<script>
  import {regions} from 'src/axios/datacenter/orgdata/catbuyer/catBuyer'
  import {city} from 'src/axios/datacenter/orgdata/catbuyer/catBuyer'
  import {county} from 'src/axios/datacenter/orgdata/catbuyer/catBuyer'
  import {add} from 'src/axios/datacenter/orgdata/catbuyer/catBuyer'
  import {generateCode} from 'src/axios/datacenter/orgdata/catbuyer/catBuyer'
  import {initBuyerKind} from 'src/axios/datacenter/orgdata/catbuyer/catBuyer'
  import ElButton from "../../../../../../node_modules/element-ui/packages/button/src/button";
  import BuyOrgCode from "./windowPanel/buyOrgCode";
  import "../../../../../assets/css/datacenter.css";

  export default {
    components: {
      BuyOrgCode,
      ElButton
    },
    data() {
      return {
        code: '',
        orgCodevisible: false,
        buyerKindList: undefined,
        ruleForm: {
          provinceList: undefined,
          cityList: undefined,
          countyList: undefined,
          catOrg: {
            'creditCode': '',
            'organizeCode': '',
            'name': '',
            'code': '',
            'abbr': '',
            'spellAbbr': '',
            'nameWb': '',
          },
          catBuyer: {
            'orgKind': '0',
            'medicareFlag': '0',
            'gradeNo': '',
            'buyerKind': '',
            'subjectFlag': '',
            'orgPresider': '',
            'orgAddress': '',
            'provinceId': '',
            'cityId': '',
            'countyId': '',
            'bedNumber': '',
            'proprietorship': '',
            'outpatientPerDay': '',
            'sumPerPerson': '',
            'salesumPerYear': '',
            'featureClinic': '',
            'doctorNum': '',
            'clinicMedicalMoney': '',
            'inpatientNum': '',
            'orgDesc': '',
            'linkPerson': '',
            'linkPhone': '',
            'linkEmail': '',
            'orgAccountName': '',
            'orgBank': '',
            'orgAccount': '',
            'taxCode': '',
            'postCode': '',
            'orgPhone': '',
            'orgUrl': '',
            'orgFaxe': ''
          }
        },
        rules: {
          'catOrg.name': {required: true, message: '必填项不能为空', trigger: 'blur'},
          'catOrg.code': {required: true, message: '必填项不能为空', trigger: 'blur'},
          'catOrg.abbr': {required: true, message: '必填项不能为空', trigger: 'blur'},
          'catBuyer.orgKind': {required: true, message: '必填项不能为空', trigger: 'blur'},
          'catBuyer.orgType': {required: true, message: '必填项不能为空', trigger: 'blur'},
          'catBuyer.orgAddress': {required: true, message: '必填项不能为空', trigger: 'blur'},
          'catBuyer.provinceId': {required: true, message: '必填项不能为空', trigger: 'blur'},
          'catBuyer.buyerKind': {required: true, message: '必填项不能为空', trigger: 'blur'},
          'catBuyer.subjectFlag': {required: true, message: '必填项不能为空', trigger: 'blur'},
          'catOrg.creditCode': {min: 18, max: 18, message: '统一社会信用代码必须为18位', trigger: 'blur'}
        },
        nodesPosition: {}//保存节点位置
      };
    },

    //初始化加载数据
    created() {
      //初始化省信息
      regions().then(res => {
        this.ruleForm.provinceList = res.data;
      });
      initBuyerKind().then(res => {
        this.buyerKindList = res.data
      });
    },

    methods: {
      submitForm(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            add(this.ruleForm).then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.goBack();
                }
              })
            })
          } else {
            this.$alert('请检查必填项内容', '提示', {
              confirmButtonText: '确定',
              type: 'warning',
            });
            return false;
          }
        });
      },

      //根据选择的省加载市信息
      chooseProvince(provinceId) {
        this.ruleForm.catOrg.code = '';
        this.ruleForm.catBuyer.cityId = '';
        this.ruleForm.catBuyer.countyId = '';
        city(provinceId).then(res => {
          this.ruleForm.cityList = res.data
        })
      },

      //根据选择的市加载县信息
      chooseCity(cityId) {
        this.ruleForm.catOrg.code = '';
        this.ruleForm.catBuyer.countyId = '';
        county(cityId).then(res => {
          this.ruleForm.countyList = res.data
        })
      },

      //置空单位代码
      chooseCounty() {
        this.ruleForm.catOrg.code = '';
      },

      getOrganizeCode() {
        if (this.ruleForm.catOrg.creditCode.length == 18) {
          this.ruleForm.catOrg.organizeCode = this.ruleForm.catOrg.creditCode.substr(8, 9)
        }
      },

      //选择单位代码
      checkAndShow(){
        if (this.ruleForm.catBuyer.provinceId == "" || this.ruleForm.catBuyer.provinceId == undefined) {
          this.$alert('请至少选择省', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false;
        } else {

          this.orgCodevisible = true;

          //选择层级加载code
          var id;
          if (this.ruleForm.catBuyer.countyId != "" && this.ruleForm.catBuyer.countyId != undefined) {
            id = this.ruleForm.catBuyer.countyId;
          } else if (this.ruleForm.catBuyer.cityId != "" && this.ruleForm.catBuyer.cityId != undefined) {
            id = this.ruleForm.catBuyer.cityId
          } else {
            id = this.ruleForm.catBuyer.provinceId;
          }

          this.$nextTick(() => {
            this.$refs.BuyOrgCode//同步隶属关系，医疗机构类别到弹窗,以及区ID
              .initWindow(this.ruleForm.catBuyer.subjectFlag, this.ruleForm.catBuyer.buyerKind, id);
          })
        }
      },

      choose(data) {
        this.ruleForm.catBuyer.subjectFlag = data.value.subjectFlag;
        this.ruleForm.catBuyer.buyerKind = data.value.buyerKind;
        this.code = data.value.code;
        //生成单位代码
        generateCode(this.code).then(res => {
          this.ruleForm.catOrg.code = res.data;
          if (this.ruleForm.catOrg.code.length != 13) {
            this.$alert('单位代码生成失败', '提示', {
              confirmButtonText: '确定',
              type: 'warning',
            });
            this.ruleForm.catOrg.code = '';
          }
        });
      },

      goBack() {
        this.$router.go(-1);
      },
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
            if (viewNodeChildeNodes[i].className == 'qyxx') {
              this.nodesPosition.qyxx = viewNodeChildeNodes[i].offsetTop
            }
            if (viewNodeChildeNodes[i].className == 'zzxx') {
              this.nodesPosition.zzxx = viewNodeChildeNodes[i].offsetTop
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
        if (vieNodeScrollTop < this.nodesPosition.qyxx) {
          this.removeClassCurrent(jumpNodeName)[0].classList.add('current');
        }
        else if (vieNodeScrollTop > this.nodesPosition.qyxx && vieNodeScrollTop < this.nodesPosition.zzxx) {
          this.removeClassCurrent(jumpNodeName)[0].classList.add('current');
        }
        else if (vieNodeScrollTop > this.nodesPosition.zzxx) {
          this.removeClassCurrent(jumpNodeName)[1].classList.add('current');
        }

        //增加或删除菜单浮动类名
        if (vieNodeScrollTop <= this.nodesPosition.qyxx) {
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
    }
  }
</script>

