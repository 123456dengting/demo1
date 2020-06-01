<template>
  <div>
    <input type="text" v-model="m" v-on:change="changeMsg(m)">
    <p>{{msg}}</p>
  </div>
    
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg:{
      type: String,
      default(){
        return ''
      }
    },
    changeMsg: {
      type: Function,
      default(){
        return ()=> ''
      }
    }
  },
  data () {
    return {
      m:"123"
    }
  },
  methods:{
    onChanges(e){
      console.log(e)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
