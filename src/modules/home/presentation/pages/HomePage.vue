<template>
  <q-page class="fullscreen text-white text-center q-pa-md flex flex-center">
    <q-img
      class="absolute"
      height="100vh"
      src="/public/images/background.jpg" />
    <div style="background: #000; opacity: .7; z-index: 1;" class="absolute fullscreen" />

    <section style="z-index: 4;"
             :class="{
                'q-pt-lg' : $q.screen.lt.md
             }"
             class="hp-100 wp-100 flex items-center column">
      <q-img width="50vw" src="/public/images/title.svg" />

      <h1 v-text="'Bienvenido a Rick and Morty'"
          style="font-size: clamp(16px, 23px, 36px)"
          class="text-semi-bold lh-43 q-my-md" />
      <p class="text-light">
        En esta aplicación encontrarás un listado de todos los personajes de la serie y podrás visualizar
        <br v-if="$q.screen.gt.sm" />
        los episodios en los cuales salieron, e incluso filtrarlos por nombre, género, especie, estado y origen.
      </p>

      <q-btn
        label="Continuar"
        no-caps
        color="app-secondary"
        rounded
        to="/list"
        :class="{
          'wp-90 q-mx-auto absolute-bottom q-mb-xl' : $q.screen.lt.md,
          'q-mt-lg wp-30 fs-17' : $q.screen.gt.md
        }"
        class="text-semi-bold text-black"
        unelevated
      />
    </section>
  </q-page>
</template>

<script setup lang="ts">
</script>
