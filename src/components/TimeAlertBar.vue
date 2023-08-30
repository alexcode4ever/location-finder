<script setup lang="ts">
import { useLocationStore } from '@/stores/location'
import { getTime } from '@/utils/map'
import { computed, ref } from 'vue'
const store = useLocationStore()
const localTime = ref('')
const latestLocation = computed(() => {
  return store.getAllLocations[store.getAllLocations.length - 1].name
})
store.$subscribe((_mutation, _state) => {
  if (store.getAllLocations.length > 0) {
    const lastRecord = store.getAllLocations[store.getAllLocations.length - 1]
    localTime.value = getTime(lastRecord.timezone)
  }
})
</script>

<template>
  <v-alert icon="mdi-information-outline" class="mt-2" v-if="store.getAllLocations.length === 0"
    >Search a location to get the local time of a place</v-alert
  >
  <v-alert icon="mdi-map-clock  " class="mt-2" v-if="store.getAllLocations.length > 0"
    >The local time for {{ latestLocation }} is {{ localTime }}</v-alert
  >
</template>
