<template>
  <div>
    <h1>Izberi del ulice</h1>
    <button
      v-for="(pickupDays, index) in combinations"
      :key="pickupDays"
      @click="pickStreetPart(pickupDays)"
    >
      {{ index + 1 }}. del
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { schedule } from '../helpers';
import { Building, Weekday, BuildingSchedule } from '../types';
import { municipality, street, buildingType } from '../routes';

const generateCombinations = (buildingSchedule: BuildingSchedule): string[] => {
    let { regular, organic } = buildingSchedule;

    if (regular.length === 0) return organic.map((d: Weekday) => `null+${d}`);
    if (organic.length === 0) return regular.map((d: Weekday) => `${d}+null`);

    const combinations = [] as string[];

    regular.forEach((regularDay: Weekday) => {
      organic.forEach((organicDay: Weekday) => {
        combinations.push(`${regularDay}+${organicDay}`);
      });
    });

    return combinations;
}

export default Vue.extend({
  name: 'PickStreetPart',
  beforeRouteEnter(to, from, next) {
    const { municipality, street, buildingType } = to.params;

    // Get schedule for current municipality/street/buildingType combination
    const mySchedule = schedule[municipality][street][buildingType as Building];

    // If there's only one option for a pickup day, save the user some hassle
    // and redirect one step ahead
    if (mySchedule.regular.length <= 1 && mySchedule.organic.length <= 1) {
      const pickupDays = generateCombinations(mySchedule)[0];
      next({
        name: 'ShowResults',
        params: { municipality, street, buildingType, pickupDays },
      });
    } else {
      next();
    }
  },
  props: { municipality, street, buildingType },
  computed: {
    buildingSchedule(): BuildingSchedule {
      return schedule[this.municipality as string][this.street as string][
        this.buildingType as Building
      ];
    },
    combinations() {
      return generateCombinations(this.buildingSchedule);
    },
  },
  methods: {
    pickStreetPart(pickupDays: string) {
      this.$router.push({
        name: 'ShowResults',
        params: {
          municipality: this.municipality,
          street: this.street,
          buildingType: this.buildingType,
          pickupDays
        },
      });
    },
  },
});
</script>

<style lang="scss" scoped></style>
