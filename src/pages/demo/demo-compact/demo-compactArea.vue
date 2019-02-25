<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tabs-panel">
      <span class="active">添加区域</span>
    </div>
    <div class="tablebox">
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
        <div class="cities-box">
          <label class="cities-title">
            <el-checkbox v-model="citiesAll">全选</el-checkbox>
          </label>
          <ul>
            <li v-for="item in cities" :key="item.id">
              <input type="checkbox" :id="item.id" v-model="selected" :value="item.id" class="regular-checkbox"/>
              <label :for="item.id">
                <span>{{ item.nameChn }}</span>
                <i></i>
              </label>
            </li>
          </ul>
        </div>
        <div class="areas-box" v-for="(item,index) in regions" :key="item.name">
          <label class="cities-title">
            <el-checkbox :v-model="cityAll+index">{{item.name}}</el-checkbox>
          </label>
          <div class="citys-con">
            <el-checkbox-group v-model="regionsValue" @change="yaosi(index)">
              <el-checkbox v-for="items in item.list" :id="items.id" :value="items.id" :label="items.id"
                           :key="items.id">{{items.nameChn}}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="area-Btn">
          <el-button type="primary" size="small" @click="handleForm">保存</el-button>
          <el-button size="small">返回</el-button>
        </div>
      </div>
    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>
/*  import { findByParentId, findByParentIds } from 'src/axios/contract/sender/sendRegion'*/

  export default {
    data: function () {
      return {
        query: this.metaQuery(), // 查询初始化
        options: [{
          value: '选项1',
          label: '北京'
        }, {
          value: '选项2',
          label: '天津'
        }, {
          value: '选项3',
          label: '河北省'
        }, {
          value: '选项4',
          label: '山西省'
        }],
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
      findByParentId('FR20T0000010000000050000').then(res => {
        this.query.district = res.data[0].id
        this.districts = res.data
        this.queryCities()
      })
    },
    watch:{
      item(val) {
        console.log(val,'aaaaaaaa')
        this.index=val
      }
    },
    computed: {
      citiesAll: {
        get: function () {//因为在set方法中改变了全局变量selected，所以get方法会被调用
          findByParentIds(this.selected).then(res => {
            this.regions = res.data
            console.log(res.data,'data')
            console.log(res.data,'xxxxxxxxxx')
          })
          return this.cities ? this.selected.length == this.cities.length : false
        },
        set: function (value) {//点击checkbox会自动调用set方法
          var selected = []
          if (value) {
            this.cities.forEach(function (user) {
              selected.push(user.id)
            })
          }
          this.selected = selected
        }
      },
      cityAll: {
        get: function () {//因为在set方法中改变了全局变量regionsValue，所以get方法会被调用
          console.log('a');
          return this.regions[this.item].list ? this.regionsValue.length == this.regions[this.index].list.length : false
        },
        set: function (value) {//点击checkbox会自动调用set方法
          console.log('b');
          var regionsValue = []
          if (value) {
            let data=this.regions[this.index].list;
            data.forEach(region=> {
              if(region.nameChn==='太原市' ){
                console.log("aaaaaaasssssssssssssssss")
              }
              regionsValue.push(region.id)
            })
          }
          this.regionsValue = regionsValue
        }
      }
    },
    methods: {
      metaQuery () {
        return {
          district: undefined,
          city: undefined,
          region: undefined,
          paramIds: []
        }
      },
      queryCities () {
        findByParentId(this.query.district).then(res => {
          this.cities = res.data
          this.query.city = this.cities[0].id
          this.selected = []
        })

      },
      yaosi (item) {
        console.log(item,'aaaaa')
        this.item = item
      },
      handleForm(){
        console.log(this.regionsValue,'value')
      },
      checkAllCities(len){
        console.log(len);
        for(var i=0; i<len; i++){

        }
      }

    }

  }
</script>


<style>
  @import "../../../assets/css/compact.css";
</style>

