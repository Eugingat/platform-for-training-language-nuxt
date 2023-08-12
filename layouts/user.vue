<template>
  <Notification :className="className" :text="textNotification"/>
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

<script setup lang="ts">
const className = ref<string>('default');
const textNotification = ref<string>('');
const route = useRoute();
const router = useRouter();
const callNotification = (code: number) => {
  switch (code) {
    case 201:
      className.value = 'success';
      textNotification.value = 'Account registered successfully';
      break;
    case 403:
      className.value = 'error';
      textNotification.value = 'Your session has ended or the token has expired. Please sign in again';
      break;
  }

  router.push(route.path);
};

if (route.query.code) {
  callNotification(Number(route.query.code));
}

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