<template>
  <div class="singleBox" v-if="currentWord && currenIndex !== size">
    <div>
      <p> Word: {{ currentWord.word }} </p>
      <p> {{currenIndex + 1}} in {{size}} </p>
    </div>
    <div>
      <input v-model="translation" placeholder="Translation">
    </div>
    <button @click="checkTransition"> Check</button>
    <div :class="checkClasses"></div>
    <div :class="checkIconBoxClasses">
      <Icon name="ci:check-bold" size="6em" class="checkIcon"/>
    </div>
  </div>
  <div class="resultBox" v-else-if="currenIndex === size">
    <p> {{keys}} out of {{size}} correct answers were answered</p>
    <button @click="generateWords(); currenIndex = 0"> Restart </button>
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
const checkClasses = ref(['check']);
const checkIconBoxClasses = ref(['checkIconBox']);
const listWordsForTest = ref<IWord[]>([])
const size = ref(0);
const keys = ref(0);

const generateWords = () => {
  if (unref(props).listWords.length) {
    const listWords = new Set<IWord>([]);
    size.value = unref(props).listWords.length >= 10 ? 10 : unref(props).listWords.length;

    while (listWords.size === size.value) {
      listWords.add(unref(props).listWords[Math.floor(Math.random() * props.listWords.length)])
    }

    listWordsForTest.value = [...listWords];
  }
}

generateWords();

const currentWord: ComputedRef<IWord> = computed(() => {
  if (unref(props).listWords.length) {
    return unref(props).listWords[currenIndex.value]
  }
});


const checkTransition = () => {
  if (currentWord.value.translation.some(({value}) => value === translation.value.trim().toLowerCase())) {
    keys.value++;
    currenIndex.value++;
    translation.value = '';
  } else {
    currenIndex.value++;
    translation.value = '';
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

.singleBox div:first-child {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.resultBox {
  position: relative;
  display: grid;
  grid-template-rows: 60px 60px;
  grid-gap: 15px;
  padding: 25px 50px;
  border: 1px solid #00dc82;
  margin: 25px 80px;
}

.resultBox p {
  font-size: 24px;
  text-align: left;
}

.singleBox div p {
  font-size: 24px;
  text-align: left;
}

.singleBox input {
  padding: 5px 8px;
  font-size: 22px;
  width: 100%;
}

.singleBox button, .resultBox button {
  width: 250px;
  font-size: 24px;
  text-align: center;
  padding: 8px 15px;
  background-color: white;
  border: 2px solid #00dc82;
  color: #00dc82;
  transition-duration: 1s;
}

.singleBox button:hover, .resultBox button:hover {
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