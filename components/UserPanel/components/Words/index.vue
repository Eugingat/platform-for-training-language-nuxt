<template>
  <div class="chooseMode">
    <h1> Welcome to word training, select training mode. </h1>
    <div>
      <button v-for="mode of listModes" @click="chooseMode(mode)"> {{ mode }}</button>
    </div>
  </div>
  <div v-if="currentMode === 'Single'" class="categoryBox">
    <h1> Choose category </h1>
    <select v-model="category" required>
      <option value="all"> all </option>
      <option v-for="category in categoriesForSelect"> {{ category }}</option>
    </select>
    <UserPanelComponentsWordsSingle v-if="category" :listWords="listFilteredWords"></UserPanelComponentsWordsSingle>
  </div>
  <div v-else-if="currentMode === 'Multiple'">
    <h1> Choose category </h1>
    <select v-model="category" required>
      <option value="all"> All </option>
      <option v-for="category in categoriesForSelect"> {{ category }}</option>
    </select>
  </div>
  <div v-else-if="currentMode === 'Test'">
    <h1> Choose category </h1>
    <select v-model="category" required>
      <option value="all"> All </option>
      <option v-for="category in categoriesForSelect"> {{ category }}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import {IWord, useWords} from "~/composables/wordsSection/useWords";
import {useCategories} from "~/composables/categories/useCategories";


const {getWords} = useWords();
const {getCategories} = useCategories();

const listModes = ['Single', 'Multiple', 'Test'];
const listWords = ref<IWord[]>([]);
const listFilteredWords = ref<IWord[]>([]);
const currentMode = ref<string>('none');
const categoriesForSelect = ref<string[]>([]);
const category = ref<string>('');

const chooseMode = (mode: string) => {
  category.value = '';
  currentMode.value = mode;
};

watch(category, () => {
  switch (category.value) {
    case '':
      return listFilteredWords.value = [];
    case 'all':
      return listFilteredWords.value = [...unref(listWords)];
    default:
      return listFilteredWords.value = unref(listWords).filter(word => word.category === category.value);
  }
})

onMounted(async () => {
  const words = await getWords();
  const categories = await getCategories();

  const [listCategories] = unref(categories);

  listWords.value = unref(words);
  categoriesForSelect.value = listCategories.list;
})

</script>

<style scoped>
.chooseMode {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.chooseMode div {
  display: flex;
  gap: 15px;
}

.chooseMode div button {
  border: 1px solid black;
  padding: 15px 25px;
  outline: none;
  background-color: white;
  font-size: 24px;
  cursor: pointer;
  transition-duration: 1s;
}

.chooseMode div button:hover {
  background-color: black;
  color: white;
}

.categoryBox {
  text-align: center;
}

.categoryBox select {
  width: 250px;
  height: 34px;
  font-size: 24px;
}

select option {
  font-size: 24px;
}
</style>