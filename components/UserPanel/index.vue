<template>
  <div class="features">
    <template v-for="({ title, isProgress }) of listFeature" :key="title">
      <NuxtLink :to="`${route.params.id}/${title.toLowerCase()}`">
        <div class="feature" v-if="isProgress">
          <h1> {{ title }}</h1>
        </div>
        <div v-else class="feature feature-progress">
          <h1> {{ title }} in progress... </h1>
        </div>
      </NuxtLink>
    </template>
  </div>
</template>

<script setup lang="ts">
import {useSections} from "~/composables/useSection";
import {useRoute} from "#app";

const route = useRoute();

const listFeature = ref([]);

onMounted(async () => {
  const sections = await useSections();

  if (unref(sections)) listFeature.value = unref(sections);
})
</script>

<style scoped>
.features {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  justify-content: center;
  margin: 25px 100px;
}

.features a {
  text-decoration: none;
}

.feature {
  min-width: 400px;
  padding: 40px 40px;
  text-align: center;
  border: 1px solid #00dc82;
  box-shadow: 2px 2px 2px #00dc82;
  cursor: pointer;
  color: black;
  transition-duration: 1s;
}

.feature-progress {
  color: rgba(0, 0, 0, 0.5);
  background: rgba(128, 128, 128, 0.3);
  cursor: not-allowed;
}

.feature-progress h1 {
  max-width: 400px;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  animation-name: textProgress;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  position: relative;
}


@keyframes textProgress {
  0% {
    width: 0px;
  }


  100% {
    width: 100%;
  }
}

.feature:hover {
  box-shadow: 8px 8px 8px #00dc82;
}

@media all and (max-width: 700px) {
  .features {
    margin: 25px 4px;
  }

}
</style>