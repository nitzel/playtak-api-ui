<template>
  <q-card flat bordered>
    <q-card-section class="row">
      <div class="text-overline text-cyan-9">Matchup #{{ matchup.id }} {{  matchup.player1 }} vs {{ matchup.player2 }}</div>
    </q-card-section>
    <q-card-section>
      <div
        v-for="game in sortedGames"
        v-bind:key="game.id"
      >
        Game #{{ game.id}}
        <q-chip :color="game.player1goesFirst ? 'white' : 'black'" text-color="primary">
          {{ matchup.player1 }}
        </q-chip>
        vs
        <q-chip :color="game.player1goesFirst ? 'black' : 'white'" text-color="primary">
          {{ matchup.player2 }}
        </q-chip>
        <q-chip v-if="game.playtakId" :color="game.result ? 'secondary' : 'warning'">
          <!-- TODO link this to ptn.ninja/ptn download -->
          PlaytakId #{{ game.playtakId }}&nbsp;
          <span v-if="!game.result">ongoing</span>
        </q-chip>
        <q-chip v-if="game.result" color="positive">
          {{ game.result }}
        </q-chip>
        <q-btn
          v-if="!game.playtakId && !game.result"
          color="primary"
          outline
          dense
          size="xs"
          @click="handleCreateSeek(game)"
          title="Creating seek as the player you're logged in is a future feature"
        >
          <!-- TODO rephrase once the playtak-api supports creating the seek as the logged in user -->
          Create seek as {{ matchup.player1 }}
        </q-btn>
        <RulesetCompactComponent :ruleset="game.rules" v-if="game.rules.id != stageRules.id"/>
      </div>
      <AddGameDialog
        :matchup="matchup"
        :stage-rules="stageRules"
        @added="onGameAdded"
      />
      <!-- <GameComponent :matchup="matchup" :game="game" @modified="onGameModified"/> -->
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { GameRuleset, TournamentGame, TournamentMatchup } from 'src/types/tournament';
import { createSeek } from 'src/services/pnt.service';
import { useQuasar } from 'quasar';
import { computed } from 'vue';
import Helpers from 'src/services/helpers.service';
import AddGameDialog from './AddGameDialog.vue';
import RulesetCompactComponent from './RulesetCompactComponent.vue';
// import GameComponent from './GameComponent.vue';

// eslint-disable-next-line no-unused-vars
const emit = defineEmits<{(e: 'modified', matchup: TournamentMatchup): void}>();
const props = defineProps<{
  matchup: TournamentMatchup,
  stageRules: GameRuleset,
}>();
const $q = useQuasar();

const sortedGames = computed(() => Helpers.sortById(props.matchup.games));

function onGameAdded(game: TournamentGame) {
  emit('modified', {
    ...props.matchup,
    games: [...props.matchup.games, game],
  });
}

// function onGameModified(game: TournamentGame) {
//   emit('modified', {
//     ...props.matchup,
//     games: props.matchup.games.map(g => (g.id === game.id ? game : g)),
//   });
// }

async function handleCreateSeek(game: TournamentGame) {
  try {
    const seek = await createSeek(game);
    $q.notify({
      message: `Seek #${seek.id} created`,
      position: 'top',
      type: 'success',
    });
  } catch (exc) {
    $q.notify({
      message: `Failed to create seek ${props.matchup.player1} vs ${props.matchup.player2}: ${exc}`,
      position: 'top',
      type: 'warning',
    });
  }
}

</script>

<style scoped>
</style>
