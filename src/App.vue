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
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style src="./main.css"></style>
