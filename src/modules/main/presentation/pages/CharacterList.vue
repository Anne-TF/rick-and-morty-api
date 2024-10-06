<template>
  <q-page class="wp-100">
    <section class="bg-app-tertiary flex flex-center relative">
      <q-img style="z-index: 0 ;" height="50vh" position="center" src="/public/images/header-bg.jpg">
        <div class="full-height full-width" />
      </q-img>
      <div style="z-index: 3;" class="absolute wp-100 flex flex-center column">
        <q-img src="/public/images/title.svg" class="wp-30" />
        <q-input
          class="wp-30"
          bg-color="app-tertiary"
          dark
          debounce="400"
          v-model="filters.search"
          hint="Presiona enter para buscar"
          hide-hint
          @keyup.enter="GetCharacters"
          color="app-secondary"
          input-class="text-white"
          placeholder="Buscar personaje..."
          outlined>
          <template #prepend>
            <q-icon name="search" size="1.5em" color="white" />
          </template>
          <template #append>
            <q-icon name="o_tune" size="1.5em" color="white" />
          </template>
        </q-input>
      </div>
    </section>

    <section class="header">
      <q-tabs
        :model-value="tab"
        @update:model-value="(val) => {
          tab = val;
          GetCharacters();
        }"
        class="text-black"
        no-caps
        style="margin-bottom: 0;"
        active-class="text-semi-bold text-app-secondary"
        indicator-color="app-secondary"
      >
        <q-tab class="wp-10 q-py-md" name="all" label="All" />
        <q-tab class="wp-10 q-py-md q-mx-md" name="unknown" label="Unknown" />
        <q-tab class="wp-10 q-py-md" name="female" label="Female" />
        <q-tab class="wp-10 q-py-md q-mx-md" name="male" label="Male" />
        <q-tab class="wp-10 q-py-md" name="genderless" label="Genderless" />
      </q-tabs>
    </section>

    <section
      :class="{
        'wp-65' : $q.screen.gt.md || $q.screen.md,
        'q-px-md' : $q.screen.lt.md
      }"
      class="q-mx-auto q-mt-xl q-pb-xl flex column">
      <div class="flex items-center q-gutter-x-md q-mb-lg">
        <span v-text="'Mostrar favoritos:'" />
        <q-btn
          round
          flat
          size="sm"
          class="bg-app-gray"
        >
          <q-icon name="img:/public/icons/star-gray.svg" />
        </q-btn>
      </div>

      <p v-if="!loading && characters.length < 1" class="wp-100 text-center q-mt-lg">
        ¡Parece que no hay nada! <br />
        {{ filters.search ? 'Intenta buscar otro personaje, o intenta buscarlo con otra combinación de filtros' : 'No te preocupes, estamos buscando más personajes para ti. Intenta más tarde.' }}
      </p>

      <div class="wp-100 grid">
        <CharacterCard
          v-for="character in characters"
          :key="character.id"
          :search="filters.search"
          :character="character" />

        <CharacterLoader
            v-show="loading"
            v-for="item in 15"
            :key="item"
          />
      </div>

      <q-pagination
        :max="pagination.total"
        max-pages="5"
        boundary-links
        v-if="!loading && characters.length > 0"
        color="app-primary"
        class="text-semi-bold q-mt-lg self-end"
        direction-links
        :model-value="pagination.current"
        @update:model-value="(page) => {
          pagination.current = page;
          GetCharacters();
        }"
      />
    </section>
  </q-page>
</template>

<script lang="ts" setup>

import { ListCharacterUseCase } from '../../domain/useCases';
import { onMounted, reactive, ref } from 'vue';
import { AxiosError } from 'axios';
import { CharacterCard, CharacterLoader } from '@modules/main/presentation/components';
import { ICharacter } from '@modules/main/infrastructure/interfaces';

const tab = ref<'all' | 'unknown' | 'male' | 'female' | 'genderless'>('all');
const characters = ref<ICharacter[]>([]);
const loading = ref(true);
const filters = reactive({
  search: ''
});
const pagination = ref({
  current: 1,
  total: 0,
  totalResults: 0
});

const GetCharacters = async() =>
{
  loading.value = true;
  characters.value = [];
  setTimeout(async() =>
  {
    const { results, info } = await ListCharacterUseCase.handle({
      page: pagination.value.current,
      gender: tab.value === 'all' ? '' : tab.value,
      name: filters.search
    });
    characters.value = results;
    pagination.value.total = info.pages;
    pagination.value.totalResults = info.count;

    loading.value = false;
  }, 3000);
};

onMounted(async() =>
{
  await GetCharacters();
});
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.header {
  background-color: #F2F2F2;
}
</style>
