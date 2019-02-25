<template>
  <!--表格-->
  <div class="tablebox">
    <!--表格列表-->
    <div class="tableset ">
      <el-table
        :data="tableData"
        border
        stripe>
        <el-table-column   type="index" label="序号"width="50" align="center" header-align="center">


        </el-table-column>

        <el-table-column  label="审核员姓名" prop="name"   align="center" header-align="center">

        </el-table-column>

        <el-table-column label="已分配数量" prop="date"  align="center" header-align="center">

        </el-table-column>

        <el-table-column label="分配数量"  prop="address"  align="center" header-align="center" >
          <template slot-scope="scope">
            <el-input class="width-80" v-model="scope.row.address"  @change="change" size="small" placeholder="请输入内容"></el-input>
          </template>

        </el-table-column>
        <el-table-column  label="测试"  prop="tableinput"  align="center" header-align="center">
          <template slot-scope="scope">{{scope.row.address}}</template>
        </el-table-column>
        <el-table-column  label="分配"  prop="ress"  align="center" header-align="center" v-if="shou" >

        </el-table-column>

      </el-table>
      <div class="padding10">
       <span >已分配总数量：{{tableDatas}}<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;未分配数量:</span>{{datas}}</span>
        &nbsp;&nbsp;&nbsp;<span>分配数量:{{tableadd}}</span>
        <br>
        <span>分配数量输入总和不能大于未分配数量，否则不能保存
       <el-button type="text" @click="dialogTableVisible = true">&nbsp;&nbsp;&nbsp;
         <span >
           <el-button size="small">新增审核员</el-button>
         </span>

       </el-button>
     <span>
           <el-button @click="clickbutton" type="primary" size="small">保存</el-button>
         </span>
     </span>
      </div>
      <el-dialog :close-on-click-modal="false" title="一审" :visible.sync="dialogTableVisible">

        <form action="">
          <el-table class="eltable"
            :data="tableData"
            border
            stripe>
            <el-table-column
              type="selection" label="序号"width="40" align="right" prop="content" >
            </el-table-column>
            <el-table-column label="审核员姓名" prop="tabsname"  align="left" >
            </el-table-column>
          </el-table>
          <div class="padding10">
           <span >
           <el-button  type="primary" size="small" @click="addbutton">保存</el-button>
         </span>
          </div>
          <!--<button @click="addbutton">保存</button>-->
        </form>
      </el-dialog>

    </div>
  </div>
</template>
<script>
  import axios from "axios"
  export default {
    data(){
      return {
        username:"",
        content:"",
        shou:false,
        checked: true,
        tableData: [{
          inputtabs:true,
          tabsname:"李四",
          name: '张三',
          date: 30,
          //分配数量
          address: "",
          //总的分配数量的值
          ress:100,
        },
        ],
        activeName: 'second',
        dialogTableVisible: false,
        dialogFormVisible: false,
      }},

    computed:{
      //计算tableData.date的和 已分配数量
      tableDatas() {
        return this.tableData.map(row=>row.date).reduce((acc,cur)=>(cur+acc),0)
      },
      //计算未分配数量的和
      datas(){
        return this.tableData.map(row=>row.ress-this.tableDatas).reduce((acc,cur)=>(cur-acc),0)
      },
      //计算分配数量和
      tableadd() {
        return this.tableData.map(row=>row.address).reduce((acc,cur)=>(cur+acc),)
      },
    },
    //发送axios请求交互
//    mounted(){
//      const url ="http://rapapi.org/mockjsdata/32702/192.2.27.153:8080/sss";
//      axios.get(url).then(response=>{
//        console.log(response.data);
//        //获取数据
//        const resule=response.data;
//        //        const repo=resule.items[0];
//        this.tableData[0].name=resule.message;
//        this.tableData[0].date=resule.code;
//        this.tableData[0].address=resule.code;
////        this.tableData[0].ress=resule.code;
//
//        //更新状态(请求成功)
//      }).catch(error=>{
//        //更新状态(请求失败的)
//        console.log("请求失败")
//      })
//      //求
//    },
    methods:{
      //处理tab页面保存增加
      addtab(name){
        this.tableData.unshift(name)
      },
      addbutton(){
        const content=this.content
        const username = this.username
//        if (username||content){
//          alert("heh ")
//          return
//        }

        const table={
          username,
          content
        }
        //添加
        this.addtab(table)
        //处理清空
        this.username="";
        this.content=""
      },
      //判断分配数量输入总和不能大于未分配数量，否则不能保存
      clickbutton:function () {
//        console.log(this.tableadd)
        if (this.tableadd < this.datas){
//          console.log(this.tableadd)
          alert("可以保存")
        }else {
          alert("不能保存")
        }

      }
    }
  }
</script>
<style>

</style>
