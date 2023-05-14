<template>
  <q-card flat bordered>
    <q-card-section class="row">
      <div class="text-overline text-pink-9">Group #{{ group.id }} "{{  group.name }}"</div>
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
        <div
          v-for="matchup in sortedMatchups"
          v-bind:key="matchup.id"
        >
          <q-card-section
            v-if="(typeof group !== 'number')"
            class="text-subitle2"
          >
            <MatchupComponent
              :matchup="matchup"
              :stage-rules="stageRules"
              @modified="onMatchupModified"
            />
          </q-card-section>
        </div>
        <AddMatchupDialog :group="group" @added="onMatchupAdded"/>
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script setup lang="ts">
import { GameRuleset, TournamentGroup, TournamentMatchup } from 'src/types/tournament';
import { computed, ref } from 'vue';
import Helpers from 'src/services/helpers.service';
import AddMatchupDialog from './AddMatchupDialog.vue';
import MatchupComponent from './MatchupComponent.vue';

// eslint-disable-next-line no-unused-vars
const emit = defineEmits<{(e: 'modified', group: TournamentGroup): void}>();
const props = defineProps<{
  group: TournamentGroup,
  stageRules: GameRuleset,
}>();
const expanded = ref(true);
const sortedMatchups = computed(() => Helpers.sortById(props.group.matchups));

function onMatchupAdded(matchup: TournamentMatchup) {
  emit('modified', {
    ...props.group,
    matchups: [...props.group.matchups, matchup],
  });
}

function onMatchupModified(matchup: TournamentMatchup) {
  emit('modified', {
    ...props.group,
    matchups: props.group.matchups.map(m => (m.id === matchup.id ? matchup : m)),
  });
}

</script>

<style scoped>
</style>
