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
    <p class="notice">
      {{
        garbagePickupDay
          ? `OKP pride v ${garbagePickupDay }.`
          : 'Izberi lokacijo.'
      }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VueMultiselect from "vue-multiselect";

import schedule from "./schedule.json";

const DAYS_LOCATIVE = {
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
      municipality: null,
      street: null,
    };
  },
  components: {
    VueMultiselect,
  },
  computed: {
    municipalities() {
      return Object.keys(schedule);
    },
    streets(): string[] {
      if (this.municipality) {
        return Object.keys(schedule[this.municipality] || {});
      } else {
        return []
      }
    },
    garbagePickupDay(): string {
      if (this.municipality && this.street) {
        const dayGenitive = schedule[this.municipality][this.street];
        return DAYS_LOCATIVE[dayGenitive];
      } else {
        return '';
      }
    }
  },
  watch: {
    municipality() {
      this.street = null;
    }
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
