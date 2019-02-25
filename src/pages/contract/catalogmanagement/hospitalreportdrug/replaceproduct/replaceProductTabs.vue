<template>
  <el-dialog
    title="产品信息"
    :close-on-click-modal="false"
    :visible.sync="visible"
    top="0vh"
    width="80%">
    <div class="tab-box">
      <!-- ========================== 主内容start ========================= -->
      <!--产品信息表格-->
      <ul class="tabs-echo-ul">
        <li>产品名称：<span>{{this.obj.nameChn}}</span></li>
        <li>商用名：<span>{{this.obj.productName}}</span></li>
        <li>剂型：<span>{{this.obj.doseageFormName}}</span></li>
      </ul>
      <ul class="tabs-echo-ul">
        <li>规格：<span>{{this.obj.spec}}</span></li>
        <li>包材：<span>{{this.obj.wrapName}}</span></li>
        <li>转化比：<span>{{this.obj.rStandRate}}</span></li>
      </ul>
      <ul class="tabs-echo-ul">
        <li>单位：<span>{{this.obj.specUnit}}</span></li>
        <li>生产企业：<span>{{this.obj.manufactureName}}</span></li>
        <li>&nbsp;</li>
      </ul>
      <!--多tab轮转-->
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs-left">
        <el-tab-pane label="候选目录内" name="inside">
          <replaceProduct-tabs-tabInside ref="replaceProductTabsTabInside" v-if="replaceProductTabInsideVisible" :obj="this.obj"></replaceProduct-tabs-tabInside>
        </el-tab-pane>
        <el-tab-pane label="候选目录外" name="outside">
          <replaceProduct-tabs-tabOutside ref="replaceProductTabsTabOutside" v-if="replaceProductTabOutsideVisible" :obj="this.obj"></replaceProduct-tabs-tabOutside>
        </el-tab-pane>
      </el-tabs>

      <!-- ========================== 主内容end ========================= -->
    </div>
      <span slot="footer">
        <el-button @click="closeDialog()">关闭</el-button>
      </span>
  </el-dialog>

</template>
<script>

  // 引入tab的页面组件
  import replaceProductTabsTabInside from 'src/pages/contract/catalogmanagement/hospitalreportdrug/replaceproduct/replaceProduct-tabs-tabInside'
  import replaceProductTabsTabOutside from 'src/pages/contract/catalogmanagement/hospitalreportdrug/replaceproduct/replaceProduct-tabs-tabOutside'

  export default {
    name: "form-view",
    name: 'replaceProductTabs',
    components: {
      replaceProductTabsTabInside,
      replaceProductTabsTabOutside
    },
    data() {
      return {
        activeName: 'inside',
        visible:false,
        replaceProductTabInsideVisible: false,
        replaceProductTabOutsideVisible:false,
        obj: {}
      };
    },
    methods: {
      fillData(obj) {
        this.visible = true;
        this.obj = obj;
        this.activeName = 'inside';
        this.replaceProductTabInsideVisible = true;
        this.replaceProductTabOutsideVisible = true;
        this.$nextTick(() => {
          this.$refs.replaceProductTabsTabInside.list();
        });
      },
      handleClick(tab, event) {
        // console.log(tab, event);
        //点击选项卡根据选项卡的name判断是哪个选项卡,然后加载对应的查询列表方法
        this.$nextTick( () => {
          if(tab.paneName === 'inside'){
            this.$refs.replaceProductTabsTabInside.list();
          }else if(tab.paneName === 'outside'){
            this.$refs.replaceProductTabsTabOutside.list();
          }
        });
      },
      closeDialog(){
        this.visible = false
      }
    }
  }
</script>
<style>
  @import "../../../../../assets/css/compact.css";
</style>
