//bar
var mao = {
    title: {
        text: '2016年“一带一路”沿线贸易额排名前20国家',
        top:10,
        left:'center'
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['进口额', '出口额'],
        orient:'vertical',
        right:80
    },
    grid: {
        left: '3%',
        right: '10%',
        bottom: '3%',
        containLabel: true,
    },
    xAxis: {
        type: 'value',
        name:'(亿美元)',
        nameLocation:'end',
        boundaryGap: [0, 0.01],
        interval:500
    },
    yAxis: {
        type: 'category',
        data: ['卡塔尔','以色列','罗马尼亚','菲律宾','斯洛伐克','匈牙利','印度尼西亚',
            '捷克','土耳其','马来西亚','沙特阿拉伯','阿联酋','越南'
            ,'波兰','泰国','俄罗斯','印度','新加坡']
    },
    series: [
        {
            name: '进口额',
            type: 'bar',
            data: [326.1,620.7,698.5,859.4,702.1,887.9,1426.9,
                1422.0,1986.0,1685.4,1638.2,2221.8,1909.5,
                1885.2,1957.4,1827.8,3566.8,2968.9],
            itemStyle: {color:'#ff9b8f' }
        },
        {
            name: '出口额',
            type: 'bar',
            data: [779.7,640.6,598.5,563.1,726.8,961.0,1502.8,
                1628.3,1426.1,1895.7,2014.9,1533.8,1865.0,
                1964.6,2136.1,3439.1,2610.1,3468.1],
            itemStyle: {color:'#5c6c70' }
        }
    ]
    //backgroundColor:'rgba(0, 0, 0, 0.1)'
};

