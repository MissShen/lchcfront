<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="70%"
    append-to-body
    title="查看两票制资质"
  >
    <div class="vindicate-box gap-120">
      <div class="records-box space-30"  v-for="(item,index) in resData" :key="index">
        <h3 class="nomar-btm">{{item.NAME}}</h3>
        <el-row>
          <el-col :span="20">
            <p class="nomar-top w80">{{item.DESCRIBE}}</p>
            <images-preview
              ref="imagesPreview"
              :refName="item.ID"
              :operate="false"
              :imgIdListUnUnique="fileList[item.ID]"
              @imgIdListChange="recordUpLoadImgIdList"></images-preview>
          </el-col>
        </el-row>
      </div>
      <choose-files ref="treeView" v-if="dialogVisible"  @handleSelectedFolder="recordSelectedData"></choose-files>
    </div>
    <!--<div class="tablebox">-->
    <!--<el-tabs v-model="activeName">-->
    <!--&lt;!&ndash; 表格列表 &ndash;&gt;-->
    <!--<div class="tableset">-->
    <!--<el-table-->
    <!--:data="resData"-->
    <!--border-->
    <!--stripe-->
    <!--&gt;-->
    <!--<el-table-column>-->
    <!--<template slot-scope="scope">-->
    <!--<span>{{scope.row.NAME}}</span><br/>-->
    <!--<span>{{scope.row.DESCRIBE}}</span><br/>-->
    <!--<span>{{scope.row.listMap}}</span>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--</el-table>-->
    <!--</div>-->
    <!--</el-tabs>-->
    <!--</div>-->
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="goBack" >关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>

  // 引入用户相关请求

  import {findAptitudebyid,findFilesById} from 'src/axios/auditchanges/twoInvoiceSystem/AptitudeUpload'
  import chooseFiles from 'src/pages/auditchanges/common/chooseFiles';
  import imagesPreview from 'src/pages/auditchanges/common/imagesPreview'
  export default {
    components:{
      chooseFiles,imagesPreview
    },
    data () {
      return {
        activeName:'first',
        visible:false,
        resData:[],
        typeId:'',
        dialogVisible:false,
        fileList:{}
      }
    },
    created () {

    },
    watch:{
      fileList(){
        this.fileListUpdate()
      }
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      list (id,typeId) {
        this.typeId = typeId;
        this.visible = true;
        findAptitudebyid(id,typeId).then(res => {
          console.log(res.data)
          this.resData = res.data
          res.data.map(function (item) {
            this.$set(this.fileList,item.ID,[])
          }.bind(this));
          //查询文件ID lz记得
          findFilesById(id,typeId).then(res=>{
            if(res.data!=undefined){
              for (let x in res.data){
                this.$set(this.fileList,x,res.data[x])
              }
            }
          })
          console.log(this.fileList)
        })

      },
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      },

      goBack() {
        this.resData=[]
        this.fileList={}
        this.visible =false;
      },
      HandleChooseFiles(refName){
        const tis = this;
        tis.dialogVisible = true;
        this.$nextTick(() => {
          // 通过组件中设置的ref属性调取formView.vue中的fillData()方法加载弹窗内容
          this.$refs.treeView.initData(refName)})

      },
      fileListUpdate(){
        return this.fileList
      },
      recordSelectedData(res){
        // 所选择的树节点id
        console.log('selected data===', res);
        res.data.forEach(function (item,index) {
          this.fileList[res.refName].push(item)
        }.bind(this));
      },
      recordUpLoadImgIdList(res){
        //最终需要上传的id集合
        this.fileList[res.refName] = res.data;
        console.log('fileList=======',this.fileList);

      }
    }

  }
</script>
<style>
  @import "../../../../assets/css/auditchanges.css";
</style>
