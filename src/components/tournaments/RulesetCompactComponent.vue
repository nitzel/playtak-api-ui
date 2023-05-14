<template>
  <div class="text-overline text-green-9">Ruleset "{{ ruleset.name }}"</div>
  <div class="badges">
    <q-badge color="secondary">
      <q-tooltip>Boardsize</q-tooltip>
      {{ ruleset.boardSize }}x{{ ruleset.boardSize }}
    </q-badge>
    <q-badge color="secondary">
      <q-tooltip>Number of capstones and normale pieces each player starts with</q-tooltip>
      {{ ruleset.capstones }} Caps {{ ruleset.pieces }} Flats
    </q-badge>
    <q-badge color="secondary">
      <q-tooltip>
        Each player starts with {{ Helpers.formatSeconds(ruleset.timeContingent) }} on the clock.
        After each move they get an extra {{ Helpers.formatSeconds(ruleset.timeIncrement) }}.
      </q-tooltip>
      {{ Helpers.formatSeconds(ruleset.timeContingent) }}+{{ Helpers.formatSeconds(ruleset.timeIncrement) }}
    </q-badge>
    <q-badge
      v-if="ruleset.extraTimeAmount"
      color="secondary"
    >
      <q-tooltip>
        After {{ ruleset.extraTimeTriggerMove }} moves each player gets added
        {{ Helpers.formatSeconds(ruleset.extraTimeAmount) }} to their clock
      </q-tooltip>
      @{{ ruleset.extraTimeTriggerMove }} +{{ Helpers.formatSeconds(ruleset.extraTimeAmount) }}
    </q-badge>
    <q-badge color="secondary">
      <q-tooltip>{{ruleset.komi }} is added to black's flat count</q-tooltip>
      {{ruleset.komi }} Komi
    </q-badge>
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
