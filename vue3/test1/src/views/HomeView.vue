
<template>
  <main>
    

    <div><button @click="onClick">点击</button></div>

    <div><button @click="exportDynamicTable">点击-导出简单doc表格</button></div>

    <div id="export-table" style="width: 800px">

      <h1>标题111</h1>

      <p>丰东股份赣服通很反感讲话稿积分工会结核杆菌更何况几哈丰东股份赣服通很反感讲话稿积分工会结核杆菌更何况几哈丰东股份赣服通很反感讲话稿积分工会结核杆菌更何况几哈丰东股份赣服通很反感讲话稿积分工会结核杆菌更何况几哈丰东股份赣服通很反感讲话稿积分工会结核杆菌更何况几哈丰东股份赣服通很反感讲话稿积分工会结核杆菌更何况几哈</p>

      <table  cellpadding="0" border="0" cellspacing="0" style="width: 100%">
        <tr><td>名称: 123</td><td>长度: 1</td></tr>
        <tr><td>名称: 123</td><td>长度: 1</td></tr>
        <tr><td>名称: 123</td><td>长度: 1</td></tr>
        <tr><td>名称: 123</td><td>长度: 1</td></tr>
        
    </table>
    <table  cellpadding="0" border="1" cellspacing="0" style="width: 100%">
      <tr><td>111</td><td>222</td></tr>
      <tr><td>333</td><td>555</td></tr>
      <tr><td>5435</td><td>564</td></tr>
      <tr><td>完34</td><td>756756</td></tr>
    </table>
  </div>

    
    <TheWelcome v-if="showBtn" />
    <AHelloWorld v-if="showBtn"></AHelloWorld>
    <WelcomeItem v-if="showBtn"></WelcomeItem>
  </main>
</template>
<script setup>


import { asBlob } from "html-docx-js-typescript";
import {saveAs} from "file-saver";

import { defineAsyncComponent, ref } from 'vue';
// import HelloWorld from "../components/HelloWorld.vue";
import TheWelcome from "../components/TheWelcome.vue";
const AHelloWorld = defineAsyncComponent(() => import('../components/AHelloWorld.vue'))
// const TheWelcome = defineAsyncComponent(() => import('../components/TheWelcome.vue'))
const WelcomeItem = defineAsyncComponent(() => import('../components/WelcomeItem.vue'))
const showBtn = ref(false);

const onClick = () => {
  showBtn.value = true;
}



// 导出world表格
const exportDynamicTable = async () => {


      const doc = document.getElementById("export-table")

      console.log("111111-doc", doc.innerHTML);
      
      const blob = await asBlob(doc.innerHTML);
      saveAs(blob, "table.docx");
    

}





</script>
