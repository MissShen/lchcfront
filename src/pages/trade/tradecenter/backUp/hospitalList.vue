<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" class="table-form" :inline="true">
             <el-form-item class="width-120" v-if="roleCode==='director'">
                <el-select v-model="query.searchStatus" @keyup.enter.native="searchEnterFun" placeholder="备案状态"
                           size="small">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="未提交" value="0"></el-option>
                  <el-option label="已提交" value="5"></el-option>
                  <el-option label="审核通过" value="2"></el-option>
                  <el-option label="审核拒绝" value="6"></el-option>
                  <el-option label="终核通过" value="4"></el-option>
                  <el-option label="作废提交" value="10"></el-option>
                  <el-option label="同意作废" value="11"></el-option>
                  <el-option label="拒绝作废" value="12"></el-option>
                </el-select>
             </el-form-item>
             <el-form-item class="width-120" v-else="roleCode==='serviceCenter'">
                <el-select v-model="query.searchStatus" @keyup.enter.native="searchEnterFun" placeholder="备案状态"
                           size="small">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="未提交" value="0"></el-option>
                  <el-option label="已提交" value="1"></el-option>
                  <el-option label="审核通过" value="2"></el-option>
                  <el-option label="审核拒绝" value="3"></el-option>
                  <el-option label="终核通过" value="4"></el-option>
                  <el-option label="作废提交" value="10"></el-option>
                  <el-option label="同意作废" value="11"></el-option>
                  <el-option label="拒绝作废" value="12"></el-option>
                </el-select>
             </el-form-item>
             <el-form-item class="width-120">
                <el-input v-model="query.backupCode" @keyup.enter.native="searchEnterFun" size="small"
                          placeholder="备案编码"></el-input>
              </el-form-item>
             <el-form-item class="width-120">
                <el-input v-model="query.nameChn" @keyup.enter.native="searchEnterFun" size="small"
                          placeholder="品名"></el-input>
             </el-form-item>
            <el-form-item class="width-120">
                <el-input v-model="query.wrapName" @keyup.enter.native="searchEnterFun" size="small"
                          placeholder="生产企业"></el-input>
            </el-form-item>
            <el-form-item>
              <el-date-picker type="date" @keyup.enter.native="searchEnterFun" placeholder="创建日期"
                              format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"
                              v-model="query.searchBenDate" class="width-120"></el-date-picker>
             &nbsp;至&nbsp;
              <el-date-picker type="date" @keyup.enter.native="searchEnterFun" placeholder="创建日期"
                              format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"
                              v-model="query.searchEndDate" class="width-120"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
              <el-button type="warning" size="small" @click="resetQuery()">重置</el-button>
            </el-form-item>
        </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe
          @sort-change="sortChang"
        >
          <!--<el-table-column type="index" width="50" header-align="left" align="center" label="序号"></el-table-column>-->
          <el-table-column label="备案编码"  prop="backupCode" width="130" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.backupCode }}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品名" prop="NAME_CHN" sortable="custom" min-width="150">
            <template slot-scope="scope">
            <!--  {{ scope.row.nameChn }}-->
              <ul>
                  <li>
                    <!--tootip提示气泡-->
                    <!--:enterable="false" 鼠标不可进入tooltip中-->
                    <el-tooltip placement="top" :enterable="false">
                      <!--气泡内容（必须放在slot="content"内）,布局与源内容保持一致-->
                      <div slot="content">
                        <div>{{ scope.row.nameChn }}</div>
                        <div v-if="scope.row.tradeName != '无' && scope.row.tradeName !=null">{{ scope.row.modeName }}({{ scope.row.tradeName }})</div>
                        <div v-if="scope.row.tradeName == '无' || scope.row.tradeName ==null">{{ scope.row.modeName }}</div>
                      </div>

                      <!--源内容（必须放在class="el-tooltip-box"内）-->
                      <div class="el-tooltip-box">
                        <!--加class="text-inline"确保内容不折行-->
                        <div class="text-inline">{{ scope.row.nameChn }}</div>
                        <div v-if="scope.row.tradeName != '无' && scope.row.tradeName !=null">{{ scope.row.modeName }}({{ scope.row.tradeName }})</div>
                        <div v-if="scope.row.tradeName == '无' || scope.row.tradeName ==null">{{ scope.row.modeName }}</div>
                      </div>
                    </el-tooltip>
                  </li>
              </ul>
            </template>
          </el-table-column>

          <el-table-column label="产品信息" prop="TRADE_NAME" sortable="custom" min-width="150">
            <template slot-scope="scope">
              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{getHints(scope.row.spec,scope.row.wrapName)}}<br/>
                  {{ scope.row.manufactureName}}
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    {{ scope.row.spec}} &nbsp;&nbsp;
                    <span v-if="scope.row.wrapName != '空' && scope.row.wrapName != null">{{ scope.row.wrapName}}</span>
                  </div>
                  <div class="text-inline" >
                    {{ scope.row.manufactureName}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>

          <el-table-column label="配送企业" width="100" prop="SPEC_UNIT" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.sendOrgname }}</span>
            </template>
          </el-table-column>
          <el-table-column label="单价" sortable width="80" prop="STAND_RATE" sortable="custom" align="right">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.bidPrice) }}</span>
            </template>
          </el-table-column>

          <el-table-column label="采购数量" sortable width="90" prop="PERMIT_NUMBER" sortable="custom" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.purchaseNum }}</span>
            </template>
          </el-table-column>
          <el-table-column label="采购金额" sortable width="90" prop="PERMIT_NUMBER" sortable="custom" align="right">
            <template slot-scope="scope">
              <span class="red">{{ priceFormat(scope.row.totalPrice) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="登记机构" sortable width="100" prop="PERMIT_NUMBER" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.backupOrg }}</span>
            </template>
          </el-table-column>
          <el-table-column label="提交时间" width="90" prop=" a.create_date" sortable="custom" align="center">
            <template slot-scope="scope">
              <span>
               {{scope.row.createDate}}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="backupName" sortable="custom" width="70" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.delFlag!=0">{{ scope.row.delName }}</span>
              <span v-else>{{ scope.row.backupName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <div class="operates">
                <span><a @click="addOrUpdate(scope.row.recordId,1)" class="green" title="复制">复制</a></span>
                <span><a @click="handleBackup(scope.row.recordId,'备案查看')" class="green" title="查看">查看</a></span>
                <span v-if="scope.row.backFlag==='0'">
                  <a @click="handleSubmitToNext(scope.row.recordId)" class="blue-bord" title="提交">提交</a>
                  <a @click="addOrUpdate(scope.row.recordId,0)" class="green" title="修改">修改</a>
                </span>
                <span v-if="scope.row.backFlag==='0'||scope.row.delFlag==='2'">
                  <a @click="handleDelete(scope.row.recordId)" class="green" title="删除">删除
                </a></span>
                <span v-if="(scope.row.backFlag!=='0')&&(scope.row.delFlag==='0')">
                  <a @click="handleDel(scope.row.recordId)" class="red" title="作废">作废</a>
                </span>
                <span v-if="scope.row.backFlag==='2'||scope.row.backFlag==='4'">
                  <a @click="downloadWord(scope.row.recordId)"  class="green" title="下载">下载</a>
                </span>
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
      <div class="foot-btn">
        <div class="foot-left">
          <el-button type="success" size="small" @click="addOrUpdate(0,0)">
            新增
          </el-button>
          <a :href="loadFile" download="登记表.zip" class="el-button el-button--warning el-button--small">登记表模板下载</a>
        </div>
      </div>
      <!-- 弹窗：新增/编辑 -->
      <el-dialog :title="'作废原因'" top="2vh" width="40%" :visible.sync="showForm" :before-close="handleClose">
        <div style="width: 300px">
          <el-form ref="form" :model="form" :rules="rules">
            <el-input type="hidden" v-model="form.recordId"></el-input>
            <el-form-item label="" prop="delDesc">
              <el-input type="textarea" v-model="form.delDesc"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer">
          <el-button type="primary" @click="handleForm('form')">确定</el-button>
          <el-button @click="handleClose">取消</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- ========================== 主内容end ========================= -->
    <backup-handle v-if="backupHandle === true" ref="backupHandle"></backup-handle>
  </div>

</template>
<script>

  // 引入用户相关请求
  import {
    queryHospitalList,
    deleteHospitalBackUpByRecordId,
    submitToNext,downloadBackupWord,
    backUpApplyDel,getRoleCode
  } from 'src/axios/trade/backup/hospitalList'
  import {priceFormat, keyBoardEnter} from "src/utils";
  import {getSpecHints,getPackHints} from "src/utils/validateUtil";
  import backupHandle from 'src/pages/trade/tradecenter/backUp/backupHandle'
  import fileUpload from 'js-file-download'

  export default {
    components: {
      backupHandle,
    },
    data() {
      return {
        currentOrder: undefined,
        backupHandle: false,
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        rules: this.metaRules(),
        form: this.metaForm(), // 表单初始化
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        length: '',
        roleCode: '',
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        loadFile: 'static/templateFile.zip'
      }
    },
    created() {
      this.list()
    },
    methods: {
      priceFormat,
      getSpecHints,
      getPackHints,
      getPrintData(param) {
        let printObject;
        this.resData.list.map(item => {
          if (param === item.recordId) {
            printObject = {
              'recordId': item.recordId,
              'nameChn': item.nameChn,
              'tradeName': item.tradeName,
              'modeName': item.modeName,
              'spec': item.spec,
              'standRate': item.standRate,
              'specUnit': item.specUnit,
              'wrapName': item.wrapName,
              'manufactureName': item.manufactureName,
              'purchaseNum': item.purchaseNum,
              'createDate': item.createDate,
              'backupName': item.backupName,
              'purchaseDate': item.purchaseDate,
              'purchasePrice': item.purchasePrice,
              'bidPrice': item.bidPrice,
              'useDesc': item.useDesc,
              'purchaseDesc': item.purchaseDesc,
            };
          }
        });
        sessionStorage.removeItem('printObject');
        sessionStorage.setItem('printObject', JSON.stringify(printObject));
        let routeData = this.$router.resolve({path: '/printWord'});
        window.open(routeData.href, '_blank');
      },
      // -------------------------------------------- 数据初始化  -----------------------------------------
      sortChang(value) {
        let sortType = " desc"
        if (value.order.startsWith("asc")) {
          sortType = " asc";
        }
        this.currentOrder = value.prop + sortType;
        this.list()
      },
      metaData() {
        return {
          // 前后台交互数据封装格式
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
      metaQuery() { // 表单查询数据初始化
        return {
          searchStatus: undefined,
          backupCode: undefined,
          wrapName: undefined,
          nameChn: undefined,
          searchBenDate: undefined,
          searchEndDate: undefined
        }
      },
      metaForm() { // 表单数据初始化
        return {
          delDesc: ''
        }
      },
      metaRules() {
        return {
          delDesc: {required: true, message: '请输入作废原因', trigger: 'blur'}
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list() {
        this.resData.orderBy = this.currentOrder;
        queryHospitalList(this.resData, this.query).then(res => {
          this.resData = res.data
          this.length = this.resData.list.length
          if (this.resData.pageNum === 0) {
            this.resData.pageNum = 1
          }
        })
      },
      handleBackup(recordId,name){
        this.backupHandle = true;
        this.$nextTick(() => {
          this.$refs.backupHandle.govPopupParam(recordId,name);
        })
      },
      getRoleCode() {
        getRoleCode().then(res => {
          this.roleCode = res.data
        })
      },
      downloadWord(id) {
        downloadBackupWord(id).then(res => {
          let headers = res.headers;
          let title = ""
          if (!title) {
            const fileName = headers['content-disposition'];
            title = decodeURI(fileName);
          }
          fileUpload(res.data,title,"application/msword")
        })
      },
      searchEnterFun(e) {
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      // ************************ 分页操作 ************************
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.list()
      },
      addOrUpdate(recordId, sign) {
        this.$router.push("/trade/manage/hospitalAdd/" + recordId + "/" + sign)
      },
      showDetails(recordId) {
        this.$router.push("/trade/manage/hospitalViewList/" + recordId)
      },
      restQuery() {
        this.query = this.metaQuery();
      },
      handleClose() {
        this.showForm = !this.showForm
      },
      handleDel(recordId) {
        this.form = this.metaForm();
        this.form.recordId = recordId;
        this.showForm = true;
        this.rules = this.metaRules();
      },
      handleForm(form) {
        this.$refs[form].validate(valid => {
          if (valid) {
            this.handleClose();
            backUpApplyDel(this.form).then(res => {
              this.list();
              this.$message({
                type: 'info',
                message: res.data
              })
            })
          }
        })
      },
      handleSubmitToNext(recordId) {
        this.$confirm(`确定提交?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          submitToNext(recordId).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.list()
              }
            })
          })
        }).catch(() => {
        });
      },
      handleDelete(recordId) {
        this.$confirm(`确定删除?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteHospitalBackUpByRecordId(recordId).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.list()
              }
            })
          })
        }).catch(() => {
        });
      },
      resetQuery() {
        this.query = this.metaQuery();
        this.list()

      },
      getHints(spec, wrapName) {

        let _spec, _wrapName;
        if (spec == null || spec == undefined || spec == "空") {
          _spec = "";
        } else {
          _spec = spec;
        }
        if (wrapName == null || wrapName == undefined || wrapName == "空") {
          _wrapName = "";
        } else {
          _wrapName = wrapName;
        }
        return  "规格:  "+ _spec +"    包材:"+ _wrapName
      },
    }
  }
</script>

