<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tablebox">
      <!--一级菜单-->
      <div class="table-form">
        <div class="formrow">
            <span>
              <el-select v-model="query.district" placeholder="请选择" size="small" @change="queryCities()">
                <el-option
                  v-for="item in districts"
                  :key="item.id"
                  :label="item.nameChn"
                  :value="item.id">
                </el-option>
              </el-select>
            </span>
        </div>
      </div>
      <div class="tableset">
        <!--二级菜单-->
        <div class="cities-box">
          <label class="cities-title">
            <el-checkbox v-model="citiesAll" >全选</el-checkbox>
          </label>
          <ul>
            <li v-for="item in cities" :key="item.id">
              <input type="checkbox" checke="true" :id="item.id" v-model="selected" :value="item.id" class="regular-checkbox"/>
              <label :for="item.id">
                <span>{{ item.nameChn }}</span>
                <i></i>
              </label>
            </li>
          </ul>
        </div>
        <!--三级菜单-->
        <div class="areas-box" v-for="(item,index) in regions" :key="item.name">
          <label class="cities-title" >
            <checkboxComponent :secondlist = "item" :index = "index" v-on:subchanged = "subData($event)"></checkboxComponent>
          </label>
        </div>
      </div>
    </div>
    <div class="foot-btn">
      <div class="foot-left">
        <el-button type="primary" size="small" @click="handleForm">保存</el-button>
        <el-button size="small" @click="returnBack()">返回</el-button>
      </div>
    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>
  import { findByParentId, findByParentIds,updateRegion } from 'src/axios/contract/sender/sendRegion';
  import checkboxComponent from 'src/pages/contract/sender/sendRegionList/checkboxComponent';
  export default {
    components: {
      checkboxComponent
    },
    data: function () {
      return {
        query: this.metaQuery(), // 查询初始化
        value: '',
        selected: [],
        regionsValue: [],
        districts: [],
        cities: [],
        regions: [],
        item: 0,
        index:0
      }
    },
    created () {
      //初始化进来查询省
      findByParentId('FR20T0000010000000050000').then(res => {
        //this.query.district = res.data[0].id
        //默认选中北京市
        const data = res.data;
        for(let i = 0; i < data.length; i++) {
          if(data[i].nameChn === "北京"){
            this.query.district = data[i].id
          }
        }
        this.districts = res.data
        this.queryCities()
      })
    },
    computed: {
      citiesAll: {
        get: function () {//因为在set方法中改变了全局变量selected，所以get方法会被调用
          console.log("----------------------调用了get 方法----------------------------");
          //查询区县的集合
          findByParentIds(this.selected).then(res => {
            this.regions = res.data
          })
          return this.cities ? (this.selected.length == this.cities.length) : false
        },
        set: function (value) {//点击checkbox会自动调用set方法
          var selected = []
          if (value) {
            this.cities.forEach(function (user) {
              selected.push(user.id)
            })
          }
          console.log("----------------------调用了set 方法----------------------------");
          this.selected = selected
        }
      },
    },
    methods: {
      //数据初始化--------------begin---------------------
        metaQuery () {
          return {
            district: undefined,
            // city: undefined,
            region: undefined,
            paramIds: []
          }
        },
      //数据初始化--------------end---------------------



      //------------1.查询省下的市---------------------------------------
      queryCities () {
        findByParentId(this.query.district).then(res => {
          this.cities = res.data
         // this.query.city = this.cities[0].id
          let selected = [];
          for(let i = 0;i<res.data.length;i++){
            if(res.data[i].cityChecked>0){
              selected.push(res.data[i].id);
            }
          }
          this.selected = selected;
        })

      },
      //----------2.子组件勾选了以后把父组件的数据更新  为了保存的时候拿到数据
      subData(data){
        console.log(data);
        //先把当前市的所有的选中项设置为不选中
        const index = data.index;
        for(let i=0;i<this.regions[index].list.length;i++){
          this.regions[index].list[i].regionChecked = 0;
        }


        const checkeds = data.checkeds;
        for(let i=0;i<this.regions[index].list.length;i++){
          for(let j = 0;j<checkeds.length;j++){
            if(this.regions[index].list[i].id == checkeds[j]){
              this.regions[index].list[i].regionChecked = 1;
            }
          }
        }
      },
      //-----------3. 保存
      handleForm(){
        console.log(this.query.district);
        const regions = this.regions;
        //选中的区县ID
        let checkedRegionId = [];
        let  checkedRegionName = [];
        for(let i=0;i<regions.length;i++){
          for(let j=0;j<regions[i].list.length;j++){
            console.log(regions[i].list[j].regionChecked)
            if(regions[i].list[j].regionChecked>0){
              checkedRegionId.push(regions[i].list[j].id);
              checkedRegionName.push(regions[i].list[j].nameChn)
            }
          }
        }
        updateRegion(this.query.district,checkedRegionId).then(res=>{
          if(res.data>0){
            this.$message({
              message: "保存成功",
              type: "success"
            })
          }
        });
      },
      //------------4.返回
      returnBack(){
        this.$router.push("/CONTRACT/contractmanagement/manageSendRegionList");
      }
    }

  }
</script>


<style>
  @import "../../../../assets/css/compact.css";
</style>

