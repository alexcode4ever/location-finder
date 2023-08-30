<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLocationStore } from '@/stores/location'
import { ref } from 'vue'

const store = useLocationStore()
const { userLat, userLong } = storeToRefs(store)
const emit = defineEmits(['handleSearch'])
defineProps({
  loading: Boolean,
  showUserLocation: Boolean
})
const input = ref('')
function search() {
  emit('handleSearch', input.value)
  input.value = ''
}
</script>

<template>
  <v-card color="grey-lighten-3 w-full">
    <v-card-text class="flex items-center justify-center space-x-1">
      <v-text-field
        label="Search location"
        density="compact"
        variant="solo"
        prepend-icon="mdi-magnify"
        single-line
        hide-details
        v-model="input"
        @keyup.enter="search"
      ></v-text-field>
      <v-btn prepend-icon="mdi-magnify" size="large" class="bg-blue" @click="search">
        Search
      </v-btn>
      <v-btn
        :loading="loading"
        prepend-icon="mdi-map-marker"
        size="large"
        class="bg-green"
        @click="$emit('handleLocationClick')"
      >
        Locate me
      </v-btn>
    </v-card-text>
    <v-card-subtitle v-if="showUserLocation">
      Your longitude is {{ userLat }}, latitude is {{ userLong }}</v-card-subtitle
    >
  </v-card>
</template>
