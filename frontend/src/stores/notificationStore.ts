import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNotificationStore = defineStore('notification', () => {
  const show = ref(false);
  const message = ref('');
  const color = ref('');
  const timeout = ref(3000);

  const notify = (msg: string, clr: string, time = 3000) => {
    message.value = msg;
    color.value = clr;
    timeout.value = time;
    show.value = true;
  };

  const close = () => {
    show.value = false;
  };

  return { show, message, color, timeout, notify, close };
});
