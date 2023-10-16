<template>
  <div v-if="listWords.length">
    <div class="singleBox" v-for="({word, translation}) of listWords">
      <p> Word: {{ word }} </p>
      <div>
        <input v-model="listTranslation[word]" placeholder="Translation">
        <small v-show="error"> Translation is incorrect </small>
      </div>
      <button @click="checkTransition(word, translation)"> Check</button>
      <div :class="lisTranslationCheckClasses[word]"></div>
      <div :class="lisTranslationCheckIconBoxClasses[word]">
        <Icon name="ci:check-bold" size="6em" class="checkIcon"/>
      </div>
    </div>
  </div>
  <div v-else class="noWords">
    <h1> There are no words in this category </h1>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['listWords']);
const listTranslation = reactive<{[key in string]: string}>({});
const lisTranslationCheckClasses = reactive<{[key in string]: string[]}>({});
const lisTranslationCheckIconBoxClasses = reactive<{[key in string]: string[]}>({});
const error = ref(false);

if (props.listWords.length) {
  props.listWords.forEach(({word}: {word: string}) => {
    listTranslation[word] = '';
    lisTranslationCheckClasses[word] = ['check'];
    lisTranslationCheckIconBoxClasses[word] = ['checkIconBox'];
  })
}

const checkTransition = (word: string, translation: {value: string}[]) => {
  if (translation.some(({value}) => value === listTranslation[word].trim().toLowerCase())) {
    lisTranslationCheckClasses[word].push('checkOpen');
    lisTranslationCheckIconBoxClasses[word].push('checkIconBoxOpen');
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