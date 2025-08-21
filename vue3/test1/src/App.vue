<template>
  <div class="wrapper">
    <header class="header">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/spread">spread</RouterLink>
        </nav>
    </header>
    <div class="app-main">
      <RouterView />
    </div>
</div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';





</script>



<style scoped>

.wrapper{
  width: 100%;
  height: 100vh;
  .header{
    height: 60px;
  }

  .app-main{
    height: calc(100% - 60px);
    overflow-y: auto;
  }

  
}


nav {
  height: 100%;
  width: 100%;
  font-size: 12px;
  text-align: center;
  border-bottom: 1px solid red;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

</style>
