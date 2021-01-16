<template>
  <div>
    <base-title class="mb-4">Izberi tip stavbe</base-title>
    <base-button @click="pickBuildingType('singleHome')">Hiša</base-button>
    <base-button @click="pickBuildingType('apartmentBuilding')" class="ml-4">
      Blok
    </base-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { isEqual, isEmpty } from 'lodash-es'

import { schedule } from '../helpers'
import { Building } from '../types'
import { municipality, street } from '../props'
import BaseButton from './BaseButton.vue'
import BaseTitle from './BaseTitle.vue'

function maybeGetBuildingType(municipality: string, street: string) {
  // Get apartment building schedule for current municipality/street combination
  const apartmentBuilding = schedule[municipality][street].apartmentBuilding

  const emptyApartmentBuildingSchedule =
    isEmpty(apartmentBuilding.regular) && isEmpty(apartmentBuilding.organic)

  // If apartment building schedule is empty, auto-select single home as
  // building type.
  if (emptyApartmentBuildingSchedule) {
    return Building.SingleHome
  }
}

export default defineComponent({
  components: {
    BaseButton,
    BaseTitle,
  },
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
    pickBuildingType(buildingType: string) {
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
