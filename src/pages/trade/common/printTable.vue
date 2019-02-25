<template>
  <div class="gap-40">
    <div class="space-30 clearfixed">
      <span class="flo-right">
          <el-button a size="small" type="warning" @click="printContent">打印</el-button>
          <el-button @click="close">关闭</el-button>
      </span>
    </div>
    <!-- 表格列表 -->
    <div v-if="dialogVisible" id="subOutputRank-print" class="tableset">
      <el-table
        border stripe
        :data="dataList.printData"
      >
        <el-table-column
          v-for="(item,index) in dataList.printLabel"
          :key="index"
          :label="item.labelName"
          :prop="item.labelValue"
          :width="item.width"
          :align="item.align"
          v-if="!item.hidden"
          :header-align="item.headerAlign"
        >//hidden为true时不显示,调用页面默认为false
          <template slot-scope="scope">
            <span v-html="dataList.printData[scope.$index][item.labelValue]"></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  import {priceFormat} from "src/utils";

  export default {
    data() {
      return {
        dialogVisible: true,
        dataList:
          {
            tableList: [],
            printTable: []
          }
      }
    },
    methods: {
      iniPrintData() {
        let printList = JSON.parse(sessionStorage.getItem('printList'));
        if (null != printList) {
          this.dataList = printList
        }
      },
      priceFormat,
      printContent(e) {
        let subOutputRankPrint = document.getElementById('subOutputRank-print');
        let newContent = subOutputRankPrint.innerHTML;
        let oldContent = document.body.innerHTML;
        document.body.innerHTML = newContent;
        window.print();
        window.location.reload();
        document.body.innerHTML = oldContent;
        return false;
      },
      close() {
        window.close()
      }
    },
  mounted()
  {
    this.iniPrintData();


  }
  }
</script>
<style media="print">
  @page {
    size: auto;
    margin: 0mm;
  }
</style>
