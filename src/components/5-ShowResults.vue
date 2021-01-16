<template>
  <div>
    <base-title>{{ street }}</base-title>
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
import BaseTitle from './BaseTitle.vue'

export default defineComponent({
  components: { BaseTitle },
  props: { municipality, street, buildingType, pickupDays },
  computed: {
    pickups() {
      const [regularPickupDay, organicPickupDay] = this.pickupDays.split('+')
      return generatePickups(
        regularPickupDay,
        organicPickupDay,
        this.buildingType
      )
    },
  },
})
</script>

<style scoped>
.day-label {
  padding: 0 4px;
}
</style>
