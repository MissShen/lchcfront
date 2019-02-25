<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="main">
      <ul class="side" id="side-menu">
        <li><a href="javascript:void(0)" @click="changeScrollHeight(nodesPosition.qyjc,'jump_item',0)" class="current jump_item d_jump">企业基础信息</a></li>
        <li><a href="javascript:void(0)" @click="changeScrollHeight(nodesPosition.sbr,'jump_item',1)" class="d_jump jump_item">申报人信息</a></li>
        <li><a href="javascript:void(0)" @click="changeScrollHeight(nodesPosition.yyzz,'jump_item',2)" class="d_jump jump_item">营业执照信息</a></li>
        <li><a href="javascript:void(0)" @click="changeScrollHeight(nodesPosition.scxk,'jump_item',3)" class="d_jump jump_item">生产许可证信息</a></li>
        <li><a href="javascript:void(0)" @click="changeScrollHeight(nodesPosition.gmp,'jump_item',4)" class="d_jump jump_item">GMP信息</a></li>
      </ul>
      <div class="scroll-content" >
        <div class="gap-40">
          <el-form :model="ruleForm" id="right-box"  ref="ruleForm" label-width="90px" size="small"
                   label-position="left" class="demo-form-inline" :inline="true">
            <h3 class="qyjc">企业基础信息</h3>
            <el-row>
              <el-col :span="12">
                <el-form-item label="企业名称：">
                  <span>{{ruleForm.orgBasic.name}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="企业类型：">
                  <span v-if="ruleForm.orgBasic.factoryFlag == '1'">生产企业&nbsp;</span>
                  <span v-if="ruleForm.orgBasic.sendFlag == '1'">配送企业&nbsp;</span>
                  <span v-if="ruleForm.orgBasic.salerFlag == '1'">代理企业&nbsp;</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="组织机构代码：" label-width="50">
                  <span>{{ruleForm.orgBasic.organizeCode}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="固定电话：">
                  <span>{{ruleForm.orgBusiness.landlineTel}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="企业传真：">
                  <span>{{ruleForm.orgBusiness.fax}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <h3 class="sbr">申报人信息</h3>
            <el-table
              :data="ruleForm.orgDeclarerList"
              border
              stripe>
              <el-table-column type="index" width="50" label="序号"></el-table-column>
              <el-table-column label="联系人姓名" width="100">
                <template slot-scope="scope">
                  <span>{{ scope.row.linkPerson }}</span>
                </template>
              </el-table-column>
              <el-table-column label="固定电话" width="110">
                <template slot-scope="scope">
                  <span>{{ scope.row.linkTel }}</span>
                </template>
              </el-table-column>
              <el-table-column label="手机" width="110">
                <template slot-scope="scope">
                  <span>{{ scope.row.linkPhone}}</span>
                </template>
              </el-table-column>
              <el-table-column label="申报人传真" width="110">
                <template slot-scope="scope">
                  <span>{{ scope.row.linkFax}}</span>
                </template>
              </el-table-column>
              <el-table-column label="电子邮箱">
                <template slot-scope="scope">
                  <el-popover placement="top-start" width="200" trigger="hover" :content="scope.row.linkEmial">
                    <span class="hiddenfont" slot="reference">{{ scope.row.linkEmial }}</span>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="身份证号" width="160">
                <template slot-scope="scope">
                  <span>{{ scope.row.linkIdcard}}</span>
                </template>
              </el-table-column>
              <el-table-column label="联系地址">
                <template slot-scope="scope">
                  <el-popover placement="top-start" width="200" trigger="hover" :content="scope.row.linkAddress">
                    <span class="hiddenfont" slot="reference">{{ scope.row.linkAddress }}</span>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="邮编" width="60">
                <template slot-scope="scope">
                  <span>{{ ruleForm.orgBusiness.postCode}}</span>
                </template>
              </el-table-column>
              <el-table-column label="紧急联系人电话（手机）" width="170">
                <template slot-scope="scope">
                  <span>{{ scope.row.linkJtel}}</span>
                </template>
              </el-table-column>
            </el-table>
            <h3 class="yyzz">营业执照信息</h3>
            <el-row>
              <el-col :span="12">
                <el-form-item label="证书编号：">
                  <span>{{ruleForm.orgLicence.regNo}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="注册资金：">
                  <span>{{ruleForm.orgLicence.regAmount}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="法人姓名：">
                  <span>{{ruleForm.orgLicence.juridicalPerson}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="注册地址：">
                  <span>{{ruleForm.orgLicence.address}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="经营范围：">
                  <span>{{ruleForm.orgLicence.regScope}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="发证日期：">
                  <span>{{ruleForm.orgLicence.businessLicenseDate | capitalize}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="营业期限开始日期：" label-width="50">
                  <span>{{ruleForm.orgLicence.regDate | capitalize}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="营业期限截止日期：" label-width="50">
                  <span>{{ruleForm.orgLicence.regExpireS | capitalize}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="ruleForm.orgLicence.fileIds.length>0">
              <el-col :span="12" >
                <el-form-item label="证书展示：" label-width="50">
                  <images-preview v-if="ruleForm.orgLicence.fileIds.length>0" :imgIdListUnUnique="ruleForm.orgLicence.fileIds"></images-preview>
                </el-form-item>
              </el-col>
            </el-row>

            <h3 class="scxk">生产许可证信息</h3>
            <el-row>
              <el-col :span="12">
                <el-form-item label="生产许可证书编号：" label-width="50">
                  <span>{{ruleForm.orgManufacture.permitCode}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="发证日期：">
                  <span>{{ruleForm.orgManufacture.pdDate | capitalize}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="有效期至：">
                  <span>{{ruleForm.orgManufacture.expiryDate | capitalize}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="发证机关：">
                  <span>{{ruleForm.orgManufacture.pdInstitution}}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="经营范围：">
                  <span>{{ruleForm.orgManufacture.produceCategory}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="ruleForm.orgManufacture.fileIds.length>0">
              <el-col :span="12">
                <el-form-item label="证书展示：">
                  <images-preview v-if="ruleForm.orgManufacture.fileIds.length>0" :imgIdListUnUnique="ruleForm.orgManufacture.fileIds"></images-preview>
                </el-form-item>
              </el-col>
            </el-row>

            <h3 class="gmp">GMP信息</h3>
            <el-table
              :data="ruleForm.orgGmpList"
              border
              stripe>
              <el-table-column type="index" width="50" label="序号"></el-table-column>
              <el-table-column label="证书编号">
                <template slot-scope="scope">
                  <span>{{ scope.row.certificateNumber }}</span>
                </template>
              </el-table-column>
              <el-table-column label="发证机关">
                <template slot-scope="scope">
                  <span>{{ scope.row.officeLicence }}</span>
                </template>
              </el-table-column>
              <el-table-column label="发证日期" width="180">
                <template slot-scope="scope">
                  <span>{{ scope.row.licenceDate | capitalize}}</span>
                </template>
              </el-table-column>
              <el-table-column label="有效期至" width="180">
                <template slot-scope="scope">
                  <span>{{ scope.row.expiryDate | capitalize}}</span>
                </template>
              </el-table-column>
              <el-table-column label="是否是新版GMP" width="180">
                <template slot-scope="scope">
                  <span v-if="scope.row.isNew == '1'">是</span>
                  <span v-if="scope.row.isNew != '1'">否</span>
                </template>
              </el-table-column>
              <el-table-column label="证书展示">
                <template slot-scope="scope">
                  <images-preview :dilogFlag="false" v-if="scope.row.fileIds.length>0" :imgIdListUnUnique="scope.row.fileIds"></images-preview>
                  <span v-if="scope.row.fileIds.length<=0">暂无</span>
                </template>
              </el-table-column>
            </el-table>
            <!-- <images-preview  :imgIdListUnUnique="['DATA00000000000000612042']"></images-preview> -->
            <!--<el-row>-->
              <!--<el-col :span="12">-->
                <!--<span class="btn-mar">-->
                  <!--<el-button @click="goBack()">返回</el-button>-->
                <!--</span>-->
              <!--</el-col>-->
            <!--</el-row>-->
          </el-form>
        </div>
        <div class="foot-btn">
          <div class="foot-left">
            <el-button @click="goBack()" size="small">返回</el-button>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>
<script>
  import {findDetailByOrgBasicId} from 'src/axios/datacenter/qualificationdata/orgqualification/orgqualification';
  import moment from 'moment';
  import imagesPreview from 'src/pages/datacenter/windowPanel/imagesPreview';
  import "../../../../assets/css/datacenter.css";
  export default {
    components:{
      imagesPreview
    },
    data() {
      return {
        ruleForm: {
          orgBasic:undefined,
          orgBusiness:undefined,
          orgManufacture:undefined,
          orgDeclarerList:undefined,
          orgGmpList:undefined,
          orgLicence:undefined
        },
        nodesPosition: {}//保存节点位置
      };
    },
    created(){
      this.id = this.$route.params.id || undefined;
      findDetailByOrgBasicId(this.id).then(res => {
        this.ruleForm = res.data
        //获取节点所在位置 初始右边菜单起始
        this.$nextTick(() => {
          this.getNodesHeight("right-box");
          this.removeClassCurrent('jump_item')[0].classList.add('current');
          this.ruleForm.orgLicence.fileIds.splice(0,0);
        });
      })
    },
    methods: {
      handleRemove(file, fileList) {
      },
      goBack() {
        this.$router.go(-1);
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
      //获取节点所在位置 根据具体情况适当增加
      getNodesHeight(proInfoDetaiBox){
        let vieNode = document.getElementById(proInfoDetaiBox);
        let viewNodeChildeNodes = vieNode.childNodes;
        for (let i = 0; i < viewNodeChildeNodes.length; i++) {
          if (viewNodeChildeNodes[i].nodeName == 'H3') {
            if (viewNodeChildeNodes[i].className == 'qyjz') {
              this.nodesPosition.qyjz = viewNodeChildeNodes[i].offsetTop
            }
            if (viewNodeChildeNodes[i].className == 'sbr') {
              this.nodesPosition.sbr = viewNodeChildeNodes[i].offsetTop
            }
            if (viewNodeChildeNodes[i].className == 'yyzz') {
              this.nodesPosition.yyzz = viewNodeChildeNodes[i].offsetTop
            }
            if (viewNodeChildeNodes[i].className == 'scxk') {
              this.nodesPosition.scxk = viewNodeChildeNodes[i].offsetTop
            }
            if (viewNodeChildeNodes[i].className == 'gmp') {
              this.nodesPosition.gmp = viewNodeChildeNodes[i].offsetTop
            }

          }
        }
      },
      dialogBoxScroll(vieNodeScrollTop, jumpNodeName, sideNodeName){
        if (vieNodeScrollTop < this.nodesPosition.qyjc) {
          this.removeClassCurrent(jumpNodeName)[0].classList.add('current');
        }
        else if (vieNodeScrollTop > this.nodesPosition.qyjc && vieNodeScrollTop < this.nodesPosition.sbr) {
          this.removeClassCurrent(jumpNodeName)[0].classList.add('current');
        }
        else if (vieNodeScrollTop > this.nodesPosition.sbr && vieNodeScrollTop < this.nodesPosition.yyzz) {
          this.removeClassCurrent(jumpNodeName)[1].classList.add('current');
        }
        else if (vieNodeScrollTop > this.nodesPosition.yyzz && vieNodeScrollTop < this.nodesPosition.scxk) {
          this.removeClassCurrent(jumpNodeName)[2].classList.add('current');
        }
        else if (vieNodeScrollTop > this.nodesPosition.scxk && vieNodeScrollTop < this.nodesPosition.gmp) {
          this.removeClassCurrent(jumpNodeName)[3].classList.add('current');
        }
        else if (vieNodeScrollTop > this.nodesPosition.gmp) {
          this.removeClassCurrent(jumpNodeName)[4].classList.add('current');
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
