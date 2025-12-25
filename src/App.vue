<script setup lang="ts">
import MainLayout from './layouts/MainLayout.vue'
import ConfirmDialog from 'primevue/confirmdialog'
import DynamicDialog from 'primevue/dynamicdialog'
import Toast from 'primevue/toast'
</script>

<template>
  <MainLayout />
  <ConfirmDialog />
  <DynamicDialog />
  <Toast />
</template>

<style>
/* Global styles */
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Poppins', sans-serif;
  background-color: #f8fafc;
}
</style>
