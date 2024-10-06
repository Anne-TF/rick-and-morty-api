<template>
  <q-card
    flat
    style="height: 12em;"
    class="border-app-gray br-13 flex"
  >
    <q-skeleton type="rect" height="12em" width="35%" style="border-radius: 13px 0 0 13px;" />
    <q-card-section class="wp-65">
      <q-skeleton type="text" width="30%" />
      <div class="flex items-center q-gutter-x-sm">
        <q-skeleton type="text" width="30%" />  <q-skeleton type="text" width="40%" />
      </div>

      <q-skeleton type="text" width="80%" class="q-mt-sm q-mb-md" />

      <q-skeleton type="text" width="60%" class="q-mb-sm" />
      <q-skeleton type="text" width="40%" class="q-mb-sm" />
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
</script>
