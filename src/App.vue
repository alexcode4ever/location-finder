<script setup lang="ts">
import '@mdi/font/css/materialdesignicons.css'
import HeaderLogo from './components/HeaderLogo.vue'
import FooterBar from './components/FooterBar.vue'
import MapView from './views/MapView.vue'
</script>

<template>
  <header class="flex items-center justify-center py-5"><HeaderLogo /></header>
  <MapView />
  <FooterBar />
</template>
