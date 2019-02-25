<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tablebox">
      <div class="table-form">
        <el-form :inline="true" :model="formQuery" ref="formQuery" class="demo-form-inline">
          <div class="formrow">
            <span>
              <el-select v-model="formQuery.value" placeholder="配送企业" size="small">
                <el-option v-for="item in formQuery.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </span>
            <span>
              <el-input v-model="formQuery.antistop" placeholder="关键词" size="small"></el-input>
            </span>
            <span>
              <el-input v-model="formQuery.order" placeholder="订单号" size="small"></el-input>
            </span>
            <span>
              <el-button type="success" size="small">查询</el-button>
              <el-button size="warning">重置</el-button>
            </span>
          </div>
        </el-form>
      </div>
      <div class="tableset">
        <el-table ref="multipleTable" :data="resData.list" tooltip-effect="dark"
                  style="width: 100%" border>
          <el-table-column type="index" width="50">
          </el-table-column>
          <el-table-column label="订单号" width="300" prop="orderId">
            <template slot-scope="scope">
              <span class="icon-sign icon-jixu"></span>
              <span>{{scope.row.orderId}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="company" label="配送企业"></el-table-column>
          <el-table-column prop="data" label="发送时间"></el-table-column>
          <el-table-column prop="orderPrice" label="订购金额"></el-table-column>
          <el-table-column prop="dhPrice" label="到货金额"></el-table-column>
          <el-table-column prop="speed" label="配送速度">
            <template slot-scope="scope">
              <el-rate disabled v-model="scope.row.value4"  show-score text-color="#ff9900" ></el-rate>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" show-overflow-tooltip>
            <template slot-scope="scope">
              <a href="#" class="operation-btn" @click="details()">详情</a>
              <a class="operation-btn" @click="evaluate()">评价</a>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagebox">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 30]"
            :total="resData.total"
            :page-size="resData.pageSize"
            :page-count="resData.pages"
            :current-page.sync="resData.pageNum">
          </el-pagination>
        </div>
        <div class="sign">
          <span class="text">标记说明：</span>
          <span class="icon-sign sign-district">区</span>
          <span class="text">区目录药品</span>
          <span class="icon-sign sign-basic">基</span>
          <span class="text">基本药物目录</span>
          <span class="icon-sign icon-jixu"></span>
          <span class="text">急需商品</span>
        </div>
      </div>
    </div>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-position="left">
        <el-row>
          <el-col :span="4"></el-col>
          <el-col :span="20"></el-col>
        </el-row>
        <el-form-item label="配送速度" :label-width="formLabelWidth">
          <template slot-scope="scope">
            <span class="sign-pj">
              <el-rate v-model="form.speed"  show-score text-color="#ff9900" ></el-rate>
            </span>
          </template>
        </el-form-item>
        <el-form-item label="服务态度" :label-width="formLabelWidth">
          <template slot-scope="scope">
           <span class="sign-pj">
            <el-rate v-model="form.serve"  show-score text-color="#ff9900" ></el-rate>
           </span>
          </template>
        </el-form-item>
        <el-form-item label="库存信息描述" :label-width="formLabelWidth">
          <el-radio v-model="form.radio" label="1">准确</el-radio>
          <el-radio v-model="form.radio" label="2">不准确</el-radio>
        </el-form-item>
        <el-form-item label="评价内容" :label-width="formLabelWidth" class="inputWidth">
          <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="form.textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- ========================== 主内容end ========================= -->
  </div>
</template>
<script>
  export default {
    data() {
      return {
        formQuery: this.metaQuery(),
        resData: this.metaData(),  // 展示数据初始化
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          speed:4,
          serve:2,
          radio: '1',
          textarea:''
        },
        formLabelWidth: '120px',
      };
    },
    methods:{
      metaData() {
        return {
          pageNum: 1,
          pageSize: 20,
          total: 0,
          pages: 0,
          list: [{
            isChecked: true, // 当前数据是否已勾选（必须返回）
            orderId: 'C201803100547762171',
            company: '烟台正方制药',
            data: '2018-2-17',
            orderPrice:'22.00',
            dhPrice:'55',
            value4: 2.5,
            remark:'1住院药库',
          },
            {
              isChecked: false,
              orderId: 'C201803100547762171',
              company: '烟台正方制药',
              data: '2018-2-17',
              orderPrice:'22.00',
              dhPrice:'55',
              value4: 3,
              remark:'1住院药库',
            }]
        }
      },
        metaQuery () {
        return {
          options:[{
            value: '选项1',
            label: '配送企业'
          },{
            value: '选项2',
            label: '买方机构'
          }],
          value: '',
          antistop:'',
          order:''
        }
      },
      handleSizeChange (val) {
        this.tableData3.pageSize = val
        /*this.list()*/
      },
      handleCurrentChange (val) {
        this.tableData3.pageNum = val
        /*this.list()*/
      },
      evaluate(){
        this.dialogFormVisible=true;
      },
      details(){

      }
    }
  }
</script>
