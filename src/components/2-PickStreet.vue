<template>
  <div>
    <base-title>Izberi ulico oz. kraj</base-title>

    <select @input="pickStreet">
      <option disabled value="" selected>Ulica/Kraj</option>
      <option v-for="street in streets">{{ street }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { schedule } from '../helpers'
import { municipality } from '../props'
import BaseTitle from './BaseTitle.vue'

export default defineComponent({
  props: { municipality },
  components: { BaseTitle },
  computed: {
    streets(): string[] {
      return Object.keys(schedule[this.municipality])
    },
  },
  methods: {
    pickStreet(event: Event) {
      const street = event.currentTarget.value

      // The catch is there to ignore a harmless error about a double redirect.
      this.$router
        .push({
          name: 'PickBuildingType',
          params: { municipality: this.municipality, street },
        })
        .catch(() => {})
    },
  },
})
</script>
