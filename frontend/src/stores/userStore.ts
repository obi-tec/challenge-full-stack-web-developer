import { defineStore } from 'pinia'
import type { User, PaginatedResponse, UpdateUserDTO } from '@/repositories/userRepository'
import { userRepository } from '@/repositories/userRepository'

interface UserStoreState {
  users: User[]
  total: number
  currentPage: number
  perPage: number
  totalPages: number
  isLoading: boolean
  error: string | null
}

export const useUserStore = defineStore('userStore', {
  state: (): UserStoreState => ({
    users: [],
    total: 0,
    currentPage: 1,
    perPage: 10,
    totalPages: 0,
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchUsers(currentPage = 1, perPage = 10) {
      this.isLoading = true
      this.error = null
      try {
        const data: PaginatedResponse<User> = await userRepository.fetchUsers(currentPage, perPage)
        this.users = data.data
        this.total = data.total
        this.currentPage = data.currentPage
        this.perPage = data.perPage
        this.totalPages = data.totalPages
      } catch (error: any) {
        this.error = error.message || 'Ocorreu um erro ao buscar os usuários.'
        throw error
      } finally {
        this.isLoading = false
      }
    },
    async createUser(user: User) {
      this.isLoading = true
      this.error = null
      try {
        await userRepository.createUser(user)
        await this.fetchUsers(this.currentPage, this.perPage)
      } catch (error: any) {
        this.error = error.message || 'Ocorreu um erro ao criar o usuário.'
        throw error
      } finally {
        this.isLoading = false
      }
    },
    async updateUser(uuid: string, user: UpdateUserDTO) {
      this.isLoading = true
      this.error = null
      try {
        await userRepository.updateUser(uuid, user)
        await this.fetchUsers(this.currentPage, this.perPage)
      } catch (error: any) {
        this.error = error.message || 'Ocorreu um erro ao atualizar o usuário.'
        throw error
      } finally {
        this.isLoading = false
      }
    },
    async deleteUser(uuid: string) {
      this.isLoading = true
      this.error = null
      try {
        await userRepository.deleteUser(uuid)
        await this.fetchUsers(this.currentPage, this.perPage)
      } catch (error: any) {
        this.error = error.message || 'Ocorreu um erro ao excluir o usuário.'
        throw error
      } finally {
        this.isLoading = false
      }
    },
  },
})
