<template>
  <div id="app">
    <img
      class="logo"
      src="./assets/garbage_truck.svg"
      title="Garbage Truck by Karla Design from the Noun Project."
    />

    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
});
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style src="./main.css"></style>
