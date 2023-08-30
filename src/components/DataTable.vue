<script setup lang="ts">
import { useLocationStore } from '@/stores/location'
import { ref, computed } from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'
import type { ILocation } from '@/types/location'
const store = useLocationStore()

const page = ref(1)
const headers = ref([
  {
    title: 'Location',
    key: 'name'
  }
])
const itemPerPage = ref(10)
const selected = ref([])
const pageCount = computed(() => {
  return Math.ceil(store.getAllLocations.length / itemPerPage.value)
})

function handleDelete() {
  selected.value.forEach((item: ILocation) => {
    item.marker.setVisible(false)
  })
  store.removeLocation(selected.value)
  selected.value = []
}
</script>
<template>
  <div class="flex-auto w-96 pr-2">
    <div v-if="selected.length">
      <v-btn color="red" @click="handleDelete" class="w-full">Delete</v-btn>
    </div>
    <v-data-table
      v-model:page="page"
      v-model="selected"
      :sort-by="[{ key: 'created', order: 'desc' }]"
      :headers="headers"
      :items="store.getAllLocations"
      :items-per-page="itemPerPage"
      hide-default-footer
      class="elevation-1 h-[550px]"
      density="compact"
      show-select
      return-object
    >
      <template v-slot:bottom>
        <div class="text-center pt-2">
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>
      </template>
    </v-data-table>
  </div>
</template>
