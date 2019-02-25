<template>
  <div class="project-manage-wrapper">
    <!--<el-tabs v-model="activeTab" @tab-click="handleClick">-->
      <!--<el-tab-pane label="新增项目管理" name="first">-->
      <div class="tablebox">
          <el-form ref="query" :model="query" class="form-bold" label-position="left" size="small" label-width="120px" :rules="rules">
            <el-row>
              <el-col :span="10">
                <el-form-item label="项目编码" prop="projectCode">
                  <el-input v-model="query.projectCode" placeholder="请输入" class="width-260"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="项目名称" prop="projectName">
                  <el-input v-model="query.projectName" placeholder="请输入" class="width-260"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="审核次数" prop="checkCount">
                  <el-input v-model="query.checkCount" placeholder="请输入" class="width-260"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="是否签署承诺书">
                  <el-radio-group v-model="query.promiseSigned" @change="radioChange">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                  <!--<el-radio v-model="query.flag" label="1">是</el-radio>-->
                  <!--<el-radio v-model="query.flag" label="0">否</el-radio>-->
                  <el-button type="text" @click="textareaSet" :class="query.promiseSigned=='1'?'':'falseColor'">承诺书设置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="项目开始时间" prop="beginDate" class="width-380">
                  <el-date-picker v-model="query.beginDate" type="date" placeholder="选择日期" size="small" :picker-options="startPickerOptions" ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="项目结束时间" prop="endDate" class="width-380">
                  <el-date-picker v-model="query.endDate" type="date" placeholder="选择日期" size="small" :picker-options="endPickerOptions" ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="买方机构设置">
                  <el-row :gutter="24">
                    <el-col :span="16" class="nopadding">
                      <span class="" >已选{{buyerIdList.length}}家</span>
                      <a  @click="openBuyerListView">选择</a>
                    </el-col>
                    <el-col :span="6">
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="配送机构设置">
                  <el-row :gutter="24">
                    <el-col :span="16" class="nopadding">
                      <span class="" >已选{{salerIdList.length}}家</span>
                      <a  @click="openSellerListView">选择</a>
                    </el-col>
                    <el-col :span="6">
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <!--<el-col :span="10">-->
              <!--<el-form-item label="审核方式">-->
              <!--<el-radio v-model="way" label="1">周期制</el-radio>-->
              <!--<el-radio v-model="way" label="2">项目制</el-radio>-->
              <!--</el-form-item>-->
              <!--</el-col>-->
              <el-col :span="10">
                <el-form-item label="批次处理上限" prop="batchUpperLimit">
                  <el-input placeholder="请输入" v-model="query.batchUpperLimit" class="width-260"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item>
                  <el-button type="primary" @click="submitForm('query')" size="small">保存</el-button>
                  <el-button size="small" @click="goBack">返回</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <!--<period v-if="way==1"></period>-->

            <!--<div v-if="way==2">-->
            <!--<hr/>-->
            <!--<h3>申报流程设置</h3>-->
            <!--<el-row :gutter="24">-->
            <!--<el-col :span="24">-->
            <!--<el-form-item label="申报时间">-->
            <!--<el-date-picker-->
            <!--v-model="declareDateSegment"-->
            <!--type="daterange"-->
            <!--range-separator="至"-->
            <!--start-placeholder="开始日期"-->
            <!--end-placeholder="结束日期">-->
            <!--</el-date-picker>-->
            <!--</el-form-item>-->
            <!--</el-col>-->
            <!--</el-row>-->
            <!--<el-row :gutter="24">-->
            <!--<el-form-item label="审核流程设置"-->
            <!--v-for="(domain,index) in auditForm.domains"-->
            <!--:key="index">-->
            <!--<el-row :gutter="24">-->
            <!--<el-col :span="3">-->
            <!--<el-select v-model="domain.flowPathValue" placeholder="请选择">-->
            <!--<el-option-->
            <!--v-for="item in flowPath"-->
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.value">-->
            <!--</el-option>-->
            <!--</el-select>-->
            <!--</el-col>-->
            <!--<el-col :span="15">-->
            <!--<div v-if="domain.flowPathValue==1">-->
            <!--<el-row :gutter="24">-->
            <!--<el-col :span="14">-->
            <!--<el-date-picker-->
            <!--v-model="auditDateSegment"-->
            <!--type="daterange"-->
            <!--range-separator="-"-->
            <!--start-placeholder="yyyy-mm-dd"-->
            <!--end-placeholder="yyyy-mm-dd">-->
            <!--</el-date-picker>-->
            <!--</el-col>-->
            <!--<el-col :span="8">-->
            <!--<el-button type="text">公示字段设置</el-button>-->
            <!--</el-col>-->
            <!--</el-row>-->
            <!--</div>-->
            <!--<div v-if="domain.flowPathValue==2">-->
            <!--<el-row :gutter="24">-->
            <!--<el-col :span="14">-->
            <!--<el-date-picker-->
            <!--v-model="auditDateSegment"-->
            <!--type="daterange"-->
            <!--range-separator="-"-->
            <!--start-placeholder="yyyy-mm-dd"-->
            <!--end-placeholder="yyyy-mm-dd">-->
            <!--</el-date-picker>-->
            <!--</el-col>-->
            <!--</el-row>-->
            <!--</div>-->
            <!--<div v-if="domain.flowPathValue==3">-->
            <!--<el-row :gutter="24">-->
            <!--<el-col :span="14">-->
            <!--<el-date-picker-->
            <!--v-model="auditDateSegment"-->
            <!--type="daterange"-->
            <!--range-separator="-"-->
            <!--start-placeholder="yyyy-mm-dd"-->
            <!--end-placeholder="yyyy-mm-dd">-->
            <!--</el-date-picker>-->
            <!--</el-col>-->
            <!--</el-row>-->
            <!--</div>-->
            <!--<div v-if="domain.flowPathValue==4">-->
            <!--<el-row :gutter="24">-->
            <!--<el-col :span="14">-->
            <!--<el-date-picker-->
            <!--v-model="auditDateSegment"-->
            <!--type="daterange"-->
            <!--range-separator="-"-->
            <!--start-placeholder="yyyy-mm-dd"-->
            <!--end-placeholder="yyyy-mm-dd">-->
            <!--</el-date-picker>-->
            <!--</el-col>-->
            <!--</el-row>-->
            <!--</div>-->
            <!--</el-col>-->
            <!--<el-col :span="4">-->
            <!--<el-button @click.prevent="removeDomain(domain)">删除</el-button>-->
            <!--<el-button @click="addDomain">添加</el-button>-->
            <!--</el-col>-->
            <!--</el-row>-->
            <!--</el-form-item>-->
            <!--</el-row>-->
            <!--<el-row :gutter="24">-->
            <!--<el-col :span="10">-->
            <!--<el-form-item label="企业确认时长">-->
            <!--<el-date-picker-->
            <!--v-model="auditDateSegment"-->
            <!--type="daterange"-->
            <!--range-separator="-"-->
            <!--start-placeholder="yyyy-mm-dd"-->
            <!--end-placeholder="yyyy-mm-dd">-->
            <!--</el-date-picker>-->
            <!--</el-form-item>-->
            <!--</el-col>-->
            <!--</el-row>-->
            <!--<el-row :gutter="24">-->
            <!--<el-col :span="10">-->
            <!--<el-form-item label="挂网日期">-->
            <!--<el-date-picker-->
            <!--v-model="value1"-->
            <!--type="date"-->
            <!--placeholder="选择日期">-->
            <!--</el-date-picker>-->
            <!--</el-form-item>-->
            <!--</el-col>-->
            <!--</el-row>-->
            <!--</div>-->
          </el-form>
      </div>

      <div v-if="showEditor" ref="neditor" class="promiseBook">
        <div class="editorW">
          <n-editor v-model="promiseContent" :config="config"/>
          <div class="editorw-footer padding10">
            <el-button type="primary" @click="confirmEditor">确定</el-button>
            <el-button @click="closeEditor">取消</el-button>
          </div>
        </div>
      </div>
      <buyer-list v-if="buyerList" ref="buyerList" @selectedId="selectedId" :buyerId="buyerIdList"></buyer-list>
      <seller-list v-if="sellerList" ref="sellerList" @selectedSellerId="selectedSellerId" :sellerId="salerIdList"></seller-list>


      <!--</el-tab-pane>-->
    <!--</el-tabs>-->

  </div>

