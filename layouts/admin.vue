<template>
  <div class="main">
    <Notification :className="className" :text="textNotification"/>
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
const isShowNotification = ref<boolean>(false);
const className = ref<string>('default');
const textNotification = ref<string>('');
const route = useRoute();
const router = useRouter();
const callNotification = (code: number) => {
  switch (code) {
    case 403:
      className.value = 'error';
      textNotification.value = 'Your session has ended or the token has expired. Please sign in again';
      isShowNotification.value = true;
      break;
  }
};

if (route.query.code) {
  callNotification(Number(route.query.code));
  router.push(route.path);
}

</script>

<style scoped>

.body {
  background-color: black !important;
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