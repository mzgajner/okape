import { RouteRecordRaw } from 'vue-router'
import PickMunicipality from './components/1-PickMunicipality.vue'
import PickStreet from './components/2-PickStreet.vue'
import PickBuildingType from './components/3-PickBuildingType.vue'
import PickStreetPart from './components/4-PickStreetPart.vue'
import ShowResults from './components/5-ShowResults.vue'

import { maybeGetBuildingType, maybeGetPickupDays } from './helpers'
import { Building } from './types'

export default <RouteRecordRaw[]>[
  {
    path: '/',
    component: PickMunicipality,
    props: true,
    name: 'PickMunicipality',
  },
  {
    path: '/:municipality',
    component: PickStreet,
    props: true,
    name: 'PickStreet',
  },
  {
    path: '/:municipality/:street',
    component: PickBuildingType,
    props: true,
    name: 'PickBuildingType',
    beforeEnter: (to) => {
      const { municipality, street } = to.params
      const buildingType = maybeGetBuildingType(
        municipality.toString(),
        street.toString(),
      )

      if (buildingType) {
        return {
          name: 'PickStreetPart',
          params: { municipality, street, buildingType },
        }
      }
    },
  },
  {
    path: '/:municipality/:street/:buildingType',
    component: PickStreetPart,
    props: true,
    name: 'PickStreetPart',
    beforeEnter: (to) => {
      const { municipality, street, buildingType } = to.params
      const pickupDays = maybeGetPickupDays(
        municipality.toString(),
        street.toString(),
        buildingType as Building,
      )

      if (pickupDays) {
        return {
          name: 'ShowResults',
          params: { municipality, street, buildingType, pickupDays },
        }
      }
    },
  },
  {
    path: '/:municipality/:street/:buildingType/:pickupDays',
    component: ShowResults,
    props: true,
    name: 'ShowResults',
  },
]
