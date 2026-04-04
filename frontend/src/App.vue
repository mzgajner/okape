<template>
  <div class="min-h-screen bg-background">
    <div class="max-w-md mx-auto px-4 py-8">
      <div class="text-center mb-8">
        <img src="./assets/garbage_truck.svg" alt="O Ka Pe" class="w-20 h-20 mx-auto mb-3" />
        <h1 class="text-2xl font-bold text-primary">O Ka Pe</h1>
        <p class="text-sm text-muted-foreground">Kdaj je naslednji odvoz?</p>
      </div>

      <Card>
        <CardContent class="pt-6">
          <PickupResults
            v-if="pickups.length"
            :pickups="pickups"
            @reset="resetLocation"
          />
          <div v-else-if="autoLoading" class="flex flex-col items-center gap-3 py-4">
            <Loader2 class="h-6 w-6 animate-spin text-muted-foreground" />
            <p class="text-sm text-muted-foreground">{{ autoLoadingLabel }}</p>
          </div>
          <LocationForm
            v-else
            :loading="loading"
            :error="error"
            @submit="handleSubmit"
          />
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Loader2 } from 'lucide-vue-next'
import { Card, CardContent } from '#/components/ui/card'
import LocationForm from '#/components/LocationForm.vue'
import PickupResults from '#/components/PickupResults.vue'
import { fetchPickups } from '#/api'
import { streets } from '#/streets'
import type { PickupEntry, SavedLocation } from '#/types'

const STORAGE_KEY = 'okape-location'

const pickups = ref<PickupEntry[]>([])
const loading = ref(false)
const error = ref('')
const autoLoading = ref(false)
const autoLoadingLabel = ref('')

function loadSavedLocation(): SavedLocation | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function saveLocation(location: SavedLocation) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(location))
}

function getLocationLabel(location: SavedLocation): string {
  const street = streets.find((s) => s.value === location.streetId)
  if (!street) return ''
  return `${street.label}, ${street.municipality}`
}

async function handleSubmit(location: SavedLocation) {
  loading.value = true
  error.value = ''

  const tipObjekta = location.buildingType === 'hisa' ? '1' : '3'

  try {
    const result = await fetchPickups(tipObjekta, location.streetId, location.houseNumber)
    if (result.length === 0) {
      error.value = 'Za izbrano lokacijo ni najdenih odvozov.'
      return
    }
    pickups.value = result
    saveLocation(location)
  } catch {
    error.value = 'Napaka pri pridobivanju podatkov. Poskusite znova.'
  } finally {
    loading.value = false
    autoLoading.value = false
  }
}

function resetLocation() {
  pickups.value = []
  localStorage.removeItem(STORAGE_KEY)
}

onMounted(() => {
  const location = loadSavedLocation()
  if (location) {
    autoLoading.value = true
    autoLoadingLabel.value = `Nalagam termine odvoza za ${getLocationLabel(location)}`
    handleSubmit(location)
  }
})
</script>