//treemap
var diskData = [
    {
        "value": 47.8,
        "name": "东南亚",
        "path": "东南亚",
        "children": [
            {
                "value": 10.3,
                "name": "越南",
                "path": "东南亚/越南"
            },
            {
                "value": 9.2,
                "name": "马来西亚",
                "path": "东南亚/马来西亚"
            },
            {
                "value": 8,
                "name": "泰国",
                "path": "东南亚/泰国"
            },
            {
                "value": 7.5,
                "name": "新加坡",
                "path": "东南亚/新加坡"
            },
            {
                "value": 5.6,
                "name": "印度尼西亚",
                "path": "东南亚/印度尼西亚"
            },
            {
                "value": 5,
                "name": "菲律宾",
                "path": "东南亚/菲律宾"
            },
            {
                "value": 1.3,
                "name": "缅甸",
                "path": "东南亚/缅甸"
            },
            {
                "value": 0.5,
                "name": "柬埔寨",
                "path": "东南亚/柬埔寨"
            },
            {
                "value": 0.2,
                "name": "老挝",
                "path": "东南亚/老挝"
            }
        ]
    },
    {
        "value": 22.6,
        "name": "西亚北非",
        "path": "西亚北非",
        "children": [
            {
                "value": 4.5,
                "name": "沙特阿拉伯",
                "path": "西亚北非/沙特阿拉伯"
            },
            {
                "value": 4.2,
                "name": "阿联酋",
                "path": "西亚北非/阿联酋"
            },
            {
                "value": 3.3,
                "name": "伊朗",
                "path": "西亚北非/伊朗"
            },
            {
                "value": 2.1,
                "name": "土耳其",
                "path": "西亚北非/土耳其"
            },
            {
                "value": 1.9,
                "name": "伊拉克",
                "path": "西亚北非/伊拉克"
            },
            {
                "value": 1.5,
                "name": "阿曼",
                "path": "西亚北非/阿曼"
            },
            {
                "value": 1.2,
                "name": "以色列",
                "path": "西亚北非/以色列"
            },
            {
                "value": 1.2,
                "name": "埃及",
                "path": "西亚北非/埃及"
            },
            {
                "value": 1,
                "name": "科威特",
                "path": "西亚北非/科威特"
            },
            {
                "value": 0.6,
                "name": "其他",
                "path": "西亚北非/其他"
            },
            {
                "value": 0.6,
                "name": "卡塔尔",
                "path": "西亚北非/卡塔尔"
            },
            {
                "value": 0.3,
                "name": "约旦",
                "path": "西亚北非/约旦"
            }
        ]
    },
    {
        "value": 14.3,
        "name": "东欧",
        "path": "东欧",
        "children": [
            {
                "value": 7.3,
                "name": "俄罗斯",
                "path": "东欧/俄罗斯"
            },
            {
                "value": 1.9,
                "name": "波兰",
                "path": "东欧/波兰"
            },
            {
                "value": 1.3,
                "name": "其他",
                "path": "东欧/其他"
            },
            {
                "value": 1.2,
                "name": "捷克",
                "path": "东欧/捷克"
            },
            {
                "value": 0.9,
                "name": "匈牙利",
                "path": "东欧/匈牙利"
            },
            {
                "value": 0.7,
                "name": "乌克兰",
                "path": "东欧/乌克兰"
            },
            {
                "value": 0.6,
                "name": "斯洛伐克",
                "path": "东欧/斯洛伐"
            },
            {
                "value": 0.5,
                "name": "罗马尼亚",
                "path": "东欧/罗马尼亚"
            }
        ]
    },
    {
        "value": 11.7,
        "name": "南亚",
        "path": "南亚",
        "children": [
            {
                "value": 7.4,
                "name": "印度",
                "path": "南亚/印度"
            },
            {
                "value": 2,
                "name": "巴基斯坦",
                "path": "南亚/巴基斯坦"
            },
            {
                "value": 1.6,
                "name": "孟加拉国",
                "path": "南亚/孟加拉国"
            },
            {
                "value": 0.5,
                "name": "斯里兰卡",
                "path": "南亚/斯里兰卡"
            },
            {
                "value": 0.2,
                "name": "其他",
                "path": "南亚/其他"
            }
        ]
    },
    {
        "value": 3.2,
        "name": "中亚",
        "path": "中亚",
        "children": [
            {
                "value": 1.4,
                "name": "哈萨克斯坦",
                "path": "中亚/哈萨克斯"
            },
            {
                "value": 0.6,
                "name": "土库曼斯坦",
                "path": "中亚/土库曼斯坦"
            },
            {
                "value": 0.6,
                "name": "吉尔吉斯斯坦",
                "path": "中亚/吉尔吉斯斯坦"
            },
            {
                "value": 0.6,
                "name": "其他",
                "path": "中亚/其他"
            }
        ]
    },
    {
        "value": 3.5,
        "name": "东亚",
        "path": "东亚",
        "children": [
            {
                "value": 0.5,
                "name": "蒙古",
                "path": "东亚/蒙古"
            }
        ]
    }
];

function colorMappingChange(value) {
    var levelOption = getLevelOption(value);
    chart.setOption({
        series: [{
            levels: levelOption
        }]
    });
}

var formatUtil = echarts.format;

function getLevelOption() {
    return [
        {
            itemStyle: {
                normal: {
                    borderColor: '#777',
                    borderWidth: 0,
                    gapWidth: 1
                }
            },
            upperLabel: {
                normal: {
                    show: false
                }
            }
        },
        {
            itemStyle: {
                normal: {
                    borderColor: '#555',
                    borderWidth: 5,
                    gapWidth: 1
                },
                emphasis: {
                    borderColor: '#ddd'
                }
            }
        },
        {
            colorSaturation: [0.35, 0.5],
            itemStyle: {
                normal: {
                    borderWidth: 5,
                    gapWidth: 1,
                    borderColorSaturation: 0.6
                }
            }
        }
    ];
}

