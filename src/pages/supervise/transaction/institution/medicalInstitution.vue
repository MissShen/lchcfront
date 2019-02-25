<template>
  <dl class="mainbox">
    <dd>
      <div class="s-inner-tabs">
        <a href="javascript:" v-if="hasPerm('transaction:queryPurchase')" class="s-intab" :class="{active:activeName==='purchaseInfo'}" @click="inNavActive('purchaseInfo')">
          医疗机构采购情况
        </a>
        <a href="javascript:" v-if="hasPerm('transaction:queryPurchaseBackUp')" class="s-intab" :class="{active:activeName==='purchaseRecordInfo'}" @click="inNavActive('purchaseRecordInfo')">
          医疗机构备案情况
        </a>
        <a href="javascript:" v-if="hasPerm('transaction:queryPurchaseFace')" class="s-intab" :class="{active:activeName==='purchaseFaceInfo'}" @click="inNavActive('purchaseFaceInfo')">
          医疗机构临采情况
        </a>
      </div>
      <purchase-info v-if="activeName === 'purchaseInfo'"></purchase-info>
      <purchase-record-info v-if="activeName === 'purchaseRecordInfo'"></purchase-record-info>
      <purchase-faceInfo v-if="activeName === 'purchaseFaceInfo'"></purchase-faceInfo>
    </dd>
  </dl>
</template>
<script>
  import purchaseInfo from 'src/pages/supervise/transaction/institution/purchaseInfo'
  import purchaseRecordInfo from 'src/pages/supervise/transaction/institution/purchaseRecordInfo'
  import purchaseFaceInfo from 'src/pages/supervise/transaction/institution/purchaseFaceInfo'
  import {HasPerm} from 'src/components/mixins'
  export default {
    name: 'medicalInstitution',
    mixins: [HasPerm],
    data(){
      return {
        activeName: 'purchaseInfo'
      }
    },
    components: {
      purchaseInfo,
      purchaseRecordInfo,
      purchaseFaceInfo
    },
    mounted(){

    },
    methods: {
      inNavActive(nav) {
        this.activeName = nav;
      },
      judgePower(){
        if(this.hasPerm('transaction:queryPurchase')){
          this.activeName='purchaseInfo';
        }else if (this.hasPerm('transaction:queryPurchaseBackUp')){
          this.activeName='purchaseRecordInfo';
        }else if (this.hasPerm('transaction:queryPurchaseFace')){
          this.activeName='3';
        }
      }
    }
  }
</script>

