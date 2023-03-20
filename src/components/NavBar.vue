<template>
  <va-navbar
    color="primary"
    class="mb-2"
  >
    <template #left>
      <va-navbar-item class="logo">
        Recollie
      </va-navbar-item>
    </template>
    <template #right>
      <va-navbar-item>Upload Reminder</va-navbar-item>
      <va-navbar-item>View All</va-navbar-item>
      <va-navbar-item>Update Reminders</va-navbar-item>
    </template>
  </va-navbar>
</template>

<style scoped>
.logo {
  font-weight: 600;
  font-size: 1.5rem;
}
</style>
