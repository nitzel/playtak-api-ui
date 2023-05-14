<template>
  <q-card flat bordered>
    <q-card-section class="row">
      <div class="text-overline text-yellow-9">Stage #{{ stage.id }} "{{  stage.name }}"</div>
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
        <q-card-section>
          <RulesetCompactComponent :ruleset="stage.rules" v-if="(typeof stage.rules !== 'number')"/>
        </q-card-section>
        <q-card-section
          v-for="group in stage.groups"
          v-bind:key="group.id"
          class="text-subitle2"
        >
          <GroupComponent :group="group" @modified="onGroupModified"/>
        </q-card-section>
        <AddGroupDialog :stage="stage" @added="onGroupAdded"/>
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script setup lang="ts">
import { TournamentGroup, TournamentStage } from 'src/types/tournament';
import { ref } from 'vue';
import RulesetCompactComponent from './RulesetCompactComponent.vue';
import AddGroupDialog from './AddGroupDialog.vue';
import GroupComponent from './GroupComponent.vue';

// eslint-disable-next-line no-unused-vars
const emit = defineEmits<{(e: 'modified', stage: TournamentStage): void}>();
const props = defineProps<{
  stage: TournamentStage
}>();
const expanded = ref(true);

function onGroupAdded(group: TournamentGroup) {
  emit('modified', {
    ...props.stage,
    groups: [...props.stage.groups, group],
  });
}

function onGroupModified(group: TournamentGroup) {
  emit('modified', {
    ...props.stage,
    groups: props.stage.groups.map(g => (g.id === group.id ? group : g)),
  });
}

</script>

<style scoped>
</style>
