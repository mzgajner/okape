<template>
  <div>
    <h1>Results are here!</h1>
    {{ municipality }}
    {{ street }}
    {{ buildingType }}
    {{ pickupDays }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { municipality, street, buildingType, pickupDays } from '../routes';

export default Vue.extend({
  name: 'PickMunicipality',
  props: { municipality, street, buildingType, pickupDays },
});
</script>

<style lang="scss" scoped>

</style>
