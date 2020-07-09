<template>
  <div id="app">
    <h1>Airplanes</h1>
    <Airplanes />
  </div>
</template>

<script>
import Airplanes from './components/Airplanes.vue'

export default {
  name: 'App',
  components: {
    Airplanes
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.card {
  margin: 10px;
  animation: opacityOn 1s normal forwards;
}

@keyframes opacityOn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>
