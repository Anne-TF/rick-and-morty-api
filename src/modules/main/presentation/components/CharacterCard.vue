<template>
  <q-card
    flat
    @click="dialog = !dialog"
    style="height: 13.3em;"
    :class="`${className} border-app-gray br-13 flex cursor-pointer`"
  >
    <q-img
      :src="character.image"
      :alt="character.name"
      width="35%"
      height="100%"
      style="border-radius: 13px 0 0 13px;">
      <div class="full-height full-width bg-transparent flex items-end justify-end ">
        <q-btn
          round
          flat
          size="sm"
          style="margin-right: -6px; margin-bottom: -6px;"
          class="bg-app-gray"
        >
          <q-icon name="img:/public/icons/star-gray.svg" />
        </q-btn>
      </div>
    </q-img>

    <q-card-section class="wp-65">
      <p class="text-app-gray-darker fs-12 no-margin">
        <span :class="`bg-${getColor(character.status)} q-pa-xs br-10 mr-4`" style="display: inline-block;" />
        <span v-text="character.status" /> - <span v-text="character.species" />
      </p>
      <p class="lh-20 flex column">
        <span class="q-mt-sm q-mb-sm display-block fs-16" v-html="search ? applyHighlight(character.name, search, 'text-semi-bold text-app-primary') : character.name" />

        <span v-text="'Last known location:'"
              class="text-app-gray-middle fs-13" />
        <span class="fs-13 display-block q-mb-sm" v-text="character.location.name" />

        <span v-text="'First seen in:'" class="text-app-gray-middle fs-13 " />
        <span class="fs-13" v-text="character.location.name" />
      </p>
    </q-card-section>
  </q-card>

  <q-dialog :maximized="$q.screen.lt.md" v-model="dialog" class="br-12">
    <CharacterDetail :character="character" @close="dialog = false" />
  </q-dialog>
</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue';
import { ICharacter } from '@modules/main/infrastructure/interfaces';
import CharacterDetail from './CharacterDetail.vue';
import { applyHighlight } from '@common/utils';

defineProps({
  character: {
    type: Object as PropType<ICharacter>,
    required: true,
    default: () =>
    {}
  },
  className: {
    type: String,
    required: false,
    default: ''
  },
  search: {
    type: String,
    required: false,
    default: ''
  }
});

const dialog = ref<boolean>(false);

const getColor = (status: 'Alive' | 'Dead' | 'Unknown') =>
{
  switch (status)
  {
    case 'Alive':
      return 'app-success';
    case 'Dead':
      return 'app-danger';
    default:
      return 'app-warning';
  }
};
</script>

<style lang="scss" scoped>
.display-block {
  display: block;
}
</style>
