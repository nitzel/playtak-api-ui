<template>
  <q-page class="tournaments-page">

    <h5>Open Tournaments</h5>
    <div class="row flex-start q-gutter-md tournaments-container">
      <div
        v-for="tournament of openTournaments"
        v-bind:key="tournament.id"
        class="col-4"
      >
        <TournamentEntry
          :tournament="tournament"
        />
      </div>
    </div>

    <h5>Finished Tournaments</h5>
    <div class="row flex-start q-gutter-md tournaments-container">
      <div
        v-for="tournament of finishedTournaments"
        v-bind:key="tournament.id"
        class="col-4"
      >
        <TournamentEntry
          :tournament="tournament"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import TournamentEntry from 'components/tournaments/TournamentCompactComponent.vue';
import { TournamentSummary } from 'src/types/tournament';
import { getTournaments } from 'src/services/pnt.service';

const tournaments = ref<TournamentSummary[]>();

const openTournaments = computed(() => tournaments.value?.filter(t => !t.finished));
const finishedTournaments = computed(() => tournaments.value?.filter(t => t.finished));

onBeforeMount(async () => {
  try {
    tournaments.value = undefined;
    tournaments.value = await getTournaments();
    console.log('tournaments', tournaments.value);
  } catch (exc: unknown) {
    console.error('Unexpected error', exc);
  }
});

</script>

<style scoped>
.tournaments-page {
  margin: 0em 2em;
}
</style>
