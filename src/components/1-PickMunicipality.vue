<template>
  <div>
    <h1 class="step-title">Izberi občino</h1>
    <vue-multiselect
      :allow-empty="false"
      :options="municipalities"
      :showLabels="false"
      :searchable="false"
      @input="pickMunicipality"
      placeholder="Občina"
      class="dropdown"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VueMultiselect from "vue-multiselect";

import { Schedule } from '../types';
import { schedule } from "../helpers";

export default Vue.extend({
  name: 'PickMunicipality',
  components: {
    VueMultiselect,
  },
  computed: {
    municipalities(): string[] {
      return Object.keys(schedule);
    },
  },
  methods: {
    pickMunicipality(municipality: string) {
      this.$router.push({ name: 'PickStreet', params: { municipality } })
    }
  },
});
</script>
