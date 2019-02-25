<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible"
    append-to-body
    title="维护两票制资质"
    width="70%"
  >
    <div class="vindicate-box gap-120">
      <div class="records-box space-30" v-for="(item,index) in resData" :key="index">
        <h3 class="nomar-btm">{{item.NAME}}</h3>
        <el-row>
          <el-col :span="20">
            <p class="nomar-top w80">{{item.DESCRIBE}}</p>
            <upload-button
              v-if="item.FILETYPE != 2 || item.UPLOADFLAG"
              :fileKind="item.FILETYPE==2?2:1"
              :limit="fileLimit(item.FILETYPE)"
              class="vindicate-btn"
              :buttonFlag=item.REFNAME
              :fileListFlag='fileList[item.ID]'
              :defineName="newFileName"
              @getFileCount="getFileCount"
              :fileType="fileType"
              @uploadList="getUploadList">
            </upload-button>
            <images-preview
              :limit="limitNum"
              ref="imagesPreview"
              :refName="item.ID"
              :imgIdListUnUnique="fileList[item.ID]" @imgIdListChange="recordUpLoadImgIdList"></images-preview>
          </el-col>
        </el-row>
      </div>
      <choose-files ref="treeView" v-if="dialogVisible" @handleSelectedFolder="recordSelectedData"></choose-files>
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
      <el-button type="primary" :disabled="submitFlag" @click="submit" size="small">提交</el-button>
      <el-button size="small" @click="goBack">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>

  // 引入用户相关请求

  import {
    findAptitudebyid,
    insertOrgBigtype,
    findFilesById,
    updateOrgBigtype
  } from 'src/axios/auditchanges/twoInvoiceSystem/AptitudeUpload'
  import uploadButton from 'src/pages/auditchanges/common/uploadButton';
  import imagesPreview from 'src/pages/auditchanges/common/imagesPreview'

  export default {
    components: {
      uploadButton, imagesPreview
    },
    data() {
      return {
        activeName: 'first',
        visible: false,
        add: false,
        resData: [],
        typeId: '',
        dialogVisible: false,
        fileList: {},
        newFileName: {},
        fileType: "5",
        submitFlag: false,
        limitNum:100
      }
    },
    created() {

    },
    watch: {
      fileList() {
        this.fileListUpdate()
      }
    },
    methods: {
      encode(refame) {
        return encodeURIComponent(refame)
      },

      decode(refame) {
        return decodeURIComponent(refame)
      },
      // -------------------------------------------- 数据初始化  -----------------------------------------
      list(id, typeId) {
        this.typeId = typeId;
        this.visible = true;
        findAptitudebyid(id, typeId).then(res => {
          for (let x in res.data) {
            res.data[x].REFNAME = this.encode(res.data[x].ID + "," + res.data[x].NAME)
            res.data[x].UPLOADFLAG = true;
          }
          this.resData = res.data
          res.data.map(function (item) {
            this.$set(this.fileList, item.ID, [])
          }.bind(this));
          //查询文件ID lz记得
          findFilesById(id, typeId).then(res => {
            if (res.data) {
              for (let x in res.data) {
                this.$set(this.fileList, x, res.data[x])
              }
            } else {
              //新增
              this.add = true
            }
          })
        })

      },
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.list()
      },
       submit() {
        this.submitFlag = true;
        for (let x in this.fileList) {
          if (this.fileList[x].length == 0) {
            this.$alert('请上传完文件再提交', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.submitFlag = false
              }
            });
            return;
          }
        }
        if (this.add) {
          insertOrgBigtype(this.fileList, this.typeId).then(res => {
            this.submitUseIf(res)
          })
        } else {
          updateOrgBigtype(this.fileList, this.typeId).then(res => {
            this.submitUseIf(res)
          })
        }

      },
      submitUseIf(res) {
        //如果请求不成功则打开按钮限制
        if (!res.success) {
          this.submitFlag = false;
          this.$message.error("提交失败")
        } else {
          this.$message({
            message: "提交成功",
            type: 'success',
            onClose: function () {
              window.location.reload()
            }
          })
        }
      },
      fileLimit(fileType) {
        //当文件类型为excel时限制文件个数为1
        if (fileType == 2) {
          return 1
        }else{
          return this.limitNum
        }
      },
      HandleChooseFiles(refName) {
        const tis = this;
        tis.dialogVisible = true;
        this.$nextTick(() => {
          // 通过组件中设置的ref属性调取formView.vue中的fillData()方法加载弹窗内容
          this.$refs.treeView.initData(refName)
        })

      },
      fileListUpdate() {
        return this.fileList
      },
      recordUpLoadImgIdList(res) {
        //最终需要上传的id集合
        this.fileList[res.refName] = res.data
        if (this.fileList[res.refName].length != 0) {
          for (let x in this.resData) {
            if (this.resData[x].ID == res.refName) {
              this.resData[x].UPLOADFLAG = false;
            }
          }
        } else {
          for (let x in this.resData) {
            if (this.resData[x].ID == res.refName) {
              this.resData[x].UPLOADFLAG = true;
            }
          }
        }
      },
      getFileCount(res) {
        let fileType = this.decode(res.refName).split(",")[1];
        let tis = this;
        for (let x in res.fileName) {
          let fileName = res.fileName[x];
          tis.$set(tis.newFileName, fileName, fileType + new Date().getTime() + x + fileName.substring(fileName.lastIndexOf("."), fileName.length))
        }
      },
      goBack() {
        this.visible = false;
      },
      getUploadList(res) {
        let id = this.decode(res.refName).split(",")[0];
        res.data.forEach(function (item) {
          this.fileList[id].push(item)
        }.bind(this))
      }
    }

  }
</script>
<style>
  @import "../../../../assets/css/auditchanges.css";
</style>
