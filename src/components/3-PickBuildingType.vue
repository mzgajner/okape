<template>
  <div>
    <h1>Izberi tip stavbe</h1>
    <button @click="pickBuildingType('singleHome')">Hiša</button>
    <button @click="pickBuildingType('apartmentBuilding')">Blok</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';

import { schedule } from '../helpers';
import { municipality, street } from '../routes';

export default Vue.extend({
  name: 'PickBuildingType',
  beforeRouteEnter(to, from, next) {
    const { municipality, street } = to.params;

    // Get schedules for current municipality/street combination
    const { singleHome, apartmentBuilding } = schedule[municipality][
      street
    ];

    const equalSchedules = isEqual(singleHome, apartmentBuilding);
    const emptyApartmentBuildingSchedule =
      isEmpty(apartmentBuilding.regular) && isEmpty(apartmentBuilding.organic);

    // If single homes and apartment buildings have the same schedule or if
    // the latter isn't available, save the user some hassle and redirect
    // one step ahead
    if (equalSchedules || emptyApartmentBuildingSchedule) {
      return next({
        name: 'PickStreetPart',
        params: { municipality, street, buildingType: 'singleHome' },
      });
    } else {
      return next();
    }
  },
  props: { municipality, street },
  methods: {
    handleSelection(buildingType: string) {
      this.$router.push({
        name: 'PickStreetPart',
        params: {
          municipality: this.municipality,
          street: this.street,
          buildingType,
        },
      });
    },
  },
});
</script>
