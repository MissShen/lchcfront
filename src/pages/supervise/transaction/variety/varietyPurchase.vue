<template>
  <!--<common-table></common-table>-->
  <common-tables
    ref="CommonTables"
    :mainTable="productTable"
    @mainQuery="searchProducts"
  ></common-tables>
</template>

<script>
  import CommonTable from 'src/pages/supervise/transaction/variety/commonTable'
  import CommonTables from 'src/pages/supervise/transaction/variety/commonTables'
  import {
    varietyPurchase,
    findHospitalt,
    findSender,
  } from 'src/axios/supervise/supervise-transaction/variety'
  import {priceFormat} from "src/utils/index"

  export default {
    components: {CommonTable, CommonTables},
    name: "varietyPurchase2",
    data() {
      return {
        productTable: {
          queryCondition: {
            inputs: [
              {model: "medicalName", placeholder: "商品名"},
              {model: "factoryName", placeholder: "生产企业"}
            ],
            datePickers: [
              {model: "beginDate", placeholder: "开始日期", format: "yyyy-MM-dd", type: "date"},
              {model: "endDate", placeholder: "结束日期", format: "yyyy-MM-dd", type: "date"},
            ]
          },
          column: [
            {width: 200, name: "产品名称", prop: "productName"},
            {width: 200, name: "商品名", prop: "medicalName"},
            {width: 100, name: "剂型", prop: "doseageForm"},
            {width: 200, name: "产品信息", prop: ["spec", "factoryName"], type: "tooltip"},
            {width: 90, name: "基药标记", prop: "gjjyFlag"},
            {width: 120, name: "订购数量", prop: "requestNum"},
            {width: 120, name: "订购金额（万元）", prop: "requestPrice"},
            {width: 120, name: "到货数量", prop: "receiveNum"},
            {width: 130, name: "到货金额（万元）", prop: "receivePrice"},
          ],
        }
      }
    },
    methods: {
      searchProducts(resData, queryData) {
        varietyPurchase(resData, queryData).then(res => {
          this.$refs.CommonTables.mainResData = res.data
        })
      },
    },
  }
</script>
<style>
</style>
