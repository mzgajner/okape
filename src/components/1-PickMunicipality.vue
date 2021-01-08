<template>
  <div>
    <h1 class="step-title">Izberi občino</h1>
    <select @input="pickMunicipality">
      <option disabled value="">Občina</option>
      <option v-for="municipality in municipalities">{{ municipality }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { Schedule } from '../types'
import { schedule } from '../helpers'

export default defineComponent({
  name: 'PickMunicipality',
  computed: {
    municipalities(): string[] {
      return Object.keys(schedule)
    },
  },
  methods: {
    pickMunicipality(event: Event) {
      const municipality = event.currentTarget.value
      this.$router.push({ name: 'PickStreet', params: { municipality } })
    },
  },
})
</script>
