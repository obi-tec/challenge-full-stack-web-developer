<template>
  <v-app>
    <v-app-bar app color="grey-darken-4" dark>
      <v-app-bar-title class="font-weight-bold">Obi.Tec</v-app-bar-title>

      <v-spacer></v-spacer>
      <v-btn v-for="menu in menus" :key="menu.name" :to="menu.path" class="text-white">
        {{ menu.name }}
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>

    <v-snackbar v-model="notification.show" :color="notification.color" :timeout="notification.timeout">
      {{ notification.message }}
      <v-btn color="white" @click="notification.close">
        <v-icon icon="fas fa-close" />
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMenuStore } from '@/stores/menuStore';
import { useNotificationStore } from '@/stores/notificationStore';

export default defineComponent({
  setup() {
    const menuStore = useMenuStore();
    const notificationStore = useNotificationStore();
    return {
      menus: menuStore.menus,
      notification: notificationStore,
    };
  },
});
</script>
