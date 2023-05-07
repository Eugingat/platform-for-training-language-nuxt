<template>
  <NuxtLayout name="admin">
    <AdminPanel></AdminPanel>
  </NuxtLayout>
</template>

<script>
definePageMeta({
  middleware: ['auth'],
});
</script>

<style scoped>

</style>