var treemap = {

    title: {
        text: '2016年中国与“一带一路”沿线主要区域贸易额比重',
        left: 'center'
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },

    tooltip: {
        formatter: function (info) {
            var value = info.value;
            var treePathInfo = info.treePathInfo;
            var treePath = [];

            for (var i = 1; i < treePathInfo.length; i++) {
                treePath.push(treePathInfo[i].name);
            }

            return [
                '<div class="tooltip-title">' + formatUtil.encodeHTML(treePath.join('/')) + '</div>',
                '比重: ' + formatUtil.addCommas(value) + '%',
            ].join('');
        }
    },

    series: [
        {
            name:'贸易额比重',
            type:'treemap',
            visibleMin: 200,
            label: {
                show: true,
                color: '#000000',
                formatter: '{b}',
                fontWeight:'bolder'
            },
            upperLabel: {
                normal: {
                    show: true,
                    height: 20
                }
            },
            itemStyle: {
                normal: {
                    borderColor: '#5a1eff'
                }
            },
            levels: getLevelOption(),
            data: diskData
        }
    ]
}

//bar2
var dataStyle = {
    normal: {
        label : {
            show: true,
            position: 'insideLeft',
            formatter: '{c}%'
        }
    },
    emphasis: {
        barBorderWidth: 1,
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: 'rgba(0,0,0,0.8)'
    }
};
var bar1 = {
    title: {
        text: '2011-2016年中国对“一带一路”沿线国家进口贸易主体变化情况 ',
        left:'center'
    },
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter : '{b}<br/>{a0}:{c0}%<br/>{a1}:{c1}%<br/>{a2}:{c2}%<br/>{a3}:{c3}%'
    },
    legend: {
        y: 30,
        itemGap : 20,
        data:['民营企业', '外商投资企业', '国有企业','其他企业']

    },
    grid: {
        y: 80,
        y2: 30,
        //left: '3%',
        //right: '10%',
        //bottom: '3%',
        //containLabel: true,
    },
    xAxis : [
        {
            type : 'value',
            position: 'top',
            splitLine: {show: false},
            interval:20,
            max:100,
            axisLabel: {show: true}
        }
    ],
    yAxis : [
        {
            type : 'category',
            splitLine: {show: false},
            data : ['2011', '2012', '2013', '2014','2015','2016']
        }
    ],
    series : [
        {
            name:'民营企业',
            type:'bar',
            stack: '总量',
            itemStyle : dataStyle,
            data:[21.6, 22.1, 23.4, 24.3,26.4,28.2]
        },
        {
            name:'外商投资企业',
            type:'bar',
            stack: '总量',
            itemStyle : dataStyle,
            data:[35.3, 35.1, 32.8, 33.1 , 36.6, 37.0]
        },
        {
            name:'国有企业',
            type:'bar',
            stack: '总量',
            itemStyle : dataStyle,
            data:[43.1, 42.7, 43.8, 42.5,35.1,31.6]
        },
        {
            name:'其他企业',
            type:'bar',
            stack: '总量',
            itemStyle : dataStyle,
            data:[0.1, 0.1, 0.1, 0.1, 1.8, 3.2]
        }
    ]
};
var bar2 = {
    title: {
        text: ' 2011-2016年中国对“一带一路”沿线国家出口贸易主体变化情况 ',
        left:'center'
    },
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter : '{b}<br/>{a0}:{c0}%<br/>{a1}:{c1}%<br/>{a2}:{c2}%<br/>{a3}:{c3}%'
    },
    legend: {
        y: 30,
        itemGap : 20,
        data:['民营企业','外商投资企业', '国有企业', '其他企业']

    },
    grid: {
        y: 80,
        y2: 30,
        //left: '3%',
        //right: '10%',
        //bottom: '3%',
        //containLabel: true,
    },
    xAxis : [
        {
            type : 'value',
            position: 'top',
            splitLine: {show: false},
            interval:20,
            max:100,
            axisLabel: {show: true},
        }
    ],
    yAxis : [
        {
            type : 'category',
            splitLine: {show: false},
            data : ['2011', '2012', '2013', '2014','2015','2016']
        }
    ],
    series : [
        {
            name:'民营企业',
            type:'bar',
            stack: '总量',
            itemStyle : dataStyle,
            data:[46.6, 50.2, 54.4, 57.6 ,58.6, 58.9]
        },
        {
            name:'外商投资企业',
            type:'bar',
            stack: '总量',
            itemStyle : dataStyle,
            data:[35.4, 33.3, 30.8, 28.8,28.0,27.8]
        },
        {
            name:'国有企业',
            type:'bar',
            stack: '总量',
            itemStyle : dataStyle,
            data:[17.9, 16.4, 14.8, 13.5,13.3,13.1]
        },
        {
            name:'其他企业',
            type:'bar',
            stack: '总量',
            itemStyle : dataStyle,
            data:[0.1, 0.1, 0.1, 0.0, 0.1, 0.3]
        }
    ]
};

