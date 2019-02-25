<template>
  <el-dialog
    :title="'剂型列表'"
    :close-on-click-modal="false"
    width="75%"
    :visible.sync="visible">
    <div class="tab-box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="剂型列表" name="first" v-show="activeName=='first'?true:false">
          <dosage-info :parent-id="chooseDosage"></dosage-info>
        </el-tab-pane>
        <el-tab-pane label="剂型打包维护列表" name="second" v-show="activeName=='second'?true:false">
          <package-info :parent-id="chooseDosageGroup"></package-info>
        </el-tab-pane>
      </el-tabs>
    </div>
    <span slot="footer">
      <el-button size="small" type="primary" @click="buttonForm()">选择</el-button>
      <el-button size="small" @click="visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import DosageInfo from "./dosageInfoForAdd";
  import PackageInfo from "./packageInfo";

  export default {
    name: "DosageIndex",
    components: {
      PackageInfo,
      DosageInfo,
    },
    data() {
      return {
        activeName: 'first',
        chooseDosage: [],
        chooseDosageGroup:[],
        visible:false,
        visible2:false
      };
    },
    methods: {
      fillData() {
        this.visible = true;
      },
      //  新选择药品名称
      buttonForm() {
        var data=[];
        for(var i=0;i<this.chooseDosage.length;i++){
          data.push(this.chooseDosage[i]);
        }
        for(var i=0;i<this.chooseDosageGroup.length;i++){
          var exist=false;
          for(var j=0;j<data.length;j++){
            if(this.chooseDosageGroup[i].code==data[j].code){
              exist=true;
            }
          }
          if(exist==false){
            data.push(this.chooseDosageGroup[i]);
          }
        }
        if (data.length > 0) {
          this.$confirm('确认选择' + data.length + '种剂型', '确认', {
            confirmButtonText: '确定',
            cancelButtonText: '重选',
            type: 'warning'
          }).then(() => {
            this.visible = false;
            this.$emit('chooseDosageList', {value: data});
          });
        } else {
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false;
        }
      },
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

