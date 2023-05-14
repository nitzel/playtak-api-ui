<template>
  <q-page class="rules-page">

    <h5>
      Game rulesets
      <AddRulesetDialog @ruleset-added="onRulesetAdded"/>
    </h5>
    <div class="row flex-start q-gutter-md tournaments-container">
      <div
        v-for="ruleset of sortedRulesets"
        v-bind:key="ruleset.id"
        class="col-5"
      >
        <RulesetComponent :ruleset="ruleset"/>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import RulesetComponent from 'components/tournaments/RulesetComponent.vue';
import { GameRuleset } from 'src/types/tournament';
import { ref, onBeforeMount, computed } from 'vue';
import { getRulesets } from 'src/services/pnt.service';
import AddRulesetDialog from 'src/components/tournaments/AddRulesetDialog.vue';
import Helpers from 'src/services/helpers.service';

const allRulesets = ref<GameRuleset[]>();
const sortedRulesets = computed(() => Helpers.sortById(allRulesets.value));

onBeforeMount(async () => {
  try {
    allRulesets.value = undefined;
    allRulesets.value = await getRulesets();
  } catch (exc: unknown) {
    console.error('Unexpected error', exc);
  }
});

function onRulesetAdded(ruleset: GameRuleset) {
  allRulesets.value?.push(ruleset);
}
</script>

<style scoped>
.rules-page {
  margin: 0em 2em;
}
</style>
