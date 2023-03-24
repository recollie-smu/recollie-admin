<script setup lang="ts">
const recollieLogoUrl = new URL("/src/assets/recollieLogo.PNG", import.meta.url)
  .href;
</script>

<template>
  <va-navbar color="primary" class="mb-2">
    <template #left>
      <va-navbar-item class="logo">
        <picture class="pr-3">
          <source :srcset="recollieLogoUrl" type="image/png" />
          <img class="max-h-10" :src="recollieLogoUrl" />
        </picture>
        <h6>Recollie</h6>
      </va-navbar-item>
    </template>
    <template #right>
      <va-navbar-item>
        <router-link to="/">View All</router-link>
      </va-navbar-item>
      <va-navbar-item>
        <router-link to="/add">Upload Reminder</router-link>
      </va-navbar-item>
    </template>
  </va-navbar>
</template>

<style scoped>
.logo {
  font-weight: 600;
  font-size: 1.5rem;
}
</style>
