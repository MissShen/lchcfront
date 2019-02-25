<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tabs-panel">
      <span class="active">产品黄页</span>
    </div>
        <div class="tabs-panel">
        </div>
        <div class="tablebox">
          <div class="table-form">
            <el-form :inline="true" :model="formQuery" ref="formQuery" class="demo-form-inline">
              <div class="formrow">
                <span>
            <el-select v-model="formQuery.value" placeholder="品名" size="small" class="width-120">
                <el-option v-for="item in formQuery.category" :key="item.catlog" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
           </span>
                <span>
            <el-input v-model="formQuery.unit" placeholder="单位" size="small"></el-input>
           </span>
                <span>
            <el-select v-model="formQuery.value" placeholder="品名" size="small" class="width-120">
                <el-option v-for="item in formQuery.category" :key="item.catlog" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
           </span>
                <span>
            <el-input v-model="formQuery.unit" placeholder="单位" size="small"></el-input>
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
            <el-select v-model="formQuery.value" placeholder="品名" size="small" class="width-120">
                <el-option v-for="item in formQuery.category" :key="item.catlog" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
           </span>
                <span>
              <el-select v-model="formQuery.value" placeholder="使用状态" size="small" class="width-120">
                <el-option v-for="item in formQuery.category" :key="item.catlog" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </span>
                <span>
               <span>
            <el-input v-model="formQuery.unit" placeholder="单位" size="small"></el-input>
           </span>
            </span>
                <span>
              <span>
            <el-input v-model="formQuery.unit" placeholder="单位" size="small"></el-input>
           </span>
            </span>
                <span>
              <el-select v-model="formQuery.value" placeholder="审核人" size="small" class="width-120">
                <el-option v-for="item in formQuery.category" :key="item.catlog" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </span>

                <span>
    <span class="demonstration"></span>
    <el-date-picker
      v-model="value1"
      type="date"
      placeholder="最后一次审核时间--开始">
    </el-date-picker>
    <span class="demonstration"></span>
    <el-date-picker
      v-model="value1"
      type="date"
      placeholder="最后一次审核时间--结束">
    </el-date-picker>
            </span>
                <span>
              <el-select v-model="formQuery.value" placeholder="认证字段" size="small" class="width-120">
                <el-option v-for="item in formQuery.gender" :key="item.sex" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </span>
                <span>
              <el-select v-model="formQuery.value" placeholder="认证状态" size="small" class="width-120">
                <el-option v-for="item in formQuery.gender" :key="item.sex" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </span>
                <span>
              <el-select v-model="formQuery.value" placeholder="注册证类型" size="small" class="width-120">
                <el-option v-for="item in formQuery.gender" :key="item.sex" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </span>
                <!--<span>-->
                <!--<el-input v-model="formQuery.age" placeholder="年龄" size="small"class="width-80"></el-input>-->
                <!--</span>-->
                <!--<span>-->
                <!--<el-input v-model="formQuery.identity" placeholder="身份证号" size="small"></el-input>-->
                <!--</span>-->
                <!--<span>-->
                <!--<el-checkbox-group v-model="formQuery.type">-->
                <!--<el-checkbox label="1" name="type">复选框1</el-checkbox>-->
                <!--<el-checkbox label="2" name="type">复选框2</el-checkbox>-->
                <!--<el-checkbox label="3" name="type">复选框3</el-checkbox>-->
                <!--</el-checkbox-group>-->
                <!--</span>-->
                <!--<span>-->
                <!--<el-input v-model="formQuery.phone" placeholder="联系电话" size="small"></el-input>-->
                <!--</span>-->
                <!--<span>-->
                <!--<el-radio-group v-model="formQuery.resource">-->
                <!--<el-radio label="1">选项1</el-radio>-->
                <!--<el-radio label="2">选项2</el-radio>-->
                <!--</el-radio-group>-->
                <!--</span>-->
                <span>
              <el-date-picker type="date" placeholder="注册类型有效期--开始" size="small" v-model="formQuery.startDate" class="width-180" ></el-date-picker>

              <el-date-picker type="date" placeholder="注册类型有效期 --结束" size="small" v-model="formQuery.endDate" class="width-180" ></el-date-picker>
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
          <!--<div class="table-Btn">-->
          <!--<el-button type="primary" size="small ">新增</el-button>-->
          <!--<el-button size="small ">删除</el-button>-->
          <!--</div>-->
          <!-- 表格列表 -->
          <!--<div class="tableset">-->
          <!--<el-table ref="multipleTable" :default-sort = "{prop: 'name'}" :data="tableData3" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">-->
          <!--<el-table-column type="selection" width="55"></el-table-column>-->
          <!--<el-table-column label="序号" width="80">-->
          <!--<template slot-scope="scope" >{{ scope.row.date }}</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column prop="name" label="企业类型" sortable ></el-table-column>-->
          <!--<el-table-column prop="address" label="企业代码" show-overflow-tooltip sortable></el-table-column>-->
          <!--<el-table-column prop="address" label="企业名称" show-overflow-tooltip sortable></el-table-column>-->
          <!--<el-table-column prop="address" label="企业简介" show-overflow-tooltip sortable></el-table-column>-->
          <!--</el-table>-->
          <!--</div>-->
          <el-table
            :data="tableData5"
            style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="商品名称">
                    <span>{{ props.row.name }}</span>
                  </el-form-item>
                  <el-form-item label="所属店铺">
                    <span>{{ props.row.shop }}</span>
                  </el-form-item>
                  <el-form-item label="商品 ID">
                    <span>{{ props.row.id }}</span>
                  </el-form-item>
                  <el-form-item label="店铺 ID">
                    <span>{{ props.row.shopId }}</span>
                  </el-form-item>
                  <el-form-item label="商品分类">
                    <span>{{ props.row.category }}</span>
                  </el-form-item>
                  <el-form-item label="店铺地址">
                    <span>{{ props.row.address }}</span>
                  </el-form-item>
                  <el-form-item label="商品描述">
                    <span>{{ props.row.desc }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              label="序号"
              prop="id">
            </el-table-column>
            <el-table-column
              label="通用名"
              prop="name">
            </el-table-column>
            <el-table-column
              label="商品名"
              prop="desc">
            </el-table-column>
            <el-table-column
              label="剂型"
              prop="address">
            </el-table-column>
            <el-table-column
              label="规格"
              prop="shop">
            </el-table-column>
            <el-table-column
              label="单位"
              prop="category">
            </el-table-column>
            <el-table-column
              label="转换比"
              prop="shopId">
            </el-table-column>
            <el-table-column
              label="包材"
              prop="packag">
            </el-table-column>
            <el-table-column
              label="国家基药"
              prop="Country">
            </el-table-column>
            <el-table-column
              label="医保类型"
              prop="medical">
            </el-table-column>
            <el-table-column
              label="OTC药品"
              prop="otc">
            </el-table-column>
          </el-table>
        </div>
        <span>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
        </el-pagination>  </span>
  </div>
</template>
<script>
  //  import {query} from 'src/axios/management/authority/sysUser'
  export default {
    data() {
      return {
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        value1: '',
        value2: '',
        activeName: 'second',
        formQuery: this.metaQuery(),
        boxshow:false,
        boxhide:true,
        tableData5: [{
          id: '1',    /*  序号 */
          name: '头孢氨苄', /*  通用名 */
          desc: '银杏叶片(薄膜衣)',/*  商品名 */
          address: '糖衣片',/*  剂型 */
          shop: '0.125g',/*  规格 */
          category: '瓶',/*  单位 */
          shopId: '36' ,/*  转换比 */
          packag:"盒装",/*  包材 */
          Country:"是",/*  国家基药 */
          medical:"非国家基本医疗保险",/*  医保类型 */
          otc:"甲类OTC"/*  OTC药品 */
        }, {
          id: '2',    /*  序号 */
          name: '头孢氨苄', /*  通用名 */
          desc: '银杏叶片(薄膜衣)',/*  商品名 */
          address: '糖衣片',/*  剂型 */
          shop: '0.125g',/*  规格 */
          category: '瓶',/*  单位 */
          shopId: '36' ,/*  转换比 */
          packag:"盒装",/*  包材 */
          Country:"是",/*  国家基药 */
          medical:"非国家基本医疗保险",/*  医保类型 */
          otc:"甲类OTC"/*  OTC药品 */
        }, {
          id: '3',    /*  序号 */
          name: '头孢氨苄', /*  通用名 */
          desc: '银杏叶片(薄膜衣)',/*  商品名 */
          address: '糖衣片',/*  剂型 */
          shop: '0.125g',/*  规格 */
          category: '瓶',/*  单位 */
          shopId: '36' ,/*  转换比 */
          packag:"盒装",/*  包材 */
          Country:"是",/*  国家基药 */
          medical:"非国家基本医疗保险",/*  医保类型 */
          otc:"甲类OTC"/*  OTC药品 */
        }, {
          id: '4',    /*  序号 */
          name: '头孢氨苄', /*  通用名 */
          desc: '银杏叶片(薄膜衣)',/*  商品名 */
          address: '糖衣片',/*  剂型 */
          shop: '0.125g',/*  规格 */
          category: '瓶',/*  单位 */
          shopId: '36' ,/*  转换比 */
          packag:"盒装",/*  包材 */
          Country:"是",/*  国家基药 */
          medical:"非国家基本医疗保险",/*  医保类型 */
          otc:"甲类OTC"/*  OTC药品 */
        },
          {
            id: '5',    /*  序号 */
            name: '头孢氨苄', /*  通用名 */
            desc: '银杏叶片(薄膜衣)',/*  商品名 */
            address: '糖衣片',/*  剂型 */
            shop: '0.125g',/*  规格 */
            category: '瓶',/*  单位 */
            shopId: '36' ,/*  转换比 */
            packag:"盒装",/*  包材 */
            Country:"是",/*  国家基药 */
            medical:"非国家基本医疗保险",/*  医保类型 */
            otc:"甲类OTC"/*  OTC药品 */
          },
          {
            id: '6',    /*  序号 */
            name: '头孢氨苄', /*  通用名 */
            desc: '银杏叶片(薄膜衣)',/*  商品名 */
            address: '糖衣片',/*  剂型 */
            shop: '0.125g',/*  规格 */
            category: '瓶',/*  单位 */
            shopId: '36' ,/*  转换比 */
            packag:"盒装",/*  包材 */
            Country:"是",/*  国家基药 */
            medical:"非国家基本医疗保险",/*  医保类型 */
            otc:"甲类OTC"/*  OTC药品 */
          },
          {
            id: '7',    /*  序号 */
            name: '头孢氨苄', /*  通用名 */
            desc: '银杏叶片(薄膜衣)',/*  商品名 */
            address: '糖衣片',/*  剂型 */
            shop: '0.125g',/*  规格 */
            category: '瓶',/*  单位 */
            shopId: '36' ,/*  转换比 */
            packag:"盒装",/*  包材 */
            Country:"是",/*  国家基药 */
            medical:"非国家基本医疗保险",/*  医保类型 */
            otc:"甲类OTC"/*  OTC药品 */
          },
          {
            id: '8',    /*  序号 */
            name: '头孢氨苄', /*  通用名 */
            desc: '银杏叶片(薄膜衣)',/*  商品名 */
            address: '糖衣片',/*  剂型 */
            shop: '0.125g',/*  规格 */
            category: '瓶',/*  单位 */
            shopId: '36' ,/*  转换比 */
            packag:"盒装",/*  包材 */
            Country:"是",/*  国家基药 */
            medical:"非国家基本医疗保险",/*  医保类型 */
            otc:"甲类OTC"/*  OTC药品 */
          },
          {
            id: '9',    /*  序号 */
            name: '头孢氨苄', /*  通用名 */
            desc: '银杏叶片(薄膜衣)',/*  商品名 */
            address: '糖衣片',/*  剂型 */
            shop: '0.125g',/*  规格 */
            category: '瓶',/*  单位 */
            shopId: '36' ,/*  转换比 */
            packag:"盒装",/*  包材 */
            Country:"是",/*  国家基药 */
            medical:"非国家基本医疗保险",/*  医保类型 */
            otc:"甲类OTC"/*  OTC药品 */
          },
          {
            id: '10',    /*  序号 */
            name: '头孢氨苄', /*  通用名 */
            desc: '银杏叶片(薄膜衣)',/*  商品名 */
            address: '糖衣片',/*  剂型 */
            shop: '0.125g',/*  规格 */
            category: '瓶',/*  单位 */
            shopId: '36' ,/*  转换比 */
            packag:"盒装",/*  包材 */
            Country:"是",/*  国家基药 */
            medical:"非国家基本医疗保险",/*  医保类型 */
            otc:"甲类OTC"/*  OTC药品 */
          }
        ],
//        tableData3: [{
//          date: '1',
//          name: '王小虎',
//          address: '上海市普陀区金沙江路 1518 弄'
//        }, {
//          date: '2',
//          name: '王小虎',
//          address: '上海市普陀区金沙江路 1518 弄'
//        }, {
//          date: '3',
//          name: '王小虎',
//          address: '上海市普陀区金沙江路 1518 弄'
//        }, {
//          date: '4',
//          name: '王小虎',
//          address: '上海市普陀区金沙江路 1518 弄'
//        }, {
//          date: '5',
//          name: '王小虎',
//          address: '上海市普陀区金沙江路 1518 弄'
//        }, {
//          date: '6',
//          name: '王小虎',
//          address: '上海市普陀区金沙江路 1518 弄'
//        }, {
//          date: '7',
//          name: '王小虎',
//          address: '上海市普陀区金沙江路 1518 弄'
//        }],
        multipleSelection: [],

      }
    },
    methods:{
      handleClick(tab, event) {
        console.log(tab, event);
      },
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
<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
