<template>
  <div class="main">
    <header>
    </header>
    <div>
      <slot></slot>
    </div>
    <footer>
    </footer>
  </div>
</template>

<script setup>

const callAlert = () => {
  console.log(1111111);
}

provide('alert', callAlert)
</script>

<style scoped>

.body {
  background-color: black!important;
}

.main {
  display: grid;
  height: 100vh;
  grid-template-rows: auto 1fr auto;
}

header,
footer {
  height: 75px;
  background-color: #00dc82;
}

</style>