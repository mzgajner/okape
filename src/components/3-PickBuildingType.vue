<template>
  <div class="step-title">
    <h1>Izberi tip stavbe</h1>
    <button @click="pickBuildingType('singleHome')">Hiša</button>
    <button @click="pickBuildingType('apartmentBuilding')">Blok</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { isEqual, isEmpty } from 'lodash-es'

import { schedule } from '../helpers'
import { Building } from '../types'
import { municipality, street } from '../props'

function maybeGetBuildingType(municipality: string, street: string) {
  // Get schedules for current municipality/street combination
  const { singleHome, apartmentBuilding } = schedule[municipality][street]

  const equalSchedules = isEqual(singleHome, apartmentBuilding)
  const emptyApartmentBuildingSchedule =
    isEmpty(apartmentBuilding.regular) && isEmpty(apartmentBuilding.organic)

  // If single homes and apartment buildings have the same schedule or if
  // the latter isn't available, we can safely use single home as building type.
  if (equalSchedules || emptyApartmentBuildingSchedule) {
    return Building.SingleHome
  }
}

export default defineComponent({
  name: 'PickBuildingType',
  beforeRouteEnter(to, from, next) {
    const { municipality, street } = to.params
    const buildingType = maybeGetBuildingType(municipality, street)

    if (buildingType) {
      next({
        name: 'PickStreetPart',
        params: { municipality, street, buildingType },
      })
    } else {
      next()
    }
  },
  props: { municipality, street },
  methods: {
    handleSelection(buildingType: string) {
      // The catch is there to ignore a harmless error about a double redirect.
      this.$router
        .push({
          name: 'PickStreetPart',
          params: {
            municipality: this.municipality,
            street: this.street,
            buildingType,
          },
        })
        .catch(() => {})
    },
  },
})
</script>
