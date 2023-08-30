export interface ILocation {
  id?: string
  long: number
  lat: number
  name: string
  timezone: string
  created?: Date
  marker: google.maps.Marker
}
