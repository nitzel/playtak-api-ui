<!-- eslint-disable no-use-before-define -->
<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import {
  useQuasar,
} from 'quasar';
import GamesSearchComponent from 'components/games-history/GamesSearch.vue';
import GamesTableComponent from 'components/games-history/GamesTable.vue';
import { PTNService } from 'src/services/ptn.service';
import { GameService } from 'src/services/game.service';
import { SearchData, GameData } from 'src/types/tak';
import { Pagination } from 'src/types/pagination';
import Helpers from 'src/services/helpers.service';
import PtnDialogComponent from 'components/PtnDialogComponent.vue';

const $q = useQuasar();
const isLoading = ref(false);
const gameData = ref<readonly GameData[]>([]);
const gameForPtnDialog = ref<GameData>();
const pagination = ref<Pagination>({
  page: 0,
  rowsPerPage: 50,
  rowsNumber: 0,
});

const searchData = ref<SearchData>({
  mirror: true,
});
const openSearchDialog = ref(false);
const gameService = new GameService();
onBeforeMount(async () => {
  // check pathname values
  let path = window.location.pathname.split('/');
  path = path.filter((item) => item !== 'games');
  // let gameData;
  switch (path[2]) {
    case 'playtakviewer': {
      const currentGameData = await getGameById(path[1]);
      const pturl = `https://playtak.com/?load=${encodeURI(PTNService.getPTN(currentGameData))}`;
      window.location.assign(pturl);
      break;
    }
    case 'ninjaviewer': {
      const currentGameData = await getGameById(path[1]);
      const nurl = `https://ptn.ninja/${encodeURI(PTNService.getPTN(currentGameData))}`;
      window.location.assign(nurl);
      break;
    }
    case 'view': {
      gameForPtnDialog.value = await getGameById(path[1]);
      searchGames({}, {});
      break;
    }
    default: {
      if (path[1].length > 0 && parseInt(path[1], 10)) {
        try {
          downloadPtn(await getGameById(path[1]));
        } catch (error) {
          console.error(error);
        }
      }
      const urlSearchParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlSearchParams.entries());
      if (params.mirror) searchData.value.mirror = params.mirror === 'true';
      if (params.size) searchData.value.size = parseInt(params.size, 10);
      if (params.sort) searchData.value.sort = params.sort;

      searchGames({}, params);
      break;
    }
  }
});

function setSearchData(params: SearchData) {
  const search = {
    ...params,
  };

  searchData.value = Object.fromEntries(Object.entries(search).filter(([, v]) => v !== null && v !== ''));
  searchGames(pagination.value, search);
}

async function searchGames(paginationData: Pagination, search?: SearchData) {
  isLoading.value = true;
  if (!search && Object.keys(searchData.value).length > 0) {
    search = searchData.value;
  }
  try {
    const d = await gameService.getGames(paginationData, search);
    if (!d?.items) return;
    gameData.value = Object.freeze(d.items);
    pagination.value.page = d.page;
    pagination.value.rowsPerPage = d.perPage;
    pagination.value.rowsNumber = d.total;
  } catch (error) {
    gameData.value = [];
    console.error('Error', error);
  }
  isLoading.value = false;
}

async function getGameById(id: string) {
  return gameService.getGameByID(id);
}

function viewPtn(game: GameData) {
  gameForPtnDialog.value = game;
}

function copyPtnToClipboard(game: GameData) {
  try {
    navigator.clipboard.writeText(PTNService.getPTN(game));
    $q.notify({ message: 'Copied to clipboard!', position: 'top' });
  } catch (error) {
    $q.notify({ message: 'Failed to copy to clipboard!', position: 'top' });
  }
}

function downloadPtn(game: GameData) {
  const dateString = Helpers.formatDateTime(game.date);

  const url = window.URL.createObjectURL(new Blob([PTNService.getPTN(game)]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${game.player_white}-vs-${game.player_black}-${dateString}.ptn`);
  link.click();
}

</script>

<template>
  <q-page>
    <GamesTableComponent
      class="table-wrapper"
      :loading="isLoading"
      :data="gameData"
      v-model:pagination="pagination"
      @page-event="searchGames"
      @copy-event="copyPtnToClipboard"
      @view-event="viewPtn"
      @download-event="downloadPtn"
    >
      <q-btn @click="openSearchDialog = true" icon="search" label="Search" rounded outline />
    </GamesTableComponent>

    <GamesSearchComponent v-model="openSearchDialog" :data="searchData" @search-event="setSearchData" />
    <PtnDialogComponent
      v-if="gameForPtnDialog"
      :game="gameForPtnDialog"
      :model-value="!!gameForPtnDialog"
      @update:model-value="gameForPtnDialog = undefined"
      @copy-ptn-to-clipboard="copyPtnToClipboard"
      @download-ptn="downloadPtn"
    />
  </q-page>
</template>

<style lang="scss" scoped>

.table-wrapper {
  margin: 0 auto;
  max-width: 1400px;
}

</style>
