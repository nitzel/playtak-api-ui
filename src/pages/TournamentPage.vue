<template>
  <q-page class="tournaments-page">

    <h5>Tournament #{{ tournamentId }}</h5>
    <div class="row flex-start q-gutter-md tournaments-container">
      <div class="col-12">
        <TournamentEntry :tournament="tournament" v-if="tournament"/>
        <span v-else-if="errorWhileLoading">Error while loading tournament: {{ errorWhileLoading }}</span>
        <span v-else>Loading...</span>
      </div>
    </div>
    <h6>Stages</h6>
    <div v-if="tournament?.stages?.length">
      <div v-for="stage in tournament.stages" v-bind:key="stage.id">
        #{{ stage.id }} {{ stage.name }} {{ typeof stage.rules == 'number' ? stage.rules : stage.rules.id}}
      </div>
    </div>
    <div v-else>No stages</div>
    <!-- <q-form
      @submit="onAddStage"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="newStageName"
        label="Stage name"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please enter a name for the new stage']"
      />
      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
      </div>
    </q-form> -->
  </q-page>
</template>

<script setup lang="ts">
import TournamentEntry from 'components/tournaments/TournamentCompactComponent.vue';
import { getTournament, PlaytakApiError } from 'src/services/pnt.service';
import { TournamentDetails } from 'src/types/tournament';
import { watch, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const tournamentId = ref<number>();
const tournament = ref<TournamentDetails>();
const errorWhileLoading = ref<string>();

// const newStageName = ref<string>();

watch(
  () => route.params.tournamentId,
  (newValue) => {
    tournamentId.value = parseInt(newValue as string, 10);
  },
  { immediate: true },
);

watch(tournamentId, async (newId) => {
  if (!newId) return;
  try {
    errorWhileLoading.value = undefined;
    tournament.value = undefined;
    tournament.value = await getTournament(newId);
  } catch (exc: unknown) {
    if (exc instanceof PlaytakApiError) errorWhileLoading.value = exc.message;
    else if (exc instanceof Error) errorWhileLoading.value = exc.message;
    else console.error('Unexpected error', exc);
  }
}, { immediate: true });

</script>

<style scoped>
.tournaments-page {
  margin: 0em 2em;
}
</style>
