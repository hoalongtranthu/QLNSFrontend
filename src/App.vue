<template>
  <div id="app">
    
      <TheNavBar/>
    <div class="content">
      <TheHeader/>
      <TheContent/>
    </div>
  </div>
</template>

<script>
import TheNavBar from './components/Layout/TheNavBar.vue';
import TheHeader from './components/Layout/TheHeader.vue';
import TheContent from './components/Layout/TheContent.vue';
export default {
  name: 'App',
  components: {
    TheNavBar,TheHeader,TheContent
  }
}
</script>

<style>
@import url('./style/main.css');
</style>
