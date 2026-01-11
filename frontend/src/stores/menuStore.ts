import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', {
  state: () => ({
    menus: [
      { name: 'Home', path: '/' },
      { name: 'Usuários', path: '/users' },
    ],
  }),
  getters: {
    menuCount: (state) => state.menus.length,
  },
});
