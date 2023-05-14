<template>
  <q-btn
    dense text-color="primary"
    @click="openDialog()"
    icon="add_circle_outline"
  >
    Add Stage
  </q-btn>
  <q-dialog v-model="showDialog">
    <q-card style="width: 50vw">
      <q-card-section>
        <div class="text-h6">Add stage to tournament #{{ tournament.id }} {{ tournament.name }}</div>
        <div
          v-if="'stages' in tournament"
          class="text-subtitle2"
        >
          Add stage #{{ tournament.stages.length + 1}} Tournament {{ tournament.name }}
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
            label="Stage name"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please enter a name for the new stage']"
          />
          <q-select
            filled
            v-model="formData.rules"
            :options="gameRulesetOptions"
            label="Default ruleset"
            hint="Applied to games of this stage but can be overriden per game"
            :rules="[ val => val || 'You must choose a default ruleset']"
            :loading="gameRulesetOptions === undefined"
            emit-value map-options
          />
          <div>
            <q-btn label="Add stage" type="submit" color="primary"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { getRulesets, addStage } from 'src/services/pnt.service';
import {
  GameRuleset, TournamentDetails, TournamentStage, TournamentSummary,
} from 'src/types/tournament';
import { computed, ref } from 'vue';

// eslint-disable-next-line no-unused-vars
const emit = defineEmits<{(e: 'stageAdded', stage: TournamentStage): void}>();
const props = defineProps<{
  tournament: TournamentSummary | TournamentDetails,
}>();
const $q = useQuasar();

const showDialog = ref(false);
const formData = ref<Partial<TournamentStage>>({});

const gameRulesets = ref<GameRuleset[]>();
const gameRulesetOptions = computed(() => gameRulesets.value && gameRulesets.value.map(r => ({ label: r.name, value: r.id })));

async function openDialog() {
  showDialog.value = true;
  if (gameRulesets.value === undefined) {
    gameRulesets.value = await getRulesets();
  }
}

async function onSubmit() {
  formData.value.tournament = props.tournament.id;
  try {
    const newStage = await addStage(formData.value);
    emit('stageAdded', newStage);
    showDialog.value = false;
    $q.notify({
      message: 'Stage added',
      position: 'top',
      type: 'success',
    });
  } catch (exc) {
    $q.notify({
      message: `Failed to add stage ${exc}`,
      position: 'top',
      type: 'warning',
    });
  }
}
</script>
