<template>
  <div class="main" v-for="({ word, category, translation, id }) in listWords">
    <div class="wordBlock">
      <div class="word">
        Word: {{ word }}
      </div>
      <div class="translation">
        Translations: <span v-for="({value}) in translation"> {{ value }} </span>
      </div>
      <div class="category">
        Category: {{ category }}
      </div>
      <div class="btns">
        <button @click="deleteWord(id)"> Delete word</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {IWord, useWords} from "~/composables/wordsSection/useWords";

const {getWords, deleteWord: deleteWordFetch} = useWords();

const listWords = ref<IWord[]>([]);

const deleteWord = async (id: string) => {
  const answer = await deleteWordFetch(id);

  if (answer) {
    listWords.value = listWords.value.filter(word => word.id !== id);
  }
};

onMounted(async () => {
  const words = await getWords();

  if (words) listWords.value = unref(words);
})
</script>

<style scoped>
.main {
  padding: 25px 50px;
  border: 1px solid #00dc82;
  display: flex;
  flex-direction: column;
  margin: 25px 80px;
}

.wordBlock {
  display: grid;
  grid-template: 1fr 1fr / 1fr 1fr;
  font-size: 25px;
}

.word {
  grid-row: 1 / 2;
  grid-column: 1 / 2;
}

.translation {
  grid-row: 2 / 3;
  grid-column: 1 / 2;
}

.category {
  grid-row: 1 / 2;
  grid-column: 2 / 3;
}

.btns {
  grid-row: 2 / 3;
  grid-column: 2 / 3;
}

.btns button {
  font-size: 20px;
  padding: 8px 15px;
  background-color: white;
  border: 2px solid #00dc82;
  font-weight: bold;
  color: #00dc82;
  transition-duration: 1s;
}

.btns button:hover {
  border-color: red;
  background-color: red;
  color: white;
}
</style>