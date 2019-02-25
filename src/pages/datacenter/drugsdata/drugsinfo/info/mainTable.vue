<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
            <el-form-item class="width-150">
              <el-select v-model="query.searchType" placeholder="请选择" size="small">
                <el-option label="通用名" value="1"></el-option>
                <el-option label="药品编码" value="2"></el-option>
                <el-option label="质量标准编码" value="3"></el-option>
                <el-option label="药品ID" value="4"></el-option>
                <el-option label="剂型" value="5"></el-option>
                <el-option label="英文名称" value="6"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="width-150">
              <el-input v-model="query.searchText" @keyup.enter.native="searchEnterFun" placeholder="关键词" size="small"></el-input>
            </el-form-item>
          <span v-if="showQuery" class="sell-checkbox-wrapper">
            <el-form-item label="药品编码位数："></el-form-item>
            <el-form-item>
              <el-checkbox-group v-model="query.eight">
                  <el-checkbox label="1">8位</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item>
              <el-checkbox-group v-model="query.eleven">
                  <el-checkbox label="1">11位</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item>
              <el-checkbox-group v-model="query.thirteen">
                  <el-checkbox label="1">13位</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item>
              <el-checkbox-group v-model="query.twenty">
                  <el-checkbox label="1">20位</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item>
              <el-checkbox-group v-model="query.twentyThree">
                  <el-checkbox label="1">23位</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <!--<span class="width-90">标准化分类：</span>-->
            <el-form-item class="width-120">
              <el-select v-model="query.bigClassification" placeholder="药品大类" @change="getSecond()" size="small">
                <el-option
                  v-for="item in bigClassification"
                  :key="item.ID"
                  :label="item.NAME"
                  :value="item.ID">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="width-120">
              <el-select v-model="query.mediumClassification" placeholder="药品中类" @change="getThird()" size="small">
                <el-option
                  v-for="item in mediumClassification"
                  :key="item.ID"
                  :label="item.NAME"
                  :value="item.ID">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="width-120">
              <el-select v-model="query.smallClassification" placeholder="药品小类" size="small">
                <el-option
                  v-for="item in smallClassification"
                  :key="item.ID"
                  :label="item.NAME"
                  :value="item.ID">
                </el-option>
              </el-select>
            </el-form-item>

            <!--备用标识9.全部 ''正常 1.毒麻精放 2.实际转换比注射 3.备用粉针剂 4.非药准字号产品 5.毒药 6.麻药 7.精神类药品 8.放射性药品-->
            <!--<span class="width-90">-->
              <!--备用标识：-->
            <!--</span>-->
            <el-form-item class="width-150">
              <el-select v-model="query.alternateIdentifier" placeholder="全部" size="small">
                <el-option label="全部" value="9"></el-option>
                <el-option label="正常" value=""></el-option>
                <el-option label="毒麻精放" value="1"></el-option>
                <el-option label="实际转换比注射" value="2"></el-option>
                <el-option label="备用粉针剂" value="3"></el-option>
                <el-option label="非药准字号产品" value="4"></el-option>
                <el-option label="毒药" value="5"></el-option>
                <el-option label="麻药" value="6"></el-option>
                <el-option label="精神类药品" value="7"></el-option>
                <el-option label="放射性药品" value="8"></el-option>
              </el-select>
            </el-form-item>
            <!--移除-->
            <!--<el-form-item>-->
              <!--创建人：-->
              <!--<el-select v-model="value" placeholder="下拉框">-->
                <!--<el-option-->
                  <!--v-for="item in options"-->
                  <!--:key="item.value"-->
                  <!--:label="item.label"-->
                  <!--:value="item.value">-->
                <!--</el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->
            <el-form-item>
              <el-date-picker size="small"
                placeholder="创建时间-开始"
                v-model="query.createDateStart"
                type="date"
                format="yyyy-MM-dd">
              </el-date-picker>
              &nbsp;至&nbsp;
              <el-date-picker size="small"
                placeholder="创建时间-结束"
                v-model="query.createDateEnd"
                type="date"
                format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-date-picker size="small"
                placeholder="修改时间-开始"
                v-model="query.updateDateStart"
                type="date"
                format="yyyy-MM-dd">
              </el-date-picker>
              &nbsp;至&nbsp;
              <el-date-picker size="small"
                placeholder="修改时间-结束"
                v-model="query.updateDateEnd"
                type="date"
                format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <!--<span class="width-90">-->
              <!--创建时间范围：-->
            <!--</span>-->
            <!--<span class="width-420">-->
              <!--<el-date-picker-->
                <!--v-model="query.createDate"-->
                <!--type="daterange"-->
                <!--format="yyyy-MM-dd"-->
                <!--@change="getCreateDate"-->
                <!--range-separator="至"-->
                <!--start-placeholder="开始日期"-->
                <!--end-placeholder="结束日期" size="small"></el-date-picker>-->
            <!--</span>-->
            <!--移除-->
            <!--<el-form-item>-->
              <!--修改人:-->
              <!--<el-select v-model="value" placeholder="下拉框">-->
                <!--<el-option-->
                  <!--v-for="item in options"-->
                  <!--:key="item.value"-->
                  <!--:label="item.label"-->
                  <!--:value="item.value">-->
                <!--</el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<span class="width-90">-->
              <!--修改时间范围：-->
            <!--</span>-->
            <!--<span class="width-420">-->
              <!--<el-date-picker-->
                <!--v-model="query.updateDate"-->
                <!--type="daterange"-->
                <!--format="yyyy-MM-dd"-->
                <!--@change="getUpdateDate"-->
                <!--range-separator="至"-->
                <!--start-placeholder="开始日期"-->
                <!--end-placeholder="结束日期" size="small"></el-date-picker>-->
            <!--</span>-->
          </span>
          <el-form-item>
            <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
            <el-button type="warning" @click="resetForm()" size="small">重置</el-button>
            <el-button type="" v-if="showForm" @click="more()" size="small">更多</el-button>
            <el-button type="" v-if="showQuery" @click="less()" size="small">收起</el-button>
          </el-form-item>
        </el-form>



      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          @selection-change="handleSelectionChange" border stripe :row-key="getRowKeys">
          <el-table-column type="selection" align="center" width="50" :reserve-selection="true"></el-table-column>

          <el-table-column label="药品编码">
            <template slot-scope="scope">
              <span class="hiddenfont">{{ scope.row.CODE }}</span>
            </template>
          </el-table-column>

          <el-table-column label="通用名" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.NAME_CHN }}</span>
            </template>
          </el-table-column>

          <el-table-column label="剂型" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="hiddenfont">{{ scope.row.CDF_NAME_CHN }}</span>
            </template>
          </el-table-column>

          <el-table-column label="规格" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.SPEC }}</span>
            </template>
          </el-table-column>

          <el-table-column label="一级盐类衍生物" width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.CS_NAME_CHN }}</span>
            </template>
          </el-table-column>

          <el-table-column label="二级盐类衍生物" width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.CS_NAME_CHN2 }}</span>
            </template>
          </el-table-column>

          <el-table-column label="复方及小儿标记" width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.COMPOUND_CHILDREN }}</span>
            </template>
          </el-table-column>

          <el-table-column label="转换比" width="60" align="right" header-align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.STAND_RATE }}</span>
            </template>
          </el-table-column>

          <el-table-column label="备用标识">
            <template slot-scope="scope">
              <a href="javascript:;" @click="handleGoEdit(scope.row.READY_FLAG)">{{ getBackFlag(scope.row.READY_FLAG) }}</a>
            </template>
          </el-table-column>

          <el-table-column
            fixed="right"
            label="操作"
            width="160">
            <template slot-scope="scope">
              <div class="operates"><a class="operation-btn" @click="goInfo(scope.row.ID)">查看</a>
              <a class="operation-btn" @click="goCommon('edit', scope.row.ID)">修改</a>
              <a class="operation-btn" @click="goCommon('copy', scope.row.ID)">复制</a>
                <a class="operation-btn" v-if="scope.row.ALIAS_FLAG!=0" @click="goAlias(scope.row.CODE)">异名</a></div>
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

    </div>

    <div class="foot-btn">
      <div class="foot-left">
        <el-button type="success" size="small" @click="goCommon('add', undefined)">
          新增
        </el-button>
        <el-button type="danger" size="small" @click="handleDelete">
          删除
        </el-button>
        <el-button type="primary" size="small" @click="remark">
          备注
        </el-button>
        <!--<el-button type="primary" size="small">-->
          <!--批量导入-->
        <!--</el-button>-->
      </div>
    </div>

    <!-- ========================== 主内容end ========================= -->
    <el-dialog
      title="备注"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
      <el-input
        maxlength="800"
        type="textarea"
        :rows="7"
        placeholder="请输入内容"
        :close="initiTextArea"
        v-model="textarea">
      </el-input>
      <span slot="footer" class="dialog-footer">
    <el-button size="small" @click="closeRmarkbox">取 消</el-button>
    <el-button size="small" type="primary" @click='setRmark'>确 定</el-button>
  </span>
    </el-dialog>
  </div>

