
<template>
  <main>
    <button @click="onClick">点击</button>
    <TheWelcome v-if="showBtn" />
    <AHelloWorld v-if="showBtn"></AHelloWorld>
    <WelcomeItem v-if="showBtn"></WelcomeItem>
  </main>
</template>
<script setup>

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

</script>../components/AHelloWorld.vue
