<template>
  <div>
    <base-title>Izberi občino</base-title>
    <select @input="pickMunicipality">
      <option disabled value="" selected>Občina</option>
      <option v-for="municipality in municipalities">{{ municipality }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { Schedule } from '../types'
import { schedule } from '../helpers'
import BaseTitle from './BaseTitle.vue'

export default defineComponent({
  components: { BaseTitle },
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
