<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue'
import TimeAlertBar from '@/components/TimeAlertBar.vue'
import DataTable from '@/components/DataTable.vue'
import { useLocationStore } from '@/stores/location'
import { ref } from 'vue'
import {
  initMap,
  addCurrentLocationMarker,
  addPlaceMarker,
  moveMapToPlace,
  fetchTimezone
} from '@/utils/map'
const store = useLocationStore()
const userLocationloading = ref(false)
const showUserLocation = ref(false)

// init Google Map instance
let map: google.maps.Map
initMap().then((googleMap) => {
  map = googleMap as google.maps.Map
})

// Emitted from SearchBar component when user clicks on the location button
function handleLocationClick() {
  userLocationloading.value = true
  navigator.geolocation.getCurrentPosition(
    (position) => {
      addCurrentLocationMarker(map, {
        long: position.coords.longitude,
        lat: position.coords.latitude
      })
      store.setUserLong(position.coords.longitude)
      store.setUserLat(position.coords.latitude)
      userLocationloading.value = false
      showUserLocation.value = true
    },
    (error) => {
      console.log(error.message)
    }
  )
}

// Emitted from SearchBar component when user searches for a location
function handleSearch(value: string) {
  if (value.length > 0) {
    store.setSearchInput(value)
    const service = new google.maps.places.PlacesService(map)
    service.findPlaceFromQuery(
      {
        query: value,
        fields: ['name', 'geometry']
      },

      function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          results?.forEach(async (place) => {
            const data = await fetchTimezone(
              place.geometry?.location?.lat() as number,
              place.geometry?.location?.lng() as number
            )
            const marker = addPlaceMarker(map, place)
            moveMapToPlace(map, place)
            store.addLocation({
              name: place.name ? place.name : 'Unknown',
              lat: place.geometry?.location?.lat() as number,
              long: place.geometry?.location?.lng() as number,
              marker: marker,
              timezone: data.timeZoneId
            })
          })
        }
      }
    )
  }
}
</script>

<template>
  <SearchBar
    @handle-location-click="handleLocationClick"
    @handle-search="handleSearch"
    :loading="userLocationloading"
    :show-user-location="showUserLocation"
  />
  <TimeAlertBar />
  <div class="py-2 block sm:flex">
    <DataTable class="w-full sm:w-96" />
    <div id="map" class="flex-auto w-full min-h-[550px]"></div>
  </div>
</template>