var duidie1 = {
    title: {
        text: '2011-2016年中国对“一带一路”沿线国家进口贸易主体变化情况 ',
        left:'center'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['其他企业','国有企业',  '外商投资企业','民营企业'],
        top:30
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['2011', '2012', '2013', '2014','2015','2016']
        }
    ],
    yAxis : [
        {
            type : 'value',
            interval:20,
            max:100,
            axisLabel: {show: true}
        }
    ],
    series : [
       {
            name:'其他企业',
            type:'line',
            stack: '总量',
            itemStyle: {normal: {areaStyle: {color:'#0e3964' }}},
            data:[0.1, 0.1, 0.1, 0.1, 1.8, 3.2]
        },
        {
            name:'国有企业',
            type:'line',
            stack: '总量',
            itemStyle: {normal: {areaStyle: {color:'#346897'}}},
            data:[43.1, 42.7, 43.8, 42.5,35.1,31.6]
        },
        {
            name:'外商投资企业',
            type:'line',
            stack: '总量',
            itemStyle: {normal: {areaStyle: {color:'#699fc5'}}},
            data:[35.3, 35.1, 32.8, 33.1 , 36.6, 37.0]
        },

        {
            name:'民营企业',
            type:'line',
            stack: '总量',
            itemStyle: {normal: {areaStyle: {color:'#bee7fd'}}},
            data:[21.6, 22.1, 23.4, 24.3,26.4,28.2]
        }
    ]

};

var duidie2 = {
    title: {
        text: ' 2011-2016年中国对“一带一路”沿线国家出口贸易主体变化情况 ',
        left:'center'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['其他企业','国有企业',  '外商投资企业','民营企业'],
        top:30
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['2011', '2012', '2013', '2014','2015','2016']
        }
    ],
    yAxis : [
        {
            type : 'value',
            interval:20,
            max:100,
            axisLabel: {show: true}
        }
    ],
    series : [

        {
            name:'其他企业',
            type:'line',
            stack: '总量',
            itemStyle: {normal: {areaStyle: {color:'#103b66' }}},
            data:[0.1, 0.1, 0.1, 0.0, 0.1, 0.3],
        },
        {
            name:'国有企业',
            type:'line',
            stack: '总量',
            itemStyle: {normal: {areaStyle: {color:'#336892'}}},
            data:[17.9, 16.4, 14.8, 13.5,13.3,13.1]
        },
        {
            name:'外商投资企业',
            type:'line',
            stack: '总量',
            itemStyle: {normal: {areaStyle: {color:'#6ba1c7'}}},
            data:[35.4, 33.3, 30.8, 28.8,28.0,27.8]
        },

        {
            name:'民营企业',
            type:'line',
            stack: '总量',
            itemStyle: {normal: {areaStyle: {color:'#c0e6fd'}}},
            data:[46.6, 50.2, 54.4, 57.6 ,58.6, 58.9]
        }

    ]
};

$(document).ready(function () {
    echarts.init(document.getElementById('t1')).setOption(mao);
    echarts.init(document.getElementById('t2'),'light').setOption(treemap);
    // echarts.init(document.getElementById('t31')).setOption(bar1);
    // echarts.init(document.getElementById('t32')).setOption(bar2);
    echarts.init(document.getElementById('t31')).setOption(duidie1);
    echarts.init(document.getElementById('t32')).setOption(duidie2);
})
