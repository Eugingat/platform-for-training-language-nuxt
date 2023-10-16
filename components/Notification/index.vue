<template>
    <div :class="notificationData.classes">
      <p>{{notificationData.text}}</p>
      <button @click="closeNotification">X</button>
    </div>
</template>

<script setup lang="ts">
interface INotificationData {
  classes: {
    'notification-block': boolean;
    error: boolean;
    warning: boolean;
    success: boolean;
  }
  text: string;
}

const props = defineProps(['className', 'text']);
const emits = defineEmits(['close']);


const notificationData: INotificationData = reactive({
  classes: {
    'notification-block': true,
    error: false,
    warning: false,
    success: false,
  },
  text: ''
});

const className = computed<keyof INotificationData["classes"]>(() => props.className);
const text = computed<string>(() => props.text);

onMounted(() => {
  setTimeout(() => {
    notificationData.classes[unref(className)] = true;
    notificationData.text = unref(text);
  }, 100)
})

const closeNotification = () => {
  notificationData.classes[unref(className)] = false;
  setTimeout(() => emits('close'), 1000);
}


</script>

<style scoped>
    .notification-block {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -100%);
      max-width: 400px;
      border-radius: 60px;
      padding: 8px 60px;
      transition-duration: 1s;
      text-align: center;
      font-size: 20px;
      background: silver;
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      gap: 15px;
    }

    .notification-block p {
      flex-grow: 2;
    }

    .notification-block button {
      display: inline-block;
      font-weight: 500;
      border-radius: 28px;
      font-size: 16px;
      border: none;
      padding: 8px 8px;
      height: 30px;
      align-self: center;
    }

    .error {
      background-color: #b00020;
      color: white;
      transform: translate(-50%, 10%);
    }

    .success {
      background-color: #1877f2;
      color: white;
      transform: translate(-50%, 10%);
    }
</style>