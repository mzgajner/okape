<template>
  <div>
    <base-title class="mb-4">Izberi občino</base-title>
    <base-select
      @select="pickMunicipality"
      :options="municipalities"
      placeholder="Občina"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { Schedule } from '../types'
import { schedule } from '../helpers'
import BaseSelect from './BaseSelect.vue'
import BaseTitle from './BaseTitle.vue'

export default defineComponent({
  components: {
    BaseSelect,
    BaseTitle,
  },
  computed: {
    municipalities(): string[] {
      return Object.keys(schedule)
    },
  },
  methods: {
    pickMunicipality(municipality: string) {
      this.$router.push({ name: 'PickStreet', params: { municipality } })
    },
  },
})
</script>
