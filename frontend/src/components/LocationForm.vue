<template>
  <div class="space-y-6">
    <div>
      <label class="block text-sm font-medium mb-2">Tip stavbe</label>
      <div class="flex gap-2">
        <Button
          v-for="option in buildingOptions"
          :key="option.value"
          :variant="buildingType === option.value ? 'default' : 'outline'"
          @click="buildingType = option.value"
        >
          {{ option.label }}
        </Button>
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium mb-2">Občina</label>
      <Select v-model="selectedMunicipality">
        <SelectTrigger class="w-full">
          <SelectValue placeholder="Izberi občino..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            v-for="muni in municipalities"
            :key="muni"
            :value="muni"
          >
            {{ muni }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div v-if="selectedMunicipality" :key="selectedMunicipality">
      <label class="block text-sm font-medium mb-2">Ulica</label>
      <Popover v-model:open="streetOpen">
        <PopoverTrigger as-child>
          <Button
            variant="outline"
            role="combobox"
            :aria-expanded="streetOpen"
            class="w-full justify-between h-9 font-normal"
          >
            {{ selectedStreetLabel || 'Izberi ulico...' }}
            <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" class="p-0" :style="{ width: 'var(--reka-popover-trigger-width)' }">
          <Command v-model="selectedStreet">
            <CommandInput placeholder="Išči ulico..." />
            <CommandList>
              <CommandEmpty>Ni zadetkov.</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  v-for="street in filteredStreets"
                  :key="street.value"
                  :value="street.value"
                  class="justify-between"
                  @select="handleStreetSelect(street.value)"
                >
                  {{ street.label }}
                  <Check
                    class="h-4 w-4 shrink-0"
                    :class="selectedStreet === street.value ? 'opacity-100' : 'opacity-0'"
                  />
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>

    <div v-if="selectedMunicipality">
      <label class="block text-sm font-medium mb-2">Hišna številka</label>
      <Input
        v-model="houseNumber"
        placeholder="npr. 12B"
        @keyup.enter="submit"
      />
    </div>

    <Button
      class="w-full"
      size="lg"
      :disabled="!canSubmit || loading"
      @click="submit"
    >
      <template v-if="loading">
        <Loader2 class="mr-2 h-4 w-4 animate-spin" />
        Nalagam...
      </template>
      <template v-else>
        Poišči termine odvoza
      </template>
    </Button>

    <p v-if="error" class="text-destructive text-sm">{{ error }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { Check, ChevronsUpDown, Loader2 } from 'lucide-vue-next'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '#/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '#/components/ui/command'
import { streets } from '#/streets'
import type { BuildingType, SavedLocation } from '#/types'

const emit = defineEmits<{
  submit: [location: SavedLocation]
}>()

const props = defineProps<{
  loading?: boolean
  error?: string
}>()

const buildingOptions = [
  { value: 'hisa' as const, label: 'Hiša' },
  { value: 'blok' as const, label: 'Blok' },
]

const buildingType = ref<BuildingType>('hisa')
const selectedMunicipality = ref('')
const selectedStreet = ref<string>('')
const houseNumber = ref('')
const streetOpen = ref(false)

const municipalities = [...new Set(streets.map((s) => s.municipality))].sort()

// Streets filtered by selected municipality
const filteredStreets = computed(() =>
  streets
    .filter((s) => s.municipality === selectedMunicipality.value)
    .sort((a, b) => a.label.localeCompare(b.label, 'sl'))
)

// Label for the currently selected street
const selectedStreetLabel = computed(() => {
  const found = streets.find((s) => s.value === selectedStreet.value)
  return found?.label ?? ''
})

// Reset street when municipality changes
watch(selectedMunicipality, (newVal, oldVal) => {
  if (oldVal && newVal !== oldVal) {
    selectedStreet.value = ''
    streetOpen.value = false
  }
})

function handleStreetSelect(value: string) {
  selectedStreet.value = value
  streetOpen.value = false
}

const canSubmit = computed(() => selectedStreet.value && houseNumber.value.trim())

function submit() {
  if (!canSubmit.value || !selectedStreet.value) return
  emit('submit', {
    buildingType: buildingType.value,
    streetId: selectedStreet.value,
    houseNumber: houseNumber.value.trim().toUpperCase(),
  })
}
</script>
