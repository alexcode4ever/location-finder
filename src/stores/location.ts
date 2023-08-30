import { defineStore } from 'pinia'
import type { ILocation } from '@/types/location'
import { v4 as uuidv4 } from 'uuid'

export const useLocationStore = defineStore('locationStore', {
  state: () => ({
    userLong: 0, // store user's current longitude
    userLat: 0, // store user's current latitude
    searchInput: '', // store user's search input
    locations: [] as ILocation[] // store user's searched locations
  }),
  getters: {
    getUserLong: (state) => state.userLong,
    getUserLat: (state) => state.userLat,
    getSearchInput: (state) => state.searchInput,
    getAllLocations: (state) => state.locations
  },
  actions: {
    setUserLong(long: number) {
      this.userLong = long
    },
    setUserLat(lat: number) {
      this.userLat = lat
    },
    setSearchInput(input: string) {
      this.searchInput = input
    },
    addLocation(location: ILocation) {
      const newLocation: ILocation = {
        id: uuidv4(),
        long: location.long,
        lat: location.lat,
        name: location.name,
        marker: location.marker,
        created: new Date(),
        timezone: location.timezone
      }
      this.locations.push(newLocation)
    },
    removeLocation(selectedLocation: ILocation[]) {
      this.locations = this.locations.filter((location) => !selectedLocation.includes(location))
    }
  }
})
