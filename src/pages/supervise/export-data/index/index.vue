<template>
  <div class="mainbox">
    <ul>
      <dl class="infobox smaller">
        <dt><span>数据导出</span></dt>
        <dd>
          <div class="s-form">
            <el-select v-model="queryData.dataType.projectName" placeholder="项目名称">
               <el-option v-for="item in options" :key="item.value" :label="item.label"
                          :value="item.value"></el-option>
            </el-select>
             <el-select v-model="queryData.dataType.requestType" placeholder="采购类型">
               <el-option v-for="item in options" :key="item.value" :label="item.label"
                          :value="item.value"></el-option>
             </el-select>
            <el-select v-model="queryData.dataType.location" placeholder="所在区域">
               <el-option v-for="item in options" :key="item.value" :label="item.label"
                          :value="item.value"></el-option>
            </el-select>
            <span class="date-group"><el-date-picker
              v-model="queryData.dataType.date"
              type="date"
              placeholder="选择日期">
            </el-date-picker></span>
          </div>
        </dd>
        <dt><span>药品</span></dt>
        <dd>
          <div class="s-form">
            <el-input v-model="queryData.medical.bigClassfication" placeholder="药品大分类"></el-input>
            <el-input v-model="queryData.medical.smallClassfication" placeholder="药品小分类"></el-input>
            <el-input v-model="queryData.medical.factory" placeholder="生产企业"></el-input>
            <el-input v-model="queryData.medical.name" placeholder="药品名称"></el-input>
            <el-input v-model="queryData.medical.dosage" placeholder="剂型"></el-input>
            <el-input v-model="queryData.medical.packingMaterials" placeholder="包材"></el-input>
            <el-input v-model="queryData.medical.genericName" placeholder="通用名称"></el-input>
            <el-input v-model="queryData.medical.spec" placeholder="规格"></el-input>
            <el-select v-model="queryData.medical.catalog" placeholder="所属目录">
               <el-option v-for="item in options" :key="item.value" :label="item.label"
                          :value="item.value"></el-option>
            </el-select>
            <el-select v-model="queryData.medical.basicFlag" placeholder="基药标识">
             <el-option v-for="item in options" :key="item.value" :label="item.label"
                        :value="item.value"></el-option>
            </el-select>
          </div>
        </dd>
        <dt><span>医疗机构</span></dt>
        <dd>
          <div class="s-form">
            <el-input v-model="queryData.hospital.name" placeholder="机构名称"></el-input>
            <el-input v-model="queryData.hospital.kind" placeholder="医院性质"></el-input>
            <el-input v-model="queryData.hospital.level" placeholder="医院级别"></el-input>
          </div>
        </dd>
        <dt><span>采购数据</span></dt>
        <dd>
          <div class="s-form">
            <el-checkbox-group v-model="downloadColumns">
              <el-checkbox label="订购金额"></el-checkbox>
              <el-checkbox label="到货金额"></el-checkbox>
              <el-checkbox label="订购数量"></el-checkbox>
              <el-checkbox label="到货数量"></el-checkbox>
              <el-checkbox label="订单数量"></el-checkbox>
            </el-checkbox-group>
          </div>
        </dd>
        <dd>
          <div class="info-detail">
            <span class="s-form">
              <el-button @click="exportFile">导出</el-button>
              <el-button @click="reset">重置</el-button>
            </span>
          </div>
        </dd>
      </dl>
    </ul>
  </div>
</template>

<script>

  export default {
    name: "index",
    data() {
      return {
        options: [
          {
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }
        ],
        queryData: this.metaQueryData(),
        downloadColumns: this.metaDownLoadColumns()
      }
    },
    methods: {
      metaQueryData() {
        return {
          dataType: {
            projectName: '',
            requestType: '',
            location: '',
            date: ''
          },
          medical: {
            bigClassfication: '',
            smallClassfication: '',
            factory: '',
            name: '',
            dosage: '',
            packingMaterials: '',
            genericName: '',
            spec: '',
            catalog: '',
            basicFlag: '',
          },
          hospital: {
            name: '',
            kind: '',
            level: '',
          },
        }
      },
      metaDownLoadColumns() {
        return ['订购金额']
      },
      reset() {
        this.queryData = this.metaQueryData();
        this.downloadColumns = this.metaDownLoadColumns();
      },
      exportFile() {
        this.queryData = this.metaQueryData();
        this.downloadColumns = this.metaDownLoadColumns();
      }
    }
  }
</script>
