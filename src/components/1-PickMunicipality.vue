<template>
  <div>
    <BaseTitle class="mb-4">Izberi občino</BaseTitle>
    <BaseSelect
      @select="pickMunicipality"
      :options="municipalities"
      placeholder="Občina"
    />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

import { schedule } from '../helpers'
import BaseSelect from './BaseSelect.vue'
import BaseTitle from './BaseTitle.vue'

const router = useRouter()
const municipalities = Object.keys(schedule)
const pickMunicipality = (municipality: string) => {
  router.push({ name: 'PickStreet', params: { municipality } })
}
</script>
