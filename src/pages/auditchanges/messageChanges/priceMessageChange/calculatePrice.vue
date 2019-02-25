<template>
  <div class="tablebox">
    <price-basics ref="priceBasics"></price-basics>
    <el-row :gutter="24">
      <el-row :gutter="24">
        <el-col :span="4"></el-col>
        <el-col :span="20">
          <el-radio-group v-model="vadio">
            <el-radio label="2">计算价格</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-row :gutter="24">
              <el-col :span="10">
                <el-form-item label="年度:">
                  <span></span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item>
                  <el-checkbox v-model="year">变更</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <div v-if="year">
                  <el-form-item>
                    <el-row :gutter="24">
                      <el-col :span="13">
                        <el-select placeholder="请选择">
                        </el-select>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row :gutter="24">
              <el-col :span="10">
                <el-form-item label="省份">
                  <span></span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item>
                  <el-checkbox v-model="province">变更</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <div v-if="province">
                  <el-form-item>
                    <el-row :gutter="24">
                      <el-col :span="13">
                        <el-select placeholder="请选择">
                        </el-select>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-row :gutter="24">
              <el-col :span="10">
                <el-form-item label="项目名称:">
                  <span></span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item>
                  <el-checkbox v-model="projectName">变更</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <div v-if="projectName">
                  <el-form-item>
                    <el-row :gutter="24">
                      <el-col :span="13">
                        <el-select placeholder="请选择">
                        </el-select>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row :gutter="24">
              <el-col :span="10">
                <el-form-item label="代表品装量规格：">
                  <span></span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item>
                  <el-checkbox v-model="specification">变更</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <div v-if="specification">
                  <el-form-item>
                    <el-row :gutter="24">
                      <el-col :span="13">
                        <el-select placeholder="请选择">
                        </el-select>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-row :gutter="24">
              <el-col :span="10">
                <el-form-item label="代表品价格:">
                  <span></span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item>
                  <el-checkbox v-model="delegatePrice">变更</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <div v-if="delegatePrice">
                  <el-form-item>
                    <el-row :gutter="24">
                      <el-col :span="13">
                        <el-select placeholder="请选择">
                        </el-select>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row :gutter="24">
              <el-col :span="10">
                <el-form-item label="代表品装量包装：">
                  <span></span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item>
                  <el-checkbox v-model="pack">变更</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <div v-if="pack">
                  <el-form-item>
                    <el-row :gutter="24">
                      <el-col :span="13">
                        <el-select placeholder="请选择">
                        </el-select>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-row :gutter="24">
              <el-col :span="10">
                <el-form-item label="计算方法:">
                  <span></span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item>
                  <el-checkbox v-model="computingMethod">变更</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <div v-if="computingMethod">
                  <el-form-item>
                    <el-row :gutter="24">
                      <el-col :span="13">
                        <el-select placeholder="请选择">
                        </el-select>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-button type="text">查看取值方法</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-row :gutter="24">
              <el-col :span="10">
                <el-form-item label="计算价格:">
                  <span></span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item>
                  <el-checkbox v-model="calculatePrice">变更</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <div v-if="calculatePrice">
                  <el-form-item>
                    <el-row :gutter="24">
                      <el-col :span="13">
                        <el-select placeholder="请选择">
                        </el-select>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-row :gutter="24">
              <el-col :span="10">
                <el-form-item label="备注:">
                  <span></span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item>
                  <el-checkbox v-model="remark">变更</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <div v-if="remark">
                  <el-form-item>
                    <el-row :gutter="24">
                      <el-col :span="13">
                        <el-input type="textarea"></el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-row>
    </el-row>
  </div>
</template>

<script>
  import priceBasics from 'src/pages/auditchanges/common/priceDetailCommon/priceBasics'

  export default {
    name: "calculate-price",
    components: {
      priceBasics
    },
    data() {
      return {
        year: undefined,
        province: undefined,
        projectName: undefined,
        specification: undefined,
        delegatePrice: undefined,
        pack: undefined,
        calculatePrice:undefined,
        computingMethod: undefined,
        remark:undefined,
        vadio: '0',
        fileList: {},
      }
    }
  }
</script>

<style scoped>

</style>
