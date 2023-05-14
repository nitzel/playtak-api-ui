<template>
  <q-btn-dropdown
    split
    dense text-color="primary"
    @click="handleAddGame()"
    icon="add_circle_outline"
    label="Add Game"
    @before-show="beforeDropdownShow"
  >
    <div class="row no-wrap q-pa-md">
      <div class="column">
        <div class="text-h6 q-mb-md">Settings</div>
        <q-toggle
          v-model="newGamePreferences.player1goesFirst"
          :label="`${newGamePreferences.player1goesFirst ? matchup.player1 : matchup.player2} goes first`"
        />
        <q-select
            filled
            v-model="newGamePreferences.rules"
            :options="gameRulesetOptions"
            label="Ruleset"
            :rules="[ val => val || 'You must choose a default ruleset']"
            :loading="gameRulesetOptions === undefined"
            emit-value map-options
          />

        <q-btn
          dense text-color="primary"
          @click="handleAddCustomGame()"
          icon="add_circle_outline"
        >
          Add Game
        </q-btn>
      </div>
    </div>
  </q-btn-dropdown>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { addGame, getRulesets } from 'src/services/pnt.service';
import {
  GameRuleset, TournamentGame, TournamentGameUpsert, TournamentMatchup,
} from 'src/types/tournament';
import { computed, ref } from 'vue';

// eslint-disable-next-line no-unused-vars
const emit = defineEmits<{(e: 'added', group: TournamentGame): void}>();
const props = defineProps<{
  matchup: TournamentMatchup,
  stageRules: GameRuleset,
}>();
const $q = useQuasar();

const gameRulesets = ref<GameRuleset[]>();
const gameRulesetOptions = computed(() => gameRulesets.value && gameRulesets.value.map(r => ({ label: r.name, value: r.id })));

async function beforeDropdownShow() {
  if (gameRulesets.value === undefined) {
    gameRulesets.value = await getRulesets();
  }
}

const newGamePreferences = ref<Partial<TournamentGameUpsert>>({
  player1goesFirst: true,
  rules: props.stageRules.id,
});

async function tryAddGame(game: Partial<TournamentGameUpsert>) {
  game.matchup = props.matchup.id;
  try {
    const newGame = await addGame(game);
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

async function handleAddCustomGame() {
  await tryAddGame({
    ...newGamePreferences.value,
  });
}

async function handleAddGame() {
  await tryAddGame({
    // Try to keep the number games that each player goes first even
    player1goesFirst: props.matchup.games.reduceRight((a, b) => (a + (b.player1goesFirst ? 1 : -1)), 0) <= 0,
    rules: props.stageRules.id,
  });
}
</script>