</template>

<script>
  import period from 'src/pages/auditchanges/systemManage/projectManage/period'
  import buyerList from 'src/pages/auditchanges/systemManage/projectManage/buyerList'
  import sellerList from 'src/pages/auditchanges/systemManage/projectManage/sellerList'
  import NEditor from 'src/components/n-editor/n-editor'
  import {submitFrom,validationProjectName,validationProjectCode,projectView,projectUpdate} from 'src/axios/auditchanges/systemManage/projectManage'

  export default {
    components: {period, buyerList,sellerList,NEditor},
    name: "insert-auding-manage",
    data() {
      var vprojectCode = (rule, value, callback) => {
        if(value){
          // callback()
          if(value!==this.query.projectCode){
            validationProjectCode(value).then(res=>{
              // console.log(res,'密码code')
              if(res.success){
                if(res.data.exceptionMessage=='false'){
                  callback(new Error('项目编码重复'))
                }else{
                  callback()
                }
              }else{
                callback(new Error('请求失败'))
              }
            })
          }else{
            callback()
          }
        }else{
          callback(new Error('不可为空'))
        }

        // callback(new Error('请再次输入密码'));
      };
      var vprojectName = (rule, value, callback) => {
        if(value){
          // callback()
          if(value!==this.query.projectName){
            validationProjectName(value).then(res=>{
              // console.log(res,'请再次输入密码')
              if(res.success){
                if(res.data.exceptionMessage=='false'){
                  callback(new Error('项目名称重复'))
                }else{
                  callback()
                }
              }else{
                callback(new Error('请求失败'))
              }
            })
          }else{
            callback()
          }
        }else{
          callback(new Error('不可为空'))
        }
      };
      var validateCheckCount = (rule, value, callback) => {
        if(value){
          let reg = /^[1-5]$/;
          if(reg.test(value*1)){
            callback();
          }else{
            callback(new Error('请输入合法数字'));
          }
        }else{
          callback(new Error('不可为空'))
        }
      };
      var validateBatchUpperLimit = (rule, value, callback) => {
        if(value||value==0){
          let reg = /^\d+$/;
          if(reg.test(value)){
            callback();
          }else{
            callback(new Error('请输入合法数字'));
          }
        }else{
          callback(new Error('不可为空'))
        }
      };
      var validatebeginDate = (rule,value,callback) => {
        if(value){
          callback()
        }else{
          callback(new Error('开始时间不可为空'))
        }
      };
      var that = this;
      return {
        // way: '1',
        query: this.mataQuery(),
        // activeTab: 'first',
        // declareDateSegment: undefined,
        // auditDateSegment: undefined,
        buyerList:false,
        sellerList:false,
        // auditForm: {
        //   domains: [{}]
        // },
        // changeForm: {
        //   domains: [{}]
        // },
        // flowPath: [{
        //   value: '1',
        //   label: '公示'
        // }, {
        //   value: '2',
        //   label: '质疑'
        // }, {
        //   value: '3',
        //   label: '澄清'
        // }, {
        //   value: '4',
        //   label: '审核'
        // },],
        buyerIdList:[],
        salerIdList:[],
        showEditor:false,
        requiredControl:false,
        promiseContent:'',
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
          autoHeightEnabled:false, // 启用高度滚动条
          autoFloatEnabled: true,
          enableDragUpload: true,   // 启用拖拽上传
          enablePasteUpload: true,  // 启用粘贴上传
          imageScaleEnabled: true,  // 启用 图片拉伸缩放
          elementPathEnabled: false, // 关闭元素路径
          catchRemoteImageEnable: true, // 开启远程抓取图片
          allHtmlEnabled: true, //提交附带html字符串
        },
        projectId:'',
        rules:{
          projectCode:[
            { validator: vprojectCode, trigger: 'blur' }
          ],
          projectName:[
            { validator: vprojectName, trigger: 'blur' }
          ],
          checkCount:[
            { validator: validateCheckCount, trigger: 'blur' }
          ],
          batchUpperLimit:[
            { validator: validateBatchUpperLimit, trigger: 'blur' }
          ],
          beginDate:[
            {validator: validatebeginDate, trigger: 'change'}
          ]
        },
        startPickerOptions: {
          disabledDate(time) {
            if(that.query.endDate*1 == ''){
              return false;
            }else{
              return time.getTime() > new Date(that.query.endDate*1)-3600*24*1000;
            }
          }
        },
        endPickerOptions: {
          disabledDate(time) {
            return time.getTime() < (new Date(that.query.beginDate*1))*1;
          }
        },
      }
    },
    methods: {
      //回退上级连接页面
      goBack() {
        this.$router.go(-1)
      },
      mataQuery() {
        return {
          promiseSigned:'0',
          projectCode:'',
          projectName:'',
          beginDate:'',
          endDate:'',
          checkCount:'',
          batchUpperLimit:'',
        }
      },
      // handleClick(tab, event) {
      //   console.log(tab, event);
      // },
      // removeDomain(item) {
      //   var index = this.auditForm.domains.indexOf(item)
      //   if (index !== -1) {
      //     this.auditForm.domains.splice(index, 1)
      //   }
      // },
      // addDomain() {
      //   this.auditForm.domains.push({
      //     value: '',
      //     key: Date.now()
      //   });
      // },
      //买方机构选择
      openBuyerListView(){
        this.buyerList = true;
        this.$nextTick(() => {
          this.$refs.buyerList.openView()
        })
      },
      //卖方机构选择
      openSellerListView(){
        this.sellerList = true;
        this.$nextTick(() => {
          this.$refs.sellerList.openView()
        })
      },
      //买方ID
      selectedId(selectedDataId){
        this.buyerIdList = selectedDataId
        // console.log('selectedDataId',selectedDataId);
        // console.log('selectedDataId',selectedDataId.length);
      },
      //单选按钮切换触发,是否签署承诺书
      radioChange(value){
        // console.log(value,'value');
        if(value=='1'){
          this.requiredControl = true;
        }else{
          this.requiredControl = false;
        }
      },
      //卖方Id
      selectedSellerId(selectedDataId){
        this.salerIdList = selectedDataId
        // console.log('selectedDataId',selectedDataId);
        // console.log('selectedDataId',selectedDataId.length);
      },
      //弹出富文本编辑器
      textareaSet(){
        // console.log('弹出富文本编辑器');
        if(this.query.promiseSigned=='1'){
          this.showEditor = true
        }else{
          return ;
        }
      },
      //提交编辑富文本
      confirmEditor(){
        // console.log(this.promiseContent,'promiseContent');
        if(this.promiseContent){
          this.showEditor = false;
          this.requiredControl = false;
        }else{
          return ;
        }
      },
      //取消编辑富文本
      closeEditor(){
        this.showEditor = false
      },
      //保存
      submitForm(formName){
        // console.log(this.query,'this.query');
        if(this.requiredControl==false){//否
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // this.query.id = this.projectId;
              if(!!this.query.endDate==false){
                delete this.query.endDate;
              }
              let paramsForm = {
                buyerIdList:this.buyerIdList,
                catProject:this.query,
                promiseContent:this.promiseContent,
                salerIdList:this.salerIdList
              };
              console.log(paramsForm,'paramsForm');
              projectUpdate(paramsForm).then(res=>{
                console.log(res,'res修改保存');
                // console.log(paramsForm,'params');
                if(res.success){
                  this.$message({
                    message:'保存成功',
                    type:'success'
                  });
                  this.$router.push({path:'/AUDIT/sysManage/audingManage'});
                  // this.$alert('保存成功',{
                  //   confirmButtonText:'确定',
                  // }).then(()=>{
                  //   this.$router.push({path:'/AUDIT/sysManage/audingManage'})
                  // })
                }else{
                  this.$message({
                    message:'保存失败',
                    type:'error'
                  })
                }
              })
            } else {
              // console.log('error submit!!');
              return false;
            }
          });
          // console.log(this.query,'query');
          // console.log(this.buyerIdList,'buyerIdList')
          // console.log(this.salerIdList,'salerIdList')
          // console.log(this.promiseContent,'promiseContent')
        }else{//是
          this.$message({
            message:'承诺书未设置',
            type:'error'
          })
        }
      },
      //获取数据
      list(id){
        projectView(id).then(res=>{
          // console.log(res,'res查询表单');
          if(res.success){
            this.query=res.data.rightBackJson.catProject;
            if(!!this.query.endDate==true){this.query.endDate=new Date(res.data.rightBackJson.catProject.endDate);console.log(this.query.endDate)}//如果没选择，就不执行。时间格式转化
            if(!!this.query.beginDate==true){this.query.beginDate=new Date(res.data.rightBackJson.catProject.beginDate);console.log(this.query.beginDate)}
            this.buyerIdList = res.data.rightBackJson.buyerIdList;
            this.salerIdList = res.data.rightBackJson.salerIdList;
            this.promiseContent = res.data.rightBackJson.promiseContent||'';
            // console.log(this.query,'this.query')
          }else{
            this.$message({
              message:'请求失败',
              type:'error'
            })
          }
        })
      }
    },
    //获取传递过来的ID
    created(){
      this.projectId = this.$route.params.id;
      this.list(this.projectId);
    },
  }
</script>
