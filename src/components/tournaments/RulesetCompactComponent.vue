<template>
  <div class="text-overline text-green-9">Ruleset "{{ ruleset.name }}"</div>
  <div class="badges">
    <q-badge color="secondary">{{ ruleset.boardSize }}x{{ ruleset.boardSize }}</q-badge>
    <q-badge color="secondary">{{ ruleset.capstones }} Caps {{ ruleset.pieces }} Flats</q-badge>
    <q-badge color="secondary">
      {{ Helpers.formatSeconds(ruleset.timeContingent) }}+{{ Helpers.formatSeconds(ruleset.timeIncrement) }}
    </q-badge>
    <q-badge
      v-if="ruleset.extraTimeAmount"
      color="secondary"
    >
      @{{ Helpers.formatSeconds(ruleset.extraTimeTriggerMove) }} +{{ Helpers.formatSeconds(ruleset.extraTimeAmount) }}
    </q-badge>
    <q-badge  color="secondary">{{ruleset.komi }} Komi</q-badge>
  </div>
</template>

<script setup lang="ts">
import Helpers from 'src/services/helpers.service';
import { GameRuleset } from 'src/types/tournament';

defineProps<{
  ruleset: GameRuleset
}>();

</script>

<style scoped>
.badges > * {
  margin: 0 3px;
}
</style>
