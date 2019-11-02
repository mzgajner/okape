<template>
  <div id="app">
    <img
      class="logo"
      src="./assets/garbage_truck.svg"
      title="Garbage Truck by Karla Design from the Noun Project."
    />
    <template v-if="pickups.length === 0">
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
    </template>
    <template v-else>
      {{ street }}<br>
      <a class="reset-link" href="#" @click.prevent="reset">resetiraj</a>
      <ul>
        <li
          v-for="pickup in pickups"
          :key="pickup.type"
        >
          <span :style="`background: ${pickup.color}`">{{ pickup.type }}</span>
          <br />
          {{ pickup.time }}
        </li>
      </ul>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VueMultiselect from "vue-multiselect";

import { Pickup, generatePickups } from './helpers';
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
      pickups: <Pickup[]>[],
    };
  },
  components: {
    VueMultiselect,
  },
  created() {
    this.municipality = localStorage.getItem('municipality');
    this.street = localStorage.getItem('street');
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
    garbagePickupDay(newValue) {
      if (newValue) {
        localStorage.setItem('municipality', this.municipality!);
        localStorage.setItem('street', this.street!);
        this.pickups = generatePickups(newValue);
      } else {
        localStorage.clear();
        this.pickups = [];
      }
    },
  },
  methods: {
    reset() {
      this.municipality = null;
      this.street = null;
    },
  },
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

li:not(:last-child) {
  margin-bottom: 0.5rem;
}

.reset-link {
  /* font-size: 0.75rem; */
  color: grey;
}
</style>
