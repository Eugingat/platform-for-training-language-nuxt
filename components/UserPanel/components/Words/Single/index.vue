<template>
  <div class="singleBox" v-if="currentWord">
    <p> Word: {{ currentWord.word }} </p>
    <div>
      <input v-model="translation" placeholder="Translation">
      <small v-show="error"> Translation is incorrect </small>
    </div>
    <button @click="checkTransition"> Check</button>
    <div :class="checkClasses"></div>
    <div :class="checkIconBoxClasses">
      <Icon name="ci:check-bold" size="6em" class="checkIcon"/>
    </div>
  </div>
  <div v-else class="noWords">
    <h1> There are no words in this category </h1>
  </div>
</template>

<script setup lang="ts">
import {IWord} from "~/composables/wordsSection/useWords";
import {ComputedRef} from "vue";

const props = defineProps(['listWords']);
const currenIndex = ref(0);
const translation = ref('');
const error = ref(false);
const checkClasses = ref(['check']);
const checkIconBoxClasses = ref(['checkIconBox']);

const currentWord: ComputedRef<IWord> = computed(() => {
  if (unref(props).listWords.length) {
    return unref(props).listWords[currenIndex.value]
  }
});


const checkTransition = () => {
  if (currentWord.value.translation.some(({value}) => value === translation.value.trim().toLowerCase())) {
    checkClasses.value = [...checkClasses.value, 'checkOpen'];
    checkIconBoxClasses.value = [...checkIconBoxClasses.value, 'checkIconBoxOpen'];

    setTimeout(() => {
      checkClasses.value.pop();
      checkIconBoxClasses.value.pop();
    }, 1500)

    setTimeout(() => {
      currenIndex.value = Math.floor(Math.random() * props.listWords.length);
      translation.value = '';
      error.value = false;
    }, 2000)
  } else {
    error.value = true;
  }
}


</script>

<style scoped>
.singleBox {
  position: relative;
  display: grid;
  grid-template-rows: 60px 60px 60px;
  grid-gap: 15px;
  padding: 25px 50px;
  border: 1px solid #00dc82;
  margin: 25px 80px;
}

.singleBox p {
  font-size: 24px;
  text-align: left;
}

.singleBox input {
  padding: 5px 8px;
  font-size: 22px;
  width: 100%;
}

.singleBox button {
  width: 250px;
  font-size: 24px;
  text-align: center;
  padding: 8px 15px;
  background-color: white;
  border: 2px solid #00dc82;
  color: #00dc82;
  transition-duration: 1s;
}

.singleBox button:hover {
  background-color: #00dc82;
  color: white;
}

small {
  color: red;
  font-size: 18px;
}

.noWords {
  text-align: center;
}

.check {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #00dc82;
  width: 0;
  height: 0;
  opacity: 0.3;
}

.checkOpen {
  width: 100%;
  height: 100%;
}

.checkIconBox {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  white-space: nowrap;
  width: 0;
  transition-duration: 1s;
}

.checkIconBoxOpen {
  width: 100px;
}

.checkIcon {
  color: purple;
}
</style>