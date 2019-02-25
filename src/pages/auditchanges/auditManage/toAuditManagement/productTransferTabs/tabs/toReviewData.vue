


<template>

  <!-- 表格 -->
  <div class="tablebox">

      <!-- 表格查询表单 -->


      <div class="tableset">

        <el-table :data="resData.list" border stripe>
          <!--<el-table-column label="序号" type="index" width="50"></el-table-column>-->

          <el-table-column label="批次名称">
            <template slot-scope="scope">
              <span>{{ scope.row.batchName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="批次数量" header-align="center" align="right">
            <template slot-scope="scope">
              <div>
                <a @click="setProjectNum(scope.row.id,scope.row.batchName,scope.row.processType)">{{ scope.row.batchTotle }}</a>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="审核员分配情况">
            <template slot-scope="scope">
              <a @click="showAuditor(scope.row.id)">{{ scope.row.auditorAllotment }}</a>
            </template>
          </el-table-column>
          <el-table-column label="当前状态">
            <template slot-scope="scope">
              <span v-if="scope.row.processType=='2'">公示</span>
              <span v-if="scope.row.processType=='3'">质疑</span>
              <span v-if="scope.row.processType=='4'">澄清</span>
              <span v-if="scope.row.processType=='5'">审核</span>
              <span v-if="scope.row.processType=='8'">企业确认</span>
              <span v-if="scope.row.processType=='6'">挂网</span>
              <span v-if="scope.row.processType=='0'">未开始</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div class="operates">
                <span><a class="operation-btn" v-if="scope.row.processType!='6'" @click="showStatus(scope.row.id,scope.row.processType)">设置</a></span>
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

      <!--创建批次-->
      <div class="foot-btn">
        <div class="foot-left">
          <el-button type="success" @click="showDataReporting" size="small">新建批次</el-button>
        </div>
      </div>

      <el-dialog
        :close-on-click-modal="false"
        :visible.sync="dialogVisible"
        width="80%">
        <dataReporting
          ref="dataReporting"
          @listUpdata="select"></dataReporting>
      </el-dialog>

      <el-dialog
        :close-on-click-modal="false"
        :visible.sync="statusVisible"
        width="30%">
        <!--设置的弹层-->
        <div class="gap-40">
          <div v-if="processTypeState==0">当前状态:未开始</div>
          <div v-if="processTypeState==2">当前状态:公示</div>
          <div v-if="processTypeState==3">当前状态:质疑</div>
          <div v-if="processTypeState==4">当前状态:澄清</div>
          <div v-if="processTypeState==5">当前状态:审核</div>
          <div v-if="processTypeState==8">当前状态:企业确认</div>
          <div v-if="processTypeState==6">当前状态:挂网</div>
          <el-radio-group v-model="processType" @change="radioChange">
            <div class="space-20"><el-radio :label="2">公示<el-checkbox class="gap-40" v-if="checkFlag" v-model="checked">开放质疑</el-checkbox></el-radio></div>
            <div class="space-20"><el-radio :label="4">澄清</el-radio></div>
            <div class="space-20"><el-radio :label="5">审核</el-radio></div>
            <!--<div class="space-20"><el-radio :label="8">企业确认</el-radio></div>-->
            <div class="space-20"><el-radio :label="6">挂网</el-radio></div>
          </el-radio-group>
        </div>
        <div slot="footer">
          <el-button type="success" size="small" @click="submit">确定</el-button>
          <el-button size="small" @click="cancel">取消</el-button>
        </div>
      </el-dialog>

  </div>

</template>

<script>
  import dataReporting from 'src/pages/auditchanges/auditManage/toAuditManagement/productTransferTabs/tabs/dataReporting'
  //引入列表数据
  import {upProductTransferToDeclare} from 'src/axios/auditchanges/toAuditManagement/productTransferTabs'
  import {setUpPrompt,setUp} from 'src/axios/auditchanges/toAuditManagement/productDeclarationTabs'
  export default {
    //初始化函数
    name: "to-review-data",
    components: {
      dataReporting
    },
    data() {
      return {
        radioStatus: '0',//单选组的初始状态
        checked: false,//开放质疑是否选中
        checkFlag:false,//开放质疑显示控制
        projectCtrlId:'',//批次id
        processType:'0',//设置记录
        processTypeState:'0',//当前状态显示
        processTypeFlag:'0',//选择质疑时的控制阀
        statusVisible:false,
        dialogVisible: false,
        resData: this.metaData(),
        activeName: 'first',//标签页默认选中第一个
        query: this.metaQuery(), // 查询初始化
      }
    },
    //初始化函数
    created() {
      if(this.$store.state.resDataObj['7']){
        this.resData = this.$store.state.resDataObj['7']
      }
      //初始化列表
      this.select()
    },
    methods: {
      //让申报数据显示
      showDataReporting(){
        this.dialogVisible = true;
        this.$nextTick(()=>{
          this.$refs.dataReporting.list()
        })
      },
      //条件查询
      select() {
        var selectQuery = this.query;
        var resData = this.resData;
        if (resData.pageSize == undefined || resData.pageSize == "") {
          resData.pageSize = 10;
        }
        if (resData.pageNum == undefined || resData.pageNum == "") {
          resData.pageNum = 1;
        }
        this.dialogVisible = false;
        upProductTransferToDeclare(resData).then(res=>{
          // console.log(res,'resdddddddd')
          if(res.success){
            this.resData = res.data;
            if(this.resData.pageNum===0){
              this.resData.pageNum=1
            }
          }else{
            this.$message(res.message);
          }
        })
      },
      //清空查询表单
      // remove() {
      //   // 获取查询列表
      //   var selectQuery = this.query;
      //   //清空
      //   selectQuery.Id = undefined;
      //   selectQuery.UpTypeId = undefined;
      //   select();
      // },
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() {
        return {
          pageNum: 1,
          pageSize: 10,
          size: undefined,
          startRow: undefined,
          endRow: undefined,
          total: undefined,
          pages: undefined,
          prePage: undefined,
          nextPage: undefined,
          isFirstPage: true,
          isLastPage: undefined,
          hasPreviousPage: undefined,
          hasNextPage: undefined,
          navigatePages: undefined,
          navigatepageNums: undefined,
          navigateFirstPage: undefined,
          navigateLastPage: undefined,
          firstPage: undefined,
          lastPage: undefined,
          list: []
        }
      },
      metaQuery() { // 表单查询数据初始化
        return {
          query: {
            Id: undefined,
            UpTypeId: undefined
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      handleSizeChange(val) {
        this.resData.pageSize = val;
        this.select();
        this.$store.state.resDataObj['7'] = this.resData;

      },
      handleCurrentChange(val) {
        this.resData.pageNum = val;
        this.select()
        this.$store.state.resDataObj['7'] = this.resData;
      },
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      setProjectNum(rowId,rowName,processType){//设置批次数量
        // console.log(rowId,'rowId')
        this.$router.push('productTransferTabsBatchSet/'+rowId+'/'+rowName+'/'+processType)
      },
      showAuditor(rowId){//审核员分配
        this.$router.push('productTransferTabsDistribution/'+rowId)
      },
      showStatus(projectCtrlId,processType){//显示状态
        this.processTypeState = processType;
        this.processType = processType*1;
        this.projectCtrlId =projectCtrlId;
        if(processType==2||processType==3){
          this.checkFlag = true;
          if(processType==3){
            this.checked=true;
            this.processType = 2;
          }else{
            this.checked=false;
          }
        }else{
          this.checked=false;
        }
        // console.log(this.processType);
        this.statusVisible = true;
      },
      cancel(){//弹框取消
        this.statusVisible = false;
      },
      submit(){//弹框确认
        let _this = this;
        if(this.processType == 2){
          if(this.checked){
            this.processTypeFlag = 3;
          }else{
            this.processTypeFlag = 2;
          }
        }else{
          this.processTypeFlag = this.processType;
        }
        if(this.processType == 6){//如果为挂网结束流程
          setUpPrompt(this.projectCtrlId,this.processTypeFlag).then(res=>{
            // console.log(res,'批次');
            if(res.data.success){
              let nameListSize = res.data.rightBackJson.nameListSize;
              let nameListToauditSize = res.data.rightBackJson.nameListToauditSize;
              let info  = '未审核条数：'+nameListSize+'条，待确认条数：'+nameListToauditSize+'条。是否继续?';
              this.$confirm(info,'提示',{
                confirmButtonText: '确定',
                cancelButtonText:'取消',
              }).then(()=>{
                this.$confirm('挂网操作将结束审核流程，是否确认挂网？',{
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                }).then(()=>{
                  setUp(_this.projectCtrlId,_this.processTypeFlag).then((res)=>{
                    if(res.data.success){
                      this.statusVisible = false;
                      _this.select()
                    }else{
                      this.$message(res.data.exceptionMessage)
                    }
                  })
                })
              }).catch(()=>{
                console.log('取消')
              });
            }else{
              this.$message(res.message);
            }
          })
        }else{
          if(this.processType == 8){//企业确认时弹框
            // 批次号 设置状态
            setUpPrompt(this.projectCtrlId,this.processTypeFlag).then(res=>{
              // console.log(res,'批次');
              if(res.data.success){
                let nameListSize = res.data.rightBackJson.nameListSize;
                let nameListToauditSize = res.data.rightBackJson.nameListToauditSize;
                let info  = '未审核条数：'+nameListSize+'条，待确认条数：'+nameListToauditSize+'条。是否继续?';
                this.$confirm(info,'提示',{
                  confirmButtonText: '确定',
                  cancelButtonText:'取消',
                }).then(()=>{
                  // console.log('成功');
                  setUp(_this.projectCtrlId,_this.processTypeFlag).then((res)=>{
                    if(res.data.success){
                      this.statusVisible = false;
                      _this.select()
                    }else{
                      this.$message(res.data.exceptionMessage)
                    }
                  })
                }).catch(()=>{
                  console.log('取消')
                });
              }else{
                this.$message(res.message);
              }
            })
          }else{
            setUp(_this.projectCtrlId,_this.processTypeFlag).then((res)=>{
              if(res.data.success){
                this.statusVisible = false;
                _this.select()
              }else{
                this.$message(res.data.exceptionMessage)
              }
            })
          }
        }
      },
      radioChange(){//按钮状态改变
        if(this.processType == 2){
          this.checkFlag = true
        }else{
          this.checkFlag = false
        }
      }
    }
  }
</script>

<style scoped>

</style>
