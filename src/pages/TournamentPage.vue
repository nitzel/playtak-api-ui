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
        <StageComponent
          :stage="stage"
          @modified="onStageModified"
        />
      </div>
    </div>
    <AddStageDialog
      v-if="tournament"
      :tournament="tournament"
      @stage-added="onStageAdded"
    />
  </q-page>
</template>

<script setup lang="ts">
import TournamentEntry from 'components/tournaments/TournamentCompactComponent.vue';
import AddStageDialog from 'components/tournaments/AddStageDialog.vue';
import {
  getTournament, PlaytakApiError,
} from 'src/services/pnt.service';
import { TournamentDetails, TournamentStage } from 'src/types/tournament';
import {
  watch, ref,
} from 'vue';
import { useRoute } from 'vue-router';
import StageComponent from 'src/components/tournaments/StageComponent.vue';

const route = useRoute();
const tournamentId = ref<number>();
const tournament = ref<TournamentDetails>();
const errorWhileLoading = ref<string>();

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

function onStageAdded(stage: TournamentStage) {
  if (!tournament.value) return;
  tournament.value.stages.push(stage);
}

function onStageModified(stage: TournamentStage) {
  if (!tournament.value) return;
  const index = tournament.value.stages.findIndex(({ id }) => id === stage.id);
  tournament.value.stages[index] = stage;
}

</script>

<style scoped>
.tournaments-page {
  margin: 0em 2em;
}
</style>
