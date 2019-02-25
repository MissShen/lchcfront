import http from "../../http";

/**
 * @company 国药国华网络科技有限公司
 * @author  李晓阳
 * @create 2018-05-25 15:16
 * @desc
 **/

//渲染采购金额图
export function drawRequestMoneyChart(chart, chartData) {
  chart.setOption({
    title: {
      text: '交易金额',
      textStyle: {
        color: '#fff'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    grid: {
      y: 100,
      y2: 100,
      borderWidth: 0,
      right:'20%'
    },
    legend: {
      top: 60,
      data: [{
        name: '金额',
        textStyle: {
          color: '#fff',
        }
      }, {
        name: '交易金额变换率',
        textStyle: {
          color: '#fff',
        }
      }]
    },
    xAxis: [
      {
        type: 'category',
        data: chartData.cataArr,
        axisPointer: {
          type: 'shadow'
        },
        axisLabel: {
          textStyle: {
            color: '#fff'
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '金额(万元)',
        min: 0,
        max: 1000000,
        interval: 100000,
        nameTextStyle: {
          color: '#fff'
        },
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: '#fff'
          }
        }
      },
      {
        type: 'value',
        name: '交易金额变换率(%)',
        min: -100,
        max: 100,
        interval: 20,
        nameTextStyle: {
          color: '#fff'
        },
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: '#fff'
          }
        }
      }
    ],
    series: [
      {
        name: '金额',
        type: 'bar',
        barWidth: 35,
        data: chartData.dataBarArr,
        itemStyle: {
          normal: {
            color: '#44FAFA'
          }
        },
      },
      {
        name: '交易金额变换率',
        type: 'line',
        yAxisIndex: 1,
        data: chartData.dataLineArr,
        itemStyle: {
          normal: {
            color: '#DED379'
          }
        }
      }
    ]
  });
}

//渲染到货金额图
export function drawReceiveMoneyChart(chart, chartData) {
  chart.setOption({
    title: {
      text: '到货金额',
      textStyle: {
        color: '#fff'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    grid: {
      y: 100,
      y2: 100,
      borderWidth: 0,
      right:'20%'
    },
    legend: {
      top: 60,
      data: [{
        name: '金额',
        textStyle: {
          color: '#fff',
        }
      }, {
        name: '金额变化率',
        textStyle: {
          color: '#fff',
        }
      }]
    },
    xAxis: [
      {
        type: 'category',
        data: chartData.cataArr,
        axisPointer: {
          type: 'shadow'
        },
        axisLabel: {
          textStyle: {
            color: '#fff'
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '金额(万元)',
        min: 0,
        max: 1000000,
        interval: 100000,
        nameTextStyle: {
          color: '#fff'
        },
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: '#fff'
          }
        }
      },
      {
        type: 'value',
        name: '金额变化率(%)',
        min: -100,
        max: 100,
        interval: 20,
        nameTextStyle: {
          color: '#fff'
        },
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: '#fff'
          }
        }
      }
    ],
    series: [
      {
        name: '金额',
        type: 'bar',
        barWidth: 35,
        data: chartData.dataBarArr,
        itemStyle: {
          normal: {
            color: '#44FAFA'
          }
        },
      },
      {
        name: '金额变化率',
        type: 'line',
        yAxisIndex: 1,
        data: chartData.dataLineArr,
        itemStyle: {
          normal: {
            color: '#DED379'
          }
        }
      }
    ]
  });
}

