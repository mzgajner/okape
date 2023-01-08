<template>
  <div>
    <BaseTitle class="mb-4">Izberi tip stavbe</BaseTitle>
    <BaseButton @click="pickBuildingType('singleHome')"> Hiša </BaseButton>
    <BaseButton class="ml-4" @click="pickBuildingType('apartmentBuilding')">
      Blok
    </BaseButton>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import BaseButton from './BaseButton.vue'
import BaseTitle from './BaseTitle.vue'

const props = defineProps<{ municipality: string; street: string }>()
const router = useRouter()
const pickBuildingType = (buildingType: string) => {
  router.push({
    name: 'PickStreetPart',
    params: {
      municipality: props.municipality,
      street: props.street,
      buildingType,
    },
  })
}
</script>
