<template>
  <div class="tab-box">
    <!--<div class="tabs-panel">-->
      <!--<span class="active">企业申报确认</span>-->
      <!--<router-link to="/ZISHEN/orgAffirm/enterpriseAffirmChange">企业变更确认</router-link>-->
    <!--</div>-->
    <span class="tab-bar"></span>
    <el-tabs v-model="activeName" @tab-click="toChange">
      <el-tab-pane label="企业申报确认" name="first" />
      <el-tab-pane label="企业变更确认" name="second" />
    </el-tabs>
    <!-- 表格 -->
    <div class="el-tabs__content">
    <div class="tablebox" v-if="old.org && old.org.ENABLE_FLAG == '1' && old.org.STATE == '8' && old.org.AUDIT_RESULT == '1'">
      <div class="main audit-main">
        <ul class="side side-init" id="product-addup-side">
          <li
            v-for="(item,index) in nodesPosition"
            :key="index">
            <a @click="changeScrollHeight(item.nodePosition,'jump-product-addup',index)"
               class="d_jump jump-product-addup">{{item.itemName}}</a></li>
        </ul>
        <div class="right-box">
          <div class="gap-40">
            <info ref="info" id="product-addup-box"></info>
            <span slot="footer">
        <el-button type="primary" @click="agree">确认</el-button>
        <el-button type="danger" @click="refuse">拒绝</el-button>
      </span>
          </div>
        </div>
      </div>

    </div>
    </div>
    <div style="color: #999999; text-align: center; padding-top: 80px;" v-if="!old.org || old.org.ENABLE_FLAG != '1' || old.org.STATE != '8' || old.org.AUDIT_RESULT != '1'">
      <label>暂无数据</label>
    </div>
  </div>
</template>

<script>

  // 引入用户相关请求
  import { declare, audit, affirm } from 'src/axios/auditchanges/orgAffirm/enterprise'
  import { decodeQuestion, decodeAudit } from 'src/axios/auditchanges/common/nestedJson'
  import { getProjectSubjoinMessage } from "src/axios/auditchanges/systemManage/subjoinMessageManage"
  import info from 'src/pages/auditchanges/common/enterprise/info'
  import {windowScroll} from 'src/components/mixins/scrolls'
  export default {
    mixins:[windowScroll],
    components: {
      info
    },
    data () {
      return {
        activeName: 'first',//标签页默认选中第一个
        id: undefined,
        old: {},
        audit: {},
        nodesPosition: [
          {itemName: '企业基础信息', nodePosition: null, itemAbb: 'qyxx'},
          {itemName: '资信信息', nodePosition: null, itemAbb: 'zx'},
          {itemName: '申报人信息', nodePosition: null, itemAbb: 'sbrxx'},
          {itemName: '营业执照信息', nodePosition: null, itemAbb: 'yyzz'},
          {itemName: '生产许可信息', nodePosition: null, itemAbb: 'scxk'},
          {itemName: '经营许可信息', nodePosition: null, itemAbb: 'yyxk'},
          {itemName: 'GMP信息', nodePosition: null, itemAbb: 'gpmone'},
          {itemName: 'GSP信息', nodePosition: null, itemAbb: 'gpmtwo'},
          {itemName: '项目附加信息', nodePosition: null, itemAbb: 'xmxx'}
        ]
      }
    },
    created () {
      this.handleGoAudit();
    },
    methods: {
      // 打开合并剂型新增页面
      handleGoAudit() {
        declare().then(res => {
          this.old = res.data;
          this.$nextTick(async () => {
            if(!this.$refs.info){
              return;
            }
            this.audit = await audit(this.old.org.ID);

            let form = this.$refs.info.metaForm();

            this.id = this.old.org.ID;
            decodeAudit(form, this.audit.data);

            console.log(form);
            this.$refs.info.init({
              btn: "查看质疑",
              limit: false,
              type: 1,
              flag: 5,
              old: this.old,
              audit: form,
            });
            setTimeout(function () {
              /**
               * 查询设置锚点位置
               * */
              this.getNodesHeight('product-addup-box', 'enter-shxx');
              //恢复初始状态
              this.removeClassCurrent('jump-product-addup')[0].classList.add('current');
            }.bind(this),0)
          });
        });
      },
      async agree() {
        let old = await declare();
        let subjoin = await getProjectSubjoinMessage({
          attachedType: '1',
          projectId: old.data.org.PROJECT_ID,
        });

        let orgAtt = old.data.annex;
        old.data.annex = [];

        subjoin.data.forEach(x => {
          let annex = {
            dicName: x.dicName,
            options: [],
          };
          x.catAttachedDictionaryDomains.forEach(y => {
            annex.options.push({
              id: y.id,
              type: y.fieldType,
              label: y.remark,
              tipUrl: y.tipUrl,
              tipText: y.tipText,
              fileTypeName: y.fileTypeName,
              value: orgAtt[y.id],
              imageFlag: y.hasImageFlag,
              options: y.catAttachedDictionaryOptions,
            });
          });
          old.data.annex.push(annex);
        });

        let audit = this.audit.data;
        decodeAudit(old.data, audit);

        old.data.enterprise.FACTORY_FLAG = old.data.enterprise.FACTORY_FLAG == 1;
        old.data.enterprise.SALER_FLAG = old.data.enterprise.SALER_FLAG == 1;
        old.data.enterprise.SEND_FLAG = old.data.enterprise.SEND_FLAG == 1;

        console.log(old.data);
        let res = await affirm(this.id, null, 9, old.data);
        if(res.success) {
          window.location.reload();
        }
      },
      async refuse() {
        let res = await affirm(this.id, null, 0);
        if(res.success) {
          window.location.reload();
        }
      },
      toChange(t) {
        if(t.name == "second") {
          this.$router.push('/AUDIT/orgAffirm/enterpriseAffirmChange');
        }
      }
    },
    watch: {
      visible(newVal) {
        if (newVal == false) {
          window.onscroll = null;
          this.removeFixed('product-addup-side')
        } else {
          window.onscroll = function () {
            let scrolltop=document.documentElement.scrollTop||document.body.scrollTop;
            this.dialogBoxScroll(scrolltop, 'jump-product-addup', 'product-addup-side')
          }.bind(this)
        }
      }
    },
    mounted() {
      window.onscroll = function () {
        let scrolltop=document.documentElement.scrollTop||document.body.scrollTop;
        this.dialogBoxScroll(scrolltop, 'jump-product-addup', 'product-addup-side')
      }.bind(this)
    },
    destroyed(){
      window.onscroll = null
    }
  }
</script>
