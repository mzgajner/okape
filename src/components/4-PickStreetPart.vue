<template>
  <div>
    <BaseTitle class="mb-4">Izberi del ulice</BaseTitle>
    <BaseButton
      v-for="(pickupDays, index) in combinations"
      :key="pickupDays"
      :class="index !== 0 ? 'mb-4' : ''"
      class="mx-2"
      @click="pickStreetPart(pickupDays)"
    >
      {{ index + 1 }}. del
    </BaseButton>
  </div>
</template>

<script lang="ts" setup>
import { schedule } from '../helpers'
import { Building } from '../types'
import BaseButton from './BaseButton.vue'
import BaseTitle from './BaseTitle.vue'
import { generateCombinations } from '../helpers'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const props = defineProps<{
  municipality: string
  street: string
  buildingType: Building
}>()

const router = useRouter()
const combinations = computed(() => {
  const buildingSchedule =
    schedule[props.municipality][props.street][props.buildingType]
  return generateCombinations(buildingSchedule)
})

const pickStreetPart = (pickupDays: string) => {
  router.push({
    name: 'ShowResults',
    params: {
      municipality: props.municipality,
      street: props.street,
      buildingType: props.buildingType,
      pickupDays,
    },
  })
}
</script>
