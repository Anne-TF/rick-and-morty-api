<template>
  <q-card
    :class="{
      'wp-40 br-12' : $q.screen.gt.lg || $q.screen.lg,
      'wp-48 br-12' : $q.screen.md,
      'wp-100 br-0' : $q.screen.lt.md
    }"
    flat>
  <q-card-section class="no-padding relative-position">
    <q-img :class="{ 'br-8' : $q.screen.gt.sm }" src="/public/images/banner.svg" />
    <q-btn
      round
      flat
      @click="emit('close')"
      style="padding: 0 !important;"
      class="absolute-top-right q-mt-sm q-mr-sm"
    >
      <q-icon size="2em" name="img:/public/icons/close.svg" />
    </q-btn>
  </q-card-section>
  <q-card-section style="background: #F2F2F2" class="flex flex-center column">
    <q-avatar
      class="q-mx-auto q-pa-xs flex flex-center"
      size="10em"
      style="margin-top: -90px; background: #FFFBFB;"
    >
      <q-img :src="character.image" />
    </q-avatar>

    <span v-text="character.status" class="text-uppercase q-mt-sm fs-12 text-app-gray-darker" />
    <span v-text="character.name" class="text-semi-bold fs-20 my-6" />
    <span v-text="character.species" class="text-uppercase fs-12 text-app-gray-darker" />
  </q-card-section>

  <q-card-section>
    <span class="text-app-gray-darker text-semi-bold fs-20" v-text="'Información'" />

    <div style="display: grid; grid-template-columns: 0.33fr 0.33fr 0.33fr;" class="flex justify-between q-mt-md">
      <InfoCard
        icon="info"
        title="Gender:"
        :value="character.gender"
      />

      <InfoCard
        icon="info"
        title="Origin:"
        :value="character.origin.name"
      />

      <InfoCard
        icon="info"
        title="Type:"
        :value="character.type || 'Unknown'"
      />
    </div>

    <q-separator class="my-30" />

    <span class="text-app-gray-darker text-semi-bold fs-20" v-text="'Episodios'" />

    <div class="q-mt-md grid">
      <InfoCard
        :title="episode.name"
        :key="episode.episode"
        v-for="episode in episodes"
        :caption="episode.air_date"
        :value="episode.episode"
      />
    </div>

    <q-separator class="my-30" />

    <span class="text-app-gray-darker text-semi-bold fs-20" v-text="'Personajes interesantes'" />
    <div
      style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 10px;"
      class="q-mt-md">
      <CharacterCard v-for="character in characters" :key="`detail-${character.id}`" :character="character" />
    </div>
  </q-card-section>

    <q-card-section class="flex justify-end q-pt-sm q-mb-lg">
      <q-btn
        label="Compartir personaje"
        no-caps
        color="app-primary"
        rounded
        class="text-semi-bold q-mt-lg"
        unelevated
      />
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { onMounted, PropType, ref } from 'vue';
import { ICharacter } from '@modules/main/infrastructure/interfaces';
import InfoCard from '@modules/main/presentation/components/InfoCard.vue';
import { AxiosError } from 'axios';
import { GetEpisodeUseCase, ListCharacterUseCase } from '@modules/main/domain/useCases';
import { IEpisode } from '@modules/main/infrastructure/interfaces/episode-response.interface';
import CharacterCard from '@modules/main/presentation/components/CharacterCard.vue';

const emit = defineEmits<{
  'close': () => void;
}>();
const props = defineProps({
  character: {
    type: Object as PropType<ICharacter>,
    required: true,
    default: () =>
    {}
  }
});
const episodes = ref<IEpisode[]>([]);
const characters = ref<ICharacter[]>([]);

onMounted(async() =>
{
  const { results } = await ListCharacterUseCase.handle({
    page: 1
  });
  characters.value = results.splice(0, 2);

  for (const episode of props.character.episode)
  {
    if (episodes.value.length === 8)
    {
      break;
    }
    const aux = episode.split('/');
    const res = await GetEpisodeUseCase.handle(aux[aux.length - 1]);
    episodes.value.push(res);
  }
});
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 5px;
  justify-content: space-between;
}
</style>
