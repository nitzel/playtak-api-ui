<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-overline text-green-9">#{{ ruleset.id }}</div>
      <div class="text-h5 q-mt-sm q-mb-xs">{{ ruleset.name }}</div>
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
    </q-card-section>

    <q-card-actions>
      <!-- <RouterLink :to="{ name: 'ruleset', params: { rulesetId: ruleset.id }}"> -->
      <q-btn flat color="primary" label="Edit" disable/>
      <!-- </RouterLink> -->

      <q-space />

      <q-btn
        color="grey"
        round
        flat
        dense
        :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="expanded = !expanded"
      />
    </q-card-actions>

    <q-slide-transition>
      <div v-show="expanded">
        <q-separator />
        <q-card-section class="text-subitle2">
          Details about the rule, e.g. how often it is used and in which tournaments.
        </q-card-section>
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script setup lang="ts">
import Helpers from 'src/services/helpers.service';
import { GameRuleset } from 'src/types/tournament';
import { ref } from 'vue';

defineProps<{
  ruleset: GameRuleset
}>();
const expanded = ref(false);

</script>

<style scoped>
.badges > * {
  margin: 0 3px;
}
</style>
