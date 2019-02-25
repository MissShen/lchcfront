<template>
  <div class="project-manage-wrapper">
    <!--<el-tab-pane label="新增项目管理" name="first">-->
    <div class="tablebox">
        <el-form ref="query" :model="query" label-position="left" size="small" label-width="120px" class="form-bold">
          <el-row>
            <el-col :span="9">
              <el-form-item label="项目编码" prop="projectCode">
                <!--<el-input v-model="query.projectCode" placeholder="请输入" ></el-input>-->
                <span>{{query.projectCode}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="项目名称" prop="projectName">
                <span>{{query.projectName}}</span>
                <!--<el-input v-model="query.projectName" placeholder="请输入"></el-input>-->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9">
              <el-form-item label="审核次数" prop="checkCount">
                <span>{{query.checkCount}}</span>
                <!--<el-input v-model="query.checkCount" placeholder="请输入"></el-input>-->
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="是否签署承诺书">
                <!--<el-radio-group v-model="query.promiseSigned" @change="radioChange">-->
                  <!--<el-radio label="1">是</el-radio>-->
                  <!--<el-radio label="0">否</el-radio>-->
                <!--</el-radio-group>-->
                <span v-if="query.promiseSigned=='1'">是</span>
                <span v-else>否</span>
                <!--<el-radio v-model="query.flag" label="1">是</el-radio>-->
                <!--<el-radio v-model="query.flag" label="0">否</el-radio>-->
                <el-button type="text" v-if="query.promiseSigned=='1'" @click="textareaSet">承诺书设置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9">
              <el-form-item label="项目开始时间" prop="beginDate">
                <span>{{query.beginDate}}</span>
                <!--<el-date-picker-->
                  <!--v-model="query.beginDate"-->
                  <!--type="date"-->
                  <!--placeholder="选择日期"-->
                  <!--size="large">-->
                <!--</el-date-picker>-->
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="项目结束时间" prop="endDate">
                <span>{{query.endDate}}</span>
                <!--<el-date-picker-->
                  <!--v-model="query.endDate"-->
                  <!--type="date"-->
                  <!--placeholder="选择日期"-->
                  <!--size="large">-->
                <!--</el-date-picker>-->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9">
              <el-form-item label="买方机构设置">
                <el-row :gutter="24">
                  <el-col :span="16" class="nopadding">
                    <span class="" >已选{{buyerIdList.length}}家</span>
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
                  </el-col>
                  <el-col :span="6">
                    <!--<el-button  @click="openSellerListView">选择</el-button>-->
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
                <span>{{query.batchUpperLimit}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <!--<el-row :gutter="24">-->
            <!--<el-col :span="24">-->
              <!--<el-form-item>-->
                <!--<el-button @click="goBack()" >返回</el-button>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
          <!--</el-row>-->
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
      <div class="foot-btn">
        <div class="foot-left">
          <el-button @click="goBack()" size="small">返回</el-button>
        </div>
      </div>
    </div>
    <div v-if="showEditor" ref="neditor" class="promiseBook">
      <div class="editorW">
        <n-editor v-model="promiseContent" :config="config"/>
        <div class="padding10 editorw-footer">
          <el-button @click="closeEditor">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {projectView} from 'src/axios/auditchanges/systemManage/projectManage'
  import NEditor from 'src/components/n-editor/n-editor'

  export default {
    components: {NEditor},
    name: "insert-auding-manage",
    data() {
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
        projectId:''
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
      //弹出富文本编辑器
      textareaSet(){
        // console.log('弹出富文本编辑器');
          this.showEditor = true
      },
      //取消编辑富文本
      closeEditor(){
        this.showEditor = false
      },
      //获取数据
      list(id){
        projectView(id).then(res=>{
          // console.log(res)
          if(res.success){
            this.query=res.data.rightBackJson.catProject;
            this.buyerIdList = res.data.rightBackJson.buyerIdList;
            this.salerIdList = res.data.rightBackJson.salerIdList;
            this.promiseContent = res.data.rightBackJson.promiseContent;
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

