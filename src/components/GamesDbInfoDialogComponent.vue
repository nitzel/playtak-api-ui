<template>
  <q-btn stretch flat label="Info" @click="openDialog()"/>
  <q-dialog v-model="showDialog">
    <q-card style="width: 50vw" class="q-pb-none">
      <q-card-section class="row items-center q-pt-none">
        <p class="q-mt-md">
          Games before 23rd April 2016 5:00 PM UTC are anonymized and won't appear when searching with player name
        </p>
        <p>
          Please don't scrape this site. You can directly download the database here: <br>
          <a href="/games_anon.db.gz">Games Database</a>
          <span v-if="dbInfo">
            (~{{ Helpers.formatBytes(dbInfo.size) }})
            (updated on {{ Helpers.formatDateTime(dbInfo.date) }})
          </span>
          <span v-else class="warning">
            (Failed to load database details)
          </span>
          <br>
          note that the notation is in play tak server format.
        </p>
        <p>
          The link above will be updated with latest database every day at 5:00 PM UTC.
        </p>
        <p>
          In the player name search fields you can do a partial search
          with % at the start, end, or both. ie %ame or nam% or %am%
        </p>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { GameService } from 'src/services/game.service';
import Helpers from 'src/services/helpers.service';
import { ref } from 'vue';

type DatabaseInfo = {
  size: number
  date: number
}

const gameService = new GameService();

const dbInfo = ref<DatabaseInfo>();
const showDialog = ref(false);

async function openDialog() {
  const dbtemp = await gameService.getDBInfo();
  dbInfo.value = {
    date: dbtemp.mtime,
    size: dbtemp.size,
  };

  showDialog.value = true;
}
</script>
