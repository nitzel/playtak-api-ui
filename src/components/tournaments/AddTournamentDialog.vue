<template>
  <q-btn
    dense text-color="primary"
    @click="openDialog()"
    icon="add_circle_outline"
  >
    Add Tournament
  </q-btn>
  <q-dialog v-model="showDialog">
    <q-card style="width: 50vw">
      <q-card-section>
        <div class="text-h6">Create a new tournament</div>
        <div class="text-subtitle2">
          <i>Helpful guideline / explanation to be written here</i>
        </div>
      </q-card-section>
      <q-card-section>
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
        >
          <q-input
            filled
            v-model="formData.name"
            label="Tournament name"
            hint="Name of the new tournament"
            :rules="[ val => val && val.length > 0 || 'Please enter a name for the new tournament']"
          />
          <q-input
            filled
            v-model="formData.description"
            label="Tournament description"
            hint="Who can join? Prizes?"
            :rules="[ val => val && val.length > 0 || 'Please enter a description']"
          />
          <div>
            <q-btn label="Add tournament" type="submit" color="primary"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { addTournament } from 'src/services/pnt.service';
import {
  TournamentUpsert, TournamentSummary,
} from 'src/types/tournament';
import { ref } from 'vue';

// eslint-disable-next-line no-unused-vars
const emit = defineEmits<{(e: 'tournamentAdded', stage: TournamentSummary): void}>();
const $q = useQuasar();

const showDialog = ref(false);
const formData = ref<TournamentUpsert>({
  name: '',
  description: '',
  finished: false,
});

async function openDialog() {
  showDialog.value = true;
}

async function onSubmit() {
  try {
    const newStage = await addTournament({ ...formData.value });
    emit('tournamentAdded', newStage);
    showDialog.value = false;
    $q.notify({
      message: 'Tournament added',
      position: 'top',
      type: 'success',
    });
  } catch (exc) {
    $q.notify({
      message: `Failed to add tournament: ${exc}`,
      position: 'top',
      type: 'warning',
    });
  }
}
</script>
