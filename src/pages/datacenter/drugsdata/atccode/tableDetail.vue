<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!--<ul class="tabs-panel">-->
      <!--<li class="active">查看ATC分类信息</li>-->
    <!--</ul>-->

    <div class="tablebox">
      <div>
        <el-form :model="form" ref="form" :rules="rules" label-position="left" label-width="170px" class="demo-ruleForm"
                 size="small">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="ATC编码：">
                <span>{{form.code}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="ATC解剖学分类：">
                <span>{{form.anatomySortName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="ATC治疗学分类：">
                <span>{{form.therapeuticsSortName}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="ATC药理学分类：">
                <span>{{form.pharmacologySortName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="ATC化学分类：">
                <span>{{form.chemistrySortName}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="ATC中文名称：" prop="nameChn">
                <span>{{form.nameChn}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="ATC英文名称：">
                <span>{{form.nameEng}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="医院药品实用编码：">
                <span>{{form.utilityCode}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="DDD：">
                <span>{{form.ddd}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="给药途径：">
                <span>{{form.useMethod}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="中国药典：">
                <span v-if="form.codexChina == 1">收载</span>
                <span v-else>未收载</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="美国药典：">
                <span v-if="form.codexUsa == 1">收载</span>
                <span v-else>未收载</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="英国药典：">
                <span v-if="form.codexEngland == 1">收载</span>
                <span v-else>未收载</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="欧洲药典：">
                <span v-if="form.codexEurope == 1">收载</span>
                <span v-else>未收载</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="日本药局方：">
                <span v-if="form.codexJapan == 1">收载</span>
                <span v-else>未收载</span>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="临时编码：">
                <span v-if="form.tempCode == 1">是</span>
                <span v-else>否</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="自主编码：">
                <span v-if="form.myCode == 1">是</span>
                <span v-else>否</span>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="优先级别：">
                <span v-if="form.priorityLevel == 1">是</span>
                <span v-else>否</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注：">
                <span>{{form.remark}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="关联8位药品：">
                <span>已关联{{form.drugNum8 == ''?'0':form.drugNum8}}种药品</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="关联剂型：">
                <span>已关联{{form.doseageNum == ''?'0':form.doseageNum}}种剂型</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="已关联药品：">
                <span>已关联{{form.drugNum20 == ''?'0':form.drugNum20}}种药品</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="创建人：">
                <span>{{form.createUsername}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="创建时间：">
                <span>{{form.createDate | capitalize}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="最后修改人：">
                <span>{{form.lastUpdateUsername}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="最后修改时间：">
                <span>{{form.lastUpdateDate | capitalize}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="foot-btn">
        <div class="foot-left">
          <el-button size="small" @click="goBack()">返回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ElCol from "element-ui/packages/col/src/col";
  import moment from 'moment';
  import {findCatAtcById} from 'src/axios/datacenter/basedata/catatccategory/catatclist';

  export default {
    components: {
      ElCol},
    data() {
      return {
        form: {
          code:'',
          compoundSort:'',
          anatomySortCode: '',
          therapeuticsSortCode: '',
          pharmacologySortCode: '',
          chemistrySortCode: '',
          anatomySortName: '',
          therapeuticsSortName: '',
          pharmacologySortName: '',
          chemistrySortName: '',
          anatomySort: '',
          therapeuticsSort: '',
          pharmacologySort: '',
          chemistrySort: '',
          nameChn:'',
          nameEng:'',
          remark:'',
          tempCode:'',
          codexJapan:'',
          codexEurope:'',
          codexEngland:'',
          codexUsa:'',
          codexChina:'',
          useMethod:'',
          utilityCode:'',
          ddd:'',
          priorityLevel:'',
          myCode:'',
          drugNum8:'',
          drugNum20:'',
          doseageNum:'',
          createUsername:'',
          createDate:'',
          lastUpdateUsername:'',
          lastUpdateDate:''
        },

      }
    },
    created(){
      this.id = this.$route.params.id || undefined;
      if (this.id) {
        findCatAtcById(this.id).then(res => {
          this.form = res.data;
        })
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
    },
    filters:{
      capitalize(date){
        if(date == null || date == undefined || date == ""){
          return "";
        }
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
      }
    }
  }
</script>

