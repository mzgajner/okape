<template>
  <div class="text-lg">
    <base-title class="mb-4">{{ street }}</base-title>
    <ul>
      <li v-for="pickup in pickups" :key="pickup.type" class="leading-10">
        <span :class="`py-1 px-2 text-gray-900 rounded-md ${pickup.color}`">
          {{ pickup.type }}
        </span>
        <span class="text-purple-900">&nbsp;{{ pickup.time }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { generatePickups } from '../helpers'
import BaseTitle from './BaseTitle.vue'
import { computed } from 'vue'
import { Building, Municipality } from '../types'

const props = defineProps<{
  municipality: Municipality
  street: string
  buildingType: Building
  pickupDays: string
}>()
const pickups = computed(() => {
  const [regularPickupDay, organicPickupDay] = props.pickupDays.split('+')
  return generatePickups(
    regularPickupDay,
    organicPickupDay,
    props.buildingType,
    props.municipality
  )
})
</script>
