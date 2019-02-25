<template>
  <el-dialog
    title="企业信息挂网"
    :close-on-click-modal="false"
    :visible.sync="visible"
    class="audit-dialog"
    id="product-addup-box"
    append-to-body
  >
    <div class="main audit-main">
      <ul class="side side-init" id="product-addup-side">
        <li
          v-for="(item,index) in nodesPosition"
          :key="index">
          <a @click="changeScrollHeight(item.nodePosition,'product-addup-box','jump-product-addup',index)"
             class="d_jump jump-product-addup">{{item.itemName}}</a></li>
      </ul>
      <div class="right-box">
        <div class="gap-40">
          <info ref="info" id="product-addup"></info>
        </div>
      </div>
    </div>


    <div slot="footer">
      <el-button @click="visible=false">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>

  import { query } from 'src/axios/auditchanges/infoshow/orgInfoShow'
  import info from 'src/pages/auditchanges/common/enterprise/info'
  import {boxScroll} from 'src/components/mixins/scrolls'
  export default {
    mixins:[boxScroll],
    components: {
      info
    },
    data() {
      return {
        visible:false,
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
    methods: {
      list(id) {
        this.visible = true;

        this.$nextTick(async () => {
          let res = await query(id);

          console.log(res)
          this.$refs.info.init({
            limit: false,
            type: 1,
            flag: 6,
            old: res.data,
          });
          setTimeout(function () {
            /**
             * 查询设置锚点位置
             * */
            this.getNodesHeight('product-addup');
            //恢复初始状态
            this.removeClassCurrent('jump-product-addup')[0].classList.add('current');
          }.bind(this),0)
        })
      }
    },
    watch: {
      visible(newVal) {
        let vieNode = document.getElementById('product-addup-box');
        if(vieNode){
          if (newVal == false) {
            vieNode.onscroll = null;
            this.removeFixed('product-addup-side')
          } else {
            vieNode.onscroll = function () {
              this.dialogBoxScroll(vieNode, 'jump-product-addup', 'product-addup-side')
            }.bind(this)
          }
        }
      }
    },
    mounted() {
      let vieNode = document.getElementById('product-addup-box');
      if(vieNode){
        vieNode.onscroll = function () {
          this.dialogBoxScroll(vieNode, 'jump-product-addup', 'product-addup-side')
        }.bind(this)
      }
    }
  }
</script>
