<template>
  <q-btn
    dense text-color="primary"
    @click="openDialog()"
    icon="add_circle_outline"
  >
    Add Ruleset
  </q-btn>
  <q-dialog v-model="showDialog">
    <q-card style="width: 50vw">
      <q-card-section>
        <div class="text-h6">Add new ruleset</div>
        <div class="text-subtitle2">
          Rulesets can be selected for stages and for games.
        </div>
      </q-card-section>
      <q-card-section>
        <q-form
          @submit="onSubmit"
        >
          <div class="row q-col-gutter-md">
            <q-input
              class="col-12"
              dense filled
              v-model="formData.name"
              label="Name"
              hint="Please choose a concise name that implies most of the settings, e.g. '6s 3+5'"
              :rules="[ val => val && val.length > 0 || 'Please enter a name for the new ruleset']"
            />
            <q-select
              class="col-6"
              dense filled map-options emit-value
              v-model.number="formData.boardSize"
              :options="boardSizeOptions"
              label="Boardsize"
              :rules="[ val => val || 'Please choose a board size']"
              hint="Board to play on"
            ><template v-slot:prepend><q-icon name="square_foot" /></template></q-select>
            <q-select
              class="col-6"
              dense filled
              v-model.number="formData.komi"
              :options="komiOptions"
              label="Komi"
              hint="An advantage for black when it comes to counting flats"
            ><template v-slot:prepend><q-icon name="balance" /></template></q-select>
            <q-input
              class="col-6"
              dense filled
              v-model.number="formData.timeIncrement"
              type="number"
              label="Time increment"
              suffix="seconds"
              :max="3600" :min="1" :step="1"
              :rules="[rules.inRange(0, 3600), rules.onlyIntegers]"
              :hint="`+${Helpers.formatSeconds(formData.timeIncrement)} after every move`"
            ><template v-slot:prepend><q-icon name="more_time"/></template></q-input>
            <q-input
              class="col-6"
              dense filled
              v-model.number="formData.timeContingent"
              type="number"
              label="Time contingent"
              suffix="seconds"
              :max="24 * 3600" :min="1" :step="1"
              :rules="[rules.inRange(0, 24 * 3600), rules.onlyIntegers]"
              :hint="'Each player starts with ' + Helpers.formatSeconds(formData.timeContingent)"
            ><template v-slot:prepend><q-icon name="timer"/></template></q-input>
            <q-input
              class="col-3"
              dense filled
              v-model.number="formData.pieces"
              type="number"
              label="Flats"
              step="1"
              max="500"
              min="0"
              :rules="[rules.inRange(0, 500), rules.onlyIntegers]"
            ><template v-slot:prepend><q-icon name="square" /></template></q-input>
            <q-input
              class="col-3"
              dense filled
              v-model.number="formData.capstones"
              type="number"
              label="Capstones"
              step="1"
              max="10"
              min="0"
              :rules="[rules.inRange(0, 10), rules.onlyIntegers]"
            ><template v-slot:prepend><q-icon name="circle" /></template></q-input>
          </div>
          <div class="row q-col-gutter-md">
            <q-input
              class="col-6"
              dense filled
              v-model.number="formData.extraTimeAmount"
              type="number"
              label="Extra time trigger amount"
              suffix="seconds"
              :max="24 * 3600" :min="0" :step="1"
              :rules="[rules.inRange(0, 24 * 3600), rules.onlyIntegers]"
              :hint="`+${Helpers.formatSeconds(formData.extraTimeAmount)} after move ${formData.extraTimeTriggerMove}`"
            ><template v-slot:prepend><q-icon name="more_time"/></template></q-input>
            <q-input
              :disable="!formData.extraTimeAmount"
              class="col-6"
              dense filled
              v-model.number="formData.extraTimeTriggerMove"
              type="number"
              label="Extra time trigger move"
              suffix="moves"
              :max="1000" :min="1" :step="1"
              :rules="[rules.inRange(1, 1000), rules.onlyIntegers]"
              :hint="`+${Helpers.formatSeconds(formData.extraTimeAmount)} after move ${formData.extraTimeTriggerMove}`"
            ><template v-slot:prepend><q-icon name="alarm_on"/></template></q-input>
          </div>
          <div class="row">
            <div class="col">
              <q-btn label="Add ruleset" type="submit" color="primary"/>
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { addRuleset } from 'src/services/pnt.service';
import { GameRuleset } from 'src/types/tournament';
import {
  boardSizeOptions, komiOptions, standardCapstoneCount, standardPieceCount,
} from 'src/services/constants';
import { ref, watch } from 'vue';
import Helpers from 'src/services/helpers.service';

// eslint-disable-next-line no-unused-vars
const emit = defineEmits<{(e: 'rulesetAdded', stage: GameRuleset): void}>();
const $q = useQuasar();

const rules = {
  inRange: (min: number, max: number) => (n: number) => (n >= min && n <= max) || `Please choose a number between ${min} and ${max}.`,
  halfStepsOnly: (n: number) => Number.isInteger(n * 2) || 'Please choose numbers in 0.5 steps.',
  onlyIntegers: (n: number) => Number.isInteger(n) || 'Please choose an integer.',
};

const showDialog = ref(false);
const formData = ref<Omit<GameRuleset, 'id'>>({
  name: '',
  timeContingent: 10 * 60,
  timeIncrement: 15,
  extraTimeTriggerMove: 0,
  extraTimeAmount: 0,
  komi: 2,
  boardSize: 6,
  capstones: 1,
  pieces: 30,
});

async function openDialog() {
  showDialog.value = true;
}

async function onSubmit() {
  try {
    const newStage = await addRuleset({ ...formData.value });
    emit('rulesetAdded', newStage);
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
watch(() => formData.value.boardSize, (newBoardSize) => {
  if (newBoardSize) {
    formData.value.capstones = standardCapstoneCount[newBoardSize];
    formData.value.pieces = standardPieceCount[newBoardSize];
  }
});
watch(() => formData.value.boardSize, (newBoardSize) => {
  if (newBoardSize) {
    formData.value.capstones = standardCapstoneCount[newBoardSize];
    formData.value.pieces = standardPieceCount[newBoardSize];
  }
});
</script>
