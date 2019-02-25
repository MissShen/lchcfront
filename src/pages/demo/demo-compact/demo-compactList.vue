<template>
  <div>
    <div class="tabs-panel">
      <span class="active">合同列表</span>
    </div>
    <div class="tablebox">
      <div class="table-form">
        <el-form :inline="true" :model="formQuery" ref="formQuery" class="demo-form-inline">
          <div class="formrow">
            <span>
              <el-input v-model="formQuery.partyB" placeholder="乙方" size="small"></el-input>
            </span>
            <span>
              <el-select v-model="formQuery.value" placeholder="全部" size="small" class="width-120">
                <el-option v-for="item in formQuery.compact" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </span>
            <span>
              <el-button type="warning" size="small">查询</el-button>
              <el-button size="small">重置</el-button>
            </span>
          </div>
        </el-form>
      </div>
      <div class="tableset">
        <el-table :data="tableData" style="width: 100%" :span-method="objectSpanMethod" border>
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="firstParty" label="甲方"></el-table-column>
          <el-table-column prop="partyB" label="乙方"></el-table-column>
          <el-table-column prop="productQuantity" label="产品数量"></el-table-column>
          <el-table-column prop="alterationTime" label="变更次数"></el-table-column>
          <el-table-column label="合同类型" prop="compactType" ></el-table-column>
          <el-table-column label="合同状态" prop="compactState" ></el-table-column>
          <el-table-column label="甲方" prop="compactState" ></el-table-column>
          <el-table-column label="乙方" prop="compactState" ></el-table-column>
          <el-table-column label="操作" prop="compactState" width="300" >
            <template slot-scope="scope">
              <a href="#" class="operation-btn">查看</a>
              <a href="" class="operation-btn">追加合同</a>
              <a href="" class="operation-btn">签订合同</a>
              <a href="" class="operation-btn">下载购销合同</a>
              <a href="" class="operation-btn">下载廉价合同</a>
              <a href="" class="operation-btn">下载</a>
            </template>
          </el-table-column>

        </el-table>
      </div>
    </div>
  </div>

</template>
<script>

  export default {
    data: function () {
      return {
        formQuery: this.metaQuery(),
        tableData: [{
          firstParty:'中日友好医院',
          partyB:'山东九州通物流',
          productQuantity:'3',
          alterationTime:'2',
          compactType:'购销廉价合同',
          compactState:'已签'
        },{
          compactType:'结算合同',
          compactState:'未签订'
        }]
      }
    },
    methods:{
      metaQuery () {
        return{
          partyB:"",
          compact:[{
            value: '选项1',
            label: '药学1'
          },
            {
              value: '选项1',
              label: '药学'
            }],
          value:''
        }
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex < 5) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1,
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      }
    }
  }
</script>


<style>
  @import "../../../assets/css/compact.css";
</style>

