<template>
  <div>
    <el-dialog title="备货" :visible.sync="visible" width="60%">
      <div class="table-form padding-btm">
        <ul class="tabs-echo-ul">
          <li>产品名：<span>酚酞片1</span></li>
          <li>商品名：<span>酚酞片1</span></li>
        </ul>
        <ul class="tabs-echo-ul">
          <li>订购量：<span>酚酞片1</span></li>
          <li>总送货量：<span class="green">0.00</span></li>
        </ul>
        <ul class="tabs-echo-ul">
          <li>
            是否已备完：
            <el-radio v-model="radio" label="1">是</el-radio>
            <el-radio v-model="radio" label="2">否</el-radio>
          </li>
        </ul>
      </div>
      <div class="tableset">
        <el-table :data="resData.list" class="stockUpTable">
          <el-table-column label="药品批号">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.drugBatch"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="有效期">
            <template slot-scope="scope">
              <el-date-picker size="small" v-model="scope.row.validDate" type="date" class="validDate">
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="销售发票号">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.invoice"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="本次送货量">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.delivery"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="">
            <template slot-scope="scope">
              <span class="icon-span" @click="deleteRow(scope.$index,resData.list)"><i class="el-icon-delete"></i></span>
              <span class="icon-span" @click="addStock()" v-if="scope.$index===0" ><i class="el-icon-plus"></i>添加</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="queryConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        resData: this.metaData(),
        visible:false,
        addDate:true,
        radio: '1'
      };
    },
    methods: {
      handleForm(){
        this.visible = true;
        this.resData=this.metaData();
      },
      queryConfirm (){
        this.queryClose();
      },
      queryClose(){
        this.visible = false;
      },
      metaData(){
        return {
            pageNum: 1,
            pageSize: 20,
            size: 10,
            startRow: 0,
            endRow: 0,
            total: 0,
            pages: 0,
            prePage: 0,
            nextPage: 0,
            isFirstPage: false,
            isLastPage: true,
            hasPreviousPage: false,
            hasNextPage: false,
            navigatePages: 8,
            navigatepageNums: [],
            navigateFirstPage: 0,
            navigateLastPage: 0,
            firstPage: 0,
            lastPage: 0,
            list: [{
              drugBatch:"",
              validDate:"",
              invoice:"",
              delivery:""
            }]
        }
      },
      addStock(){
        var len = this.resData.list.length;
        var _data ={
          id: len,
          drugBatch:"",
          validDate:"",
          invoice:"",
          delivery:""
        }
        this.resData.list.push(_data);
      },
      deleteRow(index, rows){
        if(index===0){
          this.$message({
            message: '至少需要一项备货',
            type: 'warning'
          });
        }else{
          rows.splice(index, 1);
        }
      }
    }
  };
</script>
