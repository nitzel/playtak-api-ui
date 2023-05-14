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
          v-for="matchup in group.matchups"
          v-bind:key="matchup.id"
        >
          <q-card-section
            v-if="(typeof group !== 'number')"
            class="text-subitle2"
          >
            <MatchupComponent :matchup="matchup" @modified="onMatchupModified"/>
          </q-card-section>
        </div>
        <AddMatchupDialog :group="group" @added="onMatchupAdded"/>
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script setup lang="ts">
import { TournamentGroup, TournamentMatchup } from 'src/types/tournament';
import { ref } from 'vue';
import AddMatchupDialog from './AddMatchupDialog.vue';
import MatchupComponent from './MatchupComponent.vue';

// eslint-disable-next-line no-unused-vars
const emit = defineEmits<{(e: 'modified', group: TournamentGroup): void}>();
const props = defineProps<{
  group: TournamentGroup
}>();
const expanded = ref(true);

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
