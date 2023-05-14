<template>
  <q-card flat bordered>
    <q-card-section class="row">
      <div class="text-overline text-cyan-9">Matchup #{{ matchup.id }} {{  matchup.player1 }} vs {{ matchup.player2 }}</div>
      <q-space/>
      <q-btn
        color="grey"
        round
        flat
        dense
        :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="expanded = !expanded"
      />
    </q-card-section>
    <q-slide-transition>
      <div v-show="expanded">
        <q-separator />
        Games todo remove this text
        <q-card-section
          v-for="game in matchup.games"
          v-bind:key="game.id"
          class="text-subitle2"
        >
          #{{ game.id}} {{ game.playtakId }} {{ game.player1goesFirst }}
          <!-- <GameComponent :matchup="matchup" :game="game" @modified="onGameModified"/> -->
        </q-card-section>
        <!-- <AddGameDialog :matchup="matchup" @added="onGameAdded"/> -->
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script setup lang="ts">
import { TournamentGame, TournamentMatchup } from 'src/types/tournament';
import { ref } from 'vue';
// import AddGameDialog from './AddGameDialog.vue';
// import GameComponent from './GameComponent.vue';

// eslint-disable-next-line no-unused-vars
const emit = defineEmits<{(e: 'modified', matchup: TournamentMatchup): void}>();
const props = defineProps<{
  matchup: TournamentMatchup
}>();
const expanded = ref(true);

function onGameAdded(game: TournamentGame) {
  emit('modified', {
    ...props.matchup,
    games: [...props.matchup.games, game],
  });
}

function onGameModified(game: TournamentGame) {
  emit('modified', {
    ...props.matchup,
    games: props.matchup.games.map(g => (g.id === game.id ? game : g)),
  });
}

</script>

<style scoped>
</style>
