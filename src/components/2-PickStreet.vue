<template>
  <div>
    <base-title>Izberi ulico oz. kraj</base-title>
    <base-select
      class="mt-4"
      @select="pickStreet"
      :options="streets"
      placeholder="Ulica/Kraj"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { schedule } from '../helpers'
import { municipality } from '../props'
import BaseSelect from './BaseSelect.vue'
import BaseTitle from './BaseTitle.vue'

export default defineComponent({
  props: { municipality },
  components: {
    BaseSelect,
    BaseTitle,
  },
  computed: {
    streets(): string[] {
      return Object.keys(schedule[this.municipality])
    },
  },
  methods: {
    pickStreet(street: string) {
      // The catch is there to ignore a harmless error about a double redirect.
      this.$router
        .push({
          name: 'PickBuildingType',
          params: { municipality: this.municipality, street },
        })
        .catch(() => {})
    },
  },
})
</script>
