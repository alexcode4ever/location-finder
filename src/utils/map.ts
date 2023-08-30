import { Loader } from '@googlemaps/js-api-loader'
import { DateTime } from 'luxon'
// Google Map loader
const loader = new Loader({
  apiKey: import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY,
  version: 'weekly',
  libraries: ['places']
})

// Initialize Google Map
export const initMap = async () => {
  try {
    const { Map } = await loader.importLibrary('maps')
    return new Map(document.getElementById('map') as HTMLElement, {
      center: {
        lat: 43.76681,
        lng: -79.4163
      },
      zoom: 10
    })
  } catch (error) {
    console.log(error)
  }
}

// Add user cuurent location marker to map
type Location = {
  long: number
  lat: number
  name?: string
}
export const addCurrentLocationMarker = (map: google.maps.Map, position: Location) => {
  const infoWindow = new google.maps.InfoWindow()
  const pos = {
    lat: position.lat,
    lng: position.long
  }
  infoWindow.setPosition(pos)
  infoWindow.setContent('You are here.')
  infoWindow.open(map)
  map.setCenter(pos)
}

// Add place marker to map
export const addPlaceMarker = (map: google.maps.Map, place: google.maps.places.PlaceResult) => {
  const marker = new google.maps.Marker({
    map,
    position: place.geometry?.location as google.maps.LatLng,
    title: place.name
  })
  return marker
}

// Move map to place
export const moveMapToPlace = (map: google.maps.Map, place: google.maps.places.PlaceResult) => {
  map.setCenter(place.geometry?.location as google.maps.LatLng)
  map.setZoom(15)
}

// Fetch Timezone with Google Map Timezone API and typesafe it
type Timezone = {
  dstOffset: number
  rawOffset: number
  status: string
  timeZoneId: string
  timeZoneName: string
}
export const fetchTimezone = async (lat: number, long: number) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${long}&timestamp=1331161200&key=${
        import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY
      }`
    )
    const data: Timezone = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return { status: 'error' } as Timezone
  }
}

// Calculate time with timezone
export const getTime = (timeZoneId: string) => {
  const time = DateTime.now()
    .setZone(timeZoneId)
    .toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
  return time
}
