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
import { defineComponent } from 'vue';

import { schedule } from '../helpers';
import { Building, BuildingSchedule, Weekday } from '../types';
import { municipality, street, buildingType } from '../props';

function generateCombinations(buildingSchedule: BuildingSchedule): string[] {
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

function maybeGetPickupDays(municipality: string, street: string, buildingType: Building) {
  // Get schedule for current municipality/street/buildingType combination
  const mySchedule = schedule[municipality][street][buildingType];

  // If there's only one option for a pickup day, just take that as street part.
  if (mySchedule.regular.length <= 1 && mySchedule.organic.length <= 1) {
    return generateCombinations(mySchedule)[0];
  }
}

export default defineComponent({
  name: 'PickStreetPart',
  props: { municipality, street, buildingType },
  beforeRouteEnter(to, from, next) {
    const { municipality, street, buildingType } = to.params;
    const pickupDays = maybeGetPickupDays(municipality, street, buildingType as Building)

    if (pickupDays) {
      next({
        name: 'ShowResults',
        params: { municipality, street, buildingType, pickupDays },
      });
    } else {
      next();
    }
  },
  computed: {
    combinations() {
      const buildingSchedule = schedule[this.municipality as string][this.street as string][
        this.buildingType as Building
      ];
      return generateCombinations(buildingSchedule);
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
