<template>
  <q-btn
    dense text-color="primary"
    @click="handleAddGame()"
    icon="add_circle_outline"
  >
    Add Game
  </q-btn>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { addGame } from 'src/services/pnt.service';
import {
  GameRuleset, TournamentGame, TournamentGameUpsert, TournamentMatchup,
} from 'src/types/tournament';

// eslint-disable-next-line no-unused-vars
const emit = defineEmits<{(e: 'added', group: TournamentGame): void}>();
const props = defineProps<{
  matchup: TournamentMatchup,
  stageRules: GameRuleset,
}>();
const $q = useQuasar();

async function handleAddGame() {
  try {
    const gameData: Partial<TournamentGameUpsert> = {
      matchup: props.matchup.id,
      // Try to keep the number games that each player goes first even
      player1goesFirst: props.matchup.games.reduceRight((a, b) => (a + (b.player1goesFirst ? 1 : -1)), 0) <= 0,
      rules: props.stageRules.id,
    };
    const newGame = await addGame(gameData);
    emit('added', newGame);

    $q.notify({
      message: 'Game added',
      position: 'top',
      type: 'success',
    });
  } catch (exc) {
    $q.notify({
      message: `Failed to add game ${exc}`,
      position: 'top',
      type: 'warning',
    });
  }
}
</script>