</template>
<script>

  import {standardizedList, drugInfoList, remove, updateDrugInfoRemark} from 'src/axios/datacenter/drugdata/druginfo/druginfo'
  import {keyBoardEnter} from "../../../../../utils";

  export default {
    data () {
      return{
        textarea:'',
        dialogVisible:false,
        activeName: '1',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: true, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        bigClassification: undefined,
        mediumClassification: undefined,
        smallClassification: undefined,
        deleteDataList:[]
      }
    },
    created () {
      this.setStandardizedList();
      if(!!this.$store.state.pageSeach.pageNum){
        this.query = this.$store.state.pageSeach;
        this.resData.pageSize = this.$store.state.pageSeach.pageSize;
        this.resData.pageNum = this.$store.state.pageSeach.pageNum;
      }
      this.$store.state.pageSeach=this.query;
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
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
            list: undefined
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
          query: {
            searchType: undefined,
            searchText: undefined,
            // 8
            eight: undefined,
            // 11
            eleven: undefined,
            // 13
            thirteen: undefined,
            // 20
            twenty: undefined,
            // 23
            twentyThree: undefined,
            bigClassification: undefined,
            mediumClassification: undefined,
            smallClassification: undefined,
            alternateIdentifier: '9',
            createDate: undefined,
            createDateStart: null,
            createDateEnd: null,
            updateDate: undefined,
            updateDateStart: null,
            updateDateEnd: null,
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  更多查询选项
      more(){
        this.showForm=false;
        this.showQuery=true;
      },
      less(){
        this.showForm=true;
        this.showQuery=false;
      },
      getRowKeys(row){
        return row.ID
      },
      // 获取标准化列表
      setStandardizedList() {
        // let parentId = this.query.bigClassification;
        standardizedList(1, '000000000000000000000000').then( res => {
          this.bigClassification = res.data;
        })
      },
      // search(){
      //   this.$store.state.pageSeach.pageNum = 1;
      //   this.resData.pageNum=1;
      //   this.list();
      // },
      //查询
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      // 获取用户分页列表
      list () {
        this.$store.state.pageSeach = this.query;
        // console.log("time=",this.query.createDate[0], "time=", this.query.createDate[1]);
        drugInfoList(this.query, this.resData).then(res => {
          console.log(res);
          this.resData = res.data
        })
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.$store.state.pageSeach.pageSize = val;
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.$store.state.pageSeach.pageNum = val;
        this.resData.pageNum = val
        this.list()
      },
      // 标准化分类，第二级
      getSecond() {
        let parentId = this.query.bigClassification;
        standardizedList(2, parentId).then( res => {
          this.mediumClassification = res.data;
          // this.query.mediumClassification = '';
        })
      },
      // 标准化分类，第三级
      getThird() {
        let parentId = this.query.mediumClassification;
        standardizedList(3, parentId).then( res => {
          this.smallClassification = res.data;
          // this.query.smallClassification = '';
        })
      },
      // 重置
      resetForm() {
        this.query = this.metaQuery ();
        this.list();
      },
      handleSelectionChange(val){
        this.deleteDataList=val
        console.log(this.deleteDataList,'this.deleteDataList');
      },
      getCreateDate(val){
        this.query.createDate = val;
        console.log('createDate time1===',this.query.createDate);
      },
      getUpdateDate(val){
        console.log('last time===',val);
      },
      //删除
      handleDelete() {
        if(this.deleteDataList.length<1){
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })
          return false
        }else{
          this.$confirm(`确定删除选中的数据吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let  ids=this.deleteDataList.map(data=>{
              return data.ID
            })
            console.log("ids==>",ids.join(',').toString())
            remove(ids.join(',').toString()).then(res=>{
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.list();
                  // this.$refs.this_recovery.list();
                }
              })
            })
          }).catch(() => {
          });
        }
      },
      handleClose(){
        this.dialogVisible = false
      },
      //提交备注
      setRmark(){
        let  ids=this.deleteDataList.map(data=>{
          return data.ID
        });
        if(this.textarea) {
          updateDrugInfoRemark(ids.join(',').toString(), this.textarea).then(res=>{
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.list()
              }
            })
          });
          this.dialogVisible = false  ;
          this.textarea = '';
        }
        else {
          this.$message({
            message: '备注信息不能为空',
            type: 'error'
          })
        }

      },
      initiTextArea(){
        this.textarea = '';
      },
      //关闭弹框
      closeRmarkbox(){
          this.dialogVisible = false;
          this.textarea = '';
      },

      remark() {
        if(this.deleteDataList.length<1){
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })
          return false
        }else{
          this.dialogVisible = true ;
        }
      },
      // 跳转页面
      goCommon(type, id) {
        this.$router.push("/DATA/basedata/drugsInfos/"+type+"/"+id);
      },
      // 详情页
      goInfo(id) {
        this.$router.push("/DATA/basedata/drugsInfo/tableDetail/"+id);
      },
      goAlias(code) {
        console.log("code = ", code)
        this.$router.push("/DATA/drugsdata/synonym/"+code+"/true");
      },
      getBackFlag(value) {
        console.log("value = ", value);
        if(value == '9') return '全部';
        if(value == '') return '正常';
        if(value == '1') return '毒麻精放';
        if(value == '2') return '实际转换比注射';
        if(value == '3') return '备用粉针剂';
        if(value == '4') return '非药准字号产品';
        if(value == '5') return '毒药';
        if(value == '6') return '麻药';
        if(value == '7') return '精神类药品';
        if(value == '8') return '放射性药品';
        return '无';
      }
    }
  }
  // function myFn(cb){
  //   var inputs = document.getElementsByTagName("input");
  //   console.log(inputs,'inputs');
  //   for (var i in inputs) {
  //     if (inputs[i] instanceof Element) {
  //       inputs[i].addEventListener("keyup", function (e) {
  //         console.log(e)
  //         var keyCode = window.event? e.keyCode:e.which;
  //         if(keyCode == 13){
  //           cb();
  //         }
  //       })
  //     }
  //   }
  // }

</script>
