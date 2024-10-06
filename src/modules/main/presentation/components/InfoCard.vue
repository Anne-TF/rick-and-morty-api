<template>
  <q-card flat :class="`q-pa-sm br-8 ${className}`" style="border: 1px solid #BDBDBD;">
    <q-card-section class="no-padding flex items-center">
      <q-icon color="app-gray-middle" :name="icon" v-if="icon" class="q-pr-xs" />
      <span class="fs-12" style="color: #828282;" v-text="title" />
    </q-card-section>
    <q-card-section class="no-padding mt-1 text-semi-bold">
      {{ value }}
    </q-card-section>
    <q-card-section v-if="caption" class="no-padding text-app-gray-middle text-uppercase fs-12">
      {{ caption }}
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
defineProps({
  icon: {
    type: String,
    default: '',
    required: false
  },
  title: {
    type: String,
    default: '',
    required: false
  },
  value: {
    type: String,
    default: '',
    required: false
  },
  caption: {
    type: String,
    default: '',
    required: false
  },
  className: {
    type: String,
    default: '',
    required: false
  }
});
</script>
