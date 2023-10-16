<template>
  <Notification :className="className" :text="textNotification"/>
  <div class="main">
    <header>
      <div @click="back">
        <Icon name="ci:chevron-big-left" size="3em" color="white" v-if="!isRootPath"/>
      </div>
      <div class="themeAndLang">
        <p>EN</p>
        <Icon name="mdi:theme-light-dark" size="3em" color="white"/>
      </div>
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

const isRootPath = computed(() => route.path === '/');

const back = () => {
  router.back();
}

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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 75px;
  background-color: #00dc82;
  padding: 0 15px;
}

.themeAndLang {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
}

.themeAndLang p {
  font-size: 24px;
  color: white;
}

</style>