<template>
  <div>
    <h1>Izberi ulico</h1>
    <vue-multiselect
      :allow-empty="false"
      :options="streets"
      :showLabels="false"
      @input="pickStreet"
      placeholder="Ulica/Kraj"
      class="dropdown"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VueMultiselect from 'vue-multiselect';

import { schedule } from "../helpers";
import { municipality } from '../routes';

export default Vue.extend({
  name: 'PickStreet',
  props: { municipality },
  components: {
    VueMultiselect,
  },
  computed: {
    streets(): string[] {
      return Object.keys(schedule[this.municipality]);
    },
  },
  methods: {
    pickStreet(street: string) {
      this.$router.push({
        name: 'PickBuildingType',
        params: { municipality: this.municipality, street },
      });
    },
  },
});
</script>
