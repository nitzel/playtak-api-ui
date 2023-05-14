<template>
  <q-page class="tournaments-page">

    <h5>
      Open Tournaments
      <AddTournamentDialog @tournament-added="onTournamentAdded"/>
    </h5>
    <div v-if="!openTournaments?.length">Looks like there aren't any. Consider creating one.</div>
    <div class="row flex-start q-gutter-md tournaments-container">
      <div
        v-for="tournament of openTournaments"
        v-bind:key="tournament.id"
        class="col-4"
      >
        <TournamentEntry
          :tournament="tournament"
          show-details-link
        />
      </div>
    </div>
    <h5>Finished Tournaments</h5>
    <div v-if="!finishedTournaments?.length">Looks like there aren't any.</div>
    <div class="row flex-start q-gutter-md tournaments-container">
      <div
        v-for="tournament of finishedTournaments"
        v-bind:key="tournament.id"
        class="col-4"
      >
        <TournamentEntry
          :tournament="tournament"
          show-details-link
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
import AddTournamentDialog from 'src/components/tournaments/AddTournamentDialog.vue';

const tournaments = ref<TournamentSummary[]>();

const openTournaments = computed(() => tournaments.value?.filter(t => !t.finished));
const finishedTournaments = computed(() => tournaments.value?.filter(t => t.finished));

onBeforeMount(async () => {
  try {
    tournaments.value = undefined;
    tournaments.value = await getTournaments();
  } catch (exc: unknown) {
    console.error('Unexpected error', exc);
  }
});

function onTournamentAdded(tournament: TournamentSummary) {
  tournaments.value?.push(tournament);
}

</script>

<style scoped>
.tournaments-page {
  margin: 0em 2em;
}
</style>
