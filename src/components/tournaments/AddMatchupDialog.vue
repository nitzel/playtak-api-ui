<template>
  <q-btn
    dense text-color="primary"
    @click="openDialog()"
    icon="add_circle_outline"
  >
    Add Matchup
  </q-btn>
  <q-dialog v-model="showDialog">
    <q-card style="width: 50vw">
      <q-card-section>
        <div class="text-h6">Add matchup to group #{{ group.id }} {{ group.name }}</div>
        <div
          v-if="'groups' in group"
          class="text-subtitle2"
        >
          Add matchup #{{ group.matchups.length + 1}} to group {{ group.name }}
        </div>
      </q-card-section>
      <q-card-section>
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
        >
          <q-input
            filled
            v-model="formData.player1"
            label="Player1"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please enter a player name']"
          />
          <q-input
            filled
            v-model="formData.player2"
            label="Player2"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please enter a player name']"
          />
          <div>
            <q-btn label="Add matchup" type="submit" color="primary"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { addMatchup } from 'src/services/pnt.service';
import {
  TournamentGroup, TournamentMatchup,
} from 'src/types/tournament';
import { ref } from 'vue';

// eslint-disable-next-line no-unused-vars
const emit = defineEmits<{(e: 'added', group: TournamentMatchup): void}>();
const props = defineProps<{
  group: TournamentGroup,
}>();
const $q = useQuasar();

const showDialog = ref(false);
const formData = ref<Partial<TournamentMatchup>>({});

async function openDialog() {
  showDialog.value = true;
}

async function onSubmit() {
  formData.value.group = props.group.id;
  try {
    const newMatchup = await addMatchup(formData.value);
    emit('added', newMatchup);
    showDialog.value = false;
    $q.notify({
      message: 'Matchup added',
      position: 'top',
      type: 'success',
    });
  } catch (exc) {
    $q.notify({
      message: `Failed to add matchup ${exc}`,
      position: 'top',
      type: 'warning',
    });
  }
}
</script>
