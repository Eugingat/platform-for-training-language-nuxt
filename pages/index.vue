<template>
  <form class="singInForm" @submit.prevent="sumbit">
    <div>
      <input id="login" type="text" v-model="login" placeholder="Login">
    </div>
    <div>
      <input id="password" type="password" v-model="password" placeholder="Password">
    </div>
    <button id="signInBtn" type="submit"> Sing In</button>

    <hr>

    <button id="createNewBtn" type="button" @click="openModal"> Create new account</button>
  </form>

  <div class="modal" v-show="isModal" @click="closeModal">
    <form :class="{'form-create': true, 'size-form': isSizeForm}" @submit.prevent="register">
      <div>
        <input id="login" type="text" v-model="newLogin" placeholder="Login">
      </div>
      <div>
        <input id="password" type="password" v-model="newPassword" placeholder="Password">
      </div>
      <button id="registredBtn" type="submit"> Register</button>
    </form>
  </div>


</template>

<script setup>
const login = ref('');
const password = ref('');
const newLogin = ref('');
const newPassword = ref('');
const isModal = ref(false);
const isSizeForm = ref(false);

const router = useRouter();

const register = () => {
  console.log(222222);
}

const openModal = () => {
  isModal.value = true;
  isSizeForm.value = true;
}

const closeModal = (event) => {
  const target = event.target;

  if (target.classList.contains('modal')) isModal.value = false;
}
</script>

<style scoped>

.singInForm {
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - 500px);
  border: 1px solid #00dc82;
  padding: 15px 20px;
}

form div {
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
  font-size: 25px;
}

#signInBtn {
  width: 100%;
  border: none;
  padding: 15px 25px;
  font-size: 25px;
  background: linear-gradient(-45deg, transparent, #00dc82, transparent, #00dc82);
  background-size: 300% 100%;
  animation-name: signInBtn;
  animation-duration: 15s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  cursor: pointer;
  font-weight: bold;
}

@keyframes signInBtn {
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

#createNewBtn {
  width: 100%;
  border: none;
  padding: 15px 25px;
  font-size: 25px;
  background: linear-gradient(-45deg, #1877f2, #A4C4E8F2, #1877f2, #A4C4E8F2);
  background-size: 300% 100%;
  animation-name: createBtn;
  animation-duration: 15s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  cursor: pointer;
  font-weight: bold;
  color: white;
}

@keyframes createBtn {
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

hr {
  border: none;
  color: #00dc82;
  background-color: #00dc82;
  height: 1px
}

.modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.5);
  z-index: 1;
}

.form-create {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0;
  border: 1px solid #1877f2;
  padding: 15px 20px;
  z-index: 2;
  background-color: white;
  transition-duration: 1s;
}

.size-form {
  width: 500px;
}

.form-create div input:focus {
  border: 1px solid #1877f2;
}

#registredBtn {
  width: 100%;
  border: none;
  padding: 5px 0;
  background: linear-gradient(-45deg, #1877f2, #A4C4E8F2, #1877f2, #A4C4E8F2);
  background-size: 300% 100%;
  animation-name: createBtn;
  animation-duration: 15s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  cursor: pointer;
  font-weight: bold;
  color: white;
}


</style>