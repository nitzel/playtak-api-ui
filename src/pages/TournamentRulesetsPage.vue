<template>
  <q-page class="rules-page">

    <h5>Game rulesets</h5>
    <div class="row flex-start q-gutter-md tournaments-container">
      <div
        v-for="ruleset of allRulesets"
        v-bind:key="ruleset.id"
        class="col-4"
      >
        <RulesetComponent :ruleset="ruleset"/>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import RulesetComponent from 'components/tournaments/RulesetComponent.vue';
import { GameRuleset } from 'src/types/tournament';
import { ref, onBeforeMount } from 'vue';
import { getRulesets } from 'src/services/pnt.service';

const allRulesets = ref<GameRuleset[]>();

onBeforeMount(async () => {
  try {
    allRulesets.value = undefined;
    allRulesets.value = await getRulesets();
  } catch (exc: unknown) {
    console.error('Unexpected error', exc);
  }
});

</script>

<style scoped>
.rules-page {
  margin: 0em 2em;
}
</style>