//渲染到货率图
export function drawReceiveRateChart(chart, chartData) {
  chart.setOption({
    title: {
      text: '到货率',
      textStyle: {
        color: '#fff'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    grid: {
      y: 100,
      y2: 100,
      borderWidth: 0,
      right:'20%'
    },
    legend: {
      top: 60,
      data: [
        {
          name: '采购金额',
          textStyle: {
            color: '#fff',
          }
        },
        {
          name: '到货金额',
          textStyle: {
            color: '#fff',
          }
        },
        {
          name: '到货率',
          textStyle: {
            color: '#fff',
          }
        },
      ]
    },
    xAxis: [
      {
        type: 'category',
        data: chartData.monthData,
        axisPointer: {
          type: 'shadow'
        },
        axisLabel: {
          textStyle: {
            color: '#fff'
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '金额(万元)',
        min: 0,
        max: 1000000,
        interval: 100000,
        nameTextStyle: {
          color: '#fff'
        },
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: '#fff'
          }
        }
      },
      {
        type: 'value',
        name: '到货率(%)',
        min: -100,
        max: 100,
        interval: 20,
        nameTextStyle: {
          color: '#fff'
        },
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: '#fff'
          }
        }
      }
    ],
    series: [
      {
        name: '采购金额',
        type: 'bar',
        barWidth: 20,
        barGap: 0,
        data: chartData.requestData,
        itemStyle: {
          normal: {
            color: '#44FAFA'
          }
        },
      },
      {
        name: '到货金额',
        type: 'bar',
        barWidth: 20,
        barGap: 0,
        data: chartData.receiveData,
        itemStyle: {
          normal: {
            color: '#3796df'
          }
        },
      },
      {
        name: '到货率',
        type: 'line',
        yAxisIndex: 1,
        data: chartData.rateData,
        itemStyle: {
          normal: {
            color: '#DED379'
          }
        }
      }
    ]
  });
}

//渲染药品短缺种类图
export function drawProductShortageChart(chart, chartData) {
  chart.setOption({
    title: {
      text: '药品短缺种类',
      textStyle: {
        color: '#fff'
      },
      x: 'left'
    },
    tooltip: {
      trigger: 'axis',
      // formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      right: 10,
      top: 20,
      bottom: 20,
      data: ['心脑康', '阿司匹林', '布洛芬', '罗红霉素', '头孢丙烯'],
      textStyle: {
        color: '#fff'
      }
    },
    calculable: true,
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      axisLabel: {
        formatter: '{value}',
        textStyle: {
          color: '#fff'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        textStyle: {
          color: '#fff'
        }
      }
    },
    grid: {top: '55%'},
    series: [
      {
        name: '种类数',
        data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290],
        type: 'line',
        itemStyle: {
          normal: {
            color: '#DED379'
          }
        }
      },
      {
        name: '面积模式',
        type: 'pie',
        radius: [30, 110],
        center: ['50%', '30%'],
        roseType: 'area',
        data: [
          {value: 10, name: '心脑康'},
          {value: 5, name: '阿司匹林'},
          {value: 15, name: '布洛芬'},
          {value: 25, name: '罗红霉素'},
          {value: 20, name: '头孢丙烯'}
        ]
      }
    ]
  });
}

