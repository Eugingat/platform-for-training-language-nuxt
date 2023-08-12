<template>
  <NuxtLayout name="user">
      <UserPanel></UserPanel>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  middleware: ['auth'],
});


</script>

<style scoped>

</style>