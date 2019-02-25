<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" size="small" :inline="true" class="table-form">
            <el-form-item class="width-120">
              <el-input size="small" v-model="query.productName" maxlength="200" placeholder="品名" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
          <el-form-item class="width-120">
            <el-input size="small" v-model="query.spec" maxlength="200" placeholder="规格" @keyup.enter.native="searchEnterFun"></el-input>
          </el-form-item>
          <el-form-item class="width-120">
            <el-input size="small" v-model="query.doseageFormName" maxlength="200" placeholder="剂型" @keyup.enter.native="searchEnterFun"></el-input>
          </el-form-item>
          <el-form-item class="width-120">
            <el-input size="small" v-model="query.bidOrgName" maxlength="200" placeholder="企业名称" @keyup.enter.native="searchEnterFun"></el-input>
          </el-form-item>
          <el-form-item class="width-100">
            <el-select size="small" v-model="query.healthFlag" placeholder="医保标记">
              <el-option-group
                key="医保标记"
                label="医保标记">
                <el-option
                  v-for="item in healthFlags"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item class="width-100">
            <el-select size="small"  v-model="query.basicFlag" placeholder="基药标记">
              <el-option-group
                key="基药标记"
                label="基药标记">
                <el-option
                  v-for="item in basicFlagSelection"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item class="width-100">
            <el-select size="small" v-model="query.twoVoteId" placeholder="两票制">
              <el-option-group
                key="两票制"
                label="两票制">
                <el-option
                  v-for="item in twoVotes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
            <el-form-item class="width-100">
              <el-select size="small" v-model="query.confirmFlag" placeholder="状态">
                <el-option-group
                  key="状态"
                  label="状态">
              <el-option
                v-for="item in confirmFlags"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
                </el-option-group>
            </el-select>
            </el-form-item>
