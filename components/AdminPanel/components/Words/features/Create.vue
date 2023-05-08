<template>
    <form class="main" @submit.prevent="create">
      <input type="text" required placeholder="Word" v-model="wordData.word">
      <div v-for="translation in wordData.translation" class="translationBlock">
        <input type="text" required placeholder="Translation" v-model="translation.value">
      </div>
      <div class="btnsBlockTranslation">
        <button type="button" @click="addTranslation" class="btnTranslation"> Add translation </button>
        <button type="button" @click="deleteTranslation" class="btnTranslation"> Delete translation </button>
      </div>
      <select v-model="wordData.category" required>
        <option disabled value=""> Please select category </option>
        <option v-for="category in categoriesForSelect"> {{category}}</option>
      </select>
      <div class="btns">
        <button type="submit"> Create </button>
        <button type="button" @click="clear"> Clear </button>
      </div>
    </form>
</template>

<script setup>

import {useCategories} from "../../../../../composables/wordsSection/useCategories";
import {useNewWord} from "../../../../../composables/wordsSection/useNewWord";

const wordData = reactive({
  word: '',
  translation: [{ value: '' }],
  category: '',
})

const categoriesForSelect = ref([]);

onMounted(async () => {
    const categories = await useCategories();

    if (unref(categories)) categoriesForSelect.value = unref(categories)[0].list;
})

const clear = () => {
  wordData.word = '';
  wordData.translation = [{value: ''}];
  wordData.category = '';
};


const create = async () => {
    if (wordData.word && wordData.category) {
      const answer = await useNewWord({ ...wordData, translation: wordData.translation.map(({value}) => value)});

      if (answer) {
        clear();
      }
    }
};

const addTranslation = () => {
  wordData.translate.push({value: ''});
}

</script>

<style scoped>
  .main {
    padding: 25px 50px;
    border: 1px solid #00dc82;
    display: flex;
    flex-direction: column;
  }

  .translationBlock {
    display: flex;
    flex-direction: column;
  }

  input {
    font-size: 24px;
    border: 1px solid #00dc82;
    padding: 10px;
    outline: none;
  }

  select {
    font-size: 24px;
    padding: 10px;
    border: 1px solid #00dc82;
    outline: none;
  }

  .btns {
    display: flex;
    gap: 15px;
  }

  .btns button {
    flex-grow: 1;
    padding: 15px;
    background-color: white;
    border: 2px solid #00dc82;
    font-size: 24px;
    font-weight: bold;
    color: #00dc82;
    transition-duration: 1s;
  }

  .btns button:first-child:hover {
    background-color: #00dc82;
    color: white;
  }

  .btns button:last-child:hover {
    border-color: red;
    background-color: red;
    color: white;
  }

  .btnsBlockTranslation {
    display: flex;
    flex-direction: row;
    gap: 15px;
  }

  .btnsBlockTranslation button {
    padding: 15px;
    background-color: white;
    border: 2px solid #00dc82;
    font-size: 24px;
    font-weight: bold;
    color: #00dc82;
    transition-duration: 1s;
  }

  .btnsBlockTranslation button:first-child:hover {
    background-color: #00dc82;
    color: white;
  }

  .btnsBlockTranslation button:last-child:hover {
    border-color: red;
    background-color: red;
    color: white;
  }
</style>