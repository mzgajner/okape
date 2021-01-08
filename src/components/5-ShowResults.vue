<template>
  <div>
    <h1 class="step-title">{{ street }}</h1>

    <ul>
      <li v-for="pickup in pickups" :key="pickup.type">
        <span class="day-label" :style="`background: ${pickup.color}`">{{
          pickup.type
        }}</span>
        - {{ pickup.time }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { municipality, street, buildingType, pickupDays } from '../props'
import { generatePickups } from '../helpers'

export default defineComponent({
  name: 'ShowResults',
  props: { municipality, street, buildingType, pickupDays },
  computed: {
    pickups() {
      const [regularPickupDay, organicPickupDay] = this.pickupDays.split('+')
      return generatePickups(regularPickupDay!)
    },
  },
})
</script>

<style scoped>
.day-label {
  padding: 0 4px;
}
</style>
