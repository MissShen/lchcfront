<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" size="small" :inline="true" class="table-form">
                <el-form-item class="width-150">
                  <el-input size="small" maxlength="200" v-model="query.productName"  placeholder="品名" @keyup.enter.native="searchEnterFun"></el-input>
                </el-form-item>
            <el-form-item class="width-150">
                  <el-input size="small" maxlength="200" v-model="query.manufactureName" placeholder="生产企业" @keyup.enter.native="searchEnterFun"></el-input>
                </el-form-item>
            <el-form-item class="width-150">
                <el-select size="small" v-model="query.catalogId" placeholder="目录范围">
                  <el-option-group
                    key="目录范围"
                    label="目录范围">
                  <el-option
                    v-for="item in  catalogOptions"
                    :key="item.catalogId"
                    :label="item.catalogName"
                    :value="item.catalogId">
                  </el-option>
                  </el-option-group>
                </el-select>
              </el-form-item>
            <el-form-item class="width-150">
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
            <el-form-item class="width-150">
                      <el-select size="small" v-model="query.twoVote" placeholder="两票制">
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
            <el-form-item class="width-150">
                  <el-select size="small"  v-model="query.enableFlag" placeholder="是否禁用">
                    <el-option-group
                      key="是否禁用"
                      label="是否禁用">
                    <el-option
                      v-for="item in enableFlagSelection"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                    </el-option-group>
                  </el-select>
                </el-form-item>
            <el-form-item>
                    <el-button size="small"  type="success" @click="searchEnterFun">查询</el-button>
                    <el-button size="small"  type="warning" @click="reset()">重置</el-button>
                </el-form-item>
        </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe
          @sort-change="sortChange">
          <el-table-column label="通用名" prop="NAME_CHN" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.nameChn }}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品名" prop="productName" width="150">
            <template slot-scope="scope">
              <div class="ellipsis es150">{{ scope.row.productName }}</div>
              <div class="ellipsis es150">(商品名：{{ scope.row.tradeName }})</div>
            </template>
          </el-table-column>
          <el-table-column label="产品信息" prop="drug_Detail">
            <template slot-scope="scope">
              <div class="pro-details ellipsis es200"
                   :title="scope.row.spec+'×'+scope.row.standRate+scope.row.smallestUnits+'/'+scope.row.specUnit+'('+scope.row.wrapName+')'+'('+scope.row.doseageFormName+')'">
                {{ scope.row.spec}} × {{ scope.row.standRate}} {{ scope.row.smallestUnits}} / {{scope.row.specUnit}} ({{scope.row.wrapName}}) ({{ scope.row.doseageFormName }})
              </div>
              <div class="pro-details ellipsis es200" :title="scope.row.manufactureName">{{ scope.row.manufactureName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="客观分数" prop="OBJECTIVE_SCORE" sortable="custom" width="90" :show-overflow-tooltip="true" align="right" header-align="left">
            <template slot-scope="scope">
              <span>{{ scope.row.objectiveScore }}</span>
            </template>
          </el-table-column>
          <el-table-column label="企业报价" prop="BID_PRICE" sortable="custom" width="90" align="right" header-align="left">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.bidPrice) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="参考价" prop="MIN_PRICE" sortable="custom" width="80" align="right" header-align="left">
            <template slot-scope="scope">
              <!--<el-tooltip effect="dark"  placement="top">
                <div slot="content">{{referencePrice(scope.row.minPrice,scope.row.orgName,scope.row.bjPrice,scope.row.hbPrice,scope.row.tjPrice)}}</div>
                <span>{{priceFormat(scope.row.minPrice)}}</span>
              </el-tooltip>-->
              <span>{{priceFormat(scope.row.minPrice)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="目录范围" width="130" prop="CATALOG_AREA" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.catalogArea }}</span>
            </template>
          </el-table-column>
          <el-table-column label="两票制" prop="twoVoteId" sortable="custom" width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.twoVoteId == null" style="color:red">未签订</span>
              <span v-if="scope.row.twoVoteId != null">已签订</span>
            </template>
          </el-table-column>
          <!--<el-table-column label="候选目录" prop="RES_STATE" sortable="custom" width="90">
            <template slot-scope="scope">
              <span v-if="scope.row.resState == 0">目录外</span>
              <span v-if="scope.row.resState == 1">目录内</span>
              <span v-if="scope.row.resState == 2">其他</span>
            </template>
          </el-table-column>-->
          <el-table-column label="基药标记" prop="BASIC_FLAG" sortable="custom" width="90">
            <template slot-scope="scope">
              <span v-if="scope.row.basicFlag == 0">非基药</span>
              <span v-if="scope.row.basicFlag == 1">国家基药</span>
              <span v-if="scope.row.basicFlag == 2">北京基药</span>
            </template>
          </el-table-column>
          <el-table-column label="是否禁用" prop="ENABLE_FLAG" sortable="custom" width="90">
            <template slot-scope="scope">
              <span v-if="scope.row.enableFlag == 0" style="color:red">已禁用</span>
              <span v-if="scope.row.enableFlag == 1">正常使用</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <div class="operates">
                <a href="javaScript:;" class="green" v-if="scope.row.enableFlag == 0" size="small" @click="OpenDisableView(scope.row,'open')">启用</a>
                <a href="javaScript:;" class="green" v-if="scope.row.enableFlag == 1" size="small" @click="OpenDisableView(scope.row,'close')">禁用</a>
                <a href="javaScript:;" class="green" @click="openDisableInfo(scope.row.productId)">查看</a>
              </div>
            </template>
          </el-table-column>


        </el-table>
      </div>

      <!-- 表格分页 -->
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

      <!--  ====================================== 弹窗 ====================================== -->
      <el-dialog :title="isInfo" :visible.sync="DisableInfoView" @close="closeDisableView" width="60%">
          <el-form :inline="true" ref="formData" :model="formData" class="demo-form-inline">
            <el-form-item  prop="comments">
              <n-editor v-model="formData.comments" maxlength="4000" :config="config"/>
            </el-form-item>
          </el-form>
        <span slot="footer">
          <el-button @click="closeDisableView()">关闭</el-button>
          <el-button type="primary" @click="insertDisableProductInfo()">保存</el-button>
        </span>
      </el-dialog>

      <intoDisable-View v-if="showDisableInfo" :parent-id="this.productId" ref="intoDisableView"></intoDisable-View>
    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求  引自js文件
  import { queryDisableProduct,queryCatalogOptions,insertDisableInfo,updateDisableInfo} from "src/axios/contract/catalogmanagement/disableProduct";
  import intoDisableView from 'src/pages/contract/catalogmanagement/disableproduct/disableProductView'
  import NEditor from 'src/components/n-editor/n-editor'
  import {priceFormat} from "src/utils"
  import { keyBoardEnter } from "src/utils"

  export default {
    components: {
      intoDisableView,
      NEditor
    },
    data () {
      return {
          config: {
            UEDITOR_HOME_URL: "../../../../static/n-editor/",
            toolbars:
              [['fullscreen',    // 全屏
                'source',        // 源码
                'undo',          // 撤销
                'redo',          // 重做
                'bold',          // 加粗
                "italic",        // 斜体
                "underline",     // 下划线
                "indent", //首行缩进
                "justifyleft", //左对齐
                "justifycenter", //居中对齐
                "justifyright", //右对齐
                "justifyjustify",//两端对齐
                "anchor",   // 锚点
                "fontborder",    // 字符边框
                "strikethrough", // 删除线
                "removeformat",  // 清除格式
                "pasteplain",    // 纯文本
                "forecolor",      // 字体颜色
                "insertorderedlist",    // 有序列表
                "insertunorderedlist", // 无序列表
                "searchreplace", // 查找替换
                "paragraph",   // 段落格式
                "fontfamily", // 字体类型
                "fontsize", //字体大小
                "link",  //链接
                "unlink", // 取消链接
                "horizontal", //分割线
                "date",   //日期
                "time", //时间
                "inserttable", //插入表格
                "spechars", // 特殊字符
              ]],
            sourceEditor: "codemirror",
            initialFrameWidth: '100%',
            initialFrameHeight: 320,
            wordCount:false,
            autoFloatEnabled: true,
            enableDragUpload: true,   // 启用拖拽上传
            enablePasteUpload: true,  // 启用粘贴上传
            imageScaleEnabled: true,  // 启用 图片拉伸缩放
            elementPathEnabled: false, // 关闭元素路径
            catchRemoteImageEnable: true, // 开启远程抓取图片
            allHtmlEnabled: true, //提交附带html字符串
          },
        currentOrder: undefined,
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        DisableInfoView: false, // 表单可见性初始化
        formData : this.viewData(),
        formStatus : undefined,
        showDisableInfo: false,
        optionsD :[],
        catalogOptions:[],
        productId : undefined,
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
        enableFlagSelection:[{
          value:'',
          label:'全部'
        }, {
          value:'0',
          label:'已禁用'
        }, {
          value: '1',
          label: '正常使用'
         }],
        isInfo :""
      }
    },
    created () {
      this.queryCatalog();
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      priceFormat,
      metaData () {
        return {
          orderBy: undefined,
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
            manufactureName: undefined,
            productName: undefined,
            basicFlag :undefined,
            enableFlag :undefined,
            catalogId: undefined,
            twoVote : undefined
        }
      },
      viewData(){
        return {
          projectId : undefined,
          comments : undefined,
          productId : undefined,
          id : undefined
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      // 重置用户表单
      reset () {
        this.query = this.metaQuery();
        this.list();
      },
      //参考价
      referencePrice(minPrice,orgName,bjPrice,hbPrice,tjPrice){

        if(minPrice == ""||minPrice == null){
          return "空";
        }else {
          if(orgName=="医管局"){
            return  "全国最低价:"+this.priceFormat(minPrice);
          }else{
            return "河北最低价:"+((hbPrice!=null && hbPrice!='')?this.priceFormat(hbPrice):'无')+","+"天津最低价:"+((tjPrice!=null && tjPrice!='')?this.priceFormat(tjPrice):'无')+","+"北京最低价:"+((bjPrice!=null && bjPrice!='')?this.priceFormat(bjPrice):'无');
          }
        }
      },
      // 弹开
      toggleForm () {
        this.DisableInfoView = !this.DisableInfoView
      },
      OpenDisableView(row,type) {
        if(type == 'open'){
          this.isInfo = "启用备注";
          this.formStatus = 'updateDisableInfo';
        }else{
          this.isInfo = "禁用备注"
          this.formStatus = 'insertDisableInfo';
        }
        this.formData.productId = row.productId;
        this.formData.id = row.id;
        this.DisableInfoView = true;
      },
      //打开恢复禁用详情s
      openDisableInfo (productId) {
        this.productId = productId;// 传递Id
        this.showDisableInfo = true;
        this.$nextTick(() => {
          this.$refs.intoDisableView.fillData(productId);
        });
      },
      //关闭窗口
      closeDisableView(){
        this.formData.comments = '';
        this.$refs['formData'].resetFields();
        this.DisableInfoView = false;
      },
      //查询目录范围
      queryCatalog(){
        queryCatalogOptions().then(res => {
              this.catalogOptions = res.data;
          var optionsD = [{
            catalogId:'',
            catalogName:'全部'
          },]

          this.catalogOptions =  optionsD.concat(this.catalogOptions);
        })
      },
      //  获取用户分页列表
      list () {
        this.resData.orderBy = this.currentOrder;
        queryDisableProduct(this.resData, this.query).then(res => {
          this.resData = res.data
          if(this.resData.pageNum === 0){
            this.resData.pageNum =1;
          }
        })
      },
      //保存窗口
      insertDisableProductInfo(){
        if(this.formData.comments!=null && this.formData.comments!= ""){
          this.toggleForm();
          if (this.formStatus == 'updateDisableInfo') {
            updateDisableInfo(this.formData).then(res =>{
              this.list()
              this.$message({
                type : res.success == true ? "success" : "error",
                message: res.success == true ? res.data : '启用失败'
              })
              this.formData.comments = '';
              this.$refs['formData'].resetFields();
            })
          }
          if(this.formStatus == 'insertDisableInfo'){
            insertDisableInfo(this.formData).then(res => {
              this.list()
              this.$message({
                type : res.success == true ? "success" : "error",
                message : res.success == true ? res.data : "禁用失败",
              })
              this.formData.comments = '';
              this.$refs['formData'].resetFields();
            })
          }
        }else{
          this.$message({
            type: 'warning',
            message : "备注不能为空",
          })
        }
      },

      //-----------删除目录的操作end-------------------
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      },
      sortChange(value){
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

