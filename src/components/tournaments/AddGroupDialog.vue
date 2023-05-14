<template>
  <q-btn
    dense text-color="primary"
    @click="openDialog()"
    icon="add_circle_outline"
  >
    Add Group
  </q-btn>
  <q-dialog v-model="showDialog">
    <q-card style="width: 50vw">
      <q-card-section>
        <div class="text-h6">Add group to stage #{{ stage.id }} {{ stage.name }}</div>
        <div
          v-if="'groups' in stage"
          class="text-subtitle2"
        >
          Add group #{{ stage.groups.length + 1}} stage {{ stage.name }}
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
          <div>
            <q-btn label="Add group" type="submit" color="primary"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { addGroup } from 'src/services/pnt.service';
import { TournamentGroup, TournamentStage } from 'src/types/tournament';
import { ref } from 'vue';

// eslint-disable-next-line no-unused-vars
const emit = defineEmits<{(e: 'added', stage: TournamentGroup): void}>();
const props = defineProps<{
  stage: TournamentStage,
}>();
const $q = useQuasar();

const showDialog = ref(false);
const formData = ref<Partial<TournamentGroup>>({});

async function openDialog() {
  showDialog.value = true;
}

async function onSubmit() {
  formData.value.stage = props.stage.id;
  try {
    const newGroup = await addGroup(formData.value);
    emit('added', newGroup);
    showDialog.value = false;
    $q.notify({
      message: 'Group added',
      position: 'top',
      type: 'success',
    });
  } catch (exc) {
    $q.notify({
      message: `Failed to add group ${exc}`,
      position: 'top',
      type: 'warning',
    });
  }
}
</script>