<!--            <el-form-item>
              <el-select size="small" v-model="query.disableProductId" placeholder="是否禁用">
                <el-option-group
                  key="是否禁用"
                  label="是否禁用">
              <el-option
                v-for="item in disableProductIds"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
                </el-option-group>
            </el-select>
            </el-form-item>-->
            <el-form-item>
              <el-button size="small" type="success" @click="searchEnterFun">查询</el-button>
              <el-button size="small" type="warning" @click="reset()">重置</el-button>
            </el-form-item>
        </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe
          @sort-change="sortChange">
          <el-table-column label="通用名" prop="name_Chn" sortable="custom" min-width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.nameChn }}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品名称" min-width="150">
            <template slot-scope="scope">
              <ul class="ico-zt">
                <li class="ico-left">
                  <div class="icon-box">
                    <i class="ico icon-qu" v-if="scope.row.regionalDrug>0"></i>
                    <i class="ico icon-jc" v-if="scope.row.basicFlag>0"></i>
                    <i class="ico icon-yi" v-if="healthFlag=1>0"></i>
                    <i class="ico icon-liang" v-if="scope.row.twoVoteId!='' && scope.row.twoVoteId!=null"></i>
                  </div>
                </li>
                <li>
                  <div class="text-inline" :title="scope.row.productName">{{ scope.row.productName }}</div>
                  <div class="text-inline" :title="scope.row.tradeName">{{ scope.row.doseageFormName }}{{ tradeNameInfo(scope.row.tradeName) }}</div>
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column label="产品信息" min-width="150">
            <template slot-scope="scope">
              <div class="text-inline"
                   :title="scope.row.spec+'×'+scope.row.standRate+scope.row.smallestUnits+'/'+scope.row.specUnit+wrapNameInfo(scope.row.wrapName)">
                {{ scope.row.spec}} × {{ scope.row.standRate}} {{ scope.row.smallestUnits}} / {{scope.row.specUnit}} {{wrapNameInfo(scope.row.wrapName)}}
              </div>
              <div class="text-inline" :title="scope.row.manufactureName">{{ scope.row.manufactureName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="参考价" prop="min_Price" sortable="custom" align="right" width="80">
            <template slot-scope="scope">
<!--              <el-tooltip effect="dark"  placement="top">
                <div slot="content">{{referencePrice(scope.row.minPrice,scope.row.catalogArea,scope.row.bjPrice,scope.row.hbPrice,scope.row.tjPrice)}}</div>
                <span class="blue">{{priceFormat(scope.row.minPrice)}}</span>
              </el-tooltip>-->
              <span class="blue">{{ priceFormat(scope.row.referencePrice) }}</span>
            </template>
          </el-table-column>
<!--          <el-table-column label="原价格" prop="beforePrice" sortable="custom" align="right" width="80" >
            <template slot-scope="scope">
              <span class="blue">{{ priceFormat(scope.row.referencePrice) }}</span>
            </template>
          </el-table-column>-->
          <el-table-column label="申报企业" prop="bid_Org_Name" sortable="custom" width="100">
            <template slot-scope="scope">
              <div>{{ scope.row.bidOrgName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="降后价格"  prop="bid_Price" sortable="custom" align="right" width="90">
            <template slot-scope="scope">
              <span class="blue">{{ priceFormat(scope.row.bidPrice) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="执行时间" prop="execut_Date" sortable="custom" width="125" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.executDate!=null && scope.row.executDate!=''">{{ moment(scope.row.executDate).format("YYYY-MM-DD") }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="confirm_Flag" sortable="custom" width="90" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.confirmFlag == '0'">待确认</span>
              <span v-if="scope.row.confirmFlag == '1'">已确认</span>
              <span v-if="scope.row.confirmFlag == '2'">已拒绝</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.disableProductId != null && scope.row.disableProductId != ''">
                <el-tooltip class="item" effect="dark" placement="top">
                  <div slot="content" v-html="scope.row.comments"></div>
                  <span style="color: #FF0000;">已禁用</span>
                </el-tooltip>
              </div>
              <div>
                <span v-if="scope.row.confirmFlag == '1' && scope.row.flag == '1'">已确认</span>
                <span v-if="scope.row.confirmFlag == '0' && scope.row.flag == '2'">有新变动</span>
                <span v-if="scope.row.confirmFlag == '2'">已拒绝</span>
                {{scope.row.talkType}}
              </div>
              <div v-if="scope.row.disableProductId == null || scope.row.disableProductId == ''" class="operates">
                  <a class="green-bord" @click="addToPurchaseCatalog(scope.row)" size="small" v-if="scope.row.addFlag == '0' && scope.row.confirmFlag != '2'  && scope.row.flag == '1'">确认</a>
                  <a class="red-bord" v-if="scope.row.addFlag != '1' && scope.row.confirmFlag != '2' && scope.row.flag == '1'" @click="refuseAndAlternativeBargain(scope.row.productId,scope.row.id)" size="small">拒绝</a>
                  <!--                <span v-else-if="scope.row.addFlag != '1' && scope.row.count > 0">已加入备选议价</span>-->
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 表格分页 -->
      <div class="pagebox">
        <ul class="explain">
          <li>标记说明：</li>
          <li><i class="ico icon-qu"></i><span>区目录药品</span></li>
          <li><i class="ico icon-jc"></i><span>基本药物目录</span></li>
          <li><i class="ico icon-yi"></i><span>医保药品</span></li>
          <li><i class="ico icon-liang"></i><span>两票制</span></li>
        </ul>
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

      <!--添加备选议价弹窗-->
      <el-dialog title="拒绝原因" :visible.sync="showAlternativeBargaining" :before-close="closeAlternativeBargaining" width="60%">
        <el-form :inline="true" ref="AlternativeBargainingText" :model="AlternativeBargainingText" class="demo-form-inline">
           <span style="width:60%;text-align: center">
               <el-input
                 type="textarea"
                 :rows="2"
                 placeholder="请输入备注内容"
                 maxlength="4000"
                 v-model="AlternativeBargainingText.textarea">
                </el-input>
          </span>
        </el-form>
        <span slot="footer">
          <el-button @click="closeAlternativeBargaining()" size="small" class="el-button-pale">关闭</el-button>
          <el-button type="primary" size="small" @click="insertAlternativeBargaining()">保存</el-button>
        </span>
      </el-dialog>

    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求  引自js文件
  import {queryManufacturePriceConfirmationList,insertPurchaseCatalog,saveAlternativeBargaining} from 'src/axios/contract/bargainmanagement/bargainquote/manufacturePriceConfirmation'
  import moment from 'moment'
  import {priceFormat} from "src/utils"
  import { keyBoardEnter } from "src/utils"


  export default {
    components: {moment},
    data () {
      return {
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        currentOrder:undefined, //分页的时候缓存
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        showAlternativeBargaining: false,
        AlternativeBargainingText:{textarea:""},
        productId: undefined,
        id: undefined,
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        checked: true,
        basicFlagSelection:[{
          value:'',
          label:'全部'
        },{
          value:'0',
          label:'非基药'
        }, {
          value: '1',
          label: '国家基药'
        }, {
          value: '2',
          label: '北京基药'
        }],
        twoVotes:[
          {
            label : '全部',
            value : ''
          },
          {
            label : '已签订',
            value : '1'
          },
          {
            label : '未签订',
            value : '0'
          }
        ],
          confirmFlags : [
            {
              label : '全部',
              value : ''
            },
            {
              label : '已拒绝',
              value : '2'
            },
            {
              label : '已确认',
              value : '1'
            },{
              label : '待确认',
              value : '0'
            }
          ],
          disableProductIds : [
            {
              label : '全部',
              value : ''
            },
            {
              label : '已禁用',
              value : '0'
            },{
              label : '未禁用',
              value : '1'
            }
          ],
      }
    },
    created () {
      this.list()
    },
    methods: {
      moment,
      priceFormat,
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
          pageNum: 1,
          pageSize: 10,
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
          list: []
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
          query: {
            bidOrgName : undefined,
            productName : undefined,
            hospitalName : undefined,
            confirmFlag : undefined,
            disableProductId : undefined,

            doseageFormName : undefined,
            spec : undefined,
            basicFlag :undefined,
            twoVoteId : undefined,
            healthFlag :undefined
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy = this.currentOrder;
        queryManufacturePriceConfirmationList(this.resData, this.query).then(res => {
          console.log(res)
          this.resData = res.data
        })
      },
      tradeNameInfo(tradeName){
        if (tradeName!=null && tradeName!='无' && tradeName!=''){
          return '(商品名：'+tradeName+')';
        }
        return '';
      },
      wrapNameInfo(wrapName){
        if (wrapName!=null && wrapName!='空' && wrapName!=''){
          return '('+wrapName+')';
        }
        return '';
      },
      reset(){
        this.query = this.metaQuery();
        this.list();
      },
      //参考价
      referencePrice(minPrice,catalogArea,bjPrice,hbPrice,tjPrice){
        if(minPrice == ""||minPrice == null){
          return "";
        }else {
          if(catalogArea.indexOf("低价")<1){
            return  "全国最低价:"+this.priceFormat(minPrice);
          }else{
            return "河北最低价:"+((hbPrice!=null && hbPrice!='')?this.priceFormat(hbPrice):'无')+","+"天津最低价:"+((tjPrice!=null && tjPrice!='')?this.priceFormat(tjPrice):'无')+","+"北京最低价:"+((bjPrice!=null && bjPrice!='')?this.priceFormat(bjPrice):'无');
          }
        }
      },
      addToPurchaseCatalog(row){
        this.$confirm('是否确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          insertPurchaseCatalog(row.productId,row.id).then(res=> {
            this.$message({
              message: res.success == true ? res.data : "确认失败",
              type: res.success == true ? "success" : "error",
              onClose: () => {
                this.list();
              }
            })
          })
        }).catch(()=>{})
      },
      refuseAndAlternativeBargain(productId,id){
              this.productId = productId;
              this.id = id;
              this.showAlternativeBargaining = true;
      },
      //关闭弹窗
      closeAlternativeBargaining(){
        this.AlternativeBargainingText.textarea ="";
        this.showAlternativeBargaining = false;
      },
      //保存窗口
      insertAlternativeBargaining(){
        if(this.AlternativeBargainingText.textarea.trim() === ""){
          this.$message({
            message: '备注内容不能为空',
            type: 'warning'
          });
          return;
        }
        saveAlternativeBargaining(this.id,this.productId,this.AlternativeBargainingText).then(res=> {
          this.showAlternativeBargaining = false;
          this.$message({
            message: res.success == true ? res.data : "拒绝操作失败",
            type: res.success == true ? "success" : "error",
            onClose: () => {
              this.list();
              this.AlternativeBargainingText.textarea ="";
            }
          })
        })
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      },
      handleGoAdd (id) {
        this.$router.push("/contract/datamanagement/hospitalDeliveryAddress/" + id);
      },
      deleteAddress(id) {
        this.$confirm(`您删除收货地址的同时，之前的产品配送关系可能失效，是否确认删除？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteHospitalAddress(id).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.list();
              }
            })
          })
        })
      },
      updateAddress(id) {
        this.$router.push("/contract/datamanagement/hospitalDeliveryAddress/" + id);
      },
      sortChange(value){
        console.log("value: ", value);
        let sortType=" desc"
        if(!!value.order){
          if(value.order.startsWith("asc")){
            sortType=" asc";
          }
          this.currentOrder=value.prop + sortType;
        } else {
          this.currentOrder=undefined;
        }
        this.list();
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e , ()=>{
          this.list();
        })
      },
    }
  }
</script>

