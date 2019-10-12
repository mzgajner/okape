<template>
  <div id="app">
    <img
      class="logo"
      src="./assets/garbage_truck.svg"
      title="Garbage Truck by Karla Design from the Noun Project."
    />
    <vue-multiselect
      :allow-empty="false"
      :options="municipalities"
      :showLabels="false"
      :searchable="false"
      v-model="municipality"
      placeholder="Občina"
      class="dropdown"
    />
    <vue-multiselect
      :allow-empty="false"
      :disabled="!municipality"
      :options="streets"
      :showLabels="false"
      v-model="street"
      placeholder="Ulica/Kraj"
      class="dropdown"
    />
    <p class="notice" v-html="upcoming || 'Izberi lokacijo.'" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VueMultiselect from "vue-multiselect";

import { generateDates } from './helpers';
import schedule from "./schedule.json";

const DAYS_LOCATIVE:{[key:string]: string} = {
  'ponedeljek': 'ponedeljek',
  'torek': 'torek',
  'sreda': 'sredo',
  'četrtek': 'četrtek',
  'petek': 'petek',
}

export default Vue.extend({
  name: "app",
  data() {
    return {
      municipality: <string|null>null,
      street: <string|null>null,
      schedule: schedule as {[key:string]: {[key:string]: string}},
      upcoming: <string>'',
    };
  },
  components: {
    VueMultiselect,
  },
  computed: {
    municipalities(): string[] {
      return Object.keys(this.schedule);
    },
    streets(): string[] {
      if (this.municipality) {
        return Object.keys(this.schedule[this.municipality] || {});
      } else {
        return []
      }
    },
    garbagePickupDay(): string|null {
      if (this.municipality && this.street) {
        return this.schedule[this.municipality][this.street];
      } else {
        return null;
      }
    }
  },
  watch: {
    municipality() {
      this.street = null;
    },
    garbagePickupDay(newValue) {
      this.upcoming = newValue ? generateDates(newValue) : '';
    },
  }
});
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
* {
  box-sizing: border-box;
}
html, body {
  height: 100%;
}
body {
  color: #35495E;
  display: flex;
  font-size: 18px;
  justify-content: center;
  margin: 0;
  padding: 1rem;
}

#app {
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  font-family: Courier New, Helvetica, Arial, sans-serif;
  justify-content: center;
  max-width: 400px;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.logo {
  margin: 1rem 0;
  width: 100px;
}

.dropdown {
  margin: 0.5rem 0;
}

.notice {
  margin: 1rem 0;
}
</style>
