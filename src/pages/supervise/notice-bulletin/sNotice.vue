<template>
  <div class="s-inner">
    <el-tabs v-model="activeName" @tab-click="handleClick">
<!--      <el-tab-pane v-if="hasPerm('supervision:publicityNotice')" label="药品信息变更公示" name="1">
        <drugs-info-update v-if="activeName === '1'"></drugs-info-update>
      </el-tab-pane>
      <el-tab-pane v-if="hasPerm('supervision:querTalks')" label="医院谈判结果公示" name="2">
        <hospital-negotiation v-if="activeName === '2'"></hospital-negotiation>
      </el-tab-pane>
      <el-tab-pane v-if="hasPerm('supervision:purchaseRecord')" label="医疗机构采购目录" name="3">
        <medical-care-purchase v-if="activeName === '3'"></medical-care-purchase>
      </el-tab-pane>
      <el-tab-pane v-if="hasPerm('supervision:queryCataLog')" label="医院调整本院目录" name="4">
        <drug-update-catalog v-if="activeName === '4'"></drug-update-catalog>
      </el-tab-pane>-->
      <el-tab-pane v-if="hasPerm('supervision:queryCataLog')" label="重点监控药品上报情况" name="1">
        <main-monitor-drug v-if="activeName === '1'"></main-monitor-drug>
      </el-tab-pane>
      <el-tab-pane v-if="hasPerm('supervision:queryCataLog')" label="短缺药上报情况" name="2">
        <shortage-durg v-if="activeName === '2'"></shortage-durg>
      </el-tab-pane>
      <el-tab-pane v-if="hasPerm('supervision:queryCataLog')" label="非两票制药品上报情况" name="3">
        <un-two-votes-drug v-if="activeName === '3'"></un-two-votes-drug>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import drugsInfoUpdate from 'src/pages/supervise/notice-bulletin/drugsInfoUpdate'
  import hospitalNegotiation from 'src/pages/supervise/notice-bulletin/hospitalNegotiation'
  import medicalCarePurchase from 'src/pages/supervise/notice-bulletin/medicalCarePurchase'
  import drugUpdateCatalog from 'src/pages/supervise/notice-bulletin/drugUpdateCatalog'
  import mainMonitorDrug from 'src/pages/supervise/notice-bulletin/mainMonitorDrug'
  import shortageDurg from 'src/pages/supervise/notice-bulletin/shortageDurg'
  import unTwoVotesDrug from 'src/pages/supervise/notice-bulletin/unTwoVotesDrug'
  import {HasPerm} from 'src/components/mixins'

  export default {
    name: "sTransaction",
    mixins: [HasPerm],
    components: {
      drugsInfoUpdate,
      hospitalNegotiation,
      medicalCarePurchase,
      drugUpdateCatalog,
      mainMonitorDrug,
      shortageDurg,
      unTwoVotesDrug
    },
    data() {
      return {
        activeName: '1'
      };
    },
    mounted() {
      this.judgePower();
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      judgePower() {
        if (this.hasPerm("supervision:publicityNotice")) {
          this.activeName = '1';
        } else if (this.hasPerm('supervision:querTalks')) {
          this.activeName = '2';
        } else if (this.hasPerm('supervision:purchaseRecord')) {
          this.activeName = '3';
        } else if (this.hasPerm('supervision:queryCataLog')) {
          this.activeName = '4';
        }
      }
    }
  }
</script>

