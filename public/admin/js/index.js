// 主体部分柱状图功能
var myChartBar = echarts.init(document.getElementById('bar-chart'));
// 指定图表的配置项和数据
        var barOption = {
            title: {
                text: '2017年注册人数'
            },
            tooltip: {},
            legend: {
                data:['人数']
            },
            xAxis: {
                data: ["一月","二月","三月","四月","五月","六月"]
            },
            yAxis: {},
            series: [{
                name: '人数',
                type: 'bar',
                barWidth: '60%',
                data: [1000, 2500, 3000, 1200, 1100, 1000]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChartBar.setOption(barOption);

// 主体部分饼状图
var myChartPie = echarts.init(document.getElementById('round-chart'));
pieOption = {
    title : {
        text: '热门品牌销售',
        subtext: '2017年6月',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['耐克', '阿迪', '百伦', '安踏', '李宁']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                 { value: 335, name: '耐克' },
                 { value: 310, name: '阿迪' },
                 { value: 234, name: '百伦' },
                 { value: 135, name: '安踏' },
                 { value: 1548, name: '李宁' }
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
myChartPie.setOption(pieOption);

