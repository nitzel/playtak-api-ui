<template>
  <q-dialog :model-value="modelValue" @update:model-value="setDialogOpen">
    <q-card style="width: 300px" class="q-pb-none">
      <q-card-section class="row justify-between">
        <div class="text-h4">
          PTN
          <div class="text-subtitle1">{{ game?.id }}</div>
        </div>
        <div>
          <q-btn flat round icon="close" v-close-popup />
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section style="max-height: 50vh" class="scroll">
        <span style="white-space: pre-line; font-family: monospace">{{ ptnText }}</span>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn label="Copy" icon="content_copy" color="primary" flat rounded @click="emit('copyPtnToClipboard', game)" :disable="!game"/>
        <q-btn label="Download" icon="download" color="primary" flat rounded @click="emit('downloadPtn', game)" :disable="!game"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { PTNService } from 'src/services/ptn.service';
import { GameData } from 'src/types/tak';
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    game: GameData,
    /** open or closed */
    modelValue?: boolean
  }>(),
  { modelValue: false, noTriggerButton: false },
);

// eslint-disable-next-line no-unused-vars
const emit = defineEmits<{(e: 'copyPtnToClipboard', game: GameData): void, (e: 'downloadPtn', game: GameData): void, (e: 'update:modelValue', isOpen: boolean): void }>();

const ptnText = computed(() => PTNService.getPTN(props.game));

async function setDialogOpen(open: boolean) {
  emit('update:modelValue', open);
}

</script>
