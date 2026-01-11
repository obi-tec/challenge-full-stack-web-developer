<template>
  <v-dialog data-cy="delete-user-modal" v-model="isOpen" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Excluir Usuário</span>
      </v-card-title>
      <v-card-text data-cy="user-name">
        Você tem certeza que deseja excluir o usuário <strong>{{ user?.name }}</strong>?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn data-cy="user-modal-btn-cancel" color="blue darken-1" @click="close">Cancelar</v-btn>
        <v-btn data-cy="user-modal-btn-delete" color="red darken-1" @click="confirmDelete">Excluir</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { User } from '@/repositories/userRepository';

export default defineComponent({
  name: 'DeleteUserModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    user: {
      type: Object as () => User | null,
      required: true,
    },
  },
  emits: ['close', 'confirmDelete'],
  setup(props, { emit }) {
    const close = () => {
      emit('close');
    };

    const confirmDelete = () => {
      if (props.user) {
        emit('confirmDelete', props.user.uuid);
      }
    };

    return {
      close,
      confirmDelete,
    };
  },
});
</script>
