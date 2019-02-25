<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tablebox">
      <div class="table-form">
        <el-form :inline="true" :model="formQuery" ref="formQuery" class="demo-form-inline">
          <div class="formrow">
            <!-- span的宽度是可变的  默认宽度160px 可在span里加 class="width-130" width-150 width-60等等-->
            <span>
              <el-input v-model="formQuery.orderId" placeholder="订单号" size="small"></el-input>
            </span>
            <span>
              <el-input v-model="formQuery.name" placeholder="品名" size="small"></el-input>
            </span>
            <span class="width-130">
              <el-input v-model="formQuery.specification" placeholder="规格" size="small"></el-input>
            </span>
            <span class="width-130">
              <el-input v-model="formQuery.company" placeholder="生产企业" size="small"></el-input>
            </span>
            <span class="width-130">
              <el-input v-model="formQuery.psCompany" placeholder="配送企业" size="small"></el-input>
            </span>
            <span class="width-130">
              <el-input v-model="formQuery.orderState" placeholder="订单状态" size="small"></el-input>
            </span>
            <span class="width-130">
              <el-input v-model="formQuery.invoiceId" placeholder="发票号" size="small"></el-input>
            </span>
            <span>
              <el-button type="success" size="small">查询</el-button>
              <el-button type="warning" size="small">重置</el-button>
            </span>
          </div>
        </el-form>
      </div>
      <div class="tableset">
        <el-checkbox-group v-model="checkedItems" @change="handleChecked">
          <el-table ref="multipleTable" :data="resData.list" tooltip-effect="light"
                    style="width: 100%"
                    stripe border>
            <el-table-column label="序号" width="55" align="left">
              <template slot-scope="scope">
                <el-checkbox :label="scope.row.id"></el-checkbox>
                <!--   <input type="checkbox" class="checkbox"
                            @change="scope.row.isChecked=scope.row.isChecked==='true'?'false':'true';handleChecked(scope.row)"
                            :checked="scope.row.isChecked==='true'"/>-->
              </template>
            </el-table-column>
            <el-table-column prop="orderId" label="订单号" width="100">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="light" :content="'采购单号：'+scope.row.freight" placement="top-start">
                  <div>{{scope.row.orderId}}</div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="productName" label="产品名" width="140">
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
                  <li class="ellipsis es150">{{scope.row.productName}}</li>
                </ul>
              </template>
            </el-table-column>
            <el-table-column prop="productMes" label="产品信息">
              <template slot-scope="scope">
                <div class="pro-details ellipsis es200 " :title="scope.row.information">{{scope.row.information}}</div>
                <div class="pro-details ellipsis es200" :title="scope.row.productMes">{{scope.row.productMes}}</div>
              </template>
            </el-table-column>
            <el-table-column label="配送企业" width="80">
              <template slot-scope="scope">
                <div class="delivery" v-popover="'ens'+scope.$index">
                  <span>{{scope.row.enterprise}}</span>
                  <i class="iconfont ico-sanjiao"></i>
                </div>
                <div>
                  <el-popover
                    :ref="'ens'+scope.$index"
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
            <el-table-column prop="price" label="单价" width="60"  align="right" show-overflow-tooltip></el-table-column>
            <el-table-column label="到/订货量" width="85" header-align="left" align="right">
              <template slot-scope="scope">
                <div>{{scope.row.aogNum}}</div>
                <div>{{scope.row.orderNum}}</div>
              </template>
            </el-table-column>
            <el-table-column label="到货/订购金额" width="110"  header-align="left" align="right">
              <template slot-scope="scope">
                <div class="red">{{scope.row.aogPrice}}</div>
                <div>{{scope.row.orderPrice}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="50">
              <template slot-scope="scope">
                <div class="green" v-popover="scope.$index">{{scope.row.status}}</div>
                <div>
                  <el-popover
                    :ref="scope.$index"
                    placement="top"
                    width="140"
                    trigger="hover">
                    <ul class="pullstus">
                      <li>制单时间：2018-03-07</li>
                      <li>发单时间：2018-03-08</li>
                      <li>发货时间：2018-03-09</li>
                      <li>到货时间：2018-03-10</li>
                    </ul>
                  </el-popover>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="invoiceId" label="发票号" width="70"></el-table-column>
            <el-table-column label="批号与有效期" width="110" header-align="left">
              <template slot-scope="scope">
                <div>{{scope.row.batchId}}</div>
                <div>{{scope.row.validDate}}</div>
              </template>
            </el-table-column>
            <el-table-column label="买方机构与地址" width="120" header-align="left">
              <template slot-scope="scope">
                <div>{{scope.row.organization}}</div>
                <div>{{scope.row.address}}</div>
              </template>
            </el-table-column>
            <el-table-column label="总到货量" width="80" header-align="left" align="right">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="上报短缺" placement="top-start">
                  <div>{{scope.row.sumAogNum}}</div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <div class="green ahand">到货</div>
                <div class="red ahand">关闭订单</div>
              </template>
            </el-table-column>
          </el-table>
        </el-checkbox-group>
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
        <div class="foot-left">
          <span><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox></span>
          <span><el-button type="danger" size="small">关闭订单</el-button></span>
          <span><el-button type="primary" size="small">打印</el-button></span>
        </div>
        <div class="foot-right">
          <span>汇总金额：<a class="red">220.00</a></span>
          <a href="#" class="shop-btn">
            <span>确认到货</span>
          </a>
        </div>
      </div>
    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>
  export default {
    name: "demo-tabs-tab-app",
    data(){
      return{
        formQuery: this.metaQuery(),
        resData: this.metaData(),
        isIndeterminate:false,
        checkAll:false,
        checkedItems:[],
        checkedAllList:[]
      }
    },
    created(){
      for (let city of this.resData.list) {
        this.checkedAllList.push(city.id)
      }
    },
    methods:{
      metaData(){
        return{
          pageNum: 1,
          pageSize: 20,
          total: 1,
          pages: 0,
          list: [{
            id:'1',
            isChecked:'true',
            orderId:'C201803091047762119',
            freight:'7762119',
            productName:'尼群地平片',
            productMes:'北京太洋药业股份有限公司',
            information:'10mg*100盒/片  中大包装：20/200',
            isUrgent:true,
            enterprise:'烟台正方制药',
            price:'22.00',
            aogNum:'88',
            orderNum:'1000',
            aogPrice:'¥2200.00',
            orderPrice:'¥2200.00',
            status:'发货',
            invoiceId:'233020710302',
            batchId:'16110406',
            validDate:'2019/11/H8',
            organization:'中日友好医院',
            address:'月坛南街59',
            sumAogNum:'1500'
          },{
            id:'2',
            isChecked:'false',
            orderId:'C201803091047762119',
            freight:'7762119',
            productName:'尼群地平片',
            productMes:'北京太洋药业股份有限公司',
            information:'10mg*100盒/片  中大包装：20/200',
            isUrgent:true,
            enterprise:'烟台正方制药',
            price:'22.00',
            aogNum:'88',
            orderNum:'1000',
            aogPrice:'¥2200.00',
            orderPrice:'¥2200.00',
            status:'发货',
            invoiceId:'233020710302',
            batchId:'16110406',
            validDate:'2019/11/H8',
            organization:'中日友好医院',
            address:'月坛南街59',
            sumAogNum:'1500'
          },{
            id:'3',
            isChecked:'false',
            orderId:'C201803091047762119',
            freight:'7762119',
            productName:'尼群地平片',
            productMes:'北京太洋药业股份有限公司',
            information:'10mg*100盒/片  中大包装：20/200',
            isUrgent:false,
            enterprise:'烟台正方制药',
            price:'22.00',
            aogNum:'88',
            orderNum:'1000',
            aogPrice:'¥2200.00',
            orderPrice:'¥2200.00',
            status:'发货',
            invoiceId:'233020710302',
            batchId:'16110406',
            validDate:'2019/11/H8',
            organization:'中日友好医院',
            address:'月坛南街59',
            sumAogNum:'1500'
          },{
            id:'4',
            isChecked:'false',
            orderId:'C201803091047762119',
            freight:'7762119',
            productName:'尼群地平片',
            productMes:'北京太洋药业股份有限公司',
            information:'10mg*100盒/片  中大包装：20/200',
            isUrgent:false,
            enterprise:'烟台正方制药',
            price:'22.00',
            aogNum:'88',
            orderNum:'1000',
            aogPrice:'¥2200.00',
            orderPrice:'¥2200.00',
            status:'发货',
            invoiceId:'233020710302',
            batchId:'16110406',
            validDate:'2019/11/H8',
            organization:'中日友好医院',
            address:'月坛南街59',
            sumAogNum:'1500'
          }]

        }

      },
      metaQuery () {
        return{
          orderId:'',
          name:'',
          specification:'',
          company:'',
          psCompany:'',
          orderState:'',
          invoiceId:''
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
      getFast(){
        alert(1);
      },
      handleCheckAllChange(val){
        this.checkedItems = val ? this.checkedAllList : [];
        this.isIndeterminate = false;
      },
      handleChecked(value) {
        console.log(value);
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.resData.list.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.resData.list.length;
      }
    }
  }
</script>

