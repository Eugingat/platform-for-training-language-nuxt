<template>
  <div class="main" v-for="({ word, category, translation }) in listWords">
      <div class="wordBlock">
          <div class="word">
            Word: {{ word }}
          </div>
        <div class="translation">
          Translations: <span v-for="value in translation"> {{value}} </span>
        </div>
        <div class="category">
            Category: {{ category }}
        </div>
        <div class="btns">
          <button @click="deleteWord"> Delete word </button>
        </div>
      </div>
  </div>
</template>

<script setup>
    import {useGetWords} from "../../../../../composables/wordsSection/useGetWords";

    const listWords = ref([]);

    onMounted(async () => {
        const words = await useGetWords();

        if (words) listWords.value = unref(words);

        console.log(unref(listWords))
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
}
</style>