<template>
    <div class="line">
        折线图2
        <div id="linechart2"></div>
    </div>
</template>
<script setup>
import * as echarts from 'echarts';
import { ref, onMounted } from "vue";

const charts = ref();


const opt = {
        xAxis: {
            type: 'category',
            data: ['A', 'B', 'C', 'D', 'E', 'F'],
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
            name: '注册总量',
            type: 'line',
            data: [502.84, 205.97, 332.79, 281.55, 398.35, 214.02]
            },
            {
            name: '滑行的光点',
            type: 'lines',
            coordinateSystem: 'cartesian2d',
            polyline: true,
            effect: {
                show: true,
                period:10,
                trailLength:0.1,
                symbolSize: 8,
                symbol: 'circle',
                color: '#fff',
            },
            data: [{
                coords: [
                    ['A', 502.84],
                    ['B', 205.97],
                    ['C', 332.79],
                    ['D', 281.55],
                    ['E', 398.35],
                    ['F', 214.02],
                ]
            }]
            }
        ]
        };
onMounted(() => {
    console.log("111111-Echarts", echarts);
    charts.value = echarts.init(document.getElementById("linechart2"));
    charts.value.setOption(opt)
    // setTimeout(() => {
    //     charts.value.setOption(opt)
    // })
    setInterval(() => {
        charts.value.setOption(opt)
    }, 1000)

})

</script>

<style>

.line{
    /* background-color: #000000; */
}
#linechart2 {
    width: 800px;
    height: 400px;
}
</style>
