<template>
  <q-layout view="hHh LpR ffr">
    <q-header class="text-white bg-secondary">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <q-img src="/capstone.svg" class="logo"/>
          <span v-show="$q.screen.gt.xs">Playtak New UI</span>
        </q-toolbar-title>
         <q-space />

        <q-btn href="/" stretch flat label="Play Tak" class="text-white" />
        <GamesDbInfoDialogComponent />
        <q-toggle
          v-model="lightMode"
          color="accent"
        />
        <q-icon name="light_mode" size="large" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Features
        </q-item-label>

        <EssentialLink
          v-for="link in sidebarLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import EssentialLink, { EssentialLinkProps } from 'components/EssentialLink.vue';
import { Dark, LocalStorage } from 'quasar';
import GamesDbInfoDialogComponent from 'components/GamesDbInfoDialogComponent.vue';

const lightMode = computed({
  get(): boolean {
    return !Dark.isActive;
  },
  set(isLight: boolean) {
    Dark.set(!isLight);
    LocalStorage.set('lightMode', isLight);
  },
});
Dark.set('auto');
lightMode.value = LocalStorage.getItem('lightMode') ?? !Dark.isActive;

const sidebarLinks: EssentialLinkProps[] = [
  {
    title: 'Main',
    caption: 'Start page',
    icon: 'home',
    link: '/#/',
  },
  {
    title: 'Games-History',
    caption: 'games-history',
    icon: 'history_edu',
    link: '/#/games',
  },
  {
    title: 'Tournaments',
    caption: 'Playtak Native Tournaments',
    icon: 'emoji_events',
    link: '/#/tournaments',
  },
  {
    title: 'Rulesets',
    caption: 'PNT Game Rulesets',
    icon: 'balance',
    link: '/#/tournaments/game-rulesets',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style scoped>
.logo {
  max-width: 30px;
  max-height: 30px;
  padding: 8px 0px 0 0px;
  margin-right: 16px;
}
</style>
