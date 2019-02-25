<template>
  <el-dialog
    title="选择图标"
    top="4vh"
    width="60%"
    :close-on-click-modal="false"
    :visible.sync="visible">
      <!--<i v-for="(icon,index) in iconMap" :key="index" @click="handleClick(icon)" class="iconfont" :class="icon">
      </i>-->
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="综合管理" name="management">
          <ul class="iconsbox">
            <li v-for="(icon,index) in iconMap.management" :key="index" @click="handleClick(icon.fontClass)" class="iconfont"
                :class="icon.fontClass">
              <span :title="icon.title">{{icon.title}}</span>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="数据中心" name="dataCenter">
          <ul class="iconsbox">
            <li v-for="(icon,index) in iconMap.dataCenter" :key="index" @click="handleClick(icon.fontClass)" class="iconfont"
                :class="icon.fontClass">
              <span :title="icon.title">{{icon.title}}</span>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="资审管理" name="audits">
          <ul class="iconsbox">
            <li v-for="(icon,index) in iconMap.audits" :key="index" @click="handleClick(icon.fontClass)" class="iconfont"
                :class="icon.fontClass">
              <span :title="icon.title">{{icon.title}}</span>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="合同管理" name="contract">
          <ul class="iconsbox">
            <li v-for="(icon,index) in iconMap.contract" :key="index" @click="handleClick(icon.fontClass)" class="iconfont"
                :class="icon.fontClass">
              <span :title="icon.title">{{icon.title}}</span>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="交易管理" name="trade">
          <ul class="iconsbox">
            <li v-for="(icon,index) in iconMap.trade" :key="index" @click="handleClick(icon.fontClass)" class="iconfont"
                :class="icon.fontClass">
              <span :title="icon.title">{{icon.title}}</span>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="监管中心" name="supervise">
          <ul class="iconsbox">
            <li v-for="(icon,index) in iconMap.supervise" :key="index" @click="handleClick(icon.fontClass)" class="iconfont"
                :class="icon.fontClass">
              <span :title="icon.title">{{icon.title}}</span>
            </li>
          </ul>
        </el-tab-pane>
      </el-tabs>
    <span slot="footer">
      <el-button @click="handleClick()" size="small">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
  // import {iconMap} from "src/assets/icons/iconMap";

  export default {
    name: "iconList",
    data() {
      return {
        visible: true,
        iconMap: this.iconMap(),
        activeName: 'management'
      }
    },
    methods: {
      handleClick(icon) {
        const _icon = icon || '';
        this.$emit('callBack', _icon);
      },
      handleTabClick(tab, event) {
        console.log(tab, event);
      },
      iconMap(){
        return {
          "audits": [
            {
              "title": "项目管理",
              "fontClass": "icon-xiangmuguanli"
            }, {
              "title": "假期管理",
              "fontClass": "icon-jiaqiguanli"
            }, {
              "title": "项目附加信息管理",
              "fontClass": "icon-xmfjxxgl"
            }, {
              "title": "合并剂型",
              "fontClass": "icon-hebingjixing"
            }, {
              "title": "标的物类别",
              "fontClass": "icon-biaodewuleibie"
            }, {
              "title": "标的物目录",
              "fontClass": "icon-biaodewumulu"
            }, {
              "title": "注册信息公示管理",
              "fontClass": "icon-zcxxgsgl"
            }, {
              "title": "企业变更审核字段管理",
              "fontClass": "icon-qybgshzdgl"
            }, {
              "title": "产品变更审核字段管理",
              "fontClass": "icon-cqbgshzdgl"
            }, {
              "title": "待审核数据管理",
              "fontClass": "icon-dshsjgl"
            }, {
              "title": "企业申报审核",
              "fontClass": "icon-qiyeshenbaoshenhe"
            }, {
              "title": "企业变更审核",
              "fontClass": "icon-qiyebiangengshenhe"
            }, {
              "title": "价格申报审核",
              "fontClass": "icon-jgsbsh"
            }, {
              "title": "价格变更审核",
              "fontClass": "icon-jiagebiangengshenhe"
            }, {
              "title": "产品信息审核",
              "fontClass": "icon-cpxxsh"
            }, {
              "title": "产品转产审核",
              "fontClass": "icon-cpzcsh"
            }, {
              "title": "产品降价审核",
              "fontClass": "icon-cpjjsh"
            }, {
              "title": "企业信息注册",
              "fontClass": "icon-qiyexinxizhuce"
            }, {
              "title": "产品信息注册",
              "fontClass": "icon-chanpinxinxizhuce"
            }, {
              "title": "文件管理",
              "fontClass": "icon-wenjianguanli"
            }, {
              "title": "文件回收站",
              "fontClass": "icon-wjhsz"
            }, {
              "title": "企业信息申报",
              "fontClass": "icon-qiyexinxishenbao"
            }, {
              "title": "产品信息申报",
              "fontClass": "icon-chanpinxinxishenbao"
            }, {
              "title": "企业信息变更",
              "fontClass": "icon-qyxxbg"
            }, {
              "title": "价格信息变更",
              "fontClass": "icon-jgxxbg"
            }, {
              "title": "产品信息变更",
              "fontClass": "icon-cpxxbg"
            }, {
              "title": "产品转产变更",
              "fontClass": "icon-cpzcbg"
            }, {
              "title": "产品转出确认",
              "fontClass": "icon-cpzcqr"
            }, {
              "title": "产品降价更新",
              "fontClass": "icon-cpjjgx"
            }, {
              "title": "企业信息公示",
              "fontClass": "icon-qiyexinxigongshi"
            }, {
              "title": "价格信息公示",
              "fontClass": "icon-jgxxgs"
            }, {
              "title": "产品信息公示",
              "fontClass": "icon-cpxxgs"
            }, {
              "title": "产品转产公示",
              "fontClass": "icon-cpzcgs"
            }, {
              "title": "产品降价公示",
              "fontClass": "icon-cpjjgs"
            }, {
              "title": "企业信息质疑",
              "fontClass": "icon-qiyexinxizhiyi"
            }, {
              "title": "价格信息质疑",
              "fontClass": "icon-jiagexinxizhiyi"
            }, {
              "title": "产品信息质疑",
              "fontClass": "icon-chanpinxinxizhiyi"
            }, {
              "title": "产品信息挂网",
              "fontClass": "icon-cpxxgw"
            }, {
              "title": "企业信息挂网",
              "fontClass": "icon-qiyexinxiguawang"
            }, {
              "title": "企业信息澄清",
              "fontClass": "icon-qyxxcq"
            }, {
              "title": "价格信息澄清",
              "fontClass": "icon-jgxxcq"
            }, {
              "title": "产品信息澄清",
              "fontClass": "icon-cpxxcq"
            }, {
              "title": "企业信息确认",
              "fontClass": "icon-qiyexinxiqueren"
            }, {
              "title": "价格变更确认",
              "fontClass": "icon-jiagebiangengqueren"
            }, {
              "title": "产品信息确认",
              "fontClass": "icon-chanpinxinxiqueren"
            }, {
              "title": "产品转产确认",
              "fontClass": "icon-chpzcqr"
            }, {
              "title": "价格信息申报确认",
              "fontClass": "icon-jgxxsbqr"
            }, {
              "title": "价格信息变更确认",
              "fontClass": "icon-jgxxbgqr"
            }, {
              "title": "两票制资质上传",
              "fontClass": "icon-lpzzzsc"
            }, {
              "title": "两票制资质公示",
              "fontClass": "icon-lpzzzgs"
            }, {
              "title": "两票制资质公示管理",
              "fontClass": "icon-lpzzzgsgl"
            }, {
              "title": "信息举报",
              "fontClass": "icon-xinxijubao"
            }
          ],
          "contract": [
            {
              "title": "合同签章",
              "fontClass": "icon-hetongqianzhang"
            }, {
              "title": "合同管理",
              "fontClass": "icon-hetongguanli"
            }, {
              "title": "医院收货地址维护",
              "fontClass": "icon-yyshdzwh"
            }, {
              "title": "规则字典维护",
              "fontClass": "icon-guizezidianweihu"
            }, {
              "title": "医院收货地址",
              "fontClass": "icon-yiyuanshouhuodizhi"
            }, {
              "title": "配送区域管理",
              "fontClass": "icon-psqygl"
            }, {
              "title": "生产企业选择配送",
              "fontClass": "icon-scqyxzps"
            }, {
              "title": "医院选择配送",
              "fontClass": "icon-yyxzps"
            }, {
              "title": "医院选择产品配送",
              "fontClass": "icon-yyxzcppx"
            }, {
              "title": "医院配送合同",
              "fontClass": "icon-yyqsht"
            }, {
              "title": "配送企业查看",
              "fontClass": "icon-peisongqiyechakan"
            }, {
              "title": "医院候选目录维护",
              "fontClass": "icon-yyhxhlwh"
            }, {
              "title": "药品基础数据库",
              "fontClass": "icon-ypjcsjk"
            }, {
              "title": "本院上报药品目录",
              "fontClass": "icon-bysbypml"
            }, {
              "title": "禁用品种",
              "fontClass": "icon-jinyongpinzhong"
            }, {
              "title": "承诺书签订",
              "fontClass": "icon-cnsqd"
            }, {
              "title": "承诺书公示",
              "fontClass": "icon-cnsgs"
            }, {
              "title": "议价报价直播",
              "fontClass": "icon-yjbjzb"
            }, {
              "title": "主体议价目录",
              "fontClass": "icon-zhutiyijiamulu"
            }, {
              "title": "创建议价主体",
              "fontClass": "icon-cjyjzt"
            }, {
              "title": "维护议价目录",
              "fontClass": "icon-weihuyijiamulu"
            }, {
              "title": "议价结果公示",
              "fontClass": "icon-yjjggs"
            }, {
              "title": "企业主动降价确认",
              "fontClass": "icon-qyzdjjqr"
            }, {
              "title": "议价报价",
              "fontClass": "icon-yijiabaojia"
            }
          ],
          "dataCenter": [
            {
              "title": "区域编码表",
              "fontClass": "icon-quyubianmabiao"
            }, {
              "title": "剂型列表",
              "fontClass": "icon-jixingliebiao"
            }, {
              "title": "计量单位代码表",
              "fontClass": "icon-jldwdmb"
            }, {
              "title": "特殊包装材质",
              "fontClass": "icon-tsbzcz"
            }, {
              "title": "盐类衍生物",
              "fontClass": "icon-yanleiyanshengwu"
            }, {
              "title": "药品信息",
              "fontClass": "icon-yaopinxinxi"
            }, {
              "title": "药品标准分类",
              "fontClass": "icon-ypbzfl"
            }, {
              "title": "药品ATC分类",
              "fontClass": "icon-yaopinATCfenlei"
            }, {
              "title": "新编药学分类",
              "fontClass": "icon-xbyxfl"
            }, {
              "title": "药品异名信息",
              "fontClass": "icon-ypymxx"
            }, {
              "title": "产品信息列表",
              "fontClass": "icon-chanpinxinxiliebiao"
            }, {
              "title": "产品黄页列表",
              "fontClass": "icon-cphylb"
            }, {
              "title": "基本医疗保险药品",
              "fontClass": "icon-jbylbxyp"
            }, {
              "title": "国家基础药物列表",
              "fontClass": "icon-gjjcywlb"
            }, {
              "title": "OTC药品列表",
              "fontClass": "icon-OTCyaopinliebiao"
            }, {
              "title": "药品质量公告列表",
              "fontClass": "icon-ypzlgglb"
            }, {
              "title": "全国价格库列表",
              "fontClass": "icon-qgjgklb"
            }, {
              "title": "中药保护品种",
              "fontClass": "icon-zybhpz"
            }, {
              "title": "行政保护列表",
              "fontClass": "icon-xzbhlb"
            }, {
              "title": "企业资质列表",
              "fontClass": "icon-qiyezizhiliebiao"
            }, {
              "title": "产品资质列表",
              "fontClass": "icon-cpzzlb"
            }, {
              "title": "药品说明书",
              "fontClass": "icon-yaopinshuomingshu"
            }, {
              "title": "处方集分类",
              "fontClass": "icon-chufangjifenlei"
            }
          ],
          "management": [
            {
              "title": "用户管理",
              "fontClass": "icon-yonghuguanli"
            }, {
              "title": "模块管理",
              "fontClass": "icon-mokuaiguanli"
            }, {
              "title": "角色管理",
              "fontClass": "icon-msnui-role-manage"
            }, {
              "title": "角色管理",
              "fontClass": "icon-jiaoseguanli"
            }, {
              "title": "公告管理",
              "fontClass": "icon-gonggaoguanli"
            }, {
              "title": "公告类别",
              "fontClass": "icon-gonggaoguanli1"
            }
          ],
          "supervise": [
            {
              "title": "监管概括",
              "fontClass": "icon-jianguangaikuo"
            }, {
              "title": "交易监管",
              "fontClass": "icon-jiaoyijianguan"
            }, {
              "title": "合同监管",
              "fontClass": "icon-hetongjianguan"
            }, {
              "title": "药品流向",
              "fontClass": "icon-yaopinliuxiang"
            }
          ],
          "trade": [
            {
              "title": "制定采购单",
              "fontClass": "icon-zdcgd"
            }, {
              "title": "审批采购单",
              "fontClass": "icon-shenpicaigoudan"
            }, {
              "title": "到货修改",
              "fontClass": "icon-daohuoxiugai"
            }, {
              "title": "到货单导出",
              "fontClass": "icon-dhddc"
            }, {
              "title": "全部采购单",
              "fontClass": "icon-qbcgd"
            }, {
              "title": "库存维护",
              "fontClass": "icon-kucunweihu"
            }, {
              "title": "备案审批",
              "fontClass": "icon-beianshenpi"
            }, {
              "title": "退货处理",
              "fontClass": "icon-tuihuochuli"
            }, {
              "title": "到货处理",
              "fontClass": "icon-daohuochuli"
            }, {
              "title": "退货处理",
              "fontClass": "icon-tuihuochuli"
            }, {
              "title": "退货处理",
              "fontClass": "icon-tuihuochuli"
            }, {
              "title": "短缺货查询",
              "fontClass": "icon-dqhcx"
            }, {
              "title": "备案查看",
              "fontClass": "icon-beianchakan"
            }, {
              "title": "备案采购",
              "fontClass": "icon-beiancaigou"
            }, {
              "title": "可配送医院查询",
              "fontClass": "icon-kpsyycx"
            }, {
              "title": "可配送药品查询",
              "fontClass": "icon-kpsypcx"
            }, {
              "title": "订单处理",
              "fontClass": "icon-dingdanchuli"
            }, {
              "title": "到货查询",
              "fontClass": "icon-daohuochaxun"
            }, {
              "title": "订单催促",
              "fontClass": "icon-dingdancuicu"
            }, {
              "title": "订单导入",
              "fontClass": "icon-dingdandaoru"
            }, {
              "title": "企业黄页",
              "fontClass": "icon-qiyehuangye"
            }, {
              "title": "医院黄页",
              "fontClass": "icon-yiyuanhuangye"
            }, {
              "title": "黄页信息维护",
              "fontClass": "icon-hyxxwh"
            }, {
              "title": "订单评价",
              "fontClass": "icon-ddpj"
            }, {
              "title": "投诉管理",
              "fontClass": "icon-tousuguanli"
            }, {
              "title": "交易参数设置",
              "fontClass": "icon-jycssz"
            }, {
              "title": "二审参数设置",
              "fontClass": "icon-escssz"
            }, {
              "title": "审核关系维护",
              "fontClass": "icon-shgxwh"
            }, {
              "title": "行政关系维护",
              "fontClass": "icon-xzgxwh"
            }, {
              "title": "区基药配送方案维护",
              "fontClass": "icon-qjyqsfawh"
            }, {
              "title": "区目录管理",
              "fontClass": "icon-qumuluguanli"
            }, {
              "title": "药库维护",
              "fontClass": "icon-yaokuweihu"
            }, {
              "title": "采购目录维护",
              "fontClass": "icon-cgmlwh"
            }, {
              "title": "医院收货地址维护",
              "fontClass": "icon-yyshdzwh"
            }, {
              "title": "医疗机构采购分析",
              "fontClass": "icon-yljgcgfx"
            }, {
              "title": "药品采购分析",
              "fontClass": "icon-ypcgfx"
            }, {
              "title": "期号管理",
              "fontClass": "icon-qihaoguanli"
            }, {
              "title": "短缺药品汇总",
              "fontClass": "icon-dqyphz"
            }, {
              "title": "短缺药上报",
              "fontClass": "icon-dqysb"
            }, {
              "title": "重点监控药品管理",
              "fontClass": "icon-zdjkypgl"
            }, {
              "title": "重点监控药品上报",
              "fontClass": "icon-zdjkypsb"
            }, {
              "title": "非两票制药品上报查询",
              "fontClass": "icon-flpzypsb"
            }, {
              "title": "非两票制药品上报",
              "fontClass": "icon-flpzsb"
            }
          ]
        };
      }
    }
  }
</script>

