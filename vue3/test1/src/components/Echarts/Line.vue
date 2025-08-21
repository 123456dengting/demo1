<template>
    <div class="line">
        折线图1
        <div id="linechart"></div>
    </div>
</template>
<script setup>
import * as echarts from 'echarts';
import { ref, onMounted } from "vue";

const charts = ref();

const opt = {

color: ["#00D8FF"],
tooltip: {
    trigger: "axis",
},
legend: {
    y: "bottom",
    itemGap: 30,
    itemWidth: 30,
    itemHeight: 10,
    textStyle: {
        fontSize: 13, //字体大小
        color: "rgba(12,180,250, 1)", //字体颜色
    },
},
calculable: true,
xAxis: [
    {
        type: "category",
        boundaryGap: false,
        data: [
            "06:00",
            "09:00",
            "12:00",
            "15:00",
            "18:00",
            "21:00",
            "24:00",
        ],
        axisLabel: {
            show: true,
            textStyle: {
                color: ["rgb(142, 199, 220)"],
            },
        },
        axisLine: {
            lineStyle: {
                color: "#023c7a",
                width: 1,
            },
        },
    },
],
yAxis: [
    {
        type: "value",
        axisLabel: {
            formatter: "{value} °C",
        },
        splitLine: {
            lineStyle: {
                color: "#023c7a",
                width: 1,
            },
        },
        axisLine: {
            lineStyle: {
                color: "#023c7a",
                width: 1,
            },
        },
        axisLabel: {
            show: true,
            textStyle: {
                color: ["rgba(12,180,250, 1)"],
            },
        },
    },
],
series: [
    {
        symbolSize: 0, //折线点的大小
        type: "line",
        data: [6000, 4000, 8000, 10000, 4000, 2000, 4000, 2000, 6000],
        areaStyle: {
            normal: {
                //前四个参数代表位置 左下右上，暗青色到亮青色，
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "rgba(12,180,250, 1)" }, //从上往下的渐变
                    { offset: 1, color: "rgba(63, 208, 249, 0)" },
                ]),
            },
        },
        lineStyle: {
            shadowColor: "#5cfbff", //透明的颜色
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            opacity: 1, //透明度
            shadowBlur: 8, //阴影大小
            type: "solid", //实线
            width: 2,
        },
    },
],
};


// const doRender = () => {
// 	if (unref(elRef) && props.options) {
// 		echartRef?.clear();
// 		// 去除浏览器中重复创建实例的警告
// 		echartRef?.dispose();
// 		echartRef = echarts.init(unref(elRef) as HTMLElement);
// 		echartRef?.on("click", echartClick);
// 		echartRef?.on("dataZoom", dataZoomChange);

// 		echartRef?.resize({
// 			height: typeof props.height === "number" ? props.height : "auto",
// 			width: typeof props.width === "number" ? props.width : "auto"
// 		});
// 		echartRef?.setOption(unref(props.options));
// 		emit("event", echartRef);
// 	}
// };


// onMounted(() => {
// 	doRender();
// 	window.addEventListener("resize", resizeHandler);
// 	setTimeout(() => {
// 		doRender();
// 	}, 100);
// });

// onBeforeUnmount(() => {
// 	window.removeEventListener("resize", resizeHandler);
// });


onMounted(() => {
    console.log("111111-Echarts", echarts);
    charts.value = echarts.init(document.getElementById("linechart"));
    charts.value.setOption(opt)
    // window.addEventListener("resize", () => {
    //     console.log("111111-resize" )
    //     // charts.value.resize();
    // });

})

</script>

<style>

.line{
    /* background-color: #000000; */
}
#linechart {
    width: 800px;
    height: 400px;
}
</style>
