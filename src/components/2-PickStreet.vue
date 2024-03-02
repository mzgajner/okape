<template>
  <div>
    <BaseTitle class="mb-4">Izberi ulico oz. kraj</BaseTitle>
    <BaseSelect
      @select="pickStreet"
      :options="streets"
      placeholder="Ulica/Kraj"
    />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

import { schedule } from '../helpers'
import BaseSelect from './BaseSelect.vue'
import BaseTitle from './BaseTitle.vue'

const props = defineProps<{ municipality: string }>()

const router = useRouter()

const streets = Object.keys(schedule[props.municipality])

const pickStreet = (street: string) =>
  router.push({
    name: 'PickBuildingType',
    params: { municipality: props.municipality, street },
  })
</script>
