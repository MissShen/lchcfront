<template>
  <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="产品基础信息" name="first">
      <div>
        <el-table
          :data="resData"
          :show-header="headVisable"
          style="width: 100%">
          <el-table-column label="产品信息">
            <template slot-scope="scope">
              <div class="tb-from">
                <el-row :span="24">
                  <el-col :span="12">
                    <p>商品名：{{scope.row.tradeName }}</p>
                  </el-col>
                  <el-col :span="12">
                    <p >剂型：{{scope.row.doseageFormName }}</p>
                  </el-col>
                </el-row>
                <el-row :span="24">
                  <el-col :span="12">
                    <p>规格：{{scope.row.spec }}</p>
                  </el-col>
                  <el-col :span="12">
                    <p >转换比：{{scope.row.standRate}}</p>
                  </el-col>
                </el-row>
                <el-row :span="24">
                  <el-col :span="12">
                    <p>最小使用单位：{{scope.row.smallestUnits}}</p>
                  </el-col>
                  <el-col :span="12">
                    <p >最小包装单位：{{scope.row.specUnit}}</p>
                  </el-col>
                </el-row>
                <el-row :span="24">
                  <el-col :span="12">
                    <p>包材：{{scope.row.wrapName}}</p>
                  </el-col>
                  <el-col :span="12">
                    <p >生产企业：{{scope.row.manufactureName}}</p>
                  </el-col>
                </el-row>
                <el-row :span="24">
                  <el-col :span="12">
                    <p>产品来源：{{scope.row.productSource}}</p>
                  </el-col>
                  <el-col :span="12">
                    <p >批准文号：{{scope.row.permitNumber}}</p>
                  </el-col>
                </el-row>
                <el-row :span="24">
                  <el-col :span="12">
                    <p>GMP证书编号：{{scope.row.gmpNumber}}</p>
                  </el-col>
                  <el-col :span="12">
                    <p >目录范围：{{scope.row.catalogArea}}</p>
                  </el-col>
                </el-row>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-tab-pane>
    <el-tab-pane label="说明书信息" name="second">
      <div>
        <el-table
          :data="resData"
          :show-header="headVisable"
          style="width: 100%">
          <el-table-column prop="drugStorage" label="产品信息">
            <template slot-scope="scope">
              <div class="tb-from">
                <el-row :span="24">
                  <el-col :span="24">
                    <p>用法用量：{{scope.row.useUnit }}</p>
                  </el-col>
                </el-row>
                <el-row :span="24">
                  <el-col :span="12">
                    <p>每次使用量最大值：{{scope.row.eachUseMax}}</p>
                  </el-col>
                  <el-col :span="12">
                    <p>每次使用量最小值:{{scope.row.eachUseMin}}</p>
                  </el-col>
                </el-row>
                <el-row :span="24">
                  <el-col :span="12">
                    <p>每日次数最大值：{{scope.row.dailyTimesMax}}</p>
                  </el-col>
                  <el-col :span="12">
                    <p>每日次数最小值:{{scope.row.dailyTimesMin}}</p>
                  </el-col>
                </el-row>
                <el-row :span="24">
                  <el-col :span="24">
                    <p>平均日用量：{{scope.row.avgDayNum }}</p>
                  </el-col>
                </el-row>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-tab-pane>
    <el-tab-pane label="产品附加信息" name="third">
      <div>
        <el-table
          :data="resData"
          :show-header="headVisable"
          style="width: 100%">
          <el-table-column prop="drugStorage" label="产品信息">
            <template slot-scope="scope">
              <div class="tb-from">
                <el-row :span="24">
                  <el-col :span="24">
                    <p>执行质量标准编号：{{scope.row.standardsNumber }}</p>
                  </el-col>
                </el-row>
                <div class="s-title"><i class="el-icon-document"></i>品种质量标准情况</div>
                <el-row :span="24">
                  <el-col :span="12">
                    <p>是否现行质量标准起草单位：{{scope.row.isQc==='0'?'否':'是'}}</p>
                  </el-col>
                  <el-col :span="12">
                    <p>是否通过国家药品一致性评价并在国家食品药品监督管理总局网站发布正式公告：{{scope.row.officialnotice==='0'?'否':'是' }}</p>
                  </el-col>
                </el-row>
                <div class="s-title"><i class="el-icon-document"></i>品种市场占有情况</div>
                <el-row :span="24">
                  <el-col :span="12">
                    <p>北京市基本药物药品采购项目中标情况：{{scope.row.selectStatus }}</p>
                  </el-col>
                  <el-col :span="12">
                    <p>北京市医疗机构药品采购项目中标情况：{{scope.row.selectStatus }}</p>
                  </el-col>
                </el-row>
                <div class="s-title"><i class="el-icon-document"></i>品种原料质量控制</div>
                <el-row :span="24">
                  <el-col :span="12">
                    <p>化学药品使用原料通过PIC/S(国际药品认证合作组织)成员国GMP认证：{{scope.row.picsGmp==='0'?'否':'是' }}</p>
                  </el-col>
                  <el-col :span="12">
                    <p>化学药品原料通过新版GMP认证：{{scope.row.ylyGmp==='0'?'否':'是' }}</p>
                  </el-col>
                </el-row>
                <el-row :span="24">
                  <el-col :span="12">
                    <p>原料药新版GMP证书编号：{{scope.row.gmpNumber}}</p>
                  </el-col>
                  <el-col :span="12">
                    <p>中药制剂所用中药材为GAP基地供应：{{scope.row.zycGap==='0'?'否':'是'}}</p>
                  </el-col>
                </el-row>
                <el-row :span="24">
                  <el-col :span="12">
                    <p>品种生产情况：最新工信部统计年鉴，产品产量排名：{{scope.row.productRank}}</p>
                  </el-col>
                  <el-col :span="12">
                    <p>两年内无生产：{{scope.row.noProduce==='0'?'否':'是'}}</p>
                  </el-col>
                </el-row>
                <el-row :span="24">
                  <el-col :span="12">
                    <p>品种上市后安全监测情况：是否按国家要求提交定期安全性更新报告：{{scope.row.isPsur==='0'?'否':'是'}}</p>
                  </el-col>
                  <el-col :span="12">
                    <p>不良历史纪录：{{scope.row.badFileNo}}</p>
                  </el-col>
                </el-row>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import {findProductInfoById} from 'src/axios/supervise/drug-flow/drugFlow'

  export default {
    name: "basic-info",
    data() {
      return {
        resData: [],
        headVisable: false,
        productId: this.$route.query.id,
        activeName2: 'first',
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      getProductInfo() {
        findProductInfoById(this.productId).then((res) => {
          this.resData = []
          this.resData.push(res.data)
        })
      }
    },
    mounted() {
      this.getProductInfo();
    },
  }
</script>

<style scoped>

</style>
