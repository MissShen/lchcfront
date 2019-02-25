<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tabs-panel">
      <span class="active">选择专家</span>
    </div>
    <div class="tablebox">
      <div class="table-form">
        <el-form :inline="true" :model="formQuery" ref="formQuery" class="demo-form-inline">
          <div class="formrow">
            <span>
              <el-input v-model="formQuery.userName" placeholder="姓名" size="small"></el-input>
            </span>
            <span>
              <el-input v-model="formQuery.realName" placeholder="单位" size="small"></el-input>
            </span>
            <span>
              <el-checkbox-group v-model="formQuery.type">
                <el-checkbox label="1" name="type">评标专家</el-checkbox>
                <el-checkbox label="2" name="type">议价专家</el-checkbox>
              </el-checkbox-group>
            </span>
            <span>
            <el-button type="warning" size="small" v-show="boxhide">查询</el-button>
          </span>
            <span>
            <el-button size="small"  v-show="boxhide">重置</el-button>
          </span>
            <span>
            <el-button size="small" @click="spread"  v-show="boxhide">更多<i class="el-icon-arrow-down"></i></el-button>
          </span>
          </div>
          <div class="formrow" v-show="boxshow">
            <span>
              <el-input v-model="formQuery.subject" placeholder="学科" size="small"></el-input>
            </span>
            <span>
              <el-select v-model="formQuery.value" placeholder="类别" size="small" class="width-120">
                <el-option v-for="item in formQuery.category" :key="item.catlog" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </span>
            <span>
              <el-select v-model="formQuery.value" placeholder="性别" size="small" class="width-80">
                <el-option v-for="item in formQuery.gender" :key="item.sex" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </span>
            <span>
              <el-input v-model="formQuery.identity" placeholder="身份证号" size="small"></el-input>
            </span>
            <span>
              <el-input v-model="formQuery.phone" placeholder="联系电话" size="small"></el-input>
            </span>
            <span>
              <el-input v-model="formQuery.email" placeholder="邮箱" size="small"></el-input>
            </span>
            <span>
              <el-button type="warning" size="small" >查询</el-button>
            </span>
            <span>
              <el-button size="small">重置</el-button>
            </span>
            <span>
            <el-button size="small" @click="packup" >收起<i class="el-icon-arrow-up"></i></el-button>
          </span>
          </div>
        </el-form>
      </div>
      <div class="table-Btn">
        <el-button type="primary" size="small ">手动添加</el-button>
        <el-button type="primary" size="small ">自动抽取</el-button>
      </div>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table ref="multipleTable" :default-sort = "{prop: 'name'}" :data="tableData3" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="序号" width="80">
            <template slot-scope="scope" >{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="name" label="用户名" sortable ></el-table-column>
          <el-table-column prop="address" label="姓名" show-overflow-tooltip sortable></el-table-column>
          <el-table-column prop="address" label="单位" show-overflow-tooltip sortable></el-table-column>
          <el-table-column prop="address" label="学科" show-overflow-tooltip sortable></el-table-column>
          <el-table-column prop="address" label="类别" show-overflow-tooltip sortable></el-table-column>
          <el-table-column prop="address" label="性别" show-overflow-tooltip sortable></el-table-column>
          <el-table-column prop="address" label="年龄" show-overflow-tooltip sortable></el-table-column>
          <el-table-column prop="address" label="身份证号" show-overflow-tooltip sortable></el-table-column>
          <el-table-column prop="address" label="联系电话" show-overflow-tooltip sortable></el-table-column>
          <el-table-column prop="address" label="邮箱" show-overflow-tooltip sortable></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
  import {query} from 'src/axios/management/authority/sysUser'
  export default {
    data() {
      return {
        formQuery: this.metaQuery(),
        boxshow:false,
        boxhide:true,
        tableData3: [{
          date: '1',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '3',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '4',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '5',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '6',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '7',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: [],

      }
    },
    methods:{
      metaQuery () {
        return {
          userName:'',
          realName:'',
          age:'',
          identity:'',
          phone:'',
          unit:'',
          subject:'',
          category:[{
            value: '选项1',
            label: '药学'
          },{
            value: '选项2',
            label: '医学'
          },{
            value: '选项3',
            label: '管理学'
          }],
          gender:[{
            value: '选项1',
            label: '男'
          },
            {
              value: '选项2',
              label: '女'
            }
          ],
          value:'',
          resource:'1',
          startDate:'',
          endDate:'',
          checkList: [],
          type:[]
        }
      },
      spread:function(){
        this.boxshow = true;
        this.boxhide=false;
      },
      packup:function(){
        this.boxshow = false;
        this.boxhide=true;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }
</script>

