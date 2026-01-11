<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>Usuários</v-card-title>
        <v-card-text>Controle de usuários.</v-card-text>
        <v-card-title>
          <v-btn color="primary" @click="openModal">Cadastrar</v-btn>
        </v-card-title>
        <UserList @openEditModal="openEditModal" @openDeleteModal="openDeleteModal" />
      </v-card>
    </v-col>
    <UserModal :isOpen="isModalOpen" :isEditMode="isEditMode" :userData="selectedUser" @close="closeModal"
      @save="fetchUsers" />
    <DeleteUserModal :isOpen="isDeleteModalOpen" :user="selectedUser || { uuid: '', name: '', email: '' }"
      @close="closeDeleteModal" @confirmDelete="confirmDeleteUser" />
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout">
      {{ snackbar.message }}
      <v-btn color="white" @click="snackbar.show = false">Close</v-btn>
    </v-snackbar>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import UserList from '@/components/UserList.vue';
import UserModal from '@/components/UserModal.vue';
import DeleteUserModal from '@/components/DeleteUserModal.vue';
import { useUserStore } from '@/stores/userStore';
import type { User } from '@/repositories/userRepository';

export default defineComponent({
  components: {
    UserList,
    UserModal,
    DeleteUserModal,
  },
  setup() {
    const userStore = useUserStore();
    const isModalOpen = ref(false);
    const isEditMode = ref(false);
    const isDeleteModalOpen = ref(false);
    const selectedUser = ref<User | null>(null);
    const snackbar = ref({
      show: false,
      message: '',
      color: '',
      timeout: 3000,
    });

    const showSnackbar = (message: string, color: string) => {
      snackbar.value.message = message;
      snackbar.value.color = color;
      snackbar.value.show = true;
    };

    const openModal = () => {
      isEditMode.value = false;
      isModalOpen.value = true;
      selectedUser.value = { uuid: '', name: '', email: '' };
    };

    const closeModal = () => {
      isModalOpen.value = false;
      selectedUser.value = null;
    };

    const openEditModal = (user: User) => {
      isEditMode.value = true;
      isModalOpen.value = true;
      selectedUser.value = user;
    };

    const openDeleteModal = (user: User) => {
      selectedUser.value = user;
      isDeleteModalOpen.value = true;
    };

    const closeDeleteModal = () => {
      isDeleteModalOpen.value = false;
      selectedUser.value = null;
    };

    const confirmDeleteUser = async (uuid: string) => {
      try {
        await userStore.deleteUser(uuid);
        showSnackbar('Usuário excluído com sucesso!', 'success');
      } catch (error: any) {
        showSnackbar(error.message || 'Erro ao excluir usuário.', 'error');
      }
      closeDeleteModal();
    };

    const fetchUsers = async () => {
      try {
        await userStore.fetchUsers();
      } catch (error: any) {
        showSnackbar(error.message || 'Erro ao carregar usuários.', 'error');
      }
    };

    return {
      isModalOpen,
      isEditMode,
      isDeleteModalOpen,
      selectedUser,
      snackbar,
      openModal,
      closeModal,
      openEditModal,
      openDeleteModal,
      closeDeleteModal,
      confirmDeleteUser,
      fetchUsers,
      showSnackbar,
    };
  },
});
</script>
