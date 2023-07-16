<template>
  <form class="form" @submit.prevent="sumbit">
    <div>
      <input id="login" type="text" v-model="login" placeholder="Login" required>
    </div>
    <div>
      <input id="password" type="password" v-model="password" placeholder="Password" required>
    </div>
    <button type="submit"> Sing In </button>
  </form>
</template>

<script setup>
import {useAuth} from "~/composables/useAuth";

const login = ref('');
const password = ref('');
const router = useRouter();

const sumbit = async () => {
  const isAuth = await useAuth(login, password);

  if (isAuth) {
    const cookie = useCookie('token');

    cookie.value = unref(isAuth);

    router.push('/admin/panel');
  }
}
</script>

<style scoped>
    .form {
      box-sizing: border-box;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      width: calc(100% - 500px);
      border: 1px solid #00dc82;
      padding: 15px 20px;
    }

    .form div {
      padding: 5px 0;
    }

    div input {
      border: 1px solid #dddfe2;
      border-radius: 6px;
      outline: none;
      padding: 15px;
      font-size: 30px;
      width: calc(100% - 32px);
    }

    div input:focus {
      border: 1px solid #00dc82;
    }

    input::placeholder {
      padding-left: 5px;
      font-size: 30px;
    }

    .form button {
      width: 100%;
      border: none;
      padding: 15px 25px;
      font-size: 25px;
      background: linear-gradient(-45deg, transparent, #00dc82, transparent , #00dc82);
      background-size: 300% 100%;
      animation-name: btn-form;
      animation-duration: 10s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      cursor: pointer;
      font-weight: bold;
    }

    @keyframes btn-form {
      0% {
        background-position: 0 0;
      }
      50% {
        background-position: 100% 0;
      }
      100% {
        background-position: 0 0;
      }
    }

</style>