<template>
  <div>
    <h1 class="step-title">Izberi ulico</h1>

    <select @input="pickStreet">
      <option disabled value="">Ulica/Kraj</option>
      <option v-for="street in streets">{{ street }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { schedule } from '../helpers'
import { municipality } from '../props'

export default defineComponent({
  name: 'PickStreet',
  props: { municipality },
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
