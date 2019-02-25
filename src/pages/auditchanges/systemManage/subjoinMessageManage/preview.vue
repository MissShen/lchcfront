<template>
  <div class="tablebox">
    <div class="table-form">
      <el-form ref="query" :model="query" label-position="left" size="small" :inline="true" class="table-form">
          <el-form-item>
            <el-select v-model="query.projectId" placeholder="选择项目" size="small">
              <el-option
                v-for="item in proList"
                :key="item.ID"
                :label="item.PROJECT_NAME"
                :value="item.ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="query.attachedType" placeholder="信息类型" size="small">
              <el-option
                label="企业"
                value="1">
              </el-option>
              <el-option
                label="产品"
                value="2">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getMessage" size="small">预览</el-button>
            <el-button @click="goBack" size="small">返回</el-button>
          </el-form-item>
      </el-form>
    </div>
    <div class="table-form">
      <el-form label-position="left" size="small" class="preview-wrapper">
        <div class="audit-border-bottom" v-for="(name,index) in resData" :key="index">
          <el-row :gutter="24">
            <el-col :span="4">
              <el-form-item>
                {{name.dicName}}
              </el-form-item>
            </el-col>
            <el-col :span="19">
              <div v-for="(name1,i) in name.catAttachedDictionaryDomains" :key="i">
                <el-row :gutter="24">
                  <el-col :span="4">
                    <el-form-item v-if="name1.fieldType == 1">
                      <el-input placeholder="请输入"/>
                    </el-form-item>
                    <el-form-item v-if="name1.fieldType == 2">
                      <el-input type="textarea" placeholder="请输入"/>
                    </el-form-item>
                    <el-form-item v-if="name1.fieldType == 3">
                      <el-date-picker type="date" placeholder="选择日期"/>
                    </el-form-item>
                    <el-form-item v-if="name1.fieldType == 4">
                      <el-select :key="index">
                        <el-option
                          v-for="item in name1.catAttachedDictionaryOptions"
                          :key="item.id"
                          :label="item.text"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <!--<el-form-item v-if="name1.fieldType == 5"-->
                    <!--v-for="(option,index) in name1.catAttachedDictionaryOptions" :key="index">-->
                    <!--<el-checkbox v-model="option.value" :label="option.text">{{option.checkedFlag}}</el-checkbox>-->
                    <!--</el-form-item>-->

                    <el-form-item v-if="name1.fieldType == 5">
                      <el-checkbox-group >
                        <el-checkbox v-for="(option,index) in name1.catAttachedDictionaryOptions" :label="option.value"
                                     :key="index" class="checkbox2-nomar">{{option.text}}
                        </el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>

                    <el-form-item v-if="name1.fieldType == 6">
                      <el-radio-group >
                        <el-radio v-for="(option,index) in name1.catAttachedDictionaryOptions" :label="option.value"
                                  :key="index">{{option.text}}
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple ">
                      <el-form-item>
                        <span class="audit-item font-size12">{{name1.remark}}</span>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="5" style="text-align: center">
                    <div class="grid-content bg-purple-light" v-if="name1.hasImageFlag==1">
                      <el-form-item>
                        <el-upload
                          class="upload-demo"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :on-preview="handlePreview"
                          :on-remove="handleRemove"
                          multiple
                          :limit="3"
                          :file-list="fileList">
                          <el-button size="small" type="">点击上传</el-button>
                          <div><span class="audit-item font-size12">{{name1.fileTypeName}}</span></div>
                        </el-upload>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="7" style="text-align: center">
                    <div class="grid-content bg-purple">
                      <el-form-item class="font-size12 audit-item ">
                        <el-button class="audit-item font-size12" type="text" href="name1.tipUrl">{{name1.tipText}}</el-button>
                      </el-form-item>
                    </div>
                  </el-col>

                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {getProjectSubjoinMessage, proList} from "src/axios/auditchanges/systemManage/subjoinMessageManage"

  export default {

    name: "preview",
    data() {
      return {
        fileList: undefined,
        query: this.metaQuery(),
        resData: this.metaData(),
        proList: [],
        // messageList: []
      }
    },
    created() {
      //初始化页面
      this.list()
    },
    methods: {
      //预览
      getMessage() {
        getProjectSubjoinMessage(this.query).then(res => {
          console.log(res);
          this.resData = res.data;
          console.log(this.resData)
        })
      },
      //当前页列表
      list() {
        proList().then(res => {
          this.proList = res.data
        })
      },
      metaQuery() {
        return {
          projectId: '',
          attachedType: '',
        }
      },
      metaData() {
        return {
          messageList: []
        }
      },
      //移除文件时触发
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      //点击已上传文件时触发
      handlePreview(file) {
        console.log(file);
      },
      //返回
      goBack() {
        this.$router.go(-1)
      }
    }
  }
</script>
