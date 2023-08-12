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
      <button type="button" class="button-category" @click="createCategory"> Create new category </button>
      <input placeholder="Name category" v-model="nameCategory">
      <div class="btns">
        <button type="submit"> Create </button>
        <button type="button" @click="clear"> Clear </button>
      </div>
    </form>
</template>

<script setup lang="ts">
import {useWords} from "~/composables/wordsSection/useWords";
import {useCategories} from "~/composables/categories/useCategories";

const {getCategories, createCategories} = useCategories()

const {
  createNewWord
} = useWords();

const wordData = reactive({
  word: '',
  translation: [{ value: '' }],
  category: '',
})
const nameCategory = ref('');
const categoriesForSelect = ref<string[]>([]);

onMounted(async () => {
    const categories = await getCategories();

    if (unref(categories)) categoriesForSelect.value = unref(categories)[0].list;
})

const clear = () => {
  wordData.word = '';
  wordData.translation = [{value: ''}];
  wordData.category = '';
};


const create = async () => {
    if (wordData.word && wordData.category) {
      const answer = await createNewWord({ ...wordData });

      if (answer) {
        clear();
      }
    }
};

const addTranslation = () => {
  wordData.translation.push({value: ''});
}

const deleteTranslation = () => {
  wordData.translation.pop();
}

const createCategory = async () => {
  if (unref(nameCategory).trim()) {
    const answer = await createCategories(unref(nameCategory))

    if (answer) {
      categoriesForSelect.value.push(unref(nameCategory));
    }
  }
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

  .button-category {
    width: 300px;
    padding: 15px;
    background-color: white;
    border: 2px solid #00dc82;
    font-size: 24px;
    font-weight: bold;
    color: #00dc82;
    transition-duration: 1s;
  }

  .button-category:hover {
    background-color: #00dc82;
    color: white;
  }
</style>