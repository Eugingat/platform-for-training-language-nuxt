<template>
  <div class="main">
    <div v-for="({action}) in listActions" class="action" @click="chooseAction(action)" :key="action">
      <h1>{{action}} {{route.params.id}} </h1>
    </div>
  </div>

  <component :is="dynamicComponents[isChoosed]"></component>


</template>

<script setup>
  const route = useRoute();
  const listActions = [{ action: 'Create'}, {action: 'Show'}];
  const isChoosed = ref('Create');

  const dynamicComponents = shallowRef({
    Create: resolveComponent('AdminPanelComponentsWordsFeaturesCreate'),
    Show: resolveComponent('AdminPanelComponentsWordsFeaturesShow'),
  })

  const chooseAction = (action) => {
    isChoosed.value = action;
  }
</script>

<style scoped>
  .main {
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    justify-content: center;
    margin: 25px 100px;
  }

  .action {
    border: 1px solid #00dc82;
    box-shadow: 2px 2px 2px #00dc82;
    min-width: 400px;
    padding: 40px 40px;
    text-align: center;
    color: black;
    transition-duration: 1s;
  }

  .action:hover {
    box-shadow: 8px 8px 8px #00dc82;
  }
</style>