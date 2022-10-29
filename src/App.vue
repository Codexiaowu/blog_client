<template>
  <router-view name="default" />
  <div>666</div>
</template>

<script>
</script>

<style>
html {
  width: 100%;
  height: 100%;
  font-size: 14px;
}
body {
  height: 100%;
  background-color: #f5f5f5;
}
body,
p,
ul,
h1,
h2,
h3 {
  margin: 0;
  padding: 0;
}
#app {
  position: relative;
  min-width: 900px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100%;
  padding: 56px 0 250px;
  box-sizing: border-box;
}
.content-wrap {
  position: relative;
  width: 70%;
  max-width: 1200px;
  min-width: 900px;
  margin: 0 auto;
  box-sizing: border-box;
}
</style>
