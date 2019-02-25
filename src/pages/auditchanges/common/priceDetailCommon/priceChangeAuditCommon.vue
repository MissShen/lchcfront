<template>
  <div class="tablebox">
    <el-form ref="form" :model="form" label-width="150">
      <price-basics :projectProductId="this.projectProductId"></price-basics>
      <el-row :gutter="24">
        <el-col :span="24">
          <el-radio-group v-model="vadio">
            <el-radio label="0">全国最低中标价</el-radio>
            <el-radio label="1">计算价格</el-radio>
            <el-radio label="2">无最低中标价</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-row :gutter="24">
            <el-col :span="18">
              <el-form-item label="年度:">
                <span></span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <div v-if="viewFlag.viewFlag==3">
                <el-form-item>
                  <el-checkbox v-model="year">不正确</el-checkbox>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <div v-if="year">
                <el-form-item>
                  <el-input></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row :gutter="24">
            <el-col :span="18">
              <el-form-item label="省份">
                <span></span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <div v-if="viewFlag.viewFlag==3">
                <el-form-item>
                  <el-checkbox v-model="province">不正确</el-checkbox>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <div v-if="province">
                <el-form-item>
                  <el-input></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-row :gutter="24">
            <el-col :span="18">
              <el-form-item label="项目名称：">
                <span></span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <div v-if="viewFlag.viewFlag==3">
                <el-form-item>
                  <el-checkbox v-model="proName">不正确</el-checkbox>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <div v-if="proName">
                <el-form-item>
                  <el-input></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row :gutter="24">
            <el-col :span="4">
              <span>中标价：</span>
            </el-col>
            <el-col :span="20">
              <el-row :gutter="24">
                <el-col :span="24">
                  <div v-if="viewFlag.viewFlag==1||viewFlag.viewFlag==2">
                    <span><span style="color: red">变更前：</span></span>
                  </div>
                </el-col>
                <el-col :span="24">
                  <el-row :gutter="24">
                    <el-col :span="7">
                      <div v-if="viewFlag.viewFlag==1||viewFlag.viewFlag==2">
                        <span style="color: red">变更后：</span>
                        <div v-if="dialogFlag">
                          <el-input></el-input>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="5">
                      <el-row :gutter="24">
                        <el-col :span="8">
                          <el-checkbox v-model="dialogFlag" :disabled="viewFlag.viewFlag==2||viewFlag.viewFlag==4">不正确
                          </el-checkbox>
                        </el-col>
                      </el-row>
                      <el-row :gutter="24">
                        <el-col :span="6">
                          <el-button type="text" @click="handlerFromView">查看质疑</el-button>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="12">
                  <div v-if="dialogFlag">
                    <el-form-item>
                      <el-input></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="24">
                  <div v-if="viewFlag.viewFlag==2||viewFlag.viewFlag==4">
                    <span><span style="color: red">审核后：</span></span>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-row :gutter="24">
            <el-col :span="18">
              <el-form-item label="执行日期：">
                <span></span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <div v-if="viewFlag.viewFlag==3">
                <el-form-item>
                  <el-checkbox v-model="executionDate">不正确</el-checkbox>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <div v-if="executionDate">
                <el-form-item>
                  <el-input></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="24">
          <el-form-item label="全国价格库:">
            <el-table
              border
              style="width: 100%">
              <el-table-column label="项目名称"></el-table-column>
              <el-table-column label="项目年度"></el-table-column>
              <el-table-column label="省份"></el-table-column>
              <el-table-column label="项目价格"></el-table-column>
              <el-table-column label="执行日期"></el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <span>项目名称应包括项目年度和省份名称，请按照各省公布的标准项目录名称录入。   最低价请如实、谨慎填写，注意不同规格包装间的合理比价关系！</span>
        </el-col>
        <el-col :span="24">
          <el-form-item label="审核记录">
            <el-table
              border
              style="width: 100%">
              <el-table-column label="审核人"></el-table-column>
              <el-table-column label="审核时间"></el-table-column>
              <el-table-column label="审核结果"></el-table-column>
              <el-table-column label="审核备注"></el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
      <priceDialog v-if="dialogVisible" ref="priceDialog"></priceDialog>
    </el-form>
  </div>
</template>

<script>
  import priceBasics from 'src/pages/auditchanges/common/priceDetailCommon/priceBasics'
  import priceDialog from './priceDialog'

  export default {
    name: "price-change-audit-common",
    props: ["projectProductId"],
    components: {
      priceBasics,
      priceDialog
    },
    data() {
      return {
        dialogFlag: undefined,
        vadio: '0',
        year: undefined,
        viewFlag: '0',
        proName: undefined,
        executionDate: undefined,
        dialogVisible: true,
        form: {}
      }
    },
    created() {
    },
    methods: {
      mataData(req) {
        console.log(req)
        this.viewFlag = req;
      },
      handlerFromView() {
        this.dialogVisible = true
        this.$nextTick(() => {
          this.$refs.priceDialog.fillData()
        })
      },
    }
  }
</script>
