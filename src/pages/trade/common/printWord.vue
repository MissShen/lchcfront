<template>
  <div class="gap-40">
    <div class="space-30 clearfixed">
      <span class="flo-right">
          <el-button a size="small" type="warning" @click="printContent">打印</el-button>
          <el-button @click="close">关闭</el-button>
      </span>
    </div>
    <!-- 表格列表 -->
    <div v-if="dialogVisible" id="subOutputRank-print" class="print-table-box">

      <table class="print-table">
        <th colspan="4">
          <div class="print-title">特殊使用药品采购信息登记表</div>
          <div class="print-sub-title">登记号:{{dataObject.recordId}}</div>
        </th>
        <tr>
          <td>产品名</td>
          <td>{{dataObject.nameChn}}</td>
          <td>商品名</td>
          <td>{{dataObject.tradeName}}</td>
        </tr>
        <tr>
          <td>剂型</td>
          <td>{{dataObject.modeName}}</td>
          <td>规格包装</td>
          <td>{{dataObject.spec}}</td>
        </tr>
        <tr>
          <td>转换比</td>
          <td>{{dataObject.standRate}}</td>
          <td>单位</td>
          <td>{{dataObject.specUnit}}</td>
        </tr>
        <tr>
          <td>包材</td>
          <td>{{dataObject.wrapName}}</td>
          <td>批准文号</td>
          <td>{{dataObject.manufactureName}}</td>
        </tr>
        <tr>
          <td>单价（元）</td>
          <td>{{dataObject.bidPrice}}</td>
          <td>采购数量</td>
          <td>{{dataObject.purchaseNum}}</td>
        </tr>
        <tr>
          <td>采购金额（元）</td>
          <td>{{dataObject.purchasePrice}}</td>
          <td>采购日期</td>
          <td>{{dataObject.purchaseDate}}</td>
        </tr>
        <tr>
          <td>生产企业</td>
          <td colspan="3">{{dataObject.manufactureName}}</td>
        </tr>
        <tr>
          <td>配送企业</td>
          <td colspan="3">{{dataObject.sendOrgname}}</td>
        </tr>
        <tr>
          <td>使用用途</td>
          <td colspan="3">{{dataObject.useDesc}}</td>
        </tr>
        <tr>
          <td>备案采购原因</td>
          <td colspan="3">{{dataObject.purchaseDesc}}</td>
        </tr>
        <tr>
          <td>临床医师（签字）</td>
          <td></td>
          <td>药剂科主任（签字）</td>
          <td></td>
        </tr>
        <tr>
          <td>院长或单位负责人（签字）</td>
          <td colspan="3"></td>
        </tr>
        <tr>
          <td>
            <p>医院名称</p>
            <p>（加盖公章）</p>
          </td>
          <td></td>
          <td>填报日期</td>
          <td></td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
  import {priceFormat} from "src/utils";

  export default {
    data() {
      return {
        dialogVisible: true,
        dataObject: {}
      }
    },
    methods: {
      iniPrintData() {
        let printObject = JSON.parse(sessionStorage.getItem('printObject'));
        if (null != printObject) {
          this.dataObject = printObject;
          console.log(this.dataObject);
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
    mounted() {
      this.iniPrintData();
    }
  }
</script>

