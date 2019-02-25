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
                  style="width: 100%"  stripe border>
          <el-table-column label="产品名" width="170" prop="orderId">
            <template slot-scope="scope">
              <ul class="ico-zt">
                <li class="ico-left">
                  <i class="ico icon-qu"></i>
                  <i class="ico" :class="scope.row.isUrgent==true?'icon-ji':'icon-jihui'" @click="getFast"></i>
                  <i class="ico icon-liang"></i>
                  <i class="ico icon-kang"></i>
                  <i class="ico icon-jc"></i>
                  <i class="ico icon-yi"></i>
                </li>
                <li class="ellipsis es150">{{scope.row.orderId}}</li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column prop="information" label="产品信息">
            <template slot-scope="scope">
              <div class="pro-details ellipsis es200" :title="scope.row.information">{{scope.row.information}}</div>
              <div class="pro-details ellipsis es200" :title="scope.row.companyName">{{scope.row.companyName}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="company" label="配送地址" width="150">
            <template slot-scope="scope">
              <div class="delivery" v-popover="scope.$index">
                <span class="ellipsis es100">{{scope.row.company}}</span>
                <i class="iconfont ico-sanjiao"></i>
              </div>
              <div>
                <el-popover
                  :ref="scope.$index"
                  placement="bottom"
                  width="300"
                  trigger="click">
                  <ul class="pulldown">
                    <li>请选择</li>
                    <li>北京市西城区月坛南街59号新华大厦213室</li>
                    <li>北京市西城区月坛南街59号新华大厦213室</li>
                    <li>北京市西城区月坛南街59号新华大厦213室</li>
                    <li><i class="iconfont icon-jiahao"></i>新增地址</li>
                  </ul>
                </el-popover>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="单价" header-align="left" align="center" width="150">
            <template slot-scope="scope">
              <div>{{scope.row.price}}</div>
              <div class="rangebar">
                <span class="green">{{scope.row.lowPrice}}</span>
                <span class="rainbow">
                <i class="iconfont ico-sanjiao2" :style="getStyle(scope.row.price,scope.row.lowPrice,scope.row.topPrice)"></i></span>
                <span class="red">{{scope.row.topPrice}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="enterprise" label="配送企业" width="150">
            <template slot-scope="scope">
              <el-select v-model="scope.row.value" placeholder="请选择" size="small">
                <el-option v-for="item in scope.row.options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="repertoryNum" label="库存数量" align="right" width="80"></el-table-column>
          <el-table-column prop="num" label="数量" width="150">
            <template slot-scope="scope">
              <el-input-number size="small" v-model="scope.row.num" :min="1" :step="1"
                               @change="handleChange" ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="操作" header-align="left" width="100" >
            <template slot-scope="scope" style="text-align:left">
              <div class="handle-zt">
                <a href="" class="iconfont buy-btn" v-if="scope.$index >=1">加入</a>
                <el-badge :value="3" class="item" v-if="scope.$index ===0">
                  <a href="" class="iconfont buy-btn red">移除</a>
                </el-badge>
              </div>
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
        <ul class="explain">
          <li>标记说明：</li>
          <li><i class="ico icon-qu"></i><span>区目录药品</span></li>
          <li><i class="ico icon-jc"></i><span>基本药物目录</span></li>
          <li><i class="ico icon-ji"></i><span>急需药品</span></li>
          <li><i class="ico icon-yi"></i><span>医保药品</span></li>
          <li><i class="ico icon-liang"></i><span>两票制</span></li>
          <li><i class="ico icon-kang"></i><span>抗菌药</span></li>
        </ul>
      </div>
      <div class="foot-btn">
        <a href="#" class="shop-btn">
          <i class="iconfont ico-gwc"></i>
          <span>本院购物车</span>
          <span class="shop-num">1</span>
        </a>
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
          total: 1,
          pages: 0,
          list: [{
            isChecked: true, // 当前数据是否已勾选（必须返回）
            orderId: '尼群地平片',
            information:'10mg*100盒/片  中大包装：20/200',
            companyName:'北京太洋药业股份有限公司',
            company: '烟台正方制药',
            price: '25.00',
            orderPrice:'22.00',
            repertoryNum:1000,
            remark:'1住院药库',
            options: [{
              value: '选项1',
              label: '烟台正方制药1'
            }, {
              value: '选项2',
              label: '烟台正方制药2'
            }, {
              value: '选项3',
              label: '烟台正方制药3'
            }, {
              value: '选项4',
              label: '烟台正方制药4'
            }, {
              value: '选项5',
              label: '烟台正方制药5'
            }],
            num: 1,
            lowPrice:20,
            topPrice:30,
            isUrgent:false
          }, {
            isChecked: false,
            orderId: '尼群地平片2',
            information:'10mg*100盒/片  中大包装：20/200',
            companyName:'北京太洋药业股份有限公司',
            company: '烟台正方制药22',
            price: '18.00',
            orderPrice:'22.00',
            repertoryNum:1000,
            remark:'1住院药库',
            options: [{
              value: '选项1',
              label: '烟台正方制药1'
            }, {
              value: '选项2',
              label: '烟台正方制药2'
            }, {
              value: '选项3',
              label: '烟台正方制药3'
            }, {
              value: '选项4',
              label: '烟台正方制药4'
            }, {
              value: '选项5',
              label: '烟台正方制药5'
            }],
            num: 2,
            lowPrice:10,
            topPrice:20,
            isUrgent:false
          },{
            isChecked: true, // 当前数据是否已勾选（必须返回）
            orderId: '尼群地平片',
            information:'10mg*100盒/片  中大包装：20/200',
            companyName:'北京太洋药业股份有限公司',
            company: '烟台正方制药',
            price: '8.00',
            orderPrice:'4',
            repertoryNum:1000,
            remark:'1住院药库',
            options: [{
              value: '选项1',
              label: '烟台正方制药1'
            }, {
              value: '选项2',
              label: '烟台正方制药2'
            }, {
              value: '选项3',
              label: '烟台正方制药3'
            }, {
              value: '选项4',
              label: '烟台正方制药4'
            }, {
              value: '选项5',
              label: '烟台正方制药5'
            }],
            num: 1,
            lowPrice:1,
            topPrice:20,
            isUrgent:true
          },{
            isChecked: true, // 当前数据是否已勾选（必须返回）
            orderId: '尼群地平片',
            information:'10mg*100盒/片  中大包装：20/200',
            companyName:'北京太洋药业股份有限公司',
            company: '烟台正方制药',
            price: '22.00',
            orderPrice:'22.00',
            repertoryNum:1000,
            remark:'1住院药库',
            options: [{
              value: '选项1',
              label: '烟台正方制药1'
            }, {
              value: '选项2',
              label: '烟台正方制药2'
            }, {
              value: '选项3',
              label: '烟台正方制药3'
            }, {
              value: '选项4',
              label: '烟台正方制药4'
            }, {
              value: '选项5',
              label: '烟台正方制药5'
            }],
            num: 1,
            lowPrice:10,
            topPrice:50,
            isUrgent:true
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

      },
      getStyle(a, b, c) {
        const perc = this.getPosition(a, b, c);
        return {
          position: 'absolute',
          top: '-16px',
          left: perc + '%',
          color: this.getColor(perc)
        }
      },
      getPosition(a, b, c){
        const _a = Number(a) || 0;
        const _b = Number(b) || 0;
        const _c = Number(c) || 0;
        let lowPrice = (_a - _b) > 0 ? (_a - _b) : 0;
        const topPrice = _c - _b;
        return lowPrice/topPrice*100;
      },
      getColor(perc){
        if(perc<34){
          return '#58bc6b';
        }else if(perc>=34 && perc<67){
          return '#f1bd04';
        }else{
          return '#ff5b48';
        }
      },
      handleChange(value) {
        console.log(value);
      },
      getFast(){
        alert(1)
      }
    }
  }
</script>
