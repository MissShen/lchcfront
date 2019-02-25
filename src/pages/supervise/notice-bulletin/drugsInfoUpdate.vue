<template>
  <dl class="mainbox">
    <dd>
      <div class="s-inner-tabs">
        <a href="javascript:" v-if="hasPerm('transaction:queryPurchase')" class="s-intab" :class="{active:activeName==='orgUpdate'}" @click="inNavActive('orgUpdate')">
          企业变更
        </a>
        <a href="javascript:" v-if="hasPerm('transaction:queryPurchaseBackUp')" class="s-intab" :class="{active:activeName==='productUpdate'}" @click="inNavActive('productUpdate')">
          产品变更
        </a>
        <a href="javascript:" v-if="hasPerm('transaction:queryPurchaseFace')" class="s-intab" :class="{active:activeName==='priceUpdate'}" @click="inNavActive('priceUpdate')">
          价格变更
        </a>
      </div>
      <org-update v-if="activeName === 'orgUpdate'"></org-update>
      <product-update v-if="activeName === 'productUpdate'"></product-update>
      <price-update v-if="activeName === 'priceUpdate'"></price-update>
    </dd>
  </dl>
</template>

<script>
  import orgUpdate from 'src/pages/supervise/notice-bulletin/orgUpdate'
  import productUpdate from 'src/pages/supervise/notice-bulletin/productUpdate'
  import priceUpdate from 'src/pages/supervise/notice-bulletin/priceUpdate'
  import {HasPerm} from 'src/components/mixins'
  export default {
    name: "sTransaction",
    mixins: [HasPerm],
    components: {
      orgUpdate,
      productUpdate,
      priceUpdate
    },
    data() {
      return {
        activeName: 'orgUpdate'
      };
    },
    methods: {
      inNavActive(nav) {
        this.activeName = nav;
      },
      judgePower(){
        if(this.hasPerm('transaction:queryPurchase')){
          this.activeName='orgUpdate';
        }else if (this.hasPerm('transaction:queryPurchaseBackUp')){
          this.activeName='productUpdate';
        }else if (this.hasPerm('transaction:queryPurchaseFace')){
          this.activeName='priceUpdate';
        }
      }
    }
  }
</script>