//渲染机构数量图
export function drawOrgNumChart(chart, chartData) {

  let publicNum = 0, privateNum = 0, publicArr = [], privateArr = [], peiCataArr = [], barCataArr = [], barDataArr = []
  peiCataArr.push("公立")
  peiCataArr.push("民营")
  for (let data of chartData) {
    //拼装饼图数据
    if (data.NATURE === '0') {
      publicNum += data.NUM
      publicArr.push({
        value: data.NUM,
        name: data.HOSLEVEL
      })
    } else if (data.NATURE === '1') {
      privateNum += data.NUM
      privateArr.push({
        value: data.NUM,
        name: data.HOSLEVEL
      })
    }
    peiCataArr.push(data.HOSLEVEL)
    //拼装柱状图数据
    if (barCataArr.indexOf(data.HOSLEVEL) < 0) {
      barCataArr.push(data.HOSLEVEL)
      barDataArr.push(data.NUM)
    } else {
      let index = barCataArr.indexOf(data.HOSLEVEL)
      barDataArr[index] += data.NUM
    }
  }
  chart.setOption({
    title: [
      {
        text: '在线构建',
        subtext: '一、医院',
        textAlign: 'left',
        textStyle: {
          color: '#fff'
        },
      }, {
        text: '',
        subtext: '二、医院级别',
        y: '50%',
        textAlign: 'left',
        textStyle: {
          color: '#fff'
        },
      }],
    tooltip: {
      trigger: 'item',
      // formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      x: 'right',
      right: 10,
      top: 20,
      bottom: 20,
      data: peiCataArr,
      textStyle: {
        color: '#fff'
      }
    },
    grid: {
      top: '55%',
      x: 100,
      y: 100,
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
      axisLabel: {
        textStyle: {
          color: '#fff'
        }
      }
    },
    yAxis: {
      type: 'category',
      data: barCataArr,
      axisLabel: {
        textStyle: {
          color: '#fff'
        }
      }
    },
    series: [
      {
        name: '数量',
        type: 'bar',
        barWidth: 30,
        data: barDataArr,
        itemStyle: {
          normal: {
            color: '#2EF7F7'
          }
        }
      },
      {
        name: '医院性质',
        type: 'pie',
        selectedMode: 'single',
        radius: [0, '20%'],
        center: ['50%', '30%'],
        label: {
          normal: {
            position: 'inner'
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          {value: publicNum, name: '公立'},
          {value: privateNum, name: '民营'},
        ]
      },
      {
        name: '医院级别',
        type: 'pie',
        radius: ['30%', '40%'],
        center: ['50%', '30%'],
        label: {
          normal: {
            backgroundColor: '#eee',
            borderColor: '#aaa',
            borderWidth: 1,
            borderRadius: 4,
            rich: {
              a: {
                color: '#999',
                lineHeight: 22,
                align: 'center'
              },
              hr: {
                borderColor: '#aaa',
                width: '100%',
                borderWidth: 0.5,
                height: 0
              },
              b: {
                fontSize: 16,
                lineHeight: 33
              },
              per: {
                color: '#eee',
                backgroundColor: '#334455',
                padding: [2, 4],
                borderRadius: 2
              }
            }
          }
        },
        data: publicArr.concat(privateArr)
      }
    ]
  });
}

//渲染采购品种图
export function drawProductTypeChart(chart, chartData) {
  let chinaMap = {
    name: '中药',
    itemStyle: {
      color: '#da1d23'
    },
    children: [],
  }, westMap = {
    name: '西药',
    itemStyle: {
      color: '#da0d68'
    },
    children: []
  }
  var secondName = '';
  for (let data of chartData) {
    let color = getRandomColor()
    if (secondName === data.secondName) {
      if (data.firstId === 'FR20T0000098000000256681') {
        chinaMap.children[chinaMap.children.length - 1].children.push(
          {
            name: data.thirdName,
            value: 1,
            itemStyle: {
              color: color
            }
          }
        )
      } else {
        westMap.children[westMap.children.length - 1].children.push(
          {
            name: data.thirdName,
            value: 1,
            itemStyle: {
              color: color
            }
          }
        )
      }

    } else {
      secondName = data.secondName
      if (data.firstId === 'FR20T0000098000000256681') {
        chinaMap.children.push({
          name: data.secondName.length>6?data.secondName.substring(0,6)+'..':data.secondName,
          itemStyle: {
            color: color
          },
          children: [
            {
              name: data.thirdName,
              value: 1,
              itemStyle: {
                color: color
              }
            },]
        })
      } else {
        westMap.children.push({
          name: data.secondName.length>6?data.secondName.substring(0,6)+'..':data.secondName,
          itemStyle: {
            color: color
          },
          children: [
            {
              name: data.thirdName,
              value: 1,
              itemStyle: {
                color: color
              }
            },]
        })
      }
    }
  }
  let dataMapArr = [
    chinaMap,
    westMap
  ]
  chart.setOption({
    title: {
      text: '药品种类',
      textStyle: {
        fontSize: 14,
        color: '#fff',
        align: 'center'
      },
      subtextStyle: {
        align: 'center'
      }
    },
    series: {
      type: 'sunburst',
      highlightPolicy: 'ancestor',
      data: dataMapArr,
      radius: [0, '95%'],
      sort: null,
      levels: [{}, {
        r0: '15%',
        r: '35%',
        itemStyle: {
          borderWidth: 2
        },
        label: {
          rotate: 'tangential'
        }
      }, {
        r0: '35%',
        r: '70%',
        label: {
          align: 'right'
        }
      }, {
        r0: '70%',
        r: '72%',
        label: {
          position: 'outside',
          padding: 3,
          minAngle:2,
          silent: false
        },
        itemStyle: {
          borderWidth: 3
        }
      }]
    }
  });
}

var getRandomColor = () => {
  let R = Math.floor(Math.random() * 255);
  let G = Math.floor(Math.random() * 255);
  let B = Math.floor(Math.random() * 255);
  return 'rgb(' + R + ',' + G + ',' + B + ')';
}

