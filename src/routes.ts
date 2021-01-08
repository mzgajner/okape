import PickMunicipality from './components/1-PickMunicipality.vue'
import PickStreet from './components/2-PickStreet.vue'
import PickBuildingType from './components/3-PickBuildingType.vue'
import PickStreetPart from './components/4-PickStreetPart.vue'
import ShowResults from './components/5-ShowResults.vue'

export default [
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
  },
  {
    path: '/:municipality/:street/:buildingType',
    component: PickStreetPart,
    props: true,
    name: 'PickStreetPart',
  },
  {
    path: '/:municipality/:street/:buildingType/:pickupDays',
    component: ShowResults,
    props: true,
    name: 'ShowResults',
  },
]
