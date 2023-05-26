<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-overline text-orange-9">#{{ tournament.id }}</div>
      <div class="text-h5 q-mt-sm q-mb-xs">{{ tournament.name }}</div>
      <div class="text-caption text-grey">
        {{ tournament.description }}
      </div>
      <q-badge v-if="tournament.finished">Finished</q-badge>
    </q-card-section>

    <q-card-actions>
      <span>
        <q-btn flat color="primary" label="Join" :disable="tournament.finished"/>
        <q-tooltip>Not yet implemented</q-tooltip>
      </span>
      <RouterLink
        v-if="showDetailsLink"
        :to="{ name: 'single-tournament', params: { tournamentId: tournament.id }}"
      >
        <q-btn flat color="primary" label="View details"/>
      </RouterLink>

      <q-space />

      <q-btn
        color="grey"
        round
        flat
        dense
        :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="expanded = !expanded"
      />
    </q-card-actions>

    <q-slide-transition>
      <div v-show="expanded">
        <q-separator />
        <q-card-section class="text-subitle2">
          {{ tournament.description }}
        </q-card-section>
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script setup lang="ts">
import { TournamentSummary } from 'src/types/tournament';
import { ref } from 'vue';

defineProps<{
  tournament: TournamentSummary,
  showDetailsLink?: boolean
}>();
const expanded = ref(false);

</script>

<style scoped>
</style>
