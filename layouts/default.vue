<template>
  <div id="app">
    <NavBar/>
    <nuxt class="container"/>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import BootStrap from "bootstrap-vue";
export default {
  components: {
    NavBar
  }
};
</script>

