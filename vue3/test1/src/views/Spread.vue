<template>
    <div class="componentContainer gc-scrollbar">


      <div>
        <input type="file" id="fileInput" accept=".xlsx,.xls"/>
        <button @click="importExcel">导入Excel</button>
        <div><button @click="onExport">导出Excel</button></div>
      </div>


      
      
      <p>以下示例展示如何绑定数据。  <button @click="onClick">点击</button> </p>


  
      <div class="spreadContainer">
        <gc-spread-sheets-designer
          :styleInfo="{ height: '100%', width: '100%' }"
          :config="null"
          @designerInitialized="initSpread"
        />
      </div>
    </div>
  </template>
<script setup>
import "@grapecity-software/spread-sheets-designer/styles/gc.spread.sheets.designer.min.css";
import "@grapecity-software/spread-sheets/styles/gc.spread.sheets.excel2013white.css";

import dataService from "./dataService";
import { saveAs } from 'file-saver'
import "@grapecity-software/spread-sheets-vue";
import * as GC from "@grapecity-software/spread-sheets";
import "@grapecity-software/spread-sheets-charts";
import "@grapecity-software/spread-sheets-shapes";
import "@grapecity-software/spread-sheets-slicers";
import "@grapecity-software/spread-sheets-print";
import "@grapecity-software/spread-sheets-barcode";
import "@grapecity-software/spread-sheets-pdf";
import "@grapecity-software/spread-sheets-formula-panel";
import "@grapecity-software/spread-sheets-io";
import "@grapecity-software/spread-sheets-resources-zh";
import "@grapecity-software/spread-sheets-designer-resources-cn";
import "@grapecity-software/spread-sheets-designer";
import {ref} from "vue";

GC.Spread.Common.CultureManager.culture("zh-cn");

const spreadObj = ref();

const onClick = () => {
  console.log("111111-spreadObj", spreadObj);

  console.log("111111-sheet",  spreadObj.value.getSheetCount(),  spreadObj.value.getSheet(0))
  
}

const initSpread = (value) => {
    let spread = value.getWorkbook();
    spreadObj.value = spread;

    let sheet = spread.getActiveSheet();
    

    // 监听表格变化事件
    spread.bind(GC.Spread.Sheets.Events.CellChanged, function (sender, args) {
      console.log("111111-args", args);
    console.log('CellChanged event fired for Cell[' + args.row + "," + args.col + "] having value " + sheet.getValue(args.row, args.col));
    });

    let colInfos = [
      // { name: "order_num", displayName: "订单编号", width: 100 },
      // { name: "order_date", displayName: "订购日期", width: 150 },
      // { name: "type_name", displayName: "类别名称" },
      // { name: "product_name", displayName: "产品名称" },
      { name: "quantity", displayName: "购买数量" },
      { name: "unit_price", displayName: "产品单价" },
      { name: "total", displayName: "售价" },
      // { name: "cost", displayName: "产品成本" },
      // { name: "discount", displayName: "折扣" },
      // { name: "order_amount", displayName: "订单金额" },
      // { name: "order_profit", displayName: "订单利润" },
      // { name: "sales_area", displayName: "销售大区" },
      // { name: "province", displayName: "销售省份" },
      // { name: "city", displayName: "销售城市" },
      // { name: "store", displayName: "销售门店" },
      // { name: "consultant", displayName: "销售顾问" },
      // { name: "pay_method", displayName: "支付方式" },
      // { name: "cus_name", displayName: "顾客姓名" },
      // { name: "cus_phone", displayName: "顾客电话" },
    ];
    sheet.autoGenerateColumns = false;

    // sheet.setRowCount(10);
    // sheet.getCell(0, 1).formatter("yyyy/mm/dd hh:mm:ss");
    // const dataSource = sheet.getDataSource();
    // console.log("111111-dataSource", dataSource);
    // for (let i = 0; i < 2; i++) {
    //   dataSource[6+ i] = { order_num: "1234567890", order_date: "2023-01-01" };
    // }
    sheet.setDataSource([
      {
        quantity: 5,
        unit_price: 6
      },
      {
        quantity: 10,
        unit_price: 20
      },
      {
        quantity: 15,
        unit_price: 30
      },
      {
        quantity: 15,
        unit_price: 30
      },
      {
        quantity: 15,
        unit_price: 30
      }
    ]);


    //本示例使用setArray方法
//设定值
// spread.suspendEvent();
setTimeout(() => {
  // var array = [[3,2],[4,5],[6,7]];
  // sheet.setArray(0, 0, array);

  // var array1 = [["=1+1","=1+1"],["=4+4","=5+5"],["=6+6","=7+7",]];
  // sheet.setArray(0, 0, array1, true);

  // 设置C列公式为A列*B列（从第0行开始）结果放在第0开始属2列,  公计算到第1开始数5行

  // sheet.getRange(0, 2, 5, 1).formula('=A1*B1', true);

  // 设置第一行的 第三列等于A1*B1
  // sheet.setFormula(0, 2,  '=A1*B1');


}, 100);
// var array = [[1,2],[4,5],[6,7]];
// sheet.setArray(0, 0, array);
// spread.resumeEvent();
// //设定公式
// var array = [["=1+1","=2+2","=3+3"],["=4+4","=5+5"],["=6+6","=7+7","=8+8","=9+9"]];
// sheet.setArray(1, 2, array, true);
// //设定值
// var newArray = sheet.getArray(1, 2, 3, 4);
// //getformula
// var newArray = sheet.getArray(1, 2, 3, 4, true);
// //alert(newArray[0]);


const dataSource = sheet.getDataSource();
    console.log("111111-dataSource", dataSource);

  
    sheet.bindColumns(colInfos);
}


const importExcel = () => {
    const file = document.getElementById("fileInput").files[0];
    spreadObj.value.import(
      file,
      function(res) { // 成功回调
        console.log("导入成功！", res);
        // 可在此处执行数据操作（如sheet.setArray等）
      },
      function(error) { // 失败回调
        console.error("导入失败:", error);
      },
      { fileType: GC.Spread.Sheets.FileType.excel } // 指定Excel格式
    );
}

const onExport = () => {
  var fileName = "fileNamehere.xlsx";      
            spreadObj.value.export(function (blob) {
                // 将 blob 保存为文件
                saveAs(blob, fileName);
            }, function (e) {
               console.log(e);
            }, {
               fileType: GC.Spread.Sheets.FileType.excel
            });
      }

</script>

<style>

.componentContainer {
  position: absolute;
  padding: 10px;
  left: 242px;
  top: 60px;
  bottom: 20px;
  right: 3px;
  overflow-y: auto;
  overflow-x: hidden;
}
.spreadContainer {
  position: absolute;
  top: 90px;
  padding: 10px;
  /*width: 100%;*/
  /*height: 240px;*/
  left: 10px;
  right: 10px;
  bottom: 10px;
  box-shadow: 0 0 20px grey;
}
.test-btn-list {
  /*padding: 20px;*/
  position: absolute;
  bottom: 0px;
  height: 150px;
}
.test-btn-list label {
  display: inline-flex;
  margin: 10px 20px;
}
.spread-host {
  width: 100%;
  height: 100%;
}
</style>
