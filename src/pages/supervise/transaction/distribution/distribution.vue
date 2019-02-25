<template>
  <dl class="mainbox">
    <dd>
      <div class="s-inner-tabs">
        <a href="javascript:" v-if="hasPerm('transaction:querySendInfo')" class="s-intab"
           :class="{active:activeName==='distributionSupply'}" @click="inNavActive('distributionSupply')">
          配送企业配送情况
        </a>
        <a href="javascript:" v-if="hasPerm('transaction:senderStock')" class="s-intab"
           :class="{active:activeName==='distributionStock'}" @click="inNavActive('distributionStock')">
          配送企业产品库存
        </a>
      </div>
      <distribution-supply v-if="activeName === 'distributionSupply'"></distribution-supply>
      <distribution-stock v-if="activeName === 'distributionStock'"></distribution-stock>
    </dd>
  </dl>
</template>

<script>
  import distributionSupply from 'src/pages/supervise/transaction/distribution/distributionSupply'
  import distributionStock from 'src/pages/supervise/transaction/distribution/distributionStock'
  import {HasPerm} from 'src/components/mixins'
  export default {
    name: "sTransaction",
    mixins: [HasPerm],
    components: {
      distributionSupply,
      distributionStock
    },
    data() {
      return {
        activeName: 'distributionStock'
      };
    },
    methods: {
      inNavActive(nav) {
        this.activeName = nav;
      },
      judgePower(){
        if(this.hasPerm('transaction:querySendInfo')){
          this.activeName='distributionSupply';
        }else if (this.hasPerm('transaction:senderStock')){
          this.activeName='distributionStock';
        }
      }
    }
  }
</script>

