<template>
  <NuxtLayout name="admin">
    <component :is="dynamicComponents[route.params.id]"></component>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  middleware: ['auth'],
});
const route = useRoute();

const dynamicComponents = shallowRef({
  words: resolveComponent('AdminPanelComponentsWords'),
  sentences: resolveComponent('AdminPanelComponentsSentences'),
})

</script>

<style scoped>

</style>