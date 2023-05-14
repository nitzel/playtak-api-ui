import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'index',
        path: '',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        name: 'games',
        path: 'games',
        component: () => import('pages/GamesHistory.vue'),
      },
      {
        name: 'tournaments',
        path: 'tournaments',
        component: () => import('pages/TournamentsPage.vue'),
      },
      {
        name: 'tournament',
        path: 'tournaments/:tournamentId',
        component: import('pages/TournamentPage.vue'),
      },
      {
        name: 'game-rulesets',
        path: 'tournaments/game-rulesets',
        component: import('pages/TournamentRulesetsPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
