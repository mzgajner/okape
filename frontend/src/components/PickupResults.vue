<template>
  <div class="space-y-4">
    <ul class="space-y-3">
      <li
        v-for="pickup in nextPickups"
        :key="pickup.type"
        class="flex items-center gap-3"
      >
        <span
          class="inline-block w-3 h-3 rounded-full shrink-0"
          :style="{ backgroundColor: pickup.color }"
        />
        <span class="font-medium">{{ pickup.displayName }}</span>
        <span class="text-muted-foreground ml-auto whitespace-nowrap">{{ pickup.formattedDate }}</span>
      </li>
    </ul>

    <Button variant="ghost" class="w-full" @click="emit('reset')">
      Spremeni lokacijo
    </Button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { Button } from '#/components/ui/button'
import type { PickupEntry } from '#/types'
import { formatPickupDate } from '#/date-format'

const props = defineProps<{
  pickups: PickupEntry[]
}>()

const emit = defineEmits<{
  reset: []
}>()

// Map website names to short labels from the old app
const typeLabels: Record<string, string> = {
  'rumena vreča': 'embalaža',
  'mešan komunalni odpad': 'mešani odpadki',
  'papir, časopisi, revije': 'papir',
  'steklena embalaža': 'steklo',
  'tekstil': 'tekstil',
  'bela tehnika in elektronska oprema': 'elektronika',
  'bioloških odpadkov': 'biološki odpadki',
}

// Group by type and take only the next (earliest future) date for each
const nextPickups = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  const byType = new Map<string, PickupEntry>()

  for (const pickup of props.pickups) {
    if (pickup.date < today) continue
    const existing = byType.get(pickup.type)
    if (!existing || pickup.date < existing.date) {
      byType.set(pickup.type, pickup)
    }
  }

  return [...byType.values()]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((p) => ({
      ...p,
      displayName: typeLabels[p.type] || p.type,
      formattedDate: formatPickupDate(p.date),
    }))
})
</script>
