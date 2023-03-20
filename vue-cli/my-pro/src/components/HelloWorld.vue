<template>
  <div>
    <h1>11111</h1>
    <Mind></Mind>
  </div>
</template>



<script>
import Mind from "./mind.vue";

export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  components: {
    Mind
  },

  methods: {
    changeMsg(v) {
      this.msg = v;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
